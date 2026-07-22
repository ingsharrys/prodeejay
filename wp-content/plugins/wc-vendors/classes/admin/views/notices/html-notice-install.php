<?php
/**
 * Admin View: Notice - Install
 *
 * @since         2.0.0
 * @version       2.6.5 Fix security issues.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>
<div id="message" class="updated wcvendors-message wc-connect">
    <p><strong><?php esc_html_e( 'Welcome to WC Vendors', 'wc-vendors' ); ?></strong> &#8211; <?php esc_html_e( 'You‘re almost ready to start your marketplace', 'wc-vendors' ); ?></p>
    <p class="submit"><a href="<?php echo esc_url( admin_url( 'admin.php?page=wcv-setup' ) ); ?>"
                        class="button-primary"><?php esc_html_e( 'Run the Setup Wizard', 'wc-vendors' ); ?></a> <a
                class="button-secondary skip"
                href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wcv-hide-notice', 'install' ), 'wcvendors_hide_notices_nonce', '_wcv_notice_nonce' ) ); ?>">
                <?php esc_html_e( 'Skip setup', 'wc-vendors' ); ?>
            </a>
    </p>
</div>
