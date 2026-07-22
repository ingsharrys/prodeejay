<?php
/**
 * Admin setup wziard
 *
 * @author      WooCommerce, Jamie Madden, WC Vendors
 * @category    Admin
 * @package     WCVendors/Admin
 * @version     2.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * WCVendors_Admin_Setup_Wizard class.
 */
class WCVendors_Admin_Setup_Wizard {

    /**
     * Current step
     *
     * @var string
     */
    private $step = 'welcome';

    /**
     * Steps for the setup wizard
     *
     * @var array
     */
    private $steps = array();

    /**
     * Actions to be executed after the HTTP response has completed
     *
     * @var array
     */
    private $deferred_actions = array();

    /**
     * Hook in tabs.
     */
    public function __construct() {
        $enable_setup_wizard = apply_filters_deprecated( 'wcv_enable_setup_wizard', array( true ), '2.3.0', 'wcvendors_enable_setup_wizard' );
        $enable_setup_wizard = apply_filters( 'wcvendors_enable_setup_wizard', $enable_setup_wizard );

        if ( $enable_setup_wizard && current_user_can( 'manage_woocommerce' ) ) {
            add_action( 'admin_menu', array( $this, 'admin_menus' ) );
            add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
            add_action( 'wp_ajax_wcvendors_one_click_setup', array( $this, 'ajax_one_click_setup' ) );
        }

        add_action( 'admin_init', array( $this, 'redirect_to_admin_page' ) );
    }

    /**
     * Add admin menus/screens.
     */
    public function admin_menus() {
            add_submenu_page(
                'wc-vendors',
                __( 'WC Vendors Setup Wizard', 'wc-vendors' ),
                __( 'Setup Wizard', 'wc-vendors' ),
                'manage_options',
                'wcv-setup',
                array( $this, 'setup_wizard' )
            );
    }

    /**
     * Redirect Pro Setup Wizard to WC Vendors Setup Wizard
     */
    public function redirect_to_admin_page() {
        if ( isset( $_GET['page'] ) && 'wcvendors-pro-setup' === $_GET['page'] ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            wp_safe_redirect( admin_url( 'admin.php?page=wcv-setup' ) );
            exit;
        }
    }

    /**
     * Show the setup wizard.
     */
    public function setup_wizard() {

        if ( empty( $_GET['page'] ) || 'wcv-setup' !== sanitize_text_field( wp_unslash( $_GET['page'] ) ) || ! current_user_can( 'manage_woocommerce' ) ) {
            return;
        }

        $default_steps = array(

            'welcome'             => array(
                'name'    => __( 'Get Started', 'wc-vendors' ),
                'view'    => array( $this, 'wcv_setup_welcome' ),
                'handler' => array( $this, 'show_config_page' ),
                'desc'    => __( 'Setup the plugin', 'wc-vendors' ),
            ),
            'config'              => array(
                'name'    => __( 'Marketplace', 'wc-vendors' ),
                'view'    => array( $this, 'basic_configuration' ),
                'handler' => array( $this, 'basic_configuration_save' ),
                'desc'    => __( 'Marketplace setup', 'wc-vendors' ),
            ),
            'advanced'            => array(
                'name'    => __( 'Vendor', 'wc-vendors' ),
                'view'    => array( $this, 'advanced_settings' ),
                'handler' => array( $this, 'advanced_settings_save' ),
                'desc'    => __( 'Vendor setup', 'wc-vendors' ),
            ),
            'recommended_plugins' => array(
                'name'    => __( 'Recommended Plugins', 'wc-vendors' ),
                'view'    => array( $this, 'recommended_plugins' ),
                'handler' => array( $this, 'recommended_plugins_save' ),
                'desc'    => __( 'Enhance your marketplace', 'wc-vendors' ),
            ),
            'finish'              => array(
                'name'    => __( 'Finish!', 'wc-vendors' ),
                'view'    => array( $this, 'wcv_setup_ready' ),
                'handler' => '',
                'desc'    => __( 'Wrap up &amp; next steps', 'wc-vendors' ),
            ),
        );

        $this->steps = apply_filters_deprecated( 'wcv_setup_wizard_steps', array( $default_steps ), '2.3.0', 'wcvendors_setup_wizard_steps' );
        $this->steps = apply_filters( 'wcvendors_setup_wizard_steps', $this->steps );
        $this->step  = isset( $_GET['step'] ) ? sanitize_key( $_GET['step'] ) : 'welcome';

        if ( ! empty( $_POST['save_step'] ) && isset( $this->steps[ $this->step ]['handler'] ) ) {

            if ( ! isset( $_POST['wcv-setup'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['wcv-setup'] ) ), 'wcv-setup' ) ) {
                wp_die( esc_html__( 'Security check failed. Please refresh the page and try again.', 'wc-vendors' ) );
            }

            if ( is_callable( $this->steps[ $this->step ]['handler'] ) ) {
                call_user_func( $this->steps[ $this->step ]['handler'], $this );
            }
        }

