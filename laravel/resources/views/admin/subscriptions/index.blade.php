@extends('layouts.admin')

@section('title', 'Suscripciones')
@section('titulo_pagina', 'Suscripciones')

@section('content')

<h2 style="color:#fff;font-size:17px;margin:0 0 12px;">Tipos de suscripción</h2>
<p style="color:#b3b3b3;font-size:13px;margin:0 0 14px;">
    Cada tipo define <strong>cuántas canciones puede descargar al mes</strong> el suscriptor. El contador se reinicia automáticamente cada mes.
</p>

<table class="tabla" style="max-width:860px;margin-bottom:16px;">
    <thead>
        <tr><th>Nombre</th><th class="num">Precio/mes (USD)</th><th class="num">Descargas/mes</th><th class="num">Suscriptores</th><th>Estado</th><th></th></tr>
    </thead>
    <tbody>
        @foreach ($plans as $plan)
            <tr>
                <form method="POST" action="{{ route('admin.subs.plan.update', $plan) }}">
                    @csrf @method('PUT')
                    <td><input type="text" name="name" value="{{ $plan->name }}" style="background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;font-size:13px;width:130px;"></td>
                    <td class="num"><input type="number" step="0.01" min="0" name="price" value="{{ $plan->price }}" style="background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;font-size:13px;width:90px;text-align:right;"></td>
                    <td class="num"><input type="number" min="1" name="downloads_per_month" value="{{ $plan->downloads_per_month }}" style="background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;font-size:13px;width:90px;text-align:right;"></td>
                    <td class="num">{{ number_format($plan->users_count) }}</td>
                    <td>
                        @if ($plan->active)
                            <span style="color:#1db954;">● Activo</span>
                        @else
                            <span style="color:#a33;">● Inactivo</span>
                        @endif
                    </td>
                    <td style="text-align:right;white-space:nowrap;">
                        <button class="btn-sec btn-sm" type="submit">Guardar</button>
                </form>
                <form method="POST" action="{{ route('admin.subs.plan.toggle', $plan) }}" style="display:inline">
                    @csrf
                    <button class="btn-sec btn-sm" type="submit" style="{{ $plan->active ? 'border-color:#a33;color:#ffb4b4;' : 'border-color:#1db954;color:#1db954;' }}">
                        {{ $plan->active ? 'Desactivar' : 'Activar' }}
                    </button>
                </form>
                    </td>
            </tr>
        @endforeach
    </tbody>
</table>

<div class="form" style="max-width:640px;margin:0 0 34px;">
    <h2 style="font-size:15px;margin:0 0 8px;color:#fff;">Crear nuevo tipo de suscripción</h2>
    <form method="POST" action="{{ route('admin.subs.plan.store') }}" style="display:grid;grid-template-columns:1fr 120px 120px auto;gap:10px;align-items:end;">
        @csrf
        <div><label>Nombre</label><input type="text" name="name" placeholder="Ej: VIP" required></div>
        <div><label>Precio/mes</label><input type="number" step="0.01" min="0" name="price" value="0" required></div>
        <div><label>Descargas/mes</label><input type="number" min="1" name="downloads_per_month" value="100" required></div>
        <button class="btn" type="submit" style="margin:0;"><i class="fas fa-plus"></i> Crear</button>
    </form>
</div>

<h2 style="color:#fff;font-size:17px;margin:0 0 12px;">Asignar suscripción a un usuario</h2>
<p style="color:#b3b3b3;font-size:13px;margin:0 0 14px;">
    Cuando un cliente pague su membresía (por PayPal, Square o cualquier medio), asígnale aquí su plan. Si ya tiene el mismo plan vigente, los meses se suman.
</p>
<div class="form" style="max-width:640px;margin:0 0 34px;">
    <form method="POST" action="{{ route('admin.subs.assign') }}" style="display:grid;grid-template-columns:1fr 150px 90px auto;gap:10px;align-items:end;">
        @csrf
        <div><label>Correo del usuario</label><input type="email" name="email" placeholder="cliente@correo.com" required></div>
        <div>
            <label>Plan</label>
            <select name="plan_id" class="sel" style="width:100%;border-radius:8px;">
                @foreach ($plans->where('active', true) as $plan)
                    <option value="{{ $plan->id }}">{{ $plan->name }} ({{ $plan->downloads_per_month }}/mes)</option>
                @endforeach
            </select>
        </div>
        <div><label>Meses</label><input type="number" min="1" max="24" name="meses" value="1" required></div>
        <button class="btn" type="submit" style="margin:0;">Asignar</button>
    </form>
</div>

<h2 style="color:#fff;font-size:17px;margin:0 0 12px;">Suscriptores activos ({{ $suscriptores->count() }})</h2>
<table class="tabla">
    <thead>
        <tr><th>Usuario</th><th>Plan</th><th class="num">Descargas usadas este mes</th><th>Vence</th><th></th></tr>
    </thead>
    <tbody>
        @forelse ($suscriptores as $s)
            <tr>
                <td><strong>{{ $s->name }}</strong><br><span style="color:#b3b3b3;font-size:12px;">{{ $s->email }}</span></td>
                <td>{{ $s->plan_actual?->name ?? '—' }}</td>
                <td class="num">{{ number_format($s->usadas) }} / {{ number_format($s->plan_actual?->downloads_per_month ?? 0) }}</td>
                <td>
                    @if ($s->plan_expires_at)
                        {{ $s->plan_expires_at->format('d-m-Y') }}
                        @if ($s->plan_expires_at->diffInDays(now()) <= 7 && $s->plan_expires_at->isFuture())
                            <span style="color:#e0a800;font-size:12px;">(pronto)</span>
                        @endif
                    @else
                        Sin vencimiento
                    @endif
                </td>
                <td style="text-align:right;">
                    <form method="POST" action="{{ route('admin.subs.revoke', $s) }}" style="display:inline"
                          onsubmit="return confirm('¿Cancelar la suscripción de {{ $s->email }}?');">
                        @csrf @method('DELETE')
                        <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Cancelar</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="5">Aún no hay suscriptores. Asigna el primero arriba.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
