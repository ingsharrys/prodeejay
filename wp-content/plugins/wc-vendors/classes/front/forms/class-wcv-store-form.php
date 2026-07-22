<?php

/**
 * The WCV Store Form Class
 *
 * This is the store form class
 *
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable 	WordPress.DB.DirectDatabaseQuery.NoCaching
 */
namespace WC_Vendors\Classes\Front\Forms;

use WC_Vendors\Classes\Front\WCV_Form_Helper;
use WC_Vendors\Classes\Front\WCV_Dashboard_Controller;

/**
 * The WCV Store Form Class
 *
 * This is the order form class
 */
class WCV_Store_Form {

    /**
     * What form type is it settings or sign up
     *
     * @since    1.2.0
     * @access   public
     * @var      bool $form_type bool true for sign up form otherwise its the settings form for vendors
     */
    public static $form_type = 'signup';


    /**
     *  Output required form data
     *
     * @since    1.2.0
     *
     * @param  string $form_type Form type settings or signup.
     */
    public static function form_data( $form_type = 'settings' ) {

        self::$form_type = $form_type;

        wp_nonce_field( 'wcv-save_store_settings', '_wcv-save_store_settings' );
    }

    /**
     *  Output required sign up form data
     *
     * @since    1.0.0
     */
    public static function sign_up_form_data() {

        self::form_data( 'signup' );

        // Needed for processing the signup form.
        WCV_Form_Helper::input(
            apply_filters(
                'wcv_vendor_application_id',
                array(
                    'type'  => 'hidden',
                    'id'    => '_wcv_vendor_application_id',
                    'value' => get_current_user_id(),
                )
            )
        );
    }

    /**
     *  Output the tabs for the settings or signup form.
     *
     * @since    1.2.0
     */
    public static function store_form_tabs() {

        $hide_tabs_signup   = apply_filters( 'wcvendors_signup_hide_tabs', array() );
        $hide_tabs_settings = apply_filters( 'wcvendors_settings_hide_tabs', array() );

        $hide_tabs       = ( 'signup' === self::$form_type ) ? $hide_tabs_signup : $hide_tabs_settings;
        $css_classes     = apply_filters( 'wcv_store_tabs_class', array( 'tabs-nav' ) );
        $completed_steps = WCV_Dashboard_Controller::check_completed_steps();

        $store_tabs = apply_filters(
            'wcv_store_tabs',
            array(
                'store'   => array(
                    'label'  => __( 'Store', 'wc-vendors' ),
                    'target' => 'store',
                    'class'  => array(),
                ),
                'payment' => array(
                    'label'        => __( 'Payouts', 'wc-vendors' ),
                    'target'       => 'payment',
                    'class'        => array( 'has-dot' ),
                    'is_completed' => apply_filters( 'wcvendors_payment_tab_is_completed', $completed_steps['payout'] ),
                ),
            )
        );

        if ( ! empty( $hide_tabs ) ) {
            $hide_tabs = array_map( 'sanitize_text_field', $hide_tabs );
            foreach ( $hide_tabs as $tabs ) {

                if ( array_key_exists( $tabs, $store_tabs ) ) {
                    unset( $store_tabs[ $tabs ] );
                }
            }
        }

        $css_class = implode( ' ', $css_classes );

        include wcv_deprecated_filter( 'wcvendors_pro_store_form_store_tabs_path', '2.5.2', 'wcvendors_store_form_store_tabs_path', 'partials/wcvendors-store-tabs.php' );
    }

    /**
     *  Output save button
     *
     * @since    1.0.0
     *
     * @param string $button_text The text for the button.
     */
    public static function save_button( $button_text ) {

        WCV_Form_Helper::submit(
            apply_filters(
                'wcv_store_save_button',
                array(
                    'id'            => 'store_save_button',
                    'value'         => $button_text,
                    'class'         => 'wcv-button wcv-button-blue',
                    'append_before' => '<div class="wcv-button-group small">',
                    'append_after'  => '</div>',
                )
            )
        );
    }

