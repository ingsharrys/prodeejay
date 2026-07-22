<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * The general admin settings
 *
 * @author   Jamie Madden, WC Vendors
 * @category Settings
 * @package  WCVendors/Admin/Settings
 * @version  2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if ( ! class_exists( 'WCVendors_Settings_General', false ) ) :

    /**
     * WC_Admin_Settings_General.
     */
    class WCVendors_Settings_General extends WCVendors_Settings_Page {
        /**
         * Constructor.
         */
        public function __construct() {
            $this->id    = 'general';
            $this->label = __( 'General', 'wc-vendors' );

            parent::__construct();
        }

        /**
         * Get sections.
         *
         * @return array
         */
        public function get_sections() {
            $sections = array(
                '' => __( 'General', 'wc-vendors' ),
            );

            return apply_filters( 'wcvendors_get_sections_' . $this->id, $sections );
        }

        /**
         * Get settings array.
         *
         * @param string $current_section The current settings section.
         *
         * @return array
         */
        public function get_settings( $current_section = '' ) {
            $settings = array();

            if ( '' === $current_section ) {

                $settings = apply_filters(
                    'wcvendors_settings',
                    array(

                        // General Options.
                        array(
                            'title' => __( 'Marketplace Options', 'wc-vendors' ),
                            'type'  => 'title',
                            'desc'  => __( 'These are the general settings for your marketplace', 'wc-vendors' ),
                            'id'    => 'general_options',
                        ),
                        array(
                            // translators: %s The name used to refer to a vendor.
                            'title'   => sprintf( __( '%s Registration', 'wc-vendors' ), wcv_get_vendor_name() ),
                            // translators: %s The name used to refer to a vendor.
                            'desc'    => sprintf( __( 'Allow users to apply to become a %s', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                            'id'      => 'wcvendors_vendor_allow_registration',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),
                        array(
                            'title'   => sprintf( __( 'Terms & Conditions Checkbox', 'wc-vendors' ), wcv_get_vendor_name() ),
                            // translators: %s The name used to refer to a vendor.
                            'desc'    => sprintf( __( 'Make the terms and conditions checkbox always visible even if become a %s is not checked', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                            'id'      => 'wcvendors_terms_and_conditions_visibility',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),
                        array(
                            // translators: %s The name used to refer to a vendor.
                            'title'   => sprintf( __( '%s Approval', 'wc-vendors' ), wcv_get_vendor_name() ),
                            // translators: %s The name used to refer to a vendor.
                            'desc'    => sprintf( __( 'Manually approve all %s applications', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                            'id'      => 'wcvendors_vendor_approve_registration',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),
                        array(
                            // translators: %s The name used to refer to a vendor.
                            'title'   => sprintf( __( '%s Taxes', 'wc-vendors' ), wcv_get_vendor_name() ),
                            // translators: %s The name used to refer to a vendor.
                            'desc'    => sprintf( __( 'Give any taxes to the %s', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                            'id'      => 'wcvendors_vendor_give_taxes',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),
                        array(
                            // translators: %s The name used to refer to a vendor.
                            'title'       => sprintf( __( '%s Shipping', 'wc-vendors' ), wcv_get_vendor_name() ),
                            // translators: %s The name used to refer to a vendor.
                            'desc'        => sprintf( __( 'Give any shipping to the %s', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                            'id'          => 'wcvendors_vendor_give_shipping',
                            'default'     => 'no',
                            'type'        => 'checkbox',
                            'should_hide' => ! is_wcv_pro_active(),
                        ),
                        array(
                            // translators: %s The name used to refer to a vendor.
                            'title'   => sprintf( __( '%s Role', 'wc-vendors' ), wcv_get_vendor_name() ),
                            'desc'    => __( 'Make the vendor role the primary role for all vendors', 'wc-vendors' ),
                            'id'      => 'wcvendors_vendor_primary_role',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),
                        array(
                            'title'   => __( 'Access to WP-Admin', 'wc-vendors' ),
                            /* translators: %s: vendor name */
                            'desc'    => sprintf( __( 'Allow %s access to the /wp-admin/ area', 'wc-vendors' ), lcfirst( wcv_get_vendor_name( false ) ) ),
                            'id'      => 'wcvendors_vendor_can_access_wp_admin',
                            'type'    => 'checkbox',
                            'default' => 'no',
                        ),
                        array(
                            'title'   => __( 'Marketplace Dashboard Cache', 'wc-vendors' ),
                            'desc'    => __( 'Enable caching for Marketplace Dashboard', 'wc-vendors' ),
                            'id'      => 'wcvendors_enable_dashboard_cache',
                            'type'    => 'checkbox',
                            'default' => 'yes',
                        ),
                        array(
                            'type' => 'sectionend',
                            'id'   => 'general_options',
                        ),
                    )
                );
            }

            if ( ! maybe_load_new_dashboard() ) {
                $settings = array_filter(
                    $settings,
                    function ( $setting ) {
                        return 'wcvendors_vendor_can_access_wp_admin' !== $setting['id'];
                    }
                );
            }

            return apply_filters( 'wcvendors_get_settings_' . $this->id, $settings, $current_section );
        }
    }

endif;

return new WCVendors_Settings_General();
