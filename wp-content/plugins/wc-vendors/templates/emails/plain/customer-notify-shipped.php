<?php
/**
 * Customer Vendor Shipped (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/customer-notify-shipped.php
 *
 * @author         Jamie Madden, WC Vendors
 * @package        WCVendors/Templates/Emails/Plain
 * @version        2.6.5 Fix security issues.
 * @since          2.0.0
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
echo '= ' . esc_html( $email_heading ) . " =\n\n";

echo sprintf( /* translators: %1$s: vendor name, %2$s: order number */ esc_html__( '%1$s has marked  order #%2$s as shipped.', 'wc-vendors' ), esc_html( WCV_Vendors::get_vendor_shop_name( $vendor_id ) ), esc_html( $order->get_id() ) ) . "\n\n";

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

/**
 * Output the order details table.
 *
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
 * @since  2.5.0
 */
do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

/**
 * Output the order meta data.
 *
 * @hooked WC_Emails::order_meta() Shows order meta data.
 *
 * @param WC_Order $order The order object.
 * @param bool $sent_to_admin Whether the email is being sent to the admin.
 * @param bool $plain_text Whether the email is a plain text email.
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
