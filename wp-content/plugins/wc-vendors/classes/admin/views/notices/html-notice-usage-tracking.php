<?php
/**
 * Admin view: Review Request Notice
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="notice notice-info is-dismissible wcv-notice-container" id="wcv-usage-tracking-notice" data-notice-key="usage_tracking"> 
    <p style="display: flex; justify-content: flex-start; align-items: baseline;flex-wrap:wrap;">
        <img src="<?php echo esc_url( WCV_ASSETS_URL . '/images/wcvendors_logo.png' ); ?>" alt="WC Vendors" style="margin-right: 10px; margin-bottom:10px; width: 120px; height: auto;">
        <strong><?php esc_html_e( 'USAGE TRACKING PERMISSION REQUEST', 'wc-vendors' ); ?></strong>
    </p>
    <p>
    <?php
    printf(
        '%s <a class="wcv-notice-link" href="%s" target="_blank">%s</a>',
        esc_html__(
            'By allowing us to track usage data we can better help you because we know with which WordPress configurations, themes and plugins we should test. Complete documentation on usage tracking is available',
            'wc-vendors'
        ),
        esc_attr( 'https://www.wcvendors.com/knowledge-base/usage-tracking/?utm_source=wcv&utm_medium=kb&utm_campaign=usagetrackingnotice' ),
        esc_html__( 'here', 'wc-vendors' )
    );
    ?>
    </p>
    <div style="display: flex;">
        <p>
            <a class="wcv-dismiss-notice button-primary" data-dismiss="yes" href="#" target="_blank"><?php esc_html_e( 'Allow tracking', 'wc-vendors' ); ?></a>
        </p>
        <p>
            <a class="wcv-dismiss-notice button-secondary" data-dismiss="no" href="#"><?php esc_html_e( 'Do not allow', 'wc-vendors' ); ?></a>
        </p>
    </div>
    <a href="#" class="notice-dismiss wcv-dismiss-notice" style="text-decoration: none;">
        <span class="screen-reader-text">Dismiss this notice.</span>
    </a>
    <?php wp_nonce_field( 'wcv_review_notice', 'wcv_review_notice_nonce' ); ?>
</div>
