<?php
/**
 * Admin new notify vendor approved (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/admin-notify-approved.php
 *
 * @author         Lindeni Mahlalela, WC Vendors
 * @package        WCVendors/Templates/Emails/Plain
 * @since       2.0.13
 * @version    2.6.5 Fix security issues.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo '= ' . esc_html( $email_heading ) . " =\n\n";

echo sprintf( /* translators: %1$s: vendor name, %2$s: site name */ esc_html__( 'Hi there. You or another admin has approved a user to be a %1$s on %2$s.', 'wc-vendors' ), esc_html( wcv_get_vendor_name( true, false ) ), esc_html( get_option( 'blogname' ) ) ) . "\n\n";
printf( /* translators: %s: application status */ esc_html__( 'Application status: %s', 'wc-vendors' ), esc_html( ucfirst( $status ) ) );
echo sprintf( /* translators: %s: approved username */ esc_html__( 'Approved username: %s', 'wc-vendors' ), esc_html( $user->user_login ) ) . "\n\n";


echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
