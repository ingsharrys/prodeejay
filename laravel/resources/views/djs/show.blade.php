@extends('layouts.app')

@section('title', $dj->name . ' — Prodeejay Remix')
@section('meta_description', $dj->bio ?: $dj->name)

@section('content')
<div class="container">
    <div class="phead" style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
        @if ($dj->image_url)
            <img src="{{ $dj->image_url }}" alt="DJ {{ $dj->name }}"
                 style="width:140px;height:140px;border-radius:50%;object-fit:cover;box-shadow:0 8px 24px rgba(0,0,0,.5);">
        @endif
        <div>
            <p class="tipo">{{ __('messages.dj') }}</p>
            <h1>{{ $dj->name }}</h1>
            @if ($dj->bio)
                <p class="sub">{{ $dj->bio }}</p>
            @endif
            <p class="sub">{{ number_format($tracks->total()) }} {{ __('messages.tracks') }}</p>
        </div>
    </div>

    <form class="controles" method="get">
        <input class="inp" type="text" name="q" value="{{ request('q') }}" placeholder="{{ __('messages.search_ph') }}">
        <button class="btn" type="submit">{{ __('messages.search') }}</button>
    </form>

    @include('partials.track-table')

    <p style="padding:10px 0 30px;"><a href="{{ route('djs') }}" style="color:#b3b3b3;">&laquo; {{ __('messages.view_all_djs') }}</a></p>
</div>
@endsection
