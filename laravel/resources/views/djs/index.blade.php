@extends('layouts.app')

@section('title', __('messages.our_djs') . ' — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">{{ __('messages.djs') }}</p>
        <h1>{{ __('messages.our_djs') }}</h1>
    </div>

    <section class="bloque">
        <div class="djs-grid">
            @foreach ($djs as $dj)
                <a class="dj-card" href="{{ route('djs.show', $dj) }}">
                    @if ($dj->image_url)
                        <img src="{{ $dj->image_url }}" alt="DJ {{ $dj->name }}" loading="lazy">
                    @else
                        <div class="dj-ini">{{ mb_strtoupper(mb_substr($dj->name, 0, 1)) }}</div>
                    @endif
                    <h3>{{ $dj->name }}</h3>
                    <p>{{ number_format($dj->tracks_count) }} {{ __('messages.tracks') }}</p>
                </a>
            @endforeach
        </div>
    </section>
</div>
@endsection