        if ( ! empty( $_POST['previous_step'] ) ) {
            if ( ! isset( $_POST['wcv-setup'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['wcv-setup'] ) ), 'wcv-setup' ) ) {
                wp_die( esc_html__( 'Security check failed. Please refresh the page and try again.', 'wc-vendors' ) );
            }

            wp_safe_redirect( esc_url_raw( $this->get_previous_step_link() ) );
            exit;
        }

        ob_start();
        do_action( 'wcvendors_setup_wizard_before_setup_wizard' );
        echo '<div class="wcv-setup">';
        $this->setup_wizard_header();
        $this->setup_wizard_steps();
        $this->setup_wizard_content();
        $this->setup_wizard_footer();
        echo '</div>';
        do_action( 'wcvendors_setup_wizard_after_setup_wizard' );

        $output = ob_get_clean();
        echo $output; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }

    /**
     * Enqueue scripts and styles for the setup wizard.
     */
    public function enqueue_assets() {
        if ( 'wc-vendors_page_wcv-setup' !== get_current_screen()->id ) {
            return;
        }

        $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

        wp_enqueue_style( 'wcv-setup', WCV_ASSETS_URL . 'css/wcv-setup' . $suffix . '.css', array( 'dashicons' ), WCV_VERSION, 'screen' );
        wp_enqueue_script( 'wcv-setup', WCV_ASSETS_URL . 'js/admin/wcv-setup.js', array( 'jquery' ), WCV_VERSION, false );

        $wcv_setup = array(
            'one_click_setup_url'     => admin_url( 'admin-ajax.php' ),
            'one_click_setup_confirm' => __( 'Are you sure you want to install the defaults? This will configure your marketplace with recommended settings.', 'wc-vendors' ),
            'nonce'                   => wp_create_nonce( 'wcvendors_one_click_setup' ),
            'redirect_url'            => admin_url( 'admin.php?page=wcv-settings' ),
            'redirect_delay'          => 3000,
            'redirect_message'        => __( 'Congratulations! Your marketplace is now ready to use. You will be redirected to the settings page.', 'wc-vendors' ),
            'redirect_message_error'  => __( 'An error occurred during setup. Please try again or contact support.', 'wc-vendors' ),
            'skip_wizard_url'         => admin_url( 'admin.php?page=wc-vendors-marketplace-dashboard' ),
            'skip_wizard_confirm'     => __( 'Are you sure you want to skip the setup wizard? This will redirect you to the marketplace dashboard and use the default settings.', 'wc-vendors' ),
        );

        wp_localize_script(
            'wcv-setup',
            'wcv_setup',
            $wcv_setup
        );

        wp_enqueue_script( 'wcv-setup' );
    }

    /**
     * Handle AJAX one-click setup request
     */
    public function ajax_one_click_setup() {
        do_action( 'wcvendors_setup_wizard_before_ajax_one_click_setup' );
        check_ajax_referer( 'wcvendors_one_click_setup', 'nonce' );

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error(
                array(
                    'message' => __( 'You do not have permission to perform this action.', 'wc-vendors' ),
                )
            );
        }

        try {
            $this->save_one_click_setup();

            wp_send_json_success(
                array(
                    'message'      => __( 'Congratulations! Your marketplace is now ready to use. You will be redirected to the settings page.', 'wc-vendors' ),
                    'redirect_url' => admin_url( 'admin.php?page=wcv-settings' ),
                )
            );

        } catch ( Exception $e ) {
            wp_send_json_error(
                array(
                    'message' => $e->getMessage(),
                )
            );
        }
    }

    /**
     * Get the URL for the next step's screen.
     *
     * @param string $step slug (default: current step).
     *
     * @return string       URL for next step if a next step exists.
     *                      Admin URL if it's the last step.
     *                      Empty string on failure.
     * @since 2.0.0
     */
    public function get_next_step_link( $step = '' ) {

        $next_step = '';

        if ( ! $step ) {
            $step = $this->step;
        }

        $keys = array_keys( $this->steps );
        if ( end( $keys ) === $step ) {
            $next_step = admin_url();
        }

        $step_index = array_search( $step, $keys, true );
        if ( false === $step_index ) {
            $next_step = '';
        }

        $next_step = add_query_arg( 'step', $keys[ $step_index + 1 ], remove_query_arg( 'activate_error' ) );
        return apply_filters( 'wcvendors_setup_wizard_get_next_step_link', $next_step, $step );
    }

    /**
     * Get the URL for the previous step's screen.
     *
     * @param string $step slug (default: current step).
     *
     * @return string       URL for previous step if a previous step exists.
     *                      Admin URL if it's the first step.
     *                      Empty string on failure.
     * @since 2.5.7
     */
    public function get_previous_step_link( $step = '' ) {
        $previous_step = '';

        if ( ! $step ) {
            $step = $this->step;
        }

        $keys = array_keys( $this->steps );

        $step_index = array_search( $step, $keys, true );

        if ( false === $step_index ) {
            $previous_step = '';
        }

        if ( 0 === $step_index ) {
            $previous_step = admin_url();
        }

        $previous_step = add_query_arg( 'step', $keys[ $step_index - 1 ], remove_query_arg( 'activate_error' ) );
        return apply_filters( 'wcvendors_setup_wizard_get_previous_step_link', $previous_step, $step );
    }

    /**
     * Setup Wizard Header.
     */
    public function setup_wizard_header() {
        do_action( 'wcvendors_setup_wizard_before_setup_wizard_header' );
        include WCV_ABSPATH_ADMIN . 'views/setup/header.php';
        do_action( 'wcvendors_setup_wizard_after_setup_wizard_header' );
    }

    /**
     * Setup Wizard Footer.
     */
    public function setup_wizard_footer() {
        do_action( 'wcvendors_setup_wizard_before_setup_wizard_footer' );
        include WCV_ABSPATH_ADMIN . 'views/setup/footer.php';
        do_action( 'wcvendors_setup_wizard_after_setup_wizard_footer' );
    }

    /**
     * Output the steps.
     */
    public function setup_wizard_steps() {
        do_action( 'wcvendors_setup_wizard_before_setup_wizard_steps' );
        $output_steps = $this->steps;
        include WCV_ABSPATH_ADMIN . 'views/setup/steps.php';
        do_action( 'wcvendors_setup_wizard_after_setup_wizard_steps' );
    }

    /**
     * Output the content for the current step.
     */
    public function setup_wizard_content() {
        do_action( 'wcvendors_setup_wizard_before_setup_wizard_content' );
        echo '<div class="wcv-setup-content">';
        if ( ! empty( $this->steps[ $this->step ]['view'] ) ) {
            call_user_func( $this->steps[ $this->step ]['view'], $this );
        }
        echo '</div>';
        do_action( 'wcvendors_setup_wizard_after_setup_wizard_content' );
    }

    /**
     * Helper method to retrieve the current user's email address.
     *
     * @return string Email address
     */
    protected function get_current_user_email() {

        $current_user = wp_get_current_user();
        $user_email   = $current_user->user_email;

        return $user_email;
    }

    /**
     * Helper method to retrieve the current user's firt name
     *
     * @return string Email address
     */
    protected function get_current_user_firstname() {

        $current_user = wp_get_current_user();
        $first_name   = $current_user->user_firstname;

        return $first_name;
    }

    /**
     * Initial "marketplace setup" step.
     * Vendor registration, taxes and shipping
     */
    public function basic_configuration() {
        do_action( 'wcvendors_setup_wizard_before_basic_configuration' );
        $commission_rate = get_option( 'wcvendors_vendor_commission_rate', 50 );
        $allow_tracking  = get_option( 'wcvendors_allow_tracking', 'yes' );

        include WCV_ABSPATH_ADMIN . 'views/setup/configuration.php';
        do_action( 'wcvendors_setup_wizard_after_basic_configuration' );
    }

    /**
     * Save initial marketplace settings.
     */
    public function basic_configuration_save() {

        check_admin_referer( 'wcv-setup', 'wcv-setup' );

        $commission_rate = isset( $_POST['wcv_vendor_commission_rate'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_vendor_commission_rate'] ) ) : '';
        $payout_currency = isset( $_POST['wcvendors_paypal_web_currency'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_paypal_web_currency'] ) ) : '';
        $allow_tracking  = isset( $_POST['wcvendors_allow_tracking'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_allow_tracking'] ) ) : '';

        update_option( 'wcvendors_vendor_commission_rate', $commission_rate );
        update_option( 'wcvendors_paypal_web_currency', $payout_currency );
        update_option( 'wcvendors_allow_tracking', $allow_tracking );

        WCVendors_Install::create_pages();
        wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
        exit;
    }

    /**
     * General setup
     * Vendor registration, taxes and shipping
     */
    public function common_configuration() {
        do_action( 'wcvendors_setup_wizard_before_common_configuration' );
        $products_enabled  = get_option( 'wcvendors_capability_products_enabled', 'yes' );
        $live_products     = get_option( 'wcvendors_capability_products_edit', 'yes' );
        $products_approval = get_option( 'wcvendors_capability_products_live', 'yes' );
        $export_orders     = get_option( 'wcvendors_capability_orders_export', 'yes' );
        $view_order_notes  = get_option( 'wcvendors_capability_order_read_notes', 'yes' );
        $add_order_notes   = get_option( 'wcvendors_capability_order_update_notes', 'yes' );

        include WCV_ABSPATH_ADMIN . 'views/setup/capabilities.php';
        do_action( 'wcvendors_setup_wizard_after_common_configuration' );
    }


    /**
     * Show the config page.
     */
    public function show_config_page() {
        check_admin_referer( 'wcv-setup', 'wcv-setup' );

        wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
        exit;
    }

    /**
     * Print a tooltip.
     *
     * @param string $message The message to display in the tooltip.
     */
    public static function print_tooltip( $message ) {
        do_action( 'wcvendors_setup_wizard_before_print_tooltip', $message );
        ?>
        <div class="tooltip">
            <div id="tooltip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.125em" height="1.125em" viewBox="0 0 24 24">
                    <g fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/>
                    </g>
                </svg>
            </div>
            <span class="tooltip-text">
                <?php echo wp_kses_post( $message ); ?>
            </span>
        </div>
        <?php
    }

    /**
     * Print a toggle switch input.
     *
     * @param string $name        The name attribute for the input.
     * @param string $id          The id attribute for the input.
     * @param string $value       The value when toggled on.
     * @param string $label       The label text for the toggle.
     * @param bool   $checked     Whether the toggle is checked.
     * @param string $tooltip Optional tooltip text.
     * @param string $label_position Optional label position.
     * @param string $description Optional description text.
     */
    public static function print_toggle_switch( $name, $id, $value = 'yes', $label = '', $checked = false, $tooltip = '', $label_position = 'right', $description = '' ) {
        do_action( 'wcvendors_setup_wizard_before_toggle_switch', $name, $id, $value, $label, $checked, $tooltip, $label_position, $description );
        $checked_attr = $checked ? 'checked' : '';
        ?>
        <div class="wcv-toggle-switch-container">
            <?php if ( ! empty( $label ) && 'left' === $label_position ) : ?>
                <label for="<?php echo esc_attr( $id ); ?>" class="toggle-switch-label">
                    <span class="label-text"><?php echo esc_html( $label ); ?></span>
                    <?php if ( ! empty( $tooltip ) ) : ?>
                        <?php self::print_tooltip( $tooltip ); ?>
                    <?php endif; ?>
                </label>
            <?php endif; ?>
            
            <label class="wcv-toggle-switch label-<?php echo esc_attr( $label_position ); ?>">
                <input type="checkbox" 
                        name="<?php echo esc_attr( $name ); ?>" 
                        id="<?php echo esc_attr( $id ); ?>" 
                        value="<?php echo esc_attr( $value ); ?>" 
                        <?php echo $checked_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
                <span class="wcv-toggle-slider"></span>
            </label>

            <?php if ( ! empty( $label ) && 'right' === $label_position ) : ?>
                <label for="<?php echo esc_attr( $id ); ?>" class="toggle-switch-label">
                    <span class="label-text"><?php echo esc_html( $label ); ?></span>
                    <?php if ( ! empty( $tooltip ) ) : ?>
                        <?php self::print_tooltip( $tooltip ); ?>
                    <?php endif; ?>
                </label>
            <?php endif; ?>
                
            <?php if ( ! empty( $description ) ) : ?>
                <p class="description"><?php echo esc_html( $description ); ?></p>
            <?php endif; ?>
        </div>
        <?php
        do_action( 'wcvendors_setup_wizard_after_toggle_switch', $name, $id, $value, $label, $checked, $tooltip, $label_position, $description );
    }

    /**
     * Save one-click setup.
     *
     * @return bool True if setup was successful, false otherwise.
     * @throws Exception If an error occurs during setup.
     */
    public function save_one_click_setup() {
        try {
            do_action( 'wcvendors_setup_wizard_before_save_one_click_setup' );
            $commission_rate = 50;
            $payout_currency = get_woocommerce_currency();
            $allow_tracking  = 'yes';

            update_option( 'wcvendors_vendor_commission_rate', $commission_rate );
            update_option( 'wcvendors_paypal_web_currency', $payout_currency );
            update_option( 'wcvendors_allow_tracking', $allow_tracking );

            $capabilities = array(
                'wcvendors_capability_products_enabled'   => 'yes',
                'wcvendors_capability_products_edit'      => 'yes',
                'wcvendors_capability_products_live'      => 'yes',
                'wcvendors_capability_orders_enabled'     => 'yes',
                'wcvendors_capability_orders_export'      => 'yes',
                'wcvendors_capability_order_read_notes'   => 'yes',
                'wcvendors_capability_order_update_notes' => 'yes',
                'wcvendors_capability_product_featured'   => 'yes',
                'wcvendors_vendor_allow_registration'     => 'yes',
            );

            foreach ( $capabilities as $option => $value ) {
                update_option( $option, $value );
            }

            $advanced_settings = array(
                'wcvendors_vendor_give_taxes'           => 'no',
                'wcvendors_vendor_give_shipping'        => 'no',
                'wcvendors_vendor_shop_permalink'       => 'vendors',
                'wcvendors_vendor_approve_registration' => 'no',
            );

            foreach ( $advanced_settings as $option => $value ) {
                update_option( $option, $value );
            }

            WCVendors_Install::create_pages();

            $args = array(
                'assign_product_terms'      => 'yes',
                'edit_products'             => true,
                'edit_product'              => true,
                'edit_published_products'   => true,
                'delete_published_products' => true,
                'delete_products'           => true,
                'manage_product'            => true,
                'publish_products'          => true,
                'delete_posts'              => true,
                'read'                      => true,
                'read_products'             => true,
                'upload_files'              => true,
                'import'                    => true,
                'view_woocommerce_reports'  => false,
            );

            remove_role( 'vendor' );
            add_role( 'vendor', sprintf( '%s', wcv_get_vendor_name() ), $args );

            remove_role( 'pending_vendor' );
            add_role(
                'pending_vendor',
                sprintf( 'Pending %s', wcv_get_vendor_name() ),
                array(
                    'read'         => true,
                    'edit_posts'   => false,
                    'delete_posts' => false,
                )
            );

            WCVendors_Install::update_db_version();
            update_option( 'wcvendors_wizard_complete', current_time( 'mysql' ) );
            delete_transient( 'wcvendors_activation_redirect' );

            WCVendors_Admin_Notices::remove_notice( 'install' );

            if ( is_wcv_pro_active() && class_exists( 'WCVendors_Pro_Admin_Notices' ) ) {
                WCVendors_Pro_Admin_Notices::remove_notice( 'install' );
            }

            do_action( 'wcvendors_setup_wizard_after_save_one_click_setup' );

            return true;

        } catch ( Exception $e ) {

            wp_send_json_error(
                array(
                    'message' => $e->getMessage(),
                )
            );

            return false;
        }
    }

    /**
     * Initial "marketplace setup" step.
     * Vendor registration, taxes and shipping
     */
    public function advanced_settings() {
        do_action( 'wcvendors_setup_wizard_before_advanced_settings' );
        $terms_page_id          = get_option( 'wcvendors_vendor_terms_page_id' );
        $shop_settings_page_id  = '';
        $product_orders_page_id = '';

        $allow_registration      = get_option( 'wcvendors_vendor_allow_registration', 'yes' );
        $vendor_taxes            = get_option( 'wcvendors_vendor_give_taxes', 'no' );
        $vendor_shipping         = get_option( 'wcvendors_vendor_give_shipping', 'no' );
        $vendors_store_url       = get_option( 'wcvendors_vendor_shop_permalink', 'vendors' );
        $manual_approval         = get_option( 'wcvendors_vendor_approve_registration', 'no' );
        $allow_featured_products = get_option( 'wcvendors_capability_product_featured', 'yes' );
        $allow_export_orders     = get_option( 'wcvendors_capability_orders_export', 'yes' );

        if ( ! maybe_load_new_dashboard() ) {
            $shop_settings_page_id  = get_option( 'wcvendors_shop_settings_page_id' );
            $product_orders_page_id = get_option( 'wcvendors_product_orders_page_id' );
        }

        include WCV_ABSPATH_ADMIN . 'views/setup/advanced.php';
        do_action( 'wcvendors_setup_wizard_after_advanced_settings' );
    }

    /**
     * Advanced settings.
     *
     * Vendor registration, taxes and shipping
     */
    public function advanced_settings_save() {
        do_action( 'wcvendors_setup_wizard_before_advanced_settings_save' );
        check_admin_referer( 'wcv-setup', 'wcv-setup' );

        $terms_page_id      = isset( $_POST['wcvendors_vendor_terms_page_id'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_vendor_terms_page_id'] ) ) : '';
        $allow_registration = isset( $_POST['wcvendors_vendor_allow_registration'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_vendor_allow_registration'] ) ) : 'yes';
        $vendor_taxes       = isset( $_POST['wcvendors_vendor_give_taxes'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_vendor_give_taxes'] ) ) : 'no';
        $vendor_shipping    = isset( $_POST['wcvendors_vendor_give_shipping'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_vendor_give_shipping'] ) ) : 'no';
        $featured_products  = isset( $_POST['wcvendors_capability_product_featured'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_capability_product_featured'] ) ) : 'yes';
        $export_orders      = isset( $_POST['wcvendors_capability_orders_export'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_capability_orders_export'] ) ) : 'no';
        $vendors_store_url  = isset( $_POST['wcvendors_vendor_shop_permalink'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_vendor_shop_permalink'] ) ) : 'vendors';
        $manual_approval    = isset( $_POST['wcvendors_vendor_approve_registration'] ) ? sanitize_text_field( wp_unslash( $_POST['wcvendors_vendor_approve_registration'] ) ) : 'no';

        update_option( 'wcvendors_vendor_terms_page_id', $terms_page_id );
        update_option( 'wcvendors_vendor_allow_registration', $allow_registration );
        update_option( 'wcvendors_vendor_give_taxes', $vendor_taxes );
        update_option( 'wcvendors_vendor_give_shipping', $vendor_shipping );
        update_option( 'wcvendors_capability_product_featured', $featured_products );
        update_option( 'wcvendors_capability_orders_export', $export_orders );
        update_option( 'wcvendors_vendor_shop_permalink', $vendors_store_url );
        update_option( 'wcvendors_vendor_approve_registration', $manual_approval );

        do_action( 'wcvendors_setup_wizard_after_advanced_settings_save' );

        wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
        exit;
    }

    /**
     * Initial "marketplace setup" step.
     */
    public function wcv_setup_install() {
        return '';
    }

    /**
     * Welcome screen
     */
    public function wcv_setup_welcome() {
        include WCV_ABSPATH_ADMIN . 'views/setup/welcome.php';
    }

    /**
     * Recommended plugins step.
     */
    public function recommended_plugins() {
        do_action( 'wcvendors_setup_wizard_before_recommended_plugins' );

        include WCV_ABSPATH_ADMIN . 'views/setup/recommended-plugins.php';
        do_action( 'wcvendors_setup_wizard_after_recommended_plugins' );
    }

    /**
     * Save recommended plugins step.
     */
    public function recommended_plugins_save() {
        do_action( 'wcvendors_setup_wizard_before_recommended_plugins_save' );
        check_admin_referer( 'wcv-setup', 'wcv-setup' );
        wp_safe_redirect( esc_url_raw( $this->get_next_step_link() ) );
        exit;
    }

    /**
     * Final step.
     */
    public function wcv_setup_ready() {
        do_action( 'wcvendors_setup_wizard_before_ready' );
        WCVendors_Admin_Notices::remove_notice( 'install' );
        WCVendors_Install::update_db_version();
        flush_rewrite_rules();

        update_option( 'wcvendors_wizard_complete', current_time( 'mysql' ) );

        delete_transient( 'wcvendors_activation_redirect' );

        if ( is_wcv_pro_active() && class_exists( 'WCVendors_Pro_Admin_Notices' ) ) {
            WCVendors_Pro_Admin_Notices::remove_notice( 'install' );
        }

        $user_email       = $this->get_current_user_email();
        $first_name       = $this->get_current_user_firstname();
        $docs_url         = 'https://www.wcvendors.com/article-categories/getting-started/?utm_source=setup_wizard&utm_medium=plugin&utm_campaign=setup_complete';
        $image_assets_url = WCV_ASSETS_URL . 'images/';

        include WCV_ABSPATH_ADMIN . 'views/setup/ready.php';
        do_action( 'wcvendors_setup_wizard_after_ready' );
    }
}

new WCVendors_Admin_Setup_Wizard();
