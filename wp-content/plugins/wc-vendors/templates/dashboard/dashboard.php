<?php
/**
 * The template for displaying the main Pro Dashboard
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @package    WCVendors_Pro
 * @version    1.8.0
 */
?>

<?php do_action( 'wcvendors_before_dashboard_overview' ); ?> 

<!-- Load the Overview section of the dashboard page -->
<?php
wc_get_template(
    'overview.php',
    array(
        'store_report'      => $store_report,
        'products_disabled' => $products_disabled,
        'orders_disabled'   => $orders_disabled,
    ),
    'wc-vendors/dashboard/reports/',
    plugin_dir_path( WCV_PLUGIN_FILE ) . 'templates/dashboard/reports/'
);
?>
<?php do_action( 'wcvendors_after_dashboard_overview' ); ?> 

<?php do_action( 'wcvendors_before_dashboard_reports' ); ?> 
<!-- Load the reports and tables section of the dashboard page -->
<?php
wc_get_template(
    'reports.php',
    array(
        'store_report'      => $store_report,
        'products_disabled' => $products_disabled,
        'orders_disabled'   => $orders_disabled,
    ),
    'wc-vendors/dashboard/reports/',
    plugin_dir_path( WCV_PLUGIN_FILE ) . 'templates/dashboard/reports/'
);

?>
<?php do_action( 'wcvendors_after_dashboard_reports' ); ?>
