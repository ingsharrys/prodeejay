<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

/**
 * Carrito en sesión: [track_id => true]
 */
class CartController extends Controller
{
    public function index(Request $request)
    {
        $tracks = Track::whereIn('id', array_keys($request->session()->get('cart', [])))->get();

        return view('cart.index', [
            'tracks' => $tracks,
            'total'  => $tracks->sum('price'),
        ]);
    }

    public function add(Request $request, Track $track)
    {
        $cart = $request->session()->get('cart', []);
        $cart[$track->id] = true;
        $request->session()->put('cart', $cart);

        if ($request->wantsJson()) {
            return response()->json(['count' => count($cart)]);
        }

        return back()->with('status', __('messages.added_to_cart'));
    }

    public function remove(Request $request, Track $track)
    {
        $cart = $request->session()->get('cart', []);
        unset($cart[$track->id]);
        $request->session()->put('cart', $cart);

        return back();
    }

    public function count(Request $request)
    {
        return response()->json(['count' => count($request->session()->get('cart', []))]);
    }
}
