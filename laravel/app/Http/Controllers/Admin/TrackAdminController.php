<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\Genre;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrackAdminController extends Controller
{
    public function index(Request $request)
    {
        $tracks = Track::with(['dj', 'genre'])
            ->search($request->query('q'))
            ->latest('created_at')
            ->paginate(30)
            ->withQueryString();

        return view('admin.tracks.index', compact('tracks'));
    }

    public function create()
    {
        return view('admin.tracks.form', [
            'track'  => new Track(['type' => 'audio', 'price' => 1.99, 'active' => true]),
            'djs'    => Dj::orderBy('name')->get(),
            'genres' => Genre::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->slugUnico($data['title']);
        Track::create($data);

        return redirect()->route('admin.tracks')->with('status', 'Track creado.');
    }

    public function edit(Track $track)
    {
        return view('admin.tracks.form', [
            'track'  => $track,
            'djs'    => Dj::orderBy('name')->get(),
            'genres' => Genre::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Track $track)
    {
        $track->update($this->validated($request));

        return redirect()->route('admin.tracks')->with('status', 'Track actualizado.');
    }

    public function destroy(Track $track)
    {
        $track->delete();

        return redirect()->route('admin.tracks')->with('status', 'Track eliminado.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'type'        => ['required', 'in:audio,video,pack,set'],
            'dj_id'       => ['nullable', 'exists:djs,id'],
            'genre_id'    => ['nullable', 'exists:genres,id'],
            'artist'      => ['nullable', 'string', 'max:255'],
            'bpm'         => ['nullable', 'string', 'max:20'],
            'preview_url' => ['nullable', 'url', 'max:2000'],
            'file_url'    => ['nullable', 'url', 'max:2000'],
            'price'       => ['required', 'numeric', 'min:0'],
            'released_at' => ['nullable', 'date'],
        ]);
        $data['active'] = $request->boolean('active');

        return $data;
    }

    private function slugUnico(string $titulo): string
    {
        $base = Str::slug(Str::limit($titulo, 180, ''));
        $slug = $base !== '' ? $base : 'track';
        $n = 1;
        while (Track::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$n);
        }

        return $slug;
    }
}
