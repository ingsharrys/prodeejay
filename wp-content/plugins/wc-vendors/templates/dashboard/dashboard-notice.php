<?php
/**
 * The template for displaying the vendor dashboard notice
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @version    1.4.0
 */
?>


<div class="woocommerce-<?php echo esc_attr( $notice_type ); ?>">
    <?php echo wp_kses( $vendor_dashboard_notice, wcv_allowed_html_tags() ); ?>
</div>
