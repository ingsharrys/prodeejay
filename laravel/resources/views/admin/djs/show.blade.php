@extends('layouts.admin')

@section('title', 'Historial de ' . $dj->name)
@section('titulo_pagina', 'Historial de ' . $dj->name)

@section('content')
<p style="color:#b3b3b3;margin:0 0 6px;">
    {{ number_format($tracks->total()) }} tracks publicados ·
    Estado: {!! $dj->active ? '<span style="color:#1db954;">Activo</span>' : '<span style="color:#a33;">Deshabilitado</span>' !!}
    @if ($usuarioDj)
        · Acceso del DJ: <span style="color:#1db954;">{{ $usuarioDj->email }}</span>
    @else
        · <a href="{{ route('admin.djs.edit', $dj) }}" style="color:#1db954;">Crear acceso para este DJ</a>
    @endif
</p>

<h2 style="color:#fff;font-size:17px;margin-top:24px;">Ventas por mes (últimos 12 meses)</h2>
<table class="tabla" style="max-width:560px;margin-top:10px;">
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

@if ($topTracks->isNotEmpty())
    <h2 style="color:#fff;font-size:17px;margin-top:28px;">Sus tracks más vendidos</h2>
    <table class="tabla" style="margin-top:10px;">
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
@endif

<h2 style="color:#fff;font-size:17px;margin-top:28px;">Toda su música</h2>
<table class="tabla" style="margin-top:10px;">
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
@endsection
