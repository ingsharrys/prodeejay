<?php

/**
 * WC Vendors Helper Functions
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
 */

/**
 * PayPal Supported Currencies
 *
 * Reference: https://developer.paypal.com/reference/currency-codes/
 *
 * @version 2.4.3
 * @return array $paypal_currencies
 */
function wcv_paypal_currencies() {

    $paypal_currencies = apply_filters(
        'wcvendors_paypal_currencies',
        array(
            'AUD' => __( 'Australian Dollar', 'wc-vendors' ),
            'BRL' => __( 'Brazilian Real', 'wc-vendors' ),
            'CAD' => __( 'Canadian Dollar', 'wc-vendors' ),
            'CNY' => __( 'Chinese Renmenbi', 'wc-vendors' ),
            'CZK' => __( 'Czech Koruna', 'wc-vendors' ),
            'DKK' => __( 'Danish Krone', 'wc-vendors' ),
            'EUR' => __( 'Euro', 'wc-vendors' ),
            'HKD' => __( 'Hong Kong Dollar', 'wc-vendors' ),
            'HUF' => __( 'Hungarian Forint', 'wc-vendors' ),
            'ILS' => __( 'Israeli New Shekel', 'wc-vendors' ),
            'JPY' => __( 'Japanese Yen', 'wc-vendors' ),
            'MYR' => __( 'Malaysian Ringgit', 'wc-vendors' ),
            'MXN' => __( 'Mexican Peso', 'wc-vendors' ),
            'TWD' => __( 'New Taiwan Ddollar', 'wc-vendors' ),
            'NZD' => __( 'New Zealand Dollar	', 'wc-vendors' ),
            'NOK' => __( 'Norwegian krone	', 'wc-vendors' ),
            'PHP' => __( 'Philippine Peso', 'wc-vendors' ),
            'PLN' => __( 'Polish Złoty', 'wc-vendors' ),
            'GBP' => __( 'Pound Sterling', 'wc-vendors' ),
            'RUB' => __( 'Russian Ruble', 'wc-vendors' ),
            'SGD' => __( 'Singapore Dollar', 'wc-vendors' ),
            'SEK' => __( 'Swedish Krona', 'wc-vendors' ),
            'CHF' => __( 'Swiss Franc', 'wc-vendors' ),
            'THB' => __( 'Thai Baht', 'wc-vendors' ),
            'USD' => __( 'United States Dollar', 'wc-vendors' ),
        )
    );

    return $paypal_currencies;
}

/**
 * PayPal wallet
 *
 * @version 2.4.3
 * @return array $paypal_wallet
 */
function wcv_paypal_wallet() {

    $paypal_wallet = apply_filters(
        'wcvendors_paypal_wallet',
        array(
            'paypal' => __( 'PayPal', 'wc-vendors' ),
            'venmo'  => __( 'Venmo', 'wc-vendors' ),
        )
    );

    return $paypal_wallet;
}

/**
 * Get countries and states follow format lable and value
 *
 * @version 2.4.8
 * @since 2.4.8
 */
function wcv_get_countries_states() {
    $continents = WC()->countries->get_continents();
    $countries  = WC()->countries->get_countries();
    $states     = WC()->countries->get_allowed_country_states();

    $countries_states = array(
        'countries'  => $countries,
        'states'     => $states,
        'continents' => $continents,
    );
    return $countries_states;
}
/**
 * Check if any plugin is installed by basename
 *
 * @param string $base_name Plugin basename.
 *
 * @return bool
 */
function wcv_is_plugin_installed( $base_name ) {
    if ( ! function_exists( 'get_plugins' ) ) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $plugins = get_plugins();

    return isset( $plugins[ $base_name ] );
}




/**
 * Check allow screen
 *
 * @since 2.5.1.1
 *
 * @return bool $is_allow_screen Allow screen or not.
 */
