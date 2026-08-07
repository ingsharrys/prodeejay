@extends('layouts.app')

@section('title', $dj->exists ? 'Editar DJ' : 'Agregar DJ')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Administración</p>
        <h1>{{ $dj->exists ? 'Editar DJ' : 'Agregar DJ' }}</h1>
    </div>

    @include('admin.partials.nav')

    <div class="form" style="max-width:600px;margin:24px 0;">
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
</div>
@endsection
