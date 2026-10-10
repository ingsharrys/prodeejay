<?php
/**
 * Vendor Shop Template
 *
 * Renders the vendor store archive page with a two-column layout: product
 * grid on the left, vendor shop widget area on the right.
 *
 * THIS FILE LOADS ON VENDOR STORE URLs (e.g. yourdomain.com/vendors/bobs-store/)
 *
 * This template can be overridden by copying it to:
 *   yourtheme/wc-vendors/front/vendor-shop.php
 *
 * @package WCVendors/Templates/Front
 * @since   2.6.9
 * @version 2.6.9
 */

defined( 'ABSPATH' ) || exit;

$layout_classes  = apply_filters( 'wcvendors_vendor_shop_layout_classes', array( 'wcv-vendor-shop-layout' ) );
$sidebar_classes = apply_filters( 'wcvendors_vendor_shop_sidebar_classes', array( 'wcv-vendor-shop-sidebar', 'widget-area' ) );
$header_name     = apply_filters( 'wcvendors_vendor_shop_header', 'shop' );
$footer_name     = apply_filters( 'wcvendors_vendor_shop_footer', 'shop' );

get_header( $header_name );
?>

<?php do_action( 'wcvendors_before_vendor_shop' ); ?>

<div class="<?php echo esc_attr( implode( ' ', $layout_classes ) ); ?>">

    <?php
    /**
     * Hook: woocommerce_before_main_content.
     *
     * Fires the theme/WooCommerce content wrapper and breadcrumbs.
     * The theme wrapper becomes a flex sibling of our sidebar.
     * We intentionally skip woocommerce_sidebar so our sidebar renders here.
     */
    do_action( 'woocommerce_before_main_content' );

    /**
     * Hook: woocommerce_shop_loop_header.
     *
     * @hooked woocommerce_product_taxonomy_archive_header - 10
     */
    do_action( 'woocommerce_shop_loop_header' );

    if ( woocommerce_product_loop() ) {

        /**
         * Hook: woocommerce_before_shop_loop.
         *
         * @hooked woocommerce_output_all_notices - 10
         * @hooked woocommerce_result_count - 20
         * @hooked woocommerce_catalog_ordering - 30
         */
        do_action( 'woocommerce_before_shop_loop' );

        woocommerce_product_loop_start();

        if ( wc_get_loop_prop( 'total' ) ) {
            while ( have_posts() ) {
                the_post();
                do_action( 'woocommerce_shop_loop' );
                wc_get_template_part( 'content', 'product' );
            }
        }

        woocommerce_product_loop_end();

        /**
         * Hook: woocommerce_after_shop_loop.
         *
         * @hooked woocommerce_pagination - 10
         */
        do_action( 'woocommerce_after_shop_loop' );

    } else {

        /**
         * Hook: woocommerce_no_products_found.
         *
         * @hooked wc_no_products_found - 10
         */
        do_action( 'woocommerce_no_products_found' );
    }

    /**
     * Hook: woocommerce_after_main_content.
     *
     * Closes the theme/WooCommerce content wrapper.
     * woocommerce_sidebar is deliberately not called — sidebar is below.
     */
    do_action( 'woocommerce_after_main_content' );
    ?>

    <?php if ( is_active_sidebar( 'wcv-vendor-shop-sidebar' ) || has_action( 'wcvendors_vendor_shop_sidebar' ) ) : ?>
    <aside class="<?php echo esc_attr( implode( ' ', $sidebar_classes ) ); ?>" role="complementary">
        <?php
        do_action( 'wcvendors_vendor_shop_sidebar' );
        dynamic_sidebar( 'wcv-vendor-shop-sidebar' );
        ?>
    </aside>
    <?php endif; ?>

</div>

<?php
do_action( 'wcvendors_after_vendor_shop' );

get_footer( $footer_name );
