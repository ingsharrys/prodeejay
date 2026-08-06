@extends('layouts.app')

@section('title', 'Prodeejay Remix — ' . __('messages.hero_title'))
@section('meta_description', __('messages.hero_text'))

@section('content')
<div class="hero">
    <span class="tag"><i class="fas fa-headphones"></i> {{ __('messages.hero_tag') }}</span>
    <h1>{{ __('messages.hero_title') }}<br><span>{{ __('messages.hero_highlight') }}</span></h1>
    <p>{{ __('messages.hero_text') }}</p>
    <div>
        <a class="btn" href="{{ route('player') }}"><i class="fas fa-play"></i> {{ __('messages.listen_music') }}</a>
        <a class="btn-sec" href="{{ route('plans') }}">{{ __('messages.view_plans') }}</a>
    </div>
</div>

<div class="container">
    @if ($genres->isNotEmpty())
    <section class="bloque">
        <h2>{{ __('messages.explore_genres') }}</h2>
        <div class="chips">
            @foreach ($genres as $genre)
                <a class="chip" href="{{ route('player', ['genre' => $genre->slug]) }}">{{ $genre->name }}</a>
            @endforeach
        </div>
    </section>
    @endif

    @if ($djs->isNotEmpty())
    <section class="bloque">
        <h2>{{ __('messages.our_djs') }}</h2>
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
        <p style="margin-top:22px;"><a class="btn-sec" href="{{ route('djs') }}">{{ __('messages.view_all_djs') }}</a></p>
    </section>
    @endif

    @if ($ultimos->isNotEmpty())
    <section class="bloque">
        <h2>{{ __('messages.latest_releases') }}</h2>
        <div class="chips">
            @foreach ($ultimos as $track)
                <a class="chip" href="{{ route('player', ['q' => $track->title]) }}">
                    <i class="fas fa-compact-disc" style="color:#1db954;margin-right:6px;"></i>{{ Str::limit($track->title, 45) }}
                </a>
            @endforeach
        </div>
    </section>
    @endif

    @if ($plans->isNotEmpty())
    <section class="bloque">
        <h2>{{ __('messages.membership_plans') }}</h2>
        <div class="planes">
            @foreach ($plans as $i => $plan)
                <div class="plan {{ $i > 0 ? 'destacado' : '' }}">
                    <h3>{{ $plan->name }}</h3>
                    <div class="num">{{ number_format($plan->downloads_per_month) }}</div>
                    <p class="det">{{ __('messages.downloads_month') }}</p>
                    <a class="btn" href="{{ route('plans') }}">{{ __('messages.subscribe') }}</a>
                </div>
            @endforeach
        </div>
    </section>
    @endif
</div>
@endsection
