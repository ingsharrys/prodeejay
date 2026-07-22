<?php
/**
 * Vite App Loader
 *
 * This class handles loading Vue/Vite applications in WordPress.
 * It provides support for both development (HMR) and production environments.
 *
 * @package WC_Vendors
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * WCV_Vite_Loader Class
 */
class WCV_Vite_Loader {

    /**
     * Is HMR enabled.
     *
     * @var bool $is_hmr_enabled Is HMR enabled.
     */
    public $is_hmr_enabled = false;

    /**
     * Environment variables.
     *
     * @var array $env Environment variables.
     */
    protected $env = array();

    /**
     * HMR Host.
     *
     * @var string $host Host.
     */
    protected $host = '';

    /**
     * HMR Port.
     *
     * @var string $port Port.
     */
    protected $port = '';

    /**
     * Development base URL.
     *
     * @var string $dev_base_url Development base URL.
     */
    protected $dev_base_url = '';

    /**
     * App name.
     *
     * @var string $app_name Name of the application (used for script handles).
     */
    protected $app_name = '';

    /**
     * App directory.
     *
     * @var string $app_dir Directory of the application relative to plugin root.
     */
    protected $app_dir = '';

    /**
     * Plugin directory URL.
     *
     * @var string $plugin_dir_url Plugin directory URL.
     */
    protected $plugin_dir_url = '';

    /**
     * Plugin directory path.
     *
     * @var string $plugin_dir_path Plugin directory path.
     */
    protected $plugin_dir_path = '';

    /**
     * Constructor
     *
     * @param string $app_name      Name of the application.
     * @param string $app_dir       Directory of the application relative to plugin root.
     * @param string $plugin_dir    Plugin directory path.
     * @param string $plugin_url    Plugin directory URL.
     * @param bool   $hmr_constant  Name of constant to check for HMR mode.
     */
    public function __construct( $app_name, $app_dir, $plugin_dir, $plugin_url, $hmr_constant = 'HMR_DEV' ) {
        $this->app_name        = $app_name;
        $this->app_dir         = $app_dir;
        $this->plugin_dir_path = $plugin_dir;
        $this->plugin_dir_url  = $plugin_url;

        // Check if HMR is enabled.
        if ( defined( $hmr_constant ) && constant( $hmr_constant ) ) {
            $this->is_hmr_enabled = true;
            $this->parse_env();
            $this->host         = isset( $this->env['VITE_DEV_SERVER_HOST'] ) ? $this->env['VITE_DEV_SERVER_HOST'] : 'localhost';
            $this->port         = isset( $this->env['VITE_DEV_SERVER_PORT'] ) ? $this->env['VITE_DEV_SERVER_PORT'] : '3000';
            $this->dev_base_url = 'http://' . $this->host . ':' . $this->port;
        }
    }

    /**
     * Read env file.
     *
     * @return void
     */
    protected function parse_env() {
        $env_file_path = $this->plugin_dir_path . '/.env';
        if ( ! file_exists( $env_file_path ) ) {
            return;
        }

        $env_file = file_get_contents( $env_file_path ); // phpcs:ignore
        $env_file = explode( "\n", $env_file );
        foreach ( $env_file as $env ) {
            $env = explode( '=', $env );
            if ( isset( $env[0] ) && isset( $env[1] ) ) {
                $key               = trim( $env[0] );
                $val               = trim( $env[1] );
                $this->env[ $key ] = $val;
            }
        }
    }

    /**
     * Add module to scripts tag
     *
     * @param string $tag    The script tag.
     * @param string $handle The script handle.
     *
     * @return string
     */
    public function add_module_to_scripts_tag( $tag, $handle ) {
        if ( str_contains( $handle, $this->app_name ) ) {
            $tag = str_replace( ' src', ' type="module" src', $tag ); // phpcs:ignore
        }
        return $tag;
    }

