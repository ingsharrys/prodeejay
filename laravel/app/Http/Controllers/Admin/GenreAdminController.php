<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GenreAdminController extends Controller
{
    public function index()
    {
        return view('admin.genres.index', [
            'genres' => Genre::withCount('tracks')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:100']]);

        $base = Str::slug($data['name']);
        $slug = $base !== '' ? $base : 'genero';
        $n = 1;
        while (Genre::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$n);
        }

        Genre::create(['name' => $data['name'], 'slug' => $slug]);

        return back()->with('status', 'Género creado.');
    }

    public function update(Request $request, Genre $genre)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:100']]);
        $genre->update(['name' => $data['name']]);

        return back()->with('status', 'Género actualizado.');
    }

    public function destroy(Genre $genre)
    {
        // Los tracks del género quedan sin género (no se borran).
        $genre->delete();

        return back()->with('status', 'Género eliminado.');
    }
}
