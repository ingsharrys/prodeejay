<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Panel de reportes: resumen general con gráficas y hoja de reporte
 * individual por DJ, ambos con rango de fechas.
 */
class ReportController extends Controller
{
    public function index(Request $request)
    {
        [$desde, $hasta, $djId] = $this->filtros($request);

        $totales = $this->totales($desde, $hasta, $djId);
        $previos = $this->totalesPeriodoAnterior($desde, $hasta, $djId);

        $porDj = $this->consulta($desde, $hasta, $djId)
            ->selectRaw("coalesce(djs.name, 'Sin DJ') as dj, tracks.dj_id as dj_id, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('dj', 'tracks.dj_id')->orderByDesc('ingresos')->get();

        $porMetodo = $this->consulta($desde, $hasta, $djId)
            ->selectRaw("coalesce(orders.payment_title, orders.payment_method, 'Otro') as metodo, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('metodo')->orderByDesc('ingresos')->get();

        // Impuestos recaudados en el rango (dato a nivel de pedido).
        $impuestos = $djId ? null : (float) \App\Models\Order::where('status', 'paid')
            ->whereBetween('paid_at', ["{$desde} 00:00:00", "{$hasta} 23:59:59"])
            ->sum('tax_amount');

        return view('admin.reports', [
            'impuestos'  => $impuestos,
            'desde'      => $desde,
            'hasta'      => $hasta,
            'djId'       => $djId,
            'djs'        => Dj::orderBy('name')->get(),
            'totales'    => $totales,
            'previos'    => $previos,
            'serieDias'  => $this->serieDias($desde, $hasta, $djId),
            'porDj'      => $porDj,
            'porMetodo'  => $porMetodo,
            'porCancion' => $this->porCancion($desde, $hasta, $djId)->take(100)->get(),
        ]);
    }

    /**
     * Hoja de reporte individual de un DJ.
     */
    public function dj(Request $request, Dj $dj)
    {
        [$desde, $hasta] = $this->filtros($request);

        $totales      = $this->totales($desde, $hasta, $dj->id);
        $previos      = $this->totalesPeriodoAnterior($desde, $hasta, $dj->id);
        $totalesSitio = $this->totales($desde, $hasta, null);

        return view('admin.reports-dj', [
            'dj'          => $dj,
            'desde'       => $desde,
            'hasta'       => $hasta,
            'totales'     => $totales,
            'previos'     => $previos,
            'participacion' => $totalesSitio['ingresos'] > 0
                ? round($totales['ingresos'] / $totalesSitio['ingresos'] * 100, 1)
                : 0,
            'serieDias'   => $this->serieDias($desde, $hasta, $dj->id),
            'porCancion'  => $this->porCancion($desde, $hasta, $dj->id)->get(),
            'ventasDetalle' => $this->ventasDetalle($desde, $hasta, $dj->id),
        ]);
    }

    /**
     * Excel de liquidación del DJ con el formato del reporte oficial:
     * CANCION | CANTIDAD | TOTAL NETO | Impuesto | Descuento | TOTAL A
     * PAGAR | FECHA COMPRA (+ método de pago y cliente).
     */
    public function djExcel(Request $request, Dj $dj)
    {
        [$desde, $hasta] = $this->filtros($request);
        $ventas = $this->ventasDetalle($desde, $hasta, $dj->id);

        $impuestoPct = (float) config('services.reporte.impuesto_pct', 0.3) / 100;
        $comisionPct = (float) config('services.reporte.comision_pct', 30) / 100;

        $libro = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $hoja  = $libro->getActiveSheet();
        $hoja->setTitle(mb_substr(preg_replace('/[\\\\\/\?\*\[\]:]/', '', $dj->name) ?: 'DJ', 0, 31));

        $verde  = '1DB954';
        $negro  = '111111';

        // Título
        $hoja->mergeCells('A1:I1');
        $hoja->setCellValue('A1', 'REPORTE VENTA ' . mb_strtoupper($dj->name) . '  (' . $desde . ' a ' . $hasta . ')');
        $hoja->getStyle('A1')->getFont()->setBold(true)->setSize(14)->setName('Arial');
        $hoja->getStyle('A1')->getFill()->setFillType('solid')->getStartColor()->setRGB($negro);
        $hoja->getStyle('A1')->getFont()->getColor()->setRGB('FFFFFF');

        // Encabezados
        $encabezados = ['CANCION', 'CANTIDAD VENTA', 'TOTAL NETO', 'Impuesto', 'DESCUENTO ' . rtrim(rtrim(number_format($comisionPct * 100, 1), '0'), '.') . '%', 'TOTAL A PAGAR', 'FECHA COMPRA', 'METODO DE PAGO', 'CLIENTE'];
        $hoja->fromArray($encabezados, null, 'A2');
        $hoja->getStyle('A2:I2')->getFont()->setBold(true)->setName('Arial');
        $hoja->getStyle('A2:I2')->getFill()->setFillType('solid')->getStartColor()->setRGB($verde);

        // Filas de ventas
        $fila = 3;
        foreach ($ventas as $v) {
            $neto      = round((float) $v->neto, 2);
            $impuesto  = round($neto * $impuestoPct, 6);
            $descuento = round(($neto - $impuesto) * $comisionPct, 6);
            $pagar     = round($neto - $impuesto - $descuento, 6);

            $hoja->fromArray([
                $v->cancion,
                (int) $v->cantidad,
                $neto,
                $impuesto,
                $descuento,
                $pagar,
                substr((string) $v->fecha, 0, 10),
                $v->metodo,
                trim($v->cliente . ' ' . ($v->correo ? '(' . $v->correo . ')' : '')),
            ], null, 'A' . $fila);
            $fila++;
        }

        // Totales con fórmulas
        $ultima = $fila - 1;
        if ($ultima >= 3) {
            $hoja->setCellValue('A' . $fila, 'TOTALES');
            foreach (['B', 'C', 'D', 'E', 'F'] as $col) {
                $hoja->setCellValue($col . $fila, "=SUM({$col}3:{$col}{$ultima})");
            }
            $hoja->getStyle("A{$fila}:I{$fila}")->getFont()->setBold(true)->setName('Arial');
        } else {
            $hoja->setCellValue('A3', 'Sin ventas en el período.');
        }

        // Formatos y anchos
        $hoja->getStyle("C3:F" . max(3, $fila))->getNumberFormat()->setFormatCode('#,##0.00');
        foreach (['A' => 46, 'B' => 15, 'C' => 12, 'D' => 10, 'E' => 15, 'F' => 14, 'G' => 13, 'H' => 16, 'I' => 34] as $col => $ancho) {
            $hoja->getColumnDimension($col)->setWidth($ancho);
        }
        $hoja->getStyle('A2:I' . max(3, $fila))->getFont()->setName('Arial');

        $nombre = 'REPORTE_' . Str::of($dj->name)->upper()->replace(' ', '_') . "_{$desde}_a_{$hasta}.xlsx";

        return response()->streamDownload(function () use ($libro) {
            (new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($libro))->save('php://output');
        }, $nombre, ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']);
    }

    /**
     * Detalle venta por venta: canción, precio, fecha, método y cliente.
     */
    private function ventasDetalle(string $desde, string $hasta, ?int $djId)
    {
        return $this->consulta($desde, $hasta, $djId)
            ->selectRaw("orders.paid_at as fecha, coalesce(tracks.title, order_items.name) as cancion, order_items.quantity as cantidad, (order_items.price * order_items.quantity) as neto, coalesce(orders.payment_title, orders.payment_method, '—') as metodo, coalesce(orders.customer_name, '') as cliente, coalesce(orders.customer_email, '') as correo")
            ->orderByDesc('orders.paid_at')
            ->limit(2000)
            ->get();
    }

    public function export(Request $request): StreamedResponse
    {
        [$desde, $hasta, $djId] = $this->filtros($request);
        $filas = $this->porCancion($desde, $hasta, $djId)->get();

        $nombre = "ventas-{$desde}-a-{$hasta}.csv";

        return response()->streamDownload(function () use ($filas) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF");
            fputcsv($out, ['Canción', 'DJ', 'Unidades', 'Ingresos']);
            foreach ($filas as $f) {
                fputcsv($out, [$f->cancion, $f->dj, $f->unidades, number_format((float) $f->ingresos, 2, '.', '')]);
            }
            fputcsv($out, ['TOTAL', '', $filas->sum('unidades'), number_format((float) $filas->sum('ingresos'), 2, '.', '')]);
            fclose($out);
        }, $nombre, ['Content-Type' => 'text/csv; charset=utf-8']);
    }

    /* ------------------------------------------------------------- */

    private function filtros(Request $request): array
    {
        $desde = $request->query('desde') ?: now()->startOfMonth()->toDateString();
        $hasta = $request->query('hasta') ?: now()->toDateString();

        $desde = date('Y-m-d', strtotime($desde) ?: time());
        $hasta = date('Y-m-d', strtotime($hasta) ?: time());
        if ($desde > $hasta) {
            [$desde, $hasta] = [$hasta, $desde];
        }

        $djId = (int) $request->query('dj') ?: null;

        return [$desde, $hasta, $djId];
    }

    private function consulta(string $desde, string $hasta, ?int $djId): Builder
    {
        return OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->leftJoin('djs', 'djs.id', '=', 'tracks.dj_id')
            ->where('orders.status', 'paid')
            ->whereBetween('orders.paid_at', ["{$desde} 00:00:00", "{$hasta} 23:59:59"])
            ->when($djId, fn (Builder $q) => $q->where('tracks.dj_id', $djId));
    }

    private function totales(string $desde, string $hasta, ?int $djId): array
    {
        $fila = $this->consulta($desde, $hasta, $djId)
            ->selectRaw('coalesce(sum(order_items.price * order_items.quantity), 0) as ingresos, coalesce(sum(order_items.quantity), 0) as unidades, count(distinct orders.id) as pedidos')
            ->first();

        $ingresos = (float) $fila->ingresos;
        $pedidos  = (int) $fila->pedidos;

        return [
            'ingresos' => $ingresos,
            'unidades' => (int) $fila->unidades,
            'pedidos'  => $pedidos,
            'ticket'   => $pedidos > 0 ? $ingresos / $pedidos : 0,
        ];
    }

    /**
     * Totales del período inmediatamente anterior de igual duración,
     * para calcular las variaciones porcentuales.
     */
    private function totalesPeriodoAnterior(string $desde, string $hasta, ?int $djId): array
    {
        $dias      = (int) ((strtotime($hasta) - strtotime($desde)) / 86400) + 1;
        $prevHasta = date('Y-m-d', strtotime("{$desde} -1 day"));
        $prevDesde = date('Y-m-d', strtotime($prevHasta . ' -' . ($dias - 1) . ' day'));

        return $this->totales($prevDesde, $prevHasta, $djId) + [
            'desde' => $prevDesde,
            'hasta' => $prevHasta,
        ];
    }

    /**
     * Serie diaria continua (rellena los días sin ventas con cero).
     */
    private function serieDias(string $desde, string $hasta, ?int $djId): array
    {
        $mapa = $this->consulta($desde, $hasta, $djId)
            ->selectRaw('date(orders.paid_at) as dia, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos')
            ->groupBy('dia')->get()->keyBy('dia');

        $serie  = [];
        $cursor = strtotime($desde);
        $fin    = strtotime($hasta);
        $limite = 400; // tope de puntos por seguridad

        while ($cursor <= $fin && $limite-- > 0) {
            $dia = date('Y-m-d', $cursor);
            $serie[] = [
                'dia'      => $dia,
                'ingresos' => round((float) ($mapa[$dia]->ingresos ?? 0), 2),
                'unidades' => (int) ($mapa[$dia]->unidades ?? 0),
            ];
            $cursor = strtotime('+1 day', $cursor);
        }

        return $serie;
    }

    private function porCancion(string $desde, string $hasta, ?int $djId): Builder
    {
        return $this->consulta($desde, $hasta, $djId)
            ->selectRaw("coalesce(tracks.title, order_items.name) as cancion, coalesce(djs.name, 'Sin DJ') as dj, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('cancion', 'dj')
            ->orderByDesc('ingresos');
    }
}
