<?php

/**
 * Dashboard Controller Class
 *
 * Defines relevant methods for generating a display table for public facing pages.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
 */
namespace WC_Vendors\Classes\Front;

use function WC_Vendors\Classes\Includes\wcv_get_default_product_template;
use function WC_Vendors\Classes\Includes\wcv_get_order_details_display_options;
use function WC_Vendors\Classes\Includes\wcv_is_vendor_shipping_disabled;
/**
 * Dashboard Controller for new Dashboard tab
 *
 * @version 2.5.4
 * @since   2.5.4
 *
 * @package WCV_Vendors
 */
class WCV_Dashboard_Controller {

    /**
     * Vendor ID
     *
     * @var int $vendor_id Vendor ID.
     */
    private $vendor_id;

    /**
     * Orders
     *
     * @var array $orders Orders.
     */
    private $orders;

    /**
     * Start date
     *
     * @var string $start_date Start date.
     */
    private $start_date;

    /**
     * End date
     *
     * @var string $end_date End date.
     */
    private $end_date;


    /**
     * Last month start date
     *
     * @var string $last_month_start_date Last month start date.
     */
    private $last_month_start_date;

    /**
     * Last month end date
     *
     * @var string $last_month_end_date Last month end date.
     */
    private $last_month_end_date;


    /**
     * Pending shipping orders
     *
     * @var array $pending_shipping_orders Pending shipping orders.
     */
    private $pending_shipping_orders;

    /**
     * Decimal number
     *
     * @var int $decimal_number Decimal number.
     */
    public $decimal_number = 2;

    /**
     * Decimal separator
     *
     * @var string $decimal_separator Decimal separator.
     */
    public $decimal_separator = ',';

    /**
     * Thousand separator
     *
     * @var string $thousand_separator Thousand separator.
     */
    public $thousand_separator = '.';

    /**
     * Is pro active
     *
     * @var bool $is_pro_active Is pro active.
     */
    public static $is_pro_active = false;


    /**
     * Constructor
     *
     * @param int $vendor_id Vendor ID.
     */
    public function __construct( $vendor_id = 0 ) {
        if ( ! $vendor_id ) {
            $vendor_id = get_current_user_id();
        }

        $this->vendor_id          = $vendor_id;
        $this->decimal_number     = apply_filters( 'wcvendors_dashboard_snapshot_decimal_number', $this->decimal_number );
        $this->decimal_separator  = apply_filters( 'wcvendors_dashboard_snapshot_decimal_separator', wc_get_price_decimal_separator() );
        $this->thousand_separator = apply_filters( 'wcvendors_dashboard_snapshot_thousand_separator', wc_get_price_thousand_separator() );

        self::init_pro_status();

        $timezone                    = wp_timezone();
        $now                         = new \DateTime( 'now', $timezone );
        $this->start_date            = ( clone $now )->modify( 'first day of this month' )->format( 'Y-m-d' );
        $this->end_date              = ( clone $now )->format( 'Y-m-d' );
        $this->last_month_start_date = ( clone $now )->modify( 'first day of last month' )->format( 'Y-m-d' );
        $now->setTime( 23, 59, 59 );

        // Set last month end date to the same day-of-month as today, capped at the last day of last month.
        // Avoids PHP's modify('-1 month') / modify('last month') overflow (e.g. March 31 → April 1).
        $last_day_of_last_month_dt = ( clone $now )->modify( 'last day of last month' );
        $target_day                = min( (int) $now->format( 'd' ), (int) $last_day_of_last_month_dt->format( 'd' ) );
        $this->last_month_end_date = ( clone $now )
            ->modify( 'first day of last month' )
            ->modify( '+' . ( $target_day - 1 ) . ' days' )
            ->format( 'Y-m-d' );

        $this->orders                  = $this->get_orders();
        $this->pending_shipping_orders = $this->get_pending_shipping_orders();
    }

