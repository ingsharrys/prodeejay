<?php
/**
 * WCV_Export_CSV class
 *
 * @version 2.4.8 - Apply PHPCS
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedClassFound
 */
class WCV_Export_CSV {

    /**
     * Sort the data for CSV output first
     *
     * @param int   $product_id The product ID.
     * @param array $headers   The column headers.
     * @param array $body   The orders data.
     * @param array $items  The items.
     */
    public static function output_csv( $product_id, $headers, $body, $items ) {

        $headers['quantity']  = __( 'Quantity', 'wc-vendors' );
        $headers['item_meta'] = __( 'Item Meta', 'wc-vendors' );

        // Preserve the original product ID — it gets overwritten inside the loop below.
        $export_product_id = $product_id;

        $new_body = array();

        foreach ( $body as $i => $order ) {

            // Remove comments.
            unset( $body[ $i ]['comments'] );

            // Remove all numeric keys in each order (these are the meta values we are redoing into new lines).
            foreach ( $order as $key => $col ) {
                if ( is_int( $key ) ) {
                    unset( $order[ $key ] );
                }
            }

            // New order row.
            $new_row = $body[ $i ];
            // Remove order to redo.
            unset( $body[ $i ] );

            $order = wc_get_order( $i );

            if ( ! isset( $items[ $i ]['items'] ) ) {
                continue;
            }

            foreach ( $items[ $i ]['items'] as $item ) {

                $product_id = ! empty( $item['variation_id'] ) ? $item['variation_id'] : $item['product_id'];

                $new_row_with_meta = $new_row;

                // Add the qty row.
                $new_row_with_meta['quantity'] = $item->get_quantity();

                // Add the new item meta row.
                $variation_detail = ! empty( $item['variation_id'] ) ? WCV_Orders::get_variation_data( $item['variation_id'] ) : '';

                $new_row_with_meta['item_meta'] = $variation_detail;
                $new_row_with_meta['product']   = $item->get_name();
                $new_body[]                     = $new_row_with_meta;
            }
        }

        $headers = apply_filters( 'wcvendors_csv_headers', $headers, $export_product_id, $items );
        $body    = apply_filters( 'wcvendors_csv_body', $new_body, $export_product_id, $items );

        $product  = wc_get_product( $export_product_id );
        $filename = sprintf(
            'orders-%s-%s',
            $product ? sanitize_title( $product->get_name() ) : $export_product_id,
            gmdate( 'Y-m-d' )
        );

        self::download( $headers, $body, $filename );
    }


    /**
     * Send the CSV to the browser for download
     *
     * @param array  $headers The column headers.
     * @param array  $body The orders data.
     * @param string $filename The filename.
     */
    public static function download( $headers, $body, $filename ) {

        // Clear browser output before this point.
        if ( ob_get_contents() ) {
            ob_end_clean();
        }

        // Output headers so that the file is downloaded rather than displayed.
        header( 'Content-Type: text/csv; charset=utf-8' );
        header( 'Content-Disposition: attachment; filename=' . $filename . '.csv' );

        // Create a file pointer connected to the output stream.
        $output = fopen( 'php://output', 'w' );

        // Output the column headings.
        fputcsv( $output, $headers, ',', '"', '\\' );

        // Body.
        foreach ( $body as $data ) {
            fputcsv( $output, $data, ',', '"', '\\' );
        }

        die();
    }
}
