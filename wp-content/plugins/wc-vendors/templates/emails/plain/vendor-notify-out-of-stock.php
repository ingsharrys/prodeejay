<?php
/**
 * Vendor out of stock reminder email (plain text)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/vendor-notify-out-of-stock.php.
 *
 * @author  WC Vendors
 * @package WCVendors/Templates/Emails/Plain
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

echo '= ' . esc_html( $email_heading ) . " =\n\n";

printf(
    /* translators: %s: vendor display name */
    esc_html__( 'Hi %s,', 'wc-vendors' ),
    esc_html( $vendor ? $vendor->display_name : '' )
);

echo "\n\n";
echo esc_html__( 'The following products in your store are currently out of stock. Please restock them as soon as possible to avoid losing sales.', 'wc-vendors' );
echo "\n\n";

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

if ( ! empty( $products ) ) {
    foreach ( $products as $item ) {
        $sku  = $item['product']->get_sku() ? $item['product']->get_sku() : __( 'N/A', 'wc-vendors' );
        $days = sprintf(
            /* translators: %d: number of days */
            _n( '%d day', '%d days', $item['days_out_of_stock'], 'wc-vendors' ),
            (int) $item['days_out_of_stock']
        );

        echo esc_html( $item['product']->get_name() ) . "\n";
        /* translators: %s: product SKU */
        echo esc_html( sprintf( __( 'SKU: %s', 'wc-vendors' ), $sku ) ) . "\n";
        /* translators: %s: number of days out of stock */
        echo esc_html( sprintf( __( 'Out of stock for: %s', 'wc-vendors' ), $days ) ) . "\n";
        echo esc_url( get_permalink( $item['product']->get_id() ) ) . "\n";
        echo "\n";
    }
} else {
    echo esc_html__( 'Your out-of-stock products will be listed here.', 'wc-vendors' ) . "\n\n";
}

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

$additional_content = $email->get_option( 'additional_content' );
if ( $additional_content ) {
    echo esc_html( wp_strip_all_tags( wptexturize( $additional_content ) ) ) . "\n\n";
}

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
