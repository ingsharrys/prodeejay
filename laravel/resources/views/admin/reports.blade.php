@extends('layouts.admin')

@section('title', 'Reporte de ventas')
@section('titulo_pagina', 'Reporte de ventas — ' . $desde . ' a ' . $hasta)

@section('content')
<form class="controles" method="get" style="padding-top:0;align-items:flex-end;">
    <div>
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Desde</label>
        <input class="inp" style="flex:none;" type="date" name="desde" value="{{ $desde }}">
    </div>
    <div>
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Hasta</label>
        <input class="inp" style="flex:none;" type="date" name="hasta" value="{{ $hasta }}">
    </div>
    <div>
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">DJ</label>
        <select class="sel" name="dj">
            <option value="">Todos los DJs</option>
            @foreach ($djs as $dj)
                <option value="{{ $dj->id }}" @selected($djId === $dj->id)>{{ $dj->name }}</option>
            @endforeach
        </select>
    </div>
    <button class="btn" type="submit">Ver reporte</button>
    <a class="btn-sec" href="{{ route('admin.reports.export', ['desde' => $desde, 'hasta' => $hasta, 'dj' => $djId]) }}">
        <i class="fas fa-file-csv"></i> Exportar CSV
    </a>
</form>

<div class="adm-cards" style="margin-top:20px;">
    <div class="adm-card"><i class="fas fa-dollar-sign"></i><div class="num">${{ number_format($totales['ingresos'], 2) }}</div><div class="lbl">Ingresos</div></div>
    <div class="adm-card"><i class="fas fa-music"></i><div class="num">{{ number_format($totales['unidades']) }}</div><div class="lbl">Canciones vendidas</div></div>
    <div class="adm-card"><i class="fas fa-receipt"></i><div class="num">{{ number_format($totales['pedidos']) }}</div><div class="lbl">Pedidos</div></div>
</div>

@if ($porDia->isNotEmpty())
    <h2 style="color:#fff;font-size:17px;">Ventas por día</h2>
    @php $max = max(1, (float) $porDia->max('ingresos')); @endphp
    <div class="grafica" style="margin:12px 0 10px;">
        @foreach ($porDia as $d)
            <div class="col" title="{{ $d->dia }}: ${{ number_format((float) $d->ingresos, 2) }} ({{ $d->unidades }} und)">
                <div class="colbar" style="height:{{ max(2, round(($d->ingresos / $max) * 100)) }}%"></div>
                <div class="collbl">{{ substr($d->dia, 8) }}</div>
            </div>
        @endforeach
    </div>
    <table class="tabla" style="max-width:560px;margin-bottom:26px;">
        <thead><tr><th>Día</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr></thead>
        <tbody>
            @foreach ($porDia as $d)
                <tr>
                    <td>{{ $d->dia }}</td>
                    <td class="num">{{ number_format($d->unidades) }}</td>
                    <td class="num">${{ number_format((float) $d->ingresos, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endif

<h2 style="color:#fff;font-size:17px;">Resumen por DJ</h2>
<table class="tabla" style="margin:12px 0 26px;">
    <thead>
        <tr><th>DJ</th><th class="num">Unidades</th><th class="num">Ingresos</th><th>% del total</th></tr>
    </thead>
    <tbody>
        @forelse ($porDj as $fila)
            @php $pct = $totales['ingresos'] > 0 ? ($fila->ingresos / $totales['ingresos']) * 100 : 0; @endphp
            <tr>
                <td><strong>{{ $fila->dj }}</strong></td>
                <td class="num">{{ number_format($fila->unidades) }}</td>
                <td class="num">${{ number_format((float) $fila->ingresos, 2) }}</td>
                <td>
                    <div class="barra-pct"><span style="width:{{ max(1, round($pct)) }}%"></span></div>
                    {{ number_format($pct, 1) }}%
                </td>
            </tr>
        @empty
            <tr><td colspan="4">No hay ventas en este período.</td></tr>
        @endforelse
    </tbody>
</table>

<h2 style="color:#fff;font-size:17px;">Detalle por canción</h2>
<table class="tabla" style="margin-top:12px;">
    <thead>
        <tr><th>Canción</th><th>DJ</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr>
    </thead>
    <tbody>
        @forelse ($porCancion as $c)
            <tr>
                <td>{{ Str::limit($c->cancion, 70) }}</td>
                <td>{{ $c->dj }}</td>
                <td class="num">{{ number_format($c->unidades) }}</td>
                <td class="num">${{ number_format((float) $c->ingresos, 2) }}</td>
            </tr>
        @empty
            <tr><td colspan="4">Sin ventas en este período.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
