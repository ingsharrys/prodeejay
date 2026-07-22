<?php
/**
 * The template for displaying the order details
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/order
 *
 * @package    WC_Vendors
 * @version    1.7.6
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

$total_colspan = wc_tax_enabled() ? count( $order->get_taxes() ) : 1;
$label_colspan = wc_tax_enabled() && $order->get_total_tax() > 0 ? 6 : 5;
$refund_class  = $is_order_refund ? 'has-refund' : '';
$order_id      = $order->get_id();


$allow_add_order_note = wc_string_to_bool( get_option( 'wcvendors_capability_order_update_notes', 'no' ) );
?>

<div class="wcv-shade wcv-fade">
    <div id="order-details-modal-<?php echo esc_attr( $order_id ); ?>" 
        class="wcv-modal wcv-fade"
        data-trigger="#open-order-details-modal-<?php echo esc_attr( $order_id ); ?>"
        data-width="80%" data-height="80%"
        data-reveal aria-labelledby="modalTitle-<?php echo esc_attr( $order_id ); ?>"
        aria-hidden="true"
        role="dialog">

        <div class="modal-header">
            <h3 id="modal-title">
                <span class="order-detail-icon">
                    <svg class="wcv-icon wcv-icon-40">
                        <use xlink:href="<?php echo esc_url_raw( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-order-detail-title"></use>
                    </svg>
                </span>
                <span class="order-detail-title">
                <?php
                echo esc_html(
                    sprintf(
                        // translators: %s: order number.
                        __( 'Order #%s Details', 'wc-vendors' ),
                        $order->get_order_number()
                    )
                );
                    ?>
                    - <?php echo esc_html( date_i18n( get_option( 'date_format', 'F j, Y' ), ( $order_date->getOffsetTimestamp() ) ) ); ?>
                </span>
            </h3>

            <button class="modal-close wcv-dismiss">
                <svg class="wcv-icon wcv-icon-40">
                    <use xlink:href="<?php echo esc_url_raw( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-times"></use>
                </svg>
            </button>
        </div>

        <div class="modal-body wcv-order-details" id="modalContent">

            <?php do_action( 'wcvendors_order_before_customer_detail' ); ?>

            <div class="wcv-order-customer-details wcv-flex wcv-flex-wrap">
                <?php if ( $details_display_options['billing_address'] || $details_display_options['email'] || $details_display_options['phone'] ) : ?>
                <div class="billing-details">
                    <h4><?php esc_html_e( 'Billing Details', 'wc-vendors' ); ?></h4>
                    <?php if ( $details_display_options['billing_address'] ) : ?>
                        <div class="wcv-order-address">
                            <?php if ( $order->get_formatted_billing_address() ) : ?>
                                <p>
                                    <small><?php esc_html_e( 'Address', 'wc-vendors' ); ?></small>
                                    
                                    <?php echo wp_kses( $order->get_formatted_billing_address(), array( 'br' => array() ) ); ?>
                                </p>
                            <?php else : ?>
                                <p class="none_set">
                                    <small><?php esc_html_e( 'Address', 'wc-vendors' ); ?></small>
                                    
                                    <?php esc_html_e( 'No billing address set.', 'wc-vendors' ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    <p class="wcv_mobile">&nbsp;</p>
                    <?php if ( $details_display_options['email'] ) : ?>
                        <div class="wcv-order-email">
                            <?php if ( $order->get_billing_email() ) : ?>
                                <p>
                                    <small><?php esc_html_e( 'Email', 'wc-vendors' ); ?></small>
                                    
                                    <?php echo esc_html( $order->get_billing_email() ); ?>
                                </p>
                            <?php else : ?>
                                <p class="none_set">
                                    <small><?php esc_html_e( 'Email', 'wc-vendors' ); ?></small>
                                    
                                    <?php esc_html_e( 'No email address set.', 'wc-vendors' ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ( $details_display_options['phone'] ) : ?>
                        <div class="wcv-order-phone">
                            <?php if ( $order->get_billing_phone() ) : ?>
                                <p>
                                    <small><?php esc_html_e( 'Phone / Landline Number', 'wc-vendors' ); ?>:</small>
                                    
                                    <?php echo esc_html( $order->get_billing_phone() ); ?>
                                </p>
                            <?php else : ?>
                                <p class="none_set">
                                    <small><?php esc_html_e( 'Phone / Landline Number', 'wc-vendors' ); ?></small>
                                    
                                    <?php esc_html_e( 'No phone number set.', 'wc-vendors' ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>  <!-- // billing details  -->
                <?php endif; ?>

                <?php if ( ( $details_display_options['shipping_address'] || $details_display_options['email'] || $details_display_options['phone'] ) && ! $vendor_shipping_disabled ) : ?>
                <div class="shipping-details">
                    <h4><?php esc_attr_e( 'Shipping details', 'wc-vendors' ); ?></h4>
                    <?php if ( $details_display_options['shipping_address'] ) : ?>
                        <div class="wcv-order-address">
                            <?php if ( $order->get_formatted_shipping_address() ) : ?>
                                <p>
                                    <small><?php esc_attr_e( 'Address', 'wc-vendors' ); ?></small>
                                    
                                    <?php echo wp_kses( $order->get_formatted_shipping_address(), array( 'br' => array() ) ); ?>
                                </p>
                            <?php else : ?>
                                <p class="none_set">
                                    <small><?php esc_html_e( 'Address', 'wc-vendors' ); ?></small>
                                    
                                    <?php esc_html_e( 'No shipping address set.', 'wc-vendors' ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    <p class="wcv_mobile">&nbsp;</p>
                    <?php if ( $details_display_options['email'] ) : ?>
                        <div class="wcv-order-email">
                            <?php if ( $order->get_billing_email() ) : ?>
                                <p>
                                    <small><?php esc_html_e( 'Email', 'wc-vendors' ); ?></small>
                                    
                                    <?php echo esc_html( $order->get_billing_email() ); ?>
                                </p>
                            <?php else : ?>
                                <p class="none_set">
                                    <small><?php esc_html_e( 'Email', 'wc-vendors' ); ?></small>
                                    
                                    <?php esc_html_e( 'No email address set.', 'wc-vendors' ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>

                    
                    <?php if ( $details_display_options['phone'] ) : ?>
                        <div class="wcv-order-phone">
                            <?php if ( $order->get_shipping_phone() ) : ?>
                                <p>
                                    <small><?php esc_html_e( 'Phone / Landline Number', 'wc-vendors' ); ?>:</small>
                                    
                                    <?php echo esc_html( $order->get_shipping_phone() ); ?>
                                </p>
                            <?php else : ?>
                                <p class="none_set">
                                    <small><?php esc_html_e( 'Phone / Landline Number', 'wc-vendors' ); ?></small>
                                    
                                    <?php esc_html_e( 'No phone number set.', 'wc-vendors' ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div> <!-- //shipping details  -->
                <?php endif; ?>
            </div>

            <div class="wcv_desktop" style="height: 0px; background-color: #e5e5e5; margin: 44px 0;"></div>
            <div class="wcv_mobile" style="height: 0px; background-color: #e5e5e5; margin: 24px 0;"></div>

            <?php do_action( 'wcvendors_order_before_items_detail' ); ?>

            <div class="wcv-order-items-details" style="margin-left: -15px">

                <div class="wcv-order-table-wrapper">

                    <table cellpadding="0" cellspacing="0" class="wcv-table wcv-order-table">
                        <thead>
                        <tr>
                            <th class="thumbnail"></th>
                            <th class="order_item" style="text-align: left;"><?php esc_html_e( 'Item', 'wc-vendors' ); ?></th>
                            <th class="commission" style="text-align: right;"><?php esc_html_e( 'Commission', 'wc-vendors' ); ?></th>
                            <th class="cost" style="text-align: right;"><?php esc_html_e( 'Cost', 'wc-vendors' ); ?></th>
                            <th class="qty" style="text-align: center;"><?php esc_html_e( 'Qty', 'wc-vendors' ); ?></th>
                            <th class="total" style="text-align: right;"><?php esc_html_e( 'Total', 'wc-vendors' ); ?></th>

                            <?php
                            if ( ! empty( $order_taxes ) ) :
                                foreach ( $order_taxes as $tax_id => $tax_item ) :
                                    $column_label = ! empty( $tax_item['label'] ) ? $tax_item['label'] : __( 'Tax', 'wc-vendors' );
                                    ?>
                                    <th class="line_tax tips"><?php echo esc_attr( $column_label ); ?></th>
                                    <?php
                                endforeach;
                            endif;
                            ?>
                        </tr>
                        </thead>
                        <!-- Desktop line items -->
                        <tbody id="order_line_items" class="<?php echo esc_attr( $refund_class ); ?>">
                        <?php foreach ( $order_item_details as $item_id => $order_item_detail ) : ?>

                            <tr class="order-item item-id-<?php echo esc_attr( $item_id ); ?>">
                                <td><div class="wcv-order-thumb"><?php echo wp_kses_post( $order_item_detail['thumbnail'] ); ?></div></td>
                                <td class="name">
                                    <?php echo esc_html( $order_item_detail['product_name'] ); ?>
                                    <?php echo wp_kses( $order_item_detail['product_meta'], wcv_allowed_html_tags() ); ?></td>
                                <td class="item_cost" style="text-align: right;"><?php echo wp_kses_post( $order_item_detail['commission'] ); ?></td>
                                <td class="item_cost" style="text-align: right;"><?php echo wp_kses_post( $order_item_detail['cost'] ); ?></td>
                                <td class="quantity" style="text-align: center;">
                                    <?php echo esc_html( $order_item_detail['qty'] ); ?>
                                    <?php if ( isset( $order_item_detail['refund_qty'] ) ) : ?>
                                        <small class="refunded">
                                            <?php echo esc_html( $order_item_detail['refund_qty'] ); ?>
                                        </small>
                                    <?php endif; ?>
                                </td>
                                <td class="line_cost" style="text-align: right;">
                                    <?php echo wp_kses_post( $order_item_detail['total'] ); ?>
                                    <?php if ( isset( $order_item_detail['refund_total'] ) ) : ?>
                                        <small class="refunded">
                                            <?php echo wp_kses_post( wc_price( -1 * $order_item_detail['refund_total'], array( 'currency' => $order_currency ) ) ); ?>
                                        </small>
                                    <?php endif; ?>
                                </td>

                                <?php if ( wc_tax_enabled() ) : ?>

                                <?php foreach ( $order_item_detail['tax_items'] as $tax_item ) : ?>
                                        <td class="line_tax">
                                            <div class="view">
                                                <?php echo wp_kses_post( $tax_item ); ?>
                                            </div>
                                            <?php if ( isset( $order_item_detail['refund_tax'] ) && $order_item_detail['refund_tax'] > 0 ) : ?>
                                                <small class="refunded">
                                                    <?php echo wp_kses_post( wc_price( -1 * $order_item_detail['refund_tax'], array( 'currency' => $order_currency ) ) ); ?>
                                                </small>
                                            <?php endif; ?>
                                        </td>
                                        <?php endforeach; ?>
                                <?php endif; ?>
                            </tr>

                        <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <div class="push-right wcv-order-table">
                    <div class="wcv-order-totals">
                        <!-- Shipping -->
                        <?php if ( ! $vendor_shipping_disabled ) : ?>
                        <div class="wcv-order-row shipping">
                            <span class="wcv-order-label">
                                <?php esc_html_e( 'Shipping', 'wc-vendors' ); ?>:
                            </span>
                            <span class="wcv-order-value">
                                <?php echo wp_kses_post( wc_price( $_order->total_shipping, array( 'currency' => $order_currency ) ) ); ?>
                            </span>
                        </div>
                        <?php endif; ?>

                        <!-- Tax Totals -->
                        <?php if ( wc_tax_enabled() ) : ?>
                            <?php foreach ( $_order->order->get_tax_totals() as $code => $tax_line ) : ?>
                                <div class="wcv-order-row tax">
                                    <span class="wcv-order-label">
                                        <?php echo esc_html( $tax_line->label ); ?>:
                                    </span>
                                    <span class="wcv-order-value">
                                        <?php echo wp_kses_post( wc_price( $tax_line->amount, array( 'currency' => $order_currency ) ) ); ?>
                                    </span>
                                </div>
                            <?php endforeach; ?>

                            <?php if ( $shipping_tax > 0 && ! $vendor_shipping_disabled ) : ?>
                                <div class="wcv-order-row shipping-tax">
                                    <span class="wcv-order-label">
                                        <?php esc_html_e( 'Shipping tax', 'wc-vendors' ); ?>:
                                    </span>
                                    <span class="wcv-order-value">
                                        <?php echo wp_kses_post( wc_price( $shipping_tax, array( 'currency' => $order_currency ) ) ); ?>
                                    </span>
                                </div>
                            <?php endif; ?>
                        <?php endif; ?>

                        <!-- Commission -->
                        <div class="wcv-order-row commission">
                            <span class="wcv-order-label">
                                <?php esc_html_e( 'Commission total', 'wc-vendors' ); ?>:
                            </span>
                            <span class="wcv-order-value">
                                <?php echo wp_kses_post( wc_price( $_order->commission_total, array( 'currency' => $order_currency ) ) ); ?>
                            </span>
                        </div>

                        <!-- Refund Information -->
                        <?php if ( $is_order_refund ) : ?>
                            <div class="wcv-order-row refunded">
                                <span class="wcv-order-label">
                                    <?php esc_html_e( 'Refunded', 'wc-vendors' ); ?>:
                                </span>
                                <span class="wcv-order-value">
                                    <?php echo wp_kses_post( wc_price( -1 * $total_refund, array( 'currency' => $order_currency ) ) ); ?>
                                </span>
                            </div>

                            <div class="wcv-order-row net-payment">
                                <span class="wcv-order-label">
                                    <?php esc_html_e( 'Net payment', 'wc-vendors' ); ?>:
                                </span>
                                <span class="wcv-order-value">
                                    <?php echo wp_kses_post( wc_price( $_order->total - $total_refund, array( 'currency' => $order_currency ) ) ); ?>
                                </span>
                            </div>
                        <?php endif; ?>
                        <hr>
                        <!-- Order Total -->
                        <div class="wcv-order-row total">
                            <span class="wcv-order-label">
                                <strong><?php esc_html_e( 'Order total', 'wc-vendors' ); ?>:</strong>
                            </span>
                            <span class="wcv-order-value">
                                <strong><?php echo wp_kses_post( wc_price( $_order->total, array( 'currency' => $order_currency ) ) ); ?></strong>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>

            </div>

            <div class="wcv-cols-group wcv-horizontal-gutters wcv_mobile wcv-mobile-order-items">
                <div class="all-100">
                    <div class="wcv-mobile-order-table">
                        <?php
                        foreach ( $order_item_details as $item_id => $order_item_detail ) :
?>
                            <div class="item-details wcv-cols-group wcv-horizontal-gutters" style="border: 1px solid rgba(0, 0, 0, 0.10); border-radius: 16px; padding: 20px; margin: 20px 0px;">
                                <div class="all-35" style="padding-left: 0px;"><div class="wcv-order-thumb"><?php echo wp_kses_post( $order_item_detail['thumbnail'] ); ?></div></div>
                                <div class="item-details all-65" style="padding-left: 0px;">
                                    <h3><?php echo esc_html( $order_item_detail['product_name'] ); ?></h3>
                                    <small><?php echo wp_kses( $order_item_detail['product_meta'], wcv_allowed_html_tags() ); ?></small>
                                    <small class="right-space"><?php esc_html_e( 'Commission', 'wc-vendors' ); ?>: </small><small><?php echo wp_kses_post( $order_item_detail['commission'] ); ?></small>
                                    <br />
                                    <small class="right-space"><?php esc_html_e( 'Cost', 'wc-vendors' ); ?>: </small><small><?php echo wp_kses_post( $order_item_detail['cost'] ); ?></small>
                                    <br />
                                    <small class="right-space"><?php esc_html_e( 'Qty', 'wc-vendors' ); ?>: </small><small><?php echo esc_html( $order_item_detail['qty'] ); ?></small>
                                    <br />
                                    <?php if ( $is_order_refund && isset( $order_item_detail['refund_qty'] ) && isset( $order_item_detail['refund_total'] ) ) : ?>
                                        <small class="refunded">
                                            <?php echo esc_html( $order_item_detail['refund_qty'] ); ?>x
                                            <?php echo wp_kses_post( wc_price( -1 * $order_item_detail['refund_total'], array( 'currency' => $order_currency ) ) ); ?>
                                        </small>
                                    <?php endif; ?>
                                </div>
                                <div class="all-100" style="background: rgba(0, 0, 0, 0.10); height: 1px;"></div>
                                <div class="all-35">
                                    <div style="width: 100%; height: 1px;"></div>
                                </div>
                                <div class="total all-60" style="padding-left: 0px;">
                                    <strong><span class="right-space"><?php esc_html_e( 'Subtotal:', 'wc-vendors' ); ?></span><span> <?php echo wp_kses_post( $order_item_detail['total'] ); ?></span></strong>
                                    <?php if ( $is_order_refund && isset( $order_item_detail['refund_qty'] ) && isset( $order_item_detail['refund_total'] ) ) : ?>
                                        <br />
                                        <small class="refunded">
                                            <?php echo esc_html( $order_item_detail['refund_qty'] ); ?>x
                                            <?php echo wp_kses_post( wc_price( -1 * $order_item_detail['refund_total'], array( 'currency' => $order_currency ) ) ); ?>
                                        </small>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                        <div class="all-30">
                            <div style="width: 100%; height: 1px;"></div>
                        </div>
                        <div class="all-70" style="font-size: 12px;">
                            <table class="wcv-order-table-mobile">
                            <?php if ( ! $vendor_shipping_disabled ) : ?>
                                <tr class="shipping wcv-order-shipping">
                                    <td class="wcv-order-totals-label right-space">
                                        <?php esc_html_e( 'Shipping', 'wc-vendors' ); ?>:
                                    </td>
                                <td>
                                    <?php echo wp_kses_post( wc_price( $_order->total_shipping, array( 'currency' => $order_currency ) ) ); ?>
                                </td>
                            </tr>
                            <?php endif; ?>

                            <?php if ( wc_tax_enabled() ) : ?>
                                <?php foreach ( $order->get_tax_totals() as $code => $tax_line ) : ?>
                                    <tr class="wcv-order-tax">
                                        <td class="wcv-order-totals-label right-space"><?php echo esc_html( $tax_line->label ); ?>:</td>
                                        <td><?php echo wp_kses_post( wc_price( $_order->total_tax, array( 'currency' => $order_currency ) ) ); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>

                            <tr class="wcv-order-commission">
                                <td class="wcv-order-totals-label right-space"><?php esc_html_e( 'Commission Total', 'wc-vendors' ); ?>:</td>
                                <td class="view">
                                    <?php echo wp_kses_post( wc_price( $_order->commission_total, array( 'currency' => $order_currency ) ) ); ?>
                                </td>
                            </tr>
                          
                            <tr class="wcv-order-total">
                                <td class="wcv-order-totals-label right-space">
                                    <strong> <?php esc_html_e( 'Order Total', 'wc-vendors' ); ?>:</strong>
                                </td>
                                <td class="view">
                                    <strong><?php echo wp_kses_post( wc_price( $_order->total, array( 'currency' => $order_currency ) ) ); ?></strong>
                                </td>
                            </tr>
                            <?php if ( $is_order_refund ) : ?>
                                <tr class="wcv-order-refunded">
                                    <td class="wcv-order-refund-label right-space">
                                        <?php esc_html_e( 'Refunded', 'wc-vendors' ); ?>:
                                    </td>
                                    <td class="refunded view">
                                        <?php echo wp_kses_post( wc_price( -1 * $total_refund, array( 'currency' => $order_currency ) ) ); ?>
                                    </td>
                                </tr>

                                <tr class="wcv-order-net-payment">
                                    <td class="wcv-order-refund-label right-space">
                                        <?php esc_html_e( 'Net payment', 'wc-vendors' ); ?>:
                                    </td>
                                    <td class="net-payment view">
                                            <?php echo wp_kses_post( wc_price( $_order->total - $total_refund, array( 'currency' => $order_currency ) ) ); ?>
                                    </td>
                                </tr>
                            <?php endif; ?>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <?php do_action( 'wcvendors_order_after_items_detail' ); ?>
            <div class="wcv_desktop" style="height: 1px; background-color: transparent; margin: 18px 0;"></div>
            <?php
            $allow_read_order_note = wc_string_to_bool( get_option( 'wcvendors_capability_order_read_notes', 'no' ) );
            ?>

            <?php if ( $allow_read_order_note ) : ?>
            <div class="wcv-cols-group wcv-horizontal-gutters">
                <div class="all-100">
                    <h4 class="wcv_desktop"><?php esc_html_e( 'Customer note', 'wc-vendors' ); ?></h4>
                    <strong class="wcv_mobile"><?php esc_html_e( 'Customer note', 'wc-vendors' ); ?></strong>
                    <div class="text-blue customer-note wcv_desktop" style="font-size: 20px;"><?php echo wp_kses_post( $customer_note ); ?></div>
                    <div class="text-blue customer-note wcv_mobile"><?php echo wp_kses_post( $customer_note ); ?></div>
                </div>
            </div>
            <?php endif; ?>
        </div>
        <div class="modal-footer">
            <div class="wcv-cols-group wcv-horizontal-gutters">
                <div class="all-100 wcv-button-group">
                    <?php if ( ! $_order->hide_mark_shipped ) : ?>
                        <?php if ( true === $shipped && ! $vendor_shipping_disabled ) : ?>
                            <a href="?wcv_mark_unshipped=<?php echo esc_attr( $order_id ); ?>" class="mark-order-unshipped wcv-button wcv-button-outline text-blue">
                                <span><?php echo esc_attr( __( 'Mark Unshipped', 'wc-vendors' ) ); ?></span>
                            </a>
                        <?php endif; ?>
                        <?php if ( false === $shipped && ! $vendor_shipping_disabled ) : ?>
                            <a href="?wcv_mark_shipped=<?php echo esc_attr( $order_id ); ?>" class="mark-order-shipped wcv-button">
                                <span><?php echo esc_attr( __( 'Mark Shipped', 'wc-vendors' ) ); ?></span>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                    <?php if ( $allow_add_order_note ) : ?>
                        <button class="wcv-button wcv-button-outline wcv-open-popup-add-note modal-close wcv-dismiss text-blue" data-modal="open-order-note-modal-<?php echo esc_attr( $order_id ); ?>">
                            <?php esc_html_e( 'Add Note', 'wc-vendors' ); ?>
                        </button>
                    <?php endif; ?>
                    <button class="wcv-button wcv-button-cancel modal-close wcv-dismiss"><?php esc_html_e( 'Cancel', 'wc-vendors' ); ?></button>
                </div>
            </div>
        </div>
    </div><!-- end wcv-modal -->
</div><!-- end wcv-shade -->
