<?php
/**
 * Vendor Notify Application
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/vendor-notify-application.php
 *
 * @author  WC Vendors
 * @package WCVendors/Templates/Emails
 * @since       2.0.0
 * @version    2.6.5 Fix security issues.
 * @since   1.0.13
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Output the email header.
 *
 * @hooked WC_Emails::email_header() Output the email header
 *
 * @param string $email_heading The email heading.
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

    <p><?php printf( /* translators: %1$s: vendor name, %2$s: site name */ esc_html__( 'Hi there. This is a notification about your %1$s application on %2$s.', 'wc-vendors' ), esc_html( wcv_get_vendor_name( true, false ) ), esc_html( get_option( 'blogname' ) ) ); ?></p>
    <p><?php printf( /* translators: %s: application status */ esc_html__( 'Your application is currently: %s', 'wc-vendors' ), esc_html( $status ) ); ?></p>
    <p><?php printf( /* translators: %s: username */ esc_html__( 'Your username: %s', 'wc-vendors' ), esc_html( $user->user_login ) ); ?></p>

<?php

/**
 * Output the email footer.
 *
 * @hooked WC_Emails::email_footer() Output the email footer
 *
 * @param string $email_heading The email heading.
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_footer', $email );
