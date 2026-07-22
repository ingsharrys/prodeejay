<?php
/**
 * The WCV Reports Controller class
 *
 * This is the reports controller class for all front end reports
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 */

namespace WC_Vendors\Classes\Front;

use function WC_Vendors\Classes\Includes\wcv_validate_date_range;
/**
 * WCV Reports Controller class
 *
 * @version 2.5.2
 * @since   2.5.2
 */
class WCV_Reports_Controller {

    /**
     * Is the plugin base directory
     *
     * @since    2.5.2
     * @var      string $base_dir string path for the plugin directory
     */
    private $base_dir;

    /**
     * Commission due
     *
     * @var double
     * @version 2.5.2
     * @since   2.5.2
     */
    public $commission_due;

    /**
     * Shipping commission due
     *
     * @var double
     * @version 2.5.2
     * @since   2.5.2
     */
    public $commission_shipping_due;

    /**
     * Commission paid
     *
     * @var double
     * @version 2.5.2
     * @since   2.5.2
     */
    public $commission_paid;

    /**
     * Default start date
     *
     * @var string
     * @version 2.5.2
     * @since   2.5.2
     */
    public $default_start;

    /**
     * Vendor orders
     *
     * @var array $orders array of vendor orders
     */
    public $orders;

    /**
     * Shipping commission paid.
     *
     * @var integer
     * @version 2.5.2
     * @since   2.5.2
     */
    public $commission_shipping_paid = 0;

    /**
     * Tax commission due.
     *
     * @var integer
     * @version 2.5.2
     * @since   2.5.2
     */
    public $commission_tax_due = 0;

    /**
     * Commission tax paid.
     *
     * @var integer
     * @version 2.5.2
     * @since   2.5.2
     */
    public $commission_tax_paid = 0;

    /**
     * Total products paid
     *
     * @var integer
     * @version 2.5.2
     * @since   2.5.2
     */
    public $total_products_sold = 0;

    /**
     * Total orders
     *
     * @var integer
     * @version 2.5.2
     * @since   2.5.2
     */
    public $total_orders = 0;

    /**
     * Date format
     *
     * @var string $date_format Date format
     */
    public $date_format = 'Y-m-d';

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.5.2
     */
    public function __construct() {
        $this->base_dir = plugin_dir_path( WCV_PLUGIN_FILE );

        $dashboard_date_range = get_option( 'wcvendors_dashboard_date_range', 'monthly' );
        $this->default_start  = '';
        $this->date_format    = is_wcv_pro_active() ? get_option( 'wcvendors_dashboard_date_format', 'Y-m-d' ) : 'Y-m-d';

        switch ( $dashboard_date_range ) {
            case 'annually':
                $this->default_start = '-1 year';
                break;
            case 'quarterly':
                $this->default_start = '-3 month';
                break;
            case 'monthly':
                $this->default_start = '-1 month';
                break;
            case 'weekly':
                $this->default_start = '-1 week';
                break;
            case 'daily':
                $this->default_start = '-1 day';
                break;
            case 'custom':
                $this->default_start = '-1 year';
                break;
            default:
                $this->default_start = '-1 month';
                break;
        }

        $this->default_start = apply_filters( 'wcv_default_dashboard_start_date', $this->default_start );
    }

    /**
     *  Initialize the reports
     *
     * @since    2.5.2
     */
    public function report_init() {

        $date_range = array(
            'before' => $this->get_end_date(),
            'after'  => $this->get_start_date(),
        );

        $this->orders = WCV_Vendor_Controller::get_orders2( get_current_user_id(), $date_range );

        // Generate the totals required for the overview.
        $this->get_totals();
        $this->get_order_chart_data();
    }

