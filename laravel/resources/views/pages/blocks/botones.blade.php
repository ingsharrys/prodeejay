{{-- Bloque: botones de acción --}}
@php
    use App\Models\Page;
    $btn1 = Page::campo($b, 'btn1_txt');
    $btn2 = Page::campo($b, 'btn2_txt');
@endphp
@if ($btn1 !== '' || $btn2 !== '')
    <div class="container" style="display:flex;gap:12px;flex-wrap:wrap;padding-top:6px;padding-bottom:26px;">
        @if ($btn1 !== '')
            <a class="btn" href="{{ Page::enlace($b['btn1_url'] ?? '') }}">{{ $btn1 }}</a>
        @endif
        @if ($btn2 !== '')
            <a class="btn-sec" href="{{ Page::enlace($b['btn2_url'] ?? '') }}">{{ $btn2 }}</a>
        @endif
    </div>
@endif
