<?php
/**
 * Product buttons template
 *
 * @package    WC_Vendors
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
?>
<div class="small-70 wcv-product-table-buttons wcv-flex wcv-flex-wrap wcv-flex-end">
    <?php if ( ! $lock_new_products && $can_submit ) : ?>
        <?php foreach ( $template_overrides as $key => $template_data ) : ?>
            <a href="<?php echo esc_url( $template_data['url'] ); ?>"
            class="wcv-button button quick-link-btn">
                <?php
                echo wp_kses(
                    wcv_get_icon( 'wcv-icon wcv-icon-dashboard-icon', 'wcv-icon-plus-square-o' ),
                    array(
                        'svg' => array(
                            'class' => array(),
                        ),
                        'use' => array(
                            'xlink:href' => array(),
                        ),
                    )
                );
                ?>
                <span class="wcv-button-text">
                <?php
                printf(
                    /* translators: %s button label */
                    esc_html__( 'Add %s', 'wc-vendors' ),
                    esc_html( $template_data['label'] )
                );
                ?>
                </span>
            </a>
        <?php endforeach; ?>
    <?php endif; ?>
    <?php do_action( 'wcv_product_action_after_buttons' ); ?> 
</div>
