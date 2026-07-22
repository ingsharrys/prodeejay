<?php
/**
 * Admin View: Final Wizard Step.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>
<form method="post">
    <?php wp_nonce_field( 'wcv-setup', 'wcv-setup', true, true ); ?>

    <h1 class="ready-title"><?php esc_html_e( 'Welcome to WC Vendors!', 'wc-vendors' ); ?></h1>
    <p class="text-center"><?php esc_html_e( 'We\'re excited for you to experience the full power of the ultimate WooCommerce marketplace solution. With our onboarding wizard, you can easily set up a fully functional online multi-vendor marketplace.', 'wc-vendors' ); ?></p>   
    <p class="wcv-setup-actions step">
        <?php do_action( 'wcvendors_setup_wizard_before_get_started_button' ); ?>
        <button type="submit" class="button button-next has-padding" value="<?php esc_attr_e( 'Get Started', 'wc-vendors' ); ?>" name="save_step">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7" />
            </svg>
            <span class="button-text"><?php esc_html_e( 'Get Started', 'wc-vendors' ); ?></span>
        </button>
        <?php do_action( 'wcvendors_setup_wizard_after_get_started_button' ); ?>
        <?php do_action( 'wcvendors_setup_wizard_before_one_click_setup_link' ); ?>
        <a id="wcvendors-one-click-setup" href="#" class="button button-secondary has-padding tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
            <span class="button-text"><?php esc_html_e( 'One Click Setup', 'wc-vendors' ); ?></span>
            <span class="tooltip-text">
                    <?php esc_html_e( 'Use recommended settings for a quick & easy setup experience', 'wc-vendors' ); ?>
            </span>
        </a>
        <?php do_action( 'wcvendors_setup_wizard_after_one_click_setup_link' ); ?>
    </p>
</form>
