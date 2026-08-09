@extends('layouts.admin')

@section('title', 'Pedidos')
@section('titulo_pagina', 'Pedidos')

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
    <input class="inp" type="text" name="q" value="{{ $busca }}" placeholder="Buscar cliente por nombre o correo...">
    <button class="btn" type="submit">Filtrar</button>
</form>

<table class="tabla" style="margin-top:18px;">
    <thead>
        <tr><th>Fecha</th><th>Cliente</th><th>Artículos</th><th>Método de pago</th><th class="num">Total</th><th>Estado</th></tr>
    </thead>
    <tbody>
        @forelse ($orders as $order)
            <tr>
                <td style="white-space:nowrap;">{{ $order->paid_at?->format('d-m-Y H:i') }}</td>
                <td>
                    <strong>{{ $order->customer_name ?? $order->user?->name ?? 'Invitado' }}</strong><br>
                    <span style="color:#b3b3b3;font-size:12px;">{{ $order->customer_email ?? $order->user?->email }}</span>
                </td>
                <td style="font-size:13px;">
                    @foreach ($order->items as $item)
                        <div>{{ Str::limit($item->name, 55) }}
                            @if ($item->track?->dj)
                                <span style="color:#1db954;font-size:11px;">({{ $item->track->dj->name }})</span>
                            @endif
                            <span style="color:#b3b3b3;">— ${{ number_format((float) $item->price, 2) }}</span>
                        </div>
                    @endforeach
                </td>
                <td>{{ $order->payment_title ?? ucfirst($order->payment_method ?? '—') }}</td>
                <td class="num"><strong>${{ number_format((float) $order->total, 2) }}</strong></td>
                <td>
                    @if ($order->status === 'paid')
                        <span style="color:#1db954;">● Pagado</span>
                    @elseif ($order->status === 'refunded')
                        <span style="color:#e0a800;">● Reembolsado</span>
                    @else
                        <span style="color:#b3b3b3;">● {{ $order->status }}</span>
                    @endif
                </td>
            </tr>
        @empty
            <tr><td colspan="6">No hay pedidos con esos filtros.</td></tr>
        @endforelse
    </tbody>
</table>
<div class="pagin">{{ $orders->onEachSide(1)->links('partials.pagination') }}</div>
@endsection
