<?php
/**
 * The template for displaying the order note form this is displayed in the modal pop up.
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/order
 *
 * @package    WCVendors_Pro
 * @version    1.7.8
 * @since      1.2.3
 *
 *
 * The following variables are available in this template
 *
 * $order_id
 * $order_number
 * $notes
 */
?>
<form method="post" name="add_note_<?php echo esc_attr( $order_number ); ?>" id="add-comment_<?php echo esc_attr( $order_number ); ?>"
class="order_note_form wcv-form">
    <div class="wcv-shade wcv-fade">
        <div id="order-note-modal-<?php echo esc_attr( $order_number ); ?>" class="wcv-modal wcv-fade"
            data-trigger="#open-order-note-modal-<?php echo esc_attr( $order_number ); ?>" data-width="80%" data-height="80%" data-reveal
            aria-labelledby="modalTitle-<?php echo esc_attr( $order_number ); ?>" aria-hidden="true" role="dialog">

            <div class="modal-header">

                <h3 id="modal-title" class="note">
                    <span class="order-detail-icon">
                        <svg class="wcv-icon wcv-icon-40">
                            <use xlink:href="<?php echo esc_url_raw( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-note-detail-title"></use>
                        </svg>
                    </span>
                    <span class="order-detail-title">
                        <?php esc_html_e( 'Order Notes', 'wc-vendors' ); ?>
                    </span>
                </h3>
                <button class="modal-close wcv-dismiss">
                    <svg class="wcv-icon wcv-icon-md">
                        <use xlink:href="<?php echo WCV_ASSETS_URL; //phpcs:ignore ?>svg/wcv-icons.svg#wcv-icon-times"></use>
                    </svg>
                </button>
            </div>

            <div class="modal-body" id="modalContent">
                <div class="order_note_details">
                    <?php if ( '' !== $notes || null !== $notes ) : ?>
                        <?php echo wp_kses( $notes, wcv_allowed_html_tags() ); ?>
                    <?php endif; ?>

                        <?php wp_nonce_field( 'wcv-add-note', 'wcv_add_note' ); ?>
                        <p class="subtitle" style="margin-top: 40px; margin-bottom: 8px;"><?php echo esc_html__( 'This information will be emailed to the customer.', 'wc-vendors' ); ?></p>
                        <textarea name="wcv_comment_text" class="wcv_order_note" rows="5"></textarea>

                        <input type="hidden" name="wcv_order_id" value="<?php echo esc_attr( $order_id ); ?>">
                </div>
            </div>
            <div class="modal-footer">
                <div class="wcv-button-group">
                    <input class="wcv-button" type="submit" name="add_order_note"
                            value="<?php echo esc_attr__( 'Add Note', 'wc-vendors' ); ?>">
                    <button class="wcv-button wcv-button-cancel modal-close wcv-dismiss"><?php esc_html_e( 'Cancel', 'wc-vendors' ); ?></button>    
                </div>
            </div>
        </div><!-- end of wcv-modal -->
    </div><!-- end of wcv-shade -->
</form>
