<?php

/**
 * WC Vendors Functions Class
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.DynamicHooknameFound
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_query
 */

use Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController;
use Automattic\WooCommerce\Utilities\OrderUtil;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WCV_Dependencies' ) ) {
    require_once 'class-dependencies.php';
}

/**
 * WC Detection
 * */
if ( ! function_exists( 'wcv_is_woocommerce_activated' ) ) {
    /**
     * Check if WooCommerce is activated
     */
    function wcv_is_woocommerce_activated() {

        return WCV_Dependencies::woocommerce_active_check();
    }
}

if ( ! function_exists( 'wcv_get_user_role' ) ) {
    /**
     * Get user roole from user id
     *
     * @param int $user_id User ID.
     */
    function wcv_get_user_role( $user_id ) {

        global $wp_roles;
        $user  = new WP_User( $user_id );
        $roles = $user->roles;
        $role  = array_shift( $roles );

        return isset( $wp_roles->role_names[ $role ] ) ? $role : false;
    }
}

if ( ! function_exists( 'wcv_get_select2_script_handle' ) ) {
    /**
     * Get the correct Select2 script handle based on WooCommerce version.
     *
     * WooCommerce 10.3.0+ deprecated the 'select2' handle in favor of 'wc-select2'.
     * This function provides backward compatibility with older WooCommerce versions.
     *
     * @since 2.6.4
     * @return string The Select2 script handle to use.
     */
    function wcv_get_select2_script_handle() {
        // Check if WooCommerce is active and get version.
        if ( defined( 'WC_VERSION' ) && version_compare( WC_VERSION, '10.3.0', '>=' ) ) {
            return 'wc-select2';
        }

        return 'select2';
    }
}


/**
 * This function gets the vendor name used throughout the interface on the front and backend
 *
 * @param boolean $singluar  Singluar or not.
 * @param boolean $upper_case Upper case or not.
 */
function wcv_get_vendor_name( $singluar = true, $upper_case = true ) {

    $vendor_singular = get_option( 'wcvendors_vendor_singular', __( 'Vendor', 'wc-vendors' ) );
    $vendor_plural   = get_option( 'wcvendors_vendor_plural', __( 'Vendors', 'wc-vendors' ) );

    $vendor_label = $singluar ?
        __( $vendor_singular, 'wc-vendors' ) : // phpcs:ignore
        __( $vendor_plural, 'wc-vendors' ); // phpcs:ignore
    $vendor_label = $upper_case ? ucfirst( $vendor_label ) : lcfirst( $vendor_label );

    $vendor_label = apply_filters_deprecated(
        'wcv_vendor_display_name',
        array( $vendor_label, $vendor_singular, $vendor_plural, $singluar, $upper_case ),
        '2.3.0',
        'wcvendors_vendor_display_name'
    );

    return apply_filters(
        'wcvendors_vendor_display_name',
        $vendor_label,
        $vendor_singular,
        $vendor_plural,
        $singluar,
        $upper_case
    );
}

/**
 * Output a single select page drop down.
 *
 * @param string $id    ID.
 * @param string $value Value.
 * @param string $css_class Class.
 * @param string $css   CSS.
 */
function wcv_single_select_page( $id, $value, $css_class = '', $css = '' ) {

    $dropdown_args = array(
        'name'             => $id,
        'id'               => $id,
        'sort_column'      => 'menu_order',
        'sort_order'       => 'ASC',
        'show_option_none' => ' ',
        'class'            => $css_class,
        'echo'             => false,
        'selected'         => $value,
    );

    $new_attributes  = ' data-placeholder="' . esc_attr__( 'Select a page&hellip;', 'wc-vendors' ) . '"';
    $new_attributes .= ' style="' . esc_attr( $css ) . '" class="' . $css_class . '" id="';

    echo wp_kses(
        str_replace(
            ' id=',
            $new_attributes,
            wp_dropdown_pages( $dropdown_args )
        ),
        wcv_allowed_html_tags()
    );
}

/**
 * Get the WC Vendors Screen ids.
 *
 * @return array
 */
function wcv_get_screen_ids() {

    return apply_filters(
        'wcv_get_screen_ids',
        array(
            'wc-vendors_page_wcv-settings',
            'wc-vendors_page_wcv-commissions',
            'wc-vendors_page_wcv-extensions',
        )
    );
}

/**
 * Filterable navigation items classes for Vendor Dashboard.
 *
 * @param string $item_id Navigation item ID.
 *
 * @return string
 */
