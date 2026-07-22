<?php
/* Template Name: Packs */

get_header();

get_template_part( 'template-parts/reproductor', null, array(
	'tipo'          => 'Playlist',
	'titulo'        => 'Packs',
	'subtitulo'     => 'Packs completos de remixes y edits, listos para tus sets.',
	'buscar_fijo'   => 'pack',
	'mostrar_fecha' => true,
) );

get_footer();
