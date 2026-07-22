<?php
/**
 * Admin View: Setup Footer
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

?>

<div class="wcv-setup-footer">
    <?php do_action( 'wcvendors_setup_wizard_before_footer' ); ?>
    <?php if ( 'welcome' === $this->step ) : ?>
        <a class="wcv-return-to-dashboard" href="#" data-step="<?php echo esc_attr( $this->step ); ?>">
            <strong><?php esc_html_e( 'Skip setup', 'wc-vendors' ); ?></strong>
        </a>
    <?php elseif ( 'finish' === $this->step ) : ?>
        <a class="wcv-return-to-dashboard" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-vendors-marketplace-dashboard' ) ); ?>" data-step="<?php echo esc_attr( $this->step ); ?>">
            <?php esc_html_e( 'Return to your dashboard', 'wc-vendors' ); ?>
        </a>
    <?php elseif ( 'activate' === $this->step ) : ?>
        <a class="wcv-return-to-dashboard" href="<?php echo esc_url( $this->get_next_step_link() ); ?>" data-step="<?php echo esc_attr( $this->step ); ?>">
            <?php esc_html_e( 'Skip this step', 'wc-vendors' ); ?>
        </a>
        <?php endif; ?>
    <?php do_action( 'wcvendors_setup_wizard_after_footer' ); ?>
</div>
