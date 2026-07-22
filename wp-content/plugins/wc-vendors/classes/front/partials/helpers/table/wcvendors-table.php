<?php

/**
 * Table template
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://www.wcvendors.com
 * @since      1.0.0
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable 	WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

$table_class = apply_filters( "wcvendors_table_{$this->id}_class", 'wcv-table wcvendors-table has-background' );
?>

<?php if ( $this->container_wrap ) : ?>
    <div class="wcv-cols-group wcv-horizontal-gutters wcv-gap-bottom">
    <div class="all-100">
<?php endif; ?>

    <table role="grid" class="wcvendors-table-<?php echo esc_attr( $this->id ); ?> <?php echo esc_attr( $table_class ); ?>">

        <?php $this->display_columns(); ?>
        <?php $this->display_rows(); ?>

    </table>

<?php if ( $this->container_wrap ) : ?>
    </div>
    </div>
<?php endif; ?>
