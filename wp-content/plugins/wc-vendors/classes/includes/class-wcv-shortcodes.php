<?php
/**
 * WCV_Shortcodes class.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_query
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_tax_query
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_key
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 *
 * @class          WCV_Shortcodes
 * @version        1.0.0
 * @package        WCVendors/Classes
 * @category       Class
 * @author         WC Vendors (Jamie Madden http://github.com/digitalchild)
 */
class WCV_Shortcodes {

    /**
     * Has products.
     *
     * @var bool $has_products True if the vendor has products.
     */
    public $has_products = false;

    /**
     * Current category separator for product categories display.
     *
     * @var string $category_separator The separator to use between categories.
     */
    public static $category_separator = ', ';

    /**
     * Initialize shortcodes
     */
    public function __construct() {
        // Define shortcodes.
        // Recent Products.
        add_shortcode( 'wcv_recent_products', array( $this, 'recent_products' ) );
        // Products by vendor.
        add_shortcode( 'wcv_products', array( $this, 'products' ) );
        // Featured products by vendor.
        add_shortcode( 'wcv_featured_products', array( $this, 'featured_products' ) );
        // Sale products by vendor.
        add_shortcode( 'wcv_sale_products', array( $this, 'sale_products' ) );
        // Top Rated products by vendor.
        add_shortcode( 'wcv_top_rated_products', array( $this, 'top_rated_products' ) );
        // Best Selling product.
        add_shortcode( 'wcv_best_selling_products', array( $this, 'best_selling_products' ) );
        // List products in a category shortcode.
        add_shortcode( 'wcv_product_category', array( $this, 'product_category' ) );
        // List of paginated vendors.
        add_shortcode( 'wcv_vendorslist', array( $this, 'wcv_vendorslist' ) );
        // Show the sold by label based on the product page.
        add_shortcode( 'wcv_sold_by', array( $this, 'wcv_sold_by' ) );

        // Vendor list actions.
        add_action( 'wcvendors_before_vendor_list', 'wcv_before_vendor_list', 10, 1 );
        add_action( 'wcvendors_after_vendor_list', 'wcv_after_vendor_list' );
        add_action( 'wcvendors_vendor_list_filter', 'wcv_vendor_list_filter', 10, 3 );
        add_action( 'wcvendors_vendor_list_loop', 'wcv_vendor_list_loop', 10, 1 );
        add_action( 'wp_head', array( 'WCV_Shortcodes', 'output_category_css' ), 999 );
    }

    /**
     * Get vendor by username, user ID, or slug.
     *
     * @param string|int $vendor_identifier The vendor identifier (username, user ID, or slug).
     * @return int The vendor ID or 0 if not found.
     */
    public static function get_vendor( $vendor_identifier ) {
        $vendor_identifier = sanitize_text_field( $vendor_identifier );

        if ( empty( $vendor_identifier ) ) {
            return 0;
        }

        $user = null;

        // Try by user ID first (most efficient for numeric values).
        if ( is_numeric( $vendor_identifier ) ) {
            $user_id = absint( $vendor_identifier );
            if ( $user_id > 0 ) {
                $user = get_user_by( 'ID', $user_id );
            }
        }

        // Try by username (login) if not found by ID.
        if ( ! $user ) {
            $user = get_user_by( 'login', $vendor_identifier );
        }

        // Try by slug (nicename) if not found by username.
        if ( ! $user ) {
            $user = get_user_by( 'slug', $vendor_identifier );
        }

        // Return vendor ID if user exists and has vendor capability.
        if ( $user && user_can( $user->ID, 'vendor' ) ) {
            return (int) $user->ID;
        }

        return 0;
    }