    /**
     *  Process the date range form submission from the front end.
     *
     * @since    2.5.2
     * @version  2.6.6 - Added date range validation.
     */
    public function process_submit() {

        if ( isset( $_GET['report-this-month'] ) && true === wc_string_to_bool( $_GET['report-this-month'] ) ) { // phpcs:ignore
            WC()->session->set( 'wcv_dashboard_start_date', strtotime( 'first day of this month' ) );
            WC()->session->set( 'wcv_dashboard_end_date', strtotime( 'last day of this month' ) );
        }

        if ( ! isset( $_POST['wcv_dashboard_date_update'] ) ) {
            return;
        }

        if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['wcv_dashboard_date_update'] ) ), 'wcv-dashboard-date-update' ) ) {
            return;
        }

        $start_date_input = isset( $_POST['_wcv_dashboard_start_date_input'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_dashboard_start_date_input'] ) ) : '';
        $end_date_input   = isset( $_POST['_wcv_dashboard_end_date_input'] ) ? sanitize_text_field( wp_unslash( $_POST['_wcv_dashboard_end_date_input'] ) ) : '';

        $valid_date_range = wcv_validate_date_range( $start_date_input, $end_date_input );

        if ( is_wp_error( $valid_date_range ) ) {
            wc_add_notice( $valid_date_range->get_error_message(), 'error' );
            return;
        }

        $start_timestamp = $valid_date_range['start'];
        $end_timestamp   = $valid_date_range['end'];

        // Start Date.
        if ( ! is_null( $start_timestamp ) ) {
            WC()->session->set( 'wcv_dashboard_start_date', $start_timestamp );
        } else {
            WC()->session->__unset( 'wcv_dashboard_start_date' );
        }

        // End Date.
        if ( ! is_null( $end_timestamp ) ) {
            WC()->session->set( 'wcv_dashboard_end_date', $end_timestamp );
        } else {
            WC()->session->__unset( 'wcv_dashboard_end_date' );
        }
    }

    /**
     *  Display the dashboard template
     *
     * @since    2.5.2
     */
    public function display() {

        wc_get_template(
            'dashboard.php',
            array(
                'store_report'      => $this,
                'products_disabled' => get_option( 'wcvendors_product_management_cap', 'no' ),
                'orders_disabled'   => get_option( 'wcvendors_order_management_cap', 'no' ),
            ),
            'wc-vendors/dashboard/',
            $this->base_dir . 'templates/dashboard/'
        );
    }

    /**
     *  Get the total sales amount
     *
     * @since    2.5.2
     */
    public function get_filtered_orders() {

        // This filters the array based on the dates provided. This allows date based filtering without re-quering the database.
        return array_filter(
            $this->orders,
            function ( $order ) {
                if ( ! isset( $order->recorded_time ) ) {
                    return false;
                }
                return strtotime( $order->recorded_time ) >= $this->get_start_date() && strtotime( $order->recorded_time ) <= $this->get_end_date();
            }
        );
    }

    /**
     *  Calculate the totals for the reports overview
     *
     * @since    2.5.2
     */
    public function get_totals() {

        $this->commission_due          = 0;
        $this->commission_paid         = 0;
        $this->commission_shipping_due = 0;

        $wcv_orders = $this->get_filtered_orders();

        // Count all orders.
        $this->total_orders = count( $wcv_orders );

        // Create the cumulative totals for commissions and products.
        foreach ( $wcv_orders as $wcv_order ) {

            if ( 'due' === $wcv_order->status ) {
                $this->commission_due          += $wcv_order->total_due;
                $this->commission_shipping_due += $wcv_order->total_shipping;
                $this->commission_tax_due      += $wcv_order->total_tax;
            } elseif ( 'paid' === $wcv_order->status ) {
                $this->commission_paid          += $wcv_order->total_due;
                $this->commission_shipping_paid += $wcv_order->total_shipping;
                $this->commission_tax_paid      += $wcv_order->total_tax;
            }

            $this->total_products_sold += $wcv_order->qty;
        }
    }

    /**
     *  Get the order chart data required for output
     *
     * @since  2.5.2 - Added.
     * @since  2.5.2
     * @return array|null $order_chart_data Order chart data.
     */
    public function get_order_chart_data() {

        $grouped_orders = array();
        $wcv_orders     = $this->get_filtered_orders();

        // Group the orders by date and get total orders for that date.
        foreach ( $wcv_orders as $order ) {

            if ( ! array_key_exists( $order->recorded_time, $grouped_orders ) ) {
                $grouped_orders[ $order->recorded_time ] = array();
            }

            if ( is_array( $grouped_orders[ $order->recorded_time ] ) && ! array_key_exists( 'total', $grouped_orders[ $order->recorded_time ] ) ) {
                $grouped_orders[ $order->recorded_time ] = array( 'total' => 0 );
            }

            $grouped_orders[ $order->recorded_time ]['total'] += 1;
        }

        if ( empty( $grouped_orders ) ) {
            return null;
        }

        // Extract the date labels.
        $labels = wp_json_encode( array_keys( $grouped_orders ) );
        // Extract the totals for each day.
        $data = wp_json_encode( array_values( wp_list_pluck( $grouped_orders, 'total' ) ) );

        $chart_data = array(
            'labels' => $labels,
            'data'   => $data,
        );

        return $chart_data;
    }

    /**
     *  Get the order chart data required for output
     *
     * @since    2.5.2
     * @return   object|array|bool $order_chart_data Array of order chart data.
     */
    public function get_product_chart_data() {

        $grouped_products = array();
        $chart_data       = array();
        $wcv_orders       = $this->get_filtered_orders();

        if ( ! empty( $wcv_orders ) ) {

            // Group the orders by date and get total orders for that date.
            foreach ( $wcv_orders as $order ) {

                // Make sure the order exists before attempting to loop over it.
                if ( ! is_object( $order->order ) ) {
                    continue;
                }

                if ( ! isset( $order->order_items ) || ! is_array( $order->order_items ) ) {
                    continue;
                }

                foreach ( $order->order_items as $item ) {
                    if ( ! array_key_exists( $item['name'], $grouped_products ) ) {
                        $grouped_products[ $item['name'] ] = array();
                    }

                    if ( is_array( $grouped_products[ $item['name'] ] ) && ! array_key_exists( 'total', $grouped_products[ $item['name'] ] ) ) {
                        $grouped_products[ $item['name'] ] = array( 'total' => 0 );
                    }

                    $grouped_products[ $item['name'] ]['total']     += $item['qty'];
                    $grouped_products[ $item['name'] ]['product_id'] = $item['product_id'];

                }
            }

            // create the pie chart data, color and hover are currently randomly generated.
            foreach ( $grouped_products as $label => $product_data ) {
                $random_colors = apply_filters( 'wcv_product_totals_chart_use_random_colors', wc_string_to_bool( get_option( 'wcv_product_totals_chart_use_random_colors', 'no' ) ) );

                if ( $random_colors ) {
                    $fill_min  = apply_filters( 'wcv_product_totals_chart_fill_color_min', 0 );
                    $fill_max  = apply_filters( 'wcv_product_totals_chart_fill_color_max', 0xFFFFFF );
                    $hover_min = apply_filters( 'wcv_product_totals_chart_hover_color_min', 0 );
                    $hover_max = apply_filters( 'wcv_product_totals_chart_hover_color_max', 0xFFFFFF );
                } else {
                    $base_fill_color_number = apply_filters( 'wcv_product_totals_chart_fill_color_base_number', hexdec( str_replace( '#', '', get_option( 'wcv_product_totals_chart_base_fill_color' ) ) ) );

                    $base_hover_color_number = apply_filters( 'wcv_product_totals_chart_hover_color_base_number', hexdec( str_replace( '#', '', get_option( 'wcv_product_totals_chart_base_hover_color' ) ) ) );

                    $fill_max = apply_filters( 'wcv_product_totals_chart_fill_color_min', $base_fill_color_number + apply_filters( 'wcv_product_totals_chart_base_fill_color_plus', 500 ) );
                    $fill_min = apply_filters( 'wcv_product_totals_chart_fill_color_max', $base_fill_color_number - apply_filters( 'wcv_product_totals_chart_base_fill_color_minus', 500 ) );

                    $hover_max = apply_filters( 'wcv_product_totals_chart_hover_color_min', $base_hover_color_number + apply_filters( 'wcv_product_totals_chart_base_hover_color_plus', 500 ) );
                    $hover_min = apply_filters( 'wcv_product_totals_chart_hover_color_max', $base_hover_color_number - apply_filters( 'wcv_product_totals_chart_base_hover_color_minus', 500 ) );
                }

                $chart_data[] = array(
                    'value' => $product_data['total'],
                    'color' => apply_filters(
                        'wcv_product_totals_chart_chart_color_' . $product_data['product_id'],
                        '#' . str_pad( dechex( wp_rand( $fill_min, $fill_max ) ), 6, '0', STR_PAD_LEFT )
                    ),
                    'hover' => apply_filters( 'wcv_product_totals_chart_chart_hover_' . $product_data['product_id'], '#' . str_pad( dechex( wp_rand( $hover_min, $hover_max ) ), 6, '0', STR_PAD_LEFT ) ),
                    'label' => $label,
                );
            }

            if ( empty( $chart_data ) ) {
                return false;
            }
        }

        return wp_json_encode( $chart_data );
    }


    /**
     *  Output the date range form to filter the reports
     *
     * @since   2.5.2
     * @version 1.7.10
     */
    public function date_range_form() {

        $default_end_date   = wp_date( $this->date_format, strtotime( 'now' ) );
        $default_start_date = wp_date( $this->date_format, strtotime( $this->default_start ) );

        // Start Date.
        WCV_Form_Helper::input(
            apply_filters(
                'wcv_dashboard_start_date_input',
                array(
                    'id'                  => '_wcv_dashboard_start_date_input',
                    'label'               => __( 'Start date', 'wc-vendors' ),
                    'class'               => 'wcv-datepicker-dashboard-filter wcv-datepicker wcv-init-picker',
                    'value'               => wp_date( $this->date_format, $this->get_start_date() ),
                    'placeholder'         => 'YYYY-MM-DD',
                    'wrapper_start'       => '<div class="wcv-cols-group wcv-horizontal-gutters wcv-cols-group-narrow"><div class="all-35 tiny-50 small-50 medium-50">',
                    'wrapper_end'         => '</div>',
                    'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                    'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                    'custom_attributes'   => array(
                        'maxlenth'     => '10',
                        'pattern'      => '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',
                        'data-default' => $default_start_date,
                    ),
                )
            )
        );

        // End Date.
        WCV_Form_Helper::input(
            apply_filters(
                'wcv_dashboard_end_date_input',
                array(
                    'id'                  => '_wcv_dashboard_end_date_input',
                    'label'               => __( 'End date', 'wc-vendors' ),
                    'class'               => 'wcv-datepicker-dashboard-filter wcv-datepicker wcv-init-picker',
                    'value'               => wp_date( $this->date_format, $this->get_end_date() ),
                    'placeholder'         => 'YYYY-MM-DD',
                    'wrapper_start'       => '<div class="all-35 tiny-50 small-50 medium-50">',
                    'wrapper_end'         => '</div>',
                    'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                    'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                    'custom_attributes'   => array(
                        'maxlenth'     => '10',
                        'pattern'      => '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',
                        'data-default' => $default_end_date,
                    ),
                )
            )
        );

        // Update Button.
        WCV_Form_Helper::button(
            apply_filters(
                'wcv_dashboard_update_button',
                array(
                    'id'            => 'update_button',
                    'value'         => __( 'Update', 'wc-vendors' ),
                    'class'         => 'wcv-button wcv-inline-flex wcv-button-link-secondary text-blue',
                    'wrapper_start' => '<div class="all-30 medium-100 small-100 tiny-100 wcv-flex wcv-flex-end"><div class="control-group"><label class="wcv_desktop">&nbsp;&nbsp;</label><div class="control">',
                    'wrapper_end'   => '</div></div>',
                    'button_text'   => __( 'Update', 'wc-vendors' ),
                    'before_text'   => wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-round-update' ) . '<span>',
                )
            )
        );

        WCV_Form_Helper::button(
            apply_filters(
                'wcv_order_filter_clear_button',
                array(
                    'id'            => 'clear_button_report',
                    'button_text'   => __( 'Clear', 'wc-vendors' ),
                    'class'         => 'wcv-button wcv-flex wcv-button-link-danger',
                    'type'          => 'submit',
                    'wrapper_start' => '<div class="control-group"><label class="wcv_desktop">&nbsp;&nbsp;</label><div class="control">',
                    'wrapper_end'   => '</div></div></div></div>',
                )
            )
        );

        wp_nonce_field( 'wcv-dashboard-date-update', 'wcv_dashboard_date_update' );
    }

    /**
     * Get dashboard start date.
     *
     * @return array|string
     */
    public function get_start_date() {
        return WC()->session->get( 'wcv_dashboard_start_date', strtotime( apply_filters( 'wcv_dashboard_start_date', $this->default_start ) ) );
    }

    /**
     * Get dashboard end date.
     *
     * @return array|string
     */
    public function get_end_date() {
        return WC()->session->get( 'wcv_dashboard_end_date', strtotime( apply_filters( 'wcv_dashboard_end_date', 'now' ) ) );
    }

    /**
     * Get orders
     */
    public function get_orders() {
        return $this->orders;
    }
}
