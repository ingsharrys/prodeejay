<?php
/**
 * Abstract class for WC Vendor API.
 *
 * @package WCVendors/API
 */
abstract class WCV_API {
    /**
     * API namespace.
     *
     * @var string $wcv_api_namespace API namespace.
     */
    protected $wcv_api_namespace = 'wcv-api/v1';

    /**
     * Enable rate limiting for the API.
     *
     * @var bool $enable_rate_limiting Enable rate limiting.
     */
    protected $enable_rate_limiting = true;

    /**
     * Rate limit for the API per minute by IP address.
     *
     * @var int $rate_limit Rate limit.
     */
    protected $rate_limit = 100;


    /**
     * Setup class.
     */
    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );

        // Detect if local development is happening and disable rate limiting.
        $env_type = wp_get_environment_type();

        if ( 'local' === $env_type || 'development' === $env_type ) {
            $this->enable_rate_limiting = false;
        }
    }

    /**
     * Get user IP address.
     *
     * @return string
     */
    protected function get_user_ip() {
        return isset( $_SERVER['REMOTE_ADDR'] ) ? filter_var( wp_unslash( $_SERVER['REMOTE_ADDR'] ), FILTER_VALIDATE_IP ) : '';
    }

    /**
     * Register the routes for this class.
     */
    abstract public function register_routes();

    /**
     * Register a single route.
     *
     * @param string $route    Route to register.
     * @param string $callback Callback function.
     * @param string $method   Request method.
     * @param array  $args     Additional arguments.
     */
    protected function register_route( $route, $callback, $method, $args = array() ) {
        if ( empty( $callback ) || ! is_callable( array( $this, $callback ) ) || empty( $method ) ) {
            return;
        }

        register_rest_route(
            $this->wcv_api_namespace,
            $route,
            array(
                array(
                    'methods'             => $method,
                    'callback'            => array( $this, 'handle_request' ),
                    'permission_callback' => array( $this, 'get_api_permissions_check' ),
                    'args'                => $args,
                    '_internal_callback'  => $callback,
                ),
            )
        );
    }

    /**
     * Check permissions for the API.
     *
     * @return bool
     */
    public function get_api_permissions_check() {
        return false;
    }

    /**
     * Process rate limiting.
     *
     * @since 2.5.5
     *
     * @param string $callback Callback function.
     * @return string|callable
     */
    protected function process_rate_limiting( $callback ) {
        if ( $this->enable_rate_limiting ) {
            $is_limited = $this->check_rate_limit();

            if ( $is_limited ) {
                return 'limit_response';
            }
        }

        return $callback;
    }

    /**
     * Limit response.
     *
     * @return WP_Error
     */
    public function limit_response() {
        return new WP_REST_Response( array( 'message' => 'You have made too many requests. Please try again later.' ), 429 );
    }


    /**
     * Check rate limit.
     *
     * @since 2.5.5
     *
     * @return bool
     */
    protected function check_rate_limit() {

            // Get the user's IP address.
            $ip_address = $this->get_user_ip();

            // Get the current time.
            $current_time = time(); // phpcs:ignore

            // Get the time of the last request.
            $last_request_time = get_transient( 'wcv_last_request_time_' . $ip_address );

            // Get the number of requests made in the last minute.
            $requests_made = (int) get_transient( 'wcv_requests_made_' . $ip_address );

            // If the last request time is not set or more than a minute ago, reset the number of requests made.
            if ( empty( $last_request_time ) || ( $current_time - $last_request_time > 60 ) ) {
                $requests_made = 0;
            }

            // Increment the number of requests made.
            ++$requests_made;

            // Update the number of requests made.
            set_transient( 'wcv_requests_made_' . $ip_address, $requests_made );
            set_transient( 'wcv_last_request_time_' . $ip_address, $current_time );

            // If the number of requests made is greater than the rate limit, return true to indicate it should be throttled.
            if ( $requests_made > $this->rate_limit ) {
                return true;
            }

            return false;
    }

    /**
     * Handle request.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response
     */
    public function handle_request( $request ) {
        if ( $this->enable_rate_limiting ) {
            $is_limited = $this->check_rate_limit();
            if ( $is_limited ) {
                return $this->limit_response();
            }
        }

        $callback = $request->get_attributes()['_internal_callback'];
        return call_user_func( array( $this, $callback ), $request );
    }
}
