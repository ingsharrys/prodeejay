@extends('layouts.admin')

@section('title', 'Sitio')
@section('titulo_pagina', 'Identidad del sitio')

@section('content')
<div class="form" style="max-width:520px;margin:0;">
    <h2 style="font-size:15px;margin:0 0 10px;color:#fff;"><i class="fas fa-image" style="color:#1db954;"></i> Logo del sitio</h2>

    @if ($logo)
        <p style="background:#242424;border-radius:10px;padding:16px;text-align:center;">
            <img src="{{ $logo }}" alt="Logo" style="max-height:70px;max-width:100%;">
        </p>
    @else
        <p style="color:#b3b3b3;font-size:13px;">Ahora se muestra el nombre "PRODEEJAY" en texto. Sube tu logo para reemplazarlo.</p>
    @endif

    <form method="POST" action="{{ route('admin.site.update') }}" enctype="multipart/form-data">
        @csrf @method('PUT')

        <label><i class="fas fa-upload" style="color:#1db954;"></i> Subir logo (PNG/JPG/SVG/WebP, ideal fondo transparente)</label>
        <input type="file" name="logo" accept="image/*" style="padding:8px;">

        <label style="color:#777;font-size:12px;">…o pegar la URL del logo</label>
        <input type="url" name="logo_url" placeholder="https://.../logo.png">

        @if ($logo)
            <label style="display:flex;align-items:center;gap:8px;margin-top:10px;">
                <input type="checkbox" name="quitar" value="1" style="width:auto;"> Quitar el logo (volver al texto)
            </label>
        @endif

        <button class="btn" type="submit">Guardar</button>
    </form>
</div>
@endsection
