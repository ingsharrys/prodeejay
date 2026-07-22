<?php
use WC_Vendors\Classes\Front\WCV_Order_Controller;
use WC_Vendors\Classes\Front\WCV_Product_Controller;
use WC_Vendors\Classes\Front\WCV_Vendor_Controller;
use WC_Vendors\Classes\Front\WCV_Reports_Controller;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * WC Vendors Class
 *
 * Main Product Vendor class
 *
 * @since   2.4.8 - Refactored from class-wc-vendors.php
 */
class WC_Vendors_Bootstrap {
 // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound

    /**
     * Plugin version
     *
     * @var string $version Plugin version number
     */
    public $version = WCV_VERSION;

    /**
     * Settings options
     *
     * @var array
     */
    public static $pv_options;

    /**
     * Plugin ID.
     *
     * @var string
     */
    public static $id = 'wc_prd_vendor';

    /**
     * Plugin title
     *
     * @var string
     */
    public $title;

    /**
     * Product controller
     *
     * @since    2.5.2
     * @access   private
     * @var      WCV_Product_Controller $product_controller
     */
    public $product_controller;

    /**
     * Order controller
     *
     * @since    2.5.2
     * @access   private
     * @var      WCV_Order_Controller $order_controller
     */
    public $order_controller;

    /**
     * Vendor controller
     *
     * @since    2.5.2
     * @access   private
     * @var      WCV_Vendor_Controller $vendor_controller
     */
    public $vendor_controller;

    /**
     * Report controller
     *
     * @since    2.5.2
     * @access   private
     * @var      WCV_Report_Controller $report_controller
     */
    public $report_controller;

    /**
     * Constructor.
     */
    public function __construct() {

        $this->title = 'WC Vendors Marketplace';
        add_action( 'plugins_loaded', array( $this, 'load_il8n' ) );
        // Install & upgrade.
        add_action( 'admin_init', array( $this, 'check_install' ) );
        add_action( 'init', array( $this, 'maybe_flush_permalinks' ), 99 );
        add_action( 'admin_init', array( $this, 'wcv_required_ignore_notices' ) );

        add_action( 'wcvendors_flush_rewrite_rules', array( $this, 'flush_rewrite_rules' ) );

        $this->include_gateways();
        $this->include_core();
        $this->include_init();
        add_action( 'current_screen', array( $this, 'include_assets' ) );

        // Legacy settings.
        add_action( 'admin_init', array( 'WCVendors_Install', 'check_pro_version' ) );
        add_action( 'plugins_loaded', array( $this, 'load_legacy_settings' ) );

        // Show update notices.
        $file   = basename( __FILE__ );
        $folder = basename( __DIR__ );
        $hook   = "in_plugin_update_message-{$folder}/{$file}";
        add_action( $hook, array( $this, 'show_upgrade_notification' ), 10, 2 );

        // Add become a vendor rewrite endpoint.
        add_action( 'init', array( $this, 'add_rewrite_endpoint' ) );
        add_action( 'after_switch_theme', array( $this, 'flush_rewrite_rules' ) );

        // Add shop vendor order type.
        add_filter( 'wc_order_types', array( $this, 'add_custom_order_types' ), 99, 2 );

        // Adjust the data store for the shop_order_vendor order type.
        add_filter( 'woocommerce_data_stores', array( $this, 'add_custom_data_store' ) );

        // Test payment gateway.
        add_filter( 'woocommerce_payment_gateways', array( $this, 'add_wcvendors_test_gateway' ) );

        add_action( 'woocommerce_blocks_payment_method_type_registration', array( $this, 'add_wcv_test_gateway_block' ), 10, 1 );

        add_action( 'wcvendors_sync_vendor_status', 'wcvendors_add_vendor_status_meta_key' );

        add_action( 'wcvendors_after_update_plugin', array( $this, 'after_plugin_update' ) );

        add_action( 'upgrader_process_complete', array( $this, 'run_action_after_process_complete' ), 10, 2 );
        add_action( 'upgrader_overwrote_package', array( $this, 'run_action_after_overwrote_package' ), 10, 3 );
        add_action( 'after_setup_theme', array( $this, 'init_plugin_installer' ) );

        $this->define_public_hooks();

        // Add setup wizard.
        add_action( 'admin_init', array( $this, 'maybe_launch_setup_wizard' ) );
    }

