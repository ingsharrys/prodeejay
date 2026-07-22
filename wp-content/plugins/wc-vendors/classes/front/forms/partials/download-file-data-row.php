<?php
/**
 * Download file data row for appending to the download files table
 *
 * @since 2.5.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<?php ob_start(); ?>
<tr class="download_file">
    <td class="sort wcv_desktop">
        <svg class="wcv-icon wcv-icon-sm">
            <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL . 'svg/wcv-icons.svg#wcv-icon-sort' ); ?>"></use>
        </svg>
    </td>
    <td class="mobile-header"><?php esc_html_e( 'Name', 'wc-vendors' ); ?></td>
    <td class="file_name">
        <div class="control-group">
            <div class="control">
                <input type="text" class="input_text" placeholder="<?php esc_attr_e( 'File Name', 'wc-vendors' ); ?>" name="_wc_file_names[]" value="<?php echo esc_attr( $file['name'] ); ?>" />
                <input type="hidden" name="_wc_file_hashes[]" value="<?php echo esc_attr( $key ); ?>" />
            </div>
        </div>
    </td>
    <td class="mobile-header"><?php esc_html_e( 'File', 'wc-vendors' ); ?></td>
    <td class="file_url">
        <div class="control-group">
            <div class="control">
                <input type="hidden" class="file_id" name="_wc_file_ids[]" value="" />
                <input type="text" class="file_url" name="_wc_file_urls[]" value="" />
            </div>
        </div>
    </td>
    <td class="file_url_choose full-span">
        <div class="wcv-flex max-content">
            <a href="#" class="wcv-button wcv-button-blue upload_file_button" data-choose="<?php esc_attr_e( 'Choose file', 'wc-vendors' ); ?>" data-update="<?php esc_attr_e( 'Insert file URL', 'wc-vendors' ); ?>">
                <?php echo esc_html__( 'Choose file', 'wc-vendors' ); ?>
            </a>
            <a href="#" class="delete"><?php esc_html_e( 'Remove', 'wc-vendors' ); ?></a>
        </div>

    </td>
</tr>
<?php return ob_get_clean(); ?>
