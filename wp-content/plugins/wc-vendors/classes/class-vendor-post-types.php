<?php
/**
 * Post Types
 *
 * Registers post types and taxonomies
 *
 * @class       WCV_Post_Types
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
use Automattic\WooCommerce\Utilities\OrderUtil;

/**
 * WCV_Post_Types Class
 */
class WCV_Post_Types {

    /**
     * Hook in methods.
     */
    public static function init() {

        add_action( 'woocommerce_register_post_type', array( __CLASS__, 'register_shop_order_vendor' ) );
        add_filter( 'woocommerce_can_reduce_order_stock', array( __CLASS__, 'prevent_reduce_stock_for_shop_vendor_order_type' ), 10, 2 );
        add_filter( 'wpo_wcpdf_document_is_allowed', array( __CLASS__, 'disallow_document_creation_for_shop_order_vendor_type' ), 10, 2 );
    }

    /**
     * Register vendor order type
     */
    public static function register_shop_order_vendor() {

        wc_register_order_type(
            'shop_order_vendor',
            apply_filters(
                'woocommerce_register_post_type_shop_order_vendor',
                array(
                    'label'                            => sprintf(
                        /* translators: %s: vendor name */
                        __( '%s Orders', 'wc-vendors' ),
                        wcv_get_vendor_name()
                    ),
                    'capability_type'                  => 'shop_order',
                    'public'                           => false,
                    'hierarchical'                     => false,
                    'supports'                         => false,
                    'exclude_from_orders_screen'       => false,
                    'add_order_meta_boxes'             => false,
                    'exclude_from_order_count'         => true,
                    'exclude_from_order_views'         => true,
                    'exclude_from_order_reports'       => true,
                    'exclude_from_order_sales_reports' => true,
                    'exclude_from_order_webhooks'      => true,
                    'show_in_rest'                     => false,
                    'class_name'                       => 'WC_Order_Vendor',
                )
            )
        );
    }

    /**
     * Prevent reduce stock for shop_vendor order type.
     *
     * @since 2.5.0
     * @param bool     $reduce_stock The reduce stock flag.
     * @param WC_Order $order The order object.
     *
     * @return bool $reduce_stock The reduce stock flag.
     */
    public static function prevent_reduce_stock_for_shop_vendor_order_type( $reduce_stock, $order ) {
        $order_type = OrderUtil::get_order_type( $order->get_id() );

        if ( null === $order_type ) {
            return $reduce_stock;
        }

        if ( 'shop_order_vendor' === $order_type ) {
            $reduce_stock = false;
        }

        return $reduce_stock;
    }


    /**
     * WPO – PDF Invoices & Packing Slips for WooCommerce
     * Disallow the creation of documents for orders with 'shop_order_vendor' type which will be created by WC Vendors Marketplace plugin.
     *
     * @since 2.5.0
     * @param bool                                          $allowed Whether the document creation is allowed.
     * @param \WPO\WC\PDF_Invoices\Documents\Order_Document $document The document object.
     *
     * @return bool
     */
    public static function disallow_document_creation_for_shop_order_vendor_type( bool $allowed, \WPO\WC\PDF_Invoices\Documents\Order_Document $document ) {
        if ( ! empty( $document->order ) && 'shop_order_vendor' === $document->order->get_type() ) {
            return false;
        }

        return $allowed;
    }
}

WCV_Post_Types::init();
