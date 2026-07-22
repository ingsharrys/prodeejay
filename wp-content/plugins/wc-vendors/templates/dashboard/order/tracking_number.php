<?php
/**
 * The template for displaying the tracking number form this is displayed in the modal pop up.
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/order
 *
 * @package    WC_Vendors
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
use WC_Vendors\Classes\Front\Forms\WCV_Tracking_Number_Form;
// Change text to make UI a little cleaner.
$button_text = '';

if ( isset( $tracking_details['_wcv_tracking_number'] ) && '' !== $tracking_details['_wcv_tracking_number'] ) {
    $button_text = __( 'Save Tracking', 'wc-vendors' );
} else {
    $button_text = __( 'Save Tracking', 'wc-vendors' );
}

?>
<form method="post" class="wcv-form wcv-form-exclude" action="">
    <div class="wcv-shade wcv-fade">
        <div id="tracking-modal-<?php echo esc_attr( $order_number ); ?>" class="wcv-modal wcv-fade"
            data-trigger="#open-tracking-modal-<?php echo esc_attr( $order_number ); ?>" data-width="80%" data-height="80%"
            aria-labelledby="modalTitle-<?php echo esc_attr( $order_number ); ?>" aria-hidden="true" role="dialog">

        <div class="modal-header">
            <h3 id="modal-title" class="tracking">
                <span class="order-detail-icon">
                    <svg class="wcv-icon wcv-icon-40">
                        <use xlink:href="<?php echo esc_url_raw( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-tracking-detail-title"></use>
                    </svg>
                </span>
                <span class="order-detail-title tracking">
                    <?php esc_html_e( 'Shipment Tracking', 'wc-vendors' ); ?>
                </span>
            </h3>
            <button class="modal-close wcv-dismiss">
                <svg class="wcv-icon wcv-icon-40">
                    <use xlink:href="<?php echo esc_url_raw( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-times"></use>
                </svg>
            </button>
        </div>

        <div class="modal-body" id="tracking-modal-<?php echo esc_attr( $order_number ); ?>-content">

            <form method="post" class="wcv-form wcv-form-exclude" action="">

                
                <div class="wcv-cols-group wcv-horizontal-gutters wcv-control-groups-medium">
                    <div class="all-100">
                        <?php WCV_Tracking_Number_Form::shipping_provider( $tracking_details['_wcv_shipping_provider'], $order_id ); ?>
                    </div>
                    <div class="all-65 small-100">
                        <?php WCV_Tracking_Number_Form::tracking_number( $tracking_details['_wcv_tracking_number'], $order_id ); ?>
                    </div>
                    <div class="all-35 small-100">
                        <?php WCV_Tracking_Number_Form::date_shipped( $tracking_details['_wcv_date_shipped'], $order_id ); ?>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            <?php do_action( 'wcvendors_tracking_modal_before_submit_button', $order_id, $tracking_details, $order_number ); ?>
                    <div class="wcv-button-group">
                        <?php WCV_Tracking_Number_Form::form_data( $order_id, $button_text ); ?>
                        <button class="wcv-button wcv-button-cancel modal-close wcv-dismiss"><?php esc_html_e( 'Cancel', 'wc-vendors' ); ?></button>
                    </div>
            </div>
        </div>
    </div>
</form>
