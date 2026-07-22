<?php
/**
 * Vendor out of stock reminder email (HTML)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/vendor-notify-out-of-stock.php.
 *
 * @author  WC Vendors
 * @package WCVendors/Templates/Emails
 * @version 2.6.7
 *
 * @var WP_User  $vendor        The vendor user object.
 * @var array    $products      Array of WC_Product objects with days_out_of_stock property.
 * @var string   $email_heading The email heading.
 * @var WC_Email $email         The email object.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Output the email header.
 *
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<p>
    <?php
    printf(
        /* translators: %s: vendor display name */
        esc_html__( 'Hi %s,', 'wc-vendors' ),
        esc_html( $vendor ? $vendor->display_name : '' )
    );
    ?>
</p>
<p><?php esc_html_e( 'The following products in your store are currently out of stock. Please restock them as soon as possible to avoid losing sales.', 'wc-vendors' ); ?></p>

<table cellspacing="0" cellpadding="6" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;" border="1">
    <thead>
        <tr>
            <th scope="col" style="text-align: left; padding: 9px; border: 1px solid #e5e5e5;"><?php esc_html_e( 'Product', 'wc-vendors' ); ?></th>
            <th scope="col" style="text-align: left; padding: 9px; border: 1px solid #e5e5e5;"><?php esc_html_e( 'SKU', 'wc-vendors' ); ?></th>
            <th scope="col" style="text-align: left; padding: 9px; border: 1px solid #e5e5e5;"><?php esc_html_e( 'Days Out of Stock', 'wc-vendors' ); ?></th>
        </tr>
    </thead>
    <tbody>
        <?php if ( ! empty( $products ) ) : ?>
            <?php foreach ( $products as $item ) : ?>
                <tr>
                    <td style="padding: 9px; border: 1px solid #e5e5e5;">
                        <a href="<?php echo esc_url( get_permalink( $item['product']->get_id() ) ); ?>">
                            <?php echo esc_html( $item['product']->get_name() ); ?>
                        </a>
                    </td>
                    <td style="padding: 9px; border: 1px solid #e5e5e5;">
                        <?php echo esc_html( $item['product']->get_sku() ? $item['product']->get_sku() : '&mdash;' ); ?>
                    </td>
                    <td style="padding: 9px; border: 1px solid #e5e5e5;">
                        <?php
                        printf(
                            /* translators: %d: number of days */
                            esc_html( _n( '%d day', '%d days', $item['days_out_of_stock'], 'wc-vendors' ) ),
                            (int) $item['days_out_of_stock']
                        );
                        ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        <?php else : ?>
            <tr>
                <td colspan="3" style="padding: 9px; border: 1px solid #e5e5e5; text-align: center;">
                    <?php esc_html_e( 'Your out-of-stock products will be listed here.', 'wc-vendors' ); ?>
                </td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>

<?php
$additional_content = $email->get_option( 'additional_content' );
if ( $additional_content ) {
    echo wp_kses_post( wpautop( wptexturize( $additional_content ) ) );
}

do_action( 'woocommerce_email_footer', $email );
