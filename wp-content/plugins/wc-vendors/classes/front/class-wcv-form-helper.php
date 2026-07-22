<?php
/**
 * Form Helper Class
 *
 * Defines relevant static methods for generating form elements for public facing forms.
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedNamespaceFound
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 * @phpcs:disable WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_exclude
 */
namespace WC_Vendors\Classes\Front;

use function WC_Vendors\Classes\Includes\wcv_walk_category_dropdown_tree;
use function WC_Vendors\Classes\Includes\wcv_walk_category_multilevel_dropdown_tree;
/**
 * Form Helper Class
 *
 * Defines relevant static methods for generating form elements for public facing forms.
 */
class WCV_Form_Helper {

    /**
     * Create an input field with label
     *
     * @since     2.5.2
     *
     * @param      array $field Array defining all field attributes.
     *
     * @Todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function input( $field ) {

        if ( empty( $field ) ) {
            return;
        }

        $allow_markup = 'yes' === get_option( 'wcvendors_allow_form_markup', 'no' ) ? true : false;

        $post_id                = isset( $field['post_id'] ) ? $field['post_id'] : 0;
        $field['placeholder']   = isset( $field['placeholder'] ) ? $field['placeholder'] : '';
        $field['class']         = isset( $field['class'] ) ? $field['class'] : '';
        $field['style']         = isset( $field['style'] ) ? $field['style'] : '';
        $field['label']         = isset( $field['label'] ) ? $field['label'] : '&nbsp;';
        $field['wrapper_class'] = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
        $field['wrapper_start'] = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']   = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['cbvalue']       = isset( $field['cbvalue'] ) ? $field['cbvalue'] : 'yes';
        $field['name']          = isset( $field['name'] ) ? $field['name'] : $field['id'];
        $field['type']          = isset( $field['type'] ) ? $field['type'] : 'text';
        $field['show_label']    = isset( $field['show_label'] ) ? $field['show_label'] : true;
        $field['show_tooltip']  = isset( $field['show_tooltip'] ) ? $field['show_tooltip'] : true;
        $input_wrapper_class    = isset( $field['input_wrapper_class'] ) ? $field['input_wrapper_class'] : '';
        $append_before          = isset( $field['append_before'] ) ? $field['append_before'] : '';
        $append_after           = isset( $field['append_after'] ) ? $field['append_after'] : '';
        $data_type              = empty( $field['data_type'] ) ? '' : $field['data_type'];
        $html                   = '';
        $field['default']       = isset( $field['default'] ) ? $field['default'] : '';
        $field['no_margin']     = isset( $field['no_margin'] ) ? $field['no_margin'] : false;
        $field['custom_margin'] = isset( $field['custom_margin'] ) ? $field['custom_margin'] : false;

        $db_value       = get_post_meta( $post_id, $field['id'], true );
        $field['value'] = isset( $field['value'] ) ? $field['value'] : ( $db_value ? $db_value : $field['default'] );

        if ( 'checkbox' === $field['type'] ) {
            $field['value']   = ( '' !== $field['value'] ? $field['value'] : $field['default'] );
            $field['cbvalue'] = isset( $field['cbvalue'] ) ? $field['cbvalue'] : 'yes';
        }

        // Strip tags.
        $field['value'] = ( $allow_markup ) ? $field['value'] : wp_strip_all_tags( $field['value'] );
        if ( 'number' === $field['type'] && 'stock' === $data_type ) {
            $field['value'] = (int) $field['value'];
        }

        if ( 'price' === $data_type ) {
            $field['value'] = wc_format_localized_price( $field['value'] );
        }

        // disable label for hidden .
        $field['show_label'] = ( 'hidden' === $field['type'] ) ? false : true;

        // Custom attribute handling.
        $custom_attributes = array();

        if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {

            // Update validation rules to new system.
            if ( array_key_exists( 'data-rules', $field['custom_attributes'] ) ) {
                $field['custom_attributes'] = self::check_custom_attributes( $field['custom_attributes'], $field['id'] );
            }

            foreach ( $field['custom_attributes'] as $attribute => $value ) {
                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
            }
        }

        do_action( 'wcv_form_input_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo  $field['wrapper_start']; // phpcs:ignore
        }

        if ( ! empty( $field['wrapper_class'] ) ) {
            echo '<div class="' . esc_attr( $field['wrapper_class'] ) . '">';
        }

        if ( 'hidden' !== $field['type'] ) {
            $custom_margin = $field['custom_margin'] && is_numeric( $field['custom_margin'] ) ? 'margin-bottom: ' . $field['custom_margin'] . 'px;' : '';
            echo '<div class="control-group ' . esc_attr( $field['no_margin'] ? 'no-margin' : '' ) . '" style="' . esc_attr( $custom_margin ) . '">';
        }

        if ( 'toggle' === $field['type'] ) {

            echo '<ul class="control unstyled inline" style="padding: 0; margin: 0; line-height: normal;">';
            echo '<li>';
            echo '<label class="wcv-toggle" for="' . esc_attr( $field['id'] ) . '">';
            echo '<span class="wcv-toggle-container">';
            echo '<input type="checkbox" class="' . esc_attr( $field['class'] ) . ' ' . esc_attr( $field['wrapper_class'] ) . '" style="' . esc_attr( $field['style'] ) . '" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['cbvalue'] ) . '" ' . checked( $field['value'], $field['cbvalue'], false ) . '  ' . implode( ' ', $custom_attributes ) . '/>'; // phpcs:ignore
            echo '<span class="slider"></span></span>';
            echo wp_kses_post( $field['label'] );
            echo '</label></li>'; //phpcs:ignore
            echo '</ul>';

            if ( ! empty( $field['description'] ) && ! $field['show_tooltip'] ) {
                if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                    echo '<p class="tip">' . wp_kses( $field['description'], wcv_allowed_html_tags() ) . '</p>';
                }
            }
        } elseif ( 'checkbox' === $field['type'] ) {

            echo '<ul class="control unstyled inline" style="padding:0; margin:0;">';
            echo '<li>';
            echo '<label class="wcv-checkbox-container" for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] );
            echo '<input type="checkbox" class="' . esc_attr( $field['class'] ) . ' ' . esc_attr( $field['wrapper_class'] ) . '" style="' . esc_attr( $field['style'] ) . '" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['cbvalue'] ) . '" ' . checked( $field['value'], $field['cbvalue'], false ) . '  ' . implode( ' ', $custom_attributes ) . '/>'; // phpcs:ignore
            echo '<span class="checkmark"></span>
            </label></li>'; //phpcs:ignore
            echo '</ul>';

            if ( ! empty( $field['description'] ) && ! $field['show_tooltip'] ) {
                if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                    echo '<p class="tip">' . wp_kses( $field['description'], wcv_allowed_html_tags() ) . '</p>';
                }
            }
        } else {

            if ( $field['show_label'] ) {
                echo '<label for="' . esc_attr( $field['id'] ) . '" class="' . esc_attr( $field['wrapper_class'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';
                self::description_tooltip( $field );
            }

            $html .= apply_filters( 'wcv_wp_input_start_' . $field['id'], $html );

            if ( 'hidden' !== $field['type'] ) {
                echo '<div class="control ' . esc_attr( $input_wrapper_class ) . '">';
            }

            if ( 'decimal' === $data_type || 'price' === $data_type || 'number' === $data_type ) {

                $type_number = 'data-parsley-type="number"';

                if ( ! empty( $custom_attributes ) && in_array( $type_number, $custom_attributes ) ) { // phpcs:ignore
                    $key = array_search( $type_number, $custom_attributes ); // phpcs:ignore
                    unset( $custom_attributes[ $key ] );
                }

                if ( 'price' === $data_type ) {
                    $custom_attributes[] = 'data-parsley-price';
                } else {
                    $custom_attributes[] = 'data-parsley-decimal="."';
                }
            }

            if ( ! empty( $append_before ) ) {
                echo $append_before; // phpcs:ignore
            }

            if ( 'price' === $data_type ) {
                $field['class']     .= ' wcv-price-input';
                $parsley_error_el    = 'wcv-price-input-' . $field['id'];
                $parsley_container   = 'wcv-price-input-conainer' . $field['id'];
                $custom_attributes[] = 'data-parsley-errors-container="#' . $parsley_error_el . '"';
                $custom_attributes[] = 'data-parsley-class-handler="#' . $parsley_container . '"';
                echo '<div class="wcv-price-input-container" id="' . esc_attr( $parsley_container ) . '">';
                echo '<span class="wcv-price-symbol">' . esc_html( get_woocommerce_currency_symbol() ) . '</span>';
            }

            echo '<input type="' . esc_attr( $field['type'] ) . '" class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['value'] ) . '" placeholder="' . esc_attr( $field['placeholder'] ) . '" ' . ( implode( ' ', $custom_attributes ) ) . '  /> '; //phpcs:ignore

            if ( 'price' === $data_type ) {
                echo '</div>';
                echo '<div  id="' . esc_attr( $parsley_error_el ) . '"></div>';
            }

            if ( ! empty( $append_after ) ) {
                echo $append_after; // phpcs:ignore
            }

            if ( 'hidden' !== $field['type'] ) {
                echo '</div>';
            }

            if ( ! empty( $field['description'] ) && ! $field['show_tooltip'] ) {
                if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                    echo '<p class="tip">' . wp_kses( $field['description'], wcv_allowed_html_tags() ) . '</p>';
                }
            }

            $html .= apply_filters( 'wcv_wp_input_end_' . $field['id'], $html );

            echo $html; // phpcs:ignore

        }

        if ( ! empty( $field['wrapper_class'] ) ) {
            echo '</div>';
        }

        if ( 'hidden' !== $field['type'] ) {
            echo '</div>';
        }

        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore
        }

        do_action( 'wcv_form_input_after_' . $field['id'], $field );
    }

    /**
     * Create select with label
     *
     * @since     2.5.2
     * @version   2.5.2
     * @since     2.6.2 Added use_multilevel_walker option
     *
     * @param      array $field Array defining all field attributes.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function select( $field ) {

        $post_id                        = isset( $field['post_id'] ) ? $field['post_id'] : 0;
        $field['class']                 = isset( $field['class'] ) ? $field['class'] : 'select2';
        $field['style']                 = isset( $field['style'] ) ? $field['style'] : '';
        $field['wrapper_class']         = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
        $field['wrapper_start']         = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']           = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['value']                 = isset( $field['value'] ) ? $field['value'] : get_post_meta( $post_id, $field['id'], true );
        $field['show_option_none']      = isset( $field['show_option_none'] ) ? $field['show_option_none'] : '';
        $field['options']               = isset( $field['options'] ) ? $field['options'] : array();
        $field['taxonomy_field']        = isset( $field['taxonomy_field'] ) ? $field['taxonomy_field'] : 'slug';
        $field['show_label']            = isset( $field['show_label'] ) ? $field['show_label'] : true;
        $field['show_tooltip']          = isset( $field['show_tooltip'] ) ? $field['show_tooltip'] : true;
        $field['multiple']              = isset( $field['multiple'] ) && $field['multiple'] ? true : false;
        $field['options_attr']          = isset( $field['options_attr'] ) ? $field['options_attr'] : array();
        $field['label_icon']            = isset( $field['label_icon'] ) ? $field['label_icon'] : '';
        $field['no_margin']             = isset( $field['no_margin'] ) ? $field['no_margin'] : false;
        $field['use_multilevel_walker'] = isset( $field['use_multilevel_walker'] ) ? $field['use_multilevel_walker'] : false;

        $field_name = $field['id'];
        if ( $field['multiple'] ) {
            $field_name .= '[]';
        }

        if ( isset( $field['name'] ) && $field['name'] ) {
            $field_name = $field['name'];
        }

        // Custom attribute handling.
        $custom_attributes = array();

        if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {

            foreach ( $field['custom_attributes'] as $attribute => $value ) {

                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
            }
        }

        if ( $field['multiple'] ) {
            $custom_attributes[] = 'multiple="multiple"';
        }

        // Taxonomy drop down
        // @todo Support nested parent/child attributes.
        if ( isset( $field['taxonomy'] ) && ( isset( $field['taxonomy_args'] ) && is_array( $field['taxonomy_args'] ) ) ) {

            // Default terms args.
            $defaults = array(
                'orderby'           => 'name',
                'order'             => 'ASC',
                'hide_empty'        => true,
                'exclude'           => array(),
                'exclude_tree'      => array(),
                'include'           => array(),
                'number'            => '',
                'fields'            => 'all',
                'slug'              => '',
                'parent'            => '',
                'hierarchical'      => true,
                'child_of'          => 0,
                'get'               => '',
                'name__like'        => '',
                'description__like' => '',
                'pad_counts'        => false,
                'offset'            => '',
                'search'            => '',
                'cache_domain'      => 'core',
            );

            if ( 'product_cat' === $field['taxonomy'] ) {
                $existing_terms = wp_get_post_terms( $post_id, $field['taxonomy'], array( 'fields' => 'all' ) );
                $selected       = array();
                if ( ! empty( $existing_terms ) ) {
                    foreach ( $existing_terms as $existing_term ) {
                        $selected[] = $existing_term->term_id;
                    }
                }
                $defaults = array_merge(
                    $defaults,
                    array(
                        'pad_counts'         => 1,
                        'show_count'         => 0,
                        'hierarchical'       => 1,
                        'hide_empty'         => 1,
                        'fields'             => 'all',
                        'show_uncategorized' => 1,
                        'orderby'            => 'name',
                        'selected'           => $selected,
                        'menu_order'         => false,
                        'value'              => 'id',
                    )
                );
            }

            // Merge args.
            $args = wp_parse_args( $field['taxonomy_args'], $defaults );

            if ( 'order' === $args['orderby'] ) {
                $args['menu_order'] = 'asc';
                $args['orderby']    = 'name';
            }
            $args['taxonomy'] = $field['taxonomy'];
            // Get terms for taxonomy.
            $terms = get_terms( $args );

            if ( 'product_cat' === $field['taxonomy'] ) {
                if ( $field['use_multilevel_walker'] ) {

                    // Allow filtering of multilevel walker arguments.
                    $multilevel_args = apply_filters( 'wcv_multilevel_walker_args', $args, $field );

                    $field['options'] = wcv_walk_category_multilevel_dropdown_tree( $terms, 0, $multilevel_args );
                } else {
                    // Use standard walker.
                    $field['options'] = wcv_walk_category_dropdown_tree( $terms, 0, $args );
                }
            } else {
                $options = array();
                foreach ( $terms as $term ) {
                    $options[ $term->term_id ] = $term->name;
                }
                $field['options'] = $options;
            }
        }

        do_action( 'wcv_form_select_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_start']; // phpcs:ignore
        }

        echo '<div class="control-group' . ( $field['no_margin'] ? ' no-margin' : '' ) . '">';

        if ( $field['show_label'] ) {
            // TODO: Add label icon position.
            echo '<label for="' . esc_attr( $field['id'] ) . '">';
            if ( isset( $field['label_icon'] ) && ! empty( $field['label_icon'] ) ) {
                echo wp_kses( $field['label_icon'], wcv_allowed_html_tags() );
            }
            echo '<span class="vertical-middle">' . wp_kses_post( $field['label'] ) . '</span>';
            echo '</label>';
            self::description_tooltip( $field );
        }

        echo '<div class="control select">';

        echo '<select id="' . esc_attr( $field['id'] ) . '" name="' . esc_attr( $field_name ) . '" class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '" ' . implode( ' ', $custom_attributes ) . '>'; // phpcs:ignore

        if ( ! empty( $field['show_option_none'] ) ) {
            echo '<option value>' . esc_html( $field['show_option_none'] ) . '</option>';
        }

        if ( isset( $field['taxonomy'] ) && 'product_cat' === $field['taxonomy'] ) {
            echo $field['options']; // phpcs:ignore
        } else {
            foreach ( $field['options'] as $key => $value ) {
                $selected = '';
                if ( isset( $field['multiple'] ) && $field['multiple'] ) {
                    $field_values = $field['value'];
                    if ( ! is_array( $field['value'] ) ) {
                        $field_values = explode( ',', $field['value'] );
                    }
                    if ( in_array( $key, $field_values, false ) ) { // phpcs:ignore
                        $selected = 'selected=\'selected\'';
                    }
                } elseif ( is_array( $field['value'] ) ) {
                        $selected = selected( esc_attr( reset( $field['value'] ) ), esc_attr( $key ), false );
                } else {
                    $selected = selected( esc_attr( $field['value'] ), esc_attr( $key ), false );
                }

                $option_attr = '';
                if ( isset( $field['options_attr'][ $key ] ) && is_array( $field['options_attr'][ $key ] ) ) {
                    foreach ( $field['options_attr'][ $key ] as $attr_key => $attr_value ) {
                        $option_attr .= ' ' . esc_attr( $attr_key ) . '="' . esc_attr( $attr_value ) . '"';
                    }
                }

                echo '<option value="' . esc_attr( $key ) . '" ' . esc_attr( $selected ) . $option_attr . '>' . esc_html( $value ) . '</option>'; //phpcs:ignore
            }
        }

        echo '</select> ';

        if ( ! empty( $field['description'] ) && ! $field['show_tooltip'] ) {
            if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                echo '<p class="tip">' . wp_kses( $field['description'], wcv_allowed_html_tags() ) . '</p>';
            }
        }

        echo '</div>'; // control.
        echo '</div>'; // control-group.

        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore
        }

        do_action( 'wcv_form_select_after_' . $field['id'], $field );
    }

    /**
     * Create select2 with label
     *
     * @since     2.5.2
     *
     * @param      array $field Array defining all field attributes.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     * @todo       considering remove this.
     */
    public static function select2( $field ) {

        $post_id                   = isset( $field['post_id'] ) ? $field['post_id'] : 0;
        $field['class']            = isset( $field['class'] ) ? $field['class'] : 'select2';
        $field['style']            = isset( $field['style'] ) ? $field['style'] : '';
        $field['wrapper_class']    = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
        $field['wrapper_start']    = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']      = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['value']            = isset( $field['value'] ) ? $field['value'] : get_post_meta( $post_id, $field['id'], true );
        $field['show_option_none'] = isset( $field['show_option_none'] ) ? $field['show_option_none'] : '';
        $field['options']          = isset( $field['options'] ) ? $field['options'] : array();
        $field['custom_tax']       = isset( $field['custom_tax'] ) ? $field['custom_tax'] : false;
        $field['show_tooltip']     = isset( $field['show_tooltip'] ) ? $field['show_tooltip'] : true;

        // Custom attribute handling.
        $custom_attributes = array();

        if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {

            foreach ( $field['custom_attributes'] as $attribute => $value ) {

                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
            }
        }

        // Taxonomy drop down.
        if ( isset( $field['taxonomy'] ) && ( isset( $field['taxonomy_args'] ) && is_array( $field['taxonomy_args'] ) ) ) {

            $existing_terms = wp_get_post_terms( $post_id, $field['taxonomy'], array( 'fields' => 'all' ) );

            $selected = array();
            if ( ! empty( $existing_terms ) ) {
                foreach ( $existing_terms as $existing_term ) {
                    $selected[] = $existing_term->term_id;
                }
            }

            // Default terms args.
            $defaults = apply_filters(
                'wcv_select2_args_' . $field['taxonomy'],
                array(
                    'pad_counts'         => 1,
                    'show_count'         => 0,
                    'hierarchical'       => 1,
                    'hide_empty'         => 1,
                    'fields'             => 'all',
                    'show_uncategorized' => 1,
                    'orderby'            => 'name',
                    'selected'           => $selected,
                    'menu_order'         => false,
                    'value'              => 'id',
                )
            );

            // Merge args.
            $args = wp_parse_args( $field['taxonomy_args'], $defaults );

            if ( 'order' === $args['orderby'] ) {
                $args['menu_order'] = 'asc';
                $args['orderby']    = 'name';
            }

            $args['taxonomy'] = $field['taxonomy'];
            // Get terms for taxonomy.
            $terms = get_terms( $args );

            if ( ! $terms ) {
                return;
            }

            $field['options'] = wcv_walk_category_dropdown_tree( $terms, 0, $args );

        }

        do_action( 'wcv_form_select2_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_start']; // phpcs:ignore
        }

