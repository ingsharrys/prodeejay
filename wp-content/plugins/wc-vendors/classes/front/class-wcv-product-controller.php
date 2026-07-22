<?php

/**
 * Product Controller Class
 *
 * Defines relevant methods for generating a display table for public facing pages.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
 * @phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_key
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_value
 * @phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_query
 */
namespace WC_Vendors\Classes\Front;

use function WC_Vendors\Classes\Includes\wcv_get_product_types;
use function WC_Vendors\Classes\Includes\wcv_strip_html;
use function WC_Vendors\Classes\Includes\wcv_md5_attachment_url;
/**
 * The main WC Vendors Product Controller class
 *
 * This is the main controller class for products, all actions are defined in this class.
 *
 * @phpcs:disable WordPress.Security.NonceVerification.Missing
 */
class WCV_Product_Controller {

    /**
     * Max number of pages for pagination
     *
     * @since    1.2.4
     * @access   public
     * @var      int $max_num_pages interger for max number of pages for the query
     */
    public $max_num_pages;

    /**
     * Allow HTML markup in forms
     *
     * @since    1.3.3
     * @access   private
     * @var      string $allow_markup boolean option to allow mark up in forms
     */
    private $allow_markup;

    /**
     * Is the ratings table name
     *
     * @since    2.5.2
     * @access   public
     * @var      string $table_name name of the ratings table
     */
    public $table_name;

    /**
     * Date format
     *
     * @since 2.5.4
     *
     * @var string $date_format date format for the date picker
     */
    public $date_format;

    /**
     * Is Pro active
     *
     * @since 2.5.6
     *
     * @var boolean $is_pro_active
     */
    public $is_pro_active;

    /**
     * Product status
     *
     * @since 2.5.6
     *
     * @var array $product_status
     */
    public $product_statuses;

    /**
     * Allow vendor to purchase their own products
     *
     * @since 2.6.1
     *
     * @var boolean $allow_vendor_purchase_own_products
     */
    public $allow_vendor_purchase_own_products;

    /**
     * Allow vendor to review their own products
     *
     * @since 2.6.1
     *
     * @var boolean $allow_vendor_review_own_products
     */
    public $allow_vendor_review_own_products;

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.5.2
     */
    public function __construct() {
        global $wpdb;
        $this->table_name                         = $wpdb->prefix . 'wcv_feedback';
        $this->is_pro_active                      = is_wcv_pro_active();
        $this->date_format                        = $this->is_pro_active ? get_option( 'wcvendors_dashboard_date_format', 'Y-m-d' ) : 'Y-m-d';
        $this->product_statuses                   = apply_filters( 'wcvendors_vendor_dashboard_product_statuses', array( 'publish', 'pending', 'private', 'draft' ) );
        $this->allow_vendor_purchase_own_products = apply_filters( 'wcvendors_allow_vendor_purchase_own_products', wc_string_to_bool( get_option( 'wcvendors_capability_products_purchase_own', 'no' ) ) );
        $this->allow_vendor_review_own_products   = apply_filters( 'wcvendors_allow_vendor_review_own_products', wc_string_to_bool( get_option( 'wcvendors_capability_products_review_own', 'no' ) ) );

        add_filter( 'wcvendors_import_export_buttons', array( $this, 'add_import_export_buttons' ) );
        add_action( 'woocommerce_product_query', array( $this, 'hide_all_inactive_vendor_products' ), 10 );
        add_filter( 'woocommerce_add_to_cart_validation', array( $this, 'add_to_cart_validation' ), 10, 2 );
        add_action( 'woocommerce_check_cart_items', array( $this, 'remove_inactive_vendor_products_from_cart' ) );

        add_filter( 'wcvendors_table_row_args_product', array( $this, 'process_search_and_filter' ) );

        if ( ! $this->allow_vendor_review_own_products ) {
            add_filter( 'pre_comment_on_post', array( $this, 'prevent_vendor_self_review' ) );
        }
    }

