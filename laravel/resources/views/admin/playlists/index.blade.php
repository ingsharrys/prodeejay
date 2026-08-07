@extends('layouts.admin')

@section('title', 'Playlists')
@section('titulo_pagina', 'Playlists')

@section('content')
<div class="form" style="max-width:560px;margin:0 0 22px;">
    <form method="POST" action="{{ route('admin.playlists.store') }}">
        @csrf
        <label>Nombre de la playlist</label>
        <input type="text" name="name" placeholder="Ej: Lo mejor de la Guaracha 2026" required>
        <label>Descripción (opcional)</label>
        <input type="text" name="description" placeholder="Breve descripción para el sitio">
        <button class="btn" type="submit"><i class="fas fa-plus"></i> Crear playlist</button>
    </form>
</div>

<table class="tabla">
    <thead><tr><th>Playlist</th><th>Estado</th><th class="num">Canciones</th><th></th></tr></thead>
    <tbody>
        @forelse ($playlists as $playlist)
            <tr>
                <td><strong>{{ $playlist->name }}</strong></td>
                <td>
                    @if ($playlist->active)
                        <span style="color:#1db954;">● Visible</span>
                    @else
                        <span style="color:#a33;">● Oculta</span>
                    @endif
                </td>
                <td class="num">{{ number_format($playlist->tracks_count) }}</td>
                <td style="text-align:right;white-space:nowrap;">
                    <a class="btn-sec btn-sm" href="{{ route('playlists.show', $playlist) }}" target="_blank">Ver en el sitio</a>
                    <a class="btn-sec btn-sm" href="{{ route('admin.playlists.edit', $playlist) }}">Canciones y ajustes</a>
                    <form method="POST" action="{{ route('admin.playlists.destroy', $playlist) }}" style="display:inline"
                          onsubmit="return confirm('¿Eliminar la playlist {{ $playlist->name }}?');">
                        @csrf @method('DELETE')
                        <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Eliminar</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="4">Aún no hay playlists. Crea la primera arriba.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
