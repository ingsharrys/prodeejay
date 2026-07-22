<?php
/**
 * Portada del sitio: landing page optimizada para SEO.
 *
 * Contenido con palabras clave del negocio, enlaces internos a las
 * secciones importantes (reproductor, DJs, planes) y datos
 * estructurados FAQPage. El JSON-LD de Organization/WebSite se
 * imprime desde inc/seo.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$url_reproductor = pdj_url_reproductor();
$url_djs         = pdj_url_djs();
$url_planes      = function_exists( 'pmpro_url' ) ? pmpro_url( 'levels' ) : home_url( '/membership-levels/' );

// Géneros con más música (para enlaces internos con palabras clave).
$generos = get_terms( array(
	'taxonomy'   => 'product_cat',
	'hide_empty' => true,
	'number'     => 10,
	'orderby'    => 'count',
	'order'      => 'DESC',
	'exclude'    => array( (int) get_option( 'default_product_cat' ) ),
) );

// DJs destacados.
$djs = get_terms( array(
	'taxonomy'   => 'pa_dj',
	'hide_empty' => true,
	'number'     => 8,
	'orderby'    => 'count',
	'order'      => 'DESC',
) );
if ( is_wp_error( $djs ) ) {
	$djs = array();
}

// Últimos lanzamientos (contenido fresco + enlaces internos).
$ultimos = wc_get_products( array(
	'status'  => 'publish',
	'limit'   => 8,
	'orderby' => 'date',
	'order'   => 'DESC',
) );

// Límites de los planes (misma configuración del sistema de suscripciones).
$planes = function_exists( 'pdj_limites_descarga' ) ? pdj_limites_descarga() : array();

// Preguntas frecuentes (también se emiten como datos estructurados).
$faqs = array(
	array(
		'q' => '¿Qué es Prodeejay Remix?',
		'a' => 'Prodeejay Remix es una plataforma para DJs donde encuentras remixes, edits, packs, sets y video remixes de guaracha, música latina y más géneros, listos para descargar y usar en tus presentaciones.',
	),
	array(
		'q' => '¿Cómo funcionan las membresías?',
		'a' => 'Tenemos planes de suscripción con descargas mensuales incluidas. Al suscribirte puedes descargar la música de nuestro catálogo según el límite de tu plan, y el contador se reinicia cada mes.',
	),
	array(
		'q' => '¿Puedo escuchar la música antes de comprar?',
		'a' => 'Sí. Cada canción tiene un preview que puedes escuchar directamente en nuestro reproductor antes de decidir tu compra o descarga.',
	),
	array(
		'q' => '¿Con qué frecuencia se sube música nueva?',
		'a' => 'Nuestros DJs suben remixes y edits nuevos constantemente. En la sección New Releases siempre encontrarás los últimos lanzamientos.',
	),
	array(
		'q' => '¿En qué formato se descargan los archivos?',
		'a' => 'Los audios se entregan en MP3 de alta calidad y los video remixes en MP4, con el BPM indicado en cada tema para facilitar tu mezcla.',
	),
);

// Datos estructurados de las preguntas frecuentes.
$faq_schema = array(
	'@context'   => 'https://schema.org',
	'@type'      => 'FAQPage',
	'mainEntity' => array(),
);
foreach ( $faqs as $faq ) {
	$faq_schema['mainEntity'][] = array(
		'@type'          => 'Question',
		'name'           => $faq['q'],
		'acceptedAnswer' => array(
			'@type' => 'Answer',
			'text'  => $faq['a'],
		),
	);
}
pdj_jsonld( $faq_schema );
?>

<style>
.pdj-landing{background:#121212;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
.pdj-landing section{padding:56px 24px;max-width:1160px;margin:0 auto}
.pdj-landing h2{font-size:clamp(22px,3.5vw,34px);font-weight:800;margin:0 0 8px;color:#fff}
.pdj-landing .pdj-sec-sub{color:#b3b3b3;margin:0 0 28px;font-size:15px}
/* Hero */
.pdj-l-hero{background:radial-gradient(ellipse at top,#1f3d2b 0%,#121212 60%);text-align:center;padding:90px 24px 70px!important}
.pdj-l-hero .pdj-etiqueta{display:inline-block;background:rgba(29,185,84,.15);color:#1db954;border:1px solid #1db954;border-radius:50px;padding:6px 16px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px}
.pdj-l-hero h1{font-size:clamp(30px,6vw,60px);font-weight:900;line-height:1.08;margin:0 0 16px;color:#fff}
.pdj-l-hero h1 span{color:#1db954}
.pdj-l-hero p{color:#b3b3b3;font-size:clamp(15px,2vw,19px);max-width:680px;margin:0 auto 30px}
.pdj-cta{display:inline-flex;align-items:center;gap:10px;background:#1db954;color:#000;font-weight:800;font-size:16px;border-radius:50px;padding:15px 34px;text-decoration:none;transition:transform .15s}
.pdj-cta:hover{background:#1ed760;color:#000;transform:scale(1.04)}
.pdj-cta-sec{display:inline-flex;align-items:center;gap:10px;background:transparent;color:#fff;font-weight:700;font-size:16px;border:1px solid #727272;border-radius:50px;padding:14px 30px;text-decoration:none;margin-left:12px}
.pdj-cta-sec:hover{border-color:#fff;color:#fff}
/* Beneficios */
.pdj-beneficios{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
.pdj-beneficio{background:#181818;border-radius:12px;padding:26px}
.pdj-beneficio i{color:#1db954;font-size:26px;margin-bottom:12px}
.pdj-beneficio h3{font-size:17px;font-weight:700;margin:0 0 8px;color:#fff}
.pdj-beneficio p{color:#b3b3b3;font-size:14px;margin:0;line-height:1.5}
/* Géneros */
.pdj-generos{display:flex;flex-wrap:wrap;gap:10px}
.pdj-genero{background:#242424;color:#fff;border-radius:50px;padding:10px 22px;font-size:14px;font-weight:600;text-decoration:none}
.pdj-genero:hover{background:#1db954;color:#000}
/* DJs */
.pdj-djs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:18px}
.pdj-dj-card{background:#181818;border-radius:12px;padding:20px;text-align:center;text-decoration:none;transition:background .15s}
.pdj-dj-card:hover{background:#242424}
.pdj-dj-avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;margin:0 auto 12px;display:block;box-shadow:0 6px 18px rgba(0,0,0,.5)}
.pdj-dj-inicial{width:110px;height:110px;border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:900;color:#000;background:linear-gradient(135deg,#1db954,#0e7a36)}
.pdj-dj-card h3{color:#fff;font-size:15px;font-weight:700;margin:0}
.pdj-dj-card p{color:#b3b3b3;font-size:12px;margin:4px 0 0}
/* Últimos lanzamientos */
.pdj-ultimos{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.pdj-ultimo{background:#181818;border-radius:10px;padding:14px 18px;text-decoration:none;display:flex;align-items:center;gap:12px}
.pdj-ultimo:hover{background:#242424}
.pdj-ultimo i{color:#1db954}
.pdj-ultimo span{color:#fff;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* Planes */
.pdj-planes{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:760px}
.pdj-plan{background:#181818;border:1px solid #282828;border-radius:14px;padding:30px;text-align:center}
.pdj-plan.destacado{border-color:#1db954}
.pdj-plan h3{color:#fff;font-size:20px;font-weight:800;margin:0 0 6px}
.pdj-plan .pdj-plan-desc{color:#b3b3b3;font-size:14px;margin:0 0 18px}
.pdj-plan .pdj-plan-num{color:#1db954;font-size:40px;font-weight:900}
.pdj-plan .pdj-plan-det{color:#b3b3b3;font-size:13px;margin:2px 0 20px}
/* FAQ */
.pdj-faq details{background:#181818;border-radius:10px;margin-bottom:10px;padding:18px 22px}
.pdj-faq summary{color:#fff;font-weight:700;font-size:15px;cursor:pointer;outline:none}
.pdj-faq p{color:#b3b3b3;font-size:14px;line-height:1.6;margin:12px 0 0}
/* CTA final */
.pdj-final{text-align:center;background:linear-gradient(180deg,#121212 0%,#1f3d2b 100%);border-radius:0}
@media(max-width:600px){.pdj-cta-sec{margin-left:0;margin-top:12px}}
</style>

<main class="pdj-landing">

	<!-- HERO -->
	<section class="pdj-l-hero">
		<span class="pdj-etiqueta"><i class="fas fa-headphones"></i> Música para DJs</span>
		<h1>Remixes, Packs y Sets para DJs<br><span>listos para tu próxima fiesta</span></h1>
		<p>Descarga remixes exclusivos de guaracha, música latina y más. Escucha los previews en nuestro reproductor, elige tu plan y lleva tus sets al siguiente nivel.</p>
		<div>
			<a class="pdj-cta" href="<?php echo esc_url( $url_reproductor ); ?>"><i class="fas fa-play"></i> Escuchar la música</a>
			<a class="pdj-cta-sec" href="<?php echo esc_url( $url_planes ); ?>">Ver planes</a>
		</div>
	</section>

	<!-- BENEFICIOS -->
	<section>
		<h2>Todo lo que un DJ necesita</h2>
		<p class="pdj-sec-sub">Herramientas profesionales creadas por DJs, para DJs.</p>
		<div class="pdj-beneficios">
			<div class="pdj-beneficio">
				<i class="fas fa-music"></i>
				<h3>Remixes y edits exclusivos</h3>
				<p>Intros, outros, transiciones y edits con el BPM indicado en cada tema, listos para mezclar.</p>
			</div>
			<div class="pdj-beneficio">
				<i class="fas fa-video"></i>
				<h3>Video remixes</h3>
				<p>Video edits en MP4 para tus presentaciones visuales, con previews antes de descargar.</p>
			</div>
			<div class="pdj-beneficio">
				<i class="fas fa-box-open"></i>
				<h3>Packs completos</h3>
				<p>Colecciones de edits por artista o género para armar tu librería de una sola vez.</p>
			</div>
			<div class="pdj-beneficio">
				<i class="fas fa-sync-alt"></i>
				<h3>Descargas mensuales</h3>
				<p>Planes de membresía con descargas incluidas cada mes. Tú eliges cuánta música necesitas.</p>
			</div>
		</div>
	</section>

	<!-- GÉNEROS -->
	<?php if ( ! empty( $generos ) && ! is_wp_error( $generos ) ) : ?>
	<section>
		<h2>Explora por género</h2>
		<p class="pdj-sec-sub">Guaracha, latino, house y más géneros para todos tus sets.</p>
		<div class="pdj-generos">
			<?php foreach ( $generos as $genero ) : ?>
				<a class="pdj-genero" href="<?php echo esc_url( add_query_arg( 'category', $genero->slug, $url_reproductor ) ); ?>">
					<?php echo esc_html( $genero->name ); ?>
				</a>
			<?php endforeach; ?>
		</div>
	</section>
	<?php endif; ?>

	<!-- DJS DESTACADOS -->
	<?php if ( ! empty( $djs ) ) : ?>
	<section>
		<h2>Nuestros DJs</h2>
		<p class="pdj-sec-sub">Conoce a los DJs que producen la música y explora sus playlists.</p>
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
				<h3><?php echo esc_html( $dj->name ); ?></h3>
				<p><?php echo esc_html( number_format_i18n( $dj->count ) ); ?> tracks</p>
			</a>
			<?php endforeach; ?>
		</div>
		<p style="margin-top:22px;"><a class="pdj-cta-sec" style="margin-left:0;" href="<?php echo esc_url( $url_djs ); ?>">Ver todos los DJs</a></p>
	</section>
	<?php endif; ?>

	<!-- ÚLTIMOS LANZAMIENTOS -->
	<?php if ( ! empty( $ultimos ) ) : ?>
	<section>
		<h2>Últimos lanzamientos</h2>
		<p class="pdj-sec-sub">Música nueva cada semana. Estos son los remixes más recientes.</p>
		<div class="pdj-ultimos">
			<?php foreach ( $ultimos as $producto ) : ?>
				<a class="pdj-ultimo" href="<?php echo esc_url( get_permalink( $producto->get_id() ) ); ?>">
					<i class="fas fa-compact-disc"></i>
					<span><?php echo esc_html( $producto->get_name() ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
		<p style="margin-top:22px;"><a class="pdj-cta" href="<?php echo esc_url( $url_reproductor ); ?>"><i class="fas fa-play"></i> Ver todo en el reproductor</a></p>
	</section>
	<?php endif; ?>

	<!-- PLANES -->
	<?php if ( ! empty( $planes ) ) : ?>
	<section>
		<h2>Planes de membresía</h2>
		<p class="pdj-sec-sub">Suscríbete y descarga música todos los meses. Cancela cuando quieras.</p>
		<div class="pdj-planes">
			<?php $i = 0; foreach ( $planes as $nombre => $limite ) : $i++; ?>
			<div class="pdj-plan<?php echo $i > 1 ? ' destacado' : ''; ?>">
				<h3><?php echo esc_html( $nombre ); ?></h3>
				<p class="pdj-plan-desc">Para DJs que quieren música fresca cada mes</p>
				<div class="pdj-plan-num"><?php echo esc_html( number_format_i18n( $limite ) ); ?></div>
				<p class="pdj-plan-det">descargas al mes</p>
				<a class="pdj-cta" href="<?php echo esc_url( $url_planes ); ?>">Suscribirme</a>
			</div>
			<?php endforeach; ?>
		</div>
	</section>
	<?php endif; ?>

	<!-- PREGUNTAS FRECUENTES -->
	<section class="pdj-faq">
		<h2>Preguntas frecuentes</h2>
		<p class="pdj-sec-sub">Resolvemos las dudas más comunes de nuestros DJs.</p>
		<?php foreach ( $faqs as $faq ) : ?>
		<details>
			<summary><?php echo esc_html( $faq['q'] ); ?></summary>
			<p><?php echo esc_html( $faq['a'] ); ?></p>
		</details>
		<?php endforeach; ?>
	</section>

	<!-- CTA FINAL -->
	<section class="pdj-final">
		<h2>¿Listo para tu próximo set?</h2>
		<p class="pdj-sec-sub">Entra al reproductor, escucha los previews y descarga tu música.</p>
		<a class="pdj-cta" href="<?php echo esc_url( $url_reproductor ); ?>"><i class="fas fa-play"></i> Ir al reproductor</a>
	</section>

</main>

<?php get_footer(); ?>