    /**
     * Display vendor first and second name
     *
     * @return void
     * @version 1.0.0
     * @since   1.0.0
     */
    public static function vendor_name() {

        $hide_vendor_name = ( 'signup' === self::$form_type ) ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_vendor_name', 'no' ) ) : wc_string_to_bool( get_option( 'wcvendors_hide_settings_vendor_name', 'no' ) );
        $required         = ( 'signup' === self::$form_type ) ? wc_string_to_bool( get_option( 'wcvendors_required_signup_vendor_name', 'no' ) ) : wc_string_to_bool( get_option( 'wcvendors_required_settings_vendor_name', 'no' ) );
        if ( ! $hide_vendor_name ) {

            $required_attr     = $required ? array( 'required' => '' ) : array();
            $vendor_first_name = get_user_meta( get_current_user_id(), 'first_name', true );
            $vendor_last_name  = get_user_meta( get_current_user_id(), 'last_name', true );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_first_name',
                    array(
                        'id'                => '_wcv_vendor_first_name',
                        'label'             => __( 'First name', 'wc-vendors' ),
                        'placeholder'       => __( 'First name', 'wc-vendors' ),
                        'value'             => $vendor_first_name,
                        'type'              => 'text',
                        'wrapper_start'     => '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-50">',
                        'wrapper_end'       => '</div>',
                        'custom_attributes' => $required_attr,
                    )
                )
            );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_last_name',
                    array(
                        'id'                => '_wcv_vendor_last_name',
                        'label'             => __( 'Last name', 'wc-vendors' ),
                        'placeholder'       => __( 'Last name', 'wc-vendors' ),
                        'type'              => 'text',
                        'value'             => $vendor_last_name,
                        'wrapper_start'     => '<div class="all-50 small-50">',
                        'wrapper_end'       => '</div></div>',
                        'custom_attributes' => $required_attr,
                    )
                )
            );
        }
    }

    /**
     * Show preferred commission payout method fields
     *
     * @return void
     * @version 1.8.9
     * @since   1.8.9 - Added
     */
    public static function preferred_payout_method() {
        $commission_payout_method = get_user_meta( get_current_user_id(), 'wcv_commission_payout_method', true );
        $payout_method_options    = apply_filters(
            'wcv_commission_payout_method_options',
            array(
                ''               => __( 'None', 'wc-vendors' ),
                'paypal'         => wcv_get_icon( 'wcv-icon wcv-select-icon', 'wcv-icon-paypal' ) . __( 'PayPal', 'wc-vendors' ),
                'bank'           => wcv_get_icon( 'wcv-icon wcv-select-icon', 'wcv-icon-bank' ) . __( 'Bank Transfer', 'wc-vendors' ),
                'stripe-connect' => wcv_get_icon( 'wcv-icon wcv-select-icon', 'wcv-icon-stripe' ) . __( 'Stripe Connect', 'wc-vendors' ),
            )
        );

        if ( ! class_exists( 'WC_Vendors_Stripe_Connect_Gateway' ) ) {
            unset( $payout_method_options['stripe-connect'] );
        }

        WCV_Form_Helper::select(
            apply_filters(
                'wcv_commission_payout_method',
                array(
                    'id'                => 'wcv_commission_payout_method',
                    'class'             => 'wcv-custom-select',
                    'label'             => __( 'Commission Payout Method.', 'wc-vendors' ),
                    'desc_tip'          => 'true',
                    'description'       => __( 'Your commission payout will be via this method.', 'wc-vendors' ),
                    'wrapper_start'     => '<div class="wcv-cols-group wcv-horizontal-gutters"><div class="all-50 small-100 tiny-100">',
                    'wrapper_end'       => '</div></div>',
                    'value'             => $commission_payout_method,
                    'options'           => $payout_method_options,
                    'multiple'          => false,
                    'custom_attributes' => array(
                        'data-text-align' => 'left',
                    ),
                )
            )
        );
    }

    /**
     *  Output paypal address
     *
     * @since    1.2.0
     */
    public static function paypal_address() {

        $payment = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_paypal', 'no' ) : get_option( 'wcvendors_hide_settings_payment_paypal', 'no' );

        if ( 'yes' !== $payment ) {

            $value = get_user_meta( get_current_user_id(), 'pv_paypal', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_paypal_address',
                    array(
                        'id'            => '_wcv_paypal_address',
                        'label'         => __( 'PayPal address', 'wc-vendors' ),
                        'placeholder'   => __( 'yourpaypaladdress@goeshere.com', 'wc-vendors' ),
                        'desc_tip'      => 'true',
                        'description'   => __( 'Your PayPal address is used to send you your commission.', 'wc-vendors' ),
                        'type'          => 'email',
                        'value'         => $value,
                        'wrapper_start' => '<div id="wcv_paypal_masspay_email_address_wrapper">',
                        'wrapper_end'   => '</div>',
                    )
                )
            );
        }
    }

    /**
     *  Output paypal payout option
     *
     * @since 1.8.5 - Added Payouts form.
     */
    public static function paypal_payout() {

        $payment = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_paypal_payout', 'no' ) : get_option( 'wcvendors_hide_settings_payment_paypal_payout', 'no' );

        if ( 'yes' !== $payment ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_paypal_masspay_wallet', true );

            WCV_Form_Helper::select(
                apply_filters(
                    'wcv_vendor_paypal_payout',
                    array(
                        'id'            => 'wcv_paypal_masspay_wallet',
                        'class'         => 'wcv-custom-select',
                        'label'         => __( 'Choose your wallet.', 'wc-vendors' ),
                        'desc_tip'      => 'true',
                        'description'   => __( 'Your commission will be paid to this wallet.', 'wc-vendors' ),
                        'wrapper_start' => '<div class="all-100">',
                        'wrapper_end'   => '</div>',
                        'value'         => $value,
                        'options'       => wcv_paypal_wallet(),
                    )
                )
            );
        }
    }

    /**
     *  Output paypal venmo field
     *
     * @since    1.8.5 - Added Payouts venmo field.
     */
    public static function paypal_venmo() {

        $payment = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_paypal_venmo', 'no' ) : get_option( 'wcvendors_hide_settings_payment_paypal_venmo', 'no' );

        if ( 'yes' !== $payment ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_paypal_masspay_venmo_id', true );

            // Paypal Venmo ID.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_paypal_venmo',
                    array(
                        'id'            => 'wcv_paypal_masspay_venmo_id',
                        'label'         => __( 'Venmo ID', 'wc-vendors' ),
                        'placeholder'   => '',
                        'desc_tip'      => 'true',
                        'wrapper_start' => '<div id="wcv_paypal_masspay_venmo_id_wrapper" class="wcv_paypal_masspay_venmo_id">',
                        'wrapper_end'   => '</div>',
                        'description'   => __( 'Provide your Venmo ID or Phone number for your commission payout.', 'wc-vendors' ),
                        'value'         => $value,
                    )
                )
            );
        }
    }

    /**
     *  Bank Account Name
     *
     * @since 1.5.0
     */
    public static function bank_account_name() {

        $bank_account_name = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_bank_account_name', 'no' ) : get_option( 'wcvendors_hide_settings_payment_bank_account_name', 'no' );

        if ( 'yes' !== $bank_account_name ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_bank_account_name', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_bank_account_name',
                    array(
                        'id'          => 'wcv_bank_account_name',
                        'label'       => __( 'Bank account name', 'wc-vendors' ),
                        'placeholder' => '',
                        'type'        => 'text',
                        'value'       => $value,
                    )
                )
            );
        }
    }

    /**
     *  Bank Account Number
     *
     * @since 1.5.0
     */
    public static function bank_account_number() {

        $bank_account_number = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_bank_account_number', 'no' ) : get_option( 'wcvendors_hide_settings_payment_bank_account_number', 'no' );

        if ( 'yes' !== $bank_account_number ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_bank_account_number', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_bank_account_number',
                    array(
                        'id'          => 'wcv_bank_account_number',
                        'label'       => __( 'Bank account number', 'wc-vendors' ),
                        'placeholder' => '',
                        'type'        => 'text',
                        'value'       => $value,
                    )
                )
            );
        }
    }

    /**
     *  Bank Account Name
     *
     * @since 1.5.0
     */
    public static function bank_name() {

        $bank_name = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_bank_name', 'no' ) : get_option( 'wcvendors_hide_settings_payment_bank_name', 'no' );

        if ( 'yes' !== $bank_name ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_bank_name', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_bank_name',
                    array(
                        'id'          => 'wcv_bank_name',
                        'label'       => __( 'Bank name', 'wc-vendors' ),
                        'placeholder' => '',
                        'type'        => 'text',
                        'value'       => $value,
                    )
                )
            );
        }
    }

    /**
     *  Bank Account Name
     *
     * @since 1.5.0
     */
    public static function bank_routing_number() {

        $bank_routing_number = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_routing_number', 'no' ) : get_option( 'wcvendors_hide_settings_payment_routing_number', 'no' );

        if ( 'yes' !== $bank_routing_number ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_bank_routing_number', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_bank_routing_number',
                    array(
                        'id'          => 'wcv_bank_routing_number',
                        'label'       => __( 'Bank routing number', 'wc-vendors' ),
                        'placeholder' => '',
                        'type'        => 'text',
                        'value'       => $value,
                    )
                )
            );
        }
    }

    /**
     *  Bank Iban
     *
     * @since 1.5.0
     */
    public static function bank_iban() {

        $bank_iban = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_iban', 'no' ) : get_option( 'wcvendors_hide_settings_payment_iban', 'no' );

        if ( 'yes' !== $bank_iban ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_bank_iban', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_bank_routing_number',
                    array(
                        'id'          => 'wcv_bank_iban',
                        'label'       => __( 'Bank IBAN', 'wc-vendors' ),
                        'placeholder' => '',
                        'type'        => 'text',
                        'value'       => $value,
                    )
                )
            );
        }
    }

    /**
     *  Bank Iban
     *
     * @since 1.5.0
     */
    public static function bank_bic_swift() {

        $bank_bic_swift = ( 'signup' === self::$form_type ) ? get_option( 'wcvendors_hide_signup_payment_bic_swift', 'no' ) : get_option( 'wcvendors_hide_settings_payment_bic_swift', 'no' );

        if ( 'yes' !== $bank_bic_swift ) {

            $value = get_user_meta( get_current_user_id(), 'wcv_bank_bic_swift', true );

            // Paypal address.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_bank_bic_swift',
                    array(
                        'id'          => 'wcv_bank_bic_swift',
                        'label'       => __( 'Bank BIC/SWIFT', 'wc-vendors' ),
                        'placeholder' => '',
                        'type'        => 'text',
                        'value'       => $value,
                    )
                )
            );
        }
    }

    /**
     *  Output store name
     *
     * @since    1.2.0
     *
     * @param string $store_name The store name.
     */
    public static function store_name( $store_name ) {

        if ( '' === $store_name ) {
            $user_data  = get_userdata( get_current_user_id() );
            $store_name = apply_filters( 'wcv_default_store_name', ucfirst( $user_data->display_name ) . __( ' Store', 'wc-vendors' ), $user_data );
        }

        // Store Name.
        WCV_Form_Helper::input(
            apply_filters(
                'wcv_vendor_store_name',
                array(
                    'id'                => '_wcv_store_name',
                    'label'             => __( 'Store name', 'wc-vendors' ),
                    'placeholder'       => '',
                    'desc_tip'          => 'true',
                    'description'       => __( 'Your shop name is public and must be unique.', 'wc-vendors' ),
                    'type'              => 'text',
                    'wrapper_start'     => '<div class="all-50 small-100 tiny-100">',
                    'wrapper_end'       => '</div>',
                    'value'             => $store_name,
                    'custom_attributes' => array(
                        'required'                   => '',
                        'data-parsley-error-message' => __( 'Store Name is required', 'wc-vendors' ),
                    ),
                )
            )
        );
    }

    /**
     *  Output store name
     *
     * @since    1.2.0
     */
    public static function store_phone() {

        $hide_store_phone = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_phone', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_phone', 'no' ) );

        $required = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_phone', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_phone', 'no' ) );

        $required_attr = $required ? array( 'required' => '' ) : array();

        if ( ! $hide_store_phone ) {

            $value = get_user_meta( get_current_user_id(), '_wcv_store_phone', true );

            // Store Name.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_store_phone',
                    array(
                        'id'                  => '_wcv_store_phone',
                        'label'               => __( 'Store phone', 'wc-vendors' ),
                        'placeholder'         => __( 'Your store phone number', 'wc-vendors' ),
                        'desc_tip'            => 'true',
                        'description'         => __( 'This is your store contact number', 'wc-vendors' ),
                        'type'                => 'text',
                        'wrapper_start'       => '<div class="all-50 small-100 tiny-100">',
                        'wrapper_end'         => '</div>',
                        'input_wrapper_class' => 'wcv-flex wcv-phone-input-wrapper',
                        'append_before'       => '<select id="wcv-country-code-select" name="_wcv_store_phone_code"></select>',
                        'value'               => $value,
                        'custom_attributes'   => $required_attr,
                    )
                )
            );
        }
    }

    /**
     *  Output store info
     *
     * @since    1.2.0
     */
    public static function seller_info() {

        $hide_seller_info = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_seller_info', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_seller_info', 'no' ) );
        $required         = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_seller_info', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_seller_info', 'no' ) );
        $required_attr    = $required ? array( 'required' => '' ) : array();

        if ( ! $hide_seller_info ) {
            $user_id      = get_current_user_id();
            $value        = get_user_meta( $user_id, 'pv_seller_info', true );
            $allow_markup = wc_string_to_bool( get_option( 'wcvendors_allow_form_markup', 'no' ) );
            $enable_media = wc_string_to_bool( get_option( 'wcvendors_allow_editor_media', 'no' ) );

            // If html in info is allowed then display the tinyMCE otherwise just display a text box.
            if ( $allow_markup ) {

                if ( $required ) {
                    add_filter( 'the_editor', array( __CLASS__, 'wp_editor_required' ) );
                    add_filter( 'tiny_mce_before_init', array( __CLASS__, 'wp_tinymce_required' ) );
                    add_filter( 'teeny_mce_before_init', array( __CLASS__, 'wp_tinymce_required' ) );
                }

                $required_class = $required ? 'wcv-required' : '';

                $settings = apply_filters(
                    'wcv_vendor_seller_info_editor_settings',
                    array(
                        'editor_height' => 200,
                        'media_buttons' => $enable_media,
                        'teeny'         => true,
                        'editor_class'  => $required_class,
                        'tinymce'       => array(
                            'setup' => 'function (editor) {
                            editor.on("change", function () {
                                var content = tinyMCE.activeEditor.getContent( {format : "raw"} )
                                    .replace( \'<p><br data-mce-bogus="1"></p>\', "" );

                                if ( content != undefined && content != "" ) {
                                    jQuery( "#" + editor.id ).html( content );
                                }
                            });
                        }',
                        ),

                    )
                );

                echo '<label>' . esc_html( apply_filters( 'wcv_vendor_seller_info_editor', __( 'Seller Info', 'wc-vendors' ) ) ) . '</label>';

                wp_editor( $value, 'pv_seller_info', $settings );

            } else {

                WCV_Form_Helper::textarea(
                    apply_filters(
                        'wcv_vendor_seller_info',
                        array(
                            'id'                => 'pv_seller_info',
                            'label'             => __( 'Seller info', 'wc-vendors' ),
                            'value'             => $value,
                            'custom_attributes' => $required_attr,
                        )
                    )
                );

            }
        }
    }

    /**
     *  Output store description
     *
     * @since    1.2.0
     */
    public static function store_description() {

        $hide_store_description = ( 'signup' === self::$form_type ) ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_description', 'no' ) ) : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_description', 'no' ) );
        $required               = ( 'signup' === self::$form_type ) ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_description', 'no' ) ) : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_description', 'no' ) );
        $required_attr          = $required ? array( 'required' => '' ) : array();

        if ( ! $hide_store_description ) {

            $user_id           = get_current_user_id();
            $vendor_store_html = get_user_meta( $user_id, 'pv_shop_html_enabled', true );
            $store_wide_html   = wc_string_to_bool( get_option( 'wcvendors_display_shop_description_html', 'no' ) );
            $enable_media      = wc_string_to_bool( get_option( 'wcvendors_allow_editor_media', 'no' ) );
            $value             = get_user_meta( get_current_user_id(), 'pv_shop_description', true );

            // If html in info is allowed then display the tinyMCE otherwise just display a text box.
            if ( $vendor_store_html || $store_wide_html ) {

                if ( $required ) {
                    add_filter( 'the_editor', array( __CLASS__, 'wp_editor_required' ) );
                    add_filter( 'tiny_mce_before_init', array( __CLASS__, 'wp_tinymce_required' ) );
                    add_filter( 'teeny_mce_before_init', array( __CLASS__, 'wp_tinymce_required' ) );
                }

                $required_class = $required ? 'wcv-required' : '';

                $settings = apply_filters(
                    'wcv_vendor_store_description_editor_settings',
                    array(
                        'editor_height' => 200,
                        'media_buttons' => $enable_media,
                        'teeny'         => true,
                        'editor_class'  => $required_class,
                        'tinymce'       => array(
                            'setup' => 'function (editor) {
                            editor.on("change", function () {
                                var content = tinyMCE.activeEditor.getContent( {format : "raw"} )
                                    .replace( \'<p><br data-mce-bogus="1"></p>\', "" );

                                if ( content != undefined && content != "" ) {
                                    jQuery( "#" + editor.id ).html( content );
                                }
                            });
                        }',
                        ),
                    )
                );

                echo '<label>' . esc_html__( 'Store description', 'wc-vendors' ) . '</label>';

                wp_editor( $value, 'pv_shop_description', $settings );

            } else {

                WCV_Form_Helper::textarea(
                    apply_filters(
                        'wcv_vendor_store_description',
                        array(
                            'id'                => 'pv_shop_description',
                            'label'             => __( 'Store description', 'wc-vendors' ),
                            'value'             => $value,
                            'custom_attributes' => $required_attr,
                        )
                    )
                );
            }
        }
    }

    /**
     * Output a formatted store address country
     *
     * @since      1.2.0
     */
    public static function store_address_country() {

        $hide_store_country = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address', 'no' ) );
        $required           = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_address', 'no' ) );
        $required_attr      = $required ? array( 'required' => '' ) : array();

        if ( ! $hide_store_country ) {

            $country = get_user_meta( get_current_user_id(), '_wcv_store_country', true );

            WCV_Form_Helper::country_select2(
                apply_filters(
                    'wcv_vendor_store_country',
                    array(
                        'id'                => '_wcv_store_country',
                        'label'             => __( 'Store country', 'wc-vendors' ),
                        'type'              => 'text',
                        'class'             => 'js_field-country',
                        'value'             => $country,
                        'wrapper_start'     => '<div class="all-50 small-100 tiny-100">',
                        'wrapper_end'       => '</div>',
                        'custom_attributes' => $required_attr,
                    )
                )
            );
        }
    }

    /**
     * Output a formatted store address1
     *
     * @since      1.2.0
     */
    public static function store_address1() {

        $hide_store_address1 = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address', 'no' ) );
        $required            = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_address', 'no' ) );

        $hide_store_address_chooser = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address_chooser', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address_chooser', 'no' ) );

        $api_key        = get_option( 'wcvendors_pro_google_maps_api_key', '' );
        $map_zoom_level = get_option( 'wcvendors_pro_google_maps_zoom_level', '' );
        $key_exists     = empty( $api_key ) ? false : true;

        $required_attr = $required ? array( 'required' => '' ) : array();

        if ( ! $hide_store_address1 ) {

            $address1 = get_user_meta( get_current_user_id(), '_wcv_store_address1', true );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_store_address1',
                    array(
                        'id'                => '_wcv_store_address1',
                        'label'             => __( 'Store address', 'wc-vendors' ),
                        'placeholder'       => __( 'Street address', 'wc-vendors' ),
                        'type'              => 'text',
                        'value'             => $address1,
                        'custom_attributes' => $required_attr,
                        'no_margin'         => true,
                    )
                )
            );
        }
    }

    /**
     * Output a formatted store address2
     *
     * @since      1.2.0
     */
    public static function store_address2() {

        $hide_store_address2 = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address', 'no' ) );

        if ( ! $hide_store_address2 ) {

            $address2 = get_user_meta( get_current_user_id(), '_wcv_store_address2', true );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_store_address2',
                    array(
                        'id'            => '_wcv_store_address2',
                        'placeholder'   => __( 'Apartment, unit, suite etc. ', 'wc-vendors' ),
                        'type'          => 'text',
                        'show_label'    => false,
                        'value'         => $address2,
                        'append_before' => '<div style="margin-top: 2px"></div>',
                    )
                )
            );
        }
    }

    /**
     * Output a formatted store address city
     *
     * @since      1.2.0
     */
    public static function store_address_city() {

        $hide_store_city = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address', 'no' ) );
        $required        = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_address', 'no' ) );
        if ( ! $hide_store_city ) {

            $city          = get_user_meta( get_current_user_id(), '_wcv_store_city', true );
            $required_attr = $required ? array( 'required' => 'true' ) : array();
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_store_city',
                    array(
                        'id'                => '_wcv_store_city',
                        'label'             => __( 'City / Town', 'wc-vendors' ),
                        'placeholder'       => __( 'City / Town', 'wc-vendors' ),
                        'type'              => 'text',
                        'value'             => $city,
                        'custom_attributes' => $required_attr,
                    )
                )
            );
        }
    }

    /**
     * Output a formatted store address state
     *
     * @since      1.2.0
     */
    public static function store_address_state() {

        $hide_store_state = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address', 'no' ) );
        $required         = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_required_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_required_settings_store_address', 'no' ) );
        if ( ! $hide_store_state ) {

            $required_attr = $required ? array( 'required' => '' ) : array();
            $state         = get_user_meta( get_current_user_id(), '_wcv_store_state', true );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_store_state',
                    array(
                        'id'                => '_wcv_store_state',
                        'label'             => __( 'State / County', 'wc-vendors' ),
                        'placeholder'       => __( 'State / County', 'wc-vendors' ),
                        'style'             => 'width: 100%;',
                        'value'             => $state,
                        'class'             => 'js_field-state select',
                        'custom_attributes' => array_merge(
                            $required_attr,
                            array(
                                'data-placeholder' => __( 'Select a state...', 'wc-vendors' ),
                            )
                        ),
                    )
                )
            );

        }
    }

    /**
     * Output a formatted store address postcode
     *
     * @since      1.2.0
     */
    public static function store_address_postcode() {

        $hide_store_postcode = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_address', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_address', 'no' ) );

        if ( ! $hide_store_postcode ) {

            $postcode = get_user_meta( get_current_user_id(), '_wcv_store_postcode', true );

            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_store_postcode',
                    array(
                        'id'          => '_wcv_store_postcode',
                        'label'       => __( 'Postcode / Zip', 'wc-vendors' ),
                        'placeholder' => __( 'Postcode / Zip', 'wc-vendors' ),
                        'value'       => $postcode,
                    )
                )
            );

        }
    }

    /**
     *  Output company url field
     *
     * @since    1.2.0
     */
    public static function company_url() {

        $hide_store_company_url = ( 'signup' === self::$form_type )
            ? wc_string_to_bool( get_option( 'wcvendors_hide_signup_store_company_url', 'no' ) )
            : wc_string_to_bool( get_option( 'wcvendors_hide_settings_store_company_url', 'no' ) );

        $required = wc_string_to_bool( get_option( 'wcvendors_required_settings_store_company_url', 'no' ) );
        if ( 'signup' === self::$form_type ) {
            $required = wc_string_to_bool( get_option( 'wcvendors_required_signup_store_company_url', 'no' ) );
        }
        $required_attr = $required ? array( 'required' => '' ) : array();

        if ( ! $hide_store_company_url ) {

            $value = get_user_meta( get_current_user_id(), '_wcv_company_url', true );

            // Company URL.
            WCV_Form_Helper::input(
                apply_filters(
                    'wcv_vendor_company_url',
                    array(
                        'id'                => '_wcv_company_url',
                        'label'             => __( 'Store website / Blog URL', 'wc-vendors' ),
                        'placeholder'       => __( 'https://yourcompany-blogurl.com/here', 'wc-vendors' ),
                        'desc_tip'          => 'true',
                        'description'       => __( 'Your company / Blog URL', 'wc-vendors' ),
                        'type'              => 'url',
                        'wrapper_start'     => '<div class="all-50 small-100 tiny-100">',
                        'wrapper_end'       => '</div>',
                        'value'             => $value,
                        'custom_attributes' => $required_attr,
                    )
                )
            );
        }
    }

    /**
     *  Hook into the wp_editor and add a required field
     *
     * @param string $markup The current editor's markup.
     */
    public static function wp_editor_required( $markup ) {
        if ( stripos( $markup, 'wcv-required' ) !== false ) {
            $pattern = '/<textarea[^>]*id=["\'](.*?)["\']/m';
            $matches = array();

            preg_match( $pattern, $markup, $matches );

            $error_container = isset( $matches[1] ) ? 'data-parsley-errors-container="#wp-' . $matches[1] . '-wrap"' : '';
            $markup          = str_replace( '<textarea', '<textarea required ' . $error_container . ' data-parsley-error-message="' . apply_filters( 'wcv_required_editor_message', __( 'This is required', 'wc-vendors' ) ) . '"', $markup );
        }

        return $markup;
    }

    /**
     * Modify the tinymce editor settings
     *
     * @param array $settings the current editor's settings.
     *
     * @return array $settings the current editor's settings.
     * @since 1.5.5
     */
    public static function wp_tinymce_required( $settings ) {
        $settings['body_class'] .= ' wcv-required ';

        return $settings;
    }
}
