<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

/**
 * Pagos únicos con PayPal (REST API v2, sin SDK).
 *
 * Configuración en .env:
 *   PAYPAL_CLIENT_ID=...
 *   PAYPAL_SECRET=...
 *   PAYPAL_MODE=sandbox   (o live)
 */
class PayPalController extends Controller
{
    private function baseUrl(): string
    {
        return config('services.paypal.mode') === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';
    }

    private function accessToken(): ?string
    {
        $respuesta = Http::asForm()
            ->withBasicAuth(config('services.paypal.client_id'), config('services.paypal.secret'))
            ->post($this->baseUrl() . '/v1/oauth2/token', ['grant_type' => 'client_credentials']);

        return $respuesta->successful() ? $respuesta->json('access_token') : null;
    }

    /**
     * Crea la orden en PayPal y redirige a la página de aprobación.
     */
    public function checkout(Request $request)
    {
        if (! config('services.paypal.client_id')) {
            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.paypal_not_configured')]);
        }

        $trackIds = array_keys($request->session()->get('cart', []));
        $tracks = Track::whereIn('id', $trackIds)->where('price', '>', 0)->get();

        if ($tracks->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $token = $this->accessToken();
        if (! $token) {
            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.paypal_error')]);
        }

        $total = number_format((float) $tracks->sum('price'), 2, '.', '');

        $order = Order::create([
            'user_id'        => $request->user()->id,
            'status'         => 'pending',
            'total'          => $total,
            'currency'       => 'usd',
            'payment_method' => 'paypal',
        ]);
        foreach ($tracks as $track) {
            $order->items()->create([
                'track_id' => $track->id,
                'name'     => $track->title,
                'price'    => $track->price,
            ]);
        }

        $respuesta = Http::withToken($token)->post($this->baseUrl() . '/v2/checkout/orders', [
            'intent'         => 'CAPTURE',
            'purchase_units' => [[
                'reference_id' => (string) $order->id,
                'description'  => 'Prodeejay Remix — ' . $tracks->count() . ' track(s)',
                'amount'       => ['currency_code' => 'USD', 'value' => $total],
            ]],
            'application_context' => [
                'brand_name'  => 'Prodeejay Remix',
                'user_action' => 'PAY_NOW',
                'return_url'  => route('paypal.return'),
                'cancel_url'  => route('cart.index'),
            ],
        ]);

        if (! $respuesta->successful()) {
            $order->delete();

            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.paypal_error')]);
        }

        $order->update(['paypal_order_id' => $respuesta->json('id')]);

        $aprobacion = collect($respuesta->json('links', []))->firstWhere('rel', 'approve');
        if (! $aprobacion) {
            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.paypal_error')]);
        }

        return redirect()->away($aprobacion['href']);
    }

    /**
     * Vuelta desde PayPal: captura el pago y confirma el pedido.
     */
    public function return(Request $request)
    {
        $paypalOrderId = (string) $request->query('token');
        $order = Order::where('paypal_order_id', $paypalOrderId)->first();

        if (! $order) {
            return redirect()->route('cart.index');
        }

        if ($order->status === 'pending') {
            $token = $this->accessToken();
            $captura = $token
                ? Http::withToken($token)->withBody('', 'application/json')
                    ->post($this->baseUrl() . "/v2/checkout/orders/{$paypalOrderId}/capture")
                : null;

            $estado = $captura?->json('status');
            if ($estado === 'COMPLETED' || ($captura && $captura->json('details.0.issue') === 'ORDER_ALREADY_CAPTURED')) {
                $order->update(['status' => 'paid', 'paid_at' => now()]);
                $request->session()->forget('cart');
            } else {
                return redirect()->route('cart.index')->withErrors(['pago' => __('messages.paypal_error')]);
            }
        }

        return view('cart.success');
    }
}
