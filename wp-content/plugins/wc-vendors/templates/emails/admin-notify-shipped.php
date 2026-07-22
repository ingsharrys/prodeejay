<?php
/**
 * Admin Vendor Shipped
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/admin-notify-shipped.php.
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/Emails/HTML
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
do_action( 'woocommerce_email_header', $email_heading, $email );

?>
    <p><?php printf( /* translators: %1$s: vendor name, %2$s: order number */ esc_html__( '%1$s has marked  order #%2$s as shipped.', 'wc-vendors' ), esc_html( WCV_Vendors::get_vendor_shop_name( $vendor_id ) ), esc_html( $order->get_id() ) ); ?></p>
<?php

/**
 * Output the email footer.
 *
 * @hooked WC_Emails::email_footer() Output the email footer
 *
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_footer', $email );
