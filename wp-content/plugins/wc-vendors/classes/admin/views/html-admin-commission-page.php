<?php
/**
 * Admin View: Settings
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @author      Jamie Madden, WC Vendors
 * @category    Admin
 * @package     WCVendors/Admin
 * @since         2.0.0
 * @version       2.6.5 Fix security issues.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$wcv_page  = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$wcv_paged = isset( $_GET['paged'] ) ? sanitize_text_field( wp_unslash( $_GET['paged'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

?>
<div class="wrap">

    <div id="icon-woocommerce" class="icon32 icon32-woocommerce-reports"><br/></div>
    <h2><?php esc_html_e( 'Commission', 'wc-vendors' ); ?></h2>
    <form id="posts-filter" method="get">

        <?php printf( '<input type="hidden" name="page" value="%s" />', esc_attr( $wcv_page ) ); ?>
        <?php printf( '<input type="hidden" name="paged" value="%d" />', esc_attr( $wcv_paged ) ); ?>

        <input type="hidden" name="page" value="wcv-commissions"/>

        <?php $this->commissions_table->prepare_items(); ?>
        <?php $this->commissions_table->views(); ?>
        <?php $this->commissions_table->display(); ?>

    </form>
    <div id="ajax-response"></div>

    <br class="clear"/>
</div>
