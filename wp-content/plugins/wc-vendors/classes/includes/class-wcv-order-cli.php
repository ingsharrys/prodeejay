<?php
/**
 * Class to define the WP-CLI command for deleting duplicate sub-orders.
 *
 * @version 2.5.2
 * @since  2.5.2 - Added the CLI
 */
class WCV_Order_CLI {

    const SCHUDULE_HOOK = 'wcv_delete_duplicate_sub_orders';

    /**
     * WCV_Order_CLI constructor.
     */
    public function __construct() {

        if ( ! class_exists( 'ActionScheduler' ) ) {
            return;
        }

        $this->init();
    }

    /**
     * Initialize the class.
     */
    private function init() {
        if ( defined( 'WP_CLI' ) && WP_CLI ) {
            WP_CLI::add_command(
                'wcv clean-duplicate-suborders',
                array( $this, 'cli_schedule_event' ),
                array(
                    'shortdesc'     => 'Deletes duplicate sub-orders.',
                    'before_invoke' => function () {
                        if ( ! class_exists( 'WC_Vendors' ) ) {
                            WP_CLI::error( 'WC Vendors Marketplace should be installed and activated' );
                        }
                    },
                    'synopsis'      => array(
                        array(
                            'type'        => 'flag',
                            'name'        => 'force',
                            'description' => 'Force the process to start from scratch.',
                            'optional'    => true,
                        ),
                        array(
                            'type'        => 'assoc',
                            'name'        => 'batch_size',
                            'description' => 'Batch size.',
                            'optional'    => true,
                        ),
                        array(
                            'type'        => 'assoc',
                            'name'        => 'offset',
                            'description' => 'The offset to start from.',
                            'optional'    => true,
                        ),
                    ),
                )
            );
        }
        add_action( self::SCHUDULE_HOOK, array( $this, 'delete_duplicate_orders' ), 10, 2 );
    }

    /**
     * Deletes duplicate sub-orders.
     *
     * ## OPTIONS
     * [--force]
     * [--batch_size=<batch_size>]
     * : Force the process to start from scratch.
     * default: false
     *
     * [--offset=<offset>]
     * : The offset to start from.
     * default: 0
     *
     *
     * ## EXAMPLES
     *
     *     wp wcv delete_duplicate_sub_orders
     *     wp wcv delete_duplicate_sub_orders --force
     *     wp wcv delete_duplicate_sub_orders --batch_size=2000
     *     wp wcv delete_duplicate_sub_orders --offset=1000
     *     wp wcv delete_duplicate_sub_orders --force --batch_size=2000 --offset=1000
     *
     * @when after_wp_load
     *
     * @param array $args The arguments to be passed to the command.
     * @param array $assoc_args The named arguments to be passed to the command.
     */
    public function cli_schedule_event( $args, $assoc_args ) {
        WP_CLI::confirm(
            'Are you sure you want to delete duplicate sub-orders? You should backup your database first. Continute?',
            $assoc_args
        );

        $batch_size = (int) WP_CLI\Utils\get_flag_value( $assoc_args, 'batch_size', 1000 );
        $offset     = WP_CLI\Utils\get_flag_value( $assoc_args, 'offset', 0 );
        $force      = WP_CLI\Utils\get_flag_value( $assoc_args, 'force', false );

        if ( $force ) {
            $this->clear_scheduled_events();
        }

        if ( ! as_next_scheduled_action( self::SCHUDULE_HOOK ) || $force ) {
            as_schedule_single_action( time(), self::SCHUDULE_HOOK, array( $batch_size, $offset ) );
            WP_CLI::success( "Scheduled event to delete duplicate orders with batch size: $batch_size and offset: $offset." );

        } else {
            WP_CLI::warning( 'Event already scheduled. Use --force to reschedule or wp cron event delete ' . self::SCHUDULE_HOOK . ' to remove existing schedule.' );
        }
    }

    /**
     * Schedule via WC tool section.
     */
    public static function schedule_via_wc_tool_section() {
        $batch_size = 1000;
        $offset     = get_transient( 'wcv_delete_duplicate_sub_orders_offset' );

        if ( ! $offset ) {
            $offset = 0;
        }

        if ( ! as_next_scheduled_action( self::SCHUDULE_HOOK ) ) {
            as_schedule_single_action( time(), self::SCHUDULE_HOOK, array( $batch_size, $offset ) );
        }
    }

    /**
     * Clear scheduled events.
     */
    private function clear_scheduled_events() {
        $timestamp = as_next_scheduled_action( self::SCHUDULE_HOOK );
        if ( ! $timestamp ) {
            return;
        }

        as_unschedule_all_actions( self::SCHUDULE_HOOK );
    }

    /**
     * Get duplicate sub orders.
     *
     * @param int $batch_size Batch size.
     * @param int $offset Offset.
     */
    public function delete_duplicate_orders( $batch_size = 1000, $offset = 0 ) {
        $orders           = $this->get_duplicate_orders( $batch_size, $offset );
        $duplicate_orders = $orders['duplicate_orders'];
        $result           = $this->delete_orders( $duplicate_orders );

        if ( $result ) {
            $this->log( "Deleted {count($duplicate_orders)} duplicate orders (batch size: $batch_size, offset: $offset)." );
        } else {
            $this->log( 'No duplicate orders found on this batch.' );
        }

        // If there are more duplicates, schedule another run with updated offset.
        $offset += $batch_size;
        $check   = $this->get_duplicate_orders( 1, $offset );

        if ( count( $check['orders'] ) > 0 ) {
            $this->clear_scheduled_events();
            as_schedule_single_action( time() + 5, self::SCHUDULE_HOOK, array( $batch_size, $offset ) );
            $this->log( "Scheduled another run to process remaining duplicates (next offset: $offset)." );
            set_transient( 'wcv_delete_duplicate_sub_orders_offset', $offset );
        } else {
            $this->log( 'All duplicate orders have been deleted.' );
            delete_transient( 'wcv_delete_duplicate_sub_orders_offset' );
        }
    }

