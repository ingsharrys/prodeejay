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
     * Crea el enlace de pago de Square y redirige a su página de pago.
     */
    public function checkout(Request $request)
    {
        if (! config('services.square.access_token') || ! config('services.square.location_id')) {
            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.square_not_configured')]);
        }

        $trackIds = array_keys($request->session()->get('cart', []));
        $tracks = Track::whereIn('id', $trackIds)->where('price', '>', 0)->get();

        if ($tracks->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $total = (float) $tracks->sum('price');

        $order = Order::create([
            'user_id'        => $request->user()->id,
            'status'         => 'pending',
            'total'          => $total,
            'currency'       => 'usd',
            'payment_method' => 'square',
            'payment_title'  => 'Tarjeta (Square)',
            'customer_name'  => $request->user()->name,
            'customer_email' => $request->user()->email,
        ]);
        foreach ($tracks as $track) {
            $order->items()->create([
                'track_id' => $track->id,
                'name'     => $track->title,
                'price'    => $track->price,
            ]);
        }

        try {
            $respuesta = $this->api()->post($this->baseUrl() . '/v2/online-checkout/payment-links', [
                'idempotency_key' => (string) Str::uuid(),
                'quick_pay' => [
                    'name'        => 'Prodeejay Remix — ' . $tracks->count() . ' track(s)',
                    'price_money' => [
                        'amount'   => (int) round($total * 100),
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
            $order->delete();

            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.square_error')]);
        }

        $order->update(['square_order_id' => $respuesta->json('payment_link.order_id')]);

        return redirect()->away($respuesta->json('payment_link.url'));
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
                return redirect()->route('cart.index')->withErrors(['pago' => __('messages.square_error')]);
            }

            $order->update(['status' => 'paid', 'paid_at' => now()]);
            $request->session()->forget('cart');
        }

        return view('cart.success');
    }
}
