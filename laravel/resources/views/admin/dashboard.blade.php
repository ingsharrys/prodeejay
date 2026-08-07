@extends('layouts.admin')

@section('title', 'Dashboard')
@section('titulo_pagina', 'Dashboard')

@section('content')
<div class="adm-cards">
    <div class="adm-card"><i class="fas fa-dollar-sign"></i><div class="num">${{ number_format($ingresosMes, 2) }}</div><div class="lbl">Ingresos del mes</div></div>
    <div class="adm-card"><i class="fas fa-music"></i><div class="num">{{ number_format($unidadesMes) }}</div><div class="lbl">Tracks vendidos (mes)</div></div>
    <div class="adm-card"><i class="fas fa-receipt"></i><div class="num">{{ number_format($pedidosMes) }}</div><div class="lbl">Pedidos del mes</div></div>
    <div class="adm-card"><i class="fas fa-compact-disc"></i><div class="num">{{ number_format($totalTracks) }}</div><div class="lbl">Tracks en catálogo</div></div>
    <div class="adm-card"><i class="fas fa-headphones"></i><div class="num">{{ number_format($totalDjs) }}</div><div class="lbl">DJs activos</div></div>
    <div class="adm-card"><i class="fas fa-users"></i><div class="num">{{ number_format($totalUsuarios) }}</div><div class="lbl">Usuarios</div></div>
</div>

<h2 style="color:#fff;font-size:17px;">Últimos pedidos pagados</h2>
<table class="tabla" style="margin-top:12px;">
    <thead><tr><th>Fecha</th><th>Cliente</th><th>Artículos</th><th class="num">Total</th></tr></thead>
    <tbody>
        @forelse ($ultimosPedidos as $pedido)
            <tr>
                <td>{{ $pedido->paid_at?->format('d-m-Y H:i') }}</td>
                <td>{{ $pedido->user?->name ?? '—' }}</td>
                <td>{{ Str::limit($pedido->items->pluck('name')->join(', '), 70) }}</td>
                <td class="num">${{ number_format((float) $pedido->total, 2) }}</td>
            </tr>
        @empty
            <tr><td colspan="4">Aún no hay pedidos.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