    /**
     * Maybe launch the setup wizard after activating the plugin.
     *
     * @return void
     * @version 2.4.9
     * @since   2.4.9
     */
    public function maybe_launch_setup_wizard() {
        if ( ! get_option( 'wcvendors_wizard_complete', false ) && wc_string_to_bool( get_transient( 'wcvendors_activation_redirect' ) ) ) {
            delete_transient( 'wcvendors_activation_redirect' );
            wp_safe_redirect( admin_url( 'admin.php?page=wcv-setup' ) );
            exit;
        }
    }

    /**
     * Initialize the plugin installer
     *
     * @since 2.5.6 - Fix text domain error
     */
    public function init_plugin_installer() {
        if ( ! class_exists( 'WCV_Plugin_Installer' ) ) {
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-plugin-installer.php';
        }
        new WCV_Plugin_Installer();
    }

    /**
     * Run action after plugin update
     */
    public function after_plugin_update() {
        $synchronizer = new WCV_Order_Data_Synchronizer();
        $synchronizer->maybe_schedule_hpos_data_sync();
        wp_schedule_single_event( time() + 5, 'wcvendors_sync_vendor_status' );
    }

    /**
     * Check if upgrader_process_complete is for wc-vendors then run action after update
     *
     * @param WP_Upgrader $upgrader WP_Upgrader instance.
     * @param array       $hook_extra       Array of bulk item update data.
     */
    public function run_action_after_process_complete( $upgrader, $hook_extra ) {

        if ( ! $upgrader instanceof Plugin_Upgrader || ! isset( $hook_extra['plugins'] ) ) {
            return;
        }

        $updated_plugins = $hook_extra['plugins'];
        $wcv_updated     = false;
        foreach ( $updated_plugins as $updated_plugin ) {
            if ( WCV_PLUGIN_BASE === $updated_plugin ) {
                $wcv_updated = true;
                break;
            }
        }

        if ( false === $wcv_updated ) {
            return;
        }

        do_action( 'wcvendors_after_update_plugin' );
    }

    /**
     * Check if upgrader_overwrote_package is for wc-vendors then run action after update
     *
     * @param string $package The package file.
     * @param array  $data      The new plugin or theme data.
     * @param string $package_type    The package type ('plugin' or 'theme').
     */
    public function run_action_after_overwrote_package( $package, $data, $package_type ) {

        if ( 'plugin' !== $package_type ) {
            return;
        }

        $text_domain = isset( $data['TextDomain'] ) ? $data['TextDomain'] : '';

        if ( 'wc-vendors' !== $text_domain ) {
            return;
        }

        do_action( 'wcvendors_after_update_plugin' );
    }

    /**
     * Add custom order types to WooCommerce.
     *
     * @param array  $types The registered order types.
     * @param string $context The context for which the order types are being requested.
     * @return array
     * @version 2.4.8
     * @since   2.4.8 - Added.
     */
    public function add_custom_order_types( $types, $context = '' ) {
        switch ( $context ) {
            case 'order-count':
            case 'view-orders':
            case 'cot-migration':
            case 'reports':
            case 'sales-reports':
                return $types;
            case 'admin-menu':
                // Add the shop_order_vendor on admin dashboard. Only add the shop_order_vendor type if it's not already in the list.
                if ( ! is_admin() && ! in_array( 'shop_order_vendor', $types, true ) ) {
                    $types[] = 'shop_order_vendor';
                }
                return $types;
            default:
                if ( ! in_array( 'shop_order_vendor', $types, true ) ) {
                    $types[] = 'shop_order_vendor';
                }
                return $types;
        }
    }

