<?php
/**
 * Commission Table Main Actions
 *
 * This file is used to add the table actions before and after a table
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
use WC_Vendors\Classes\Front\WCV_Form_Helper;
?>

<div class="wcv_dashboard_table_header wcv_actions wcv-cols-group horizontal-gutters wcv-commission-header">
    <div class="all-80 small-100">
        <form method="post" action="" class="wcv-form wcv-form-exclude">
            <?php


            // Start Date.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_commission_start_date_input',
                    array(
                        'id'                  => '_wcv_commission_start_date_input',
                        'label'               => __( 'Start date', 'wc-vendors' ),
                        'class'               => 'wcv-datepicker-dashboard-filter no_limit wcv-datepicker wcv-init-picker',
                        'value'               => wp_date( 'Y-m-d', $this->get_start_date() ),
                        'placeholder'         => 'YYYY-MM-DD',
                        'wrapper_start'       => '<div class="all-66 small-100"><div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-100">',
                        'wrapper_end'         => '</div>',
                        'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                        'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                        'custom_attributes'   => array(
                            'data-default' => wp_date( 'Y-m-d', $this->get_default_start_date() ),
                            'maxlenth'     => '10',
                            'pattern'      => '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',
                        ),
                    )
                )
            );

            // End Date.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_commission_end_date_input',
                    array(
                        'id'                  => '_wcv_commission_end_date_input',
                        'label'               => __( 'End date', 'wc-vendors' ),
                        'class'               => 'wcv-datepicker-dashboard-filter no_limit wcv-datepicker wcv-init-picker',
                        'value'               => wp_date( 'Y-m-d', $this->get_end_date() ),
                        'placeholder'         => 'YYYY-MM-DD',
                        'wrapper_start'       => '<div class="all-50 small-100">',
                        'wrapper_end'         => '</div></div></div>',
                        'append_before'       => '<span class="wcv-flex" title="toggle" data-toggle>' . wcv_get_icon( 'wcv-icon wcv-icon-24', 'wcv-icon-calendar' ) . '</span>',
                        'input_wrapper_class' => 'wcv-datepicker-wrapper wcv-flex',
                        'custom_attributes'   => array(
                            'data-default' => wp_date( 'Y-m-d', strtotime( apply_filters( 'wcv_commission_end_date', 'now' ) ) ),
                            'maxlenth'     => '10',
                            'pattern'      => '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',
                        ),
                    )
                )
            );

            // Update Button.
            WCV_Form_Helper::submit(
                apply_filters(
                    'wcv_commission_date_update',
                    array(
                        'id'            => 'update_button',
                        'value'         => __( 'Update', 'wc-vendors' ),
                        'class'         => 'expand',
                        'wrapper_start' => '<div class="control-group all-33 small-100"><div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-100"><div class="control"><label>&nbsp;&nbsp;</label>',
                        'wrapper_end'   => '</div></div>',
                    )
                )
            );

            // Update Button.
            WCV_Form_Helper::clear(
                apply_filters(
                    'wcv_commission_filter_clear_button',
                    array(
                        'id'            => 'clear_button_commission',
                        'value'         => __( 'Clear', 'wc-vendors' ),
                        'class'         => 'expand',
                        'wrapper_start' => '<div class="all-45 small-90"><div class="control"><label>&nbsp;&nbsp;</label>',
                        'wrapper_end'   => '</div></div></div></div>',
                    )
                )
            );

            wp_nonce_field( 'wcv-commission-date-update', 'wcv_commission_date_update' );
            ?>
        </form>
    </div>

    <?php if ( $can_export_csv_commission ) : ?>

        <?php $export_btn_class = apply_filters( 'wcv_commission_export_btn_class', '' ); ?>

        <div class="all-20 small-100 align-right export-commission">
            <a href="<?php echo esc_url( $add_url ); ?>"
                class="wcv-button button quick-link-btn <?php echo esc_attr( $export_btn_class ); ?>"><?php echo esc_attr( __( 'Export Commission', 'wc-vendors' ) ); ?></a>
        </div>

    <?php endif; ?>

</div>
