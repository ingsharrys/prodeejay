<?php
/**
 * New dashboard tab content
 *
 * @version 2.6.5 - Fix security issues.
 * @since   2.5.4
 *
 * @package WCVendors
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$progress_bar_items = array_map(
    function ( $step ) {
        $icon  = $step['icon'];
        $class = 'incomplete';
        if ( $step['is_complete'] ) {
            $icon  = 'wcv-icon-setup-complete';
            $class = 'completed';
        }
        return array(
            'icon'        => $icon,
            'is_complete' => $step['is_complete'],
            'class'       => $class,
        );
    },
    $store_setup_steps
);

$current_step = array_search( false, array_column( $store_setup_steps, 'is_complete' ), true );
$current_step = $store_setup_steps[ $current_step ]['id'];

$completed_steps = array_filter(
    $store_setup_steps,
    function ( $step ) {
        return $step['is_complete'];
    }
);

$completed_steps = count( $completed_steps );

?>
<div class="wcv-cols-group wcv-horizontal-gutters column-group ink-stacker gutters">
    <div class="all-100 small-100 no-margin">
        <h2 class="wcv-heading small-align-center wcv-dashboard-welcome-message"><?php echo esc_html( $welcome_message ); ?></h2>
        <?php if ( count( $store_setup_steps ) !== $completed_steps && ! $is_dismissed ) : ?>
        <div class="wcv-store-setup-steps-wrapper wcv-section-bg-light wcv-bottom-space">
            <div class="wcv-store-setup-steps-header wcv-flex">
                <h3 class="wcv-heading"><?php esc_html_e( 'Complete your setup', 'wc-vendors' ); ?></h3>
                <a href="#" class="wcv-store-setup-dismiss" title="<?php esc_attr_e( 'Dismiss', 'wc-vendors' ); ?>">
                    <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-md', 'wcv-icon-times' ), wcv_allowed_html_tags() ); ?>
                </a>
            </div>
            <div class="wcv-store-setup-content-wrapper">
                <div class="wcv-store-setup-progress-bar">
                    <div class="wcv-store-setup-progress-bar-fill"></div>
                </div>
                <div class="wcv-store-setup-steps">
                    <?php foreach ( $store_setup_steps as $step ) : ?>
                        <?php $step_icon = $step['is_complete'] ? 'wcv-icon-setup-complete' : $step['icon']; ?>
                        <div class="wcv-store-setup-step <?php echo esc_attr( $step['id'] === $current_step ? 'current' : '' ); ?>  <?php echo esc_attr( true === $step['is_complete'] ? 'completed' : '' ); ?>">
                            <div class="wcv-store-setup-step-icon">
                                <svg class="wcv-icon wcv-step-icon">
                                    <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#<?php echo esc_attr( $step_icon ); ?>"></use>
                                </svg>
                            </div>
                            <div class="wcv-store-setup-step-content">
                                <a href="<?php echo esc_url( $step['link'] ); ?>" class="wcv-store-setup-step-link">
                                    <h3 class="wcv-store-setup-step-title"><?php echo esc_html( $step['title'] ); ?></h3>
                                    <p class="wcv-store-setup-step-description"><?php echo esc_html( $step['description'] ); ?></p>
                                    <?php if ( ! $step['is_complete'] ) : ?>
                                        <p class="wcv-store-setup-step-proceed  <?php echo esc_attr( $step['id'] === $current_step ? 'current' : '' ); ?>">
                                            <?php echo wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-20 wcv-icon-middle', 'wcv-arrow-right-outline' ), wcv_allowed_html_tags() ); ?>
                                        </p>
                                    <?php endif; ?>
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>
