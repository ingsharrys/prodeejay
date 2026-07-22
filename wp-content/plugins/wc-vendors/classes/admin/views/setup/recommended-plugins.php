<?php
/**
 * Admin View: Recommended Plugins Step
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
    <h2 class="wcv-setup-title"><?php esc_html_e( 'Recommended Plugins', 'wc-vendors' ); ?></h2>
    <h3 class="wcv-setup-subtitle"><?php esc_html_e( 'Enhance Your Marketplace', 'wc-vendors' ); ?></h3>
    
    <p class="wcv-setup-intro">
        <?php esc_html_e( 'We recommend these plugins to enhance your marketplace functionality. You can install them now or skip this step and install them later.', 'wc-vendors' ); ?>
    </p>

    <div class="wcv-setup-recommended-plugins">
        <?php
        $plugin_installer = WCV_Plugin_Installer::get_instance();
        $allowed_plugins  = $plugin_installer->get_allowed_plugins();
        $show_plugins     = array( 'advanced-coupons-for-woocommerce-free', 'storeagent-ai-for-woocommerce' );
        foreach ( $allowed_plugins as $plugin_slug => $plugin_data ) {
            if ( in_array( $plugin_slug, $show_plugins, true ) ) {
                $plugin_installer->generate_box( $plugin_slug, $plugin_data );
            }
        }
        ?>
    </div>

    <p class="wcv-setup-actions step align-right">
        <button type="submit" class="button button-secondary" name="previous_step" value="<?php esc_attr_e( 'Previous', 'wc-vendors' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5" />
            </svg>
            <?php esc_html_e( 'Previous', 'wc-vendors' ); ?>
        </button>
        <button type="submit" class="button button-next wcv-install-and-continue" value="<?php esc_attr_e( 'Continue', 'wc-vendors' ); ?>" name="save_step">
            <?php esc_html_e( 'Continue', 'wc-vendors' ); ?>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7" />
            </svg>
        </button>
    </p>
</form>

<style>
.wcv-setup-recommended-plugins {
    margin: 2em 0;
}

/* Plugin box styling - based on extensions page */
.wcv-setup-recommended-plugins .product {
    list-style: none;
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow: hidden;
}

.wcv-setup-recommended-plugins .product-addon-head {
    display: flex;
    align-items: flex-start;
    padding: 20px;
}

.wcv-setup-recommended-plugins .product-addon-head-icon {
    flex: 0 0 80px;
    margin-right: 20px;
}

.wcv-setup-recommended-plugins .product-addon-head-icon img {
    max-width: 80px;
    max-height: 80px;
    border-radius: 4px;
}

.wcv-setup-recommended-plugins .product-addon-head-content {
    flex: 1;
}

.wcv-setup-recommended-plugins .product-addon-head-content-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 1.3;
}

.wcv-setup-recommended-plugins .product-addon-head-content-desc {
    margin: 0;
    color: #666;
    line-height: 1.5;
    font-size: 14px;
}

.wcv-setup-recommended-plugins .product-addon-bottom {
    padding: 15px 20px;
    background: #f9f9f9;
    border-top: 1px solid #eee;
}

.wcv-setup-recommended-plugins .product-addons-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.wcv-setup-recommended-plugins .product-addons-button-solid {
    background: #191d8a;
    color: #fff;
}

.wcv-setup-recommended-plugins .product-addons-button-solid:hover {
    background: #005a87;
    color: #fff;
}

.wcv-setup-recommended-plugins .product-addons-button.installed {
    background: #3c3c3c;
    color: #fff;
    cursor: not-allowed;
}

.wcv-setup-recommended-plugins .product-addons-button.installed:hover {
    background: #3c3c3c;
}

.wcv-setup-recommended-plugins .wcv-loading-spinner {
    display: none;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: wcv-spin 1s linear infinite;
}

.wcv-setup-recommended-plugins .product-addons-button.loading .wcv-loading-spinner {
    display: inline-block;
}

.wcv-setup-recommended-plugins .product-addons-button.loading .product-addons-button-text {
    display: none;
}

.wcv-setup-recommended-plugins .product-addons-install-status {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;
}

.wcv-setup-recommended-plugins .product-addons-install-status.success {
    color: #3c3c3c;
}

.wcv-setup-recommended-plugins .product-addons-install-status.error {
    color: #dc3232;
}

/* Intro text styling */
.wcv-setup-intro {
    font-size: 16px;
    line-height: 1.6;
    color: #666;
    margin-bottom: 2em;
}

/* Loading states */
.wcv-setup-installing {
    opacity: 0.6;
    pointer-events: none;
}

.wcv-setup-message {
    margin: 15px 0;
    padding: 10px 15px;
    border-radius: 4px;
    font-weight: 500;
}

.wcv-setup-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.wcv-setup-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.wcv-setup-loading .wcv-install-and-continue {
    position: relative;
}

.wcv-setup-loading .wcv-install-and-continue::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    margin: auto;
    border: 2px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: wcv-spin 1s linear infinite;
}

@keyframes wcv-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 768px) {
    .wcv-setup-recommended-plugins .product-addon-head {
        flex-direction: column;
        text-align: center;
    }
    
    .wcv-setup-recommended-plugins .product-addon-head-icon {
        margin: 0 auto 15px auto;
    }
}
</style>
<script>
    jQuery(document).ready(function($) {
        $('.product-addons-button.installed').click(function() {
            return false;
        });
    });
</script>
