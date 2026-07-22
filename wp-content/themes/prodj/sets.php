<?php
/* Template Name: Sets Mixes */

get_header();

get_template_part( 'template-parts/reproductor', null, array(
	'tipo'           => 'Playlist',
	'titulo'         => 'Sets & Mixes',
	'subtitulo'      => 'Sets y mixes completos para escuchar y descargar.',
	'categoria_fija' => '1videos',
	'mostrar_fecha'  => true,
) );

get_footer();
