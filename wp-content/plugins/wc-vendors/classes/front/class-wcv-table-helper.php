<?php

/**
 * Table Helper Class
 *
 * Defines relevant methods for generating a display table for public facing pages.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_tax_query
 */
namespace WC_Vendors\Classes\Front;

/**
 * Table Helper Class
 *
 * Defines relevant methods for generating a display table for public facing pages.
 *
 * @package    WCVendors_Pro
 * @subpackage WCVendors_Pro/public
 * @author     Jamie Madden <support@wcvendors.com>
 */
class WCV_Table_Helper {

    /**
     * The ID of this plugin.
     *
     * @since    2.5.2
     * @access   private
     * @var      string $wcvendors_pro The ID of this plugin.
     */
    private $wcvendors_pro;

    /**
     * The version of this plugin.
     *
     * @since    2.5.2
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * The table id.
     *
     * @since    2.5.2
     * @access   private
     * @var      string $id The table id
     */
    private $id;

    /**
     * The tables header rows
     *
     * @since    2.5.2
     * @access   private
     * @var      array $columns The table columns
     */
    private $columns;

    /**
     * The table rows
     *
     * @since    2.5.2
     * @access   private
     * @var      array $rows The table rows
     */
    private $rows;

    /**
     * The tables row action
     *
     * @since    2.5.2
     * @access   private
     * @var      array $actions The table row actions
     */
    private $actions;

    /**
     * The column to display action
     *
     * @since    2.5.2
     * @access   private
     * @var      string $action_column The column key from $this->actions
     */
    private $action_column;

    /**
     * The post_type for this table
     *
     * @since    2.5.2
     * @access   private
     * @var      string $post_type The post type to display
     */
    private $post_type;

    /**
     * The vendor id of the products for this table
     *
     * @since    2.5.2
     * @access   private
     * @var      int $vendor The vendor id of the post type.
     */
    private $vendor_id;

    /**
     * The max number of pages for the results
     *
     * @since    2.5.2
     * @access   private
     * @var      int $vendor The vendor id of the post type.
     */
    public $max_num_pages;

    /**
     * The wrapper HTML element.
     *
     * @var string
     * @version 2.5.2
     * @since   2.5.2
     */
    public $container_wrap;

    /**
     * Quick links for the table
     *
     * @var array $quick_links
     *
     * @since 2.5.4
     * @version 2.5.4
     */
    public $quick_links;

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.5.2
     *
     * @param string $wcvendors_pro The name of the plugin.
     * @param string $version       The version of this plugin.
     * @param string $id            The table id used to reference the table.
     * @param string $post_type     The post type.
     * @param int    $vendor_id     The vendor id.
     */
    public function __construct( $wcvendors_pro, $version, $id, $post_type, $vendor_id ) {

        $this->wcvendors_pro  = $wcvendors_pro;
        $this->version        = $version;
        $this->id             = $id;
        $this->post_type      = $post_type;
        $this->vendor_id      = $vendor_id;
        $this->container_wrap = true;

        $this->set_defaults();
    }

    /**
     *  Set the defaults for the table
     *
     *  This sets up the default values for the different aspects of the table.
     *
     * @since    2.5.2
     * @since    2.6.1 - Fix extensions items not showing when product_status is set to all
     */
    public function set_defaults() {

        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

        $product_status = isset( $_GET['product_status'] ) ? sanitize_text_field( $_GET['product_status'] ) : ''; // phpcs:ignore
        $instock_status = array( 'instock', 'outofstock', 'onbackorder' );
        $post_status    = array( 'any' );

        // Default table rows.
        $args = array(
            'posts_per_page' => wcv_deprecated_filter( 'wcvendors_pro_table_post_per_page_' . $this->id, '2.5.2', 'wcvendors_table_post_per_page_' . $this->id,  20 ), //phpcs:ignore
            'post_type'      => $this->post_type,
            'author'         => $this->vendor_id,
            'post_status'    => $post_status,
            'paged'          => $paged,
            'tax_query'      => array(
                'relation' => 'AND',
            ),
        );
        if ( in_array( $product_status, $instock_status, true ) ) {

            $meta_query = array(
                array(
                    'key'     => '_stock_status',
                    'value'   => $product_status,
                    'compare' => '=',
                ),
            );

            $args['meta_query'][] = $meta_query;
        }

        if ( 'all' !== $product_status && ! empty( $product_status ) ) {
            $args['post_status'] = $product_status;
        }

        $args = wcv_deprecated_filter( 'wcvendors_pro_table_row_args_' . $this->id, '2.5.2', 'wcvendors_table_row_args_' . $this->id, $args );

        $results = new \WP_Query( $args );

        $this->rows = wcv_deprecated_filter( 'wcvendors_pro_table_rows_' . $this->id, '2.5.2', 'wcvendors_table_rows_' . $this->id, $results->posts, $results );

        // Default table columns.
        $this->columns = wcv_deprecated_filter(
            'wcvendors_pro_table_columns_' . $this->id,
            '2.5.2',
            'wcvendors_table_columns_' . $this->id,
            array(
                'ID'            => __( 'ID', 'wc-vendors' ),
                'post_title'    => __( 'Title', 'wc-vendors' ),
                'post_content'  => __( 'Description', 'wc-vendors' ),
                'post_modified' => __( 'Date Posted', 'wc-vendors' ),
            )
        );

        // Default table actions.
        $this->actions = wcv_deprecated_filter(
            'wcvendors_pro_table_actions_' . $this->id,
            '2.5.2',
            'wcvendors_table_actions_' . $this->id,
            array(
                'edit'   => array(
                    'label' => __( 'Edit', 'wc-vendors' ),
                    'url'   => '',
                ),
                'delete' => array(
                    'label' => __( 'Delete', 'wc-vendors' ),
                    'url'   => '',
                ),
                'view'   => array(
                    'label' => __( 'View', 'wc-vendors' ),
                    'url'   => '',
                ),
            )
        );

        // Which column to display the actions in by default.
        $this->action_column = wcv_deprecated_filter( 'wcvendors_pro_table_action_column_' . $this->id, '2.5.2', 'wcvendors_table_action_column_' . $this->id, 'post_title' );
    }

