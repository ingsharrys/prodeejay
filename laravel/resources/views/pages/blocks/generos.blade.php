{{-- Bloque: chips de géneros (datos en vivo) --}}
@php
    use App\Models\Page;
    $limiteGeneros = (int) ($b['limite'] ?? 0);
    $generosBloque = \App\Models\Genre::withCount('tracks')
        ->whereHas('tracks')
        ->orderByDesc('tracks_count')
        ->when($limiteGeneros > 0, fn ($q) => $q->take($limiteGeneros))
        ->get();
@endphp
@if ($generosBloque->isNotEmpty())
    <div class="container">
        <section class="bloque">
            @if (Page::campo($b, 'titulo') !== '')
                <h2>{{ Page::campo($b, 'titulo') }}</h2>
            @endif
            <div class="chips">
                @foreach ($generosBloque as $genre)
                    <a class="chip" href="{{ route('player', ['genre' => $genre->slug]) }}">{{ $genre->name }}</a>
                @endforeach
            </div>
        </section>
    </div>
@endif
