<?php
/**
 * Out of Stock Reminder
 *
 * Schedules a daily recurring action via WooCommerce Action Scheduler that checks
 * vendor products which have been out of stock beyond the configured threshold and
 * sends a digest reminder email to each affected vendor.
 *
 * @package WC_Vendors
 * @since   2.6.7
 * @version 2.6.7
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * WCV_Out_Of_Stock_Reminder class.
 *
 * @since   2.6.7
 * @version 2.6.7
 */
class WCV_Out_Of_Stock_Reminder {

    const META_OUT_OF_STOCK_DATE = '_wcv_out_of_stock_date';
    const META_LAST_REMINDER     = '_wcv_out_of_stock_last_reminder';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'wcvendors_settings_saved', array( $this, 'schedule_cron' ) );
        add_action( 'wcvendors_check_out_of_stock_reminders', array( $this, 'check_out_of_stock_reminders' ) );
        add_action( 'woocommerce_product_set_stock_status', array( $this, 'track_out_of_stock_date' ), 10, 3 );
    }

    /**
     * Track when a product goes out of stock by saving a timestamp meta.
     *
     * Sets `_wcv_out_of_stock_date` when the product first goes out of stock.
     * Clears both meta keys when the product is restocked.
     *
     * @since   2.6.7
     * @version 2.6.7
     *
     * @param int        $product_id The product ID.
     * @param string     $status     The new stock status.
     * @param WC_Product $product    The product object.
     */
    public function track_out_of_stock_date( $product_id, $status, $product ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed

        if ( 'outofstock' === $status ) {
            if ( ! get_post_meta( $product_id, self::META_OUT_OF_STOCK_DATE, true ) ) {
                update_post_meta( $product_id, self::META_OUT_OF_STOCK_DATE, time() );
            }
        } else {
            delete_post_meta( $product_id, self::META_OUT_OF_STOCK_DATE );
            delete_post_meta( $product_id, self::META_LAST_REMINDER );
        }
    }

    /**
     * Schedule or cancel the recurring action when settings are saved.
     *
     * Hooked to `wcvendors_settings_saved` so it reacts immediately when the
     * admin toggles the feature on or off.
     *
     * @since   2.6.7
     * @version 2.6.7
     */
    public function schedule_cron() {
        $enabled   = 'yes' === get_option( 'wcvendors_notify_vendor_out_of_stock', 'no' );
        $scheduled = WC()->queue()->get_next( 'wcvendors_check_out_of_stock_reminders', array(), 'wc-vendors' );

        if ( $enabled && ! $scheduled ) {
            WC()->queue()->schedule_recurring( time(), DAY_IN_SECONDS, 'wcvendors_check_out_of_stock_reminders', array(), 'wc-vendors' );
        } elseif ( ! $enabled && $scheduled ) {
            WC()->queue()->cancel( 'wcvendors_check_out_of_stock_reminders', array(), 'wc-vendors' );
        }
    }

    /**
     * Check all vendor products and send out-of-stock reminder emails as needed.
     *
     * For each published vendor product that is out of stock:
     * - Records the out-of-stock date on first encounter and waits for the threshold.
     * - Enforces a send-frequency guard so vendors are not spammed.
     * - Groups qualifying products by vendor and triggers one digest email per vendor.
     *
     * @since   2.6.7
     * @version 2.6.7
     */
    public function check_out_of_stock_reminders() {

        $threshold_days    = (int) get_option( 'wcvendors_out_of_stock_threshold_days', 7 );
        $frequency         = get_option( 'wcvendors_out_of_stock_reminder_frequency', 'weekly' );
        $frequency_seconds = ( 'monthly' === $frequency ) ? 2592000 : 604800;
        $now               = time();
        $threshold_seconds = $threshold_days * DAY_IN_SECONDS;

        $product_ids = get_posts(
            array(
                'post_type'      => array( 'product', 'product_variation' ),
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'fields'         => 'ids',
                'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
                    array(
                        'key'   => '_stock_status',
                        'value' => 'outofstock',
                    ),
                ),
            )
        );

        if ( empty( $product_ids ) ) {
            return;
        }

        $vendors_products = array();

        foreach ( $product_ids as $product_id ) {

            $post = get_post( $product_id );
            if ( ! $post ) {
                continue;
            }

            // For variations, resolve the vendor from the parent product.
            if ( 'product_variation' === $post->post_type ) {
                $parent = get_post( $post->post_parent );
                if ( ! $parent ) {
                    continue;
                }
                $vendor_id = (int) $parent->post_author;
            } else {
                $vendor_id = (int) $post->post_author;
            }

            if ( ! WCV_Vendors::is_vendor( $vendor_id ) ) {
                continue;
            }

            // Skip variable product parents — their individual variations are
            // already captured above and carry more specific stock information.
            $product = wc_get_product( $product_id );
            if ( ! $product ) {
                continue;
            }
            if ( $product->is_type( 'variable' ) ) {
                continue;
            }

            $out_of_stock_date = (int) get_post_meta( $product_id, self::META_OUT_OF_STOCK_DATE, true );

            // First time we see this product out of stock — record the date and wait for the threshold.
            if ( ! $out_of_stock_date ) {
                update_post_meta( $product_id, self::META_OUT_OF_STOCK_DATE, $now );
                continue;
            }

            // Not yet past the threshold.
            if ( ( $now - $out_of_stock_date ) < $threshold_seconds ) {
                continue;
            }

            // Frequency guard: don't re-send too soon.
            $last_reminder = (int) get_post_meta( $product_id, self::META_LAST_REMINDER, true );
            if ( $last_reminder && ( $now - $last_reminder ) < $frequency_seconds ) {
                continue;
            }

            $vendors_products[ $vendor_id ][] = array(
                'product'           => $product,
                'days_out_of_stock' => (int) ceil( ( $now - $out_of_stock_date ) / DAY_IN_SECONDS ),
            );
        }

        $mailer = WC()->mailer()->emails;
        if ( ! isset( $mailer['WCVendors_Vendor_Notify_Out_Of_Stock'] ) ) {
            return;
        }

        foreach ( $vendors_products as $vendor_id => $products ) {
            $mailer['WCVendors_Vendor_Notify_Out_Of_Stock']->trigger( $vendor_id, $products );

            foreach ( $products as $item ) {
                update_post_meta( $item['product']->get_id(), self::META_LAST_REMINDER, $now );
            }
        }
    }
}
