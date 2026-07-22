<?php
/**
 * Admin AI Moderate Modal Template
 *
 * @package WC_Vendors
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div id="wcv-store-agent-modal" class="wcv-modal-overlay" style="display: none;">
    <div class="wcv-modal-content">
        <div class="wcv-modal-header">
            <button class="wcv-modal-close" type="button" aria-label="<?php echo esc_attr__( 'Close', 'wc-vendors' ); ?>">&times;</button>
            <div class="wcv-modal-header-logo">
                <img src="<?php echo esc_url( $store_agent_logo_url ); ?>" alt="Store Agent Logo" />
            </div>
            <h2><?php echo esc_html( $i18n_store_agent_required ); ?></h2>
        </div>
        <div class="wcv-modal-body">
            <p><?php echo esc_html__( 'StoreAgent AI for WooCommerce provides AI-powered moderation tools that help ensure product quality and compliance.', 'wc-vendors' ); ?></p>
            <div class="wcv-setup-steps">
                <div class="wcv-step wcv-step-1">
                    <div class="wcv-step-header">
                        <span class="wcv-step-number">1</span>
                        <h3 class="wcv-step-title"><?php echo esc_html( $i18n_step_1_title ); ?></h3>
                        <span class="wcv-step-status wcv-step-pending"></span>
                    </div>
                    <div class="wcv-step-content">
                        <button class="button button-primary wcv-action-button" type="button" data-action="install-activate">
                            <span class="button-text"><?php echo esc_html( $i18n_install_and_activate ); ?></span>
                        </button>
                    </div>
                </div>
                <div class="wcv-step wcv-step-2">
                    <div class="wcv-step-header">
                        <span class="wcv-step-number">2</span>
                        <h3 class="wcv-step-title"><?php echo esc_html( $i18n_step_2_title ); ?></h3>
                        <span class="wcv-step-status wcv-step-pending"></span>
                    </div>
                    <div class="wcv-step-content">
                        <a href="<?php echo esc_url( $store_agent_dashboard_url ); ?>" class="button wcv-connect-link" target="_blank">
                            <?php echo esc_html( $i18n_connect_store_agent ); ?>
                        </a>
                        <p class="wcv-step-description"><?php echo esc_html( $i18n_after_connect_note ); ?></p>
                        <div class="wcv-connection-message" style="display: none;"></div>
                        <button class="button button-primary wcv-action-button" type="button" data-action="check-connection">
                            <span class="button-text"><?php echo esc_html( $i18n_check_connection ); ?></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="wcv-modal-footer">
            <button class="button wcv-modal-cancel" type="button"><?php echo esc_html__( 'Cancel', 'wc-vendors' ); ?></button>
        </div>
    </div>
</div>