    /**
     * Initialize pro status static property
     *
     * @since 2.5.3
     */
    private static function init_pro_status() {
        if ( ! self::$is_pro_active && function_exists( 'is_wcv_pro_active' ) ) {
            self::$is_pro_active = is_wcv_pro_active();
        }
    }

    /**
     * Get orders
     */
    public function get_orders() {
        $this_month_orders_args = array(
            'date_created' => $this->start_date . '...' . $this->end_date,
        );
        $last_month_orders_args = array(
            'date_created' => $this->last_month_start_date . '...' . $this->last_month_end_date,
        );

        $this_month_orders = WCV_Vendor_Controller::get_vendor_orders( $this->vendor_id, $this_month_orders_args );
        $last_month_orders = WCV_Vendor_Controller::get_vendor_orders( $this->vendor_id, $last_month_orders_args );

        $dashboard_orders = array(
            'this_month' => $this_month_orders,
            'last_month' => $last_month_orders,
        );

        return apply_filters( 'wcvendors_dashboard_orders', $dashboard_orders );
    }

    /**
     * Calculate order sales snapshot
     */
    public function calculate_order_sales_snapshot() {
        $total_orders            = count( $this->orders['this_month'] );
        $last_month_total_orders = count( $this->orders['last_month'] );

        $percentage_change = 0;

        if ( $last_month_total_orders > 0 ) {
            $percentage_change = number_format( ( ( $total_orders - $last_month_total_orders ) / $last_month_total_orders ) * 100, $this->decimal_number, $this->decimal_separator, $this->thousand_separator );
        }

        $snapshot = array(
            'gross_sales'       => $this->get_gross_sales(),
            'gross_commissions' => $this->get_total_commission(),
            'total_orders'      => array(
                'this_month' => $total_orders,
                'last_month' => $last_month_total_orders,
                'percentage' => $percentage_change,
            ),
        );

        return apply_filters( 'wcvendors_dashboard_sales_snapshot', $snapshot );
    }

    /**
     * Get gross sales
     */
    public function get_gross_sales() {

        $total_sales            = 0;
        $last_month_sales_total = 0;
        $orders                 = array_merge( $this->orders['this_month'], $this->orders['last_month'] );

        if ( empty( $orders ) ) {
            return array(
                'this_month' => 0,
                'last_month' => 0,
                'percentage' => '0',
            );
        }

        foreach ( $this->orders['this_month'] as $order ) {
            $total_sales += $order->get_total();
        }

        foreach ( $this->orders['last_month'] as $order ) {
            $last_month_sales_total += $order->get_total();
        }

        $percentage = 0;

        if ( $last_month_sales_total > 0 ) {
            $percentage = number_format( ( ( $total_sales - $last_month_sales_total ) / $last_month_sales_total ) * 100, $this->decimal_number, $this->decimal_separator, $this->thousand_separator );
        }

        $gross_sales = array(
            'this_month' => $total_sales,
            'last_month' => $last_month_sales_total,
            'percentage' => $percentage,
        );

        return apply_filters( 'wcvendors_dashboard_gross_sales', $gross_sales );
    }

