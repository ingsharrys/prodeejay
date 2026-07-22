<?php
/**
 * Report class
 *
 * This class provides methods to generate reports for vendors and marketplace-wide metrics
 *
 * @package WCVendors
 * @version 2.5.5
 * @since   2.5.5
 */
class WCV_Reports {

    /**
     * Vendor ID - if set will filter data for a specific vendor
     *
     * @var int
     */
    private $vendor_id;

    /**
     * Start date for reporting period
     *
     * @var string
     */
    private $start_date;

    /**
     * End date for reporting period
     *
     * @var string
     */
    private $end_date;


    /**
     * Cache for total commissions and revenue
     *
     * @var array
     */
    private $total_commissions_and_revenue = array();

    /**
     * Use cache
     *
     * @var bool
     */
    private $use_cache = true;

    /**
     * Constructor
     *
     * @param int  $vendor_id Optional vendor ID to filter reports for a specific vendor.
     * @param bool $use_cache Use cache.
     */
    public function __construct( $vendor_id = 0, $use_cache = true ) {
        $this->vendor_id = $vendor_id;
        $this->use_cache = $use_cache;
        // Set default date range to last 30 days.
        $this->set_period( gmdate( 'Y-m-d', strtotime( '-30 days' ) ), gmdate( 'Y-m-d' ) );
    }

    /**
     * Set reporting period.
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @return void
     */
    public function set_period( $start_date, $end_date ) {
        $this->start_date = $start_date;
        $this->end_date   = $end_date;
    }

    /**
     * Clear total commissions and revenue cache
     */
    public function clear_total_commissions_and_revenue_cache() {
        $this->total_commissions_and_revenue = array();
    }

    /**
     * Get period.
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @return array Array of start and end dates.
     */
    public function get_period( $start_date = null, $end_date = null ) {
        if ( ! $start_date ) {
            $start_date = $this->start_date;
        }
        if ( ! $end_date ) {
            $end_date = $this->end_date;
        }
        $start_date = $start_date . ' 00:00:00';
        $end_date   = $end_date . ' 23:59:59';

        return array(
            'start_date' => $start_date,
            'end_date'   => $end_date,
        );
    }

    /**
     * Get total orders in the date range.
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @return int Number of orders.
     */
    public function get_total_orders( $start_date = null, $end_date = null ) {
        $period          = $this->get_period( $start_date, $end_date );
        $is_hpos_enabled = wcv_hpos_enabled();

        global $wpdb;
        if ( $this->vendor_id ) {

            if ( $is_hpos_enabled ) {
                // HPOS query using wc_orders and wc_orders_meta tables.
                $orders_table = wc_get_container()->get( \Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore::class )->get_orders_table_name();
                $meta_table   = wc_get_container()->get( \Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore::class )->get_meta_table_name();

                $query = $wpdb->prepare(
                    'SELECT COUNT(DISTINCT o.id) 
                    FROM `' . esc_sql( $orders_table ) . '` o 
                    INNER JOIN `' . esc_sql( $meta_table ) . "` om ON o.id = om.order_id 
                    WHERE o.type = %s 
                    AND o.date_created_gmt BETWEEN %s AND %s 
                    AND o.status NOT IN ('trash', 'auto-draft')
                    AND om.meta_key = 'wcv_vendor_id' 
                    AND om.meta_value = %d",
                    WC_Order_Vendor::ORDER_TYPE,
                    $period['start_date'],
                    $period['end_date'],
                    $this->vendor_id
                );
            } else {
                // Traditional posts and postmeta tables query.
                $query = $wpdb->prepare(
                    "SELECT COUNT(DISTINCT p.ID) 
                    FROM {$wpdb->posts} p 
                    INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id 
                    WHERE p.post_type = %s 
                    AND p.post_date_gmt BETWEEN %s AND %s 
                    AND p.post_status NOT IN ('trash', 'auto-draft')
                    AND pm.meta_key = 'wcv_vendor_id' 
                    AND pm.meta_value = %d",
                    WC_Order_Vendor::ORDER_TYPE,
                    $period['start_date'],
                    $period['end_date'],
                    $this->vendor_id
                );
            }

            // Get count directly from database.
            return (int) $wpdb->get_var( $query ); // phpcs:ignore
        }
        if ( $is_hpos_enabled ) {
            // HPOS query using wc_orders and wc_orders_meta tables.
            $orders_table = wc_get_container()->get( \Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore::class )->get_orders_table_name();
            $meta_table   = wc_get_container()->get( \Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore::class )->get_meta_table_name();

            $query = $wpdb->prepare(
                'SELECT COUNT(DISTINCT o.id) as total_orders 
                FROM ' . esc_sql( $orders_table ) . " o 
                WHERE o.type = %s 
                AND o.date_created_gmt BETWEEN %s AND %s 
                AND o.status IN ('wc-processing', 'wc-completed')",
                'shop_order',
                $period['start_date'],
                $period['end_date']
            );
        } else {
            // Traditional posts table query.
            $query = $wpdb->prepare(
                "SELECT COUNT(DISTINCT p.ID) as total_orders 
                FROM {$wpdb->posts} p
                WHERE p.post_type = 'shop_order' 
                AND p.post_date_gmt BETWEEN %s AND %s 
                AND p.post_status IN ('wc-completed', 'wc-processing')",
                $period['start_date'],
                $period['end_date']
            );
        }

        // Get the count directly.
        $total_orders = (int) $wpdb->get_var( $query ); // phpcs:ignore

        return $total_orders;
    }

