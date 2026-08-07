@extends('layouts.app')

@section('title', 'Admin — Música')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Administración</p>
        <h1>Música</h1>
    </div>

    @include('admin.partials.nav')

    <form class="controles" method="get">
        <input class="inp" type="text" name="q" value="{{ request('q') }}" placeholder="Buscar track...">
        <button class="btn" type="submit">Buscar</button>
        <a class="btn" href="{{ route('admin.tracks.create') }}"><i class="fas fa-plus"></i> Subir track</a>
    </form>

    <section class="bloque" style="padding-top:10px;">
        <table class="tabla">
            <thead>
                <tr>
                    <th>Título</th><th>DJ</th><th>Tipo</th><th class="num">Precio</th><th>Fecha</th><th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($tracks as $track)
                    <tr>
                        <td>{{ Str::limit($track->title, 60) }} @unless($track->active) <span style="color:#a33;">(inactivo)</span> @endunless</td>
                        <td>{{ $track->dj?->name ?? '—' }}</td>
                        <td>{{ $track->type }}</td>
                        <td class="num">${{ number_format((float) $track->price, 2) }}</td>
                        <td>{{ $track->released_at?->format('d-m-Y') }}</td>
                        <td style="text-align:right;white-space:nowrap;">
                            <a class="btn-sec btn-sm" href="{{ route('admin.tracks.edit', $track) }}">Editar</a>
                            <form method="POST" action="{{ route('admin.tracks.destroy', $track) }}" style="display:inline"
                                  onsubmit="return confirm('¿Eliminar este track?');">
                                @csrf @method('DELETE')
                                <button class="btn-sec btn-sm" type="submit" style="border-color:#a33;color:#ffb4b4;">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6">No hay tracks todavía. Usa "Subir track" o corre <code>php artisan wp:import</code>.</td></tr>
                @endforelse
            </tbody>
        </table>
        <div class="pagin">{{ $tracks->onEachSide(1)->links('partials.pagination') }}</div>
    </section>
</div>
@endsection