    /**
     * Get total commission
     */
    public function get_total_commission() {
        global $wpdb;
        $this_month_orders = $this->orders['this_month'];
        $last_month_orders = $this->orders['last_month'];

        $this_month_order_id = array_map(
            function ( $order ) {
                return $order->get_parent_id();
            },
            $this_month_orders
        );

        $last_month_order_id = array_map(
            function ( $order ) {
                return $order->get_parent_id();
            },
            $last_month_orders
        );

        $parent_order_ids = array_merge( $this_month_order_id, $last_month_order_id );

        $total_commission            = 0;
        $last_month_total_commission = 0;

        if ( empty( $parent_order_ids ) ) {
            return array(
                'this_month' => 0,
                'last_month' => 0,
                'percentage' => '0',
            );
        }

        $placeholders = implode( ',', array_fill( 0, count( $parent_order_ids ), '%d' ) );
        $query        = $wpdb->prepare(
            "SELECT order_id, total_due, total_shipping, tax
            FROM {$wpdb->prefix}pv_commission WHERE order_id IN ( $placeholders ) AND vendor_id = %d", // phpcs:ignore
            array_merge( $parent_order_ids, array( $this->vendor_id ) )
        );

        $commission_rows = $wpdb->get_results( $query ); // phpcs:ignore

        foreach ( $commission_rows as $commission_row ) {
            if ( in_array( (int) $commission_row->order_id, $this_month_order_id, true ) ) {
                $total_commission += $commission_row->total_due + $commission_row->total_shipping + $commission_row->tax;
            }

            if ( in_array( (int) $commission_row->order_id, $last_month_order_id, true ) ) {
                $last_month_total_commission += $commission_row->total_due + $commission_row->total_shipping + $commission_row->tax;
            }
        }

        $percentage = 0;

        if ( $last_month_total_commission > 0 ) {
            $percentage = number_format( ( ( $total_commission - $last_month_total_commission ) / $last_month_total_commission ) * 100, $this->decimal_number, $this->decimal_separator, $this->thousand_separator );
        }

        $commissions = array(
            'this_month' => $total_commission,
            'last_month' => $last_month_total_commission,
            'percentage' => $percentage,
        );

        return apply_filters( 'wcvendors_dashboard_total_commission', $commissions );
    }

    /**
     * Get welcome message
     *
     * @return string Welcome message.
     *
     * @since 2.5.4
     * @version 2.5.4
     */
    public function get_welcome_message() {
        $vendor_display_name = get_user_by( 'id', $this->vendor_id )->display_name;
        $welcome_message     = sprintf(
            '%s, %s!',
            __( 'Welcome', 'wc-vendors' ),
            $vendor_display_name
        );

        return apply_filters( 'wcvendors_dashboard_welcome_message', $welcome_message );
    }

    /**
     * Get store setup steps
     *
     * @return array Store setup steps.
     *
     * @since 2.5.4
     * @version 2.5.4
     */
    public function get_store_setup_steps() {
        $completed_steps = $this->check_completed_steps();

        $steps = array(
            'store'    => array(
                'title'       => __( 'Customize your Store Front', 'wc-vendors' ),
                'description' => __( 'Fill in a store description, set images, and other important information for your customers to know.', 'wc-vendors' ),
                'link'        => \WCV_Vendor_Dashboard::get_dashboard_page_url( 'settings' ),
                'icon'        => 'wcv-icon-setup-store',
                'is_complete' => $completed_steps['store'],
                'id'          => 'store',
            ),
            'products' => array(
                'title'       => __( 'Add Products', 'wc-vendors' ),
                'description' => __( 'Give your customers something to buy! Add products to your store to kick start sales.', 'wc-vendors' ),
                'link'        => ! $completed_steps['products'] ? \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product/edit' ) : \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product' ),
                'icon'        => 'wcv-icon-setup-products',
                'is_complete' => $completed_steps['products'],
                'id'          => 'products',
            ),
            'payout'   => array(
                'title'       => __( 'Connect Payout Method', 'wc-vendors' ),
                'description' => __( 'Select your preferred payout method to ensure you get commissions delivered.', 'wc-vendors' ),
                'link'        => \WCV_Vendor_Dashboard::get_dashboard_page_url( 'settings#payment' ),
                'icon'        => 'wcv-icon-setup-payout',
                'is_complete' => $completed_steps['payout'],
                'id'          => 'payout',
            ),
        );

        if ( self::$is_pro_active ) {
            $steps['social'] = array(
                'title'       => __( 'Add your Socials', 'wc-vendors' ),
                'description' => __( 'Link your social media to engage customers. Keep them updated across all platforms.', 'wc-vendors' ),
                'link'        => \WCV_Vendor_Dashboard::get_dashboard_page_url( 'settings#social' ),
                'icon'        => 'wcv-icon-setup-social',
                'is_complete' => $completed_steps['social'],
                'id'          => 'social',
            );
        }

