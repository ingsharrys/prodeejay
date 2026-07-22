<?php

/**
 * Output a form fields table with required check boxes
 *
 * This file is used to display the feedback edit form on the backend.
 *
 * @link       http://www.wcvendors.com
 * @since      1.5.0
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 *
 * @package    WCVendors_Pro
 * @subpackage WCVendors_Pro/admin/settings/partials/
 */
use function WC_Vendors\Classes\Admin\wcv_admin_checkbox;
$colspan = ( $require ) ? 3 : 2;

?>

<table class="form_field_required">
    <thead>
    <tr>
        <th class="form_field_title"><?php esc_html_e( 'Field', 'wc-vendors' ); ?></th>
        <th class="form_field_hide"><?php esc_html_e( 'Hide', 'wc-vendors' ); ?></th>
        <th class="form_field_required">
        <?php
        if ( $require ) :
            ?>
            <?php esc_html_e( 'Required', 'wc-vendors' ); ?><?php endif; ?></th>
    </tr>
    </thead>
    <tbody>
    <?php foreach ( $value['fields'] as $field ) : ?>
        <tr>
            <td><?php echo esc_html( $field['title'] ); ?></td>
            <td><?php wcv_admin_checkbox( $field ); ?></td>
            <td>
            <?php
            if ( $require ) :
                ?>
                <?php wcv_admin_checkbox( $field, true ); ?><?php endif; ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
