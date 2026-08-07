@extends('layouts.admin')

@section('title', 'Géneros')
@section('titulo_pagina', 'Géneros / Categorías de música')

@section('content')
<div class="form" style="max-width:480px;margin:0 0 22px;">
    <form method="POST" action="{{ route('admin.genres.store') }}" style="display:flex;gap:10px;align-items:flex-end;">
        @csrf
        <div style="flex:1;">
            <label>Nuevo género</label>
            <input type="text" name="name" placeholder="Ej: Guaracha, Tribal, Aleteo..." required>
        </div>
        <button class="btn" type="submit"><i class="fas fa-plus"></i> Crear</button>
    </form>
</div>

<table class="tabla" style="max-width:640px;">
    <thead><tr><th>Género</th><th class="num">Tracks</th><th></th></tr></thead>
    <tbody>
        @forelse ($genres as $genre)
            <tr>
                <td>
                    <form method="POST" action="{{ route('admin.genres.update', $genre) }}" style="display:flex;gap:8px;">
                        @csrf @method('PUT')
                        <input type="text" name="name" value="{{ $genre->name }}"
                               style="background:#242424;border:1px solid #333;color:#fff;border-radius:6px;padding:6px 10px;font-size:13px;">
                        <button class="btn-sec btn-sm" type="submit">Renombrar</button>
                    </form>
                </td>
                <td class="num">{{ number_format($genre->tracks_count) }}</td>
                <td style="text-align:right;">
                    <form method="POST" action="{{ route('admin.genres.destroy', $genre) }}" style="display:inline"
                          onsubmit="return confirm('¿Eliminar el género {{ $genre->name }}? Sus tracks quedarán sin género.');">
                        @csrf @method('DELETE')
                        <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Eliminar</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="3">No hay géneros todavía.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
