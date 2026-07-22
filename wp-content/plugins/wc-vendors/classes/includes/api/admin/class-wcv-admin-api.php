<?php
/**
 * Class Admin API for WC Vendors.
 */
class WCV_Admin_API extends WCV_API {

    /**
     * Enable rate limiting for the API.
     *
     * @var bool $enable_rate_limiting Enable rate limiting.
     */
    protected $enable_rate_limiting = false;

    /**
     * Register routes.
     */
    public function register_routes() {
        $this->register_route(
            '/vendors/settings/(?P<id>\d+)',
            'get_settings',
            WP_REST_Server::READABLE
        );
        $this->register_route(
            '/vendors/settings/(?P<id>\d+)',
            'save_settings',
            WP_REST_Server::EDITABLE
        );

        $this->register_route(
            '/vendors',
            'get_vendors',
            WP_REST_Server::READABLE,
            array(
                'page'   => array(
                    'description'       => __( 'Current page of the collection', 'wc-vendors' ),
                    'type'              => 'integer',
                    'default'           => 1,
                    'sanitize_callback' => 'absint',
                ),
                'limit'  => array(
                    'description'       => __( 'Maximum number of items to be returned in result set.', 'wc-vendors' ),
                    'type'              => 'integer',
                    'default'           => 10,
                    'sanitize_callback' => 'absint',
                ),
                'search' => array(
                    'description'       => __( 'Limit results to those matching a string.', 'wc-vendors' ),
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'status' => array(
                    'description'       => __( 'Limit result set to vendors assigned a specific status.', 'wc-vendors' ),
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            )
        );

        $this->register_route(
            '/vendors/action/(?P<id>\d+)/(?P<action>\w+)',
            'do_vendor_action',
            WP_REST_Server::EDITABLE
        );

        $this->register_route(
            '/vendors/details/(?P<id>\d+)',
            'get_vendor_details',
            WP_REST_Server::READABLE
        );

        $this->register_route(
            '/products',
            'get_products',
            WP_REST_Server::READABLE,
            array(
                'status'    => array(
                    'description'       => __( 'Product status (published, pending, or all).', 'wc-vendors' ),
                    'type'              => 'string',
                    'default'           => 'all',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'search'    => array(
                    'description'       => __( 'Search products by name.', 'wc-vendors' ),
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'vendor_id' => array(
                    'description'       => __( 'Filter by vendor ID.', 'wc-vendors' ),
                    'type'              => 'integer',
                    'sanitize_callback' => 'absint',
                ),
                'page'      => array(
                    'description'       => __( 'Page number for pagination.', 'wc-vendors' ),
                    'type'              => 'integer',
                    'default'           => 1,
                    'sanitize_callback' => 'absint',
                ),
                'per_page'  => array(
                    'description'       => __( 'Number of items per page.', 'wc-vendors' ),
                    'type'              => 'integer',
                    'default'           => 10,
                    'sanitize_callback' => 'absint',
                ),
            )
        );

        $this->register_route(
            '/products/(?P<id>\d+)/approve',
            'approve_product',
            WP_REST_Server::EDITABLE
        );

        $this->register_route(
            '/products/(?P<id>\d+)/request-change',
            'request_product_change',
            WP_REST_Server::EDITABLE
        );

        $this->register_route(
            '/products/(?P<id>\d+)/unpublish',
            'unpublish_product',
            WP_REST_Server::EDITABLE
        );

        $this->register_route(
            '/products/vendors',
            'get_vendors_list',
            WP_REST_Server::READABLE
        );
    }

    /**
     * Get settings.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function get_settings( $request ) {
        $vendor_id = (int) $request->get_param( 'id' );

        if ( ! $vendor_id ) {
            return new WP_REST_Response(
                array(
                    'error'   => 'no_vendor_id',
                    'success' => false,
                    'message' => __( 'No vendor ID provided.', 'wc-vendors' ),
                ),
                200
            );
        }

        $is_user = get_userdata( $vendor_id );

        if ( ! $is_user || ( ! WCV_Vendors::is_vendor( $vendor_id ) && ! WCV_Vendors::is_pending( $vendor_id ) ) ) {
            return new WP_REST_Response(
                array(
                    'error'   => 'not_vendor',
                    'success' => false,
                    'message' => __( 'Not a vendor.', 'wc-vendors' ),
                ),
                200
            );
        }

        $vendor = new Vendors_Settings( $vendor_id );
        if ( $vendor->get_prop( 'vendor_status' ) === 'inactive' ) {
            return new WP_REST_Response(
                array(
                    'error'   => 'vendor_inactive',
                    'success' => false,
                    'message' => __( 'You can\'t edit inactive vendor.', 'wc-vendors' ),
                ),
                200
            );
        }
        $vendor_settings = $vendor->get_settings();
        $vendor_settings = apply_filters( 'wcvendors_vendor_settings_api_response', $vendor_settings, $vendor_id );
        $response        = new WP_REST_Response( $vendor_settings, 200 );
        return $response;
    }

    /**
     * Save settings.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @version 2.6.6 -  Prevent saving settings for empty shop name.
     * @return WP_Error|WP_REST_Response
     */
    public function save_settings( $request ) {

        $changes = $request->get_param( 'changes' );

        $vendor_id     = (int) $request->get_param( 'id' );
        $vendor_status = get_user_meta( $vendor_id, '_wcv_vendor_status', true );
        $is_user       = get_userdata( $vendor_id );

        $response_result = array(
            'success' => false,
            'message' => __( 'Something went wrong.', 'wc-vendors' ),
        );

        if ( ! $is_user || ! $vendor_id || 'inactive' === $vendor_status || ( ! WCV_Vendors::is_vendor( $vendor_id ) && ! WCV_Vendors::is_pending( $vendor_id ) ) ) {
            return new WP_REST_Response( $response_result, 200 );
        }

        $vendor_settings = new Vendors_Settings( $vendor_id );

        foreach ( $changes as $key => $value ) {
            $vendor_settings->{$key} = $value;
        }

        $result = $vendor_settings->save();

        if ( ! is_wp_error( $result ) ) {
            $response_result = array(
                'success' => true,
                'message' => __( 'Settings saved.', 'wc-vendors' ),
            );
        } else {
            $response_result = array(
                'success' => false,
                'message' => $result->get_error_message(),
            );
        }
        return new WP_REST_Response( $response_result, 200 );
    }

    /**
     * Check permissions for the API.
     *
     * @return bool
     */
    public function get_api_permissions_check() {
        return current_user_can( 'manage_woocommerce' );
    }

    /**
     * Get vendor count for all statuses.
     *
     * @return array Counts of vendors for all statuses.
     */
    private function _get_vendor_count_for_all_status() {
        global $wpdb;

        $count_user_sql = "SELECT
            COUNT( CASE WHEN umt1.meta_value = 'active' AND ( umt2.meta_key = '{$wpdb->prefix}capabilities' AND umt2.meta_value LIKE '%\"vendor\"%') THEN 1 END ) AS active,
            COUNT( CASE WHEN umt1.meta_value = 'inactive' AND ( umt2.meta_key = '{$wpdb->prefix}capabilities' AND (umt2.meta_value NOT LIKE '%\"pending_vendor\"%' AND umt2.meta_value LIKE '%\"vendor\"%' )) THEN 1 END ) AS inactive,
            COUNT( CASE WHEN umt2.meta_key = '{$wpdb->prefix}capabilities' AND umt2.meta_value LIKE '%\"vendor\"%' THEN 1 END ) AS vendor,
            COUNT( CASE WHEN umt2.meta_key = '{$wpdb->prefix}capabilities' AND umt2.meta_value LIKE '%\"pending_vendor\"%' THEN 1 END ) AS pending
            FROM {$wpdb->usermeta} AS umt1
            INNER JOIN {$wpdb->usermeta} as umt2 ON umt1.user_id = umt2.user_id
            WHERE umt1.meta_key = '_wcv_vendor_status' AND umt2.meta_key = '{$wpdb->prefix}capabilities'
        ";

        return array_map( 'intval', (array) $wpdb->get_row( $count_user_sql ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
    }

    /**
     * Custom query to search customers.
     *
     * @param array $params Array of parameters.
     *
     * @return array $results Tuple of results and total results.
     */
    private function _query_vendor_ids( $params ) {
        global $wpdb;

        $params = wp_parse_args(
            $params,
            array(
                'search' => '',
                'status' => 'active',
                'limit'  => 10,
                'page'   => 1,
            ),
        );

        extract( $params ); // phpcs:ignore

        $offset = ( $page - 1 ) * $limit;

        $inner_joins  = "INNER JOIN {$wpdb->usermeta} AS ucap ON (u.ID = ucap.user_id AND ucap.meta_key = '{$wpdb->prefix}capabilities') ";
        $concat_query = '';
        $where_query  = "AND ucap.meta_value LIKE '%\"vendor\"%' ";
        $having_query = '';

        // build the query based on the search parameter.
        if ( $search ) {
            $search = sanitize_text_field( wp_unslash( $search ) );
            $search = stripslashes( $search );
            // Escape the search term for use in LIKE queries.
            $escaped_search = '%' . $wpdb->esc_like( $search ) . '%';

            $concat_query = ", u.user_login, u.user_nicename, u.user_email,
                GROUP_CONCAT( IF(um.meta_key IN ('billing_first_name', 'billing_last_name', 'billing_company', 'billing_address_1', 'billing_address_2', 'billing_city', 'billing_state', 'billing_postcode', 'billing_country', 'billing_email', 'billing_phone', 'nickname', 'first_name', 'last_name', 'pv_shop_name'), um.meta_key, null) ORDER BY um.meta_key DESC SEPARATOR ' ' ) AS meta_keys,
                GROUP_CONCAT( IF(um.meta_key IN ('billing_first_name', 'billing_last_name', 'billing_company', 'billing_address_1', 'billing_address_2', 'billing_city', 'billing_state', 'billing_postcode', 'billing_country', 'billing_email', 'billing_phone', 'nickname', 'first_name', 'last_name', 'pv_shop_name'), IFNULL(um.meta_value, ''), null) ORDER BY um.meta_key DESC SEPARATOR ' ' ) AS meta_values
            ";
            $inner_joins .= "INNER JOIN {$wpdb->usermeta} um ON (u.ID = um.user_id)";
            $having_query = $wpdb->prepare(
                'HAVING (CAST(u.ID AS CHAR) LIKE %s OR meta_values LIKE %s OR u.user_login LIKE %s OR u.user_nicename LIKE %s OR u.user_email LIKE %s)',
                $escaped_search,
                $escaped_search,
                $escaped_search,
                $escaped_search,
                $escaped_search
            );
        }

        // build the query based on the status parameter.
        if ( $status ) {
            $inner_joins .= "INNER JOIN {$wpdb->usermeta} AS vstatus ON (u.ID = vstatus.user_id AND vstatus.meta_key = '_wcv_vendor_status')";

            if ( 'pending' === $status ) {
                $where_query = "AND ucap.meta_value LIKE '%\"pending_vendor\"%'";
            } else {
                $where_query .= "AND vstatus.meta_value = '{$status}' AND ucap.meta_value NOT LIKE '%\"pending_vendor\"%' ";
            }
        }

        // phpcs:disable
        $results = $wpdb->get_col( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            "SELECT SQL_CALC_FOUND_ROWS DISTINCT u.ID
            {$concat_query}
            FROM {$wpdb->users} AS u
            {$inner_joins}
            WHERE 1
            {$where_query}
            GROUP BY u.ID
            {$having_query}
            LIMIT {$limit} OFFSET {$offset}"
        );
        // phpcs:enable

        return array(
            array_map( 'absint', $results ), // SQL query results.
            (int) $wpdb->get_var( 'SELECT FOUND_ROWS()' ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        );
    }

    /**
     * Get vendors.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get_vendors( $request ) {
        global $wpdb;

        // Get vendor counts.
        $vendor_count = $this->_get_vendor_count_for_all_status();

        // TODO: sanitize parameter values.
        $params = $request->get_params();

        // Query the vendor IDs based on the provided parameters.
        list( $vendor_ids, $result_count ) = $this->_query_vendor_ids( $params );

        // Return an empty data response when there are no vendors found.
        if ( empty( $vendor_ids ) ) {
            $response = new WP_REST_Response(
                array(
                    'vendors'      => array(),
                    'vendor_count' => $vendor_count,
                    'result_count' => (int) $result_count,
                ),
                200
            );
            return $response;
        }

        $vendors = array();
        foreach ( $vendor_ids as $vendor_id ) {
            $vendor = new Vendors_Settings( $vendor_id );

            if ( ! $vendor->is_valid() ) {
                continue;
            }

            $date_time_format = get_option( 'date_format' ) . ' ' . get_option( 'time_format' );
            $vendors[]        = array(
                'id'              => $vendor_id,
                'displayname'     => $vendor->display_name,
                'shopname'        => $vendor->shop_name,
                'commission_due'  => $vendor->get_commission_due(),
                'commission_rate' => $vendor->get_commission_rates(),
                'status'          => $vendor->get_vendor_status(),
                'registered_date' => wp_date( $date_time_format, strtotime( $vendor->registered ) ),
                'shop_link'       => WCV_Vendors::get_vendor_shop_page( $vendor_id ),
            );
        }

        $response = new WP_REST_Response(
            array(
                'vendors'      => $vendors,
                'vendor_count' => $vendor_count,
                'result_count' => (int) $result_count,
            ),
            200
        );
        return $response;
    }

    /**
     * Do vendor action.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function do_vendor_action( $request ) {
        $vendor_id      = (int) $request->get_param( 'id' );
        $action         = $request->get_param( 'action' );
        $custom_message = $request->get_json_params()['customMessage'] ?? '';
        $use_custom_msg = $request->get_json_params()['useCustomMessage'] ?? false;

        $custom_message = sanitize_textarea_field( wp_unslash( $custom_message ) );

        if ( ! $vendor_id ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'No vendor ID provided.', 'wc-vendors' ),
                ),
                200
            );
        }

        $is_user = get_userdata( $vendor_id );
        if ( ( ! WCV_Vendors::is_vendor( $vendor_id ) && ! WCV_Vendors::is_pending( $vendor_id ) ) || ! $is_user ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Not a vendor.', 'wc-vendors' ),
                ),
                200
            );
        }

        switch ( $action ) {
            case 'activate':
                $result = $this->set_vendor_active( $vendor_id );
                break;
            case 'deactivate':
                $result = $this->set_vendor_inactive( $vendor_id );
                break;
            case 'approve':
                $result = $this->approve_vendor( $vendor_id, $custom_message, $use_custom_msg );
                break;
            case 'deny':
                $result = $this->deny_vendor( $vendor_id, $custom_message, $use_custom_msg );
                break;
            default:
                $result = array(
                    'success' => false,
                    'message' => __( 'Invalid action.', 'wc-vendors' ),
                );
                break;
        }

        return $result;
    }

    /**
     * Action inactive vendor
     *
     * @param int $vendor_id Vendor ID.
     */
    public function set_vendor_inactive( $vendor_id ) {

        $vendor = new Vendors_Settings( $vendor_id, true );
        $status = $vendor->get_prop( 'vendor_status' );
        if ( 'inactive' === $status ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Vendor is already inactive.', 'wc-vendors' ),
                ),
                200
            );
        }
        $vendor->set_prop( 'vendor_status', 'inactive' );
        $result = $vendor->save();

        if ( ! is_wp_error( $result ) ) {
            do_action( 'wcvendors_set_vendor_inactive', $vendor_id );
            return new WP_REST_Response(
                array(
                    'success' => true,
                    'message' => __( 'Vendor has been deactivated.', 'wc-vendors' ),
                ),
                200
            );
        } else {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => $result->get_error_message(),
                ),
                200
            );
        }
    }

    /**
     * Action active vendor
     *
     * @param int $vendor_id Vendor ID.
     */
    public function set_vendor_active( $vendor_id ) {

        $vendor = new Vendors_Settings( $vendor_id, true );
        $status = $vendor->get_prop( 'vendor_status' );
        if ( 'active' === $status ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Vendor is already active.', 'wc-vendors' ),
                ),
                200
            );
        }
        $vendor->set_prop( 'vendor_status', 'active' );
        $result = $vendor->save();
        if ( ! is_wp_error( $result ) ) {
            do_action( 'wcvendors_set_vendor_active', $vendor_id );
            return new WP_REST_Response(
                array(
                    'success' => true,
                    'message' => __( 'Vendor has been activated.', 'wc-vendors' ),
                ),
                200
            );
        } else {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'An error occurred while activating the vendor.', 'wc-vendors' ),
                ),
                200
            );
        }
    }

    /**
     * Approve vendor.
     *
     * @param int    $vendor_id         Vendor ID.
     * @param string $custom_message    Custom message for the approval email.
     * @param bool   $use_custom_msg    Whether to use the custom message.
     *
     * @version 2.6.4 - Added custom message and use custom message parameters.
     * @return WP_REST_Response
     */
    public function approve_vendor( $vendor_id, $custom_message = '', $use_custom_msg = false ) {
        $vendor = new WP_User( $vendor_id );
        $roles  = $vendor->roles;
        if ( ! in_array( 'pending_vendor', $roles, true ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Vendor cannot be approved. Please make sure the vendor is pending.', 'wc-vendors' ),
                ),
                200
            );
        }

        $vendor->remove_role( 'pending_vendor' );
        wcv_set_primary_vendor_role( $vendor_id, 'vendor', $use_custom_msg, $custom_message );
        update_user_meta( $vendor_id, '_wcv_vendor_status', 'active' );

        do_action( 'wcvendors_approve_vendor', $vendor );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => __( 'Vendor approved.', 'wc-vendors' ),
            ),
            200
        );
    }

    /**
     * Deny vendor.
     *
     * @param int    $vendor_id         Vendor ID.
     * @param string $custom_message    Custom message for the denial email.
     * @param bool   $use_custom_msg    Whether to use the custom message.
     *
     * @version 2.6.4 - Added custom message and use custom message parameters.
     * @return WP_REST_Response
     */
    public function deny_vendor( $vendor_id, $custom_message = '', $use_custom_msg = false ) {

        $role   = apply_filters( 'wcvendors_denied_vendor_role', get_option( 'default_role', 'subscriber' ) );
        $vendor = new WP_User( $vendor_id );
        $roles  = $vendor->roles;
        if ( ! in_array( 'pending_vendor', $roles, true ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Vendor cannot be denied. Please make sure the vendor is pending.', 'wc-vendors' ),
                ),
                200
            );
        }
        $vendor->remove_role( 'pending_vendor' );

        if ( empty( $vendor->roles ) ) {
            $vendor->add_role( $role );
        }
        delete_user_meta( $vendor_id, '_wcv_vendor_status' );

        do_action( 'wcvendors_deny_vendor', $vendor, $use_custom_msg, $custom_message );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => __( 'Vendor denied.', 'wc-vendors' ),
            ),
            200
        );
    }

    /**
     * Get vendor details for review.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function get_vendor_details( $request ) {
        $vendor_id = (int) $request->get_param( 'id' );

        if ( ! $vendor_id ) {
            return new WP_REST_Response(
                array(
                    'error'   => 'no_vendor_id',
                    'success' => false,
                    'message' => __( 'No vendor ID provided.', 'wc-vendors' ),
                ),
                200
            );
        }

        $user = get_userdata( $vendor_id );

        if ( ! $user || ( ! WCV_Vendors::is_vendor( $vendor_id ) && ! WCV_Vendors::is_pending( $vendor_id ) ) ) {
            return new WP_REST_Response(
                array(
                    'error'   => 'not_vendor',
                    'success' => false,
                    'message' => __( 'Not a vendor.', 'wc-vendors' ),
                ),
                200
            );
        }

        // Get vendor basic info.
        $vendor_data = array(
            'id'              => $vendor_id,
            'displayname'     => $user->display_name,
            'first_name'      => $user->first_name,
            'last_name'       => $user->last_name,
            'shopname'        => get_user_meta( $vendor_id, 'pv_shop_name', true ),
            'email'           => $user->user_email,
            'registered_date' => date_i18n( get_option( 'date_format' ), strtotime( $user->user_registered ) ),
            'website'         => get_user_meta( $vendor_id, '_wcv_company_url', true ),
            'status'          => array(
                'value'     => WCV_Vendors::is_pending( $vendor_id ) ? 'pending' : ( WCV_Vendors::is_vendor( $vendor_id ) ? 'active' : 'inactive' ),
                'formatted' => WCV_Vendors::is_pending( $vendor_id ) ? __( 'Pending', 'wc-vendors' ) : ( WCV_Vendors::is_vendor( $vendor_id ) ? __( 'Active', 'wc-vendors' ) : __( 'Inactive', 'wc-vendors' ) ),
            ),
        );

        // Get address information.
        $address = array(
            'address1' => get_user_meta( $vendor_id, '_wcv_store_address1', true ),
            'address2' => get_user_meta( $vendor_id, '_wcv_store_address2', true ),
            'city'     => get_user_meta( $vendor_id, '_wcv_store_city', true ),
            'state'    => get_user_meta( $vendor_id, '_wcv_store_state', true ),
            'country'  => get_user_meta( $vendor_id, '_wcv_store_country', true ),
            'postcode' => get_user_meta( $vendor_id, '_wcv_store_postcode', true ),
        );

        $vendor_data['address'] = $address;

        // Get description and seller info.
        $vendor_data['description'] = get_user_meta( $vendor_id, 'pv_shop_description', true );
        $vendor_data['seller_info'] = get_user_meta( $vendor_id, 'pv_seller_info', true );

        $vendor_data = apply_filters( 'wcvendors_get_vendor_details', $vendor_data, $vendor_id );

        return new WP_REST_Response( $vendor_data, 200 );
    }

    /**
     * Get products.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function get_products( $request ) {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'You do not have permission to view products.', 'wc-vendors' ),
                ),
                403
            );
        }

        $status    = $request->get_param( 'status' );
        $search    = $request->get_param( 'search' );
        $vendor_id = $request->get_param( 'vendor_id' );
        $page      = $request->get_param( 'page' ) ? absint( $request->get_param( 'page' ) ) : 1;
        $per_page  = $request->get_param( 'per_page' ) ? absint( $request->get_param( 'per_page' ) ) : 10;

        // Limit per_page to a reasonable maximum.
        $per_page = min( $per_page, 100 );

        $args = array(
            'post_type'      => 'product',
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'orderby'        => 'date',
            'order'          => 'DESC',
        );

        // Set post status.
        if ( 'published' === $status ) {
            $args['post_status'] = 'publish';
        } elseif ( 'pending' === $status ) {
            $args['post_status'] = 'pending';
        } elseif ( 'draft' === $status ) {
            $args['post_status'] = 'draft';
        } else {
            $args['post_status'] = array( 'publish', 'pending' );
        }

        // Add search.
        if ( ! empty( $search ) ) {
            $args['s'] = $search;
        }

        // Add vendor filter.
        if ( ! empty( $vendor_id ) ) {
            $args['author'] = $vendor_id;
        }

        $products_query = new WP_Query( $args );
        $products       = array();

        foreach ( $products_query->posts as $post ) {
            $product = wc_get_product( $post->ID );
            if ( ! $product ) {
                continue;
            }

            $product_vendor_id = get_post_field( 'post_author', $post->ID );
            $vendor            = get_userdata( $product_vendor_id );

            // Get AI review from product meta.
            $ai_review_raw = $product->get_meta( '_saai_vendors_product_moderation_result' );
            $ai_review     = $this->format_ai_review( $ai_review_raw );

            // Get image reviews from product meta.
            $image_reviews_raw = $product->get_meta( '_saai_vendors_product_image_review' );
            if ( ! empty( $image_reviews_raw ) ) {
                $image_reviews = $this->format_image_reviews( $image_reviews_raw );
                if ( ! empty( $image_reviews ) ) {
                    $ai_review['image_reviews'] = $image_reviews;
                }
            }

            // Get vendor shop name (falls back to display name if shop name not set).
            $shop_name   = WCV_Vendors::get_vendor_sold_by( $product_vendor_id );
            $vendor_name = ! empty( $shop_name ) ? $shop_name : ( $vendor ? $vendor->display_name : __( 'Unknown', 'wc-vendors' ) );

            $products[] = array(
                'id'          => $post->ID,
                'name'        => $product->get_name(),
                'vendor_id'   => $product_vendor_id,
                'vendor_name' => $vendor_name,
                'ai_review'   => $ai_review,
                'date'        => $post->post_date,
                'status'      => $post->post_status,
                'permalink'   => get_permalink( $post->ID ),
            );
        }

        $total       = $products_query->found_posts;
        $total_pages = ceil( $total / $per_page );

        return new WP_REST_Response(
            array(
                'success'    => true,
                'data'       => $products,
                'pagination' => array(
                    'current_page' => $page,
                    'per_page'     => $per_page,
                    'total'        => $total,
                    'total_pages'  => $total_pages,
                ),
            ),
            200
        );
    }

    /**
     * Approve product.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function approve_product( $request ) {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'You do not have permission to approve products.', 'wc-vendors' ),
                ),
                403
            );
        }

        $product_id = (int) $request->get_param( 'id' );
        if ( ! $product_id ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product ID is required.', 'wc-vendors' ),
                ),
                400
            );
        }

        $product = wc_get_product( $product_id );
        if ( ! $product ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product not found.', 'wc-vendors' ),
                ),
                404
            );
        }

        $post = get_post( $product_id );
        if ( 'pending' !== $post->post_status ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product is not pending approval.', 'wc-vendors' ),
                ),
                400
            );
        }

        $result = wp_update_post(
            array(
                'ID'          => $product_id,
                'post_status' => 'publish',
            )
        );

        if ( is_wp_error( $result ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => $result->get_error_message(),
                ),
                500
            );
        }

        do_action( 'wcvendors_approve_product', $product_id );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => __( 'Product approved successfully.', 'wc-vendors' ),
            ),
            200
        );
    }

    /**
     * Unpublish product.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function unpublish_product( $request ) {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'You do not have permission to unpublish products.', 'wc-vendors' ),
                ),
                403
            );
        }

        $product_id = (int) $request->get_param( 'id' );
        if ( ! $product_id ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product ID is required.', 'wc-vendors' ),
                ),
                400
            );
        }

        $product = wc_get_product( $product_id );
        if ( ! $product ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product not found.', 'wc-vendors' ),
                ),
                404
            );
        }

        $post = get_post( $product_id );
        if ( 'publish' !== $post->post_status ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product is not published.', 'wc-vendors' ),
                ),
                400
            );
        }

        $result = wp_update_post(
            array(
                'ID'          => $product_id,
                'post_status' => 'draft',
            )
        );

        if ( is_wp_error( $result ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => $result->get_error_message(),
                ),
                500
            );
        }

        do_action( 'wcvendors_unpublish_product', $product_id );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => __( 'Product unpublished successfully.', 'wc-vendors' ),
            ),
            200
        );
    }

    /**
     * Format AI review data for API response.
     *
     * @param string|array $ai_review_raw Raw AI review data (serialized or array).
     *
     * @return array Formatted AI review data.
     */
    private function format_ai_review( $ai_review_raw ) {
        // Use shared helper function with plain text sanitization (for API) and formatted field names.
        return wcv_format_ai_review( $ai_review_raw, false, true );
    }

    /**
     * Format image reviews data for API response.
     *
     * @param mixed $image_reviews_raw Raw image reviews data from meta.
     * @return array Formatted image reviews data.
     */
    private function format_image_reviews( $image_reviews_raw ) {
        if ( empty( $image_reviews_raw ) ) {
            return array();
        }

        // If it's a string, try to unserialize it.
        if ( is_string( $image_reviews_raw ) ) {
            $image_reviews_data = maybe_unserialize( $image_reviews_raw );
        } else {
            $image_reviews_data = $image_reviews_raw;
        }

        // If unserialization failed or data is not an array, return empty.
        if ( ! is_array( $image_reviews_data ) || empty( $image_reviews_data ) ) {
            return array();
        }

        $formatted_reviews = array();

        foreach ( $image_reviews_data as $image_review ) {
            if ( ! is_array( $image_review ) || empty( $image_review['image_id'] ) ) {
                continue;
            }

            $image_id = absint( $image_review['image_id'] );
            $review   = isset( $image_review['review'] ) && is_array( $image_review['review'] ) ? $image_review['review'] : array();
            $reviewed = isset( $image_review['reviewed'] ) ? (bool) $image_review['reviewed'] : false;

            // Get image URL.
            $image_url = wp_get_attachment_image_url( $image_id, 'medium' );
            if ( ! $image_url ) {
                $image_url = wp_get_attachment_image_url( $image_id, 'full' );
            }

            $formatted_review = array(
                'image_id'  => $image_id,
                'image_url' => $image_url ? esc_url( $image_url ) : '',
                'reviewed'  => $reviewed,
            );

            // Format completion data if available.
            if ( ! empty( $review['completion'] ) && is_array( $review['completion'] ) ) {
                $completion = $review['completion'];

                $formatted_review['completion'] = array(
                    'status'         => isset( $completion['status'] ) ? sanitize_text_field( $completion['status'] ) : '',
                    'is_appropriate' => isset( $completion['is_appropriate'] ) ? (bool) $completion['is_appropriate'] : false,
                    'risk_score'     => isset( $completion['risk_score'] ) ? absint( $completion['risk_score'] ) : 0,
                    'analysis'       => array(),
                    'review_summary' => isset( $completion['review_summary'] ) ? wp_kses_post( $completion['review_summary'] ) : '',
                );

                // Format analysis data.
                if ( ! empty( $completion['analysis'] ) && is_array( $completion['analysis'] ) ) {
                    $formatted_review['completion']['analysis'] = array(
                        'appropriateness' => isset( $completion['analysis']['appropriateness'] ) ? sanitize_text_field( $completion['analysis']['appropriateness'] ) : '',
                        'quality'         => isset( $completion['analysis']['quality'] ) ? sanitize_text_field( $completion['analysis']['quality'] ) : '',
                        'compliance'      => isset( $completion['analysis']['compliance'] ) ? sanitize_text_field( $completion['analysis']['compliance'] ) : '',
                        'product_match'   => isset( $completion['analysis']['product_match'] ) ? sanitize_text_field( $completion['analysis']['product_match'] ) : '',
                    );
                }
            }

            $formatted_reviews[] = $formatted_review;
        }

        return $formatted_reviews;
    }

    /**
     * Get vendors list for dropdown.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function get_vendors_list( $request ) {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'You do not have permission to view vendors.', 'wc-vendors' ),
                ),
                403
            );
        }

        $user_args = array(
            'fields'   => array( 'ID', 'display_name' ),
            'role__in' => array( 'vendor', 'administrator' ),
            'number'   => -1,
        );

        $users   = get_users( $user_args );
        $vendors = array();

        foreach ( $users as $user ) {
            $shop_name    = WCV_Vendors::get_vendor_sold_by( $user->ID );
            $display_name = ! empty( $shop_name ) ? $shop_name : $user->display_name;

            $vendors[] = array(
                'id'   => $user->ID,
                'name' => $display_name,
            );
        }

        return new WP_REST_Response(
            array(
                'success' => true,
                'data'    => $vendors,
            ),
            200
        );
    }

    /**
     * Request product change.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function request_product_change( $request ) {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'You do not have permission to request product changes.', 'wc-vendors' ),
                ),
                403
            );
        }

        $product_id          = (int) $request->get_param( 'id' );
        $message             = $request->get_param( 'message' );
        $include_suggestions = (bool) $request->get_param( 'include_suggestions' );

        if ( ! $product_id ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product ID is required.', 'wc-vendors' ),
                ),
                400
            );
        }

        $product = wc_get_product( $product_id );
        if ( ! $product ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product not found.', 'wc-vendors' ),
                ),
                404
            );
        }

        $post = get_post( $product_id );
        if ( 'pending' !== $post->post_status ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Product is not pending.', 'wc-vendors' ),
                ),
                400
            );
        }

        $vendor_id = get_post_field( 'post_author', $product_id );
        $vendor    = get_userdata( $vendor_id );

        if ( ! $vendor ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => __( 'Vendor not found.', 'wc-vendors' ),
                ),
                404
            );
        }

        // Save change request message to product meta.
        if ( ! empty( $message ) ) {
            $product->update_meta_data( 'wcv_change_request_message', sanitize_textarea_field( $message ) );
            $product->save_meta_data();
        }

        // Get AI review and extract suggestions only if requested.
        $suggestions = array();
        if ( $include_suggestions ) {
            $ai_review_raw = $product->get_meta( '_saai_vendors_product_moderation_result' );
            $ai_review     = $this->format_ai_review( $ai_review_raw );
            $suggestions   = ! empty( $ai_review['suggestions'] ) && is_array( $ai_review['suggestions'] ) ? $ai_review['suggestions'] : array();

            // Set meta key to indicate suggestions should be shown to vendor.
            if ( ! empty( $suggestions ) ) {
                $product->update_meta_data( '_wcv_show_ai_suggestions', 'yes' );
                $product->save_meta_data();
            }
        }

        // Set product status to draft so vendor can make changes.
        $result = wp_update_post(
            array(
                'ID'          => $product_id,
                'post_status' => 'draft',
            )
        );

        if ( is_wp_error( $result ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'message' => $result->get_error_message(),
                ),
                500
            );
        }

        // Send email to vendor.
        $this->send_change_request_email( $vendor, $product, $message, $suggestions );

        do_action( 'wcvendors_request_product_change', $product_id, $vendor_id, $message, $suggestions );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => __( 'Change request sent successfully.', 'wc-vendors' ),
            ),
            200
        );
    }

    /**
     * Send change request email to vendor.
     *
     * @param WP_User    $vendor      Vendor user object.
     * @param WC_Product $product     Product object.
     * @param string     $message     Change request message.
     * @param array      $suggestions Array of suggestions with 'field' and 'suggestion' keys.
     *
     * @return void
     */
    private function send_change_request_email( $vendor, $product, $message, $suggestions = array() ) {
        if ( ! $vendor || ! $product ) {
            return;
        }

        $vendor_email = $vendor->user_email;
        $product_name = $product->get_name();
        $product_id   = $product->get_id();
        $product_url  = esc_url( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product/edit/' . $product_id ) );

        $subject = sprintf(
            /* translators: %s: product name */
            __( 'Change Request for Product: %s', 'wc-vendors' ),
            $product_name
        );

        $email_heading = __( 'Product Change Request', 'wc-vendors' );

        // Build email content.
        ob_start();
        ?>
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333; background-color: #f5f5f5;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
                <tr>
                    <td align="center">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td style="padding: 30px 30px 20px 30px; border-bottom: 2px solid #e8e8e8;">
                                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">
                                        <?php echo esc_html( $email_heading ); ?>
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 30px;">
                                    <!-- Greeting -->
                                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">
                                        <?php
                                        /* translators: %s: vendor display name */
                                        printf( esc_html__( 'Hello %s,', 'wc-vendors' ), '<strong style="color: #1a1a1a;">' . esc_html( $vendor->display_name ) . '</strong>' );
                                        ?>
                                    </p>
                                    
                                    <!-- Introduction -->
                                    <p style="margin: 0 0 30px 0; font-size: 16px; color: #333333;">
                                        <?php
                                        /* translators: %s: product name */
                                        printf( esc_html__( 'We need some changes to your product "%s".', 'wc-vendors' ), '<strong style="color: #1677ff;">' . esc_html( $product_name ) . '</strong>' );
                                        ?>
                                    </p>
                                    
                                    <!-- Requested Changes Section -->
                                    <?php if ( ! empty( $message ) ) : ?>
                                        <div style="margin: 0 0 25px 0; padding: 20px; background-color: #fff7e6; border-left: 4px solid #faad14; border-radius: 4px;">
                                            <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                                                <?php esc_html_e( 'Requested Changes', 'wc-vendors' ); ?>
                                            </h2>
                                            <div style="margin: 0; font-size: 15px; color: #333333; line-height: 1.6;">
                                                <?php echo wp_kses_post( nl2br( $message ) ); ?>
                                            </div>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <!-- Suggested Fixes Section -->
                                    <?php if ( ! empty( $suggestions ) && is_array( $suggestions ) ) : ?>
                                        <div style="margin: 0 0 25px 0; padding: 20px; background-color: #e6f7ff; border-left: 4px solid #1677ff; border-radius: 4px;">
                                            <h2 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;">
                                                <?php esc_html_e( 'Suggested Fixes', 'wc-vendors' ); ?>
                                            </h2>
                                            <div style="margin: 0;">
                                                <?php foreach ( $suggestions as $index => $suggestion ) : ?>
                                                    <?php if ( ! empty( $suggestion['field'] ) && ! empty( $suggestion['suggestion'] ) ) : ?>
                                                        <div style="margin: <?php echo $index > 0 ? '15px' : '0'; ?> 0 0 0; padding: 0;">
                                                            <div style="margin: 0 0 5px 0; font-weight: 600; font-size: 15px; color: #1a1a1a; text-transform: capitalize;">
                                                                <?php echo esc_html( $suggestion['field'] ); ?>
                                                            </div>
                                                            <div style="margin: 0; font-size: 15px; color: #333333; line-height: 1.6; padding-left: 0;">
                                                                <?php echo wp_kses_post( $suggestion['suggestion'] ); ?>
                                                            </div>
                                                        </div>
                                                    <?php endif; ?>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <!-- Call to Action Button -->
                                    <div style="margin: 30px 0; text-align: center;">
                                        <a href="<?php echo esc_url( $product_url ); ?>" style="display: inline-block; background-color: #1677ff; color: #ffffff !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(22, 119, 255, 0.3); transition: background-color 0.2s;">
                                            <?php esc_html_e( 'Edit Product', 'wc-vendors' ); ?>
                                        </a>
                                    </div>
                                    
                                    <!-- Closing -->
                                    <p style="margin: 30px 0 0 0; font-size: 15px; color: #666666; text-align: center;">
                                        <?php esc_html_e( 'Thank you for your cooperation.', 'wc-vendors' ); ?>
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="padding: 20px 30px; background-color: #fafafa; border-top: 1px solid #e8e8e8; border-radius: 0 0 8px 8px;">
                                    <p style="margin: 0; font-size: 13px; color: #999999; text-align: center;">
                                        <?php echo esc_html( get_option( 'blogname' ) ); ?>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        <?php
        $email_content = ob_get_clean();

        // Set email headers.
        $headers = array( 'Content-Type: text/html; charset=UTF-8' );

        // Send email.
        wp_mail(
            $vendor_email,
            $subject,
            $email_content,
            $headers
        );
    }
}
new WCV_Admin_API();
