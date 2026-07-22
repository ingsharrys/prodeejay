<?php
/**
 * WCV Seo Compatibility
 *
 * @since 2.5.0
 *
 * @package WCVendors
 */
class WCVF_YOAST_SEO_Compatibility {
    /**
     * Constructor method.
     * Adds filters to override Yoast SEO with shop name and URL.
     */
    public function __construct() {
        if ( ! is_wcv_pro_active() && $this->is_yoast_seo_active() ) {
            /**
             * Only override Yoast SEO if WCV Pro is not active. Because we have SEO settings in WCV Pro.
             */
            $this->yoast_seo_override();
        }
    }

    /**
     * Check if Yoast SEO is active
     *
     * @since 2.5.0.1
     */
    public function is_yoast_seo_active() {
        return class_exists( 'WPSEO_Options' );
    }

    /**
     * Yoast SEO hooks
     *
     * @since 2.5.0
     */
    public function yoast_seo_override() {
        add_filter( 'wpseo_title', array( $this, 'override_yoast_seo_with_shop_name' ), 15, 1 );
        add_filter( 'wpseo_opengraph_title', array( $this, 'override_yoast_seo_with_shop_name' ), 15, 1 );
        add_filter( 'wp_title', array( $this, 'override_yoast_seo_with_shop_name' ), 15, 1 );

        add_filter( 'wpseo_canonical', array( $this, 'override_yoast_seo_with_shop_url' ), 15, 1 );
        add_filter( 'wpseo_opengraph_url', array( $this, 'override_yoast_seo_with_shop_url' ), 15, 1 );
    }

    /**
     * Override Yoast SEO with shop name
     *
     * @since 2.5.0
     *
     * @param  string $title the title.
     * @return string
     */
    public function override_yoast_seo_with_shop_name( $title ) {
        if ( WCV_Vendors::is_vendor_page() && ! is_single() ) {
            $vendor_shop = urldecode( get_query_var( 'vendor_shop' ) );
            if ( $vendor_shop ) {
                $vendor_id = WCV_Vendors::get_vendor_id( $vendor_shop );
                $shop_name = WCV_Vendors::get_vendor_shop_name( $vendor_id );
                if ( $shop_name ) {
                    $title = $shop_name;
                }
            }
        }
        return $title;
    }

    /**
     * Override Yoast SEO with shop url
     *
     * @since 2.5.0
     *
     * @param  string $url the url.
     * @return string
     */
    public function override_yoast_seo_with_shop_url( $url ) {
        if ( WCV_Vendors::is_vendor_page() && ! is_single() ) {
            $vendor_shop = urldecode( get_query_var( 'vendor_shop' ) );
            if ( $vendor_shop ) {
                $vendor_id = WCV_Vendors::get_vendor_id( $vendor_shop );
                $shop_url  = WCV_Vendors::get_vendor_shop_page( $vendor_id );
                if ( $shop_url ) {
                    $url = $shop_url;
                }
            }
        }
        return $url;
    }
}

new WCVF_YOAST_SEO_Compatibility();
