<?php
/**
 * Vendor Order Items (plain)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/plain/vendor-order-items.php.
 *
 * @author         Jamie Madden, WC Vendors
 * @package        WCvendors/Templates/Emails/Plain
 * @version        2.0.0
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

foreach ( $items as $item_id => $item ) :
    if ( apply_filters( 'woocommerce_order_item_visible', true, $item ) ) {
        $product   = $item->get_product();
        $item_name = apply_filters( 'woocommerce_order_item_name', $item->get_name(), $item, false );
        echo wp_kses_post( $item_name );
        if ( $show_sku && $product->get_sku() ) {
            $item_sku = ' (#' . $product->get_sku() . ')';
            echo wp_kses_post( $item_sku );
        }
        $item_quantity = apply_filters( 'woocommerce_email_order_item_quantity', $item->get_quantity(), $item );
        echo ' X ' . wp_kses_post( $item_quantity );
        $item_total = $order->get_formatted_line_subtotal( $item );
        echo ' = ' . wp_kses_post( $item_total ) . "\n";

        // Allow other plugins to add additional product information here.
        do_action( 'woocommerce_order_item_meta_start', $item_id, $item, $order, $plain_text );
        echo wp_kses_post(
            wp_strip_all_tags(
                wc_display_item_meta(
                    $item,
                    array(
                        'before'    => "\n- ",
                        'separator' => "\n- ",
                        'after'     => '',
                        'echo'      => false,
                        'autop'     => false,
                    )
                )
            )
        );

        // Allow other plugins to add additional product information here.
        do_action( 'woocommerce_order_item_meta_end', $item_id, $item, $order, $plain_text );
    }
    echo "\n\n";
endforeach;