function wcv_check_allow_screen() {
    $is_allow_screen = false;
    $screen          = get_current_screen();

    if ( null === $screen ) {
        return $is_allow_screen;
    }

    $post_type = get_post_type();

    if ( ! $post_type && isset( $_GET['post_type'] ) ) { // phpcs:ignore
        $post_type = sanitize_text_field( $_GET['post_type'] ); // phpcs:ignore
    }

    $allow_screen_pages = array(
        'dashboard',
        'wc-vendors_page_wcv-commissions',
        'wc-vendors_page_wcv-vendor-settings',
        'wc-vendors_page_wcv-extensions',
        'wc-vendors_page_wcv-all-vendors',
        'wc-vendors_page_wcv-settings',
        'wc-vendors_page_wcv-help',
        'wc-vendors_page_wcv_pro_vendor_feedback',
        'wc-vendors_page_wcvm_subscription',
        'wc-vendors_page_wc-vendors-license',
        'wc-vendors_page_wcv-about',
        'wc-vendors_page_wc-vendors-marketplace-dashboard',
        'woocommerce_page_wc-admin',
        'woocommerce_page_wc-settings',
        'woocommerce_page_wc-reports',
        'woocommerce_page_wc-status',
        'edit-shop_order',
        'edit-shop_coupon',
        'plugins',
        'woocommerce_page_wc-addons',
        'wc-vendors_page_wcv-setup',
    );

    $allow_screen_post_types = array(
        'shop_order',
        'shop_coupon',
        'product',
    );

    $allow_screen_pages = apply_filters( 'wcvendors_allow_screen_pages', $allow_screen_pages );
    $screen_id          = isset( $screen->id ) ? $screen->id : '';

    $is_allow_screen = in_array( $screen_id, $allow_screen_pages, true ) || in_array( $post_type, $allow_screen_post_types, true );

    return apply_filters( 'wcvendors_allow_screen', $is_allow_screen );
}

if ( ! function_exists( 'wcv_enqueue_script' ) ) {
    /**
     * Manages the registration, localization, and enqueuing of a script.
     *
     * @param string $handle       Unique name for the script.
     * @param string $src          URL to the script file.
     * @param array  $deps         Optional. An array of registered script handles this script depends on. Default is empty array.
     * @param string $ver          Optional. Script version number. Default is false.
     * @param bool   $in_footer    Optional. Whether to load the script in the footer. Default is false.
     * @param array  $localize     Optional. Array with localization data. Default is empty array.
     * @param bool   $enqueue      Optional. Whether to enqueue the script. Default is true.
     */
    function wcv_enqueue_script(
        $handle,
        $src,
        $deps = array(),
        $ver = false,
        $in_footer = false,
        $localize = array(),
        $enqueue = true
    ) {
        // Register the script.
        wp_register_script( $handle, $src, $deps, $ver, $in_footer );

        // Localize the script if localization data is provided.
        if ( ! empty( $localize ) ) {
            foreach ( $localize as $object_name => $data ) {
                wp_localize_script( $handle, $object_name, $data );
            }
        }

        // Enqueue the script if $enqueue is true.
        if ( $enqueue ) {
            wp_enqueue_script( $handle );
        }
    }
}

if ( ! function_exists( 'wcv_enqueue_style' ) ) {
    /**
     * Manages the registration and enqueuing of a style.
     *
     * @param string $handle       Unique name for the style.
     * @param string $src          URL to the style file.
     * @param array  $deps         Optional. An array of registered style handles this style depends on. Default is empty array.
     * @param string $ver          Optional. Style version number. Default is false.
     * @param string $media        Optional. The media for which this stylesheet has been defined. Default is 'all'.
     * @param bool   $enqueue      Optional. Whether to enqueue the style. Default is true.
     */
    function wcv_enqueue_style(
        $handle,
        $src,
        $deps = array(),
        $ver = false,
        $media = 'all',
        $enqueue = true
    ) {
        // Register the style.
        wp_register_style( $handle, $src, $deps, $ver, $media );

        // Enqueue the style if $enqueue is true.
        if ( $enqueue ) {
            wp_enqueue_style( $handle );
        }
    }
}


