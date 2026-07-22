<?php

/**
 * Dashboard wrapper container
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://www.wcvendors.com
 * @since      1.6.0
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
?>

<?php $dashboard_wrapper_class = apply_filters( 'wcv_dashboard_wrapper_class', '' ); ?>

<?php do_action( 'wcv_before_pro_dashboard_wrapper' ); ?>

<div class="wcvendors-pro-dashboard-wrapper <?php echo esc_attr( $dashboard_wrapper_class ); ?>">

    <div class="wcv-grid <?php echo $vertical_menu ? 'vertical' : 'horizontal'; ?>">
