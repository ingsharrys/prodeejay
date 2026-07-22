<?php
/**
 * Vendor Dashboard navigation start
 *
 * This template can be overridden by copying it to yourtheme/wc-vendors/dashboard/nav-wrapper-start.php
 *
 * @package    WC_Vendors
 * @version    2.5.4
 * @see        templates/dashboard/nav.php
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$sticky_menu = wc_string_to_bool( get_option( 'wcvendors_dashboard_sticky_menu', 'no' ) );
?>

<div class="wcv-cols-group wcv-horizontal-gutters wcv-gap-bottom wcv-dashboard-nav-wrapper">
    <div class="<?php echo esc_attr( $menu_dir_size ); ?>">
        <nav class="wcv-navigation <?php echo esc_attr( $nav_class ); ?> <?php echo esc_attr( $menu_dir_class ); ?> <?php echo $sticky_menu ? ' wcv-sticky' : ''; ?>" id="wcv-navigation">
            <ul class="wcv-dashboard-menu <?php echo esc_attr( $menu_dir_class ); ?> black primary <?php echo esc_attr( $full_width ); ?>">
