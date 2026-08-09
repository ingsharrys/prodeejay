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
        try {
            $respuesta = Http::asForm()
                ->withBasicAuth(config('services.paypal.client_id'), config('services.paypal.secret'))
                ->post($this->baseUrl() . '/v1/oauth2/token', ['grant_type' => 'client_credentials']);
        } catch (\Throwable $e) {
            report($e);

            return null;
        }

        return $respuesta->successful() ? $respuesta->json('access_token') : null;
    }

    /**
     * Ruta antigua: ahora el flujo pasa por el checkout con facturación.
     */
    public function checkout(Request $request)
    {
        return redirect()->route('checkout.page');
    }

    /**
     * Crea la orden en PayPal para un pedido ya calculado, con el
     * desglose subtotal + impuesto. Devuelve la URL de aprobación.
     */
    public function iniciar(Order $order): ?string
    {
        if (! config('services.paypal.client_id')) {
            return null;
        }

        $token = $this->accessToken();
        if (! $token) {
            return null;
        }

        $subtotal = number_format((float) ($order->subtotal ?? $order->total), 2, '.', '');
        $impuesto = number_format((float) $order->tax_amount, 2, '.', '');
        $total    = number_format((float) $order->total, 2, '.', '');

        $amount = ['currency_code' => 'USD', 'value' => $total];
        if ((float) $impuesto > 0) {
            $amount['breakdown'] = [
                'item_total' => ['currency_code' => 'USD', 'value' => $subtotal],
                'tax_total'  => ['currency_code' => 'USD', 'value' => $impuesto],
            ];
        }

        try {
            $respuesta = Http::withToken($token)->post($this->baseUrl() . '/v2/checkout/orders', [
                'intent'         => 'CAPTURE',
                'purchase_units' => [[
                    'reference_id' => (string) $order->id,
                    'description'  => 'Prodeejay Remix — ' . $order->items()->count() . ' track(s)',
                    'amount'       => $amount,
                ]],
                'application_context' => [
                    'brand_name'  => 'Prodeejay Remix',
                    'user_action' => 'PAY_NOW',
                    'return_url'  => route('paypal.return'),
                    'cancel_url'  => route('checkout.page'),
                ],
            ]);
        } catch (\Throwable $e) {
            report($e);
            $respuesta = null;
        }

        if (! $respuesta || ! $respuesta->successful()) {
            return null;
        }

        $order->update(['paypal_order_id' => $respuesta->json('id')]);

        $aprobacion = collect($respuesta->json('links', []))->firstWhere('rel', 'approve');

        return $aprobacion['href'] ?? null;
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
            try {
                $captura = $token
                    ? Http::withToken($token)->withBody('', 'application/json')
                        ->post($this->baseUrl() . "/v2/checkout/orders/{$paypalOrderId}/capture")
                    : null;
            } catch (\Throwable $e) {
                report($e);
                $captura = null;
            }

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
