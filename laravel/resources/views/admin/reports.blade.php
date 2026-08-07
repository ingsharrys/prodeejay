@extends('layouts.admin')

@section('title', __('messages.sales_by_dj'))
@section('titulo_pagina', __('messages.sales_by_dj') . ' — ' . str_pad($mes, 2, '0', STR_PAD_LEFT) . '/' . $anio)

@section('content')
<form class="controles" method="get" style="padding-top:0;">
    <select class="sel" name="mes">
        @for ($m = 1; $m <= 12; $m++)
            <option value="{{ $m }}" @selected($mes === $m)>{{ str_pad($m, 2, '0', STR_PAD_LEFT) }}</option>
        @endfor
    </select>
    <select class="sel" name="anio">
        @for ($a = now()->year; $a >= now()->year - 5; $a--)
            <option value="{{ $a }}" @selected($anio === $a)>{{ $a }}</option>
        @endfor
    </select>
    <button class="btn" type="submit">{{ __('messages.view_report') }}</button>
    <a class="btn-sec" href="{{ route('admin.reports.export', ['anio' => $anio, 'mes' => $mes]) }}">
        <i class="fas fa-file-csv"></i> {{ __('messages.export_csv') }}
    </a>
</form>

<table class="tabla" style="margin-top:18px;">
    <thead>
        <tr>
            <th>{{ __('messages.dj') }}</th>
            <th class="num">{{ __('messages.units') }}</th>
            <th class="num">{{ __('messages.revenue') }}</th>
            <th>{{ __('messages.of_total') }}</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($filas as $fila)
            @php $pct = $totales['ingresos'] > 0 ? ($fila->ingresos / $totales['ingresos']) * 100 : 0; @endphp
            <tr>
                <td><strong>{{ $fila->dj }}</strong></td>
                <td class="num">{{ number_format($fila->unidades) }}</td>
                <td class="num">${{ number_format((float) $fila->ingresos, 2) }}</td>
                <td>
                    <div class="barra-pct" title="{{ number_format($pct, 1) }}%"><span style="width:{{ max(1, round($pct)) }}%"></span></div>
                    {{ number_format($pct, 1) }}%
                </td>
            </tr>
        @empty
            <tr><td colspan="4">{{ __('messages.no_sales') }}</td></tr>
        @endforelse
        @if ($filas->isNotEmpty())
            <tr>
                <td><strong>TOTAL</strong></td>
                <td class="num"><strong>{{ number_format($totales['unidades']) }}</strong></td>
                <td class="num"><strong>${{ number_format((float) $totales['ingresos'], 2) }}</strong></td>
                <td></td>
            </tr>
        @endif
    </tbody>
</table>

@if ($serie->isNotEmpty())
    <h2 style="color:#fff;font-size:17px;margin-top:30px;">{{ __('messages.monthly_revenue') }}</h2>
    @php $max = max(1, (float) $serie->max()); @endphp
    <div class="grafica" style="margin-top:12px;">
        @foreach ($serie as $periodo => $ingresos)
            <div class="col" title="{{ $periodo }}: ${{ number_format((float) $ingresos, 2) }}">
                <div class="colbar" style="height:{{ max(2, round(($ingresos / $max) * 100)) }}%"></div>
                <div class="collbl">{{ substr($periodo, 5) }}</div>
            </div>
        @endforeach
    </div>
@endif
@endsection
