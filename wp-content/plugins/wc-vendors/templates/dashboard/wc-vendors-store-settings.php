<?php
/**
 * The template for displaying the store settings form
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/
 *
 * @package    WC_Vendors
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
use WC_Vendors\Classes\Front\Forms\WCV_Store_Form;

$settings_social = (array) get_option( 'wcvendors_hide_settings_social' );
$social_total    = count( $settings_social );
$social_count    = 0;
foreach ( $settings_social as $value ) {
    if ( 1 === (int) $value ) {
        ++$social_count;
    }
}

?>

<?php do_action( 'wcvendors_settings_before_form' ); ?>

    <form method="post" id="wcv-store-settings" action="#" class="wcv-form">

        <?php WCV_Store_Form::form_data(); ?>

        <div class="wcv-tabs top" data-prevent-url-change="true">

            <?php WCV_Store_Form::store_form_tabs(); ?>

            <!-- Store Settings Form -->

            <div class="tabs-content" id="store">

                <div class="wcv-store-setting-section">
                    <h3 class="wcv-store-setting-section-title">
                        <?php /* translators: %s: vendor name */ printf( esc_html__( '%s Information', 'wc-vendors' ), wcv_get_vendor_name( true ) ); // phpcs:ignore ?>
                    </h3>
                    <!-- Vendor Name -->
                    <?php WCV_Store_Form::vendor_name(); ?>
                    <?php do_action( 'wcvendors_signup_after_vendor_name' ); ?>

                    <!-- Seller Info -->
                    <?php WCV_Store_Form::seller_info(); ?>
                    <?php do_action( 'wcvendors_settings_after_seller_info' ); ?>
                </div>
                
                <div class="wcv-store-setting-section">
                    <h3 class="wcv-store-setting-section-title">
                        <?php esc_html_e( 'Store Information', 'wc-vendors' ); ?>
                    </h3>
                    <div class="wcv-cols-group wcv-horizontal-gutters">
                        <!-- Store Name -->
                        <?php WCV_Store_Form::store_name( $store_name ); ?>

                        <?php do_action( 'wcvendors_settings_after_shop_name' ); ?>
                        <!-- Company URL -->
                        <?php do_action( 'wcvendors_settings_before_company_url' ); ?>
                        <?php WCV_Store_Form::company_url(); ?>
                        <?php do_action( 'wcvendors_settings_after_company_url' ); ?>
                    </div>

                    <!-- Store Description -->
                    <?php WCV_Store_Form::store_description( $store_description ); ?>

                    <?php do_action( 'wcvendors_settings_after_shop_description' ); ?>

                </div>

                <div class="wcv-store-setting-section">
                    <h3 class="wcv-store-setting-section-title">
                        <?php esc_html_e( 'Store Contact and Address', 'wc-vendors' ); ?>
                    </h3>
                    <div class="wcv-cols-group wcv-horizontal-gutters">
                        <!-- Store Phone -->
                        <?php do_action( 'wcvendors_settings_before_store_phone' ); ?>
                        <?php WCV_Store_Form::store_phone(); ?>
                        <?php do_action( 'wcvendors_settings_after_store_phone' ); ?>

                        <?php WCV_Store_Form::store_address_country(); ?>
                    </div>
                    <!-- Store Address -->
                    <?php do_action( 'wcvendors_settings_before_address' ); ?>
                    <?php WCV_Store_Form::store_address1(); ?>
                    <?php WCV_Store_Form::store_address2(); ?>
                    <div class="wcv-cols-group wcv-horizontal-gutters">
                        <div class="all-33 small-100 tiny-100">
                            <?php WCV_Store_Form::store_address_city(); ?>
                        </div>
                        <div class="all-33 small-100 tiny-100">
                            <?php WCV_Store_Form::store_address_state(); ?>
                        </div>
                        <div class="all-33 small-100 tiny-100">
                            <?php WCV_Store_Form::store_address_postcode(); ?>
                        </div>
                    </div>

                    <?php do_action( 'wcvendors_settings_after_address' ); ?>
                </div>
            </div>
            <?php do_action( 'wcvendors_settings_after_store_tab' ); ?>

            <?php do_action( 'wcvendors_settings_before_payment_tab' ); ?>
            <div class="tabs-content" id="payment">
                <div class="wcv-store-setting-section">
                    <h3 class="wcv-store-setting-section-title">
                        <?php esc_html_e( 'Payout Details', 'wc-vendors' ); ?>
                    </h3>
                    <!-- Paypal address -->
                    <?php do_action( 'wcvendors_settings_before_paypal' ); ?>

                    <?php WCV_Store_Form::preferred_payout_method(); ?>

                    <?php $commission_payout_method = get_user_meta( get_current_user_id(), 'wcv_commission_payout_method', true ); ?>

                    <div id="wcv-paypal-payout-fields" class="wcv-payout-method" style="display:<?php echo esc_attr( ( 'paypal' === $commission_payout_method ? 'block' : 'none' ) ); ?>;">
                        <?php WCV_Store_Form::paypal_payout(); ?>
                        <?php WCV_Store_Form::paypal_address(); ?>
                        <?php WCV_Store_Form::paypal_venmo(); ?>
                    </div>

                    <div id="wcv-bank-payout-fields" class="wcv-payout-method" style="display:<?php echo esc_attr( ( 'bank' === $commission_payout_method ? 'block' : 'none' ) ); ?>;">
                        <div class="wcv-cols-group wcv-horizontal-gutters">
                            <div class="all-50">
                                <?php WCV_Store_Form::bank_account_name(); ?>
                            </div>
                            <div class="all-50">
                                <?php WCV_Store_Form::bank_account_number(); ?>
                            </div>
                        </div>
                        <div class="wcv-cols-group wcv-horizontal-gutters">
                            <div class="all-100">
                                <?php WCV_Store_Form::bank_name(); ?>
                            </div>
                        </div>
                        <div class="wcv-cols-group wcv-horizontal-gutters">
                            <div class="all-50 small-100 tiny-100">
                                <?php WCV_Store_Form::bank_routing_number(); ?>
                            </div>
                            <div class="all-50 small-100 tiny-100">
                                <?php WCV_Store_Form::bank_iban(); ?>
                            </div>
                        </div>
                        <div class="wcv-cols-group wcv-horizontal-gutters">
                            <div class="all-50 small-100 tiny-100">
                                <?php WCV_Store_Form::bank_bic_swift(); ?>
                            </div>
                        </div>
                    </div>

                    <?php do_action( 'wcvendors_settings_after_paypal' ); ?>
                </div>
            </div>
            <?php do_action( 'wcvendors_settings_after_payment_tab' ); ?>

            <!-- Submit Button -->
            <!-- DO NOT REMOVE THE FOLLOWING TWO LINES -->
            <?php WCV_Store_Form::save_button( __( 'Save Changes', 'wc-vendors' ) ); ?>
        </div>
    </form>
<?php
do_action( 'wcvendors_settings_after_form' );
