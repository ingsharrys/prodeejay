<?php

/**
 * Variation default attributes loaded via ajax
 *
 * This file is used to load the product variations
 *
 * @link       http://www.wcvendors.com
 * @since      2.5.2
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
?>

<div class="variations-defaults">
    <div class="wcv-cols-group wcv-horizontal-gutters">
        <div class="all-100">
            <div class="control-group no-margin">
                <label for="default_attributes">
                    <?php esc_html_e( 'Set Default Variation', 'wc-vendors' ); ?>
                </label>
                <span class="wcv-tip">
                    <svg class="wcv-icon wcv-setting-icon">
                        <use xlink:href="<?php echo WCV_ASSETS_URL; // phpcs:ignore ?>svg/wcv-icons.svg#wcv-icon-info"></use>
                    </svg>
                    <span class="content">
                        <?php esc_html_e( 'These are the attributes that will be pre-selected on the frontend.', 'wc-vendors' ); ?>
                        <span class="arrow"></span>
                    </span>
                </span>
            </div>
            <div class="variation_default_values all-100">
            <div class="variation-default-values">
            <?php

            $attributes = WCV_Utils::array_sort( $attributes, 'position' );

            foreach ( $attributes as $attribute ) {

                echo '<select data-taxonomy="' . esc_attr( sanitize_title( $attribute['name'] ) ) . '" name="default_attribute_' . esc_attr( sanitize_title( $attribute['name'] ) ) . '" data-current="" class="default_attribute ' . esc_attr( sanitize_title( $attribute['name'] ) ) . '"><option value="">' . esc_html__( 'No default', 'wc-vendors' ) . ' ' . esc_html( wc_attribute_label( $attribute['name'] ) ) . '&hellip;</option>';

                foreach ( $attribute['values'] as $key => $value ) {
                    echo '<option value="' . esc_attr( $key ) . '">' . esc_html( $value ) . '</option>';

                }

                echo '</select>';
            }
            ?>
            </div>
        </div>
        </div>
    </div>
</div>
