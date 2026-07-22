<?php
/**
 * Admin View: Setup Header
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>
<div class="wcv-setup-header">
    <?php do_action( 'wcvendors_setup_wizard_before_header' ); ?>
    <h1 id="wcv-logo">
        <a href="https://www.wcvendors.com/?utm_source=plugin&utm_medium=setupwizard&utm_campaign=setupheaderlogo">
        <img src="<?php echo esc_url( WCV_ASSETS_URL ); ?>images/wc-vendors-logo-black-text.svg" alt="WC Vendors"/>
    </a>
</h1>
<?php do_action( 'wcvendors_setup_wizard_after_header' ); ?>
</div>
