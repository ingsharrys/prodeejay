<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function plans()
    {
        return view('plans.index', [
            'plans' => Plan::where('active', true)->orderBy('price')->get(),
        ]);
    }

    public function subscribe(Request $request, Plan $plan)
    {
        // Las suscripciones usan Stripe; mientras esté apagado se avisa.
        if (! config('services.payments.stripe')) {
            return back()->withErrors(['plan' => __('messages.subs_coming_soon')]);
        }

        if (! $plan->stripe_price_id) {
            return back()->withErrors(['plan' => __('messages.plan_not_ready')]);
        }

        $user = $request->user();

        if ($user->subscribed('default')) {
            return redirect()->route('account');
        }

        return $user->newSubscription('default', $plan->stripe_price_id)
            ->checkout([
                'success_url' => route('account'),
                'cancel_url'  => route('plans'),
            ]);
    }

    /**
     * Portal de facturación de Stripe (cambiar tarjeta, cancelar, facturas).
     */
    public function portal(Request $request)
    {
        return $request->user()->redirectToBillingPortal(route('account'));
    }
}
