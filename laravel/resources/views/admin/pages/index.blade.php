@extends('layouts.admin')

@section('title', 'Páginas')
@section('titulo_pagina', 'Páginas del sitio')

@section('content')
<div style="margin:0 0 16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
    <a class="btn" href="{{ route('admin.pages.create') }}"><i class="fas fa-plus"></i> Crear página</a>
    <form method="POST" action="{{ route('admin.pages.instalar') }}" style="display:inline;margin:0;">
        @csrf
        <button class="btn-sec" type="submit" style="margin:0;"><i class="fas fa-wand-magic-sparkles"></i> Crear páginas por defecto</button>
    </form>
    <span style="color:#8a8a8a;font-size:12px;">Crea inicio, suscripciones, djs, packs, sets-mixes y video (no toca las que ya existen).</span>
</div>

<div class="form" style="max-width:560px;margin:0 0 22px;">
    <h2 style="font-size:15px;margin:0 0 8px;color:#fff;"><i class="fas fa-house" style="color:#1db954;"></i> Página de inicio del sitio</h2>
    <form method="POST" action="{{ route('admin.pages.home') }}" style="display:flex;gap:10px;align-items:end;">
        @csrf
        <div style="flex:1;">
            <label>¿Qué se muestra en la portada?</label>
            <select name="page_id" class="sel" style="width:100%;border-radius:8px;">
                <option value="0" @selected($homePageId === 0)>Landing por defecto (reproductor, DJs, planes)</option>
                @foreach ($pages->where('active', true) as $p)
                    <option value="{{ $p->id }}" @selected($homePageId === $p->id)>Página: {{ $p->title_es }}</option>
                @endforeach
            </select>
        </div>
        <button class="btn" type="submit" style="margin:0;">Guardar</button>
    </form>
</div>

<table class="tabla">
    <thead><tr><th>Página</th><th>URL</th><th>Tipo</th><th>Estado</th><th></th></tr></thead>
    <tbody>
        @forelse ($pages as $p)
            <tr>
                <td>
                    <strong>{{ $p->title_es }}</strong>
                    @if ($homePageId === $p->id) <span style="color:#1db954;font-size:11px;">● PORTADA</span> @endif
                </td>
                <td><a href="{{ url('/' . $p->slug) }}" target="_blank" style="color:#1db954;">/{{ $p->slug }}</a></td>
                <td style="font-size:12px;color:#b3b3b3;">
                    @if ($p->hasBlocks())
                        <span style="color:#1db954;"><i class="fas fa-shapes"></i> Builder ({{ count($p->blocks) }} bloques)</span>
                    @else
                        Texto
                    @endif
                </td>
                <td>
                    @if ($p->active) <span style="color:#1db954;">● Publicada</span>
                    @else <span style="color:#a33;">● Borrador</span> @endif
                </td>
                <td style="text-align:right;white-space:nowrap;">
                    <a class="btn-sec btn-sm" href="{{ route('admin.pages.edit', $p) }}"><i class="fas fa-pen"></i> Editar</a>
                    <form method="POST" action="{{ route('admin.pages.destroy', $p) }}" style="display:inline"
                          onsubmit="return confirm('¿Eliminar la página {{ $p->title_es }}?');">
                        @csrf @method('DELETE')
                        <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Eliminar</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="5">Aún no hay páginas. Crea la primera (por ejemplo: Contacto, Sobre nosotros, Términos).</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
