<?php
/**
 * Admin New Vendor Application
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/admin-notify-application.php.
 *
 * @author        Jamie Madden, WC Vendors
 * @package       WCVendors/Templates/Emails/HTML
 * @version       2.1.7
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

    <p>
    <?php
        /* translators: %1$s: vendor name, %2$s: site name */
        echo esc_html( sprintf( __( 'Hi there. This is a notification about a %1$s application on %2$s.', 'wc-vendors' ), wcv_get_vendor_name( true, false ), get_option( 'blogname' ) ) );
    ?>
    </p>

    <p>
    <?php
        /* translators: %s: application status */
        echo esc_html( sprintf( __( 'The application is currently: %s', 'wc-vendors' ), ucfirst( $status ) ) );
    ?>
    </p>
    <p>
    <?php
        /* translators: %s: username */
        echo esc_html( sprintf( __( 'Applicant username: %s', 'wc-vendors' ), $user->user_login ) );
    ?>
    </p>

<?php if ( __( 'pending', 'wc-vendors' ) === $status ) : ?>
    <p>
        <?php
        /* translators: %1$s: admin URL */
        echo wp_kses_post( sprintf( __( 'You can approve or deny the application at the following link <a href="%1$s">%1$s</a>', 'wc-vendors' ), esc_url( admin_url( 'users.php?role=pending_vendor' ) ) ) );
        ?>
    </p>
<?php endif; ?>

<?php

do_action( 'woocommerce_email_footer', $email );