    /**
     * Get recent products based on vendor username, user ID, or slug
     *
     * @param array|string $atts The shortcode attributes.
     * @return string
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function recent_products( $atts ) {

        global $woocommerce_loop;

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'per_page'           => '12',
                    'vendor'             => '',
                    'columns'            => '4',
                    'orderby'            => 'date',
                    'order'              => 'desc',
                    'limit'              => '',
                    'category'           => 'no',
                    'category_separator' => ', ',
                ),
                $atts
            )
        );

        $vendor = self::get_vendor( $atts['vendor'] );

        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise use per_page.
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : absint( $per_page );

        $meta_query = WC()->query->get_meta_query();

        $args = array(
            'post_type'           => 'product',
            'post_status'         => 'publish',
            'author'              => $vendor,
            'ignore_sticky_posts' => 1,
            'posts_per_page'      => $posts_per_page,
            'orderby'             => $orderby,
            'order'               => $order,
            'meta_query'          => $meta_query,
        );

        ob_start();

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        // Hook to display categories if enabled.
        $show_categories = wc_string_to_bool( $category );
        if ( $show_categories ) {
            self::setup_category_display( $category_separator );
        }

        if ( $products->have_posts() ) : ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php endwhile; // end of the loop. ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        // Remove the hook after rendering products.
        if ( $show_categories ) {
            self::remove_category_display();
        }

        wp_reset_postdata();

        return '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';
    }

    /**
     * List all products for a vendor shortcode
     *
     * @access public
     *
     * @param array|string $atts The shortcode attributes.
     *
     * @return string
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function products( $atts ) {

        global $woocommerce_loop;

        if ( empty( $atts ) ) {
            return '';
        }

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'vendor'             => '',
                    'columns'            => '4',
                    'orderby'            => 'title',
                    'order'              => 'asc',
                    'limit'              => '',
                    'category'           => 'no',
                    'category_separator' => ', ',
                ),
                $atts
            )
        );

        $vendor = self::get_vendor( $atts['vendor'] );

        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise show all products (-1).
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : -1;

        $meta_query = WC()->query->get_meta_query();

        $args = array(
            'post_type'           => 'product',
            'post_status'         => 'publish',
            'author'              => $vendor,
            'ignore_sticky_posts' => 1,
            'orderby'             => $orderby,
            'order'               => $order,
            'posts_per_page'      => $posts_per_page,
            'meta_query'          => $meta_query,
        );

        if ( isset( $atts['skus'] ) ) {
            $skus                 = explode( ',', $atts['skus'] );
            $skus                 = array_map( 'trim', $skus );
            $args['meta_query'][] = array(
                'key'     => '_sku',
                'value'   => $skus,
                'compare' => 'IN',
            );
        }

        if ( isset( $atts['ids'] ) ) {
            $ids              = explode( ',', $atts['ids'] );
            $ids              = array_map( 'trim', $ids );
            $args['post__in'] = $ids;
        }

        ob_start();

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        // Hook to display categories if enabled.
        $show_categories = wc_string_to_bool( $category );
        if ( $show_categories ) {
            self::setup_category_display( $category_separator );
        }

        if ( $products->have_posts() ) :
            ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php
            endwhile; // end of the loop.
            ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        // Remove the hook after rendering products.
        if ( $show_categories ) {
            self::remove_category_display();
        }

        wp_reset_postdata();

        return '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';
    }


    /**
     * Display product categories in the product loop.
     *
     * @access public
     * @static
     *
     * @return void
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function display_product_categories() {

        global $product;

        if ( ! $product ) {
            return;
        }

        $categories = wc_get_product_category_list(
            $product->get_id(),
            self::$category_separator,
            '<div class="wcv-product-categories">',
            '</div>'
        );

        if ( $categories ) {
            echo wp_kses_post( $categories );
        }
    }

    /**
     * Setup category display hook with custom separator.
     *
     * @access public
     * @static
     *
     * @param string $category_separator The separator to use between categories.
     * @return void
     *
     * @since 2.6.4
     */
    public static function setup_category_display( $category_separator = ', ' ) {
        // Set the category separator for this shortcode instance.
        self::$category_separator = $category_separator;
        add_action( 'woocommerce_shop_loop_item_title', array( 'WCV_Shortcodes', 'display_product_categories' ), 6 );
    }

