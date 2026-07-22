<?php
/**
 * Dashboard tab content orders
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
?>
<div class="wcv-cols-group wcv-horizontal-gutters column-group ink-stacker gutters wcv-flex wcv-flex-wrap wcv-cols-group-wide">
    <div class="all-100 wcv-section-gap <?php echo $should_show_ratings ? 'large-50 xlarge-50' : ''; ?>">
        <div class="wcv-recent-orders wcv-section wcv-section-small">
            <div class="wcv-flex wcv-section-header wcv-flex-wrap">
                <h3 class="wcv-sub-heading"><?php esc_html_e( 'Orders', 'wc-vendors' ); ?></h3>
                <p class="wcv-recent-orders-pending wcv_mobile" style="margin: 12px; text-align: center;">
                <?php
                if ( ! $vendor_shipping_disabled ) {
                    printf(
                        '%s <strong>%s</strong>',
                        esc_html__( 'Awaiting shipping:', 'wc-vendors' ),
                        esc_html( count( $pending_shipping_orders ) ),
                    );
                }
                ?>
                </p>
                <a href="<?php echo esc_url( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'order' ) ); ?>" class="wcv-view-more">
                    <svg class="wcv-icon wcv-icon-sm">
                        <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-view"></use>
                    </svg>
                    <?php esc_html_e( 'View All Orders', 'wc-vendors' ); ?>
                </a>
                <p class="wcv-recent-orders-pending wcv_desktop" style="margin: 0; width: 100%;">
                <?php
                    if ( ! $vendor_shipping_disabled ) {
                    printf(
                        '%s <strong>%s</strong>',
                        esc_html__( 'Awaiting shipping:', 'wc-vendors' ),
                        esc_html( count( $pending_shipping_orders ) ),
                    );
                }
                ?>
                </p>
            </div>
            <table class="wcv-dashboard-table has-background">
                <thead>
                    <tr>
                        <th><?php esc_html_e( 'Order', 'wc-vendors' ); ?></th>
                        <?php if ( $show_customer_name ) : ?>
                            <th><?php esc_html_e( 'Customer', 'wc-vendors' ); ?></th>
                        <?php endif; ?>
                        <th><?php esc_html_e( 'Status', 'wc-vendors' ); ?></th>
                        <th><?php esc_html_e( 'Actions', 'wc-vendors' ); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( ! empty( $latest_orders ) ) : ?>
                        <?php foreach ( $latest_orders as $od ) : ?>
                            <tr>
                                <td class="strong">
                                &#35;&nbsp;<?php echo esc_html( $od['order_id'] ); ?>
                                </td>
                                <?php if ( $show_customer_name ) : ?>
                                    <td>
                                        <?php printf( '%s (%d %s)', esc_html( $od['customer'] ), esc_html( $od['total_prod'] ), esc_html__( 'x products', 'wc-vendors' ) ); ?>
                                    </td>
                                <?php endif; ?>
                                <td>
                                    <?php echo esc_html( $od['status'] ); ?>
                                </td>
                                <td>
                                    <a href="#" class="wcv-view-btn" id="open-order-details-modal-<?php echo esc_attr( $od['order_id'] ); ?>"><?php esc_html_e( 'View', 'wc-vendors' ); ?></a>
                                    <?php echo $od['detail_popup']; // phpcs:ignore ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="4"><?php esc_html_e( 'No orders yet.', 'wc-vendors' ); ?></td>
                        </tr>
                    <?php endif; ?>
            </table>
        </div>
    </div>
    <?php if ( $should_show_ratings ) : ?>
    <div class="all-100 large-50 xlarge-50 wcv-section-gap">
        <div class="wcv-recent-rating wcv-section wcv-section-small">
            <div class="wcv-flex wcv-section-header wcv-flex-wrap">
                <h3 class="wcv-sub-heading"><?php esc_html_e( 'Ratings', 'wc-vendors' ); ?></h3>
                <a href="<?php echo esc_url( trailingslashit( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'rating' ) ) ); ?>" class="wcv-view-more">
                    <svg class="wcv-icon wcv-icon-sm">
                        <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-view"></use>
                    </svg>
                    <?php esc_html_e( 'View All Ratings', 'wc-vendors' ); ?>
                </a>
            </div>
            <table class="wcv-dashboard-table has-background">
                <thead>
                    <tr>
                        <th><?php esc_html_e( 'Order', 'wc-vendors' ); ?></th>
                        <th><?php esc_html_e( 'Customer', 'wc-vendors' ); ?></th>
                        <th><?php esc_html_e( 'Review', 'wc-vendors' ); ?></th>
                        <th><?php esc_html_e( 'Rating', 'wc-vendors' ); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( ! empty( $latest_reviews ) ) : ?>
                        <?php foreach ( $latest_reviews as $review ) : ?>
                            <tr>
                                <td class="strong">
                                &#35;&nbsp;<?php echo esc_html( $review['order_id'] ); ?>
                                </td>
                                <td>
                                    <?php echo esc_html( $review['customer'] ); ?>
                                </td>
                                <td style="max-width: 70px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                    <?php echo esc_html( $review['review'] ); ?>
                                </td>
                                <td>
                                    <?php echo wp_kses_post( $review['rating'] ); ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="4"><?php esc_html_e( 'No ratings yet.', 'wc-vendors' ); ?></td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>    
        </div>
    </div>
    <?php endif; ?>
</div>
