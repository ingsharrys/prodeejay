<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Setting;
use App\Models\Track;
use Illuminate\Http\Request;

/**
 * Checkout profesional: datos de facturación, desglose de subtotal +
 * impuesto según el método de pago, y despacho al proveedor.
 */
class CheckoutPageController extends Controller
{
    /**
     * Métodos de pago disponibles con su tasa de impuesto.
     */
    public static function metodos(): array
    {
        $metodos = [];
        if (config('services.square.access_token') && config('services.square.location_id')) {
            $metodos['square'] = ['titulo' => 'Tarjeta (Square)', 'icono' => 'fas fa-credit-card', 'tax' => (float) Setting::get('tax_square_pct', 0)];
        }
        if (config('services.paypal.client_id')) {
            $metodos['paypal'] = ['titulo' => 'PayPal', 'icono' => 'fab fa-paypal', 'tax' => (float) Setting::get('tax_paypal_pct', 0)];
        }
        if (config('services.payments.stripe') && config('cashier.secret')) {
            $metodos['stripe'] = ['titulo' => 'Stripe', 'icono' => 'fab fa-stripe', 'tax' => (float) Setting::get('tax_stripe_pct', 0)];
        }

        return $metodos;
    }

    public function show(Request $request)
    {
        $tracks = Track::whereIn('id', array_keys($request->session()->get('cart', [])))
            ->where('price', '>', 0)->with('dj')->get();

        if ($tracks->isEmpty()) {
            return redirect()->route('cart.index');
        }

        return view('cart.checkout', [
            'tracks'   => $tracks,
            'subtotal' => (float) $tracks->sum('price'),
            'metodos'  => self::metodos(),
            'user'     => $request->user(),
        ]);
    }

    public function store(Request $request)
    {
        $metodos = self::metodos();

        $data = $request->validate([
            'nombre'   => ['required', 'string', 'max:120'],
            'email'    => ['required', 'email', 'max:190'],
            'telefono' => ['nullable', 'string', 'max:40'],
            'pais'     => ['nullable', 'string', 'max:80'],
            'metodo'   => ['required', 'in:' . implode(',', array_keys($metodos))],
        ]);

        $tracks = Track::whereIn('id', array_keys($request->session()->get('cart', [])))
            ->where('price', '>', 0)->get();

        if ($tracks->isEmpty()) {
            return redirect()->route('cart.index');
        }

        // Cálculo contable: subtotal + impuesto del método = total.
        $subtotal = round((float) $tracks->sum('price'), 2);
        $taxPct   = $metodos[$data['metodo']]['tax'];
        $taxMonto = round($subtotal * $taxPct / 100, 2);
        $total    = round($subtotal + $taxMonto, 2);

        $order = Order::create([
            'user_id'          => $request->user()->id,
            'status'           => 'pending',
            'subtotal'         => $subtotal,
            'tax_pct'          => $taxPct,
            'tax_amount'       => $taxMonto,
            'total'            => $total,
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
            ]);
        }

        // Despachar al proveedor elegido.
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
}
