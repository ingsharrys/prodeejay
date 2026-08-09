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
            <p style="color:#b3b3b3;">
                <strong style="color:#1db954;">{{ $plan->name }}</strong> —
                {{ __('messages.downloads_left', ['count' => $restantes]) }}
                ({{ $plan->downloads_per_month }} / {{ __('messages.month') }})
                @if ($user->plan_expires_at)
                    · {{ __('messages.valid_until') }} {{ $user->plan_expires_at->format('d-m-Y') }}
                @endif
            </p>
            <p><a class="btn-sec" href="{{ route('billing') }}">{{ __('messages.manage_billing') }}</a></p>
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
                    @endforeach
                </tbody>
            </table>
        @endif
    </section>
</div>
@endsection
