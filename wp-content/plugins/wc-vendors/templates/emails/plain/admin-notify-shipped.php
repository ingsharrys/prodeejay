<?php
/**
 * Admin new notify vendor shipped (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/admin-notify-shipped.php
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

echo sprintf( /* translators: %1$s: vendor name, %2$s: order number */ esc_html__( '%1$s has marked  order #%2$s as shipped.', 'wc-vendors' ), esc_html( WCV_Vendors::get_vendor_shop_name( $vendor_id ) ), esc_html( $order->get_id() ) ) . "\n\n";

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
