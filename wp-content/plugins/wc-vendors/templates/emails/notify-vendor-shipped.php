<?php
/**
 * DEPRECAITED - Admin new order email
 *
 * @author  WooThemes
 * @package WooCommerce/Templates/Emails/HTML
 * @version 2.1.8
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly.

$order_date = $order->get_date_created();

?>

<?php do_action( 'woocommerce_email_header', $email_heading ); ?>

<p><?php printf( /* translators: %s: vendor name */ esc_html__( 'A %s has marked part of your order as shipped. The items that are shipped are as follows:', 'wc-vendors' ), esc_html( wcv_get_vendor_name( true, false ) ) ); ?></p>

<?php do_action( 'woocommerce_email_before_order_table', $order, true ); ?>

<h2><?php printf( /* translators: %s: order number */ esc_html__( 'Order: %s', 'wc-vendors' ), esc_html( $order->get_order_number() ) ); ?>
    (<?php printf( '<time datetime="%s">%s</time>', esc_attr( date_i18n( 'c', strtotime( $order_date ) ) ), esc_html( date_i18n( wc_date_format(), strtotime( $order_date ) ) ) ); ?>
    )</h2>

<table cellspacing="0" cellpadding="6" style="width: 100%; border: 1px solid #eee;" border="1" bordercolor="#eee">
    <thead>
    <tr>
        <th scope="col" style="text-align:left; border: 1px solid #eee;"><?php esc_html_e( 'Product', 'wc-vendors' ); ?></th>
        <th scope="col" style="text-align:left; border: 1px solid #eee;"><?php esc_html_e( 'Quantity', 'wc-vendors' ); ?></th>
        <th scope="col" style="text-align:left; border: 1px solid #eee;"><?php esc_html_e( 'Price', 'wc-vendors' ); ?></th>
    </tr>
    </thead>
    <tbody>
    <?php
    echo wp_kses_post(
        wc_get_email_order_items(
            $order,
            array(
                'show_sku'      => true,
                'show_image'    => false,
                'image_size'    => array( 32, 32 ),
                'plain_text'    => false,
                'sent_to_admin' => false,
            )
        )
    );
    ?>
    </tbody>
    <tfoot>
    <?php
    $order_totals = $order->get_order_item_totals();
    if ( $order_totals ) {
        $i = 0;
        foreach ( $order_totals as $total ) {
            ++$i;
            ?>
            <tr>
                <th scope="row" colspan="2" style="text-align:left; border: 1px solid #eee;
                <?php
                if ( 1 === $i ) {
                    echo 'border-top-width: 4px;';
                }
                ?>
                        "><?php echo wp_kses_post( $total['label'] ); ?></th>
                <td style="text-align:left; border: 1px solid #eee;
                <?php
                if ( 1 === $i ) {
                    echo 'border-top-width: 4px;';
                }
                ?>
                        "><?php echo wp_kses_post( $total['value'] ); ?></td>
            </tr>
            <?php
        }
    }
    ?>
    </tfoot>
</table>

<?php do_action( 'woocommerce_email_after_order_table', $order, true ); ?>

<?php do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email ); ?>

<h2><?php esc_html_e( 'Customer details', 'wc-vendors' ); ?></h2>

<?php if ( $order->get_billing_email() ) : ?>
    <p><strong><?php esc_html_e( 'Email:', 'wc-vendors' ); ?></strong> <?php echo esc_html( $order->get_billing_email() ); ?></p>
<?php endif; ?>
<?php if ( $order->get_billing_phone() ) : ?>
    <p><strong><?php esc_html_e( 'Tel:', 'wc-vendors' ); ?></strong> <?php echo esc_html( $order->get_billing_phone() ); ?></p>
<?php endif; ?>

<?php wc_get_template( 'emails/email-addresses.php', array( 'order' => $order ) ); ?>

<?php do_action( 'woocommerce_email_footer' ); ?>