    /**
     * Delete orders.
     *
     * @param array $order_ids Order IDs.
     */
    private function delete_orders( $order_ids ) {
        global $wpdb;
        $post_table            = $wpdb->posts;
        $wc_orders_table       = $wpdb->prefix . 'wc_orders';
        $post_met_table        = $wpdb->postmeta;
        $order_meta_table      = $wpdb->prefix . 'wc_order_meta';
        $order_items_table     = $wpdb->prefix . 'woocommerce_order_items';
        $order_itemmeta_table  = $wpdb->prefix . 'woocommerce_order_itemmeta';
        $order_ids_placeholder = implode( ',', array_fill( 0, count( $order_ids ), '%d' ) );
        $wpdb->query( 'START TRANSACTION' ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $is_error = false;

        try {
            // phpcs:disable  
            // delete item meta.
            $wpdb->query( $wpdb->prepare( "DELETE FROM $order_itemmeta_table WHERE order_item_id IN ( SELECT order_item_id FROM $order_items_table WHERE order_id IN ( $order_ids_placeholder ) )", $order_ids ) );
            // delete items.
            $wpdb->query( $wpdb->prepare( "DELETE FROM $order_items_table WHERE order_id IN ( $order_ids_placeholder )", $order_ids ) );

            // delete order meta and post meta.
            $wpdb->query( $wpdb->prepare( "DELETE FROM $order_meta_table WHERE order_id IN ( $order_ids_placeholder )", $order_ids ) );
            $wpdb->query( $wpdb->prepare( "DELETE FROM $post_met_table WHERE post_id IN ( $order_ids_placeholder )", $order_ids ) );

            // delete orders.
            $wpdb->query( $wpdb->prepare( "DELETE FROM $post_table WHERE ID IN ( $order_ids_placeholder )", $order_ids ) );
            $wpdb->query( $wpdb->prepare( "DELETE FROM $wc_orders_table WHERE id IN ( $order_ids_placeholder )", $order_ids ) );

            $wpdb->query( 'COMMIT' );
            //phpcs:enable
        } catch ( Exception $e ) {
            $this->log( 'Error deleting orders: ' . $e->getMessage() );
            $wpdb->query( 'ROLLBACK' ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $is_error = true;
        }

        return $is_error;
    }

    /**
     * Get duplicate orders.
     *
     * @param int $batch_size Batch size.
     * @param int $offset Offset.
     */
    private function get_duplicate_orders( $batch_size, $offset ) {
        global $wpdb;
        $duplicate_orders = array();
        $orders           = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT post_id, meta_value AS sub_orders
                FROM $wpdb->postmeta
                WHERE meta_key = 'wcv_sub_orders'
                ORDER BY post_id DESC
                LIMIT %d OFFSET %d",
                $batch_size,
                $offset
            )
        );

        foreach ( $orders as $order ) {

            $real_sub_order_ids = $wpdb->get_col( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    "SELECT ID FROM $wpdb->posts WHERE post_parent = %d AND post_type = 'shop_order_vendor'",
                    $order->post_id
                )
            );

            $sub_orders = maybe_unserialize( $order->sub_orders );
            $diff       = array_diff( $real_sub_order_ids, $sub_orders );

            if ( ! empty( $diff ) ) {
                $duplicate_orders = array_merge( $duplicate_orders, $diff );
            }
        }

        $no_parent_sub_orders = $this->get_no_parent_sub_orders( $batch_size, $offset );

        $duplicate_orders = array_merge( $duplicate_orders, $no_parent_sub_orders );
        $orders           = array_merge( $orders, $no_parent_sub_orders );

        return array(
            'duplicate_orders' => $duplicate_orders,
            'orders'           => $orders,
        );
    }

    /**
     * Get no parent sub orders.
     *
     * @param int $batch_size Batch size.
     * @param int $offset Offset.
     */
    private function get_no_parent_sub_orders( $batch_size, $offset ) {
        global $wpdb;
        $no_parent_sub_orders = array();
        $results              = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT ID FROM $wpdb->posts WHERE post_parent = 0 AND post_type = 'shop_order_vendor' ORDER BY ID DESC LIMIT %d OFFSET %d",
                $batch_size,
                $offset
            )
        );

        foreach ( $results as $result ) {
            $order_id               = $result->ID;
            $no_parent_sub_orders[] = $order_id;
        }

        return $no_parent_sub_orders;
    }

    /**
     * Log message.
     *
     * @param string $message Message.
     */
    private function log( $message ) {
        $logger = wc_get_logger();

        if ( $logger ) {
            $logger->info( $message, array( 'source' => 'wcv_delete_duplicate_sub_orders' ) );
        }
    }
}

new WCV_Order_CLI();
