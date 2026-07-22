<?php

/**
 * Dashboard wrapper container
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://www.wcvendors.com
 * @since      1.0.0
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
$vertical_menu = wc_string_to_bool( get_option( 'wcvendors_use_vertical_menu', 'no' ) );

?>

<?php if ( $vertical_menu ) : ?>
        </div>
    </div>
<?php endif; ?>

    </div>
</div>
<?php if ( wc_string_to_bool( get_option( 'wcvendors_dashboard_scroll_to_top', 'no' ) ) ) : ?>
<button class="wcv-scroll-to-top" aria-label="<?php esc_attr_e( 'Scroll to top', 'wc-vendors' ); ?>">
    <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-arrow-up' ), wcv_allowed_html_tags() ); ?>
</button>
<?php endif; ?>
<?php do_action( 'wcv_after_pro_dashboard_wrapper' ); ?>
