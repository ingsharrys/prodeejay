<?php
/**
 * Class Reports API for WC Vendors.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
 */
class WCV_Reports_API extends WCV_API {

    /**
     * Enable rate limiting for the API.
     *
     * @var bool $enable_rate_limiting Enable rate limiting.
     */
    protected $enable_rate_limiting = true;

    /**
     * Rate limit for the API per minute by IP address.
     *
     * @var int $rate_limit Rate limit.
     */
    protected $rate_limit = 25;


    /**
     * Register routes.
     */
    public function register_routes() {
        $this->register_route(
            '/reports',
            'get_reports',
            WP_REST_Server::READABLE,
            array(
                'period_type' => array(
                    'description'       => __( 'Period type for the report', 'wc-vendors' ),
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'enum'              => array( 'this_month', 'last_7_days', 'last_14_days', 'last_30_days', 'last_3_months', 'last_6_months', 'last_year', 'custom' ),
                ),
                'start_date'  => array(
                    'description'       => __( 'Start date for the report', 'wc-vendors' ),
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'end_date'    => array(
                    'description'       => __( 'End date for the report', 'wc-vendors' ),
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'for'         => array(
                    'description'       => __( 'User ID for the report', 'wc-vendors' ),
                    'type'              => 'integer',
                    'sanitize_callback' => 'absint',
                ),
                'fields'      => array(
                    'description'       => __( 'Fields to include in the report', 'wc-vendors' ),
                    'type'              => 'array',
                    'items'             => array(
                        'type' => 'string',
                        'enum' => array(
                            'revenue',
                            'commissions',
                            'orders',
                            'top_vendors',
                            'pending_vendors',
                            'license_status',
                        ),
                    ),
                    'sanitize_callback' => array( $this, 'sanitize_fields_param' ),
                ),
            )
        );

        $this->register_route(
            '/reports/premium-plugins',
            'get_premium_plugins',
            WP_REST_Server::READABLE,
            array()
        );
    }

    /**
     * Check permissions for the API.
     *
     * @return bool
     */
    public function get_api_permissions_check() {

        return current_user_can( 'manage_woocommerce' );
    }

    /**
     * Sanitize the fields parameter.
     *
     * @param mixed           $value   The field value.
     * @param WP_REST_Request $request The request object.
     * @param string          $param   The parameter name.
     *
     * @return array|WP_Error
     */
    public function sanitize_fields_param( $value, $request, $param ) {
        if ( ! is_array( $value ) ) {
            return (array) $value;
        }

        $allowed_fields = apply_filters(
            'wcv_reports_api_allowed_fields',
            array(
                'revenue',
                'commissions',
                'orders',
                'top_vendors',
                'pending_vendors',
                'license_status',
            )
        );

        return apply_filters( 'wcv_reports_api_sanitize_fields', array_intersect( $value, $allowed_fields ), $value, $allowed_fields );
    }

    /**
     * Get reports based on date range and requested fields.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function get_reports( $request ) {
        // Get parameters.
        $start_date = $request->get_param( 'start_date' );
        $end_date   = $request->get_param( 'end_date' );
        $fields     = $request->get_param( 'fields' );
        $for        = $request->get_param( 'for' );
        $period     = $request->get_param( 'period' );

        global $wpdb;

        if ( ! $for ) {
            $for = 0;
        }

        // Default to all fields if none specified.
        if ( empty( $fields ) ) {
            $fields = array(
                'revenue',
                'commissions',
                'orders',
                'top_vendors',
                'pending_vendors',
                'license_status',
            );
        }

        if ( ! empty( $for ) ) {
            $user = get_user_by( 'id', $for );
            if ( ! $user ) {
                return new WP_REST_Response( array( 'message' => 'User not found.' ), 200 );
            }
        }

        // Check if user is vendor.
        $is_vendor = WCV_Vendors::is_vendor( $for );
        if ( ! $is_vendor && 0 !== $for ) {
            return new WP_REST_Response( array( 'message' => 'User is not a vendor.' ), 200 );
        }

        // If vendor unset top_vendors, pending_vendors, and license_status.
        if ( $is_vendor ) {
            $fields = array_diff( $fields, array( 'top_vendors', 'pending_vendors', 'license_status' ) );
        }

        if ( ! empty( $period ) && 'custom' !== $period ) {
            $start_date = $this->get_start_date( $period );
            $end_date   = gmdate( 'Y-m-d' );
        } else {
            // Validate dates with consolidated error handling.
            $date_validation_errors = $this->validate_date_parameters( $start_date, $end_date );
            if ( ! empty( $date_validation_errors ) ) {
                return new WP_REST_Response( $date_validation_errors, 400 );
            }

            // Set default dates if not provided.
            if ( empty( $start_date ) ) {
                $start_date = gmdate( 'Y-m-d', strtotime( '-30 days' ) );
            }

            if ( empty( $end_date ) ) {
                $end_date = gmdate( 'Y-m-d' );
            }
        }

        $report_controller = new WCV_Reports( $for, false );

        // Initialize report data.
        $report_data = array();

        $cache_hit       = 0;
        $is_use_cache    = wc_string_to_bool( get_option( 'wcvendors_enable_dashboard_cache', 'yes' ) ) && ! $is_vendor;
        $table_has_cache = false;
        $table_name      = $wpdb->prefix . 'wcv_reports_cache';
        $table_exists    = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name ) );
        if ( $table_exists ) {
            // Select row from table.
            $count = $wpdb->get_var( $wpdb->prepare( "SELECT COUNT( report_key ) FROM {$table_name} WHERE report_date BETWEEN %s AND %s", $start_date, $end_date ) ); // phpcs:ignore

            if ( $count > 0 ) {
                $table_has_cache = true;
            }
        }

        if ( $is_use_cache && $table_has_cache ) {
            $reports_cache = WCV_Reports_Cache::get_instance();
            $cache_data    = $reports_cache->get_cache( $start_date, $end_date, $fields );
            $report_data   = $cache_data['cache_data'];
            $cache_hit     = $cache_data['cache_hit'];
        } else {
            // Define all possible field handlers.
            $field_handlers = array(
                'revenue'     => function () use ( $report_controller, $start_date, $end_date ) {
                    return $report_controller->get_total_revenue( $start_date, $end_date );
                },
                'commissions' => function () use ( $report_controller, $start_date, $end_date ) {
                    return $report_controller->get_total_commissions( $start_date, $end_date );
                },
                'orders'      => function () use ( $report_controller, $start_date, $end_date ) {
                    return $report_controller->get_total_orders( $start_date, $end_date );
                },
                'top_vendors' => function () use ( $report_controller, $start_date, $end_date ) {
                    return $report_controller->get_top_vendors( $start_date, $end_date );
                },
            );

            // Process only requested fields.
            foreach ( $fields as $field ) {
                if ( isset( $field_handlers[ $field ] ) ) {
                    $report_data[ $field ] = $field_handlers[ $field ]();
                }
            }
        }

        if ( ! $is_vendor ) {
            $report_data['pending_vendors'] = $report_controller->get_pending_approval();
            $report_data['license_status']  = $this->get_premium_plugins_data();
        }

        $response_data = array(
            'success' => true,
            'data'    => $report_data,
            'meta'    => array(
                'start_date'  => $start_date,
                'end_date'    => $end_date,
                'period_type' => $period,
                'cache_hit'   => (float) number_format( $cache_hit, 2 ),
            ),
        );

        $response_data = apply_filters( 'wcv_reports_api_response_data', $response_data, $start_date, $end_date, $period );

        $response = new WP_REST_Response( $response_data, 200 );

        return $response;
    }

    /**
     * Check if a date string is valid.
     *
     * @param string $date Date string to check.
     * @return boolean
     */
    private function is_valid_date( $date ) {
        $d = DateTime::createFromFormat( 'Y-m-d', $date );
        return $d && $d->format( 'Y-m-d' ) === $date;
    }

    /**
     * Validates date parameters for reports API
     *
     * @param string $start_date Start date in YYYY-MM-DD format.
     * @param string $end_date End date in YYYY-MM-DD format.
     * @return array Empty array if valid, or error details if invalid
     */
    private function validate_date_parameters( $start_date, $end_date ) {
        // Check start date format.
        if ( ! empty( $start_date ) && ! $this->is_valid_date( $start_date ) ) {
            return array(
                'error'   => 'invalid_start_date',
                'success' => false,
                'message' => __( 'Invalid start date format. Please use YYYY-MM-DD.', 'wc-vendors' ),
            );
        }

        // Check end date format.
        if ( ! empty( $end_date ) && ! $this->is_valid_date( $end_date ) ) {
            return array(
                'error'   => 'invalid_end_date',
                'success' => false,
                'message' => __( 'Invalid end date format. Please use YYYY-MM-DD.', 'wc-vendors' ),
            );
        }

        // Check date range logic.
        if ( ! empty( $start_date ) && ! empty( $end_date ) && $start_date > $end_date ) {
            return array(
                'error'   => 'invalid_date_range',
                'success' => false,
                'message' => __( 'Start date cannot be after end date.', 'wc-vendors' ),
            );
        }

        // All validations passed.
        return array();
    }

    /**
     * Get plugin version safely.
     *
     * @param string $constant_name The constant name to check.
     * @return string The version number or empty string if not defined.
     */
    private function get_plugin_version( $constant_name ) {
        return defined( $constant_name ) ? constant( $constant_name ) : '';
    }

    /**
     * Get WC Vendors Premium plugins data.
     *
     * @return array
     */
    private function get_premium_plugins_data() {
        $required_plugins = array(
            'wc-vendors/class-wc-vendors.php'  => __( 'WC Vendors', 'wc-vendors' ),
            'woocommerce/woocommerce.php'      => __( 'WooCommerce', 'wc-vendors' ),
            'wc-vendors-pro/wcvendors-pro.php' => __( 'WC Vendors Pro', 'wc-vendors' ),
            'woocommerce-bookings/woocommerce-bookings.php' => __( 'WooCommerce Bookings', 'wc-vendors' ),
            'woocommerce-simple-auctions/woocommerce-simple-auctions.php' => __( 'Simple Auctions', 'wc-vendors' ),
            'woocommerce-subscriptions/woocommerce-subscriptions.php' => __( 'WooCommerce Subscriptions', 'wc-vendors' ),
        );

        $plugins = apply_filters(
            'wcvendors_api_premium_plugins',
            array(
                'wcvp'     => array(
                    'name'               => __( 'WC Vendors Pro', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-pro/wcvendors-pro.php' ),
                    'license_option_key' => 'wc-vendors-pro_license_manager',
                    'basename'           => 'wc-vendors-pro/wcvendors-pro.php',
                    'version'            => $this->get_plugin_version( 'WCV_PRO_VERSION' ),
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                    ),
                    'desc'               => __( 'WC Vendors Pro has all the tools & features to help you build a thriving marketplace that both your customers and Vendors will love. Provide a true frontend multi-vendor experience to rival the big platforms. Grow your marketplace faster with WC Vendors Pro.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgradeproaddon',
                ),
                'wcv_sc'   => array(
                    'name'               => __( 'WC Vendors Gateway Stripe Connect', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-gateway-stripe-connect/wc-vendors-gateway-stripe-connect.php' ),
                    'license_option_key' => 'wc-vendors-gateway-stripe-connect_license_manager',
                    'basename'           => 'wc-vendors-gateway-stripe-connect/wc-vendors-gateway-stripe-connect.php',
                    'version'            => $this->get_plugin_version( 'WCV_SC_VERSION' ),
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                    ),
                    'desc'               => __( 'Automate your marketplace and save time with WC Vendors Stripe Connect. Use Stripe\'s Connect platform to process credit card payments and pay your vendor commissions automatically.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgradestripeconnectaddon',
                ),
                'wcv_wcb'  => array(
                    'name'               => __( 'WC Vendors WooCommerce Bookings', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-woocommerce-bookings/wcv-woocommerce-bookings.php' ),
                    'license_option_key' => 'wc-vendors-woocommerce-bookings_license_manager',
                    'basename'           => 'wc-vendors-woocommerce-bookings/wcv-woocommerce-bookings.php',
                    'version'            => $this->get_plugin_version( 'WCV_WCB_VERSION' ),
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                        'wc-vendors-pro/wcvendors-pro.php',
                        'woocommerce-bookings/woocommerce-bookings.php',
                    ),
                    'desc'               => __( 'Integration with WooCommerce Bookings plugin to let your Vendors create and sell bookable products such as hotel rooms, gym sessions, consultations, equipment rentals and more.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgradebookingsaddon',
                ),
                'wcv_wcsa' => array(
                    'name'               => __( 'WC Vendors Pro Simple Auctions', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-pro-simple-auctions/class-wcv-simple-auctions.php' ),
                    'license_option_key' => 'wcvendors-pro-simpleauctions_license_manager',
                    'basename'           => 'wc-vendors-pro-simple-auctions/class-wcv-simple-auctions.php',
                    'version'            => $this->get_plugin_version( 'WCV_WCS_VERSION' ),
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                        'wc-vendors-pro/wcvendors-pro.php',
                        'woocommerce-simple-auctions/woocommerce-simple-auctions.php',
                    ),
                    'desc'               => __( 'Integration with Simple Auctions plugin to create an auction marketplace just like eBay, Gumtree, or Facebook Marketplace. Allow your vendors to sell auction products right from their dashboard.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgradesimpleauctionsaddon',
                ),
                'wcv_wcm'  => array(
                    'name'               => __( 'WC Vendors Membership', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-membership/wc-vendors-membership.php' ),
                    'license_option_key' => 'wc-vendors-membership_license_manager',
                    'basename'           => 'wc-vendors-membership/wc-vendors-membership.php',
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                        'wc-vendors-pro/wcvendors-pro.php',
                        'woocommerce-subscriptions/woocommerce-subscriptions.php',
                    ),
                    'version'            => $this->get_plugin_version( 'WCV_WCM_VERSION' ),
                    'desc'               => __( 'Allows you to create and sell membership plans to your marketplace for Vendors so you can earn recurring revenue. Set different limits for your vendors on what products they can sell, storage, adjust fees, and more.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgrademembershipaddon',
                ),
                'wcv_wcs'  => array(
                    'name'               => __( 'WC Vendors WooCommerce Subscriptions', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-woocommerce-subscriptions/wcv-wc-subscriptions.php' ),
                    'license_option_key' => 'wcv-wc-subscriptions_license_manager',
                    'basename'           => 'wc-vendors-woocommerce-subscriptions/wcv-wc-subscriptions.php',
                    'version'            => $this->get_plugin_version( 'WCV_WCS_VERSION' ),
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                        'wc-vendors-pro/wcvendors-pro.php',
                        'woocommerce-subscriptions/woocommerce-subscriptions.php',
                    ),
                    'desc'               => __( 'Integration with WooCommerce Subscriptions to allow your vendors to create and sell their own subscription products. Turn your marketplace into a subscription box service, capture recurring membership fees and more.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgradesubscriptionsaddon',
                ),
                'wcv_tax'  => array(
                    'name'               => __( 'WC Vendors Tax', 'wc-vendors' ),
                    'active'             => is_plugin_active( 'wc-vendors-tax/wc-vendors-tax.php' ),
                    'license_option_key' => 'wc-vendors-tax_license_manage',
                    'basename'           => 'wc-vendors-tax/wc-vendors-tax.php',
                    'requires_plugin'    => array(
                        'wc-vendors/class-wc-vendors.php',
                        'woocommerce/woocommerce.php',
                        'wc-vendors-pro/wcvendors-pro.php',
                    ),
                    'version'            => $this->get_plugin_version( 'WCVT_VER' ),
                    'desc'               => __( 'Provides your marketplace with automatic sales tax calculations using either TaxJar or Avalara tax calculation services.', 'wc-vendors' ),
                    'upgrade_link'       => 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=dashboard&utm_campaign=upgradetaxaddon',
                ),
            )
        );

        $licenses = array();

        foreach ( $plugins as $plugin_slug => $plugin_data ) {
            $plugins[ $plugin_slug ]['installed'] = file_exists( WP_PLUGIN_DIR . '/' . $plugin_data['basename'] );
            if ( $plugin_data['active'] ) {
                $license_data = get_option( $plugin_data['license_option_key'], array() );
                unset( $plugins[ $plugin_slug ]['license_option_key'] );

                $plugins[ $plugin_slug ]['status']  = isset( $license_data['license_status'] ) ? $license_data['license_status'] : '';
                $plugins[ $plugin_slug ]['expires'] = isset( $license_data['license_expires'] ) ? $license_data['license_expires'] : '';
            } else {
                unset( $plugins[ $plugin_slug ]['license_option_key'] );
            }

            if ( ! empty( $plugin_data['requires_plugin'] ) ) {
                foreach ( $plugin_data['requires_plugin'] as $required_plugin ) {
                    if ( ! is_plugin_active( $required_plugin ) ) {
                        $plugins[ $plugin_slug ]['need_to_activate'][ $required_plugin ] = $required_plugins[ $required_plugin ];
                    }
                }
            }
            $plugins[ $plugin_slug ]['key'] = $plugin_slug;
            $licenses[]                     = $plugins[ $plugin_slug ];
        }

        return $licenses;
    }

    /**
     * Get start date based on period type.
     *
     * @param string $period_type Period type.
     * @return string Start date in Y-m-d format (UTC).
     */
    private function get_start_date( $period_type ) {

        switch ( $period_type ) {
            case 'last_7_days':
                return wp_date( 'Y-m-d', strtotime( '-7 days' ) );
            case 'last_14_days':
                return wp_date( 'Y-m-d', strtotime( '-14 days' ) );
            case 'last_30_days':
                return wp_date( 'Y-m-d', strtotime( '-30 days' ) );
            case 'last_3_months':
                return wp_date( 'Y-m-d', strtotime( '-3 months' ) );
            case 'last_6_months':
                return wp_date( 'Y-m-d', strtotime( '-6 months' ) );
            case 'last_year':
                return wp_date( 'Y-m-d', strtotime( '-1 year' ) );
            case 'this_month':
                return wp_date( 'Y-m-01' );
            default:
                return wp_date( 'Y-m-01' );
        }
    }

    /**
     * Get premium plugins data endpoint handler.
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return WP_REST_Response
     */
    public function get_premium_plugins( $request ) {
        $plugins_data = $this->get_premium_plugins_data();

        return new WP_REST_Response(
            array(
                'success' => true,
                'data'    => $plugins_data,
            ),
            200
        );
    }
}

new WCV_Reports_API();
