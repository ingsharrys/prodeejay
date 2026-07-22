<?php
/**
 * WCV Admin Functions
 *
 * @since 2.6.6 - Add commission rate validation and change to WCV Admin Functions.
 * @version 2.6.5 - Fix security issues.
 * @package WC_Vendors\Classes\Admin
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 */
namespace WC_Vendors\Classes\Admin;

if ( ! function_exists( 'wcv_admin_checkbox' ) ) {
    /**
     * Admin checkbox field
     *
     * @param array   $value The field attributes.
     * @param boolean $required Whether the field is required.
     * @return void
     */
    function wcv_admin_checkbox( $value, $required = false ) {

        if ( ! isset( $value['type'] ) ) {
            return;
        }
        if ( ! isset( $value['id'] ) ) {
            $value['id'] = '';
        }
        if ( ! isset( $value['title'] ) ) {
            $value['title'] = isset( $value['name'] ) ? $value['name'] : '';
        }
        if ( ! isset( $value['class'] ) ) {
            $value['class'] = '';
        }
        if ( ! isset( $value['css'] ) ) {
            $value['css'] = '';
        }
        if ( ! isset( $value['default'] ) ) {
            $value['default'] = '';
        }
        if ( ! isset( $value['desc'] ) ) {
            $value['desc'] = '';
        }
        if ( ! isset( $value['desc_tip'] ) ) {
            $value['desc_tip'] = false;
        }
        if ( ! isset( $value['placeholder'] ) ) {
            $value['placeholder'] = '';
        }
        if ( ! isset( $value['suffix'] ) ) {
            $value['suffix'] = '';
        }

        if ( $required && ! isset( $value ['required_id'] ) ) {
            return;
        }

        if ( $required && isset( $value['required_id'] ) && ! empty( $value['required_id'] ) ) {
            $value['id'] = $value['required_id'];
        }

        // Custom attribute handling.
        $custom_attributes = array();

        if ( ! empty( $value['custom_attributes'] ) && is_array( $value['custom_attributes'] ) ) {
            foreach ( $value['custom_attributes'] as $attribute => $attribute_value ) {
                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $attribute_value ) . '"';
            }
        }

        $option_value      = \WCVendors_Admin_Settings::get_option( $value['id'], $value['default'] );
        $visibility_class  = array();
        $field_description = \WCVendors_Admin_Settings::get_field_description( $value );
        extract( $field_description ); // phpcs:ignore

        if ( ! empty( $value['title'] ) ) { ?>
            <legend class="screen-reader-text"><span><?php echo esc_html( $value['title'] ); ?></span></legend>

            <?php
        }
        ?>
        <input
                name="<?php echo esc_attr( $value['id'] ); ?>"
                id="<?php echo esc_attr( $value['id'] ); ?>"
                type="checkbox"
                class="<?php echo esc_attr( isset( $value['class'] ) ? $value['class'] : '' ); ?> wcv_admin_checkbox"
                value="1"
            <?php checked( $option_value, 'yes' ); ?>
            <?php echo esc_attr( implode( ' ', $custom_attributes ) ); ?>
        />

        <?php
    }
}


if ( ! function_exists( 'wcv_format_commission_rate_from_decimal_to_wc_sep' ) ) {
    /**
     * Format commission rate from decimal to WooCommerce decimal separator.
     *
     * Converts a commission rate (stored as decimal with period separator) to use
     * the WooCommerce configured decimal separator for display purposes.
     *
     * @since 2.6.6
     *
     * @param float|string $commission_rate The commission rate.
     * @return string The formatted commission rate, or empty string if invalid.
     */
    function wcv_format_commission_rate_from_decimal_to_wc_sep( $commission_rate ) {
        if ( ! is_numeric( $commission_rate ) || $commission_rate < 0 || $commission_rate > 100 ) {
            return '';
        }

        return number_format(
            (float) $commission_rate,
            wc_get_price_decimals(),
            wc_get_price_decimal_separator(),
            ''
        );
    }
}
