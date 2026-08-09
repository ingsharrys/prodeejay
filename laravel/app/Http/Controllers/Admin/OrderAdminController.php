<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

/**
 * Listado de pedidos con cliente, método de pago y detalle de artículos.
 */
class OrderAdminController extends Controller
{
    public function index(Request $request)
    {
        $desde = $request->query('desde');
        $hasta = $request->query('hasta');
        $busca = trim((string) $request->query('q'));

        $orders = Order::with(['items.track.dj', 'user'])
            ->where('status', '!=', 'pending')
            ->when($desde, fn ($q) => $q->where('paid_at', '>=', "{$desde} 00:00:00"))
            ->when($hasta, fn ($q) => $q->where('paid_at', '<=', "{$hasta} 23:59:59"))
            ->when($busca !== '', function ($q) use ($busca) {
                $q->where(function ($w) use ($busca) {
                    $w->where('customer_name', 'like', "%{$busca}%")
                        ->orWhere('customer_email', 'like', "%{$busca}%")
                        ->orWhereHas('user', function ($u) use ($busca) {
                            $u->where('name', 'like', "%{$busca}%")->orWhere('email', 'like', "%{$busca}%");
                        });
                });
            })
            ->latest('paid_at')
            ->paginate(30)
            ->withQueryString();

        return view('admin.orders.index', compact('orders', 'desde', 'hasta', 'busca'));
    }
}
