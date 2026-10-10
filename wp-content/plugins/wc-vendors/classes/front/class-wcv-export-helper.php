<?php
/**
 * The WCV_Export_Helper Class
 *
 * This is the this is the helper class to help exporting data for vendors
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    return;
}

/**
 * WCVendors Pro Order Export class.
 *
 * @version 2.5.2
 * @since   2.5.2
 */
class WCV_Export_Helper {


    /**
     * Whether the vendor is allowed to export orders.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    public $can_export_csv = false;

    /**
     * Whether the vendor is allowed to view customer emails.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    public $can_view_emails = false;

    /**
     * Whether the vendor is allowed to view customer names.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    public $can_view_name = false;

    /**
     * Whether the vendor is allowed to view shipping names.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    public $can_view_shipping_name = false;

    /**
     * Whether the vendor is allowed to view customer addresses.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    public $can_view_address = false;

    /**
     * Whether the vendor is allowed to view customer phone numbers.
     *
     * @var boolean
     * @version 2.5.2
     * @since   2.5.2
     */
    public $can_view_phone = false;


    /**
     * Initialize the class and set its properties.
     *
     * @version 2.5.2
     * @since   2.5.2
     */
    public function __construct() {

        $this->can_export_csv         = wc_string_to_bool( get_option( 'wcvendors_capability_orders_export', 'no' ) );
        $this->can_view_emails        = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_email', 'no' ) );
        $this->can_view_name          = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_name', 'no' ) );
        $this->can_view_shipping_name = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_shipping_name', 'no' ) );
        $this->can_view_address       = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_shipping', 'no' ) );
        $this->can_view_phone         = wc_string_to_bool( get_option( 'wcvendors_capability_order_customer_phone', 'no' ) );
    }

    /**
     * Send the CSV to the browser for download
     *
     * @version 1.8.8
     * @since   1.8.8 - Added HPOS Compatibility.
     * @since   2.5.2
     * @since   2.5.9 - Added shipped status.
     * @since   2.6.9 - Added $export_format parameter.
     *
     * @param array  $all_orders    All the orders to export.
     * @param string $export_format 'line_item' (one row per item, default) or 'order' (one row per order).
     *
     * @return array  $orders  Formatted orders.
     */
    public function format_orders_export( $all_orders, $export_format = 'line_item' ) {

        $rows = array();

        if ( empty( $all_orders ) ) {
            return $rows;
        }

        $use_shipping_address = apply_filters( 'wcv_export_orders_use_shipping_address', true );
        $current_user_id      = get_current_user_id();

        foreach ( $all_orders as $order_row ) {
            $vendor_order = $order_row->order;
            $parent_order = wc_get_order( $vendor_order->get_parent_id() );

            // Cache order-level values shared across all item rows.
            $order_number = $parent_order->get_order_number();
            $order_date   = $parent_order->get_date_created()->date_i18n( 'Y-m-d' );
            $order_status = wc_get_order_status_name( $parent_order->get_status() );
            $has_shipped  = wcv_vendor_shipped( $parent_order, $current_user_id ) ? __( 'Yes', 'wc-vendors' ) : __( 'No', 'wc-vendors' );

            $shipping_name    = $parent_order->get_shipping_first_name() . ' ' . $parent_order->get_shipping_last_name();
            $customer_details = $use_shipping_address && '' !== trim( $shipping_name )
                ? $shipping_name
                : $parent_order->get_billing_first_name() . ' ' . $parent_order->get_billing_last_name();

            // Pre-cache address fields to avoid double getter calls in the ternary.
            if ( $this->can_view_address ) {
                $address  = $use_shipping_address && '' !== $parent_order->get_shipping_address_1() ? $parent_order->get_shipping_address_1() : $parent_order->get_billing_address_1();
                $address2 = $use_shipping_address && '' !== $parent_order->get_shipping_address_2() ? $parent_order->get_shipping_address_2() : $parent_order->get_billing_address_2();
                $city     = $use_shipping_address && '' !== $parent_order->get_shipping_city() ? $parent_order->get_shipping_city() : $parent_order->get_billing_city();
                $state    = $use_shipping_address && '' !== $parent_order->get_shipping_state() ? $parent_order->get_shipping_state() : $parent_order->get_billing_state();
                $zip      = $use_shipping_address && '' !== $parent_order->get_shipping_postcode() ? $parent_order->get_shipping_postcode() : $parent_order->get_billing_postcode();
            }

            $billing_email = $this->can_view_emails ? $parent_order->get_billing_email() : '';
            $billing_phone = $this->can_view_phone ? $parent_order->get_billing_phone() : '';

            if ( 'order' === $export_format ) {
                // One row per order — concatenate all line items into a single row.
                $product_parts = array();
                $total_qty     = 0;
                $any_shipping  = false;

                foreach ( $vendor_order->get_items() as $item ) {
                    if ( ! $any_shipping ) {
                        $product      = wc_get_product( $item->get_product_id() );
                        $any_shipping = $product && $product->needs_shipping();
                    }
                    $qty             = $item->get_quantity();
                    $total_qty      += $qty;
                    $product_parts[] = $qty . ' x ' . $item->get_name();
                }

                $new_row                 = array();
                $new_row['order_number'] = $order_number;
                $new_row['product']      = implode( "\n", $product_parts );
                $new_row['quantity']     = $total_qty;
                $rows[]                  = $this->append_common_row_fields( $new_row, $customer_details, $address ?? '', $address2 ?? '', $city ?? '', $state ?? '', $zip ?? '', $billing_email, $billing_phone, $order_row, $order_status, $any_shipping, $has_shipped, $order_date );
            } else {
                // One row per item — built in the same key order as get_export_headers().
                foreach ( $vendor_order->get_items() as $item ) {
                    $product       = wc_get_product( $item->get_product_id() );
                    $need_shipping = $product && $product->needs_shipping();

                    $new_row                 = array();
                    $new_row['order_number'] = $order_number;
                    $new_row['product']      = $item->get_name();
                    $new_row['quantity']     = $item->get_quantity();
                    $rows[]                  = $this->append_common_row_fields( $new_row, $customer_details, $address ?? '', $address2 ?? '', $city ?? '', $state ?? '', $zip ?? '', $billing_email, $billing_phone, $order_row, $order_status, $need_shipping, $has_shipped, $order_date );
                }
            }
        }

        return $rows;
    } // prepare_orders_export

