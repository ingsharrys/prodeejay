<?php

/**
 * The WCV Tracking Number Form Class
 *
 * This is the tracking number form class
 *
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
namespace WC_Vendors\Classes\Front\Forms;

use WC_Vendors\Classes\Front\WCV_Form_Helper;
use WC_Vendors\Classes\Front\WCV_Order_Controller;
/**
 * Tacking number form
 *
 * @version 1.7.10
 * @since   1.0.0
 */
class WCV_Tracking_Number_Form {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @var      string $wcvendors_pro The ID of this plugin.
     */
    private $wcvendors_pro;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Is the plugin in debug mode
     *
     * @since    1.0.0
     * @var      bool $debug plugin is in debug mode
     */
    private $debug;

    /**
     * Is the plugin base directory
     *
     * @since    1.0.0
     * @var      string $base_dir string path for the plugin directory
     */
    private $base_dir;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     *
     * @param string $wcvendors_pro The name of the plugin.
     * @param string $version       The version of this plugin.
     * @param bool   $debug         Whether debug is enabled or not.
     */
    public function __construct( $wcvendors_pro, $version, $debug ) {

        $this->wcvendors_pro = $wcvendors_pro;
        $this->version       = $version;
        $this->debug         = $debug;
        $this->base_dir      = plugin_dir_path( __DIR__ );
    }

    /**
     *  Output required form data
     *
     * @since 1.8.7 - Add optional arguments
     * @since    1.0.0
     *
     * @param int    $order_id  The order d for this meta if any.
     * @param string $button_text The button text.
     * @param array  $args The arguments.
     */
    public static function form_data( $order_id, $button_text, $args = array() ) {

        WCV_Form_Helper::input(
            apply_filters(
                'wcv_tracking_number_order_id',
                wp_parse_args(
                    $args,
                    array(
                        'type'  => 'hidden',
                        'id'    => '_wcv_order_id',
                        'value' => $order_id,
                        'class' => 'wcv-button',
                    )
                )
            )
        );

        wp_nonce_field( 'wcv_add_tracking_number', 'wcv_add_tracking_number_nonce' );

        self::save_button( $button_text, $args );
    }

    /**
     *  Output tracking number.
     *
     * @param string $tracking_number The tracking number.
     * @param int    $order_id        The order id.
     * @param array  $args            The arguments.
     *
     * @version 1.7.7
     * @since   1.0.0
     * @since 1.8.7 - Add optional arguments
     */
    public static function tracking_number( $tracking_number, $order_id, $args = array() ) {

        // Tracking number.
        WCV_Form_Helper::input(
            apply_filters(
                'wcv_tracking_number',
                wp_parse_args(
                    $args,
                    array(
                        'id'                => '_wcv_tracking_number_' . $order_id,
                        'label'             => __( 'Tracking number', 'wc-vendors' ),
                        'placeholder'       => __( 'Tracking number', 'wc-vendors' ),
                        'type'              => 'text',
                        'value'             => $tracking_number,
                        'class'             => 'wcv_tracking_number',
                        'custom_attributes' => array(
                            'required' => '',

                        ),
                        'no_margin'         => false,
                    )
                )
            )
        );
    } // tracking_number

    /**
     *  Output date shipped date picker
     *
     * @since    1.0.0
     * @since 1.8.7 - Add optional arguments
     *
     * @param string $date_shipped The date shipped.
     * @param int    $order_id The order id.
     * @param array  $args The arguments.
     */
    public static function date_shipped( $date_shipped, $order_id, $args = array() ) {

        // Date shipped.
        WCV_Form_Helper::input(
            apply_filters(
                'wcv_tracking_number_date_shipped',
                wp_parse_args(
                    $args,
                    array(
                        'id'                  => '_wcv_date_shipped_' . $order_id,
                        'label'               => __( 'Date shipped', 'wc-vendors' ),
                        'class'               => 'wcv_date_shipped wcv-datepicker wcv-init-picker wcv_shipped_date _wcv_date_shipped_' . $order_id,
                        'value'               => $date_shipped,
                        'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                        'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                        'placeholder'         => 'YYYY-MM-DD',
                        'no_margin'           => true,
                    )
                )
            )
        );
    } // date_shipped

    /**
     *  Output shipping providers
     *
     * @since 1.8.7 - Add optional arguments
     * @since   1.0.0
     * @version 1.7.10
     *
     * @param string $shipping_provider Shipping provider.
     * @param int    $order_id           Order ID for this meta if any.
     * @param array  $args                Arguments for the select field.
     */
    public static function shipping_provider( $shipping_provider, $order_id, $args = array() ) {

        // Shipping Provider.
        WCV_Form_Helper::nested_select(
            apply_filters(
                'wcv_tracking_number_shipping_provider',
                wp_parse_args(
                    $args,
                    array(
                        'id'            => '_wcv_shipping_provider_' . $order_id,
                        'label'         => __( 'Shipping provider', 'wc-vendors' ),
                        'value'         => $shipping_provider,
                        'class'         => 'wcv_shipping_provider wcv-select2',
                        'value_type'    => 'key',
                        'options'       => WCV_Order_Controller::shipping_providers(),
                        'wrapper_start' => '<div class="control-group">',
                        'wrapper_end'   => '</div>',
                    )
                )
            )
        );
    } // shipping_provider

    /**
     *  Output add tracking number button
     *
     * @since 1.8.7 - Add optional arguments
     * @since    1.0.0 - Added
     *
     * @param  string $button_text The save button text.
     * @param array  $args        The arguments.
     */
    public static function save_button( $button_text, $args = array() ) {

        WCV_Form_Helper::submit(
            apply_filters(
                'wcv_tracking_number_save_button',
                wp_parse_args(
                    $args,
                    array(
                        'id'    => 'tracking_number_save_button',
                        'value' => $button_text,
                        'class' => 'wcv-button',
                    )
                )
            )
        );
    }
}
