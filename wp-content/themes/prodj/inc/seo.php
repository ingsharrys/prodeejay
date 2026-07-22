<?php
/**
 * SEO: datos estructurados (schema.org) que ayudan a Google a entender
 * el sitio y a mostrar resultados enriquecidos.
 *
 * Los títulos y meta descripciones los gestiona el plugin de SEO
 * (Rank Math); aquí solo se agrega lo que el plugin no cubre.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Imprime un bloque JSON-LD.
 */
function pdj_jsonld( $data ) {
	echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}

add_action( 'wp_head', 'pdj_seo_datos_estructurados', 5 );
function pdj_seo_datos_estructurados() {

	// Portada: identidad del negocio + buscador interno del sitio.
	if ( is_front_page() ) {
		pdj_jsonld( array(
			'@context' => 'https://schema.org',
			'@type'    => 'Organization',
			'name'     => get_bloginfo( 'name' ),
			'url'      => home_url( '/' ),
			'logo'     => 'https://prodeejayremix.com/wp-content/uploads/2025/02/prodj.jpg',
		) );

		pdj_jsonld( array(
			'@context'        => 'https://schema.org',
			'@type'           => 'WebSite',
			'name'            => get_bloginfo( 'name' ),
			'url'             => home_url( '/' ),
			'potentialAction' => array(
				'@type'       => 'SearchAction',
				'target'      => pdj_url_reproductor() . '?buscando={search_term_string}',
				'query-input' => 'required name=search_term_string',
			),
		) );
	}

	// Página de un DJ: perfil de artista.
	if ( is_tax( 'pa_dj' ) ) {
		$term = get_queried_object();
		if ( $term && ! is_wp_error( $term ) ) {
			$descripcion = wp_strip_all_tags( term_description( $term ) );
			if ( '' === trim( $descripcion ) ) {
				$descripcion = sprintf( 'Remixes, edits y herramientas de %s para DJs. Escucha los previews y descarga la música.', $term->name );
			}
			pdj_jsonld( array(
				'@context'    => 'https://schema.org',
				'@type'       => 'MusicGroup',
				'name'        => $term->name,
				'url'         => get_term_link( $term ),
				'description' => $descripcion,
			) );
		}
	}
}
