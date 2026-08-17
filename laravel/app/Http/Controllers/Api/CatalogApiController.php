<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CheckoutPageController;
use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\Genre;
use App\Models\Plan;
use App\Models\Setting;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/** Catálogo público para la app móvil: música, DJs, géneros y planes. */
class CatalogApiController extends Controller
{
    /** Configuración general que la app necesita al arrancar. */
    public function config()
    {
        $metodos = CheckoutPageController::metodos();

        return response()->json([
            'nombre'  => config('app.name', 'Prodeejay Remix'),
            'logo'    => Setting::get('logo_url') ?: null,
            'google'  => config('services.google.web_client_id') ?: null,
            'metodos' => collect($metodos)->map(fn ($m, $clave) => [
                'clave'  => $clave,
                'titulo' => $m['titulo'],
                'tax'    => (float) $m['tax'],
            ])->values(),
        ]);
    }

    public function catalogo(Request $request)
    {
        $tracks = Track::active()
            ->with(['dj', 'genre'])
            ->search($request->query('q'))
            ->when(in_array($request->query('tipo'), ['audio', 'video', 'pack', 'set'], true),
                fn ($q) => $q->where('type', $request->query('tipo')))
            ->when($request->query('genero'), fn ($q, $slug) => $q->whereHas('genre', fn ($g) => $g->where('slug', $slug)))
            ->when($request->query('dj'), fn ($q, $id) => $q->where('dj_id', (int) $id))
            ->latest('released_at')
            ->paginate(30);

        $compradas = $this->compradas($request);

        return response()->json([
            'pagina'  => $tracks->currentPage(),
            'paginas' => $tracks->lastPage(),
            'total'   => $tracks->total(),
            'tracks'  => $tracks->getCollection()->map(fn ($t) => $this->trackJson($t, $compradas))->values(),
        ]);
    }

    public function generos()
    {
        return response()->json([
            'generos' => Genre::withCount('tracks')->whereHas('tracks')->orderBy('name')
                ->get()->map(fn ($g) => ['slug' => $g->slug, 'nombre' => $g->name, 'tracks' => $g->tracks_count])->values(),
        ]);
    }

    public function djs()
    {
        return response()->json([
            'djs' => Dj::where('active', true)->withCount('tracks')->whereHas('tracks')->orderByDesc('tracks_count')
                ->get()->map(fn ($d) => ['id' => $d->id, 'nombre' => $d->name, 'foto' => $d->image_url ?: null, 'tracks' => $d->tracks_count])->values(),
        ]);
    }

    public function dj(Request $request, Dj $dj)
    {
        abort_unless($dj->active, 404);

        $tracks = $dj->tracks()->active()->with(['dj', 'genre'])->latest('released_at')->paginate(30);
        $compradas = $this->compradas($request);

        return response()->json([
            'dj'      => ['id' => $dj->id, 'nombre' => $dj->name, 'foto' => $dj->image_url ?: null, 'bio' => $dj->bio ?? null],
            'pagina'  => $tracks->currentPage(),
            'paginas' => $tracks->lastPage(),
            'tracks'  => $tracks->getCollection()->map(fn ($t) => $this->trackJson($t, $compradas))->values(),
        ]);
    }

    public function planes()
    {
        return response()->json([
            'planes' => Plan::where('active', true)->orderBy('price')
                ->get()->map(fn ($p) => [
                    'id'        => $p->id,
                    'nombre'    => $p->name,
                    'precio'    => (float) $p->price,
                    'descargas' => (int) $p->downloads_per_month,
                ])->values(),
        ]);
    }

    /** IDs de tracks ya comprados por el usuario autenticado (si hay token). */
    private function compradas(Request $request)
    {
        $user = $request->user('sanctum');
        if (! $user) {
            return collect();
        }

        return $user->orders()->where('status', 'paid')
            ->join('order_items', 'order_items.order_id', '=', 'orders.id')
            ->pluck('order_items.track_id')->filter()->flip();
    }

    private function trackJson(Track $t, $compradas): array
    {
        $esVideo = 'video' === $t->type || Str::endsWith(Str::lower((string) $t->preview_url), '.mp4');

        return [
            'id'       => $t->id,
            'titulo'   => $t->title,
            'artista'  => $t->artist ?: $t->dj?->name,
            'dj'       => $t->dj ? ['id' => $t->dj->id, 'nombre' => $t->dj->name] : null,
            'genero'   => $t->genre?->name,
            'bpm'      => $t->bpm,
            'tipo'     => $t->type,
            'precio'   => (float) $t->price,
            'preview'  => $t->preview_url ?: null,
            'es_video' => $esVideo,
            'comprado' => $compradas->has($t->id),
        ];
    }
}