    /**
     * Remove category display hook.
     *
     * @access public
     * @static
     *
     * @return void
     *
     * @since 2.6.4
     */
    public static function remove_category_display() {
        remove_action( 'woocommerce_shop_loop_item_title', array( 'WCV_Shortcodes', 'display_product_categories' ), 6 );
    }

    /**
     * Output category display CSS if not already output.
     *
     * @access public
     * @static
     *
     * @return void
     *
     * @since 2.6.4
     */
    public static function output_category_css() {
        $list_of_shortcodes = array( 'wcv_recent_products', 'wcv_products', 'wcv_featured_products', 'wcv_sale_products', 'wcv_top_rated_products', 'wcv_best_selling_products' );

        $has_shortcode = false;

        if ( is_singular() ) {
            $post = get_post();
            if ( $post && $post->post_content ) {
                foreach ( $list_of_shortcodes as $shortcode ) {
                    if ( has_shortcode( $post->post_content, $shortcode ) ) {
                        $has_shortcode = true;
                    }
                }
            }
        }

        if ( $has_shortcode ) {
            echo '<style id="wcv-product-categories-css">' . wp_kses_post( self::get_category_css() ) . '</style>';
        }
    }

    /**
     * Get category display CSS with customization options.
     *
     * @access public
     * @static
     *
     * @return string The CSS styles.
     *
     * @since 2.6.4 - Added CSS for product categories.
     */
    public static function get_category_css() {
        $default_styles = array(
            'margin'          => '0',
            'font_size'       => '1rem',
            'line_height'     => '1.4',
            'color'           => '#666666',
            'link_color'      => '#666666',
            'link_hover'      => '#0073aa',
            'font_weight'     => '400',
            'text_transform'  => 'none',
            'letter_spacing'  => '0',
            'display'         => 'inline-block',
            'margin_right'    => '0',
            'padding'         => '0',
            'border_radius'   => '0',
            'background'      => 'transparent',
            'border'          => 'none',
            'text_decoration' => 'none',
        );

        // Allow customization through filter.
        $styles = apply_filters( 'wcv_product_categories_styles', $default_styles );

        // Validate that the filtered value is an array, fallback to defaults if not.
        if ( ! is_array( $styles ) ) {
            $styles = $default_styles;
        }

        // Merge with defaults to ensure all required keys exist.
        $styles = wp_parse_args( $styles, $default_styles );

        $css = "
        .wcv-product-categories {
            margin: {$styles['margin']};
            font-size: {$styles['font_size']};
            line-height: {$styles['line_height']};
            color: {$styles['color']};
            font-weight: {$styles['font_weight']};
            text-transform: {$styles['text_transform']};
            letter-spacing: {$styles['letter_spacing']};
        }
        
        .wcv-product-categories a {
            display: {$styles['display']};
            color: {$styles['link_color']};
            text-decoration: {$styles['text_decoration']};
            margin-right: {$styles['margin_right']};
            padding: {$styles['padding']};
            border-radius: {$styles['border_radius']};
            background: {$styles['background']};
            border: {$styles['border']};
            font-weight: inherit;
            transition: color 0.2s ease, background-color 0.2s ease;
        }
        
        .wcv-product-categories a:hover,
        .wcv-product-categories a:focus {
            color: {$styles['link_hover']};
            text-decoration: underline;
        }
        
        .wcv-product-categories a:last-child {
            margin-right: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .wcv-product-categories {
                font-size: calc({$styles['font_size']} * 0.9);
                margin: calc({$styles['margin']} * 0.8);
            }
        }
        ";

        // Allow complete CSS override through filter.
        return apply_filters( 'wcv_product_categories_css', $css, $styles );
    }


