<?php

namespace App\Http\Controllers;

use App\Models\Playlist;

class PlaylistController extends Controller
{
    public function index()
    {
        return view('playlists.index', [
            'playlists' => Playlist::where('active', true)->withCount('tracks')->orderBy('name')->get(),
        ]);
    }

    public function show(Playlist $playlist)
    {
        abort_unless($playlist->active, 404);

        $tracks = $playlist->tracks()
            ->where('active', true)
            ->with(['dj', 'genre'])
            ->paginate(50);

        return view('playlists.show', compact('playlist', 'tracks'));
    }
}
