<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use Illuminate\Http\Request;

/**
 * Suscripciones prepagadas: el usuario elige plan y periodo (1, 3, 6 o
 * 12 meses), paga con Square o PayPal y el plan se activa solo al
 * confirmarse el pago, sumando los meses al vencimiento vigente.
 */
class SubscriptionController extends Controller
{
    public const MESES = [1, 3, 6, 12];

    public function plans(Request $request)
    {
        return view('plans.index', [
            'plans'      => Plan::where('active', true)->orderBy('price')->get(),
            'planActual' => $request->user()?->currentPlan(),
        ]);
    }

    /** Checkout de la suscripción (datos de facturación + método de pago). */
    public function subscribe(Request $request, Plan $plan)
    {
        abort_unless($plan->active, 404);

        $user = $request->user();

        // Planes gratuitos: se activan de inmediato, sin pago.
        if ((float) $plan->price <= 0) {
            $this->activar($user, $plan, 1);

            return redirect()->route('account')
                ->with('status', __('messages.sub_success', ['date' => $user->fresh()->plan_expires_at->format('d-m-Y')]));
        }

        $metodos = CheckoutPageController::metodos();
        if (empty($metodos)) {
            return redirect()->route('plans')->withErrors(['plan' => __('messages.sub_payments_off')]);
        }

        return view('plans.checkout', [
            'plan'    => $plan,
            'metodos' => $metodos,
            'user'    => $user,
            'meses'   => self::MESES,
        ]);
    }

    /** Crea el pedido de suscripción y envía al proveedor de pago. */
    public function subscribeStore(Request $request, Plan $plan)
    {
        abort_unless($plan->active, 404);

        $metodos = CheckoutPageController::metodos();

        $data = $request->validate([
            'nombre'   => ['required', 'string', 'max:120'],
            'email'    => ['required', 'email', 'max:190'],
            'telefono' => ['nullable', 'string', 'max:40'],
            'pais'     => ['nullable', 'string', 'max:80'],
            'metodo'   => ['required', 'in:' . implode(',', array_keys($metodos))],
            'meses'    => ['required', 'integer', 'in:' . implode(',', self::MESES)],
        ]);

        $mesesPlan = (int) $data['meses'];
        $subtotal  = round((float) $plan->price * $mesesPlan, 2);
        $taxPct    = $metodos[$data['metodo']]['tax'];
        $taxMonto  = round($subtotal * $taxPct / 100, 2);

        $order = Order::create([
            'user_id'          => $request->user()->id,
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

        $url = match ($data['metodo']) {
            'square' => app(SquareController::class)->iniciar($order),
            'paypal' => app(PayPalController::class)->iniciar($order),
            'stripe' => app(CheckoutController::class)->iniciar($order),
        };

        if (! $url) {
            $order->delete();

            return back()->withInput()->withErrors(['metodo' => __('messages.payment_error')]);
        }

        return redirect()->away($url);
    }

    /**
     * Portal de facturación de Stripe (solo cuando Stripe esté activo).
     */
    public function portal(Request $request)
    {
        if (! config('services.payments.stripe')) {
            return redirect()->route('account');
        }

        return $request->user()->redirectToBillingPortal(route('account'));
    }

    /** Activa o extiende un plan directamente (planes gratuitos). */
    private function activar($user, Plan $plan, int $meses): void
    {
        $base = ($user->plan_id == $plan->id && $user->plan_expires_at?->isFuture())
            ? $user->plan_expires_at
            : now();

        $user->update([
            'plan_id'         => $plan->id,
            'plan_expires_at' => $base->copy()->addMonths($meses),
        ]);
    }
}
