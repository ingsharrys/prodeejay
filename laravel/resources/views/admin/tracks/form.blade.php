@extends('layouts.admin')

@section('title', $track->exists ? 'Editar track' : 'Subir track')
@section('titulo_pagina', $track->exists ? 'Editar track' : 'Subir track')

@section('content')
<div class="form" style="max-width:720px;margin:0;">
    <form method="POST" action="{{ $track->exists ? route('admin.tracks.update', $track) : route('admin.tracks.store') }}">
        @csrf
        @if ($track->exists) @method('PUT') @endif

        <label>Título *</label>
        <input type="text" name="title" value="{{ old('title', $track->title) }}" required>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
            <div>
                <label>Tipo *</label>
                <select name="type" class="sel" style="width:100%;border-radius:8px;">
                    @foreach (['audio' => 'Audio', 'video' => 'Video', 'pack' => 'Pack', 'set' => 'Set'] as $v => $l)
                        <option value="{{ $v }}" @selected(old('type', $track->type) === $v)>{{ $l }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label>Precio (USD) *</label>
                <input type="number" step="0.01" min="0" name="price" value="{{ old('price', $track->price) }}" required>
            </div>
            <div>
                <label>DJ</label>
                <select name="dj_id" class="sel" style="width:100%;border-radius:8px;">
                    <option value="">— Sin DJ —</option>
                    @foreach ($djs as $dj)
                        <option value="{{ $dj->id }}" @selected(old('dj_id', $track->dj_id) == $dj->id)>{{ $dj->name }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label>Género</label>
                <select name="genre_id" class="sel" style="width:100%;border-radius:8px;">
                    <option value="">— Sin género —</option>
                    @foreach ($genres as $genre)
                        <option value="{{ $genre->id }}" @selected(old('genre_id', $track->genre_id) == $genre->id)>{{ $genre->name }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label>Artista original</label>
                <input type="text" name="artist" value="{{ old('artist', $track->artist) }}">
            </div>
            <div>
                <label>BPM</label>
                <input type="text" name="bpm" value="{{ old('bpm', $track->bpm) }}">
            </div>
        </div>

        <label>URL del preview (lo que se escucha gratis en el reproductor)</label>
        <input type="url" name="preview_url" value="{{ old('preview_url', $track->preview_url) }}" placeholder="https://.../preview.mp3">

        <label>URL del archivo completo (lo que se descarga al comprar)</label>
        <input type="url" name="file_url" value="{{ old('file_url', $track->file_url) }}" placeholder="https://.../track-completo.mp3">

        <label>Fecha de lanzamiento</label>
        <input type="date" name="released_at" value="{{ old('released_at', $track->released_at?->format('Y-m-d')) }}">

        <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" name="active" value="1" style="width:auto;" @checked(old('active', $track->active)) >
            Visible en la tienda
        </label>

        <button class="btn" type="submit">{{ $track->exists ? 'Guardar cambios' : 'Crear track' }}</button>
    </form>
</div>
@endsection
