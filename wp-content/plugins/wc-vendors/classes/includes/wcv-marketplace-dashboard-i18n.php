<?php

/**
 * I18n for the marketplace dashboard
 *
 * @since 2.5.5
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$marketplace_dashboard_i18n = array(
    'dashboard'      => array(
        'title'                       => __( 'Marketplace Dashboard', 'wc-vendors' ),
        'errorLoadingDashboardData'   => __( 'There was an error loading the dashboard data.', 'wc-vendors' ),
        'errorUpdatingVendorApproval' => __( 'There was an error updating the vendor approval.', 'wc-vendors' ),
    ),
    'filter'         => array(
        'apply'                => __( 'Apply', 'wc-vendors' ),
        'errorNoRangeSelected' => __( 'Please select a range.', 'wc-vendors' ),
        'errorInvalidRange'    => __( 'Invalid range selected.', 'wc-vendors' ),
        'errorFutureDate'      => __( 'Future date selected.', 'wc-vendors' ),
    ),
    'metrics'        => array(
        'marketplaceRevenue'     => __( 'Marketplace Revenue Total', 'wc-vendors' ),
        'marketplaceOrders'      => __( 'Marketplace Orders Total', 'wc-vendors' ),
        'marketplaceProducts'    => __( 'Marketplace Products', 'wc-vendors' ),
        'marketplaceCommissions' => __( 'Marketplace Commissions Total', 'wc-vendors' ),
    ),
    'topVendors'     => array(
        'title'  => __( 'Top 10 Vendors', 'wc-vendors' ),
        'table'  => array(
            'vendor'        => __( 'Vendor', 'wc-vendors' ),
            'revenue'       => __( 'Revenue', 'wc-vendors' ),
            'orders'        => __( 'Orders', 'wc-vendors' ),
            'rating'        => __( 'Rating', 'wc-vendors' ),
            'commissions'   => __( 'Commissions', 'wc-vendors' ),
            'unknownVendor' => __( 'Unknown Vendor', 'wc-vendors' ),
        ),
        'noData' => __( 'No data, please make some sales or select a different time period.', 'wc-vendors' ),
        'custom' => __( 'Custom', 'wc-vendors' ),
    ),
    'pendingVendors' => array(
        'title'         => __( 'Awaiting Approval', 'wc-vendors' ),
        'viewAll'       => __( 'View All', 'wc-vendors' ),
        'actions'       => array(
            'approve' => __( 'Approve', 'wc-vendors' ),
            'reject'  => __( 'Reject', 'wc-vendors' ),
        ),
        'noData'        => __( 'Congratulations! You have no vendors awaiting approval.', 'wc-vendors' ),
        'unknownVendor' => __( 'Unknown Vendor', 'wc-vendors' ),
        'registered'    => __( 'Registered', 'wc-vendors' ),
    ),
    'resources'      => array(
        'title' => __( 'Helpful Resources', 'wc-vendors' ),
    ),
    'licenses'       => array(
        'title'                       => __( 'Plugins & Licenses', 'wc-vendors' ),
        'license'                     => __( 'License', 'wc-vendors' ),
        'expires'                     => __( 'Expires', 'wc-vendors' ),
        'activate'                    => __( 'Activate', 'wc-vendors' ),
        'getNow'                      => __( 'Get Now', 'wc-vendors' ),
        'requires'                    => __( 'Requires', 'wc-vendors' ),
        'active'                      => __( 'Active', 'wc-vendors' ),
        'inactive'                    => __( 'Inactive', 'wc-vendors' ),
        'notInstalled'                => __( 'Not Installed', 'wc-vendors' ),
        'success'                     => __( 'Success', 'wc-vendors' ),
        'error'                       => __( 'Error', 'wc-vendors' ),
        'unexpectedError'             => __( 'An unexpected error occurred', 'wc-vendors' ),
        'pluginActivatedSuccessfully' => __( 'Plugin activated successfully', 'wc-vendors' ),
        'failedToActivatePlugin'      => __( 'Failed to activate plugin', 'wc-vendors' ),
        'manage'                      => __( 'Manage Licenses', 'wc-vendors' ),
        'toBeActive'                  => __( 'to be active', 'wc-vendors' ),
    ),
    'period'         => __( 'Period', 'wc-vendors' ),
    'promo'          => array(
        'free'                           => __( 'Free Plugin', 'wc-vendors' ),
        'premium'                        => __( 'Premium Plugin', 'wc-vendors' ),
        'recommended'                    => __( 'Recommended', 'wc-vendors' ),
        'installAndActivateButton'       => __( 'Install & Activate', 'wc-vendors' ),
        'installAndActivateFailed'       => __( 'Failed to install and activate plugin. Please try again.', 'wc-vendors' ),
        'activateSuccessfully'           => __( 'Activated successfully', 'wc-vendors' ),
        'installSuccessfully'            => __( 'Installed successfully', 'wc-vendors' ),
        'installFailed'                  => __( 'Installation failed', 'wc-vendors' ),
        'installAndActivateSuccessfully' => __( 'Plugin installed and activated successfully', 'wc-vendors' ),
        'activateFailed'                 => __( 'Activation failed', 'wc-vendors' ),
        'activateNowButton'              => __( 'Activate Now', 'wc-vendors' ),
        'activated'                      => __( 'Activated', 'wc-vendors' ),
        'installing'                     => __( 'Installing...', 'wc-vendors' ),
        'activating'                     => __( 'Activating...', 'wc-vendors' ),
    ),
);


return apply_filters( 'wcv_marketplace_dashboard_i18n', $marketplace_dashboard_i18n );
