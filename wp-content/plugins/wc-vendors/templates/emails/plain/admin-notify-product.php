<?php
/**
 * Admin new notify new vendor product (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/admin-notify-product.php
 *
 * @author         Jamie Madden, WC Vendors
 * @package        WCVendors/Templates/Emails/Plain
 * @since       2.0.0
 * @version    2.6.5 Fix security issues.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo '= ' . esc_html( $email_heading ) . " =\n\n";

do_action( 'woocommerce_email_header', $email_heading, $email );

echo sprintf( /* translators: %s: site name */ esc_html__( 'This is a notification about a new product on %s.', 'wc-vendors' ), esc_html( get_option( 'blogname' ) ) ) . "\n\n";

echo sprintf( /* translators: %s: product title */ esc_html__( 'Product title: %s', 'wc-vendors' ), esc_html( $product->get_title() ) ) . "\n\n";
echo sprintf( /* translators: %s: vendor name */ esc_html__( 'Submitted by: %s', 'wc-vendors' ), esc_html( $vendor_name ) ) . "\n\n";
echo sprintf( '<a href="%1$s">%2$s</a>', esc_url( admin_url( 'post.php?post=' . $post_id . '&action=edit' ) ), esc_html__( 'Edit product', 'wc-vendors' ) ) . "\n\n";

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
