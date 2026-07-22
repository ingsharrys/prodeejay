<?php

/**
 * Product Variation Download
 *
 * This file is used to load the product variation download
 *
 * @link       http://www.wcvendors.com
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
    $variation_key = ! is_null( get_post( $variation_id ) ) ? $variation_id : $loop;
?>
<tr>
    <td class="mobile-header">
        <?php esc_html_e( 'Name', 'wc-vendors' ); ?>
    </td>
    <td class="file_name">
        <div class="control">
            <input type="text" class="input_text" placeholder="<?php esc_attr_e( 'File name', 'wc-vendors' ); ?>"
                    name="_wc_variation_file_names[<?php echo esc_attr( $variation_key ); ?>][]"
                    value="<?php echo esc_attr( $file['name'] ); ?>"/>
        </div>
    </td>
    <td class="mobile-header">
        <?php esc_html_e( 'File', 'wc-vendors' ); ?>
    </td>
    <td class="file_url">
        <div class="control">
            <input type="text" class="file_url" name="_wc_variation_file_urls[<?php echo esc_attr( $variation_key ); ?>][]"
                    value="<?php echo esc_attr( $file['file'] ); ?>"/>
            <input type="hidden" class="file_id" name="_wc_variation_file_ids[<?php echo esc_attr( $variation_key ); ?>][]"
                    value="<?php echo esc_attr( $file_id ); ?>"/>
        </div>
    </td>

    <td class="file_url_choose full-span">
        <div class="wcv-flex max-content">
        <a href="#" class="wcv-button wcv-button-blue upload_file_button"
                    data-choose="<?php esc_attr_e( 'Choose file', 'wc-vendors' ); ?>"
                    data-update="<?php esc_attr_e( 'Insert file URL', 'wc-vendors' ); ?>">
                    <?php echo esc_attr( str_replace( ' ', '&nbsp;', __( 'Choose file', 'wc-vendors' ) ) ); ?>
        </a>
        <a href="#" class="delete">
            <?php esc_html_e( 'Remove', 'wc-vendors' ); ?>
        </a>
        </div>
    </td>
</tr>
