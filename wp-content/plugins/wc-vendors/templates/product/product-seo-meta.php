<?php
/**
 * Product SEO Meta Template
 * This template outputs the SEO meta on the product header
 *
 * @since   2.5.2
 * @version 2.5.2
 * @author  WC Vendors <WC Vendors>
 */
use function WC_Vendors\Classes\Includes\wcv_strip_html;
?>
<?php if ( ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_title', 'no' ) ) ) : ?>
<meta name="title" content="<?php echo esc_attr( $seo_title ); ?>"/>
<?php endif; ?>
<?php if ( ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_description', 'no' ) ) ) : ?>
<meta name="description" content="<?php echo esc_attr( $seo_description ); ?>"/>
<?php endif; ?>
<?php if ( ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_keywords', 'no' ) ) ) : ?>
<meta name="keywords" content="<?php echo esc_attr( strtolower( $seo_keywords ) ); ?>"/>
<?php endif; ?>

<!-- Schema.org markup -->
<?php if ( $seo_title && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_title', 'no' ) ) ) : ?>
    <meta itemprop="name" content="<?php echo esc_attr( $seo_title ); ?>">
<?php endif; ?>
<?php if ( $seo_description && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo', 'no' ) ) ) : ?>
    <meta itemprop="description" content="<?php echo esc_attr( wcv_strip_html( $seo_description ) ); ?>">
<?php endif; ?>
<?php if ( filter_var( $seo_image_url, FILTER_VALIDATE_URL ) ) : ?>
    <meta itemprop="image" content="<?php echo esc_url_raw( $seo_image_url ); ?>">
<?php endif; ?>
<!-- End Schema.org markup -->


<?php if ( wc_string_to_bool( $seo_twitter_card ) && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_twitter', 'no' ) ) ) : ?>
    <!-- Twitter Card data -->
    <meta name="twitter:card" content="product">
    <?php if ( $seo_twitter_author ) : ?>
        <meta name="twitter:site" content="@<?php echo esc_attr( $seo_twitter_author ); ?>">
    <?php endif; ?>
    <?php if ( $seo_title && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_title', 'no' ) ) ) : ?>
        <meta name="twitter:title" content="<?php echo esc_attr( $seo_title ); ?>">
    <?php endif; ?>
    <?php if ( $seo_description && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_description', 'no' ) ) ) : ?>
        <meta name="twitter:description" content="<?php echo esc_attr( wcv_strip_html( $seo_description ) ); ?>">
    <?php endif; ?>
    <?php if ( $seo_twitter_author ) : ?>
        <meta name="twitter:creator" content="@<?php echo esc_attr( $seo_twitter_author ); ?>">
    <?php endif; ?>
    <?php if ( filter_var( $seo_image_url, FILTER_VALIDATE_URL ) ) : ?>
        <meta name="twitter:image" content="<?php echo esc_url_raw( $seo_image_url ); ?>">
    <?php endif; ?>
    <?php if ( $seo_product_amount ) : ?>
        <meta name="twitter:data1" content="<?php echo esc_attr( $seo_currency_symbol . '' . $seo_product_amount ); ?>">
        <meta name="twitter:label1" content="Price">

        <?php
    endif;
endif;
?>
<!-- End Twitter Card Data -->

<?php if ( wc_string_to_bool( $seo_opengraph ) && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_opengraph', 'no' ) ) ) : ?>
    <!-- Open Graph Data -->
    <?php if ( $seo_title && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_title', 'no' ) ) ) : ?>
        <meta property="og:title" content="<?php echo esc_attr( $seo_title ); ?>"/>
    <?php endif; ?>
    <meta property="og:type" content="product"/>
    <?php if ( $seo_store_url ) : ?>
        <meta property="og:url" content="<?php echo esc_url_raw( $seo_store_url ); ?>"/>
    <?php endif; ?>
    <?php if ( filter_var( $seo_image_url, FILTER_VALIDATE_URL ) ) : ?>
        <meta property="og:image" content="<?php echo esc_url_raw( $seo_image_url ); ?>"/>
    <?php endif; ?>
    <?php if ( $seo_description && ! wc_string_to_bool( get_option( 'wcvendors_hide_product_seo_description', 'no' ) ) ) : ?>
        <meta property="og:description" content="<?php echo esc_attr( wcv_strip_html( $seo_description ) ); ?>"/>
    <?php endif; ?>
    <?php if ( $seo_store_name ) : ?>
        <meta property="og:site_name" content="<?php echo esc_attr( $seo_store_name ); ?>"/>
    <?php endif; ?>
    <?php if ( $seo_product_amount ) : ?>
        <meta property="og:price:amount" content="<?php echo esc_attr( $seo_product_amount ); ?>"/>
    <?php endif; ?>
    <?php if ( $seo_currency_code ) : ?>
        <meta property="og:price:currency" content="<?php echo esc_attr( $seo_currency_code ); ?>"/>
    <?php endif; ?>
    <!-- / Open Graph Data -->
<?php endif; ?>