    /**
     *  Process the form submission from the front end.
     *
     * @since   2.5.2
     * @since   2.5.2 - Added extra permission checks
     * @since   2.6.6 - Added AI Moderate feature.
     * @version  2.6.6 - Fix vendor still being able to edit products when the submit capability is disabled.
     */
    public function process_submit() {

        $current_user_id = get_current_user_id();

        if ( ! \WCV_Vendors::is_vendor( $current_user_id ) ) {
            return;
        }

        if ( ! isset( $_POST['_wcv-save_product'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wcv-save_product'] ) ), 'wcv-save_product' ) || ! is_user_logged_in() ) {
            return;
        }

        $can_submit_live     = wc_string_to_bool( get_option( 'wcvendors_capability_products_live', 'no' ) );
        $can_submit_live     = wcv_apply_vendor_trust_status( $can_submit_live, $current_user_id );
        $current_post_status = isset( $_POST['post_status'] ) ? sanitize_text_field( wp_unslash( $_POST['post_status'] ) ) : '';
        $can_edit_approved   = wc_string_to_bool( get_option( 'wcvendors_capability_products_approved', 'no' ) );
        $product_redirect    = wcv_get_pro_option( 'wcvendors_save_product_redirect', 'edit' );

        $text = array(
            'notice' => '',
            'type'   => 'success',
        );

        if ( isset( $_POST['post_id'] ) && is_numeric( sanitize_text_field( wp_unslash( $_POST['post_id'] ) ) ) ) {

            // check the object owner.
            if ( ! \WCV_Vendor_Dashboard::check_object_permission( 'product', absint( sanitize_text_field( wp_unslash( $_POST['post_id'] ) ) ) ) ) {
                return;
            }

            $post_id = $this->save_product( (int) ( sanitize_text_field( wp_unslash( $_POST['post_id'] ) ) ) );

            if ( $post_id ) {

                $view = get_permalink( $post_id );

                if ( isset( $_POST['draft_button'] ) ) {

                    if ( $can_submit_live ) {
                        $text['notice'] = sprintf( apply_filters( 'wcv_product_draft_msg', __( 'Product draft saved.', 'wc-vendors' ) ), $view );
                    } else {
                        $text['notice'] = sprintf( apply_filters( 'wcv_product_draft_saved_msg', __( 'Product draft saved, pending review.', 'wc-vendors' ) ), $view );
                    }
                } else {
                    $target = wc_string_to_bool( get_option( 'wcvendors_dashboard_view_product_new_window', 'no' ) ) ? '_blank' : '_self';
                    if ( $can_submit_live ) {
                        $text['notice'] = sprintf(
                            apply_filters(
                                'wcv_product_updated_msg',
                                /* translators: %1$s: product url, %2$s: target attribute */
                                __( 'Product Updated. <a href="%1$s" target="%2$s">View product.</a>', 'wc-vendors' )
                            ),
                            $view,
                            $target
                        );
                    } elseif ( $can_edit_approved && 'pending' !== $current_post_status && 'draft' !== $current_post_status ) {
                        $text['notice'] = sprintf(
                            apply_filters(
                                'wcv_product_updated_msg',
                                /* translators: %1$s: product url, %2$s: target attribute */
                                __( 'Product Updated. <a href="%1$s" target="%2$s">View product.</a>', 'wc-vendors' )
                            ),
                            $view,
                            $target
                        );
                    } else {
                        $text['notice'] = sprintf(
                            apply_filters(
                                'wcv_product_review_msg',
                                /* translators: %1$s: product url, %2$s: target attribute */
                                __( 'Product submitted for review. <a href="%1$s" target="%2$s">Preview product.</a>', 'wc-vendors' )
                            ),
                            $view,
                            $target
                        );
                    }
                }
            } else {
                $text['notice'] = apply_filters( 'wcv_product_edit_problem_msg', __( 'There was a problem editing the product.', 'wc-vendors' ) );
                $text['type']   = 'error';
            }
        } else {

            $post_id = $this->save_product();
            $view    = get_permalink( $post_id );

            if ( $post_id ) {
                if ( isset( $_POST['draft_button'] ) ) {
                    if ( $can_submit_live ) {
                        $text['notice'] = sprintf( apply_filters( 'wcv_product_draft_msg', __( 'Product draft saved.', 'wc-vendors' ) ), $view );
                    } else {
                        $text['notice'] = sprintf( apply_filters( 'wcv_product_draft_saved_msg', __( 'Product draft saved, pending review.', 'wc-vendors' ) ), $view );
                    }
                } elseif ( $can_submit_live ) {
                        $text['notice'] = sprintf(
                            apply_filters(
                                'wcv_product_added_msg',
                                /* translators: %s: product url */
                                __( 'Product Added. <a href="%s">View product.</a>', 'wc-vendors' )
                            ),
                            $view
                        );
                    } else {
                        $text['notice'] = sprintf(
                            apply_filters(
                                'wcv_product_review_msg',
                                /* translators: %s: product url */
                                __( 'Product submitted for review. <a href="%s">Preview product.</a>', 'wc-vendors' )
                            ),
                            $view
                        );
                }
            } else {
                $text['notice'] = apply_filters( 'wcv_product_add_problem_msg', __( 'There was a problem adding the product.', 'wc-vendors' ) );
                $text['type']   = 'error';
            }
        }

        wc_add_notice( $text['notice'], $text['type'] );

        switch ( $product_redirect ) {
            case 'edit':
                // code...
                $url = self::get_product_edit_link( $post_id );
                break;
            case 'list':
                $current_page = ( isset( $_POST['page_number'] ) && 1 < (int) sanitize_text_field( wp_unslash( $_POST['page_number'] ) ) ) ? '/page/' . sanitize_text_field( wp_unslash( $_POST['page_number'] ) ) : '';
                $url          = \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product' ) . $current_page;
                break;
            case 'view':
                // code...
                $url = $view;
                break;
            case 'empty':
            default:
                // code...
                $url = self::get_product_edit_link();
                break;
        }
        wp_safe_redirect( apply_filters( 'wcv_save_product_redirect', $url, $product_redirect, $post_id ) );
        exit;
    }

    /**
     * Process search and filter
     *
     * @param array $args The arguments for the query.
     *
     * @since 2.5.5
     * @version 2.5.5
     */
    public function process_search_and_filter( $args ) {
        $request = isset( $_SERVER['REQUEST_METHOD'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) : '';
        if ( 'POST' === $request ) {
            $nonce = isset( $_POST['wcv_product_table_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv_product_table_nonce'] ) ) : '';
            if ( ! wp_verify_nonce( $nonce, 'wcv_product_table_nonce' ) ) {
                wp_die( 'Invalid nonce' );
            }
        }

        $search       = isset( $_POST['wcv-search'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv-search'] ) ) : '';
        $product_tag   = isset( $_POST['_wcv_product_tag'] ) ? $_POST['_wcv_product_tag'] : ''; // phpcs:ignore
        $product_cat   = isset( $_POST['_wcv_product_category'] ) ? $_POST['_wcv_product_category'] : ''; // phpcs:ignore
        $product_type = isset( $_POST['_wcv_product_type'] ) ? $_POST['_wcv_product_type'] : ''; // phpcs:ignore

        $hide_product_types = get_option( 'wcvendors_capability_product_types', array() );

        if ( ! empty( $hide_product_types ) ) {
            $args['tax_query'][] = array(
                'taxonomy' => 'product_type',
                'field'    => 'slug',
                'terms'    => $hide_product_types,
                'operator' => 'NOT IN',
            );
        }

        if ( ! empty( $search ) ) {
            // First search for products with matching SKU.
            $sku_query = new \WP_Query(
                array(
                    'post_type'      => 'product',
                    'posts_per_page' => -1,
                    'fields'         => 'ids',
                    'author'         => get_current_user_id(),
                    'meta_query'     => array( //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
                        array(
                            'key'     => '_sku',
                            'value'   => $search,
                            'compare' => 'LIKE',
                        ),
                    ),
                )
            );

            $product_ids = $sku_query->posts;

            // If no products found by SKU, search in title/content.
            if ( empty( $product_ids ) ) {
                $args['s'] = $search;
            } else {
                $args['post__in'] = $product_ids;
                unset( $args['s'] );
            }
        }

        if ( ! empty( $product_tag ) ) {

            $product_tag_array = is_array( $product_tag ) ? array_filter( $product_tag ) : array( $product_tag );

            if ( ! empty( $product_tag_array ) ) {
                $args['tax_query'][] = array(
                    'taxonomy' => 'product_tag',
                    'field'    => 'term_id',
                    'terms'    => $product_tag_array,
                    'operator' => 'IN',
                );
            }
        }

        if ( ! empty( $product_cat ) ) {

            $product_cat_array = is_array( $product_cat ) ? array_filter( $product_cat ) : array( $product_cat );

            if ( ! empty( $product_cat_array ) ) {
                $args['tax_query'][] = array(
                    'taxonomy' => 'product_cat',
                    'field'    => 'term_id',
                    'terms'    => $product_cat_array,
                    'operator' => 'IN',
                );
            }
        }

        if ( ! empty( $product_type ) ) {

            $product_type_array = is_array( $product_type ) ? array_filter( $product_type ) : array( $product_type );

            if ( ! empty( $product_type_array ) ) {
                $args['tax_query'][] = array(
                    'taxonomy' => 'product_type',
                    'field'    => 'slug',
                    'terms'    => $product_type_array,
                    'operator' => 'IN',
                );
            }
        }

        return $args;
    }

    /**
     *  Process the delete action
     *
     * @since    2.5.2
     */
    public function process_delete() {

        global $wp;

        if ( isset( $wp->query_vars['object'] ) ) {

            $object = get_query_var( 'object' );
            $action = get_query_var( 'action' );
            $id     = get_query_var( 'object_id' );

            if ( 'product' === $object && 'delete' === $action && is_numeric( $id ) ) {

                $nonce = isset( $_GET['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ) : ''; //phpcs:ignore

                if ( ! wp_verify_nonce( $nonce, 'wcv-delete-product-' . $id ) ) {
                    wp_die( esc_html__( 'You are not authorized to delete this product.', 'wc-vendors' ) );
                }

                if ( null !== $id ) {
                    if ( \WCV_Vendor_Dashboard::check_object_permission( 'product', absint( $id ) ) !== true ) {
                        return false;
                    }
                }

                if ( 'yes' !== get_option( 'wcvendors_vendor_product_trash', 'no' ) ) {
                    $update = wp_update_post(
                        array(
                            'ID'          => $id,
                            'post_status' => 'trash',
                        )
                    );
                } else {
                    $update = wp_delete_post( $id );
                    if ( is_object( $update ) || is_numeric( $update ) ) {
                        do_action_deprecated( 'wcv_delete_post', array( $id ), '1.7.10', 'wcvendors_delete_post' );
                        do_action_deprecated( 'wcvendors_delete_post', array( $id ), '2.5.2', 'wcvendors_product_delete' );
                        do_action( 'wcvendors_product_delete', $id );

                    }
                }

                if ( is_object( $update ) || is_numeric( $update ) ) {
                    $text = __( 'Product Deleted.', 'wc-vendors' );
                } else {
                    $text = __( 'There was a problem deleting the product.', 'wc-vendors' );
                }

                wc_add_notice( $text );

                wp_safe_redirect( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product' ) );
                exit;
            }
        }
    }

    /**
     *  Process the duplicate action
     *
     * @since    2.5.2
     */
    public function process_duplicate() {

        global $wp;

        if ( isset( $wp->query_vars['object'] ) ) {

            $object = get_query_var( 'object' );
            $action = get_query_var( 'action' );
            $id     = get_query_var( 'object_id' );

            if ( 'product' === $object && 'duplicate' === $action && is_numeric( $id ) ) {

				if ( null != $id ) { //phpcs:ignore
					if ( \WCV_Vendor_Dashboard::check_object_permission( 'product', $id ) == false ) { //phpcs:ignore
                        return false;
                    }
                }

                $new_product_id = $this->duplicate_product( $id );

                wc_add_notice( apply_filters( 'wcv_product_duplicated_msg', __( 'Product Duplicated.', 'wc-vendors' ) ) );

                wp_safe_redirect( \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product/edit/' . $new_product_id ) );

                exit;
            }
        }
    }

    /**
     *  Process the duplicate action.
     *
     * @since    1.3.4
     * @access   private
     *
     * @param int $object_id int the product id to duplicate.
     * @return int $product_id the new product id
     */
    private function duplicate_product( $object_id ) {

        // create the WC Admin duplicate product object.
        $wcdpa       = new \WC_Admin_Duplicate_Product();
        $product     = wc_get_product( $object_id );
        $new_product = $wcdpa->product_duplicate( $product );

        return $new_product->get_id();
    }

    /**
     *  Save a new product
     *
     * @since       2.5.2
     * @since     1.5.9
     * @version  2.6.6 - Fix vendor still being able to edit products when the submit capability is disabled.
     *
     * @param     int $post_id The post ID of the product to save.
     *
     * @return   mixed    $post_id or WP_Error
     */
    public function save_product( $post_id = 0 ) {

        $this->allow_markup = wc_string_to_bool( get_option( 'wcvendors_allow_form_markup', 'no' ) );

        // Work on adding filters and option checks to publish to draft instead of straight to live.
        $can_submit_live     = wc_string_to_bool( get_option( 'wcvendors_capability_products_live', 'no' ) );
        $can_edit_live       = wc_string_to_bool( get_option( 'wcvendors_capability_products_edit', 'no' ) );
        $can_edit_approved   = wc_string_to_bool( get_option( 'wcvendors_capability_products_approved', 'no' ) );
        $post_status         = '';
        $old_post_status     = '';
        $current_post_status = isset( $_POST['post_status'] ) ? sanitize_text_field( wp_unslash( $_POST['post_status'] ) ) : '';

        if ( isset( $_POST['draft_button'] ) ) {
            $post_status = 'draft';
        } else {

            $post_status = $can_submit_live ? 'publish' : 'pending';

            if ( 0 !== $post_id ) {

                $post_status = ( ( $can_edit_live && $can_submit_live ) || $can_edit_approved ) ? 'publish' : 'pending';

                if ( 'draft' === $current_post_status && ! $can_submit_live ) {
                    $post_status = 'pending';
                }

                if ( 'pending' === $current_post_status && ! $can_submit_live ) {
                    $post_status = 'pending';
                }
            }
        }
        $current_user_id = get_current_user_id();
        // Bypass globals for live product submissions.
        $is_draft    = isset( $_POST['draft_button'] );
        $post_status = wcv_get_vendor_post_status( $post_status, $current_user_id, $is_draft );

        $product_type = empty( $_POST['product-type'] ) ? 'simple' : sanitize_title( stripslashes( sanitize_text_field( wp_unslash( $_POST['product-type'] ) ) ) );
        $categories   = isset( $_POST['product_cat'] ) ? wc_clean( $_POST['product_cat'] ) : get_option( 'default_product_cat' ); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash

        $_product = array(
            'post_title'  => isset( $_POST['post_title'] ) ? ( $this->allow_markup ? wc_clean( $_POST['post_title'] ) : wp_strip_all_tags( wc_clean( $_POST['post_title'] ) ) ) : '', //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            'post_status' => $post_status,
            'post_type'   => 'product',
            'post_author' => get_current_user_id(),
        );

        if ( isset( $_POST['post_excerpt'] ) ) {
            $_product['post_excerpt'] = wc_string_to_bool( get_option( 'wcvendors_allow_product_html', 'no' ) ) ? wp_kses_post( $_POST['post_excerpt'] ) : wp_strip_all_tags( $_POST['post_excerpt'] ); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        }

        if ( isset( $_POST['post_content'] ) ) {
            $_product['post_content'] = wc_string_to_bool( get_option( 'wcvendors_allow_product_html', 'no' ) ) ? wp_kses_post( $_POST['post_content'] ) : wp_strip_all_tags( $_POST['post_content'] ); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        }

        do_action( 'wcvendors_before_product_save', $post_id );

        if ( 0 !== $post_id ) {
            $old_post_status = get_post_status( $post_id );

            $_product['ID'] = $post_id;
            if ( $this->allow_markup ) {
                kses_remove_filters();
            }
            $product_id = wp_update_post( $_product, true );
            if ( $this->allow_markup ) {
                kses_init_filters();
            }
        } else {
            // Attempts to create the new product.
            if ( $this->allow_markup ) {
                kses_remove_filters();
            }
            $product_id = wp_insert_post( $_product, true );
            if ( $this->allow_markup ) {
                kses_init_filters();
            }
        }

        // Checks for an error in the product creation.
        if ( is_wp_error( $product_id ) ) {
            return null;
        }

        do_action( 'wcvendors_before_product_save_images', $product_id );

        // Featured Image.
        if ( isset( $_POST['_featured_image_id'] ) && '' !== sanitize_text_field( wp_unslash( $_POST['_featured_image_id'] ) ) ) {
            set_post_thumbnail( $product_id, (int) sanitize_text_field( wp_unslash( $_POST['_featured_image_id'] ) ) );
        } else {
            delete_post_thumbnail( $product_id );
        }

        // // Gallery Images
        if ( isset( $_POST['product_image_gallery'] ) && '' !== sanitize_text_field( wp_unslash( $_POST['product_image_gallery'] ) ) ) {
            $images_gallery = explode( ',', sanitize_text_field( wp_unslash( $_POST['product_image_gallery'] ) ) );
            $images_gallery = array_map( 'absint', $images_gallery );
            $images_gallery = array_unique( $images_gallery );
            $images_gallery = implode( ',', $images_gallery );
            update_post_meta( $product_id, '_product_image_gallery', $images_gallery );
        } else {
            update_post_meta( $product_id, '_product_image_gallery', '' );
        }

        do_action( 'wcvendors_before_product_save_categories', $product_id, $categories );

        $hide_categories = wc_string_to_bool( get_option( 'wcvendors_hide_product_basic_categories', 'no' ) ) && $this->is_pro_active;
        // Categories.
        if ( isset( $_POST['product_cat'] ) && is_array( $_POST['product_cat'] ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            $categories = array_map( 'intval', $_POST['product_cat'] );
            $categories = array_unique( $categories );

            // Need to store product categories into single user meta to track all. Sync this also.
            wp_set_post_terms( $product_id, $categories, 'product_cat' );
        } elseif ( ! $hide_categories ) {
            wp_set_post_terms( $product_id, null, 'product_cat' );
        }

        do_action( 'wcvendors_before_product_save_tags', $product_id );
        $hide_tags         = wc_string_to_bool( get_option( 'wcvendors_hide_product_basic_tags', 'no' ) ) && $this->is_pro_active;
        $allow_create_tags = wc_string_to_bool( get_option( 'wcvendors_capability_create_product_tags', 'yes' ) );
        // Tags.
        if ( isset( $_POST['product_tags'] ) ) {

            $post_tags = is_array( $_POST['product_tags'] ) ? $_POST['product_tags'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash

            $post_tags = array_map( 'sanitize_text_field', $post_tags );

            $tags = array();

            foreach ( $post_tags as $post_tag ) {
                $existing_tag = get_term( $post_tag, 'product_tag' );

				if ( $existing_tag != null ) { //phpcs:ignore
                    $tags[] = $existing_tag->slug;
                } elseif ( $allow_create_tags ) {
                    $tags[] = $post_tag;
                }
            }

            $tags = array_unique( $tags );
            $tags = implode( ',', $tags );

            wp_set_post_terms( $product_id, $tags, 'product_tag' );
        } elseif ( ! $hide_tags ) {
            wp_set_post_terms( $product_id, null, 'product_tag' );
        }

        do_action( 'wcvendors_before_product_save_custom_taxonomy', $product_id );
        // Custom taxonomies.
        $wcv_custom_hidden_tax = array_intersect_key( $_POST, array_flip( preg_grep( '/^_wcv_custom_taxonomy_/', array_keys( $_POST ) ) ) );
        if ( ! empty( $wcv_custom_hidden_tax ) ) {

            foreach ( $wcv_custom_hidden_tax as $taxonomy => $data ) {

                $taxonomy = str_replace( '_wcv_custom_taxonomy_', '', $taxonomy );
                $tax_data = array_unique( $data );
                $tax_data = array_map( 'intval', $tax_data );

                wp_set_object_terms( $product_id, $tax_data, $taxonomy );

            }
        }

        $wcv_custom_tax = array_intersect_key( $_POST, array_flip( preg_grep( '/^wcv_custom_taxonomy_/', array_keys( $_POST ) ) ) );
        if ( ! empty( $wcv_custom_tax ) ) {

            foreach ( $wcv_custom_tax as $taxonomy => $data ) {

                $taxonomy = str_replace( 'wcv_custom_taxonomy_', '', $taxonomy );
                $tax_data = array_unique( $data );
                $tax_data = array_map( 'intval', $tax_data );

                wp_set_object_terms( $product_id, $tax_data, $taxonomy );

            }
        }

        // Clean up taxonomies that have no values.
        $track_tax = array_intersect_key( $_POST, array_flip( preg_grep( '/^track_/', array_keys( $_POST ) ) ) );
        if ( ! empty( $track_tax ) ) {

            foreach ( $track_tax as $taxonomy => $value ) {

                $taxonomy = str_replace( 'track_', '', $taxonomy );

                // Hidden.
                if ( ! array_key_exists( $taxonomy, $wcv_custom_hidden_tax ) ) {
                    $taxonomy = str_replace( '_wcv_custom_taxonomy_', '', $taxonomy );
                    wp_set_object_terms( $product_id, null, $taxonomy );
                }

                // Not hidden.
                if ( ! array_key_exists( $taxonomy, $wcv_custom_tax ) ) {
                    $taxonomy = str_replace( 'wcv_custom_taxonomy_', '', $taxonomy );
                    wp_set_object_terms( $product_id, null, $taxonomy );
                }
            }
        }

        // Base product saved now save all meta fields.
        $this->save_meta( $product_id );

        switch ( $product_type ) {
            case apply_filters( 'wcv_save_product_variation_type', '' ):
                $this->save_variations( $product_id );
                break;

            default:
                $this->save_variations( $product_id );
                break;
        }

        $this->check_coupons();

        // Clear AI suggestions meta key and change request message when vendor saves the product.
        $product_obj = wc_get_product( $product_id );
        if ( $product_obj ) {
            $product_obj->delete_meta_data( '_wcv_show_ai_suggestions' );
            $product_obj->delete_meta_data( 'wcv_change_request_message' );
            $product_obj->delete_meta_data( '_saai_vendors_product_moderation_result' );
            $product_obj->save_meta_data();
        }

        // Fire hook when product status changes to pending (not if already pending).
        if ( 'pending' === $post_status && 'pending' !== $old_post_status ) {
            do_action( 'wcvendors_product_saved_to_pending', $product_id, $old_post_status, $post_status );
        }

        do_action( 'wcv_save_product', $product_id );

        wc_delete_product_transients( $product_id );

        return $product_id;
    }

    /**
     *  Save product meta
     *
     * @version 1.7.6
     * @since   2.5.2
     *
     * @param int $post_id The post ID of the product to save.
     */
    public function save_meta( $post_id ) {

        global $wpdb;

        if ( isset( $_POST['product-type'] ) ) {

            $classname = \WC_Product_Factory::get_classname_from_product_type( sanitize_text_field( wp_unslash( $_POST['product-type'] ) ) );

            if ( ! class_exists( $classname ) ) {
                $classname = 'WC_Product_Simple';
            }

            $product = new $classname( $post_id );

            // Featured Product.
            if ( isset( $_POST['featured'] ) ) {
                $product->set_featured( sanitize_text_field( wp_unslash( $_POST['featured'] ) ) );
            }

            // Catalog visibility.
            if ( isset( $_POST['_private_listing'] ) ) {
                $product->set_catalog_visibility( 'hidden' );
                update_post_meta( $post_id, '_private_listing', isset( $_POST['_private_listing'] ) ? 'yes' : 'no' );
            } else {
                $product->set_catalog_visibility( 'visible' );
                delete_post_meta( $post_id, '_private_listing' );
            }

            if ( isset( $_POST['_stock_status'] ) ) {
                $stock_status = wc_string_to_bool( sanitize_text_field( wp_unslash( $_POST['_stock_status'] ) ) ) ? 'instock' : 'outofstock';
            } else {
                $stock_status = $product->get_stock_status();
            }

            // Stock data.
            if ( 'yes' === get_option( 'woocommerce_manage_stock' ) ) {

                // Manage stock.
                if ( isset( $_POST['_manage_stock'] ) ) {
                    $product->set_manage_stock( sanitize_text_field( wp_unslash( $_POST['_manage_stock'] ) ) );
                }

                // Backorders.
                if ( isset( $_POST['_backorders'] ) ) {
                    $product->set_backorders( sanitize_text_field( wp_unslash( $_POST['_backorders'] ) ) );
                }

                if ( $product->is_type( 'grouped' ) ) {
                    $product->set_manage_stock( 'no' );
                    $product->set_backorders( 'no' );
                    $product->set_stock_quantity( '' );
                    $product->set_stock_status( $stock_status );
                } elseif ( $product->is_type( 'external' ) ) {
                    $product->set_manage_stock( 'no' );
                    $product->set_backorders( 'no' );
                    $product->set_stock_quantity( '' );
                    $product->set_stock_status( 'instock' );
                } elseif ( $product->get_manage_stock() ) {

                    if ( ! $product->is_type( 'variable' ) ) {
                        $product->set_stock_status( $stock_status );
                    }

                    // Stock quantity.
                    if ( isset( $_POST['_stock'] ) ) {
                        $product->set_stock_quantity( (int) wc_stock_amount( sanitize_text_field( wp_unslash( $_POST['_stock'] ) ) ) );
                    }
                } else {
                    // Don't manage stock.
                    $product->set_manage_stock( 'no' );
                    $product->set_stock_quantity( '' );
                    $product->set_stock_status( $stock_status );
                }
            } elseif ( ! $product->is_type( 'variable' ) ) {

                if ( ! $product->is_type( 'external' ) ) {
                    $product->set_stock_status( $stock_status );
                }
            } // stock data
        }

        do_action( 'wcvendors_before_product_save_meta', $product, $post_id );

        $product->save();

        $this->allow_markup = wc_string_to_bool( get_option( 'wcvendors_allow_form_markup', 'no' ) );

        // Add any default post meta.
        add_post_meta( $post_id, 'total_sales', '0', true );

        // Set catalog visibility.
        if ( isset( $_POST['_private_listing'] ) ) {
            update_post_meta( $post_id, '_visibility', 'hidden' );
            update_post_meta( $post_id, '_private_listing', isset( $_POST['_private_listing'] ) ? 'yes' : 'no' ); //phpcs:ignore
        } else {
            update_post_meta( $post_id, '_visibility', 'visible' );
            delete_post_meta( $post_id, '_private_listing' );
        }

        // Get types.
        $product_type    = isset( $_POST['product-type'] ) && empty( $_POST['product-type'] ) ? 'simple' : sanitize_title( stripslashes( sanitize_text_field( wp_unslash( $_POST['product-type'] ) ) ) );
        $is_downloadable = isset( $_POST['_downloadable'] ) ? 'yes' : 'no';
        $is_virtual      = isset( $_POST['_virtual'] ) ? 'yes' : 'no';

        // Product type + Downloadable/Virtual.
        wp_set_object_terms( $post_id, $product_type, 'product_type' );
        update_post_meta( $post_id, '_downloadable', $is_downloadable );
        update_post_meta( $post_id, '_virtual', $is_virtual );

        // Update post meta.
        if ( isset( $_POST['_regular_price'] ) ) {
            update_post_meta( $post_id, '_regular_price', ( '' === sanitize_text_field( wp_unslash( $_POST['_regular_price'] ) ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_regular_price'] ) ) ) );
        }

        if ( isset( $_POST['_sale_price'] ) ) {

            $sale_price = ( '' === sanitize_text_field( wp_unslash( $_POST['_sale_price'] ) ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_sale_price'] ) ) );
            update_post_meta( $post_id, '_sale_price', ( '' === sanitize_text_field( wp_unslash( $_POST['_sale_price'] ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_sale_price'] ) ) ) ) );
            update_post_meta( $post_id, '_price', $sale_price );
        }

        if ( isset( $_POST['_tax_status'] ) ) {
            update_post_meta( $post_id, '_tax_status', sanitize_text_field( wp_unslash( $_POST['_tax_status'] ) ) );
        }

        if ( isset( $_POST['_tax_class'] ) ) {
            update_post_meta( $post_id, '_tax_class', sanitize_text_field( wp_unslash( $_POST['_tax_class'] ) ) );
        }

        if ( isset( $_POST['_purchase_note'] ) ) {
            update_post_meta( $post_id, '_purchase_note', sanitize_text_field( wp_unslash( $_POST['_purchase_note'] ) ) );
        }

        if ( isset( $_POST['menu_order'] ) ) {
            wp_update_post(
                array(
                    'ID'         => $post_id,
                    'menu_order' => absint( sanitize_text_field( wp_unslash( $_POST['menu_order'] ) ) ),
                )
            );
        }

        // Dimensions.
        if ( 'no' === $is_virtual ) {

            do_action( 'wcvendors_before_product_save_dimensions', $post_id );

            if ( isset( $_POST['_weight'] ) ) {
                update_post_meta( $post_id, '_weight', ( '' === sanitize_text_field( wp_unslash( $_POST['_weight'] ) ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_weight'] ) ) ) );
            }

            if ( isset( $_POST['_length'] ) ) {
                update_post_meta( $post_id, '_length', ( '' === sanitize_text_field( wp_unslash( $_POST['_length'] ) ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_length'] ) ) ) );
            }

            if ( isset( $_POST['_width'] ) ) {
                update_post_meta( $post_id, '_width', ( '' === sanitize_text_field( wp_unslash( $_POST['_width'] ) ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_width'] ) ) ) );
            }

            if ( isset( $_POST['_height'] ) ) {
                update_post_meta( $post_id, '_height', ( '' === sanitize_text_field( wp_unslash( $_POST['_height'] ) ) ) ? '' : wc_format_decimal( sanitize_text_field( wp_unslash( $_POST['_height'] ) ) ) );
            }

            do_action( 'wcvendors_before_product_save_shipping_rates', $post_id );

        } else {
            update_post_meta( $post_id, '_weight', '' );
            update_post_meta( $post_id, '_length', '' );
            update_post_meta( $post_id, '_width', '' );
            update_post_meta( $post_id, '_height', '' );
        }

        // Save shipping class.
        if ( isset( $_POST['product_shipping_class'] ) ) {
            $product_shipping_class = isset( $_POST['product_shipping_class'] ) && $_POST['product_shipping_class'] > 0 && 'external' !== $product_type ? absint( sanitize_text_field( wp_unslash( $_POST['product_shipping_class'] ) ) ) : '';
            wp_set_object_terms( $post_id, $product_shipping_class, 'product_shipping_class' );
        }

        // Unique SKU.
        if ( isset( $_POST['_sku'] ) ) {

            $sku     = get_post_meta( $post_id, '_sku', true );
            $new_sku = wc_clean( stripslashes( sanitize_text_field( wp_unslash( $_POST['_sku'] ) ) ) );

            if ( '' === $new_sku ) {
                update_post_meta( $post_id, '_sku', '' );
            } elseif ( $new_sku !== $sku ) {

                if ( ! empty( $new_sku ) ) {

                    $unique_sku = wc_product_has_unique_sku( $post_id, $new_sku );

                    if ( ! $unique_sku ) {
                        // TODO: make this send error to the front end.
                        \WC_Admin_Meta_Boxes::add_error( __( 'Product SKU must be unique.', 'wc-vendors' ) );
                    } else {
                        update_post_meta( $post_id, '_sku', $new_sku );
                    }
                } else {
                    update_post_meta( $post_id, '_sku', '' );
                }
            }
        }

        do_action( 'wcvendors_before_product_save_attributes', $post_id );

        // Save Attributes.
        $attributes      = array();
        $hide_attributes = wc_string_to_bool( get_option( 'wcvendors_hide_product_basic_attributes', 'no' ) ) && $this->is_pro_active;

        if ( isset( $_POST['attribute_names'] ) && isset( $_POST['attribute_values'] ) ) {

            $attribute_names  = isset( $_POST['attribute_names'] ) ? $_POST['attribute_names'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            $attribute_values = isset( $_POST['attribute_values'] ) ? $_POST['attribute_values'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash

            $attribute_names_count = count( $attribute_names );

            $attribute_visibility = isset( $_POST['attribute_visibility'] ) ? $_POST['attribute_visibility'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash

            $attribute_variation = isset( $_POST['attribute_variation'] ) ? $_POST['attribute_variation'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash

            $attribute_is_taxonomy   = isset( $_POST['attribute_is_taxonomy'] ) ? $_POST['attribute_is_taxonomy'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            $attribute_position      = isset( $_POST['attribute_position'] ) ? $_POST['attribute_position'] : array(); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            $attribute_names_max_key = max( array_keys( $attribute_names ) );

            $pos = 0;

            for ( $i = 0; $i <= $attribute_names_max_key; $i++ ) {

                if ( ! $attribute_names[ $i ] ) {
                    continue;
                }

                $is_visible   = isset( $attribute_visibility[ $i ] ) ? 1 : 0;
                $is_variation = isset( $attribute_variation[ $i ] ) ? 1 : 0;
                $is_taxonomy  = $attribute_is_taxonomy[ $i ] ? 1 : 0;

                if ( $is_taxonomy ) {

                    $values_are_slugs = false;

                    if ( isset( $attribute_values[ $i ] ) ) {

                        // Select based attributes - Format values (posted values are slugs).
                        if ( is_array( $attribute_values[ $i ] ) ) {
                            $values           = array_map( 'sanitize_title', $attribute_values[ $i ] );
                            $values_are_slugs = true;

                            // Text based attributes - Posted values are term names - don't change to slugs.
                        } else {
                            $values = array_map( 'stripslashes', array_map( 'strip_tags', explode( WC_DELIMITER, $attribute_values[ $i ] ) ) );
                        }

                        // Remove empty items in the array.
                        $values = array_filter( $values, 'strlen' );

                    } else {
                        $values = array();
                    }

                    // Update post terms.
                    if ( taxonomy_exists( $attribute_names[ $i ] ) ) {

                        foreach ( $values as $key => $value ) {
                            $term = get_term_by( $values_are_slugs ? 'slug' : 'name', trim( $value ), $attribute_names[ $i ] );

                            if ( $term ) {
                                $values[ $key ] = intval( $term->term_id );
                            } else {
                                $term = wp_insert_term( trim( $value ), $attribute_names[ $i ] );
                                if ( isset( $term->term_id ) ) {
                                    $values[ $key ] = intval( $term->term_id );
                                }
                            }
                        }

                        wp_set_object_terms( $post_id, $values, $attribute_names[ $i ] );
                    }

                    if ( ! empty( $values ) ) {
                        // Add attribute to array, but don't set values.
                        $attributes[ sanitize_title( $attribute_names[ $i ] ) ] = array(
                            'name'         => wc_clean( $attribute_names[ $i ] ),
                            'value'        => '',
                            'position'     => $attribute_position[ $i ],
                            'is_visible'   => $is_visible,
                            'is_variation' => $is_variation,
                            'is_taxonomy'  => $is_taxonomy,
                        );
                    }

                    ++$pos;

                } elseif ( isset( $attribute_values[ $i ] ) ) {

                    // Text based, possibly separated by pipes (WC_DELIMITER). Preserve line breaks in non-variation attributes.
                    $values = $is_variation ? wc_clean( $attribute_values[ $i ] ) : implode( "\n", array_map( 'wc_clean', explode( "\n", $attribute_values[ $i ] ) ) );
                    $values = implode( ' ' . WC_DELIMITER . ' ', wc_get_text_attributes( $values ) );

                    // Custom attribute - Add attribute to array and set the values.
                    $attributes[ sanitize_title( $attribute_names[ $i ] ) ] = array(
                        'name'         => wc_clean( $attribute_names[ $i ] ),
                        'value'        => $values,
                        'position'     => $attribute_position[ $i ],
                        'is_visible'   => $is_visible,
                        'is_variation' => $is_variation,
                        'is_taxonomy'  => $is_taxonomy,
                    );
                }
            } // end forloop.

            uasort( $attributes, 'WC_Vendors\Classes\Includes\attributes_cmp' );

            update_post_meta( $post_id, '_product_attributes', $attributes );
        } elseif ( ! $hide_attributes ) {
            update_post_meta( $post_id, '_product_attributes', array() );
        }

        do_action( 'wcvendors_before_product_save_prices', $post_id );
        // Sales and prices.
        if ( in_array( $product_type, apply_filters( 'wcv_product_meta_types', array( 'variable', 'grouped' ) ), true ) ) {

            // Variable and grouped products have no prices.
            update_post_meta( $post_id, '_regular_price', '' );
            update_post_meta( $post_id, '_sale_price', '' );
            update_post_meta( $post_id, '_sale_price_dates_from', '' );
            update_post_meta( $post_id, '_sale_price_dates_to', '' );
            update_post_meta( $post_id, '_price', '' );

        } else {

            $date_from = isset( $_POST['_sale_price_dates_from'] ) ? sanitize_text_field( wp_unslash( $_POST['_sale_price_dates_from'] ) ) : '';
            $date_to   = isset( $_POST['_sale_price_dates_to'] ) ? sanitize_text_field( wp_unslash( $_POST['_sale_price_dates_to'] ) ) : '';

			if ( sanitize_text_field( wp_unslash( $date_from ) ) == sanitize_text_field( wp_unslash( $date_to ) ) ) { //phpcs:ignore
                $date_to   = '';
                $date_from = '';
            }

            // Dates.
            if ( $date_from ) {
                update_post_meta( $post_id, '_sale_price_dates_from', strtotime( $date_from ) );
            } else {
                update_post_meta( $post_id, '_sale_price_dates_from', '' );
            }

            if ( $date_to ) {
                update_post_meta( $post_id, '_sale_price_dates_to', strtotime( $date_to ) );
            } else {
                update_post_meta( $post_id, '_sale_price_dates_to', '' );
            }

            if ( $date_to && ! $date_from ) {
				update_post_meta( $post_id, '_sale_price_dates_from', time() ); //phpcs:ignore
            }

            // Update price if on sale.
            if ( isset( $_POST['_sale_price'] ) && '' !== $_POST['_sale_price'] && '' === $date_to && '' === $date_from ) {
                update_post_meta( $post_id, '_price', wc_format_localized_price( sanitize_text_field( wp_unslash( $_POST['_sale_price'] ) ) ) );
            } else {
                update_post_meta( $post_id, '_price', ( '' === sanitize_text_field( wp_unslash( $_POST['_regular_price'] ) ) ) ? '' : wc_format_localized_price( sanitize_text_field( wp_unslash( $_POST['_regular_price'] ) ) ) );
            }

			if ( isset( $_POST['_sale_price'] ) && '' !== $_POST['_sale_price'] && $date_from && strtotime( $date_from ) < time() ) { //phpcs:ignore
                update_post_meta( $post_id, '_price', wc_format_localized_price( sanitize_text_field( wp_unslash( $_POST['_sale_price'] ) ) ) );
            }

			if ( $date_to && strtotime( $date_to ) < time() ) { //phpcs:ignore
                update_post_meta( $post_id, '_price', ( '' === sanitize_text_field( wp_unslash( $_POST['_regular_price'] ) ) ) ? '' : wc_format_localized_price( sanitize_text_field( wp_unslash( $_POST['_regular_price'] ) ) ) );
                update_post_meta( $post_id, '_sale_price_dates_from', '' );
                update_post_meta( $post_id, '_sale_price_dates_to', '' );
            }
        }

        // Product parent ID for groups.
        if ( isset( $_POST['parent_id'] ) ) {
            wp_update_post(
                array(
                    'ID'          => $post_id,
                    'post_parent' => absint( sanitize_text_field( wp_unslash( $_POST['parent_id'] ) ) ),
                )
            );

        }

        if ( $product->is_type( 'grouped' ) && isset( $_POST['grouped_products'] ) && wc_clean( $_POST['grouped_products'] ) ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            $product->set_children( wc_clean( $_POST['grouped_products'] ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        }

        // Sold Individually.
        if ( ! empty( $_POST['_sold_individually'] ) ) {
            update_post_meta( $post_id, '_sold_individually', 'yes' );
        } else {
            update_post_meta( $post_id, '_sold_individually', '' );
        }

        do_action( 'wcvendors_before_product_save_stock_data', $post_id );
        // Stock Data.
        if ( isset( $_POST['_stock_status'] ) ) {

            if ( 'yes' === get_option( 'woocommerce_manage_stock' ) ) {

                $manage_stock = 'no';
                $backorders   = 'no';
                $stock_status = sanitize_text_field( wp_unslash( $_POST['_stock_status'] ) );

                if ( 'external' === $product_type ) {

                    $stock_status = 'instock';

                } elseif ( 'variable' === $product_type ) {

                    // Stock status is always determined by children so sync later.
                    $stock_status = '';

                    if ( ! empty( $_POST['_manage_stock'] ) ) {
                        $manage_stock = 'yes';
                        $backorders   = sanitize_text_field( wp_unslash( $_POST['_backorders'] ) );
                    }
                } elseif ( 'grouped' !== $product_type && ! empty( $_POST['_manage_stock'] ) ) {
                    $manage_stock = 'yes';
                    $backorders   = sanitize_text_field( wp_unslash( $_POST['_backorders'] ) );
                }

                update_post_meta( $post_id, '_manage_stock', $manage_stock );
                update_post_meta( $post_id, '_backorders', $backorders );

                if ( $stock_status ) {
                    wc_update_product_stock_status( $post_id, $stock_status );
                }

                if ( ! empty( $_POST['_manage_stock'] ) ) {
                    $product = wc_get_product( $post_id );
                    $product->set_stock_quantity( wc_stock_amount( sanitize_text_field( wp_unslash( $_POST['_stock'] ) ) ) );
                    $product->save();

                } else {
                    update_post_meta( $post_id, '_stock', '' );
                }
            } else {
                wc_update_product_stock_status( $post_id, sanitize_text_field( wp_unslash( $_POST['_stock_status'] ) ) );
            }
        } else {
            // Set default to be instock if not managed at all.
            wc_update_product_stock_status( $post_id, 'instock' );
        }

        // Downloadable options.
        if ( 'yes' === $is_downloadable ) {

            $_download_limit = isset( $_POST['_download_limit'] ) ? absint( sanitize_text_field( wp_unslash( $_POST['_download_limit'] ) ) ) : 0;
            if ( ! $_download_limit ) {
                $_download_limit = -1; // 0 or blank = unlimited.
            }

            $_download_expiry = isset( $_POST['_download_expiry'] ) ? absint( sanitize_text_field( wp_unslash( $_POST['_download_expiry'] ) ) ) : 0;
            if ( ! $_download_expiry ) {
                $_download_expiry = -1; // 0 or blank = unlimited.
            }

            $product->set_props(
                array(
                    'download_limit'  => $_download_limit,
                    'download_expiry' => $_download_expiry,
                    'downloads'       => self::prepare_downloads(
                        isset( $_POST['_wc_file_names'] ) ? wc_clean( $_POST['_wc_file_names'] ) : array(), // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
                        isset( $_POST['_wc_file_urls'] ) ? wc_clean( $_POST['_wc_file_urls'] ) : array(), // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
                        isset( $_POST['_wc_file_hashes'] ) ? wc_clean( $_POST['_wc_file_hashes'] ) : array() // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
                    ),
                )
            );

            if ( isset( $_POST['_download_type'] ) ) {
                update_post_meta( $post_id, '_download_type', sanitize_text_field( wp_unslash( $_POST['_download_type'] ) ) );
            }
        }

        // Product url.
        if ( 'external' === $product_type ) {

            if ( isset( $_POST['_product_url'] ) ) {
                update_post_meta( $post_id, '_product_url', esc_url_raw( sanitize_text_field( wp_unslash( $_POST['_product_url'] ) ) ) );
            }

            if ( isset( $_POST['_button_text'] ) ) {
                update_post_meta( $post_id, '_button_text', sanitize_text_field( wp_unslash( $_POST['_button_text'] ) ) );
            }
        }

        $linked_products = array(
            'upsell_ids'    => '_upsell_ids',
            'crosssell_ids' => '_crosssell_ids',
        );

        foreach ( $linked_products as $post_key => $meta_key ) {
            if ( isset( $_POST[ $post_key ] ) && is_array( $_POST[ $post_key ] ) && ! empty( $_POST[ $post_key ] ) ) {
                // Unslash and sanitize the input as an array of absolute integers.
                $product_ids = array_filter( array_map( 'absint', (array) wp_unslash( $_POST[ $post_key ] ) ) );
                update_post_meta( $post_id, $meta_key, $product_ids );
            } else {
                // Use an empty array for consistency with WooCommerce.
                update_post_meta( $post_id, $meta_key, array() );
            }
        }

        // Product template page.
        if ( ! empty( $_POST['_wcv_product_form_template'] ) ) {
            update_post_meta( $post_id, '_wcv_product_form_template', sanitize_text_field( wp_unslash( $_POST['_wcv_product_form_template'] ) ) );
        } else {
            update_post_meta( $post_id, '_wcv_product_form_template', '' );
        }

        // To be used to allow custom hidden meta keys.
        $wcv_custom_hidden_metas = array_intersect_key( $_POST, array_flip( preg_grep( '/^_wcv_custom_product_/', array_keys( $_POST ) ) ) );

        if ( ! empty( $wcv_custom_hidden_metas ) ) {

            foreach ( $wcv_custom_hidden_metas as $key => $value ) {
                $value = $this->allow_markup ? $value : wp_strip_all_tags( $value );
                update_post_meta( $post_id, $key, $value );
            }
        }

        // To be used to allow custom meta keys.
        $wcv_custom_metas = array_intersect_key( $_POST, array_flip( preg_grep( '/^wcv_custom_product_/', array_keys( $_POST ) ) ) );

        if ( ! empty( $wcv_custom_metas ) ) {

            foreach ( $wcv_custom_metas as $key => $value ) {
                $value = $this->allow_markup ? $value : wp_strip_all_tags( $value );
                update_post_meta( $post_id, $key, $value );
            }
        }

        // Save variations.
        if ( 'variable' === $product_type ) {
            // Update parent if variable so price sorting works and stays in sync with the cheapest child.
            \WC_Product_Variable::sync( $post_id );
            \WC_Product_Variable::sync_stock_status( $post_id );
        }

        $hide_seo = wc_string_to_bool( get_option( 'wcvendors_hide_product_seo', 'no' ) );

        if ( ! $hide_seo ) {

            $seo_title = ! empty( $_POST['wcv_product_seo_title'] ) ? wcv_strip_html( sanitize_text_field( wp_unslash( $_POST['wcv_product_seo_title'] ) ) ) : '';
            update_post_meta( $post_id, 'wcv_product_seo_title', $seo_title );

            $seo_description = ! empty( $_POST['wcv_product_seo_description'] ) ? wcv_strip_html( sanitize_text_field( wp_unslash( $_POST['wcv_product_seo_description'] ) ) ) : '';
            update_post_meta( $post_id, 'wcv_product_seo_description', $seo_description );

            $seo_keywords = ! empty( $_POST['wcv_product_seo_keywords'] ) ? wcv_strip_html( sanitize_text_field( wp_unslash( $_POST['wcv_product_seo_keywords'] ) ) ) : '';
            update_post_meta( $post_id, 'wcv_product_seo_keywords', $seo_keywords );

            $seo_opengraph = isset( $_POST['wcv_product_seo_opengraph'] ) ? esc_attr( sanitize_text_field( wp_unslash( $_POST['wcv_product_seo_opengraph'] ) ) ) : 'no';
            update_post_meta( $post_id, 'wcv_product_seo_opengraph', $seo_opengraph );

            $seo_twitter_card = isset( $_POST['wcv_product_seo_twitter_card'] ) ? esc_attr( sanitize_text_field( wp_unslash( $_POST['wcv_product_seo_twitter_card'] ) ) ) : 'no';
            update_post_meta( $post_id, 'wcv_product_seo_twitter_card', $seo_twitter_card );

        }

        $product->set_props(
            array(
                'low_stock_amount' => isset( $_POST['_low_stock_amount'] ) && '' !== wc_clean( $_POST['_low_stock_amount'] ) ? wc_stock_amount( sanitize_text_field( wp_unslash( $_POST['_low_stock_amount'] ) ) ) : '', // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
            )
        );

        $product->save();

        do_action( 'wcv_save_product_meta', $post_id, $product );
    }

    /**
     *  Save product variations
     *
     * @since    1.3.0
     *
     * @param int $post_id the parent post id.
     */
    public function save_variations( $post_id ) {

        global $wpdb;

        $this->allow_markup = wc_string_to_bool( get_option( 'wcvendors_allow_form_markup', 'no' ) );
        $attributes         = (array) maybe_unserialize( get_post_meta( $post_id, '_product_attributes', true ) );
        $deleted_variations = isset( $_POST['wcv_deleted_variations'] ) ? json_decode( stripslashes( $_POST['wcv_deleted_variations'] ) ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        $variation_indexes  = array();

        // Store variations deleted from the UI and remove them if there is any.
        if ( ! empty( $deleted_variations ) ) {
            foreach ( $deleted_variations as $variation ) {
                // Security check.
                if ( ! isset( $variation->id ) || ! isset( $variation->loop ) ) {
                    continue;
                }

                $post_type   = get_post_type( $variation->id );
                $post_parent = wp_get_post_parent_id( $variation->id );
                if ( \WCV_Vendor_Dashboard::check_object_permission( 'product', $post_id ) == false ) { //phpcs:ignore
                    continue;
                }
                if ( 'product_variation' !== $post_type || $post_parent !== $post_id ) {
                    continue;
                }
                // End security check.
                wp_delete_post( $variation->id );
                $variation_indexes[] = (int) $variation->loop;
            }
        }

        if ( ! isset( $_POST['variable_post_id'] ) || ! is_array( $_POST['variable_post_id'] ) ) {
            return;
        }
        // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        $variable_post_id               = isset( $_POST['variable_post_id'] ) ? array_map( 'absint', $_POST['variable_post_id'] ) : array();
        $variable_sku                   = isset( $_POST['variable_sku'] ) && is_array( $_POST['variable_sku'] ) ? array_map( 'sanitize_text_field', $_POST['variable_sku'] ) : array();
        $variable_regular_price         = isset( $_POST['variable_regular_price'] ) && is_array( $_POST['variable_regular_price'] ) ? array_map( 'wc_format_decimal', $_POST['variable_regular_price'] ) : array();
        $variable_sale_price            = isset( $_POST['variable_sale_price'] ) && is_array( $_POST['variable_sale_price'] ) ? array_map( 'wc_format_decimal', $_POST['variable_sale_price'] ) : array();
        $upload_image_id                = isset( $_POST['upload_image_id'] ) && is_array( $_POST['upload_image_id'] ) ? array_map( 'absint', $_POST['upload_image_id'] ) : array();
        $variable_download_limit        = isset( $_POST['variable_download_limit'] ) && is_array( $_POST['variable_download_limit'] ) ? array_map( 'absint', $_POST['variable_download_limit'] ) : array();
        $variable_download_expiry       = isset( $_POST['variable_download_expiry'] ) && is_array( $_POST['variable_download_expiry'] ) ? array_map( 'absint', $_POST['variable_download_expiry'] ) : array();
        $variable_shipping_class        = isset( $_POST['variable_shipping_class'] ) && is_array( $_POST['variable_shipping_class'] ) ? array_map( 'sanitize_text_field', $_POST['variable_shipping_class'] ) : array();
        $variable_tax_class             = isset( $_POST['variable_tax_class'] ) && is_array( $_POST['variable_tax_class'] ) ? array_map( 'sanitize_text_field', $_POST['variable_tax_class'] ) : array();
        $variable_menu_order            = isset( $_POST['variation_menu_order'] ) && is_array( $_POST['variation_menu_order'] ) ? array_map( 'absint', $_POST['variation_menu_order'] ) : array();
        $variable_sale_price_dates_from = isset( $_POST['variable_sale_price_dates_from'] ) && is_array( $_POST['variable_sale_price_dates_from'] ) ? array_map( 'sanitize_text_field', $_POST['variable_sale_price_dates_from'] ) : array();
        $variable_sale_price_dates_to   = isset( $_POST['variable_sale_price_dates_to'] ) && is_array( $_POST['variable_sale_price_dates_to'] ) ? array_map( 'sanitize_text_field', $_POST['variable_sale_price_dates_to'] ) : array();

        $variable_weight          = isset( $_POST['variable_weight'] ) && is_array( $_POST['variable_weight'] ) ? array_map( 'wc_format_decimal', $_POST['variable_weight'] ) : array();
        $variable_length          = isset( $_POST['variable_length'] ) && is_array( $_POST['variable_length'] ) ? array_map( 'wc_format_decimal', $_POST['variable_length'] ) : array();
        $variable_width           = isset( $_POST['variable_width'] ) && is_array( $_POST['variable_width'] ) ? array_map( 'wc_format_decimal', $_POST['variable_width'] ) : array();
        $variable_height          = isset( $_POST['variable_height'] ) && is_array( $_POST['variable_height'] ) ? array_map( 'wc_format_decimal', $_POST['variable_height'] ) : array();
        $variable_enabled         = isset( $_POST['variable_enabled'] ) && is_array( $_POST['variable_enabled'] ) ? array_map( 'sanitize_text_field', $_POST['variable_enabled'] ) : array();
        $variable_is_virtual      = isset( $_POST['variable_is_virtual'] ) && is_array( $_POST['variable_is_virtual'] ) ? array_map( 'sanitize_text_field', $_POST['variable_is_virtual'] ) : array();
        $variable_is_downloadable = isset( $_POST['variable_is_downloadable'] ) && is_array( $_POST['variable_is_downloadable'] ) ? array_map( 'sanitize_text_field', $_POST['variable_is_downloadable'] ) : array();

        $variable_manage_stock = isset( $_POST['variable_manage_stock'] ) && is_array( $_POST['variable_manage_stock'] ) ? array_map( 'sanitize_text_field', $_POST['variable_manage_stock'] ) : array();
        $variable_stock        = isset( $_POST['variable_stock'] ) && is_array( $_POST['variable_stock'] ) ? array_map( 'absint', $_POST['variable_stock'] ) : array();
        $variable_backorders   = isset( $_POST['variable_backorders'] ) && is_array( $_POST['variable_backorders'] ) ? array_map( 'sanitize_text_field', $_POST['variable_backorders'] ) : array();
        $variable_stock_status = isset( $_POST['variable_stock_status'] ) && is_array( $_POST['variable_stock_status'] ) ? array_map( 'sanitize_text_field', $_POST['variable_stock_status'] ) : array();

        $variable_description = isset( $_POST['variable_description'] ) && is_array( $_POST['variable_description'] ) ? array_map( 'wp_kses_post', $_POST['variable_description'] ) : array();

        $max_loop = max( array_keys( $_POST['variable_post_id'] ) );
        // phpcs:enable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        for ( $i = 0; $i <= $max_loop; $i++ ) {

            if ( ! isset( $variable_post_id[ $i ] ) ) {
                continue;
            }

            if ( in_array( $i, $variation_indexes, true ) ) {
                continue;
            }

            $variation_id = absint( $variable_post_id[ $i ] );

            // Checkboxes.
            $is_virtual      = isset( $variable_is_virtual[ $i ] ) ? 'yes' : 'no';
            $is_downloadable = isset( $variable_is_downloadable[ $i ] ) ? 'yes' : 'no';
            $post_status     = isset( $variable_enabled[ $i ] ) ? 'publish' : 'private';
            $manage_stock    = isset( $variable_manage_stock[ $i ] ) ? 'yes' : 'no';

            // Generate a useful post title.
            $variation_post_title = sprintf(
                /* translators: %1$s: variation id %2$s: product title */
                __( 'Variation #%1$s of %2$s', 'wc-vendors' ),
                absint( $variation_id ),
                esc_html( get_the_title( $post_id ) )
            );

            // Update or Add post.
            if ( ! $variation_id ) {

                $variation = array(
                    'post_title'   => $variation_post_title,
                    'post_content' => '',
                    'post_status'  => $post_status,
                    'post_author'  => get_current_user_id(),
                    'post_parent'  => $post_id,
                    'post_type'    => 'product_variation',
                    'menu_order'   => $variable_menu_order[ $i ],
                );

                $variation_id = wp_insert_post( $variation );

                do_action( 'wcv_create_product_variation', $variation_id, $i );

            } else {

				$modified_date = date_i18n( 'Y-m-d H:i:s', time() ); //phpcs:ignore

                $wpdb->update(
                    $wpdb->posts,
                    array(
                        'post_status'       => $post_status,
                        'post_title'        => $variation_post_title,
                        'menu_order'        => $variable_menu_order[ $i ],
                        'post_modified'     => $modified_date,
                        'post_modified_gmt' => get_gmt_from_date( $modified_date ),
                    ),
                    array( 'ID' => $variation_id )
                );

                clean_post_cache( $variation_id );

                do_action( 'wcv_update_product_variation', $variation_id, $i );

            }

            // Only continue if we have a variation ID.
            if ( ! $variation_id ) {
                continue;
            }

            // Unique SKU.
            $sku     = get_post_meta( $variation_id, '_sku', true );
            $new_sku = wc_clean( $variable_sku[ $i ] );

            if ( '' === $new_sku ) {
                update_post_meta( $variation_id, '_sku', '' );
            } elseif ( $new_sku !== $sku ) {
                if ( ! empty( $new_sku ) ) {
                    $unique_sku = wc_product_has_unique_sku( $variation_id, $new_sku );

                    if ( ! $unique_sku ) {
                        \WC_Admin_Meta_Boxes::add_error(
                            sprintf(
                            /* translators: %s: variation id */
                                __( '#%s &ndash; Variation SKU must be unique.', 'wc-vendors' ),
                                $variation_id
                            )
                        );
                    } else {
                        update_post_meta( $variation_id, '_sku', $new_sku );
                    }
                } else {
                    update_post_meta( $variation_id, '_sku', '' );
                }
            }

            // Update post meta.
            update_post_meta( $variation_id, '_thumbnail_id', absint( $upload_image_id[ $i ] ) );
            update_post_meta( $variation_id, '_virtual', wc_clean( $is_virtual ) );
            update_post_meta( $variation_id, '_downloadable', wc_clean( $is_downloadable ) );

            if ( isset( $variable_weight[ $i ] ) ) {
                update_post_meta( $variation_id, '_weight', ( '' === $variable_weight[ $i ] ) ? '' : wc_format_decimal( $variable_weight[ $i ] ) );
            }

            if ( isset( $variable_length[ $i ] ) ) {
                update_post_meta( $variation_id, '_length', ( '' === $variable_length[ $i ] ) ? '' : wc_format_decimal( $variable_length[ $i ] ) );
            }

            if ( isset( $variable_width[ $i ] ) ) {
                update_post_meta( $variation_id, '_width', ( '' === $variable_width[ $i ] ) ? '' : wc_format_decimal( $variable_width[ $i ] ) );
            }

            if ( isset( $variable_height[ $i ] ) ) {
                update_post_meta( $variation_id, '_height', ( '' === $variable_height[ $i ] ) ? '' : wc_format_decimal( $variable_height[ $i ] ) );
            }

            // Stock handling.
            update_post_meta( $variation_id, '_manage_stock', $manage_stock );

            $variation_object = new \WC_Product_Variation( $variation_id );

            // Only update stock status to user setting if changed by the user, but do so before looking at stock levels at variation level.
            if ( ! empty( $variable_stock_status[ $i ] ) ) {
                $stock_qty = $variable_stock[ $i ] > 0 ? $variable_stock[ $i ] : 0;
                $variation_object->set_stock_quantity( $stock_qty );
                $variation_object->save();
            }

            if ( 'yes' === $manage_stock ) {
                $back_orders = wc_clean( $variable_backorders[ $i ] );
                $stock_qty   = $variable_stock[ $i ] > 0 ? $variable_stock[ $i ] : 0;
                $variation_object->set_backorders( $back_orders );
                $variation_object->set_stock_quantity( $stock_qty );
                $variation_object->save();
            } else {
                delete_post_meta( $variation_id, '_backorders' );
                delete_post_meta( $variation_id, '_stock' );
            }

            // Price handling.
            $regular_price = wc_format_decimal( $variable_regular_price[ $i ] );
            $sale_price    = '' === $variable_sale_price[ $i ] ? '' : wc_format_decimal( $variable_sale_price[ $i ] );
            $date_from     = wc_clean( $variable_sale_price_dates_from[ $i ] );
            $date_to       = wc_clean( $variable_sale_price_dates_to[ $i ] );

			if ( wc_clean( $date_from ) == wc_clean( $date_to ) ) { //phpcs:ignore
                $date_to   = '';
                $date_from = '';
            }

            update_post_meta( $variation_id, '_regular_price', $regular_price );
            update_post_meta( $variation_id, '_sale_price', $sale_price );

            // Save Dates.
            update_post_meta( $variation_id, '_sale_price_dates_from', $date_from ? strtotime( $date_from ) : '' );
            update_post_meta( $variation_id, '_sale_price_dates_to', $date_to ? strtotime( $date_to ) : '' );

            if ( $date_to && ! $date_from ) {
				update_post_meta( $variation_id, '_sale_price_dates_from', time() ); //phpcs:ignore
            }

            // Update price if on sale.
            if ( '' !== $sale_price && '' === $date_to && '' === $date_from ) {
                update_post_meta( $variation_id, '_price', $sale_price );
            } else {
                update_post_meta( $variation_id, '_price', $regular_price );
            }

			if ( '' !== $sale_price && $date_from && strtotime( $date_from ) < time() ) { //phpcs:ignore
                update_post_meta( $variation_id, '_price', $sale_price );
            }

			if ( $date_to && strtotime( $date_to ) < time() ) { //phpcs:ignore
                update_post_meta( $variation_id, '_price', $regular_price );
                update_post_meta( $variation_id, '_sale_price_dates_from', '' );
                update_post_meta( $variation_id, '_sale_price_dates_to', '' );
            }

            if ( isset( $variable_tax_class[ $i ] ) && 'parent' !== $variable_tax_class[ $i ] ) {
                update_post_meta( $variation_id, '_tax_class', wc_clean( $variable_tax_class[ $i ] ) );
            } else {
                delete_post_meta( $variation_id, '_tax_class' );
            }

            if ( 'yes' === $is_downloadable ) {
                update_post_meta( $variation_id, '_download_limit', wc_clean( $variable_download_limit[ $i ] ) );
                update_post_meta( $variation_id, '_download_expiry', wc_clean( $variable_download_expiry[ $i ] ) );

                $attr_key = isset( $_POST['_wc_variation_file_urls'][ $variation_id ] ) ? $variation_id : $i;
                // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
                $files              = array();
                $file_names         = isset( $_POST['_wc_variation_file_names'][ $attr_key ] ) ? array_map( 'wc_clean', $_POST['_wc_variation_file_names'][ $attr_key ] ) : array();
                $file_urls          = isset( $_POST['_wc_variation_file_urls'][ $attr_key ] ) ? array_map( 'wc_clean', $_POST['_wc_variation_file_urls'][ $attr_key ] ) : array();
                $file_ids           = isset( $_POST['_wc_variation_file_ids'][ $attr_key ] ) ? array_map( 'wc_clean', $_POST['_wc_variation_file_ids'][ $attr_key ] ) : array();
                $file_display       = isset( $_POST['_wc_variation_file_display'][ $attr_key ] ) ? array_map( 'wc_clean', $_POST['_wc_variation_file_display'][ $attr_key ] ) : array();
                $file_url_size      = count( $file_urls );
                $allowed_file_types = get_allowed_mime_types();
                // phpcs:enable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
                for ( $ii = 0; $ii < $file_url_size; $ii++ ) {
                    if ( ! empty( $file_urls[ $ii ] ) ) {
                        // Find type and file URL.
                        if ( str_starts_with( $file_urls[ $ii ], 'http' ) ) {
                            $file_is  = 'absolute';
                            $file_url = esc_url_raw( $file_urls[ $ii ] );
                        } elseif ( '[ ' === substr( $file_urls[ $ii ], 0, 1 ) && ' ]' === substr( $file_urls[ $ii ], -1 ) ) {
                            $file_is  = 'shortcode';
                            $file_url = wc_clean( $file_urls[ $ii ] );
                        } else {
                            $file_is  = 'relative';
                            $file_url = wc_clean( $file_urls[ $ii ] );
                        }

                        $file_name = wc_clean( $file_names[ $ii ] );
                        $file_hash = md5( $file_url );
                        $file_id   = $file_ids[ $ii ];

                        // Validate the file extension.
						if ( in_array( $file_is, array( 'absolute', 'relative' ) ) ) { //phpcs:ignore
                            $file_type  = wp_check_filetype( strtok( $file_url, '?' ), $allowed_file_types );
                            $parsed_url = wp_parse_url( $file_url, PHP_URL_PATH );
                            $extension  = pathinfo( $parsed_url, PATHINFO_EXTENSION );

                            // TODO: Make this on the front end instead of backend.
                            if ( ! empty( $extension ) && ! in_array( $file_type['type'], $allowed_file_types, true ) ) {
                                \WC_Admin_Meta_Boxes::add_error(
                                    sprintf(
                                    /* translators: %1$s: variation id %2$s: file name %3$s: allowed file types */
                                        __( '#%1$s &ndash; The downloadable file %2$s cannot be used as it does not have an allowed file type. Allowed types include: %3$s', 'wc-vendors' ),
                                        $variation_id,
                                        '<code>' . basename( $file_url ) . '</code>',
                                        '<code>' . implode( ', ', array_keys( $allowed_file_types ) ) . '</code>'
                                    )
                                );
                                continue;
                            }
                        }

                        // Validate the file exists.
                        if ( 'relative' === $file_is && ! apply_filters( 'woocommerce_downloadable_file_exists', file_exists( $file_url ), $file_url ) ) {
                            \WC_Admin_Meta_Boxes::add_error(
                                sprintf(
                                /* translators: %1$s: variation id %2$s: file url */
                                    __( '#%1$s &ndash; The downloadable file %2$s cannot be used as it does not exist on the server.', 'wc-vendors' ),
                                    $variation_id,
                                    '<code>' . $file_url . '</code>'
                                )
                            );
                            continue;
                        }

                        // Has the file selected.
                        wcv_md5_attachment_url( $file_id );

                        $files[ $file_hash ] = array(
                            'name' => ! empty( $file_name ) ? $file_name : basename( $file_url ),
                            'file' => $file_url,
                        );
                    }
                }

                // grant permission to any newly added files on any existing orders for this product prior to saving.
                do_action( 'wcv_process_product_file_download_paths', $post_id, $variation_id, $files );

                update_post_meta( $variation_id, '_downloadable_files', $files );
            } else {
                update_post_meta( $variation_id, '_download_limit', '' );
                update_post_meta( $variation_id, '_download_expiry', '' );
                update_post_meta( $variation_id, '_downloadable_files', '' );
            }

            $variable_description[ $i ] = $this->allow_markup ? $variable_description[ $i ] : wp_strip_all_tags( $variable_description[ $i ] );

            update_post_meta( $variation_id, '_variation_description', wp_kses_post( $variable_description[ $i ] ) );

            // Save shipping class.
            $variable_shipping_class[ $i ] = ! empty( $variable_shipping_class[ $i ] ) ? (int) $variable_shipping_class[ $i ] : '';
            wp_set_object_terms( $variation_id, $variable_shipping_class[ $i ], 'product_shipping_class' );

            // Update Attributes.
            $updated_attribute_keys = array();
            foreach ( $attributes as $attribute ) {
                if ( $attribute['is_variation'] ) {
                    $attribute_key            = 'attribute_' . sanitize_title( $attribute['name'] );
                    $updated_attribute_keys[] = $attribute_key;
                    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash
                    if ( $attribute['is_taxonomy'] ) {
                        // Don't use wc_clean as it destroys sanitized characters.
                        $value = isset( $_POST[ $attribute_key ][ $i ] ) ? sanitize_title( stripslashes( $_POST[ $attribute_key ][ $i ] ) ) : '';
                    } else {
                        $value = isset( $_POST[ $attribute_key ][ $i ] ) ? wc_clean( stripslashes( $_POST[ $attribute_key ][ $i ] ) ) : '';
                    }
                    // phpcs:enable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
                    update_post_meta( $variation_id, $attribute_key, $value );
                }
            }

            // Remove old taxonomies attributes so data is kept up to date - first get attribute key names.
			$delete_attribute_keys = $wpdb->get_col( $wpdb->prepare( "SELECT meta_key FROM {$wpdb->postmeta} WHERE meta_key LIKE 'attribute_%%' AND meta_key NOT IN ( '" . implode( "','", $updated_attribute_keys ) . "' ) AND post_id = %d;", $variation_id ) ); //phpcs:ignore

            foreach ( $delete_attribute_keys as $key ) {
                delete_post_meta( $variation_id, $key );
            }

            do_action( 'wcv_save_product_variation', $variation_id, $i );
        }

        // Update parent if variable so price sorting works and stays in sync with the cheapest child.
        \WC_Product_Variable::sync( $post_id );

        // Update default attribute options setting.
        $default_attributes = array();

        foreach ( $attributes as $attribute ) {

            if ( $attribute['is_variation'] ) {
                $value = '';

                if ( isset( $_POST[ 'default_attribute_' . sanitize_title( $attribute['name'] ) ] ) ) {

                    if ( $attribute['is_taxonomy'] ) {
                        // Don't use wc_clean as it destroys sanitized characters.
                        $value = sanitize_title( trim( stripslashes( $_POST[ 'default_attribute_' . sanitize_title( $attribute['name'] ) ] ) ) ); // phpcs:ignore
                    } else {
                        $value = wc_clean( trim( stripslashes( $_POST[ 'default_attribute_' . sanitize_title( $attribute['name'] ) ] ) ) ); // phpcs:ignore
                    }
                }

                if ( $value ) {
                    $default_attributes[ sanitize_title( $attribute['name'] ) ] = $value;
                }
            }
        }

        update_post_meta( $post_id, '_default_attributes', $default_attributes );
    }

    /**
     * Search for products and echo json
     *
     * @since 2.5.2
     *
     * @param string $x          (default: '').
     * @param string $post_types (default: array('product')).
     */
    public static function json_search_products( $x = '', $post_types = array( 'product' ) ) {

        ob_start();

        check_ajax_referer( 'wcv-search-products', 'security' );

        $term = isset( $_GET['term'] ) ? sanitize_text_field( wp_unslash( $_GET['term'] ) ) : '';

        if ( empty( $term ) ) {
            die();
        }

        $args = array(
            'post_type'      => $post_types,
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'post_author'    => get_current_user_id(),
            's'              => $term,
            'fields'         => 'ids',
        );

        if ( is_numeric( $term ) ) {

            $args2 = array(
                'post_type'      => $post_types,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'post__in'       => array( 0, $term ),
                'fields'         => 'ids',
            );

            $args3 = array(
                'post_type'      => $post_types,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'post_parent'    => $term,
                'fields'         => 'ids',
            );

            $args4 = array(
                'post_type'      => $post_types,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'meta_query'     => array(
                    array(
                        'key'     => '_sku',
                        'value'   => $term,
                        'compare' => 'LIKE',
                    ),
                ),
                'fields'         => 'ids',
            );

            $posts = array_unique( array_merge( get_posts( $args ), get_posts( $args2 ), get_posts( $args3 ), get_posts( $args4 ) ) );

        } else {

            $args2 = array(
                'post_type'      => $post_types,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'meta_query'     => array(
                    array(
                        'key'     => '_sku',
                        'value'   => $term,
                        'compare' => 'LIKE',
                    ),
                ),
                'fields'         => 'ids',
            );

            $posts = array_unique( array_merge( get_posts( $args ), get_posts( $args2 ) ) );

        }

        $found_products = array();

        if ( $posts ) {
            foreach ( $posts as $post ) {
                $product                 = wc_get_product( $post );
                $found_products[ $post ] = rawurldecode( $product->get_formatted_name() );
            }
        }

        $found_products = apply_filters( 'woocommerce_json_search_found_products', $found_products );

        wp_send_json( $found_products );
    }

    /**
     * Search for product tags and echo json
     *
     * @since 2.5.2
     */
    public static function json_search_product_tags() {

        $tag_taxonomy = 'product_tag';

        ob_start();

        check_ajax_referer( 'wcv-search-product-tags', 'security' );

        $term = isset( $_GET['term'] ) ? sanitize_text_field( wp_unslash( $_GET['term'] ) ) : '';

        if ( empty( $term ) ) {
            die();
        }

        $args = apply_filters(
            'wcv_json_search_tags_args',
            array(
                'orderby'    => 'name',
                'hide_empty' => false,
                'search'     => $term,
                'fields'     => 'ids',
                'taxonomy'   => $tag_taxonomy,
            )
        );

        $tags = get_terms( $args );

        $found_tags = array();

        if ( $tags ) {

            foreach ( $tags as $tag ) {
                $product_tag        = get_term( $tag, $tag_taxonomy );
                $found_tags[ $tag ] = rawurldecode( $product_tag->name );
            }
        }

        $found_tags = apply_filters( 'wcv_json_search_found_tags', $found_tags );

        wp_send_json( $found_tags );
    }

    /**
     * Product status text for output on front end.
     *
     * @since    2.5.2
     *
     * @param      string $status product post status.
     */
    public static function product_status( $status ) {

        $product_status = apply_filters(
            'wcv_product_status',
            array(
                'publish' => __( 'Online', 'wc-vendors' ),
                'future'  => __( 'Scheduled', 'wc-vendors' ),
                'draft'   => __( 'Draft', 'wc-vendors' ),
                'pending' => __( 'Pending Approval', 'wc-vendors' ),
                'private' => __( 'Admin Only', 'wc-vendors' ),
                'trash'   => __( 'Trash', 'wc-vendors' ),
            )
        );

        if ( isset( $product_status[ $status ] ) ) {
            return $product_status[ $status ];
        }

        return $status;
    }

    /**
     *  Update Table Headers for display of product post type.
     *
     * @since    2.5.2
     *
     * @param array $columns array passed via filter.
     */
    public function table_columns( $columns ) {

        $columns = array(
            'ID'      => array(
                'label' => __( 'ID', 'wc-vendors' ),
            ),
            'tn'      => array(
                'label'         => __( 'Thumbnail', 'wc-vendors' ),
                'icon'          => 'wcv-icon-thumbnail',
                'mobile_header' => false,
                'full_span'     => true,
            ),
            'details' => array(
                'label'         => __( 'Details', 'wc-vendors' ),
                'icon'          => 'wcv-icon-details',
                'mobile_header' => false,
                'full_span'     => true,
            ),
            'price'   => array(
                'label'         => __( 'Price', 'wc-vendors' ),
                'icon'          => 'wcv-icon-column-total',
                'mobile_header' => false,
            ),
            'status'  => array(
                'label'         => __( 'Actions', 'wc-vendors' ),
                'icon'          => 'wcv-icon-column-actions',
                'mobile_header' => false,
                'full_span'     => true,
            ),
        );

        return apply_filters( 'wcv_product_table_columns', $columns );
    }

    /**
     *  Manipulate the table data
     *
     * @since    2.5.2
     * @version  1.7.5
     * @version  1.8.4 - Added can submit check
     *
     * @param    array $rows array of wp_post objects passed by the filter.
     * @param    mixed $result_object the wp_query object.
     *
     * @return   array  $new_rows    array of stdClass objects passed back to the filter.
     */
    public function table_rows( $rows, $result_object ) {

        $new_rows = array();

        $this->max_num_pages = $result_object->max_num_pages;

        $current_user_id    = get_current_user_id();
        $can_edit           = wc_string_to_bool( get_option( 'wcvendors_capability_products_edit', 'no' ) );
        $can_edit           = wcv_apply_vendor_trust_status( $can_edit, $current_user_id );
        $can_edit_approved  = wc_string_to_bool( get_option( 'wcvendors_capability_products_approved', 'no' ) );
        $disable_delete     = wc_string_to_bool( get_option( 'wcvendors_capability_product_delete', 'no' ) );
        $allow_duplicate    = wc_string_to_bool( get_option( 'wcvendors_capability_product_duplicate', 'no' ) );
        $lock_edit_products = 'yes' === wcv_get_pro_user_meta( $current_user_id, '_wcv_lock_edit_products_vendor', 'no' ) ? true : false;
        $can_submit         = wc_string_to_bool( get_option( 'wcvendors_capability_products_enabled', 'no' ) );

        // get the page product listing page number and pass that value with edit link.
        $page_no = ( 1 < $result_object->query['paged'] && 'list' === wcv_get_pro_option( 'wcvendors_save_product_redirect', 'edit' ) ) ? '?wcv_paged_id=' . $result_object->query['paged'] : '';

        foreach ( $rows as $row ) {

            $product      = wc_get_product( $row->ID );
            $new_row      = new \stdClass();
            $delete_nonce = wp_create_nonce( 'wcv-delete-product-' . $product->get_id() );

            $row_actions = apply_filters(
                'wcv_product_table_row_actions',
                array(
                    'edit'      => apply_filters(
                        'wcv_product_table_row_actions_edit',
                        array(
                            'label' => __( 'Edit', 'wc-vendors' ),
                            'class' => '',
                            'url'   => self::get_product_edit_link( $product->get_id() ) . $page_no,
                            'icon'  => 'wcv-icon-edit',
                        )
                    ),
                    'view'      => apply_filters(
                        'wcv_product_table_row_actions_view',
                        array(
                            'label'  => __( 'View', 'wc-vendors' ),
                            'class'  => '',
                            'url'    => get_permalink( $product->get_id() ),
                            'target' => wc_string_to_bool( wcv_get_pro_option( 'wcvendors_dashboard_view_product_new_window', 'yes' ) ) ? '_blank' : '_self',
                            'icon'   => 'wcv-icon-view',
                        )
                    ),
                    'duplicate' => apply_filters(
                        'wcv_product_table_row_actions_duplicate',
                        array(
                            'label' => __( 'Duplicate', 'wc-vendors' ),
                            'class' => '',
                            'url'   => \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product/duplicate/' . $product->get_id() ),
                            'icon'  => 'wcv-icon-duplicate',
                        )
                    ),
                    'delete'    => apply_filters(
                        'wcv_product_table_row_actions_delete',
                        array(
                            'label'      => __( 'Delete', 'wc-vendors' ),
                            'class'      => 'confirm_delete',
                            'wrap_class' => 'danger',
                            'custom'     => array( 'data-confirm_text' => __( 'Delete product?', 'wc-vendors' ) ),
                            'url'        => \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product/delete/' . $product->get_id() ) . '?_wpnonce=' . $delete_nonce,
                            'icon'       => 'wcv-icon-trash',
                        )
                    ),
                ),
                $product
            );

            // Check if you can edit published products or the product is variable.
            if ( ( ! $can_edit && 'publish' === $row->post_status ) || $lock_edit_products ) {
                unset( $row_actions['edit'] );
            }

            // Check if you can delete the product.
            if ( $disable_delete ) {
                unset( $row_actions['delete'] );
            }

            // Check if you can duplicate the product.
            if ( ! $allow_duplicate ) {
                unset( $row_actions['duplicate'] );
            }

            // Check if you can submit the product.
            if ( ! $can_submit ) {
                $unset_actions = array( 'edit', 'duplicate' );
                foreach ( $unset_actions as $action ) {
                    if ( isset( $row_actions[ $action ] ) ) {
                        unset( $row_actions[ $action ] );
                    }
                }
            }

            $product_types = wcv_get_product_types();
            $product_type  = isset( $product_types[ $product->get_type() ] ) ? $product_types[ $product->get_type() ] : '';

            if ( '' === $product_type ) {
                continue;
            }

            $tn_img  = has_post_thumbnail( $row->ID ) ? get_the_post_thumbnail( $row->ID, array( 160, 160 ), array( 'style' => 'margin-bottom: 0;' ) ) : wc_placeholder_img( 'thumbnail', array( 'style' => 'margin-bottom: 0;' ) );
            $tn_sale = $product->is_on_sale() ? '<span class="wcv-sale-badge">' . esc_html__( 'Sale', 'wc-vendors' ) . '</span>' : '';

            $new_row->ID          = $row->ID;
            $new_row->tn          = '<div class="wcv-thumb-wrap">' . $tn_img . $tn_sale . '</div>';
            $new_row->tn         .= sprintf(
                '<div class="wcv_mobile">
                <h4 class="wcv-product-title">
                <span class="wcv-product-title-text">%s</span>
                <span class="wcv-status product-status--%s">%s</span>
                </h4>
                <small>%s %s</small>
                </div>',
                $product->get_name(),
                'draft' === $row->post_status ? 'draft' : 'hidden',
                self::product_status( $row->post_status ),
                'publish' === $row->post_status ? __( 'Date Published:', 'wc-vendors' ) : '',
                'publish' === $row->post_status ? $product->get_date_created()->date( $this->date_format ) : ''
            );
            $new_row->details     = apply_filters( 'wcv_product_row_details', $this->build_row_details( $product ) );
            $new_row->price       = $product->get_price_html();
            $new_row->status      = apply_filters( 'wcv_product_row_status', '', $row->post_status, $product->get_type(), $row->post_date, $product->get_stock_status(), $product );
            $new_row->row_actions = $row_actions;
            $new_row->product     = $product;

            $new_rows[] = $new_row;
        }

        return apply_filters( 'wcv_product_table_rows', $new_rows );
    }

    /**
     *  Change the column that actions are displayed in
     *
     * @since    2.5.2
     *
     * @param     string $column column passed from filter.
     *
     * @return   string $new_column    new column passed back to filter.
     */
	public function table_action_column( $column ) { // phpcs:ignore

        $new_column = 'status';

        return apply_filters( 'wcv_product_table_action_column', $new_column );
    }

    /**
     *  Add actions before and after the table.
     *
     * @param string $id       (default: 'product').
     * @param string $position (default: 'before').
     *
     * @since    2.5.2
     */
	public function table_actions( $id = 'product', $position = 'before' ) { // phpcs:ignore

        // Hide if position is after and no products.
        if ( 'after' === $position && 0 === $this->max_num_pages ) {
            return;
        }

        $current_user_id   = get_current_user_id();
        $lock_new_products = apply_filters( 'wcv_product_table_lock_new_products', ( 'yes' === wcv_get_pro_user_meta( $current_user_id, '_wcv_lock_new_products_vendor', 'no' ) ) ? true : false );
        $search            = isset( $_POST['wcv-search'] ) ? sanitize_text_field( wp_unslash( $_POST['wcv-search'] ) ) : '';
        $can_submit        = wc_string_to_bool( get_option( 'wcvendors_capability_products_enabled', 'no' ) );

        $pagination_wrapper = apply_filters(
            'wcv_product_paginate_wrapper',
            array(
                'wrapper_start' => '<nav class="woocommerce-pagination">',
                'wrapper_end'   => '</nav>',
            )
        );

        $product_counts = $this->count_products_status();

        $template_overrides = $this->get_product_templates();
        include apply_filters( 'wcv_product_table_actions_path', 'partials/product/wcvendors-table-actions.php' );
    }

    /**
     * Prepare template overrides option.
     *
     * @param array $templates Templates.
     *
     * @return array
     */
    public function template_overrides_options( $templates ) {
        $template_path     = 'wc-vendors/dashboard/';
        $product_templates = array();
        $stylesheet_path   = get_stylesheet_directory();
        if ( file_exists( $stylesheet_path . '/' . $template_path ) ) {
            $product_templates = glob( $stylesheet_path . '/' . $template_path . 'product-*.php' );
        }

        if ( ! empty( $product_templates ) ) {

            foreach ( $product_templates as $file_path ) {

                $prefix = $stylesheet_path . '/' . $template_path;

                // Find the file name from he path, remove the extension then generate the dashboard link.
                if ( substr( $file_path, 0, strlen( $prefix ) ) === $prefix ) {
                    $filename        = substr( $file_path, strlen( $prefix ) );
                    $filename_no_ext = preg_replace( '/\\.[^.\\s]{3,4}$/', '', $filename );
                    $template_part   = substr( $filename_no_ext, strlen( 'product-' ) );
                    $template_info   = implode( '', file( $file_path ) );
                    $label           = ( preg_match( '|Label: (.*)$|mi', $template_info, $label_name ) ) ? $label_name[1] : ucfirst( $template_part );

                    if ( self::get_default_product_template()['filename'] === $filename ) {
                        continue;
                    }

                    $templates[ $template_part ] = $label;
                }
            }
        }

        return $templates;
    }

    /**
     * Table notice
     *
     * @since    2.5.2
     *
     * @param     string $notice notice passed from filter.
     */
    public function table_no_data_notice( $notice ) {

        $notice = __( 'No products found.', 'wc-vendors' );

        return apply_filters( 'wcv_product_table_no_data_notice', $notice );
    }

    /**
     *  Posts per page
     *
     * @since    1.2.4
     *
     * @param     int $per_page number of posts to display from the admin options.
     */
	public function table_posts_per_page( $per_page ) {  // phpcs:ignore

        return get_option( 'wcvendors_products_per_page', 20 );
    }

    /**
     *  Add Atribute ajax call
     *
     * @since    1.3.0
     */
    public static function json_add_attribute() {

        ob_start();

        check_ajax_referer( 'wcv-add-attribute', 'security' );

		if ( ! current_user_can( 'edit_products' ) ) { // phpcs:ignore
            die( -1 );
        }

        global $wc_product_attributes;

        $post_id       = 0;
        $taxo          = isset( $_POST['taxonomy'] ) ? sanitize_text_field( wp_unslash( $_POST['taxonomy'] ) ) : '';
        $i             = isset( $_POST['i'] ) ? absint( wp_unslash( $_POST['i'] ) ) : 0;
        $position      = 0;
        $metabox_class = array();
        $attribute     = array(
            'name'         => $taxo,
            'value'        => '',
            'is_visible'   => apply_filters( 'woocommerce_attribute_default_visibility', 1 ),
            'is_variation' => 0,
            'is_taxonomy'  => '' !== $taxo ? 1 : 0,
        );

        if ( '' !== $taxo ) {
            $attribute_taxonomy = $wc_product_attributes[ $taxo ];
            $metabox_class[]    = 'taxonomy';
            $metabox_class[]    = $taxo;
            $attribute_label    = wc_attribute_label( $taxo );
        } else {
            $attribute_label                     = '';
            $metabox_class[]                     = '';
            $attribute_taxonomy                  = new \stdClass();
            $attribute_taxonomy->attribute_type  = 'text';
            $attribute_taxonomy->attribute_label = '';
        }

        $attribute_terms_allowed = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_vendor_attribute_terms', 'no' ) );

        include wcv_deprecated_filter( 'wcvendors_pro_product_attribute_path', '2.5.2', 'wcvendors_product_attribute_path', 'forms/partials/wcvendors-product-attribute.php' );

        wp_die();
    }

    /**
     *  Add a new atribute ajax call
     *
     * @since    1.2.5
     */
    public static function json_add_new_attribute() {

        $attribute_terms_allowed = wc_string_to_bool( wcv_get_pro_option( 'wcvendors_allow_vendor_attribute_terms', 'no' ) );

        ob_start();

        check_ajax_referer( 'wcv-add-attribute', 'security' );

        if ( ! $attribute_terms_allowed ) {

            wp_send_json(
                array(
                    'error' => __( 'No permission to add attributes. ', 'wc-vendors' ),
                )
            );
            die();
        }

        $taxonomy = isset( $_POST['taxonomy'] ) ? sanitize_text_field( wp_unslash( $_POST['taxonomy'] ) ) : '';
        $term     = isset( $_POST['term'] ) ? sanitize_text_field( wp_unslash( $_POST['term'] ) ) : '';

        if ( taxonomy_exists( $taxonomy ) ) {

            $result = wp_insert_term( $term, $taxonomy );

            if ( is_wp_error( $result ) ) {
                wp_send_json(
                    array(
                        'error' => $result->get_error_message(),
                    )
                );
        } else {
                $term = get_term_by( 'id', $result['term_id'], $taxonomy );
                wp_send_json(
                    array(
                        'term_id' => $term->term_id,
                        'name'    => $term->name,
                        'slug'    => $term->slug,
                    )
                );
            }
        }

        die();
    }

    /**
     *  Load existing variations
     *
     * @param int $product_id Product ID.
     *
     * @since    1.3.0
     */
    public static function load_variations( $product_id ) {

        // Get attributes for this product.
        $attributes = maybe_unserialize( get_post_meta( $product_id, '_product_attributes', true ) );

        // Get tax classes.
        $tax_classes                   = \WC_Tax::get_tax_classes();
        $tax_class_options             = array();
        $tax_class_options['standard'] = __( 'Standard', 'wc-vendors' );

        if ( ! empty( $tax_classes ) ) {
            foreach ( $tax_classes as $class ) {
                $tax_class_options[ sanitize_title( $class ) ] = esc_attr( $class );
            }
        }

        // Set backorder options.
        $backorder_options = array(
            'no'     => __( 'Do not allow', 'wc-vendors' ),
            'notify' => __( 'Allow, but notify customer', 'wc-vendors' ),
            'yes'    => __( 'Allow', 'wc-vendors' ),
        );

        // set stock status options.
        $stock_status_options = array(
            'instock'    => __( 'In stock', 'wc-vendors' ),
            'outofstock' => __( 'Out of stock', 'wc-vendors' ),
        );

        $parent_data = array(
            'id'                   => $product_id,
            'attributes'           => $attributes,
            'tax_class_options'    => $tax_class_options,
            'sku'                  => get_post_meta( $product_id, '_sku', true ),
            'weight'               => wc_format_localized_decimal( get_post_meta( $product_id, '_weight', true ) ),
            'length'               => wc_format_localized_decimal( get_post_meta( $product_id, '_length', true ) ),
            'width'                => wc_format_localized_decimal( get_post_meta( $product_id, '_width', true ) ),
            'height'               => wc_format_localized_decimal( get_post_meta( $product_id, '_height', true ) ),
            'tax_class'            => get_post_meta( $product_id, '_tax_class', true ),
            'backorder_options'    => $backorder_options,
            'stock_status_options' => $stock_status_options,
        );

        if ( ! $parent_data['weight'] ) {
            $parent_data['weight'] = wc_format_localized_decimal( 0 );
        }

        if ( ! $parent_data['length'] ) {
            $parent_data['length'] = wc_format_localized_decimal( 0 );
        }

        if ( ! $parent_data['width'] ) {
            $parent_data['width'] = wc_format_localized_decimal( 0 );
        }

        if ( ! $parent_data['height'] ) {
            $parent_data['height'] = wc_format_localized_decimal( 0 );
        }

        // Get variations.
        $args = array(
            'post_type'      => 'product_variation',
            'post_status'    => array( 'private', 'publish' ),
            'posts_per_page' => -1,
            'orderby'        => array(
                'menu_order' => 'ASC',
                'ID'         => 'DESC',
            ),
            'post_parent'    => $product_id,
        );

        $variations = get_posts( $args );

        $loop = 0;

        if ( $variations ) {

            foreach ( $variations as $variation ) {
                $variation_id     = absint( $variation->ID );
                $variation_meta   = get_post_meta( $variation_id );
                $variation_data   = array();
                $shipping_classes = get_the_terms( $variation_id, 'product_shipping_class' );
                $variation_fields = array(
                    '_sku'                   => '',
                    '_stock'                 => '',
                    '_regular_price'         => '',
                    '_sale_price'            => '',
                    '_weight'                => '',
                    '_length'                => '',
                    '_width'                 => '',
                    '_height'                => '',
                    '_download_limit'        => '',
                    '_download_expiry'       => '',
                    '_downloadable_files'    => '',
                    '_downloadable'          => '',
                    '_virtual'               => '',
                    '_thumbnail_id'          => '',
                    '_sale_price_dates_from' => '',
                    '_sale_price_dates_to'   => '',
                    '_manage_stock'          => '',
                    '_stock_status'          => '',
                    '_backorders'            => null,
                    '_tax_class'             => null,
                    '_variation_description' => '',
                );

                foreach ( $variation_fields as $field => $value ) {
                    $variation_data[ $field ] = isset( $variation_meta[ $field ][0] ) ? maybe_unserialize( $variation_meta[ $field ][0] ) : $value;
                }

                // Add the variation attributes.
                $variation_data = array_merge( $variation_data, wc_get_product_variation_attributes( $variation_id ) );

                // Formatting.
                $variation_data['_regular_price'] = wc_format_localized_price( $variation_data['_regular_price'] );
                $variation_data['_sale_price']    = wc_format_localized_price( $variation_data['_sale_price'] );
                $variation_data['_weight']        = wc_format_localized_decimal( $variation_data['_weight'] );
                $variation_data['_length']        = wc_format_localized_decimal( $variation_data['_length'] );
                $variation_data['_width']         = wc_format_localized_decimal( $variation_data['_width'] );
                $variation_data['_height']        = wc_format_localized_decimal( $variation_data['_height'] );
                $variation_data['_thumbnail_id']  = absint( $variation_data['_thumbnail_id'] );
                $variation_data['image']          = $variation_data['_thumbnail_id'] ? wp_get_attachment_thumb_url( $variation_data['_thumbnail_id'] ) : '';
                $variation_data['shipping_class'] = $shipping_classes && ! is_wp_error( $shipping_classes ) ? current( $shipping_classes )->term_id : '';
                $variation_data['menu_order']     = $variation->menu_order;
                $variation_data['_stock']         = '' === $variation_data['_stock'] ? '' : (int) wc_stock_amount( $variation_data['_stock'] );
                $variation_data['_enabled']       = ( 'publish' === $variation->post_status ) ? true : false;
                $variation_data['id']             = $variation_id;
                $from_ajax                        = false;
                include wcv_deprecated_filter( 'wcvendors_pro_product_variation_path', '2.5.2', 'wcvendors_product_variation_path', 'forms/partials/wcvendors-product-variation.php' );
                ++$loop;
            }
        }
    }

    /**
     * Add variation
     *
     * @since    1.3.0
     */
    public static function json_add_variation() {

        check_ajax_referer( 'wcv-add-variation', 'security' );

		if ( ! current_user_can( 'edit_products' ) ) { // phpcs:ignore
            die( -1 );
        }

        $attributes                = isset( $_POST['attributes'] ) ? wc_clean( $_POST['attributes'] ) : array(); //phpcs:ignore 
        $loop                      = isset( $_POST['loop'] ) ? intval( sanitize_text_field( wp_unslash( $_POST['loop'] ) ) ) : 0;
        $parent_data               = isset( $_POST['parent_data'] ) ? wc_clean( $_POST['parent_data'] ) : array(); //phpcs:ignore 
        $parent_data['attributes'] = $attributes;

        $variation_id = 0;

        if ( $parent_data['attributes'] ) {
            $variation_data   = array();
            $shipping_classes = get_the_terms( $variation_id, 'product_shipping_class' );
            $variation_fields = array(
                '_sku'                   => '',
                '_stock'                 => '',
                '_regular_price'         => '',
                '_sale_price'            => '',
                '_weight'                => '',
                '_length'                => '',
                '_width'                 => '',
                '_height'                => '',
                '_download_limit'        => '',
                '_download_expiry'       => '',
                '_downloadable_files'    => '',
                '_downloadable'          => '',
                '_virtual'               => '',
                '_thumbnail_id'          => '',
                '_sale_price_dates_from' => '',
                '_sale_price_dates_to'   => '',
                '_manage_stock'          => '',
                '_stock_status'          => '',
                '_backorders'            => null,
                '_tax_class'             => null,
                '_variation_description' => '',
            );

            foreach ( $variation_fields as $field => $value ) {
                $variation_data[ $field ] = isset( $variation_meta[ $field ][0] ) ? maybe_unserialize( $variation_meta[ $field ][0] ) : $value;
            }

            $variation_data['_enabled'] = true;

            // Formatting.
            $variation_data['_regular_price'] = wc_format_localized_price( $variation_data['_regular_price'] );
            $variation_data['_sale_price']    = wc_format_localized_price( $variation_data['_sale_price'] );
            $variation_data['_weight']        = wc_format_localized_decimal( $variation_data['_weight'] );
            $variation_data['_length']        = wc_format_localized_decimal( $variation_data['_length'] );
            $variation_data['_width']         = wc_format_localized_decimal( $variation_data['_width'] );
            $variation_data['_height']        = wc_format_localized_decimal( $variation_data['_height'] );
            $variation_data['_thumbnail_id']  = absint( $variation_data['_thumbnail_id'] );
            $variation_data['image']          = $variation_data['_thumbnail_id'] ? wp_get_attachment_thumb_url( $variation_data['_thumbnail_id'] ) : '';
            $variation_data['shipping_class'] = $shipping_classes && ! is_wp_error( $shipping_classes ) ? current( $shipping_classes )->term_id : '';
            $variation_data['menu_order']     = -1;
            $variation_data['_stock']         = (int) wc_stock_amount( $variation_data['_stock'] );
            $variation_data['id']             = $loop;

            // Get tax classes.
            $tax_classes                   = \WC_Tax::get_tax_classes();
            $tax_class_options             = array();
            $tax_class_options['standard'] = __( 'Standard', 'wc-vendors' );

            if ( ! empty( $tax_classes ) ) {
                foreach ( $tax_classes as $class ) {
                    $tax_class_options[ sanitize_title( $class ) ] = esc_attr( $class );
                }
            }

            // Set backorder options.
            $backorder_options = array(
                'no'     => __( 'Do not allow', 'wc-vendors' ),
                'notify' => __( 'Allow, but notify customer', 'wc-vendors' ),
                'yes'    => __( 'Allow', 'wc-vendors' ),
            );

            // set stock status options.
            $stock_status_options = array(
                'instock'    => __( 'In stock', 'wc-vendors' ),
                'outofstock' => __( 'Out of stock', 'wc-vendors' ),
            );

            $parent_data['tax_class_options']    = $tax_class_options;
            $parent_data['backorder_options']    = $backorder_options;
            $parent_data['stock_status_options'] = $stock_status_options;

            if ( ! $parent_data['weight'] ) {
                $parent_data[' weight'] = wc_format_localized_decimal( 0 );
            }

            if ( ! $parent_data['length'] ) {
                $parent_data['length'] = wc_format_localized_decimal( 0 );
            }

            if ( ! $parent_data['width'] ) {
                $parent_data['width'] = wc_format_localized_decimal( 0 );
            }

            if ( ! $parent_data['height'] ) {
                $parent_data['height'] = wc_format_localized_decimal( 0 );
            }

            $variation = new \WC_Product_Variation( $variation_id );
            $from_ajax = true;
            include wcv_deprecated_filter( 'wcvendors_pro_product_variation_path', '2.5.2', 'wcvendors_product_variation_path', 'forms/partials/wcvendors-product-variation.php' );
        }

        die();
    }

    /**
     * Link all variations.
     *
     * @since    1.3.0
     */
    public static function json_link_all_variations() {

        if ( ! defined( 'WC_MAX_LINKED_VARIATIONS' ) ) {
            define( 'WC_MAX_LINKED_VARIATIONS', 50 );
        }

        check_ajax_referer( 'wcv-link-all-variations', 'security' );

		if ( ! current_user_can( 'edit_products' ) ) { //phpcs:ignore
            die( -1 );
        }

        if ( function_exists( 'set_time_limit' ) && ! str_contains( ini_get( 'disable_functions' ), 'set_time_limit' ) && ! ini_get( 'safe_mode' ) ) {
			@set_time_limit( 0 ); //phpcs:ignore
        }

        // phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        $attributes           = isset( $_POST['attributes'] ) ? wc_clean( $_POST['attributes'] ) : array();
        $available_variations = isset( $_POST['available_variations'] ) ? wc_clean( $_POST['available_variations'] ) : array();
        $parent_data          = isset( $_POST['parent_data'] ) ? wc_clean( $_POST['parent_data'] ) : array();
        $loop                 = isset( $_POST['loop'] ) ? intval( sanitize_text_field( wp_unslash( $_POST['loop'] ) ) ) : 0;
        $variations           = array();
        $added                = 1;
        // phpcs:enable WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        // No attributes? return.
        if ( ! $attributes ) {
            die();
        }

        foreach ( $attributes as $key => $attribute ) {

            $attribute_field_name = 'attribute_' . sanitize_title( $attribute['name'] );

            $options = array();

            if ( array_key_exists( 'values', $attribute ) ) {
                foreach ( $attribute['values'] as $key => $value ) {
                    $options[] = $key;
                }
            } elseif ( array_key_exists( 'value', $attribute ) ) {
                $attribute_options = explode( '|', $attribute['value'] );
                if ( is_array( $attribute_options ) ) {
                    foreach ( $attribute_options as $option_value ) {
                        $options[] = trim( $option_value );
                    }
                } else {
                    $options[] = trim( $attribute['value'] );
                }
            }

            $variations[ $attribute_field_name ] = $options;

        }

        // No variations? return.
        if ( 0 === count( $variations ) ) {
            die();
        }

        $possible_variations = wc_array_cartesian( $variations );

        foreach ( $possible_variations as $variation ) {

            // Check if variation already exists.
            if ( in_array( $variation, $available_variations, true ) ) {
                continue;
            }

            $variation_id = 0;

            if ( $variation ) {
                $variation_data   = array();
                $shipping_classes = get_the_terms( $variation_id, 'product_shipping_class' );
                $variation_fields = array(
                    '_sku'                   => '',
                    '_stock'                 => '',
                    '_regular_price'         => '',
                    '_sale_price'            => '',
                    '_weight'                => '',
                    '_length'                => '',
                    '_width'                 => '',
                    '_height'                => '',
                    '_download_limit'        => '',
                    '_download_expiry'       => '',
                    '_downloadable_files'    => '',
                    '_downloadable'          => '',
                    '_virtual'               => '',
                    '_thumbnail_id'          => '',
                    '_sale_price_dates_from' => '',
                    '_sale_price_dates_to'   => '',
                    '_manage_stock'          => '',
                    '_stock_status'          => '',
                    '_backorders'            => null,
                    '_tax_class'             => null,
                    '_variation_description' => '',
                );

                foreach ( $variation_fields as $field => $value ) {
                    $variation_data[ $field ] = isset( $variation_meta[ $field ][0] ) ? maybe_unserialize( $variation_meta[ $field ][0] ) : $value;
                }

                $variation_data['_enabled'] = true;

                // Formatting.
                $variation_data['_regular_price'] = wc_format_localized_price( $variation_data['_regular_price'] );
                $variation_data['_sale_price']    = wc_format_localized_price( $variation_data['_sale_price'] );
                $variation_data['_weight']        = wc_format_localized_decimal( $variation_data['_weight'] );
                $variation_data['_length']        = wc_format_localized_decimal( $variation_data['_length'] );
                $variation_data['_width']         = wc_format_localized_decimal( $variation_data['_width'] );
                $variation_data['_height']        = wc_format_localized_decimal( $variation_data['_height'] );
                $variation_data['_thumbnail_id']  = absint( $variation_data['_thumbnail_id'] );
                $variation_data['image']          = $variation_data['_thumbnail_id'] ? wp_get_attachment_thumb_url( $variation_data['_thumbnail_id'] ) : '';
                $variation_data['shipping_class'] = $shipping_classes && ! is_wp_error( $shipping_classes ) ? current( $shipping_classes )->term_id : '';
                $variation_data['menu_order']     = -1;
                $variation_data['_stock']         = (int) wc_stock_amount( $variation_data['_stock'] );
                $variation_data['id']             = $loop;

                foreach ( $variation as $key => $value ) {
                    $variation_data[ $key ] = $value;
                }

                // Get tax classes.
                $tax_classes                   = \WC_Tax::get_tax_classes();
                $tax_class_options             = array();
                $tax_class_options['standard'] = __( 'Standard', 'wc-vendors' );

                if ( ! empty( $tax_classes ) ) {
                    foreach ( $tax_classes as $class ) {
                        $tax_class_options[ sanitize_title( $class ) ] = esc_attr( $class );
                    }
                }

                // Set backorder options.
                $backorder_options = array(
                    'no'     => __( 'Do not allow', 'wc-vendors' ),
                    'notify' => __( 'Allow, but notify customer', 'wc-vendors' ),
                    'yes'    => __( 'Allow', 'wc-vendors' ),
                );

                // set stock status options.
                $stock_status_options = array(
                    'instock'    => __( 'In stock', 'wc-vendors' ),
                    'outofstock' => __( 'Out of stock', 'wc-vendors' ),
                );

                $parent_data['tax_class_options']    = $tax_class_options;
                $parent_data['backorder_options']    = $backorder_options;
                $parent_data['stock_status_options'] = $stock_status_options;

                if ( ! $parent_data['weight'] ) {
                    $parent_data[' weight'] = wc_format_localized_decimal( 0 );
                }

                if ( ! $parent_data['length'] ) {
                    $parent_data['length'] = wc_format_localized_decimal( 0 );
                }

                if ( ! $parent_data['width'] ) {
                    $parent_data['width'] = wc_format_localized_decimal( 0 );
                }

                if ( ! $parent_data['height'] ) {
                    $parent_data['height'] = wc_format_localized_decimal( 0 );
                }
                $from_ajax = false;
                include wcv_deprecated_filter( 'wcvendors_pro_product_variation_path', '2.5.2', 'wcvendors_product_variation_path', 'forms/partials/wcvendors-product-variation.php' );

            }
            ++$loop;
            ++$added;

            if ( $added > WC_MAX_LINKED_VARIATIONS ) {
                break;
            }
        }

        die();
    }

    /**
     * Default attributes toolbar
     *
     * @since    1.3.0
     */
    public static function json_default_variation_attributes() {

        ob_start();

        check_ajax_referer( 'wcv-add-variation', 'security' );

        // Check if user can edit products and is vendor.
        $user_id   = get_current_user_id();
        $is_vendor = \WCV_Vendors::is_vendor( $user_id );

        if ( ! current_user_can( 'edit_products' ) || ! $is_vendor ) { //phpcs:ignore
            wp_send_json_error( array( 'message' => __( 'Unauthorized.', 'wc-vendors' ) ) );
            die();
        }

        // Recursively sanitize nested array structure while preserving array types.
        $attributes = isset( $_POST['attributes'] ) && is_array( $_POST['attributes'] ) ? self::sanitize_variation_attributes( $_POST['attributes'] ) : array(); // phpcs:ignore

        include wcv_deprecated_filter( 'wcvendors_pro_product_variation_default_path', '2.5.2', 'wcvendors_product_variation_default_path', 'forms/partials/wcvendors-product-variations-default-attribute.php' );
        die();
    }

    /**
     * Recursively sanitize variation attributes array structure
     *
     * @since  2.6.4.1
     * @access private
     *
     * @param array $attributes The attributes array to sanitize.
     * @return array Sanitized attributes array with preserved structure.
     */
    private static function sanitize_variation_attributes( $attributes ) { //phpcs:ignore
        if ( ! is_array( $attributes ) ) {
            return array();
        }

        $sanitized = array();

        foreach ( $attributes as $key => $value ) {
            $sanitized_key = sanitize_text_field( $key );

            if ( is_array( $value ) ) {
                // Recursively sanitize nested arrays.
                $sanitized[ $sanitized_key ] = self::sanitize_variation_attributes( $value );
            } else {
                // Sanitize scalar values.
                $sanitized[ $sanitized_key ] = sanitize_text_field( $value );
            }
        }

        return $sanitized;
    }

    /**
     * Get the product edit link depending on several different variables
     *
     * @since  1.4.0
     * @version 1.6.4
     * @access public
     *
     * @param int  $product_id - the product id.
     * @param bool $default - whether to return the default link or not.
     * @return array $product_edit_link
     */
    public static function get_product_edit_link( $product_id = null, $default = false ) { //phpcs:ignore

        $default_template = get_option( 'wcvendors_product_form_template', 'standard' );
        $default_template = 'edit' === $default_template ? 'standard' : $default_template;
        $default_link     = ( 'standard' === $default_template ) ? 'product/edit/' : 'product/' . $default_template . '/edit/';

        // Only load a custom template if the product has one.
        if ( $product_id ) {
            $template = get_post_meta( $product_id, '_wcv_product_form_template', true );
            if ( empty( $template ) || 'edit' === $template || 'standard' === $template ) {
                $template     = '';
                $default_link = 'product/edit/';
            } else {
                $template = $template . '/';
            }
        }

        if ( $default ) {
            $template = $default_link;
        }

        $template_url = ( empty( $template ) || '' === $template ) ? $default_link : 'product/' . $template . 'edit/';

        return apply_filters( 'wcv_product_edit_link', \WCV_Vendor_Dashboard::get_dashboard_page_url( $template_url . $product_id ) );
    }

    /**
     * Get the global default product template for the store.
     *
     * @since  1.4.0
     * @access public
     * @return array $default_product_template - details for the default product edit template
     */
    public static function get_default_product_template() {

        $template  = get_option( 'wcvendors_product_form_template', 'standard' );
        $template  = ( 'standard' === $template ) ? $template : $template . '/';
        $file_name = ( 'standard' === $template ) ? 'product-edit.php' : 'product-' . $template . '.php';
        $url_path  = ( 'standard' === $template ) ? 'product/edit' : 'product/' . $template . 'edit/';

        $default_product_template = apply_filters(
            'wcv_default_product_template',
            array(
                'filename' => $file_name,
                'url_path' => $url_path,
                'label'    => __( 'Product', 'wc-vendors' ),
                'url'      => \WCV_Vendor_Dashboard::get_dashboard_page_url( $url_path ),
            )
        );

        return $default_product_template;
    }

    /**
     * Get the product template overrides from the theme directory
     * Required file format to work product-mytemplatenamehere.
     *
     * @since    1.4.0
     * @version  1.6.2
     * @access   public
     */
    public static function get_product_templates() {

        $template_path              = 'wc-vendors/dashboard/';
        $files                      = array();
        $product_templates          = array();
        $default_template           = get_option( 'wcvendors_product_form_template', 'standard' );
        $files[ $default_template ] = self::get_default_product_template();
        $stylesheet_path            = get_stylesheet_directory();

        if ( file_exists( $stylesheet_path . '/' . $template_path ) ) {
            $product_templates = glob( $stylesheet_path . '/' . $template_path . 'product-*.php' );
        }

        if ( ! empty( $product_templates ) ) {

            foreach ( $product_templates as $file_path ) {

                $prefix = $stylesheet_path . '/' . $template_path;

                // Find the file name from he path, remove the extension then generate the dashboard link.
                if ( substr( $file_path, 0, strlen( $prefix ) ) === $prefix ) {
                    $filename        = substr( $file_path, strlen( $prefix ) );
                    $filename_no_ext = preg_replace( '/\\.[^.\\s]{3,4}$/', '', $filename );
                    $template_part   = substr( $filename_no_ext, strlen( 'product-' ) );

                    // Check if the file override is the default template.
                    if ( self::get_default_product_template()['filename'] === $filename ) {
                        continue;
                    }

                    $template_info           = implode( '', file( $file_path ) );
                    $url_path                = str_replace( '-', '/', $filename_no_ext );
                    $label                   = ( preg_match( '|Label: (.*)$|mi', $template_info, $label_name ) ) ? $label_name[1] : ucfirst( $template_part );
                    $files[ $template_part ] = array(
                        'filename' => $filename,
                        'url_path' => $url_path,
                        'label'    => $label,
                        'url'      => \WCV_Vendor_Dashboard::get_dashboard_page_url( $url_path . '/edit' ),
                    );
                }
            }
        }

        return apply_filters( 'wcv_product_template_files', $files );
    }

    /**
     *    Check the coupons to add the product id if not already added.
     */
    public function check_coupons() {

        $all_vendor_product_ids = implode( ',', WCV_Vendor_Controller::get_products_by_id( get_current_user_id() ) );

        $coupon_args = array(
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'author'         => get_current_user_id(),
            'order'          => 'asc',
            'post_type'      => 'shop_coupon',
            'post_status'    => 'publish',
        );

        $coupons = get_posts( $coupon_args );

        foreach ( $coupons as $coupon ) {

            $apply_to_all = get_post_meta( $coupon->ID, 'apply_to_all_products', true );

            if ( 'yes' === $apply_to_all ) {
                update_post_meta( $coupon->ID, 'product_ids', $all_vendor_product_ids );
            }
        }
    }

    /**
     * Filter file uploads to check image dimensions and provide a prefix for iamages.
     *
     * @param unknow $file - the file being uploaded.
     *
     * @since 1.5.0
     */
    public function filter_upload( $file ) {

        // Run the prefix code on the dashboard for all vendor uploaded images.
        if ( ! str_contains( wp_get_referer(), \WCV_Vendor_Dashboard::get_dashboard_page_url() ) ) {
            return $file;
        }

        $user         = get_userdata( get_current_user_id() );
        $image_prefix = get_option( 'wcvendors_vendor_image_prefix', '' );
        $image        = getimagesize( $file['tmp_name'] );

        // Only run this code on images.
        if ( false === $image || ! str_contains( $image['mime'], 'image' ) ) {
            return $file;
        }

        switch ( $image_prefix ) {
            case 'vendor_id':
                $prefix = $user->ID;
                break;
            case 'vendor_username':
                $prefix = $user->user_login;
                break;
            default:
                $prefix = '';
                break;
        }

        if ( ! empty( $prefix ) ) {
            // Prefix all files with the vendors user_id.
            $file['name'] = $prefix . '-' . $file['name'];
        }

        // Only run this on the Pro dashboard page product page.
        if ( ! str_contains( wp_get_referer(), \WCV_Vendor_Dashboard::get_dashboard_page_url( 'product' ) ) ) {
            return $file;
        }

        $max_image_width   = get_option( 'wcvendors_product_max_image_width', '' );
        $max_image_height  = get_option( 'wcvendors_product_max_image_height', '' );
        $min_image_width   = get_option( 'wcvendors_product_min_image_width', '' );
        $min_image_height  = get_option( 'wcvendors_product_min_image_height', '' );
        $max_width_message = apply_filters(
            'wcv_product_product_max_width_msg',
            sprintf(
            /* translators: %s: max image width */
                __( 'The image file uploaded exceeds the maximum width allowed. Maximium width is %spx', 'wc-vendors' ),
                $max_image_width
            )
        );
        $max_height_message = apply_filters(
            'wcv_product_product_max_height_msg',
            sprintf(
            /* translators: %s: max image height */
                __( 'The image file uploaded exceeds the maximum height allowed. Maximum height is %spx', 'wc-vendors' ),
                $max_image_height
            )
        );
        $min_wide_message = apply_filters(
            'wcv_product_product_min_width_msg',
            sprintf(
            /* translators: %s: min image width */
                __( 'The image file uploaded does not meet the minimum width required. Minimum image width is %spx', 'wc-vendors' ),
                $min_image_width
            )
        );
        $min_height_message = apply_filters(
            'wcv_product_product_min_height_msg',
            sprintf(
            /* translators: %s: min image height */
                __( 'The image file uploaded does not meet the minimum height required. Minimum image height is %spx.', 'wc-vendors' ),
                $min_image_height
            )
        );

        $image_width  = $image[0];
        $image_height = $image[1];

        // Maximum width.
        if ( isset( $max_image_width ) && $max_image_width > 0 ) {
            if ( $image_width > $max_image_width ) {
                $file['error'] = $max_width_message;

                return $file;
            }
        }

        // Maximum Height.
        if ( isset( $max_image_height ) && $max_image_height > 0 ) {
            if ( $image_height > $max_image_height ) {
                $file['error'] = $max_height_message;

                return $file;
            }
        }

        // Minimum width.
        if ( isset( $min_image_width ) && $min_image_width > 0 ) {
            if ( $image_width < $min_image_width ) {
                $file['error'] = $min_wide_message;

                return $file;
            }
        }

        // Minimum Height.
        if ( isset( $min_image_height ) && $min_image_height > 0 ) {
            if ( $image_height < $min_image_height ) {
                $file['error'] = $min_height_message;

                return $file;
            }
        }

        return $file;
    }


    /**
     * Prepare downloads for save.
     *
     * @param array $file_names File names.
     * @param array $file_urls File URLs.
     * @param array $file_hashes File hashes.
     *
     * @return array
     */
    private static function prepare_downloads( $file_names, $file_urls, $file_hashes ) {
        $downloads = array();

        if ( ! empty( $file_urls ) ) {
            $file_url_size = count( $file_urls );

            for ( $i = 0; $i < $file_url_size; $i++ ) {
                if ( ! empty( $file_urls[ $i ] ) ) {
                    $downloads[] = array(
                        'name'        => wc_clean( $file_names[ $i ] ),
                        'file'        => wp_unslash( trim( $file_urls[ $i ] ) ),
                        'download_id' => wc_clean( $file_hashes[ $i ] ),
                    );
                }
            }
        }

        return $downloads;
    }

    /**
     * Maybe disable actions.
     *
     * @param array      $actions Row actions.
     * @param WC_Product $product Product object.
     *
     * @since 1.7.0
     */
    public function maybe_disable_actions( $actions, $product ) {
        if ( 'yes' === $product->get_meta( '_disable_vendor_edit' ) ) {
            unset( $actions['edit'] );
        }
        return $actions;
    }

    /**
     * Redirect vendor to the products list if edit is disabled.
     *
     * @param bool   $disabled     Is page disabled.
     * @param string $current_page Current page id.
     */
    public function maybe_disable_page( $disabled, $current_page ) {
        if ( 'product' !== $current_page ) {
            return $disabled;
        }

        $product_id = get_query_var( 'object_id' );
        $product    = wc_get_product( $product_id );

        if ( ( $product instanceof \WC_Product ) && 'yes' === $product->get_meta( '_disable_vendor_edit' ) ) {
            return true;
        }

        return $disabled;
    }

    /**
     * Delete rating data .
     *
     * @param int $id     Product id.
     */
    public function delete_rating_data( $id ) {
        global $wpdb;
        if ( 'yes' === get_option( 'wcvendors_delete_ratings_on_deleting_product', 'no' ) ) {
            $wpdb->delete( $this->table_name, array( 'product_id' => $id ) );
        }
    } // delete_rating_data

    /**
     * Filter the allowed html tags for products.
     *
     * @param array $allowed_html_tags List of currently allowed html tags.
     * @param array $context The context in which the html tags are used, usually a post type.
     * @return array $allowed_html_tags List of allowed html tags.
     * @version 1.7.5
     * @since   1.7.5
     */
    public function allowed_html_tags( $allowed_html_tags, $context ) {
        if ( 'post' === $context ) {
            $allowed_html_tags['iframe'] = array(
                'src'             => true,
                'height'          => true,
                'width'           => true,
                'frameborder'     => true,
                'allowfullscreen' => true,
                'name'            => true,
                'srcdoc'          => true,
                'importance'      => true,
                'loading'         => true,
                'referrerpolicy'  => array(
                    'no-referrer'                     => true,
                    'no-referrer-when-upgrade'        => true,
                    'origin'                          => true,
                    'same-origin'                     => true,
                    'strict-origin'                   => true,
                    'strict-origin-when-cross-origin' => true,
                    'unsafe-url'                      => false,
                ),
            );
        }

        return apply_filters( 'wcv_allowed_html_tags', $allowed_html_tags, $context );
    }

    /**
     * Build row details for the product table.
     *
     * @param WC_Product $product Product object.
     */
    public function build_row_details( $product ) {

        if ( ! is_a( $product, 'WC_Product' ) ) {
            return;
        }

        $categories_hide = wc_string_to_bool( get_option( 'wcvendors_hide_product_basic_categories', 'no' ) );
        $tags_hide       = wc_string_to_bool( get_option( 'wcvendors_hide_product_basic_tags', 'no' ) );

        $row_data['product_title'] = $product->get_title();
        if ( 'publish' === $product->get_status() ) {
            $row_data['published_date'] = $product->get_date_created()->date( $this->date_format );
        }
        $row_data['status'] = array(
            'class' => sanitize_html_class( $product->get_status() ),
            'label' => self::product_status( $product->get_status() ),
        );

        if ( $product->get_manage_stock() ) {
            $stock_qty    = $product->get_stock_quantity();
            $low_stock    = $product->get_low_stock_amount();
            $stock_status = $product->get_stock_status();
            $stock        = array(
                'class' => '',
                'label' => '',
            );

            switch ( $stock_status ) {
                case 'instock':
                    $stock['class'] = 'instock';
                    $stock['label'] = __( 'In stock', 'wc-vendors' ) . ' (' . $stock_qty . ')';
                    if ( $stock_qty > 0 && $stock_qty <= $low_stock ) {
                        $stock['class'] = 'lowstock';
                        $stock['label'] = __( 'Low stock', 'wc-vendors' ) . ' (' . $stock_qty . ')';
                    }
                    break;
                case 'outofstock':
                    $stock['class'] = 'outofstock';
                    $stock['label'] = __( 'Out of stock', 'wc-vendors' );
                    break;
                case 'onbackorder':
                    $stock['class'] = 'onbackorder';
                    $stock['label'] = __( 'On backorder', 'wc-vendors' );
                    break;
            }

            $row_data['stock'] = $stock;
        }

        $row_data['product_categories'] = array();
        if ( ! $categories_hide ) {
            $product_categories = $product->get_category_ids();
            foreach ( $product_categories as $category_id ) {
                $category = get_term( $category_id, 'product_cat' );
                if ( ! is_wp_error( $category ) ) {
                    $row_data['product_categories'][] = array(
                        'name' => $category->name,
                        'url'  => get_term_link( $category ),
                    );
                }
            }
        }

        $row_data['product_tags'] = array();

        if ( ! $tags_hide ) {
            $product_tags = $product->get_tag_ids();
            foreach ( $product_tags as $tag_id ) {
                $tag = get_term( $tag_id, 'product_tag' );
                if ( ! is_wp_error( $tag ) ) {
                    $row_data['product_tags'][] = array(
                        'name' => $tag->name,
                        'url'  => get_term_link( $tag ),
                    );
                }
            }
        }

        if ( '' !== $product->get_sku() ) {
            $row_data['sku'] = $product->get_sku();
        }

        $row_data['price'] = $product->get_price_html();

        ob_start();

        include apply_filters( 'wcvendors_product_table_row_details', 'partials/product/wcvendors-product-table-row-details.php' );

        return ob_get_clean();
    }

    /**
     * Get term taxonomy IDs for given product types.
     *
     * @param array $product_types Array of product type slugs.
     * @return array Term taxonomy IDs.
     *
     * @since 2.5.6
     */
    public function get_product_type_taxonomy_ids( $product_types ) {
        global $wpdb;

        if ( empty( $product_types ) ) {
            return array();
        }

        $placeholders = implode( ',', array_fill( 0, count( $product_types ), '%s' ) );

        $query = "
            SELECT tt.term_taxonomy_id 
            FROM {$wpdb->term_taxonomy} tt
            JOIN {$wpdb->terms} t ON tt.term_id = t.term_id
            WHERE tt.taxonomy = 'product_type'
            AND t.slug IN ($placeholders)
        ";

        return $wpdb->get_col( $wpdb->prepare( $query, $product_types ) ); //phpcs:ignore
    }

    /**
     * Get products for current vendor excluding specific taxonomy IDs.
     *
     * @param array $taxonomy_ids Array of term taxonomy IDs to exclude.
     * @return string SQL query.
     *
     * @since 2.5.6
     */
    public function get_vendor_products_excluding_taxonomies_query( $taxonomy_ids ) {
        global $wpdb;

        if ( empty( $taxonomy_ids ) ) {
            return array();
        }

        $placeholders               = implode( ',', array_fill( 0, count( $taxonomy_ids ), '%d' ) );
        $product_status_placeholder = implode( ',', array_fill( 0, count( $this->product_statuses ), '%s' ) );
        $query                      = "
            SELECT p.post_status, pm.meta_value as stock_status
            FROM {$wpdb->posts} p
            JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_stock_status'
            WHERE p.post_type = 'product'
            AND p.post_author = %d
            AND p.post_status IN ($product_status_placeholder)
            AND NOT EXISTS (
                SELECT 1 FROM {$wpdb->term_relationships} tr 
                WHERE tr.object_id = p.ID 
                AND tr.term_taxonomy_id IN ($placeholders)
            )
        ";

        return $wpdb->prepare( $query, array_merge( array( get_current_user_id() ), $this->product_statuses, $taxonomy_ids ) ); //phpcs:ignore
    }

    /**
     * Count products status and stock status.
     *
     * @since 2.5.4
     * @version 2.5.6
     */
    public function count_products_status() {
        global $wpdb;
        $hide_product_types = get_option( 'wcvendors_capability_product_types', array() );

        if ( ! empty( $hide_product_types ) ) {
            $taxonomy_ids = $this->get_product_type_taxonomy_ids( $hide_product_types );
            $query        = $this->get_vendor_products_excluding_taxonomies_query( $taxonomy_ids );
        } else {
            $product_status_placeholder = implode( ',', array_fill( 0, count( $this->product_statuses ), '%s' ) );
            // Original optimized query.
            $query = $wpdb->prepare(
                "SELECT p.post_status, pm.meta_value as stock_status
                FROM {$wpdb->posts} p
                JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_stock_status'
                WHERE p.post_type = 'product'
                AND p.post_author = %d
                AND p.post_status IN ($product_status_placeholder)", //phpcs:ignore
                array_merge( array( get_current_user_id() ), $this->product_statuses )
            );
        }

        $results = $wpdb->get_results( $query ); //phpcs:ignore
        $post_status_counts  = array();
        $stock_status_counts = array();

        foreach ( $results as $result ) {
            if ( 'trash' === $result->post_status ) {
                continue;
            }

            if ( isset( $post_status_counts[ $result->post_status ] ) ) {
                ++$post_status_counts[ $result->post_status ];
            } else {
                $post_status_counts[ $result->post_status ] = 1;
            }

            if ( isset( $stock_status_counts[ $result->stock_status ] ) ) {
                ++$stock_status_counts[ $result->stock_status ];
            } else {
                $stock_status_counts[ $result->stock_status ] = 1;
            }
        }

        $counts = array(
            'all' => count( $results ),
        );

        $counts = array_merge( $counts, $post_status_counts, $stock_status_counts );
        $labels = apply_filters(
            'wcvendors_product_status_labels',
            array(
                'all'         => __( 'All', 'wc-vendors' ),
                'publish'     => __( 'Published', 'wc-vendors' ),
                'draft'       => __( 'Draft', 'wc-vendors' ),
                'auto-draft'  => __( 'Auto Draft', 'wc-vendors' ),
                'pending'     => __( 'Pending', 'wc-vendors' ),
                'private'     => __( 'Private', 'wc-vendors' ),
                'instock'     => __( 'In stock', 'wc-vendors' ),
                'outofstock'  => __( 'Out of stock', 'wc-vendors' ),
                'onbackorder' => __( 'On backorder', 'wc-vendors' ),
            )
        );

        foreach ( $counts as $key => $count ) {
            if ( ! array_key_exists( $key, $labels ) ) {
                continue;
            }
            $counts[ $key ] = array(
                'count' => $count,
                'label' => $labels[ $key ],
            );
        }

        return $counts;
    }

    /**
     * Modify import export buttons.
     *
     * @param array $buttons Row actions.
     *
     * @since 2.5.4
     */
    public function add_import_export_buttons( $buttons ) {
        foreach ( $buttons as $key => $button ) {
            if ( 'import' === $key ) {
                $buttons['import']['label'] = wcv_get_icon( 'wcv-icon wcv-icon-dashboard-icon', 'wcv-icon-import' ) . $buttons['import']['label'];
            }
            if ( 'export' === $key ) {
                $buttons['export']['label'] = wcv_get_icon( 'wcv-icon wcv-icon-dashboard-icon', 'wcv-icon-export' ) . $buttons['export']['label'];
            }
        }

        return $buttons;
    }

    /**
     * Hide all inactive vendors products.
     *
     * @since 2.5.4
     *
     * @param object $query woocommerce product query object.
     */
    public function hide_all_inactive_vendor_products( $query ) {
        $vendor_shop = urldecode( get_query_var( 'vendor_shop' ) );
        $vendor_id   = \WCV_Vendors::get_vendor_id( $vendor_shop );

        if ( \WCV_Vendors::is_vendor_product_page( $vendor_id ) ) {
            return;
        }

        $inactive_vendor_ids = get_users(
            array(
                'meta_key'   => '_wcv_vendor_status',
                'meta_value' => 'inactive',
                'fields'     => 'ID',
            )
        );

        if ( ! empty( $inactive_vendor_ids ) ) {
            $query->set( 'author__not_in', $inactive_vendor_ids );
        }
    }

    /**
     * Add to cart validation. To prevent users adding inactive vendor's products to cart.
     *
     * @since 2.5.4
     *
     * @param bool $is_valid Is valid.
     * @param int  $product_id Product id.
     */
    public function add_to_cart_validation( $is_valid, $product_id ) {
        $author_id     = get_post_field( 'post_author', $product_id );
        $vendor_status = get_user_meta( $author_id, '_wcv_vendor_status', true );

        if ( 'inactive' === $vendor_status ) {
            wc_add_notice( __( 'This product is not available for purchase due to the vendor being inactive.', 'wc-vendors' ), 'error' );
            return false;
        }

        // Prevent vendors from purchasing their own products.
        if ( is_user_logged_in() && \WCV_Vendors::is_vendor( get_current_user_id() ) && ! $this->allow_vendor_purchase_own_products ) {
            $current_user_id = get_current_user_id();
            if ( $current_user_id === (int) $author_id ) {
                wc_add_notice( __( 'You cannot purchase your own products.', 'wc-vendors' ), 'error' );
                return false;
            }
        }

        return $is_valid;
    }

    /**
     * Remove the product from the cart if the vendor is inactive.
     *
     * @since 2.5.4
     */
    public function remove_inactive_vendor_products_from_cart() {
        $cart                 = WC()->cart->get_cart();
        $cart_updated         = false;
        $own_products_removed = false;

        foreach ( $cart as $cart_key => $cart_item ) {
            $product_id    = $cart_item['product_id'];
            $author_id     = get_post_field( 'post_author', $product_id );
            $vendor_status = get_user_meta( $author_id, '_wcv_vendor_status', true );

            if ( 'inactive' === $vendor_status ) {
                WC()->cart->remove_cart_item( $cart_key );
                $cart_updated = true;
            }

            // Remove vendor's own products from cart.
            if ( is_user_logged_in() && \WCV_Vendors::is_vendor( get_current_user_id() ) && ! $this->allow_vendor_purchase_own_products ) {
                $current_user_id = get_current_user_id();
                if ( $current_user_id === (int) $author_id ) {
                    WC()->cart->remove_cart_item( $cart_key );
                    $own_products_removed = true;
                }
            }
        }

        if ( $cart_updated ) {
            wc_add_notice( __( 'Some products have been removed from your cart as the vendor is inactive.', 'wc-vendors' ), 'error' );
        }

        if ( $own_products_removed && ! $this->allow_vendor_purchase_own_products ) {
            wc_add_notice( __( 'You cannot purchase your own products. These items have been removed from your cart.', 'wc-vendors' ), 'error' );
        }
    }

    /**
     * Prevent vendors from reviewing their own products
     *
     * @param int $post_id The post ID.
     *
     * @since 2.6.0
     * @version 2.6.0
     */
    public function prevent_vendor_self_review( $post_id ) {
        $author_id         = (int) get_post_field( 'post_author', $post_id );
        $current_user_id   = get_current_user_id();
        $is_product_review = false;
        $referer           = wp_get_referer();

        if ( isset( $_POST['comment_post_ID'] ) && 'product' === get_post_type( sanitize_text_field( wp_unslash( $_POST['comment_post_ID'] ) ) ) && isset( $_POST['rating'] ) ) {
            $is_product_review = true;
        }

        if ( $is_product_review && $author_id === $current_user_id ) {
            wc_add_notice( __( 'You cannot review your own product.', 'wc-vendors' ), 'error' );
            wp_safe_redirect( $referer );
            exit;
        }
    }
}
