<?php
/**
 * Class to submit a comment for an order
 *
 * @version 2.4.8
 * @since   2.4.8 - Added HPOS compatibility and new PHPCS standards.
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 */
class WCV_Submit_Comment {

    /**
     * Submit a comment for an order
     *
     * @param WC_Order[] $orders The list of orders for this vendor.
     *
     * @return bool|void
     */
    public function new_comment( $orders ) {

        $user = wp_get_current_user();
        $user = (int) $user->ID;

        // Verify nonce.
        if ( isset( $_POST['_wpnonce'] ) && ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'add-comment' ) ) {
            return false;
        }

        // Check if this product belongs to the vendor submitting the comment.
        $product_id = isset( $_POST['product_id'] ) ? (int) sanitize_text_field( wp_unslash( $_POST['product_id'] ) ) : '';

        if ( empty( $product_id ) ) {
            return false;
        }

        $author = (int) WCV_Vendors::get_vendor_from_product( $product_id );

        if ( $author !== $user ) {
            return false;
        }

        $order_id = isset( $_POST['order_id'] ) ? (int) sanitize_text_field( wp_unslash( $_POST['order_id'] ) ) : '';

        if ( empty( $order_id ) ) {
            return false;
        }

        // Find the order belonging to this comment.
        foreach ( $orders as $order ) {
            if ( $order->get_id() === $order_id ) {
                $found_order = $order;
                break;
            }
        }

        // No order was found.
        if ( empty( $found_order ) ) {
            return false;
        }

        // Verify the vendor has permission to access this order.
        if ( ! WCV_Vendor_Dashboard::check_object_permission( 'order', $found_order->get_id() ) ) {
            return false;
        }

        // Don't submit empty comments.
        if ( isset( $_POST['comment_text'] ) && empty( $_POST['comment_text'] ) ) {
            wc_add_notice( __( 'You\'ve left the comment field empty!', 'wc-vendors' ), 'error' );

            return false;
        }

        // Only submit if the order has the product belonging to this vendor.
        $parent_order = wc_get_order( $found_order->get_parent_id() );
        $valid_order  = false;

        /**
         * Loop through the order items and check if the product ID matches the product ID of the product belonging to this vendor.
         *
         * @var WC_Order_Item_Product $item The order item product.
         */
        foreach ( $parent_order->get_items() as $item ) {
            if ( $item->get_product_id() === $product_id ) {
                $valid_order = true;
                break;
            }
        }

        if ( $valid_order ) {
            $comment = isset( $_POST['comment_text'] ) ? esc_textarea( sanitize_textarea_field( wp_unslash( $_POST['comment_text'] ) ) ) : '';

            if ( empty( $comment ) ) {
                return false;
            }

            add_filter( 'woocommerce_new_order_note_data', array( $this, 'filter_comment' ), 10, 1 );
            $parent_order->add_order_note( $comment, 1 );
            remove_filter( 'woocommerce_new_order_note_data', array( $this, 'filter_comment' ), 10 );

            wc_add_notice( __( 'Success. The customer has been notified of your comment.', 'wc-vendors' ), 'success' );
        }
    }

    /**
     * Filter the comment data.
     *
     * @param array $commentdata The comment data.
     * @return array
     */
    public function filter_comment( $commentdata ) {

        $user_id = get_current_user_id();

        $commentdata['user_id']              = $user_id;
        $commentdata['comment_author']       = WCV_Vendors::get_vendor_shop_name( $user_id );
        $commentdata['comment_author_url']   = WCV_Vendors::get_vendor_shop_page( $user_id );
        $commentdata['comment_author_email'] = wp_get_current_user()->user_email;

        return $commentdata;
    }
}
