<?php
/**
 *  Vendor notify denied (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/vendor-notify-denied.php
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

echo sprintf( /* translators: %1$s: vendor name, %2$s: site name */ esc_html__( 'Hi there. This is a notification about a %1$s application on %2$s.', 'wc-vendors' ), esc_html( wcv_get_vendor_name( true, false ) ), esc_html( get_option( 'blogname' ) ) ) . "\n\n";
echo sprintf( /* translators: %s: application status */ esc_html__( 'Your application is currently: %s', 'wc-vendors' ), esc_html( $status ) ) . "\n\n";
echo sprintf( /* translators: %s: applicant username */ esc_html__( 'Applicant username: %s', 'wc-vendors' ), esc_html( $user->user_login ) ) . "\n\n";

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
