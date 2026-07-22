<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Model that houses the Notices module logic.
 * Public Model.
 *
 * @since 2.5.0
 */
class Usage {

    const WCV_USAGE          = 'wcv_usage';
    const USAGE_CRON_ACTION  = 'wcvendors_usage_checkin';
    const USAGE_CRON_CONFIG  = 'wcvendors_usage_checkin_config';
    const USAGE_LAST_CHECKIN = 'wcvendors_usage_last_checkin';
    const USAGE_ALLOW        = 'wcvendors_allow_tracking';

    /**
     * Constructor
     *
     * @since 2.5.0
     * @access public
     */
    public function __construct() {
        add_action( 'init', array( $this, 'run' ) );
    }

    /**
     * Gather the tracking data together
     *
     * @since 2.5.0
     * @access public
     */
    private function _get_data() {
        $data = array();

        // Plugin data.
        $this->_append_plugins_data( $data );

        // Settings data.
        $this->_append_settings_data( $data );

        // Server environment data.
        $this->_append_environment_data( $data );

        // Effectiveness data.
        $data['effectiveness'] = $this->_get_effectiveness_data();

        return $data;
    }

    /**
     * Append versions and license data for all WCV related plugins.
     *
     * @since 2.5.0
     * @access private
     *
     * @param array $data Usage data.
     */
    private function _append_plugins_data( &$data ) {

        $data = wp_parse_args(
            $data,
            array(
                'wcvf_version'         => WCV_VERSION,
                'wcvp_version'         => '',
                'wcv_sc_version'       => '',
                'wcv_wcb_version'      => '',
                'wcv_wcsa_version'     => '',
                'wcv_wcm_version'      => '',
                'wcv_wcs_version'      => '',
                'wcvp'                 => is_plugin_active( 'wc-vendors-pro/wcvendors-pro.php' ),
                'wcv_sc'               => is_plugin_active( 'wc-vendors-gateway-stripe-connect/wc-vendors-gateway-stripe-connect.php' ),
                'wcv_wcb'              => is_plugin_active( 'wc-vendors-woocommerce-bookings/wcv-woocommerce-bookings.php' ),
                'wcv_wcsa'             => is_plugin_active( 'wc-vendors-pro-simple-auctions/class-wcv-simple-auctions.php' ),
                'wcv_wcm'              => is_plugin_active( 'wc-vendors-membership/wc-vendors-membership.php' ),
                'wcv_wcs'              => is_plugin_active( 'wc-vendors-woocommerce-subscriptions/wcv-wc-subscriptions.php' ),
                'wcvp_license_key'     => '',
                'wcv_sc_license_key'   => '',
                'wcv_wcb_license_key'  => '',
                'wcv_wcsa_license_key' => '',
                'wcv_wcm_license_key'  => '',
                'wcv_wcs_license_key'  => '',
            )
        );

        if ( $data['wcvp'] ) {
        $license_data = get_option( 'wc-vendors-pro_license_manager', array() );
            if ( isset( $license_data['license_key'] ) ) {
                $data['wcvp_license_key'] = $license_data['license_key'];
                $data['wcvp_version']     = defined( 'WCV_PRO_VERSION' ) ? WCV_PRO_VERSION : $license_data['current_version'];
            }
        }

        if ( $data['wcv_sc'] ) {
            $license_data = get_option( 'wc-vendors-gateway-stripe-connect_license_manager', array() );
            if ( isset( $license_data['license_key'] ) ) {
                $data['wcv_sc_license_key'] = $license_data['license_key'];
                $data['wcv_sc_version']     = defined( 'WCV_SC_VERSION' ) ? WCV_SC_VERSION : $license_data['current_version'];
            }
        }

        if ( $data['wcv_wcs'] ) {
            $license_data = get_option( 'wcv-wc-subscriptions_license_manager', array() );
            if ( isset( $license_data['license_key'] ) ) {
                $data['wcv_wcslicense_key'] = $license_data['license_key'];
                $data['wcv_wcs_version']    = defined( 'WCV_WCS_VERSION' ) ? WCV_WCS_VERSION : $license_data['current_version'];
            }
        }

        if ( $data['wcv_wcm'] ) {
            $license_data = get_option( 'wc-vendors-membership_license_manager', array() );
            if ( isset( $license_data['license_key'] ) ) {
                $data['wcv_wcm_license_key'] = $license_data['license_key'];
                $data['wcv_wcm_version']     = defined( 'WCV_WCM_VERSION' ) ? WCV_WCM_VERSION : $license_data['current_version'];
            }
        }

        if ( $data['wcv_wcsa'] ) {
            $license_data = get_option( 'wcvendors-pro-simpleauctions_license_manager', array() );
            if ( isset( $license_data['license_key'] ) ) {
                $data['wcv_wcsa_license_key'] = $license_data['license_key'];
                $data['wcv_wcsa_version']     = defined( 'WCV_WCSA_VERSION' ) ? WCV_SA_VERSION : $license_data['current_version'];
            }
        }

        if ( $data['wcv_wcb'] ) {
            $license_data = get_option( 'wc-vendors-woocommerce-bookings_license_manager', array() );
            if ( isset( $license_data['license_key'] ) ) {
                $data['wcv_wcb_license_key'] = $license_data['license_key'];
                $data['wcv_wcb_version']     = defined( 'WCV_WCB_VERSION' ) ? WCV_WCB_VERSION : $license_data['current_version'];
            }
        }
    }

