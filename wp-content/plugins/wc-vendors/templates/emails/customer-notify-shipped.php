<?php
/**
 * Customer Vendor Shipped
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/customer-new-order.php.
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
    <p><?php printf( /* translators: %1$s: vendor name, %2$s: order number */ esc_html__( '%1$s has marked your order #%2$s as shipped. The items that are shipped are as follows', 'wc-vendors' ), esc_html( WCV_Vendors::get_vendor_shop_name( $vendor_id ) ), esc_html( $order->get_id() ) ); ?></p>
<?php

/**
 * Output the order details table.
 *
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
 * @since  2.5.0
 */
do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

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

/**
 * Output the customer details.
 *
 * @hooked WC_Emails::customer_details() Shows customer details
 * @hooked WC_Emails::email_address() Shows email address
 *
 * @param WC_Order $order The order object.
 * @param bool $sent_to_admin Whether the email is being sent to the admin.
 * @param bool $plain_text Whether the email is a plain text email.
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

/**
 * Output the email footer.
 *
 * @hooked WC_Emails::email_footer() Output the email footer
 *
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_footer', $email );
