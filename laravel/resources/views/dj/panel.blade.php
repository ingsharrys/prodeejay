@extends('layouts.app')

@section('title', 'Mi panel — ' . $dj->name)

@section('content')
<div class="container">
    <div class="phead" style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
        @if ($dj->image_url)
            <img src="{{ $dj->image_url }}" alt="DJ {{ $dj->name }}"
                 style="width:110px;height:110px;border-radius:50%;object-fit:cover;">
        @endif
        <div>
            <p class="tipo">Panel del DJ</p>
            <h1>{{ $dj->name }}</h1>
            <p class="sub">Tus ventas y tu música, en tiempo real.</p>
        </div>
    </div>

    <section class="bloque" style="padding-top:24px;">
        <div class="adm-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;">
            <div style="background:#181818;border-radius:12px;padding:20px;">
                <div style="font-size:26px;font-weight:800;color:#1db954;">${{ number_format($ingresosMes, 2) }}</div>
                <div style="color:#b3b3b3;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Ingresos este mes</div>
            </div>
            <div style="background:#181818;border-radius:12px;padding:20px;">
                <div style="font-size:26px;font-weight:800;color:#fff;">{{ number_format($unidadesMes) }}</div>
                <div style="color:#b3b3b3;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Tracks vendidos este mes</div>
            </div>
            <div style="background:#181818;border-radius:12px;padding:20px;">
                <div style="font-size:26px;font-weight:800;color:#fff;">{{ number_format($tracks->total()) }}</div>
                <div style="color:#b3b3b3;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Tracks publicados</div>
            </div>
        </div>
    </section>

    <section class="bloque">
        <h2>Ventas por mes (últimos 12 meses)</h2>
        <table class="tabla" style="max-width:560px;">
            <thead><tr><th>Mes</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr></thead>
            <tbody>
                @forelse ($ventasMes as $v)
                    <tr>
                        <td>{{ $v->periodo }}</td>
                        <td class="num">{{ number_format($v->unidades) }}</td>
                        <td class="num">${{ number_format((float) $v->ingresos, 2) }}</td>
                    </tr>
                @empty
                    <tr><td colspan="3">Aún no tienes ventas registradas.</td></tr>
                @endforelse
            </tbody>
        </table>
    </section>

    @if ($topTracks->isNotEmpty())
    <section class="bloque">
        <h2>Tus tracks más vendidos</h2>
        <table class="tabla">
            <thead><tr><th>Track</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr></thead>
            <tbody>
                @foreach ($topTracks as $t)
                    <tr>
                        <td>{{ $t->titulo }}</td>
                        <td class="num">{{ number_format($t->unidades) }}</td>
                        <td class="num">${{ number_format((float) $t->ingresos, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>
    @endif

    <section class="bloque">
        <h2>Tu música publicada</h2>
        <table class="tabla">
            <thead><tr><th>Título</th><th>Tipo</th><th class="num">Precio</th><th>Lanzamiento</th></tr></thead>
            <tbody>
                @foreach ($tracks as $track)
                    <tr>
                        <td>{{ Str::limit($track->title, 70) }}</td>
                        <td>{{ $track->type }}</td>
                        <td class="num">${{ number_format((float) $track->price, 2) }}</td>
                        <td>{{ $track->released_at?->format('d-m-Y') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="pagin">{{ $tracks->onEachSide(1)->links('partials.pagination') }}</div>
    </section>
</div>
@endsection
