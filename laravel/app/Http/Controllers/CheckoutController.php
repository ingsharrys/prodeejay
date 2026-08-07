<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Track;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Crea la sesión de pago de Stripe Checkout con el carrito.
     */
    public function checkout(Request $request)
    {
        // Stripe está apagado por ahora (interruptor PAYMENT_STRIPE).
        if (! config('services.payments.stripe')) {
            return redirect()->route('cart.index')->withErrors(['pago' => __('messages.stripe_disabled')]);
        }

        $trackIds = array_keys($request->session()->get('cart', []));
        $tracks = Track::whereIn('id', $trackIds)->where('price', '>', 0)->get();

        if ($tracks->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $user = $request->user();

        // Pedido local en estado pendiente.
        $order = Order::create([
            'user_id'  => $user->id,
            'status'   => 'pending',
            'total'    => $tracks->sum('price'),
            'currency' => config('cashier.currency', 'usd'),
        ]);
        foreach ($tracks as $track) {
            $order->items()->create([
                'track_id' => $track->id,
                'name'     => $track->title,
                'price'    => $track->price,
            ]);
        }

        $session = $user->checkout(
            $tracks->map(fn (Track $t) => [
                'price_data' => [
                    'currency'     => config('cashier.currency', 'usd'),
                    'unit_amount'  => (int) round($t->price * 100),
                    'product_data' => ['name' => $t->title],
                ],
                'quantity' => 1,
            ])->all(),
            [
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url'  => route('cart.index'),
                'metadata'    => ['order_id' => $order->id],
            ]
        );

        $order->update(['stripe_session_id' => $session->id]);

        return redirect($session->url);
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
