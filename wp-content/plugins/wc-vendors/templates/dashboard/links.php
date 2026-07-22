<?php
/**
 * Links Template
 *
 * This template can be overridden by copying it to yourtheme/wc-vendors/dashboard/links.php
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/dashboard
 * @since         2.0.0
 * @version       2.6.5 Fix security issues.
 * @deprecated    2.1.5
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<?php

if ( function_exists( 'wc_print_notices' ) ) {
    wc_print_notices();
}

?>

<center>
    <p>
        <a href="<?php echo esc_url( $shop_page ); ?>" class="button"><?php echo esc_html__( 'View Your Store', 'wc-vendors' ); ?></a>
        <a href="<?php echo esc_url( $settings_page ); ?>" class="button"><?php echo esc_html__( 'Store Settings', 'wc-vendors' ); ?></a>

        <?php if ( $can_submit ) { ?>
            <a target="_TOP" href="<?php echo esc_url( $submit_link ); ?>"
                class="button"><?php echo esc_html__( 'Add New Product', 'wc-vendors' ); ?></a>
            <a target="_TOP" href="<?php echo esc_url( $edit_link ); ?>"
                class="button"><?php echo esc_html__( 'Edit Products', 'wc-vendors' ); ?></a>
            <?php
        }
        do_action( 'wcvendors_after_links' );
        ?>
</center>

<hr>