    /**
     * Load assets for the Vite application
     *
     * @param array $dependencies JavaScript dependencies.
     * @param array $js_data      Data to localize to the script.
     * @param array $extra_assets Additional assets to load.
     *
     * @return void
     */
    public function load_assets( $dependencies = array(), $js_data = array(), $extra_assets = array() ) {
        $script_handle = $this->app_name;

        // Add filter for script tag to add module type.
        add_filter( 'script_loader_tag', array( $this, 'add_module_to_scripts_tag' ), 10, 2 );

        if ( $this->is_hmr_enabled ) {

            // Development mode - load from Vite dev server.
            wp_enqueue_script( $script_handle, "{$this->dev_base_url}/@vite/client", array(), time(), true );
            wp_enqueue_script( "{$script_handle}-main", "{$this->dev_base_url}/src/main.ts", $dependencies, time(), true );
        } else {
            // Production mode - load from built assets.
            $manifest_json = $this->get_manifest_json();
            foreach ( $manifest_json as $entry => $info ) {
                $file_ext = $this->get_file_extension( $info['file'] );
                $file_url = $this->plugin_dir_url . '/' . $this->app_dir . '/dist/' . $info['file'];

                if ( 'js' === $file_ext ) {
                    wp_enqueue_script( $script_handle, esc_url( $file_url ), $dependencies, WCV_VERSION, true );
                } elseif ( 'css' === $file_ext ) {
                    $file_name = $this->get_entry_file_name( $entry );
                    wp_enqueue_style( "{$script_handle}-{$file_name}", esc_url( $file_url ), array(), WCV_VERSION );
                }
            }
        }

        // Load additional assets if provided.
        if ( ! empty( $extra_assets ) ) {
            foreach ( $extra_assets as $asset ) {
                if ( isset( $asset['type'] ) && isset( $asset['handle'] ) && isset( $asset['src'] ) ) {
                    if ( 'script' === $asset['type'] ) {
                        $deps      = isset( $asset['deps'] ) ? $asset['deps'] : array();
                        $ver       = isset( $asset['ver'] ) ? $asset['ver'] : null;
                        $in_footer = isset( $asset['in_footer'] ) ? $asset['in_footer'] : true;
                        wp_enqueue_script( $asset['handle'], $asset['src'], $deps, $ver, $in_footer );
                    } elseif ( 'style' === $asset['type'] ) {
                        $deps  = isset( $asset['deps'] ) ? $asset['deps'] : array();
                        $ver   = isset( $asset['ver'] ) ? $asset['ver'] : null;
                        $media = isset( $asset['media'] ) ? $asset['media'] : 'all';
                        wp_enqueue_style( $asset['handle'], $asset['src'], $deps, $ver, $media );
                    }
                }
            }
        }

        // Localize script if data is provided.
        if ( ! empty( $js_data ) ) {
            $js_data['pluginDirUrl'] = trailingslashit( $this->plugin_dir_url . '/' . $this->app_dir );
            wp_localize_script( $script_handle, $this->app_name . '_data', $js_data );
        }
    }

    /**
     * Get Manifest.json file content.
     *
     * @return array
     */
    public function get_manifest_json() {

        $manifest_json_path = apply_filters(
            "wcv_{$this->app_name}_manifest_json_path",
            $this->plugin_dir_path . $this->app_dir . '/dist/manifest.json'
        );

        if ( ! file_exists( $manifest_json_path ) ) {

            return array();
        }

        $response = file_get_contents( $manifest_json_path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

        return json_decode( $response, true );
    }

    /**
     * Get file extension.
     *
     * @param string $file File path.
     *
     * @return string
     */
    public function get_file_extension( $file ) {
        $file_info      = explode( '.', $file );
        $file_extension = end( $file_info );
        return $file_extension;
    }

    /**
     * Get entry file name.
     *
     * @param string $entry Entry.
     *
     * @return string
     */
    public function get_entry_file_name( $entry ) {
        $file_info           = explode( '/', $entry );
        $file_with_extension = end( $file_info );
        $file_info           = explode( '.', $file_with_extension );
        return $file_info[0];
    }
}
