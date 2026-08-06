<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Reporte profesional de ventas por DJ, por mes.
 */
class ReportController extends Controller
{
    public function index(Request $request)
    {
        [$anio, $mes] = $this->periodo($request);

        $filas = $this->ventasPorDj($anio, $mes);
        $totales = [
            'ingresos' => $filas->sum('ingresos'),
            'unidades' => $filas->sum('unidades'),
        ];

        // Serie de los últimos 12 meses para la gráfica.
        $serie = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.status', 'paid')
            ->where('orders.paid_at', '>=', now()->subMonths(11)->startOfMonth())
            ->selectRaw("strftime('%Y-%m', orders.paid_at) as periodo, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('periodo')->orderBy('periodo')->pluck('ingresos', 'periodo');

        if (config('database.default') !== 'sqlite') {
            $serie = OrderItem::query()
                ->join('orders', 'orders.id', '=', 'order_items.order_id')
                ->where('orders.status', 'paid')
                ->where('orders.paid_at', '>=', now()->subMonths(11)->startOfMonth())
                ->selectRaw("date_format(orders.paid_at, '%Y-%m') as periodo, sum(order_items.price * order_items.quantity) as ingresos")
                ->groupBy('periodo')->orderBy('periodo')->pluck('ingresos', 'periodo');
        }

        return view('admin.reports', compact('filas', 'totales', 'anio', 'mes', 'serie'));
    }

    public function export(Request $request): StreamedResponse
    {
        [$anio, $mes] = $this->periodo($request);
        $filas = $this->ventasPorDj($anio, $mes);

        $nombre = sprintf('ventas-por-dj-%04d-%02d.csv', $anio, $mes);

        return response()->streamDownload(function () use ($filas) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF"); // BOM para Excel
            fputcsv($out, ['DJ', 'Unidades', 'Ingresos']);
            foreach ($filas as $fila) {
                fputcsv($out, [$fila->dj, $fila->unidades, number_format((float) $fila->ingresos, 2, '.', '')]);
            }
            fputcsv($out, ['TOTAL', $filas->sum('unidades'), number_format((float) $filas->sum('ingresos'), 2, '.', '')]);
            fclose($out);
        }, $nombre, ['Content-Type' => 'text/csv; charset=utf-8']);
    }

    private function periodo(Request $request): array
    {
        return [
            (int) $request->query('anio', now()->year),
            min(12, max(1, (int) $request->query('mes', now()->month))),
        ];
    }

    private function ventasPorDj(int $anio, int $mes): Collection
    {
        $desde = now()->setDate($anio, $mes, 1)->startOfDay();
        $hasta = $desde->copy()->endOfMonth();

        return OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->leftJoin('djs', 'djs.id', '=', 'tracks.dj_id')
            ->where('orders.status', 'paid')
            ->whereBetween('orders.paid_at', [$desde, $hasta])
            ->selectRaw("coalesce(djs.name, 'Sin DJ') as dj, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('dj')
            ->orderByDesc('ingresos')
            ->get();
    }
}
