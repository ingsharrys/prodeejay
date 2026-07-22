<div class="wcv-cols-group wcv-horizontal-gutters column-group ink-stacker gutters wcv-flex wcv-flex-wrap wcv-cols-group-wide">
    <div class="all-100 large-50 xlarge-50 wcv-section-gap">
        <div class="wcv-sales-snapshot wcv-section">
            <div class="wcv-flex wcv-section-header wcv-flex-wrap">
                <h3 class="wcv-sub-heading"><?php esc_html_e( 'Sales Snapshot', 'wc-vendors' ); ?></h3>
                <a href="<?php echo esc_url( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'order' ) ); ?>" class="wcv-view-more">
                    <svg class="wcv-icon wcv-icon-sm">
                        <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-view"></use>
                    </svg>
                    <?php esc_html_e( 'View All Orders', 'wc-vendors' ); ?>
                </a>
            </div>
            <div class="wcv-sales-snapshot-content wcv-flex wcv-flex-wrap wcv-flex-space">
                <div class="wcv-sales-snapshot-item gross-sales">
                    <div class="wcv-sales-snapshot-item-icon">
                        <svg class="wcv-icon wcv-icon-lg">
                            <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-snapshot-sales"></use>
                        </svg>
                    </div>
                    <div class="wcv-sales-snapshot-item-value"><?php echo wp_kses_post( wc_price( $sales_snapshot['gross_sales']['this_month'] ) ); ?></div>
                    <p class="wcv-sales-snapshot-item-label"><?php esc_html_e( 'Gross Sales', 'wc-vendors' ); ?></p>
                    <div class="wcv-sales-snapshot-item-comparison <?php echo $sales_snapshot['gross_sales']['percentage'] < 0 ? 'negative' : ''; ?>">
                        <span class="wcv-sales-snapshot-item-comparison-value"><?php echo wp_kses_post( $sales_snapshot['gross_sales']['percentage'] ); ?>&#37;</span>
                        <span class="wcv-sales-snapshot-item-comparison-label"><?php esc_html_e( 'from last month', 'wc-vendors' ); ?></span>
                    </div>
                </div>
                <div class="wcv-sales-snapshot-item gross-commissions">
                    <div class="wcv-sales-snapshot-item-icon">
                        <svg class="wcv-icon wcv-icon-lg">
                            <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-snapshot-commissions"></use>
                        </svg>
                    </div>
                    <div class="wcv-sales-snapshot-item-value"><?php echo wp_kses_post( wc_price( $sales_snapshot['gross_commissions']['this_month'] ) ); ?></div>
                    <p class="wcv-sales-snapshot-item-label"><?php esc_html_e( 'Gross Commissions', 'wc-vendors' ); ?></p>
                    <div class="wcv-sales-snapshot-item-comparison <?php echo $sales_snapshot['gross_commissions']['percentage'] < 0 ? 'negative' : ''; ?>">
                        <span class="wcv-sales-snapshot-item-comparison-value"><?php echo wp_kses_post( $sales_snapshot['gross_commissions']['percentage'] ); ?>&#37;</span>
                        <span class="wcv-sales-snapshot-item-comparison-label"><?php esc_html_e( 'from last month', 'wc-vendors' ); ?></span>
                    </div>
                </div>
                <div class="wcv-sales-snapshot-item total-orders">
                    <div class="wcv-sales-snapshot-item-icon">
                        <svg class="wcv-icon wcv-icon-lg">
                            <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-snapshot-total-orders"></use>
                        </svg>
                    </div>
                    <div class="wcv-sales-snapshot-item-value"><?php echo wp_kses_post( $sales_snapshot['total_orders']['this_month'] ); ?></div>
                    <p class="wcv-sales-snapshot-item-label"><?php esc_html_e( 'Total Orders', 'wc-vendors' ); ?></p>
                    <div class="wcv-sales-snapshot-item-comparison <?php echo $sales_snapshot['total_orders']['percentage'] < 0 ? 'negative' : ''; ?>">
                        <span class="wcv-sales-snapshot-item-comparison-value"><?php echo wp_kses_post( $sales_snapshot['total_orders']['percentage'] ); ?>&#37;</span>
                        <span class="wcv-sales-snapshot-item-comparison-label"><?php esc_html_e( 'from last month', 'wc-vendors' ); ?></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="all-100 large-50 xlarge-50 wcv-section-gap">
        <div class="wcv-total-orders-chart wcv-section">
            <div class="wcv-flex wcv-section-header wcv-flex-wrap">
                <h3 class="wcv-sub-heading"><?php esc_html_e( 'This Month so Far', 'wc-vendors' ); ?></h3>
                <a href="<?php echo esc_url( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'reports' ) ); ?>" class="wcv-view-more">
                    <svg class="wcv-icon wcv-icon-sm">
                        <use xlink:href="<?php echo esc_url( WCV_ASSETS_URL ); ?>svg/wcv-icons.svg?t=<?php echo esc_attr( $time ); ?>#wcv-icon-view"></use>
                    </svg>
                    <?php esc_html_e( 'View Full Report', 'wc-vendors' ); ?>
                </a>
            </div>
            <div class="wcv-total-orders-chart-content">
                <div class="wcv-total-orders-chart-wrapper">
                    <input type="hidden" id="wcv-total-orders-chart-data" value="<?php echo esc_attr( wp_json_encode( $chart_data ) ); ?>">
                    <canvas id="wcv-total-orders-chart"></canvas>
                    <div id="wcv-total-orders-chart-legend" class="wcv-total-orders-chart-legend">
                        <div class="wcv-total-orders-chart-legend-item" style="display:flex;align-items:center;justify-content:center;">
                            <div class="wcv-total-orders-chart-legend-color" style="width: 12px; height:12px;border-radius:50%;margin-right:5px;"></div>
                            <div class="wcv-total-orders-chart-legend-label" style="font-size: 12px;"><?php esc_html_e( 'Total Orders', 'wc-vendors' ); ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
