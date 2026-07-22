<?php
/**
 * The template for displaying the Product edit form
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
use WC_Vendors\Classes\Front\Forms\WCV_Product_Form;
use WC_Vendors\Classes\Front\WCV_Form_Helper;
/**
 *   DO NOT EDIT ANY OF THE LINES BELOW UNLESS YOU KNOW WHAT YOU'RE DOING
 */

$action_title = ( is_numeric( $object_id ) ) ? __( 'Save Changes', 'wc-vendors' ) : __( 'Add Product', 'wc-vendors' );
$page_title   = ( is_numeric( $object_id ) ) ? __( 'Edit Product', 'wc-vendors' ) : __( 'Add Product', 'wc-vendors' );
$product      = ( is_numeric( $object_id ) ) ? wc_get_product( $object_id ) : null;
$post_object  = ( is_numeric( $object_id ) ) ? get_post( $object_id ) : null;

// Get basic information for the product.
$product_title             = ( isset( $product ) && null !== $product ) ? $product->get_title() : '';
$product_description       = ( isset( $product ) && null !== $product ) ? $post_object->post_content : '';
$product_short_description = ( isset( $product ) && null !== $product ) ? $post_object->post_excerpt : '';
$post_status               = ( isset( $product ) && null !== $product ) ? $post_object->post_status : '';

/**
 *  Ok, You can edit the template below but be careful!
 */
?>

<h2 class="wcv-tab-page-heading wcv-gap-bottom wcv-mobile-no-gap"><?php echo esc_html( $page_title ); ?></h2>

<?php do_action( 'wcvendors_before_product_form' ); ?>

