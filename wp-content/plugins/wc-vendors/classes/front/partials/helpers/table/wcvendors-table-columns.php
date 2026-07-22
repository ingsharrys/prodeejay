<?php

/**
 * Table header code
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://www.wcvendors.com
 * @since      1.0.0
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

$time               = time();
$wcv_svg_link       = WCV_ASSETS_URL . 'svg/wcv-icons.svg?t=' . $time . '#';
$column_label_class = apply_filters( "wcvendors_table_columns_label_{$this->id}_class", 'wcv-table-col-label' );
?>

<!-- Output the table header -->
<thead>
<tr>
    <?php foreach ( $this->columns as $key => $column ) : ?>
        <?php
        if ( 'id' === $key || 'ID' === $key ) {
            continue;
        }
        ?>
        <?php if ( is_array( $column ) ) : ?>
            <th class="<?php echo esc_attr( $key ); ?>" style="<?php echo isset( $column['style'] ) ? esc_attr( $column['style'] ) : ''; ?>">
                <div class="wcv-table-col-wrap">
                    <?php if ( isset( $column['icon'] ) && ! empty( $column['icon'] ) ) : ?>
                        <svg class="wcv-icon wcv-table-icon" aria-hidden="true" role="img">
                            <use xlink:href="<?php echo esc_url( $wcv_svg_link . $column['icon'] ); ?>"></use>
                        </svg>
                    <?php endif; ?>
                    <span class="<?php echo esc_attr( $column_label_class ); ?>"><?php echo esc_html( $column['label'] ); ?></span>
                </div>
            </th>
        <?php else : ?>
            <th class="<?php echo esc_attr( $key ); ?>" style="<?php echo isset( $column['style'] ) ? esc_attr( $column['style'] ) : ''; ?>">
                <span class="<?php echo esc_attr( $column_label_class ); ?>"><?php echo esc_html( $column ); ?></span>
            </th>
        <?php endif; ?>
    <?php endforeach; ?>
</tr>
</thead>
