<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * The display settings class
 *
 * @author      Jamie Madden, WC Vendors
 * @category    Settings
 * @package     WCVendors/Admin/Settings
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if ( ! class_exists( 'WCVendors_Settings_Payments', false ) ) :

    /**
     * WC_Admin_Settings_General.
     */
    class WCVendors_Settings_Payments extends WCVendors_Settings_Page {

        /**
         * Constructor.
         */
        public function __construct() {

            $this->id    = 'payments';
            $this->label = __( 'Payments', 'wc-vendors' );

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
         * @param string $current_section Current section.
         * @return array
         */
        public function get_settings( $current_section = '' ) {

            $settings = apply_filters(
                'wcvendors_settings_payments_general',
                array(
                    // Shop Display Options.
                    array(
                        'title' => '',
                        'type'  => 'title',
                        // translators: %s: vendor name.
                        'desc'  => sprintf( __( 'Payments controls how your %s commission is paid out. These settings only function if you are using a supported gateway.', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                        'id'    => 'payment_general_options',
                    ),

                    array(
                        'type' => 'sectionend',
                        'id'   => 'payment_general_options',
                    ),
                )
            );

            return apply_filters( 'wcvendors_get_settings_' . $this->id, $settings, $current_section );
        }
    }

endif;

return new WCVendors_Settings_Payments();
