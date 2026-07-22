<?php
/**
 * Portada del sitio.
 *
 * WordPress usa front-page.php automáticamente para la página de inicio,
 * así el reproductor (plantilla "Home Guaracha") siempre queda en el home
 * sin depender de la configuración de Ajustes > Lectura.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require get_stylesheet_directory() . '/home-prodj.php';
