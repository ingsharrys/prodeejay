<?php
/**
 * Product table row details
 *
 * @since 2.5.4
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

?>
<h4 class="wcv-product-title wcv_desktop">
    <span class="wcv-product-title-text"><?php echo esc_html( $row_data['product_title'] ); ?></span>
    <?php if ( $row_data['status'] ) : ?>
        <span class="wcv-status product-status--<?php echo esc_attr( $row_data['status']['class'] ); ?>">
            <?php echo esc_html( $row_data['status']['label'] ); ?>
        </span>
    <?php endif; ?>
</h4>
<?php if ( isset( $row_data['published_date'] ) ) : ?>
    <small class="wcv-product-date wcv_desktop" style="font-size: 1em; color: #666666;"><?php esc_html_e( 'Published Date:', 'wc-vendors' ); ?> <?php echo esc_html( $row_data['published_date'] ); ?></small>
<?php endif; ?>

<table class="wcv-product-details-table has-background">
    <tbody>
        <tr class="wcv_mobile mobile_price">
            <th>
                <span class="vertical-middle"><?php esc_html_e( 'Price:', 'wc-vendors' ); ?></span>
            </th>
            <td><?php echo wp_kses_post( $row_data['price'] ); ?></td>
        </tr>
        <?php if ( isset( $row_data['sku'] ) ) : ?>
            <tr>
                <th><?php esc_html_e( 'SKU:', 'wc-vendors' ); ?></th>
                <td><?php echo esc_html( $row_data['sku'] ); ?></td>
            </tr>
        <?php endif; ?>
        <?php if ( isset( $row_data['stock'] ) ) : ?>
            <tr>
                <th><?php esc_html_e( 'Stock:', 'wc-vendors' ); ?></th>
                <td>
                    <span class="wcv-status product-status--<?php echo esc_attr( $row_data['stock']['class'] ); ?>">
                        <?php echo esc_html( $row_data['stock']['label'] ); ?>
                    </span>
                </td>
            </tr>
        <?php endif; ?>
        <?php if ( isset( $row_data['product_categories'] ) && ! empty( $row_data['product_categories'] ) ) : ?>
            <tr>
                <th><?php esc_html_e( 'Categories:', 'wc-vendors' ); ?></th>
                <td>
                    <?php foreach ( $row_data['product_categories'] as $category ) : ?>
                        <a class="wcv-product-cat" href="<?php echo esc_url( $category['url'] ); ?>"><?php echo esc_html( $category['name'] ); ?></a>
                    <?php endforeach; ?>
                </td>
            </tr>
        <?php endif; ?>

        <?php if ( isset( $row_data['product_tags'] ) && ! empty( $row_data['product_tags'] ) ) : ?>
            <tr>
                <th><?php esc_html_e( 'Tags:', 'wc-vendors' ); ?></th>
                <td>
                    <?php foreach ( $row_data['product_tags'] as $ptag ) : ?>
                        <a class="wcv-product-tag" href="<?php echo esc_url( $ptag['url'] ); ?>"><?php echo esc_html( $ptag['name'] ); ?></a>
                    <?php endforeach; ?>
                </td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>
