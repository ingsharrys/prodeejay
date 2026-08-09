<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Track;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Ruta antigua: ahora el flujo pasa por el checkout con facturación.
     */
    public function checkout(Request $request)
    {
        return redirect()->route('checkout.page');
    }

    /**
     * Crea la sesión de Stripe Checkout para un pedido ya calculado,
     * con el impuesto como línea aparte. Devuelve la URL de pago.
     */
    public function iniciar(Order $order): ?string
    {
        if (! config('services.payments.stripe') || ! config('cashier.secret')) {
            return null;
        }

        $moneda = config('cashier.currency', 'usd');

        $lineas = $order->items->map(fn ($item) => [
            'price_data' => [
                'currency'     => $moneda,
                'unit_amount'  => (int) round((float) $item->price * 100),
                'product_data' => ['name' => $item->name],
            ],
            'quantity' => (int) $item->quantity,
        ])->all();

        if ((float) $order->tax_amount > 0) {
            $lineas[] = [
                'price_data' => [
                    'currency'     => $moneda,
                    'unit_amount'  => (int) round((float) $order->tax_amount * 100),
                    'product_data' => ['name' => 'Impuesto (' . rtrim(rtrim(number_format((float) $order->tax_pct, 3), '0'), '.') . '%)'],
                ],
                'quantity' => 1,
            ];
        }

        try {
            $session = $order->user->checkout($lineas, [
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url'  => route('checkout.page'),
                'metadata'    => ['order_id' => $order->id],
            ]);
        } catch (\Throwable $e) {
            report($e);

            return null;
        }

        $order->update(['stripe_session_id' => $session->id]);

        return $session->url;
    }

    /**
     * Vuelta desde Stripe. La confirmación definitiva llega por webhook,
     * pero verificamos aquí también para dar acceso inmediato.
     */
    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');

        if ($sessionId) {
            $order = Order::where('stripe_session_id', $sessionId)->first();
            if ($order && $order->status === 'pending') {
                $session = \Laravel\Cashier\Cashier::stripe()->checkout->sessions->retrieve($sessionId);
                if ($session->payment_status === 'paid') {
                    $order->update([
                        'status'                => 'paid',
                        'paid_at'               => now(),
                        'stripe_payment_intent' => (string) $session->payment_intent,
                    ]);
                    $request->session()->forget('cart');
                }
            }
        }

        return view('cart.success');
    }
}
