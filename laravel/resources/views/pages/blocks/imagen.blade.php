{{-- Bloque: imagen / banner --}}
@php
    use App\Models\Page;
    $url = trim((string) ($b['url'] ?? ''));
    $enlace = trim((string) ($b['enlace'] ?? ''));
    $ancho = $b['ancho'] ?? 'normal';
@endphp
@if ($url !== '')
    @php
        $img = '<img src="' . e($url) . '" alt="' . e(Page::campo($b, 'alt')) . '" loading="lazy" style="width:100%;display:block;' . ($ancho === 'completo' ? '' : 'border-radius:12px;') . '">';
    @endphp
    @if ($ancho === 'completo')
        <div style="padding:10px 0 26px;">
            @if ($enlace !== '')<a href="{{ Page::enlace($enlace) }}">{!! $img !!}</a>@else{!! $img !!}@endif
        </div>
    @else
        <div class="container" style="padding-top:10px;padding-bottom:26px;@if ($ancho === 'pequeno') max-width:640px; @endif">
            @if ($enlace !== '')<a href="{{ Page::enlace($enlace) }}">{!! $img !!}</a>@else{!! $img !!}@endif
        </div>
    @endif
@endif
