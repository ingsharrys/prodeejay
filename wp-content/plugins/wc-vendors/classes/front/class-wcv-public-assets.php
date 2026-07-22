<?php
/**
 * The WCV Public Assets class.
 *
 * This is the public assets class for all public assets.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 */

namespace WC_Vendors\Classes\Front;

use WC_Vendors;

use function WC_Vendors\Classes\Includes\wcv_is_vendors_shipping_enabled;
/**
 * Hanldes the public assets
 */
class WCV_Public_Assets {

    /**
     * Base URL
     *
     * @var string $base_url The base URL.
     */
    private static $base_url;

    /**
     * Version
     *
     * @var string $version The version.
     */
    private static $version;

    /**
     * Suffix
     *
     * @var string $suffix The suffix.
     */
    private static $suffix;

    /**
     * Instance
     *
     * @var WCV_Public_Assets $instance The instance.
     */
    private static $instance;


    /**
     * Get instance
     */
    public static function get_instance() {
        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof WCV_Public_Assets ) ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        self::$base_url = WCV_ASSETS_URL;
        self::$version  = WCV_VERSION;
        self::$suffix   = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
        add_filter( 'script_loader_tag', array( $this, 'dequeue_script' ), 10, 2 );
    }

    /**
     * Enqueue styles
     */
    public static function enqueue_styles() {
        global $post;
        $is_dashboard_page   = ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_dashboard_nav' ) ) || ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_vendor_dashboard' ) )
        || ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_pro_dashboard_nav' ) ) || ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_pro_dashboard' ) );
        $is_dashboard_page   = apply_filters( 'wcvendors_enqueue_style_is_dashboard_page', $is_dashboard_page );
        $is_vendor_list_page = is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_vendorslist' );
        $is_vendor_list_page = apply_filters( 'wcvendors_enqueue_style_is_vendor_list_page', $is_vendor_list_page );

        wcv_enqueue_style(
            'wcv_frontend_style',
            WCV_ASSETS_URL . 'css/wcv-frontend.css',
            array( 'dashicons' ),
            WCV_VERSION,
            'all',
            $is_dashboard_page || $is_vendor_list_page
        );

        wcv_enqueue_style(
            'parsley-style',
            self::$base_url . 'lib/parsley/parsley.css',
            array(),
            self::$version,
            'all',
            $is_dashboard_page
        );

        // Ink system.
        wcv_enqueue_style(
            'wcv-ink',
            wcv_deprecated_filter( 'wcv_pro_ink_style', '2.5.2', 'wcv_ink_style', self::$base_url . 'lib/ink-3.1.10/dist/css/ink.min.css' ),
            array(),
            '3.1.10',
            'all',
            $is_dashboard_page
        );

        // Flatpickr flatpickr.min.css.
        wcv_enqueue_style(
            'wcv-datetimepicker-flatpickr-style',
            self::$base_url . 'lib/flatpickr/flatpickr.min.css',
            array(),
            self::$version,
            'all',
            $is_dashboard_page
        );

        wp_enqueue_style( 'select2' );
        // SVG Icon Styles.
        wcv_enqueue_style(
            'wcv-icons',
            self::$base_url . 'css/wcv-icons' . self::$suffix . '.css',
            array(),
            WCV_VERSION,
            'all',
            $is_dashboard_page
        );

        // Dashboard Style.
        wcv_enqueue_style(
            'wcv-dashboard',
            wcv_deprecated_filter( 'wcv_pro_dashboard_style', '2.5.2', 'wcv_dashboard_style', self::$base_url . 'css/dashboard.css' ),
            array( 'wcv-ink' ),
            self::$version,
            'all',
            $is_dashboard_page && is_user_logged_in()
        );
    }

    /**
     * Enqueue scripts
     *
     * @since 2.6.7 - Changed from get_option to wcv_get_pro_option.
     */
    public static function enqueue_scripts() {
        global $post;
        $file_display            = wcv_get_pro_option( 'wcvendors_file_display', '' );
        $category_limit          = wcv_get_pro_option( 'wcvendors_category_limit', '' );
        $tag_limit               = wcv_get_pro_option( 'wcvendors_tag_limit', '' );
        $tag_separator           = wcv_get_pro_option( 'wcvendors_tag_separator', '' );
        $shipping_method_enabled = wcv_is_vendors_shipping_enabled();
        $select2_handle          = wcv_get_select2_script_handle();

        $is_dashboard_page = ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_dashboard_nav' ) ) || ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_vendor_dashboard' ) )
        || ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_pro_dashboard_nav' ) ) || ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'wcv_pro_dashboard' ) );
        $is_dashboard_page = apply_filters( 'wcvendors_enqueue_script_is_dashboard_page', $is_dashboard_page );
        // Parsley JS - http://parsleyjs.org/.
        wcv_enqueue_script(
            'parsley',
            self::$base_url . '/lib/parsley/parsley' . self::$suffix . '.js',
            array( 'jquery' ),
            '2.8.1',
            true,
            array(),
            $is_dashboard_page
        );

        if ( $is_dashboard_page ) {
            wp_enqueue_media();
            wp_enqueue_script( 'jquery-ui-core' );
            wp_enqueue_script( 'jquery-ui-sortable' );
            wp_enqueue_script( 'jquery-ui-datepicker' );
            wp_enqueue_script( 'jquery-ui-slider' );
        }

        wcv_enqueue_script( 'ink-js', self::$base_url . 'lib/ink-3.1.10/dist/js/ink-all.js', array(), '1.11.4', true, array(), $is_dashboard_page );

        // Ink autoloader.
        wcv_enqueue_script( 'ink-autoloader-js', self::$base_url . 'lib/ink-3.1.10/dist/js/autoload.js', array( 'jquery' ), '1.11.4', true, array(), $is_dashboard_page );

        // Chart colors.
        $chartjs_colors = array(

            'use_random'                                => apply_filters( 'wwcv_order_totals_use_random_colors', get_option( 'wcv_order_totals_chart_use_random_colors' ) ),
            'fill_color'                                => apply_filters( 'wcv_order_totals_fill_color', get_option( 'wcv_order_totals_chart_fill_color' ) ),
            'stroke_color'                              => apply_filters( 'wcv_order_totals_stroke_color', get_option( 'wcv_order_totals_chart_stroke_color' ) ),
            'hover_fill_color'                          => apply_filters( 'wcv_order_totals_hover_fill_color', get_option( 'wcv_order_totals_chart_hover_fill_color' ) ),
            'hover_stroke_color'                        => apply_filters( 'wcv_order_totals_hover_stroke_color', get_option( 'wcv_order_totals_chart_hover_stroke_color' ) ),

            // Opaciy settings.
            'fill_opacity'                              => apply_filters( 'wcv_order_totals_fill_opacity', get_option( 'wcv_order_totals_chart_fill_opacity' ) ),
            'stroke_opacity'                            => apply_filters( 'wcv_order_totals_stroke_opacity', get_option( 'wcv_order_totals_chart_stroke_opacity' ) ),
            'highlight_fill_opacity'                    => apply_filters( 'wcv_order_totals_hover_fill_opacity', get_option( 'wcv_order_totals_chart_hover_fill_opacity' ) ),
            'highlight_stroke_opacity'                  => apply_filters( 'wcv_order_totals_hover_stroke_opacity', get_option( 'wcv_order_totals_chart_hover_stroke_opacity' ) ),

            // Product Totals.
            'wcv_product_totals_chart_base_fill_color'  => apply_filters( 'wcv_product_totals_chart_base_fill_color', get_option( 'wcv_product_totals_chart_base_fill_color' ) ),

            'wcv_product_totals_chart_base_hover_color' => apply_filters( 'wcv_product_totals_chart_base_hover_color', get_option( 'wcv_product_totals_chart_base_hover_color' ) ),
            'pie_use_random_colors'                     => apply_filters( 'wcv_product_totals_chart_use_random_colors', get_option( 'wcv_product_totals_chart_use_random_colors', 'no' ) ),
            'is_pro_active'                             => is_wcv_pro_active(),

        );
        // ChartJS 4.4.4.
        wcv_enqueue_script(
            'chartjs',
            self::$base_url . 'lib/chartjs/Chart.min.js',
            array( 'jquery' ),
            '4.4.4',
            true,
            array(
                'chartjs_colors' => $chartjs_colors,
            ),
            $is_dashboard_page
        );

        // WCV chart init.
        wcv_enqueue_script(
            'wcvendors-charts',
            self::$base_url . 'js/wcvendors-charts' . self::$suffix . '.js',
            array( 'chartjs' ),
            self::$version,
            true,
            array(
                'chartjs_colors' => $chartjs_colors,
                'chart_i18n'     => array(
                    'total_orders_text' => __( 'Total Orders', 'wc-vendors' ),
                ),
            ),
            $is_dashboard_page
        );

        $datepicker_localization = self::get_datepicker_localization();
        // Load datepicker flatpickr.
        wcv_enqueue_script(
            'wcv-flatpickr',
            self::$base_url . 'lib/flatpickr/flatpickr.js',
            array(),
            self::$version,
            true,
            array(),
            $is_dashboard_page
        );

        wcv_enqueue_script(
            'wcv-datetime-picker',
            self::$base_url . 'js/datetime-picker' . self::$suffix . '.js',
            array( 'wcv-flatpickr' ),
            self::$version,
            true,
            array( 'wcv_datepicker' => $datepicker_localization ),
            $is_dashboard_page
        );

        // Product Edit.
        $product_params = array(
            'ajax_url'                       => admin_url( 'admin-ajax.php' ),
            'assets_url'                     => WCV_ASSETS_URL,
            'product_types'                  => array_map(
                'sanitize_title',
                get_terms(
                    array(
                        'taxonomy'   => 'product_type',
                        'hide_empty' => false,
                        'fields'     => 'names',
                    )
                )
            ),
            'wcv_add_attribute_nonce'        => wp_create_nonce( 'wcv-add-attribute' ),
            'wcv_add_new_attribute_nonce'    => wp_create_nonce( 'wcv-add-new-attribute' ),
            'remove_attribute'               => __( 'Remove this attribute?', 'wc-vendors' ),
            'name_label'                     => __( 'Name', 'wc-vendors' ),
            'remove_label'                   => __( 'Remove', 'wc-vendors' ),
            'click_to_toggle'                => __( 'Click to toggle', 'wc-vendors' ),
            'values_label'                   => __( 'Value(s)', 'wc-vendors' ),
            'text_attribute_tip'             => __( 'Enter some text, or some attributes by pipe (|) separating values.', 'wc-vendors' ),
            'visible_label'                  => __( 'Visible on the product page', 'wc-vendors' ),
            'used_for_variations_label'      => __( 'Used for variations', 'wc-vendors' ),
            'new_attribute_prompt'           => __( 'Enter a name for the new attribute term:', 'wc-vendors' ),
            'wc_deliminator'                 => \WC_DELIMITER,
            'wcv_file_display'               => $file_display,
            'mime_types'                     => array_keys( wp_get_mime_types() ),
            'category_limit'                 => $category_limit,
            'tag_limit'                      => $tag_limit,
            'category_limit_msg'             => apply_filters(
                'wcv_category_limit_msg',
                sprintf(
                // translators: %s is the max number of categories the user can select.
                    __( 'You can only select %s categories', 'wc-vendors' ),
                    $category_limit
                )
            ),
            'require_featured_image'         => wc_string_to_bool( get_option( 'wcvendors_required_product_media_featured', 'no' ) ),
            'require_featured_image_msg'     => apply_filters( 'wcv_require_featured_image_msg', __( 'Featured image is required.', 'wc-vendors' ) ),
            'require_gallery_image'          => wc_string_to_bool( get_option( 'wcvendors_required_product_media_gallery', 'no' ) ),
            'require_gallery_image_msg'      => apply_filters( 'wcv_require_featured_image_msg', __( 'A gallery image is required.', 'wc-vendors' ) ),
            'require_category'               => wc_string_to_bool( get_option( 'wcvendors_required_product_basic_categories', 'no' ) ),
            'require_category_msg'           => apply_filters( 'wcv_require_category_msg', __( 'A category is required.', 'wc-vendors' ) ),
            'require_download_file'          => wc_string_to_bool( get_option( 'wcvendors_required_product_general_download_files', 'no' ) ),
            'require_download_file_msg'      => apply_filters( 'wcv_required_download_file_msg', __( 'A download file is required.', 'wc-vendors' ) ),
            'require_attributes'             => wc_string_to_bool( get_option( 'wcvendors_required_product_basic_attributes', 'no' ) ),
            'require_attributes_msg'         => apply_filters( 'wcv_require_attributes_msg', __( 'An attribute is required.', 'wc-vendors' ) ),
            'select2_errorLoading'           => __( 'The results could not be loaded.', 'wc-vendors' ),
            'select2_loadingMore'            => __( 'Loading more results…', 'wc-vendors' ),
            'select2_maximumSelected_single' => sprintf(
                // translators: %s is the minimum number of categories the user can select.
                __( 'You can only select %s category', 'wc-vendors' ),
                $category_limit
            ),
            'select2_maximumSelected_plural' => sprintf(
                // translators: %s is the maximum number of categories the user can select.
                __( 'You can only select %s categories', 'wc-vendors' ),
                $category_limit
            ),
            'select2_noResults'              => __( 'No results found', 'wc-vendors' ),
            'select2_searching'              => __( 'Searching…', 'wc-vendors' ),
            'select2_removeAllItems'         => __( 'Remove all items', 'wc-vendors' ),
            'shipping_system_enabled'        => ! is_wcv_pro_active() ? true : $shipping_method_enabled,
            'is_demensions_required'         => wc_string_to_bool( get_option( 'wcvendors_required_product_shipping_dimensions', 'no' ) ),
        );

        wcv_enqueue_script( 'wcv-frontend-product', self::$base_url . '/js/product' . self::$suffix . '.js', array( 'jquery-ui-core', $select2_handle ), WCV_VERSION, true, array( 'wcv_frontend_product' => $product_params ), $is_dashboard_page );
        // Product Variation.
        $product_variation_params = array(
            'ajax_url'                            => admin_url( 'admin-ajax.php' ),
            'wcv_add_variation_nonce'             => wp_create_nonce( 'wcv-add-variation' ),
            'wcv_link_variation_nonce'            => wp_create_nonce( 'wcv-link-variations' ),
            'wcv_delete_variations_nonce'         => wp_create_nonce( 'wcv-delete-variations' ),
            'wcv_json_link_all_variations_nonce'  => wp_create_nonce( 'wcv-link-all-variations' ),
            'wcv_load_variations_nonce'           => wp_create_nonce( 'wcv-load-variations' ),
            'wcv_bulk_edit_variations_nonce'      => wp_create_nonce( 'wcv-bulk-edit-variations' ),
            'wcv_woocommerce_placeholder_img_src' => wc_placeholder_img_src(),
            'wc_deliminator'                      => \WC_DELIMITER,
            'i18n_link_all_variations'            => esc_js( __( 'Are you sure you want to link all variations? This will create a new variation for each and every possible combination of variation attributes (max 50 per run).', 'wc-vendors' ) ),
            'i18n_enter_a_value'                  => esc_js( __( 'Enter a value', 'wc-vendors' ) ),
            'i18n_enter_menu_order'               => esc_js( __( 'Variation menu order (determines position in the list of variations)', 'wc-vendors' ) ),
            'i18n_enter_a_value_fixed_or_percent' => esc_js( __( 'Enter a value (fixed or %)', 'wc-vendors' ) ),
            'i18n_delete_all_variations'          => esc_js( __( 'Are you sure you want to delete all variations? This cannot be undone.', 'wc-vendors' ) ),
            'i18n_last_warning'                   => esc_js( __( 'Last warning, are you sure?', 'wc-vendors' ) ),
            'i18n_choose_image'                   => esc_js( __( 'Choose an image', 'wc-vendors' ) ),
            'i18n_set_image'                      => esc_js( __( 'Set variation image', 'wc-vendors' ) ),
            'i18n_variation_added'                => esc_js( __( 'variation added', 'wc-vendors' ) ),
            'i18n_variations_added'               => esc_js( __( 'variations added', 'wc-vendors' ) ),
            'i18n_no_variations_added'            => esc_js( __( 'No variations added', 'wc-vendors' ) ),
            'i18n_remove_variation'               => esc_js( __( 'Are you sure you want to remove this variation?', 'wc-vendors' ) ),
            'i18n_scheduled_sale_start'           => esc_js( __( 'Sale start date (YYYY-MM-DD format or leave blank)', 'wc-vendors' ) ),
            'i18n_scheduled_sale_end'             => esc_js( __( 'Sale end date (YYYY-MM-DD format or leave blank)', 'wc-vendors' ) ),
            'i18n_edited_variations'              => esc_js( __( 'Save changes before changing page?', 'wc-vendors' ) ),
            'i18n_variation_count_single'         => esc_js( __( '%qty% variation', 'wc-vendors' ) ),
            'i18n_variation_count_plural'         => esc_js( __( '%qty% variations', 'wc-vendors' ) ),
            'i18n_any_label'                      => esc_js( __( 'Any', 'wc-vendors' ) ),
            'variations_per_page'                 => absint( apply_filters( 'woocommerce_admin_meta_boxes_variations_per_page', 15 ) ),
            'variation_actions_placeholder'       => esc_js( __( 'Select action', 'wc-vendors' ) ),
        );

        $product_id = get_query_var( 'object_id' );

        if ( $product_id ) {
            $product = wc_get_product( $product_id );
            if ( is_a( $product, 'WC_Product' ) && 'variable' === $product->get_type() ) {
                $product_attrs   = $product->get_attributes( 'edit' );
                $formatted_attrs = array();

                foreach ( $product_attrs as $attribute ) {
                    if ( $attribute->is_taxonomy() ) {
                        $taxonomy = $attribute->get_taxonomy_object();
                        $terms    = wp_get_post_terms( $product_id, $attribute->get_name(), array( 'fields' => 'all' ) );

                        $values = array();
                        foreach ( $terms as $term ) {
                            $values[ $term->slug ] = $term->name;
                        }

                        $label = isset( $taxonomy->labels->singular_name ) ? $taxonomy->labels->singular_name : $attribute->get_name();

                        $formatted_attrs[ $attribute->get_name() ] = array(
                            'values'   => $values,
                            'position' => $attribute->get_position(),
                            'name'     => $attribute->get_name(),
                            'label'    => $label,
                        );
                    } else {
                        $values = $attribute->get_options();
                        if ( is_array( $values ) ) {
                            $formatted_values = array();
                            foreach ( $values as $value ) {
                                $value                                        = trim( $value );
                                $formatted_values[ sanitize_title( $value ) ] = $value;
                            }
                        } else {
                            $values           = array_map( 'trim', explode( '|', $values ) );
                            $formatted_values = array();
                            foreach ( $values as $value ) {
                                $formatted_values[ sanitize_title( $value ) ] = $value;
                            }
                        }

                        $formatted_attrs[ $attribute->get_name() ] = array(
                            'values'   => $formatted_values,
                            'position' => $attribute->get_position(),
                            'name'     => $attribute->get_name(),
                            'label'    => $attribute->get_name(),
                        );
                    }
                }

                $product_variation_params['product_attrs'] = $formatted_attrs;
            }
        }

        wcv_enqueue_script(
            'wcv-product-variation',
            self::$base_url . '/js/product-variation' . self::$suffix . '.js',
            array(
                'jquery',
                'jquery-ui-core',
                'accounting',
                $select2_handle,
            ),
            WCV_VERSION,
            true,
            array( 'wcv_product_variation' => $product_variation_params ),
            $is_dashboard_page
        );

        $decimal_separator  = wc_get_price_decimal_separator();
        $thousand_separator = wc_get_price_thousand_separator();

        if ( ! $thousand_separator ) {
            if ( '.' !== $decimal_separator ) {
                $thousand_separator = '.';
            } else {
                $thousand_separator = ',';
            }
        }

        $general_settings_params = array(
            'date_format'                      => apply_filters( 'wcv-datepicker-dateformat', 'Y-m-d' ), // phpcs:ignore
            'ajax_url'                         => admin_url( 'admin-ajax.php' ),
            'wcv_json_unique_store_name_nonce' => wp_create_nonce( 'wcv-unique-store-name' ),
            'use_location_picker_text'         => apply_filters( 'wcv_use_location_picker_text', __( 'Show map', 'wc-vendors' ) ),
            'hide_location_picker_text'        => apply_filters( 'wcv_hide_location_picker_text', __( 'Hide map', 'wc-vendors' ) ),
            'cannot_find_address_text'         => apply_filters( 'wcv_cannot_find_address_test', __( 'Cannot determine address at this location.', 'wc-vendors' ) ),
            'map_zoom_level'                   => apply_filters( 'wcv_google_maps_zoom_level', get_option( 'wcvendors_pro_google_maps_zoom_level', '' ) ),
            'decimal_separator'                => $decimal_separator,
            'thousand_separator'               => $thousand_separator,
            'digits_after_decimal'             => wc_get_price_decimals(),
            'invalid_number_format'            => __( 'This value should be a valid number.', 'wc-vendors' ),
            'invalid_price_format'             => __( 'This value should be a valid price.', 'wc-vendors' ),
            'required_file_msg'                => __( 'This field is required. Please upload or choose a file.', 'wc-vendors' ),
            'date_range_error_msg'             => __( 'Start date cannot be after end date. Please select a valid date range.', 'wc-vendors' ),
        );

        $localize_search_args = array(
            'i18n_no_matches'        => __( 'No tags found', 'wc-vendors' ),
            'i18n_ajax_error'        => __( 'Loading failed', 'wc-vendors' ),
            'i18n_input_too_short_1' => __( 'Please enter 1 or more characters', 'wc-vendors' ),
            'i18n_input_too_short_n' => __( 'Please enter %qty% or more characters', 'wc-vendors' ),
            'i18n_input_too_long_1'  => __( 'Please delete 1 character', 'wc-vendors' ),
            'i18n_input_too_long_n'  => __( 'Please delete %qty% characters', 'wc-vendors' ),
            'i18n_load_more'         => __( 'Loading more results&hellip;', 'wc-vendors' ),
            'i18n_searching'         => sprintf(
                // translators: %s is the search indicator.
                __( 'Searching %s', 'wc-vendors' ),
                '&hellip;'
            ),
            'ajax_url'               => admin_url( 'admin-ajax.php' ),
            'nonce'                  => wp_create_nonce( 'wcv-search' ),
            'tag_limit'              => $tag_limit,
        );

        // Product search.
        $localize_product_search_args = array_merge(
            $localize_search_args,
            array(
                'nonce'     => wp_create_nonce( 'wcv-search-products' ),
                'separator' => apply_filters(
                    'wcv_product_search_args_separator',
                    array(
                        ',',
                        ' ',
                    )
                ),
            )
        );

        wcv_enqueue_script(
            'wcv-product-search',
            self::$base_url . '/js/select' . self::$suffix . '.js',
            array( 'jquery', $select2_handle ),
            '3.5.2',
            true,
            array(
                'wcv_product_select_params' => $localize_product_search_args,
            ),
            $is_dashboard_page
        );

        // Tag search.
        $localize_tag_search_args = array_merge(
            $localize_search_args,
            array(
                'i18n_matches_1'            => __( 'One tag is available, press enter to select it.', 'wc-vendors' ),
                'i18n_matches_n'            => __( '%qty% tags are available, use up and down arrow keys to navigate.', 'wc-vendors' ),
                'i18n_selection_too_long_1' => __( 'You can only select 1 tag', 'wc-vendors' ),
                'i18n_selection_too_long_n' => __( 'You can only select %qty% tags', 'wc-vendors' ),
                'nonce'                     => wp_create_nonce( 'wcv-search-product-tags' ),
                'separator'                 => apply_filters( 'wcv_tag_search_args_separator', self::select2_separator( $tag_separator ) ),
            )
        );
        wcv_enqueue_script(
            'wcv-tag-search',
            self::$base_url . '/js/tags' . self::$suffix . '.js',
            array( 'jquery', $select2_handle ),
            WCV_VERSION,
            true,
            array(
                'wcv_tag_search_params' => $localize_tag_search_args,
            ),
            $is_dashboard_page
        );

        // General settings.
        wcv_enqueue_script(
            'wcv-frontend-general',
            self::$base_url . '/js/general' . self::$suffix . '.js',
            array(
                'jquery',
                $select2_handle,
            ),
            WCV_VERSION,
            true,
            array(
                'wcv_frontend_general' => $general_settings_params,
            ),
            $is_dashboard_page
        );

        $dashboard_args = apply_filters( 'wc_vendors_dashboard_scripts_args', array() );

        // Dashboard forms.
        wcv_enqueue_script(
            'wcv-frontend-forms',
            self::$base_url . 'js/forms' . self::$suffix . '.js',
            array(
                'jquery',
                $select2_handle,
            ),
            WCV_VERSION,
            true,
            array(
                'wcv_frontend_forms' => $dashboard_args,
            ),
            $is_dashboard_page
        );
        $country_state_args = array(
            'countries'              => wp_json_encode( array_merge( WC()->countries->get_allowed_country_states(), WC()->countries->get_shipping_country_states() ) ),
            'i18n_select_state_text' => esc_attr__( 'Select a state&hellip;', 'wc-vendors' ),
        );

        wcv_enqueue_script(
            'wcv-frontend-forms-country-states',
            self::$base_url . 'js/country-states' . self::$suffix . '.js',
            array(
                'jquery',
                $select2_handle,
            ),
            WCV_VERSION,
            true,
            array(
                'wcv_countries_states' => $country_state_args,
            ),
            $is_dashboard_page
        );

        $wc_vendors_dashboard_args = apply_filters(
            'wcvendors_dashboard_scripts_args',
            array(
                'wcvendor_dashboard' => array(
                    'mark_unshipped_confirm' => __( 'Are you sure the item was unshipped?', 'wc-vendors' ),
                    'option_none_text'       => __( 'None', 'wc-vendors' ),
                    'countries_phone_codes'  => require WCV_PLUGIN_DIR . 'classes/includes/wcv-countries-phone-code.php',
                    'product_meta_tabs'      => \WC_Vendors\Classes\Front\Forms\WCV_Product_Form::get_product_meta_tabs(),
                    'icon_url'               => WCV_ASSETS_URL . 'svg/wcv-icons.svg',
                    'dashboard_nonce'        => wp_create_nonce( 'wcv_dashboard' ),
                    'ajax_url'               => admin_url( 'admin-ajax.php' ),
                ),
            )
        );

        wcv_enqueue_script( 'wcv-navigation', self::$base_url . 'js/wcv-navigation' . self::$suffix . '.js', array( 'jquery', 'ink-js' ), WCV_VERSION, true, $wc_vendors_dashboard_args, $is_dashboard_page );
    }

    /**
     * Get datepicker localization strings
     *
     * @return array
     * @version 2.5.2
     * @since   2.5.2 - Extracted from WCVendors_Pro_Dashboard::enqueue_scripts()
     */
    public static function get_datepicker_localization() {
        $datepicker_localization = array(
            'locale'      => self::get_flatpickr_locale(),
            'date_format' => apply_filters( 'wcvendors_datepicker_date_format', 'Y-m-d' ),
            'time_format' => apply_filters( 'wcvendors_datepicker_time_format', 'H:i' ),

        );

        return apply_filters( 'wcvendors_datepicker_localization', $datepicker_localization );
    }

    /**
     * Get flatpickr localization strings
     *
     * @return array
     * @version 2.5.2
     * @since   2.5.2
     */
    public static function get_flatpickr_locale() {
        return apply_filters(
            'wcvendors_pro_flatpickr_locale',
            array(
                'weekdays'         => array(
                    'shorthand' => array(
                        __( 'Sun', 'wc-vendors' ),
                        __( 'Mon', 'wc-vendors' ),
                        __( 'Tue', 'wc-vendors' ),
                        __( 'Wed', 'wc-vendors' ),
                        __( 'Thu', 'wc-vendors' ),
                        __( 'Fri', 'wc-vendors' ),
                        __( 'Sat', 'wc-vendors' ),
                    ),
                    'longhand'  => array(
                        __( 'Sunday', 'wc-vendors' ),
                        __( 'Monday', 'wc-vendors' ),
                        __( 'Tuesday', 'wc-vendors' ),
                        __( 'Wednesday', 'wc-vendors' ),
                        __( 'Thursday', 'wc-vendors' ),
                        __( 'Friday', 'wc-vendors' ),
                        __( 'Saturday', 'wc-vendors' ),
                    ),
                ),
                'months'           => array(
                    'shorthand' => array(
                        __( 'Jan', 'wc-vendors' ),
                        __( 'Feb', 'wc-vendors' ),
                        __( 'Mar', 'wc-vendors' ),
                        __( 'Apr', 'wc-vendors' ),
                        __( 'May', 'wc-vendors' ),
                        __( 'Jun', 'wc-vendors' ),
                        __( 'Jul', 'wc-vendors' ),
                        __( 'Aug', 'wc-vendors' ),
                        __( 'Sep', 'wc-vendors' ),
                        __( 'Oct', 'wc-vendors' ),
                        __( 'Nov', 'wc-vendors' ),
                        __( 'Dec', 'wc-vendors' ),
                    ),
                    'longhand'  => array(
                        __( 'January', 'wc-vendors' ),
                        __( 'February', 'wc-vendors' ),
                        __( 'March', 'wc-vendors' ),
                        __( 'April', 'wc-vendors' ),
                        __( 'May', 'wc-vendors' ),
                        __( 'June', 'wc-vendors' ),
                        __( 'July', 'wc-vendors' ),
                        __( 'August', 'wc-vendors' ),
                        __( 'September', 'wc-vendors' ),
                        __( 'October', 'wc-vendors' ),
                        __( 'November', 'wc-vendors' ),
                        __( 'December', 'wc-vendors' ),
                    ),
                ),
                'daysInMonth'      => array( 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ),
                'firstDayOfWeek'   => 0,
                'rangeSeparator'   => __( ' to ', 'wc-vendors' ),
                'weekAbbreviation' => __( 'Wk', 'wc-vendors' ),
                'scrollTitle'      => __( 'Scroll to increment', 'wc-vendors' ),
                'toggleTitle'      => __( 'Click to toggle', 'wc-vendors' ),
                'amPM'             => array(
                    __( 'AM', 'wc-vendors' ),
                    __( 'PM', 'wc-vendors' ),
                ),
                'yearAriaLabel'    => __( 'Year', 'wc-vendors' ),
                'monthAriaLabel'   => __( 'Month', 'wc-vendors' ),
                'hourAriaLabel'    => __( 'Hour', 'wc-vendors' ),
                'minuteAriaLabel'  => __( 'Minute', 'wc-vendors' ),
                'time_24hr'        => apply_filters( 'wcv_time_picker_use_twenty_four_hour_clock', false ),
            )
        );
    }


    /**
     * Select 2 seperator options for tag search
     *
     * @since  2.5.2
     * @access public
     * @return array separator types
     * @param  string $option sprarator option.
     */
    public static function select2_separator( $option ) {
        $separator = array( ',', ' ' );
        switch ( $option ) {
            case 'space':
                $separator = array( ' ' );
                break;
            case 'comma':
                $separator = array( ',' );
                break;
            default:
                return apply_filters( 'wcv_tag_separator_defaults', array( ',', ' ' ) );
        }
        return apply_filters( 'wcv_tag_separator_defaults', $separator );
    }

    /**
     * Dequeue script
     *
     * @param string $tag The script tag.
     * @param string $handle The script handle.
     */
    public function dequeue_script( $tag, $handle ) {
        $handles = array(
            'wcvendors-pro-charts',
            'wcv-frontend-product-variation',
        );

        if ( in_array( $handle, $handles, true ) ) {
            $tag = '';
        }

        return $tag;
    }
}
