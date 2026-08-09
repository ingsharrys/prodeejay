{{-- Bloque: parrilla de DJs (datos en vivo de la base de datos) --}}
@php
    use App\Models\Page;
    $limiteDjs = (int) ($b['limite'] ?? 0);
    $djsBloque = \App\Models\Dj::where('active', true)
        ->withCount('tracks')
        ->whereHas('tracks')
        ->orderByDesc('tracks_count')
        ->when($limiteDjs > 0, fn ($q) => $q->take($limiteDjs))
        ->get();
@endphp
<div class="container">
    <section class="bloque">
        @if (Page::campo($b, 'titulo') !== '')
            <h2>{{ Page::campo($b, 'titulo') }}</h2>
        @endif
        <div class="djs-grid">
            @foreach ($djsBloque as $dj)
                <a class="dj-card" href="{{ route('djs.show', $dj) }}">
                    @if ($dj->image_url)
                        <img src="{{ $dj->image_url }}" alt="DJ {{ $dj->name }}" loading="lazy">
                    @else
                        <div class="dj-ini">{{ mb_strtoupper(mb_substr($dj->name, 0, 1)) }}</div>
                    @endif
                    <h3>{{ $dj->name }}</h3>
                    <p>{{ number_format($dj->tracks_count) }} {{ __('messages.tracks') }}</p>
                </a>
            @endforeach
        </div>
    </section>
</div>
