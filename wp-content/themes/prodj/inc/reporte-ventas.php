<?php
/**
 * Reporte de ventas por DJ, por mes.
 *
 * Agrega la página "Ventas por DJ" al menú de WooCommerce:
 *  - Selector de mes (últimos 24 meses).
 *  - Resumen: ingresos, unidades vendidas, pedidos y DJs con ventas.
 *  - Tabla por DJ (ingresos, unidades, % del total y comisión opcional).
 *  - Detalle por canción (global o filtrado por DJ).
 *  - Exportación a CSV para Excel.
 *
 * Los ingresos son netos: total del artículo con descuentos aplicados y
 * menos los reembolsos. Se cuentan pedidos Completados y Procesando.
 *
 * Comisión: por defecto no se muestra. Para activarla, definir el
 * porcentaje que se paga al DJ con el filtro:
 *   add_filter('pdj_porcentaje_comision_dj', function () { return 50; });
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Porcentaje de comisión que se paga al DJ (0 = columna oculta).
 */
function pdj_porcentaje_comision_dj() {
	return (float) apply_filters( 'pdj_porcentaje_comision_dj', 0 );
}

/**
 * Calcula las ventas del mes agrupadas por DJ. Cacheado 1 hora.
 */
function pdj_datos_reporte( $anio, $mes, $forzar = false ) {
	$cache_key = sprintf( 'pdj_reporte_%04d%02d', $anio, $mes );
	if ( ! $forzar ) {
		$cache = get_transient( $cache_key );
		if ( false !== $cache ) {
			return $cache;
		}
	}

	$desde = sprintf( '%04d-%02d-01', $anio, $mes );
	$hasta = gmdate( 'Y-m-t', strtotime( $desde ) );

	$orders = wc_get_orders( array(
		'limit'        => -1,
		'status'       => array( 'wc-completed', 'wc-processing' ),
		'date_created' => $desde . '...' . $hasta,
		'return'       => 'objects',
	) );

	$datos = array(
		'djs'            => array(),
		'total_ingresos' => 0.0,
		'total_unidades' => 0,
		'num_pedidos'    => 0,
	);

	foreach ( $orders as $order ) {
		$tiene_items = false;

		foreach ( $order->get_items() as $item_id => $item ) {
			$product_id = $item->get_product_id();
			$cantidad   = (int) $item->get_quantity();
			$ingreso    = (float) $item->get_total() - (float) $order->get_total_refunded_for_item( $item_id );

			if ( $cantidad <= 0 && 0.0 === $ingreso ) {
				continue;
			}
			$tiene_items = true;

			// DJ del producto (primer término de pa_dj).
			$dj_slug   = 'sin-dj';
			$dj_nombre = 'Sin DJ asignado';
			$terminos  = get_the_terms( $product_id, 'pa_dj' );
			if ( $terminos && ! is_wp_error( $terminos ) ) {
				$dj_slug   = $terminos[0]->slug;
				$dj_nombre = $terminos[0]->name;
			}

			if ( ! isset( $datos['djs'][ $dj_slug ] ) ) {
				$datos['djs'][ $dj_slug ] = array(
					'nombre'   => $dj_nombre,
					'unidades' => 0,
					'ingresos' => 0.0,
					'pedidos'  => array(),
					'tracks'   => array(),
				);
			}

			$datos['djs'][ $dj_slug ]['unidades'] += $cantidad;
			$datos['djs'][ $dj_slug ]['ingresos'] += $ingreso;
			$datos['djs'][ $dj_slug ]['pedidos'][ $order->get_id() ] = true;

			if ( ! isset( $datos['djs'][ $dj_slug ]['tracks'][ $product_id ] ) ) {
				$datos['djs'][ $dj_slug ]['tracks'][ $product_id ] = array(
					'nombre'   => $item->get_name(),
					'unidades' => 0,
					'ingresos' => 0.0,
				);
			}
			$datos['djs'][ $dj_slug ]['tracks'][ $product_id ]['unidades'] += $cantidad;
			$datos['djs'][ $dj_slug ]['tracks'][ $product_id ]['ingresos'] += $ingreso;

			$datos['total_ingresos'] += $ingreso;
			$datos['total_unidades'] += $cantidad;
		}

		if ( $tiene_items ) {
			$datos['num_pedidos']++;
		}
	}

	// Ordenar DJs por ingresos y sus canciones también.
	uasort( $datos['djs'], function ( $a, $b ) {
		return $b['ingresos'] <=> $a['ingresos'];
	} );
	foreach ( $datos['djs'] as &$dj ) {
		uasort( $dj['tracks'], function ( $a, $b ) {
			return $b['ingresos'] <=> $a['ingresos'];
		} );
		$dj['num_pedidos'] = count( $dj['pedidos'] );
		unset( $dj['pedidos'] );
	}
	unset( $dj );

	set_transient( $cache_key, $datos, HOUR_IN_SECONDS );
	return $datos;
}