        echo '<div class="control-group">';

        echo '<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';
        self::description_tooltip( $field );

        echo '<div class="control select">';

        if ( ! empty( $field['description'] ) && ! $field['show_tooltip'] ) {
            if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                echo '<span data-tooltip data-tip="' . esc_attr( $field['description'] ) . '" aria-haspopup="true" class="has-tip right" title="' . esc_attr( $field['description'] ) . '"><i class="wcv-icon wcv-icon-info-circle"></i></span>';
            }
        }

        echo '<select id="' . esc_attr( $field['id'] ) . '" name="' . esc_attr( $field['id'] ) . '" class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '" ' . implode( ' ', $custom_attributes ) . '>'; // phpcs:ignore

        if ( ! empty( $field['show_option_none'] ) ) {
            echo '<option value>' . esc_html( $field['show_option_none'] ) . '</option>';
        }

        // If taxonomy provided then display the custom walked drop down, otherwise iterate over provided options.
        if ( isset( $field['taxonomy'] ) && ( isset( $field['taxonomy_args'] ) && is_array( $field['taxonomy_args'] ) ) ) {
            echo $field['options']; //phpcs:ignore
        } else {
            foreach ( $field['options'] as $key => $value ) {
                echo '<option value="' . esc_attr( $key ) . '" ' . selected( esc_attr( $field['value'] ), esc_attr( $key ), false ) . '>' . esc_html( $value ) . '</option>';
            }
        }

        echo '</select> ';

        echo '</div>'; // control.
        echo '</div>'; // control-group.

        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore
        }

        if ( $field['custom_tax'] ) {

            $id = str_replace( '[]', '', $field['id'] );

            self::input(
                apply_filters(
                    'wcv_form_select2_custom_tax_' . $field['id'],
                    array(
                        'post_id' => $post_id,
                        'type'    => 'hidden',
                        'id'      => 'track_' . $id,
                        'value'   => '-1',
                    )
                )
            );
        }

        do_action( 'wcv_form_select2_after_' . $field['id'], $field );
    }

    /**
     * Create select2 with label
     *
     * @since     2.5.2
     *
     * @param      array $field Array defining all field attributes.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function nested_select( $field ) {

        $post_id                   = isset( $field['post_id'] ) ? $field['post_id'] : 0;
        $field['class']            = isset( $field['class'] ) ? $field['class'] : 'select2';
        $field['style']            = isset( $field['style'] ) ? $field['style'] : 'width: 100%';
        $field['wrapper_class']    = isset( $field['wrapper_class'] ) ? $field['wrapper_class'] : '';
        $field['wrapper_start']    = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']      = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['value']            = isset( $field['value'] ) ? $field['value'] : get_post_meta( $post_id, $field['id'], true );
        $field['show_option_none'] = isset( $field['show_option_none'] ) ? $field['show_option_none'] : '';
        $field['options']          = isset( $field['options'] ) ? $field['options'] : array();
        $field['value_type']       = isset( $field['value_type'] ) ? $field['value_type'] : 'value';
        $field['show_tooltip']     = isset( $field['show_tooltip'] ) ? $field['show_tooltip'] : true;

        // Custom attribute handling.
        $custom_attributes = array();

        if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {

            foreach ( $field['custom_attributes'] as $attribute => $value ) {

                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
            }
        }

        do_action( 'wcv_form_nested_select_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_start']; // phpcs:ignore
        }

        echo '<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';
        self::description_tooltip( $field );
        if ( ! empty( $field['description'] ) && $field['show_tooltip'] ) {
            if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                echo '<span data-tooltip data-tip="' . esc_attr( $field['description'] ) . '" aria-haspopup="true" class="has-tip right" title="' . esc_attr( $field['description'] ) . '"><i class="wcv-icon wcv-icon-info-circle"></i></span>';
            }
        }

        echo '<select id="' . esc_attr( $field['id'] ) . '" name="' . esc_attr( $field['id'] ) . '" class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '" ' . implode( ' ', $custom_attributes ) . '>'; //phpcs:ignore

        if ( ! empty( $field['show_option_none'] ) ) {
            echo '<option value>' . esc_html( $field['show_option_none'] ) . '</option>';
        }

        foreach ( $field['options'] as $option_group => $option ) {

            echo '<optgroup label="' . esc_attr( $option_group ) . '">';

            foreach ( $option as $key => $value ) {
                $output = ( 'value' === $field['value_type'] ) ? $value : $key;
                echo '<option value="' . esc_attr( $key ) . '" ' . selected( esc_attr( $field['value'] ), esc_attr( $key ), false ) . '>' . esc_html( $output ) . '</option>';
            }

            echo '</optgroup>';

        }

        echo '</select>';

        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore
        }

        do_action( 'wcv_form_nested_select_after_' . $field['id'], $field );
    }

    /**
     * Create a textarea with label
     *
     * @since     2.5.2
     *
     * @param      array $field Array defining all field attributes.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function textarea( $field ) {

        $allow_markup           = 'yes' === get_option( 'wcvendors_allow_form_markup', 'no' ) ? true : false;
        $post_id                = isset( $field['post_id'] ) ? $field['post_id'] : 0;
        $field['placeholder']   = isset( $field['placeholder'] ) ? $field['placeholder'] : '';
        $field['label']         = isset( $field['label'] ) ? $field['label'] : '';
        $field['class']         = isset( $field['class'] ) ? $field['class'] : 'select short';
        $field['rows']          = isset( $field['rows'] ) ? $field['rows'] : 3;
        $field['cols']          = isset( $field['cols'] ) ? $field['cols'] : 5;
        $field['style']         = isset( $field['style'] ) ? $field['style'] : '';
        $field['wrapper_start'] = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']   = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['value']         = isset( $field['value'] ) ? $field['value'] : get_post_meta( $post_id, $field['id'], true );
        $field['show_tooltip']  = isset( $field['show_tooltip'] ) ? $field['show_tooltip'] : true;
        $field['custom_margin'] = isset( $field['custom_margin'] ) ? $field['custom_margin'] : 0;

        // Strip tags.
        $field['value'] = ( $allow_markup ) ? $field['value'] : wp_strip_all_tags( $field['value'] );

        // Custom attribute handling.
        $custom_attributes = array();

        if ( ! empty( $field['custom_attributes'] ) && is_array( $field['custom_attributes'] ) ) {

            foreach ( $field['custom_attributes'] as $attribute => $value ) {
                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $value ) . '"';
            }
        }

        do_action( 'wcv_form_textarea_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_start']; // phpcs:ignore
        }

        $custom_margin = $field['custom_margin'] ? 'margin-bottom: ' . $field['custom_margin'] . 'px !important;' : '';
        echo '<div class="control-group" style="' . esc_attr( $custom_margin ) . '">';
        echo '<div class="control">';

        echo '<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';
        self::description_tooltip( $field );
        echo '<textarea class="' . esc_attr( $field['class'] ) . '" style="' . esc_attr( $field['style'] ) . '"  name="' . esc_attr( $field['id'] ) . '" id="' . esc_attr( $field['id'] ) . '" placeholder="' . esc_attr( $field['placeholder'] ) . '" rows="' . esc_attr( $field['rows'] ) . '" cols="' . esc_attr( $field['cols'] ) . '" ' . wp_kses_post( implode( ' ', $custom_attributes ) ) . '>' . esc_textarea( $field['value'] ) . '</textarea> ';

        echo '</div>';

        if ( ! empty( $field['description'] ) && ! $field['show_tooltip'] ) {
            if ( isset( $field['desc_tip'] ) && false !== $field['desc_tip'] ) {
                echo '<p class="tip">' . esc_html( $field['description'] ) . '</p>';
            }
        }

        echo '</div>';

        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore
        }

        do_action( 'wcv_form_textarea_after_' . $field['id'], $field );
    }

    /**
     * Output a woocommerce attribute select
     *
     * @since     2.5.2
     *
     * @param      int $post_id Post ID.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function attribute( $post_id ) {

        if ( 'yes' !== get_option( 'wcvendors_hide_product_basic_attributes', 'no' ) ) {

            // Array of defined attribute taxonomies.
            $attribute_taxonomies = wc_get_attribute_taxonomies();

            // If there are any defined attributes display them.
            if ( ! empty( $attribute_taxonomies ) ) {

                $i = 0;
                // Get any set attributes for the product.
                $attributes = maybe_unserialize( get_post_meta( $post_id, '_product_attributes', true ) );

                foreach ( $attribute_taxonomies as $product_attribute ) {

                    $current_attribute = '';
                    $is_variation      = 'no';

                    // If the attributes aren't empty, extract the attribute value for the current product
                    // Does not support multi select at this time
                    // TODO:  Support select2 and multiple attributes.
                    if ( ! empty( $attributes ) && array_key_exists( wc_attribute_taxonomy_name( $product_attribute->attribute_name ), $attributes ) ) {
                        // get all terms.
                        $current_attribute = wp_get_post_terms( $post_id, wc_attribute_taxonomy_name( $product_attribute->attribute_name ) );
                        $is_variation      = $attributes[ wc_attribute_taxonomy_name( $product_attribute->attribute_name ) ]['is_variation'] ? 'yes' : 'no';
                        $current_attribute = reset( $current_attribute );
                        $current_attribute = $current_attribute->slug;

                    }

                    // Output attribute select.
                    self::select(
                        array(
                            'id'               => 'attribute_values[' . $i . '][]',
                            'post_id'          => $post_id,
                            'label'            => ucfirst( wc_attribute_taxonomy_name( $product_attribute->attribute_name ) ),
                            'value'            => $current_attribute,
                            'show_option_none' => __( 'Select a ', 'wc-vendors' ) . ucfirst( $product_attribute->attribute_name ),
                            'taxonomy'         => wc_attribute_taxonomy_name( $product_attribute->attribute_name ),
                            'taxonomy_args'    => array(
                                'hide_empty' => 0,
                                'orderby'    => $product_attribute->attribute_orderby,
                            ),
                        )
                    );

                    // Output attribute name hidden.
                    self::input(
                        array(
                            'post_id'    => $post_id,
                            'id'         => 'attribute_names[' . $i . ']',
                            'type'       => 'hidden',
                            'show_label' => false,
                            'value'      => wc_attribute_taxonomy_name( $product_attribute->attribute_name ),
                        )
                    );
                    ++$i;
                }
            }

            // Support other plugins hooking into attributes
            // Not sure if this will work ?
            do_action( 'woocommerce_product_options_attributes' );

        }
    }

    /**
     * Output a the product images and hook into media uploader on front end
     *
     * @since      2.5.2
     *
     * @param      int $post_id the post id for the files being uploaded.
     */
    public static function product_media_uploader( $post_id ) {

        $post_thumb = has_post_thumbnail( $post_id );
        // Load the template.
        wc_get_template(
            'product/product-media-uploader.php',
            array(
                'post_id'    => $post_id,
                'post_thumb' => $post_thumb,
            ),
            'wc-vendors/',
            WCV_TEMPLATE_BASE
        );
    }

    /**
     * Output a file upload link
     *
     * @since   2.5.2
     * @version 2.5.2
     *
     * @param   array  $field file uploader arguments.
     * @param   string $type  Upload file type.
     *
     * @todo    add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function file_uploader( $field, $type = 'image' ) {

        if ( 'image' === $type ) {
            self::image_uploader( $field );

            return;
        }

        $field['header_text']   = isset( $field['header_text'] ) ? $field['header_text'] : __( 'File', 'wc-vendors' );
        $field['add_text']      = isset( $field['add_text'] ) ? $field['add_text'] : __( 'Add file', 'wc-vendors' );
        $field['remove_text']   = isset( $field['remove_text'] ) ? $field['remove_text'] : __( 'Remove file', 'wc-vendors' );
        $field['file_meta_key'] = isset( $field['file_meta_key'] ) ? $field['file_meta_key'] : '_wcv_file_id';
        $field['save_button']   = isset( $field['save_button'] ) ? $field['save_button'] : __( 'Add File', 'wc-vendors' );
        $field['window_title']  = isset( $field['window_title'] ) ? $field['window_title'] : __( 'Select a File', 'wc-vendors' );
        $field['value']         = isset( $field['value'] ) ? $field['value'] : 0;
        $field['class']         = isset( $field['class'] ) ? $field['class'] : '';
        $field['wrapper_start'] = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']   = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['required']      = isset( $field['required'] ) ? $field['required'] : '';
        $field['id']            = isset( $field['id'] ) ? $field['id'] : $field['file_meta_key'];

        $file_url = '';
        $has_file = false;
        $required = '' !== $field['required'] ? 'required' : '';

        if ( $field['value'] ) {
            $file_url = wp_get_attachment_url( $field['value'] );
        }

        if ( $file_url ) {
            $has_file = true;
        }

        do_action( 'wcv_form_file_uploader_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_start']; //phpcs:ignore
        }

        echo '<div class="wcv-file-uploader' . esc_attr( $field['file_meta_key'] ) . ' ' . esc_attr( $field['class'] ) . '">';

        if ( $file_url ) {
            switch ( $type ) {
                case 'video':
                    echo do_shortcode( '[video src="' . $file_url . '"]' );
                    break;
                case 'audio':
                    echo do_shortcode( '[audio src="' . $file_url . '"]' );
                    break;
                case 'document':
                    printf( '<a href="%1$s" target="_blank">%1$s</a>', esc_attr( $file_url ) );
                    break;
                default:
                    echo '<div class="control-group"><div class="control"><input value="' . esc_attr( $file_url ) . '" type="text" readonly /></div></div>';
            }
        }

        echo '</div>';

        echo '<a class="wcv-file-uploader-add' . esc_attr( $field['file_meta_key'] ) . ' ' . ( $has_file ? 'hidden' : '' ) . '" href="#">' . esc_html( $field['add_text'] ) . '</a><br />';
        echo '<a class="wcv-file-uploader-delete' . esc_attr( $field['file_meta_key'] ) . ' ' . ( ! $has_file ? 'hidden' : '' ) . '" href="#" >' . esc_html( $field['remove_text'] ) . '</a><br />';
        echo '<input class="wcv-img-id wcv-file-uploader" name="' . esc_attr( $field['file_meta_key'] ) . '" id="' . esc_attr( $field['file_meta_key'] ) . '" type="hidden" value="' . esc_attr( $field['value'] ) . '" data-file_meta_key="' . esc_attr( $field['file_meta_key'] ) . '" data-save_button="' . esc_attr( $field['save_button'] ) . '" data-window_title="' . esc_attr( $field['window_title'] ) . '" data-type="' . esc_attr( $type ) . '" data-msg-id="' . esc_attr( $field['file_meta_key'] ) . '_msg" ' . esc_attr( $required ) . ' />';
        echo '<span id="' . esc_attr( $field['file_meta_key'] ) . '_msg"></span>';

        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        do_action( 'wcv_form_file_uploader_after_' . $field['id'], $field );
    }

    /**
     * Output a file upload link
     * This method is the original of file_uploader medthod
     *
     * @since      2.5.2
     *
     * @param      array $field file uploader arguments.
     *
     * @todo       add filters to allow the field to be hooked into this should not echo html but return it.
     */
    public static function image_uploader( $field ) {

        $field['header_text']    = isset( $field['header_text'] ) ? $field['header_text'] : __( 'Image', 'wc-vendors' );
        $field['add_text']       = isset( $field['add_text'] ) ? $field['add_text'] : __( 'Add Image', 'wc-vendors' );
        $field['remove_text']    = isset( $field['remove_text'] ) ? $field['remove_text'] : __( 'Remove Image', 'wc-vendors' );
        $field['image_meta_key'] = isset( $field['image_meta_key'] ) ? $field['image_meta_key'] : '_wcv_image_id';
        $field['save_button']    = isset( $field['save_button'] ) ? $field['save_button'] : __( 'Add Image', 'wc-vendors' );
        $field['window_title']   = isset( $field['window_title'] ) ? $field['window_title'] : __( 'Select an Image', 'wc-vendors' );
        $field['value']          = isset( $field['value'] ) ? $field['value'] : 0;
        $field['size']           = isset( $field['size'] ) ? $field['size'] : 'full';
        $field['class']          = isset( $field['class'] ) ? $field['class'] : '';
        $field['wrapper_start']  = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']    = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['required']       = isset( $field['required'] ) ? $field['required'] : '';
        $field['id']             = isset( $field['id'] ) ? $field['id'] : $field['image_meta_key'];

        // Get the image src.
        $image_src = wp_get_attachment_image_src( $field['value'], $field['size'] );

        // see if the array is valid.
        $has_image = is_array( $image_src );

        do_action( 'wcv_form_file_uploader_before_' . $field['id'], $field );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_start']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        echo '<div class="wcv-file-uploader' . esc_attr( $field['image_meta_key'] ) . ' ' . esc_attr( $field['class'] ) . '">';

        if ( $has_image ) {
            echo '<img src="' . esc_attr( $image_src[0] ) . '" alt="" style="max-width:100%; margin-bottom: 16px;" />';
        }

        echo '</div>';

        $required = '' !== $field['required'] ? 'required' : '';

        echo '<button class="wcv-file-uploader-add' . esc_attr( $field['image_meta_key'] ) . ' ' . ( $has_image ? 'hidden' : '' ) . ' wcv-button wcv-button-outline text-blue">' . wp_kses( wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-middle wcv-icon-left', 'wcv-icon-photo' ), wcv_allowed_html_tags() ) . esc_html( $field['add_text'] ) . '</button> ';
        echo '<button class="wcv-file-uploader-delete' . esc_attr( $field['image_meta_key'] ) . ' ' . ( ! $has_image ? 'hidden' : '' ) . '  wcv-button wcv-button-cancel" >' . esc_html( $field['remove_text'] ) . '</button><br />';
        echo '<input class="wcv-img-id wcv-file-uploader" name="' . esc_attr( $field['image_meta_key'] ) . '" id="' . esc_attr( $field['image_meta_key'] ) . '" type="hidden" value="' . esc_attr( $field['value'] ) . '" data-image_meta_key="' . esc_attr( $field['image_meta_key'] ) . '" data-save_button="' . esc_attr( $field['save_button'] ) . '" data-window_title="' . esc_attr( $field['window_title'] ) . '" data-type="image" data-msg-id="' . esc_attr( $field['image_meta_key'] ) . '_msg" ' . esc_attr( $required ) . ' />';
        echo '<span id="' . esc_attr( $field['image_meta_key'] ) . '_msg"></span>';
        // container wrapper end if defined.
        if ( ! empty( $field['wrapper_start'] ) && ! empty( $field['wrapper_end'] ) ) {
            echo $field['wrapper_end']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        do_action( 'wcv_form_file_uploader_after_' . $field['id'], $field );
    }

    /**
     * Output a submit button
     *
     * @since      2.5.2
     *
     * @param      array $args the text for the submit button.
     */
    public static function submit( $args ) {

        $args['id']            = isset( $args['id'] ) ? $args['id'] : '';
        $args['value']         = isset( $args['value'] ) ? $args['value'] : 'Submit';
        $args['class']         = isset( $args['class'] ) ? $args['class'] : 'wcv-button';
        $args['append_before'] = isset( $args['append_before'] ) ? $args['append_before'] : '';
        $args['append_after']  = isset( $args['append_after'] ) ? $args['append_after'] : '';

        do_action( 'wcv_form_submit_before_' . $args['id'], $args );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            echo $args['wrapper_start']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        if ( ! empty( $args['append_before'] ) ) {
            echo $args['append_before']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        echo '<input type="submit" value="' . esc_attr( $args['value'] ) . '" class="' . esc_attr( $args['class'] ) . '" name="' . esc_attr( $args['id'] ) . '" id="' . esc_attr( $args['id'] ) . '">';

        if ( ! empty( $args['append_after'] ) ) {
            echo $args['append_after']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        // container wrapper end if defined.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            echo $args['wrapper_end']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        do_action( 'wcv_form_submit_after_' . $args['id'], $args );
    }

    /**
     * Output a clear button
     *
     * @since      2.5.2
     *
     * @param      array $args the attributes for the clear button.
     */
    public static function clear( $args ) {

        $args['id']    = isset( $args['id'] ) ? $args['id'] : '';
        $args['value'] = isset( $args['value'] ) ? $args['value'] : 'Clear';
        $args['class'] = isset( $args['class'] ) ? $args['class'] : '';

        do_action( 'wcv_form_submit_before_' . $args['id'], $args );

        // Container wrapper start if defined start & end required otherwise no output is show.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            echo $args['wrapper_start']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        echo '<input type="reset" value="' . esc_attr( $args['value'] ) . '" class="wcv-button ' . esc_attr( $args['class'] ) . '" name="' . esc_attr( $args['id'] ) . '" id="' . esc_attr( $args['id'] ) . '">';

        // container wrapper end if defined.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            echo $args['wrapper_end']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        do_action( 'wcv_form_submit_after_' . $args['id'], $args );
    }

    /**
     * Output an HTML element
     *
     * @since 1.5.5
     *
     * @param array $args the properties of the html element.
     */
    public static function html_element( $args ) {

        if ( isset( $args['attributes'] ) ) {
            $element_attributes = '';
            foreach ( $args['attributes'] as $key => $value ) {
                $element_attributes .= ' ' . $key . '="' . $value . '"';
            }
        }

        do_action( 'wcv_form_html_before_' . $args['id'], $args );

        $html = '';

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            $html .= $args['wrapper_start'];
        }

        $html .= '<' . $args['element'] . ' id="' . $args['id'] . '"' . $element_attributes . '>';
        $html .= ( isset( $args['content'] ) && '' !== $args['content'] ) ? wp_kses( $args['content'], 'post' ) : '';
        $html .= '</' . $args['element'] . '>';

        // container wrapper end if defined.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            $html .= $args['wrapper_end'];
        }

        $html = apply_filters( 'wcv_form_html_' . $args['id'], $html );

        if ( isset( $args['echo'] ) && ! $args['echo'] ) {
            return $html;
        } else {
            echo $html; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        do_action( 'wcv_form_html_after_' . $args['id'], $args );
    }

    /**
     * Output a selec2 country selector
     *
     * @version    2.5.2
     * @since      2.5.2
     *
     * @param      array $field country select arguments.
     */
    public static function country_select2( $field ) {

        $field['id']               = isset( $field['id'] ) ? $field['id'] : '';
        $field['label']            = isset( $field['label'] ) ? $field['label'] : '';
        $field['value']            = isset( $field['value'] ) ? $field['value'] : '';
        $field['class']            = isset( $field['class'] ) ? $field['class'] : '';
        $field['wrapper_start']    = isset( $field['wrapper_start'] ) ? $field['wrapper_start'] : '';
        $field['wrapper_end']      = isset( $field['wrapper_end'] ) ? $field['wrapper_end'] : '';
        $field['show_option_none'] = isset( $field['show_option_none'] ) ? $field['show_option_none'] : '';
        $field['options']          = isset( $field['options'] ) ? $field['options'] : ( ( WC()->countries->get_allowed_countries() ) ? WC()->countries->get_allowed_countries() : WC()->countries->get_shipping_countries() );

        if ( '' === $field['value'] ) {
            $field['value'] = WC()->countries->get_base_country();
        }

        $custom_attributes = array();

        if ( isset( $field['custom_attributes'] ) ) {
            if ( is_array( $field['custom_attributes'] ) ) {
                $custom_attributes = $field['custom_attributes'];
            }
        }

        do_action( 'wcv_form_country_select2_before_' . $field['id'], $field );

        self::select(
            apply_filters(
                'wcv_country_select2',
                array(
                    'id'                => $field['id'],
                    'label'             => $field['label'],
                    'value'             => $field['value'],
                    'class'             => 'select2 country_to_state country_select ' . $field['class'],
                    'options'           => $field['options'],
                    'wrapper_start'     => $field['wrapper_start'],
                    'wrapper_end'       => $field['wrapper_end'],
                    'custom_attributes' => $custom_attributes,
                )
            )
        );

        do_action( 'wcv_form_country_select2_after_' . $field['id'], $field );
    }

    /**
     * Countries array
     *
     * @version 2.5.4
     * @since   2.5.2
     */
    public static function countries() {
        if ( ! function_exists( 'WC' ) ) {
            return array();
        }

        if ( ! isset( WC()->countries ) ) {
            return array();
        }

        $countries = WC()->countries->get_allowed_countries();

        if ( 'specific' !== get_option( 'woocommerce_ship_to_countries' ) ) {
            if ( ! isset( $countries['EWE'] ) ) {
                $countries['EWE'] = __( 'Everywhere else', 'wc-vendors' );
            }
        }

        if ( ! is_array( $countries ) ) {
            return array();
        }

        return apply_filters( 'wcv_countries_list', $countries );
    }

    /**
     * Generate a check list for categories on the front end
     *
     * @param int   $post_id the post id.
     * @param array $args    the arguments for the check list.
     * @param array $field   the field options.
     *
     * @since 2.5.2
     */
    public static function wcv_terms_checklist( $post_id = 0, $args = array(), $field = array() ) {

        $field['class'] = isset( $field['class'] ) ? $field['class'] : '';

        $defaults = array(
            'descendants_and_self' => 0,
            'selected_cats'        => false,
            'walker'               => null,
            'taxonomy'             => 'category',
            'checked_ontop'        => false,
            'echo'                 => true,
        );

        $params = apply_filters( 'wp_terms_checklist_args', $args, $post_id );

        $r = wp_parse_args( $params, $defaults );

        if ( empty( $r['walker'] ) || ! ( $r['walker'] instanceof \Walker ) ) {
            $walker = new \WCV_Walker_Category_Checklist();
        } else {
            $walker = $r['walker'];
        }

        $hide_empty = isset( $r['hide_empty'] ) ? (bool) $r['hide_empty'] : true;

        $taxonomy = $r['taxonomy'];

        $descendants_and_self = (int) $r['descendants_and_self'];

        $args = array( 'taxonomy' => $taxonomy );

        $args['list_only'] = ! empty( $r['list_only'] );

        if ( is_array( $r['selected_cats'] ) ) {
            $args['selected_cats'] = $r['selected_cats'];
        } elseif ( $post_id ) {
            $args['selected_cats'] = wp_get_object_terms( $post_id, $taxonomy, array_merge( $args, array( 'fields' => 'ids' ) ) );
        } else {
            $args['selected_cats'] = array();
        }

        $categories = array();

        if ( $descendants_and_self ) {
            $categories = (array) get_terms(
                array(
                    'child_of'     => $descendants_and_self,
                    'hierarchical' => 0,
                    'hide_empty'   => $hide_empty,
                    'exclude'      => $r['exclude'],
                    'taxonomy'     => $taxonomy,
                )
            );
            $self       = get_term( $descendants_and_self, $taxonomy );
            array_unshift( $categories, $self );
        } else {
            $categories = (array) get_terms(
                array(
                    'exclude'    => $r['exclude'],
                    'taxonomy'   => $taxonomy,
                    'hide_empty' => $hide_empty,
                )
            );
        }

        $output = '';

        // Then the rest of them.
        $output .= call_user_func_array( array( $walker, 'walk' ), array( $categories, 0, $args ) );

        if ( $r['echo'] ) {

            do_action( 'wcv_form_wcv_terms_checklist_before_' . $field['id'], $field );

            echo '<div class="control-group">';
            echo '<label for="' . esc_attr( $field['id'] ) . '">' . wp_kses_post( $field['label'] ) . '</label>';
            echo '<div class="wcv_terms_checklist_container">';

            echo '<ul class="control unstyled wcv_terms_checklist ' . esc_attr( $field['class'] ) . '">';
            echo $output; // phpcs:ignore
            echo '</ul>';

            echo '</div>';
            echo '<span class="wcv_required_form_msg wcv_check_list_msg"></span>';
            echo '</div>';

            do_action( 'wcv_form_wcv_terms_checklist_after_' . $field['id'], $field );
        }

        return $output;
    }

    /**
     * Output a custom form input based on an included file
     *
     * @since 2.5.2
     *
     * @param array $field the field options.
     */
    public static function custom_field( $field ) {

        extract( $field ); // phpcs:ignore

        do_action( 'wcv_form_custom_field_before_' . $id, $field );

        echo '<div class="control-group">';

        if ( isset( $wrapper_class ) ) {
            echo '<div class="' . esc_attr( $wrapper_class ) . '">';
        }

        include_once $path;

        if ( isset( $wrapper_class ) ) {
            echo '</div>';
        }

        echo '</div>';

        do_action( 'wcv_form_custom_field_after_' . $id, $field );
    }

    /**
     * This function will output form fields based on the options parsed
     *
     * @since 2.5.2
     *
     * @param array $options field options.
     * @param int   $post_id the post id.
     */
    public static function generate_form_part( $options, $post_id = 0 ) {

        extract( $options ); // phpcs:ignore

        if ( isset( $wrapper_class ) ) {
            echo '<div class="' . esc_attr( $wrapper_class ) . '" id="' . esc_attr( $wrapper_id ) . '">';
        }

        foreach ( $fields as $field_id => $field ) {

            $field['id']      = $field_id;
            $field['post_id'] = $post_id;

            switch ( $field['field_type'] ) {
                case 'input':
                case 'hidden':
                    self::input( $field );
                    break;
                case 'textarea':
                    self::textarea( $field );
                    break;
                case 'select':
                    self::select( $field );
                    break;
                case 'select2':
                    self::select2( $field );
                    break;
                case 'custom_field':
                    self::custom_field( $field );
                    break;
                default:
                    break;
            }
        }

        if ( isset( $wrapper_class ) ) {
            echo '</div>';
        }
    }

    /**
     * Sanatize a value passed
     *
     * @param string $value the value to sanatize.
     * @param string $sanitize the type of sanatization to apply.
     *
     * @since  2.5.5
     * @access public
     */
    public static function sanatize_value( $value, $sanitize = '' ) {

        switch ( $sanitize ) {
            case 'int':
                $value = $value ? absint( $value ) : '';
                break;
            case 'float':
                $value = $value ? floatval( $value ) : '';
                break;
            case 'yesno':
                $value = 'yes' === $value ? 'yes' : 'no';
                break;
            case 'issetyesno':
                $value = $value ? 'yes' : 'no';
                break;
            case 'max_date':
                $value = absint( $value );
                if ( 0 === $value ) {
                    $value = 1;
                }
                break;
            case 'unixtime':
                $value = strtotime( $value );
                break;
            default:
                $value = sanitize_text_field( $value );
        }

        return $value;
    }

    /**
     * Check custom attributes to see if it matches the old validation system.
     *
     * @param array  $custom_attributes the custom attributes.
     * @param string $field_id the field id.
     *
     * @since 2.5.2
     */
    public static function check_custom_attributes( $custom_attributes, $field_id ) { // phpcs:ignore

        $new_validation_rules = array();

        foreach ( $custom_attributes as $attribute => $value ) {

            switch ( $attribute ) {
                case 'data-rules':
                    $rules = explode( '|', $value );

                    foreach ( $rules as $rule ) {
                        switch ( $rule ) {
                            case 'required':
                                $new_validation_rules['required'] = '';
                                break;
                            case 'decimal':
                                $new_validation_rules['data-parsley-decimal'] = wc_get_price_decimal_separator();
                                break;
                            default:
                                if ( str_starts_with( $rule, 'max_length' ) ) {
                                    preg_match( '/\[(.*)\]/', $rule, $matches );
                                    $new_validation_rules['data-parsley-maxlength'] = $matches[1];
                                }
                                $new_validation_rules = apply_filters( 'wcv_form_helper_custom_validation_rule', $new_validation_rules, $rule );
                                break;
                        }
                    }
                    unset( $custom_attributes['data-rules'] );
                    break;
                case 'data-label':
                    // Do nothing.
                    break;
                case 'data-error':
                    $new_validation_rules['data-parsley-error-message'] = $value;
                    unset( $custom_attributes['data-error'] );
                    break;
                default:
                    $new_validation_rules = apply_filters( 'wcv_form_helper_custom_validation', $new_validation_rules, $attribute, $value );
                    // code...
                    break;
            }
        }

        $new_custom_attributes = array_merge( $custom_attributes, $new_validation_rules );

        return $new_custom_attributes;
    }

    /**
     * Button
     *
     * @since      2.5.4
     *
     * @param      array $args The button arguments.
     */
    public static function button( $args ) {

        $args['id']          = isset( $args['id'] ) ? $args['id'] : '';
        $args['value']       = isset( $args['value'] ) ? $args['value'] : 'Submit';
        $args['class']       = isset( $args['class'] ) ? $args['class'] : 'wcv-button';
        $args['before_text'] = isset( $args['before_text'] ) ? $args['before_text'] : '';
        $args['after_text']  = isset( $args['after_text'] ) ? $args['after_text'] : '';
        $args['type']        = isset( $args['type'] ) ? $args['type'] : 'submit';
        $args['button_text'] = isset( $args['button_text'] ) ? $args['button_text'] : '';

        do_action( 'wcv_form_button_before_' . $args['id'], $args );

        // Container wrapper start if defined start & end required otherwise no output is shown.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            echo $args['wrapper_start']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        echo '<button type="' . esc_attr( $args['type'] ) . '" class="' . esc_attr( $args['class'] ) . '" name="' . esc_attr( $args['id'] ) . '" id="' . esc_attr( $args['id'] ) . '">';

        if ( ! empty( $args['before_text'] ) ) {
            echo $args['before_text']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        echo esc_html( $args['button_text'] );

        if ( ! empty( $args['after_text'] ) ) {
            echo $args['after_text']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        echo '</button>';

        if ( 'submit' === $args['type'] ) {
            echo '<input type="hidden" value="' . esc_attr( $args['value'] ) . '" name="' . esc_attr( $args['id'] ) . '">';
        }

        // container wrapper end if defined.
        if ( ! empty( $args['wrapper_start'] ) && ! empty( $args['wrapper_end'] ) ) {
            echo $args['wrapper_end']; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }

        do_action( 'wcv_form_button_after_' . $args['id'], $args );
    }

    /**
     * Build desctiption tooltip
     *
     * @param array $field the field options.
     */
    public static function description_tooltip( $field ) {

        $description  = isset( $field['description'] ) ? $field['description'] : false;
        $desc_tip     = isset( $field['desc_tip'] ) ? $field['desc_tip'] : false;
        $show_tooltip = isset( $field['show_tooltip'] ) ? $field['show_tooltip'] : true;
        if ( ! $description || ! $desc_tip || ! $show_tooltip ) {
            return;
        }

        echo '<span class="wcv-tip">';
        echo '<svg class="wcv-icon wcv-setting-icon">
            <use xlink:href="' . esc_attr( WCV_ASSETS_URL ) . 'svg/wcv-icons.svg#wcv-icon-info"></use>
        </svg>';
        echo '<div class="content">' . wp_kses_post( $description ) . '<span class="arrow"></span></div>';
        echo '</span>';
    }
}