if ( ! function_exists( 'wcv_get_order_statuses' ) ) {
    /**
     * Get all order statuses.
     *
     * @since 2.5.2
     *
     * @return array
     */
    function wcv_get_order_statuses() {
        $order_statuses = array(
            'wc-processing' => _x( 'Processing', 'Order status', 'wc-vendors' ),
            'wc-on-hold'    => _x( 'On hold', 'Order status', 'wc-vendors' ),
            'wc-completed'  => _x( 'Completed', 'Order status', 'wc-vendors' ),
            'wc-cancelled'  => _x( 'Cancelled', 'Order status', 'wc-vendors' ),
            'wc-refunded'   => _x( 'Refunded', 'Order status', 'wc-vendors' ),
        );

        if ( ! wcv_is_show_reversed_order() ) {
            unset( $order_statuses['wc-refunded'] );
        }

        return apply_filters( 'wcv_order_statuses', $order_statuses );
    }
}

if ( ! function_exists( 'wcv_recursive_sanitize_array' ) ) {
    /**
     * Recursively sanitize an array.
     *
     * @since 2.5.2
     *
     * @param array $arr Array to sanitize.
     *
     * @return array
     */
    function wcv_recursive_sanitize_array( $arr ) {
        foreach ( $arr as $key => &$value ) {
            if ( is_array( $value ) ) {
                $arr[ $key ] = wcv_recursive_sanitize_array( $value );
            } else {
                $arr[ $key ] = sanitize_text_field( $value );
            }
        }

        return $arr;
    }
}

if ( ! function_exists( 'wcv_get_attachment_id' ) ) {
    /**
     * Get the attachment id from the database.
     *
     * @param string $md5_guid The md5 guid.
     * @return int|null
     */
    function wcv_get_attachment_id( $md5_guid ) {
        global $wpdb;
        // Get the attachment_id from the database.
    $attachment_id = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '_md5_guid' AND meta_value =%s",
            $md5_guid
        )
    );

        return $attachment_id ? absint( $attachment_id ) : null;
    }
}

if ( ! function_exists( 'wcv_format_ai_review' ) ) {
    /**
     * Format AI review data for display.
     *
     * @since 2.6.6
     *
     * @param string|array $ai_review_raw      Raw AI review data (serialized or array).
     * @param bool         $sanitize_html      Whether to allow HTML (true) or strip HTML (false). Default true.
     * @param bool         $format_field_names Whether to format field names (replace underscores with spaces). Default false.
     *
     * @return array Formatted AI review data.
     */
    function wcv_format_ai_review( $ai_review_raw, $sanitize_html = true, $format_field_names = false ) {
        if ( empty( $ai_review_raw ) ) {
            return array();
        }

        // If it's a string, try to unserialize it.
        if ( is_string( $ai_review_raw ) ) {
            $ai_review_data = maybe_unserialize( $ai_review_raw );
        } else {
            $ai_review_data = $ai_review_raw;
        }

        // If unserialization failed or data is not an array, return empty.
        if ( ! is_array( $ai_review_data ) || empty( $ai_review_data['completion'] ) ) {
            return array();
        }

        $completion = $ai_review_data['completion'];

        // Choose sanitization function based on context.
        $text_sanitize = $sanitize_html ? 'wp_kses_post' : 'sanitize_textarea_field';

        // Format the data for display.
        $formatted = array(
            'status'          => isset( $completion['status'] ) ? sanitize_text_field( $completion['status'] ) : '',
            'risk_score'      => isset( $completion['risk_score'] ) ? absint( $completion['risk_score'] ) : 0,
            'vendor_feedback' => isset( $completion['vendor_feedback'] ) ? call_user_func( $text_sanitize, $completion['vendor_feedback'] ) : '',
            'admin_logic'     => isset( $completion['admin_logic'] ) ? call_user_func( $text_sanitize, $completion['admin_logic'] ) : '',
            'audit_results'   => array(),
            'suggestions'     => array(),
        );

        // Format audit results.
        if ( ! empty( $completion['audit_results'] ) && is_array( $completion['audit_results'] ) ) {
            $formatted['audit_results'] = array(
                'content_safety'     => isset( $completion['audit_results']['content_safety'] ) ? sanitize_text_field( $completion['audit_results']['content_safety'] ) : '',
                'pricing_integrity'  => isset( $completion['audit_results']['pricing_integrity'] ) ? sanitize_text_field( $completion['audit_results']['pricing_integrity'] ) : '',
                'visual_consistency' => isset( $completion['audit_results']['visual_consistency'] ) ? sanitize_text_field( $completion['audit_results']['visual_consistency'] ) : '',
            );
        }

        // Format auto-fix suggestions.
        if ( ! empty( $completion['auto_fix_suggestions'] ) && is_array( $completion['auto_fix_suggestions'] ) ) {
            foreach ( $completion['auto_fix_suggestions'] as $suggestion ) {
                if ( ! empty( $suggestion['field'] ) && ! empty( $suggestion['suggestion'] ) ) {
                    $field_name = sanitize_text_field( $suggestion['field'] );
                    if ( $format_field_names ) {
                        $field_name = str_replace( '_', ' ', $field_name );
                    }

                    $formatted['suggestions'][] = array(
                        'field'      => $field_name,
                        'suggestion' => wp_kses_post( $suggestion['suggestion'] ),
                    );
                }
            }
        }

        return $formatted;
    }
}