    /**
     * Append settings data.
     *
     * @since 2.5.0
     * @access private
     *
     * @param array $data Usage data.
     */
    private function _append_settings_data( &$data ) {
        global $wpdb;

        $data['settings'] = array();

        $results = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            "SELECT option_name, option_value FROM {$wpdb->options}
            WHERE (`option_name` LIKE '%wcv%' OR `option_name` LIKE '%wcvendors%') 
            AND `option_name` NOT LIKE '%_license_manager%'
            AND `option_name` NOT LIKE '%widget_wcv%'
            AND `option_name` NOT LIKE '%transient_%'
            "
        );

        foreach ( $results as $row ) {
            $data['settings'][ $row->option_name ] = maybe_unserialize( $row->option_value );
        }
    }

    /**
     * Append server environment data.
     *
     * @since 2.5.0
     * @access private
     *
     * @param array $data Usage data.
     */
    private function _append_environment_data( &$data ) {
        // Get current theme info.
        $theme_data = wp_get_theme();

        // Get multisite data.
        $count_blogs = 1;
        if ( is_multisite() ) {
            if ( function_exists( 'get_blog_count' ) ) {
                $count_blogs = get_blog_count();
            } else {
                $count_blogs = 'Not Set';
            }
        }

        $data['url']               = home_url();
        $data['php_version']       = phpversion();
        $data['wp_version']        = get_bloginfo( 'version' );
        $data['wc_version']        = \WC()->version;
        $data['server']            = isset( $_SERVER['SERVER_SOFTWARE'] ) ? $_SERVER['SERVER_SOFTWARE'] : ''; // phpcs:ignore
        $data['multisite']         = is_multisite();
        $data['sites']             = $count_blogs;
        $data['usercount']         = function_exists( 'count_users' ) ? count_users() : 'Not Set';
        $data['themename']         = $theme_data->Name;
        $data['themeversion']      = $theme_data->Version;
        $data['admin_email']       = get_bloginfo( 'admin_email' );
        $data['usagetracking']     = get_option( self::USAGE_ALLOW, 'no' );
        $data['timezoneoffset']    = wp_timezone_string();
        $data['locale']            = get_locale();
        $data['active_plugins']    = $this->_get_active_plugins_data();
        $data['is_hpos_enabled']   = 'yes' === get_option( 'woocommerce_feature_custom_order_tables_enabled' );
        $data['is_cart_block']     = has_block( 'woocommerce/cart', wc_get_page_id( 'cart' ) );
        $data['is_checkout_block'] = has_block( 'woocommerce/checkout', wc_get_page_id( 'checkout' ) );
    }

    /**
     * Get site's list of active plugins.
     *
     * @since 2.5.0
     * @access private
     *
     * @return array List of active plugins.
     */
    private function _get_active_plugins_data() {
        $active_plugins         = get_option( 'active_plugins', array() );
        $network_active_plugins = array_keys( get_site_option( 'active_sitewide_plugins', array() ) );

        return array_unique( array_merge( $active_plugins, $network_active_plugins ) );
    }

    /**
     * Append effectiveness data.
     *
     * @since 2.5.0
     * @access private
     *
     * @return array Effectiveness data.
     */
    private function _get_effectiveness_data() {
        $timezone     = new DateTimeZone( wp_timezone_string() ); // Get the WordPress timezone.
        $start_period = ( new DateTime( 'monday last week', $timezone ) )->setTime( 0, 0, 0 )->format( 'Y-m-d H:i:s' );
        $end_period   = ( new DateTime( 'sunday last week', $timezone ) )->setTime( 23, 59, 59 )->format( 'Y-m-d H:i:s' );
        $data         = array( 'currency' => get_option( 'woocommerce_currency' ) );

        $total_orders = $this->_get_total_orders( $start_period, $end_period );
        $total_sales  = $total_orders['total_sales'];
        $commission   = $this->_get_commission_data( $start_period, $end_period, $total_sales );
        $vendor       = $this->_get_vendor_data( $start_period, $end_period );
        $updated_at   = ( new DateTime( 'now', $timezone ) )->format( 'Y-m-d H:i:s' );

        $data = array_merge(
            $data,
            array(
                'total_orders'         => $total_orders['total_orders'],
                'total_sales'          => $total_sales,
                'admin_commission'     => $commission['admin_commission'],
                'vendor_commission'    => $commission['vendor_commission'],
                'total_vendor'         => $vendor['total_vendor'],
                'total_pending_vendor' => $vendor['total_pending_vendor'],
                'updated_at'           => $updated_at,
            )
        );

        return $data;
    }

    /**
     * Get total orders for the period.
     *
     * @since 2.5.0
     * @access private
     *
     * @param string $start_period Start date of the period.
     * @param string $end_period   End date of the period.
     * @return array Total orders for the period.
     */
    private function _get_total_orders( $start_period, $end_period ) {
        $orders = wc_get_orders(
            array(
                'type'         => 'shop_order',
                'date_created' => $start_period . '...' . $end_period,
                'status'       => array( 'wc-completed', 'wc-processing' ),
                'limit'        => -1,
            )
        );

        $total_sales = 0;
        foreach ( $orders as $order ) {
            $total_sales += $order->get_total();
        }
        return array(
            'total_orders' => count( $orders ),
            'total_sales'  => $total_sales,
        );
    }

    /**
     * Get commission data for the period.
     *
     * @since 2.5.0
     *
     * @param string $start_period Start date of the period.
     * @param string $end_period   End date of the period.
     * @param float  $total_sales  Total sales for the period.
     *
     * @return array Commission data for the period.
     */
    private function _get_commission_data( $start_period, $end_period, $total_sales ) {
        global $wpdb;

        $commissions = $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT SUM( total_due ) AS commission, SUM( total_shipping ) as shipping, SUM( tax ) as tax FROM {$wpdb->prefix}pv_commission
                WHERE `status` != 'reversed'
                AND `time` BETWEEN %s AND %s",
                $start_period,
                $end_period
            )
        );

        $vendor_commission = $commissions->commission + $commissions->shipping + $commissions->tax;
        $admin_commission  = $total_sales - $vendor_commission;

        return array(
            'admin_commission'  => $admin_commission,
            'vendor_commission' => $vendor_commission,
        );
    }

    /**
     * Get vendor data for the period.
     *
     * @since 2.5.0
     * @version 2.5.4 - Add time period to vendor data.
     *
     * @param string $start_period Start date of the period.
     * @param string $end_period   End date of the period.
     *
     * @return array Vendor data for the period.
     */
    private function _get_vendor_data( $start_period, $end_period ) {
        global $wpdb;

        $vendors = $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT 
                    COUNT(DISTINCT CASE 
                        WHEN umt1.meta_key = %s 
                        AND umt1.meta_value LIKE %s
                        AND (
                            umt2.meta_key = '_wcv_approve_date' 
                            AND umt2.meta_value BETWEEN %s AND %s
                        )
                        THEN umt1.user_id 
                    END) AS vendor,
                    COUNT(DISTINCT CASE 
                        WHEN umt1.meta_key = %s 
                        AND umt1.meta_value LIKE %s
                        AND (
                            umt2.meta_key = '_wcv_apply_date' 
                            AND umt2.meta_value BETWEEN %s AND %s
                        )
                        THEN umt1.user_id 
                    END) AS pending
                FROM wp_usermeta umt1
                LEFT JOIN wp_usermeta umt2 ON umt1.user_id = umt2.user_id;",
                $wpdb->prefix . 'capabilities',
                '%"vendor"%',
                $start_period,
                $end_period,
                $wpdb->prefix . 'capabilities',
                '%"pending_vendor"%',
                $start_period,
                $end_period,
            )
        );

        return array(
            'total_vendor'         => $vendors->vendor,
            'total_pending_vendor' => $vendors->pending,
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Cron Schedule
    |--------------------------------------------------------------------------
     */

    /**
     * Schedule when we should send tracking data
     *
     * @since 2.5.0
     * @access public
     */
    public function schedule_send() {
        if ( ! wp_next_scheduled( self::USAGE_CRON_ACTION ) ) {
            $tracking = array();
            // phpcs:disable
            $tracking['day']      = rand( 0, 6 );
            $tracking['hour']     = rand( 0, 23 );
            $tracking['minute']   = rand( 0, 59 );
            $tracking['second']   = rand( 0, 59 );
            // phpcs:enable
            $tracking['offset']   = ( $tracking['day'] * DAY_IN_SECONDS ) +
                ( $tracking['hour'] * HOUR_IN_SECONDS ) +
                ( $tracking['minute'] * MINUTE_IN_SECONDS ) +
                $tracking['second'];
            $tracking['initsend'] = strtotime( 'next sunday' ) + $tracking['offset'];

            wp_schedule_event( $tracking['initsend'], 'weekly', self::USAGE_CRON_ACTION );
            update_option( self::USAGE_CRON_CONFIG, $tracking );
        }
    }

    /**
     * Add the cron schedule
     *
     * @since 2.5.0
     * @access public
     *
     * @param array $schedules The schedules array from the filter.
     */
    public function add_schedules( $schedules = array() ) {
        // Adds once weekly to the existing schedules.
        $schedules['weekly'] = array(
            'interval' => 604800,
            'display'  => __( 'Once Weekly', 'wc-vendors' ),
        );
        return $schedules;
    }

    /**
     * Send the checkin.
     *
     * @since 2.5.0
     * @access public
     *
     * @param bool $override            Flag to override if tracking is allowed or not.
     * @param bool $ignore_last_checkin Flag to ignore that last checkin time check.
     * @return bool Whether the checkin was sent successfully.
     */
    public function send_checkin( $override = false, $ignore_last_checkin = false ) {

        // Don't track anything from our domains.
        $home_url = trailingslashit( home_url() );
        if ( str_contains( $home_url, 'wholesalesuiteplugin.com' ) || str_contains( $home_url, 'advancedcouponsplugin.com' ) || str_contains( $home_url, 'wcvendors.com' ) ) {
            return false;
        }

        // Check if tracking is allowed on this site.
        if ( ! $this->_is_tracking_allowed() && ! $override ) {
            return false;
        }

        // Send a maximum of once per week.
        $last_send = get_option( self::USAGE_LAST_CHECKIN );

        if ( defined( 'WCV_TESTING_SITE' ) && WCV_TESTING_SITE ) {
            $last_send           = false;
            $ignore_last_checkin = true;
        }

        if ( is_numeric( $last_send ) && $last_send > strtotime( '-1 week' ) && ! $ignore_last_checkin ) {

            return false;
        }

        $tracking_server_url = defined( 'WCV_TRACKING_SERVER_URL' ) && ! empty( WCV_TRACKING_SERVER_URL ) ? WCV_TRACKING_SERVER_URL : 'https://usg.rymeraplugins.com';
        $data                = $this->_get_data();

        $response = wp_remote_post(
            trailingslashit( $tracking_server_url ) . 'v1/wcv-checkin/',
            array(
                'method'      => 'POST',
                'timeout'     => 5,
                'redirection' => 5,
                'httpversion' => '1.1',
                'sslverify'   => false,
                'body'        => $data,
                'user-agent'  => 'WCVF/' . WCV_VERSION . '; ' . get_bloginfo( 'url' ),
            )
        );

        if ( is_wp_error( $response ) ) {
            return false;
        }

        // If we have completed successfully, recheck in 1 week.
        update_option( self::USAGE_LAST_CHECKIN, time() );
        return true;
    }

    /**
     * Check if tracking is allowed.
     *
     * @since 2.5.0
     * @access private
     *
     * @return bool True if allowed, false otherwise.
     */
    private function _is_tracking_allowed() {
        $allow_usage = get_option( self::USAGE_ALLOW, 'no' );
        $is_allowed  = 'yes' === $allow_usage;

        if ( $this->has_paid_plugin_active() ) {
            $is_allowed = apply_filters( 'wcvendors_is_tracking_allowed', true );
        }
        return $is_allowed;
    }

    /**
     * Check if paid plugin is active.
     *
     * @since 2.5.0
     * @access public
     *
     * @return bool True if paid plugin is active, false otherwise.
     */
    public function has_paid_plugin_active() {
        if ( ! function_exists( 'is_plugin_active' ) ) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        return is_plugin_active( 'wc-vendors-pro/wcvendors-pro.php' ) || is_plugin_active( 'wc-vendors-gateway-stripe-connect/wc-vendors-gateway-stripe-connect.php' );
    }

    /*
    |--------------------------------------------------------------------------
    | Settings
    |--------------------------------------------------------------------------
     */

    /**
     * Register allow usage tracking field.
     *
     * @since 2.5.0
     * @access public
     *
     * @param array $settings Setting fields.
     * @return array Filtered setting fields.
     */
    public function register_allow_usage_tracking_field( $settings ) {

        $new_settings   = array();
        $allow_tracking = array(
            'title' => __( 'Allow usage tracking', 'wc-vendors' ),
            'type'  => 'checkbox',
            'desc'  => sprintf(
                /* Translators: %s: Link to allow usage documentation. */
                __( 'By allowing us to track usage data we can better help you because we know with which WordPress configurations, themes and plugins we should test. Complete documentation on usage tracking is available <a href="%s" target="_blank">here</a>.', 'wc-vendors' ),
                'https://www.wcvendors.com/knowledge-base/usage-tracking/?utm_source=wcv&utm_medium=kb&utm_campaign=allowusagesetting'
            ),
            'id'    => self::USAGE_ALLOW,
        );

        $title_section = array(
            'title' => __( 'Usage Tracking', 'wc-vendors' ),
            'type'  => 'title',
            'desc'  => '',
            'id'    => 'usage_tracking',
        );
        $end_section   = array(
            'type' => 'sectionend',
            'id'   => 'usage_tracking',
        );
        $new_settings  = array( $title_section, $allow_tracking, $end_section );

        $settings = array_merge( $settings, $new_settings );

        return $settings;
    }

    /*
    |--------------------------------------------------------------------------
    | Notices
    |--------------------------------------------------------------------------
     */

    /**
     * Set allow notice setting to 'yes' when response clicked in notice is "allow".
     *
     * @since 2.5.0
     * @access public
     *
     * @param string $notice_key Notice key.
     * @param string $response   Notice response.
     */
    public function update_allow_usage_setting_on_notice_dismiss( $notice_key, $response ) {

        if ( 'usage_tracking' === $notice_key && 'yes' === $response ) {
            update_option( self::USAGE_ALLOW, 'yes' );
        }
    }

    /**
     * Hide notice if Pro is active and then allow usage tracking.
     *
     * @since 2.5.0
     * @version 2.5.0
     */
    private function _hide_notice_if_pro_active() {
        if ( $this->has_paid_plugin_active() ) {
            $is_dimissed = get_option( 'wcvendors_dismissed_notice_usage_tracking', 'no' );

            if ( 'yes' !== $is_dimissed ) {
                update_option( 'wcvendors_dismissed_notice_usage_tracking', 'yes' );
            }
            $is_allowed = get_option( self::USAGE_ALLOW, 'no' );
            if ( 'yes' !== $is_allowed ) {
                update_option( self::USAGE_ALLOW, 'yes' );
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Fulfill implemented interface contracts
    |--------------------------------------------------------------------------
     */

    /**
     * Execute Notices class.
     *
     * @since 2.5.0
     * @access public
     */
    public function run() {
        if ( ! $this->has_paid_plugin_active() ) {
            $is_allowed = get_option( self::USAGE_ALLOW, 'no' );

            if ( 'yes' !== $is_allowed ) {
                add_filter( 'wcvendors_get_settings_general', array( $this, 'register_allow_usage_tracking_field' ) );
                add_action( 'wcvendors_after_notice_dismissed', array( $this, 'update_allow_usage_setting_on_notice_dismiss' ), 10, 2 );
                wcvendors_schedule_display_notice( 'usage_tracking', 0 );
            } else {
                add_filter( 'wcvendors_get_settings_advanced', array( $this, 'register_allow_usage_tracking_field' ) );
                $this->schedule_send();
            }
        }
        $this->_hide_notice_if_pro_active();
        add_filter( 'cron_schedules', array( $this, 'add_schedules' ) );
        add_action( self::USAGE_CRON_ACTION, array( $this, 'send_checkin' ) );
    }
}