    /**
     * Send the CSV to the browser for download
     *
     * @version 2.5.2
     * @since   2.5.2
     *
     * @param    array  $headers  The CSV column headers.
     * @param    array  $body     The CSV body.
     * @param    string $filename The CSV filename.
     */
    public function download_csv( $headers, $body, $filename ) {

        // Clear browser output before this point.
        if ( ob_get_contents() ) {
            ob_end_clean();
        }

        if ( ! $body ) {
            return false;
        }

        // Output headers so that the file is downloaded rather than displayed.
        header( 'Content-Type: text/csv; charset=utf-8' );
        header( 'Content-Disposition: attachment; filename=' . $filename . '.csv' );

        // Create a file pointer connected to the output stream.
        $csv_output = fopen( 'php://output', 'w' );

        // Output the column headings.
        fputcsv( $csv_output, $headers, ',', '"', '\\' );

        // Body.
        foreach ( $body as $data ) {
            fputcsv( $csv_output, $data, ',', '"', '\\' );
        }

        die();
    } // download_csv

    /**
     * Append common fields shared by both export formats to a row array.
     *
     * @param array  $row              Row being built.
     * @param string $customer_details Formatted customer name.
     * @param string $address          Street address line 1.
     * @param string $address2         Street address line 2.
     * @param string $city             City.
     * @param string $state            State/county.
     * @param string $zip              Postcode.
     * @param string $billing_email    Customer billing email.
     * @param string $billing_phone    Customer billing phone.
     * @param object $order_row        Raw order row with totals.
     * @param string $order_status     Human-readable order status.
     * @param bool   $needs_shipping   Whether any product in this row needs shipping.
     * @param string $has_shipped      Shipped status label.
     * @param string $order_date       Formatted order date.
     * @return array
     * @since 2.6.9
     */
    private function append_common_row_fields( $row, $customer_details, $address, $address2, $city, $state, $zip, $billing_email, $billing_phone, $order_row, $order_status, $needs_shipping, $has_shipped, $order_date ) {
        if ( $this->can_view_name ) {
            $row['customer'] = $customer_details;
        }
        if ( $this->can_view_address ) {
            $row['address']  = $address;
            $row['address2'] = $address2;
            $row['city']     = $city;
            $row['state']    = $state;
            $row['zip']      = $zip;
        }
        if ( $this->can_view_emails ) {
            $row['email'] = $billing_email;
        }
        if ( $this->can_view_phone ) {
            $row['phone'] = $billing_phone;
        }
        $row['total']      = $order_row->total;
        $row['status']     = $order_status;
        $row['shipped']    = $needs_shipping ? $has_shipped : __( 'N/A', 'wc-vendors' );
        $row['order_date'] = $order_date;
        return $row;
    }

    /**
     * Headers for the orders export CSV
     *
     * @version 2.5.9
     * @since   2.5.2
     * @since   2.5.9 - Added shipped status.
     *
     * @return array
     */
    public function get_export_headers() {
        $headers = array(
            'order'    => __( 'Order', 'wc-vendors' ),
            'product'  => __( 'Product Title', 'wc-vendors' ),
            'quantity' => __( 'Quantity', 'wc-vendors' ),
            'name'     => __( 'Full name', 'wc-vendors' ),
            'address'  => __( 'Address', 'wc-vendors' ),
            'address2' => __( 'Address 2', 'wc-vendors' ),
            'city'     => __( 'City', 'wc-vendors' ),
            'state'    => __( 'State', 'wc-vendors' ),
            'zip'      => __( 'Zip', 'wc-vendors' ),
            'email'    => __( 'Email address', 'wc-vendors' ),
            'phone'    => __( 'Phone', 'wc-vendors' ),
            'total'    => __( 'Order Total', 'wc-vendors' ),
            'status'   => __( 'Order Status', 'wc-vendors' ),
            'shipped'  => __( 'Shipped', 'wc-vendors' ),
            'date'     => __( 'Date', 'wc-vendors' ),
        );

        if ( ! $this->can_view_emails ) {
            unset( $headers['email'] );
        }

        if ( ! $this->can_view_phone ) {
            unset( $headers['phone'] );
        }

        if ( ! $this->can_view_name ) {
            unset( $headers['name'] );
        }

        if ( ! $this->can_view_address ) {
            unset( $headers['address'] );
            unset( $headers['address2'] );
            unset( $headers['city'] );
            unset( $headers['state'] );
            unset( $headers['zip'] );
        }

        return apply_filters( 'wcv_export_headers', $headers );
    }
}
