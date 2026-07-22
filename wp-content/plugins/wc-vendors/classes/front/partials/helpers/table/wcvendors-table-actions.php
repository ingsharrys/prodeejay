<?php

/**
 * Dashboard action URL
 *
 * This file is used to display a dashboard action url
 *
 * @link       http://www.wcvendors.com
 * @since      2.5.2
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

?>

<div class="row-actions row-actions-<?php echo esc_attr( $this->id ); ?>">
    <?php

    foreach ( $this->actions as $ac => $details ) {
        $icon = isset( $details['icon'] ) ? $details['icon'] : 'wcv-icon-plus-square';
        if ( ! empty( $details ) ) {

            if ( empty( $details['url'] ) ) {
                if ( 'view' === $ac ) {
                    $action_url = get_permalink( $object_id );
                } else {
                    $action_url = WCV_Vendor_Dashboard::get_dashboard_page_url( $this->post_type . '/' . $ac . '/' . $object_id );
                }
            } else {
                $action_url = $details['url'];
            }
        }

        $class    = ! empty( $details['class'] ) ? 'class="' . esc_attr( $details['class'] ) . '"' : '';
        $customId = ! empty( $details['id'] ) ? 'id="' . esc_attr( $details['id'] ) . '"' : '';
        $target   = ! empty( $details['target'] ) ? 'target="' . esc_attr( $details['target'] ) . '"' : '';
        $custom   = '';
        if ( ! empty( $details['custom'] ) ) {
            foreach ( $details['custom'] as $attr => $value ) {
                $custom .= esc_attr( $attr ) . '="' . esc_attr( $value ) . '" ';
            }
        }

        printf(
            '<div class="row-action-item wcv-flex wcv-flex-start %s">%s<a href="%s" %s %s %s %s>%s</a></div>',
            isset( $details['wrap_class'] ) ? esc_attr( $details['wrap_class'] ) : '',
            wcv_get_icon( 'wcv-icon wcv-icon-24 wcv-icon-left', $icon ), //phpcs:ignore
            esc_url( $action_url ),
            $customId, //phpcs:ignore
            $class,//phpcs:ignore
            $target,//phpcs:ignore
            $custom,//phpcs:ignore
            esc_html( $details['label'] )
        ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
    ?>
</div>
