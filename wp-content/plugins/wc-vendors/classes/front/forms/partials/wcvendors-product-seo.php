<?php
/**
 * Product SEO form fields
 *
 * This file is used to display the product SEO form fields
 *
 * @link       http://www.wcvendors.com
 * @since      2.5.2
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.NoCaching
 */
use WC_Vendors\Classes\Front\WCV_Form_Helper;
?>
<div id="wcv_product_seo" class="wcv-metaboxes-wrapper">

    <div class="wcv-cols-group wcv-horizontal-gutters product-seo">
        <div class="all-100">
            <div id="wcv-attr-message" class="inline notice woocommerce-message">
                <?php esc_html_e( 'Leave field empty to use product details for SEO.', 'wc-vendors' ); ?>
            </div>
        </div>
    </div>
    <div class="wcv-cols-group wcv-horizontal-gutters product-seo">
        <div class="all-100">
            <!-- Product SEO Title -->
            <?php
            $disable_product_seo = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo' ) );
            $hide_title          = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_title' ) );
            $hide_description    = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_description' ) );
            $hide_keywords       = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_keywords' ) );
            $hide_opengraph      = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_opengraph' ) );
            $hide_twitter_card   = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_twitter' ) );

            if ( ! $disable_product_seo && ! $hide_title ) :
                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_seo_title_field',
                        array(
                            'id'          => 'wcv_product_seo_title',
                            'label'       => __( 'SEO title', 'wc-vendors' ),
                            'placeholder' => __( 'SEO title', 'wc-vendors' ),
                            'type'        => 'text',
                            'desc_tip'    => true,
                            'description' => __( 'The product title will be used if left blank', 'wc-vendors' ),
                            'value'       => $seo_title,
                        )
                    )
                );
            endif;
            ?>

            <!-- Product SEO Description -->
            <?php
            if ( ! $disable_product_seo && ! $hide_description ) :
            WCV_Form_Helper::textarea(
                apply_filters(
                    'wcv_product_seo_description_field',
                    array(
                        'id'          => 'wcv_product_seo_description',
                        'label'       => __( 'SEO description', 'wc-vendors' ),
                        'placeholder' => __( 'SEO description', 'wc-vendors' ),
                        'type'        => 'text',
                        'desc_tip'    => true,
                        'description' => __( 'The product short description will be used if left blank', 'wc-vendors' ),
                        'value'       => $seo_description,
                    )
                )
            );
        endif;
            ?>

            <!-- Product SEO Keywords -->
            <?php
            if ( ! $disable_product_seo && ! $hide_keywords ) :
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_seo_keywords_field',
                    array(
                        'id'          => 'wcv_product_seo_keywords',
                        'label'       => __( 'Keywords', 'wc-vendors' ),
                        'placeholder' => __( 'Keywords', 'wc-vendors' ),
                        'type'        => 'text',
                        'value'       => $seo_keywords,
                        'desc_tip'    => true,
                        'description' => __( 'Keywords should be comma separated. The product categories/tags will be used if left blank.', 'wc-vendors' ),
                    )
                )
            );
        endif;
            ?>

            <!-- Enable OpenGraph -->
            <?php
            if ( ! $disable_product_seo && ! $hide_opengraph ) :
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_seo_opengraph_field',
                    array(
                        'id'    => 'wcv_product_seo_opengraph',
                        'label' => __( 'Allow output of OpenGraph data for this product', 'wc-vendors' ),
                        'type'  => 'checkbox',
                        'value' => $seo_opengraph,
                    )
                )
            );
        endif;
            ?>

            <!-- Enable Output of Twitter Card -->
            <?php
            if ( ! $disable_product_seo && ! $hide_twitter_card ) :
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_seo_twitter_card_field',
                    array(
                        'id'        => 'wcv_product_seo_twitter_card',
                        'label'     => __( 'Allow output of Twitter Card for this product', 'wc-vendors' ),
                        'type'      => 'checkbox',
                        'value'     => $seo_twitter_card,
                        'no_margin' => true,
                    )
                )
            );
        endif;
            ?>
        </div>
    </div>
</div>
