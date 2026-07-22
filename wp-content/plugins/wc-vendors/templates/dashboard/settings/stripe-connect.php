<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Stripe connect template
 *
 * @version 2.0.0
 */
?>

<div id="stripe-connect-vendor" class="wcv_stripe_connect_container">

    <?php if ( ! $stripe_connect_access_key || ! $stripe_connect_user_id ) : ?>
        <h4 style="color: #333; font-size: 1.5em; margin-bottom: 12px;">
            <?php esc_html_e( 'Secure & Fast Payouts with Stripe', 'wc-vendors' ); ?>
        </h4>
        <p style="color: #333;font-size:1.25em; margin-bottom: 16px; line-height: normal; margin-top: 0;">
            <?php esc_html_e( 'Connect your Stripe account for hassle-free payouts directly to your bank.', 'wc-vendors' ); ?>
        </p>
        <ul style="padding-left: 0;">
            <li style="color: #333; margin-bottom: 16px; line-height: normal; margin-top: 0;">
                <svg class="wcv-icon wcv-icon-24 wcv-icon-middle">
                    <use xlink:href="<?php echo esc_attr( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-check"></use>
                </svg>
                <span style="font-size: 1.25em;vertical-align:middle">
                    <?php esc_html_e( 'Trusted by millions globally', 'wc-vendors' ); ?>
                </span>
            </li>
            <li style="color: #333; margin-bottom: 16px; line-height: normal; margin-top: 0;">
                <svg class="wcv-icon wcv-icon-24 wcv-icon-middle">
                    <use xlink:href="<?php echo esc_attr( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-check"></use>
                </svg>
                <span style="font-size: 1.25em;vertical-align:middle">
                    <?php esc_html_e( 'Receive payouts efficiently', 'wc-vendors' ); ?>
                </span>
            </li>
        </ul>
        <p style="margin-top: 24px; margin-bottom:0;">
            
            <a href="<?php echo esc_url( $connect_url ); ?>" class="<?php echo esc_attr( $button_theme_css ); ?>">
                <svg class="wcv-icon wcv-icon-md wcv-icon-middle">
                    <use xlink:href="<?php echo esc_attr( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-stripe"></use>
                </svg>
                <span>
                    <?php esc_html_e( 'Connect with Stripe', 'wc-vendors' ); ?>
                </span>
            </a>
        </p>
        <p>
            <span style="font-size: 1.25em; color:#666; font-weight: 700;">
                <?php esc_html_e( 'Start receiving payouts faster!', 'wc-vendors' ); ?>
            </span>
        </p>

    <?php else : ?>
        <h4 style="color: #2bac47; font-size: 1.5em; margin-bottom: 16px; line-height: normal; margin-top: 0;">
            <?php esc_html_e( 'You\'re Connected to Stripe', 'wc-vendors' ); ?>
        </h4>
        <p style="color: #2bac47;font-size:1.25em;margin-bottom: 16px; line-height: normal; margin-top: 0;">
            <?php esc_html_e( 'and ready to receive hassle-free payouts directly to your bank.', 'wc-vendors' ); ?>
        </p>
        <p style="margin-top: 24px; margin-bottom:11px;">
            <a href="<?php echo esc_url( get_permalink( get_option( 'wcvendors_shop_settings_page_id' ) ) ); ?>?deauth=<?php echo esc_attr( $stripe_connect_user_id ); ?>" class="<?php echo esc_attr( $button_theme_css ); ?> disconnect">
                <svg class="wcv-icon wcv-icon-md wcv-icon-middle">
                    <use xlink:href="<?php echo esc_attr( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-stripe"></use>
                </svg>
                <span>
                    <?php esc_html_e( 'Disconnect Stripe Account', 'wc-vendors' ); ?>
                </span>
            </a>
        </p>
        <p style="margin-top: 24px; margin-bottom: 12px;">
            <span style="font-size: 1.25em;color:#666; font-weight: 700;">
                <?php esc_html_e( 'What happen when I disconnect?', 'wc-vendors' ); ?>
            </span>
            <span class="wcv-tip">
                <svg class="wcv-icon wcv-setting-icon">
                    <use xlink:href="<?php echo esc_attr( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg#wcv-icon-info"></use>
                </svg>
                <span class="content">
                    <span>
                        <?php esc_html_e( 'If you disconnect Stripe, you\'ll no longer receive automated payouts to your bank and will need to either reconnect or choose another payout method.', 'wc-vendors' ); ?>
                    </span>
                    <span class="arrow"></span>
                </span>
            </span>
        </p>

    <?php endif; ?>

</div>
