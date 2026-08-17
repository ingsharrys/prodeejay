<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/** Cuenta del cliente en la app: plan, descargas y compras. */
class AccountApiController extends Controller
{
    public function miCuenta(Request $request)
    {
        $user = $request->user();
        $plan = $user->currentPlan();

        $compras = $user->orders()->where('status', 'paid')
            ->with(['items.track', 'plan'])
            ->latest()->take(30)->get()
            ->map(function ($orden) {
                if ($orden->esSuscripcion()) {
                    return [
                        'tipo'  => 'suscripcion',
                        'fecha' => $orden->paid_at?->toDateString(),
                        'plan'  => $orden->plan?->name,
                        'meses' => (int) $orden->plan_months,
                        'total' => (float) $orden->total,
                    ];
                }

                return [
                    'tipo'   => 'compra',
                    'fecha'  => $orden->paid_at?->toDateString(),
                    'total'  => (float) $orden->total,
                    'tracks' => $orden->items->map(fn ($i) => [
                        'id'     => $i->track_id,
                        'titulo' => $i->name,
                        'precio' => (float) $i->price,
                    ])->values(),
                ];
            })->values();

        return response()->json([
            'usuario' => ['id' => $user->id, 'nombre' => $user->name, 'email' => $user->email],
            'plan'    => $plan ? [
                'id'        => $plan->id,
                'nombre'    => $plan->name,
                'por_mes'   => (int) $plan->downloads_per_month,
                'restantes' => (int) $user->downloadsRemaining(),
                'vence'     => $user->plan_expires_at?->toDateString(),
            ] : null,
            'compras' => $compras,
        ]);
    }
}