    /**
     * Add custom data stores.
     *
     * @param array $data_stores The list of data stores.
     * @return array
     * @version 2.4.8
     * @since   2.4.8 - Added.
     */
    public function add_custom_data_store( $data_stores ) {
        $data_stores['shop_order_vendor'] = wcv_cot_enabled()
            ? 'Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore'
            : 'WC_Order_Data_Store_CPT';

        return $data_stores;
    }

    /**
     * Display message saying invalid WooCommerce version
     */
    public function invalid_wc_version() {
        ?>
        <div class="error"><p>
            <?php
            echo wp_kses_post(
                __(
                    '<b>WC Vendors Marketplace is inactive</b>. WC Vendors Marketplace requires a minimum of WooCommerce 3.0.0 to operate.',
                    'wc-vendors'
                )
            );
            ?>
        </p></div>
        <?php
    }

    /**
     * Check whether install has ran before or not
     *
     * Run install if it hasn't.
     *
     * @return bool
     */
    public function check_install() {

        if ( version_compare( WC_VERSION, '3.0.0', '<' ) ) {
            add_action( 'admin_notices', array( $this, 'invalid_wc_version' ) );
            deactivate_plugins( plugin_basename( __FILE__ ) );

            return false;
        }

        return true;
    }

    /**
     * Set static $pv_options to hold options class
     */
    public function load_legacy_settings() {
        if ( empty( self::$pv_options ) ) {
            include_once WCV_PLUGIN_DIR . 'classes/includes/class-sf-settings.php';
            self::$pv_options = new WCV_SF_Settings_API();
        }
    }

