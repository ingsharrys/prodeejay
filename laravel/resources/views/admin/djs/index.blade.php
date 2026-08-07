@extends('layouts.app')

@section('title', 'Admin — DJs')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Administración</p>
        <h1>DJs</h1>
    </div>

    @include('admin.partials.nav')

    <p style="margin:16px 0;"><a class="btn" href="{{ route('admin.djs.create') }}"><i class="fas fa-plus"></i> Agregar DJ</a></p>

    <section class="bloque" style="padding-top:0;">
        <table class="tabla">
            <thead>
                <tr><th>DJ</th><th class="num">Tracks</th><th></th></tr>
            </thead>
            <tbody>
                @forelse ($djs as $dj)
                    <tr>
                        <td><strong>{{ $dj->name }}</strong></td>
                        <td class="num">{{ number_format($dj->tracks_count) }}</td>
                        <td style="text-align:right;white-space:nowrap;">
                            <a class="btn-sec btn-sm" href="{{ route('admin.djs.show', $dj) }}">Historial y ventas</a>
                            <a class="btn-sec btn-sm" href="{{ route('admin.djs.edit', $dj) }}">Editar</a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="3">No hay DJs todavía. Usa "Agregar DJ" o corre <code>php artisan wp:import</code>.</td></tr>
                @endforelse
            </tbody>
        </table>
    </section>
</div>
@endsection
