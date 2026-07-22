<?php

/**
 * Store Tabs
 *
 * This file is used to output the store tabs on settings and signup page
 *
 * @link       http://www.wcvendors.com
 * @since      2.5.2
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */


?>

<div class="wcv-tabs-overflow-wrapper" style="margin: 56px 0 0 0;">
    <ul class="<?php echo esc_attr( $css_class ); ?> wcv_desktop" style="padding: 0; margin: 0;">
        <?php foreach ( $store_tabs as $store_tab ) : ?>
            <?php $show_dot = isset( $store_tab['is_completed'] ) && $store_tab['is_completed'] ? false : true; ?>
            <li>
                <a class="tabs-tab <?php echo esc_attr( implode( ' ', $store_tab['class'] ) ); ?> <?php echo esc_html( $store_tab['target'] ); ?>"
                    href="#<?php echo esc_attr( $store_tab['target'] ); ?>"><?php echo esc_html( $store_tab['label'] ); ?>
                    <?php if ( $show_dot && isset( $store_tab['is_completed'] ) ) : ?>
                        <span class="wcv-dot"></span>
                    <?php endif; ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="wcv-more-tabs">
        <button class="wcv-more-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="<?php esc_attr_e( 'More tabs', 'wc-vendors' ); ?>">
            <svg class="wcv-more-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
                <circle cx="4"  cy="10" r="2.2"/>
                <circle cx="10" cy="10" r="2.2"/>
                <circle cx="16" cy="10" r="2.2"/>
            </svg>
        </button>
        <ul class="wcv-more-dropdown" role="menu"></ul>
    </div>
</div>
