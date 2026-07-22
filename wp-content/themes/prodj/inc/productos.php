<?php
/**
 * Helpers para leer los datos de los productos (DJ, artista, BPM, preview)
 * y para localizar las páginas clave del sitio.
 *
 * Centraliza la lógica que antes estaba repetida en las 4 plantillas
 * del reproductor.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Categoría a mostrar: la principal, o la secundaria cuando la principal
 * es una categoría "contenedor" (1latinos / 1videos).
 */
function pdj_categoria_mostrar( $product ) {
	$categories = $product->get_category_ids();
	if ( empty( $categories ) ) {
		return '';
	}
	$term_primary = get_term_by( 'id', $categories[0], 'product_cat' );
	$primary      = $term_primary ? $term_primary->name : '';
	$mostrar      = $primary;

	if ( in_array( $primary, array( '1latinos', '1videos' ), true ) && count( $categories ) > 1 ) {
		$term_secondary = get_term_by( 'id', $categories[1], 'product_cat' );
		if ( $term_secondary && $term_secondary->name ) {
			$mostrar = $term_secondary->name;
		}
	}
	return $mostrar;
}

/**
 * Nombre de la categoría principal del producto (sin sustituciones).
 */
function pdj_categoria_principal( $product ) {
	$categories = $product->get_category_ids();
	if ( empty( $categories ) ) {
		return '';
	}
	$term = get_term_by( 'id', $categories[0], 'product_cat' );
	return $term ? $term->name : '';
}

/**
 * Primer valor de un atributo de taxonomía (pa_dj, pa_artista, pa_bpm...).
 */
function pdj_atributo_taxonomia( $product, $tax ) {
	$attributes = $product->get_attributes();
	if ( isset( $attributes[ $tax ] ) ) {
		$options = $attributes[ $tax ]->get_options();
		if ( ! empty( $options ) ) {
			$term = get_term( $options[0] );
			if ( $term && ! is_wp_error( $term ) ) {
				return $term->name;
			}
		}
	}
	return '';
}

/**
 * Primer valor de un atributo personalizado (no taxonomía) por posición.
 */
function pdj_atributo_personalizado( $product, $indice ) {
	$attributes = array_values( $product->get_attributes() );
	if ( isset( $attributes[ $indice ] ) && $attributes[ $indice ]->is_taxonomy() === false ) {
		$options = $attributes[ $indice ]->get_options();
		if ( ! empty( $options ) ) {
			return array_shift( $options );
		}
	}
	return '';
}

function pdj_valor_dj( $product ) {
	$dj = pdj_atributo_taxonomia( $product, 'pa_dj' );
	return '' !== $dj ? $dj : pdj_categoria_mostrar( $product );
}

function pdj_valor_artista( $product ) {
	$artista = pdj_atributo_taxonomia( $product, 'pa_artista' );
	if ( '' !== $artista ) {
		return $artista;
	}
	$fallback = pdj_atributo_personalizado( $product, 1 );
	return '' !== $fallback ? $fallback : 'N/A';
}

function pdj_valor_bpm( $product ) {
	$bpm = pdj_atributo_taxonomia( $product, 'pa_bpm' );
	if ( '' !== $bpm ) {
		return $bpm;
	}
	$fallback = pdj_atributo_personalizado( $product, 0 );
	return '' !== $fallback ? $fallback : 'N/A';
}

/**
 * URL del preview de audio/video (cuarto atributo personalizado).
 */
function pdj_url_preview( $product ) {
	return pdj_atributo_personalizado( $product, 3 );
}

/* ---------------------------------------------------------------------
 * Páginas clave del sitio
 * ------------------------------------------------------------------- */

/**
 * URL de la página del reproductor (plantilla "Home Guaracha").
 */
function pdj_url_reproductor() {
	$paginas = get_pages( array(
		'meta_key'   => '_wp_page_template',
		'meta_value' => 'home-prodj.php',
		'number'     => 1,
	) );
	return ! empty( $paginas ) ? get_permalink( $paginas[0]->ID ) : home_url( '/musica/' );
}

/**
 * URL de la página con el listado de DJs.
 */
function pdj_url_djs() {
	$paginas = get_pages( array(
		'meta_key'   => '_wp_page_template',
		'meta_value' => 'djs.php',
		'number'     => 1,
	) );
	return ! empty( $paginas ) ? get_permalink( $paginas[0]->ID ) : home_url( '/djs/' );
}

/**
 * Imagen para la tarjeta de un DJ: la foto del producto más reciente
 * de ese DJ. Se guarda en caché 12 horas para no repetir consultas.
 */
function pdj_imagen_dj( $term ) {
	$cache_key = 'pdj_img_dj_' . $term->term_id;
	$url       = get_transient( $cache_key );
	if ( false !== $url ) {
		return $url;
	}

	$url = '';
	$q   = new WP_Query( array(
		'post_type'      => 'product',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'no_found_rows'  => true,
		'tax_query'      => array(
			array(
				'taxonomy' => 'pa_dj',
				'field'    => 'term_id',
				'terms'    => $term->term_id,
			),
		),
		'meta_query'     => array(
			array(
				'key'     => '_thumbnail_id',
				'compare' => 'EXISTS',
			),
		),
	) );
	if ( ! empty( $q->posts ) ) {
		$imagen = get_the_post_thumbnail_url( $q->posts[0], 'medium' );
		$url    = $imagen ? $imagen : '';
	}

	set_transient( $cache_key, $url, 12 * HOUR_IN_SECONDS );
	return $url;
}
