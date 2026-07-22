<?php
/**
 * Product media uploader template
 *
 * This file contains the HTML markup for the product media uploader
 *
 * @since     2.5.2
 * @package   WCVendors
 * @subpackage templates/product
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_key
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_value
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Check if both featured image and gallery should be hidden.
if ( 'yes' === get_option( 'wcvendors_hide_product_media_featured', 'no' ) && 'yes' === get_option( 'wcvendors_hide_product_media_gallery', 'no' ) ) {
    return;
}

// Only proceed if featured image is not hidden.
if ( 'yes' !== get_option( 'wcvendors_hide_product_media_featured', 'no' ) ) :

    do_action( 'wcv_form_product_media_uploader_before_product_media_uploader', $post_id );
    ?>

    <div class="all-45 small-100 tiny-100 product-feat-image-upload small-align-center tiny-align-center">
        <h6 class="blue-title text-blue" style="width: 100%;"><?php esc_html_e( 'Featured Image', 'wc-vendors' ); ?></h6>
    
        
        <input type="hidden" id="_featured_image_id" name="_featured_image_id" value="<?php echo $post_thumb ? esc_attr( get_post_thumbnail_id( $post_id ) ) : ''; ?>" />
        <div class="wcv-featuredimg <?php echo $post_thumb ? 'has-image' : ''; ?>" data-title="<?php esc_html_e( 'Select or Upload a Feature Image', 'wc-vendors' ); ?>" data-button_text="<?php esc_html_e( 'Set Product Feature Image', 'wc-vendors' ); ?>">
            <?php
            if ( $post_thumb ) :
                $image_attributes = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), array( 300, 300 ) );
            ?>
                <img src="<?php echo esc_attr( $image_attributes[0] ); ?>" width="<?php echo esc_attr( $image_attributes[1] ); ?>" height="<?php echo esc_attr( $image_attributes[2] ); ?>">
            <?php endif; ?>
            <a type="button" href="#" class="wcv-media-uploader-featured-delete <?php echo ! $post_thumb ? 'hidden' : ''; ?>">
                <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-md wcv-icon-middle', 'wcv-icon-times' ), wcv_allowed_html_tags() ); ?>
            </a>
        </div>
        <div class="file-upload-wrapper featured-image-upload-wrapper <?php echo $post_thumb ? 'hidden' : ''; ?>">
            <small style="display: block;">&nbsp;</small>
            <?php include dirname( WCV_PLUGIN_FILE ) . '/classes/front/partials/product/wcvendors-upload-files-input.php'; ?>
        </div>
        <button type="button" class="wcv-media-uploader-featured-replace wcv-button wcv-button-outline bg-white text-blue <?php echo ! $post_thumb ? 'hidden' : ''; ?>" style="margin-top: 36px;">
            <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-setting-icon wcv-icon-left wcv-icon-middle', 'wcv-icon-replace-image' ), wcv_allowed_html_tags() ); ?>
            <span class="vertical-middle"><?php esc_html_e( 'Replace Featured Image', 'wc-vendors' ); ?></span>
        </button>

        <span class="wcv_featured_image_msg"></span>
    </div>

    <!-- Always open the gallery wrapper -->
    <div class="wcv-flex wcv-flex-end all-55 small-100 tiny-100 product-imgs-gallery-upload small-top-space tiny-top-space" id="product-imgs-gallery-upload">
        <?php
        if ( 'yes' !== get_option( 'wcvendors_hide_product_media_gallery', 'no' ) ) :
            if ( metadata_exists( 'post', $post_id, '_product_image_gallery' ) ) {
                $product_image_gallery = get_post_meta( $post_id, '_product_image_gallery', true );
            } else {
                // Backwards compat.
                if ( ! empty( $post_id ) ) {
                    $attachment_ids = get_posts( 'post_parent=' . $post_id . '&numberposts=-1&post_type=attachment&orderby=menu_order&order=ASC&post_mime_type=image&fields=ids&meta_key=_woocommerce_exclude_image&meta_value=0' );
                } else {
                    $attachment_ids = array();
                }

                $attachment_ids        = array_diff( $attachment_ids, array( get_post_thumbnail_id() ) );
                $product_image_gallery = implode( ',', $attachment_ids );
            }

            // Output the image gallery if there are any images.
            $attachment_ids = array_filter( explode( ',', $product_image_gallery ) );

            $max_gallery_count = get_option( 'wcvendors_product_max_gallery_count', 4 );
            $max_gallery_count = $max_gallery_count ? $max_gallery_count : 4;

            $gallery_options = apply_filters(
                'wcv_product_gallery_options',
                array(
                    'max_upload'          => $max_gallery_count,
                    'notice'              => __( 'You have reached the maximum number of gallery images.', 'wc-vendors' ),
                    'max_selected_notice' => sprintf(
                        /* translators: %1$d: maximum number of gallery images */
                        esc_html__( 'Maximum number of gallery images selected. Please select a maximum of %1$d images.', 'wc-vendors' ),
                        $max_gallery_count
                    ),
                )
            );
        ?>
            <div id="product-imgs-gallery-parent" style="width: 100%;">
                <h6 class="blue-title text-blue small-align-center tiny-align-center no-margin"><?php esc_html_e( 'Gallery', 'wc-vendors' ); ?></h6>
                <span style="display: block; margin-bottom: 25px; margin-top: 12px;" class="small-align-center tiny-align-center">
                    <?php
                    printf(
                        /* translators: %d: maximum number of gallery images */
                        esc_html__( 'Add more product images here, and you can upload up to %d files max', 'wc-vendors' ),
                        esc_html( $gallery_options['max_upload'] )
                    );
                    ?>
                </span>
                <?php $has_images = count( $attachment_ids ) > 0 ? 'has-images' : ''; ?>
                <div id="product_images_container" data-gallery_max_upload="<?php echo esc_attr( $gallery_options['max_upload'] ); ?>" data-gallery_max_notice="<?php echo esc_attr( $gallery_options['notice'] ); ?>" data-gallery_max_selected_notice="<?php echo esc_attr( $gallery_options['max_selected_notice'] ); ?>">
                    <ul class="product_images inline bottom-space <?php echo esc_attr( $has_images ); ?>" id="product_images">
                        <?php
                        if ( count( $attachment_ids ) > 0 ) :
                            foreach ( $attachment_ids as $attachment_id ) :
                            ?>
                                <li class="wcv-gallery-image" data-attachment_id="<?php echo esc_attr( $attachment_id ); ?>">
                                    <?php echo wp_get_attachment_image( $attachment_id, array( 150, 150 ) ); ?>
                                    <ul class="actions">
                                        <li><a href="#" class="delete" title="delete"><svg class="wcv-icon wcv-icon-md">
                                        <use xlink:href="<?php echo esc_attr( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-times"></use></svg></a></li>
                                    </ul>
                                </li>
                            <?php
                            endforeach;
                        endif;
                        ?>
                        <li class="file-upload-wrapper <?php echo ( count( $attachment_ids ) >= $gallery_options['max_upload'] ? 'hidden' : '' ); ?> tiny-align-center small-align-center">
                            <?php
                            wc_get_template(
                                'wcvendors-upload-files-input.php',
                                array(
                                    'should_small' => count( $attachment_ids ) > 0,
                                    'classes'      => 'small-push-center tiny-push-center',
                                ),
                                'wc-vendors/partials/product/',
                                dirname( WCV_PLUGIN_FILE ) . '/classes/front/partials/product/'
                            );
                            ?>
                        </li>
                    </ul>
                    <input type="hidden" id="product_image_gallery" name="product_image_gallery" value="<?php echo ( count( $attachment_ids ) > 0 ) ? esc_attr( $product_image_gallery ) : ''; ?>">
                </div>
                <small><?php esc_html_e( 'Only support .jpg, .png files', 'wc-vendors' ); ?></small>
                <span class="wcv_gallery_msg"></span>
            </div>
        <?php endif; ?>
    </div>

    <?php do_action( 'wcv_form_product_media_uploader_after_product_media_uploader', $post_id ); ?>

<?php endif; ?>
