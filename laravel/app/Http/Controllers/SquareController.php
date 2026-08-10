<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/**
 * Pagos con tarjeta vía Square Checkout (páginas de pago alojadas por
 * Square, sin manejar datos de tarjeta en el sitio).
 *
 * Configuración en .env:
 *   SQUARE_ACCESS_TOKEN=...
 *   SQUARE_LOCATION_ID=...
 *   SQUARE_MODE=sandbox   (o live)
 */
class SquareController extends Controller
{
    private function baseUrl(): string
    {
        return config('services.square.mode') === 'live'
            ? 'https://connect.squareup.com'
            : 'https://connect.squareupsandbox.com';
    }

    private function api()
    {
        return Http::withToken(config('services.square.access_token'))
            ->withHeaders(['Square-Version' => '2025-01-23']);
    }

    /**
     * Ruta antigua: ahora el flujo pasa por el checkout con facturación.
     */
    public function checkout(Request $request)
    {
        return redirect()->route('checkout.page');
    }

    /**
     * Crea el enlace de pago de Square para un pedido ya calculado
     * (total con impuestos). Devuelve la URL de pago o null si falla.
     */
    public function iniciar(Order $order): ?string
    {
        if (! config('services.square.access_token') || ! config('services.square.location_id')) {
            return null;
        }

        $nombre = $order->esSuscripcion()
            ? 'Prodeejay Remix — Suscripción ' . ($order->plan?->name ?? '') . ' × ' . $order->plan_months . ' mes(es)'
            : 'Prodeejay Remix — ' . $order->items()->count() . ' track(s)';
        if ((float) $order->tax_amount > 0) {
            $nombre .= ' (incluye impuesto)';
        }

        try {
            $respuesta = $this->api()->post($this->baseUrl() . '/v2/online-checkout/payment-links', [
                'idempotency_key' => (string) Str::uuid(),
                'quick_pay' => [
                    'name'        => $nombre,
                    'price_money' => [
                        'amount'   => (int) round((float) $order->total * 100),
                        'currency' => 'USD',
                    ],
                    'location_id' => config('services.square.location_id'),
                ],
                'checkout_options' => [
                    'redirect_url' => route('square.return'),
                ],
            ]);
        } catch (\Throwable $e) {
            report($e);
            $respuesta = null;
        }

        if (! $respuesta || ! $respuesta->successful()) {
            return null;
        }

        $order->update(['square_order_id' => $respuesta->json('payment_link.order_id')]);

        return $respuesta->json('payment_link.url');
    }

    /**
     * Vuelta desde Square: verifica el pago del pedido y lo confirma.
     */
    public function return(Request $request)
    {
        $squareOrderId = (string) $request->query('orderId');
        $order = Order::where('square_order_id', $squareOrderId)->first();

        if (! $order) {
            return redirect()->route('cart.index');
        }

        if ($order->status === 'pending') {
            try {
                $consulta = $this->api()->get($this->baseUrl() . '/v2/orders/' . $squareOrderId);
            } catch (\Throwable $e) {
                report($e);
                $consulta = null;
            }

            $pagado = $consulta && $consulta->successful()
                && in_array($consulta->json('order.state'), ['COMPLETED', 'OPEN'], true)
                && collect($consulta->json('order.tenders', []))->isNotEmpty();

            if (! $pagado) {
                $ruta = $order->esSuscripcion() ? 'plans' : 'cart.index';

                return redirect()->route($ruta)->withErrors(['pago' => __('messages.square_error')]);
            }

            $order->marcarPagada();
            if (! $order->esSuscripcion()) {
                $request->session()->forget('cart');
            }
        }

        if ($order->esSuscripcion()) {
            return redirect()->route('account')
                ->with('status', __('messages.sub_success', ['date' => $order->user?->plan_expires_at?->format('d-m-Y')]));
        }

        return view('cart.success');
    }
}
