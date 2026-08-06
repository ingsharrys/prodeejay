@extends('layouts.app')

@section('title', __('messages.membership_plans') . ' — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Prodeejay</p>
        <h1>{{ __('messages.membership_plans') }}</h1>
    </div>

    <section class="bloque">
        <div class="planes">
            @foreach ($plans as $i => $plan)
                <div class="plan {{ $i > 0 ? 'destacado' : '' }}">
                    <h3>{{ $plan->name }}</h3>
                    @if ((float) $plan->price > 0)
                        <p class="det">${{ number_format((float) $plan->price, 2) }} / {{ __('messages.month') }}</p>
                    @endif
                    <div class="num">{{ number_format($plan->downloads_per_month) }}</div>
                    <p class="det">{{ __('messages.downloads_month') }}</p>
                    @auth
                        <a class="btn" href="{{ route('subscribe', $plan) }}">{{ __('messages.subscribe') }}</a>
                    @else
                        <a class="btn" href="{{ route('register') }}">{{ __('messages.register') }}</a>
                    @endauth
                </div>
            @endforeach
        </div>
    </section>
</div>
@endsection
