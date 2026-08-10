@extends('layouts.app')

@section('title', __('messages.my_account') . ' — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">{{ $user->email }}</p>
        <h1>{{ $user->name }}</h1>
        <p class="sub"><a href="{{ route('profile') }}" style="color:#1db954;">{{ __('messages.my_profile') }} · {{ __('messages.change_password') }}</a></p>
    </div>

    <section class="bloque">
        <h2>{{ __('messages.current_plan') }}</h2>
        @if ($plan)
            @php
                $usadas = $plan->downloads_per_month - ($restantes ?? 0);
                $pctUso = $plan->downloads_per_month > 0 ? min(100, round($usadas * 100 / $plan->downloads_per_month)) : 0;
                $dias = $user->plan_expires_at ? (int) now()->startOfDay()->diffInDays($user->plan_expires_at->copy()->startOfDay(), false) : null;
            @endphp
            <div style="background:#181818;border:1px solid #242424;border-radius:12px;padding:18px 20px;max-width:560px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
                    <strong style="color:#1db954;font-size:18px;">{{ $plan->name }}</strong>
                    @if ($user->plan_expires_at)
                        <span style="color:{{ $dias !== null && $dias <= 7 ? '#e8b433' : '#b3b3b3' }};font-size:13px;">
                            {{ __('messages.valid_until') }} {{ $user->plan_expires_at->format('d-m-Y') }}
                            @if ($dias !== null && $dias >= 0) ({{ $dias }} {{ __('messages.days') }}) @endif
                        </span>
                    @endif
                </div>
                <div style="margin:14px 0 6px;color:#b3b3b3;font-size:13px;">
                    {{ __('messages.downloads_left', ['count' => $restantes]) }} · {{ $usadas }}/{{ $plan->downloads_per_month }} {{ __('messages.used_this_month') }}
                </div>
                <div style="background:#242424;border-radius:99px;height:10px;overflow:hidden;">
                    <div style="height:100%;width:{{ $pctUso }}%;background:{{ $pctUso >= 90 ? '#e05252' : ($pctUso >= 70 ? '#e8b433' : '#1db954') }};border-radius:99px;"></div>
                </div>
                <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
                    <a class="btn" href="{{ route('subscribe', $plan) }}"><i class="fas fa-rotate"></i> {{ __('messages.sub_renew') }}</a>
                    <a class="btn-sec" href="{{ route('plans') }}">{{ __('messages.view_plans') }}</a>
                </div>
                @if ($dias !== null && $dias <= 7 && $dias >= 0)
                    <p style="color:#e8b433;font-size:13px;margin:12px 0 0;"><i class="fas fa-triangle-exclamation"></i> {{ __('messages.sub_expiring') }}</p>
                @endif
            </div>
        @else
            <p style="color:#b3b3b3;">{{ __('messages.no_plan') }}</p>
            <p><a class="btn" href="{{ route('plans') }}">{{ __('messages.view_plans') }}</a></p>
        @endif
    </section>

    <section class="bloque">
        <h2>{{ __('messages.my_purchases') }}</h2>
        @if ($compras->isEmpty())
            <p style="color:#b3b3b3;">—</p>
        @else
            <table class="tabla">
                <thead>
                    <tr>
                        <th>{{ __('messages.date') }}</th>
                        <th>{{ __('messages.title') }}</th>
                        <th class="num">{{ __('messages.total') }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($compras as $orden)
                        @if ($orden->esSuscripcion())
                            <tr>
                                <td>{{ $orden->paid_at?->format('d-m-Y') }}</td>
                                <td>
                                    <i class="fas fa-id-card" style="color:#1db954;"></i>
                                    {{ __('messages.sub_label') }}: {{ $orden->plan?->name }} × {{ $orden->plan_months }} {{ $orden->plan_months === 1 ? __('messages.month_one') : __('messages.months') }}
                                </td>
                                <td class="num">${{ number_format((float) $orden->total, 2) }}</td>
                                <td></td>
                            </tr>
                        @else
                            @foreach ($orden->items as $item)
                                <tr>
                                    <td>{{ $orden->paid_at?->format('d-m-Y') }}</td>
                                    <td>{{ $item->name }}</td>
                                    <td class="num">${{ number_format((float) $item->price, 2) }}</td>
                                    <td style="text-align:right;">
                                        @if ($item->track)
                                            <a class="bcarrito" href="{{ route('download', $item->track) }}">
                                                <i class="fas fa-download"></i> {{ __('messages.download') }}
                                            </a>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        @endif
                    @endforeach
                </tbody>
            </table>
        @endif
    </section>
</div>
@endsection
