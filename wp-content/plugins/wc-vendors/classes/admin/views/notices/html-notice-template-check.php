<?php
/**
 * Admin View: Notice - Template Check
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$theme = wp_get_theme();
?>
<div id="message" class="updated wcvendors-message">
    <a class="wcvendors-message-close notice-dismiss"
        href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wcv-hide-notice', 'template_files' ), 'wcvendors_hide_notices_nonce', '_wcv_notice_nonce' ) ); ?>"><?php esc_html_e( 'Dismiss', 'wc-vendors' ); ?></a>

    <p>
    <?php
    printf(
        '<strong>%s</strong> %s <a href="%s">%s</a>. %s',
        sprintf(
            /* translators: %1$s: theme name, %2$s: theme author */
            esc_html__( 'Your theme (%1$s) contains outdated copies of some WC Vendors template files. ', 'wc-vendors' ),
            esc_html( $theme['Name'] )
        ),
        esc_html__( 'These files may need updating to ensure they are compatible with the current version of WC Vendors. ', 'wc-vendors' ),
        esc_url( admin_url( 'admin.php?page=wc-status' ) ),
        esc_html__( 'system status page', 'wc-vendors' ),
        esc_html__( 'If in doubt, check with the author of the theme.', 'wc-vendors' )
    );
        ?>
        </p>
    <p class="submit"><a class="button-primary"
                        href="https://www.wcvendors.com/knowledge-base/wc-vendors-marketplace-templates-overview/?utm_source=plugin"
                        target="_blank"><?php esc_html_e( 'Learn more about templates', 'wc-vendors' ); ?></a></p>
</div>
