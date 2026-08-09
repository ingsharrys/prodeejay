<?php

namespace App\Http\Controllers;

use App\Models\Dj;
use App\Models\Genre;
use App\Models\Plan;
use App\Models\Track;

class HomeController extends Controller
{
    public function index()
    {
        // Portada configurable desde el CMS (Admin → Páginas).
        $homeId = (int) \App\Models\Setting::get('home_page_id', 0);
        if ($homeId > 0) {
            $pagina = \App\Models\Page::where('id', $homeId)->where('active', true)->first();
            if ($pagina) {
                return view('pages.show', ['page' => $pagina]);
            }
        }

        return view('home', [
            'genres'  => Genre::withCount('tracks')->orderByDesc('tracks_count')->take(10)->get(),
            'djs'     => Dj::where('active', true)->withCount('tracks')->orderByDesc('tracks_count')->take(8)->get(),
            'ultimos' => Track::active()->latest('released_at')->take(8)->get(),
            'plans'   => Plan::where('active', true)->orderBy('price')->get(),
        ]);
    }
}
