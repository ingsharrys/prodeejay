<?php
/**
 * The main WCV_Vendor_Dashboard class - moved from Pro to Free from version 2.5.2
 *
 * This is the main controller class for the dashboard, all actions are defined in this class.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */

use WC_Vendors\Classes\Front\WCV_Public_Assets;
use WC_Vendors\Classes\Front\WCV_Table_Helper;
use WC_Vendors\Classes\Front\WCV_Reports_Controller;
use WC_Vendors\Classes\Front\WCV_Order_Controller;
use WC_Vendors\Classes\Front\WCV_Dashboard_Controller;
use WC_Vendors\Classes\Front\WCV_Product_Controller;
use function WC_Vendors\Classes\Includes\wcv_is_dashboard_page;
/**
 * Class WCV_Vendor_Dashboard
 */
class WCV_Vendor_Dashboard {

    /**
     * The ID of this plugin.
     *
     * @since    2.5.2
     * @access   private
     * @var      string $wcvendors_pro The ID of this plugin.
     */
    private $wcvendors;

    /**
     * The version of this plugin.
     *
     * @since    2.5.2
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Is the plugin in debug mode
     *
     * @since    2.5.2
     * @access   private
     * @var      bool $debug plugin is in debug mode
     */
    private $debug;

    /**
     * Is the plugin in debug mode
     *
     * @since    2.5.2
     * @access   private
     * @var      array $dashboard_pages an array of dashboard pages
     */
    private $dashboard_pages = array();

    /**
     * Is the plugin base directory
     *
     * @since    2.5.2
     * @access   private
     * @var      string $base_dir string path for the plugin directory
     */
    private $base_dir;


    /**
     * Prefix
     *
     * @since    2.5.2
     *
     * @var string $prefix The prefix for the plugin
     */
    private $prefix = 'wcvendors_';

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.5.2
     *
     * @param bool $debug Is debug enabled.
     */
    public function __construct( $debug = false ) {

        $this->wcvendors = 'WC Vendors Marketplace';
        $this->version   = WCV_VERSION;
        $this->debug     = $debug;
        $this->base_dir  = plugin_dir_path( WCV_PLUGIN_FILE );
        $this->init_hooks();
        $this->load_theme_support();
    }

