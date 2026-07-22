<?php
/**
 * Commission Payout Method Template
 *
 * This template can be overridden by copying it to yourtheme/wc-vendors/dashboard/settings/commission-payout-method.php
 *
 * @package    WC_Vendors
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$commission_payout_method = get_user_meta( $user_id, 'wcv_commission_payout_method', true );
?>

<p>
    <b><?php esc_html_e( 'Commission Payout Method', 'wc-vendors' ); ?></b><br/>
    <?php esc_html_e( 'Commission Payout Method.', 'wc-vendors' ); ?><br/>
    <select name="wcv_commission_payout_method" id="wcv_commission_payout_method" style="width: 25em;">
        <option value="paypal" <?php selected( $commission_payout_method, 'paypal' ); ?>><?php esc_html_e( 'PayPal', 'wc-vendors' ); ?></option>
        <option value="bank" <?php selected( $commission_payout_method, 'bank' ); ?>><?php esc_html_e( 'Bank Transfer', 'wc-vendors' ); ?></option>
    </select>
</p>
