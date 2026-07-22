<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Notifications settings tab
 *
 * @author   WC Vendors
 * @category Settings
 * @package  WCVendors/Admin/Settings
 * @since    2.6.7
 */

if ( ! class_exists( 'WCVendors_Settings_Notifications', false ) ) :

    /**
     * WCVendors_Settings_Notifications.
     */
    class WCVendors_Settings_Notifications extends WCVendors_Settings_Page {

        /**
         * Constructor.
         */
        public function __construct() {
            $this->id    = 'notifications';
            $this->label = __( 'Notifications', 'wc-vendors' );

            parent::__construct();
        }

        /**
         * Get sections.
         *
         * @return array
         */
        public function get_sections() {
            $sections = array(
                '' => __( 'Notifications', 'wc-vendors' ),
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
                    'wcvendors_notifications_settings',
                    array(

                        // Out of Stock Reminders.
                        array(
                            'title' => __( 'Out of Stock Vendor Reminders', 'wc-vendors' ),
                            'type'  => 'title',
                            'id'    => 'wcvendors_out_of_stock_reminders_title',
                        ),
                        array(
                            'title'   => __( 'Enable Reminders', 'wc-vendors' ),
                            'desc'    => __( 'Send automated email reminders to vendors when their products are out of stock.', 'wc-vendors' ),
                            'id'      => 'wcvendors_notify_vendor_out_of_stock',
                            'type'    => 'checkbox',
                            'default' => 'no',
                        ),
                        array(
                            'title'             => __( 'Reminder Threshold', 'wc-vendors' ),
                            'desc'              => __( 'Number of days a product must be out of stock before the first reminder is sent.', 'wc-vendors' ),
                            'id'                => 'wcvendors_out_of_stock_threshold_days',
                            'type'              => 'number',
                            'default'           => '7',
                            'suffix'            => __( 'days', 'wc-vendors' ),
                            'custom_attributes' => array(
                                'min'  => '0',
                                'step' => '1',
                            ),
                        ),
                        array(
                            'title'   => __( 'Reminder Frequency', 'wc-vendors' ),
                            'desc'    => __( 'How often to re-send the reminder until the product is restocked.', 'wc-vendors' ),
                            'id'      => 'wcvendors_out_of_stock_reminder_frequency',
                            'type'    => 'select',
                            'default' => 'weekly',
                            'options' => array(
                                'weekly'  => __( 'Weekly', 'wc-vendors' ),
                                'monthly' => __( 'Monthly', 'wc-vendors' ),
                            ),
                        ),
                        array(
                            'type' => 'sectionend',
                            'id'   => 'wcvendors_out_of_stock_reminders_end',
                        ),
                    )
                );
            }

            return apply_filters( 'wcvendors_get_settings_' . $this->id, $settings, $current_section );
        }
    }

endif;

return new WCVendors_Settings_Notifications();
