<?php
/**
 * Order popup details template
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @package    WC_Vendors
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>
<div class="wcv-shade wcv-fade">
    <div id="order-details-modal-<?php echo esc_attr( $order_id ); ?>" 
        class="wcv-modal wcv-fade wcvendors-table-order"
        data-trigger="#open-order-details-modal-<?php echo esc_attr( $order_id ); ?>"
        data-width="80%" data-height="80%"
        data-reveal aria-labelledby="modalTitle-<?php echo esc_attr( $order_id ); ?>"
        aria-hidden="true"
        role="dialog"
        style="text-align: left;">

        <div class="modal-header">
            <h3 id="modal-title">
                <span class="order-detail-icon">
                    <svg class="wcv-icon wcv-icon-40">
                        <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-order-detail-title"></use>
                    </svg>
                </span>
                <span class="order-detail-title">
                    <?php
                    printf(
                        // translators: %1$s: order id, %2$s: order date.
                        '%s #%s %s -  %s',
                        esc_html__( 'Orders', 'wc-vendors' ),
                        esc_html( $order_details['order_id'] ),
                        esc_html__( 'Details', 'wc-vendors' ),
                        esc_html( gmdate( 'F j, Y', strtotime( $order_details['order_date'] ) ) )
                    );
                    ?>
                </span>
            </h3>
            <button class="modal-close wcv-dismiss">
                <svg class="wcv-icon wcv-icon-40">
                    <use xlink:href="<?php echo esc_url_raw( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-times"></use>
                </svg>
            </button>
        </div>

        <div class="modal-body">

            <div class="wcv-order-customer-details wcv-flex wcv-flex-wrap">
                <?php if ( $details_display_options['billing_address'] || $details_display_options['email'] || $details_display_options['phone'] ) : ?>
                <div class="billing-details">
                    <h4><?php esc_html_e( 'Billing Details', 'wc-vendors' ); ?></h4>
                    <?php if ( $details_display_options['billing_address'] ) : ?>
                        <div><p><small><?php esc_html_e( 'Address', 'wc-vendors' ); ?></small> <?php echo $billing_details['address'] ? wp_kses( $billing_details['address'], array( 'br' => array() ) ) : esc_html__( 'Not set', 'wc-vendors' ); ?></p></div>
                    <?php endif; ?>
                    <?php if ( $details_display_options['email'] ) : ?>
                        <div><p><small><?php esc_html_e( 'Email', 'wc-vendors' ); ?></small> <?php echo $billing_details['email'] ? esc_html( $billing_details['email'] ) : esc_html__( 'Not set', 'wc-vendors' ); ?></p></div>
                    <?php endif; ?>
                    <?php if ( $details_display_options['phone'] ) : ?>
                        <div><p><small><?php esc_html_e( 'Phone', 'wc-vendors' ); ?></small> <?php echo $billing_details['phone'] ? esc_html( $billing_details['phone'] ) : esc_html__( 'Not set', 'wc-vendors' ); ?></p></div>
                    <?php endif; ?>
                    
                </div>
                <?php endif; ?>

                <?php if ( ! $vendor_shipping_disabled && ( $details_display_options['shipping_address'] || $details_display_options['email'] || $details_display_options['phone'] ) ) : ?>
                <div class="shipping-details">
                    <h4><?php esc_html_e( 'Shipping Details', 'wc-vendors' ); ?></h4>
                    <?php if ( $details_display_options['shipping_address'] ) : ?>
                        <div><p><small><?php esc_html_e( 'Address', 'wc-vendors' ); ?></small> <?php echo $shipping_details['address'] ? wp_kses( $shipping_details['address'], array( 'br' => array() ) ) : esc_html__( 'Not set', 'wc-vendors' ); ?></p></div>
                    <?php endif; ?>
                    <?php if ( $details_display_options['email'] ) : ?>
                        <div><p><small><?php esc_html_e( 'Email', 'wc-vendors' ); ?></small> <?php echo $shipping_details['email'] ? esc_html( $shipping_details['email'] ) : esc_html__( 'Not set', 'wc-vendors' ); ?></p></div>
                    <?php endif; ?>
                    <?php if ( $details_display_options['phone'] ) : ?>
                        <div><p><small><?php esc_html_e( 'Phone', 'wc-vendors' ); ?></small> <?php echo $shipping_details['phone'] ? esc_html( $shipping_details['phone'] ) : esc_html__( 'Not set', 'wc-vendors' ); ?></p></div>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
            </div>
            <div class="wcv-order-popup-details wcv-gap-top wcv_desktop wcv-order-items-details wcv-order-details">
                <table class="wcv-table wcv-order-table">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th style="text-align: left;"><?php esc_html_e( 'ITEM', 'wc-vendors' ); ?></th>
                            <th><?php esc_html_e( 'COMMISSION', 'wc-vendors' ); ?></th>
                            <th><?php esc_html_e( 'QUANTITY', 'wc-vendors' ); ?></th>
                            <th><?php esc_html_e( 'COST', 'wc-vendors' ); ?></th>
                            <?php if ( wc_tax_enabled() ) : ?>
                                <th><?php esc_html_e( 'TAX', 'wc-vendors' ); ?></th>
                            <?php endif; ?>
                            <th><?php esc_html_e( 'TOTAL', 'wc-vendors' ); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ( $order_items as $item ) : ?>
                            <tr>
                                <td>
                                    <div class="wcv-order-thumb">
                                        <img src="<?php echo esc_url( $item['thumbnail'] ); ?>" alt="<?php echo esc_attr( $item['name'] ); ?>" />
                                    </div>
                                </td>
                                <td class="name" style="text-align: left;">
                                    <?php echo esc_html( $item['name'] ); ?>
                                    <small><?php echo wp_kses( $item['product_meta'], wcv_allowed_html_tags() ); ?></small>
                                </td>

                                <td class="commission"><?php echo wp_kses_post( wc_price( $item['commission'] ) ); ?></td>
                                <td class="quantity">
                                    <?php echo esc_html( $item['quantity'] ); ?>
                                    <?php if ( $item['refunded_qty'] ) : ?>
                                        <small class="refunded">
                                            <?php echo esc_html( $item['refunded_qty'] ); ?>
                                        </small>
                                    <?php endif; ?>
                                </td>
                                <td class="cost"><?php echo wp_kses_post( wc_price( $item['cost'] ) ); ?></td>
                                <?php if ( wc_tax_enabled() ) : ?>
                                    <td class="tax">
                                        <?php echo wp_kses_post( wc_price( $item['tax'] ) ); ?>
                                    </td>
                                <?php endif; ?>
                                <td class="total">
                                    <?php echo wp_kses_post( wc_price( $item['total'] ) ); ?>
                                    <?php if ( $item['refunded'] > 0 ) : ?>
                                        <small class="wcv-order-item-refunded refunded">
                                            <?php echo wp_kses_post( wc_price( -1 * $item['refunded'] ) ); ?>
                                        </small>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <div class="wcv_desktop" style="height: 0px; background-color: #e5e5e5; margin: 44px 0;"></div>
            <div class="wcv_mobile" style="height: 0px; background-color: #e5e5e5; margin: 24px 0;"></div>
        
            <div class="push-right wcv-order-table wcv_desktop">
                <div class="wcv-order-totals">
                    <!-- Shipping -->
                    <?php if ( ! $vendor_shipping_disabled ) : ?>
                    <div class="wcv-order-row shipping">
                        <span class="wcv-order-label">
                            <?php esc_html_e( 'Shipping', 'wc-vendors' ); ?>:
                        </span>
                        <span class="wcv-order-value">
                            <?php echo wp_kses_post( wc_price( $order_shipping, array( 'currency' => $order_currency ) ) ); ?>
                        </span>
                    </div>
                    <?php endif; ?>

                    <!-- Tax Totals -->
                    <?php if ( wc_tax_enabled() ) : ?>
                        <?php foreach ( $order->get_tax_totals() as $code => $tax_line ) : ?>
                            <div class="wcv-order-row tax">
                                <span class="wcv-order-label">
                                    <?php echo esc_html( $tax_line->label ); ?>:
                                </span>
                                <span class="wcv-order-value">
                                    <?php echo wp_kses_post( wc_price( $tax_line->amount, array( 'currency' => $order_currency ) ) ); ?>
                                </span>
                            </div>
                        <?php endforeach; ?>

                        <?php if ( ! $vendor_shipping_disabled && $shipping_tax > 0 ) : ?>
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
                            <?php echo wp_kses_post( wc_price( $order_commission, array( 'currency' => $order_currency ) ) ); ?>
                        </span>
                    </div>

                    <!-- Refund Information -->
                    <?php if ( $refunded_amount > 0 ) : ?>
                        <div class="wcv-order-row refunded">
                            <span class="wcv-order-label">
                                <?php esc_html_e( 'Refunded', 'wc-vendors' ); ?>:
                            </span>
                            <span class="wcv-order-value">
                                <?php echo wp_kses_post( wc_price( -1 * $refunded_amount, array( 'currency' => $order_currency ) ) ); ?>
                            </span>
                        </div>

                        <div class="wcv-order-row net-payment">
                            <span class="wcv-order-label">
                                <?php esc_html_e( 'Net payment', 'wc-vendors' ); ?>:
                            </span>
                            <span class="wcv-order-value">
                                <?php echo wp_kses_post( wc_price( $order_total - $refunded_amount, array( 'currency' => $order_currency ) ) ); ?>
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
                            <strong><?php echo wp_kses_post( wc_price( $order_total, array( 'currency' => $order_currency ) ) ); ?></strong>
                        </span>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="wcv-cols-group wcv-horizontal-gutters wcv_mobile wcv-mobile-order-items">
                <div class="all-100">
                    <div class="wcv-mobile-order-table">
                        <?php
                        foreach ( $order_items as $item ) :
                        ?>
                            <div class="item-details wcv-cols-group wcv-horizontal-gutters" style="border: 1px solid rgba(0, 0, 0, 0.10); border-radius: 16px; padding: 20px; margin: 20px 0px;">
                                <div class="all-35" style="padding-left: 0px; padding-bottom: 10px;"><div class="wcv-order-thumb"><img src="<?php echo esc_url( $item['thumbnail'] ); ?>" alt="<?php echo esc_attr( $item['name'] ); ?>" /></div></div>
                                <div class="item-details all-65" style="padding-left: 10px;">
                                    <h3><?php echo esc_html( $item['name'] ); ?></h3>
                                    <small><?php echo wp_kses( $item['product_meta'], wcv_allowed_html_tags() ); ?></small>
                                    <small class="right-space"><?php esc_html_e( 'Commission', 'wc-vendors' ); ?>: </small><small><?php echo wp_kses_post( wc_price( $item['commission'], array( 'currency' => $order_currency ) ) ); ?></small>
                                    <br />
                                    <small class="right-space"><?php esc_html_e( 'Cost', 'wc-vendors' ); ?>: </small><small><?php echo wp_kses_post( wc_price( $item['cost'], array( 'currency' => $order_currency ) ) ); ?></small>
                                    <br />
                                    <small class="right-space"><?php esc_html_e( 'Qty', 'wc-vendors' ); ?>: </small><small><?php echo esc_html( $item['quantity'] ); ?></small>
                                    <br />
                                    <?php if ( $item['refunded'] > 0 ) : ?>
                                        <small class="right-space"><?php esc_html_e( 'Refunded', 'wc-vendors' ); ?>: </small>
                                        <small class="refunded">
                                            <?php echo esc_html( $item['refunded_qty'] ); ?>x
                                            <?php echo wp_kses_post( wc_price( -1 * $item['refunded'], array( 'currency' => $order_currency ) ) ); ?>
                                        </small>
                                    <?php endif; ?>
                                </div>
                                <div class="all-100" style="background: rgba(0, 0, 0, 0.10); height: 1px;"></div>
                                <div class="all-35">
                                    <div style="width: 100%; height: 1px;"></div>
                                </div>
                                <div class="total all-60" style="padding-left: 10px; padding-top: 10px;">
                                    <strong><span class="right-space"><?php esc_html_e( 'Subtotal:', 'wc-vendors' ); ?></span><span> <?php echo wp_kses_post( wc_price( $item['total'], array( 'currency' => $order_currency ) ) ); ?></span></strong>
                                    <?php if ( $item['refunded'] > 0 ) : ?>
                                        <br />
                                        <small class="refunded">
                                            <?php echo esc_html( $item['refunded_qty'] ); ?>x
                                            <?php echo wp_kses_post( wc_price( -1 * $item['refunded'], array( 'currency' => $order_currency ) ) ); ?>
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
                                    <?php echo wp_kses_post( wc_price( $order_shipping, array( 'currency' => $order_currency ) ) ); ?>
                                </td>
                            </tr>
                            <?php endif; ?>

                            <?php if ( wc_tax_enabled() ) : ?>
                                <?php foreach ( $order->get_tax_totals() as $code => $tax_line ) : ?>
                                    <tr class="wcv-order-tax">
                                        <td class="wcv-order-totals-label right-space"><?php echo esc_html( $tax_line->label ); ?>:</td>
                                        <td><?php echo wp_kses_post( wc_price( $order_tax, array( 'currency' => $order_currency ) ) ); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>

                            <tr class="wcv-order-commission">
                                <td class="wcv-order-totals-label right-space"><?php esc_html_e( 'Commission Total', 'wc-vendors' ); ?>:</td>
                                <td class="view">
                                    <?php echo wp_kses_post( wc_price( $order_commission, array( 'currency' => $order_currency ) ) ); ?>
                                </td>
                            </tr>
                          
                            <?php if ( $refunded_amount > 0 ) : ?>
                                <tr class="wcv-order-refunded">
                                    <td class="wcv-order-refund-label right-space">
                                        <?php esc_html_e( 'Refunded', 'wc-vendors' ); ?>:
                                    </td>
                                    <td class="refunded view">
                                        <?php echo wp_kses_post( wc_price( -1 * $refunded_amount, array( 'currency' => $order_currency ) ) ); ?>
                                    </td>
                                </tr>

                                <tr class="wcv-order-net-payment">
                                    <td class="wcv-order-refund-label right-space">
                                        <?php esc_html_e( 'Net payment', 'wc-vendors' ); ?>:
                                    </td>
                                    <td class="net-payment view">
                                        <?php echo wp_kses_post( wc_price( $order_total - $refunded_amount, array( 'currency' => $order_currency ) ) ); ?>
                                    </td>
                                </tr>
                            <?php endif; ?>

                            <tr class="wcv-order-total" style="padding-top: 10px;">
                                <td class="wcv-order-totals-label right-space">
                                    <strong> <?php esc_html_e( 'Order Total', 'wc-vendors' ); ?>:</strong>
                                </td>
                                <td class="view">
                                    <strong><?php echo wp_kses_post( wc_price( $order_total, array( 'currency' => $order_currency ) ) ); ?></strong>
                                </td>
                            </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <div class="wcv-button-group">
                <button class="wcv-button wcv-button-cancel modal-close wcv-dismiss"><?php esc_html_e( 'Close', 'wc-vendors' ); ?></button>
            </div>
        </div>
    </div>
</div>
