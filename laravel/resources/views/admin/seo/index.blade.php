@extends('layouts.admin')

@section('title', 'SEO')
@section('titulo_pagina', 'SEO del sitio')

@section('content')
<style>
.seo-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:22px}
@media(max-width:1000px){.seo-grid{grid-template-columns:1fr}}
.seo-caja{background:#181818;border:1px solid #242424;border-radius:12px;padding:18px 20px}
.seo-caja h2{font-size:15px;margin:0 0 12px;color:#fff}
.seo-caja h2 i{color:#1db954;margin-right:6px}
.seo-caja label{color:#b3b3b3;font-size:12px;display:block;margin:10px 0 4px}
.seo-caja input[type=text],.seo-caja textarea{width:100%;background:#242424;border:1px solid #333;color:#fff;border-radius:8px;padding:9px 11px;font-size:13px;box-sizing:border-box}
.seo-caja textarea{min-height:64px;resize:vertical}
.seo-caja .ayuda{color:#8a8a8a;font-size:12px;margin:4px 0 0;line-height:1.5}
.seo-caja .ayuda a{color:#1db954}
.chk{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #202020;color:#ddd;font-size:13px;line-height:1.5}
.chk:last-child{border-bottom:none}
.chk i{margin-top:2px;flex-shrink:0}
.chk.ok i{color:#1db954}.chk.medio i{color:#e8b433}.chk.mal i{color:#e05252}
.seom{background:#242424;border-radius:99px;height:10px;width:110px;overflow:hidden;display:inline-block;vertical-align:middle}
.seom i{display:block;height:100%;border-radius:99px}
.seo-num{font-weight:800;font-size:14px;min-width:56px;display:inline-block}
.seo-fila td{vertical-align:top}
.seo-det summary{cursor:pointer;color:#1db954;font-size:12px;font-weight:700}
.seo-det{margin-top:6px}
</style>

<div class="seo-grid">
    <form class="seo-caja" method="POST" action="{{ route('admin.seo.update') }}">
        @csrf @method('PUT')
        <h2><i class="fab fa-google"></i> Conexión con Google</h2>

        <label>Google Analytics 4 · ID de medición</label>
        <input type="text" name="ga4_id" value="{{ old('ga4_id', $ga4) }}" placeholder="G-XXXXXXXXXX">
        <p class="ayuda">Crea una propiedad en <a href="https://analytics.google.com" target="_blank">analytics.google.com</a> → Administrar → Flujos de datos → Web, y pega aquí el <strong>ID de medición</strong> (empieza por G-). También puedes pegar el fragmento completo y yo extraigo el ID. El código de medición se añade solo a todas las páginas.</p>

        <label>Google Search Console · código de verificación</label>
        <input type="text" name="gsc_verification" value="{{ old('gsc_verification', $gsc) }}" placeholder='código o etiqueta &lt;meta name="google-site-verification" ...&gt;'>
        <p class="ayuda">En <a href="https://search.google.com/search-console" target="_blank">search.google.com/search-console</a> añade tu propiedad (prefijo de URL), elige el método <strong>Etiqueta HTML</strong> y pega aquí la etiqueta o solo el código. Luego vuelve a Search Console y pulsa "Verificar". Después envía el sitemap: <strong>{{ url('/sitemap.xml') }}</strong></p>

        <label>Meta descripción por defecto (español)</label>
        <textarea name="seo_desc_es" maxlength="300" placeholder="Se usa en las páginas que no tengan su propia descripción">{{ old('seo_desc_es', $descEs) }}</textarea>
        <label>Meta descripción por defecto (inglés)</label>
        <textarea name="seo_desc_en" maxlength="300">{{ old('seo_desc_en', $descEn) }}</textarea>

        <button class="btn" type="submit" style="margin-top:14px;"><i class="fas fa-floppy-disk"></i> Guardar configuración</button>
    </form>

    <div class="seo-caja">
        <h2><i class="fas fa-list-check"></i> Recomendaciones del sitio</h2>
        @foreach ($sitio as [$estado, $texto])
            <div class="chk {{ $estado }}">
                <i class="fas {{ $estado === 'ok' ? 'fa-circle-check' : ($estado === 'medio' ? 'fa-triangle-exclamation' : 'fa-circle-xmark') }}"></i>
                <span>{{ $texto }}</span>
            </div>
        @endforeach
        <div class="chk ok"><i class="fas fa-sitemap"></i>
            <span>Sitemap del sitio: <a href="{{ route('sitemap') }}" target="_blank" style="color:#1db954;">/sitemap.xml</a> (se actualiza solo con tus páginas, DJs y playlists).</span>
        </div>
    </div>
</div>

<div class="seo-caja">
    <h2><i class="fas fa-gauge-high"></i> Medidor SEO por página</h2>
    <table class="tabla">
        <thead><tr><th>Página</th><th>Puntaje</th><th>Qué mejorar</th><th></th></tr></thead>
        <tbody>
            @forelse ($paginas as $fila)
                @php
                    $p = $fila['page'];
                    $puntos = $fila['seo']['puntos'];
                    $color = \App\Support\SeoAnalisis::color($puntos);
                    $pendientes = collect($fila['seo']['checks'])->where('estado', '!=', 'ok');
                @endphp
                <tr class="seo-fila">
                    <td>
                        <strong>{{ $p->title_es }}</strong>
                        <div style="color:#8a8a8a;font-size:12px;">/{{ $p->slug }} @unless($p->active) · borrador @endunless</div>
                    </td>
                    <td style="white-space:nowrap;">
                        <span class="seo-num" style="color:{{ $color }};">{{ $puntos }}/100</span>
                        <span class="seom"><i style="width:{{ $puntos }}%;background:{{ $color }};"></i></span>
                    </td>
                    <td>
                        @if ($pendientes->isEmpty())
                            <span style="color:#1db954;font-size:13px;"><i class="fas fa-circle-check"></i> Todo en orden</span>
                        @else
                            <details class="seo-det">
                                <summary>{{ $pendientes->count() }} recomendación(es)</summary>
                                @foreach ($fila['seo']['checks'] as $c)
                                    <div class="chk {{ $c['estado'] }}">
                                        <i class="fas {{ $c['estado'] === 'ok' ? 'fa-circle-check' : ($c['estado'] === 'medio' ? 'fa-triangle-exclamation' : 'fa-circle-xmark') }}"></i>
                                        <span>{{ $c['texto'] }}</span>
                                    </div>
                                @endforeach
                            </details>
                        @endif
                    </td>
                    <td style="text-align:right;white-space:nowrap;">
                        <a class="btn-sec btn-sm" href="{{ route('admin.pages.edit', $p) }}"><i class="fas fa-pen"></i> Editar</a>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4">Aún no hay páginas. Crea las páginas por defecto en Administración → Páginas.</td></tr>
            @endforelse
        </tbody>
    </table>
    <p style="color:#8a8a8a;font-size:12px;margin:12px 0 0;">El puntaje revisa: título SEO (30–60 caracteres), meta descripción (50–160), URL amigable, encabezado principal, cantidad de contenido, textos alternativos de las imágenes, traducción al inglés e indexabilidad. Edita cada página y completa la sección "SEO de la página".</p>
</div>
@endsection
