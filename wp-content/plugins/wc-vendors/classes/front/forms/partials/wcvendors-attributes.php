<?php

/**
 * Product Attributes
 *
 * This file is used to load the overall product attributes
 *
 * @link    http://www.wcvendors.com
 * @since   2.5.2
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.NoCaching
 */
?>

<div class="wcv-flex wcv-flex-space wcv-flex-wrap wcv-gap-bottom wcv-gap-bottom-small">
    <div class="all-50">
        <select name="attribute_taxonomy" class="attribute_taxonomy" style="width: 260px;">
            <option value=""><?php echo esc_html( apply_filters( 'wcv_custom_attribute_default_label', __( 'Select an attribute', 'wc-vendors' ) ) ); ?></option>
            <?php
            global $wc_product_attributes;

            // Array of defined attribute taxonomies.
            $attribute_taxonomies = wc_get_attribute_taxonomies();
            $hide_attr_option     = get_option( 'wcvendors_hide_attributes_list', '' );
            $hide_attr_list       = explode( ',', $hide_attr_option );
            if ( $attribute_taxonomies ) {
                foreach ( $attribute_taxonomies as $taxo ) {
                    if ( in_array( $taxo->attribute_id, $hide_attr_list, true ) ) {
                        continue;
                    }
                    $attribute_taxonomy_name = wc_attribute_taxonomy_name( $taxo->attribute_name );
                    $label                   = $taxo->attribute_label ? $taxo->attribute_label : $taxo->attribute_name;
                    echo '<option value="' . esc_attr( $attribute_taxonomy_name ) . '">' . esc_html( $label ) . '</option>';
                }
        }
        ?>
        </select>
    </div>

    <div class="all-50 align-right">
        <span class="expand-close">
            <a href="#" class="expand_all wcv-x-space">
                <?php echo wcv_get_icon( 'wcv-icon wcv-icon-md wcv-icon-middle', 'wcv-icon-expand' ); //phpcs:ignore ?>
                <span class="vertical-middle vertical-middle hide-small hide-tiny"><?php esc_html_e( 'Expand All', 'wc-vendors' ); ?></span>
            </a>
            <a href="#" class="close_all wcv-x-space">
                <?php echo wcv_get_icon( 'wcv-icon wcv-icon-md wcv-icon-middle', 'wcv-icon-collapse' ); //phpcs:ignore ?>
                <span class="vertical-middle vertical-middle hide-small hide-tiny"><?php esc_html_e( 'Collapse All', 'wc-vendors' ); ?></span>
            </a>
        </span>
    </div>
</div>

<div class="product_attributes">
    <?php
    // Product attributes - taxonomies and custom, ordered, with visibility and variation attributes set.
    $attributes = maybe_unserialize( get_post_meta( $post_id, '_product_attributes', true ) );

    // Output All Set Attributes.
    if ( ! empty( $attributes ) ) {
        $attribute_keys  = array_keys( $attributes );
        $attribute_total = count( $attribute_keys );

        for ( $i = 0; $i < $attribute_total; $i++ ) {
            $attribute     = $attributes[ $attribute_keys[ $i ] ];
            $position      = empty( $attribute['position'] ) ? 0 : absint( $attribute['position'] );
            $taxo          = '';
            $metabox_class = array();

            if ( $attribute['is_taxonomy'] ) {
                $taxo = $attribute['name'];

                if ( ! taxonomy_exists( $taxo ) ) {
                    continue;
                }

                $attribute_taxonomy = $wc_product_attributes[ $taxo ];
                $metabox_class[]    = 'taxonomy';
                $metabox_class[]    = $taxo;
                $attribute_label    = wc_attribute_label( $taxo );
            } else {
                $attribute_label = apply_filters( 'woocommerce_attribute_label', $attribute['name'], $attribute['name'] );
                $taxo            = sanitize_title( $attribute['name'] );
            }

            include 'wcvendors-product-attribute.php';
        } // end for
    } // end if
    ?>
</div>

<input type="hidden" id="wcv-variation-attributes" data-variation_attr="{}" />

<div class="clear"></div>
