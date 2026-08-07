@extends('layouts.app')

@section('title', $playlist->name . ' — Prodeejay Remix')
@section('meta_description', $playlist->description ?: $playlist->name)

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">{{ __('messages.playlist') }}</p>
        <h1>{{ $playlist->name }}</h1>
        @if ($playlist->description)
            <p class="sub">{{ $playlist->description }}</p>
        @endif
        <p class="sub">{{ number_format($tracks->total()) }} {{ __('messages.tracks') }}</p>
    </div>

    @include('partials.track-table')
</div>
@endsection
