<?php
/*
 This file is part of ITRO Popup Plugin. (email : support@itroteam.com)
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
function itro_popup_template()
{ ?>
	<div id="itro_popup">
	<?php
		if( ipp_itro_get_option('age_restriction') == NULL ) /* age restriction off */
		{
			if( ipp_itro_get_option('popup_time') != 0 )
			{
				echo '<div id="popup_countdown" align="center">';
				_e(ipp_itro_get_option('countdown_text'));
				echo '<b id="timer"></b></div>';
			}
			
			$selected_cross = ippitroPath . 'images/close-icon.png'; /* default image (black cross) */
			switch( ipp_itro_get_option('cross_selected') )
			{

				case 'white':
					$selected_cross = ippitroPath . 'images/close-icon-white.png';
					break;
				case 'white_border':
					$selected_cross = ippitroPath . 'images/close-icon-white-border.png';
					break;
				case 'url':
					$selected_cross = ipp_itro_get_option('close_cross_url');
					break;
			}
			echo '<img id="close_cross" src="' . $selected_cross . '" alt="'. __('CLOSE','itro-plugin') .'" title="' . __('CLOSE','itro-plugin') . '" onclick="itro_exit_anim();">';
		}?>
		<div id="popup_content"><?php
			$custom_field = stripslashes(ipp_itro_get_field('custom_html')); /* insert custom html code  */
			$custom_field = str_replace("\r\n",'',$custom_field);
			_e( force_balance_tags(do_shortcode( $custom_field)) ); /* return the string whitout new line */
			if ( ipp_itro_get_option('age_restriction') == 'yes' )
			{?>
				<p id="age_button_area" style="text-align: center;">
					<input type="button" id="ageEnterButton" onClick="itro_set_cookie('popup_cookie','one_time_popup',<?php echo ipp_itro_get_option('cookie_time_exp'); ?>); itro_exit_anim(); javascript:window.open('<?php _e(ipp_itro_get_option('enter_button_url')) ?>','_self');" value="<?php _e(ipp_itro_get_option('enter_button_text'));?>">
					<input type="button" id="ageLeaveButton" onClick="javascript:window.open('<?php _e(ipp_itro_get_option('leave_button_url')) ?>','_self');" value="<?php _e(ipp_itro_get_option('leave_button_text'));?>">
				</p><?php
			}
			?>
		</div>
		<?php if ( ipp_itro_get_option('age_restriction') != 'yes'){ ?>
		<div id="ipp_mobile_close_tab">
			<span id="ipp_mobile_close_txt" onclick="itro_exit_anim();"><?php _e('CLOSE','itro-plugin'); ?></span>
		</div> 
		<?php }?>
	</div>
	<div id="itro_opaco" <?php if ( ipp_itro_get_option('age_restriction') != 'yes' && ipp_itro_get_option('popup_unlockable') != 'yes' ){ ?> onclick="itro_exit_anim();" <?php } ?> ></div>
<?php
}