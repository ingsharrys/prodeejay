<?php
/**
 * New Product
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/new-product.php.
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/Emails
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
<p><?php printf( /* translators: %s: site name */ esc_html__( 'Hi there. This is a notification about a new product on %s.', 'wc-vendors' ), esc_html( get_option( 'blogname' ) ) ); ?></p>

<p>
    <?php printf( /* translators: %s: product title */ esc_html__( 'Product title: %s', 'wc-vendors' ), esc_html( $product_name ) ); ?><br/>
    <?php printf( /* translators: %s: vendor name */ esc_html__( 'Submitted by: %s', 'wc-vendors' ), esc_html( $vendor_name ) ); ?><br/>
    <?php printf( '<a href="%1$s">%2$s</a>', esc_url( admin_url( 'post.php?post=' . $post_id . '&action=edit' ) ), esc_html__( 'Edit product', 'wc-vendors' ) ); ?>
    <br/>
</p>

<?php
/**
 * Output the email footer.
 *
 * @hooked WC_Emails::email_footer() Output the email footer
 *
 * @param WC_Email $email The email object.
 */
do_action( 'woocommerce_email_footer', $email );