    /**
     * Get product totals by orders
     *
     * @param array $order_ids Array of order IDs.
     * @return array Array of product totals.
     */
    public function get_product_totals_by_orders( $order_ids ) {
        global $wpdb;

        if ( empty( $order_ids ) ) {
            return array();
        }

        // Sanitize all order IDs as integers for security.
        $order_ids = array_map( 'intval', $order_ids );

        if ( empty( $order_ids ) ) {
            return array();
        }

        $placeholders = implode( ',', array_fill( 0, count( $order_ids ), '%d' ) );

        // phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared
        // The query is safe because $order_ids_string is sanitized with intval.
        $query = "
            SELECT 
                COALESCE(NULLIF(woim_variation.meta_value, 0), woim_product.meta_value) AS product_id,
                SUM(CAST(woim_total.meta_value AS DECIMAL(10,2))) AS total
            FROM 
                {$wpdb->prefix}woocommerce_order_items AS woi
            LEFT JOIN 
                {$wpdb->prefix}woocommerce_order_itemmeta AS woim_product 
                ON woi.order_item_id = woim_product.order_item_id AND woim_product.meta_key = '_product_id'
            LEFT JOIN 
                {$wpdb->prefix}woocommerce_order_itemmeta AS woim_variation 
                ON woi.order_item_id = woim_variation.order_item_id AND woim_variation.meta_key = '_variation_id'
            LEFT JOIN 
                {$wpdb->prefix}woocommerce_order_itemmeta AS woim_total 
                ON woi.order_item_id = woim_total.order_item_id AND woim_total.meta_key = '_line_total'
            WHERE 
                woi.order_id IN ({$placeholders})
                AND woi.order_item_type = 'line_item'
            GROUP BY 
                product_id
        ";

        // phpcs:enable

        $results = $wpdb->get_results( $wpdb->prepare( $query, $order_ids ) ); // phpcs:ignore

        if ( empty( $results ) ) {
            return array();
        }

        $product_totals = array();
        foreach ( $results as $result ) {
            $product_totals[ $result->product_id ] = (float) $result->total;
        }

        return $product_totals;
    }

