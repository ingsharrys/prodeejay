<?php
/**
 * The plugin utils class
 *
 * This is used to define utility helpers for the plugin
 *
 * @since      2.5.2
 */
class WCV_Utils {

    /**
     *  Sort a multi dimensional array by nested array key
     *
     * @since    2.5.2
     *
     * @param array  $data  The array to sort.
     * @param string $key   The array key to sort on.
     * @param int    $order The sort order.
     */
    public static function array_sort( $data, $key, $order = SORT_ASC ) {

        $new_array      = array();
        $sortable_array = array();

        if ( count( $data ) > 0 ) {
            foreach ( $data as $k => $v ) {
                if ( is_array( $v ) ) {
                    foreach ( $v as $k2 => $v2 ) {
                        if ( $k2 === $key ) {
                            $sortable_array[ $k ] = $v2;
                        }
                    }
                } else {
                    $sortable_array[ $k ] = $v;
                }
            }

            switch ( $order ) {
                case SORT_ASC:
                    asort( $sortable_array );
                    break;
                case SORT_DESC:
                    arsort( $sortable_array );
                    break;
            }

            foreach ( $sortable_array as $k => $v ) {
                $new_array[ $k ] = $data[ $k ];
            }
        }

        return $new_array;
    }
}