if ( ! function_exists( 'wcv_get_pro_user_meta' ) ) {

    /**
     * Get pro user meta
     *
     * @since 2.6.6
     *
     * @param int    $user_id The user ID.
     * @param string $meta_key The meta key.
     * @param string $default_value The default value.
     * @return mixed The meta value or default value if not set.
     */
    function wcv_get_pro_user_meta( $user_id, $meta_key, $default_value = '' ) {

        if ( ! is_wcv_pro_active() ) {
            return $default_value;
        }

        $meta_value = get_user_meta( $user_id, $meta_key, true );

        return ( '' !== $meta_value ) ? $meta_value : $default_value;
    }
}

if ( ! function_exists( 'wcv_apply_vendor_trust_status' ) ) {

    /**
     * Apply vendor trust status to a capability value.
     *
     * Centralized function to handle trusted/untrusted vendor logic.
     * Trusted vendors get the capability enabled, untrusted vendors get it disabled.
     * This ensures consistent behavior across the plugin.
     *
     * @since 2.6.6
     *
     * @param bool $capability_value The current capability value to modify.
     * @param int  $user_id          Optional. The user ID. Default is current user.
     * @return bool The modified capability value based on vendor trust status.
     */
    function wcv_apply_vendor_trust_status( $capability_value, $user_id = 0 ) {
        if ( 0 === $user_id ) {
            $user_id = get_current_user_id();
        }

        $trusted_vendor   = 'yes' === wcv_get_pro_user_meta( $user_id, '_wcv_trusted_vendor', 'no' );
        $untrusted_vendor = 'yes' === wcv_get_pro_user_meta( $user_id, '_wcv_untrusted_vendor', 'no' );

        if ( $trusted_vendor ) {
            return true;
        }

        if ( $untrusted_vendor ) {
            return false;
        }

        return $capability_value;
    }
}

if ( ! function_exists( 'wcv_get_vendor_post_status' ) ) {

    /**
     * Get the post status based on vendor trust status.
     *
     * Centralized function to determine post status based on trusted/untrusted vendor status.
     * Trusted vendors can publish directly, untrusted vendors always get pending status.
     *
     * @since 2.6.6
     *
     * @param string $default_status The default post status if vendor has no special trust status.
     * @param int    $user_id        Optional. The user ID. Default is current user.
     * @param bool   $is_draft       Optional. Whether this is a draft submission. Default is false.
     * @return string The post status ('publish', 'pending', or the default status).
     */
    function wcv_get_vendor_post_status( $default_status, $user_id = 0, $is_draft = false ) {
        if ( 0 === $user_id ) {
            $user_id = get_current_user_id();
        }

        $trusted_vendor   = 'yes' === wcv_get_pro_user_meta( $user_id, '_wcv_trusted_vendor', 'no' );
        $untrusted_vendor = 'yes' === wcv_get_pro_user_meta( $user_id, '_wcv_untrusted_vendor', 'no' );

        // Untrusted vendors always get pending status.
        if ( $untrusted_vendor ) {
            return 'pending';
        }

        // Trusted vendors can publish (unless it's a draft).
        if ( $trusted_vendor && ! $is_draft ) {
            return 'publish';
        }

        return $default_status;
    }
}
