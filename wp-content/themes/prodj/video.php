<?php
/* Template Name: Video Guaracha */

get_header();

get_template_part( 'template-parts/reproductor', null, array(
	'tipo'          => 'Playlist',
	'titulo'        => 'Video Edits',
	'subtitulo'     => 'Video remixes y edits para tus presentaciones visuales.',
	'buscar_fijo'   => 'video',
	'mostrar_fecha' => true,
) );

get_footer();
