<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CheckoutPageController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\SquareController;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Track;
use Illuminate\Http\Request;

/**
 * Compras desde la app móvil: canciones y suscripciones.
 * El pago se hace en la página segura del proveedor (Square/PayPal):
 * la API crea el pedido y devuelve la URL; la app la abre en el
 * navegador y el plan o la compra se confirma al volver el pago.
 */
class PurchaseApiController extends Controller
{
    public function comprar(Request $request)
    {
        $metodos = CheckoutPageController::metodos();
        if (empty($metodos)) {
            return response()->json(['message' => 'Los pagos en línea no están configurados todavía.'], 422);
        }

        $data = $request->validate([
            'tracks'   => ['required', 'array', 'min:1', 'max:50'],
            'tracks.*' => ['integer'],
            'metodo'   => ['required', 'in:' . implode(',', array_keys($metodos))],
            'nombre'   => ['required', 'string', 'max:120'],
            'email'    => ['required', 'email', 'max:190'],
            'telefono' => ['nullable', 'string', 'max:40'],
            'pais'     => ['nullable', 'string', 'max:80'],
        ]);

        $tracks = Track::active()->whereIn('id', $data['tracks'])->get();
        if ($tracks->isEmpty()) {
            return response()->json(['message' => 'Las canciones seleccionadas ya no están disponibles.'], 422);
        }

        $subtotal = round($tracks->sum(fn ($t) => (float) $t->price), 2);
        $taxPct   = $metodos[$data['metodo']]['tax'];
        $taxMonto = round($subtotal * $taxPct / 100, 2);

        $order = Order::create([
            'user_id'          => $request->user()->id,
            'status'           => 'pending',
            'subtotal'         => $subtotal,
            'tax_pct'          => $taxPct,
            'tax_amount'       => $taxMonto,
            'total'            => round($subtotal + $taxMonto, 2),
            'currency'         => 'usd',
            'payment_method'   => $data['metodo'],
            'payment_title'    => $metodos[$data['metodo']]['titulo'],
            'customer_name'    => $data['nombre'],
            'customer_email'   => $data['email'],
            'customer_phone'   => $data['telefono'] ?? null,
            'customer_country' => $data['pais'] ?? null,
        ]);

        foreach ($tracks as $track) {
            $order->items()->create([
                'track_id' => $track->id,
                'name'     => $track->title,
                'price'    => $track->price,
                'quantity' => 1,
            ]);
        }

        $url = $this->urlDePago($data['metodo'], $order);
        if (! $url) {
            $order->items()->delete();
            $order->delete();

            return response()->json(['message' => 'No se pudo iniciar el pago. Intenta de nuevo.'], 502);
        }

        return response()->json(['pedido' => $order->id, 'url' => $url]);
    }

    public function suscribirme(Request $request)
    {
        $metodos = CheckoutPageController::metodos();

        $data = $request->validate([
            'plan_id'  => ['required', 'integer', 'exists:plans,id'],
            'meses'    => ['required', 'integer', 'in:1,3,6,12'],
            'metodo'   => ['nullable', 'string'],
            'nombre'   => ['required', 'string', 'max:120'],
            'email'    => ['required', 'email', 'max:190'],
            'telefono' => ['nullable', 'string', 'max:40'],
            'pais'     => ['nullable', 'string', 'max:80'],
        ]);

        $plan = Plan::where('active', true)->findOrFail((int) $data['plan_id']);
        $user = $request->user();

        // Planes gratuitos: activación inmediata.
        if ((float) $plan->price <= 0) {
            $base = ($user->plan_id == $plan->id && $user->plan_expires_at?->isFuture()) ? $user->plan_expires_at : now();
            $user->update(['plan_id' => $plan->id, 'plan_expires_at' => $base->copy()->addMonths(1)]);

            return response()->json(['activado' => true, 'vence' => $user->plan_expires_at->toDateString()]);
        }

        if (empty($metodos) || ! isset($metodos[$data['metodo'] ?? ''])) {
            return response()->json(['message' => 'Elige un método de pago válido.'], 422);
        }

        $mesesPlan = (int) $data['meses'];
        $subtotal  = round((float) $plan->price * $mesesPlan, 2);
        $taxPct    = $metodos[$data['metodo']]['tax'];
        $taxMonto  = round($subtotal * $taxPct / 100, 2);

        $order = Order::create([
            'user_id'          => $user->id,
            'plan_id'          => $plan->id,
            'plan_months'      => $mesesPlan,
            'status'           => 'pending',
            'subtotal'         => $subtotal,
            'tax_pct'          => $taxPct,
            'tax_amount'       => $taxMonto,
            'total'            => round($subtotal + $taxMonto, 2),
            'currency'         => 'usd',
            'payment_method'   => $data['metodo'],
            'payment_title'    => $metodos[$data['metodo']]['titulo'],
            'customer_name'    => $data['nombre'],
            'customer_email'   => $data['email'],
            'customer_phone'   => $data['telefono'] ?? null,
            'customer_country' => $data['pais'] ?? null,
        ]);

        $url = $this->urlDePago($data['metodo'], $order);
        if (! $url) {
            $order->delete();

            return response()->json(['message' => 'No se pudo iniciar el pago. Intenta de nuevo.'], 502);
        }

        return response()->json(['pedido' => $order->id, 'url' => $url]);
    }

    /** Estado de un pedido (la app consulta al volver del navegador). */
    public function pedido(Request $request, Order $order)
    {
        abort_unless($order->user_id === $request->user()->id, 404);

        return response()->json([
            'id'     => $order->id,
            'estado' => $order->status,
            'total'  => (float) $order->total,
        ]);
    }

    /** Entrega la URL de descarga si el usuario tiene derecho (compra o plan). */
    public function descargar(Request $request, Track $track)
    {
        $user = $request->user();

        if (! $track->file_url) {
            return response()->json(['message' => 'Este archivo no está disponible.'], 404);
        }

        $porCompra = $user->hasPurchased($track);

        if (! $porCompra) {
            $plan = $user->currentPlan();
            if (! $plan) {
                return response()->json(['message' => 'Necesitas comprar la canción o tener una suscripción activa.'], 403);
            }
            if ($user->downloadsRemaining() <= 0) {
                return response()->json(['message' => 'Alcanzaste el límite de descargas de tu plan este mes.'], 403);
            }
            $user->downloads()->create(['track_id' => $track->id]);
        }

        return response()->json(['url' => $track->file_url]);
    }

    private function urlDePago(string $metodo, Order $order): ?string
    {
        return match ($metodo) {
            'square' => app(SquareController::class)->iniciar($order),
            'paypal' => app(PayPalController::class)->iniciar($order),
            'stripe' => app(CheckoutController::class)->iniciar($order),
            default  => null,
        };
    }
}
