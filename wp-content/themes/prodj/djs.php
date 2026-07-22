<?php
/* Template Name: DJs */

/**
 * Listado de todos los DJs con tarjetas estilo Spotify.
 * Cada tarjeta lleva a /dj/nombre-del-dj/ con su playlist.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$djs = get_terms( array(
	'taxonomy'   => 'pa_dj',
	'hide_empty' => true,
	'orderby'    => 'count',
	'order'      => 'DESC',
) );
if ( is_wp_error( $djs ) ) {
	$djs = array();
}
?>

<style>
.pdj-pagina-djs{background:#121212;color:#fff;min-height:70vh;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;border-radius:12px;overflow:hidden}
.pdj-pagina-djs .pdj-hero-djs{background:linear-gradient(180deg,#1f3d2b 0%,#121212 100%);padding:56px 32px 26px}
.pdj-pagina-djs .pdj-tipo{text-transform:uppercase;font-size:11px;letter-spacing:2px;color:#b3b3b3;margin:0}
.pdj-pagina-djs h1{font-size:clamp(30px,5vw,54px);font-weight:900;margin:4px 0 8px;color:#fff}
.pdj-pagina-djs .pdj-sub{color:#b3b3b3;font-size:15px;margin:0;max-width:700px}
.pdj-djs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:20px;padding:30px 32px 50px}
.pdj-dj-card{background:#181818;border-radius:12px;padding:22px;text-align:center;text-decoration:none;transition:background .15s}
.pdj-dj-card:hover{background:#242424}
.pdj-dj-avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;margin:0 auto 14px;display:block;box-shadow:0 6px 18px rgba(0,0,0,.5)}
.pdj-dj-inicial{width:120px;height:120px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;color:#000;background:linear-gradient(135deg,#1db954,#0e7a36)}
.pdj-dj-card h2{color:#fff;font-size:16px;font-weight:700;margin:0}
.pdj-dj-card p{color:#b3b3b3;font-size:12px;margin:6px 0 0}
@media(max-width:600px){.pdj-djs-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr));padding:20px 16px 40px}}
</style>

<main class="pdj-pagina-djs">
	<header class="pdj-hero-djs">
		<p class="pdj-tipo">Artistas</p>
		<h1>Nuestros DJs</h1>
		<p class="pdj-sub">Los DJs y productores detrás de los remixes, edits y packs de Prodeejay Remix. Haz clic en un DJ para ver su información y escuchar su playlist completa.</p>
	</header>

	<div class="pdj-djs-grid">
		<?php foreach ( $djs as $dj ) :
			$enlace = get_term_link( $dj );
			if ( is_wp_error( $enlace ) ) { continue; }
			$imagen = pdj_imagen_dj( $dj );
		?>
		<a class="pdj-dj-card" href="<?php echo esc_url( $enlace ); ?>">
			<?php if ( $imagen ) : ?>
				<img class="pdj-dj-avatar" src="<?php echo esc_url( $imagen ); ?>" alt="DJ <?php echo esc_attr( $dj->name ); ?>" loading="lazy">
			<?php else : ?>
				<div class="pdj-dj-inicial"><?php echo esc_html( strtoupper( mb_substr( $dj->name, 0, 1 ) ) ); ?></div>
			<?php endif; ?>
			<h2><?php echo esc_html( $dj->name ); ?></h2>
			<p><?php echo esc_html( number_format_i18n( $dj->count ) ); ?> tracks</p>
		</a>
		<?php endforeach; ?>

		<?php if ( empty( $djs ) ) : ?>
			<p style="color:#b3b3b3;">Aún no hay DJs con música publicada.</p>
		<?php endif; ?>
	</div>
</main>

<?php get_footer(); ?>