<!-- Product Edit Form -->
<form method="post" action="" id="wcv-product-edit" class="wcv-form">

    <!-- AI Review Suggestions -->
    <?php if ( is_numeric( $object_id ) ) : ?>
        <?php WCV_Product_Form::ai_review_suggestions( $object_id ); ?>
    <?php endif; ?>

    <!-- Basic Product Details -->
    <div class="wcv-product-basic wcv-product">
        <?php do_action( 'wcv_before_product_details', $object_id ); ?>
        <!-- Product Title -->
        <?php WCV_Product_Form::title( $object_id, $product_title ); ?>
        <!-- Product Description -->
        <?php WCV_Product_Form::description( $object_id, $product_description ); ?>
        <!-- Product Short Description -->
        <?php WCV_Product_Form::short_description( $object_id, $product_short_description ); ?>
        
        <div class="all-100">
            <?php do_action( 'wcv_before_product_media', $object_id ); ?>
            <!-- Media uploader -->
            <div class="wcv-product-media wcv-gap-bottom">
                <div class="wcv-flex wcv-product-media-wrapper" style="gap: 24px;">
                <?php do_action( 'wcv_before_media', $object_id ); ?>
                <?php WCV_Form_Helper::product_media_uploader( $object_id ); ?>
                <?php do_action( 'wcv_after_media', $object_id ); ?>
                </div>
            </div>
            <?php do_action( 'wcv_after_product_media', $object_id ); ?>
        </div>

        <div class="wcv-cols-group wcv-horizontal-gutters">
            <div class="all-50 small-100 tiny-100">
                <!-- Product Categories -->
                <?php WCV_Product_Form::categories( $object_id ); ?>
            </div>
            <div class="all-50 small-100 tiny-100">
                <!-- Product Tags -->
                <?php WCV_Product_Form::tags( $object_id, true ); ?>
            </div>
        </div>
        <?php do_action( 'wcv_after_product_details', $object_id ); ?>
    </div>

    <div style="height: 1px;background: #D5D4DC; margin-top:20px; margin-bottom:60px;" class="wcv_desktop"></div>
    <div style="margin:40px 0;" class="wcv_mobile"></div>

    <div class="all-100">
        <?php do_action( 'wcv_before_product_type', $object_id ); ?>
        <!-- Product Type -->
        <div class="wcv-product-type wcv-gap-bottom">
            <?php WCV_Product_Form::product_type( $object_id ); ?>
        </div>
        <?php do_action( 'wcv_after_product_type', $object_id ); ?>
    </div>

    <div class="all-100">
        <div class="wcv-accordions top" data-prevent-url-change="true" id="product-meta-accordion" data-type="">

            <!-- General Product Options -->
            <div class="wcv-product-general tabs-content hide-all" id="general">

                <?php do_action( 'wcvendors_product_options_general_product_data_before', $object_id ); ?>

                <div class="options_group show_if_external">
                    <?php WCV_Product_Form::external_url( $object_id ); ?>
                    <?php WCV_Product_Form::button_text( $object_id ); ?>
                </div>

                <div class="show_if_simple show_if_external">
                    <!-- Price and Sale Price -->
                    <?php WCV_Product_Form::prices( $object_id ); ?>
                    <?php do_action( 'wcv_after_product_prices', $object_id ); ?>
                </div>

                <div class="show_if_downloadable" id="files_download" style="margin-top: 40px;">
                    <h6 class="blue-title text-blue small-align-center tiny-align-center"><?php esc_html_e( 'Downloadable Files', 'wc-vendors' ); ?></h6>
                    <!-- Downloadable files -->
                    <?php WCV_Product_Form::download_files( $object_id ); ?>
                    <!-- Download Limit -->
                    <?php WCV_Product_Form::download_limit( $object_id ); ?>
                    <!-- Download Expiry -->
                    <?php WCV_Product_Form::download_expiry( $object_id ); ?>
                    <!-- Download Type -->
                    <?php WCV_Product_Form::download_type( $object_id ); ?>
                </div>
                <?php if ( wc_tax_enabled() ) : ?>
                <div class="show_if_simple show_if_external show_if_variable">
                    <!-- Tax -->
                    <?php WCV_Product_Form::tax( $object_id ); ?>
                </div>
                <?php endif; ?>

                <div class="show_if_simple show_if_variable">
                    <?php do_action( 'wcvendors_after_tax_field', $object_id ); ?>
                </div>

                <?php do_action( 'wcv_product_options_general_product_data', $object_id ); ?>
                <?php do_action( 'wcvendors_product_options_general_product_data_after', $object_id ); ?>
            </div>

            <?php do_action( 'wcv_after_general_tab', $object_id ); ?>

            <?php do_action( 'wcv_before_inventory_tab', $object_id ); ?>

            <!-- Inventory -->
            <div class="wcv-product-inventory inventory_product_data tabs-content hide-all" id="inventory">

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

            </div>

            <?php do_action( 'wcv_after_inventory_tab', $object_id ); ?>

            <?php do_action( 'wcv_before_shipping_tab', $object_id ); ?>

            <!-- Shipping  -->
            <div class="wcv-product-shipping shipping_product_data tabs-content hide-all" id="shipping">
                <div class="hide_if_grouped hide_if_external">

                    <?php do_action( 'wcv_product_options_shipping_rates', $object_id ); ?>
                    <!-- weight  -->
                    <?php WCV_Product_Form::weight( $object_id ); ?>
                    <!-- Dimensions -->
                    <?php WCV_Product_Form::dimensions( $object_id ); ?>

                    <?php do_action( 'wcv_product_options_dimensions', $object_id ); ?>
                    <!-- shipping class -->
                    <?php WCV_Product_Form::shipping_class( $object_id ); ?>

                    <?php do_action( 'wcv_product_options_shipping', $object_id ); ?>

                    <?php do_action( 'wcv_product_options_shipping_data_panel', $object_id ); ?>
                </div>

            </div>

            <?php do_action( 'wcv_after_shipping_tab', $object_id ); ?>

            <?php do_action( 'wcv_before_linked_tab', $object_id ); ?>

            <!-- Upsells and grouping -->
            <div class="wcv-product-upsells tabs-content hide-all" id="linked_product">

                <div class="show_if_grouped hide_if_external">
                    <?php WCV_Product_Form::grouped_products( $object_id, $product ); ?>
                </div>

                <?php WCV_Product_Form::up_sells( $object_id ); ?>

                <div class="hide_if_grouped hide_if_external">
                    <?php WCV_Product_Form::crosssells( $object_id ); ?>
                </div>


                <?php do_action( 'wcv_product_options_upsells_product_data' ); ?>
            </div>

            <?php do_action( 'wcv_after_linked_tab', $object_id ); ?>

            <!-- Attributes -->

            <?php do_action( 'wcv_before_attributes_tab', $object_id ); ?>
            <?php $hide_attributes = wc_string_to_bool( get_option( 'wcvendors_hide_product_basic_attributes', 'no' ) ) && is_wcv_pro_active(); ?>
            <?php if ( ! $hide_attributes ) : ?>
                <div class="wcv_product_attributes tabs-content hide-all" id="attributes">

                    <div class="attributes-validation-error"></div>

                    <?php WCV_Product_Form::product_attributes( $object_id ); ?>

                    <?php do_action( 'wcv_product_options_attributes_product_data', $object_id ); ?>

                </div>
            <?php endif; ?>
            <?php do_action( 'wcv_after_attributes_tab', $object_id ); ?>

            <!-- Advanced -->

            <?php do_action( 'wcvendors_before_advanced_tab', $object_id ); ?>

            <div class="wcv_product_advanced tabs-content hide-all" id="advanced">

                <div class="attributes-validation-error"></div>

                <?php WCV_Product_Form::product_advanced_purchase_note( $object_id ); ?>

                <?php WCV_Product_Form::product_advanced_menu_order( $object_id ); ?>

                <div class="hide_if_grouped">
                    <!-- Private listing  -->
                    <?php WCV_Product_Form::private_listing( $object_id ); ?>
                </div>

                <?php do_action( 'wcvendors_product_options_advanced_product_data', $object_id ); ?>

            </div>

            <?php do_action( 'wcvendors_after_advanced_tab', $object_id ); ?>

            <!-- Variations -->

            <?php do_action( 'wcv_before_variations_tab', $object_id ); ?>

            <div class="wcv_product_variations tabs-content hide-all" id="variations">

                <?php WCV_Product_Form::product_variations( $object_id ); ?>

                <?php do_action( 'wcv_product_options_variations_product_data', $object_id ); ?>

            </div>

            <?php do_action( 'wcv_after_variations_tab', $object_id ); ?>

            <!-- Product SEO -->

            <?php do_action( 'wcv_before_seo_tab', $object_id ); ?>

            <div class="wcv_product_seo tabs-content hide-all" id="seo">

                <?php WCV_Product_Form::product_seo( $object_id ); ?>

                <?php do_action( 'wcv_product_seo_data' ); ?>

            </div>

            <?php do_action( 'wcv_after_seo_tab', $object_id ); ?>

            <?php WCV_Product_Form::form_data( $object_id, $post_status ); ?>
            <div class="wcv-button-group small">
                <?php WCV_Product_Form::save_button( $action_title ); ?>
                <?php WCV_Product_Form::draft_button( __( 'Save Draft', 'wc-vendors' ) ); ?>
            </div>

            <?php do_action( 'wcv_after_product_meta_tabs', $object_id ); ?>
        </div>
    </div>
</form>

<?php do_action( 'wcvendors_after_product_form' ); ?>
