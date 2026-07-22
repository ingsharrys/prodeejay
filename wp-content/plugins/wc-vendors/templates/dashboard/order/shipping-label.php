<?php
/**
 * The template for displaying the shipping label
 *
 * Override this template by copying it to yourtheme/wc-vendors/dashboard/order
 *
 * @package    WC_Vendors
 * @version    2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */
?>

<html>
<head>
    <title></title>
    <style type="text/css">
        body {
            padding: 2em 3em;
            font-family: arial,sans-serif;
            line-height: 1.48;
            font-size: 14px;
            max-width: 21cm;
        }
        .row {
            display: flex;
            justify-content: space-between;
        }
        .row > * {
            flex-shrink: 0;
            flex-grow: 0;
        }
        .row > *:nth-child(2) {
            width: 40%;
        }
        #shipping-label {
            text-transform: uppercase;
            border-bottom: 2px dashed #aaa;
            margin-bottom: 2em;
            padding-bottom: 2em;
        }
        #shipping-label .customer {
            font-size: 18px;
        }
        #shipping-label .vendor {
            text-align: right;
            font-size: 12px;
        }
        #vendor-info {
            margin-bottom: 2em;
        }
        #customer-info {
            margin-bottom: 2em;
        }
        .vendor-logo {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 3em;
        }
        .vendor-logo img {
            max-height: 120px;
            width: auto;
        }
        address {
            font-style: normal;
        }
        h3 {
            text-transform: uppercase;
            margin: 0;
        }
        table {
            border-collapse: collapse;
            font-size: 14px;
            width: 100%;
        }
        td, th {
            border-width: 1px 0;
            border-style: solid;
            border-color: #aaa;
            padding: 5px 10px;
        }
        table thead {
            background: #222;
            color: #fff;
        }
        table .product {
            width: 80%;
            text-align: left;
        }
        table .quantity {
            width: 20%;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="shipping-label">
        <div class="row">
            <address class="customer">
                <h3><?php esc_html_e( 'Ship to:', 'wc-vendors' ); ?></h3>
                <?php echo esc_html( $ship_to ); ?>
            </address>
            <address class="vendor">
                <?php echo esc_html( $store_name ); ?><br/>
                <?php echo esc_html( $ship_from ); ?>
            </address>
        </div>
    </div>

    <div id="vendor-info">
        <div class="row">
            <div class="vendor-logo">
                <?php echo $store_icon ? $store_icon : $store_name; //phpcs:ignore ?>
            </div>
            <address>
                <strong><?php echo esc_html( $store_name ); ?></strong><br/>
                <?php echo esc_html( $ship_from ); ?>
            </address>
        </div>
    </div>

    <div id="customer-info">
        <div class="row">
            <address>
                <?php echo esc_html( $ship_to ); ?>
            </address>
            <div class="order-details">
                <?php echo esc_html__( 'Order number:', 'wc-vendors' ); ?> <?php echo esc_html( $order->get_order_number() ); ?></br>
                <?php echo esc_html__( 'Order date:', 'wc-vendors' ); ?> <?php echo esc_html( $order->get_date_created()->format( 'F j, Y' ) ); ?>
            </div>
        </div>
    </div>

    <table id="picking-list">
        <thead>
            <tr>
                <th class="product"><?php echo esc_html__( 'Product', 'wc-vendors' ); ?></th>
                <th class="quantity"><?php echo esc_html__( 'Quantity', 'wc-vendors' ); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ( $products as $product ) : ?>
                <tr>
                    <td class="product"><?php echo esc_html( $product['name'] ); ?></td>
                    <td class="quantity"><?php echo esc_html( $product['quantity'] ); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

</body>
</html>
