<?php
/**
 * WCV_Product_Category_Multilevel_Walker class.
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
 * WCV_Product_Category_Multilevel_Walker class.
 *
 * Enhanced walker for creating multi-level product category dropdowns
 * with better visual hierarchy and functionality.
 *
 * @since 2.6.2
 */
class WCV_Product_Category_Multilevel_Walker extends \Walker {

    /**
     * Tree type.
     *
     * @var string $tree_type
     * @since 2.6.2
     */
    public $tree_type = 'category';

    /**
     * Database fields.
     *
     * @var array $db_fields
     * @since 2.6.2
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
     * @param string  $output            Passed by reference. Used to append additional content.
     * @param object  $cat               Category data object.
     * @param int     $depth             Depth of category in reference to parents.
     * @param array   $args              An array of arguments.
     * @param integer $current_object_id ID of the current object.
     * @since 2.6.2
     */
    public function start_el( &$output, $cat, $depth = 0, $args = array(), $current_object_id = 0 ) {

        // Set default args if not provided.
        $args = wp_parse_args(
            $args,
            array(
                'hierarchical' => true,
                'show_count'   => false,
                'value'        => 'id',
                'selected'     => array(),
            )
        );

        // Apply category name filter.
        $cat_name = apply_filters( 'list_product_cats', $cat->name, $cat );

        // Determine the value to use (ID or slug).
        $value = isset( $args['value'] ) && 'slug' === $args['value'] ? $cat->slug : $cat->term_id;
        $value = (string) $value;

        // Start option tag.
        $output .= "\t<option class=\"level-$depth wcv-category-level-$depth\" value=\"" . esc_attr( $value ) . '"';

        // Handle selection.
        $selected_values = is_array( $args['selected'] ) ? $args['selected'] : array( $args['selected'] );

        if ( in_array( $value, $selected_values, true ) ) {
            $output .= ' selected="selected"';
        }

        // Add data attributes for enhanced functionality.
        $output .= ' data-depth="' . esc_attr( $depth ) . '"';
        $output .= ' data-parent="' . esc_attr( $cat->parent ) . '"';
        $output .= ' data-term-id="' . esc_attr( $cat->term_id ) . '"';
        $output .= ' data-slug="' . esc_attr( $cat->slug ) . '"';

        $output .= '>';

        // Build the display text.
        $display_text = esc_html( $cat_name );

        // Add count if requested.
        if ( ! empty( $args['show_count'] ) && isset( $cat->count ) ) {
            $display_text .= ' (' . $cat->count . ')';
        }

        $output .= $display_text;
        $output .= "</option>\n";
    }

    /**
     * Check if a category has children.
     *
     * @param object $cat  Category object.
     * @param array  $args Walker arguments.
     * @return bool True if category has children, false otherwise.
     * @since 2.6.2
     */
    private function has_children( $cat, $args ) {
        // Get child categories.
        $children = get_terms(
            array(
                'taxonomy'   => 'product_cat',
                'parent'     => $cat->term_id,
                'hide_empty' => false,
                'fields'     => 'ids',
            )
        );

        return ! empty( $children ) && ! is_wp_error( $children );
    }

    /**
     * Start the list before the elements are added.
     *
     * @see Walker::start_lvl()
     *
     * @param string $output Used to append additional content (passed by reference).
     * @param int    $depth  Depth of category in reference to parents.
     * @param array  $args   An array of arguments.
     * @since 2.6.2
     */
    public function start_lvl( &$output, $depth = 0, $args = array() ) {
        // Not used for select dropdowns, but implemented for completeness.
    }

    /**
     * End the list after the elements are added.
     *
     * @see Walker::end_lvl()
     *
     * @param string $output Used to append additional content (passed by reference).
     * @param int    $depth  Depth of category in reference to parents.
     * @param array  $args   An array of arguments.
     * @since 2.6.2
     */
    public function end_lvl( &$output, $depth = 0, $args = array() ) {
        // Not used for select dropdowns, but implemented for completeness.
    }

    /**
     * End the element output, if needed.
     *
     * @see Walker::end_el()
     *
     * @param string $output      Used to append additional content (passed by reference).
     * @param object $cat         Category data object.
     * @param int    $depth       Depth of category in reference to parents.
     * @param array  $args        An array of arguments.
     * @since 2.6.2
     */
    public function end_el( &$output, $cat, $depth = 0, $args = array() ) {
        // Not used for select dropdowns, but implemented for completeness.
    }
}
