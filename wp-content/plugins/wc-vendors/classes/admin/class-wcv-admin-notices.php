<?php
/**
 * Display notices in admin
 *
 * @author      Jamie Madden, WC Vendors
 * @category    Admin
 * @package     WCVendors/Admin
 * @version     2.4.7
 * @since       2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * WC_Admin_Notices Class.
 */
class WCVendors_Admin_Notices {

    /**
     * Stores notices.
     *
     * @var array
     */
    private static $notices = array();

    /**
     * Array of notices - name => callback.
     *
     * @var array
     */
    private static $core_notices
        = array(
            'install'        => 'install_notice',
            'update'         => 'update_notice',
            'template_files' => 'template_file_check_notice',
            'theme_support'  => 'theme_check_notice',
            'review_request' => 'review_request_notice',
            'usage_tracking' => 'usage_tracking_notice',
        );

    /**
     * Constructor.
     *
     * @since 2.4.7 - Added review request notice.
     */
    public static function init() {

        $notices       = (array) get_option( 'wcvendors_admin_notices', array() );
        self::$notices = array_filter( $notices );
        add_action( 'switch_theme', array( __CLASS__, 'reset_admin_notices' ) );
        add_action( 'wcvendors_installed', array( __CLASS__, 'reset_admin_notices' ) );
        add_action( 'wp_loaded', array( __CLASS__, 'hide_notices' ) );
        add_action( 'shutdown', array( __CLASS__, 'store_notices' ) );

        if ( current_user_can( 'manage_woocommerce' ) ) {
            add_action( 'admin_print_styles', array( __CLASS__, 'add_notices' ) );
        }

        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin_notice_script' ) );
        add_action( 'wp_ajax_wcvendors_dismiss_notice', array( __CLASS__, 'ajax_process_dismiss_notice' ) );
        add_action( 'wcvendors_notice_scheduled_action', array( __CLASS__, 'trigger_notice' ), 10, 1 );
    }

    /**
     * Schedule notice cron
     *
     * @param string $notice_key The notice key to schedule.
     * @param int    $time       The time to schedule the notice.
     *
     * @since 2.4.7
     */
    public static function schedule_notice_cron( $notice_key, $time ) {
        $notices = self::get_notices();
        $notice  = isset( $notices[ $notice_key ] ) ? $notices[ $notice_key ] : false;

        if ( ! $notice ) {
            return;
        }

        wcvendors_schedule_display_notice( $notice_key, $time );
    }

    /**
     * Trigger notice
     *
     * @param string $notice_key The notice key to schedule.
     *
     * @since 2.4.7
     */
    public static function trigger_notice( $notice_key ) {
        wcv_trigger_admin_notice( $notice_key );
    }

    /**
     * Store notices to DB
     *
     * @since 2.0.0
     * @return void
     */
    public static function store_notices() {

        update_option( 'wcvendors_admin_notices', self::get_notices() );
    }

    /**
     * Get notices
     *
     * @return array
     * @since 2.0.0
     */
    public static function get_notices() {

        return self::$notices;
    }

    /**
     * Remove all notices.
     *
     * @since 2.0.0
     * @return void
     */
    public static function remove_all_notices() {

        self::$notices = array();
    }

    /**
     * Reset notices for themes when switched or a new version of WC is installed.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public static function reset_admin_notices() {

        self::add_notice( 'template_files' );
    }

    /**
     * Show a notice.
     *
     * @param string $name The name of the notice.
     *
     * @version 2.4.7
     * @since   2.0.0
     */
    public static function add_notice( $name ) {

        self::$notices = array_unique( array_merge( self::get_notices(), array( $name ) ) );
    }

    /**
     * Remove a notice from being displayed.
     *
     * @param  string $name The name of the notice.
     *
     * @since 2.0.0
     * @return void
     */
    public static function remove_notice( $name ) {
        self::$notices = array_diff( self::get_notices(), array( $name ) );
        delete_option( 'wcvendors_admin_notice_' . $name );
    }

    /**
     * See if a notice is being shown.
     *
     * @param  string $name The name of the notice.
     *
     * @since 2.0.0
     *
     * @return boolean
     */
    public static function has_notice( $name ) {

        return in_array( $name, self::get_notices(), true );
    }

