<?php
/**
 * Class WCV_Setting_Form
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
class WCV_Setting_Form extends WCVendors_Settings_Page {
    /**
     * Constructor
     */
    public function __construct() {
        $this->id    = 'form';
        $this->label = __( 'Forms', 'wc-vendors' );
        add_action(
            'wcvendors_admin_field_form_fields_required',
            array(
                $this,
                'generate_form_fields_required_html',
            )
        );
        add_action( 'wcvendors_sections_form_product_start', array( $this, 'upsell_banner' ) );
        add_action( 'wcvendors_sections_form__start', array( $this, 'upsell_banner' ) );
        parent::__construct();
    }

    /**
     * Get sections
     */
    public function get_sections() {
        $sections = array(
            ''        => __( 'Settings', 'wc-vendors' ),
            'product' => __( 'Product', 'wc-vendors' ),
        );
        return apply_filters( 'wcvendors_settings_sections_' . $this->id, $sections );
    }

    /**
     * Get settings
     *
     * @param string $current_section Current section.
     */
    public function get_settings( $current_section = '' ) {
        switch ( $current_section ) {
            case '':
                return $this->get_settings_form_settings();
            case 'product':
                return $this->get_settings_form_product();
            default:
                break;
        }
    }

    /**
     * Get settings for form settings
     */
    public function get_settings_form_settings() {
        $settings = array(
            // Vendor store settings.
            array(
                'title' => __( 'Settings Form', 'wc-vendors' ),
                'type'  => 'title',
                'desc'  => sprintf( __( 'Configure which fields for the store settings form should show', 'wc-vendors' ), lcfirst( wcv_get_vendor_name( false ) ) ),
            ),
            array(
                'title'  => __( 'Tabs', 'wc-vendors' ),
                'desc'   => '',
                'type'   => 'form_fields_required',
                'fields' => array(
                    array(
                        'title'   => __( 'Store', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Payouts', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Store', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => sprintf(
                            // translators: %s is the name used to refer to a vendor.
                            __( '%s name', 'wc-vendors' ),
                            wcv_get_vendor_name()
                        ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Store description', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Seller info', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Company / blog URL', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Store phone', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        // translators: Name used to refer to vendor.
                        'title'       => sprintf( __( 'Store address ( If you disable this, %s shipping will not work.  )', 'wc-vendors' ), wcv_get_vendor_name( true, false ) ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'  => __( 'Payouts', 'wc-vendors' ),
                'desc'   => '',
                'type'   => 'form_fields_required',
                'fields' => array(
                    array(
                        'title'   => __( 'Paypal email', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Paypal Payout Method', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Venmo ID', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Bank Account Name', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Bank Account Number', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Bank Name', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'Routing number', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'IBAN', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                    array(
                        'title'   => __( 'BIC/SWIF', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                ),
            ),
            array(
                'type' => 'sectionend',
            ),
        );
        foreach ( $settings as $index => $setting ) {
            if ( isset( $setting['fields'] ) ) {
                foreach ( $setting['fields'] as $ix => $field ) {
                    $settings[ $index ]['fields'][ $ix ]['custom_attributes'] = array(
                        'disabled' => 'disabled',
                    );
                }
            } else {
                $settings[ $index ]['custom_attributes'] = array(
                    'disabled' => 'disabled',
                );
            }
        }
        return wcv_deprecated_filter( 'wcvendors_pro_settings_forms_settings', '2.5.2', 'wcvendors_settings_forms_settings', $settings );
    }

    /**
     * Get settings for form product
     */
    public function get_settings_form_product() {
        $settings = array(
            // Product Form fields.
            array(
                'title' => __( 'Form Fields', 'wc-vendors' ),
                'type'  => 'title',
                'desc'  => sprintf( __( 'Configure which fields for the product edit form should show and which are required', 'wc-vendors' ), lcfirst( wcv_get_vendor_name( false ) ) ),
            ),
            array(
                'title'   => __( 'Basic', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'Description', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Short Description', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Categories', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Tags', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Attributes', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Media', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'Featured Image (also disables the gallery)', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Gallery', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'General', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'SKU', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Private listing', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'External URL', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Button text for external url', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Price (disables sale price)', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Sale price', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Tax', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download files (also disables all download fields)', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        // translators: Name used to refer to vendor.
                        'title'       => sprintf( __( 'Disable the %s ability to change file URL to prevent remote file URLs', 'wc-vendors' ), wcv_get_vendor_name( false, false ) ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download limit', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download expiry', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download type', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Inventory', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'Manage Inventory (also disables all inventory fields)', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Stock qty', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Backorders', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Stock status', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Low stock threshold', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Sold individually', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Shipping', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'Weight', 'wc-vendors' ),
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Dimensions', 'wc-vendors' ),
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'   => __( 'Shipping class', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Upsells / Cross sells', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'Up sells', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Cross sells', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Grouped Products', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Variations', 'wc-vendors' ),
                'require' => true,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'       => __( 'Featured Image', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'SKU', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Enabled', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Downloadable', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Virtual', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Manage Stock', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Price', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Sale Price', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Stock QTY', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Allow backorders', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Stock Status', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Weight', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Dimensions', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Shipping Class', 'wc-vendors' ),
                        'desc'        => 'shipping_class',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Tax Class', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Description', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download files ( disables all download fields on variations )', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download limit', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                    array(
                        'title'       => __( 'Download expiry', 'wc-vendors' ),
                        'desc'        => '',
                        'required_id' => '',
                        'type'        => 'checkbox',
                        'default'     => false,
                    ),
                ),
            ),
            array(
                'title'   => __( 'Product SEO', 'wc-vendors' ),
                'require' => false,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'   => __( 'Product SEO (Disables all product SEO fields)', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => 'no',
                    ),
                    array(
                        'title'   => __( 'Title', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => 'no',
                    ),
                    array(
                        'title'   => __( 'Description', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'class'   => 'product-seo-field',
                        'default' => 'no',
                    ),
                    array(
                        'title'   => __( 'Keywords', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'class'   => 'product-seo-field',
                        'default' => 'no',
                    ),
                    array(
                        'title'   => __( 'OpenGraph', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'class'   => 'product-seo-field',
                        'default' => 'no',
                    ),
                    array(
                        'title'   => __( 'Twitter', 'wc-vendors' ),
                        'desc'    => 'hide option to enable Twitter cards display',
                        'type'    => 'checkbox',
                        'class'   => 'product-seo-field',
                        'default' => 'no',
                    ),
                ),
            ),
            array(
                'title'   => __( 'Advanced', 'wc-vendors' ),
                'require' => false,
                'type'    => 'form_fields_required',
                'fields'  => array(
                    array(
                        'title'   => __( 'Purchase Notes', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'default' => 'no',
                    ),
                    array(
                        'title'   => __( 'Product Order', 'wc-vendors' ),
                        'type'    => 'checkbox',
                        'class'   => 'product-seo-field',
                        'default' => 'no',
                    ),
                ),
            ),
            array(
                'type' => 'sectionend',
            ),
            array(
                'type' => 'sectionend',
            ),
        );
        // Add custom attribute disabled for each field.
        foreach ( $settings as $index => $setting ) {
            if ( isset( $setting['fields'] ) ) {
                foreach ( $setting['fields'] as $ix => $field ) {
                    $settings[ $index ]['fields'][ $ix ]['custom_attributes'] = array(
                        'disabled' => 'disabled',
                    );
                }
            } else {
                $settings[ $index ]['custom_attributes'] = array(
                    'disabled' => 'disabled',
                );
            }
        }

        return wcv_deprecated_filter( 'wcvendors_pro_settings_forms_product', '2.5.2', 'wcvendors_settings_forms_product', $settings );
    }

    /**
     * Output the form fields table
     *
     * @param string $value The attributes fo the form field to be output.
     */
    public function generate_form_fields_required_html( $value ) {
        $require           = isset( $value['require'] ) ? $value['require'] : false;
        $field_description = WCVendors_Admin_Settings::get_field_description( $value );
        extract( $field_description ); // phpcs:ignore WordPress.PHP.DontExtract.extract_extract
        ?>
        <tr valign="top" class="wcv_form_fields_table">
            <th scope="row" class="titledesc">
                <label for="<?php echo esc_attr( $value['id'] ); ?>"><?php echo wp_kses_post( $value['title'] ); ?></label>
            </th>
            <td class="forminp">
                <?php echo ( $description ) ? wp_kses_post( $description ) : ''; ?>
                <div class="wcv-form_fields_required">
                    <?php include apply_filters( 'wcv_partial_path_pro_form_fields_required', 'partials/html-form-fields-table.php' ); ?>
                </div>
            </td>
        </tr>
        <?php
    }

    /**
     * Upsell banner for the settings page
     */
    public function upsell_banner() {
        include WCV_ABSPATH_ADMIN . 'views/upsell/html-admin-settings-upsell.php';
    }
}
return new WCV_Setting_Form();
