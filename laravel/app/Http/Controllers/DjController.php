<?php

namespace App\Http\Controllers;

use App\Models\Dj;
use Illuminate\Http\Request;

class DjController extends Controller
{
    public function index()
    {
        return view('djs.index', [
            'djs' => Dj::where('active', true)->withCount('tracks')->whereHas('tracks')->orderByDesc('tracks_count')->get(),
        ]);
    }

    public function show(Request $request, Dj $dj)
    {
        abort_unless($dj->active, 404);

        $tracks = $dj->tracks()
            ->active()
            ->with(['dj', 'genre'])
            ->search($request->query('q'))
            ->latest('released_at')
            ->paginate(50)
            ->withQueryString();

        return view('djs.show', compact('dj', 'tracks'));
    }
}