    /**
     * Hide a notice if the GET variable is set.
     *
     * @since 2.0.0
     * @return void
     */
    public static function hide_notices() {

        if ( isset( $_GET['wcv-hide-notice'] ) && isset( $_GET['_wcv_notice_nonce'] ) ) {
            if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wcv_notice_nonce'] ) ), 'wcvendors_hide_notices_nonce' ) ) {
                wp_die( esc_attr( __( 'Action failed. Please refresh the page and retry.', 'wc-vendors' ) ) );
            }

            if ( ! current_user_can( 'manage_woocommerce' ) ) {
                wp_die( esc_attr( __( 'Cheatin&#8217; huh?', 'wc-vendors' ) ) );
            }

            $hide_notice = sanitize_text_field( wp_unslash( $_GET['wcv-hide-notice'] ) );
            self::remove_notice( $hide_notice );
            do_action( 'wcvendors_hide_' . $hide_notice . '_notice' );
        }
    }

    /**
     * Add notices + styles if needed.
     *
     * @since 2.0.0
     * @return void
     */
    public static function add_notices() {

        $notices = self::get_notices();

        if ( ! empty( $notices ) ) {
            $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
            wp_enqueue_style( 'wcv-setup', WCV_ASSETS_URL . 'css/wcv-activation' . $suffix . '.css', array(), WCV_VERSION );
            foreach ( $notices as $notice ) {
                if ( ! empty( self::$core_notices[ $notice ] ) && apply_filters( 'wcvendors_show_admin_notice', true, $notice ) ) {
                    add_action( 'admin_notices', array( __CLASS__, self::$core_notices[ $notice ] ) );
                } else {
                    add_action( 'admin_notices', array( __CLASS__, 'output_custom_notices' ) );
                }
            }
        }
    }

    /**
     * Add a custom notice.
     *
     * @param string $name The name of the notice.
     * @param string $notice_html The html notice.
     *
     * @version 2.4.7
     * @since   2.0.0
     */
    public static function add_custom_notice( $name, $notice_html ) {

        self::add_notice( $name );
        update_option( 'wcvendors_admin_notice_' . $name, wp_kses_post( $notice_html ) );
    }

    /**
     * Output any stored custom notices.
     *
     * @since 2.0.0
     * @return void
     */
    public static function output_custom_notices() {

        $notices = self::get_notices();

        if ( ! empty( $notices ) ) {
            foreach ( $notices as $notice ) {
                if ( empty( self::$core_notices[ $notice ] ) ) {
                    $notice_html = get_option( 'wcvendors_admin_notice_' . $notice );

                    if ( $notice_html ) {
                        include 'views/notices/html-notice-custom.php';
                    }
                }
            }
        }
    }

    /**
     * If we need to update, include a message with the update button.
     *
     * @since 2.0.0
     * @return void
     */
    public static function update_notice() {

        if ( version_compare( get_option( 'wcvendors_db_version' ), WCV_VERSION, '<' ) ) {
            $updater = new WCVendors_Background_Updater();
            if ( $updater->is_updating() || ! empty( $_GET['do_update_wcvendors'] ) ) { // phpcs:ignore
                include 'views/notices/html-notice-updating.php';
            } else {
                include 'views/notices/html-notice-update.php';
            }
        } else {
            include 'views/notices/html-notice-updated.php';
        }
    }

    /**
     * If we have just installed, show a message with the install pages button.
     *
     * @since 2.0.0
     * @return void
     */
    public static function install_notice() {

        include 'views/notices/html-notice-install.php';
    }

    /**
     * Show the Theme Check notice.
     *
     * @since 2.0.0
     * @return void
     */
    public static function theme_check_notice() {

        if ( ! current_theme_supports( 'wcvendors' ) && ! in_array( get_option( 'template' ), wc_get_core_supported_themes(), true ) ) {
            include 'views/notices/html-notice-theme-support.php';
        } else {
            self::remove_notice( 'theme_support' );
        }
    }

    /**
     * Show a notice highlighting bad template files.
     *
     * @since 2.0.0
     * @return void
     */
    public static function template_file_check_notice() {

        $core_templates = WC_Admin_Status::scan_template_files( WCV_PLUGIN_DIR_PATH . '/templates' );
        $outdated       = false;

        foreach ( $core_templates as $file ) {

            $theme_file = false;
            if ( file_exists( get_stylesheet_directory() . '/' . $file ) ) {
                $theme_file = get_stylesheet_directory() . '/' . $file;
            } elseif ( file_exists( get_stylesheet_directory() . '/wc-vendors/' . $file ) ) {
                $theme_file = get_stylesheet_directory() . '/wc-vendors/' . $file;
            } elseif ( file_exists( get_template_directory() . '/' . $file ) ) {
                $theme_file = get_template_directory() . '/' . $file;
            } elseif ( file_exists( get_template_directory() . '/wc-vendors/' . $file ) ) {
                $theme_file = get_template_directory() . '/wc-vendors/' . $file;
            }

            if ( false !== $theme_file ) {
                $core_version  = WC_Admin_Status::get_file_version( WCV_PLUGIN_DIR_PATH . '/templates/' . $file );
                $theme_version = WC_Admin_Status::get_file_version( $theme_file );

                if ( $core_version && $theme_version && version_compare( $theme_version, $core_version, '<' ) ) {
                    $outdated = true;
                    break;
                }
            }
        }

        if ( $outdated ) {
            include 'views/notices/html-notice-template-check.php';
        } else {
            self::remove_notice( 'template_files' );
        }
    }

    /**
     *  Request review notice
     *
     * @since 2.4.7 - Added
     * @return void
     */
    public static function review_request_notice() {
        $has_notice = self::has_notice( 'review_request' );
        $is_display = wc_string_to_bool( get_option( 'wcvendors_display_notice_review_request', 'no' ) ) && $has_notice;

        if ( ! $is_display ) {
            return;
        }

        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        if ( wcv_check_allow_screen() ) {
            include 'views/notices/html-notice-review-request.php';
        }
    }

    /**
     * Enqueue admin notice script
     *
     * @since 2.4.7 - Added
     * @return void
     */
    public static function enqueue_admin_notice_script() {
        wp_register_script(
            'wcv-admin-notice',
            WCV_ASSETS_URL . 'js/admin/admin-notices.js',
            array( 'jquery' ),
            WCV_VERSION,
            true
        );
        wp_localize_script(
            'wcv-admin-notice',
            'wcv_admin_notice',
            array(
                'ajax_url' => admin_url( 'admin-ajax.php' ),
                'nonce'    => wp_create_nonce( 'wcv_dismiss_notice' ),
            )
        );
        wp_enqueue_script( 'wcv-admin-notice' );
    }

    /**
     * Ajax process request review.
     *
     * @since 2.4.7
     * @return void
     */
    public static function ajax_process_dismiss_notice() {
        $nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
        if ( ! wp_verify_nonce( $nonce, 'wcv_dismiss_notice' ) || ( defined( 'DOING_AJAX' ) && ! DOING_AJAX ) ) {
            return;
        }

        $action_key   = 'wcvendors_notice_scheduled_action';
        $is_delay     = isset( $_POST['is_delay'] ) ? wc_string_to_bool( sanitize_text_field( wp_unslash( $_POST['is_delay'] ) ) ) : false;
        $notice_key   = isset( $_POST['notice_key'] ) ? sanitize_text_field( wp_unslash( $_POST['notice_key'] ) ) : '';
        $data_dismiss = isset( $_POST['data_dismiss'] ) ? sanitize_text_field( wp_unslash( $_POST['data_dismiss'] ) ) : '';

        if ( empty( $notice_key ) || ! self::has_notice( $notice_key ) ) {
            return;
        }

        if ( $is_delay ) {
            $delay = 7 * DAY_IN_SECONDS;

            if ( ! as_next_scheduled_action( $action_key, array( $notice_key ), 'wcvendors' ) ) {
                as_schedule_single_action( time() + $delay, $action_key, array( $notice_key ), 'wcvendors' );
            }
            update_option( 'wcvendors_display_notice_' . $notice_key, 'no' );
        } else { //phpcs:ignore
            if ( as_next_scheduled_action( $action_key, array( $notice_key ), 'wcvendors' ) ) {
                as_unschedule_action( $action_key, array( $notice_key ), 'wcvendors' );
            }
            delete_option( 'wcvendors_display_notice_' . $notice_key );
            update_option( 'wcvendors_dismissed_notice_' . $notice_key, 'yes' );
        }
        do_action( 'wcvendors_after_notice_dismissed', $notice_key, $data_dismiss, $is_delay );
        wp_send_json_success();
        wp_die();
    }


    /**
     * Usage tracking notice
     *
     * @since 2.5.0
     *
     * @return void
     */
    public static function usage_tracking_notice() {

        $is_dimissed   = wc_string_to_bool( get_option( 'wcvendors_dismissed_notice_usage_tracking', 'no' ) );
        $is_allowed    = get_option( 'wcvendors_allow_tracking', 'no' );
        $is_pro_active = is_wcv_pro_active();

        if ( $is_pro_active || 'yes' === $is_allowed || $is_dimissed || ! current_user_can( 'manage_options' ) ) {
            return;
        }

        include 'views/notices/html-notice-usage-tracking.php';
    }
}

WCVendors_Admin_Notices::init();
