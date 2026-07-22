<!-- DEPRECAITED -->

<?php if ( ! defined( 'ABSPATH' ) ) {
    exit;
} ?>

<?php do_action( 'woocommerce_email_header', $email_heading ); ?>

<p><?php printf( /* translators: %1$s: vendor name, %2$s: site name */ esc_html__( 'Hi there. This is a notification about a %1$s application on %2$s.', 'wc-vendors' ), esc_html( wcv_get_vendor_name( true, false ) ), esc_html( get_option( 'blogname' ) ) ); ?></p>

<p>
    <?php printf( /* translators: %s: application status */ esc_html__( 'Application status: %s', 'wc-vendors' ), esc_html( $status ) ); ?><br/>
    <?php printf( /* translators: %s: applicant username */ esc_html__( 'Applicant username: %s', 'wc-vendors' ), esc_html( $user->user_login ) ); ?>
</p>

<?php do_action( 'woocommerce_email_footer' ); ?>