    /**
     * Output featured products
     *
     * @access public
     *
     * @param array|string $atts The shortcode attributes.
     *
     * @return string
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function featured_products( $atts ) {

        global $woocommerce_loop;

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'vendor'             => '',
                    'per_page'           => '12',
                    'columns'            => '4',
                    'orderby'            => 'date',
                    'order'              => 'desc',
                    'limit'              => '',
                    'category'           => 'no',
                    'category_separator' => ', ',
                ),
                $atts
            )
        );

        $vendor = self::get_vendor( $atts['vendor'] );
        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise use per_page.
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : absint( $per_page );

        $meta_query  = WC()->query->get_meta_query();
        $tax_query   = WC()->query->get_tax_query();
        $tax_query[] = array(
            'taxonomy' => 'product_visibility',
            'field'    => 'name',
            'terms'    => 'featured',
            'operator' => 'IN',
        );

        $args = array(
            'post_type'           => 'product',
            'author'              => $vendor,
            'post_status'         => 'publish',
            'ignore_sticky_posts' => 1,
            'posts_per_page'      => $posts_per_page,
            'orderby'             => $orderby,
            'order'               => $order,
            'meta_query'          => $meta_query,
            'tax_query'           => $tax_query,
        );

        ob_start();

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        // Hook to display categories if enabled.
        $show_categories = wc_string_to_bool( $category );
        if ( $show_categories ) {
            self::setup_category_display( $category_separator );
        }

        if ( $products->have_posts() ) :
            ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php
            endwhile; // end of the loop.
            ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        // Remove the hook after rendering products.
        if ( $show_categories ) {
            self::remove_category_display();
        }

        wp_reset_postdata();

        return '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';
    }

    /**
     * List all products on sale
     *
     * @access public
     *
     * @param array|string $atts The shortcode attributes.
     *
     * @return string
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function sale_products( $atts ) {

        global $woocommerce_loop;

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'vendor'             => '',
                    'per_page'           => '12',
                    'columns'            => '4',
                    'orderby'            => 'title',
                    'order'              => 'asc',
                    'limit'              => '',
                    'category'           => 'no',
                    'category_separator' => ', ',
                ),
                $atts
            )
        );

        $vendor = self::get_vendor( $atts['vendor'] );
        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise use per_page.
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : absint( $per_page );

        // Get products on sale.
        $product_ids_on_sale = wc_get_product_ids_on_sale();

        $meta_query   = array();
        $meta_query[] = WC()->query->visibility_meta_query();
        $meta_query[] = WC()->query->stock_status_meta_query();
        $meta_query   = array_filter( $meta_query );

        $args = array(
            'posts_per_page' => $posts_per_page,
            'author'         => $vendor,
            'orderby'        => $orderby,
            'order'          => $order,
            'no_found_rows'  => 1,
            'post_status'    => 'publish',
            'post_type'      => 'product',
            'meta_query'     => $meta_query,
            'post__in'       => array_merge( array( 0 ), $product_ids_on_sale ),
        );

        ob_start();

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        // Hook to display categories if enabled.
        $show_categories = wc_string_to_bool( $category );
        if ( $show_categories ) {
            self::setup_category_display( $category_separator );
        }

        if ( $products->have_posts() ) :
            ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php
            endwhile; // end of the loop.
            ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        // Remove the hook after rendering products.
        if ( $show_categories ) {
            self::remove_category_display();
        }

        wp_reset_postdata();

        return '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';
    }

    /**
     * List top rated products on sale by vendor
     *
     * @access public
     *
     * @param array|string $atts The shortcode attributes.
     *
     * @return string
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function top_rated_products( $atts ) {

        global $woocommerce_loop;

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'vendor'             => '',
                    'per_page'           => '12',
                    'columns'            => '4',
                    'orderby'            => 'title',
                    'order'              => 'asc',
                    'limit'              => '',
                    'category'           => 'no',
                    'category_separator' => ', ',
                ),
                $atts
            )
        );

        $vendor = self::get_vendor( $atts['vendor'] );
        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise use per_page.
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : absint( $per_page );

        $meta_query = WC()->query->get_meta_query();

        $args = array(
            'post_type'           => 'product',
            'author'              => $vendor,
            'post_status'         => 'publish',
            'ignore_sticky_posts' => 1,
            'orderby'             => $orderby,
            'order'               => $order,
            'posts_per_page'      => $posts_per_page,
            'meta_query'          => $meta_query,
        );

        ob_start();

        add_filter( 'posts_clauses', array( 'WC_Shortcodes', 'order_by_rating_post_clauses' ) );

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        remove_filter( 'posts_clauses', array( 'WC_Shortcodes', 'order_by_rating_post_clauses' ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        // Hook to display categories if enabled.
        $show_categories = wc_string_to_bool( $category );
        if ( $show_categories ) {
            self::setup_category_display( $category_separator );
        }

        if ( $products->have_posts() ) :
            ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php
            endwhile; // end of the loop.
            ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        // Remove the hook after rendering products.
        if ( $show_categories ) {
            self::remove_category_display();
        }

        wp_reset_postdata();

        return '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';
    }

    /**
     * List best selling products on sale per vendor
     *
     * @access public
     *
     * @param array $atts The shortcode attributes.
     *
     * @return string
     *
     * @since 2.6.4 - Added category and category_separator.
     */
    public static function best_selling_products( $atts ) {

        global $woocommerce_loop;

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'vendor'             => '',
                    'per_page'           => '12',
                    'columns'            => '4',
                    'limit'              => '',
                    'category'           => 'no',
                    'category_separator' => ', ',
                ),
                $atts
            )
        );

        $vendor = self::get_vendor( $atts['vendor'] );
        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise use per_page.
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : absint( $per_page );

        $args = array(
            'post_type'           => 'product',
            'post_status'         => 'publish',
            'author'              => $vendor,
            'ignore_sticky_posts' => 1,
            'posts_per_page'      => $posts_per_page,
            'meta_key'            => 'total_sales',
            'orderby'             => 'meta_value_num',
            'meta_query'          => array(
                array(
                    'key'     => '_visibility',
                    'value'   => array( 'catalog', 'visible' ),
                    'compare' => 'IN',
                ),
            ),
        );

        ob_start();

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        // Hook to display categories if enabled.
        $show_categories = wc_string_to_bool( $category );
        if ( $show_categories ) {
            self::setup_category_display( $category_separator );
        }

        if ( $products->have_posts() ) :
            ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php
            endwhile; // end of the loop.
            ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        // Remove the hook after rendering products.
        if ( $show_categories ) {
            self::remove_category_display();
        }

        wp_reset_postdata();

        return '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';
    }

    /**
     * List products in a category shortcode
     *
     * @access public
     *
     * @param array|string $atts The shortcode attributes.
     *
     * @return string
     */
    public static function product_category( $atts ) {

        global $woocommerce_loop;

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'vendor'   => '',
                    'per_page' => '12',
                    'columns'  => '4',
                    'orderby'  => 'title',
                    'order'    => 'desc',
                    'category' => '',  // Slugs.
                    'operator' => 'IN', // Possible values are 'IN', 'NOT IN', 'AND'.
                    'limit'    => '',
                ),
                $atts
            )
        );

        if ( ! $category ) {
            return '';
        }

        $vendor = self::get_vendor( $atts['vendor'] );
        if ( ! $vendor ) {
            return '';
        }

        // Use limit if provided, otherwise use per_page.
        $posts_per_page = ! empty( $limit ) ? absint( $limit ) : absint( $per_page );

        // Default ordering args.
        $ordering_args = WC()->query->get_catalog_ordering_args( $orderby, $order );

        $args = array(
            'post_type'           => 'product',
            'post_status'         => 'publish',
            'author'              => $vendor,
            'ignore_sticky_posts' => 1,
            'orderby'             => $ordering_args['orderby'],
            'order'               => $ordering_args['order'],
            'posts_per_page'      => $posts_per_page,
            'tax_query'           => array(
                array(
                    'taxonomy' => 'product_visibility',
                    'field'    => 'name',
                    'terms'    => 'exclude-from-catalog',
                    'operator' => 'NOT IN',
                ),
                array(
                    array(
                        'taxonomy' => 'product_cat',
                        'terms'    => array_map( 'sanitize_title', explode( ',', $category ) ),
                        'field'    => 'slug',
                        'operator' => $operator,
                    ),
                ),
            ),
        );

        if ( isset( $ordering_args['meta_key'] ) ) {
            $args['meta_key'] = $ordering_args['meta_key'];
        }

        ob_start();

        $args     = apply_filters_deprecated( 'wcv_shortcode_products_query', array( $args, $atts ), '2.3.0', 'wcvendors_shortcode_products_query' );
        $products = new WP_Query( apply_filters( 'wcvendors_shortcode_products_query', $args, $atts ) );

        $woocommerce_loop['columns'] = esc_attr( $columns );

        if ( $products->have_posts() ) :
            ?>

            <?php woocommerce_product_loop_start(); ?>

            <?php
            while ( $products->have_posts() ) :
            $products->the_post();
            ?>

            <?php wc_get_template_part( 'content', 'product' ); ?>

            <?php
            endwhile; // end of the loop.
            ?>

            <?php woocommerce_product_loop_end(); ?>

            <?php
        endif;

        wc_reset_loop();
        wp_reset_postdata();

        $return = '<div class="woocommerce columns-' . esc_attr( $columns ) . '">' . ob_get_clean() . '</div>';

        // Remove ordering query arguments.
        WC()->query->remove_ordering_args();

        return $return;
    }

    /**
     * Get vendors with products
     *
     * Get vendors with public or private products.
     */
    public function vendors_with_products() {

        global $wpdb;

        $query = ' INNER JOIN (
            SELECT post_author, COUNT(*) as product_count
            FROM ' . $wpdb->prefix . 'posts
            WHERE post_type = "product" AND (post_status = "publish" OR post_status = "private")
            GROUP BY post_author
        ) product_counts ON ' . $wpdb->prefix . 'wp_users.ID = product_counts.post_author AND product_counts.product_count > 0';

        return $query;
    }

    /**
     * List of vendors
     *
     * @param array $atts shortcode attributes.
     * @version 2.5 Fix pagination conflict with display mode
     * @return string
     */
    public function wcv_vendorslist( $atts ) {
        global $wpdb;
        // phpcs:disable
        $html                     = '';
        $list_display_type_option = get_option( 'wcvendors_display_vendors_list_type', 'grid' );
        if ( ! in_array( $list_display_type_option, array( 'grid', 'list' ), true ) ) {
            $list_display_type_option = 'grid';
        }
        $list_display_type        = isset( $_GET['display_mode'] ) ? sanitize_text_field( $_GET['display_mode'] ) : $list_display_type_option;
        $search_term              = isset( $_GET['search'] ) ? sanitize_text_field( $_GET['search'] ) : '';
        // phpcs:enable
        if ( isset( $atts['show_products'] ) ) {
            wc_deprecated_argument(
                'wcv_vendorslist',
                '2.1.17',
                sprintf(
                // translators: %s: version number.
                    __(
                        'The "show_products" argument will be removed in version %s. Please update to use "has_products".',
                        'wc-vendors'
                    ),
                    '3.0.0'
                )
            );
            $atts['has_products'] = $atts['show_products'];
            unset( $atts['show_products'] );
        }

        $atts = array_map( 'sanitize_text_field', $atts );

        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'orderby'      => 'registered',
                    'order'        => 'ASC',
                    'per_page'     => '12',
                    'columns'      => '4',
                    'has_products' => 'no',
                ),
                $atts
            )
        );

        $paged  = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
        $offset = ( $paged - 1 ) * $per_page;
        if ( ! is_numeric( $per_page ) ) {
            $per_page = 12;
        }

        if ( ! is_numeric( $columns ) ) {
            $columns = 4;
        }

        // Validate and set orderby parameter.
        $valid_orderby = array( 'registered', 'post_count', 'random' );
        $orderby       = in_array( $orderby, $valid_orderby, true ) ? $orderby : 'registered';

        // Validate and set order parameter.
        $order = in_array( $order, array( 'ASC', 'DESC' ), true ) ? $order : 'ASC';

        // Clean and sanitize search terms.
        $search_term = stripslashes( sanitize_text_field( $search_term ) );

        // Build the SQL query in smaller pieces with proper escaping.
        // Start with the basic query with placeholders.
        $sql = $wpdb->prepare(
            "SELECT SQL_CALC_FOUND_ROWS u.ID, u.user_registered, COALESCE(pc.product_count, 0) AS product_count
            FROM {$wpdb->users} AS u
            LEFT JOIN (
                SELECT post_author, COUNT(*) AS product_count
                FROM {$wpdb->posts}
                WHERE post_type = 'product' AND post_status = 'publish'
                GROUP BY post_author
            ) AS pc ON u.ID = pc.post_author
            INNER JOIN {$wpdb->usermeta} AS um_role ON u.ID = um_role.user_id 
               AND um_role.meta_key = %s AND um_role.meta_value LIKE %s
            INNER JOIN {$wpdb->usermeta} AS um_slug ON u.ID = um_slug.user_id 
               AND um_slug.meta_key = 'pv_shop_slug' AND um_slug.meta_value != ''",
            $wpdb->prefix . 'capabilities',
            '%\"vendor\"%'
        );

        // Add search join if needed.
        if ( ! empty( $search_term ) ) {
            $sql .= " LEFT JOIN {$wpdb->usermeta} AS um_name ON u.ID = um_name.user_id AND um_name.meta_key = 'pv_shop_name'";
        }

        // Begin WHERE clause.
        $sql .= ' WHERE 1=1';

        // Add search condition if needed.
        if ( ! empty( $search_term ) ) {
            $escaped_term = '%' . $wpdb->esc_like( $search_term ) . '%';
            $sql         .= $wpdb->prepare(
                ' AND (um_slug.meta_value LIKE %s OR um_name.meta_value LIKE %s)',
                $escaped_term,
                $escaped_term
            );
        }

        // Add inactive vendor filter.
        $sql .= $wpdb->prepare(
            " AND u.ID NOT IN (
                SELECT um_status.user_id FROM {$wpdb->usermeta} AS um_status
                WHERE (um_status.meta_key = '_wcv_vendor_status' AND um_status.meta_value = 'inactive')
                OR (um_status.user_id IN (
                    SELECT user_id FROM {$wpdb->usermeta}
                    WHERE meta_key = %s AND meta_value LIKE %s
                ) AND NOT EXISTS (
                    SELECT 1 FROM {$wpdb->usermeta}
                    WHERE user_id = um_status.user_id AND meta_key = '_wcv_vendor_status'
                ))
            )",
            $wpdb->prefix . 'capabilities',
            '%\"vendor\"%'
        );

        // Add product count filter if needed.
        if ( 'yes' === $has_products ) {
            $sql .= ' AND pc.product_count > 0';
        }

        // Add GROUP BY.
        $sql .= ' GROUP BY u.ID';

        // Add ORDER BY.
        if ( 'post_count' === $orderby ) {
            $sql .= ' ORDER BY product_count ' . esc_sql( $order );
        } elseif ( 'random' === $orderby ) {
            $sql .= ' ORDER BY RAND()';
        } else {
            $sql .= ' ORDER BY u.user_registered ' . esc_sql( $order );
        }

        // Use the fully constructed SQL.
        $prepared_sql = $sql;

        // Check pagination for search results.
        if ( ! empty( $search_term ) ) {
            $check_sql = $prepared_sql . $wpdb->prepare( ' LIMIT %d, %d', 0, 0 );
            $wpdb->get_results( $check_sql ); // phpcs:ignore
            $total_check = $wpdb->get_var( 'SELECT FOUND_ROWS()' ); // phpcs:ignore
            if ( $total_check < $per_page ) {
                $offset = 0;
            }
        }

        // Get the paged vendors.
        $vendor_paged_sql = $prepared_sql . $wpdb->prepare( ' LIMIT %d, %d', $offset, $per_page );
        $paged_vendors = $wpdb->get_results( $vendor_paged_sql ); // phpcs:ignore
        $total_vendors = $wpdb->get_var( 'SELECT FOUND_ROWS()' ); // phpcs:ignore

        // Process vendor data.
        $vendors = array();
        foreach ( $paged_vendors as $vendor ) {
            $wp_u                = new stdClass();
            $wp_u->ID            = $vendor->ID;
            $wp_u->product_count = $vendor->product_count;

            // Get vendor meta in one efficient query instead of multiple calls.
            $vendor_meta = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    "SELECT meta_key, meta_value FROM {$wpdb->usermeta} WHERE user_id = %d",
                    $vendor->ID
                ),
                ARRAY_A
            );

            foreach ( $vendor_meta as $meta ) {
                $wp_u->{$meta['meta_key']} = maybe_unserialize( $meta['meta_value'] );
            }

            $vendors[] = $wp_u;
        }

        $total_vendors_paged = $total_vendors;
        $total_pages         = ceil( $total_vendors / $per_page );
        $current_page        = max( 1, get_query_var( 'paged' ) );

        // Render the template.
        ob_start();
        wc_get_template(
            'vendor-list.php',
            array(
                'display_mode'  => $list_display_type,
                'search_term'   => $search_term,
                'vendors_count' => $total_vendors_paged,
                'vendors_list'  => $vendors,
            ),
            'wc-vendors/front/',
            WCV_PLUGIN_DIR . 'templates/front/'
        );

        $html .= ob_get_clean();

        // Render pagination.
        if ( $total_pages > 1 ) {
            $html .= '<div class="woocommerce-pagination">';
            $big   = 999999999; // Need an unlikely integer.
            $html .= paginate_links(
                array(
                    'base'      => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
                    'format'    => 'page/%#%/',
                    'current'   => $current_page,
                    'total'     => $total_pages,
                    'prev_next' => false,
                    'type'      => 'list',
                )
            );
            $html .= '</div>';
        }

        return $html;
    }


    /**
     * Output a sold by link
     *
     * @param string|array $atts The shortcode attributes.
     *
     * @return string|void
     */
    public function wcv_sold_by( $atts ) {

        if ( ! is_product() ) {
            return;
        }

        $atts = shortcode_atts(
            array(
                'vendor_id'     => get_the_author_meta( 'ID' ),
            'sold_by_label'     => __( get_option( 'wcvendors_label_sold_by' ), 'wc-vendors' ), // phpcs:ignore
            'sold_by_separator' => __( get_option( 'wcvendors_label_sold_by_separator' ), 'wc-vendors' ), // phpcs:ignore
            ),
            $atts,
            'wcv_sold_by'
        );
        extract( $atts ); // phpcs:ignore 

        $sold_by = wcv_get_sold_by_link( $vendor_id, 'wcvendors_cart_sold_by_meta' );

        $cart_sold_by_label = apply_filters(
            'wcvendors_cart_sold_by_meta',
            $sold_by_label,
            get_the_ID(),
            $vendor_id
        );

        $sold_by_meta_separator = apply_filters(
            'wcvendors_cart_sold_by_meta_separator',
            $sold_by_separator,
            get_the_ID(),
            $vendor_id
        );

        return $cart_sold_by_label . '&nbsp;' . $sold_by_meta_separator . '&nbsp;' . $sold_by . '<br/>';
    }
}
