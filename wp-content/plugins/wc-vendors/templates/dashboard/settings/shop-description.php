<?php
/**
 * Shop Description Template
 *
 * This template can be overridden by copying it to yourtheme/wc-vendors/dashboard/settings/shop-description.php
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/Emails/HTML
 * @since       2.0.0
 * @version     2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div id="pv_shop_description_container">
    <p><b><?php esc_html_e( 'Shop Description', 'wc-vendors' ); ?></b><br/>
        <?php sprintf( /* translators: %s: shop page URL */ esc_html__( 'This is displayed on your <a href="%s">shop page</a>.', 'wc-vendors' ), esc_html( $shop_page ) ); ?>
    </p>

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
            wp_editor( $description, 'pv_shop_description' );
            wp_reset_postdata();
        } else {
            ?>
            <textarea class="large-text" rows="10" id="pv_shop_description_unhtml" style="width:95%"
                        name="pv_shop_description"><?php echo wp_kses_post( $description ); ?></textarea>
            <?php
        }

        ?>
    </p>

</div>
