<?php

/**
 * Product Variations
 *
 * This file is used to load the product variations
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
use WC_Vendors\Classes\Front\WCV_Product_Controller;
?>
<?php

$variaton_dropdown_type = get_option( 'wcvendors_variation_actions_dropdown_type', '' );

$actions            = array();
$actions['options'] = array(
    'add_variation'       => array(
        'label'      => __( 'Add variation', 'wc-vendors' ),
        'attributes' => array( 'data-global' => true ),
    ),
    'link_all_variations' => array(
        'label'      => __( 'Create variations from all attributes', 'wc-vendors' ),
        'attributes' => array( 'data-global' => true ),
    ),
    'delete_all'          => array( 'label' => __( 'Delete all variations', 'wc-vendors' ) ),
);

$actions['groups']['status']       = array(
    'label'      => __( 'Status', 'wc-vendors' ),
    'label_icon' => wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-status' ),
    'id'         => 'variable_status',
    'options'    => array(
        'toggle_variable_enabled'         => array( 'label' => __( 'Toggle &quot;Enabled&quot;', 'wc-vendors' ) ),
        'toggle_variable_is_downloadable' => array( 'label' => __( 'Toggle &quot;Downloadable&quot;', 'wc-vendors' ) ),
        'toggle_variable_is_virtual'      => array( 'label' => __( 'Toggle &quot;Virtual&quot;', 'wc-vendors' ) ),
    ),
);
$actions['groups']['pricing']      = array(
    'label'      => __( 'Pricing', 'wc-vendors' ),
    'id'         => 'variable_pricing',
    'label_icon' => wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-tag-price' ),
    'options'    => array(
        'variable_regular_price'          => array( 'label' => __( 'Set regular prices', 'wc-vendors' ) ),
        'variable_regular_price_increase' => array( 'label' => __( 'Increase regular prices (fixed amount or percentage)', 'wc-vendors' ) ),
        'variable_regular_price_decrease' => array( 'label' => __( 'Decrease regular prices (fixed amount or percentage)', 'wc-vendors' ) ),
        'variable_sale_price'             => array( 'label' => __( 'Set sale prices', 'wc-vendors' ) ),
        'variable_sale_price_increase'    => array( 'label' => __( 'Increase sale prices (fixed amount or percentage)', 'wc-vendors' ) ),
        'variable_sale_price_decrease'    => array( 'label' => __( 'Decrease sale prices (fixed amount or percentage)', 'wc-vendors' ) ),
        'variable_sale_schedule'          => array( 'label' => __( 'Set scheduled sale dates', 'wc-vendors' ) ),
    ),
);
$actions['groups']['inventory']    = array(
    'label'      => __( 'Inventory', 'wc-vendors' ),
    'id'         => 'variable_inventory',
    'label_icon' => wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-inventory' ),
    'options'    => array(
        'toggle_variable_manage_stock' => array( 'label' => __( 'Toggle &quot;Manage stock&quot;', 'wc-vendors' ) ),
        'variable_stock'               => array( 'label' => __( 'Stock', 'wc-vendors' ) ),
    ),
);
$actions['groups']['shipping']     = array(
    'label'      => __( 'Shipping', 'wc-vendors' ),
    'id'         => 'variable_shipping',
    'label_icon' => wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-shipping' ),
    'options'    => array(
        'variable_length' => array( 'label' => __( 'Length', 'wc-vendors' ) ),
        'variable_width'  => array( 'label' => __( 'Widgth', 'wc-vendors' ) ),
        'variable_height' => array( 'label' => __( 'Height', 'wc-vendors' ) ),
        'variable_weight' => array( 'label' => __( 'Weight', 'wc-vendors' ) ),
    ),
);
$actions['groups']['downloadable'] = array(
    'label'      => __( 'Downloadable products', 'wc-vendors' ),
    'label_icon' => wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-download' ),
    'id'         => 'variable_downloadable',
    'options'    => array(
        'variable_download_limit'  => array( 'label' => __( 'Download limit', 'wc-vendors' ) ),
        'variable_download_expiry' => array( 'label' => __( 'Download expiry', 'wc-vendors' ) ),
    ),
);

$actions    = wcv_deprecated_filter( 'wcvendors_pro_variation_actions', '2.5.2', 'wcvendors_variation_actions', $actions );
$hide_class = ! $variation_attribute_found ? 'hide-all' : '';
$show_class = $variation_attribute_found ? 'hide-all' : '';
?>
<div id="wcv_variable_product_options" class="wcv-metaboxes-wrapper">

    <div id="variable_product_options_inner">
        <div class="wcv-cols-group wcv-horizontal-gutters variations_notice top-space <?php echo esc_attr( $show_class ); ?>">
            <div class="all-100">
                <div id="wcv-attr-message">
                    <div class="wcv-flex wcv-flex-column wcv-no-variation">
                        <svg width="150" height="150" viewBox="0 0 169 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4.5" y="4" width="160" height="160" rx="80" fill="#E6E6E6"/>
                        <rect x="4.5" y="4" width="160" height="160" rx="80" stroke="#F7F7F7" stroke-width="8"/>
                        <path d="M78.25 70.25C78.25 69.2611 78.5433 68.2944 79.0927 67.4721C79.6421 66.6499 80.423 66.009 81.3366 65.6306C82.2502 65.2522 83.2556 65.1531 84.2255 65.3461C85.1954 65.539 86.0863 66.0152 86.7855 66.7145C87.4848 67.4137 87.961 68.3046 88.1539 69.2745C88.3469 70.2445 88.2479 71.2498 87.8694 72.1634C87.491 73.077 86.8501 73.8579 86.0279 74.4073C85.2056 74.9568 84.2389 75.25 83.25 75.25C81.9239 75.25 80.6522 74.7232 79.7145 73.7855C78.7768 72.8479 78.25 71.5761 78.25 70.25ZM118.25 84C118.25 90.6751 116.271 97.2003 112.562 102.75C108.854 108.301 103.583 112.626 97.4156 115.181C91.2486 117.735 84.4626 118.404 77.9157 117.102C71.3689 115.799 65.3552 112.585 60.6352 107.865C55.9151 103.145 52.7008 97.1312 51.3985 90.5843C50.0963 84.0374 50.7646 77.2514 53.3191 71.0844C55.8735 64.9174 60.1994 59.6464 65.7495 55.9379C71.2997 52.2294 77.8249 50.25 84.5 50.25C93.448 50.2599 102.027 53.8189 108.354 60.1461C114.681 66.4733 118.24 75.052 118.25 84ZM110.75 84C110.75 78.8082 109.21 73.7331 106.326 69.4163C103.442 65.0995 99.342 61.735 94.5455 59.7482C89.7489 57.7614 84.4709 57.2415 79.3789 58.2544C74.2869 59.2672 69.6096 61.7673 65.9385 65.4384C62.2673 69.1096 59.7673 73.7869 58.7544 78.8789C57.7415 83.9709 58.2614 89.2489 60.2482 94.0454C62.235 98.842 65.5995 102.942 69.9163 105.826C74.2331 108.71 79.3083 110.25 84.5 110.25C91.4597 110.243 98.1321 107.475 103.053 102.553C107.975 97.6321 110.743 90.9596 110.75 84ZM88.25 95.4625V85.25C88.25 83.5924 87.5915 82.0027 86.4194 80.8306C85.2473 79.6585 83.6576 79 82 79C81.1144 78.9987 80.2569 79.3108 79.5794 79.8812C78.9019 80.4515 78.4481 81.2432 78.2984 82.116C78.1487 82.9889 78.3127 83.8866 78.7614 84.6501C79.2101 85.4136 79.9146 85.9936 80.75 86.2875V96.5C80.75 98.1576 81.4085 99.7473 82.5806 100.919C83.7527 102.092 85.3424 102.75 87 102.75C87.8856 102.751 88.7431 102.439 89.4206 101.869C90.0981 101.299 90.5519 100.507 90.7016 99.634C90.8513 98.7611 90.6873 97.8634 90.2386 97.0999C89.7899 96.3364 89.0854 95.7564 88.25 95.4625Z" fill="#666666"/>
                        </svg>
                        <div class="wcv-attr-message-content top-space">
                            <p><?php echo wp_kses( __( 'Add some attributes in the <strong class="text-blue">Attributes</strong> tab to generates Variations.', 'wc-vendors' ), wcv_allowed_html_tags() ); ?></p>
                            <p>
                                <?php echo wp_kses( __( 'Make Sure to check the <strong>Used for Variations box</strong>.', 'wc-vendors' ), wcv_allowed_html_tags() ); ?>
                                <a href="https://woocommerce.com/document/variable-product/" target="_blank" class="text-blue">
                                    <?php esc_html_e( 'Learn more', 'wc-vendors' ); ?>
                                    <svg width="14" height="15" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V18.5C4 19.0304 4.21071 19.5391 4.58579 19.9142C4.96086 20.2893 5.46957 20.5 6 20.5H18C18.5304 20.5 19.0391 20.2893 19.4142 19.9142C19.7893 19.5391 20 19.0304 20 18.5V14.5M12 12.5L20 4.5M20 4.5V9.5M20 4.5H15" stroke="#0F62FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wcv-cols-group wcv-horizontal-gutters variation_options variations-toolbar <?php echo esc_attr( $hide_class ); ?>">
            <div class="all-100">

                <?php if ( 'single' === $variaton_dropdown_type ) : ?>
                    <div class="wcv-cols-group control-group no-margin">
                        <div class="control">
                            <a href="#" id="show_variation_actions" style="margin-top: 3px; margin-bottom: 1px; display:block; ">
                                <?php echo wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-arrow-right' ); //phpcs:ignore ?>
                                <span class="vertical-middle" style="border-bottom:1px solid #0F62FE;">
                                    <?php esc_html_e( 'Bulk actions', 'wc-vendors' ); ?>
                                </span>
                            </a>
                            <input type="hidden" name="variation_dropdown_type" id="variation_dropdown_type"
                                    value="single"/>
                            <div id="variation_actions_single" class="variation_actions wcv-section-bg-light hide-all" style="background: #F9FAFC; margin-top: 40px;">
                                
                                
                                    <?php
                                    $global_options           = array(
                                        '' => __( 'Select an action', 'wc-vendors' ),
                                    );
                                    $global_option_attributes = array();
                                    ?>
                                    <?php foreach ( $actions['options'] as $value => $options ) : ?>
                                        <?php
                                        $global_options[ $value ] = $options['label'];

                                        if ( isset( $options['attributes'] ) ) {
                                            foreach ( $options['attributes'] as $key => $attribute ) {
                                                $global_option_attributes[ $value ][ $key ] = $attribute;
                                            }
                                        }
                                    ?>

                                    <?php endforeach; ?>
                                    <?php
                                    WCV_Form_Helper::select(
                                        array(
                                            'id'           => 'variable_manage_variations',
                                            'class'        => 'variation_actions wcv-w-full',
                                            'label'        => __( 'Create', 'wc-vendors' ),
                                            'style'        => 'width: 100%;',
                                            'options'      => $global_options,
                                            'options_attr' => $global_option_attributes,
                                            'wrapper_start' => '<div class="wcv-variation-action-container">',
                                            'wrapper_end'  => '</div>',
                                            'label_icon'   => wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-create' ),
                                        )
                                    );
                                    ?>

                                    <?php foreach ( $actions['groups'] as $group_id => $group ) : ?>
                                        <?php
                                        $options = array(
                                            '' => __( 'Select an action', 'wc-vendors' ),
                                        );
                                        foreach ( $group['options'] as $value => $group_options ) {
                                            $options[ $value ] = $group_options['label'];
                                        }
                                        WCV_Form_Helper::select(
                                            array(
                                                'id'      => $group['id'],
                                                'class'   => 'variation_actions wcv-w-full',
                                                'label'   => $group['label'],
                                                'style'   => 'width: 100%;',
                                                'options' => $options,
                                                'wrapper_start' => '<div class="wcv-variation-action-container ' . esc_attr( $group['id'] ) . '">',
                                                'wrapper_end' => '</div>',
                                                'label_icon' => isset( $group['label_icon'] ) ? $group['label_icon'] : '',
                                            )
                                        );
                                        ?>
                                    <?php endforeach; ?>
                                
                            </div>
                        </div>
                    </div>


                <?php else : ?>

                    <input type="hidden" name="variation_dropdown_type" id="variation_dropdown_type" value="grouped"/>
                    
                        <div class="wcv-variation-action-container">
                            <?php esc_attr_e( 'Create', 'wc-vendors' ); ?>
                            <select id="variable_manage_variations" class="variation_actions variation_grouped_actions">
                                <option></option>
                                <?php foreach ( $actions['options'] as $value => $options ) : ?>
                                    <option data-global="true"
                                            value="<?php echo esc_attr( $value ); ?>"><?php echo esc_attr( $options['label'] ); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <?php foreach ( $actions['groups'] as $group ) : ?>
                            <div class="wcv-variation-action-container <?php echo esc_attr( $group['id'] ); ?>">
                                <?php echo esc_html( $group['label'] ); ?>
                                <select id="<?php echo esc_attr( $group['id'] ); ?>"
                                        class="variation_actions variation_grouped_actions">
                                    <option></option>
                                    <?php foreach ( $group['options'] as $value => $group_options ) : ?>
                                        <option data-global="true"
                                                value="<?php echo esc_attr( $value ); ?>"><?php echo esc_attr( $group_options['label'] ); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        <?php endforeach; ?>
                    
                <?php endif; ?>
            </div>
        </div>
        <div class="wcv-cols-group wcv-horizontal-gutters top-space">
            <div class="all-100 toolbar toolbar-variations-defaults">
                <div class="variations-defaults">
                    <?php if ( $variation_attribute_found ) : ?>
                        <div class="wcv-cols-group wcv-horizontal-gutters">
                            <div class="all-100">
                                <div class="no-margin">
                                    <label for="default_attributes">
                                        <?php esc_html_e( 'Set Default Variation', 'wc-vendors' ); ?>
                                    </label>
                                    <span class="wcv-tip">
                                        <svg class="wcv-icon wcv-icon-24">
                                            <use xlink:href="<?php echo WCV_ASSETS_URL; // phpcs:ignore ?>svg/wcv-icons.svg#wcv-icon-info"></use>
                                        </svg>
                                        <span class="content">
                                            <?php esc_html_e( 'These are the attributes that will be pre-selected on the frontend.', 'wc-vendors' ); ?>
                                            <span class="arrow"></span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="all-100 variation_default_values">
                                <div class="variation-default-values">
                                <?php

                                $attributes         = WCV_Utils::array_sort( $attributes, 'position' );
                                $default_attributes = maybe_unserialize( get_post_meta( $post_id, '_default_attributes', true ) );

                                foreach ( $attributes as $attribute ) {

                                    // Only deal with attributes that are variations.
                                    if ( ! $attribute['is_variation'] ) {
                                        continue;
                                    }

                                    // Get current value for variation (if set).
                                    $variation_selected_value = isset( $default_attributes[ sanitize_title( $attribute['name'] ) ] ) ? $default_attributes[ sanitize_title( $attribute['name'] ) ] : '';

                                    // Name will be something like attribute_pa_color.
                                    echo '<select data-taxonomy="' . esc_attr( sanitize_title( $attribute['name'] ) ) . '" name="default_attribute_' . esc_attr( sanitize_title( $attribute['name'] ) ) . '" class="default_attribute ' . esc_attr( sanitize_title( $attribute['name'] ) ) . '" data-current="' . esc_attr( $variation_selected_value ) . '"><option value="">' . esc_html__( 'No default', 'wc-vendors' ) . ' ' . esc_html( wc_attribute_label( $attribute['name'] ) ) . '&hellip;</option>';

                                    // Get terms for attribute taxonomy or value if its a custom attribute.
                                    if ( $attribute['is_taxonomy'] ) {
                                        $post_terms = wp_get_post_terms( $post_id, $attribute['name'] );

                                        foreach ( $post_terms as $term ) { // phpcs:ignore
                                            echo '<option ' . selected( $variation_selected_value, $term->slug, false ) . ' value="' . esc_attr( $term->slug ) . '">' . esc_html( apply_filters( 'woocommerce_variation_option_name', $term->name ) ) . '</option>';
                                        }
                                    } else {
                                        $options = wc_get_text_attributes( $attribute['value'] );

                                        foreach ( $options as $option ) {
                                            $selected = sanitize_title( $variation_selected_value ) === $variation_selected_value ? selected( $variation_selected_value, sanitize_title( $option ), false ) : selected( $variation_selected_value, $option, false );
                                            echo '<option ' . esc_attr( $selected ) . ' value="' . esc_attr( $option ) . '">' . esc_html( apply_filters( 'woocommerce_variation_option_name', $option ) ) . '</option>';
                                        }
                                    }

                                    echo '</select>';
                                }
                                ?>
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="wcv-cols-group wcv-horizontal-gutters variations-toolbar wcv-flex <?php echo esc_attr( $hide_class ); ?>">
            <div class="all-40 small-50">
                <button type="button" class="wcv-button wcv-button-outline text-blue wcv_single_add_variation">
                    <?php echo wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-plus-circle' ); //phpcs:ignore ?>
                    <span class="vertical-middle"><strong><?php esc_html_e( 'Add Variation', 'wc-vendors' ); ?></strong></span>
                </button>
            </div>
            <div class="all-60 align-right small-50">
                <div class="variations-pagenav">
                    <span class="displaying-num wcv-x-space vertical-middle"><?php printf( _n( '%s variation', '%s variations', $variations_count, 'wc-vendors' ), esc_attr( $variations_count ) ); // phpcs:ignore ?></span>
                    <span class="expand-close">
                        <a href="#" class="expand_all wcv-x-space">
                            <?php echo wcv_get_icon( 'wcv-icon wcv-icon-md wcv-icon-middle', 'wcv-icon-expand' ); //phpcs:ignore ?>
                            <span class="vertical-middle vertical-middle hide-small hide-tiny"><?php esc_html_e( 'Expand All', 'wc-vendors' ); ?></span>
                        </a>
                        <a href="#" class="close_all">
                            <?php echo wcv_get_icon( 'wcv-icon wcv-icon-md wcv-icon-middle', 'wcv-icon-collapse' ); //phpcs:ignore ?>
                            <span class="vertical-middle vertical-middle hide-small hide-tiny"><?php esc_html_e( 'Collapse All', 'wc-vendors' ); ?></span>
                        </a>
                    </span>
                </div>
            </div>
        </div>

        <div class="wcv-cols-group wcv-horizontal-gutters wcv-gap-top wcv-gap-top-small">
            <div class="all-100">
                <div class="wcv_variations wcv-metaboxes" data-attributes="
                <?php
                // esc_attr does not double encode - htmlspecialchars does.
                echo htmlspecialchars( wp_json_encode( $attributes ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                ?>
                " data-total="<?php echo esc_attr( $variations_count ); ?>" data-page="1" data-edited="false">
                    <?php
                    if ( ! empty( $post_id ) ) {
                        WCV_Product_Controller::load_variations( $post_id );
                    }
                    ?>
                </div>
            </div>
            <div class="all-100 align-center <?php echo $variation_attribute_found ? '' : 'hide-all'; ?>">
                <button type="button" class="wcv-button wcv-button-link text-blue wcv_single_add_variation bottom">
                    <?php echo wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-plus-circle' ); //phpcs:ignore ?>
                    <span class="vertical-middle"><strong><?php esc_html_e( 'Add Variation', 'wc-vendors' ); ?></strong></span>
                </button>
            </div>
        </div>
        <input type="hidden" id="wcv_parent_object" value=""/>
        <input type="hidden" id="wcv_deleted_variations" name="wcv_deleted_variations" value="" data-variations=""/>
    </div>
</div>