    /**
     * Load internationalization
     *
     * @return void
     * @version 1.0.0
     * @since   1.0.0
     */
    public function load_il8n() {
        $locale = is_admin() && function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
        $locale = apply_filters( 'plugin_locale', $locale, 'wc-vendors' ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        unload_textdomain( 'wc-vendors' );
        load_textdomain( 'wc-vendors', WP_LANG_DIR . '/wc-vendors/wc-vendors-' . $locale . '.mo' );
    }

    /**
     * Include core files
     */
    public function include_core() {

        include_once WCV_PLUGIN_DIR . 'classes/class-queries.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-vendors.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-commission.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-shipping.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-vendor-order.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-vendor-post-types.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/wcv-template-functions.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/wcv-vendor-functions.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/wcv-update-functions.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/wcv-helper-functions.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/wcv-dashboard-functions.php';
        include_once WCV_PLUGIN_DIR . 'classes/admin/emails/class-emails.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-wcv-shipping-providers.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-order-data-synchronizer.php';
        include_once WCV_PLUGIN_DIR . 'classes/class-vendor-settings.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-all-vendors-page.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-marketplace-backend-dashboard.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-cli.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-order-cli.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-seo-compatibility.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-product-dropdown-walker.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-product-category-multilevel-walker.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-utils.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-form-helper.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-product-controller.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-vendor-controller.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-reports-controller.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-order-controller.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/forms/class-wcv-product-form.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/forms/class-wcv-tracking-number-form.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/forms/class-wcv-store-form.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/dashboard/class-vendor-dashboard.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-table-helper.php';
        include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-dashboard-controller.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-reports.php';
        include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-reports-cache.php';

        if ( is_admin() ) {

            include_once WCV_PLUGIN_DIR . 'classes/class-install.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-vendor-applicants.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-admin-reports.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-commissions-page.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-setup.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-notices.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-settings.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-admin-menus.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-extensions.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-go-pro.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-help.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-vendor-admin-dashboard.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-setup-wizard.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-vendor-order-page.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-admin-media.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-import-export.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-orders.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-lite-bar.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-plugin-installer.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-license-page.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-admin-acfwf-promo-page.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/class-admin-vendor-product.php';
            include_once WCV_PLUGIN_DIR . 'classes/admin/wcv-admin-functions.php';

            new WCV_Admin_Lite_Bar();
            new WCV_Vendor_Applicants();
            new WCV_Admin_Setup();
            new WCV_Vendor_Admin_Dashboard();
            new WCV_Admin_Reports();
            new WCV_Admin_Import_Export();
            new WCVendors_Admin_Orders();
            new WCV_Admin_ACFWF_Promo_Page();

        } else {

            include_once WCV_PLUGIN_DIR . 'classes/includes/class-wcv-shortcodes.php';
            include_once WCV_PLUGIN_DIR . 'classes/front/class-vendor-cart.php';
            include_once WCV_PLUGIN_DIR . 'classes/front/class-vendor-shop.php';
            include_once WCV_PLUGIN_DIR . 'classes/front/signup/class-vendor-signup.php';
            include_once WCV_PLUGIN_DIR . 'classes/front/orders/class-orders.php';
            include_once WCV_PLUGIN_DIR . 'classes/front/account/class-wc-account-links.php';
            include_once WCV_PLUGIN_DIR . 'classes/front/class-wcv-public-assets.php';

            new WCV_Orders();
            new WCV_Vendor_Signup();
            new WCV_Vendor_Shop();
            new WCV_Vendor_Cart();
            new WCV_Shortcodes();
            new WCV_Account_Links();
        }

        // Include.
        if ( ! function_exists( 'woocommerce_wp_text_input' ) && ! is_admin() ) {
            include_once WC()->plugin_path() . '/includes/admin/wc-meta-box-functions.php';
        }

        new WCV_Vendor_Dashboard();
        new WCV_Shipping();
        new WCV_Commission();
        new WCV_Vendors();
        new WCV_Emails();

        $reports_cache = WCV_Reports_Cache::get_instance();
        $reports_cache->init_hooks();
        $reports_cache->schedule_cache_pre_caching();

        // Initialize the synchronizer.
        $synchronizer = new WCV_Order_Data_Synchronizer();
        $synchronizer->init_hooks();

        // Out-of-stock vendor reminders.
        include_once WCV_PLUGIN_DIR . 'classes/class-wcv-out-of-stock-reminder.php';
        new WCV_Out_Of_Stock_Reminder();
    }

    /**
     * These need to be initialized later in loading to fix interaction with other plugins that call current_user_can at the right time.
     *
     * @since  1.9.4
     * @access public
     */
    public function include_init() {

        require_once WCV_PLUGIN_DIR . 'classes/admin/class-vendor-reports.php';
        require_once WCV_PLUGIN_DIR . 'classes/admin/class-product-meta.php';
        require_once WCV_PLUGIN_DIR . 'classes/admin/class-admin-users.php';
        include_once WCV_PLUGIN_DIR . 'classes/admin/class-wcv-usage.php';

        new Usage();
        new WCV_Vendor_Reports();
        new WCV_Product_Meta();
        new WCV_Admin_Users();
    }

    /**
     *  Load plugin assets
     *
     * @version 2.1.10
     */
    public function include_assets() {

        $screen = get_current_screen();

        switch ( $screen->id ) {
        case 'edit-product':
            wp_enqueue_script(
                'wcv_quick-edit',
                WCV_ASSETS_URL . 'js/wcv-admin-quick-edit.js',
                array( 'jquery' ),
                WCV_VERSION,
                true
            );
            wp_localize_script(
                'wcv_quick-edit',
                'wcv_quick_edit_params',
                array(
                    'allow_featured'      => apply_filters(
                        'wcvendors_capability_allow_product_featured',
                        get_option( 'wcvendors_capability_product_featured', 'no' )
                    ),
                    'vendor_search_nonce' => wp_create_nonce( 'wcv_vendor_search' ),
                )
            );
            break;
        case 'wc-vendors_page_wcv-commissions':
            wp_register_script(
                'wcv_admin_commissions',
                WCV_ASSETS_URL . 'js/admin/wcv-admin-commissions.js',
                array( 'jquery' ),
                WCV_VERSION,
                true
            );
            $param_args = apply_filters_deprecated(
                'wcv_admin_commissions_params',
                array(
                    array(
                        'confirm_prompt'                 => __( 'Are you sure you want mark all commissions paid?', 'wc-vendors' ),
                        'confirm_delete_commission'      => __( 'Are you sure delete this commission?', 'wc-vendors' ),
                        'confirm_bulk_delete_commission' => __( 'Are you sure delete these commissions?', 'wc-vendors' ),
                    ),
                ),
                '2.3.0',
                'wcvendors_admin_commissions_params'
            );
            $param_args = apply_filters( 'wcvendors_admin_commissions_params', $param_args );
            wp_localize_script( 'wcv_admin_commissions', 'wcv_admin_commissions_params', $param_args );
            wp_enqueue_script( 'wcv_admin_commissions' );
            break;
        default:
            // code...
            break;
        }
    }

    /**
     * Include payment gateways
     */
    public function include_gateways() {
        require_once WCV_PLUGIN_DIR . 'classes/gateways/PayPal_Masspay/class-paypal-masspay.php';
        require_once WCV_PLUGIN_DIR . 'classes/gateways/WCV_Gateway_Test/class-wcv-gateway-test.php';
        require_once WCV_PLUGIN_DIR . 'classes/gateways/WCV_Gateway_Test/class-wcv-gateway-test-block.php';
    }

    /**
     *  If the settings are updated and the vendor page link has changed update permalinks
     *
     * @access public
     */
    public function maybe_flush_permalinks() {
        if ( wc_string_to_bool( get_option( 'wcvendors_queue_flush_rewrite_rules', 'no' ) ) ) {
            $this->flush_rewrite_rules();
            update_option( 'wcvendors_queue_flush_rewrite_rules', 'no' );
        }
    }

    /**
     * Flush rewrite rules.
     *
     * @return void
     */
    public function flush_rewrite_rules() {
        flush_rewrite_rules();
    }

    /**
     * Add rewrite endpoint
     *
     * @return void
     */
    public function add_rewrite_endpoint() {
        add_rewrite_endpoint( 'become-a-vendor', EP_PAGES );
        $this->maybe_flush_permalinks();
    }

    /**
     * Add user meta to remember ignore notices
     *
     * If user clicks to ignore the notice, add that to their user meta.
     *
     * @access public
     */
    public function wcv_required_ignore_notices() {
        global $current_user;
        $current_user_id = $current_user->ID;

        // phpcs:disable
        if ( isset( $_GET['wcv_shop_ignore_notice'] ) && '0' == $_GET['wcv_shop_ignore_notice'] ) {
            add_user_meta( $current_user_id, 'wcv_shop_ignore_notice', 'true', true );
        }
        if ( isset( $_GET['wcv_pl_ignore_notice'] ) && '0' == $_GET['wcv_pl_ignore_notice'] ) {
            add_user_meta( $current_user_id, 'wcv_pl_ignore_notice', 'true', true );
        }
        // phpcs:enable
    }

    /**
     * Upgrade notice displayed on the plugin screen
     *
     * @param array  $args     The options of the upgrade.
     * @param object $response The update response object.
     * @return void
     */
    public function show_upgrade_notification( $args, $response ) {

        $new_version = $response->new_version;

        $upgrade_notice  = __( 'WC Vendors 2.0 is a major update.', 'wc-vendors' );
        $upgrade_notice .= __( 'This is not compatible with any of our existing extensions.', 'wc-vendors' );
        $upgrade_notice .= __( 'You should test this update on a staging server before updating.', 'wc-vendors' );
        $upgrade_notice .= sprintf(
            // translators: %s - the url to the docs.
            __(
                'Backup your site and update your theme and extensions, and <a href="%s">review update details here</a> before upgrading.',
                'wc-vendors'
            ),
            'https://wcvendors.com/knowledge-base/upgrading-to-wc-vendors-2-0/'
        );

        if ( version_compare( WCV_VERSION, '2.0.0', '<' ) && version_compare( $new_version, '2.0.0', '>=' ) ) {
            echo '<h3>Important Upgrade Notice:</h3>';
            echo '<p style="background-color: #d54e21; padding: 10px; color: #f9f9f9; margin-top: 10px">';
            echo wp_kses_post( $upgrade_notice );
            if ( ! class_exists( 'WCVendors_Pro' ) ) {
                echo '</p>';
            }

            if ( class_exists( 'WCVendors_Pro' ) ) {

                if ( version_compare( WCV_PRO_VERSION, '1.5.0', '<' ) ) {
                    echo '<h3>WC Vendors Pro Notice</h3>';
                    echo '<p style="background-color: #d54e21; padding: 10px; color: #f9f9f9; margin-top: 10px">';

                    $pro_required_notice = __(
                        'WC Vendors Pro 1.5.0 is required to run WC Vendors 2.0.0.',
                        'wc-vendors'
                    );
                    $pro_upgrade         = sprintf(
                        // translators: %1$s - the notice stating WCV Pro is required, %2$s - the current version.
                        __(
                            '%1$s Your current version %2$s will be deactivated. Please upgrade to the latest version.',
                            'wc-vendors'
                        ),
                        $pro_required_notice,
                        WCV_PRO_VERSION
                    );

                    echo wp_kses_post( $pro_upgrade );
                }
            }
        }
    }

    /**
     * Add WC Vendors Test Gateway.
     *
     * @version 1.4.8
     * @since   1.4.8 - Refactored from class-wcv-gateway-test.php
     *
     * @param array $methods List of available payment methods.
     * @return array
     */
    public function add_wcvendors_test_gateway( $methods ) {
        $methods[] = 'WC_Gateway_WCV_Gateway_Test';
        return $methods;
    }

    /**
     * Add blocks support for the WC Vendors Test Gateway.
     *
     * @since 2.6.7
     * @version 2.6.7
     *
     * @param Automattic\WooCommerce\Blocks\Payments\Integrations\PaymentMethodTypesRegistry $payment_method_types The payment method types registry.
     * @return void
     */
    public function add_wcv_test_gateway_block( $payment_method_types ) {

        if ( ! class_exists( 'WC_Payment_Method_Type_WCV_Gateway_Test_Block' ) ) {
            return;
        }
        $payment_method_types->register( new WC_Payment_Method_Type_WCV_Gateway_Test_Block() );
    }

    /**
     * Define the public hooks
     *
     * @return void
     */
    public function define_public_hooks() {
        $this->product_controller = new WCV_Product_Controller();
        $this->order_controller   = new WCV_Order_Controller( $this->title, $this->version, false );
        $this->vendor_controller  = new WCV_Vendor_Controller();
        $this->report_controller  = new WCV_Reports_Controller();
        // Product controller actions.
        add_action( 'template_redirect', array( $this->product_controller, 'process_submit' ) );
        add_action( 'template_redirect', array( $this->product_controller, 'process_delete' ) );
        add_action( 'template_redirect', array( $this->product_controller, 'process_duplicate' ) );
        add_action( 'template_redirect', array( $this->report_controller, 'process_submit' ) );

        // Product controller ajax actions.
        add_action( 'wp_ajax_wcv_json_search_products', array( $this->product_controller, 'json_search_products' ) );
        add_action( 'wp_ajax_wcv_json_search_tags', array( $this->product_controller, 'json_search_product_tags' ) );
        add_action( 'wp_ajax_wcv_json_add_attribute', array( $this->product_controller, 'json_add_attribute' ) );
        add_action( 'wp_ajax_wcv_json_add_new_attribute', array( $this->product_controller, 'json_add_new_attribute' ) );
        add_action( 'wp_ajax_wcv_json_default_variation_attributes', array( $this->product_controller, 'json_default_variation_attributes' ) );
        add_action( 'wp_ajax_wcv_json_load_variation', array( $this->product_controller, 'json_load_variations' ) );
        add_action( 'wp_ajax_wcv_json_add_variation', array( $this->product_controller, 'json_add_variation' ) );
        add_action( 'wp_ajax_wcv_json_link_all_variations', array( $this->product_controller, 'json_link_all_variations' ) );

        add_filter( 'wcvendors_table_columns_product', array( $this->product_controller, 'table_columns' ) );
        add_filter( 'wcvendors_table_rows_product', array( $this->product_controller, 'table_rows' ), 10, 2 );
        add_filter( 'wcvendors_table_action_column_product', array( $this->product_controller, 'table_action_column' ) );
        add_filter( 'wcvendors_table_before_product', array( $this->product_controller, 'table_actions' ), 10, 2 );
        add_filter( 'wcvendors_table_after_product', array( $this->product_controller, 'table_actions' ), 10, 2 );
        add_filter( 'wcvendors_table_post_per_page_product', array( $this->product_controller, 'table_posts_per_page' ) );
        add_filter( 'wcvendors_table_no_data_notice_product', array( $this->product_controller, 'table_no_data_notice' ) );
        add_filter( 'wcvendors_product_form_templates', array( $this->product_controller, 'template_overrides_options' ) );
        add_filter( 'wcv_product_table_row_actions', array( $this->product_controller, 'maybe_disable_actions' ), 10, 2 );
        add_filter( 'wcvendors_page_disabled', array( $this->product_controller, 'maybe_disable_page' ), 10, 2 );

        // Orders controller.
        add_filter( 'wcvendors_table_columns_order', array( $this->order_controller, 'table_columns' ) );
        add_filter( 'wcvendors_table_rows_order', array( $this->order_controller, 'table_rows' ), 10, 2 );
        add_filter( 'wcvendors_table_action_column_order', array( $this->order_controller, 'table_action_column' ) );
        add_filter( 'wcvendors_table_before_order', array( $this->order_controller, 'table_actions' ) );
        add_filter( 'wcvendors_table_after_order', array( $this->order_controller, 'table_actions_after' ) );
        add_filter( 'wcvendors_table_no_data_notice_order', array( $this->order_controller, 'table_no_data_notice' ) );
        add_action( 'template_redirect', array( $this->order_controller, 'process_submit' ) );
        add_action( 'template_redirect', array( $this, 'wc_filter_address_hook' ) );
        add_filter( 'woocommerce_order_item_get_formatted_meta_data', array( $this->order_controller, 'filter_order_item_get_formatted_meta_data' ), 10 );

        // Vendor controller.
        add_action( 'wp_ajax_wcv_json_unique_store_name', array( $this->vendor_controller, 'json_unique_store_name' ) );
        add_action( 'template_redirect', array( $this->vendor_controller, 'process_submit' ) );
        add_filter( 'woocommerce_login_redirect', array( $this->vendor_controller, 'vendor_login_redirect' ), 10, 2 );
        add_action( 'wp_ajax_wcv_dismiss_store_setup_step_section', array( $this->vendor_controller, 'dismiss_store_setup_step_section' ) );
    }

    /**
     * Filter the WooCommerce shipping and billing addresses on the pro dashboard to show and hide options
     *
     * @since   2.5.2
     * @version 2.5.2
     */
    public function wc_filter_address_hook() {

        $dashboard_page_ids = (array) get_option( 'wcvendors_vendor_dashboard_page_id', array() );

        foreach ( $dashboard_page_ids as $dashboard_page_id ) {
            if ( isset( $dashboard_page_id ) ) {
                // Dashboard page or the shipping label page.
                if ( is_page( $dashboard_page_id ) || ( isset( $_GET['wcv_shipping_label'] ) ) ) { // phpcs:ignore
                    add_filter(
                        'woocommerce_order_formatted_shipping_address',
                        array(
                            $this->order_controller,
                            'filter_formatted_shipping_address',
                        )
                    );
                    add_filter(
                        'woocommerce_order_formatted_billing_address',
                        array(
                            $this->order_controller,
                            'filter_formatted_billing_address',
                        )
                    );
                }
            }
        }
    }
}