    /**
     * Get total commissions and revenue in the date range
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @return array Array of total commissions and revenue
     */
    public function get_total_commissions_and_revenue( $start_date = null, $end_date = null ) {
        global $wpdb;

        $period          = $this->get_period( $start_date, $end_date );
        $is_hpos_enabled = wcv_hpos_enabled();

        // Case for specific vendor.
        if ( $this->vendor_id ) {
            // Single SQL query to get commission total and associated order/product ids.
            $query = $wpdb->prepare(
                "SELECT 
                    SUM(total_due) as total_commission,
                    SUM(tax) as total_tax,
                    SUM(total_shipping) as total_shipping,
                    GROUP_CONCAT(DISTINCT product_id) as product_ids,
                    GROUP_CONCAT(DISTINCT order_id) as order_ids
                FROM {$wpdb->prefix}pv_commission
                WHERE time BETWEEN %s AND %s
                AND status != 'reversed'
                AND vendor_id = %d",
                $period['start_date'],
                $period['end_date'],
                $this->vendor_id
            );

            $result = $wpdb->get_row( $query ); // phpcs:ignore

            if ( ! $result || is_null( $result->total_commission ) ) {
                return array(
                    'commissions' => 0,
                    'revenue'     => 0,
                );
            }

            $product_ids = $result->product_ids ? explode( ',', $result->product_ids ) : array();
            $order_ids   = $result->order_ids ? explode( ',', $result->order_ids ) : array();

            if ( empty( $order_ids ) || empty( $product_ids ) ) {
                return array(
                    'commissions' => $result->total_commission ? $result->total_commission : 0,
                    'revenue'     => 0,
                );
            }

            // Create a temporary table or use a subquery for the large IN clause.
            $temp_table_name = $wpdb->prefix . 'temp_order_product_ids';

            // Drop temporary table if it exists.
            $wpdb->query( "DROP TEMPORARY TABLE IF EXISTS {$temp_table_name}" ); // phpcs:ignore

            // Create temporary table.
            // phpcs:disable WordPress.DB.DirectDatabaseQuery.SchemaChange
            $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    'CREATE TEMPORARY TABLE %i (
                order_id bigint(20),
                product_id bigint(20)
            )',
                    $temp_table_name
                )
            );
            // phpcs:enable WordPress.DB.DirectDatabaseQuery.SchemaChange

            // Insert order and product pairs into temp table.
            $insert_values = array();
            foreach ( $order_ids as $order_id ) {
                foreach ( $product_ids as $product_id ) {
                    $insert_values[] = $wpdb->prepare( '(%d, %d)', $order_id, $product_id );
                }
            }

            // Insert in efficient batches if needed.
            $batch_size     = 1000;
            $batched_values = array_chunk( $insert_values, $batch_size );

            foreach ( $batched_values as $batch ) {
                $values_sql = implode( ',', $batch );
                $wpdb->query( "INSERT INTO {$temp_table_name} (order_id, product_id) VALUES {$values_sql}" ); // phpcs:ignore
            }

            // Now use the temp table for efficient joining.
            $revenue_query = "
                SELECT SUM(woim_total.meta_value) as product_revenue
                FROM {$wpdb->prefix}woocommerce_order_items as woi
                JOIN {$temp_table_name} as t ON woi.order_id = t.order_id
                LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as woim_product 
                    ON woi.order_item_id = woim_product.order_item_id AND woim_product.meta_key = '_product_id'
                LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as woim_variation 
                    ON woi.order_item_id = woim_variation.order_item_id AND woim_variation.meta_key = '_variation_id'
                LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as woim_total 
                    ON woi.order_item_id = woim_total.order_item_id AND woim_total.meta_key = '_line_total'
                WHERE woi.order_item_type = 'line_item'
                AND (
                    woim_product.meta_value = t.product_id
                    OR (woim_variation.meta_value != 0 AND woim_variation.meta_value = t.product_id)
                )";

            $revenue_result = $wpdb->get_var( $revenue_query ); // phpcs:ignore
            $revenue_total  = $revenue_result ? floatval( $revenue_result ) : 0;

            // Add tax and shipping to revenue.
            $revenue_total += $result->total_tax + $result->total_shipping;

            // Drop temporary table.
            $wpdb->query( "DROP TEMPORARY TABLE IF EXISTS {$temp_table_name}" ); // phpcs:ignore

            return array(
                'commissions' => $result->total_commission ? $result->total_commission : 0,
                'revenue'     => $revenue_total,
            );
        }

        // Case for Marketplace.
        // Get all commission data in a single query.
        $query = $wpdb->prepare(
            "SELECT 
            SUM(c.total_due) as total_commission
            FROM {$wpdb->prefix}pv_commission c
            WHERE c.time BETWEEN %s AND %s
            AND c.status != 'reversed'",
            $period['start_date'],
            $period['end_date']
        );

        $commission_result = $wpdb->get_var( $query ); // phpcs:ignore
        $total_commission  = $commission_result ? $commission_result : 0;

        $revenue_query = '';
        // Get revenue directly from orders in one query.
        if ( $is_hpos_enabled ) {
            // HPOS version.
            $orders_table = wc_get_container()->get( \Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore::class )->get_orders_table_name();
            $meta_table   = wc_get_container()->get( \Automattic\WooCommerce\Internal\DataStores\Orders\OrdersTableDataStore::class )->get_meta_table_name();

            // Escape table names for security.
            $orders_table           = esc_sql( $orders_table );
            $meta_table             = esc_sql( $meta_table );
            $operational_data_table = esc_sql( $wpdb->prefix . 'wc_order_operational_data' );

            // Build query with properly escaped tables and prepared values.
            $query = "
                SELECT 
                COALESCE(SUM(o.total_amount), 0) AS revenue,
                COALESCE(SUM(o.tax_amount), 0) AS tax,
                COALESCE(SUM(od.shipping_total_amount), 0) AS shipping,
                COALESCE(SUM(od.shipping_tax_amount), 0) AS shipping_tax
            FROM {$orders_table} o
            LEFT JOIN {$operational_data_table} od ON o.id = od.order_id
            WHERE o.status IN ('wc-processing', 'wc-completed') 
            AND o.type = 'shop_order'
            AND o.date_created_gmt BETWEEN %s AND %s
            ";

            $revenue_query = $wpdb->prepare(
                $query, // phpcs:ignore
                $period['start_date'],
                $period['end_date']
            );
        } else {
            // Traditional tables version.
            // Escape table names for security.
            $posts_table    = esc_sql( $wpdb->posts );
            $postmeta_table = esc_sql( $wpdb->postmeta );

            // Build query with properly escaped tables and prepared values.
            $query = "
                SELECT 
                    COALESCE(SUM(pm_total.meta_value), 0) AS revenue,
                    COALESCE(SUM(pm_tax.meta_value), 0) AS tax,
                    COALESCE(SUM(pm_shipping.meta_value), 0) AS shipping,
                    COALESCE(SUM(pm_shipping_tax.meta_value), 0) AS shipping_tax
                FROM {$posts_table} p
                LEFT JOIN {$postmeta_table} pm_total ON p.ID = pm_total.post_id AND pm_total.meta_key = '_order_total'
                LEFT JOIN {$postmeta_table} pm_tax ON p.ID = pm_tax.post_id AND pm_tax.meta_key = '_order_tax'
                LEFT JOIN {$postmeta_table} pm_shipping ON p.ID = pm_shipping.post_id AND pm_shipping.meta_key = '_order_shipping'
                LEFT JOIN {$postmeta_table} pm_shipping_tax ON p.ID = pm_shipping_tax.post_id AND pm_shipping_tax.meta_key = '_order_shipping_tax'
                WHERE p.post_type = 'shop_order'
                AND p.post_status IN ('wc-completed', 'wc-processing')
                AND p.post_date_gmt BETWEEN %s AND %s
            ";

            $revenue_query = $wpdb->prepare(
                $query, // phpcs:ignore
                $period['start_date'],
                $period['end_date']
            );
        }

        $manage_woocommerce_user_ids = get_users(
            array(
                'capability' => 'manage_woocommerce',
                'fields'     => 'ID',
            )
        );

        $admin_product_total_query = $wpdb->prepare(
            "SELECT SUM(product_net_revenue) as total_revenue
            FROM {$wpdb->prefix}wc_order_product_lookup
            WHERE date_created BETWEEN %s AND %s
            AND product_id IN (SELECT ID FROM {$wpdb->posts} WHERE post_type IN ('product', 'product_variation') AND post_author IN (" . implode( ',', $manage_woocommerce_user_ids ) . '))', // phpcs:ignore
            $period['start_date'],
            $period['end_date']
        );

        $admin_product_total_result = $wpdb->get_row( $admin_product_total_query ); // phpcs:ignore
        $admin_product_total        = $admin_product_total_result ? floatval( $admin_product_total_result->total_revenue ) : 0;

        $revenue_result = $wpdb->get_row( $revenue_query ); // phpcs:ignore

        $total_revenue  = $revenue_result ? floatval( $revenue_result->revenue ) : 0;
        $total_tax      = $revenue_result ? floatval( $revenue_result->tax ) : 0;
        $total_shipping = $revenue_result ? floatval( $revenue_result->shipping ) : 0;
        $shipping_tax   = $revenue_result ? floatval( $revenue_result->shipping_tax ) : 0;

        return array(
            'commissions' => $total_revenue - ( $total_tax + $total_shipping + $shipping_tax ) - $total_commission - $admin_product_total,
            'revenue'     => $total_revenue,
        );
    }



    /**
     * Get total commissions in the date range
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @return float Total commissions
     */
    public function get_total_commissions( $start_date = null, $end_date = null ) {
        $period = $this->get_period( $start_date, $end_date );

        if ( empty( $this->total_commissions_and_revenue ) ) {
            $this->total_commissions_and_revenue = $this->get_total_commissions_and_revenue( $period['start_date'], $period['end_date'] );
        }

        return $this->total_commissions_and_revenue['commissions'];
    }

    /**
     * Get total revenue in the date range
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @return float Total revenue
     */
    public function get_total_revenue( $start_date = null, $end_date = null ) {
        $period = $this->get_period( $start_date, $end_date );

        if ( empty( $this->total_commissions_and_revenue ) ) {
            $this->total_commissions_and_revenue = $this->get_total_commissions_and_revenue( $period['start_date'], $period['end_date'] );
        }

        return $this->total_commissions_and_revenue['revenue'];
    }

    /**
     * Get top vendors in the date range.
     *
     * @param string $start_date Start date in Y-m-d format.
     * @param string $end_date End date in Y-m-d format.
     * @param int    $limit Number of vendors to return.
     * @return array Array of vendor data.
     */
    public function get_top_vendors( $start_date = null, $end_date = null, $limit = 10 ) {
        global $wpdb;

        $period = $this->get_period( $start_date, $end_date );

        // Optimize SQL query to get aggregated data at database level.
        $query              = $wpdb->prepare(
            "SELECT 
                c.vendor_id,
                COUNT(DISTINCT c.order_id) as total_orders,
                SUM(c.total_due) as total_commission,
                SUM(c.tax) as total_tax,
                SUM(c.total_shipping) as total_shipping,
                GROUP_CONCAT(DISTINCT c.product_id) as product_ids,
                GROUP_CONCAT(DISTINCT c.order_id) as order_ids
            FROM {$wpdb->prefix}pv_commission c
            WHERE c.time BETWEEN %s AND %s
            AND c.status != 'reversed'
            GROUP BY c.vendor_id
            ORDER BY total_commission DESC
            LIMIT %d",
            $period['start_date'],
            $period['end_date'],
            $limit
        );
        $commission_results = $wpdb->get_results( $query ); // phpcs:ignore

        if ( empty( $commission_results ) ) {
            return array();
        }

        $vendor_ids = wp_list_pluck( $commission_results, 'vendor_id' );

        $order_ids = array_reduce(
            $commission_results,
            function ( $carry, $item ) {
                return array_merge( $carry, explode( ',', $item->order_ids ) );
            },
            array()
        );

        $order_ids = array_unique( $order_ids );

        $product_totals = $this->get_product_totals_by_orders( $order_ids );

        $is_rating_active = is_wcv_pro_active() && ! wc_string_to_bool( get_option( 'wcvendors_ratings_management_cap', 'no' ) );

        // Batch fetch user meta.
        $shop_names = array();
        if ( ! empty( $vendor_ids ) ) {
            // Sanitize vendor IDs to ensure they are integers.
            $vendor_ids = array_map( 'absint', $vendor_ids );
            $vendor_ids = array_filter( $vendor_ids );

            if ( ! empty( $vendor_ids ) ) {
                $placeholders = implode( ',', array_fill( 0, count( $vendor_ids ), '%d' ) );
                $query        = $wpdb->prepare(
                    "SELECT user_id, meta_value FROM {$wpdb->usermeta} 
                    WHERE meta_key = 'pv_shop_name' 
                    AND user_id IN ($placeholders)", // phpcs:ignore
                    ...$vendor_ids
                );
                $shop_names   = $wpdb->get_results( $query, OBJECT_K ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
            }
        }
        foreach ( $commission_results as $commission ) {
            // Initialize total_revenue.
            $commission->total_revenue = 0;

            $product_ids = explode( ',', $commission->product_ids );
            foreach ( $product_ids as $product_id ) {
                if ( isset( $product_totals[ $product_id ] ) ) {
                    $commission->total_revenue += $product_totals[ $product_id ];
                }
            }

            $commission->total_revenue += $commission->total_tax + $commission->total_shipping;

            if ( $is_rating_active ) {
                $commission->rating = $this->get_vendor_rating( $commission->vendor_id );
            }

            $commission->avatar           = get_avatar_url( $commission->vendor_id );
            $commission->shop_name        = $shop_names[ $commission->vendor_id ]->meta_value ?? '';
            $commission->total_commission = floatval( $commission->total_commission );
            $commission->total_revenue    = floatval( $commission->total_revenue );
            unset( $commission->product_ids );
            unset( $commission->order_ids );
        }

        return $commission_results;
    }

    /**
     * Get pending vendor applications.
     *
     * @return array Array of pending vendors.
     */
    public function get_pending_approval() {
        // This only makes sense for the marketplace admin, not for individual vendors.
        if ( $this->vendor_id ) {
            return array();
        }

        $role = get_role( 'pending_vendor' );

        if ( ! $role ) {
            return array();
        }

        $args = array(
            'role'    => 'pending_vendor',
            'orderby' => 'registered',
            'order'   => 'ASC',
            'fields'  => array( 'ID', 'user_login', 'display_name', 'user_email', 'user_registered' ),
        );

        $users = get_users( $args );

        if ( empty( $users ) ) {
            return array();
        }

        $pending_vendors = array();

        foreach ( $users as $user ) {
            $pending_vendors[] = array(
                'id'           => $user->ID,
                'username'     => $user->user_login,
                'display_name' => $user->display_name,
                'email'        => $user->user_email,
                'registered'   => $user->user_registered,
                'avatar'       => get_avatar_url( $user->ID ),
            );
        }

        return $pending_vendors;
    }

    /**
     * Get vendor ratings
     *
     * @param int $vendor_id Vendor ID.
     * @return float Vendor rating.
     */
    public function get_vendor_rating( $vendor_id ) {
        if ( class_exists( 'WCVendors_Pro_Ratings_Controller' ) ) {
            $rating = WCVendors_Pro_Ratings_Controller::get_ratings_average( $vendor_id );
            return $rating;
        }

        return 0;
    }
}
