<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

use Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType;

/**
 * WC Vendors Test Gateway Blocks Support
 *
 * @package WC Vendors
 * @version 2.6.7
 */
final class WC_Payment_Method_Type_WCV_Gateway_Test_Block extends AbstractPaymentMethodType {
    /**
     * The name of the payment method.
     *
     * @var string
     */
    protected $name = 'wcvendors_test_gateway';

    /**
     * Initialize the payment method.
     *
     * @return void
     */
    public function initialize() {
        $this->settings = get_option( "woocommerce_{$this->name}_settings", array() );
    }

    /**
     * Get the payment method script handles.
     *
     * @return array
     */
    public function get_payment_method_script_handles() {
        wp_register_script(
            'wcvendors-test-gateway-blocks-js',
            WCV_ASSETS_URL . 'js/blocks/cart-checkout-integration.js',
            array( 'wc-blocks-registry', 'wc-settings', 'wp-element', 'wp-html-entities' ),
            WCV_VERSION,
            true
        );
        return array( 'wcvendors-test-gateway-blocks-js' );
    }

    /**
     * Get the payment method data.
     *
     * @return array
     */
    public function get_payment_method_data() {
        return array(
            'title'                => esc_html( $this->get_setting( 'title' ) ),
            'fallback_title'       => esc_html__( 'WC Vendors Test Gateway', 'wc-vendors' ),
            'description'          => wp_kses_post( $this->get_setting( 'description' ) ),
            'fallback_description' => sprintf(
            /* translators: %s: URL to WCVendors */
                __( 'This is a test gateway - not to be used on live sites for live transactions. <a href="%s" target="_blank" rel="noopener noreferrer">Click here to visit WCVendors.com</a>.', 'wc-vendors' ),
                esc_url( 'https://www.wcvendors.com/' )
            ),
            'supports'             => array(
                'products',
            ),
        );
    }
}
