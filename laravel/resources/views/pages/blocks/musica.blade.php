{{-- Bloque: listado de música con reproductor (datos en vivo) --}}
@php
    use App\Models\Page;
    $tipoBloque = $b['tipo'] ?? 'todos';
    $porPagina = max(1, min(100, (int) ($b['limite'] ?? 25)));
    $tracks = \App\Models\Track::active()
        ->with(['dj', 'genre'])
        ->when(in_array($tipoBloque, ['audio', 'video', 'pack', 'set'], true), fn ($q) => $q->where('type', $tipoBloque))
        ->latest('released_at')
        ->paginate($porPagina, ['*'], 'b' . ($bi ?? 0))
        ->withQueryString();
@endphp
<div class="container">
    <section class="bloque">
        @if (Page::campo($b, 'titulo') !== '')
            <h2>{{ Page::campo($b, 'titulo') }}</h2>
        @endif
        @include('partials.track-table', ['tracks' => $tracks])
    </section>
</div>
