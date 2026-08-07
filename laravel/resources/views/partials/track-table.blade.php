{{-- Tabla de tracks estilo Spotify. Requiere: $tracks (paginados) --}}
@php
    // Se calculan una sola vez por página, no por fila.
    $planActivo = auth()->user()?->currentPlan();
    $compradas = auth()->check()
        ? auth()->user()->orders()->where('status', 'paid')
            ->join('order_items', 'order_items.order_id', '=', 'orders.id')
            ->pluck('order_items.track_id')->filter()->flip()
        : collect();
    $carrito = session('cart', []);
@endphp

<div class="tcab">
    <div></div>
    <div>{{ __('messages.title') }}</div>
    <div class="c-art">{{ __('messages.artist') }}</div>
    <div class="c-dj">{{ __('messages.dj') }}</div>
    <div class="c-bpm">{{ __('messages.bpm') }}</div>
    <div style="text-align:right;">{{ __('messages.price') }}</div>
</div>

@forelse ($tracks as $i => $track)
    @php
        $datosTrack = ['id' => $track->id, 'url' => $track->preview_url, 'titulo' => $track->title, 'artista' => $track->artist ?? $track->dj?->name];
    @endphp
    <div class="tfila" id="fila-{{ $track->id }}">
        @php
            $esVideo = 'video' === $track->type || Str::endsWith(Str::lower((string) $track->preview_url), '.mp4');
        @endphp
        <div style="text-align:center;">
            @if ($track->preview_url && $esVideo)
                <button type="button" class="tplay" onclick='playVideo(@json($datosTrack))' aria-label="Ver video">
                    <i class="fas fa-play"></i>
                </button>
            @elseif ($track->preview_url)
                <button type="button" class="tplay" onclick='playTrack(@json($datosTrack))' aria-label="Play">
                    <i class="fas fa-play"></i>
                </button>
            @else
                <span class="tplay" style="opacity:.4;cursor:default;"><i class="fas fa-headphones"></i></span>
            @endif
        </div>
        <div class="tnombre">{{ $track->title }}</div>
        <div class="tmeta c-art">{{ $track->artist ?? 'N/A' }}</div>
        <div class="tmeta c-dj">
            @if ($track->dj)
                <a href="{{ route('djs.show', $track->dj) }}">{{ $track->dj->name }}</a>
            @else
                {{ $track->genre?->name ?? 'N/A' }}
            @endif
        </div>
        <div class="tmeta c-bpm">{{ $track->bpm ?? 'N/A' }}</div>
        <div class="tprecio">
            @if (auth()->check() && ($compradas->has($track->id) || $planActivo))
                <a class="bcarrito" href="{{ route('download', $track) }}">
                    <i class="fas fa-download"></i> {{ __('messages.download') }}
                </a>
            @elseif (array_key_exists($track->id, $carrito))
                <a class="bcarrito" href="{{ route('cart.index') }}">{{ __('messages.go_to_cart') }}</a>
            @else
                <form method="POST" action="{{ route('cart.add', $track) }}" style="margin:0">
                    @csrf
                    <button type="submit" class="bprecio">
                        ${{ number_format((float) $track->price, 2) }} <i class="fas fa-shopping-cart"></i>
                    </button>
                </form>
            @endif
        </div>
    </div>
@empty
    <p style="color:#b3b3b3;padding:24px 12px;">{{ __('messages.no_results') }}</p>
@endforelse

<div class="pagin">
    {{ $tracks->onEachSide(1)->links('partials.pagination') }}
</div>
