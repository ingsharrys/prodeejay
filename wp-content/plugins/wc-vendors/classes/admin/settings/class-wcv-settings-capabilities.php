<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * The capabilities settings class
 *
 * @author      Jamie Madden, WC Vendors
 * @category    Settings
 * @package     WCVendors/Admin/Settings
 * @version     2.0.0
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WCVendors_Settings_Capabilities', false ) ) :

    /**
     * WC_Admin_Settings_General.
     */
    class WCVendors_Settings_Capabilities extends WCVendors_Settings_Page {


        /**
         * Constructor.
         */
        public function __construct() {

            $this->id    = 'capabilities';
            $this->label = __( 'Capabilities', 'wc-vendors' );

            parent::__construct();

            add_action( 'wcvendors_settings_start', array( $this, 'enqueue_ai_moderate_scripts' ) );
            add_action( 'admin_footer', array( $this, 'output_ai_moderate_modal' ) );
        }

        /**
         * Get sections.
         *
         * @return array
         */
        public function get_sections() {

            $sections = array(
                ''        => __( 'General', 'wc-vendors' ),
                'product' => __( 'Products', 'wc-vendors' ),
                'order'   => __( 'Orders', 'wc-vendors' ),

            );

            return apply_filters( 'wcvendors_get_sections_' . $this->id, $sections );
        }

        /**
         * Get settings array.
         *
         * @param string $current_section The current section.
         *
         * @since 2.6.6 Add AI Moderate feature.
         *
         * @return array
         */
        public function get_settings( $current_section = '' ) {

            if ( 'product' === $current_section ) {

                $settings = apply_filters(
                    'wcvendors_settings_capabilities_product',
                    array(

                        array(
                            'title' => __( 'Add / Edit Product', 'wc-vendors' ),
                            'type'  => 'title',
                            'desc'  => sprintf(
                                /* translators: %s vendor name */
                                __( 'Configure what product information to hide from the %s when creating or editing a product', 'wc-vendors' ),
                                wcv_get_vendor_name( true, false )
                            ),
                            'id'    => 'product_add_options',
                        ),

                        array(
                            'title'    => __( 'Product Types', 'wc-vendors' ),
                            'desc'     => sprintf(
                                /* translators: %s vendor name */
                                __( 'This controls what product types are hidden from the %s', 'wc-vendors' ),
                                wcv_get_vendor_name( true, false )
                            ),
                            'id'       => 'wcvendors_capability_product_types',
                            'class'    => 'wc-enhanced-select',
                            'css'      => 'min-width:300px;',
                            'type'     => 'multiselect',
                            'options'  => wc_get_product_types(),
                            'desc_tip' => true,
                        ),

                        array(
                            'title'    => __( 'Product Type Options', 'wc-vendors' ),
                            'desc'     => sprintf(
                                /* translators: %s vendor name */
                                __( 'This controls what product type options are hidden from the %s', 'wc-vendors' ),
                                wcv_get_vendor_name( true, false )
                            ),
                            'id'       => 'wcvendors_capability_product_type_options',
                            'class'    => 'wc-enhanced-select',
                            'css'      => 'min-width:300px;',
                            'type'     => 'multiselect',
                            'options'  => array(
                                'virtual'      => __( 'Virtual', 'wc-vendors' ),
                                'downloadable' => __( 'Downloadable', 'wc-vendors' ),
                            ),
                            'desc_tip' => true,
                        ),

                        array(
                            'title'    => __( 'Product Data Tabs', 'wc-vendors' ),
                            'desc'     => sprintf(
                                /* translators: %s vendor name */
                                __( 'This controls what product data tabs will be hidden from the %s', 'wc-vendors' ),
                                wcv_get_vendor_name( true, false )
                            ),
                            'id'       => 'wcvendors_capability_product_data_tabs',
                            'class'    => 'wc-enhanced-select',
                            'css'      => 'min-width:300px;',
                            'type'     => 'multiselect',
                            'options'  => apply_filters(
                                'wcvendors_capability_product_data_tabs',
                                array(
                                    'general'        => __( 'General', 'wc-vendors' ),
                                    'inventory'      => __( 'Inventory', 'wc-vendors' ),
                                    'shipping'       => __( 'Shipping', 'wc-vendors' ),
                                    'linked_product' => __( 'Linked Products', 'wc-vendors' ),
                                    'attributes'     => __( 'Attributes', 'wc-vendors' ),
                                    'variations'     => __( 'Variations', 'wc-vendors' ),
                                    'advanced'       => __( 'Advanced', 'wc-vendors' ),
                                )
                            ),
                            'desc_tip' => true,
                        ),

                        array(
                            'title'   => __( 'Featured Product', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to use the featured product option', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_product_featured',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Duplicate Product', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to duplicate products', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_product_duplicate',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'SKU', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Hide sku field from %s', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_product_sku',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Taxes', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Hide tax fields from %s', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_product_taxes',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Create New Tags', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to create new tags', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_create_product_tags',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'type' => 'sectionend',
                            'id'   => 'product_add_options',
                        ),

                    )
                );
            } elseif ( 'order' === $current_section ) {

                $settings = apply_filters(
                    'wcvendors_settings_capabilities_order',
                    array(

                        array(
                            'type' => 'title',
                            'desc' => sprintf(
                                /* translators: %s vendor name */
                                __( 'Configure what order information a %s can view from an order', 'wc-vendors' ),
                                wcv_get_vendor_name( true, false )
                            ),
                            'id'   => 'order_view_options',
                        ),

                        array(
                            'title'   => __( 'View Order Notes', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view order notes', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_read_notes',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Add Order Notes', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to add order notes.', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_update_notes',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Customer Name', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view customer name fields', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_customer_name',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Customer Shipping Name', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view customer shipping name fields', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_customer_shipping_name',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Customer Billing Address', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view customer billing address fields', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_customer_billing',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Customer Shipping Address', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view the customer shipping fields', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_customer_shipping',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Customer Email', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view the customer email address', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_customer_email',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Customer Phone', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to view the customer phone number', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_order_customer_phone',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'type' => 'sectionend',
                            'id'   => 'order_view_options',
                        ),

                    )
                );
            } else {

                $settings = apply_filters(
                    'wcvendors_settings_capabilities_general',
                    array(

                        array(
                            'title' => __( 'Permissions', 'wc-vendors' ),
                            'type'  => 'title',
                            'desc'  => sprintf(
                                /* translators: %s vendor name */
                                __( 'Enable or disable functionality for your %s', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'    => 'capabilities_options',
                        ),

                        array(
                            'type' => 'sectionend',
                            'id'   => 'capabilities_options',
                        ),

                        // Products.
                        array(
                            'title' => __( 'Products', 'wc-vendors' ),
                            'type'  => 'title',
                            'id'    => 'permissions_products_options',
                        ),

                        array(
                            'title'   => __( 'Submit Products', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to add/edit products', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_products_enabled',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Edit Live Products', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to edit published (live) products', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_products_edit',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Publish Approval', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to publish products directly to the marketplace without requiring approval.', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_products_live',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'AI Moderate', 'wc-vendors' ),
                            'desc'    => $this->get_ai_moderate_description(),
                            'id'      => 'wcvendors_capability_ai_moderate',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Purchase Own Products', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to purchase their own products', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_products_purchase_own',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'title'   => __( 'Review Own Products', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to review their own products', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_products_review_own',
                            'default' => 'no',
                            'type'    => 'checkbox',
                        ),

                        array(
                            'type' => 'sectionend',
                            'id'   => 'permissions_products_options',
                        ),

                        // Orders.
                        array(
                            'title' => __( 'Orders', 'wc-vendors' ),
                            'type'  => 'title',
                            'id'    => 'permissions_orders_options',
                        ),
                        array(
                            'title'   => __( 'Export Orders', 'wc-vendors' ),
                            'desc'    => sprintf(
                                /* translators: %s vendor name */
                                __( 'Allow %s to export their orders to a CSV file', 'wc-vendors' ),
                                wcv_get_vendor_name( false, false )
                            ),
                            'id'      => 'wcvendors_capability_orders_export',
                            'default' => 'yes',
                            'type'    => 'checkbox',
                        ),
                        array(
                            'type' => 'sectionend',
                            'id'   => 'permissions_orders_options',
                        ),

                    )
                );
            }

            return apply_filters( 'wcvendors_get_settings_' . $this->id, $settings, $current_section );
        }

        /**
         * Get AI Moderate description based on Store Agent status.
         *
         * @return string
         */
        private function get_ai_moderate_description() {
            $plugin_basename = 'storeagent-ai-for-woocommerce/storeagent-ai-for-woocommerce.php';
            $desc            = __( 'Enable AI moderation for products', 'wc-vendors' );

            // Check if Store Agent is installed and active.
            if ( ! function_exists( 'is_plugin_active' ) ) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }

            if ( ! wcv_is_plugin_installed( $plugin_basename ) ) {
                return $desc . ' <span class="description" style="color: #d63638;">(' . __( 'Store Agent AI for WooCommerce plugin is required', 'wc-vendors' ) . ')</span>';
            }

            if ( ! is_plugin_active( $plugin_basename ) ) {
                return $desc . ' <span class="description" style="color: #d63638;">(' . __( 'Store Agent AI for WooCommerce plugin must be activated', 'wc-vendors' ) . ')</span>';
            }

            // Check if Store Agent is connected.
            if ( class_exists( '\SAAI\Helpers\Connect' ) ) {
                $is_connected = \SAAI\Helpers\Connect::is_connected();
                if ( ! $is_connected ) {
                    return $desc . ' <span class="description" style="color: #d63638;">(' . __( 'You need to connect your store to Store Agent AI first', 'wc-vendors' ) . ')</span>';
                }
            }

            return $desc;
        }

        /**
         * Enqueue scripts for AI Moderate feature.
         *
         * @return void
         */
        public function enqueue_ai_moderate_scripts() {
            global $current_tab;

            // Only enqueue on capabilities tab.
            if ( 'capabilities' !== $current_tab ) {
                return;
            }
            wp_enqueue_script(
                'wcv-ai-moderate',
                WCV_ASSETS_URL . 'js/admin/ai-moderate.js',
                array( 'jquery' ),
                WCV_VERSION,
                true
            );

            // Get Store Agent plugin logo URL.
            $plugin_installer = WCV_Plugin_Installer::get_instance();
            $store_agent_logo = $plugin_installer->get_wp_org_plugin_icon_url( 'storeagent-ai-for-woocommerce' );

            wp_localize_script(
                'wcv-ai-moderate',
                'wcv_ai_moderate_params',
                array(
                    'ajax_url'                  => admin_url( 'admin-ajax.php' ),
                    'check_store_agent_nonce'   => wp_create_nonce( 'wcv_check_store_agent' ),
                    'install_plugin_nonce'      => wp_create_nonce( 'wcv_install_plugin' ),
                    'store_agent_slug'          => 'storeagent-ai-for-woocommerce',
                    'store_agent_dashboard_url' => admin_url( 'admin.php?page=storeagent-dashboard' ),
                    'store_agent_logo_url'      => $store_agent_logo,
                    'i18n_store_agent_required' => __( 'Store Agent AI for WooCommerce is required for AI Moderate feature.', 'wc-vendors' ),
                    'i18n_step_1_title'         => __( 'Step 1: Install and Activate Store Agent', 'wc-vendors' ),
                    'i18n_step_2_title'         => __( 'Step 2: Connect to Store Agent', 'wc-vendors' ),
                    'i18n_install_and_activate' => __( 'Install and Activate', 'wc-vendors' ),
                    'i18n_activate'             => __( 'Activate', 'wc-vendors' ),
                    'i18n_connect_store_agent'  => __( 'Open Connection Page', 'wc-vendors' ),
                    'i18n_check_connection'     => __( 'Check Connection', 'wc-vendors' ),
                    'i18n_after_connect_note'   => __( 'After connecting, please click "Check Connection" to verify the connection.', 'wc-vendors' ),
                    'i18n_installing'           => __( 'Installing...', 'wc-vendors' ),
                    'i18n_activating'           => __( 'Activating...', 'wc-vendors' ),
                    'i18n_checking_connection'  => __( 'Checking...', 'wc-vendors' ),
                    'i18n_connection_success'   => __( 'Connection successful! Store Agent is ready.', 'wc-vendors' ),
                    'i18n_connection_not_ready' => __( 'Not connected yet. Please connect Store Agent and try again.', 'wc-vendors' ),
                    'i18n_connection_error'     => __( 'Unable to verify connection. Please try again.', 'wc-vendors' ),
                    'i18n_install_success'      => __( 'Store Agent installed and activated successfully!', 'wc-vendors' ),
                    'i18n_install_error'        => __( 'Failed to install Store Agent. Please try again.', 'wc-vendors' ),
                    'i18n_step_completed'       => __( 'Completed', 'wc-vendors' ),
                )
            );

            wp_enqueue_style(
                'wcv-ai-moderate',
                WCV_ASSETS_URL . 'css/admin/ai-moderate.css',
                array(),
                WCV_VERSION
            );
        }

        /**
         * Output AI Moderate modal template.
         *
         * @return void
         */
        public function output_ai_moderate_modal() {
            global $current_tab;

            // Only output on capabilities tab.
            if ( 'capabilities' !== $current_tab ) {
                return;
            }

            // Get Store Agent plugin logo URL.
            $plugin_installer = WCV_Plugin_Installer::get_instance();
            $store_agent_logo = $plugin_installer->get_wp_org_plugin_icon_url( 'storeagent-ai-for-woocommerce' );

            // Template variables.
            $store_agent_logo_url      = $store_agent_logo;
            $store_agent_dashboard_url = admin_url( 'admin.php?page=storeagent-dashboard' );
            $i18n_store_agent_required = __( 'Store Agent AI for WooCommerce is required for AI Moderate feature.', 'wc-vendors' );
            $i18n_step_1_title         = __( 'Step 1: Install and Activate Store Agent', 'wc-vendors' );
            $i18n_step_2_title         = __( 'Step 2: Connect to Store Agent', 'wc-vendors' );
            $i18n_install_and_activate = __( 'Install and Activate', 'wc-vendors' );
            $i18n_connect_store_agent  = __( 'Open Connection Page', 'wc-vendors' );
            $i18n_check_connection     = __( 'Check Connection', 'wc-vendors' );
            $i18n_after_connect_note   = __( 'After connecting, please click "Check Connection" to verify the connection.', 'wc-vendors' );

            include WCV_ABSPATH_ADMIN . 'views/html-admin-ai-moderate-modal.php';
        }

        /**
         * Save settings and handle AI Moderate logic.
         *
         * @return void
         */
        public function save() {
            global $current_section;

            // Call parent save first to save all settings.
            parent::save();

            // Only process on general section (where the checkbox is).
            if ( '' !== $current_section ) {
                return;
            }

            if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'wcvendors-settings' ) ) {
                wp_die( esc_attr__( 'Action failed. Please refresh the page and retry.', 'wc-vendors' ) );
            }

            // If AI Moderate is enabled, verify Store Agent is connected and disable products_live.
            if ( isset( $_POST['wcvendors_capability_ai_moderate'] ) && '1' === sanitize_text_field( wp_unslash( $_POST['wcvendors_capability_ai_moderate'] ) ) ) {
                $plugin_basename = 'storeagent-ai-for-woocommerce/storeagent-ai-for-woocommerce.php';

                require_once ABSPATH . 'wp-admin/includes/plugin.php';

                // Check if Store Agent is installed, active, and connected.
                if ( ! wcv_is_plugin_installed( $plugin_basename ) || ! is_plugin_active( $plugin_basename ) ) {
                    // If not installed/active, disable AI Moderate.
                    update_option( 'wcvendors_capability_ai_moderate', 'no' );
                    return;
                }

                // Check connection status.
                if ( class_exists( '\SAAI\Helpers\Connect' ) ) {
                    $is_connected = \SAAI\Helpers\Connect::is_connected();
                    if ( ! $is_connected ) {
                        // If not connected, disable AI Moderate.
                        update_option( 'wcvendors_capability_ai_moderate', 'no' );
                        return;
                    }
                }

                // All checks passed, disable products_live.
                update_option( 'wcvendors_capability_products_live', 'no' );
            }
        }
    }

endif;

return new WCVendors_Settings_Capabilities();
