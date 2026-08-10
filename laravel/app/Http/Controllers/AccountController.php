<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return view('account.index', [
            'user'      => $user,
            'plan'      => $user->currentPlan(),
            'restantes' => $user->downloadsRemaining(),
            'compras'   => $user->orders()->where('status', 'paid')->with(['items.track', 'plan'])->latest()->take(20)->get(),
        ]);
    }

    public function setLocale(Request $request, string $locale)
    {
        abort_unless(in_array($locale, ['es', 'en'], true), 404);

        $request->session()->put('locale', $locale);
        $request->user()?->update(['locale' => $locale]);

        return back();
    }
}
