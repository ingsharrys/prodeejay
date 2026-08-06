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
        return view('home', [
            'genres'  => Genre::withCount('tracks')->orderByDesc('tracks_count')->take(10)->get(),
            'djs'     => Dj::withCount('tracks')->orderByDesc('tracks_count')->take(8)->get(),
            'ultimos' => Track::active()->latest('released_at')->take(8)->get(),
            'plans'   => Plan::where('active', true)->orderBy('price')->get(),
        ]);
    }
}
