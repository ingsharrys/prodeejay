{{-- Bloque: portada (hero) --}}
@php
    use App\Models\Page;
    $fondo = trim((string) ($b['fondo'] ?? ''));
    $tag = Page::campo($b, 'tag');
    $resaltado = Page::campo($b, 'resaltado');
    $texto = Page::campo($b, 'texto');
    $btn1 = Page::campo($b, 'btn1_txt');
    $btn2 = Page::campo($b, 'btn2_txt');
@endphp
<div class="hero" @if ($fondo !== '') style="background:linear-gradient(rgba(0,0,0,.6),rgba(15,15,15,.94)),url('{{ $fondo }}') center/cover no-repeat;" @endif>
    @if ($tag !== '')
        <span class="tag"><i class="fas fa-headphones"></i> {{ $tag }}</span>
    @endif
    <h1>{{ Page::campo($b, 'titulo') }}@if ($resaltado !== '')<br><span>{{ $resaltado }}</span>@endif</h1>
    @if ($texto !== '')
        <p>{{ $texto }}</p>
    @endif
    @if ($btn1 !== '' || $btn2 !== '')
        <div>
            @if ($btn1 !== '')
                <a class="btn" href="{{ Page::enlace($b['btn1_url'] ?? '') }}"><i class="fas fa-play"></i> {{ $btn1 }}</a>
            @endif
            @if ($btn2 !== '')
                <a class="btn-sec" href="{{ Page::enlace($b['btn2_url'] ?? '') }}">{{ $btn2 }}</a>
            @endif
        </div>
    @endif
</div>
