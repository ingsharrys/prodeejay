<?php
/**
 * Upsell settings banner
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<style>
    .wc-vendors-pro-upgrade {
        background-color: #f9f9f9;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px;
    }

    .wc-vendors-pro-upgrade ul li {
        list-style-type: disc;
        margin-left: 20px;
    }

    .wc-vendors-pro-upgrade a.button {
        margin: 0;
        padding: .5rem 1.5rem;
        border: none;
        background: #191d8a;
        color: #fff;
        font-size: .875rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
    }
    
    .form_field_required td, .form_field_required th {
        padding: 0 5px;
    }
</style>
<div class="wc-vendors-pro-upgrade">
    <h2><?php echo esc_html__( 'Unlock More Features with WC Vendors Pro!', 'wc-vendors' ); ?></h2>
    <p><?php echo esc_html__( 'Upgrade to WC Vendors Pro to access a comprehensive set of advanced fields and functionalities. With the Pro version, you can:', 'wc-vendors' ); ?></p>
    <ul>
        <li><?php echo esc_html__( 'Add and manage more detailed product information', 'wc-vendors' ); ?></li>
        <li><?php echo esc_html__( 'Utilize advanced shipping options', 'wc-vendors' ); ?></li>
        <li><?php echo esc_html__( 'Enhance your product SEO with additional fields', 'wc-vendors' ); ?></li>
        <li><?php echo esc_html__( 'Leverage extensive inventory management features', 'wc-vendors' ); ?></li>
        <li><?php echo esc_html__( 'And much more!', 'wc-vendors' ); ?></li>
    </ul>
    <p><?php echo esc_html__( "Don't miss out on these powerful tools to elevate your vendor experience. Upgrade to WC Vendors Pro today and offer more to your vendors!", 'wc-vendors' ); ?></p>
    <a href="<?php echo esc_url( 'https://www.wcvendors.com/pricing/?utm_source=plugin&utm_medium=settingspage&utm_campaign=prosettingtofree' ); ?>" class="button"><?php echo esc_html__( 'Learn More About WC Vendors Pro', 'wc-vendors' ); ?></a>
</div>
