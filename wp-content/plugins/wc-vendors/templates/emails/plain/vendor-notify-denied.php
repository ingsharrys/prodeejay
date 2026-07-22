<?php
/**
 *  Vendor notify denied (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/vendor-notify-denied.php
 *
 * @author         Jamie Madden, WC Vendors
 * @package        WCVendors/Templates/Emails/Plain
 * @version        2.0.0
 * @version        2.6.5 Fix security issues.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo '= ' . esc_html( $email_heading ) . " =\n\n";

echo wp_kses_post( $content ) . "\n\n";

echo wp_kses_post( $reason ) . "\n\n";

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
