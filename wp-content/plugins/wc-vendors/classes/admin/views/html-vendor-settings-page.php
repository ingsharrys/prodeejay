<?php
/**
 * HTML vendor settings page
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
?>
<div class="wrap">
    <h2>Shop Settings</h2>
    <form method="post">

        <table class="form-table">
            <?php do_action( 'wcvendors_settings_before_paypal' ); ?>
        
            <?php if ( 'yes' !== $hide_paypal_address ) : ?>

                <tr>
                    <th>
                        <label for="pv_paypal">
                            <?php esc_html_e( 'PayPal Address', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="email" name="pv_paypal" class="regular-text" id="pv_paypal"
                                placeholder="some@email.com"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'pv_paypal', true ) ); ?>">
                        <p class="description">
                            <?php esc_html_e( 'Your PayPal address can be used to send you your commission.', 'wc-vendors' ); ?>
                            <br>
                        </p>
                    </td>
                </tr>

            <?php endif; ?>

            <?php do_action( 'wcvendors_settings_after_paypal' ); ?>
            
            <?php if ( apply_filters( 'wcvendors_admin_user_meta_paypal_masspay_enable', ! wc_string_to_bool( $hide_payout_select ) ) ) : ?>
                
                <tr>
                    <th>
                        <label for="wcv_paypal_masspay_wallet"><?php esc_html_e( 'PayPal MassPay Wallet', 'wc-vendors' ); ?> 
                        <span class="description"></span></label>
                    </th>
                    <td>
                    <select name="wcv_paypal_masspay_wallet" id="wcv_paypal_masspay_wallet" class="" style="width: 25em;">
                    <?php $wcv_paypal_masspay_wallet = get_user_meta( $user_id, 'wcv_paypal_masspay_wallet', true ); ?>
                    <?php foreach ( wcv_paypal_wallet() as $option_key => $option_value ) : ?>
                        <option value="<?php echo esc_attr( $option_key ); ?>" <?php selected( $wcv_paypal_masspay_wallet, $option_key, true ); ?>><?php echo esc_attr( $option_value ); ?></option>
                    <?php endforeach; ?>
                    </select>
                        <p class="description">
                            <?php esc_html_e( 'Choose how your commission is paid.', 'wc-vendors' ); ?>
                            <br>
                        </p>
                    </td>
                </tr>
            <?php endif; ?>
            <?php if ( 'yes' !== $hide_venmo_id ) : ?>
                <tr>
                    <th>
                        <label for="wcv_paypal_masspay_venmo_id">
                            <?php esc_html_e( 'Venmo ID', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                    <input type="text" name="wcv_paypal_masspay_venmo_id" id="wcv_paypal_masspay_venmo_id" value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_paypal_masspay_venmo_id', true ) ); ?>" class="regular-text"> 
                        <p class="description">
                            <?php esc_html_e( 'Your PayPal address can be used to send you your commission.', 'wc-vendors' ); ?>
                            <br>
                        </p>
                    </td>
                </tr>
            <?php endif; ?>
                
            <?php if ( apply_filters( 'wcvendors_admin_user_meta_bank_details_enable', true ) ) : ?>

                <?php do_action( 'wcvendors_settings_before_bank_details', $user_id ); ?>
                <?php if ( 'yes' !== $hide_bank_account_name ) : ?>
                <tr>
                    <th>
                        <label for="wcv_bank_account_name">
                            <?php esc_html_e( 'Bank Account Name', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="text" name="wcv_bank_account_name" id="wcv_bank_account_name"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_bank_account_name', true ) ); ?>"
                                class="regular-text">
                    </td>
                </tr>
                <?php endif; ?>
                <?php if ( 'yes' !== $hide_bank_account_number ) : ?>
                <tr>
                    <th>
                        <label for="wcv_bank_account_number">
                            <?php esc_html_e( 'Bank Account Number', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="text" name="wcv_bank_account_number" id="wcv_bank_account_number"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_bank_account_number', true ) ); ?>"
                                class="regular-text">
                    </td>
                </tr>
                <?php endif; ?>
                <?php if ( 'yes' !== $hide_bank_name ) : ?>
                <tr>
                    <th>
                        <label for="wcv_bank_name">
                            <?php esc_html_e( 'Bank Name', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="text" name="wcv_bank_name" id="wcv_bank_name"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_bank_name', true ) ); ?>"
                                class="regular-text">
                    </td>
                </tr>
                <?php endif; ?>
                <?php if ( 'yes' !== $hide_bank_routing_number ) : ?>
                <tr>
                    <th>
                        <label for="wcv_bank_routing_number">
                            <?php esc_html_e( 'Routing Number', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="text" name="wcv_bank_routing_number" id="wcv_bank_routing_number"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_bank_routing_number', true ) ); ?>"
                                class="regular-text">
                    </td>
                </tr>
                <?php endif; ?>
                <?php if ( 'yes' !== $hide_bank_iban ) : ?>
                <tr>
                    <th>
                        <label for="wcv_bank_iban">
                            <?php esc_html_e( 'IBAN', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="text" name="wcv_bank_iban" id="wcv_bank_iban"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_bank_iban', true ) ); ?>"
                                class="regular-text">
                    </td>
                </tr>
                <?php endif; ?>
                <?php if ( 'yes' !== $hide_bank_bic_swift ) : ?>
                <tr>
                    <th>
                        <label for="wcv_bank_bic_swift">
                            <?php esc_html_e( 'BIC/SWIFT', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <input type="text" name="wcv_bank_bic_swift" id="wcv_bank_bic_swift"
                                value="<?php echo esc_attr( get_user_meta( $user_id, 'wcv_bank_bic_swift', true ) ); ?>"
                                class="regular-text">
                    </td>
                </tr>
                <?php endif; ?>
                <?php do_action( 'wcvendors_settings_after_bank_details', $user_id ); ?>

            <?php endif; ?>
            <?php if ( 'yes' !== $hide_store_name ) : ?>
            <tr>
                <th>
                    <label for="pv_shop_name">
                        <?php esc_html_e( 'Shop Name', 'wc-vendors' ); ?>
                    </label>
                </th>
                <td>
                    <input type="text" name="pv_shop_name" id="pv_shop_name" placeholder="Your shop name"
                            value="<?php echo esc_attr( get_user_meta( $user_id, 'pv_shop_name', true ) ); ?>"
                            <?php echo 'yes' === $store_name_required ? 'required' : ''; ?>>
                    <p class="description">
                        <?php esc_html_e( 'Your shop name is public and must be unique.', 'wc-vendors' ); ?>
                    </p>
                </td>
            </tr>

            <?php do_action( 'wcvendors_settings_after_shop_name' ); ?>
            <?php endif; ?>
            <?php if ( 'yes' !== $hide_seller_info ) : ?>
            <tr>
                <th>
                    <label for="pv_seller_info_unhtml">
                        <?php echo esc_html( apply_filters( 'wcvendors_seller_info_label', __( 'Seller info', 'wc-vendors' ) ) ); ?>
                    </label>
                </th>
                <td>
                    <?php

                    if ( $global_html || $has_html ) {
                        // Create a temporary post object for wp_editor context.
                        $temp_post = (object) array(
                            'ID'         => 0,
                            'post_title' => '',
                            'post_type'  => 'page',
                        );
                        setup_postdata( $temp_post );
                        wp_editor( $seller_info, 'pv_seller_info' );
                        wp_reset_postdata();
                    } else {
                        ?>
                        <textarea class="large-text" rows="10" id="pv_seller_info_unhtml" style="width:95%"
                                    name="pv_seller_info"
                                    <?php echo 'yes' === $seller_info_required ? 'required' : ''; ?>
                                    ><?php echo wp_kses_post( $seller_info ); ?>
                            </textarea>
                        <?php
                    }
                    ?>
                    <p class="description">
                        <?php esc_html_e( 'This is displayed on each of your products.', 'wc-vendors' ); ?>
                    </p>
                </td>
            </tr>

            <?php do_action( 'wcvendors_settings_after_seller_info' ); ?>
            <?php endif; ?>
            <?php if ( 'yes' !== $hide_store_description ) : ?>

                <tr>
                    <th>
                        <label for="pv_shop_description_unhtml">
                            <?php esc_html_e( 'Shop Description', 'wc-vendors' ); ?>
                        </label>
                    </th>
                    <td>
                        <?php

                        if ( $global_html || $has_html ) {
                            // Create a temporary post object for wp_editor context.
                            $temp_post = (object) array(
                                'ID'         => 0,
                                'post_title' => '',
                                'post_type'  => 'page',
                            );
                            setup_postdata( $temp_post );
                            wp_editor( $description, 'pv_shop_description' );
                            wp_reset_postdata();
                        } else {
                            ?>
                            <textarea class="large-text" rows="10" id="pv_shop_description_unhtml" style="width:95%"
                                        name="pv_shop_description"
                                        <?php echo 'yes' === $store_description_required ? 'required' : ''; ?>
                                        ><?php echo wp_kses_post( $description ); ?></textarea>
                            <?php
                        }
                        ?>
                        <p class="description">
                            <?php
                            printf(
								'%1$s <a href="%2$s">shop page</a>.', //phpcs:ignore
                                esc_html__( 'This is displayed on your.', 'wc-vendors' ),
                                esc_url( $shop_page )
                            );
                                ?>
                        </p>
                    </td>
                </tr>

                <?php do_action( 'wcvendors_settings_after_shop_description' ); ?>

            <?php endif; ?>

            <tr>
                <td colspan="2">
                    <?php wp_nonce_field( 'save-shop-settings-admin', 'wc-vendors-nonce' ); ?>
                    <input type="submit" class="button button-primary" name="vendor_application_submit"
                            value="<?php esc_html_e( 'Save Shop Settings', 'wc-vendors' ); ?>">
                </td>
            </tr>
        </table>
    </form>
</div>
