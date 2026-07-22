<?php

/**
 * Product Attribute
 *
 * This file is used to load the product attribute
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
?>

<div data-index_value="<?php echo esc_attr( $i ); ?>" data-label="<?php echo esc_html( $attribute_label ); ?>"
    data-taxonomy="<?php echo esc_attr( $taxo ); ?>"
    class="woocommerce_attribute wcv-metabox closed <?php echo esc_attr( implode( ' ', $metabox_class ) ); ?>"
    rel="<?php echo esc_attr( $position ); ?>">
    <div class="wcv-flex wcv-attr-header" style="cursor: pointer;">
        <h3 class="no-margin attribute_name"><?php echo esc_html( $attribute_label ); ?></h3>
        <div class="align-right">
            <a href="#" class="remove_row delete">
                <svg class="wcv-icon wcv-icon-24 wcv-icon-middle">
                    <use xlink:href="<?php echo WCV_ASSETS_URL; // phpcs:ignore ?>svg/wcv-icons.svg?t=<?php echo esc_attr( time() ); ?>#wcv-icon-trash"></use>
                </svg>
                <span class="vertical-middle hide-small hide-tiny"><?php esc_html_e( 'Remove', 'wc-vendors' ); ?></span>
            </a>
            <span class="caret left-space">
                <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-sm wcv-icon-middle', 'wcv-icon-caret-down' ), wcv_allowed_html_tags() ); ?>
            </span>
        </div>
    </div>

    <div class="wcv_attribute_data wcv-metabox-content top-space" style="display: none;">

        <div class="wcv-column-group wcv-horizontal-gutters">
            <div class="all-50 small-100">
                <div class="control-group no-margin" data-index_value="<?php echo esc_attr( $i ); ?>">
                    <?php if ( $attribute['is_taxonomy'] ) : ?>
                        <input type="hidden" name="attribute_names[<?php echo esc_attr( $i ); ?>]"
                                value="<?php echo esc_attr( $taxo ); ?>"/>
                    <?php else : ?>
                        <input type="text" class="attribute_name" name="attribute_names[<?php echo esc_attr( $i ); ?>]"
                                value="<?php echo esc_attr( $attribute['name'] ); ?>"/>
                    <?php endif; ?>

                    <input type="hidden" name="attribute_position[<?php echo esc_attr( $i ); ?>]" class="attribute_position"
                            value="<?php echo esc_attr( $position ); ?>" id="attribute_position_<?php echo esc_attr( $i ); ?>"/>
                    <input type="hidden" name="attribute_is_taxonomy[<?php echo esc_attr( $i ); ?>]"
                            value="<?php echo $attribute['is_taxonomy'] ? 1 : 0; ?>"/>

                    <div style="display: flex; gap: 6px; flex-direction: column; margin-top: 24px;">
                        <div>
                            <label class="wcv-checkbox-container">
                            <input type="checkbox" class="checkbox" <?php checked( $attribute['is_visible'], 1 ); ?>
                                    name="attribute_visibility[<?php echo esc_attr( $i ); ?>]" value="1"/>
                                <?php esc_html_e( 'Visible on the product page', 'wc-vendors' ); ?>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="enable_variation show_if_variable">
                            <label class="wcv-checkbox-container">
                                <input type="checkbox"
                                        class="checkbox wcv_variation_checkbox" <?php checked( $attribute['is_variation'], 1 ); ?>
                                        id="attribute_variation_<?php echo esc_attr( $i ); ?>"
                                        name="attribute_variation[<?php echo esc_attr( $i ); ?>]" value="1"/>
                                <?php esc_html_e( 'Used for variations', 'wc-vendors' ); ?>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="all-50 small-100" style="margin-top: 24px;">
                <div class="control-group no-margin">
                    <label style="text-transform: none;"><?php esc_html_e( 'Value(s)', 'wc-vendors' ); ?>:</label>
                    <div class="control align-right" data-index_value="<?php echo esc_attr( $i ); ?>" data-taxonomy="<?php echo esc_attr( $taxo ); ?>"
                        data-label="<?php echo esc_html( $attribute_label ); ?>">
                        <?php if ( $attribute['is_taxonomy'] ) : ?>
                            <?php if ( 'text' === $attribute_taxonomy->attribute_type ) : ?>

                                <input type="text" id="attribute_values_<?php echo esc_attr( $i ); ?>"
                                        name="attribute_values[<?php echo esc_attr( $i ); ?>]"
                                        value="<?php echo esc_attr( implode( ' ' . WC_DELIMITER . ' ', wp_get_post_terms( $post_id, $taxo, array( 'fields' => 'names' ) ) ) ); ?>"
                                        placeholder="<?php echo esc_attr( sprintf( /* translators: %s: delimiter */ __( '"%s" separate terms', 'wc-vendors' ), WC_DELIMITER ) ); ?>"
                                        class="attribute_values"/>

                            <?php else : ?>

                                <select multiple="multiple" id="attribute_values_<?php echo esc_attr( $i ); ?>"
                                        data-placeholder="<?php esc_attr_e( 'Select terms', 'wc-vendors' ); ?>"
                                        class="attribute_values select2" name="attribute_values[<?php echo esc_attr( $i ); ?>][]"
                                        style="width: 100%">
                                    <?php
                                    $args      = array(
                                        'orderby'    => ! empty( $attribute_taxonomy->attribute_orderby ) ? $attribute_taxonomy->attribute_orderby : 'name',
                                        'hide_empty' => 0,
                                        'taxonomy'   => $taxo,
                                    );
                                    $all_terms = get_terms( apply_filters( 'wcv_product_attribute_terms', $args ) );
                                    if ( $all_terms ) {
                                        foreach ( $all_terms as $t ) {
                                            echo '<option value="' . esc_attr( $t->slug ) . '" ' . selected( has_term( absint( $t->term_id ), $taxo, $post_id ), true, false ) . '>' . esc_html( $t->name ) . '</option>';
                                        }
                                    }
                                    ?>
                                </select>
                                <button class="wcv-button wcv-button-blue-underline select_all_attributes align-right"><strong><?php esc_html_e( 'Select All', 'wc-vendors' ); ?></strong></button>
                                <button class="wcv-button wcv-button-blue-underline select_no_attributes"><strong><?php esc_html_e( 'Select None', 'wc-vendors' ); ?></strong></button>
                                <?php if ( $attribute_terms_allowed ) : ?>

                                    <button class="wcv-button wcv-button-blue-underline add_new_attribute"
                                            data-selectid="attribute_values_<?php echo esc_attr( $i ); ?>"
                                            style="float:right;"><strong><?php esc_html_e( 'Add new', 'wc-vendors' ); ?></strong></button>

                                <?php endif; ?>

                                <?php do_action( 'wcv_product_option_terms', $attribute_taxonomy, $i, $attribute ); ?>

                            <?php endif; ?>

                        <?php else : ?>
                            <input type="text" id="attribute_values_<?php echo esc_attr( $i ); ?>"
                                    name="attribute_values[<?php echo esc_attr( $i ); ?>]"
                                    value="<?php echo esc_attr( $attribute['value'] ); ?>"
                                    placeholder="<?php echo esc_attr( sprintf( /* translators: %s: delimiter */ __( '"%s" separate terms', 'wc-vendors' ), WC_DELIMITER ) ); ?>"
                                    class="attribute_values"/>
                        <?php endif; ?>
                    </div>
                </div> <!-- end control group -->
            </div>


        </div>

    </div>
    <div style="clear: both;"></div>
</div>
