<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Playlist;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PlaylistAdminController extends Controller
{
    public function index()
    {
        return view('admin.playlists.index', [
            'playlists' => Playlist::withCount('tracks')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $base = Str::slug($data['name']);
        $slug = $base !== '' ? $base : 'playlist';
        $n = 1;
        while (Playlist::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$n);
        }

        $playlist = Playlist::create($data + ['slug' => $slug, 'active' => true]);

        return redirect()->route('admin.playlists.edit', $playlist)->with('status', 'Playlist creada. Ahora agrega canciones.');
    }

    public function edit(Request $request, Playlist $playlist)
    {
        $busqueda = trim((string) $request->query('buscar'));

        $resultados = collect();
        if ($busqueda !== '') {
            $enPlaylist = $playlist->tracks()->pluck('tracks.id');
            $resultados = Track::active()
                ->search($busqueda)
                ->whereNotIn('id', $enPlaylist)
                ->with('dj')
                ->take(20)->get();
        }

        return view('admin.playlists.edit', [
            'playlist'   => $playlist,
            'tracks'     => $playlist->tracks()->with('dj')->get(),
            'busqueda'   => $busqueda,
            'resultados' => $resultados,
        ]);
    }

    public function update(Request $request, Playlist $playlist)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);
        $data['active'] = $request->boolean('active');
        $playlist->update($data);

        return back()->with('status', 'Playlist actualizada.');
    }

    public function addTrack(Playlist $playlist, Track $track)
    {
        $posicion = (int) $playlist->tracks()->max('position') + 1;
        $playlist->tracks()->syncWithoutDetaching([$track->id => ['position' => $posicion]]);

        return back()->with('status', 'Canción agregada.');
    }

    public function removeTrack(Playlist $playlist, Track $track)
    {
        $playlist->tracks()->detach($track->id);

        return back()->with('status', 'Canción quitada.');
    }

    public function destroy(Playlist $playlist)
    {
        $playlist->delete();

        return redirect()->route('admin.playlists')->with('status', 'Playlist eliminada.');
    }
}