    /**
     * Init hooks
     *
     * @since 2.5.2
     * @version 2.5.2
     */
    public function init_hooks() {
        add_filter( 'query_vars', array( $this, 'add_query_vars' ) );
        add_filter( 'rewrite_rules_array', array( $this, 'rewrite_rules' ) );
        add_shortcode( 'wcv_pro_dashboard', array( $this, 'load_dashboard' ) );
        add_shortcode( 'wcv_vendor_dashboard', array( $this, 'load_pro_shortcode_to_free' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        if ( is_user_logged_in() && WCV_Vendors::is_vendor( get_current_user_id() ) ) {
            add_filter( 'woocommerce_account_menu_items', array( $this, 'add_vendor_dashboard_item' ) );
            add_filter( 'woocommerce_get_endpoint_url', array( $this, 'add_vendor_dashboard_endpoint' ), 10, 2 );
            add_action( 'wp_head', array( $this, 'add_vendor_dashboard_icon' ) );
        }

        $checkboxes = array(
            'wcv_vacation_mode',
            'wcv_vacation_disable_cart',
            'wcv_vendor_enable_store_notice',
            'wc_vendor_enable_ga_code',
            'wcv_enable_opening_hours',
        );

        foreach ( $checkboxes as $checkbox ) {
            add_filter( $checkbox, array( $this, 'convert_checkbox_to_toggle' ) );
        }

        add_action( 'template_redirect', array( $this, 'redirect_old_slug' ) );
        add_action( 'wcvendors_after_dashboard_nav', array( $this, 'lock_new_products_notice' ) );

        add_filter( 'the_title', array( $this, 'filter_dashboard_page_title' ), 10, 2 );
        add_filter( 'get_edit_post_link', array( $this, 'vendor_edit_post_link' ), 10, 2 );
        add_filter( 'user_has_cap', array( $this, 'vendor_has_edit_product_cap' ), 10, 4 );
    }

    /**
     * Filter the dashboard page title
     *
     * @param string $title The title of the page.
     * @param int    $id    The ID of the page.
     */
    public function filter_dashboard_page_title( $title, $id ) {
        $dashboard_page_id = get_option( 'wcvendors_vendor_dashboard_page_id', false );
        if ( (int) $id === (int) $dashboard_page_id ) {
            /* translators: %s: vendor name */
            return sprintf( __( '%s Dashboard', 'wc-vendors' ), wcv_get_vendor_name( true ) );
        }

        return $title;
    }

    /**
     * Filter the edit post link
     *
     * @param string $link The edit post link.
     * @param int    $post_id The post ID.
     *
     * @since 2.6.2 - Fix Storefront theme edit product link
     * @since 2.6.6 - Add admin check to prevent edit post link from being filtered in admin.
     */
    public function vendor_edit_post_link( $link, $post_id ) {
        if ( is_admin() ) {
            return $link;
        }

        $curent_user_id = get_current_user_id();
        $is_vendor      = WCV_Vendors::is_vendor( $curent_user_id );
        $can_edit       = wc_string_to_bool( get_option( 'wcvendors_capability_products_edit', 'no' ) );

        if ( 'product' === get_post_type( $post_id ) && $is_vendor && $can_edit ) {
            return self::get_dashboard_page_url( 'product/edit/' . $post_id );
        }

        return $link;
    }

    /**
     * Filter the user capabilities to remove edit_post and edit_product caps when products_edit is disabled
     *
     * @param array   $allcaps All capabilities the user has.
     * @param array   $caps    The capability being checked.
     * @param array   $args    Additional arguments.
     * @param WP_User $user    The user object.
     * @return array The filtered capabilities array.
     */
    public function vendor_has_edit_product_cap( $allcaps, $caps, $args, $user ) {

        $current_user_id = $user->ID;
        $is_vendor       = WCV_Vendors::is_vendor( $current_user_id );

        if ( ! $is_vendor ) {
            return $allcaps;
        }

        $can_edit = wc_string_to_bool( get_option( 'wcvendors_capability_products_edit', 'no' ) );

        if ( ! $can_edit ) {

            if ( isset( $allcaps['edit_posts'] ) ) {
                unset( $allcaps['edit_posts'] );
            }

            if ( isset( $allcaps['edit_products'] ) ) {
                unset( $allcaps['edit_products'] );
            }

            if ( isset( $allcaps['edit_published_posts'] ) ) {
                unset( $allcaps['edit_published_posts'] );
            }

            if ( isset( $allcaps['edit_published_products'] ) ) {
                unset( $allcaps['edit_published_products'] );
            }
        }

        return $allcaps;
    }

    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {

        $public_assets = WCV_Public_Assets::get_instance();
        $public_assets->enqueue_scripts();
        $public_assets->enqueue_styles();
    }

    /**
     * Load wcv_pro_dashboard shortcode to wcv_vendor_dashboard
     */
    public function load_pro_shortcode_to_free() {
        return do_shortcode( '[wcv_pro_dashboard]' );
    }

    /**
     * Load the dasboard based on the query vars loaded.
     *
     * @since    2.5.2
     */
    public function load_dashboard() {

        $dashboard_page_id = get_option( 'wcvendors_vendor_dashboard_page_id', false );

        if ( empty( $dashboard_page_id ) ) {
            /* translators: %s: vendor name */
            return sprintf( '<h2>' . esc_html__( 'Please ensure you have set a page for the %s Dashboard.', 'wc-vendors' ) . '</h2>', wcv_get_vendor_name( true ) );
        }

        ob_start();

        global $wp;

        if ( isset( $wp->query_vars['object'] ) ) {

            $type     = get_query_var( 'object' );
            $action   = get_query_var( 'action' );
            $id       = get_query_var( 'object_id' );
            $template = get_query_var( 'template' );
            $custom   = get_query_var( 'custom' );

            $this->load_page( $type, $action, $id, $template, $custom );

        } else {

            $this->load_page();
        }

        return ob_get_clean();
    }

    /**
     * Output the requested page for the dashboard
     *
     * @since    2.5.2
     *
     * @param    string $object object type.
     * @param    string $action page action.
     * @param    int    $object_id the object's post id.
     * @param    string $template template file.
     * @param    string $custom custom page.
     */
    public function load_page( $object = 'dashboard', $action = '', $object_id = null, $template = null, $custom = null ) { // phpcs:ignore

        // Permission check for all dashboard pages.
        if ( ! $this->can_view_dashboard() ) {
            $this->maybe_load_application_form();
            return false;
        }

        // Has the page been disabled ?
        if ( ! $this->page_disabled() ) {
            $return_url = $this->get_dashboard_page_url();
            wc_get_template( 'permission.php', array( 'return_url' => $return_url ), 'wc-vendors/dashboard/', $this->base_dir . 'templates/dashboard/' );

            return false;
        }

        // Does the user own this object ?
        if ( ! empty( $object_id ) && ! $this->check_object_permission( $object, $object_id ) ) {
            $return_url = $this->get_dashboard_page_url();
            wc_get_template( 'permission.php', array( 'return_url' => $return_url ), 'wc-vendors/dashboard/', $this->base_dir . 'templates/dashboard/' );

            return false;
        }
        $vertical_menu = wc_string_to_bool( get_option( 'wcvendors_use_vertical_menu', 'no' ) );
        // Include the dashboard wrapper.
        include_once wcv_deprecated_filter( 'wcvendors_pro_dashboard_open_path', '2.5.2', 'wcvendors_dashboard_open_path', 'partials/wcvendors-dashboard-open.php' );

        wcv_deprecated_action( 'wcvendors_pro_before_dashboard', '2.5.2', 'wcvendors_before_dashboard' );

        // Create the menu.
        $this->create_nav();

        // Print woocommerce notices.
        wc_print_notices();

        // Vendor Store Notice.
        $vendor_dashboard_notice = get_option( 'wcvendors_vendor_dashboard_notice', false );

        if ( $vendor_dashboard_notice ) {

            wc_get_template(
                'dashboard-notice.php',
                array(
                    'vendor_dashboard_notice' => $vendor_dashboard_notice,
                    'notice_type'             => 'message',
                ),
                'wc-vendors/dashboard/',
                $this->base_dir . '/templates/dashboard/'
            );
        }

        wcv_deprecated_action( 'wcvendors_pro_after_dashboard_nav', '2.5.2', 'wcvendors_after_dashboard_nav' );
        $pages = $this->get_dashboard_pages();
        foreach ( $pages as $page ) {
            if ( $page['slug'] === $object ) {
                $page_title = isset( $page['label'] ) ? $page['label'] : '';
                $page_title = apply_filters( 'wcv_dashboard_page_title', $page_title, $object, $action );
                if ( '' === $action ) {
                    if ( isset( $page['after_label'] ) ) {
                        echo '<div class="wcv-flex wcv-flex-wrap-reverse wcv-tab-page-heading-wrapper ' . esc_attr( $object ) . '">';
                        echo '<h3 class="wcv-tab-page-heading">' . esc_html( $page_title ) . '</h3>';
                        foreach ( $page['after_label'] as $after_label ) {
                            echo wp_kses( $after_label, wcv_allowed_html_tags() );
                        }
                        echo '</div>';
                    } else {
                        echo '<div class="wcv-tab-page-heading-wrapper ' . esc_attr( $object ) . '">';
                        echo '<h3 class="wcv-tab-page-heading">' . esc_html( $page_title ) . '</h3>';
                        echo '</div>';
                    }
                }
            }
        }

        if ( 'dashboard' === $object ) {
            echo '<div class="wcv-gap-bottom ' . esc_attr( $object ) . '">';
            echo '<h3 class="wcv-tab-page-heading">' . esc_html__( 'Dashboard', 'wc-vendors' ) . '</h3>';
            echo '</div>';
        }

        // if action is set send to edit page with or without object_id else list type.
        if ( 'edit' === $action ) {

            $template_name = '';
            $custom_pages  = self::get_custom_pages();
            $base_dir      = ( array_key_exists( $object, $custom_pages ) ) ? $custom_pages[ $object ]['base_dir'] : $this->base_dir . 'templates/dashboard/';

            $base_dir = apply_filters( 'wcv_dashboard_template_base_dir', $base_dir, $object, $action, $template );

            // Load the form template based on options in backend.
            $template_name = apply_filters( 'wcv_dashboard_template_name', ( 'product' === $object && ! empty( $template ) ) ? $object . '-' . $template : $object . '-' . $action, $object, $template, $action );

            wc_get_template(
                $template_name . '.php',
                array(
                    'action'    => $action,
                    'template'  => $template,
                    'object_id' => $object_id,
                ),
                'wc-vendors/dashboard/',
                $base_dir
            );

        } else { // phpcs:ignore

            // Load the custom template.
            if ( ! empty( $custom ) ) {

                $custom_pages = self::get_custom_pages();
                // Output the template if it is defined.
                if ( array_key_exists( 'template_name', $custom_pages[ $custom ] ) ) {
                    wc_get_template(
                        $custom_pages[ $custom ]['template_name'] . '.php',
                        $custom_pages[ $custom ]['args'],
                        'wc-vendors/dashboard/',
                        $custom_pages[ $custom ]['base_dir']
                    );
                } else {
                    // Allow hooking into the custom template system to not require a template.
                    wcv_deprecated_action( 'wcv_pro_dashboard_custom_template', '2.5.2', 'wcvendors_dashboard_custom_template', $object, $object_id, $template, $custom );
                }
            } else { // phpcs:ignore

                // If the object is a post type then generate a table, otherwise load the custom template.
                if ( post_type_exists( $object ) ) {

                    // Use the internal table generator to create object list.
                    $object_table = new WCV_Table_Helper( $this->wcvendors, $this->version, $object, $object, get_current_user_id() );
                    $object_table->display();

                } else {

                    switch ( $object ) {
                        case 'order':
                            $this->load_order_page();
                            break;
                        case 'settings':
                            $this->load_settings_page();
                            break;
                        case 'reports':
                            $store_report = new WCV_Reports_Controller();
                            $store_report->report_init();
                            $store_report->display();
                            break;
                        case 'dashboard':
                            $dashboard_controller = new WCV_Dashboard_Controller( get_current_user_id() );
                            $dashboard_controller->display_dashboard();
                            break;
                        default:
                            wcv_deprecated_action( 'wcv_pro_dashboard_custom_page', '2.5.2', 'wcvendors_dashboard_custom_page', $object, $object_id, $template, $custom );
                            break;
                    }
                }
            }
        }

        wcv_deprecated_action( 'wcv_pro_after_dashboard', '2.5.2', 'wcvendors_after_dashboard' );

        include_once wcv_deprecated_filter( 'wcvendors_pro_dashboard_close_path', '2.5.2', 'wcvendors_dashboard_close_path', 'partials/wcvendors-dashboard-close.php' );
    }

    /**
     * Generate the page URL based on the dashboard page id set in options
     *
     * @since   2.5.2
     * @version 2.5.2
     *
     * @param string $page page type to output.
     */
    public static function get_dashboard_page_url( $page = '' ) {

        $dashboard_page_ids = (array) get_option( 'wcvendors_vendor_dashboard_page_id', array() );
        $dashboard_page_id  = reset( $dashboard_page_ids );
        $dashboard_url      = apply_filters( 'wcv_my_account_dashboard_url', get_permalink( $dashboard_page_id ) );

        return $dashboard_url . $page;
    }


    /**
     * Available dashboard urls for front end functionality
     *
     * @since    2.5.2
     * @version  2.5.2 - added can submit handler.
     */
    public function get_dashboard_pages() {

        $disable_duplicate   = ! wc_string_to_bool( get_option( 'wcvendors_capability_product_duplicate', 'no' ) );
        $can_submit          = wc_string_to_bool( get_option( 'wcvendors_capability_products_enabled', 'no' ) );
        $viewstore_disabled  = wc_string_to_bool( get_option( 'wcvendors_view_store_cap', 'no' ) );
        $can_export_orders   = wc_string_to_bool( get_option( 'wcvendors_capability_orders_export', 'no' ) );
        $product_templates   = WCV_Product_Controller::get_product_templates();
        $after_product_label = '';
        $lock_new_products   = ( 'yes' === get_user_meta( get_current_user_id(), '_wcv_lock_new_products_vendor', true ) ) ? true : false;
        $lock_edit_products  = ( 'yes' === get_user_meta( get_current_user_id(), '_wcv_lock_edit_products_vendor', true ) ) ? true : false;

        ob_start();
        wc_get_template(
            'product/product-buttons.php',
            array(
                'template_overrides' => $product_templates,
                'can_submit'         => $can_submit,
                'lock_new_products'  => $lock_new_products,
                'lock_edit_products' => $lock_edit_products,
            ),
            'wc-vendors/dashboard/',
            $this->base_dir . 'templates/dashboard/'
        );
        $after_product_label = ob_get_clean();

        $this->dashboard_pages['product'] = array(
            'slug'        => 'product',
            'id'          => 'product',
            'label'       => __( 'Products', 'wc-vendors' ),
            'actions'     => array(
                'edit'      => __( ' Edit', 'wc-vendors' ),
                'duplicate' => __( ' Duplicate', 'wc-vendors' ),
                'delete'    => __( ' Delete', 'wc-vendors' ),
            ),
            'icon'        => 'wcv-icon-tshirt',
            'after_label' => array( $after_product_label ),
        );

        if ( $disable_duplicate || $lock_edit_products ) {
            unset( $this->dashboard_pages['product']['actions']['duplicate'] );
        }

        if ( ! $can_submit || $lock_edit_products ) {
            unset( $this->dashboard_pages['product']['actions']['edit'] );
            unset( $this->dashboard_pages['product']['actions']['duplicate'] );
        }

        $this->dashboard_pages['order'] = array(
            'slug'    => 'order',
            'id'      => 'order',
            'label'   => __( 'Orders', 'wc-vendors' ),
            'actions' => array(),
            'icon'    => 'wcv-icon-orders',
        );

        if ( $can_export_orders ) {
            $this->dashboard_pages['order']['after_label'] = array(
                '<a href="' . esc_url( add_query_arg( 'wcv_export_orders', 'true' ) ) . '" class="wcv-button wcv-button-link">',
                wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-20 wcv-icon-middle', 'wcv-icon-export' ), wcv_allowed_html_tags() ),
                '<strong class="vertical-middle">' . esc_attr__( 'Export Orders', 'wc-vendors' ) . '</strong>',
                '</a>',
            );
        }

        $this->dashboard_pages['reports'] = array(
            'slug'    => 'reports',
            'id'      => 'reports',
            'label'   => __( 'Reports', 'wc-vendors' ),
            'actions' => array(),
            'icon'    => 'wcv-icon-reports',
        );

        if ( ! $viewstore_disabled ) {
            $store_url = apply_filters(
                'wcv_dashboard_view_store_url',
                array(
                    'label' => __( 'View store', 'wc-vendors' ),
                    'id'    => 'view-store',
                    'slug'  => WCV_Vendors::get_vendor_shop_page( get_current_user_id() ),
                    'icon'  => 'wcv-icon-view-store',
                )
            );
            if ( wc_string_to_bool( get_option( 'wcvendors_dashboard_view_store_new_window', 'no' ) ) ) {
                $store_url['target'] = '_blank';
            }
            $this->dashboard_pages['view_store'] = $store_url;
        }

        $this->dashboard_pages['settings'] = array(
            'slug'    => 'settings',
            'id'      => 'settings',
            'label'   => __( 'Settings', 'wc-vendors' ),
            'actions' => array(),
            'icon'    => 'wcv-icon-settings',
        );

        if ( wcv_is_all_product_types_hidden() ) {
            unset( $this->dashboard_pages['product'] );
        }

        return wcv_deprecated_filter( 'wcv_pro_dashboard_urls', '2.5.2', 'wcv_dashboard_urls', $this->dashboard_pages );
    }

    /**
     * Load the orders table
     *
     * @since    2.5.2
     */
    public function load_order_page() {
        $wcvendors_pro_order_controller = new WCV_Order_Controller( $this->wcvendors, $this->version, $this->debug );
        $wcvendors_pro_order_controller->display();
    }

    /**
     * Load the store settings page
     *
     * @since    2.5.2
     */
    public function load_settings_page() {

        $vendor_id = get_current_user_id();

        $store_name              = get_user_meta( $vendor_id, 'pv_shop_name', true );
        $store_description       = get_user_meta( $vendor_id, 'pv_shop_description', true );
        $shipping_disabled       = wc_string_to_bool( get_option( 'wcvendors_shipping_management_cap', 'no' ) );
        $shipping_methods        = WC()->shipping->load_shipping_methods();
        $shipping_method_enabled = ( array_key_exists( 'wcv_pro_vendor_shipping', $shipping_methods ) && 'yes' === $shipping_methods['wcv_pro_vendor_shipping']->enabled ) ? true : 0;
        $shipping_details        = get_user_meta( get_current_user_id(), '_wcv_shipping', true );

        wc_get_template(
            'wc-vendors-store-settings.php',
            array(
                'store_name'              => $store_name,
                'store_description'       => $store_description,
                'shipping_disabled'       => $shipping_disabled,
                'shipping_method_enabled' => $shipping_method_enabled,
                'shipping_details'        => $shipping_details,
            ),
            'wc-vendors/dashboard/',
            $this->base_dir . 'templates/dashboard/'
        );
    }

    /**
     * Check object permission to see if the vendor owns the object (this is to stop people messing with URLs)
     *
     * @since  2.5.2
     *
     * @param    string $object the object type to test.
     * @param    int    $object_id  object id to check.
     */
    public static function check_object_permission( $object, $object_id ) { // phpcs:ignore

        $can_edit_live = wc_string_to_bool( get_option( 'wcvendors_capability_products_edit', 'no' ) );
        $edit_status   = apply_filters( 'wcv_edit_object_status', array( 'draft', 'pending' ) );
        $post_status   = get_post_status( $object_id );
        $can_edit      = in_array( $post_status, $edit_status, true );

        $order      = null;
        $post_owner = 0;
        if ( 'order' === $object ) {
            $order = wc_get_order( $object_id );

            if ( ! $order ) {
                return false;
            }

            if ( 'shop_order_vendor' === $order->get_type() ) {
                $order_owner = (int) $order->get_meta( 'wcv_vendor_id' );

                return ( get_current_user_id() === $order_owner );
            } elseif ( 'shop_order' === $order->get_type() ) {
                $vendors_ids = (array) $order->get_meta( 'wcv_vendor_ids' );

                // Only allow access if vendor_ids meta exists and contains current user.
                if ( ! empty( $vendors_ids ) ) {
                    return in_array( get_current_user_id(), $vendors_ids, true );
                }

                // If wcv_vendor_ids meta is missing, deny access for security.
                return false;
            }

            // Unknown order type - deny access.
            return false;
        } else {
            $post_owner = get_post_field( 'post_author', $object_id );
        }

        if ( ! $can_edit_live ) {
            $can_edit_live = $can_edit ? true : false;
        }

        if ( post_type_exists( $object ) ) {
            if ( absint( $post_owner ) !== absint( get_current_user_id() ) ) {
                return apply_filters( 'wcvendors_dashboard_object_owner_check', false, $object, $object_id );
            }
        }

        switch ( $object ) {
            // Product permissions.
            case 'product':
                return ( $can_edit_live && (int) WCV_Vendors::get_vendor_from_product( $object_id ) === get_current_user_id() ) ? true : false;
            // Dashboard.
            default:
                return apply_filters( 'wcvendors_dashboard_check_object_permission', true, $object, $object_id );
        }
    }

    /**
     * Check permission before the page loads
     *
     * @since    2.5.2
     */
    public function check_permission() {

        global $wp_query;
        $current_page_id = get_the_ID();

        if ( wcv_is_dashboard_page( $current_page_id ) ) {

            if ( ! is_user_logged_in() ) {

                $my_account_page = wc_get_page_id( 'myaccount' );

                if ( ! is_string( get_post_status( $my_account_page ) ) ) {
                    /* translators: %s the label for vendors. */
                    wc_add_notice( sprintf( __( 'Please contact the website administrator and instruct them that in order for the %s Dashboard to work for logged out users, they must have their My Account page configured and set properly in their WooCommerce settings.', 'wc-vendors' ), wcv_get_vendor_name() ), 'error' );
                } else {
                    wp_safe_redirect( apply_filters( 'wcv_login_redirect', get_permalink( wc_get_page_id( 'myaccount' ) ) ), 302 );
                    exit;
                }
            }

            if ( isset( $wp_query->query_vars['object'] ) ) {
                $object    = get_query_var( 'object' );
                $action    = get_query_var( 'action' );
                $object_id = get_query_var( 'object_id' ) ? get_query_var( 'object_id' ) : '';
                $user_id   = get_current_user_id();

                $lock_new_products  = ( 'yes' === get_user_meta( $user_id, '_wcv_lock_new_products_vendor', true ) ) ? true : false;
                $lock_edit_products = ( 'yes' === get_user_meta( $user_id, '_wcv_lock_edit_products_vendor', true ) ) ? true : false;

                if ( 'edit' === $action && 'product' === $object ) {

                    if ( ( $lock_new_products && $lock_edit_products ) || ( empty( $object_id ) && $lock_new_products ) || ( ! empty( $object_id ) && $lock_edit_products ) ) {

                        wp_safe_redirect( self::get_dashboard_page_url( 'product' ), 302 );
                    }
                }
            }
        }
    }

    /**
     * Can the current user view the dashboard ?
     *
     * @since    2.5.2
     */
    public function can_view_dashboard() {

        $user_id  = get_current_user_id();
        $can_view = false;

        if ( ! $user_id || 0 === $user_id ) {
            echo wp_kses_post( $this->permission_denied() );
            return $can_view;
        }

        $referer      = wp_get_referer();
        $user         = get_userdata( $user_id );
        $user_roles   = $user->roles;
        $accept_terms = false;
        if ( isset( $_GET['terms'] ) ) {
            // Verify nonce if present, otherwise default to false for security.
            if ( isset( $_GET['apply_for_vendor_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['apply_for_vendor_nonce'] ) ), 'apply_for_vendor' ) ) {
                $accept_terms = wc_string_to_bool( sanitize_text_field( wp_unslash( $_GET['terms'] ) ) );
            }
        }
        $is_vendor             = in_array( 'vendor', $user_roles, true );
        $is_admin              = in_array( 'administrator', $user_roles, true ) || in_array( 'shop_manager', $user_roles, true );
        $is_pending_vendor     = in_array( 'pending_vendor', $user_roles, true );
        $redirect_to_form      = wc_string_to_bool( get_option( 'wcvendors_vendor_registration_form_redirect', 'no' ) );
        $manual                = wc_string_to_bool( get_option( 'wcvendors_vendor_approve_registration', 'no' ) );
        $application_submitted = wc_string_to_bool( get_user_meta( $user->ID, 'wcv_vendor_application_submitted', true ) );

        /**
         * Once the user has registered they have the vendor role.
         * So we need to check if the user is coming from the My Account page and has accepted the terms
         * then show Application Form if the Registration Form option is enabled
        */
        $my_account_url = get_permalink( wc_get_page_id( 'myaccount' ) );

        if ( ( $referer && str_contains( $referer, $my_account_url ) ) && $accept_terms && $redirect_to_form && $manual ) {
            $is_vendor = false;
        }

        if ( $is_vendor && ! $is_pending_vendor && $application_submitted ) {
            $can_view = true;
        }

        if ( $is_vendor && ! $redirect_to_form && ! $application_submitted ) {
            $can_view = true;
        }

        return apply_filters( 'wcvendors_can_view_dashboard', $can_view );
    }

    /**
     * Maybe load the application form if the user is a pending vendor
     *
     * Will load the application form if the vendor is set to be manually approved and the redirect to form option is enabled.
     *
     * @return void
     * @version 2.5.2
     * @since   2.5.2
     */
    public function maybe_load_application_form() {
        $user = get_userdata( get_current_user_id() );
        if ( ! $user ) {
            return;
        }

        $user_roles            = $user->roles;
        $redirect_to_form      = wc_string_to_bool( get_option( 'wcvendors_vendor_registration_form_redirect', 'no' ) );
        $is_pending_vendor     = in_array( 'pending_vendor', $user_roles, true );
        $is_admin              = in_array( 'administrator', $user_roles, true ) || in_array( 'shop_manager', $user_roles, true );
        $is_vendor             = in_array( 'vendor', $user_roles, true );
        $application_submitted = wc_string_to_bool( get_user_meta( $user->ID, 'wcv_vendor_application_submitted', true ) );
        $can_apply_to_vendor   = ! $is_vendor && ! $is_pending_vendor && ! $is_admin;

        if ( $is_admin ) {
            echo esc_html__( 'Admin cannot apply to be a vendor.', 'wc-vendors' );
            return;
        }

        if ( ( $application_submitted && $is_pending_vendor ) || ( $is_pending_vendor && ! $redirect_to_form ) ) {
            echo $this->show_pending_vendor_notice(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            return;
        }

        if ( ( ! $application_submitted && $redirect_to_form ) || $can_apply_to_vendor ) {
            do_action( 'wcvendors_user_can_apply_vendor' );
            $this->show_application_form();
            return;
        }

        $allowed_html = array(
            'p'      => array(
                'class' => array(),
            ),
            'form'   => array(
                'method' => array(),
                'action' => array(),
            ),
            'div'    => array(
                'class' => array(),
            ),
            'input'  => array(
                'class' => array(),
                'id'    => array(),
                'type'  => array(),
                'name'  => array(),
                'value' => array(),
            ),
            'label'  => array(
                'for'   => array(),
                'class' => array(),
            ),
            'a'      => array(
                'href' => array(),
            ),
            'script' => array(
                'type' => array(),
            ),
            'br'     => array(),
        );

        echo wp_kses(
            $this->get_become_a_vendor(),
            array_merge( wcv_allowed_html_tags(), $allowed_html )
        );
    }

    /**
     * Show get application form
     *
     * @since    2.5.2
     * @version  2.5.2
     */
    public function show_application_form() {
        $signup_form_html = $this->get_become_a_vendor();
        echo apply_filters( 'wcvendors_application_form', $signup_form_html ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }

    /**
     * Get become a vendor form
     */
    public function get_become_a_vendor() {
        ob_start();
        wc_get_template(
            'denied.php',
            array(),
            'wc-vendors/dashboard/',
            WCV_PLUGIN_DIR . 'templates/dashboard/'
        );
        return ob_get_clean();
    }

    /**
     * Show pending vendor notice
     *
     * @since 2.5.2
     * @version 2.5.2
     */
    public function show_pending_vendor_notice() {
        $default_notice = sprintf(
            /* translators: %s: vendor name */
            __( 'Your account has not yet been approved to become a %s.  When it is, you will receive an email telling you that your account is approved!', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        );
        ob_start();
        $vendor_pending_notice = apply_filters( 'wcvendors_vendor_pending_notice', $default_notice );
        wc_get_template(
            'vendor-pending-notice.php',
            array( 'vendor_pending_notice' => $vendor_pending_notice ),
            'wc-vendors/front/',
            $this->base_dir . '/templates/front/'
        );
        return ob_get_clean();
    }



    /**
     * Add the query vars for the rewrirte rules add_query_vars function.
     *
     * @access        public
     * @since         2.5.2
     *
     * @param        array $vars query vars array.
     * @return       array $vars new query vars.
     */
    public function add_query_vars( $vars ) {

        $vars[] = 'object';
        $vars[] = 'object_id';
        $vars[] = 'action';
        $vars[] = 'template';
        $vars[] = 'custom';

        return $vars;
    }

    /**
     * Get any custom pages defined by integrations
     *
     * @since   2.5.2
     * @version 2.5.2
     * @return array $pages custom page routes and template information
     */
    public static function get_custom_pages() {

        return apply_filters( 'wcv_dashboard_custom_pages', array() );
    }

    /**
     * Dashboard rewrite rules
     *
     * @since    2.5.2
     *
     * @param  array $rules rules array.
     */
    public function rewrite_rules( $rules ) {

        $dashboard_page_id = get_option( 'wcvendors_vendor_dashboard_page_id', array() );

        // If the dashboard page hasn't been set, don't create the re-write rules.
        if ( ! empty( $dashboard_page_id ) ) {

                $_post               = get_post( $dashboard_page_id );
                $dashboard_page_slug = $_post->post_name;

                if ( $_post->post_parent ) {
                    $_parent_slug_prefix = get_post( $_post->post_parent )->post_name;
                    $dashboard_page_slug = $_parent_slug_prefix . '/' . $dashboard_page_slug;
                }

                $pages        = self::get_dashboard_pages();
                $custom_pages = self::get_custom_pages();

                foreach ( $pages as $page ) {
                    // Type Rule.
                    $type_rule = array(
                        $dashboard_page_slug . '/' . $page['slug'] . '?$'             => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $page['slug'],
                        $dashboard_page_slug . '/' . $page['slug'] . '/page/([0-9]+)' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $page['slug'] . '&paged=$matches[1]',
                    );
                    $rules     = $type_rule + $rules;

                    // Allow custom rules to be added.
                    if ( ! empty( $custom_pages ) ) {

                        foreach ( $custom_pages as $custom_page ) {

                            // check if a parent object has been defined.
                            if ( array_key_exists( 'parent', $custom_page ) ) {
                                $custom_rule = array( $dashboard_page_slug . '/' . $custom_page['parent'] . '/' . $custom_page['slug'] . '?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $custom_page['parent'] . '&custom=' . $custom_page['slug'] );
                            } else {
                                $custom_rule = array( $dashboard_page_slug . '/' . $custom_page['slug'] . '?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $custom_page['slug'] );
                            }

                            $rules = $custom_rule + $rules;

                            // Register the actions for the custom page.
                            if ( array_key_exists( 'actions', $custom_page ) ) {

                                foreach ( $custom_page['actions'] as $action => $label ) {

                                    // Actions Rule.
                                    $action_rule = array( $dashboard_page_slug . '/' . $custom_page['slug'] . '/' . $action . '?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $custom_page['slug'] . '&action=' . $action );
                                    $id_rule     = array( $dashboard_page_slug . '/' . $custom_page['slug'] . '/' . $action . '/([0-9]+)?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $custom_page['slug'] . '&action=' . $action . '&object_id=$matches[1]' );
                                    $rules       = $action_rule + $id_rule + $rules;
                                }
                            }
                        }
                    }

                    if ( isset( $page['actions'] ) && is_array( $page['actions'] ) ) {

                        foreach ( $page['actions'] as $action => $label ) {
                            // Actions Rule.
                            $action_rule   = array( $dashboard_page_slug . '/' . $page['slug'] . '/' . $action . '?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $page['slug'] . '&action=' . $action );
                            $template_rule = array( $dashboard_page_slug . '/' . $page['slug'] . '/([^/]*)/' . $action . '?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $page['slug'] . '&template=$matches[1]&action=' . $action );
                            // Id parsed ?
                            $id_rule          = array( $dashboard_page_slug . '/' . $page['slug'] . '/' . $action . '/([0-9]+)?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $page['slug'] . '&action=' . $action . '&object_id=$matches[1]' );
                            $template_id_rule = array( $dashboard_page_slug . '/' . $page['slug'] . '/([^/]*)/' . $action . '/([0-9]+)?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=' . $page['slug'] . '&template=$matches[1]&action=' . $action . '&object_id=$matches[2]' );

                            $rules = $action_rule + $template_rule + $id_rule + $template_id_rule + $rules;
                        }
                    }
                }

                // Add dashboard home rule LAST (highest priority).
                $dashboard_home_rule = array(
                    $dashboard_page_slug . '/?$' => 'index.php?pagename=' . $dashboard_page_slug . '&object=dashboard',
                );
                $rules               = $dashboard_home_rule + $rules;
        }
        return apply_filters( 'wcv_dashboard_rewrite_rules', $rules );
    }

    /**
     * Create the dashboard navigation from available pages.
     *
     * @since    2.5.2
     * @todo     Have this menu output better
     */
    public function create_nav() {

        $pages = self::get_dashboard_pages();

        $current_page = get_query_var( 'object' );

        $products_disabled   = wc_string_to_bool( get_option( 'wcvendors_product_management_cap', 'no' ) );
        $orders_disabled     = wc_string_to_bool( get_option( 'wcvendors_order_management_cap', 'no' ) );
        $commission_disabled = wc_string_to_bool( get_option( 'wcvendors_commission_management_cap', 'no' ) );
        $coupons_disabled    = wc_string_to_bool( get_option( 'wcvendors_shop_coupon_management_cap', 'no' ) );
        $ratings_disabled    = wc_string_to_bool( get_option( 'wcvendors_ratings_management_cap', 'no' ) );
        $settings_disabled   = wc_string_to_bool( get_option( 'wcvendors_settings_management_cap', 'no' ) );
        $show_logout         = wc_string_to_bool( get_option( 'wcvendors_dashboard_show_logout', 'no' ) );
        $vertical_menu       = wc_string_to_bool( get_option( 'wcvendors_use_vertical_menu', 'no' ) );

        if ( $products_disabled ) {
            unset( $pages['product'] );
        }
        if ( $orders_disabled ) {
            unset( $pages['order'] );
        }
        if ( $coupons_disabled ) {
            unset( $pages['shop_coupon'] );
        }
        if ( $ratings_disabled ) {
            unset( $pages['rating'] );
        }
        if ( $commission_disabled ) {
            unset( $pages['commission'] );
        }
        if ( $settings_disabled ) {
            unset( $pages['settings'] );
        }

        // Add dashboard home to the pages array.
        $dashboard_home = apply_filters(
            'wcv_dashboard_home_url',
            array(
                'label' => __( 'Dashboard', 'wc-vendors' ),
                'slug'  => '',
                'icon'  => 'wcv-icon-dashboard',
            )
        );

        if ( isset( $pages['rating'] ) ) {
            $pages['rating']['icon'] = 'wcv-icon-rating';
        }

        if ( isset( $pages['shop_coupon'] ) ) {
            $pages['shop_coupon']['icon'] = 'wcv-icon-coupons';
        }

        if ( isset( $pages['commission'] ) ) {
            $pages['commission']['icon'] = 'wcv-icon-commission';
        }

        if ( isset( $pages['wcv_refund_request'] ) ) {
            $pages['wcv_refund_request']['icon'] = 'wcv-icon-refund';
        }

        if ( $show_logout ) {
            $store_url = apply_filters(
                'wcv_dashboard_show_logout',
                array(
                    'label' => __( 'Logout', 'wc-vendors' ),
                    'id'    => 'logout',
                    'slug'  => wc_logout_url(),
                    'icon'  => 'wcv-icon-logout',
                )
            );

            $pages['logout'] = $store_url;
        }

        $pages          = array_merge( array( 'dashboard_home' => $dashboard_home ), $pages );
        $pages          = apply_filters( 'wcv_dashboard_pages_nav', $pages );
        $menu_dir_class = ( $vertical_menu ) ? 'vertical' : 'horizontal';
        $nav_class      = apply_filters( 'wcv_dashboard_nav_class', '' );
        $menu_dir_size  = ( $vertical_menu ) ? 'all-25 small-100 medium-100' : 'all-100';
        $no_icon_pages  = array_filter(
            $pages,
            function ( $page ) {
                return ! isset( $page['icon'] ) && ! isset( $page['icon_url'] );
            }
        );

        foreach ( $no_icon_pages as $key => $page ) {
            $pages[ $key ]['icon'] = 'wcv-icon-dashboard-default';
        }

        $end_items = array_filter(
            $pages,
            function ( $page ) {
                return isset( $page['id'] ) && ( 'view-store' === $page['id'] || 'settings' === $page['id'] || 'logout' === $page['id'] );
            }
        );

        unset( $pages['view_store'] );
        unset( $pages['settings'] );
        unset( $pages['logout'] );

        $pages = array_merge( $pages, $end_items );

        // Move this into a template.
        $menu_wrapper_start = apply_filters(
            'wcv_dashboard_nav_wrapper_start',
            wc_get_template_html(
                'nav-wrapper-start.php',
                array(
                    'nav_class'      => $nav_class,
                    'menu_dir_class' => $menu_dir_class,
                    'menu_dir_size'  => $menu_dir_size,
                    'full_width'     => count( $pages ) <= 6 ? 'full-width' : '',
                ),
                'wc-vendors/dashboard/',
                $this->base_dir . 'templates/dashboard/'
            )
        );

        echo wp_kses_post( $menu_wrapper_start );

        foreach ( $pages as $page ) {
            $this->generate_nav_item( $page );
        }
        echo '</ul>';

        if ( ! $vertical_menu ) {
            wc_get_template(
                'expand-nav.php',
                array(),
                'wc-vendors/dashboard/',
                $this->base_dir . 'templates/dashboard/'
            );
        }

        printf( '<ul class="wcv-dashboard-menu %s black secondary"></ul>', esc_attr( $menu_dir_class ) );

        echo '</nav>';

        echo '</div>';

        if ( ! $vertical_menu ) {
            echo '</div>';
        }

        wcv_deprecated_action( 'wcv_pro_after_dashboard_nav_container', '2.5.2', 'wcvendors_after_dashboard_nav_container' );

        if ( $vertical_menu ) {
            echo '<div class="all-75 medium-100 small-100 wcv-main-content ' . esc_attr( $menu_dir_class ) . '">';
        }
    }

    /**
     * Generate the dashboard nav item
     *
     * @since 2.5.4
     * @param array $page the page array.
     */
    public function generate_nav_item( $page ) {

        if ( filter_var( $page['slug'], FILTER_VALIDATE_URL ) === false ) {
            $page_url = $this->get_dashboard_page_url( $page['slug'] );
        } else {
            $page_url = $page['slug'];
        }

        $current_page = get_query_var( 'object' );
        $class        = 'wcv-dashboard-nav-item';
        $class       .= ( $current_page === $page['slug'] ) ? ' active' : '';
        $id           = isset( $page['id'] ) ? $page['id'] : '';
        $page_label   = $page['label'];
        $target       = isset( $page['target'] ) ? $page['target'] : false;
        $icon         = isset( $page['icon'] ) ? $page['icon'] : '';
        $icon_url     = isset( $page['icon_url'] ) ? $page['icon_url'] : '';
        $item_start   = isset( $page['item_start'] ) ? $page['item_start'] : sprintf( '<li id="dashboard-menu-item-%s" class="%s">', $id, $class );
        $item_end     = isset( $page['item_end'] ) ? $page['item_end'] : '</li>';

        wc_get_template(
            'nav.php',
            array(
                'page'       => $page,
                'page_url'   => $page_url,
                'target'     => $target,
                'page_label' => $page_label,
                'class'      => $class,
                'id'         => $id,
                'icon'       => $icon,
                'icon_url'   => $icon_url,
                'sub_items'  => isset( $page['sub_items'] ) ? $page['sub_items'] : array(),
                'dashboard'  => $this,
                'item_start' => $item_start,
                'item_end'   => $item_end,
            ),
            'wc-vendors/dashboard/',
            $this->base_dir . 'templates/dashboard/'
        );
    }

    /**
     * Check if a page is disabled and return if it is
     *
     * @since    2.5.2
     * @version  2.5.2
     */
    public function page_disabled() {

        $current_page = get_query_var( 'object' );
        $disabled     = false;

        switch ( $current_page ) {
            case 'product':
                $disabled = wc_string_to_bool( get_option( 'wcvendors_product_management_cap', 'no' ) );
                break;
            case 'order':
                $disabled = wc_string_to_bool( get_option( 'wcvendors_order_management_cap', 'no' ) );
                break;
            case 'settings':
                $disabled = wc_string_to_bool( get_option( 'wcvendors_settings_management_cap', 'no' ) );
                break;
        }

        return ! apply_filters( 'wcvendors_page_disabled', $disabled, $current_page );
    }

    /**
     * Shortcode for dashboard navigation
     *
     * @since    2.5.2
     */
    public function load_dashboard_nav() {

        if ( ! is_user_logged_in() ) {

            return false;

        } elseif ( WCV_Vendors::is_vendor( get_current_user_id() ) ) {

            ob_start();
            echo '<div class="wcvendors-pro-dashboard-wrapper"><div class="wcv-grid">';
            $this->create_nav();
            echo '</div></div>';

            return ob_get_clean();
        }
    }

    /**
     * Check if the current page is a dashboard page
     *
     * @since      2.5.2
     * @access     public
     * @deprecated 2.5.2
     * @param int $page_id the page id to check.
     * @return bool returns if the page id passed is a dashboard page.
     */
    public static function is_dashboard_page( $page_id ) {
        return wcv_is_dashboard_page( $page_id );
    }

    /**
     * Check if the the vendors access has been disabled
     *
     * @since  2.5.2
     * @access public
     */
    public function lock_new_products_notice() {

        $lock_new_products         = ( 'yes' === get_user_meta( get_current_user_id(), '_wcv_lock_new_products_vendor', true ) ) ? true : false;
        $lock_new_products_notice  = get_user_meta( get_current_user_id(), '_wcv_lock_new_products_vendor_msg', true );
        $lock_edit_products        = ( 'yes' === get_user_meta( get_current_user_id(), '_wcv_lock_edit_products_vendor', true ) ) ? true : false;
        $lock_edit_products_notice = get_user_meta( get_current_user_id(), '_wcv_lock_edit_products_vendor_msg', true );
        $notices                   = array();
        $notice                    = '';

        if ( $lock_new_products ) {
            $notices[] = $lock_new_products_notice;
        }
        if ( $lock_edit_products ) {
            $notices[] = $lock_edit_products_notice;
        }

        if ( ! empty( $notices ) ) {

            wc_get_template(
                'dashboard-notice.php',
                array(
                    'vendor_dashboard_notice' => implode( '<br/>', $notices ),
                    'notice_type'             => 'error',
                ),
                'wc-vendors/dashboard/',
                $this->base_dir . '/templates/dashboard/'
            );
        }
    }

    /**
     * Update disk and file usage after deleting or adding media file
     *
     * @since 2.5.2
     * @param int $post_id the post id of the media file.
     */
    public function update_disk_usage_status( $post_id ) {
        $author = get_post_field( 'post_author', $post_id );

        if ( ! WCV_Vendors::is_vendor( $author ) ) {
            return;
        }

        delete_transient( 'wcv_user_media_' . $author );
        delete_transient( 'wcv_user_disk_usage_' . $author );
    }

    /**
     * Show permission deny message for guest
     *
     * @since 2.5.2
     * @version 2.5.2
     */
    public function permission_denied() {
        $default_message         = sprintf(
            '%s<br/><br/>%s',
            __( 'It looks like you\'re trying to access the Vendor Dashboard. This feature is available exclusively to registered vendors.', 'wc-vendors' ),
            __( 'Join our marketplace and start selling your products to a wide audience. Click the link below to register and become a vendor today!', 'wc-vendors' )
        );
        $default_button_text     = __( 'Register as a Vendor', 'wc-vendors' );
        $denied_message          = get_option( 'wcvendors_permission_denied_message', $default_message );
        $register_button_text    = get_option( 'wcvendors_permission_denied_message_button_text', $default_button_text );
        $woo_my_account_page_url = get_permalink( wc_get_page_id( 'myaccount' ) );
        ob_start();
            wc_get_template(
                'permission-denied.php',
                array(
                    'denied_message' => $denied_message,
                    'button_text'    => $register_button_text,
                    'return_url'     => $woo_my_account_page_url,
                ),
                'wc-vendors/dashboard/',
                $this->base_dir . '/templates/dashboard/'
            );
        return apply_filters( 'wcvendors_vendor_dashboard_permission_denied', ob_get_clean() );
    }

    /**
     * Add vendor dashboard link to my account menu
     *
     * @since 2.5.2
     * @version 2.5.2
     *
     * @param array $items the menu items.
     * @return array $items the menu items.
     */
    public function add_vendor_dashboard_item( $items ) {
        $vendor_dashboard_page_id = get_option( 'wcvendors_vendor_dashboard_page_id' );
        if ( $vendor_dashboard_page_id ) {

            $vendor_singular = wcv_get_vendor_name( true, true );
            if ( empty( $vendor_singular ) ) {
                $vendor_singular = __( 'Vendor', 'wc-vendors' );
            }

            $items['vendor-dashboard'] = $vendor_singular . ' ' . __( 'Dashboard', 'wc-vendors' );
        }

        // Move vendor-dashboard above logout.
        if ( isset( $items['customer-logout'] ) ) {
            $logout = $items['customer-logout'];
            unset( $items['customer-logout'] );
            $items['customer-logout'] = $logout;
        }

        return $items;
    }

    /**
     * Add vendor dashboard link to my account menu
     *
     * @since 2.5.2
     * @version 2.5.2
     *
     * @param string $url the menu item url.
     * @param string $endpoint the menu item endpoint.
     */
    public function add_vendor_dashboard_endpoint( $url, $endpoint ) {
        if ( 'vendor-dashboard' === $endpoint ) {
            $vendor_dashboard_page_id = get_option( 'wcvendors_vendor_dashboard_page_id' );
            if ( $vendor_dashboard_page_id ) {
                $url = get_permalink( $vendor_dashboard_page_id );
            }
        }
        return $url;
    }

    /**
     * Add dashboard icon with the menu item
     */
    public function add_vendor_dashboard_icon() {
        echo '<style>.woocommerce-MyAccount-navigation ul li.woocommerce-MyAccount-navigation-link--vendor-dashboard a::before{ content: "\f3fd"; }</style>';
    }

    /**
     * Redirect old slug to new slug
     */
    public function redirect_old_slug() {
        $slugs       = array(
            'vendor_dashboard/orders'         => 'vendor_dashboard/order',
            '/vendor_dashboard/shop-settings' => 'vendor_dashboard/settings',
        );
        $request_uri = isset( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        foreach ( $slugs as $old_slug => $new_slug ) {
            if ( str_contains( $request_uri, $old_slug ) ) {
                wp_safe_redirect( home_url( $new_slug ), 301 );
                exit;
            }
        }
    }

    /**
     * Load theme support for the dashboard
     *
     * @since 2.5.2
     * @version 2.5.2
     */
    public function load_theme_support() {
        $theme    = wp_get_theme();
        $template = $theme->get_template();
        switch ( $template ) {
            case 'Divi':
                include_once WCV_PLUGIN_DIR . 'classes/front/theme-support/class-divi.php';
                break;
        }
    }

    /**
     * Turn checkboxes on the settings page to toggle
     *
     * @param array $field Field options.
     *
     * @since 2.5.4
     * @version 2.5.4 - Added
     */
    public function convert_checkbox_to_toggle( $field ) {
        $field['type'] = 'toggle';

        $field['custom_margin'] = 24;

        return $field;
    }
}