function wcv_get_dashboard_nav_item_classes( $item_id ) {

    $classes = array( 'button' );

    $classes = apply_filters_deprecated( 'wcv_dashboard_nav_item_classes', array( $classes, $item_id ), '2.3.0', 'wcvendors_dashboard_nav_item_classes' );
    $classes = apply_filters( 'wcvendors_dashboard_nav_item_classes', $classes, $item_id );

    return implode( ' ', array_map( 'sanitize_html_class', $classes ) );
}

if ( ! function_exists( 'wcv_vendor_drop_down_options' ) ) {
    /**
     * Generate a drop down with the vendor name based on the Dsiplay name setting used in the admin
     *
     * @param array $users     Users.
     * @param int   $vendor_id Vendor ID.
     * @since 2.1.10
     * @return string
     */
    function wcv_vendor_drop_down_options( $users, $vendor_id ) {
        $output = '';
        foreach ( (array) $users as $user ) {
            $shop_name    = WCV_Vendors::get_vendor_sold_by( $user->ID );
            $display_name = empty( $shop_name ) ? $user->display_name : $shop_name;
            $select       = selected( $user->ID, $vendor_id, false );
            $output      .= "<option value='$user->ID' $select>$display_name</option>";
        }
        $output = apply_filters_deprecated( 'wcv_vendor_drop_down_options', array( $output ), '2.3.0', 'wcvendors_vendor_drop_down_options' );
        return apply_filters( 'wcvendors_vendor_drop_down_options', $output );
    }
}


/**
 * Set the primary role of the specified user to vendor while retaining all other roles after
 *
 * @param WP_User|int $user The ID of the user or the user object.
 * @param string      $role The role to set, default 'vendor'.
 * @param bool        $use_custom_msg Whether to use the custom message.
 * @param string      $custom_message Custom message for the email.
 *
 * @since 2.1.10
 * @version 2.6.6 - Added use custom message and custom message parameters.
 */

if ( ! function_exists( 'wcv_set_primary_vendor_role' ) ) {
    /**
     * Set primary role to vendor.
     *
     * @param WP_User|int $user The ID of the user or the user object.
     * @param string      $role The role to set, default 'vendor'.
     * @param bool        $use_custom_msg Whether to use the custom message.
     * @param string      $custom_message Custom message for the email.
     * @return void
     * @version 2.6.6 - Added use custom message and custom message parameters.
     * @since   2.4.7 - Added default role and allow ID or WP_User object.
     */
    function wcv_set_primary_vendor_role( $user, $role = 'vendor', $use_custom_msg = false, $custom_message = '' ) {
        if ( is_int( $user ) ) {
            $user = get_user_by( 'id', $user );
        }

        // Get existing roles before manipulation.
        $existing_roles = $user->roles;

        // Check if the user already has the desired role as primary.
        if ( ! empty( $existing_roles ) && $existing_roles[0] === $role ) {
            return; // Role is already primary, no need to change anything.
        }

        // Use set_role to replace all roles with the primary role first.
        // This method doesn't trigger add_user_role hook multiple times.
        $user->set_role( $role );

        // Re-add other roles (excluding the primary role we just set).
        foreach ( $existing_roles as $existing_role ) {
            if ( $existing_role !== $role ) {
                $user->add_role( $existing_role );
            }
        }

        do_action( 'wcvendors_set_primary_vendor_role', $user->ID, $role, $use_custom_msg, $custom_message );
    }
}

if ( ! function_exists( 'wcv_is_show_reversed_order' ) ) {

    /**
     * Check show reversed order
     *
     * @since 2.4.0
     * @return bool
     */
    function wcv_is_show_reversed_order() {

        return wc_string_to_bool( get_option( 'wcvendors_dashboard_orders_show_reversed_orders', 'no' ) );
    }
}


if ( ! function_exists( 'wcv_hpos_enabled' ) ) {
    /**
     * Check if WooCommerce Custom Orders Table is enabled.
     *
     * @return bool
     * @version 2.4.8
     * @since   2.4.8 - Added.
     */
    function wcv_hpos_enabled() {
        return OrderUtil::custom_orders_table_usage_is_enabled();
    }
}

if ( ! function_exists( 'wcv_cot_enabled' ) ) {
    /**
     * Check if custom order tables option is enabled
     *
     * @return boolean
     * @version 2.4.8
     * @since   2.4.8 - Added.
     */
    function wcv_cot_enabled() {
        $cot_enabled = get_option( CustomOrdersTableController::CUSTOM_ORDERS_TABLE_USAGE_ENABLED_OPTION );
        return wc_string_to_bool( $cot_enabled );
    }
}

