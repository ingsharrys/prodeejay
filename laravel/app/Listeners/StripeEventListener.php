<?php

namespace App\Listeners;

use App\Models\Order;
use Laravel\Cashier\Events\WebhookReceived;

/**
 * Confirma los pedidos de compra única cuando Stripe notifica el pago.
 * (Las suscripciones las gestiona Cashier automáticamente.)
 */
class StripeEventListener
{
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] !== 'checkout.session.completed') {
            return;
        }

        $session = $event->payload['data']['object'] ?? [];
        if (($session['payment_status'] ?? '') !== 'paid') {
            return;
        }

        $order = Order::where('stripe_session_id', $session['id'] ?? '')->first();
        if ($order && $order->status === 'pending') {
            $order->update([
                'status'                => 'paid',
                'paid_at'               => now(),
                'stripe_payment_intent' => (string) ($session['payment_intent'] ?? ''),
            ]);
        }
    }
}
