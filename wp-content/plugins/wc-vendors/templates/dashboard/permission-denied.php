<?php
/**
 * Show denied permission message when guest user tries to access the dashboard
 * This template can be overridden by copying it to yourtheme/wc-vendors/templates/dashboard/permission-denied.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}
?>
<div class="guest_permmission_denied">
    <p class="guest_permmission_denied_message"><?php echo wp_kses_post( $denied_message ); ?></p>
    <a class="button" href="<?php echo esc_url( $return_url ); ?>"><?php echo esc_html( $button_text ); ?></a>
</div>
