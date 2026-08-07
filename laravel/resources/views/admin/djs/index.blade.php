@extends('layouts.admin')

@section('title', 'DJs')
@section('titulo_pagina', 'DJs')

@section('content')
<p style="margin:0 0 16px;"><a class="btn" href="{{ route('admin.djs.create') }}"><i class="fas fa-plus"></i> Agregar DJ</a></p>

<table class="tabla">
    <thead>
        <tr><th>DJ</th><th>Estado</th><th class="num">Tracks</th><th></th></tr>
    </thead>
    <tbody>
        @forelse ($djs as $dj)
            <tr>
                <td><strong>{{ $dj->name }}</strong></td>
                <td>
                    @if ($dj->active)
                        <span style="color:#1db954;">● Activo</span>
                    @else
                        <span style="color:#a33;">● Deshabilitado</span>
                    @endif
                </td>
                <td class="num">{{ number_format($dj->tracks_count) }}</td>
                <td style="text-align:right;white-space:nowrap;">
                    <a class="btn-sec btn-sm" href="{{ route('admin.djs.show', $dj) }}">Historial y ventas</a>
                    <a class="btn-sec btn-sm" href="{{ route('admin.djs.edit', $dj) }}">Editar</a>
                    <form method="POST" action="{{ route('admin.djs.toggle', $dj) }}" style="display:inline">
                        @csrf
                        <button class="btn-sec btn-sm" type="submit"
                            style="{{ $dj->active ? 'border-color:#a33;color:#ffb4b4;' : 'border-color:#1db954;color:#1db954;' }}">
                            {{ $dj->active ? 'Deshabilitar' : 'Habilitar' }}
                        </button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="4">No hay DJs todavía.</td></tr>
        @endforelse
    </tbody>
</table>
@endsection
