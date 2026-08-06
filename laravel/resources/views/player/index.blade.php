@extends('layouts.app')

@php
    $titulos = [
        'pack'  => __('messages.packs'),
        'video' => __('messages.videos'),
        'set'   => __('messages.sets'),
    ];
    $titulo = $titulos[$type ?? ''] ?? __('messages.new_releases');
@endphp

@section('title', $titulo . ' — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">{{ __('messages.playlist') }}</p>
        <h1>{{ $titulo }}</h1>
    </div>

    <form class="controles" method="get">
        <input class="inp" type="text" name="q" value="{{ request('q') }}" placeholder="{{ __('messages.search_ph') }}">
        <select class="sel" name="genre" onchange="this.form.submit()">
            <option value="">{{ __('messages.all_genres') }}</option>
            @foreach ($genres as $genre)
                <option value="{{ $genre->slug }}" @selected(request('genre') === $genre->slug)>{{ $genre->name }}</option>
            @endforeach
        </select>
        <button class="btn" type="submit">{{ __('messages.search') }}</button>
    </form>

    @include('partials.track-table')
</div>
@endsection
