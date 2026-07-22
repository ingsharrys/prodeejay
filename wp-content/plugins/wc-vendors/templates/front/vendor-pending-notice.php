<?php
/**
 * The template for displaying the notice for your vendor applications
 *
 * Override this template by copying it to yourtheme/wc-vendors/front
 *
 * @package    WCVendors_Pro
 * @version    1.0.2
 */
?>
<p><?php echo wp_kses( $vendor_pending_notice, wcv_allowed_html_tags() ); ?></p>
