<?php
/**
 * Página individual de un DJ: /dj/nombre-del-dj/
 *
 * Muestra la información del DJ (nombre, foto, biografía si tiene) y
 * su playlist con el reproductor estilo Spotify. El JSON-LD del
 * artista se imprime desde inc/seo.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$dj = get_queried_object();

$descripcion = $dj ? wp_strip_all_tags( term_description( $dj ) ) : '';
if ( '' === trim( $descripcion ) ) {
	$descripcion = sprintf(
		'Remixes, edits y herramientas de %s para DJs. Escucha los previews de sus %s tracks y descarga la música para tus sets.',
		$dj->name,
		number_format_i18n( $dj->count )
	);
}

get_template_part( 'template-parts/reproductor', null, array(
	'tipo'      => 'DJ',
	'titulo'    => $dj->name,
	'subtitulo' => $descripcion,
	'dj'        => $dj->slug,
) );
?>

<div style="background:#121212;padding:12px 28px 26px;border-radius:0 0 12px 12px;">
	<a href="<?php echo esc_url( pdj_url_djs() ); ?>" style="color:#b3b3b3;text-decoration:none;font-size:14px;">
		&laquo; Ver todos los DJs
	</a>
</div>

<?php get_footer(); ?>
