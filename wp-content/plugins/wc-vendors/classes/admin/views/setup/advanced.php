<?php
/**
 * Admin View: Step One
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>

<form method="post">
    <?php wp_nonce_field( 'wcv-setup', 'wcv-setup', true, true ); ?>
    <h2 class="wcv-setup-title"><?php esc_html_e( 'Vendor Settings', 'wc-vendors' ); ?></h2>
    <h3 class="wcv-setup-subtitle"><?php esc_html_e( 'Store Setup', 'wc-vendors' ); ?></h3>

    <div class="wcv-setup-input">
        <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_vendor_shop_permalink' ); ?>
        <label for="wcvendors_vendor_shop_permalink" class="label-with-tooltip">
            <span class="label-text"><?php esc_html_e( 'Store Base URL', 'wc-vendors' ); ?></span>
            <?php WCVendors_Admin_Setup_Wizard::print_tooltip( __( 'The base URL for vendor stores on your site. E.g., example.com/vendors/vendor-name', 'wc-vendors' ) ); ?>
        </label>
        <input type="text" class="option_checkbox" id="wcvendors_vendor_shop_permalink" name="wcvendors_vendor_shop_permalink"
        value="<?php echo esc_attr( $vendors_store_url ); ?>" />
        <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_vendor_shop_permalink' ); ?>
    </div>
    <div class="wcv-setup-input">
        <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_vendor_terms_page_id' ); ?>
        <label for="wcvendors_vendor_terms_page_id" class="w label-with-tooltip">
            <span class="label-text"><?php esc_html_e( 'Vendor Terms Page', 'wc-vendors' ); ?></span>
            <?php
                WCVendors_Admin_Setup_Wizard::print_tooltip(
                    sprintf(
                        // translators: %s is the vendor name.
                        __( 'Select the page that displays your vendor terms and conditions to new %s.', 'wc-vendors' ),
                        wcv_get_vendor_name( false, false )
                    )
                );
            ?>
        </label>
        <?php wcv_single_select_page( 'wcvendors_vendor_terms_page_id', $terms_page_id, 'wcv-select' ); ?>
        <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_vendor_terms_page_id' ); ?>
    </div>

    <div class="wcv-setup-input">
    <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_vendor_approve_registration' ); ?>
    <?php
    WCVendors_Admin_Setup_Wizard::print_toggle_switch(
        'wcvendors_vendor_approve_registration',
        'wcvendors_vendor_approve_registration',
        'yes',
        sprintf(
            // translators: %s is the vendor name.
            __( 'Manually approve %s applications', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        ),
        'yes' === $manual_approval,
        sprintf(
            // translators: %s is the vendor name.
            __( 'Choose whether %s applications are approved automatically (default) or reviewed and approved manually.', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        )
    );
    ?>
    <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_vendor_approve_registration' ); ?>
    </div>
    <br>
    <h3 class="wcv-setup-subtitle"><?php esc_html_e( 'Capabilities', 'wc-vendors' ); ?></h3>

    <div class="wcv-setup-input">
    <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_vendor_give_taxes' ); ?>
    <?php
    WCVendors_Admin_Setup_Wizard::print_toggle_switch(
        'wcvendors_vendor_give_taxes',
        'wcvendors_vendor_give_taxes',
        'yes',
        sprintf(
            // translators: %s is the vendor name.
            __( 'Give any taxes to %s', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        ),
        'yes' === $vendor_taxes,
        sprintf(
            // translators: %s is the vendor name.
            __( 'Enable to give taxes to %s', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        )
    );
    ?>
    <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_vendor_give_taxes' ); ?>
    </div>
    <?php if ( is_wcv_pro_active() ) : ?>
    <div class="wcv-setup-input">
    <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_vendor_give_shipping' ); ?>
    <?php
    WCVendors_Admin_Setup_Wizard::print_toggle_switch(
        'wcvendors_vendor_give_shipping',
        'wcvendors_vendor_give_shipping',
        'yes',
        sprintf(
            // translators: %s is the vendor name.
            __( 'Give any shipping to %s', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        ),
        'yes' === $vendor_shipping,
        sprintf(
            // translators: %s is the vendor name.
            __( 'Enable to give shipping to %s', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        )
    );
    ?>
    <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_vendor_give_shipping' ); ?>
    </div>
    <?php endif; ?>
    <div class="wcv-setup-input">
    <?php do_action( 'wcvendors_setup_wizard_before_wcvendors_capability_orders_export' ); ?>
    <?php
    WCVendors_Admin_Setup_Wizard::print_toggle_switch(
        'wcvendors_capability_orders_export',
        'wcvendors_capability_orders_export',
        'yes',
        sprintf(
            // translators: %s is the vendor name.
            __( 'Allow %s to export their orders to a CSV file', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        ),
        'yes' === $allow_export_orders,
        sprintf(
            // translators: %s is the vendor name.
            __( 'Enable to allow %s to export their orders', 'wc-vendors' ),
            wcv_get_vendor_name( true, false )
        )
    );
    ?>
    <?php do_action( 'wcvendors_setup_wizard_after_wcvendors_capability_orders_export' ); ?>
    </div>

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
