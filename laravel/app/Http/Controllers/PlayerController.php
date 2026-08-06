<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Track;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function index(Request $request, ?string $type = null)
    {
        $tracks = Track::active()
            ->with(['dj', 'genre'])
            ->search($request->query('q'))
            ->when($type, fn ($q) => $q->where('type', $type))
            ->when($request->query('genre'), function ($q, $slug) {
                $q->whereHas('genre', fn ($g) => $g->where('slug', $slug));
            })
            ->latest('released_at')
            ->paginate(50)
            ->withQueryString();

        return view('player.index', [
            'tracks' => $tracks,
            'genres' => Genre::orderBy('name')->get(),
            'type'   => $type,
        ]);
    }
}
