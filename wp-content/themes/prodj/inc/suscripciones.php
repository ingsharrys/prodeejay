<?php
/**
 * Sistema de suscripciones: límites de descarga por membresía.
 *
 * Integra Paid Memberships Pro (planes) con Download Monitor (entrega de
 * archivos). Mejoras sobre la versión anterior:
 *
 *  - El contador de descargas se reinicia automáticamente cada mes
 *    (antes era acumulado de por vida: al llegar al límite el usuario
 *    quedaba bloqueado para siempre aunque siguiera pagando).
 *  - Los límites se definen en un solo lugar y se pueden ajustar con el
 *    filtro 'pdj_limites_descarga' sin tocar el resto del código.
 *  - Se valida en el punto donde Download Monitor entrega el archivo
 *    (filtro dlm_can_download), no solo en la página del producto.
 *  - Shortcode [pdj_descargas_restantes] para mostrar al socio cuántas
 *    descargas le quedan este mes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Límite de descargas mensuales por nombre de plan de PMPro.
 * Un plan que no aparezca aquí no tiene límite.
 */
function pdj_limites_descarga() {
	$limites = array(
		'Basico'  => 100,
		'Premium' => 200,
	);
	return apply_filters( 'pdj_limites_descarga', $limites );
}

/**
 * Devuelve el límite mensual del usuario (0 = sin límite configurado).
 */
function pdj_limite_para_usuario( $user_id ) {
	if ( ! function_exists( 'pmpro_getMembershipLevelForUser' ) ) {
		return 0;
	}
	$nivel = pmpro_getMembershipLevelForUser( $user_id );
	if ( empty( $nivel ) || empty( $nivel->name ) ) {
		return 0;
	}
	$limites = pdj_limites_descarga();
	return isset( $limites[ $nivel->name ] ) ? (int) $limites[ $nivel->name ] : 0;
}

/**
 * Clave de user_meta del mes en curso (ej. pdj_descargas_202607).
 * Al cambiar el mes cambia la clave, así el contador arranca en cero.
 */
function pdj_meta_key_descargas() {
	return 'pdj_descargas_' . current_time( 'Ym' );
}

function pdj_descargas_usadas( $user_id ) {
	return max( 0, (int) get_user_meta( $user_id, pdj_meta_key_descargas(), true ) );
}

function pdj_registrar_descarga( $user_id ) {
	update_user_meta( $user_id, pdj_meta_key_descargas(), pdj_descargas_usadas( $user_id ) + 1 );
}

/**
 * ¿El usuario todavía tiene descargas disponibles este mes?
 */
function pdj_puede_descargar( $user_id ) {
	$limite = pdj_limite_para_usuario( $user_id );
	if ( $limite <= 0 ) {
		return true; // Sin límite configurado para su plan.
	}
	return pdj_descargas_usadas( $user_id ) < $limite;
}

/* ---------------------------------------------------------------------
 * Integración con Download Monitor (el punto real de entrega del archivo)
 * ------------------------------------------------------------------- */

add_filter( 'dlm_can_download', 'pdj_dlm_verificar_limite', 20, 2 );
function pdj_dlm_verificar_limite( $puede, $download ) {
	if ( ! $puede || ! is_user_logged_in() ) {
		return $puede;
	}
	if ( ! pdj_puede_descargar( get_current_user_id() ) ) {
		return false;
	}
	return $puede;
}

add_action( 'dlm_downloading', 'pdj_dlm_contar_descarga', 10, 1 );
function pdj_dlm_contar_descarga( $download ) {
	if ( ! is_user_logged_in() ) {
		return;
	}
	$user_id = get_current_user_id();
	if ( pdj_limite_para_usuario( $user_id ) > 0 ) {
		pdj_registrar_descarga( $user_id );
	}
}

/* ---------------------------------------------------------------------
 * Compatibilidad con el flujo antiguo (?download_file= en la página
 * de producto). Se mantiene el control, ahora con contador mensual.
 * ------------------------------------------------------------------- */

add_action( 'template_redirect', 'pdj_limitar_descargas_legacy' );
function pdj_limitar_descargas_legacy() {
	if ( ! is_user_logged_in() || ! isset( $_GET['download_file'] ) ) {
		return;
	}
	if ( function_exists( 'is_product' ) && ! is_product() ) {
		return;
	}

	$user_id = get_current_user_id();
	$limite  = pdj_limite_para_usuario( $user_id );
	if ( $limite <= 0 ) {
		return;
	}

	if ( ! pdj_puede_descargar( $user_id ) ) {
		wp_die(
			sprintf(
				'Has alcanzado el límite de %d descargas de tu plan este mes. El contador se reinicia el próximo mes, o puedes mejorar tu plan.',
				$limite
			),
			'Límite de descargas',
			array( 'response' => 403, 'back_link' => true )
		);
	}

	pdj_registrar_descarga( $user_id );
}

/* ---------------------------------------------------------------------
 * Shortcode [pdj_descargas_restantes] para el área de socios.
 * ------------------------------------------------------------------- */

add_shortcode( 'pdj_descargas_restantes', 'pdj_shortcode_descargas_restantes' );
function pdj_shortcode_descargas_restantes() {
	if ( ! is_user_logged_in() ) {
		return '';
	}
	$user_id = get_current_user_id();
	$limite  = pdj_limite_para_usuario( $user_id );
	if ( $limite <= 0 ) {
		return '';
	}
	$restantes = max( 0, $limite - pdj_descargas_usadas( $user_id ) );
	return sprintf(
		'<span class="pdj-descargas-restantes">Te quedan <strong>%d</strong> de %d descargas este mes.</span>',
		$restantes,
		$limite
	);
}
