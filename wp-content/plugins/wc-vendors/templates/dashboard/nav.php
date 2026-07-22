<?php
/**
 * The template for displaying the Pro Dashboard navigation
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @var       $page_url          The permalink to the page
 * @var       $page_label        The page label for the menu item
 * @package    WC_Vendors
 * @version    1.0.3
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
$icon     = isset( $icon ) ? $icon : '';
$icon_url = isset( $icon_url ) ? $icon_url : '';
$time     = time();
$target   = isset( $target ) ? $target : '_self';
?>
<?php echo wp_kses_post( $item_start ); ?>
    <a href="<?php echo esc_html( $page_url ); ?>" class="wcv-dashboard-nav-item-link" target="<?php echo esc_attr( $target ); ?>">
        <?php if ( $icon ) : ?>
            <svg class="wcv-icon wcv-icon-dashboard-icon <?php echo esc_attr( $icon ); ?>">
                <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#<?php echo esc_attr( $icon ); ?>"></use>
            </svg>
        <?php endif; ?>
        <?php if ( $icon_url && empty( $icon ) ) : ?>
            <img class="wcv-icon wcv-icon-dashboard-icon" src="<?php echo esc_url( $icon_url ); ?>" alt="<?php echo esc_attr( $page_label ); ?>">
        <?php endif; ?>
        <span class="wcv-dashboard-nav-item-label"><?php echo esc_html( $page_label ); ?></span>
    </a>
<?php echo wp_kses_post( $item_end ); ?>
