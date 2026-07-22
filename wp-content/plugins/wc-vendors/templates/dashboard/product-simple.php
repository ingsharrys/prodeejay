<?php
/**
 * The template for displaying the Simple Product Edit form
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @package    WC_Vendors
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
use WC_Vendors\Classes\Front\Forms\WCV_Product_Form;
use WC_Vendors\Classes\Front\WCV_Form_Helper;
/**
 *   DO NOT EDIT ANY OF THE LINES BELOW UNLESS YOU KNOW WHAT YOU'RE DOING
 */

$title      = ( is_numeric( $object_id ) ) ? __( 'Save Changes', 'wc-vendors' ) : __( 'Add Product', 'wc-vendors' ); // phpcs:ignore
$page_title = ( is_numeric( $object_id ) ) ? __( 'Edit Product', 'wc-vendors' ) : __( 'Add Product', 'wc-vendors' ); // phpcs:ignore
$product    = ( is_numeric( $object_id ) ) ? wc_get_product( $object_id ) : null;
$post       = ( is_numeric( $object_id ) ) ? get_post( $object_id ) : null; // phpcs:ignore

// Get basic information for the product.
$product_title             = ( isset( $product ) && null !== $product ) ? $product->get_title() : '';
$product_description       = ( isset( $product ) && null !== $product ) ? $post->post_content : '';
$product_short_description = ( isset( $product ) && null !== $product ) ? $post->post_excerpt : '';
$post_status               = ( isset( $product ) && null !== $product ) ? $post->post_status : '';

/**
 *  Ok, You can edit the template below but be careful!
 */
?>

<h2><?php echo esc_html( $page_title ); ?></h2>

<?php do_action( 'wcvendors_before_product_form' ); ?>

<!-- Product Edit Form -->
<form method="post" action="" id="wcv-product-edit" class="wcv-form">

    <div class="all-100">
        <?php do_action( 'wcv_before_product_media', $object_id ); ?>
        <!-- Media uploader -->
        <div class="wcv-product-media wcv-gap-bottom">
            <div class="wcv-flex wcv-product-media-wrapper" style="gap: 24px;">
                <?php WCV_Form_Helper::product_media_uploader( $object_id ); ?>
            </div>
        </div>
        <?php do_action( 'wcv_after_product_media', $object_id ); ?>
    </div>

    <!-- Basic Product Details -->
    <div class="wcv-product-basic wcv-product">
        <?php do_action( 'wcv_before_product_details', $object_id ); ?>
        <!-- Product Title -->
        <?php WCV_Product_Form::title( $object_id, $product_title ); ?>
        <!-- Product Description -->
        <?php WCV_Product_Form::description( $object_id, $product_description ); ?>
        <!-- Product Categories -->
        <?php WCV_Product_Form::categories( $object_id ); ?>
        <?php do_action( 'wcv_after_product_details', $object_id ); ?>
    </div>
    <hr/>

    <?php do_action( 'wcv_after_product_simple_before', $object_id ); ?>

    <!-- Product Type  -->
    <?php WCV_Product_Form::product_type_hidden( $object_id, 'simple' ); ?>

    <div class="show_if_simple show_if_external">
        <!-- Price and Sale Price -->
        <?php WCV_Product_Form::prices( $object_id ); ?>
        <?php do_action( 'wcv_after_product_prices', $object_id ); ?>
    </div>

    <?php WCV_Product_Form::tax( $object_id ); ?>

    
    <!-- SKU  -->
    <?php WCV_Product_Form::sku( $object_id ); ?>

    <?php WCV_Product_Form::manage_stock( $object_id ); ?>

    <?php do_action( 'wcv_product_options_stock', $object_id ); ?>

    <div class="stock_fields show_if_simple show_if_variable">
        <?php WCV_Product_Form::stock_qty( $object_id ); ?>
        <?php WCV_Product_Form::backorders( $object_id ); ?>
        <?php WCV_Product_Form::low_stock_threshold( $object_id ); ?>
    </div>

    <?php WCV_Product_Form::stock_status( $object_id ); ?>
    <div class="options_group show_if_simple show_if_variable">
        <?php WCV_Product_Form::sold_individually( $object_id ); ?>
    </div>

    <?php do_action( 'wcv_product_options_sold_individually', $object_id ); ?>

    <?php do_action( 'wcv_product_options_inventory_product_data', $object_id ); ?>
    <div class="wcv-gap-top wcv-gap-top-small wcv-gap-bottom wcv-gap-bottom-small">
        <!-- Private listing  -->
        <?php WCV_Product_Form::private_listing( $object_id ); ?>
    </div>
    <?php do_action( 'wcv_after_product_simple_after', $object_id ); ?>

        <!-- Upsells and grouping -->
    <?php do_action( 'wcv_before_product_simple_linked' ); ?>
    <?php WCV_Product_Form::grouped_products( $object_id, $product ); ?>
    <?php WCV_Product_Form::up_sells( $object_id ); ?>
    <?php WCV_Product_Form::crosssells( $object_id ); ?>
    <?php do_action( 'wcv_product_options_upsells_product_data' ); ?>
    <?php do_action( 'wcv_after_product_simple_linked' ); ?>
    <div class="wcv-gap-top wcv-gap-top-small"></div>
    <?php WCV_Product_Form::product_seo( $object_id ); ?>

    <?php WCV_Product_Form::form_data( $object_id, $post_status, $template ); ?>
    <div class="wcv-button-group small">
        <?php WCV_Product_Form::save_button( $title ); ?>
        <?php WCV_Product_Form::draft_button( __( 'Save Draft', 'wc-vendors' ) ); ?>
    </div>

</form>

<?php do_action( 'wcvendors_after_product_form' ); ?>
