@extends('layouts.app')

@section('title', 'Playlists — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Prodeejay</p>
        <h1>Playlists</h1>
        <p class="sub">Selecciones curadas de remixes y edits para tus sets.</p>
    </div>

    <section class="bloque">
        <div class="djs-grid">
            @forelse ($playlists as $playlist)
                <a class="dj-card" href="{{ route('playlists.show', $playlist) }}">
                    <div class="dj-ini"><i class="fas fa-list-ul"></i></div>
                    <h3>{{ $playlist->name }}</h3>
                    <p>{{ number_format($playlist->tracks_count) }} {{ __('messages.tracks') }}</p>
                </a>
            @empty
                <p style="color:#b3b3b3;">Aún no hay playlists publicadas.</p>
            @endforelse
        </div>
    </section>
</div>
@endsection