    /**
     *  Set the table columns
     *
     *  Associative array in the format 'name' => __('Label', 'wc-vendors' )
     *
     * @since    2.5.2
     *
     * @param    array $columns The table columns.
     */
    public function set_columns( $columns ) {

        $this->columns = $columns;
    }

    /**
     *  Get the table columns
     *
     *  Associative array in the format 'name' => __('Label', 'wc-vendors' )
     *
     * @since    2.5.2
     * @return   array $columns The table columns.
     */
    public function get_columns() {

        return $this->columns;
    }

    /**
     *  Set the table data
     *
     * @since    2.5.2
     *
     * @param    array $rows The table data.
     */
    public function set_rows( $rows ) {

        $this->rows = $rows;
    }

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.5.2
     * @return     array    The table rows
     */
    public function get_rows() {

        return $this->rows;
    }

    /**
     *  Set the table actions
     *
     * @since    2.5.2
     *
     * @param    array $actions The table row actions.
     */
    public function set_actions( $actions = null ) {

        $this->actions = $actions;
    }

    /**
     *  Get the table actions
     *
     * @since    2.5.2
     * @return   array     $actions     The table row actions
     */
    public function get_actions() {

        return $this->actions;
    }

    /**
     *  Set the column the actions are displayed in
     *
     * @since 2.5.2
     *
     * @param string $action_column The column key actions will be displayed in.
     */
    public function set_action_column( $action_column ) {

        $this->action_column = $action_column;
    }

    /**
     *  Set the column the actions are displayed in
     *
     * @since    2.5.2
     */
    public function get_action_column() {
        return $this->action_column;
    }

    /**
     * Get action URL
     *
     * @param string $object_id The object ID.
     * @return string
     * @since    2.5.2
     */
    public function get_action_url( $object_id ) {
        return \WCV_Vendor_Dashboard::get_dashboard_page_url( $this->post_type . '/' . $object_id );
    }

    /**
     *  Display the table
     *
     * @since    2.5.2
     */
    public function display() {

        // Get the rows from the database.
        $this->get_rows();
        // Set the table columns.
        $this->get_columns();
        // Set the row actions.
        $this->get_actions();
        // Set the action column.
        $this->get_action_column();

        // display the table.
        wcv_deprecated_filter( 'wcvendors_pro_table_before_' . $this->id, '2.5.2', 'wcvendors_table_before_' . $this->id, $this->id, 'before' );

        $no_data_notice = wcv_deprecated_filter(
            'wcvendors_pro_table_no_data_notice_' . $this->id,
            '2.5.2',
            'wcvendors_table_no_data_notice_' . $this->id,
            sprintf(
                // translators: %s is the table id.
                __( "No %s's found", 'wc-vendors' ),
                $this->id
            )
        );

        if ( $this->has_rows() ) {
            $table_path = wcv_deprecated_filter( 'wcvendors_pro_table_path', '2.5.2', 'wcvendors_table_path', 'partials/helpers/table/wcvendors-table.php' );
            include $table_path;
        } else {
            $no_data_path = wcv_deprecated_filter( 'wcvendors_pro_table_no_data_path', '2.5.2', 'wcvendors_table_no_data_path', 'partials/helpers/table/wcvendors-table-nodata.php' );
            include $no_data_path;
        }
        wcv_deprecated_action( 'wcvendors_pro_table_after_' . $this->id, '2.5.2', 'wcvendors_table_after_' . $this->id, $this->id, 'after' );
    }

    /**
     *  Display the table columns
     *
     * @since    2.5.2
     */
    public function display_columns() {
        $path = wcv_deprecated_filter( 'wcvendors_pro_table_display_columns_path', '2.5.2', 'wcvendors_table_display_columns_path', 'partials/helpers/table/wcvendors-table-columns.php' );
        include $path;
    }

    /**
     * Display the table rows
     *
     * @return void
     * @since    2.5.2
     */
    public function display_rows() {
        $path = wcv_deprecated_filter( 'wcvendors_pro_table_display_rows_path', '2.5.2', 'wcvendors_table_display_rows_path', 'partials/helpers/table/wcvendors-table-data.php' );
        include $path;
    }

    /**
     *  Display the table columns
     *
     * @param string $object_id The object ID.
     * @since    2.5.2
     */
    public function display_actions( $object_id ) { //phpcs:ignore
        include wcv_deprecated_filter( 'wcvendors_pro_table_display_actions_path', '2.5.2', 'wcvendors_table_display_actions_path', 'partials/helpers/table/wcvendors-table-actions.php' );
    }

    /**
     *  Does the table have any data
     *
     * @since    2.5.2
     * @return   bool   Returns a boolean indicating whether there is any table data.
     */
    public function has_rows() {
        return array_filter( $this->rows );
    }

    /**
     * Set quick links for the table
     *
     * @param array $quick_links Quick links for the table.
     */
    public function set_quick_links( $quick_links ) {
        $this->quick_links = $quick_links;
    }
}
