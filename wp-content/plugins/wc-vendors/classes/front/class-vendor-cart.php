<?php
/**
 * Class WCV_Vendor_Cart
 */
class WCV_Vendor_Cart {


    /**
     * Contructor
     */
    public function __construct() {

        if ( 'yes' === get_option( 'wcvendors_display_label_sold_by_enable', 'no' ) ) {
            add_filter( 'woocommerce_get_item_data', array( 'WCV_Vendor_Cart', 'sold_by' ), 10, 2 );
            add_action( 'woocommerce_product_meta_start', array( 'WCV_Vendor_Cart', 'sold_by_meta' ), 10, 2 );
        }
    }


    /**
     * Sold by in cart item
     *
     * @param array $values  Values.
     * @param array $cart_item Cart item.
     *
     * @return unknown
     */
    public static function sold_by( $values, $cart_item ) {

        $product_id        = $cart_item['product_id'];
        $post              = get_post( $product_id );
        $vendor_id         = $post->post_author;
        $sold_by_label     = __( get_option( 'wcvendors_label_sold_by' ), 'wc-vendors' ); // phpcs:ignore
        $sold_by_separator = __( get_option( 'wcvendors_label_sold_by_separator' ), 'wc-vendors' ); // phpcs:ignore
        $sold_by           = wcv_get_sold_by_link( $vendor_id );

        $values[] = array(
            'name'    => apply_filters( 'wcvendors_cart_sold_by', $sold_by_label, $product_id, $vendor_id, $sold_by_separator ),
            'display' => $sold_by,
        );

        return $values;
    }


    /**
     * Single product meta
     */
    public static function sold_by_meta() {

        $vendor_id         = get_the_author_meta( 'ID' );
        $sold_by_label     = __( get_option( 'wcvendors_label_sold_by' ), 'wc-vendors' ); // phpcs:ignore
        $sold_by_separator = __( get_option( 'wcvendors_label_sold_by_separator' ), 'wc-vendors' ); // phpcs:ignore
        $sold_by           = wcv_get_sold_by_link( $vendor_id, 'wcvendors_cart_sold_by_meta' );

        echo wcv_get_vendor_sold_by( $vendor_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
}
