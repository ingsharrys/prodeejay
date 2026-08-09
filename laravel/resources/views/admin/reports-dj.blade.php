@extends('layouts.admin')

@section('title', 'Reporte de ' . $dj->name)
@section('titulo_pagina', 'Hoja de reporte: ' . $dj->name)

@php
    $delta = function ($actual, $previo) {
        if ($previo <= 0) return null;
        return round(($actual - $previo) / $previo * 100, 1);
    };
    $kpis = [
        ['lbl' => 'Ingresos', 'num' => '$' . number_format($totales['ingresos'], 2), 'd' => $delta($totales['ingresos'], $previos['ingresos'])],
        ['lbl' => 'Canciones vendidas', 'num' => number_format($totales['unidades']), 'd' => $delta($totales['unidades'], $previos['unidades'])],
        ['lbl' => 'Pedidos', 'num' => number_format($totales['pedidos']), 'd' => $delta($totales['pedidos'], $previos['pedidos'])],
        ['lbl' => 'Participación del sitio', 'num' => $participacion . '%', 'd' => null],
    ];
@endphp

@section('content')
@include('admin.partials.report-ui')

<div style="display:flex;align-items:center;gap:18px;margin-bottom:18px;">
    @if ($dj->image_url)
        <img src="{{ $dj->image_url }}" alt="{{ $dj->name }}" style="width:74px;height:74px;border-radius:50%;object-fit:cover;box-shadow:0 6px 18px rgba(0,0,0,.5);">
    @else
        <div style="width:74px;height:74px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#000;background:linear-gradient(135deg,#1db954,#0e7a36);">{{ mb_strtoupper(mb_substr($dj->name, 0, 1)) }}</div>
    @endif
    <div>
        <div style="color:#fff;font-size:20px;font-weight:800;">{{ $dj->name }}</div>
        <div style="color:#8a8a8a;font-size:13px;">Período: {{ $desde }} — {{ $hasta }}</div>
    </div>
    <div style="margin-left:auto;display:flex;gap:10px;">
        <a class="btn-sec btn-sm" href="{{ route('admin.reports', ['desde' => $desde, 'hasta' => $hasta]) }}">« Volver al panel</a>
        <a class="btn-sec btn-sm" href="{{ route('admin.reports.export', ['desde' => $desde, 'hasta' => $hasta, 'dj' => $dj->id]) }}"><i class="fas fa-file-csv"></i> Exportar</a>
    </div>
</div>

<div class="rp-presets">
    <button type="button" class="rp-preset" onclick="rpPreset('{{ now()->subDays(6)->toDateString() }}', '{{ now()->toDateString() }}')">Últimos 7 días</button>
    <button type="button" class="rp-preset" onclick="rpPreset('{{ now()->subDays(29)->toDateString() }}', '{{ now()->toDateString() }}')">Últimos 30 días</button>
    <button type="button" class="rp-preset" onclick="rpPreset('{{ now()->startOfMonth()->toDateString() }}', '{{ now()->toDateString() }}')">Este mes</button>
    <button type="button" class="rp-preset" onclick="rpPreset('{{ now()->subMonthNoOverflow()->startOfMonth()->toDateString() }}', '{{ now()->subMonthNoOverflow()->endOfMonth()->toDateString() }}')">Mes anterior</button>
    <button type="button" class="rp-preset" onclick="rpPreset('{{ now()->startOfYear()->toDateString() }}', '{{ now()->toDateString() }}')">Este año</button>
</div>

<form id="rpForm" class="controles" method="get" style="padding-top:0;align-items:flex-end;">
    <div>
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Desde</label>
        <input class="inp" style="flex:none;" type="date" name="desde" value="{{ $desde }}">
    </div>
    <div>
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Hasta</label>
        <input class="inp" style="flex:none;" type="date" name="hasta" value="{{ $hasta }}">
    </div>
    <button class="btn" type="submit">Aplicar</button>
</form>

<div class="rp-kpis">
    @foreach ($kpis as $k)
        <div class="rp-kpi">
            <div class="lbl">{{ $k['lbl'] }}</div>
            <div class="num">{{ $k['num'] }}</div>
            @if ($k['d'] === null)
                <div class="delta flat">&nbsp;</div>
            @elseif ($k['d'] > 0)
                <div class="delta up"><i class="fas fa-arrow-trend-up"></i> +{{ $k['d'] }}% vs período anterior</div>
            @elseif ($k['d'] < 0)
                <div class="delta down"><i class="fas fa-arrow-trend-down"></i> {{ $k['d'] }}% vs período anterior</div>
            @else
                <div class="delta flat">0% vs período anterior</div>
            @endif
        </div>
    @endforeach
</div>

<div class="rp-panel">
    <h3><i class="fas fa-chart-area" style="color:#1db954;"></i> Ingresos por día de {{ $dj->name }}</h3>
    <div class="rp-chart"><canvas id="chartDiasDj"></canvas></div>
</div>

<div class="rp-panel">
    <h3><i class="fas fa-music" style="color:#1db954;"></i> Canciones vendidas en el período</h3>
    <table class="tabla">
        <thead><tr><th>#</th><th>Canción</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr></thead>
        <tbody>
            @forelse ($porCancion as $i => $c)
                <tr>
                    <td style="color:#666;">{{ $i + 1 }}</td>
                    <td>{{ Str::limit($c->cancion, 80) }}</td>
                    <td class="num">{{ number_format($c->unidades) }}</td>
                    <td class="num">${{ number_format((float) $c->ingresos, 2) }}</td>
                </tr>
            @empty
                <tr><td colspan="4">Este DJ no tuvo ventas en el período.</td></tr>
            @endforelse
            @if ($porCancion->isNotEmpty())
                <tr>
                    <td></td>
                    <td><strong>TOTAL</strong></td>
                    <td class="num"><strong>{{ number_format($porCancion->sum('unidades')) }}</strong></td>
                    <td class="num"><strong>${{ number_format((float) $porCancion->sum('ingresos'), 2) }}</strong></td>
                </tr>
            @endif
        </tbody>
    </table>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    if (!window.Chart) return;
    rpChartDefaults();

    var dias = @json($serieDias);
    new Chart(document.getElementById('chartDiasDj'), {
        type: 'bar',
        data: {
            labels: dias.map(d => d.dia.slice(5)),
            datasets: [{
                label: 'Ingresos (USD)',
                data: dias.map(d => d.ingresos),
                backgroundColor: 'rgba(29,185,84,.85)',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { callback: v => '$' + v } } }
        }
    });
});
</script>
@endsection
