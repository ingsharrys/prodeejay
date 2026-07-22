<?php
/**
 * WCV_Product_Dropdown_Walker class.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */
namespace WC_Vendors\Classes\Includes;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * WCV_Product_Dropdown_Walker class.
 */
class WCV_Product_Dropdown_Walker extends \Walker {

    /**
     * Tree type.
     *
     * @var string $tree_type
     * @since 2.5.2
     */
    public $tree_type = 'category';

    /**
     * Database fields.
     *
     * @var array $db_fields
     * @since 2.5.2
     */
    public $db_fields = array(
        'parent' => 'parent',
        'id'     => 'term_id',
        'slug'   => 'slug',
    );

    /**
     * Start the element output.
     *
     * @see   Walker::start_el()
     *
     * @param string  $output Passed by reference. Used to append additional content.
     * @param object  $cat    Category data object.
     * @param int     $depth  Depth of category in reference to parents.
     * @param array   $args   An array of arguments.
     * @param integer $current_object_id ID of the current object.
     * @since 2.5.2
     */
    public function start_el( &$output, $cat, $depth = 0, $args = array(), $current_object_id = 0 ) {

        if ( ! empty( $args['hierarchical'] ) ) {
            $pad = str_repeat( '&nbsp;', $depth * 3 );
        } else {
            $pad = '';
        }

        $cat_name = apply_filters( 'list_product_cats', $cat->name, $cat );

        $value = isset( $args['value'] ) && 'id' === $args['value'] ? $cat->term_id : $cat->slug;

        $output .= "\t<option class=\"level-$depth\" value=\"" . $value . '"';

        if ( $value === $args['selected'] || ( is_array( $args['selected'] ) && in_array( $value, $args['selected'], true ) ) ) {
            $output .= ' selected="selected"';
        }

        $output .= '>';

        $output .= $pad . __( $cat_name, 'wc-vendors' ); //phpcs:ignore

        if ( ! empty( $args['show_count'] ) ) {
            $output .= '&nbsp;(' . $cat->count . ')';
        }

        $output .= "</option>\n";
    }
}