/* ---------------------------------------------------------------------
 * Página en el panel de administración
 * ------------------------------------------------------------------- */

add_action( 'admin_menu', 'pdj_registrar_reporte' );
function pdj_registrar_reporte() {
	add_submenu_page(
		'woocommerce',
		'Ventas por DJ',
		'Ventas por DJ',
		'manage_woocommerce',
		'pdj-ventas-dj',
		'pdj_render_reporte'
	);
}

function pdj_render_reporte() {
	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		wp_die( 'No tienes permisos para ver este reporte.' );
	}

	$anio = isset( $_GET['anio'] ) ? max( 2020, min( 2100, (int) $_GET['anio'] ) ) : (int) current_time( 'Y' );
	$mes  = isset( $_GET['mes'] ) ? max( 1, min( 12, (int) $_GET['mes'] ) ) : (int) current_time( 'n' );
	$dj_filtro = isset( $_GET['dj'] ) ? sanitize_title( wp_unslash( $_GET['dj'] ) ) : '';
	$forzar    = isset( $_GET['actualizar'] );

	$datos    = pdj_datos_reporte( $anio, $mes, $forzar );
	$comision = pdj_porcentaje_comision_dj();

	$nombre_mes = date_i18n( 'F Y', mktime( 0, 0, 0, $mes, 1, $anio ) );

	$url_base = admin_url( 'admin.php?page=pdj-ventas-dj' );
	$url_csv  = wp_nonce_url(
		admin_url( sprintf( 'admin-post.php?action=pdj_exportar_reporte&anio=%d&mes=%d', $anio, $mes ) ),
		'pdj_exportar_reporte'
	);
	?>
	<div class="wrap pdj-reporte">
		<style>
			.pdj-reporte .pdj-r-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:16px 0 22px}
			.pdj-reporte .pdj-r-card{background:#fff;border:1px solid #dcdcde;border-radius:8px;padding:18px 20px}
			.pdj-reporte .pdj-r-card .num{font-size:26px;font-weight:700;color:#1d2327}
			.pdj-reporte .pdj-r-card .lbl{color:#646970;font-size:12px;text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
			.pdj-reporte table.widefat{border-radius:8px;overflow:hidden}
			.pdj-reporte .pdj-r-barra{background:#f0f0f1;border-radius:4px;height:8px;min-width:120px;overflow:hidden}
			.pdj-reporte .pdj-r-barra span{display:block;height:100%;background:#1db954}
			.pdj-reporte .pdj-r-filtros{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0}
			.pdj-reporte h2{margin-top:30px}
			.pdj-reporte .pdj-r-num{text-align:right;font-variant-numeric:tabular-nums}
			.pdj-reporte th.pdj-r-num{text-align:right}
		</style>

		<h1>Ventas por DJ — <?php echo esc_html( ucfirst( $nombre_mes ) ); ?></h1>

		<form method="get" class="pdj-r-filtros">
			<input type="hidden" name="page" value="pdj-ventas-dj">
			<select name="mes">
				<?php for ( $m = 1; $m <= 12; $m++ ) : ?>
					<option value="<?php echo (int) $m; ?>" <?php selected( $mes, $m ); ?>>
						<?php echo esc_html( ucfirst( date_i18n( 'F', mktime( 0, 0, 0, $m, 1, 2026 ) ) ) ); ?>
					</option>
				<?php endfor; ?>
			</select>
			<select name="anio">
				<?php $anio_actual = (int) current_time( 'Y' );
				for ( $a = $anio_actual; $a >= $anio_actual - 5; $a-- ) : ?>
					<option value="<?php echo (int) $a; ?>" <?php selected( $anio, $a ); ?>><?php echo (int) $a; ?></option>
				<?php endfor; ?>
			</select>
			<button class="button button-primary">Ver reporte</button>
			<a class="button" href="<?php echo esc_url( add_query_arg( array( 'anio' => $anio, 'mes' => $mes, 'actualizar' => 1 ), $url_base ) ); ?>">Actualizar datos</a>
			<a class="button" href="<?php echo esc_url( $url_csv ); ?>">Exportar a Excel (CSV)</a>
		</form>

		<div class="pdj-r-cards">
			<div class="pdj-r-card"><div class="num"><?php echo wp_kses_post( wc_price( $datos['total_ingresos'] ) ); ?></div><div class="lbl">Ingresos del mes</div></div>
			<div class="pdj-r-card"><div class="num"><?php echo esc_html( number_format_i18n( $datos['total_unidades'] ) ); ?></div><div class="lbl">Tracks vendidos</div></div>
			<div class="pdj-r-card"><div class="num"><?php echo esc_html( number_format_i18n( $datos['num_pedidos'] ) ); ?></div><div class="lbl">Pedidos</div></div>
			<div class="pdj-r-card"><div class="num"><?php echo esc_html( number_format_i18n( count( $datos['djs'] ) ) ); ?></div><div class="lbl">DJs con ventas</div></div>
		</div>

		<h2>Resumen por DJ</h2>
		<table class="widefat striped">
			<thead>
				<tr>
					<th>DJ</th>
					<th class="pdj-r-num">Tracks vendidos</th>
					<th class="pdj-r-num">Pedidos</th>
					<th class="pdj-r-num">Ingresos</th>
					<?php if ( $comision > 0 ) : ?>
						<th class="pdj-r-num">A pagar al DJ (<?php echo esc_html( $comision ); ?>%)</th>
					<?php endif; ?>
					<th>% del total</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<?php if ( empty( $datos['djs'] ) ) : ?>
					<tr><td colspan="7">No hay ventas registradas en <?php echo esc_html( $nombre_mes ); ?>.</td></tr>
				<?php endif; ?>
				<?php foreach ( $datos['djs'] as $slug => $dj ) :
					$pct = $datos['total_ingresos'] > 0 ? ( $dj['ingresos'] / $datos['total_ingresos'] ) * 100 : 0;
				?>
				<tr>
					<td><strong><?php echo esc_html( $dj['nombre'] ); ?></strong></td>
					<td class="pdj-r-num"><?php echo esc_html( number_format_i18n( $dj['unidades'] ) ); ?></td>
					<td class="pdj-r-num"><?php echo esc_html( number_format_i18n( $dj['num_pedidos'] ) ); ?></td>
					<td class="pdj-r-num"><?php echo wp_kses_post( wc_price( $dj['ingresos'] ) ); ?></td>
					<?php if ( $comision > 0 ) : ?>
						<td class="pdj-r-num"><strong><?php echo wp_kses_post( wc_price( $dj['ingresos'] * $comision / 100 ) ); ?></strong></td>
					<?php endif; ?>
					<td>
						<div class="pdj-r-barra" title="<?php echo esc_attr( number_format_i18n( $pct, 1 ) ); ?>%">
							<span style="width:<?php echo esc_attr( max( 1, round( $pct ) ) ); ?>%"></span>
						</div>
						<?php echo esc_html( number_format_i18n( $pct, 1 ) ); ?>%
					</td>
					<td><a href="<?php echo esc_url( add_query_arg( array( 'anio' => $anio, 'mes' => $mes, 'dj' => $slug ), $url_base ) ); ?>">Ver canciones</a></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>

		<?php
		// Detalle por canción: de un DJ, o el top global.
		if ( $dj_filtro && isset( $datos['djs'][ $dj_filtro ] ) ) {
			$titulo_detalle = 'Canciones de ' . $datos['djs'][ $dj_filtro ]['nombre'];
			$tracks         = $datos['djs'][ $dj_filtro ]['tracks'];
		} else {
			$titulo_detalle = 'Canciones más vendidas del mes';
			$tracks         = array();
			foreach ( $datos['djs'] as $dj ) {
				foreach ( $dj['tracks'] as $pid => $t ) {
					$t['dj'] = $dj['nombre'];
					$tracks[ $pid . '-' . $dj['nombre'] ] = $t;
				}
			}
			uasort( $tracks, function ( $a, $b ) {
				return $b['ingresos'] <=> $a['ingresos'];
			} );
			$tracks = array_slice( $tracks, 0, 20, true );
		}
		?>
		<h2><?php echo esc_html( $titulo_detalle ); ?></h2>
		<?php if ( $dj_filtro ) : ?>
			<p><a href="<?php echo esc_url( add_query_arg( array( 'anio' => $anio, 'mes' => $mes ), $url_base ) ); ?>">&laquo; Volver al top global</a></p>
		<?php endif; ?>
		<table class="widefat striped">
			<thead>
				<tr>
					<th>Canción</th>
					<?php if ( ! $dj_filtro ) : ?><th>DJ</th><?php endif; ?>
					<th class="pdj-r-num">Unidades</th>
					<th class="pdj-r-num">Ingresos</th>
				</tr>
			</thead>
			<tbody>
				<?php if ( empty( $tracks ) ) : ?>
					<tr><td colspan="4">Sin ventas en este período.</td></tr>
				<?php endif; ?>
				<?php foreach ( $tracks as $t ) : ?>
				<tr>
					<td><?php echo esc_html( $t['nombre'] ); ?></td>
					<?php if ( ! $dj_filtro ) : ?><td><?php echo esc_html( $t['dj'] ); ?></td><?php endif; ?>
					<td class="pdj-r-num"><?php echo esc_html( number_format_i18n( $t['unidades'] ) ); ?></td>
					<td class="pdj-r-num"><?php echo wp_kses_post( wc_price( $t['ingresos'] ) ); ?></td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>

		<p style="color:#646970;margin-top:14px;">
			Ingresos netos (con descuentos y reembolsos aplicados) de pedidos Completados y Procesando.
			Los datos se guardan en caché 1 hora; usa "Actualizar datos" para recalcular.
		</p>
	</div>
	<?php
}

/* ---------------------------------------------------------------------
 * Exportación a CSV (compatible con Excel)
 * ------------------------------------------------------------------- */

add_action( 'admin_post_pdj_exportar_reporte', 'pdj_exportar_reporte_csv' );
function pdj_exportar_reporte_csv() {
	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		wp_die( 'Sin permisos.' );
	}
	check_admin_referer( 'pdj_exportar_reporte' );

	$anio = isset( $_GET['anio'] ) ? max( 2020, min( 2100, (int) $_GET['anio'] ) ) : (int) current_time( 'Y' );
	$mes  = isset( $_GET['mes'] ) ? max( 1, min( 12, (int) $_GET['mes'] ) ) : (int) current_time( 'n' );

	$datos    = pdj_datos_reporte( $anio, $mes );
	$comision = pdj_porcentaje_comision_dj();
	$archivo  = sprintf( 'ventas-por-dj-%04d-%02d.csv', $anio, $mes );

	header( 'Content-Type: text/csv; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename="' . $archivo . '"' );

	$salida = fopen( 'php://output', 'w' );
	// BOM para que Excel abra bien los acentos.
	fwrite( $salida, "\xEF\xBB\xBF" );

	$cabecera = array( 'DJ', 'Canción', 'Unidades', 'Ingresos' );
	if ( $comision > 0 ) {
		$cabecera[] = 'A pagar al DJ (' . $comision . '%)';
	}
	fputcsv( $salida, $cabecera );

	foreach ( $datos['djs'] as $dj ) {
		foreach ( $dj['tracks'] as $t ) {
			$fila = array( $dj['nombre'], $t['nombre'], $t['unidades'], number_format( $t['ingresos'], 2, '.', '' ) );
			if ( $comision > 0 ) {
				$fila[] = number_format( $t['ingresos'] * $comision / 100, 2, '.', '' );
			}
			fputcsv( $salida, $fila );
		}
		$fila_total = array( $dj['nombre'], 'TOTAL ' . $dj['nombre'], $dj['unidades'], number_format( $dj['ingresos'], 2, '.', '' ) );
		if ( $comision > 0 ) {
			$fila_total[] = number_format( $dj['ingresos'] * $comision / 100, 2, '.', '' );
		}
		fputcsv( $salida, $fila_total );
	}

	$fila_global = array( 'TODOS', 'TOTAL DEL MES', $datos['total_unidades'], number_format( $datos['total_ingresos'], 2, '.', '' ) );
	if ( $comision > 0 ) {
		$fila_global[] = number_format( $datos['total_ingresos'] * $comision / 100, 2, '.', '' );
	}
	fputcsv( $salida, $fila_global );

	fclose( $salida );
	exit;
}
