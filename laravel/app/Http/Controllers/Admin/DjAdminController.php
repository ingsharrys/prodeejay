<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DjAdminController extends Controller
{
    public function index()
    {
        return view('admin.djs.index', [
            'djs' => Dj::withCount('tracks')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        return view('admin.djs.form', ['dj' => new Dj()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->slugUnico($data['name']);
        Dj::create($data);

        return redirect()->route('admin.djs')->with('status', 'DJ creado.');
    }

    public function edit(Dj $dj)
    {
        return view('admin.djs.form', compact('dj'));
    }

    public function update(Request $request, Dj $dj)
    {
        $dj->update($this->validated($request));

        return redirect()->route('admin.djs')->with('status', 'DJ actualizado.');
    }

    /**
     * Historial del DJ: su música y sus ventas mes a mes.
     */
    public function show(Dj $dj)
    {
        $tracks = $dj->tracks()->latest('released_at')->paginate(30);

        // Ventas por mes de este DJ (últimos 12 meses).
        $driver = config('database.default') === 'sqlite'
            ? "strftime('%Y-%m', orders.paid_at)"
            : "date_format(orders.paid_at, '%Y-%m')";

        $ventasMes = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->where('tracks.dj_id', $dj->id)
            ->where('orders.status', 'paid')
            ->where('orders.paid_at', '>=', now()->subMonths(11)->startOfMonth())
            ->selectRaw("$driver as periodo, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('periodo')->orderBy('periodo')->get();

        // Top de tracks vendidos de este DJ (histórico).
        $topTracks = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->where('tracks.dj_id', $dj->id)
            ->where('orders.status', 'paid')
            ->selectRaw('tracks.title as titulo, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos')
            ->groupBy('tracks.title')
            ->orderByDesc('ingresos')
            ->take(15)->get();

        return view('admin.djs.show', compact('dj', 'tracks', 'ventasMes', 'topTracks'));
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'bio'       => ['nullable', 'string', 'max:5000'],
            'image_url' => ['nullable', 'url', 'max:2000'],
        ]);
    }

    private function slugUnico(string $nombre): string
    {
        $base = Str::slug($nombre);
        $slug = $base !== '' ? $base : 'dj';
        $n = 1;
        while (Dj::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$n);
        }

        return $slug;
    }
}
