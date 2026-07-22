<?php
/**
 * Existing Comments Template
 *
 * This template can be overridden by copying it to yourtheme/wc-vendors/orders/comments/existing-comments.php
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/Emails/HTML
 * @since         2.0.0
 * @version    2.6.5 Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<?php

foreach ( $comments as $comment_data ) :
    $wcv_last_added = human_time_diff( strtotime( $comment_data->comment_date_gmt ), time() );

    ?>

    <p>
        <?php printf( /* translators: %s: time ago */ esc_html__( 'added %s ago', 'wc-vendors' ), esc_html( $wcv_last_added ) ); ?>
        </br>
        <?php echo wp_kses_post( $comment_data->comment_content ); ?>
    </p>

<?php endforeach; ?>
