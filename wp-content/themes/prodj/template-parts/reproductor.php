<?php
/**
 * Reproductor de música estilo Spotify (componente compartido).
 *
 * Lo usan: la página de música, packs, sets, videos y las páginas de DJ.
 *
 * Args:
 *  - titulo            Título del encabezado.
 *  - subtitulo         Texto bajo el título.
 *  - tipo              Etiqueta pequeña sobre el título (PLAYLIST, DJ...).
 *  - buscar_fijo       Término de búsqueda forzado (packs, video).
 *  - categoria_fija    Slug de categoría forzado (sets).
 *  - dj                Slug de pa_dj para filtrar por DJ.
 *  - mostrar_fecha     Muestra la columna de fecha.
 *  - mostrar_filtros   Muestra buscador y filtro de categoría.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$atts = wp_parse_args( isset( $args ) ? $args : array(), array(
	'titulo'          => 'New Releases',
	'subtitulo'       => '',
	'tipo'            => 'Playlist',
	'buscar_fijo'     => '',
	'categoria_fija'  => '',
	'dj'              => '',
	'mostrar_fecha'   => false,
	'mostrar_filtros' => true,
) );

$per_page     = 50;
$current_page = max( 1, (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
if ( isset( $_GET['mypage'] ) ) {
	$current_page = max( $current_page, (int) $_GET['mypage'] );
}

$search_term = '' !== $atts['buscar_fijo']
	? $atts['buscar_fijo']
	: ( isset( $_GET['buscando'] ) ? sanitize_text_field( wp_unslash( $_GET['buscando'] ) ) : '' );

$selected_category = '' !== $atts['categoria_fija']
	? $atts['categoria_fija']
	: ( isset( $_GET['category'] ) ? sanitize_text_field( wp_unslash( $_GET['category'] ) ) : '' );

// URL base para el buscador (página actual o archivo del DJ).
if ( is_tax( 'pa_dj' ) ) {
	$base_url = get_term_link( get_queried_object() );
	if ( is_wp_error( $base_url ) ) {
		$base_url = home_url( '/' );
	}
} else {
	$base_url = get_permalink();
}

// ------------------------------------------------------------------
// Consulta de productos
// ------------------------------------------------------------------
if ( '' !== $atts['dj'] ) {
	$q = new WP_Query( array(
		'post_type'      => 'product',
		'post_status'    => 'publish',
		'posts_per_page' => $per_page,
		'paged'          => $current_page,
		's'              => $search_term,
		'tax_query'      => array(
			array(
				'taxonomy' => 'pa_dj',
				'field'    => 'slug',
				'terms'    => $atts['dj'],
			),
		),
	) );
	$products       = array_filter( array_map( 'wc_get_product', $q->posts ) );
	$total_products = (int) $q->found_posts;
} else {
	$consulta = array(
		'status'   => 'publish',
		'limit'    => $per_page,
		'paged'    => $current_page,
		's'        => $search_term,
		'paginate' => true,
	);
	if ( $selected_category ) {
		$consulta['category'] = array( $selected_category );
	}
	$resultado      = wc_get_products( $consulta );
	$products       = $resultado->products;
	$total_products = (int) $resultado->total;
}
$total_pages = (int) ceil( $total_products / $per_page );
?>

<style>
/* ===== Reproductor estilo Spotify ===== */
.pdj-app{background:#121212;color:#fff;border-radius:12px;overflow:hidden;padding-bottom:110px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
.pdj-hero{background:linear-gradient(180deg,#3a3a3a 0%,#121212 100%);padding:44px 28px 20px}
.pdj-hero .pdj-tipo{text-transform:uppercase;font-size:11px;letter-spacing:2px;color:#b3b3b3;margin:0}
.pdj-hero .pdj-titulo{font-size:clamp(28px,5vw,52px);font-weight:900;margin:4px 0 6px;color:#fff;line-height:1.05}
.pdj-hero .pdj-sub{color:#b3b3b3;font-size:14px;margin:0;max-width:720px}
.pdj-controles{display:flex;flex-wrap:wrap;gap:10px;padding:18px 28px 6px;align-items:center}
.pdj-input,.pdj-select{background:#242424;border:1px solid #333;color:#fff;border-radius:50px;padding:10px 18px;font-size:14px;outline:none}
.pdj-input{flex:1 1 220px}
.pdj-input::placeholder{color:#8a8a8a}
.pdj-input:focus,.pdj-select:focus{border-color:#1db954}
.pdj-select{flex:0 1 180px;appearance:none}
.pdj-btn-buscar{background:#1db954;color:#000;font-weight:700;border:none;border-radius:50px;padding:10px 24px;cursor:pointer;font-size:14px}
.pdj-btn-buscar:hover{background:#1ed760;transform:scale(1.03)}
.pdj-tabla{padding:8px 28px}
.pdj-cabecera,.pdj-fila{display:grid;grid-template-columns:44px minmax(0,4fr) minmax(0,2.5fr) minmax(0,2fr) 64px 160px;gap:12px;align-items:center;padding:8px 12px;border-radius:6px}
.pdj-app.pdj-con-fecha .pdj-cabecera,.pdj-app.pdj-con-fecha .pdj-fila{grid-template-columns:44px minmax(0,4fr) minmax(0,2.5fr) minmax(0,2fr) 64px 90px 160px}
.pdj-cabecera{color:#b3b3b3;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #2a2a2a;border-radius:0;margin-bottom:8px;position:sticky;top:0;background:#121212;z-index:5}
.pdj-fila{transition:background .15s}
.pdj-fila:hover{background:#1e1e1e}
.pdj-fila.pdj-sonando{background:#1a2e21}
.pdj-fila.pdj-sonando .pdj-nombre{color:#1db954}
.pdj-num{color:#b3b3b3;font-size:14px;text-align:center}
.pdj-fila .pdj-playbtn{display:none;background:none;border:none;color:#fff;cursor:pointer;font-size:14px;padding:0}
.pdj-fila:hover .pdj-num{display:none}
.pdj-fila:hover .pdj-playbtn{display:inline-block}
.pdj-fila.pdj-sonando .pdj-num{display:none}
.pdj-fila.pdj-sonando .pdj-playbtn{display:inline-block;color:#1db954}
.pdj-nombre{color:#fff;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdj-meta{color:#b3b3b3;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdj-fecha{color:#b3b3b3;font-size:12px}
.pdj-precio-col{display:flex;align-items:center;gap:8px;justify-content:flex-end}
.pdj-btn-precio{background:transparent;border:1px solid #727272;color:#fff;border-radius:50px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.pdj-btn-precio:hover{border-color:#1db954;color:#1db954;transform:scale(1.04)}
.pdj-btn-carrito{background:#1db954;border:none;color:#000;border-radius:50px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap}
.pdj-paginacion{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:22px 28px 8px}
.pdj-paginacion a{background:#242424;color:#fff;border-radius:50px;min-width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-size:13px;font-weight:600;padding:0 12px}
.pdj-paginacion a:hover{background:#333}
.pdj-paginacion a.active{background:#1db954;color:#000}
/* Barra de reproducción inferior */
.pdj-barra{position:fixed;left:0;right:0;bottom:0;background:#181818;border-top:1px solid #282828;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr) minmax(0,1fr);align-items:center;gap:12px;padding:12px 20px;z-index:9999}
.pdj-barra-titulo{color:#fff;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdj-barra-artista{color:#b3b3b3;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdj-barra-centro{display:flex;flex-direction:column;align-items:center;gap:6px}
.pdj-boton-principal{width:36px;height:36px;border-radius:50%;background:#fff;color:#000;border:none;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center}
.pdj-boton-principal:hover{transform:scale(1.06)}
.pdj-progreso{display:flex;align-items:center;gap:10px;width:100%;max-width:560px}
.pdj-progreso span{color:#b3b3b3;font-size:11px;min-width:34px;text-align:center}
.pdj-barra input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:2px;background:#4d4d4d;cursor:pointer}
.pdj-barra input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;border-radius:50%;background:#fff}
.pdj-barra input[type=range]:hover::-webkit-slider-thumb{background:#1db954}
.pdj-barra-vol{display:flex;align-items:center;gap:8px;justify-content:flex-end;color:#b3b3b3}
.pdj-barra-vol input{max-width:110px}
/* Carrito flotante */
.pdj-cart-flotante{position:fixed;top:110px;right:18px;z-index:9998;background:#1db954;color:#000;border:none;border-radius:50%;width:52px;height:52px;font-size:18px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4)}
.pdj-cart-flotante .pdj-cart-num{position:absolute;top:-4px;right:-4px;background:#fff;color:#000;font-size:11px;font-weight:700;border-radius:50%;min-width:20px;height:20px;display:flex;align-items:center;justify-content:center}
#loading{position:fixed;bottom:110px;left:50%;transform:translateX(-50%);background:#1db954;color:#000;font-weight:600;border-radius:50px;padding:10px 22px;z-index:10000}
@media (max-width:768px){
  .pdj-cabecera,.pdj-fila,.pdj-app.pdj-con-fecha .pdj-cabecera,.pdj-app.pdj-con-fecha .pdj-fila{grid-template-columns:34px minmax(0,3fr) 120px}
  .pdj-col-artista,.pdj-col-dj,.pdj-col-bpm,.pdj-col-fecha{display:none}
  .pdj-barra{grid-template-columns:minmax(0,1fr) minmax(0,1.6fr)}
  .pdj-barra-vol{display:none}
  .pdj-hero{padding:30px 16px 14px}
  .pdj-controles,.pdj-tabla{padding-left:12px;padding-right:12px}
}
</style>

<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="<?php esc_attr_e( 'Ver tu carrito', 'woocommerce' ); ?>">
	<button id="floating-cart" class="pdj-cart-flotante">
		<i class="fas fa-shopping-cart"></i>
		<span id="cart-count" class="pdj-cart-num">0</span>
	</button>
</a>

<div class="pdj-app<?php echo $atts['mostrar_fecha'] ? ' pdj-con-fecha' : ''; ?>">

	<header class="pdj-hero">
		<p class="pdj-tipo"><?php echo esc_html( $atts['tipo'] ); ?></p>
		<h1 class="pdj-titulo"><?php echo esc_html( $atts['titulo'] ); ?></h1>
		<?php if ( '' !== $atts['subtitulo'] ) : ?>
			<p class="pdj-sub"><?php echo esc_html( $atts['subtitulo'] ); ?></p>
		<?php endif; ?>
	</header>

	<?php if ( $atts['mostrar_filtros'] ) : ?>
	<div class="pdj-controles">
		<input type="text" id="searchBox" class="pdj-input" placeholder="Buscar canción, artista o remix..."
			value="<?php echo '' === $atts['buscar_fijo'] ? esc_attr( $search_term ) : ''; ?>">
		<?php if ( '' === $atts['categoria_fija'] && '' === $atts['dj'] ) : ?>
		<select id="categoryFilter" class="pdj-select">
			<option value="">Todos los géneros</option>
			<?php
			$categories = get_terms( 'product_cat', array( 'hide_empty' => false ) );
			foreach ( $categories as $category ) {
				printf(
					'<option value="%s"%s>%s</option>',
					esc_attr( $category->slug ),
					selected( $selected_category, $category->slug, false ),
					esc_html( $category->name )
				);
			}
			?>
		</select>
		<?php endif; ?>
		<button id="searchButton" class="pdj-btn-buscar">Buscar</button>
	</div>
	<?php endif; ?>

	<div class="pdj-tabla" id="products-list">

		<div class="pdj-cabecera">
			<div>#</div>
			<div>Título</div>
			<div class="pdj-col-artista">Artista</div>
			<div class="pdj-col-dj">DJ</div>
			<div class="pdj-col-bpm">BPM</div>
			<?php if ( $atts['mostrar_fecha'] ) : ?><div class="pdj-col-fecha">Fecha</div><?php endif; ?>
			<div style="text-align:right;">Precio</div>
		</div>

		<?php
		$numero = ( $current_page - 1 ) * $per_page;
		foreach ( $products as $product ) :
			$numero++;

			// ¿Ya está en el carrito?
			$in_cart = false;
			if ( function_exists( 'WC' ) && WC()->cart ) {
				foreach ( WC()->cart->get_cart() as $cart_item ) {
					if ( $cart_item['product_id'] == $product->get_id() ) {
						$in_cart = true;
						break;
					}
				}
			}

			$dj_valor      = pdj_valor_dj( $product );
			$artista       = pdj_valor_artista( $product );
			$bpm           = pdj_valor_bpm( $product );
			$preview_url   = pdj_url_preview( $product );
			$cat_principal = pdj_categoria_principal( $product );
			$es_video      = ( 'video' === $cat_principal );

			$track_json = wp_json_encode( array(
				'url'     => $preview_url,
				'titulo'  => $product->get_name(),
				'artista' => ( 'N/A' !== $artista ? $artista : $dj_valor ),
				'fila'    => 'pdj-fila-' . $product->get_id(),
			) );
		?>
		<div class="pdj-fila" id="pdj-fila-<?php echo esc_attr( $product->get_id() ); ?>">
			<div style="text-align:center;">
				<span class="pdj-num"><?php echo esc_html( $numero ); ?></span>
				<?php if ( $es_video ) : ?>
					<button type="button" class="pdj-playbtn" data-bs-toggle="modal" data-bs-target="#videoModal<?php echo esc_attr( $product->get_id() ); ?>" aria-label="Ver video">
						<i class="fas fa-video"></i>
					</button>
				<?php elseif ( '' !== $preview_url ) : ?>
					<button type="button" class="pdj-playbtn" onclick="pdjPlay(<?php echo esc_attr( $track_json ); ?>, this)" aria-label="Reproducir preview">
						<i class="fas fa-play"></i>
					</button>
				<?php else : ?>
					<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>" class="pdj-playbtn" aria-label="Ver producto">
						<i class="fas fa-headphones"></i>
					</a>
				<?php endif; ?>
			</div>
			<div class="pdj-nombre"><?php echo esc_html( $product->get_name() ); ?></div>
			<div class="pdj-meta pdj-col-artista"><?php echo esc_html( $artista ); ?></div>
			<div class="pdj-meta pdj-col-dj"><?php echo esc_html( $dj_valor ); ?></div>
			<div class="pdj-meta pdj-col-bpm"><?php echo esc_html( $bpm ); ?></div>
			<?php if ( $atts['mostrar_fecha'] ) : ?>
				<div class="pdj-fecha pdj-col-fecha"><?php echo esc_html( $product->get_date_created() ? $product->get_date_created()->date_i18n( 'd-m-Y' ) : '' ); ?></div>
			<?php endif; ?>
			<div class="pdj-precio-col">
				<?php if ( $in_cart ) : ?>
					<button onclick="window.location.href='<?php echo esc_url( wc_get_cart_url() ); ?>'" class="pdj-btn-carrito">Ir al carrito</button>
				<?php else : ?>
					<form class="cart ajax-add-to-cart" action="#" method="post" enctype="multipart/form-data" style="margin:0;">
						<input type="hidden" name="product_id" value="<?php echo esc_attr( $product->get_id() ); ?>">
						<input type="hidden" name="quantity" value="1">
						<button type="submit" class="pdj-btn-precio single_add_to_cart_button">
							<?php echo $product->get_price_html(); ?>
							<i class="fas fa-shopping-cart"></i>
						</button>
					</form>
				<?php endif; ?>
			</div>
		</div>

		<?php if ( $es_video ) : ?>
		<div class="modal fade" id="videoModal<?php echo esc_attr( $product->get_id() ); ?>" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content" style="background:#181818;color:#fff;">
					<div class="modal-header" style="border-color:#282828;">
						<h5 class="modal-title"><?php echo esc_html( $product->get_name() ); ?></h5>
						<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
					</div>
					<div class="modal-body"><?php echo $preview_url; ?></div>
				</div>
			</div>
		</div>
		<?php endif; ?>

		<?php endforeach; ?>

		<?php if ( empty( $products ) ) : ?>
			<p style="color:#b3b3b3;padding:24px 12px;">No se encontraron resultados. Intenta con otra búsqueda.</p>
		<?php endif; ?>

		<?php
		// Paginación con URLs amigables (/page/2/)
		if ( $total_pages > 1 ) {
			$max_links = 4;
			$start     = max( 1, $current_page - intdiv( $max_links, 2 ) );
			$end       = min( $total_pages, $start + $max_links - 1 );

			if ( $current_page < intdiv( $max_links, 2 ) + 1 ) { $end = min( $total_pages, $max_links ); }
			if ( $current_page > $total_pages - intdiv( $max_links, 2 ) ) { $start = max( 1, $total_pages - $max_links + 1 ); }

			echo '<div class="pdj-paginacion woocommerce-pagination">';
			if ( $current_page > 1 ) {
				echo '<a class="prev-page" href="' . esc_url( pdj_enlace_pagina( $current_page - 1 ) ) . '" aria-label="Página anterior">&laquo;</a>';
			}
			for ( $i = $start; $i <= $end; $i++ ) {
				$class = ( $i === $current_page ) ? 'active' : '';
				echo '<a class="' . esc_attr( $class ) . '" href="' . esc_url( pdj_enlace_pagina( $i ) ) . '">' . (int) $i . '</a>';
			}
			if ( $current_page < $total_pages ) {
				echo '<a class="next-page" href="' . esc_url( pdj_enlace_pagina( $current_page + 1 ) ) . '" aria-label="Página siguiente">&raquo;</a>';
			}
			echo '</div>';
		}
		?>
	</div>

	<div id="loading" style="display:none;">
		<i class="fa fa-spinner fa-spin"></i> Agregando al carrito...
	</div>
</div>

<!-- Barra de reproducción fija (estilo Spotify) -->
<div class="pdj-barra">
	<div class="pdj-barra-info">
		<div class="pdj-barra-titulo" id="pdjTitulo">Elige una canción para escuchar el preview</div>
		<div class="pdj-barra-artista" id="pdjArtista"></div>
	</div>
	<div class="pdj-barra-centro">
		<button id="pdjPlayPause" class="pdj-boton-principal" aria-label="Reproducir o pausar"><i class="fas fa-play"></i></button>
		<div class="pdj-progreso">
			<span id="pdjTiempo">0:00</span>
			<input type="range" id="pdjSeek" value="0" max="100" aria-label="Progreso">
			<span id="pdjDuracion">0:00</span>
		</div>
	</div>
	<div class="pdj-barra-vol">
		<i class="fas fa-volume-up"></i>
		<input type="range" id="pdjVol" min="0" max="100" value="90" aria-label="Volumen">
	</div>
</div>
<audio id="pdjAudio" preload="none"></audio>

<script>
(function () {
	var audio = document.getElementById('pdjAudio');
	var btnPP = document.getElementById('pdjPlayPause');
	var seek = document.getElementById('pdjSeek');
	var vol = document.getElementById('pdjVol');
	var tiempo = document.getElementById('pdjTiempo');
	var duracion = document.getElementById('pdjDuracion');
	var lblTitulo = document.getElementById('pdjTitulo');
	var lblArtista = document.getElementById('pdjArtista');
	var filaActiva = null;

	function fmt(s) {
		if (!isFinite(s)) return '0:00';
		var m = Math.floor(s / 60), r = Math.floor(s % 60);
		return m + ':' + (r < 10 ? '0' : '') + r;
	}
	function setIconos(reproduciendo) {
		btnPP.innerHTML = reproduciendo ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
		if (filaActiva) {
			var b = filaActiva.querySelector('.pdj-playbtn i');
			if (b) b.className = reproduciendo ? 'fas fa-pause' : 'fas fa-play';
		}
	}

	window.pdjPlay = function (track, btn) {
		var fila = document.getElementById(track.fila);
		if (audio.src === track.url && !audio.paused) {
			audio.pause();
			return;
		}
		if (audio.src !== track.url) {
			if (filaActiva) {
				filaActiva.classList.remove('pdj-sonando');
				var prev = filaActiva.querySelector('.pdj-playbtn i');
				if (prev) prev.className = 'fas fa-play';
			}
			audio.src = track.url;
			lblTitulo.textContent = track.titulo;
			lblArtista.textContent = track.artista || '';
			filaActiva = fila;
			if (filaActiva) filaActiva.classList.add('pdj-sonando');
		}
		audio.play();
	};

	btnPP.addEventListener('click', function () {
		if (!audio.src) return;
		audio.paused ? audio.play() : audio.pause();
	});
	audio.addEventListener('play', function () { setIconos(true); });
	audio.addEventListener('pause', function () { setIconos(false); });
	audio.addEventListener('ended', function () { setIconos(false); seek.value = 0; });
	audio.addEventListener('timeupdate', function () {
		if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
		tiempo.textContent = fmt(audio.currentTime);
		duracion.textContent = fmt(audio.duration);
	});
	seek.addEventListener('input', function () {
		if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
	});
	vol.addEventListener('input', function () { audio.volume = vol.value / 100; });
	audio.volume = 0.9;

	// Buscador
	var boton = document.getElementById('searchButton');
	if (boton) {
		var base = <?php echo wp_json_encode( $base_url ); ?>;
		function buscar() {
			var q = document.getElementById('searchBox');
			var c = document.getElementById('categoryFilter');
			var params = [];
			if (q && q.value) params.push('buscando=' + encodeURIComponent(q.value));
			if (c && c.value) params.push('category=' + encodeURIComponent(c.value));
			window.location.href = base + (params.length ? '?' + params.join('&') : '');
		}
		boton.addEventListener('click', buscar);
		var caja = document.getElementById('searchBox');
		if (caja) caja.addEventListener('keypress', function (e) { if (e.which === 13) buscar(); });
	}
})();

jQuery(document).ready(function ($) {
	// Enlaces de carrito → checkout directo
	$('a').each(function () {
		var h = $(this).attr('href');
		if (h && h.includes('cart') && !$(this).find('#floating-cart').length) {
			$(this).attr('href', h.replace('cart', 'checkout'));
		}
	});

	// Contador del carrito
	function actualizarContador() {
		$.ajax({
			type: 'POST',
			url: woocommerce_params.ajax_url,
			data: { action: 'get_cart_count' },
			success: function (t) {
				$('#cart-count').text(t);
				parseInt(t) > 0 ? $('#floating-cart').addClass('cart-has-items') : $('#floating-cart').removeClass('cart-has-items');
			}
		});
	}

	// Agregar al carrito con AJAX
	$('form.ajax-add-to-cart').on('submit', function (ev) {
		ev.preventDefault();
		$('#loading').show();
		var form = $(this);
		$.ajax({
			type: 'POST',
			url: woocommerce_params.ajax_url,
			data: {
				action: 'woocommerce_ajax_add_to_cart',
				product_id: form.find('[name=product_id]').val(),
				quantity: form.find('[name=quantity]').val()
			},
			success: function (resp) {
				$('#loading').hide();
				if (resp.error && resp.product_url) { window.location = resp.product_url; return; }
				actualizarContador();
				form.closest('.pdj-precio-col').html(
					'<button onclick="window.location.href=\'<?php echo esc_js( wc_get_cart_url() ); ?>\'" class="pdj-btn-carrito">Ir al carrito</button>'
				);
			},
			error: function () { $('#loading').hide(); }
		});
	});
	actualizarContador();
});
</script>
