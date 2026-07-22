<?php
/**
 * Admin View: Final Wizard Step.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>

<h1 class="ready-title"><?php esc_html_e( 'Your marketplace is ready!', 'wc-vendors' ); ?></h1>

<p class="text-center"><?php esc_html_e( 'You can now start adding products to your marketplace.', 'wc-vendors' ); ?></p>
<p class="next-steps-help-text wcv-setup-actions">
    <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=product' ) ); ?>" class="button button-next has-padding">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </g>
        </svg>
        <span class="button-text"><?php esc_html_e( 'Add Products', 'wc-vendors' ); ?></span>
    </a>
    <a href="<?php echo esc_url( admin_url( 'admin.php?page=wcv-settings' ) ); ?>" class="button button-secondary has-padding">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2" />
                <circle cx="12" cy="12" r="3" />
            </g>
        </svg>
        <span class="button-text"><?php esc_html_e( 'View Settings', 'wc-vendors' ); ?></span>
    </a>
</p>
<br>
<p class="text-center">
    <?php
    printf(
        /* translators: 1: opening anchor tag, 2: closing anchor tag */
        esc_html__( 'Need more help? Check our %1$sgetting started guide%2$s.', 'wc-vendors' ),
        '<a href="https://www.wcvendors.com/knowledge-base/wc-vendors-marketplace-free-plugin-getting-started-guide?utm_source=plugin&utm_medium=setupwizard&utm_campaign=setupgettingstartedguide" target="_blank">',
        '</a>'
    );
    ?>
</p>
<?php do_action( 'wcvendors_setup_wizard_before_ready_upgrade_box' ); ?>
<?php if ( ! is_wcv_pro_active() ) : ?>
<div class="wcv-wizard-upgrade-box">
    <h2><?php esc_html_e( 'Upgrade To Pro', 'wc-vendors' ); ?></h2>
    <p><?php esc_html_e( 'Upgrade now and join over 10,000+ stores who are using WC Vendors Pro to grow their marketplace businesses with confidence.', 'wc-vendors' ); ?></p>
    <div class="wcv-upgrade-row">
        <div class="wcv-upgrade-col-button wcv-setup-actions" style="margin-top: 0;">
            <a href="https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=setupwizard&utm_campaign=setupupgradetopro" class="button button-secondary has-padding" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7" />
                </svg>
                <span class="button-text"><?php esc_html_e( 'Upgrade to Pro', 'wc-vendors' ); ?></span>
            </a>
        </div>
        <div class="wcv-upgrade-col-testimonial">
            <p class="testimonial"><?php esc_html_e( '"Advanced features for any type of market place, small or big."', 'wc-vendors' ); ?><br> <strong style="font-style: normal;"><?php esc_html_e( '- @yvesbenini via wordpress.org', 'wc-vendors' ); ?></strong></p>
        </div>
    </div>
</div>
<?php endif; ?>
<?php do_action( 'wcvendors_setup_wizard_after_ready_upgrade_box' ); ?>
