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
                @php $esActual = ($planActual ?? null) && $planActual->id === $plan->id; @endphp
                <div class="plan {{ $esActual || $i > 0 ? 'destacado' : '' }}" @if ($esActual) style="border-color:#1db954;" @endif>
                    @if ($esActual)
                        <p style="color:#1db954;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;"><i class="fas fa-circle-check"></i> {{ __('messages.current_plan') }}</p>
                    @endif
                    <h3>{{ $plan->name }}</h3>
                    @if ((float) $plan->price > 0)
                        <p class="det">${{ number_format((float) $plan->price, 2) }} / {{ __('messages.month') }}</p>
                    @else
                        <p class="det">{{ __('messages.free') }}</p>
                    @endif
                    <div class="num">{{ number_format($plan->downloads_per_month) }}</div>
                    <p class="det">{{ __('messages.downloads_month') }}</p>
                    @auth
                        <a class="btn" href="{{ route('subscribe', $plan) }}">
                            {{ $esActual ? __('messages.sub_renew') : __('messages.subscribe') }}
                        </a>
                        @if ($esActual && auth()->user()->plan_expires_at)
                            <p class="det" style="margin-top:8px;">{{ __('messages.valid_until') }} {{ auth()->user()->plan_expires_at->format('d-m-Y') }}</p>
                        @endif
                    @else
                        <a class="btn" href="{{ route('register') }}">{{ __('messages.register') }}</a>
                    @endauth
                </div>
            @endforeach
        </div>
        <p style="color:#8a8a8a;font-size:13px;margin-top:18px;">{{ __('messages.sub_note') }}</p>
    </section>
</div>
@endsection
