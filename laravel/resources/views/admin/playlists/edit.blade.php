@extends('layouts.admin')

@section('title', 'Playlist: ' . $playlist->name)
@section('titulo_pagina', 'Playlist: ' . $playlist->name)

@section('content')
<div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:start;">

    <div>
        <div class="form" style="margin:0 0 20px;">
            <h2 style="font-size:16px;margin:0 0 10px;color:#fff;">Ajustes</h2>
            <form method="POST" action="{{ route('admin.playlists.update', $playlist) }}">
                @csrf @method('PUT')
                <label>Nombre</label>
                <input type="text" name="name" value="{{ old('name', $playlist->name) }}" required>
                <label>Descripción</label>
                <input type="text" name="description" value="{{ old('description', $playlist->description) }}">
                <label style="display:flex;align-items:center;gap:8px;">
                    <input type="checkbox" name="active" value="1" style="width:auto;" @checked(old('active', $playlist->active))>
                    Visible en el sitio
                </label>
                <button class="btn" type="submit">Guardar</button>
            </form>
        </div>

        <h2 style="font-size:16px;color:#fff;">Canciones en la playlist ({{ $tracks->count() }})</h2>
        <table class="tabla" style="margin-top:10px;">
            <tbody>
                @forelse ($tracks as $track)
                    <tr>
                        <td>{{ Str::limit($track->title, 45) }} <span style="color:#666;font-size:12px;">{{ $track->dj?->name }}</span></td>
                        <td style="text-align:right;">
                            <form method="POST" action="{{ route('admin.playlists.remove', [$playlist, $track]) }}" style="display:inline">
                                @csrf @method('DELETE')
                                <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Quitar</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td>Aún no tiene canciones. Búscalas a la derecha y agrégalas.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div>
        <h2 style="font-size:16px;color:#fff;">Agregar canciones</h2>
        <form class="controles" method="get" style="padding-top:8px;">
            <input class="inp" type="text" name="buscar" value="{{ $busqueda }}" placeholder="Buscar por título, artista o DJ...">
            <button class="btn" type="submit">Buscar</button>
        </form>

        @if ($busqueda !== '')
            <table class="tabla" style="margin-top:10px;">
                <tbody>
                    @forelse ($resultados as $track)
                        <tr>
                            <td>{{ Str::limit($track->title, 45) }} <span style="color:#666;font-size:12px;">{{ $track->dj?->name }}</span></td>
                            <td style="text-align:right;">
                                <form method="POST" action="{{ route('admin.playlists.add', [$playlist, $track]) }}" style="display:inline">
                                    @csrf
                                    <button class="btn-sec btn-sm" type="submit" style="border-color:#1db954;color:#1db954;">+ Agregar</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr><td>Sin resultados para "{{ $busqueda }}".</td></tr>
                    @endforelse
                </tbody>
            </table>
        @else
            <p style="color:#b3b3b3;font-size:13px;">Escribe algo en el buscador para encontrar canciones del catálogo.</p>
        @endif
    </div>
</div>
@endsection
