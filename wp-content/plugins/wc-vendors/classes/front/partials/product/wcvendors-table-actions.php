<?php

/**
 * Product Table Main Actions
 *
 * This file is used to add the table actions before and after a table
 *
 * @link       http://www.wcvendors.com
 * @since      2.5.2
 * @version    2.5.2 - added can submit handler
 * @version    2.6.2 - added use_multilevel_walker option
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable  WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable  WordPress.Security.NonceVerification.Missing
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WC_Vendors\Classes\Front\WCV_Form_Helper;
use function WC_Vendors\Classes\Includes\wcv_get_product_types;

?>
<?php if ( 'before' === $position ) : ?>
<form class="wcv-search-form wcv-form" method="post">
    <div class="wcv_dashboard_table_header wcv-cols-group wcv-search wcv-product-table-search-<?php echo esc_attr( $position ); ?>">
        <div class="wcv-flex wcv-flex-wrap">
            <div class="quick-link-wrapper small-100 all-60">
                <?php foreach ( $product_counts as $key => $count ) : ?>
                    <?php $filter_link = WCV_Vendor_Dashboard::get_dashboard_page_url( 'product?product_status=' . $key ); ?>
                    <span class="quick-link-btn black">
                        <a href="<?php echo esc_url( $filter_link ); ?>"><span><?php echo esc_html( $count['label'] ); ?></span> (<?php echo esc_html( $count['count'] ); ?>)</a>
                    </span>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="wcv-cols-group wcv-horizontal-gutters wcv-gap-top wcv-cols-group-narrow wcv-filter-wrapper">
            <?php

                $product_tags  = get_terms(
                    array(
                        'taxonomy'   => 'product_tag',
                        'hide_empty' => false,
                    )
                );
                $product_tags  = wp_list_pluck( $product_tags, 'name', 'term_id' );
                $product_tags  = array( '' => esc_html__( 'None', 'wc-vendors' ) ) + $product_tags;
                $product_types = wcv_get_product_types();
                $product_types = array( '' => esc_html__( 'None', 'wc-vendors' ) ) + $product_types;

                $hide_product_types = get_option( 'wcvendors_capability_product_types', array() );

                foreach ( $hide_product_types as $product_type ) {
                    if ( isset( $product_types[ $product_type ] ) ) {
                        unset( $product_types[ $product_type ] );
                    }
                }

                $product_types = apply_filters( 'wcvendors_capability_filter_product_types', $product_types );

                $product_cat_raw  = isset( $_POST['_wcv_product_category'] ) ? wp_unslash( $_POST['_wcv_product_category'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
                $product_tag_raw  = isset( $_POST['_wcv_product_tag'] ) ? wp_unslash( $_POST['_wcv_product_tag'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
                $product_type_raw = isset( $_POST['_wcv_product_type'] ) ? wp_unslash( $_POST['_wcv_product_type'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

                $product_cat_get  = array_map( 'sanitize_text_field', $product_cat_raw );
                $product_tag_get  = array_map( 'sanitize_text_field', $product_tag_raw );
                $product_type_get = array_map( 'sanitize_text_field', $product_type_raw );

                WCV_Form_Helper::select(
                    array(
                        'id'                    => '_wcv_product_category',
                        'taxonomy'              => 'product_cat',
                        'class'                 => 'wcv-dashboard-filter wcv-custom-select',
                        'wrapper_start'         => '<div class="all-20 small-100">',
                        'wrapper_end'           => '</div>',
                        'label'                 => esc_html__( 'Categories', 'wc-vendors' ),
                        'multiple'              => true,
                        'taxonomy_args'         => array(
                            'hide_empty'   => 0,
                            'orderby'      => 'order',
                            'hierarchical' => true,
                            'selected'     => $product_cat_get,
                        ),
                        'show_option_none'      => esc_html__( 'None', 'wc-vendors' ),
                        'custom_attributes'     => array(
                            'data-text-align' => 'left',
                        ),
                        'use_multilevel_walker' => true,
                    )
                );

                WCV_Form_Helper::select(
                    array(
                        'id'            => '_wcv_product_tag',
                        'options'       => $product_tags,
                        'class'         => 'wcv-dashboard-filter wcv-custom-select',
                        'value'         => $product_tag_get,
                        'wrapper_start' => '<div class="all-20 small-50">',
                        'wrapper_end'   => '</div>',
                        'label'         => esc_html__( 'Tags', 'wc-vendors' ),
                        'multiple'      => true,
                    )
                );

                WCV_Form_Helper::select(
                    array(
                        'id'            => '_wcv_product_type',
                        'value'         => $product_type_get,
                        'options'       => $product_types,
                        'class'         => 'wcv-dashboard-filter wcv-custom-select',
                        'wrapper_start' => '<div class="all-20 small-50">',
                        'wrapper_end'   => '</div>',
                        'label'         => esc_html__( 'Type', 'wc-vendors' ),
                        'multiple'      => true,
                    )
                );
            ?>
            <div class="all-40 small-100">
                <div class="control-group">
                    <label for="wcv_search" class="wcv_desktop">&nbsp;</label>
                    <div class="wcv-search-box-wrapper wcv-flex">
                        <input type="text" id="wcv-search" class="wcv-dashboard-filter wcv-search-box-input" name="wcv-search" placeholder="<?php esc_attr_e( 'Search Products', 'wc-vendors' ); ?>" value="<?php echo esc_attr( $search ); ?>">
                        <button type="submit" class="wcv-search-button wcv-flex">
                            <?php
                            echo wp_kses(
                                wcv_get_icon( 'wcv-icon wcv-icon-dashboard-icon', 'wcv-icon-search' ),
                                array(
                                    'svg' => array(
                                        'class' => array(),
                                    ),
                                    'use' => array(
                                        'xlink:href' => array(),
                                    ),
                                )
                            );
                            ?>
                            <span><?php esc_html_e( 'Search', 'wc-vendors' ); ?></span>
                        </button>
                    </div>
                </div>
            </div>
            <?php
                // Update Button.
                WCV_Form_Helper::button(
                    apply_filters(
                        'wcv_product_update_button',
                        array(
                            'id'            => 'update_button_product',
                            'value'         => __( 'Update', 'wc-vendors' ),
                            'type'          => 'submit',
                            'button_text'   => __( 'Update', 'wc-vendors' ),
                            'after_text'    => '</span>',
                            'class'         => 'wcv-button wcv-inline-flex wcv-button-link-secondary text-blue',
                            'wrapper_start' => '<div class="all-100 medium-30 small-100 tiny-100 push-right wcv-flex wcv-flex-end"><div class="control-group"><div class="control">',
                            'wrapper_end'   => '</div></div>',
                            'before_text'   => wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-round-update' ) . '<span>',
                        )
                    )
                );

                // Update Button.
                WCV_Form_Helper::button(
                    apply_filters(
                        'wcv_product_filter_clear_button',
                        array(
                            'id'            => 'clear_button_product',
                            'button_text'   => __( 'Clear', 'wc-vendors' ),
                            'class'         => 'wcv-button wcv-flex wcv-button-link-danger',
                            'type'          => 'reset',
                            'wrapper_start' => '<div class="control-group"><div class="control">',
                            'wrapper_end'   => '</div></div></div>',
                        )
                    )
                );
            ?>
        </div>
        <div class="all-50 small-100 wcv-product-table-search-results">
            <?php if ( strlen( $search ) > 0 ) : ?>
                <span class="wcv_search_results"><?php printf( /* translators: %s search term */ esc_html__( 'Search results for "%s" ...', 'wc-vendors' ), esc_html( $search ) ); ?></span>
            <?php endif; ?>
        </div>
    </div>
    <?php wp_nonce_field( 'wcv_product_table_nonce', 'wcv_product_table_nonce' ); ?>
</form>
<?php else : ?>
    <div class="all-100 small-100 wcv-product-table-pagination-<?php echo esc_attr( $position ); ?>">
        <?php
        echo $pagination_wrapper['wrapper_start']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo paginate_links( //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            apply_filters(
                'wcv_product_pagination_args',
                array(
                    'base'      => add_query_arg( 'paged', '%#%' ),
                    'format'    => '',
                    'current'   => ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1,
                    'total'     => $this->max_num_pages,
                    'prev_next' => true,
                    'type'      => 'list',
                ),
                ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1,
                $this->max_num_pages
            )
        );
        echo $pagination_wrapper['wrapper_end']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        ?>

    </div>
<?php endif; ?>
