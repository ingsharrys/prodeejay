<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * WCV_Reports_Cache class.
 */
class WCV_Reports_Cache {

    /**
     * Single instance of this class
     *
     * @var WCV_Reports_Cache
     */
    private static $instance = null;

    /**
     * Table name
     *
     * @var string
     */
    private $table_name;


    /**
     * Get single instance of this class
     *
     * @return WCV_Reports_Cache
     */
    public static function get_instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'wcv_reports_cache';
    }

    /**
     * Prevent cloning of this singleton
     */
    private function __clone() {}

    /**
     * Prevent unserializing of this singleton
     */
    public function __wakeup() {}

    /**
     * Initialize hooks
     */
    public function init_hooks() {
        add_action( 'wcv_pre_cache_reports', array( $this, 'pre_cache_reports' ) );

        // Re-schedule the cache pre-caching event if the cache option is enabled.
        add_action( 'update_option_wcvendors_enable_dashboard_cache', array( $this, 're_schedule_cache_pre_caching' ), 10, 2 );
    }

    /**
     * Schedule cache pre-caching
     */
    public function schedule_cache_pre_caching() {
        $is_cache_enabled = wc_string_to_bool( get_option( 'wcvendors_enable_dashboard_cache', 'yes' ) );

        if ( ! $is_cache_enabled ) {
            if ( wp_next_scheduled( 'wcv_pre_cache_reports' ) ) {
                wp_clear_scheduled_hook( 'wcv_pre_cache_reports' );
            }
            return;
        }

        if ( ! wp_next_scheduled( 'wcv_pre_cache_reports' ) ) {
            $current_hour = (int) current_time( 'G' );
            if ( $current_hour >= 12 ) {
                $timestamp = strtotime( 'tomorrow midnight' );
            } else {
                $timestamp = strtotime( 'today noon' );
            }
            wp_schedule_event( $timestamp, 'twicedaily', 'wcv_pre_cache_reports' );
        }
    }

    /**
     * Re-schedule cache pre-caching
     *
     * @param string $old_value Old value.
     * @param string $new_value New value.
     */
    public function re_schedule_cache_pre_caching( $old_value, $new_value ) {
        if ( 'yes' === $old_value && 'no' === $new_value ) {
            wp_clear_scheduled_hook( 'wcv_pre_cache_reports' );
        } else {
            $this->schedule_cache_pre_caching();
        }
    }

    /**
     * Calculate date in range
     *
     * @param string $start_date Start date.
     * @param string $end_date End date.
     * @return array Date range.
     */
    public function calculate_date_in_range( $start_date, $end_date ) {
        $dates = array();
        $today = gmdate( 'Y-m-d' );

        if ( $end_date === $today ) {
            $end_date = gmdate( 'Y-m-d', strtotime( '-1 day' ) );
        }

        while ( $start_date <= $end_date ) {
            $dates[]    = $start_date;
            $start_date = gmdate( 'Y-m-d', strtotime( '+1 day', strtotime( $start_date ) ) );
        }

        return $dates;
    }


    /**
     * Generate cache key
     *
     * @param string $date Date.
     * @return string Cache key.
     */
    public function generate_cache_key( $date ) {
        return 'wcv_reports_' . $date;
    }

    /**
     * Get cache
     *
     * @param string $start_date Start date.
     * @param string $end_date End date.
     * @param array  $fields Fields.
     * @return string Cache.
     */
    public function get_cache( $start_date, $end_date, $fields ) {
        global $wpdb;

        $today                = gmdate( 'Y-m-d' );
        $should_include_today = false;

        if ( $end_date === $today ) {
            $should_include_today = true;
            $end_date             = gmdate( 'Y-m-d', strtotime( '-1 day' ) );
        }

        $sql = $wpdb->prepare(
            "SELECT report_data, report_date FROM {$wpdb->prefix}wcv_reports_cache WHERE report_date BETWEEN %s AND %s",
            $start_date,
            $end_date
        );

        $cache_data            = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $serialized_cache_data = array();

        foreach ( $cache_data as $cache ) {
            $serialized_cache_data[ $cache->report_date ] = maybe_unserialize( $cache->report_data );
        }

        // Calculate missing dates.
        $cached_dates      = array_keys( $serialized_cache_data );
        $dates             = $this->calculate_date_in_range( $start_date, $end_date );
        $missing_dates     = array_diff( $dates, $cached_dates );
        $report_controller = new WCV_Reports( 0, false );

        foreach ( $missing_dates as $date ) {

            if ( ! isset( $serialized_cache_data[ $date ] ) ) {
                $report_data                    = $this->get_live_data( $report_controller, $date, $fields );
                $serialized_cache_data[ $date ] = $report_data;
                $report_controller->clear_total_commissions_and_revenue_cache();
            }
        }

        if ( $should_include_today ) {
            $serialized_cache_data[ $today ] = $this->get_live_data( $report_controller, $today, $fields );
            $report_controller->clear_total_commissions_and_revenue_cache();
        }

        // Calculate cache hit percentage.
        $cache_hit_percentage = ( count( $cached_dates ) / count( $dates ) ) * 100;

        $formatted_cache_data = array();
        foreach ( $fields as $field ) {
            if ( 'top_vendors' === $field ) {
                $formatted_cache_data[ $field ] = $this->format_top_vendors( array_column( $serialized_cache_data, $field ) );
            } else {
                $formatted_cache_data[ $field ] = array_sum( array_column( $serialized_cache_data, $field ) );
            }
        }

        return array(
            'cache_data' => $formatted_cache_data,
            'cache_hit'  => $cache_hit_percentage,
        );
    }

    /**
     * Get live data for date
     *
     * @since 2.5.8
     *
     * @param WCV_Reports $report_controller Report controller.
     * @param string      $date Date.
     * @param array       $fields Fields.
     * @return array Live data.
     */
    private function get_live_data( $report_controller, $date, $fields ) {

        if ( ! $report_controller || ! is_a( $report_controller, 'WCV_Reports' ) ) {
            $report_controller = new WCV_Reports( 0, false );
        }

        $report_controller->set_period( $date, $date );
        $report_data = array();

        foreach ( $fields as $field ) {
            switch ( $field ) {
                case 'commissions':
                    $report_data['commissions'] = $report_controller->get_total_commissions();
                    break;
                case 'revenue':
                    $report_data['revenue'] = $report_controller->get_total_revenue();
                    break;
                case 'orders':
                    $report_data['orders'] = $report_controller->get_total_orders();
                    break;
                case 'top_vendors':
                    $report_data['top_vendors'] = $report_controller->get_top_vendors();
                    break;
            }
        }

        return $report_data;
    }

    /**
     * Format top vendors
     *
     * @param array $serialized_cache_data Serialized cache data.
     * @return array Formatted top vendors.
     */
    private function format_top_vendors( $serialized_cache_data ) {

        $filtered_serialized_cache_data = array_filter( $serialized_cache_data );

        $top_vendors = array();

        foreach ( $filtered_serialized_cache_data as $row ) {
            foreach ( $row as $value ) {
                $vendor_id = $value->vendor_id;

                if ( ! isset( $top_vendors[ $vendor_id ] ) ) {
                    $top_vendors[ $vendor_id ] = (object) array(
                        'vendor_id'        => $vendor_id,
                        'total_orders'     => 0,
                        'total_commission' => 0,
                        'total_tax'        => 0,
                        'total_shipping'   => 0,
                        'product_ids'      => array(),
                        'order_ids'        => array(),
                        'total_revenue'    => 0,
                        'avatar'           => $value->avatar,
                        'shop_name'        => $value->shop_name,
                    );
                }
                $top_vendors[ $vendor_id ]->total_orders     += $value->total_orders;
                $top_vendors[ $vendor_id ]->total_commission += $value->total_commission;
                $top_vendors[ $vendor_id ]->total_tax        += $value->total_tax;
                $top_vendors[ $vendor_id ]->total_shipping   += $value->total_shipping;
                $top_vendors[ $vendor_id ]->total_revenue    += $value->total_revenue;

            }
        }
        return array_values( $top_vendors );
    }

    /**
     * Set cache
     *
     * @param string $date Date.
     * @param string $cache Cache.
     */
    public function set_cache( $date, $cache ) {
        global $wpdb;
        $wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prefix . 'wcv_reports_cache',
            array(
                'report_key'  => $this->generate_cache_key( $date ),
                'report_data' => $cache,
                'report_date' => $date,
            )
        );
    }

    /**
     * Pre cache for reports
     */
    public function pre_cache_reports() {

        global $wpdb;

        $is_cache_enabled = wc_string_to_bool( get_option( 'wcvendors_enable_dashboard_cache', 'yes' ) );

        if ( ! $is_cache_enabled ) {
            // Truncate the table.
            if ( wp_next_scheduled( 'wcv_pre_cache_reports' ) ) {
                wp_clear_scheduled_hook( 'wcv_pre_cache_reports' );
            }
            return;
        }

        $periods           = $this->get_periods();
        $report_controller = new WCV_Reports( 0, false );
        $today             = gmdate( 'Y-m-d' );

        // Remove today's cache.
        $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "DELETE FROM {$wpdb->prefix}wcv_reports_cache WHERE report_date = %s",
                $today
            )
        );

        // Remove old cache order than 1 year.
        $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "DELETE FROM {$wpdb->prefix}wcv_reports_cache WHERE report_date < %s",
                gmdate( 'Y-m-d', strtotime( '-1 year' ) )
            )
        );

        foreach ( $periods as $period_key => $period_data ) {

            $start_date = $period_data['start_date'];
            $end_date   = $period_data['end_date'];
            $dates      = $this->calculate_date_in_range( $start_date, $end_date );

            $sql = $wpdb->prepare(
                "SELECT report_date FROM {$wpdb->prefix}wcv_reports_cache WHERE report_date BETWEEN %s AND %s",
                $start_date,
                $end_date
            );

            $cached_dates = $wpdb->get_col( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching

            $dates = array_diff( $dates, $cached_dates );
            // Exclude current date from caching.
            $dates = array_diff( $dates, array( $today ) );

            if ( empty( $dates ) ) {
                continue;
            }

            foreach ( $dates as $date ) {
                if ( ! $this->is_cache_exists( $date ) ) {
                    $report_controller->set_period( $date, $date );
                    $report_data = array(
                        'orders'      => $report_controller->get_total_orders(),
                        'revenue'     => $report_controller->get_total_revenue(),
                        'commissions' => $report_controller->get_total_commissions(),
                        'top_vendors' => $report_controller->get_top_vendors(),
                    );

                    $report_controller->clear_total_commissions_and_revenue_cache();

                    $this->set_cache( $date, maybe_serialize( $report_data ) );
                }
            }
        }
    }

    /**
     * Get periods
     *
     * @return array Periods.
     */
    public function get_periods() {
        $yesterday = gmdate( 'Y-m-d', strtotime( '-1 day' ) );
        $periods   = array(
            'last_7_days'   => array(
                'start_date' => gmdate( 'Y-m-d', strtotime( '-7 days' ) ),
                'end_date'   => $yesterday,
            ),
            'last_14_days'  => array(
                'start_date' => gmdate( 'Y-m-d', strtotime( '-14 days' ) ),
                'end_date'   => $yesterday,
            ),
            'last_30_days'  => array(
                'start_date' => gmdate( 'Y-m-d', strtotime( '-30 days' ) ),
                'end_date'   => $yesterday,
            ),
            'last_3_months' => array(
                'start_date' => gmdate( 'Y-m-d', strtotime( '-3 months' ) ),
                'end_date'   => $yesterday,
            ),
            'last_6_months' => array(
                'start_date' => gmdate( 'Y-m-d', strtotime( '-6 months' ) ),
                'end_date'   => $yesterday,
            ),
            'last_year'     => array(
                'start_date' => gmdate( 'Y-m-d', strtotime( '-1 year' ) ),
                'end_date'   => $yesterday,
            ),
        );
        return $periods;
    }

    /**
     * Check if cache exists
     *
     * @param string $date Date.
     * @return bool Cache exists.
     */
    public function is_cache_exists( $date ) {
        global $wpdb;
        $cache = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->prefix}wcv_reports_cache WHERE report_key = %s",
                $this->generate_cache_key( $date )
            )
        );
        return $cache > 0;
    }
}
