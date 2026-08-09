<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

/**
 * Configuración de impuestos por método de pago.
 */
class TaxAdminController extends Controller
{
    public function index()
    {
        return view('admin.taxes.index', [
            'square' => (float) Setting::get('tax_square_pct', 0),
            'paypal' => (float) Setting::get('tax_paypal_pct', 0),
            'stripe' => (float) Setting::get('tax_stripe_pct', 0),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'square' => ['required', 'numeric', 'min:0', 'max:50'],
            'paypal' => ['required', 'numeric', 'min:0', 'max:50'],
            'stripe' => ['required', 'numeric', 'min:0', 'max:50'],
        ]);

        Setting::set('tax_square_pct', $data['square']);
        Setting::set('tax_paypal_pct', $data['paypal']);
        Setting::set('tax_stripe_pct', $data['stripe']);

        return back()->with('status', 'Impuestos actualizados. Se aplican a las compras nuevas de inmediato.');
    }
}
