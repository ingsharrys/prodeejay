<?php
/**
 * Divi Theme Support Class.
 *
 * @since 2.5.2
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 */

namespace WC_Vendors\Classes\Font\Theme_Support;

use function WC_Vendors\Classes\Includes\wcv_is_dashboard_page;
/**
 * Add support for the Divi Theme.
 *
 * @see https://www.elegantthemes.com/gallery/divi/
 */
class WCVendors_Theme_Support_Divi {


    /**
     * Constructor
     */
    public function __construct() {
        add_filter( 'wcv_dashboard_wrapper_class', array( $this, 'disable_smooth_scroll' ) );
        add_action( 'template_redirect', array( $this, 'remove_sidebar' ) );
        add_filter( 'body_class', array( $this, 'set_full_width' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'style_updates' ) );
    }

    /**
     * Need to add a style to the dashboard wrapper to disable divi's smooth scroll.
     *
     * @param string $styles The current styles.
     */
    public function disable_smooth_scroll( $styles ) {
        $styles = 'et_smooth_scroll_disabled';
        return $styles;
    }

    /**
     * Remove sidebar from store and dashboard page
     *
     * @return void
     */
    public function remove_sidebar() {
        if ( wcv_is_dashboard_page( get_the_ID() ) ) {
            unregister_sidebar( 'sidebar-1' );
        }
    }

    /**
     * Make the dashboard full width
     *
     * @param array $classes The current classes.
     */
    public function set_full_width( $classes ) {

        if ( wcv_is_dashboard_page( get_the_ID() ) ) {

            if ( ! in_array( 'et_full_width_page', $classes, true ) ) {
                $classes[] = 'et_full_width_page';
                $classes[] = 'et_no_sidebar';
            }
        }

        return $classes;
    }


    /**
     * Add style updates to ensure theme works correctly.
     */
    public function style_updates() {

        $style  = '#left-area ul { padding: 0 !important;}';
        $style .= '.media-button-select { font-size: 15px !important; padding-top: 0 !important}';

        wp_add_inline_style( 'woocommerce-layout', $style );
    }
}
return new WCVendors_Theme_Support_Divi();
