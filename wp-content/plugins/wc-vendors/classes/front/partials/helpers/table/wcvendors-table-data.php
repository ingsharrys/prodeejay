<?php

/**
 * Table data template
 *
 * This file is used to display the table data
 *
 * @link       http://www.wcvendors.com
 * @since      2.5.2
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */

?>

<tbody>
<?php foreach ( $this->rows as $row ) : ?>

    <?php
    if ( isset( $row->action_before ) ) {
        echo $row->action_before; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
    ?>

    <tr>

        <?php foreach ( $this->columns as $key => $column ) : ?>

            <?php
            if ( strtolower( $key ) === 'id' ) {
                continue;
            }
            $class = '';

            ?>

            <?php if ( is_array( $column ) ) : ?>
                <?php $mobile_header = isset( $column['mobile_header'] ) ? $column['mobile_header'] : false; ?>
                <?php
                if ( isset( $column['full_span'] ) && true === $column['full_span'] ) {
                    $class = 'full-span';
                }
                ?>
                <?php if ( $mobile_header && true === $mobile_header ) : ?>
                    <td class="mobile-header" data-title="<?php echo esc_attr( $column['label'] ); ?>">
                        <?php if ( isset( $column['icon'] ) && ! empty( $column['icon'] ) ) : ?>
                            <?php echo wcv_get_icon( 'wcv-icon wcv-table-icon', $column['icon'] ); //phpcs:ignore ?>
                        <?php endif; ?>
                        <span><?php echo esc_html( $column['label'] ); ?></span>
                    </td>
                <?php endif; ?>

            <?php endif; ?>

            <td class="<?php echo esc_attr( $key ); ?> <?php echo esc_attr( $class ); ?>"><?php echo $row->$key; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                <!-- Row Action output -->
                <?php if ( $this->action_column === $key ) : ?>
                    <?php
                    if ( isset( $row->row_actions ) ) {
                        $this->actions = $row->row_actions;
                    }
                    ?>
                    <?php $this->display_actions( $row->ID ); ?>
                    <?php
                    if ( isset( $row->action_after ) ) {
                        echo $row->action_after; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    }
                    ?>
                <?php endif; ?>
            </td>

        <?php endforeach; ?>

    </tr>

<?php endforeach; ?>
</tbody>
