@extends('layouts.admin')

@section('title', $dj->exists ? 'Editar DJ' : 'Agregar DJ')
@section('titulo_pagina', $dj->exists ? 'Editar DJ: ' . $dj->name : 'Agregar DJ')

@section('content')
<div class="form" style="max-width:620px;margin:0;">
    <form method="POST" action="{{ $dj->exists ? route('admin.djs.update', $dj) : route('admin.djs.store') }}">
        @csrf
        @if ($dj->exists) @method('PUT') @endif

        <label>Nombre *</label>
        <input type="text" name="name" value="{{ old('name', $dj->name) }}" required>

        <label>Biografía</label>
        <textarea name="bio" rows="4" style="width:100%;background:#242424;border:1px solid #333;color:#fff;border-radius:8px;padding:11px 14px;font-size:14px;">{{ old('bio', $dj->bio) }}</textarea>

        <label>URL de la foto</label>
        <input type="url" name="image_url" value="{{ old('image_url', $dj->image_url) }}" placeholder="https://.../foto.jpg">

        <button class="btn" type="submit">{{ $dj->exists ? 'Guardar cambios' : 'Crear DJ' }}</button>
    </form>
</div>

@if ($dj->exists)
<div class="form" style="max-width:620px;margin:20px 0 0;">
    <h2 style="font-size:17px;margin:0 0 8px;color:#fff;">Acceso del DJ a su panel</h2>
    <p style="color:#b3b3b3;font-size:13px;margin:0 0 10px;">
        Crea un usuario y contraseña para que {{ $dj->name }} entre al sitio y vea
        <strong>solo sus propios reportes de ventas</strong> y su música.
    </p>
    <form method="POST" action="{{ route('admin.djs.acceso', $dj) }}">
        @csrf
        <label>Correo del DJ *</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
        <label>Contraseña * (mínimo 8 caracteres)</label>
        <input type="text" name="password" value="{{ old('password') }}" required minlength="8">
        <button class="btn" type="submit">Crear / restablecer acceso</button>
    </form>
</div>
@endif
@endsection
