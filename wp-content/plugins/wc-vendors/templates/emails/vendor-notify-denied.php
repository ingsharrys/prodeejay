<?php
/**
 * Vendor Notify Application Denied
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/vendor-notify-denied.php
 *
 * @author  Jamie Madden, WC Vendors
 * @package WCVendors/Templates/Emails
 * @since       2.0.0
 * @version    2.6.5 Fix security issues.
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

    <p><?php echo wp_kses_post( $content ); ?></p>

    <p><?php echo wp_kses_post( $reason ); ?></p>

    <p><?php printf( /* translators: %s: username */ esc_html__( 'Applicant username: %s', 'wc-vendors' ), esc_html( $user->user_login ) ); ?></p>

<?php

/**
 * Output the email footer.
 *
 * @hooked WC_Emails::email_footer() Output the email footer
 *
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_footer', $email );
