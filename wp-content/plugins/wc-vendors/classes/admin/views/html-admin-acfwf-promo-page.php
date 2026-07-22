<?php
/**
 * ACFWF promo page template.
 *
 * @since      2.5.1
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$should_disable_step_1   = $is_plugin_installed ? 'disabled' : '';
$should_disable_step_2   = $is_plugin_active || ! $is_plugin_installed ? 'disabled' : '';
$active_button_disabled  = $is_plugin_active || ! $is_plugin_installed ? 'disabled' : '';
$install_button_disabled = $is_plugin_installed ? 'disabled' : '';
?>

<div class="wrap">
    <div class="acfwf-promo-page-container text-center">
        <div class="acfwf-promo-head">
            <img src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/acfwf-logo-wide.png' ); ?>" alt="<?php esc_attr_e( 'ACFWF Logo', 'wc-vendors' ); ?>" />
            <h2 class="acfwf-text-24"><?php echo esc_html__( 'Get Better Results With', 'wc-vendors' ); ?></h2>
            <h2 class="acfwf-text-24 acfwf-color"><?php echo esc_html__( 'Better WooCommerce Coupons', 'wc-vendors' ); ?></h2>
            <img class="acfwf-img-giftbox" src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/acfwf-giftbox-logo.png' ); ?>" alt="<?php esc_attr_e( 'ACFWF Logo', 'wc-vendors' ); ?>" />
            <div class="acfwf-promo-head-bg" style="background-image:url(<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/promo-bg.png' ); ?>);" alt="<?php esc_attr_e( 'ACFWF Logo', 'wc-vendors' ); ?>">
            </div>
        </div>
        <div class="acfwf-feature-boxes">
            <div class="acfwf-feature-box">
                <img src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/fluent-emoji_brain.png' ); ?>" alt="<?php esc_attr_e( 'Advanced Coupon Capabilities', 'wc-vendors' ); ?>" />
                <p>
                    <span><?php echo esc_html__( 'Advanced Coupon', 'wc-vendors' ); ?></span>
                    <br/>
                    <span><?php echo esc_html__( 'Capabilities', 'wc-vendors' ); ?></span>
                </p>
            </div>
            <div class="acfwf-feature-box">
                <img src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/fluent-emoji_credit-card.png' ); ?>" alt="<?php esc_attr_e( 'Store Credit System', 'wc-vendors' ); ?>" />
                <p>
                    <span><?php echo esc_html__( 'Store Credit', 'wc-vendors' ); ?></span>
                    <br/>
                    <span><?php echo esc_html__( 'System', 'wc-vendors' ); ?></span>
                </p>
            </div>
            <div class="acfwf-feature-box">
                <img src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/fluent-emoji_gem-stone.png' ); ?>" alt="<?php esc_attr_e( 'Loyalty Program', 'wc-vendors' ); ?>" />
                <p>
                    <span><?php echo esc_html__( 'Loyalty', 'wc-vendors' ); ?></span>
                    <br/>
                    <span><?php echo esc_html__( 'Program', 'wc-vendors' ); ?></span>
                </p>
            </div>
            <div class="acfwf-feature-box">
                <img src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/fluent-emoji_shopping-bags.png' ); ?>" alt="<?php esc_attr_e( 'BOGO Promotions', 'wc-vendors' ); ?>" />
                <p>
                    <span><?php echo esc_html__( 'BOGO', 'wc-vendors' ); ?></span>
                    <br/>
                    <span><?php echo esc_html__( 'Promotions', 'wc-vendors' ); ?></span>
                </p>
            </div>
            <div class="acfwf-feature-box">
                <img src="<?php echo esc_url( WCV_ASSETS_URL . 'images/acfwf/fluent-emoji_wrapped-gift.png' ); ?>" alt="<?php esc_attr_e( 'Versatile Gift Card Solutions', 'wc-vendors' ); ?>" />
                <p>
                    <span><?php echo esc_html__( 'Versatile Gift Card', 'wc-vendors' ); ?></span>
                    <br/>
                    <span><?php echo esc_html__( 'Solutions', 'wc-vendors' ); ?></span>
                </p>
            </div>
        </div>
        <p class="acfwf-text-16 italic text-gray-600">
            <?php echo esc_html__( 'Advanced Coupons is the best WooCommerce coupon plugin because it adds more coupon discount types, store credit, and all the advanced options you wish WooCommerce coupons could already do.', 'wc-vendors' ); ?>
        </p>
        <div class="acfwf-promo-steps">
            <div class="acfwf-promo-step <?php echo esc_attr( $should_disable_step_1 ); ?>">
                <h2 class="acfwf-text-16 acfwf-color"><?php echo esc_html__( 'Step 1', 'wc-vendors' ); ?></h2>
                <h2 class="acfwf-text-24 text-gray-600"><?php echo esc_html__( 'Enhance your Coupon Capabilities', 'wc-vendors' ); ?></h2>
                <div class="acfwf-divider"></div>
                <ul>
                    <li class="acfwf-text-11"><?php echo esc_html__( 'Implement BOGO deals and smart cart conditions to create offers that adjust to customer behaviors and cart contents, ensuring timely and relevant discounts.', 'wc-vendors' ); ?></li>
                    <li class="acfwf-text-11"><?php echo esc_html__( 'Boost customer retention with a loyalty program and store credits to encourage frequent visits and enhance long-term profitability.', 'wc-vendors' ); ?></li>
                </ul>
                <button id="acfwf-promo-install" class="acfwf-promo-button" data-plugin_slug="advanced-coupons-for-woocommerce-free" data-activate="false" <?php echo esc_attr( $install_button_disabled ); ?> >
                    <span class="wcv-loading-spinner"></span>
                    <span class="button-text">
                        <?php $is_plugin_installed ? esc_html_e( 'Installed', 'wc-vendors' ) : esc_html_e( 'Get Advanced Coupons', 'wc-vendors' ); ?>
                    </span>
                </button>
            </div>
            <div class="acfwf-promo-step <?php echo esc_attr( $should_disable_step_2 ); ?>">
                <h2 class="acfwf-text-16 acfwf-color"><?php echo esc_html__( 'Step 2', 'wc-vendors' ); ?></h2>
                <h2 class="acfwf-text-24 text-gray-600"><?php echo esc_html__( 'Configure your Coupon Features', 'wc-vendors' ); ?></h2>
                <div class="acfwf-divider"></div>
                <ul>
                    <li class="acfwf-text-11"><?php echo esc_html__( 'Create targeted promotions using coupon templates to help you streamline your promotions and grow your profits.', 'wc-vendors' ); ?></li>
                    <li class="acfwf-text-11"><?php echo esc_html__( 'Optimize coupon management by categorizing, restricting roles, and enabling URL activation to boost engagement and loyalty.', 'wc-vendors' ); ?></li>
                </ul>
                <button class="acfwf-promo-button" id="acfwf-promo-activate" data-plugin_slug="advanced-coupons-for-woocommerce-free" data-activate="true" <?php echo esc_attr( $active_button_disabled ); ?>>
                    <span class="wcv-loading-spinner"></span>
                    <span class="button-text">
                        <?php $is_plugin_active ? esc_html_e( 'Activated', 'wc-vendors' ) : esc_html_e( 'Activate Plugin', 'wc-vendors' ); ?>
                    </span>
                </button>
            </div>
        </div>
        <div id="acfwf-after-installed" class="text-center">
            <span class="acfwf-text-16 ilatic">
                <?php echo esc_html__( 'Congratulations! Advanced Coupons has been installed. ', 'wc-vendors' ); ?>
            </span>
            <a href="<?php echo esc_url( admin_url( 'admin.php?page=acfw-dashboard' ) ); ?>">
                <span class="acfwf-color acfwf-text-16"><?php echo esc_html__( 'Go to Advanced Coupons Dashboard', 'wc-vendors' ); ?></span>
            </a>
        </div>
    </div>
</div>
