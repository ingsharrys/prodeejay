<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Track;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $inicioMes = now()->startOfMonth();

        $ingresosMes = (float) OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.status', 'paid')
            ->where('orders.paid_at', '>=', $inicioMes)
            ->selectRaw('coalesce(sum(order_items.price * order_items.quantity), 0) as total')
            ->value('total');

        $unidadesMes = (int) OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.status', 'paid')
            ->where('orders.paid_at', '>=', $inicioMes)
            ->sum('order_items.quantity');

        return view('admin.dashboard', [
            'ingresosMes'  => $ingresosMes,
            'unidadesMes'  => $unidadesMes,
            'pedidosMes'   => Order::where('status', 'paid')->where('paid_at', '>=', $inicioMes)->count(),
            'totalTracks'  => Track::count(),
            'totalDjs'     => Dj::where('active', true)->count(),
            'totalUsuarios' => User::count(),
            'ultimosPedidos' => Order::where('status', 'paid')->with(['user', 'items'])->latest('paid_at')->take(10)->get(),
        ]);
    }
}
