<?php
/**
 * Seller Info Template
 *
 * This template can be overridden by copying it to yourtheme/wc-vendors/dashboard/settings/seller-info.php
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/Emails/HTML
 * @since       2.0.0
 * @version     2.6.5 Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>


<div id="pv_seller_info_container">
    <p>
        <b><?php echo esc_html( apply_filters( 'wcvendors_seller_info_label', __( 'Seller info', 'wc-vendors' ) ) ); ?></b><br/>
        <?php esc_html_e( 'This is displayed on each of your products.', 'wc-vendors' ); ?></p>

    <p>
        <?php

    if ( $global_html || $has_html ) {
        // Create a temporary post object for wp_editor context.
        $temp_post = (object) array(
            'ID'         => 0,
            'post_title' => '',
            'post_type'  => 'page',
        );
        setup_postdata( $temp_post );
        wp_editor( $seller_info, 'pv_seller_info' );
        wp_reset_postdata();
    } else {
            ?>
            <textarea class="large-text" rows="10" id="pv_seller_info_unhtml" style="width:95%"
                        name="pv_seller_info"><?php echo wp_kses_post( $seller_info ); ?></textarea>
            <?php
        }

        ?>
    </p>
</div>
