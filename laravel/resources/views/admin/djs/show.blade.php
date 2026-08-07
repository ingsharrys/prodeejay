@extends('layouts.app')

@section('title', 'Historial de ' . $dj->name)

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Administración — Historial del DJ</p>
        <h1>{{ $dj->name }}</h1>
        <p class="sub">{{ number_format($tracks->total()) }} tracks publicados</p>
    </div>

    @include('admin.partials.nav')

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
                    <tr><td colspan="3">Sin ventas registradas.</td></tr>
                @endforelse
            </tbody>
        </table>
    </section>

    @if ($topTracks->isNotEmpty())
    <section class="bloque">
        <h2>Sus tracks más vendidos</h2>
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
        <h2>Toda su música</h2>
        <table class="tabla">
            <thead><tr><th>Título</th><th>Tipo</th><th class="num">Precio</th><th>Lanzamiento</th><th></th></tr></thead>
            <tbody>
                @foreach ($tracks as $track)
                    <tr>
                        <td>{{ Str::limit($track->title, 70) }}</td>
                        <td>{{ $track->type }}</td>
                        <td class="num">${{ number_format((float) $track->price, 2) }}</td>
                        <td>{{ $track->released_at?->format('d-m-Y') }}</td>
                        <td style="text-align:right;"><a class="btn-sec btn-sm" href="{{ route('admin.tracks.edit', $track) }}">Editar</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="pagin">{{ $tracks->onEachSide(1)->links('partials.pagination') }}</div>
    </section>
</div>
@endsection
