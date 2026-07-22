<?php
/**
 * Vendor cancelled order email (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/vendor-notify-cancelled-order.php.
 *
 * @author         Jamie Madden, WC Vendors
 * @package        WCvendors/Templates/Emails/Plain
 * @since       2.0.0
 * @version    2.6.5 Fix security issues.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo '= ' . esc_html( $email_heading ) . " =\n\n";

echo esc_html__( 'Your order has been cancelled.', 'wc-vendors' ) . "\n\n";

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

/**
 * Output the order details.
 *
 * @hooked WCVendors_Emails::vendor_order_details() Outputs the order details.
 *
 * @param WC_Order $order The order object.
 * @param array $vendor_items The vendor items.
 * @param mixed $totals_display The totals display.
 * @param int $vendor_id The vendor ID.
 * @param bool $sent_to_vendor Whether the email is being sent to the vendor.
 * @param bool $sent_to_admin Whether the email is being sent to the admin.
 * @param bool $plain_text Whether the email is a plain text email.
 * @param WC_Email $email The email object.
 */
do_action( 'wcvendors_email_order_details', $order, $vendor_items, $totals_display, $vendor_id, $sent_to_vendor, $sent_to_admin, $plain_text, $email );

echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

/**
 * Output the customer details.
 *
 * @hooked WCVendors_Emails::vendor_customer_details() Outputs the customer details.
 *
 * @param WC_Order $order The order object.
 * @param bool $sent_to_admin Whether the email is being sent to the admin.
 * @param bool $plain_text Whether the email is a plain text email.
 * @param WC_Email $email The email object.
 */
do_action( 'wcvendors_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
