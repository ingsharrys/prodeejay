@extends('layouts.admin')

@section('title', 'Menú')
@section('titulo_pagina', 'Menú del sitio')

@section('content')
<p style="color:#b3b3b3;font-size:13px;max-width:680px;margin:0 0 18px;">
    Estos enlaces forman el menú principal del sitio en español e inglés. Si no creas ninguno,
    se muestra el menú estándar (Música, Packs, Videos, DJs, Planes). El orden se controla con
    el número de posición.
</p>

<div class="form" style="max-width:760px;margin:0 0 24px;">
    <h2 style="font-size:15px;margin:0 0 8px;color:#fff;">Agregar elemento al menú</h2>
    <form method="POST" action="{{ route('admin.menu.store') }}" style="display:grid;grid-template-columns:1fr 1fr 1.4fr auto;gap:10px;align-items:end;">
        @csrf
        <div><label>Texto (español) *</label><input type="text" name="label_es" placeholder="Ej: Contacto" required></div>
        <div><label>Text (English)</label><input type="text" name="label_en" placeholder="Ej: Contact"></div>
        <div>
            <label>Enlace *</label>
            <input type="text" name="url" list="urlsComunes" placeholder="/p/contacto o https://..." required>
            <datalist id="urlsComunes">
                <option value="/">Inicio</option>
                <option value="/musica">Música</option>
                <option value="/musica/pack">Packs</option>
                <option value="/musica/video">Videos</option>
                <option value="/djs">DJs</option>
                <option value="/playlists">Playlists</option>
                <option value="/planes">Planes</option>
                @foreach ($pages as $p)
                    <option value="/p/{{ $p->slug }}">{{ $p->title_es }}</option>
                @endforeach
            </datalist>
        </div>
        <button class="btn" type="submit" style="margin:0;"><i class="fas fa-plus"></i> Agregar</button>
    </form>
</div>

<table class="tabla" style="max-width:960px;">
    <thead><tr><th style="width:70px;">Orden</th><th>Español</th><th>English</th><th>Enlace</th><th>Visible</th><th></th></tr></thead>
    <tbody>
        @forelse ($items as $item)
            <tr>
                <form method="POST" action="{{ route('admin.menu.update', $item) }}">
                    @csrf @method('PUT')
                    <td><input type="number" name="position" value="{{ $item->position }}" style="width:60px;background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px;"></td>
                    <td><input type="text" name="label_es" value="{{ $item->label_es }}" style="width:100%;background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;"></td>
                    <td><input type="text" name="label_en" value="{{ $item->label_en }}" style="width:100%;background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;"></td>
                    <td><input type="text" name="url" value="{{ $item->url }}" style="width:100%;background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;"></td>
                    <td style="text-align:center;"><input type="checkbox" name="active" value="1" @checked($item->active)></td>
                    <td style="text-align:right;white-space:nowrap;">
                        <button class="btn-sec btn-sm" type="submit">Guardar</button>
                </form>
                <form method="POST" action="{{ route('admin.menu.destroy', $item) }}" style="display:inline">
                    @csrf @method('DELETE')
                    <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Quitar</button>
                </form>
                    </td>
            </tr>
        @empty
            <tr><td colspan="6">El menú está usando los enlaces estándar. Agrega el primero para personalizarlo.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
