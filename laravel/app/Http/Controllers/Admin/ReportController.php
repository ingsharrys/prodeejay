<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Reporte de ventas con rango de fechas: resumen por DJ, detalle por
 * día y detalle por canción vendida. Exportable a CSV.
 */
class ReportController extends Controller
{
    public function index(Request $request)
    {
        [$desde, $hasta, $djId] = $this->filtros($request);

        $porDj      = $this->consulta($desde, $hasta, $djId)
            ->selectRaw("coalesce(djs.name, 'Sin DJ') as dj, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('dj')->orderByDesc('ingresos')->get();

        $porDia     = $this->consulta($desde, $hasta, $djId)
            ->selectRaw('date(orders.paid_at) as dia, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos')
            ->groupBy('dia')->orderBy('dia')->get();

        $porCancion = $this->porCancion($desde, $hasta, $djId)->take(300)->get();

        $totales = [
            'ingresos' => (float) $porDj->sum('ingresos'),
            'unidades' => (int) $porDj->sum('unidades'),
            'pedidos'  => (int) $this->consulta($desde, $hasta, $djId)->distinct('orders.id')->count('orders.id'),
        ];

        return view('admin.reports', [
            'porDj'      => $porDj,
            'porDia'     => $porDia,
            'porCancion' => $porCancion,
            'totales'    => $totales,
            'desde'      => $desde,
            'hasta'      => $hasta,
            'djId'       => $djId,
            'djs'        => Dj::orderBy('name')->get(),
        ]);
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

    /**
     * Rango de fechas (por defecto el mes en curso) y DJ opcional.
     */
    private function filtros(Request $request): array
    {
        $desde = $request->query('desde') ?: now()->startOfMonth()->toDateString();
        $hasta = $request->query('hasta') ?: now()->toDateString();

        // Fechas válidas y en orden.
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

    private function porCancion(string $desde, string $hasta, ?int $djId): Builder
    {
        return $this->consulta($desde, $hasta, $djId)
            ->selectRaw("coalesce(tracks.title, order_items.name) as cancion, coalesce(djs.name, 'Sin DJ') as dj, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('cancion', 'dj')
            ->orderByDesc('ingresos');
    }
}
