@extends('layouts.admin')

@section('title', 'Reportes')
@section('titulo_pagina', 'Panel de reportes')

@php
    $delta = function ($actual, $previo) {
        if ($previo <= 0) return null;
        return round(($actual - $previo) / $previo * 100, 1);
    };
    $kpis = [
        ['lbl' => 'Ingresos', 'num' => '$' . number_format($totales['ingresos'], 2), 'd' => $delta($totales['ingresos'], $previos['ingresos'])],
        ['lbl' => 'Canciones vendidas', 'num' => number_format($totales['unidades']), 'd' => $delta($totales['unidades'], $previos['unidades'])],
        ['lbl' => 'Pedidos', 'num' => number_format($totales['pedidos']), 'd' => $delta($totales['pedidos'], $previos['pedidos'])],
        ['lbl' => 'Ticket promedio', 'num' => '$' . number_format($totales['ticket'], 2), 'd' => $delta($totales['ticket'], $previos['ticket'])],
    ];
@endphp

@section('content')
@include('admin.partials.report-ui')

<div class="rp-presets">
    <button type="button" class="rp-preset" onclick="rpPreset('{{ now()->toDateString() }}', '{{ now()->toDateString() }}')">Hoy</button>
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
    <div>
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">DJ</label>
        <select class="sel" name="dj">
            <option value="">Todos los DJs</option>
            @foreach ($djs as $djOpc)
                <option value="{{ $djOpc->id }}" @selected($djId === $djOpc->id)>{{ $djOpc->name }}</option>
            @endforeach
        </select>
    </div>
    <button class="btn" type="submit">Aplicar</button>
    <a class="btn-sec" href="{{ route('admin.reports.export', ['desde' => $desde, 'hasta' => $hasta, 'dj' => $djId]) }}">
        <i class="fas fa-file-csv"></i> Exportar
    </a>
</form>

<p style="color:#666;font-size:12px;margin:10px 0 0;">Comparado con el período anterior ({{ $previos['desde'] }} — {{ $previos['hasta'] }})</p>

<div class="rp-kpis">
    @foreach ($kpis as $k)
        <div class="rp-kpi">
            <div class="lbl">{{ $k['lbl'] }}</div>
            <div class="num">{{ $k['num'] }}</div>
            @if ($k['d'] === null)
                <div class="delta flat">— sin datos previos</div>
            @elseif ($k['d'] > 0)
                <div class="delta up"><i class="fas fa-arrow-trend-up"></i> +{{ $k['d'] }}%</div>
            @elseif ($k['d'] < 0)
                <div class="delta down"><i class="fas fa-arrow-trend-down"></i> {{ $k['d'] }}%</div>
            @else
                <div class="delta flat">0%</div>
            @endif
        </div>
    @endforeach
</div>

<div class="rp-panel">
    <h3><i class="fas fa-chart-area" style="color:#1db954;"></i> Ingresos por día</h3>
    <div class="rp-chart"><canvas id="chartDias"></canvas></div>
</div>

<div class="rp-2col">
    <div class="rp-panel">
        <h3><i class="fas fa-headphones" style="color:#1db954;"></i> Top DJs del período</h3>
        <div class="rp-chart-sm"><canvas id="chartDjs"></canvas></div>
    </div>
    <div class="rp-panel">
        <h3><i class="fas fa-credit-card" style="color:#1db954;"></i> Ingresos por método de pago</h3>
        <div class="rp-chart-sm"><canvas id="chartMetodos"></canvas></div>
    </div>
</div>

<div class="rp-panel">
    <h3><i class="fas fa-user-group" style="color:#1db954;"></i> Hoja de reporte por DJ</h3>
    <table class="tabla">
        <thead><tr><th>DJ</th><th class="num">Unidades</th><th class="num">Ingresos</th><th>% del total</th><th></th></tr></thead>
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
                    <td style="text-align:right;">
                        @if ($fila->dj_id)
                            <a class="btn-sec btn-sm" href="{{ route('admin.reports.dj', ['dj' => $fila->dj_id, 'desde' => $desde, 'hasta' => $hasta]) }}">
                                Ver hoja del DJ »
                            </a>
                        @endif
                    </td>
                </tr>
            @empty
                <tr><td colspan="5">No hay ventas en este período.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="rp-panel">
    <h3><i class="fas fa-music" style="color:#1db954;"></i> Canciones más vendidas del período</h3>
    <table class="tabla">
        <thead><tr><th>#</th><th>Canción</th><th>DJ</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr></thead>
        <tbody>
            @forelse ($porCancion as $i => $c)
                <tr>
                    <td style="color:#666;">{{ $i + 1 }}</td>
                    <td>{{ Str::limit($c->cancion, 70) }}</td>
                    <td>{{ $c->dj }}</td>
                    <td class="num">{{ number_format($c->unidades) }}</td>
                    <td class="num">${{ number_format((float) $c->ingresos, 2) }}</td>
                </tr>
            @empty
                <tr><td colspan="5">Sin ventas en este período.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    if (!window.Chart) return;
    rpChartDefaults();

    var dias = @json($serieDias);
    new Chart(document.getElementById('chartDias'), {
        type: 'line',
        data: {
            labels: dias.map(d => d.dia.slice(5)),
            datasets: [{
                label: 'Ingresos (USD)',
                data: dias.map(d => d.ingresos),
                borderColor: '#1db954',
                backgroundColor: 'rgba(29,185,84,.12)',
                fill: true, tension: .35, pointRadius: dias.length > 45 ? 0 : 3,
                pointBackgroundColor: '#1db954'
            }, {
                label: 'Unidades',
                data: dias.map(d => d.unidades),
                borderColor: '#4a90d9',
                backgroundColor: 'transparent',
                tension: .35, pointRadius: 0, borderDash: [4, 4], yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { legend: { labels: { boxWidth: 12 } } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => '$' + v } },
                y1: { beginAtZero: true, position: 'right', grid: { display: false } }
            }
        }
    });

    var djs = @json($porDj->take(8)->values());
    new Chart(document.getElementById('chartDjs'), {
        type: 'bar',
        data: {
            labels: djs.map(d => d.dj),
            datasets: [{ label: 'Ingresos (USD)', data: djs.map(d => Number(d.ingresos)), backgroundColor: '#1db954', borderRadius: 6 }]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true, ticks: { callback: v => '$' + v } } }
        }
    });

    var metodos = @json($porMetodo);
    new Chart(document.getElementById('chartMetodos'), {
        type: 'doughnut',
        data: {
            labels: metodos.map(m => m.metodo),
            datasets: [{
                data: metodos.map(m => Number(m.ingresos)),
                backgroundColor: ['#1db954', '#4a90d9', '#e0a800', '#f06262', '#9b59b6', '#5dc8cd'],
                borderColor: '#181818', borderWidth: 3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'right' } } }
    });
});
</script>
@endsection
