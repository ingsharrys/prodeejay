<?php
/**
 * The WCV Product Form class
 *
 * This is the product form class
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.NoCaching
 * @phpcs:disable 	WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_exclude
 *
 * @version 2.6.5 - Fix security issues.
 */
namespace WC_Vendors\Classes\Front\Forms;

use WC_Vendors\Classes\Front\WCV_Form_Helper;
use WC_Vendors\Classes\Front\Forms\WCV_Store_Form;
use function WC_Vendors\Classes\Includes\wcv_get_product_types;
use function WC_Vendors\Classes\Includes\wcv_strip_html;
/**
 * The WCV Pro Product Form class
 *
 * This is the order form class
 */
class WCV_Product_Form {

    /**
     *  Output required form data
     *
     * @since    2.5.2
     * @version  2.5.2
     *
     * @param     int    $post_id post_id for this meta if any.
     * @param     int    $post_status post_status for this meta if any.
     * @param     string $template template for this product.
     */
    public static function form_data( $post_id, $post_status, $template = '' ) {

        $template = get_query_var( 'template' );

        if ( null !== $post_id ) {

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_post_id',
                    array(
                        'post_id' => $post_id,
                        'type'    => 'hidden',
                        'id'      => 'post_id',
                        'value'   => $post_id,
                    )
                )
            );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_post_status',
                    array(
                        'post_id' => $post_id,
                        'type'    => 'hidden',
                        'id'      => 'post_status',
                        'value'   => $post_status,
                    )
                )
            );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_page_number',
                    array(
                        'post_id' => $post_id,
                        'type'    => 'hidden',
                        'id'      => 'page_number',
                        'value'   => ( isset( $_GET['wcv_paged_id'] ) && ! empty( $_GET['wcv_paged_id'] ) ) ? $_GET['wcv_paged_id'] : '', //phpcs:ignore
                    )
                )
            );
        }

        // If the template variable has been defined then save this with the product.
        if ( ! empty( $template ) ) {

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_form_template',
                    array(
                        'post_id' => $post_id,
                        'type'    => 'hidden',
                        'id'      => '_wcv_product_form_template',
                        'value'   => $template,
                    )
                )
            );

        }

        wp_nonce_field( 'wcv-save_product', '_wcv-save_product' );
    }

    /**
     *  Output product title
     *
     * @since    2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     * @param     int $product_title product title.
     */
    public static function title( $post_id, $product_title ) {

        WCV_Form_Helper::input(
            apply_filters(
                'wcv_product_title',
                array(
                    'post_id'           => $post_id,
                    'id'                => 'post_title',
                    'label'             => __( 'Product name', 'wc-vendors' ),
                    'value'             => $product_title,
                    'custom_attributes' => array(
                        'required'                   => '',
                        'data-parsley-maxlength'     => '100',
                        'data-parsley-error-message' => __( 'Product name is required or too long.', 'wc-vendors' ),
                    ),
                    'custom_margin'     => 60,
                )
            )
        );
    }

    /**
     *  Output product description
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int    $post_id post_id for this meta if any.
     * @param     string $product_description product description.
     */
    public static function description( $post_id, $product_description ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_description', 'no' ) ) ) {

            $required     = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_basic_description', 'no' ) );
            $enable_media = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_product_description_media', 'no' ) );

            if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_product_html', 'no' ) ) ) {

                if ( $required ) {
                    add_filter( 'the_editor', array( WCV_Store_Form::class, 'wp_editor_required' ) );
                    add_filter( 'tiny_mce_before_init', array( WCV_Store_Form::class, 'wp_tinymce_required' ) );
                    add_filter( 'teeny_mce_before_init', array( WCV_Store_Form::class, 'wp_tinymce_required' ) );
                }

                $required_class = $required ? 'wcv-required' : '';

                $settings = apply_filters(
                    'wcv_product_description_editor_settings',
                    array(
                        'editor_height' => 200,
                        'media_buttons' => $enable_media,
                        'teeny'         => true,
                        'editor_class'  => $required_class,
                        'tinymce'       => array(
                            'setup' => 'function (editor) {
							editor.on("change", function () {
								var content = tinyMCE.activeEditor.getContent( {format : "raw"} )
									.replace( \'<p><br data-mce-bogus="1"></p>\', "" );

								if ( content != undefined && content != "" ) {
									jQuery( "#" + editor.id ).html( content );
								}
							});
						}',
                        ),
                    )
                );

                echo '<div class="control-group">';
                echo '<label>' . esc_html__( 'Product description', 'wc-vendors' ) . '</label>';
                wp_editor( $product_description, 'post_content', $settings );
                echo '</div>';
            } else {
                $custom_attributes = $required ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Product description is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::textarea(
                    apply_filters(
                        'wcv_product_description',
                        array(
                            'post_id'           => $post_id,
                            'id'                => 'post_content',
                            'label'             => __( 'Product description', 'wc-vendors' ),
                            'value'             => $product_description,
                            'placeholder'       => __( 'Please add a full description of your product here', 'wc-vendors' ),
                            'custom_attributes' => $custom_attributes,
                            'custom_margin'     => 60,
                        )
                    )
                );
            }
        }
    }

    /**
     *  Output product short_description
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int    $post_id post_id for this meta if any.
     * @param     string $product_short_description product short_description.
     */
    public static function short_description( $post_id, $product_short_description ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_short_description', 'no' ) ) ) {

            $required     = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_basic_short_description', 'no' ) );
            $enable_media = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_product_description_media', 'no' ) );

            if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_product_html', 'no' ) ) ) {

                if ( $required ) {
                    add_filter( 'the_editor', array( WCV_Store_Form::class, 'wp_editor_required' ) );
                    add_filter( 'tiny_mce_before_init', array( WCV_Store_Form::class, 'wp_tinymce_required' ) );
                    add_filter( 'teeny_mce_before_init', array( WCV_Store_Form::class, 'wp_tinymce_required' ) );
                }

                $required_class = $required ? 'wcv-required' : '';

                $settings = apply_filters(
                    'wcv_product_short_description_editor_settings',
                    array(
                        'editor_height' => 200,
                        'media_buttons' => $enable_media,
                        'teeny'         => true,
                        'editor_class'  => $required_class,
                        'tinymce'       => array(
                            'setup' => 'function (editor) {
							editor.on("change", function () {
								var content = tinyMCE.activeEditor.getContent( {format : "raw"} )
									.replace( \'<p><br data-mce-bogus="1"></p>\', "" );

								if ( content != undefined && content != "" ) {
									jQuery( "#" + editor.id ).html( content );
								}
							});
						}',
                        ),
                    )
                );

                echo '<div class="control-group">';
                echo '<label>' . esc_html__( 'Product short description', 'wc-vendors' ) . '</label>';
                wp_editor( $product_short_description, 'post_excerpt', $settings );
                echo '</div>';

            } else {
                $custom_attributes = $required ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Product short description is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::textarea(
                    apply_filters(
                        'wcv_product_short_description',
                        array(
                            'post_id'           => $post_id,
                            'id'                => 'post_excerpt',
                            'label'             => __( 'Product short description', 'wc-vendors' ),
                            'placeholder'       => __( 'Please add a brief description of your product here', 'wc-vendors' ),
                            'value'             => $product_short_description,
                            'custom_attributes' => $custom_attributes,
                            'custom_margin'     => 60,
                        )
                    )
                );
            }
}
    }

    /**
     *  Output save button
     *
     * @since    2.5.2
     * @version  2.6.6 - Fix vendor still being able to edit products when the submit capability is disabled.
     *
     * @param    string $button_text text for the button.
     */
    public static function save_button( $button_text ) {
        $current_user_id = get_current_user_id();
        $can_edit        = wc_string_to_bool( get_option( 'wcvendors_capability_products_edit', 'no' ) );
        $can_submit_live = wc_string_to_bool( get_option( 'wcvendors_capability_products_live', 'no' ) );
        $can_submit_live = wcv_apply_vendor_trust_status( $can_submit_live, $current_user_id );

        if ( ! $can_submit_live && ! $can_edit ) {
            $button_text = __( 'Save Pending', 'wc-vendors' );
        }

        WCV_Form_Helper::submit(
            apply_filters(
                'wcv_product_save_button',
                array(
                    'id'    => 'product_save_button',
                    'value' => $button_text,
                    'class' => 'wcv-button wcv-button-blue top-space',
                )
            )
        );
    }

    /**
     *  Output save button
     *
     * @since    2.5.2
     *
     * @param    string $button_text text for the button.
     */
    public static function draft_button( $button_text ) {

        WCV_Form_Helper::submit(
            apply_filters(
                'wcv_product_draft_button',
                array(
                    'id'    => 'draft_button',
                    'value' => $button_text,
                    'class' => 'wcv-button wcv-button-outline text-blue top-space',
                )
            )
        );
    }

    /**
     *  Output product categories
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int  $post_id  post_id for this meta if any.
     * @param     bool $multiple allow mupltiple selection.
     */
    public static function categories( $post_id, $multiple = false ) { //phpcs:ignore

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_categories', 'no' ) ) ) {

            if ( wcv_get_pro_option( 'wcvendors_category_display', 'select' ) === 'select' ) {
                self::categories_dropdown( $post_id, true );
            } elseif ( wcv_get_pro_option( 'wcvendors_category_display', 'select' ) === 'single_select' ) {
                self::categories_dropdown( $post_id, false );
            } elseif ( is_wcv_pro_active() ) {
                self::categories_checklist( $post_id );
            } else {
                self::categories_dropdown( $post_id, true );
            }
        }
    }

    /**
     *  Output product categories drop down
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     * @version  2.5.2
     *
     * @param     int  $post_id   post_id for this meta if any.
     * @param     bool $multiple allow mupltiple selection.
     */
    public static function categories_dropdown( $post_id, $multiple = false ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_categories', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_basic_categories', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Please select a category.', 'wc-vendors' ),
            ) : array();

            if ( $multiple && $category_limit = wcv_get_pro_option( 'wcvendors_category_limit', '' ) ) { //phpcs:ignore
                $custom_attributes['data-parsley-maxcheck'] = $category_limit;
            }

            $hide_categories_list = get_option( 'wcvendors_hide_categories_list', '' );
            $show_option_none     = ( $multiple ) ? '' : __( 'Select a Category', 'wc-vendors' );
            $exclude              = array();

            if ( ! empty( $hide_categories_list ) ) {
                $exclude = explode( ',', str_replace( ' ', '', $hide_categories_list ) );
            }

            $categories     = wp_get_post_terms( $post_id, 'product_cat' );
            $categories_ids = array();

            foreach ( $categories as $category ) {
                $categories_ids[ $category->term_id ] = wp_kses_post( html_entity_decode( $category->name ) );
            }

            $field_value = array_keys( $categories_ids );

            if ( ! $multiple ) {
                $field_value = reset( $field_value );
            }

            // Product Category Drop down.
            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_categories',
                    array(
                        'post_id'           => $post_id,
                        'id'                => 'product_cat',
                        'name'              => 'product_cat[]',
                        'taxonomy'          => 'product_cat',
                        'class'             => 'category-select2',
                        'value'             => $field_value,
                        'show_option_none'  => $show_option_none,
                        'taxonomy_args'     => array(
                            'hide_empty' => 0,
                            'orderby'    => 'order',
                            'exclude'    => $exclude,
                        ),
                        'multiple'          => $multiple,
                        'label'             => ( $multiple ) ? __( 'Categories', 'wc-vendors' ) : __( 'Category', 'wc-vendors' ),
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );
        }
    }

    /**
     *  Output product categories check list
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function categories_checklist( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_categories', 'no' ) ) ) {

            $exclude              = array();
            $hide_categories_list = wcv_get_pro_option( 'wcvendors_hide_categories_list', '' );

            if ( ! empty( $hide_categories_list ) ) {
                $exclude = explode( ',', str_replace( ' ', '', $hide_categories_list ) );
            }

            $args = array(
                'taxonomy'   => 'product_cat',
                'exclude'    => $exclude,
                'hide_empty' => false,
            );

            $field = array(
                'id'    => 'product_cat_list',
                'label' => __( 'Categories', 'wc-vendors' ),
                'class' => 'product_cat_checklist',
            );

            WCV_Form_Helper::wcv_terms_checklist( $post_id, $args, $field );
        }
    }

    /**
     * DEPRECATED This function has been replaced - Output a woocommerce attribute selects
     *
     * @since      2.5.2
     * @since      2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int  $post_id  post_id for this meta if any.
     * @param     bool $multiple allow mupltiple selection.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function attributes( $post_id, $multiple = false ) { //phpcs:ignore

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_attributes', 'no' ) ) ) {

            // Array of defined attribute taxonomies.
            $attribute_taxonomies = wc_get_attribute_taxonomies();

            // If there are any defined attributes display them.
            if ( ! empty( $attribute_taxonomies ) ) {

                $i = 0;
                // Get any set attributes for the product.
                $attributes = maybe_unserialize( get_post_meta( $post_id, '_product_attributes', true ) );

                foreach ( $attribute_taxonomies as $product_attribute ) {

                    if ( in_array( $product_attribute->attribute_id, explode( ',', wcv_get_pro_option( 'wcvendors_hide_attributes_list', '' ) ) ) ) { //phpcs:ignore
                        continue;
                    }

                    $current_attribute = '';
                    $is_variation      = 'no';
                    // $custom_attributes   = ( $multiple ) ? array( 'multiple' => 'multiple' ) : array();
                    // If the attributes aren't empty, extract the attribute value for the current product
                    if ( ! empty( $attributes ) && array_key_exists( wc_attribute_taxonomy_name( $product_attribute->attribute_name ), $attributes ) ) {
                        // get all terms.
                        $current_attribute = wp_get_post_terms( $post_id, wc_attribute_taxonomy_name( $product_attribute->attribute_name ) );
                        $is_variation      = $attributes[ wc_attribute_taxonomy_name( $product_attribute->attribute_name ) ]['is_variation'] ? 'yes' : 'no';
                        $current_attribute = reset( $current_attribute );
                        $current_attribute = $current_attribute->slug;
                    }

                    // Output attribute select.
                    WCV_Form_Helper::select(
                        array(
                            'id'               => 'attribute_values[' . $i . '][]',
                            'post_id'          => $post_id,
                            'label'            => ucfirst( $product_attribute->attribute_label ),
                            'value'            => $current_attribute,
                            'show_option_none' => __( 'Select a ', 'wc-vendors' ) . ucfirst( $product_attribute->attribute_label ),
                            'taxonomy'         => wc_attribute_taxonomy_name( $product_attribute->attribute_name ),
                            'is_attribute'     => true,
                            'taxonomy_args'    => array(
                                'hide_empty' => 0,
                                'orderby'    => 'order',
                            ),
                        )
                    );

                    // Output attribute name hidden.
                    WCV_Form_Helper::input(
                        array(
                            'post_id'    => $post_id,
                            'id'         => 'attribute_names[' . $i . ']',
                            'type'       => 'hidden',
                            'show_label' => false,
                            'value'      => wc_attribute_taxonomy_name( $product_attribute->attribute_name ),
                        )
                    );
                    ++$i;
                }
            }

            // Support other plugins hooking into attributes
            // Not sure if this will work ?
            do_action( 'wcv_product_options_attributes' );

        }
    }

    /**
     *  Output product tags multi select
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int  $post_id  post_id for this meta if any.
     * @param     bool $multiple allow mupltiple selection.
     */
    public static function tags( $post_id, $multiple = false ) { //phpcs:ignore

        if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_tags', 'no' ) ) ) {
            return;
        }

        $allow_create_tags = wc_string_to_bool( get_option( 'wcvendors_capability_create_product_tags', 'yes' ) );

        $tags    = wp_get_post_terms( $post_id, 'product_tag' );
        $tag_ids = array();

        foreach ( $tags as $tag ) {
            $tag_ids[ $tag->term_id ] = wp_kses_post( html_entity_decode( $tag->name ) );
        }

        $required_field = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_basic_tags', 'no' ) ) ? array(
            'required'                   => '',
            'data-parsley-error-message' => __( 'Please select a tag.', 'wc-vendors' ),
        ) : array();

        $custom_attributes = array(
            'data-placeholder' => __( 'Search or add a tag&hellip;', 'wc-vendors' ),
            'data-action'      => 'wcv_json_search_tags',
            'data-tags'        => $allow_create_tags ? 'true' : 'false',
        );

        $tag_limit = wcv_get_pro_option( 'wcvendors_tag_limit', '' );
        if ( '' !== $tag_limit ) {
            $custom_attributes['data-parsley-maxcheck'] = intval( $tag_limit );
        }

        if ( wcv_get_pro_option( 'wcvendors_tag_display', '' ) === 'select_limited' ) {
            $custom_attributes['data-placeholder'] = __( 'Search for a tag&hellip;', 'wc-vendors' );
            $custom_attributes['data-tags']        = 'false';
        }

        $custom_attributes = array_merge( $custom_attributes, $required_field );

        foreach ( $tags as $tag ) {
            $tag_ids[ $tag->term_id ] = wp_kses_post( html_entity_decode( $tag->name ) );
        }

        WCV_Form_Helper::select(
            apply_filters(
                'wcv_product_tags',
                array(
                    'id'                => 'product_tags',
                    'label'             => __( 'Tags', 'wc-vendors' ),
                    'value'             => implode( ',', array_keys( $tag_ids ) ),
                    'style'             => 'width: 100%;',
                    'class'             => 'wcv-tag-search tag-select2',
                    'show_label'        => 'true',
                    'custom_attributes' => $custom_attributes,
                    'options'           => $tag_ids,
                    'multiple'          => true,
                )
            )
        );
    } // tags

    /**
     *  Output product type
     *
     * @since    2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     *
     * @todo     remove all echo statements and html
     */
    public static function product_type( $post_id ) {

        if ( apply_filters( 'wcv_disable_product_type', false ) ) {
            return;
        }

        $product = ( is_numeric( $post_id ) ) ? wc_get_product( $post_id ) : null;

        if ( null !== $product ) {
            if ( $terms = wp_get_object_terms( $post_id, 'product_type' ) ) { //phpcs:ignore
                $product_type = sanitize_title( current( $terms )->name );
            } else {
                $product_type = apply_filters( 'wcv_default_product_type', 'simple' );
            }
        } else {
            $product_type = apply_filters( 'wcv_default_product_type', 'simple' );
        }

        $product_type_selector = wcv_get_product_types();

        // Disable capabitilies based on settings.
        $product_type_settings = get_option( 'wcvendors_capability_product_types', array() );

        foreach ( $product_type_settings as $product_type_setting ) {

            if ( array_key_exists( $product_type_setting, $product_type_selector ) ) {
                unset( $product_type_selector[ $product_type_setting ] );
            }
        }

        $type_box  = '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-50 tiny-60">';
        $type_box .= '<div class="control select">';
        $type_box .= '<div class="product-type-wrapper">';
        $type_box .= '<select id="product-type" name="product-type" class="select">';

        foreach ( $product_type_selector as $value => $label ) {
            $type_box .= '<option value="' . esc_attr( $value ) . '" ' . selected( $product_type, $value, false ) . '>' . esc_html( $label ) . '</option>';
        }

        $type_box .= '</select>';
        $type_box .= '</div>'; // product-type-wrapper.
        $type_box .= '</div>'; // control.
        $type_box .= '</div>'; // grid.

        $product_type_options = apply_filters(
            'product_type_options',
            array(
                'virtual'      => array(
                    'id'            => '_virtual',
                    'wrapper_class' => 'show_if_simple',
                    'label'         => __( 'Virtual', 'wc-vendors' ),
                    'description'   => __( 'Virtual products are intangible and aren\'t shipped.', 'wc-vendors' ),
                    'default'       => 'no',
                ),
                'downloadable' => array(
                    'id'            => '_downloadable',
                    'wrapper_class' => 'show_if_simple show_if_auction',
                    'label'         => __( 'Downloadable', 'wc-vendors' ),
                    'description'   => __( 'Downloadable products give access to a file upon purchase.', 'wc-vendors' ),
                    'default'       => 'no',
                ),
            )
        );

        // Disable capabitilies based on settings.
        $product_type_options_settings = get_option( 'wcvendors_capability_product_type_options', array() );

        foreach ( $product_type_options as $key => $option ) {
            if ( in_array( $key, $product_type_options_settings ) ) { //phpcs:ignore
                unset( $product_type_options[ $key ] );
            }
        }

        $type_box .= '<div class="all-50 small-100 tiny-100">';
        $type_box .= '<div class="control-group no-margin">';

        // Only output the list if there is options.
        if ( ! empty( $product_type_options ) ) {
            $type_box .= '<ul class="align-right small-align-left wcv-flex wcv-flex-end wcv-m-flex-space product_type_options" style="padding: 0; gap: 24px;">';

            foreach ( $product_type_options as $key => $option ) {

                if ( metadata_exists( 'post', $post_id, '_' . $key ) ) {
                    $selected_value = is_callable(
                        array(
                            $product,
                            "is_$key",
                        )
                    ) ? $product->{"is_$key"}() : 'yes' === get_post_meta( $post_id, '_' . $key, true );
                } else {
                    $selected_value = 'yes' === ( isset( $option['default'] ) ? $option['default'] : 'no' );
                }

                $style = isset( $option['style'] ) ? esc_attr( $option['style'] ) : '';

                $type_box .= '<li class="' . esc_attr( $option['wrapper_class'] ) . ' " style="' . $style . '">
                <label for="' . esc_attr( $option['id'] ) . '" class="' . esc_attr( $option['wrapper_class'] ) . ' wcv-checkbox-container" data-tip="' . esc_attr( $option['description'] ) . '">' . esc_html( $option['label'] ) . '
                <input type="checkbox" name="' . esc_attr( $option['id'] ) . '" id="' . esc_attr( $option['id'] ) . '" ' . checked( $selected_value, true, false ) . ' />
                <span class="checkmark"></span>
                </label></li>';
            }

            $type_box .= '</ul>';
        }

        $type_box .= '</div>';  // control.
        $type_box .= '</div>';  // control-group.
        $type_box .= '</div>';  // grid.

        echo $type_box; //phpcs:ignore
    }

    /**
     *  Output a hidden product type input for use with different templates
     *
     * @since    2.5.2
     *
     * @param     int    $post_id      post_id for this meta if any.
     * @param     string $product_type product_type to set.
     */
    public static function product_type_hidden( $post_id, $product_type = 'simple' ) {

        // Product Type.
        WCV_Form_Helper::input(
            array(
                'post_id'    => $post_id,
                'type'       => 'hidden',
                'id'         => 'product-type',
                'value'      => $product_type,
                'show_label' => false,
            )
        );
    }

    /**
     *  Output a hidden virtual product input for use with different templates
     *
     * @since    2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function virtual_product_hidden( $post_id ) {

        // Virtual Product.
        WCV_Form_Helper::input(
            array(
                'post_id'    => $post_id,
                'type'       => 'hidden',
                'id'         => '_virtual',
                'value'      => 'yes',
                'show_label' => false,
            )
        );
    }

    /**
     *  Output a hidden downloadable product input for use with different templates
     *
     * @since    2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function downloadable_product_hidden( $post_id ) {

        // Downloadable Product.
        WCV_Form_Helper::input(
            array(
                'post_id'    => $post_id,
                'type'       => 'hidden',
                'id'         => '_downloadable',
                'value'      => 'yes',
                'show_label' => false,
            )
        );
    }

    /**
     *  Output product price
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function price( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_price', 'no' ) ) ) {

            $required_field    = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_price', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Price is required', 'wc-vendors' ),
            ) : array();
            $custom_attributes = array();
            $custom_attributes = array_merge( $custom_attributes, $required_field );

            $wrapper_start = ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_sale_price', 'no' ) ) ? '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-50">' : '<div class="all-100">';

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_price',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_regular_price',
                        'label'             => __( 'Regular price', 'wc-vendors' ) . ' (' . get_woocommerce_currency_symbol() . ')',
                        'data_type'         => 'price',
                        'wrapper_start'     => $wrapper_start,
                        'wrapper_end'       => '</div>',
                        'custom_attributes' => $custom_attributes,
                        'no_margin'         => true,
                    )
                )
            );
        }
    }

    /**
     *  Output product sale price
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function sale_price( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_price', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_sale_price', 'no' ) ) ) {

            $required_field    = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_sale_price', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Sale price is required', 'wc-vendors' ),
            ) : array();
            $custom_attributes = array();
            $custom_attributes = array_merge( $custom_attributes, $required_field );
            $calendar_icon     = wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle', 'wcv-icon-calendar-line' );
            $sechude_text      = __( 'Schedule', 'wc-vendors' );
            // Special Price - ends columns and row.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_sale_price',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_sale_price',
                        'data_type'         => 'price',
                        'label'             => __( 'Sale Price', 'wc-vendors' ) . ' (' . get_woocommerce_currency_symbol() . ')',
                        'desc_tip'          => 'true',
                        'description'       => '<a href="#" class="sale_schedule right">' . $calendar_icon . '<span class="vertical-middle">' . $sechude_text . '</span></a>',
                        'wrapper_start'     => '<div class="all-50 small-50">',
                        'wrapper_end'       => '</div></div>',
                        'custom_attributes' => $custom_attributes,
                        'show_tooltip'      => false,
                        'no_margin'         => true,
                    )
                )
            );

            // Special Price date range.
            $sale_price_dates_from = $post_id ? ( ( $date = get_post_meta( $post_id, '_sale_price_dates_from', true ) ) ? date_i18n( 'Y-m-d', $date ) : '' ) : ''; //phpcs:ignore
            $sale_price_dates_to   = $post_id ? ( ( $date = get_post_meta( $post_id, '_sale_price_dates_to', true ) ) ? date_i18n( 'Y-m-d', $date ) : '' ) : ''; //phpcs:ignore

            // From Sale Date.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_sale_price_date_from',
                    array(
                        'post_id'             => $post_id,
                        'id'                  => '_sale_price_dates_from',
                        'label'               => __( 'From', 'wc-vendors' ),
                        'class'               => 'wcv-datepicker wcv-init-picker',
                        'value'               => esc_attr( $sale_price_dates_from ),
                        'placeholder'         => ( '' === $sale_price_dates_from ) ? __( 'From&hellip; YYYY-MM-DD', 'wc-vendors' ) : '',
                        'wrapper_start'       => '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 sale_price_dates_fields">',
                        'wrapper_end'         => '</div>',
                        'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                        'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                        'custom_attributes'   => array(
                            'data-close-text' => __( 'Close', 'wc-vendors' ),
                            'data-clean-text' => __( 'Clear', 'wc-vendors' ),
                            'data-of-text'    => __( ' of ', 'wc-vendors' ),
                        ),
                    )
                )
            );

            $cancel_icon = wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-times' );
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_sale_price_date_to',
                    array(
                        'post_id'             => $post_id,
                        'id'                  => '_sale_price_dates_to',
                        'label'               => __( 'To', 'wc-vendors' ),
                        'class'               => 'wcv-datepicker wcv-init-picker',
                        'placeholder'         => ( '' === $sale_price_dates_to ) ? __( 'To&hellip; YYYY-MM-DD', 'wc-vendors' ) : '',
                        'wrapper_start'       => '<div class="all-50 sale_price_dates_fields">',
                        'wrapper_end'         => '</div></div>',
                        'value'               => esc_attr( $sale_price_dates_to ),
                        'desc_tip'            => true,
                        'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                        'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                        'description'         => __( 'The sale will end at the beginning of the set date.', 'wc-vendors' ) . '<a href="#" class="cancel_sale_schedule right">' . $cancel_icon . '<span class="vertical-middle">' . __( 'Cancel', 'wc-vendors' ) . '</span></a>',
                        'custom_attributes'   => array(
                            'data-start-date' => '',
                            'data-close-text' => __( 'Close', 'wc-vendors' ),
                            'data-clean-text' => __( 'Clear', 'wc-vendors' ),
                            'data-of-text'    => __( ' of ', 'wc-vendors' ),
                        ),
                        'show_tooltip'        => false,
                    )
                )
            );
        }
    }

    /**
     *  Output product price and sale price
     *
     * @since    2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function prices( $post_id ) {

        self::price( $post_id );
        self::sale_price( $post_id );
    }

    /**
     *  Output downloadable files fields
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function download_files( $post_id ) { //phpcs:ignore

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_files', 'no' ) ) ) {

            $readonly          = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_file_url', 'no' ) ) ? 'readonly' : '';
            $file_display_type = wcv_get_pro_option( 'wcvendors_file_display', '' );

            include_once wcv_deprecated_filter( 'wcvendors_pro_product_form_download_files_path', '2.5.2', 'wcvendors_product_form_download_files_path', 'partials/wcvendors-downloadable-files.php' );
        }
    }

    /**
     *  Output downloadable files fields
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function product_attributes( $post_id ) { //phpcs:ignore

        if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_attributes', 'no' ) ) ) {

            return;
        }

        $attribute_terms_allowed = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_vendor_attribute_terms', 'no' ) );

        include_once wcv_deprecated_filter( 'wcvendors_pro_product_form_product_attributes_path', '2.5.2', 'wcvendors_product_form_product_attributes_path', 'partials/wcvendors-attributes.php' );
    }

    /**
     *  Output product download limit
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function download_limit( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_files', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_limit', 'no' ) ) ) {

            $product           = ( is_numeric( $post_id ) ) ? wc_get_product( $post_id ) : null;
            $required_field    = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_download_limit', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Download limit is required', 'wc-vendors' ),
            ) : array();
            $custom_attributes = array( 'data-parsley-decimal' => wc_get_price_decimal_separator() );
            $custom_attributes = array_merge( $custom_attributes, $required_field );
            $value             = ( is_a( $product, 'WC_Product' ) ) ? ( -1 === $product->get_download_limit( 'edit' ) ? '' : $product->get_download_limit( 'edit' ) ) : '';
            $wrapper_start     = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_expiry', 'no' ) ) ? '<div class="all-100">' : '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-100">';

            // Download Limit.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_dowlnoad_limit',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_download_limit',
                        'label'             => __( 'Download limit', 'wc-vendors' ),
                        'placeholder'       => __( 'Unlimited', 'wc-vendors' ),
                        'desc_tip'          => 'true',
                        'description'       => __( 'Leave blank for unlimited re-downloads.', 'wc-vendors' ),
                        'type'              => 'text',
                        'wrapper_start'     => $wrapper_start,
                        'wrapper_end'       => '</div>',
                        'value'             => $value,
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );
        }
    }

    /**
     *  Output product download expiry
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function download_expiry( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_files', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_expiry', 'no' ) ) ) {

            $product           = ( is_numeric( $post_id ) ) ? wc_get_product( $post_id ) : null;
            $required_field    = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_download_expiry', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Download expiry is required.', 'wc-vendors' ),
            ) : array();
            $custom_attributes = array( 'data-parsley-decimal' => wc_get_price_decimal_separator() );
            $custom_attributes = array_merge( $custom_attributes, $required_field );
            $value             = ( is_a( $product, 'WC_Product' ) ) ? ( -1 === $product->get_download_expiry( 'edit' ) ? '' : $product->get_download_expiry( 'edit' ) ) : '';
            $wrapper_start     = ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_limit', 'no' ) ) ? '<div class="all-50 small-100">' : '<div class="all-100">';
            $wrapper_end       = ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_limit', 'no' ) ) ? '</div></div>' : '</div>';

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_download_expiry',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_download_expiry',
                        'label'             => __( 'Download expiry', 'wc-vendors' ),
                        'placeholder'       => __( 'Never', 'wc-vendors' ),
                        'desc_tip'          => 'true',
                        'description'       => __( 'Enter the number of days before a download link expires, or leave blank.', 'wc-vendors' ),
                        'type'              => 'text',
                        'value'             => $value,
                        'wrapper_start'     => $wrapper_start,
                        'wrapper_end'       => $wrapper_end,
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );
        }
    }

    /**
     *  Output product download type
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function download_type( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_files', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_download_type', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_download_type', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Download type is required.', 'wc-vendors' ),
            ) : array();

            // Download Type.
            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_download_type',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_download_type',
                        'class'             => 'select',
                        'label'             => __( 'Download type', 'wc-vendors' ),
                        'desc_tip'          => 'true',
                        'description'       => sprintf( /* translators: %s link */ __( 'Choose a download type - this controls the <a href="%s">http://schema.org</a>.', 'wc-vendors' ), 'http://schema.org/' ),
                        'wrapper_start'     => '<div class="all-100">',
                        'wrapper_end'       => '</div>',
                        'options'           => array(
                            'standard'    => __( 'Standard product', 'wc-vendors' ),
                            'application' => __( 'Application/Software', 'wc-vendors' ),
                            'music'       => __( 'Music', 'wc-vendors' ),
                        ),
                        'custom_attributes' => $custom_attributes,
                        'no_margin'         => false,
                    )
                )
            );
        }
    }

    /**
     *  Output product sku
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function sku( $post_id ) {

        $hide_sku = wc_string_to_bool( get_option( 'wcvendors_capability_product_sku', 'no' ) );

        if ( ! $hide_sku && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_sku', 'no' ) ) ) {

            if ( wc_product_sku_enabled() ) {

                $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_sku', 'no' ) ) ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'SKU is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_sku',
                        array(
                            'post_id'           => $post_id,
                            'id'                => '_sku',
                            'label'             => '<abbr title="' . __( 'Stock keeping unit', 'wc-vendors' ) . '">' . __( 'SKU', 'wc-vendors' ) . '</abbr>',
                            'desc_tip'          => 'true',
                            'description'       => __( 'SKU refers to a Stock-keeping unit, a unique identifier for each distinct product and service that can be purchased.', 'wc-vendors' ),
                            'custom_attributes' => $custom_attributes,
                        )
                    )
                );
            } else {

                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_sku',
                        array(
                            'post_id' => $post_id,
                            'type'    => 'hidden',
                            'id'      => '_sku',
                            'value'   => esc_attr( get_post_meta( $post_id, '_sku', true ) ),
                        )
                    )
                );
            }
        }

        do_action( 'wcv_product_options_sku' );
    }

    /**
     *  Output private listing checkbox
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function private_listing( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_private_listing', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_private_listing', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Private listing is required.', 'wc-vendors' ),
            ) : array();

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_private_listing',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_private_listing',
                        'wrapper_class'     => '',
                        'label'             => __( 'Private listing, hide this product from the catalog.', 'wc-vendors' ),
                        'type'              => 'checkbox',
                        'custom_attributes' => $custom_attributes,
                        'no_margin'         => true,
                    )
                )
            );
        }
    }

    /**
     *  Output external url for external products
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function external_url( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_external_url', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_external_url', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'External URL is required.', 'wc-vendors' ),
            ) : array();

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_product_url',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_product_url',
                        'label'             => __( 'Product URL', 'wc-vendors' ),
                        'type'              => 'url',
                        'placeholder'       => 'http://',
                        'desc_tip'          => 'true',
                        'description'       => __( 'Enter the external URL to the product.', 'wc-vendors' ),
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );
        }
    }

    /**
     *  Output button text for external products
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function button_text( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_button_text', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_button_text', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Button text is required.', 'wc-vendors' ),
            ) : array();

            // Button text.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_button_text',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_button_text',
                        'label'             => __( 'Button text', 'wc-vendors' ),
                        'placeholder'       => _x( '', 'placeholder', 'wc-vendors' ), //phpcs:ignore
                        'desc_tip'          => 'true',
                        'description'       => __( 'This text will be shown on the button linking to the external product.', 'wc-vendors' ),
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );
        }
    }

    /**
     *  Output tax information
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function tax( $post_id ) {
        $hide_tax_field = wc_string_to_bool( get_option( 'wcvendors_capability_product_taxes', 'no' ) ) || wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_general_tax', 'no' ) );

        if ( ! $hide_tax_field ) {

            if ( wc_tax_enabled() ) {

                $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_general_tax', 'no' ) ) ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Tax is required.', 'wc-vendors' ),
                ) : array();

                // Tax.
                WCV_Form_Helper::select(
                    apply_filters(
                        'wcv_product_tax_status',
                        array(
                            'post_id'           => $post_id,
                            'id'                => '_tax_status',
                            'label'             => __( 'Tax status', 'wc-vendors' ),
                            'wrapper_start'     => '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50">',
                            'style'             => 'width: 100%;',
                            'wrapper_end'       => '</div>',
                            'custom_attributes' => $custom_attributes,
                            'options'           => array(
                                'taxable'  => __( 'Taxable', 'wc-vendors' ),
                                'shipping' => __( 'Shipping only', 'wc-vendors' ),
                                'none'     => _x( 'None', 'Tax status', 'wc-vendors' ),
                            ),
                            'no_margin'         => false,
                        )
                    )
                );

                $tax_classes                 = \WC_Tax::get_tax_classes();
                $classes_options             = array();
                $classes_options['standard'] = __( 'Standard', 'wc-vendors' );

                if ( $tax_classes ) {

                    foreach ( $tax_classes as $class ) {
                        $classes_options[ sanitize_title( $class ) ] = esc_html( $class );
                    }
                }

                WCV_Form_Helper::select(
                    apply_filters(
                        'wcv_product_tax_class',
                        array(
                            'post_id'       => $post_id,
                            'id'            => '_tax_class',
                            'label'         => __( 'Tax class', 'wc-vendors' ),
                            'options'       => $classes_options,
                            'style'         => 'width: 100%;',
                            'wrapper_start' => '<div class="all-50">',
                            'wrapper_end'   => '</div></div>',
                            'no_margin'     => true,
                        )
                    )
                );

                do_action( 'wcv_product_options_tax', $post_id );

            }
        }
    }

    /**
     *  Output enable reviews
     *
     * @since    2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function reviews( $post_id ) {

        $product        = ( is_numeric( $post_id ) ) ? wc_get_product( $post_id ) : null;
        $comment_status = ( null !== $product ) ? esc_attr( $product->comment_status ) : 0;

        WCV_Form_Helper::input(
            apply_filters(
                'wcv_product_reviews',
                array(
                    'post_id' => $post_id,
                    'id'      => 'comment_status',
                    'label'   => __( 'Enable reviews', 'wc-vendors' ),
                    'type'    => 'checkbox',
                )
            )
        );

        do_action( 'wcv_product_options_reviews' );
    }

    /**
     *  Output manage stock
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function manage_stock( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_manage_inventory', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_inventory_manage_inventory', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Manage stock is required.', 'wc-vendors' ),
            ) : array();

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_manage_stock',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_manage_stock',
                        'wrapper_class'     => 'show_if_simple show_if_variable',
                        'label'             => __( 'Manage stock?', 'wc-vendors' ),
                        'description'       => __( 'Enable stock management at product level', 'wc-vendors' ),
                        'type'              => 'checkbox',
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );

        }
    }

    /**
     *  Output stock qty
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function stock_qty( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_manage_inventory', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_stock_qty', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_inventory_stock_qty', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Stock QTY is required.', 'wc-vendors' ),
            ) : array();

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_stock_qty',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_stock',
                        'label'             => __( 'Stock qty', 'wc-vendors' ),
                        'wrapper_start'     => '<div class="all-100">',
                        'wrapper_end'       => '</div>',
                        'desc_tip'          => true,
                        'description'       => __( 'Stock quantity.', 'wc-vendors' ),
                        'type'              => 'number',
                        'data_type'         => 'stock',
                        'custom_attributes' => $custom_attributes,
                        'default'           => '1',
                    )
                )
            );
        }
    }

    /**
     *  Output backorder select
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function backorders( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_manage_inventory', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_backorders', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_inventory_backorders', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Allow backorders is required.', 'wc-vendors' ),
            ) : array();

            // Backorders?
            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_backorders',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_backorders',
                        'label'             => __( 'Allow backorders?', 'wc-vendors' ),
                        'wrapper_start'     => '<div class="all-100">',
                        'wrapper_end'       => '</div>',
                        'desc_tip'          => true,
                        'style'             => 'width: 100%;',
                        'description'       => __( 'If managing stock, this controls whether or not backorders are allowed. If enabled, stock quantity can go below 0.', 'wc-vendors' ),
                        'custom_attributes' => $custom_attributes,
                        'options'           => array(
                            'no'     => __( 'Do not allow', 'wc-vendors' ),
                            'notify' => __( 'Allow, but notify customer', 'wc-vendors' ),
                            'yes'    => __( 'Allow', 'wc-vendors' ),
                        ),
                    )
                )
            );
        }
    }

    /**
     *  Output stock status
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function stock_status( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_manage_inventory', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_stock_status', 'no' ) ) ) {

            $custom_attributes = ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_inventory_stock_status', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Stock status is required.', 'wc-vendors' ),
            ) : array();

            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_stock_status',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_stock_status',
                        'wrapper_class'     => 'hide_if_variable hide_if_auction',
                        'label'             => __( 'Stock status', 'wc-vendors' ),
                        'wrapper_start'     => '<div class="all-100 stock_status_field hide_if_variable hide_if_external hide_if_grouped hide_if_auction">',
                        'wrapper_end'       => '</div>',
                        'desc_tip'          => true,
                        'style'             => 'width: 100%;',
                        'description'       => __( 'Controls whether or not the product is listed as "in stock" or "out of stock" on the frontend.', 'wc-vendors' ),
                        'custom_attributes' => $custom_attributes,
                        'options'           => array(
                            'instock'    => __( 'In stock', 'wc-vendors' ),
                            'outofstock' => __( 'Out of stock', 'wc-vendors' ),
                        ),
                    )
                )
            );
        }
    }

    /**
     *  Output sold individually checkbox
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function sold_individually( $post_id ) {

            if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_manage_inventory', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_sold_individually', 'no' ) ) ) {

            $require_sold_individually = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_inventory_sold_individually', 'no' ) );
            $custom_attributes         = $require_sold_individually ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Sold individually is required.', 'wc-vendors' ),
            ) : array();

            if ( $require_sold_individually ) {
                $custom_attributes['checked'] = 'checked';
            }

            // sold individually.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_sold_individually',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_sold_individually',
                        'wrapper_class'     => 'show_if_simple show_if_variable',
                        'label'             => __( 'Sold individually', 'wc-vendors' ),
                        'desc_tip'          => true,
                        'description'       => __( 'Enable this to only allow one of this item to be bought in a single order', 'wc-vendors' ),
                        'type'              => 'checkbox',
                        'custom_attributes' => $custom_attributes,
                        'no_margin'         => true,
                    )
                )
            );
        }
    }

    /**
     * Output the low stock threshold input
     *
     * @param int $post_id post_id for this meta if any.
     *
     * @since 2.5.2
     * @since 2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     */
    public static function low_stock_threshold( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_manage_inventory', 'no' ) ) && ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_inventory_low_stock_threshold', 'no' ) ) ) {

            $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_inventory_low_stock_threshold', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Low stock threshold is required.', 'wc-vendors' ),
            ) : array();

            // Low stock threshold.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_product_sold_individually',
                    array(
                        'post_id'           => $post_id,
                        'id'                => '_low_stock_amount',
                        'wrapper_start'     => '<div class="all-100">',
                        'wrapper_end'       => '</div>',
                        'label'             => __( 'Low stock threshold', 'wc-vendors' ),
                        'desc_tip'          => true,
                        'description'       => __( 'When product stock reaches this amount you will be notified by email', 'wc-vendors' ),
                        'type'              => 'number',
                        'data_type'         => 'stock',
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );

        }
    }

    /**
     *  Output weight input
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function weight( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_shipping_weight', 'no' ) ) ) {

        if ( wc_product_weight_enabled() ) {

                $custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_shipping_weight', 'no' ) ) ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Weight is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_weight',
                        array(
                            'post_id'           => $post_id,
                            'id'                => '_weight',
                            'label'             => __( 'Weight', 'wc-vendors' ) . ' (' . get_option( 'woocommerce_weight_unit' ) . ')',
                            'placeholder'       => wc_format_localized_decimal( 0 ),
                            'desc_tip'          => 'true',
                            'description'       => __( 'Weight in decimal form', 'wc-vendors' ),
                            'type'              => 'text',
                            'data_type'         => 'decimal',
                            'custom_attributes' => $custom_attributes,
                        )
                    )
                );
            }
        }
    }

    /**
     *  Output dimensions inputs
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function dimensions( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_shipping_dimensions' ) ) ) {

            if ( wc_product_dimensions_enabled() ) {

                $length_custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_shipping_dimensions', 'no' ) ) ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Length is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_length',
                        array(
                            'post_id'           => $post_id,
                            'id'                => '_length',
                            'label'             => __( 'Dimensions', 'wc-vendors' ) . ' (' . get_option( 'woocommerce_dimension_unit' ) . ')',
                            'placeholder'       => __( 'Length', 'wc-vendors' ),
                            'type'              => 'text',
                            'data_type'         => 'decimal',
                            'wrapper_start'     => '<div class="wcv-cols-group wcv-horizontal-gutters wcv-cols-group-medium"><div class="all-33">',
                            'wrapper_end'       => '</div>',
                            'desc_tip'          => true,
                            'description'       => __( 'Dimensions in decimal form.', 'wc-vendors' ),
                            'custom_attributes' => $length_custom_attributes,
                        )
                    )
                );

                $width_custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_shipping_dimensions', 'no' ) ) ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Width is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_width',
                        array(
                            'post_id'           => $post_id,
                            'id'                => '_width',
                            'placeholder'       => __( 'Width', 'wc-vendors' ),
                            'type'              => 'text',
                            'data_type'         => 'decimal',
                            'wrapper_start'     => '<div class="all-33">',
                            'wrapper_end'       => '</div>',
                            'custom_attributes' => $width_custom_attributes,
                        )
                    )
                );

                $height_custom_attributes = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_shipping_dimensions', 'no' ) ) ? array(
                    'required'                   => '',
                    'data-parsley-error-message' => __( 'Height is required.', 'wc-vendors' ),
                ) : array();

                WCV_Form_Helper::input(
                    apply_filters(
                        'wcv_product_height',
                        array(
                            'post_id'           => $post_id,
                            'id'                => '_height',
                            'placeholder'       => __( 'Height', 'wc-vendors' ),
                            'type'              => 'text',
                            'data_type'         => 'decimal',
                            'wrapper_start'     => '<div class="all-33">',
                            'wrapper_end'       => '</div></div>',
                            'custom_attributes' => $height_custom_attributes,
                        )
                    )
                );
            }
        }
    }

    /**
     *  Output shipping class details
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     * @version  2.5.2
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function shipping_class( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_shipping_shipping_class', 'no' ) ) ) {

            $custom_attributes = ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_shipping_shipping_class' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Shipping class is required.', 'wc-vendors' ),
            ) : array();
            $classes           = ( $post_id ) ? get_the_terms( $post_id, 'product_shipping_class' ) : '';

            if ( $classes && ! is_wp_error( $classes ) ) {
                $current_shipping_class = current( $classes )->term_id;
            } else {
                $current_shipping_class = '';
            }

            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_shipping_classes',
                    array(
                        'post_id'          => $post_id,
                        'class'            => 'select',
                        'id'               => 'product_shipping_class',
                        'label'            => __( 'Shipping class', 'wc-vendors' ),
                        'show_option_none' => __( 'No shipping class', 'wc-vendors' ),
                        'value'            => $current_shipping_class,
                        'taxonomy'         => 'product_shipping_class',
                        'taxonomy_field'   => 'term_id',
                        'desc_tip'         => true,
                        'description'      => __( 'Shipping classes are used by certain shipping methods to group similar products.', 'wc-vendors' ),
                        'taxonomy_args'    => array(
                            'hide_empty' => 0,
                        ),
                        'no_margin'        => true,
                    )
                )
            );

        }
    }

    /**
     *  Output upsell select2
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function up_sells( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_upsells_up_sells', 'no' ) ) ) {

            $product_ids = array_filter( array_map( 'absint', (array) get_post_meta( $post_id, '_upsell_ids', true ) ) );
            $upsell_ids  = array();
            foreach ( $product_ids as $product_id ) {
                $product = wc_get_product( $product_id );
                if ( is_object( $product ) ) {
                    $upsell_ids[ $product_id ] = wp_kses_post( html_entity_decode( $product->get_formatted_name() ) );
                }
            }

            $required_field = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_upsells_up_sells', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Please select a product.', 'wc-vendors' ),
            ) : array();

            $custom_attributes = array(
                'data-placeholder' => __( 'Search for a product&hellip;', 'wc-vendors' ),
                'data-action'      => 'wcv_json_search_products',
            );

            $custom_attributes = array_merge( $custom_attributes, $required_field );

            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_upsells',
                    array(
                        'id'                => 'upsell_ids',
                        'label'             => __( 'Up-Sells', 'wc-vendors' ),
                        'value'             => implode( ',', array_keys( $upsell_ids ) ),
                        'style'             => 'width: 100%;',
                        'class'             => 'wc-product-search',
                        'desc_tip'          => false, // tool tip messes with styling of drop down.
                        'description'       => __( 'Up-sells are products which you recommend instead of the currently viewed product, for example, products that are more profitable or better quality or more expensive.', 'wc-vendors' ),
                        'multiple'          => true,
                        'options'           => $upsell_ids,
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );
        }
    }

    /**
     *  Output crosssell select2
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function crosssells( $post_id ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_upsells_crosssells', 'no' ) ) ) {

            $product_ids   = array_filter( array_map( 'absint', (array) get_post_meta( $post_id, '_crosssell_ids', true ) ) );
            $crosssell_ids = array();

            foreach ( $product_ids as $product_id ) {
                $product = wc_get_product( $product_id );
                if ( is_object( $product ) ) {
                    $crosssell_ids[ $product_id ] = wp_kses_post( html_entity_decode( $product->get_formatted_name() ) );
                }
            }

            $required_field = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_required_product_upsells_crosssells', 'no' ) ) ? array(
                'required'                   => '',
                'data-parsley-error-message' => __( 'Please select a product.', 'wc-vendors' ),
            ) : array();

            $custom_attributes = array(
                'data-placeholder' => __( 'Search for a product&hellip;', 'wc-vendors' ),
                'data-action'      => 'wcv_json_search_products',
            );

            $custom_attributes = array_merge( $custom_attributes, $required_field );

            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_crosssells',
                    array(
                        'id'                => 'crosssell_ids',
                        'label'             => __( 'Cross-Sells', 'wc-vendors' ),
                        'value'             => implode( ',', array_keys( $crosssell_ids ) ),
                        'style'             => 'width: 100%;',
                        'class'             => 'wc-product-search',
                        'desc_tip'          => false, // tool tip messes with styling of drop down.
                        'description'       => __( 'Cross-sells are products which you promote in the cart, based on the current product.', 'wc-vendors' ),
                        'custom_attributes' => $custom_attributes,
                        'multiple'          => true,
                        'options'           => $crosssell_ids,
                        'no_margin'         => true,
                    )
                )
            );
        }
    }

    /**
     *  Output grouped_products select2
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int    $post_id post_id for this meta if any.
     * @param     object $product product object.
     */
    public static function grouped_products( $post_id, $product = false ) {

        if ( ! wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_upsells_grouped_products', 'no' ) ) ) {

            $product_object = $post_id ? wc_get_product( $post_id ) : new \WC_Product();
            $product_ids    = $product_object->is_type( 'grouped' ) ? $product_object->get_children( 'edit' ) : array();

            $grouped_products = array();

            foreach ( $product_ids as $product_id ) {
                $product = wc_get_product( $product_id );
                if ( is_object( $product ) ) {
                    $grouped_products[ $product_id ] = wp_kses_post( html_entity_decode( $product->get_formatted_name() ) );
                }
            }

            $custom_attributes = array(
                'data-placeholder' => __( 'Search for a product&hellip;', 'wc-vendors' ),
                'data-action'      => 'wcv_json_search_products',
            );

            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_product_grouped_products',
                    array(
                        'id'                => 'grouped_products',
                        'label'             => __( 'Grouped products', 'wc-vendors' ),
                        'value'             => implode( ',', array_keys( $grouped_products ) ),
                        'style'             => 'width: 100%;',
                        'class'             => 'wc-product-search',
                        'desc_tip'          => false, // tool tip messes with styling of drop down.
                        'description'       => __( 'This lets you choose which products are part of this group.', 'wc-vendors' ),
                        'multiple'          => true,
                        'options'           => $grouped_products,
                        'custom_attributes' => $custom_attributes,
                    )
                )
            );

        }
    }

    /**
     * Get product meta tabs for new accordion layout
     *
     * @since 2.5.4
     *
     * @return array $product_meta_tabs Array of product meta tabs.
     */
    public static function get_product_meta_tabs() {
        $wcv_product_panel = get_option( 'wcvendors_capability_product_data_tabs', array() );
        $product_meta_tabs = array(
            'general'        => array(
                'label'  => __( 'General', 'wc-vendors' ),
                'target' => 'general',
                'class'  => array( 'hide_if_grouped', 'show_if_downloadable_auction' ),
            ),
            'inventory'      => array(
                'label'  => __( 'Inventory', 'wc-vendors' ),
                'target' => 'inventory',
                'class'  => array( 'show_if_simple', 'show_if_variable', 'show_if_grouped', 'show_if_external', 'show_if_auction' ),
            ),
            'shipping'       => array(
                'label'  => __( 'Shipping', 'wc-vendors' ),
                'target' => 'shipping',
                'class'  => array( 'hide_if_virtual', 'hide_if_grouped', 'hide_if_external' ),
            ),
            'linked_product' => array(
                'label'  => __( 'Linked Products', 'wc-vendors' ),
                'target' => 'linked_product',
                'class'  => array(),
            ),
            'attributes'     => array(
                'label'  => __( 'Attributes', 'wc-vendors' ),
                'target' => 'attributes',
                'class'  => array(),
            ),
            'advanced'       => array(
                'label'  => __( 'Advanced', 'wc-vendors' ),
                'target' => 'advanced',
                'class'  => array(),
            ),
            'seo'            => array(
                'label'  => __( 'SEO', 'wc-vendors' ),
                'target' => 'seo',
                'class'  => array(),
            ),
            'variations'     => array(
                'label'  => __( 'Variations', 'wc-vendors' ),
                'target' => 'variations',
                'class'  => array( 'show_if_variable' ),
            ),
        );

        foreach ( $wcv_product_panel as $panel ) {

            if ( array_key_exists( $panel, $product_meta_tabs ) ) {
                unset( $product_meta_tabs[ $panel ] );
            }
        }

        // Disable inventory tab if stock management is disabeld at the WooCommerce level.
        if ( 'no' === get_option( 'woocommerce_manage_stock' ) ) {
            unset( $product_meta_tabs['inventory'] );
        }

        // Hide Shipping tab if WooCommerce shipping is disabled globally.
        $show_shipping = apply_filters( 'wcvendors_show_product_shipping_tab', wc_shipping_enabled() );
        if ( ! $show_shipping ) {
            unset( $product_meta_tabs['shipping'] );
        }

        // Hide Linked Product tab if it's set to hidden.
        if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_upsells_up_sells', 'no' ) ) && wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_upsells_crosssells', 'no' ) ) && wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_upsells_grouped_products', 'no' ) ) ) {
            unset( $product_meta_tabs['linked_product'] );
        }

        // Hide SEO tab if it's set to hidden.
        if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_seo', 'no' ) ) ) {
            unset( $product_meta_tabs['seo'] );
        }

        // Hide Advanced tab if it's set to hidden.
        if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_advanced_purchase_notes', 'no' ) ) && wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_advanced_product_order', 'no' ) ) ) {
            unset( $product_meta_tabs['advanced'] );
        }

        // Hide Attributes tab if it's set to hidden.
        if ( wc_string_to_bool( wcv_get_pro_option( 'wcvendors_hide_product_basic_attributes', 'no' ) ) ) {
            unset( $product_meta_tabs['attribute'] );
            unset( $product_meta_tabs['variations'] );
        }

        $tabs = apply_filters( 'wcv_product_meta_tabs', $product_meta_tabs );
        if ( isset( $tabs['simple_auction'] ) ) {
            $tabs['auction'] = $tabs['simple_auction'];
            unset( $tabs['simple_auction'] );
        }
        return $tabs;
    }

    /**
     *  Output Product meta tab information
     *
     * @version 2.5.2
     * @version 2.5.2 - Addressed issue with WooCommerce shipping detection
     */
    public static function product_meta_tabs() {

        $css_classes      = apply_filters( 'wcv_product_meta_tabs_class', array( 'tabs-nav' ) );
        $shipping_methods = WC()->shipping() ? WC()->shipping->load_shipping_methods() : array();

        $product_meta_tabs = self::get_product_meta_tabs();

        $css_class = implode( ' ', $css_classes );

        include wcv_deprecated_filter( 'wcvendors_pro_product_form_product_meta_tabs_path', '2.5.2', 'wcvendors_product_form_product_meta_tabs_path', 'partials/wcvendors-product-meta-tabs.php' );
    } //product_meta_tabs

    /**
     *  Output product variations
     *
     * @since    2.5.2
     * @since    2.6.2 - Updated to use wcv_get_pro_option for pro feature checks
     *
     * @param     int $post_id post_id for this meta if any.
     */
    public static function product_variations( $post_id ) {

        global $wpdb;

        // Get attributes.
        $attributes = maybe_unserialize( get_post_meta( $post_id, '_product_attributes', true ) );

        $basic_options     = (array) wcv_get_pro_option( 'wcvendors_hide_product_basic', array() );
        $media_options     = (array) wcv_get_pro_option( 'wcvendors_hide_product_media', array() );
        $general_options   = (array) wcv_get_pro_option( 'wcvendors_hide_product_general', array() );
        $inventory_options = (array) wcv_get_pro_option( 'wcvendors_hide_product_inventory', array() );
        $shipping_options  = (array) wcv_get_pro_option( 'wcvendors_hide_product_shipping', array() );
        $upsell_options    = (array) wcv_get_pro_option( 'wcvendors_hide_product_upsells', array() );

        // See if any are set.
        $variation_attribute_found = false;

        if ( $attributes ) {
            foreach ( $attributes as $attribute ) {
                if ( ! empty( $attribute['is_variation'] ) ) {
                    $variation_attribute_found = true;
                    break;
                }
            }
        }

        $variations_count = absint( $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(ID) FROM $wpdb->posts WHERE post_parent = %d AND post_type = 'product_variation' AND post_status IN ('publish', 'private')", $post_id ) ) );

        include_once wcv_deprecated_filter( 'wcvendors_pro_product_form_product_variations_path', '2.5.2', 'wcvendors_product_form_product_variations_path', 'partials/wcvendors-product-variations.php' );
    }

    /**
     * Product SEO
     *
     * @param int $product_id Product ID.
     *
     * @return void
     * @since 2.5.2
     */
    public static function product_seo( $product_id ) {

        $hide_seo = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo', 'no' ) );

        if ( ! $hide_seo ) {

            if ( $product_id ) {
                $seo_title       = get_post_meta( $product_id, 'wcv_product_seo_title', true );
                $seo_description = get_post_meta( $product_id, 'wcv_product_seo_description', true );
                $seo_keywords    = get_post_meta( $product_id, 'wcv_product_seo_keywords', true );

                $seo_opengraph    = get_post_meta( $product_id, 'wcv_product_seo_opengraph', true );
                $seo_twitter_card = get_post_meta( $product_id, 'wcv_product_seo_twitter_card', true );

                $product = wc_get_product( $product_id );

                $seo_title       = empty( $seo_title ) ? wcv_strip_html( $product->get_title() ) : wcv_strip_html( $seo_title );
                $seo_description = empty( $seo_description ) ? wcv_strip_html( substr( $product->get_description(), 0, apply_filters( 'wcv_seo_description_length', 155 ) ) ) : wcv_strip_html( $seo_description );

                if ( ! $seo_keywords && is_a( $product, 'WC_Product' ) ) {
                    $categories   = wcv_strip_html( wc_get_product_category_list( $product->get_id() ) );
                    $seo_keywords = ! empty( $categories ) ? $categories : '';
                }
            } else {
                $seo_title        = '';
                $seo_description  = '';
                $seo_keywords     = '';
                $seo_opengraph    = false;
                $seo_twitter_card = false;
            }

            include_once wcv_deprecated_filter( 'wcvendors_pro_product_seo_form', '2.5.2', 'wcvendors_product_seo_form', 'partials/wcvendors-product-seo.php' );
        }
    }

    /**
     *  Output advanced purchase note field
     *
     * @since    2.5.2
     * @param    int $product_id product_id for this meta if any.
     */
    public static function product_advanced_purchase_note( $product_id ) {
        if ( 'yes' !== get_option( 'wcvendors_hide_product_advanced_purchase_notes', 'no' ) ) {
            if ( $product_id ) {
                $product_purchase_note = get_post_meta( $product_id, '_purchase_note', true );
                $product_purchase_note = ! empty( $product_purchase_note ) ? wcv_strip_html( $product_purchase_note ) : '';
            } else {
                $product_purchase_note = '';
            }

            WCV_Form_Helper::textarea(
                apply_filters(
                    'wcvendors_product_advanced_purchase_note_field',
                    array(
                        'id'            => '_purchase_note',
                        'label'         => __( 'Purchase Note', 'wc-vendors' ),
                        'placeholder'   => __( 'Purchase Note', 'wc-vendors' ),
                        'type'          => 'text',
                        'value'         => $product_purchase_note,
                        'wrapper_start' => '<div class="all-100 small-100">',
                        'wrapper_end'   => '</div>',
                        'rows'          => '4',
                    )
                )
            );
        }
    }

    /**
     *  Output advanced menu order field
     *
     * @since    2.5.2
     * @param    int $product_id product_id for this meta if any.
     */
    public static function product_advanced_menu_order( $product_id ) {
        if ( 'yes' !== get_option( 'wcvendors_hide_product_advanced_product_order', 'no' ) ) {
            if ( $product_id ) {
                $product            = wc_get_product( $product_id );
                $product_menu_order = $product->get_menu_order();
                $product_menu_order = ! empty( $product_menu_order ) ? wcv_strip_html( $product_menu_order ) : 0;
            } else {
                $product_menu_order = 0;
            }

            WCV_Form_Helper::input(
                apply_filters(
                    'wcvendors_product_advanced_menu_order_field',
                    array(
                        'id'            => 'menu_order',
                        'label'         => __( 'Product Sort Order', 'wc-vendors' ),
                        'placeholder'   => __( 'Product Sort Order', 'wc-vendors' ),
                        'type'          => 'text',
                        'desc_tip'      => true,
                        'description'   => __( 'Custom ordering the products on your store', 'wc-vendors' ),
                        'value'         => $product_menu_order,
                        'wrapper_start' => '<div class="all-100 small-100">',
                        'wrapper_end'   => '</div>',
                    )
                )
            );
        }
    }

    /**
     * Format AI review data for display.
     *
     * @param string|array $ai_review_raw Raw AI review data (serialized or array).
     *
     * @return array Formatted AI review data.
     */
    public static function format_ai_review( $ai_review_raw ) {
        // Use shared helper function with HTML sanitization enabled (for frontend display).
        return wcv_format_ai_review( $ai_review_raw, true, false );
    }

    /**
     * Display AI review suggestions.
     *
     * @param int $product_id Product ID.
     *
     * @return void
     */
    public static function ai_review_suggestions( $product_id ) {
        if ( ! $product_id ) {
            return;
        }

        $product = wc_get_product( $product_id );
        if ( ! $product ) {
            return;
        }

        // Only show suggestions if admin has requested changes with suggestions.
        $show_suggestions = $product->get_meta( '_wcv_show_ai_suggestions' );
        if ( 'yes' !== $show_suggestions ) {
            return;
        }

        // Get AI review from product meta.
        $ai_review_raw = $product->get_meta( '_saai_vendors_product_moderation_result' );
        if ( empty( $ai_review_raw ) ) {
            return;
        }

        $ai_review = self::format_ai_review( $ai_review_raw );

        // Get vendor feedback from AI review.
        $vendor_feedback = ! empty( $ai_review['vendor_feedback'] ) ? $ai_review['vendor_feedback'] : '';

        // Only show if there are suggestions or vendor feedback.
        $has_suggestions = ! empty( $ai_review['suggestions'] ) && is_array( $ai_review['suggestions'] );
        if ( ! $has_suggestions && empty( $vendor_feedback ) ) {
            return;
        }

        ?>
        <div class="wcv-ai-review-suggestions wcv-gap-bottom">
            <div class="control-group no-margin">
                <label class="wcv-ai-review-suggestions-title" onclick="jQuery(this).next('.wcv-ai-review-suggestions-content').slideToggle(); jQuery(this).find('.wcv-ai-review-toggle-icon').toggleClass('wcv-collapsed');">
                    <?php esc_html_e( 'Review Suggestions', 'wc-vendors' ); ?>
                    <span class="wcv-ai-review-toggle-icon wcv-collapsed">
                        <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-caret-down' ), wcv_allowed_html_tags() ); ?>
                    </span>
                </label>
                <div class="wcv-ai-review-suggestions-content" style="display: none;">
                    <?php if ( ! empty( $vendor_feedback ) ) : ?>
                        <div class="wcv-ai-review-vendor-feedback">
                            <div class="wcv-ai-review-note-text">
                                <?php echo wp_kses_post( $vendor_feedback ); ?>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ( $has_suggestions ) : ?>
                        <div class="wcv-ai-review-suggestions-list">
                            <?php foreach ( $ai_review['suggestions'] as $index => $suggestion ) : ?>
                                <div class="wcv-ai-review-suggestion-item">
                                    <div class="wcv-ai-review-suggestion-field">
                                        <strong><?php echo esc_html( str_replace( '_', ' ', $suggestion['field'] ) ); ?></strong>
                                    </div>
                                    <div class="wcv-ai-review-suggestion-text">
                                        <?php echo wp_kses_post( $suggestion['suggestion'] ); ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <?php
    }
}
