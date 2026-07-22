<?php
/**
 * Admin View: Step One
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>

<form method="post">
    <?php wp_nonce_field( 'wcv-setup', 'wcv-setup', true, true ); ?>
    <h2 class="wcv-setup-title"><?php esc_html_e( 'General Settings', 'wc-vendors' ); ?></h2>
    <h3 class="wcv-setup-subtitle"><?php esc_html_e( 'Commission', 'wc-vendors' ); ?></h3>

    <p class="store-setup">
    <?php
    echo esc_html(
        sprintf(
            // translators: %s is the vendor name.
            __( 'Commissions are calculated per product. The commission rate can be set globally, at a %s level or at a product level.', 'wc-vendors' ),
            wcv_get_vendor_name()
        )
    );
    ?>
    </p>

    <!-- Vendor commission rate -->

    <div class="wcv-setup-commissions">
        <div class="commission-rate store-setup wcv-setup-input wcv-commission-input">
            <?php do_action( 'wcvendors_setup_wizard_before_wcv_vendor_commission_rate' ); ?>
            <label class="wcv_vendor_commission_rate label-with-tooltip" for="wcv_vendor_commission_rate">
                <span class="label-text"><?php esc_html_e( 'Global Commission Rate %', 'wc-vendors' ); ?></span>
                <?php
                WCVendors_Admin_Setup_Wizard::print_tooltip(
                    sprintf(
                        // translators: %s is the vendor name.
                        __( 'Set the default %1$s commission (%%) for every product. After each order is paid, that percentage of the item\'s sale price is owed to the %2$s.', 'wc-vendors' ),
                        wcv_get_vendor_name( true, false ),
                        wcv_get_vendor_name( true, false )
                    )
                );
                ?>
            </label>

            <input type="number" min="0" max="100" step="0.01"
                id="wcv_vendor_commission_rate"
                name="wcv_vendor_commission_rate" class="form-input" placeholder="%" value="<?php echo esc_attr( $commission_rate ); ?>"
            />
            <?php do_action( 'wcvendors_setup_wizard_after_wcv_vendor_commission_rate' ); ?>
        </div>

        <div class="payout-currency store-setup wcv-setup-input wcv-commission-input">
            <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_paypal_web_currency' ); ?>
            <label class="wcvendors_paypal_web_currency label-with-tooltip" for="wcvendors_paypal_web_currency">
                <span class="label-text"><?php esc_html_e( 'Payout Currency', 'wc-vendors' ); ?></span>
                <?php
                WCVendors_Admin_Setup_Wizard::print_tooltip(
                    sprintf(
                        // translators: %s is the vendor name.
                        __( 'The currency that will be used to pay %s.', 'wc-vendors' ),
                        wcv_get_vendor_name( false, true )
                    )
                );
                ?>
            </label>
            <select name="wcvendors_paypal_web_currency" id="wcvendors_paypal_web_currency">
                <?php foreach ( wcv_paypal_currencies() as $currency_code => $currency_label ) : ?>
                    <option value="<?php echo esc_attr( $currency_code ); ?>"><?php echo esc_html( $currency_label ); ?></option>
                <?php endforeach; ?>
            </select>
            <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_paypal_web_currency' ); ?>
        </div>

    </div>

    <?php if ( ! is_wcv_pro_active() ) : ?>
    <div class="wcv-wizard-upsell-card">
        <?php esc_html_e( 'Upgrade to get commission options like Tiered Commissions and more features.', 'wc-vendors' ); ?>
        <a href="https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=setupwizard&utm_campaign=setupupgradetopro" class="button-primary" target="_blank">Upgrade to Pro</a>
    </div>
    <?php endif; ?>
    <h3 class="wcv-setup-subtitle"><?php esc_html_e( 'Settings', 'wc-vendors' ); ?></h3>
    <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_allow_tracking' ); ?>
    <?php
    WCVendors_Admin_Setup_Wizard::print_toggle_switch(
        'wcvendors_allow_tracking',
        'wcvendors_allow_tracking',
        'yes',
        __( 'Allow usage data collection', 'wc-vendors' ),
        'yes' === $allow_tracking,
        __( 'By allowing us to track usage data we can better help you because we know with which WordPress configurations, themes and plugins we should test.', 'wc-vendors' ),
    );
    ?>
    <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_allow_tracking' ); ?>

    <p class="wcv-setup-actions step align-right">
        <button type="submit" class="button button-secondary" name="previous_step" value="<?php esc_attr_e( 'Previous', 'wc-vendors' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5" />
            </svg>
            <?php esc_html_e( 'Previous', 'wc-vendors' ); ?>
        </button>
        <button type="submit" class="button button-next" value="<?php esc_attr_e( 'Next', 'wc-vendors' ); ?>" name="save_step">
            <?php esc_html_e( 'Next', 'wc-vendors' ); ?>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7" />
            </svg>
        </button>
    </p>
</form>
