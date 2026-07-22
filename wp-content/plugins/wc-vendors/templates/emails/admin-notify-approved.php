<?php
/**
 * Notify admin about an approved vendor
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/admin-notify-approved.php.
 *
 * @author        Lindeni Mahlalela, WC Vendors
 * @package       WCVendors/Templates/Emails/HTML
 * @since       2.1.7
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

    <p><?php printf( /* translators: %1$s: vendor name, %2$s: site name */ esc_html__( 'Hi there. You or another admin has approved a user to be a %1$s on %2$s.', 'wc-vendors' ), esc_html( wcv_get_vendor_name( true, false ) ), esc_html( get_option( 'blogname' ) ) ); ?></p>
    <p><?php printf( /* translators: %s: application status */ esc_html__( 'Application status: %s', 'wc-vendors' ), esc_html( ucfirst( $status ) ) ); ?></p>
    <p><?php printf( /* translators: %s: applicant username */ esc_html__( 'Applicant username: %s', 'wc-vendors' ), esc_html( $user->user_login ) ); ?></p>

<?php

/**
 * Output the email footer.
 *
 * @hooked WC_Emails::email_footer() Output the email footer
 *
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_footer', $email_heading, $email );
