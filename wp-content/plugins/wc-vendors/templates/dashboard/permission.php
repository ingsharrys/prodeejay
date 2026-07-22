<?php
/**
 * The template for displaying the Pro Dashboard permission denied
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @var       $page_url          The permalink to the page
 * @var       $page_label        The page label for the menu item
 * @package    WCVendors_Pro
 * @version    1.0.3
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

$admin_email = get_option( 'admin_email' );
?>

<div class="wcv-permission-denied">
    <h2 class="wcv-heading"><?php esc_html_e( 'Access Denied', 'wc-vendors' ); ?></h2>
    
    <p><?php esc_html_e( 'You do not have permission to access this section. If you believe this is an error, please contact the marketplace administrator!', 'wc-vendors' ); ?></p>
    
    <p>
        <a href="mailto:<?php echo esc_attr( $admin_email ); ?>" class="button button-primary">
            <?php esc_html_e( 'Contact Administrator', 'wc-vendors' ); ?>
        </a>
        
        <a href="<?php echo esc_attr( $return_url ); ?>" class="button">
            <?php esc_html_e( 'Return to Dashboard', 'wc-vendors' ); ?>
        </a>
    </p>
</div>
