<?php
/**
 * The template for displaying the vendor store information including total sales, orders, products and commission
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/report
 *
 * @package    WC_Vendors
 * @version    1.8.0
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
$give_tax      = wc_string_to_bool( get_option( 'wcvendors_vendor_give_taxes', 'no' ) );
$give_shipping = is_wcv_pro_active() && wc_string_to_bool( get_option( 'wcvendors_vendor_give_shipping', 'no' ) );

// Calculate commission totals based on what's given to vendors.
$commission_due_total = $store_report->commission_due;
if ( $give_shipping ) {
    $commission_due_total += $store_report->commission_shipping_due;
}
if ( $give_tax ) {
    $commission_due_total += $store_report->commission_tax_due;
}

$commission_paid_total = $store_report->commission_paid;
if ( $give_shipping ) {
    $commission_paid_total += $store_report->commission_shipping_paid;
}
if ( $give_tax ) {
    $commission_paid_total += $store_report->commission_tax_paid;
}

?>

<?php do_action( 'wcvendors_before_dashboard_overview_datepicker' ); ?> 
<div class="wcv_dashboard_datepicker wcv-cols-group">

    <div class="all-100">
        <form method="post" action="" class="wcv-form  wcv-form-exclude">
            <?php $store_report->date_range_form(); ?>
        </form>
    </div>
</div>
<?php do_action( 'wcvendors_after_dashboard_overview_datepicker' ); ?> 

<?php do_action( 'wcvendors_before_dashboard_overview_table' ); ?> 
<div class="wcv_dashboard_overview wcv-cols-group wcv-horizontal-gutters column-group ink-stacker gutters wcv-cols-group-wide">

    <div class="xlarge-50 large-50 medium-100 small-100 tiny-100 wcv-bottom-space">
        <div class="wcv-section">
            <h3><?php esc_html_e( 'Commission Due', 'wc-vendors' ); ?></h3>
            <table role="grid" class="wcv-dashboard-table wcvendors-table-recent_order has-background">

                <tbody>
                <tr>
                    <th><?php esc_html_e( 'Products', 'wc-vendors' ); ?></th>
                    <td><?php echo wp_kses( wc_price( $store_report->commission_due ), wcv_allowed_html_tags() ); ?></td>
                </tr>
                <?php if ( $give_shipping ) : ?>
                    <tr>
                        <th><?php esc_html_e( 'Shipping', 'wc-vendors' ); ?></th>
                        <td><?php echo wp_kses( wc_price( $store_report->commission_shipping_due ), wcv_allowed_html_tags() ); ?></td>
                    </tr>
                <?php endif; ?>
                <?php if ( $give_tax ) : ?>
                    <tr>
                        <th><?php esc_html_e( 'Tax', 'wc-vendors' ); ?></th>
                        <td><?php echo wp_kses( wc_price( $store_report->commission_tax_due ), wcv_allowed_html_tags() ); ?></td>
                    </tr>
                <?php endif; ?>
                <tr>
                    <th><strong><?php esc_html_e( 'Totals', 'wc-vendors' ); ?></strong></th>
                    <td><?php echo wp_kses( wc_price( $commission_due_total ), wcv_allowed_html_tags() ); ?></td>
                </tr>
                </tbody>

            </table>
        </div>
    </div>

    <div class="xlarge-50 large-50 medium-100 small-100 tiny-100 wcv-bottom-space">
        <div class="wcv-section">
            <h3><?php esc_html_e( 'Commission Paid', 'wc-vendors' ); ?></h3>
            <table role="grid" class="wcv-dashboard-table wcvendors-table-recent_order has-background">
                <tbody>
                <tr>
                    <th><?php esc_html_e( 'Products', 'wc-vendors' ); ?></th>
                    <td><?php echo wp_kses( wc_price( $store_report->commission_paid ), wcv_allowed_html_tags() ); ?></td>
                </tr>
                <?php if ( $give_shipping ) : ?>
                    <tr>
                        <th><?php esc_html_e( 'Shipping', 'wc-vendors' ); ?></th>
                        <td><?php echo wp_kses( wc_price( $store_report->commission_shipping_paid ), wcv_allowed_html_tags() ); ?></td>
                    </tr>
                <?php endif; ?>
                <?php if ( $give_tax ) : ?>
                    <tr>
                        <th><?php esc_html_e( 'Tax', 'wc-vendors' ); ?></th>
                        <td><?php echo wp_kses( wc_price( $store_report->commission_tax_paid ), wcv_allowed_html_tags() ); ?></td>
                    </tr>
                <?php endif; ?>
                <tr>
                    <th><strong><?php esc_html_e( 'Totals', 'wc-vendors' ); ?></strong></th>
                    <td><?php echo wp_kses( wc_price( $commission_paid_total ), wcv_allowed_html_tags() ); ?></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php do_action( 'wcvendors_after_dashboard_overview_table' ); ?>
