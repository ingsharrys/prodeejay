<?php
/**
 * The template for displaying the order note
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/order
 *
 * @package    WCVendors_Pro
 * @version    1.0.3
 */
?>

<p>
    <span><?php echo esc_html( $time_posted ) . esc_html__( ' ago you wrote :', 'wc-vendors' ); ?></span> <br/>
    <?php echo wp_kses_post( $note_text ); ?>
</p>
