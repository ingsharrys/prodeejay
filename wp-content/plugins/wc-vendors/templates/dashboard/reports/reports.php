<?php
/**
 * The template for displaying the vendor store graphs, recent products and recent orders
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/report
 *
 * @package    WC_Vendors
 * @version    1.8.0
 * @version    2.6.5 - Fix security issues.
 * @version    2.7.1 - Add Total Refunded Sales row and calculate Total Commission and Net Revenue on net sales.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

?>
<?php
    // Single Vendor Total Gross Sales, Refunded Sales and Commission.
    $give_tax      = wc_string_to_bool( get_option( 'wcvendors_vendor_give_taxes', 'no' ) );
    $give_shipping = is_wcv_pro_active() && wc_string_to_bool( get_option( 'wcvendors_vendor_give_shipping', 'no' ) );

    $vendor_order_total    = 0; // Total Gross Sales (pre-refund, all orders).
    $vendor_refunded_total = 0; // Total Refunded Sales (reversed commission rows).
    $commission_total      = 0; // Total Commission on net sales (reversed rows excluded).
    $net_revenue           = 0;
    $total_tax             = 0;
    $total_shipping        = 0;

    foreach ( $store_report->orders as $store_order ) {
        // Gross Sales stays pre-refund: include every order.
        $vendor_order_total += $store_order->total;

        foreach ( $store_order->vendor_products as $vendor_product ) {
            // Refunded product: record its sales value, exclude its commission from the totals.
            if ( 'reversed' === $vendor_product->status ) {
                // No matching order item (product removed from order): commission is still excluded,
                // but its sales value cannot be recovered, so Refunded Sales will understate.
                $refunded_item = $store_order->order_items[ $vendor_product->product_id ] ?? null;
                if ( $refunded_item ) {
                    // Prefer the actual refunded amount; fall back to the full line total for
                    // reversals with no refund record (DB-level / status-transition reversals).
                    $parent_order = $refunded_item->get_order();
                    $refunded_amt = $parent_order ? (float) $parent_order->get_total_refunded_for_item( $refunded_item->get_id() ) : 0;
                    $vendor_refunded_total += $refunded_amt > 0 ? $refunded_amt : (float) $refunded_item->get_total();
                }
                continue;
            }

            $commission_total += $vendor_product->total_due + $vendor_product->total_shipping + $vendor_product->tax;

            if ( $give_tax ) {
                $total_tax += $vendor_product->tax;
            }

            if ( $give_shipping ) {
                $total_shipping += $vendor_product->total_shipping;
            }
        }
    }

    $net_revenue = $commission_total - $total_tax - $total_shipping;

?>

<?php do_action( 'wcvendors_before_dashboard_overview_graphs' ); ?>
<div class="wcv_reports wcv-cols-group wcv-horizontal-gutters column-group ink-stacker gutters wcv-flex wcv-flex-wrap wcv-cols-group-wide">
    <div class="xlarge-50 large-50 medium-100 small-100 tiny-100 wcv-bottom-space">
        <div class="wcv-section">
            <h3><?php esc_html_e( 'Gross Sales Report', 'wc-vendors' ); ?></h3>
            <table role="grid" class="wcv-dashboard-table wcvendors-table-recent_order has-background">
                <tbody>
                <tr>
                    <th><?php esc_html_e( 'Total Order', 'wc-vendors' ); ?></th>
                    <td><strong><?php echo esc_html( $store_report->total_orders ); ?> </strong></td>
                </tr>

                <tr>
                    <th><?php esc_html_e( 'Total Product Sold', 'wc-vendors' ); ?></th>
                    <td><strong><?php echo esc_html( $store_report->total_products_sold ); ?></strong></td>
                </tr>

                <tr>
                    <th><?php esc_html_e( 'Total Gross Sales', 'wc-vendors' ); ?></th>
                    <td><strong><?php echo wp_kses( wc_price( $vendor_order_total ), wcv_allowed_html_tags() ); ?></strong></td>
                </tr>

                <?php if ( $vendor_refunded_total > 0 ) : ?>
                <tr>
                    <th><?php esc_html_e( 'Total Refunded Sales', 'wc-vendors' ); ?></th>
                    <td><strong><?php echo wp_kses( wc_price( $vendor_refunded_total ), wcv_allowed_html_tags() ); ?></strong></td>
                </tr>
                <?php endif; ?>

                <tr>
                    <th><?php esc_html_e( 'Total Commission', 'wc-vendors' ); ?></th>
                    <td><strong><?php echo wp_kses( wc_price( $commission_total ), wcv_allowed_html_tags() ); ?></strong></td>
                </tr>

                <tr>
                    <th><?php esc_html_e( 'Net Revenue', 'wc-vendors' ); ?></th>
                    <td><strong><?php echo wc_price( $net_revenue ); // phpcs:ignore ?></strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="xlarge-50 large-50 medium-100 small-100 tiny-100 wcv-bottom-space">
        <div class="wcv-section">
        <h3><?php esc_html_e( 'Orders Totals', 'wc-vendors' ); ?> ( <?php echo esc_html( $store_report->total_orders ); ?> )</h3>
        <?php $order_chart_data = $store_report->get_order_chart_data(); ?>
        <?php if ( ! $order_chart_data ) : ?>
            <p><?php esc_html_e( 'No orders for this period. Adjust your dates above and click Update, or list new products for customers to buy.', 'wc-vendors' ); ?></p>
        <?php else : ?>
            <canvas id="orders_chart" width="350" height="200"></canvas>
            <div id="wcv-total-orders-chart-legend" class="wcv-total-orders-chart-legend">
                <div class="wcv-total-orders-chart-legend-item" style="display:flex;align-items:center;justify-content:center;">
                    <div class="wcv-total-orders-chart-legend-color" style="width: 12px; height:12px;border-radius:50%;margin-right:5px;"></div>
                    <div class="wcv-total-orders-chart-legend-label" style="font-size: 12px;"><?php esc_html_e( 'Total Orders', 'wc-vendors' ); ?></div>
                </div>
            </div>
            <script type="text/javascript">
                var orders_chart_label = <?php echo $order_chart_data['labels']; //phpcs:ignore?>;
                var orders_chart_data = <?php echo $order_chart_data['data']; //phpcs:ignore?>;
            </script>

        <?php endif; ?>
        </div>
    </div>
</div>
<?php do_action( 'wcvendors_dashboard_before_product_totals' ); ?>
<?php do_action( 'wcvendors_dashboard_product_totals', $store_report ); ?>
<?php do_action( 'wcvendors_dashboard_after_product_totals' ); ?>

<?php do_action( 'wcvendors_after_dashboard_overview_graphs' ); ?>

<?php do_action( 'wcvendors_before_dashboard_overview_recent' ); ?>
<?php do_action( 'wcvendors_dashboard_overview_recent', $store_report, $products_disabled, $orders_disabled ); ?>
<?php do_action( 'wcvendors_after_dashboard_overview_recent' ); ?>
