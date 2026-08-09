@extends('layouts.admin')

@section('title', 'Impuestos')
@section('titulo_pagina', 'Impuestos por método de pago')

@section('content')
<p style="color:#b3b3b3;font-size:13px;max-width:640px;margin:0 0 18px;">
    Define el porcentaje de impuesto que se cobra al cliente según el método de pago que elija.
    El impuesto se muestra desglosado en el checkout (subtotal + impuesto = total), se cobra en el
    total y queda registrado en cada pedido para tu contabilidad. La liquidación de los DJs se
    calcula sobre el neto, sin el impuesto.
</p>

<div class="form" style="max-width:480px;margin:0;">
    <form method="POST" action="{{ route('admin.taxes.update') }}">
        @csrf @method('PUT')

        <label><i class="fas fa-credit-card" style="color:#1db954;"></i> Impuesto pagos con tarjeta — Square (%)</label>
        <input type="number" step="0.001" min="0" max="50" name="square" value="{{ old('square', $square) }}" required>

        <label><i class="fab fa-paypal" style="color:#1db954;"></i> Impuesto pagos con PayPal (%)</label>
        <input type="number" step="0.001" min="0" max="50" name="paypal" value="{{ old('paypal', $paypal) }}" required>

        <label><i class="fab fa-stripe" style="color:#1db954;"></i> Impuesto pagos con Stripe (%)</label>
        <input type="number" step="0.001" min="0" max="50" name="stripe" value="{{ old('stripe', $stripe) }}" required>

        <button class="btn" type="submit">Guardar impuestos</button>
    </form>
</div>

<p style="color:#666;font-size:12px;margin-top:16px;">Ejemplo: con 6.6% en Square, una compra de $10.00 muestra Subtotal $10.00 + Impuesto $0.66 = Total $10.66.</p>
@endsection
