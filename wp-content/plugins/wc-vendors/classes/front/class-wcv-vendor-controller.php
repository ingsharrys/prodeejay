<?php
/**
 * The WCV Vendor Controller class.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_key
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_value
 */

namespace WC_Vendors\Classes\Front;

use WCV_Vendors;

/**
 * Class WCV_Vendor_Controller
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
class WCV_Vendor_Controller {

    /**
     * Whether to allow markup.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    private $allow_markup = false;

    /**
     * The orders per page.
     *
     * @since 2.5.7
     *
     * @var int
     */
    public static $orders_per_page;

    /**
     * Constructor
     *
     * @version 2.5.2
     * @since   2.5.2
     */
    public function __construct() {
        $this->allow_markup    = wc_string_to_bool( get_option( 'wcvendors_allow_form_markup', 'no' ) );
        self::$orders_per_page = get_option( 'wcvendors_orders_per_page', 20 );

        if ( empty( self::$orders_per_page ) ) {
            self::$orders_per_page = 20;
        }

        add_action( 'init', array( $this, 'lock_vendor' ) );
        add_filter( 'wcv_sc_stripe_connect_vendor_template', array( $this, 'get_stripe_connect_vendor_template' ), 20 );

        add_filter( 'wcv_commission_table_limit', array( $this, 'fix_commission_table_limit' ) );
    }

    /**
     * Fix commission table limit.
     *
     * @param int $limit The limit.
     * @return int The limit.
     */
    public function fix_commission_table_limit( $limit ) {
        if ( empty( $limit ) ) {
            return 20;
        }

        return $limit;
    }

    /**
     * Get the vendor orders.
     *
     * @param int     $vendor_id The vendor to get orders for.
     * @param array   $args The order query args.
     * @param boolean $pagination Whether to paginate.
     * @return WC_Order_Vendor[] a list of vend orders.
     * @version 2.5.2
     * @since   2.5.2 - Added.
     */
    public static function get_vendor_orders( $vendor_id, $args = array(), $pagination = false ) {
        $show_refunded_orders = wcv_is_show_reversed_order();
        $default_args         = array(
            'wcv_vendor_id' => $vendor_id,
            'type'          => \WC_Order_Vendor::ORDER_TYPE,
            'orderby'       => 'date_created',
            'order'         => 'DESC',
            'status'        => array( 'wc-completed', 'wc-processing' ),
        );

        if ( $pagination ) {
            $default_args['limit'] = self::$orders_per_page;
        }

        if ( $show_refunded_orders ) {
            $default_args['status'][] = 'wc-refunded';
        }

        $args           = wp_parse_args( $args, $default_args );
        $unique_status  = array_unique( $args['status'] );
        $args['status'] = $unique_status;

        $args = apply_filters( 'wcvendors_get_vendor_orders_args', $args, $vendor_id, $args );

        $vendor_orders = wcv_get_vendor_orders( $args );

        return apply_filters( 'wcvendors_get_vendor_orders', $vendor_orders, $args );
    }

    /**
     *  Get all orders for a vendor
     *
     * @version 2.5.2
     * @since   2.5.2
     *
     * @param int     $vendor_id  vendor id for store id.
     * @param array   $date_range date range to search for.
     * @param boolean $reports Whether to show reports.
     * @param boolean $pagination Whether to paginate.
     * @param boolean $return_all Whether to return all orders.
     *
     * @return     array        $wcv_orders an array of order objects with required information for the vendor
     */
    public static function get_orders2( $vendor_id, $date_range = null, $reports = true, $pagination = false, $return_all = false ) {
        global $wpdb;

        $remove_zero_commission_due = apply_filters( 'wcv_remove_zero_commission_due', false );
        $paged                      = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
        $filter_by_status           = WC()->session->get( 'wcv_order_filter_status', '' );
        $wcv_order_statuses         = array_keys( wcv_get_order_statuses() );
        $order_statuses             = $filter_by_status ? $filter_by_status : $wcv_order_statuses;

        if ( $return_all ) {
            $order_statuses = $wcv_order_statuses;
        }

        if ( ! $remove_zero_commission_due ) {
            $args['status'][] = 'refunded';
        }

        if ( ! $reports ) {
            if ( isset( $order_statuses['wc-refunded'] ) ) {
                unset( $order_statuses['wc-refunded'] );
            }
        }

        $args = array(
            'orderby' => 'date_created',
            'order'   => 'DESC',
            'type'    => \WC_Order_Vendor::ORDER_TYPE,
            'status'  => $order_statuses,
        );

        if ( $pagination ) {
            $args['limit'] = self::$orders_per_page;
        }

        $date_after  = gmdate( 'Y-m-d', strtotime( '-1 month' ) );
        $date_before = gmdate( 'Y-m-d' );

        if ( $date_range ) {
            if ( is_numeric( $date_range['before'] ) ) {
                $date_range['before'] = $date_range['before'] + DAY_IN_SECONDS;
                $date_before          = gmdate( 'Y-m-d', $date_range['before'] );
            }

            if ( is_numeric( $date_range['after'] ) ) {
                $date_after = gmdate( 'Y-m-d', $date_range['after'] );
            }

            $args['date_created'] = "{$date_range['after']}...{$date_range['before']}";
        }

        $is_cot_enabled = wcv_cot_enabled();
        $table_prefix   = $is_cot_enabled ? 'wc_orders' : 'posts';
        $date_column    = $is_cot_enabled ? 'date_created_gmt' : 'post_date';
        $id_column      = $is_cot_enabled ? 'id' : 'ID';
        $type_column    = $is_cot_enabled ? 'type' : 'post_type';
        $status_column  = $is_cot_enabled ? 'status' : 'post_status';
        $statuses_str   = implode( "','", $order_statuses );
        // phpcs:disable
        $query          = $wpdb->prepare(
            "SELECT orders.$id_column FROM {$wpdb->prefix}{$table_prefix} orders
            INNER JOIN (
                SELECT DISTINCT order_id
                FROM {$wpdb->prefix}pv_commission
                WHERE vendor_id = %d
                AND DATE(time) BETWEEN %s AND %s
            ) commissions ON orders.$id_column = commissions.order_id
            WHERE orders.$type_column = %s
            AND orders.$status_column IN ('$statuses_str')
            AND (DATE(orders.$date_column) BETWEEN %s AND %s)",
            $vendor_id,
            $date_after,
            $date_before,
            'shop_order',
            $date_after,
            $date_before
        );
        // phpcs:enable

        $all_vendor_order_ids = array_column( $wpdb->get_results( $query, ARRAY_A ), $id_column ); //phpcs:ignore
        $all_vendor_order_ids = apply_filters( 'wcvendors_get_orders2_vendor_orders_ids', $all_vendor_order_ids, $vendor_id, $args );

        if ( $pagination ) {
            $max_pages = ceil( count( $all_vendor_order_ids ) / self::$orders_per_page );
            $paged     = min( $paged, $max_pages );
            $offset    = ( $paged - 1 ) * self::$orders_per_page;

            $args['limit'] = self::$orders_per_page;
            if ( count( $all_vendor_order_ids ) > self::$orders_per_page ) {
                $args['offset'] = $offset;
            }

            if ( $return_all ) {
                $args['limit'] = -1;
                unset( $args['offset'] );
            }
        }

        $all_orders   = self::get_vendor_orders( $vendor_id, $args );
        $all_orders   = apply_filters( 'wcvendors_get_orders2_vendor_orders', $all_orders, $vendor_id, $args );
        $total_orders = $all_orders ? self::format_order_details( $all_orders ) : array();

        if ( $pagination ) {
            return array(
                'all_order_ids'     => array_unique( $all_vendor_order_ids ),
                'total_orders'      => $total_orders,
                'max_pages'         => $max_pages ?? 1,
                'total_order_count' => count( $all_vendor_order_ids ),
            );
        }

        return apply_filters( 'wcvendors_get_vendor_orders', $total_orders );
    }


    /**
     * Format the order details
     *
     * @param array $orders The list of orders.
     * @param int   $vendor_id The vendor id.
     * @return array
     * @version 2.5.2
     * @since   2.5.2
     */
    public static function format_order_details( $orders, $vendor_id = 0 ) {
        global $wpdb;
        $table_name = esc_sql( $wpdb->prefix . 'pv_commission' );

        $total_orders = array();
        $vendor_id    = $vendor_id ? $vendor_id : get_current_user_id();
        $parent_ids   = array_unique( array_map( fn( $order ) => $order->get_parent_id(), $orders ) );

        if ( empty( $parent_ids ) ) {
            return $total_orders;
        }

        $placeholders      = implode( ',', array_fill( 0, count( $parent_ids ), '%d' ) );
        $params            = array_merge( $parent_ids, array( $vendor_id ) );
        $commission_orders = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE order_id IN ($placeholders) AND vendor_id = %d", // phpcs:ignore
                $params
            )
        );

        $commission_map = array_reduce(
            $commission_orders,
            function ( $acc, $item ) {
            $acc[ $item->order_id ][ $item->product_id ] = $item;
            return $acc;
            },
            array()
        );

        foreach ( $orders as $order ) {
            if ( ! is_a( $order, 'WC_Order' ) && ! is_a( $order, 'WC_Order_Vendor' ) ) {
                $order = wcv_get_order( $order->order_id );
            }

            if ( ! $order || $order->get_status() === 'trash' ) {
                continue;
            }

            $parent_order = $order->get_parent_order();
            if ( ! $parent_order ) {
                continue;
            }

            $wcv_order                      = new \stdClass();
            $wcv_order->order_id            = $order->get_parent_id();
            $wcv_order->order               = $order;
            $wcv_order->product_commissions = array();
            $wcv_order->order_items         = array();
            $wcv_order->product_commissions = array();
            $wcv_order->order_items         = array();

            $wcv_order->total            = 0;
            $wcv_order->commission_total = 0;
            $wcv_order->product_total    = 0;
            $wcv_order->total_due        = 0;
            $wcv_order->qty              = 0;
            $wcv_order->total_tax        = 0;
            $wcv_order->total_shipping   = 0;

            $vendor_products = $commission_map[ $wcv_order->order_id ] ?? array();

            $vendor_products            = $commission_map[ $wcv_order->order_id ] ?? array();
            $wcv_order->vendor_products = array_values( $vendor_products );

            foreach ( $vendor_products as $vendor_product ) {
                $wcv_order->total_due      += $vendor_product->total_due;
                $wcv_order->total_tax      += $vendor_product->tax;
                $wcv_order->qty            += $vendor_product->qty;
                $wcv_order->total_shipping += $vendor_product->total_shipping;
                $wcv_order->status          = $vendor_product->status;
                $wcv_order->recorded_time   = gmdate( 'Y-m-d', strtotime( $vendor_product->time ) );

                foreach ( $parent_order->get_items() as $order_item ) {
                    $item_product_id = $order_item->get_variation_id() ? $order_item->get_variation_id() : $order_item->get_product_id();

                    if ( (int) $item_product_id !== (int) $vendor_product->product_id ) {
                        continue;
                    }

                    $wcv_order->product_commissions[ $item_product_id ] = $vendor_product->total_due;
                    $wcv_order->order_items[ $item_product_id ]         = $order_item;
                    $wcv_order->product_total                          += $order_item->get_total();
                }
            }

            $wcv_order->total            = $wcv_order->product_total + $wcv_order->total_shipping + $wcv_order->total_tax;
            $wcv_order->commission_total = $wcv_order->total_due + $wcv_order->total_shipping + $wcv_order->total_tax;

            $total_orders[] = $wcv_order;
        }

        return $total_orders;
    }

    /**
     *  Get the vendors products by id only
     *
     * @since    2.2.5
     *
     * @param     int   $vendor_id vendor id for store id.
     * @param     array $args the product args.
     *
     * @return     array        $product_ids  All the vendors product ids, no matter their post status.
     */
    public static function get_products_by_id( $vendor_id, $args = array() ) {

        $args = wp_parse_args(
            $args,
            array(
                'numberposts' => -1,
                'post_type'   => 'product',
                'author'      => $vendor_id,
                'post_status' => 'any',
                'fields'      => 'ids',
            )
        );

        $args        = apply_filters( 'wcv_get_vendor_products_by_id_args', $args ); //phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        $product_ids = get_posts( $args );

        return $product_ids;
    }

    /**
     * Check for unique store name
     */
    public static function json_unique_store_name() {

        ob_start();

        check_ajax_referer( 'wcv-unique-store-name', 'security' );

        $store_name = isset( $_POST['store_name'] ) ? (string) sanitize_text_field( wp_unslash( $_POST['store_name'] ) ) : '';
        $vendor_id  = get_current_user_id();

        if ( empty( $store_name ) ) {
            die();
        }

        // Check if the Shop name is unique.
        $users = get_users(
            array(
                'meta_key'   => 'pv_shop_slug', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
                'meta_value' => isset( $_POST['store_name'] ) ? sanitize_title( sanitize_text_field( wp_unslash( $_POST['store_name'] ) ) ) : '', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
            )
        );

        if ( ! empty( $users ) && (int) $users[0]->ID !== (int) $vendor_id ) {
            wp_send_json( array( 'error' => __( 'Your store name must be unique', 'wc-vendors' ) ) );
        } else {
            wp_send_json( array( 'store_name' => $store_name ) );
        }
    }


    /**
     *  Process the store settings submission from the front end, this applies to vendor dashboard and vendor application.
     *
     * @version 1.7.9
     * @since   1.2.0
     */
    public function process_submit() {

        if ( ! isset( $_POST['_wcv-save_store_settings'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wcv-save_store_settings'] ) ), 'wcv-save_store_settings' ) || ! is_user_logged_in() ) {
            return;
        }

        $vendor_status = '';
        $notice_text   = '';
        $vendor_id     = get_current_user_id();

        $settings_store = ( isset( $_POST['_wcv_vendor_application_id'] ) ) ? (array) get_option( 'wcvendors_hide_signup_store', 'no' ) : (array) get_option( 'wcvendors_hide_settings_store', 'no' );

        // Check if the Shop name is unique.
        $users = get_users(
            array(
                'meta_key'   => 'pv_shop_slug', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
                'meta_value' => isset( $_POST['_wcv_store_name'] ) ? sanitize_title( wp_unslash( $_POST['_wcv_store_name'] ) ) : '', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
            )
        );

        if ( ! empty( $users ) && (int) $users[0]->ID !== (int) $vendor_id ) {
            wc_add_notice( __( 'That store name is already taken. Your store name must be unique. <br /> Settings have not been saved.', 'wc-vendors' ), 'error' );

            return;
        }

        wc_add_notice( __( 'Store Settings Saved', 'wc-vendors' ), 'success' );

        // Maybe server side validation.
        $vendor_first_name = isset( $_POST['_wcv_vendor_first_name'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_vendor_first_name'] ) ) : '';
        $vendor_last_name  = isset( $_POST['_wcv_vendor_last_name'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_vendor_last_name'] ) ) : '';

        $paypal_address    = isset( $_POST['_wcv_paypal_address'] ) ? sanitize_email( wp_unslash( $_POST['_wcv_paypal_address'] ) ) : '';
        $store_name        = isset( $_POST['_wcv_store_name'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['_wcv_store_name'] ) ) ) : '';
        $store_phone       = isset( $_POST['_wcv_store_phone'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['_wcv_store_phone'] ) ) ) : '';
        $store_phone_code  = isset( $_POST['_wcv_store_phone_code'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['_wcv_store_phone_code'] ) ) ) : '';
        $seller_info       = isset( $_POST['pv_seller_info'] ) ? trim( wp_kses_post( wp_unslash( $_POST['pv_seller_info'] ) ) ) : '';
        $store_description = isset( $_POST['pv_shop_description'] ) ? trim( wp_kses_post( wp_unslash( $_POST['pv_shop_description'] ) ) ) : '';
        $address1          = isset( $_POST['_wcv_store_address1'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_store_address1'] ) ) : '';
        $address2          = isset( $_POST['_wcv_store_address2'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_store_address2'] ) ) : '';
        $city              = isset( $_POST['_wcv_store_city'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_store_city'] ) ) : '';
        $state             = isset( $_POST['_wcv_store_state'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_store_state'] ) ) : '';
        $country           = isset( $_POST['_wcv_store_country'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_store_country'] ) ) : '';
        $postcode          = isset( $_POST['_wcv_store_postcode'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_store_postcode'] ) ) : '';
        $company_url       = isset( $_POST['_wcv_company_url'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_company_url'] ) ) : '';
        // Preferred Payout Method.
        $preferred_payout_method = isset( $_POST['wcv_commission_payout_method'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_commission_payout_method'] ) ) : '';

        // PayPal Payouts Fields.
        $paypal_payout = isset( $_POST['wcv_paypal_masspay_wallet'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_paypal_masspay_wallet'] ) ) : '';
        $paypal_venmo  = isset( $_POST['wcv_paypal_masspay_venmo_id'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_paypal_masspay_venmo_id'] ) ) : '';

        // Bank fields.
        $wcv_bank_account_name   = isset( $_POST['wcv_bank_account_name'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_bank_account_name'] ) ) : '';
        $wcv_bank_account_number = isset( $_POST['wcv_bank_account_number'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_bank_account_number'] ) ) : '';
        $wcv_bank_name           = isset( $_POST['wcv_bank_name'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_bank_name'] ) ) : '';
        $wcv_bank_routing_number = isset( $_POST['wcv_bank_routing_number'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_bank_routing_number'] ) ) : '';
        $wcv_bank_iban           = isset( $_POST['wcv_bank_iban'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_bank_iban'] ) ) : '';
        $wcv_bank_bic_swift      = isset( $_POST['wcv_bank_bic_swift'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_bank_bic_swift'] ) ) : '';

        do_action( 'wcvendors_before_store_settings_saved', $vendor_id );

        if ( isset( $vendor_first_name ) && '' !== $vendor_first_name ) {
            update_user_meta( $vendor_id, 'first_name', $vendor_first_name );
        }

        if ( isset( $vendor_last_name ) && '' !== $vendor_last_name ) {
            update_user_meta( $vendor_id, 'last_name', $vendor_last_name );
        }

        // Save free user meta.
        update_user_meta( $vendor_id, 'pv_paypal', $paypal_address );
        update_user_meta( $vendor_id, 'pv_shop_name', $store_name );
        update_user_meta( $vendor_id, 'pv_shop_slug', sanitize_title( $store_name ) );

        // Preferred payout method.
        update_user_meta( $vendor_id, 'wcv_commission_payout_method', $preferred_payout_method );

        // PayPal Payout Web.
        update_user_meta( $vendor_id, 'wcv_paypal_masspay_wallet', $paypal_payout );
        update_user_meta( $vendor_id, 'wcv_paypal_masspay_venmo_id', $paypal_venmo );

        // Bank details.
        update_user_meta( $vendor_id, 'wcv_bank_account_name', $wcv_bank_account_name );
        update_user_meta( $vendor_id, 'wcv_bank_account_number', $wcv_bank_account_number );
        update_user_meta( $vendor_id, 'wcv_bank_name', $wcv_bank_name );
        update_user_meta( $vendor_id, 'wcv_bank_routing_number', $wcv_bank_routing_number );
        update_user_meta( $vendor_id, 'wcv_bank_iban', $wcv_bank_iban );
        update_user_meta( $vendor_id, 'wcv_bank_bic_swift', $wcv_bank_bic_swift );

        $allow_shop_desc_html = wc_string_to_bool( get_option( 'wcvendors_display_shop_description_html', 'no' ) );
        // Store description.
        if ( isset( $store_description ) && '' !== $store_description ) {
            $striped_store_description = $allow_shop_desc_html ? wp_kses( $store_description, wcv_allowed_html_tags() ) : wp_strip_all_tags( $store_description );
            update_user_meta( $vendor_id, 'pv_shop_description', $striped_store_description );
        } else {
            delete_user_meta( $vendor_id, 'pv_shop_description' );
        }

        // Seller info.
        if ( isset( $seller_info ) && '' !== $seller_info ) {
            $striped_seller_info = $this->allow_markup ? wp_kses( $seller_info, wcv_allowed_html_tags() ) : wp_strip_all_tags( $seller_info );
            update_user_meta( $vendor_id, 'pv_seller_info', $striped_seller_info );
        } else {
            delete_user_meta( $vendor_id, 'pv_seller_info' );
        }

        // Store Address1.
        if ( isset( $address1 ) && '' !== $address1 ) {
            update_user_meta( $vendor_id, '_wcv_store_address1', $address1 );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_address1' );
        }

        // Store Address2.
        if ( isset( $address2 ) && '' !== $address2 ) {
            update_user_meta( $vendor_id, '_wcv_store_address2', $address2 );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_address2' );
        }
        // Store City.
        if ( isset( $city ) && '' !== $city ) {
            update_user_meta( $vendor_id, '_wcv_store_city', $city );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_city' );
        }
        // Store State.
        if ( isset( $state ) && '' !== $state ) {
            update_user_meta( $vendor_id, '_wcv_store_state', $state );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_state' );
        }
        // Store Country.
        if ( isset( $country ) && '' !== $country ) {
            update_user_meta( $vendor_id, '_wcv_store_country', $country );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_country' );
        }
        // Store post code.
        if ( isset( $postcode ) && '' !== $postcode ) {
            update_user_meta( $vendor_id, '_wcv_store_postcode', $postcode );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_postcode' );
        }
        // Store Phone.
        if ( isset( $store_phone ) && '' !== $store_phone ) {
            update_user_meta( $vendor_id, '_wcv_store_phone', $store_phone );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_phone' );
        }

        if ( ! empty( $store_phone_code ) ) {
            update_user_meta( $vendor_id, '_wcv_store_phone_code', $store_phone_code );
        } else {
            delete_user_meta( $vendor_id, '_wcv_store_phone_code' );
        }

        // Company URL.
        if ( isset( $company_url ) && '' !== $company_url ) {
            update_user_meta( $vendor_id, '_wcv_company_url', $company_url );
        } else {
            delete_user_meta( $vendor_id, '_wcv_company_url' );
        }

        // To be used to allow hidden custom meta keys.
        $wcv_hidden_custom_metas = array_intersect_key( $_POST, array_flip( preg_grep( '/^_wcv_custom_settings_/', array_keys( $_POST ) ) ) );

        if ( ! empty( $wcv_hidden_custom_metas ) ) {

            foreach ( $wcv_hidden_custom_metas as $key => $value ) {
                update_user_meta( $vendor_id, sanitize_key( $key ), sanitize_text_field( wp_unslash( $value ) ) );
            }
        }

        // To be used to allow custom meta keys.
        $wcv_custom_metas = array_intersect_key( $_POST, array_flip( preg_grep( '/^wcv_custom_settings_/', array_keys( $_POST ) ) ) );

        if ( ! empty( $wcv_custom_metas ) ) {

            foreach ( $wcv_custom_metas as $key => $value ) {
                update_user_meta( $vendor_id, sanitize_key( $key ), sanitize_text_field( wp_unslash( $value ) ) );
            }
        }
        wcv_deprecated_action( 'wcvendors_pro_store_settings_saved', '2.5.2', 'wcvendors_store_settings_saved', $vendor_id );
    }

    /**
     * Lock vendor from wp-admin
     *
     * @version 2.5.2
     * @since  2.5.2
     */
    public function lock_vendor() {
        if ( wp_doing_ajax() ) {
            return;
        }
        $is_allow_access = get_option( 'wcvendors_vendor_can_access_wp_admin', 'no' );
        // Backward compatibility with old settings.
        if ( 'yes' === get_option( 'wcvendors_disable_wp_admin_vendors', 'no' ) ) {
            $is_allow_access = 'yes';
        }

        $user         = wp_get_current_user();
        $user_roles   = $user->roles;
        $vendor_roles = apply_filters( 'wcvendors_vendor_roles', array( 'vendor', 'pending_vendor' ) );

        foreach ( $user_roles as $role ) {
            if ( in_array( $role, $vendor_roles, true ) && 'no' === $is_allow_access ) {
                add_action( 'admin_init', array( $this, 'redirect_to_dashboard' ) );
                // break the loop.
                break;
            }
        }
    }

    /**
     * Redirect to dashboard
     *
     * @version 2.5.2
     * @since  2.5.2
     */
    public function redirect_to_dashboard() {
        $redirect_page = apply_filters( 'wcv_admin_lockout_redirect_url', get_permalink( get_option( 'woocommerce_myaccount_page_id' ) ) ); //phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        wp_safe_redirect( $redirect_page );
        exit;
    }

    /**
     * Get vendor categories
     *
     * @param int $vendor_id the vendor id to get categories for.
     * @since  2.5.2
     * @access public
     */
    public static function get_categories( $vendor_id ) {

        $vendor_categories = array();

        $vendor_products = get_posts(
            array(
                'author'      => $vendor_id,
                'post_type'   => 'product',
                'numberposts' => -1,
            )
        );

        foreach ( $vendor_products as $vendor_product ) {
            $terms = get_the_terms( $vendor_product->ID, 'product_cat' );
            if ( ! empty( $terms ) ) {

                foreach ( $terms as $category ) {

                    if ( ! empty( $vendor_categories ) && isset( $vendor_categories[ $category->term_id ] ) ) {

                        $vendor_categories[ $category->term_id ]['count'] = $vendor_categories[ $category->term_id ]['count'] + 1;

                    } else {

                        $vendor_categories[ $category->term_id ]['count'] = 1;
                    }

                    $vendor_categories[ $category->term_id ]['term'] = $category;
                }
            }
        }

        return $vendor_categories;
    }

    /**
     * Redirect vendor logins to the specified page
     *
     * @param string  $redirect_to the url to redirect to.
     * @param WP_User $user the user object.
     *
     * @since 2.5.2
     */
    public function vendor_login_redirect( $redirect_to, $user ) {

        $vendor_redirect   = apply_filters( 'wcv_vendor_login_redirect', 'dashboard' ); //phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        $dashboard_page_id = get_option( 'wcvendors_vendor_dashboard_page_id', '' );

        if ( \WCV_Vendors::is_vendor( $user->ID ) && 'dashboard' === $vendor_redirect ) {
            $redirect_to = apply_filters( 'wcv_vendor_login_redirect_url', get_permalink( $dashboard_page_id ), $dashboard_page_id, null ); //phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        }

        return $redirect_to;
    }

    /**
     * Get the stripe connect vendor template to control the stripe connect vendor template
     *
     * @param string $template the template to use.
     *
     * @since 2.5.4
     */
    public function get_stripe_connect_vendor_template( $template ) {
        $template = WCV_TEMPLATE_BASE . 'dashboard/settings/stripe-connect.php';
        return $template;
    }

    /**
     * Ajax function to dismiss store setup step section and hide it
     *
     * @since 2.5.4
     * @version 2.5.4
     */
    public function dismiss_store_setup_step_section() {
        $nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
        if ( ! wp_verify_nonce( $nonce, 'wcv_dashboard' ) ) {
            wp_send_json_error( array( 'message' => __( 'Invalid nonce', 'wc-vendors' ) ) );
        }

        $user_id = get_current_user_id();

        if ( ! $user_id ) {
            wp_send_json_error( array( 'message' => __( 'Invalid user', 'wc-vendors' ) ) );
        }

        if ( ! WCV_Vendors::is_vendor( $user_id ) ) {
            wp_send_json_error( array( 'message' => __( 'Invalid vendor', 'wc-vendors' ) ) );
        }

        $is_dismissed = wc_string_to_bool( get_user_meta( $user_id, 'wcv_store_setup_dismissed_step', true ) );

        if ( ! $is_dismissed ) {
            update_user_meta( $user_id, 'wcv_store_setup_dismissed_step', 'yes' );
        }

        wp_send_json_success( array( 'message' => __( 'Store setup step section dismissed', 'wc-vendors' ) ) );
    }
}
