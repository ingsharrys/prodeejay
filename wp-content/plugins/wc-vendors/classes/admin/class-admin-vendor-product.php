<?php
/**
 * Marketplace backend dashboard class
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 *
 * @package WC_Vendors
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * WCV_Admin_Vendor_Product Class
 */
class WCV_Admin_Vendor_Product {

    /**
     * Vite App loader instance.
     *
     * @var WCV_Vite_Loader $app_loader Vite app loader instance.
     */
    protected $app_loader;

    /**
     * Constructor.
     */
    public function __construct() {
        // Include the Vite App Loader class if it doesn't exist.
        if ( ! class_exists( 'WCV_Vite_Loader' ) ) {
            require_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-vite-loader.php';
        }

        // Initialize the Vite App Loader.
        $this->app_loader = new WCV_Vite_Loader(
            'wcv_vendor_product', // App name (used for script handles).
            'apps/vendor-product', // App directory relative to plugin root.
            WCV_PLUGIN_DIR, // Plugin directory path.
            WCV_PLUGIN_URL, // Plugin directory URL.
        );

        // Register actions and filters.
        $this->register_hooks();
    }

    /**
     * Register hooks.
     *
     * @return void
     */
    public function register_hooks() {
        add_action( 'admin_enqueue_scripts', array( $this, 'maybe_load_app' ) );
        add_action( 'wp_ajax_wcv_check_store_agent_status', array( $this, 'ajax_check_store_agent_status' ) );
    }

    /**
     * Load app assets if we're on the right page.
     *
     * @param string $hook The current admin page.
     *
     * @return void
     */
    public function maybe_load_app( $hook ) {
        if ( 'wc-vendors_page_wcv-products' !== $hook ) {
            return;
        }

        // Setup data to be passed to the app.
        $js_data = array(
            'rest_url' => rest_url( 'wcv-api/v1' ),
            'nonce'    => wp_create_nonce( 'wp_rest' ),
            'i18n'     => $this->get_i18n_data(),
        );

        // Define script dependencies.
        $dependencies = array( 'wp-i18n' );

        // Load app assets.
        $this->app_loader->load_assets( $dependencies, $js_data );
    }

    /**
     * Get i18n data
     *
     * @return array Array of i18n data
     */
    public function get_i18n_data() {
        return array(
            'productName'                    => __( 'Product Name', 'wc-vendors' ),
            'vendor'                         => __( 'Vendor', 'wc-vendors' ),
            'aiReview'                       => __( 'AI Review', 'wc-vendors' ),
            'approve'                        => __( 'Approve', 'wc-vendors' ),
            'noReview'                       => __( 'No review', 'wc-vendors' ),
            'pendingProducts'                => __( 'Pending Products', 'wc-vendors' ),
            'publishedProducts'              => __( 'Published Products', 'wc-vendors' ),
            'draftProducts'                  => __( 'Draft Products', 'wc-vendors' ),
            'products'                       => __( 'Products', 'wc-vendors' ),
            'searchProducts'                 => __( 'Search products...', 'wc-vendors' ),
            'filterByVendor'                 => __( 'Filter by vendor', 'wc-vendors' ),
            'search'                         => __( 'Search', 'wc-vendors' ),
            'error'                          => __( 'Error', 'wc-vendors' ),
            'success'                        => __( 'Success', 'wc-vendors' ),
            'failedToLoadProducts'           => __( 'Failed to load products', 'wc-vendors' ),
            'failedToLoadVendors'            => __( 'Failed to load vendors', 'wc-vendors' ),
            'productApprovedSuccessfully'    => __( 'Product approved successfully', 'wc-vendors' ),
            'failedToApproveProduct'         => __( 'Failed to approve product', 'wc-vendors' ),
            'actions'                        => __( 'Actions', 'wc-vendors' ),
            'requestChange'                  => __( 'Request Change', 'wc-vendors' ),
            'view'                           => __( 'View', 'wc-vendors' ),
            'edit'                           => __( 'Edit', 'wc-vendors' ),
            'unpublish'                      => __( 'Unpublish', 'wc-vendors' ),
            'confirmUnpublish'               => __( 'Are you sure you want to unpublish this product?', 'wc-vendors' ),
            'yes'                            => __( 'Yes', 'wc-vendors' ),
            'no'                             => __( 'No', 'wc-vendors' ),
            'send'                           => __( 'Send', 'wc-vendors' ),
            'cancel'                         => __( 'Cancel', 'wc-vendors' ),
            'changeRequestMessage'           => __( 'Please provide details about what needs to be changed:', 'wc-vendors' ),
            'enterChangeRequest'             => __( 'Enter change request message...', 'wc-vendors' ),
            'changeRequestSentSuccessfully'  => __( 'Change request sent successfully', 'wc-vendors' ),
            'failedToRequestChange'          => __( 'Failed to request change', 'wc-vendors' ),
            'productUnpublishedSuccessfully' => __( 'Product unpublished successfully', 'wc-vendors' ),
            'failedToUnpublishProduct'       => __( 'Failed to unpublish product', 'wc-vendors' ),
            'viewAIReview'                   => __( 'View AI Review', 'wc-vendors' ),
            'statusApproved'                 => __( 'Approved', 'wc-vendors' ),
            'statusRevisionRequired'         => __( 'Revision Required', 'wc-vendors' ),
            'statusFlagged'                  => __( 'Flagged', 'wc-vendors' ),
            'statusRejected'                 => __( 'Rejected', 'wc-vendors' ),
            'statusPass'                     => __( 'Pass', 'wc-vendors' ),
            'statusFail'                     => __( 'Fail', 'wc-vendors' ),
            'includeSuggestions'             => __( 'Include AI review suggestions in email', 'wc-vendors' ),
        );
    }

    /**
     * AJAX handler to check Store Agent plugin status.
     *
     * @return void
     */
    public function ajax_check_store_agent_status() {
        // Verify nonce.
        check_ajax_referer( 'wcv_check_store_agent', 'nonce' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => __( 'You do not have permission to perform this action.', 'wc-vendors' ) ) );
        }

        $plugin_slug     = 'storeagent-ai-for-woocommerce';
        $plugin_basename = 'storeagent-ai-for-woocommerce/storeagent-ai-for-woocommerce.php';

        require_once ABSPATH . 'wp-admin/includes/plugin.php';

        $is_installed = wcv_is_plugin_installed( $plugin_basename );
        $is_active    = is_plugin_active( $plugin_basename );
        $is_connected = false;

        // Check connection status if plugin is active.
        if ( $is_active && class_exists( '\SAAI\Helpers\Connect' ) ) {
            $is_connected = \SAAI\Helpers\Connect::is_connected();
        }

        wp_send_json_success(
            array(
                'installed' => $is_installed,
                'active'    => $is_active,
                'connected' => $is_connected,
            )
        );

        wp_die();
    }
}

// Initialize the Vendor Product App.
new WCV_Admin_Vendor_Product();