        usort(
            $steps,
            function ( $a, $b ) {
                return $b['is_complete'] - $a['is_complete'];
            }
        );

        return apply_filters( 'wcvendors_dashboard_setup_steps', $steps );
    }

    /**
     * Display Dashboard
     */
    public function display_dashboard() {
        $vendor_shipping_disabled = wcv_is_vendor_shipping_disabled();
        $welcome_message          = $this->get_welcome_message();
        $store_setup_steps        = $this->get_store_setup_steps();
        $sales_snapshot           = $this->calculate_order_sales_snapshot();
        $latest_orders            = $this->get_latest_orders( $vendor_shipping_disabled );
        $latest_reviews           = self::$is_pro_active ? $this->get_ratings() : array();
        $chart_data               = $this->get_total_orders_chart_data();
        $vendor_id                = get_current_user_id();
        $should_show_ratings      = apply_filters( 'wcvendors_dashboard_should_show_ratings', false );
        $this->dashboard_quick_links();

        $this->load_dashboard_template(
            'dashboard-tab-content.php',
            array(
                'welcome_message'          => $welcome_message,
                'store_setup_steps'        => $store_setup_steps,
                'sales_snapshot'           => $sales_snapshot,
                'latest_orders'            => $latest_orders,
                'pending_shipping_orders'  => $this->pending_shipping_orders,
                'latest_reviews'           => $latest_reviews,
                'chart_data'               => $chart_data,
                'is_pro_active'            => self::$is_pro_active,
                'is_dismissed'             => wc_string_to_bool( get_user_meta( $vendor_id, 'wcv_store_setup_dismissed_step', true ) ),
                'should_show_ratings'      => $should_show_ratings,
                'vendor_shipping_disabled' => $vendor_shipping_disabled,
            )
        );
    }

    /**
     * Get latest orders
     *
     * @since 2.6.0
     * @version 2.6.0
     *
     * @param bool $vendor_shipping_disabled Vendor shipping disabled.
     *
     * @return array Latest orders.
     */
    public function get_latest_orders( $vendor_shipping_disabled ) {

        global $wpdb;
        $show_customer_name = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_name', 'no' ) );
        $commission_rows    = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}pv_commission WHERE vendor_id = %d ORDER BY order_id DESC LIMIT 7",
                $this->vendor_id,
            )
        );

        if ( empty( $commission_rows ) ) {
            return array();
        }

        $order_ids = array_column( $commission_rows, 'order_id' );
        $order_ids = array_unique( $order_ids );
        $orders    = wc_get_orders(
            array(
                'post__in' => $order_ids,
            )
        );

        $formated_orders = array();
        $status          = wc_get_order_statuses();

        foreach ( $orders as $order ) {
            $shipped              = (array) $order->get_meta( 'wc_pv_shipped' );
            $items                = $order->get_items();
            $vendor_product_count = 0;
            foreach ( $items as $item ) {
                $prod_or_variation_id = $item['variation_id'] > 0 ? $item['variation_id'] : $item['product_id'];
                $post_author          = get_post_field( 'post_author', $prod_or_variation_id );
                if ( (int) $post_author === $this->vendor_id ) {
                    $vendor_product_count += $item['quantity'];
                }
            }
            $order_status      = in_array( $this->vendor_id, $shipped, true ) && ! $vendor_shipping_disabled ? __( 'Shipped', 'wc-vendors' ) : $status[ "wc-{$order->get_status()}" ];
            $detail_popup      = $this->get_order_popup_details( $commission_rows, $order );
            $formated_orders[] = array(
                'order_id'     => $order->get_id(),
                'customer'     => $show_customer_name ? $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() : '',
                'view_order'   => $order->get_view_order_url(),
                'status'       => $order_status,
                'total_prod'   => $vendor_product_count,
                'detail_popup' => $detail_popup,
            );
        }

        return apply_filters( 'wcvendors_dashboard_latest_orders', $formated_orders );
    }

    /**
     * Get order popup details
     *
     * @param array    $commission_rows Commission rows.
     * @param WC_Order $order           Order.
     *
     * @return string html for order popup details
     */
    public function get_order_popup_details( $commission_rows, $order ) {
        $order_id         = $order->get_id();
        $order_total      = 0;
        $order_shipping   = 0;
        $order_tax        = 0;
        $order_commission = 0;
        $refunded_amount  = 0;
        $shipping_tax     = 0;
        $commission_rows  = array_filter(
            $commission_rows,
            function ( $row ) use ( $order_id ) {
                return (int) $row->order_id === (int) $order_id;
            }
        );

        $show_customer_email = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_email', 'no' ) );
        $show_customer_phone = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_phone', 'no' ) );

        $billing_details = array(
            'name'    => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
            'email'   => $show_customer_email ? $order->get_billing_email() : '',
            'phone'   => $show_customer_phone ? $order->get_billing_phone() : '',
            'address' => $order->get_formatted_billing_address(),
        );

        $shipping_details = array(
            'name'    => $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name(),
            'email'   => $show_customer_email ? $order->get_billing_email() : '',
            'phone'   => $show_customer_phone ? $order->get_shipping_phone() : '',
            'address' => $order->get_formatted_shipping_address(),
        );

        $order_details = array(
            'order_id'     => $order->get_id(),
            'order_date'   => $order->get_date_created()->date( 'Y-m-d' ),
            'order_status' => $order->get_status(),
        );

        $order_items  = array();
        $parent_items = $order->get_items();
        foreach ( $commission_rows as $row ) {
            $cost         = 0;
            $name         = '';
            $refunded     = 0;
            $total        = 0;
            $refunded_qty = 0;
            $product_meta = '';
            foreach ( $parent_items as $item ) {
                $item_id         = $item->get_id();
                $item_product_id = $item->get_variation_id() > 0 ? $item->get_variation_id() : $item->get_product_id();
                if ( $item_product_id === (int) $row->product_id ) {
                    $cost             += $item->get_total();
                    $name              = $item->get_name();
                    $refunded          = $order->get_total_refunded_for_item( $item_id );
                    $total             = $item->get_total();
                    $order_total      += $total;
                    $refunded_amount  += $refunded;
                    $refunded_qty     += $order->get_qty_refunded_for_item( $item_id );
                    $order_commission += $row->total_due;
                    $order_shipping   += $row->total_shipping;
                    $order_tax        += $row->tax;
                    $shipping_tax     += \WCV_Shipping::calculate_shipping_tax( $row->total_shipping );
                    $product_meta      = wc_display_item_meta( $item, array( 'echo' => false ) );
                }
            }
            $thumbnail     = has_post_thumbnail( $row->product_id ) ? get_the_post_thumbnail_url( $row->product_id, 'thumbnail' ) : wc_placeholder_img_src( 'thumbnail' );
            $order_items[] = array(
                'name'         => $name,
                'quantity'     => $row->qty,
                'commission'   => $row->total_due,
                'shipping'     => $row->total_shipping,
                'tax'          => $row->tax,
                'cost'         => $cost,
                'thumbnail'    => $thumbnail,
                'refunded'     => $refunded,
                'total'        => $total,
                'refunded_qty' => $refunded_qty,
                'product_meta' => $product_meta ? $product_meta : '',
            );
        }

        $details_display_options = wcv_get_order_details_display_options();

        ob_start();
        $this->load_dashboard_template(
            'order-popup-details.php',
            array(
                'billing_details'          => $billing_details,
                'shipping_details'         => $shipping_details,
                'order_details'            => $order_details,
                'order_items'              => $order_items,
                'order_id'                 => $order_id,
                'order_total'              => $order_total,
                'order_shipping'           => $order_shipping,
                'order_tax'                => $order_tax,
                'refunded_amount'          => $refunded_amount,
                'order_currency'           => $order->get_currency(),
                'order_commission'         => $order_commission,
                'shipping_tax'             => $shipping_tax,
                'order'                    => $order,
                'details_display_options'  => $details_display_options,
                'vendor_shipping_disabled' => wcv_is_vendor_shipping_disabled(),
            )
        );
        $html = ob_get_clean();

        return $html;
    }

    /**
     * Get pending shipping orders
     *
     * @return array Pending shipping orders.
     */
    public function get_pending_shipping_orders() {
        global $wpdb;
        $vendor_id = $this->vendor_id;

        $timezone   = wp_timezone();
        $now        = new \DateTime( 'now', $timezone );
        $start_date = ( clone $now )->modify( 'first day of this month' )->setTime( 0, 0, 0 );
        $now->setTime( 23, 59, 59 );

        $formatted_start_date = $start_date->format( 'Y-m-d H:i:s' );
        $formatted_end_date   = $now->format( 'Y-m-d H:i:s' );

        if ( ! $vendor_id ) {
            return array();
        }

        $vendor_order_query = $wpdb->prepare(
            "SELECT order_id FROM {$wpdb->prefix}pv_commission WHERE vendor_id = %d 
            AND time BETWEEN %s AND %s",
            $vendor_id,
            $formatted_start_date,
            $formatted_end_date
        );

        $parent_order_ids = $wpdb->get_col( $vendor_order_query ); // phpcs:ignore
        $parent_order_ids = array_unique( $parent_order_ids );

        if ( empty( $parent_order_ids ) ) {
            return array();
        }

        $limit = -1;

        $query_args = array(
            'post__in'     => $parent_order_ids,
            'limit'        => $limit,
            'date_created' => $formatted_start_date . '...' . $formatted_end_date,
        );

        $parents_orders = wc_get_orders( $query_args );

        $pending_shipping_orders = array();
        foreach ( $parents_orders as $order ) {
            $shipped = (array) $order->get_meta( 'wc_pv_shipped' );
            $shipped = array_map( 'intval', $shipped );
            if ( ! in_array( $vendor_id, $shipped, true ) ) {
                $pending_shipping_orders[] = $order;
            }
        }

        return apply_filters( 'wcvendors_dashboard_pending_shipping_orders', $pending_shipping_orders );
    }

    /**
     * Get ratings
     */
    public function get_ratings() {
        global $wpdb;
        $wcv_rating_table = $wpdb->prefix . 'wcv_feedback';

        $sql_query = $wpdb->prepare(
            'SELECT order_id, rating_title, comments, customer_id, rating, postdate FROM %i WHERE vendor_id = %d ORDER BY postdate DESC LIMIT 5',
            $wcv_rating_table,
            $this->vendor_id
        );

        $reviews = $wpdb->get_results( $sql_query ); // phpcs:ignore
        $product_reviews = array();
        foreach ( $reviews as $review ) {
            $user      = get_user_by( 'id', $review->customer_id );
            $user_name = '';
            if ( ! $user ) {
                $user_name = __( 'Guest', 'wc-vendors' );
            } else {
                $user_name = $user->display_name;
            }
            $product_reviews[] = array(
                'rating'   => $this->genrate_star_rating( $review->rating ),
                'customer' => $user_name,
                'review'   => $review->rating_title,
                'order_id' => $review->order_id,
            );
        }
        return apply_filters( 'wcvendors_dashboard_latest_reviews', $product_reviews );
    }

    /**
     * Generate star rating
     *
     * @param int $rating Rating.
     *
     * @return string Star rating.
     */
    public function genrate_star_rating( $rating ) {
        $stars = '';
        ob_start();
            $this->load_dashboard_template(
                'rating-stars.php',
                array( 'rating' => $rating )
            );
        $stars = ob_get_clean();
        return $stars;
    }

    /**
     * Get total orders chart data
     */
    public function get_total_orders_chart_data() {
        $total_orders   = $this->orders['this_month'];
        $data           = array();
        $labels         = array();
        $values         = array();
        $max            = gmdate( 'j', strtotime( $this->end_date ) );
        $current_m      = gmdate( 'M', strtotime( $this->end_date ) );
        $orders_by_date = array();
        foreach ( $total_orders as $order ) {
            $order_date = $order->get_date_created()->format( 'j' );
            if ( ! isset( $orders_by_date[ $order_date ] ) ) {
                $orders_by_date[ $order_date ] = 0;
            }
            ++$orders_by_date[ $order_date ];
        }

        ksort( $orders_by_date );

        foreach ( $orders_by_date as $date => $value ) {
            $data[] = array(
                'y' => $value,
                'x' => "{$current_m}. {$date}",
            );
        }

        return apply_filters( 'wcvendors_dashboard_total_orders_chart_data', $data );
    }

        /**
         * Provide quick links on the dashboard to reduce click through
         *
         * @since    2.5.2
         * @version  2.5.2
         */
    public function get_dashboard_quick_links() {

        $products_disabled  = wc_string_to_bool( get_option( 'wcvendors_product_management_cap', 'no' ) );
        $orders_disabled    = wc_string_to_bool( get_option( 'wcvendors_order_management_cap', 'no' ) );
        $lock_edit_products = ( 'yes' === get_user_meta( get_current_user_id(), '_wcv_lock_edit_products_vendor', true ) ) ? true : false;
        $lock_new_products  = ( 'yes' === get_user_meta( get_current_user_id(), '_wcv_lock_new_products_vendor', true ) ) ? true : false;

        $quick_links      = array();
        $add_product_link = wcv_get_default_product_template();
        $can_submit       = wc_string_to_bool( get_option( 'wcvendors_capability_products_enabled', 'no' ) );

        if ( ! $orders_disabled ) {
            $quick_links['order'] = array(
                'url'   => add_query_arg( array( 'order_status' => 'awating_shipping' ), \WCV_Vendor_Dashboard::get_dashboard_page_url( 'order' ) ),
                'label' => __( 'View Pending Orders', 'wc-vendors' ),
            );
        }

        if ( ! $products_disabled ) {
            $quick_links['product'] = array(
                'url'   => apply_filters( 'wcv_add_product_url', \WCV_Vendor_Dashboard::get_dashboard_page_url( $add_product_link['url_path'] ) ),
                'label' => __( 'Add product', 'wc-vendors' ),
            );

            if ( ! $can_submit ) {
                unset( $quick_links['product'] );
            }
        }

        if ( $lock_edit_products || $lock_new_products || wcv_is_all_product_types_hidden() ) {
            unset( $quick_links['product'] );
        }

        $quick_links['this_month_report'] = array(
            'url'   => add_query_arg( array( 'report-this-month' => 'true' ), \WCV_Vendor_Dashboard::get_dashboard_page_url( 'reports' ) ),
            'label' => __( 'Sales Report: This month', 'wc-vendors' ),
        );

        if ( wcv_is_vendor_shipping_disabled() ) {
            unset( $quick_links['order'] );
        }

        return apply_filters( 'wcv_dashboard_quick_links', $quick_links );
    }

    /**
     * Provide quick links on the dashboard to reduce click through
     *
     * @since    2.5.2
     */
    public function dashboard_quick_links() {

        $quick_links = $this->get_dashboard_quick_links();
        $stats       = apply_filters( 'wcv_dashboard_usage_stats', array() );

        $this->load_dashboard_template(
            'quick-links.php',
            array(
                'quick_links' => $quick_links,
                'stats'       => $stats,
            )
        );
    }

    /**
     * Load dashboard template with backwards compatibility
     *
     * Tries to load template from 'wc-vendors/dashboard/' first (correct path),
     * then falls back to 'wcvendors/dashboard/' (legacy path) for backwards compatibility.
     *
     * @since 2.6.4 - Fix wrong template path for new dashboard.
     *
     * @param string $template_name Template name/file.
     * @param array  $args          Arguments to pass to the template.
     */
    private function load_dashboard_template( $template_name, $args = array() ) {
        $template_path = 'wc-vendors/dashboard/';
        $legacy_path   = 'wcvendors/dashboard/';
        $default_path  = plugin_dir_path( WCV_PLUGIN_FILE ) . 'templates/dashboard/';

        // Check if template exists in theme with new path.
        $template = locate_template( array( trailingslashit( $template_path ) . $template_name ) );

        // Check if template exists in theme with legacy path for backwards compatibility.
        if ( ! $template ) {
            $legacy_template = locate_template( array( trailingslashit( $legacy_path ) . $template_name ) );
            if ( $legacy_template ) {
                $template      = $legacy_template;
                $template_path = $legacy_path;
            }
        }

        // Use WooCommerce template loader with appropriate path.
        wc_get_template(
            $template_name,
            $args,
            $template_path,
            $default_path
        );
    }

    /**
     * Check completed steps
     *
     * @since 2.5.4
     */
    public static function check_completed_steps() {
        $vendor_id               = get_current_user_id();
        $is_allow_submit_product = wc_string_to_bool( get_option( 'wcvendors_capability_products_enabled', 'no' ) );
        $is_disable_product_cap  = wc_string_to_bool( get_option( 'wcvendors_product_management_cap', 'no' ) ) && self::$is_pro_active;
        $is_disbale_settings_cap = wc_string_to_bool( get_option( 'wcvendors_settings_management_cap', 'no' ) ) && self::$is_pro_active;
        $vendor_products         = get_posts(
            array(
                'post_type'      => 'product',
                'posts_per_page' => 1,
                'author'         => $vendor_id,
            )
        );
        $store_banner_id         = get_user_meta( $vendor_id, '_wcv_store_banner_id', true );
        $store_icon              = get_user_meta( $vendor_id, '_wcv_store_icon_id', true );
        $shop_desc               = get_user_meta( $vendor_id, 'pv_shop_description', true );
        $is_connect_to_stripe    = ! empty( get_user_meta( $vendor_id, '_stripe_connect_user_id', true ) ) && class_exists( 'WC_Vendors_Stripe_Connect_Gateway' );
        $is_set_payout_method    = ! empty( get_user_meta( $vendor_id, 'wcv_commission_payout_method', true ) );
        $socials_settings        = array(
            get_user_meta( $vendor_id, '_wcv_twitter_username', true ),
            get_user_meta( $vendor_id, '_wcv_instagram_username', true ),
            get_user_meta( $vendor_id, '_wcv_facebook_url', true ),
            get_user_meta( $vendor_id, '_wcv_linkedin_url', true ),
            get_user_meta( $vendor_id, '_wcv_youtube_url', true ),
            get_user_meta( $vendor_id, '_wcv_pinterest_url', true ),
            get_user_meta( $vendor_id, '_wcv_snapchat_username', true ),
            get_user_meta( $vendor_id, '_wcv_telegram_username', true ),
        );

        $is_product_completed = ! empty( $vendor_products );
        $is_payout_completed  = $is_set_payout_method || $is_connect_to_stripe;
        $is_social_completed  = ! empty( array_filter( $socials_settings ) ) || ! self::$is_pro_active;
        $is_store_completed   = ! empty( $shop_desc );

        if ( self::$is_pro_active ) {
            $is_store_completed = ( ! empty( $store_banner_id ) || ! empty( $store_icon ) ) || $is_store_completed;
        }

        $completed_steps = array(
            'store'    => $is_store_completed || $is_disbale_settings_cap,
            'products' => $is_product_completed || ! $is_allow_submit_product || $is_disable_product_cap,
            'payout'   => $is_payout_completed || $is_disbale_settings_cap,
            'social'   => $is_social_completed || $is_disbale_settings_cap,
        );

        return apply_filters( 'wcvendors_dashboard_completed_steps', $completed_steps );
    }
}
