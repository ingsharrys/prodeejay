<?php

/**
 * Vendor Out of Stock Reminder Email
 *
 * @package WC_Vendors
 * @since   2.6.7
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WCVendors_Vendor_Notify_Out_Of_Stock' ) ) :

    /**
     * Vendor Out of Stock Reminder Email
     *
     * An email digest sent to a vendor listing all their products that have been
     * out of stock beyond the configured threshold.
     *
     * @class       WCVendors_Vendor_Notify_Out_Of_Stock
     * @version     2.6.7
     * @package     Classes/Admin/Emails
     * @author      WC Vendors
     * @extends     WC_Email
     */
    class WCVendors_Vendor_Notify_Out_Of_Stock extends WC_Email {

        /**
         * The vendor user object.
         *
         * @var WP_User
         */
        public $vendor;

        /**
         * Out-of-stock products for this vendor.
         *
         * @var array
         */
        public $products = array();

        /**
         * Constructor.
         */
        public function __construct() {

            $this->id    = 'wcv_vendor_out_of_stock_reminder';
            $this->title = sprintf(
                // translators: %s is the name used to refer to a vendor.
                __( '%s Out of Stock Reminder', 'wc-vendors' ),
                wcv_get_vendor_name()
            );
            $this->description = sprintf(
                // translators: %s is the name used to refer to a vendor.
                __( 'Reminder email sent to %s when their products have been out of stock beyond the configured threshold.', 'wc-vendors' ),
                wcv_get_vendor_name( true, false )
            );
            $this->template_html  = 'emails/vendor-notify-out-of-stock.php';
            $this->template_plain = 'emails/plain/vendor-notify-out-of-stock.php';
            $this->template_base  = dirname( dirname( dirname( __DIR__ ) ) ) . '/templates/';
            $this->placeholders   = array(
                '{site_title}'  => $this->get_blogname(),
                '{vendor_name}' => '',
            );
            $this->recipient      = '';

            // Call parent constructor.
            parent::__construct();
        }

        /**
         * Get email subject.
         *
         * @since  2.6.7
         * @return string
         */
        public function get_default_subject() {
            return __( '[{site_title}] Products out of stock reminder', 'wc-vendors' );
        }

        /**
         * Get email heading.
         *
         * @since  2.6.7
         * @return string
         */
        public function get_default_heading() {
            return __( 'Products Out of Stock', 'wc-vendors' );
        }

        /**
         * Trigger the sending of this email.
         *
         * @param int   $vendor_id The vendor user ID.
         * @param array $products  Array of product data arrays, each with keys 'product' (WC_Product) and 'days_out_of_stock' (int).
         */
        public function trigger( $vendor_id, $products ) {

            $this->setup_locale();

            $vendor = get_userdata( $vendor_id );

            if ( ! $vendor || empty( $products ) ) {
                $this->restore_locale();
                return;
            }

            $this->vendor                        = $vendor;
            $this->products                      = $products;
            $this->recipient                     = $vendor->user_email;
            $this->placeholders['{vendor_name}'] = $vendor->display_name;

            if ( $this->is_enabled() && $this->get_recipient() ) {
                $this->send(
                    $this->get_recipient(),
                    $this->get_subject(),
                    $this->get_content(),
                    $this->get_headers(),
                    $this->get_attachments()
                );
            }

            $this->restore_locale();
        }

        /**
         * Return the vendor to use when rendering the template.
         *
         * Falls back to the currently logged-in user so the WooCommerce email
         * preview (which renders without calling trigger()) still shows a name.
         *
         * @since  2.6.7
         * @return WP_User|null
         */
        protected function get_template_vendor() {
            if ( $this->vendor ) {
                return $this->vendor;
            }

            $current_user = wp_get_current_user();
            return $current_user->exists() ? $current_user : null;
        }

        /**
         * Get content html.
         *
         * @return string
         */
        public function get_content_html() {

            return apply_filters(
                'wcv_vendor_notify_out_of_stock_get_content_html',
                wc_get_template_html(
                    $this->template_html,
                    array(
                        'vendor'         => $this->get_template_vendor(),
                        'products'       => $this->products,
                        'email_heading'  => $this->get_heading(),
                        'sent_to_admin'  => false,
                        'sent_to_vendor' => true,
                        'plain_text'     => false,
                        'email'          => $this,
                    ),
                    'woocommerce',
                    $this->template_base
                ),
                $this
            );
        }

        /**
         * Get content plain.
         *
         * @return string
         */
        public function get_content_plain() {

            return apply_filters(
                'wcv_vendor_notify_out_of_stock_get_content_plain',
                wc_get_template_html(
                    $this->template_plain,
                    array(
                        'vendor'         => $this->get_template_vendor(),
                        'products'       => $this->products,
                        'email_heading'  => $this->get_heading(),
                        'sent_to_admin'  => false,
                        'sent_to_vendor' => true,
                        'plain_text'     => true,
                        'email'          => $this,
                    ),
                    'woocommerce',
                    $this->template_base
                ),
                $this
            );
        }

        /**
         * Initialize settings form fields.
         */
        public function init_form_fields() {

            $this->form_fields = array(
                'enabled'            => array(
                    'title'   => __( 'Enable/Disable', 'wc-vendors' ),
                    'type'    => 'checkbox',
                    'label'   => __( 'Enable this email notification', 'wc-vendors' ),
                    'default' => 'yes',
                ),
                'subject'            => array(
                    'title'       => __( 'Subject', 'wc-vendors' ),
                    'type'        => 'text',
                    'desc_tip'    => true,
                    /* translators: %s: list of placeholders */
                    'description' => sprintf( __( 'Available placeholders: %s', 'wc-vendors' ), '<code>{site_title}, {vendor_name}</code>' ),
                    'placeholder' => $this->get_default_subject(),
                    'default'     => '',
                ),
                'heading'            => array(
                    'title'       => __( 'Email heading', 'wc-vendors' ),
                    'type'        => 'text',
                    'desc_tip'    => true,
                    /* translators: %s: list of placeholders */
                    'description' => sprintf( __( 'Available placeholders: %s', 'wc-vendors' ), '<code>{site_title}, {vendor_name}</code>' ),
                    'placeholder' => $this->get_default_heading(),
                    'default'     => '',
                ),
                'additional_content' => array(
                    'title'       => __( 'Additional content', 'wc-vendors' ),
                    'description' => __( 'Text to appear below the main email content.', 'wc-vendors' ),
                    'css'         => 'width:400px; height: 75px;',
                    'placeholder' => __( 'N/A', 'wc-vendors' ),
                    'type'        => 'textarea',
                    'default'     => '',
                    'desc_tip'    => true,
                ),
                'email_type'         => array(
                    'title'       => __( 'Email type', 'wc-vendors' ),
                    'type'        => 'select',
                    'description' => __( 'Choose which format of email to send.', 'wc-vendors' ),
                    'default'     => 'html',
                    'class'       => 'email_type wc-enhanced-select',
                    'options'     => $this->get_email_type_options(),
                    'desc_tip'    => true,
                ),
            );
        }
    }

endif;
