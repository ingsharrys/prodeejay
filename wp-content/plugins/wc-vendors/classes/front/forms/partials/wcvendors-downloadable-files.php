<?php

/**
 * Downloadable files template
 *
 * This file is used to load the download files data
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

$downloadable_files = ! empty( $post_id ) ? wc_get_product( $post_id )->get_downloads( 'edit' ) : '';

?>

<div class="show_if_downloadable">
    <div class="form-field downloadable_files">
        <table class="wcvendors-table download_file_table">
            <thead>
            <tr>
                <th class="sort">&nbsp;</th>
                <th><?php esc_html_e( 'Name', 'wc-vendors' ); ?> <span class="tips"
                                                                    data-tip="<?php esc_html_e( 'This is the name of the download shown to the customer.', 'wc-vendors' ); ?>"></span>
                </th>
                <th><?php esc_html_e( 'File ', 'wc-vendors' ); ?></th>
                <th class="actions" style="width: 266px;"><?php esc_html_e( 'Actions', 'wc-vendors' ); ?></th>
            </tr>
            </thead>
            <tbody>
            <?php if ( $downloadable_files ) : ?>

                <?php foreach ( $downloadable_files as $key => $file ) : ?>

                    <?php $file_id = \wcv_get_attachment_id( $key ); ?>
                    <?php
                    $download   = new WC_Product_Download( $file_id );
                    $file_hash  = $download->get_id();
                    $input_type = array(
                        'file_url'  => 'hidden',
                        'file_name' => 'text',
                    );
                    if ( 'file_url' === $file_display_type ) {
                        $input_type = array(
                            'file_url'  => 'text',
                            'file_name' => 'hidden',
                        );
                    }
                    ?>
                    <?php $file_display = ( 'file_url' === $file_display_type ) ? $file['file'] : basename( $file['file'] ); ?>

                    <tr class="download_file">
                        <td class="sort wcv_desktop">
                            <svg class="wcv-icon wcv-icon-sm">
                                <use xlink:href="<?php echo WCV_ASSETS_URL; // phpcs:ignore ?>svg/wcv-icons.svg#wcv-icon-sort"></use>
                            </svg>
                        </td>
                        <td class="mobile-header"><?php esc_html_e( 'Name', 'wc-vendors' ); ?></td>
                        <td class="file_name">
                            <div class="control-group">
                                <div class="control">
                                    <input type="text" class="input_text"
                                            placeholder="<?php esc_html_e( 'File name', 'wc-vendors' ); ?>"
                                            name="_wc_file_names[]" value="<?php echo esc_attr( $file['name'] ); ?>"/>
                                </div>
                            </div>
                        </td>
                        <td class="mobile-header"><?php esc_html_e( 'File', 'wc-vendors' ); ?></td>
                        <td class="file_url">
                            <input type="<?php echo esc_attr( $input_type['file_name'] ); ?>" class="input_text file_display"
                                    placeholder="<?php esc_html_e( 'http://', 'wc-vendors' ); ?>" name="_wc_file_display[]"
                                    value="<?php echo esc_attr( basename( $file['file'] ) ); ?>"/>
                            <div class="control-group">
                                <div class="control">
                                    <input type="<?php echo esc_attr( $input_type['file_url'] ); ?>" class="file_url" name="_wc_file_urls[]"
                                            value="<?php echo esc_attr( $file['file'] ); ?>"/>
                                </div>
                            </div>
                            <input type="hidden" class="file_hash" name="_wc_file_hashes[]"
                                    value="<?php echo esc_attr( $key ); ?>"/>
                        </td>
                        <td class="file_url_choose full-span">
                            <div class="wcv-flex max-content">
                            <a href="#" class="wcv-button wcv-button-blue upload_file_button"
                                data-choose="<?php esc_html_e( 'Choose file', 'wc-vendors' ); ?>"
                                data-update="<?php esc_html_e( 'Insert file URL', 'wc-vendors' ); ?>">
                                <?php echo esc_html( str_replace( ' ', '&nbsp;', __( 'Choose file', 'wc-vendors' ) ) ); ?>
                            </a>
                            <a href="#" class="delete">
                                <?php esc_html_e( 'Remove', 'wc-vendors' ); ?>
                            </a>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
            </tbody>
            <tfoot>
            <tr>
                <th colspan="5" style="text-align: center;">
                    <a href="#" class="wcv-button text-blue wcv-button-link-secondary button insert" data-row="
                        <?php
                        $key           = '';
                        $file          = array(
                            'file' => '',
                            'name' => '',
                        );
                        $file_data_row = include 'download-file-data-row.php';

                        echo esc_attr( $file_data_row );
                        ?>
                    ">
                    <?php echo wcv_get_icon( 'wc-icon wcv-icon-left wcv-icon-middle wcv-icon-sm', 'wcv-icon-plus-circle' ); //phpcs:ignore ?>
                    <span class="vertical-middle">
                        <strong><?php esc_html_e( 'Add File', 'wc-vendors' ); ?></strong>
                    </span>
                </a>
                </th>
            </tr>
            </tfoot>
        </table>
    </div>


    <?php do_action( 'wcv_product_options_downloads' ); ?>

</div>
