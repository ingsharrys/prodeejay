<?php
/**
 * New dashboard tab content
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @package    WC_Vendors
 * @since      2.5.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
$time               = time();
$show_customer_name = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_name', 'no' ) );

do_action( 'wcvendors_dashboard_tab_content_heading_before' );
wc_get_template(
    'dashboard/dashboard-tab-content-heading.php',
    array(
        'welcome_message'   => $welcome_message,
        'store_setup_steps' => $store_setup_steps,
        'time'              => $time,
        'is_dismissed'      => $is_dismissed,
    ),
    'wc-vendors/dashboard/',
    plugin_dir_path( WCV_PLUGIN_FILE ) . 'templates/'
);
do_action( 'wcvendors_dashboard_tab_content_heading_after' );


do_action( 'wcvendors_dashboard_tab_content_sales_snapshot_before' );
wc_get_template(
    'dashboard/dashboard-tab-content-sales-snapshot.php',
    array(
        'sales_snapshot' => $sales_snapshot,
        'chart_data'     => $chart_data,
        'time'           => $time,
    ),
    'wc-vendors/dashboard/',
    plugin_dir_path( WCV_PLUGIN_FILE ) . 'templates/'
);
do_action( 'wcvendors_dashboard_tab_content_sales_snapshot_after' );


do_action( 'wcvendors_dashboard_tab_content_orders_before' );
wc_get_template(
    'dashboard/dashboard-tab-content-orders.php',
    array(
        'latest_orders'            => $latest_orders,
        'pending_shipping_orders'  => $pending_shipping_orders,
        'is_pro_active'            => $is_pro_active,
        'latest_reviews'           => $latest_reviews,
        'time'                     => $time,
        'should_show_ratings'      => $should_show_ratings,
        'show_customer_name'       => $show_customer_name,
        'vendor_shipping_disabled' => $vendor_shipping_disabled,
    ),
    'wc-vendors/dashboard/',
    plugin_dir_path( WCV_PLUGIN_FILE ) . 'templates/'
);
do_action( 'wcvendors_dashboard_tab_content_orders_after' );
