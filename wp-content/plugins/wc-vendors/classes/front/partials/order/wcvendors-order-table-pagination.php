<?php
/**
 * Order table pagination
 *
 * @since 2.5.4
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
?>
<?php if ( $this->max_num_pages > 1 ) : ?>
<div class="all-100 small-100 wcv-order-table-pagination-center">
    <?php
    $order_paged = max( 1, get_query_var( 'paged' ) );
    if ( $order_paged > $this->max_num_pages ) {
        $order_paged = $this->max_num_pages;
    }
    $first_link = $order_paged > 1 ?
    sprintf( '<ul class="page-numbers"><li><a class="page-numbers" href="%s">%s</a></li></ul>', add_query_arg( 'paged', 1 ), '<i class="fas fa-angle-double-left"></i>' ) : '';
    $last_link  = $order_paged < $this->max_num_pages ?
    sprintf( '<ul class="page-numbers"><li><a class="page-numbers" href="%s">%s</a></li></ul>', add_query_arg( 'paged', $this->max_num_pages ), '<i class="fas fa-angle-double-right"></i>' ) : '';
    echo wp_kses_post( $pagination_wrapper['wrapper_start'] );
    echo wp_kses_post( $first_link );
    echo wp_kses_post(
        paginate_links(
            apply_filters(
                'wcv_order_pagination_args',
                array(
                    'base'      => add_query_arg( 'paged', '%#%' ),
                    'format'    => 'paged=%#%',
                    'current'   => $order_paged,
                    'total'     => $this->max_num_pages,
                    'prev_next' => true,
                    'type'      => 'list',
                    'end_size'  => 2,
                    'mid_size'  => 2,
                    'last_text' => __( 'Last', 'wc-vendors' ),
                    'prev_text' => __( 'Previous', 'wc-vendors' ),
                ),
            )
        )
    );
    echo wp_kses_post( $last_link );
    echo wp_kses_post( $pagination_wrapper['wrapper_end'] );
    ?>

</div>
<?php endif; ?>