if ( ! function_exists( 'wcv_get_order' ) ) {
    /**
     * Get vendor order
     *
     * @param int|WC_Order_Vendor $order Order ID.
     * @return WC_Order_Vendor
     * @version 2.4.8
     * @since   2.4.8
     */
    function wcv_get_order( $order ) {
        if ( is_a( $order, WC_Order_Vendor::ORDER_TYPE ) ) {
            return $order;
        }

        if ( is_a( $order, 'WC_Order' ) ) {
            return new WC_Order_Vendor( $order->get_id() );
        }

        return new WC_Order_Vendor( $order );
    }
}

if ( ! function_exists( 'wcv_allowed_html_tags' ) ) {
    /**
     * Allow specific HTML tags.
     *
     * To be used with wp_kses_post() or wp_kses() to allow additional HTML tags that are not allowed by default.
     *
     * @return array
     * @version 2.4.8
     * @since   2.4.8 -  Added
     */
    function wcv_allowed_html_tags() {
        $html_allowed_tags   = wp_kses_allowed_html( 'post' );
        $wcv_additional_tags = array(
            'a'          => array(
                'href'  => array(),
                'title' => array(),
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'label'      => array(
                'for'   => array(),
                'class' => array(),
                'id'    => array(),
            ),
            'div'        => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'br'         => array(),
            'strong'     => array(
                'class' => array(),
            ),
            'select'     => array(
                'class' => array(),
                'id'    => array(),
                'name'  => array(),
                'value' => array(),
                'style' => array(),
            ),
            'option'     => array(
                'value'    => array(),
                'selected' => array(),
            ),
            'ul'         => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'ol'         => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'form'       => array(
                'action' => array(),
                'method' => array(),
                'class'  => array(),
                'id'     => array(),
            ),
            'input'      => array(
                'type'        => array(),
                'name'        => array(),
                'value'       => array(),
                'class'       => array(),
                'id'          => array(),
                'placeholder' => array(),
            ),
            'span'       => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'small'      => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'img'        => array(
                'src'    => array(),
                'alt'    => array(),
                'class'  => array(),
                'id'     => array(),
                'style'  => array(),
                'width'  => array(),
                'height' => array(),
            ),
            'svg'        => array(
                'xmlns'   => array(),
                'viewBox' => array(),
                'class'   => array(),
                'id'      => array(),
            ),
            'p'          => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'use'        => array(
                'xlink:href' => array(),
                'class'      => array(),
            ),
            'i'          => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'ins'        => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'li'         => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
            'blockquote' => array(
                'class' => array(),
                'id'    => array(),
                'style' => array(),
            ),
        );
        return apply_filters(
            'wcvendors_allowed_html_tags',
            wp_parse_args( $wcv_additional_tags, $html_allowed_tags )
        );
    }
}

if ( ! function_exists( 'wcv_get_vendor_orders' ) ) {
    /**
     * Get a list of vendor orders.
     *
     * @param array $args The arguments to pass to WP_Query.
     * @return WC_Order_Vendor[]|array[WC_Order]
     * @version 2.4.8
     * @since   2.4.8 - Added.
     */
    function wcv_get_vendor_orders( $args = array() ) {
        $args = wp_parse_args(
            $args,
            array(
                'type'  => WC_Order_Vendor::ORDER_TYPE,
                'limit' => -1,
            )
        );

        $args = apply_filters(
            'wcvendors_get_vendor_orders_args',
            $args
        );

        $orders = wc_get_orders( $args );

        $vendor_orders = array();

        $return_vendor_orders = is_string( $args['type'] ) && WC_Order_Vendor::ORDER_TYPE === $args['type'];

        if ( $return_vendor_orders ) {

            foreach ( $orders as $vendor_order ) {
                if ( 0 === $vendor_order->get_id() ) {
                    continue;
                }
                $vendor_orders[] = wcv_get_order( $vendor_order->get_id() );
            }
        }

        return apply_filters(
            'wcvendors_get_vendor_orders',
            $return_vendor_orders ? $vendor_orders : $orders,
            $args
        );
    }
}

if ( ! function_exists( 'wcvendors_schedule_display_notice' ) ) {
    /**
     * Schedule notice
     *
     * @param string $notice_key The notice key.
     * @param int    $days       The number of days to schedule the notice.
     *
     * @since 2.4.7
     */
    function wcvendors_schedule_display_notice( $notice_key, $days = 0 ) {
        if ( ! class_exists( 'ActionScheduler' ) ) {
            return;
        }
        require_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-notices.php';
        $action_key   = 'wcvendors_notice_scheduled_action';
        $is_shown     = get_option( 'wcvendors_display_notice_' . $notice_key, 'no' );
        $is_dismissed = get_option( 'wcvendors_dismissed_notice_' . $notice_key, 'no' );

        if ( 'yes' === $is_shown || 'yes' === $is_dismissed ) {
            return;
        }

        if ( as_next_scheduled_action( $action_key, array( $notice_key ), 'wcvendors' ) ) {
            return;
        }

        $notices = (array) get_option( 'wcvendors_admin_notices', array() );
        $notices = array_filter( $notices );

        if ( ! in_array( $notice_key, $notices, true ) ) {
            WCVendors_Admin_Notices::add_notice( $notice_key );
        }

        as_schedule_single_action( time() + ( DAY_IN_SECONDS * $days ), $action_key, array( $notice_key ), 'wcvendors', true );

        $is_display = 0 === $days ? 'yes' : 'no';
        update_option( 'wcvendors_display_notice_' . $notice_key, $is_display );
    }
}

if ( ! function_exists( 'wcv_trigger_admin_notice' ) ) {
    /**
     * Trigger admin notice
     *
     * @param string $notice_key The notice key.
     *
     * @since 2.5.2
     */
    function wcv_trigger_admin_notice( $notice_key ) {
        $notices = (array) get_option( 'wcvendors_admin_notices', array() );
        $notices = array_filter( $notices );

        $notice = in_array( $notice_key, $notices, true ) || in_array( $notice_key, array_keys( $notices ), true ) ? $notice_key : false;

        if ( ! $notice ) {
            return;
        }

        update_option( 'wcvendors_display_notice_' . $notice_key, 'yes' );
    }
}

if ( ! function_exists( 'wcv_get_product_total_sales' ) ) {
    /**
     * Get total sales for a product by order status.
     *
     * @param array $product_ids The product IDs.
     *
     * @version 2.4.9
     * @since   2.4.9 - Added.
     * @return array
     */
    function wcv_get_product_total_sales( $product_ids ) {
        global $wpdb;
        $product_ids           = array_unique( array_map( 'absint', $product_ids ) );
        $product_placeholders  = array_fill( 0, count( $product_ids ), '%d' );
        $product_placeholders  = implode( ',', $product_placeholders );
        $statuses              = apply_filters(
            'wcvendors_get_product_total_sales_order_statuses',
            array( 'paid', 'due' )
        );
        $statutes_placeholders = array_fill( 0, count( $statuses ), '%s' );
        $statutes_placeholders = implode( ',', $statutes_placeholders );
        $sql                   = "SELECT product_id, SUM( qty ) as qty FROM {$wpdb->prefix}pv_commission
        WHERE product_id IN ($product_placeholders) AND status IN ($statutes_placeholders)
        GROUP BY product_id";

        $results = $wpdb->get_results( $wpdb->prepare( $sql, array_merge( $product_ids, $statuses ) ) ); // phpcs:ignore

        $product_sales = array();
        foreach ( $results as $result ) {
            $product_id = $result->product_id;
            $qty        = $result->qty;
            if ( ! isset( $product_sales[ $product_id ] ) ) {
                $product_sales[ $product_id ] = 0;
            }
            $product_sales[ $product_id ] += $qty;
        }

        return $product_sales;
    }
}

if ( ! function_exists( 'wcvendors_add_vendor_status_meta_key' ) ) {

    /**
     * Add _vendors_status as user meta for vendor and pending vendor users
     *
     * @since 2.4.8
     * @version 2.4.9.2
     * @return void
     */
    function wcvendors_add_vendor_status_meta_key() {

        $users = get_users(
            array(
                'role__in'   => array( 'vendor', 'pending_vendor' ),
                'number'     => apply_filters( 'wcvendors_sync_vendor_status_limit', 100 ),
                'fields'     => 'ID',
                'meta_query' => array(
                    'relation' => 'OR',
                    array(
                        'key'     => '_wcv_vendor_status',
                        'compare' => 'NOT EXISTS',
                    ),
                    array(
                        'key'     => '_wcv_vendor_status',
                        'value'   => '',
                        'compare' => '=',
                    ),
                ),
            )
        );

        if ( empty( $users ) ) {
            return;
        }

        foreach ( $users as $user_id ) {
            if ( wc_user_has_role( $user_id, 'vendor' ) ) {
                update_user_meta( $user_id, '_wcv_vendor_status', 'active' );
            } else {
                update_user_meta( $user_id, '_wcv_vendor_status', 'inactive' );
            }
        }

        wp_schedule_single_event( time() + 5, 'wcvendors_sync_vendor_status' );
    }
}


if ( ! function_exists( 'escape_array_for_in_operator' ) ) {
    /**
     * Escape an array of values for use in the IN operator of wpdb->prepare.
     *
     * @param array $values The array of values to escape.
     * @return string The escaped values formatted for the IN operator.
     * @param bool  $wrap_in_brackets Whether to wrap the escaped values in brackets.
     *
     * @since 2.5.1
     * @version 2.5.1
     */
    function escape_array_for_in_operator( $values, $wrap_in_brackets = false ) {
        global $wpdb;
        $escaped_values = array();
        foreach ( $values as $value ) {
            $type = gettype( $value );
            switch ( $type ) {
                case 'integer':
                    $escaped_values[] = $wpdb->prepare( '%d', $value );
                    break;
                case 'string':
                    $escaped_values[] = $wpdb->prepare( '%s', $value );
                    break;
                default:
                    $escaped_values[] = $wpdb->prepare( '%s', $value );
                    break;
            }
        }
        $formatted_values = implode( ', ', $escaped_values );
        if ( $wrap_in_brackets ) {
            $formatted_values = '(' . $formatted_values . ')';
        }
        return $formatted_values;
    }
}

if ( ! function_exists( 'wcv_deprecated_action' ) ) {
    /**
     * Trigger a deprecated action.
     *
     * @param string $old_hook Function that was called.
     * @param string $version  Version that function was deprecated in.
     * @param string $replacement Optional. Function that should have been called.
     * @param mixed  ...$args  Additional arguments to pass to the hooks.
     *
     * @since 2.5.1
     * @version 2.5.1
     */
    function wcv_deprecated_action( $old_hook, $version, $replacement, ...$args ) {
        if ( wp_doing_ajax() ) {
            return;
        }
        do_action_deprecated( $old_hook, $args, $version, $replacement );
        do_action( $replacement, ...$args );
    }
}


if ( ! function_exists( 'wcv_deprecated_filter' ) ) {
    /**
     * Trigger a deprecated filter.
     *
     * @param string $old_hook Function that was called.
     * @param string $version  Version that function was deprecated in.
     * @param string $replacement Optional. Function that should have been called.
     * @param mixed  $value    Value to return.
     * @param mixed  ...$args  Additional arguments to pass to the hooks.
     *
     * @since 2.5.1
     * @version 2.5.1
     */
    function wcv_deprecated_filter( $old_hook, $version, $replacement, $value, ...$args ) {
        if ( wp_doing_ajax() ) {
            return $value;
        }
        $value = apply_filters_deprecated( $old_hook, array( $value, ...$args ), $version, $replacement );
        return apply_filters( $replacement, $value, ...$args );
    }
}

if ( ! function_exists( 'maybe_load_new_dashboard' ) ) {
    /**
     * Check if Pro version is larger than 1.9.1
     */
    function maybe_load_new_dashboard() {
        $maybe_load_new_dashboard = true;
        $wcv_path                 = WP_PLUGIN_DIR . '/wc-vendors-pro';
        $legacy_path              = $wcv_path . '/legacy/class-wcvendors-pro.php';
        $active_plugins           = get_option( 'active_plugins' );
        $is_pro_active            = in_array( 'wc-vendors-pro/wcvendors-pro.php', $active_plugins, true );

        if ( $is_pro_active && ! file_exists( $legacy_path ) ) {
            $maybe_load_new_dashboard = false;
        }
        return $maybe_load_new_dashboard;
    }
}


if ( ! function_exists( 'wcv_is_all_product_types_hidden' ) ) {
    /**
     * Check if all product types are hidden.
     *
     * @return bool
     */
    function wcv_is_all_product_types_hidden() {
        $hidden_product_types = get_option( 'wcvendors_capability_product_types', array() );
        $wc_product_types     = array_keys( wc_get_product_types() );
        return empty( array_diff( $wc_product_types, $hidden_product_types ) );
    }
}
