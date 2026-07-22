<?php

/**
 * To display if there is no table data
 *
 * This is used to display there is no table data
 *
 * @link       http://www.wcvendors.com
 * @since      1.0.0
 *
 * @package    WCVendors_Pro
 * @subpackage WCVendors_Pro/public/partials/helpers/table
 */

?>

<h3><?php echo wp_kses( $no_data_notice, wcv_allowed_html_tags() ); ?></h3>
