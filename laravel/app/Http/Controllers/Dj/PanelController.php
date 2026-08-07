<?php

namespace App\Http\Controllers\Dj;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;

/**
 * Panel del DJ: cada DJ ve únicamente sus propios reportes y su música.
 */
class PanelController extends Controller
{
    public function index(Request $request)
    {
        $dj = $request->user()->dj;
        abort_unless($dj, 403);

        $inicioMes = now()->startOfMonth();

        $base = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->where('tracks.dj_id', $dj->id)
            ->where('orders.status', 'paid');

        $ingresosMes = (float) (clone $base)->where('orders.paid_at', '>=', $inicioMes)
            ->selectRaw('coalesce(sum(order_items.price * order_items.quantity), 0) as total')->value('total');
        $unidadesMes = (int) (clone $base)->where('orders.paid_at', '>=', $inicioMes)
            ->sum('order_items.quantity');

        $expresionPeriodo = config('database.default') === 'sqlite'
            ? "strftime('%Y-%m', orders.paid_at)"
            : "date_format(orders.paid_at, '%Y-%m')";

        $ventasMes = (clone $base)
            ->where('orders.paid_at', '>=', now()->subMonths(11)->startOfMonth())
            ->selectRaw("$expresionPeriodo as periodo, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('periodo')->orderBy('periodo')->get();

        $topTracks = (clone $base)
            ->selectRaw('tracks.title as titulo, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos')
            ->groupBy('tracks.title')
            ->orderByDesc('ingresos')
            ->take(15)->get();

        $tracks = $dj->tracks()->latest('released_at')->paginate(30);

        return view('dj.panel', compact('dj', 'ingresosMes', 'unidadesMes', 'ventasMes', 'topTracks', 'tracks'));
    }
}
