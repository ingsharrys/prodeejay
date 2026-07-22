<?php
/* Template Name: Home Guaracha */

get_header();

get_template_part( 'template-parts/reproductor', null, array(
	'tipo'      => 'Playlist',
	'titulo'    => 'New Releases',
	'subtitulo' => 'Los últimos remixes, edits y herramientas para DJs. Escucha los previews y descarga la música.',
) );

get_footer();
