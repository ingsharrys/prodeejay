@extends('layouts.app')

@section('title', __('messages.cart') . ' — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">Prodeejay</p>
        <h1>{{ __('messages.cart') }}</h1>
    </div>

    <section class="bloque">
        @if ($tracks->isEmpty())
            <p style="color:#b3b3b3;">{{ __('messages.cart_empty') }}</p>
            <p><a class="btn" href="{{ route('player') }}"><i class="fas fa-play"></i> {{ __('messages.listen_music') }}</a></p>
        @else
            <table class="tabla">
                <thead>
                    <tr>
                        <th>{{ __('messages.title') }}</th>
                        <th class="num">{{ __('messages.price') }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($tracks as $track)
                        <tr>
                            <td>{{ $track->title }}</td>
                            <td class="num">${{ number_format((float) $track->price, 2) }}</td>
                            <td style="text-align:right;">
                                <form method="POST" action="{{ route('cart.remove', $track) }}" style="margin:0">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn-sec btn-sm" type="submit">{{ __('messages.remove') }}</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    <tr>
                        <td><strong>{{ __('messages.total') }}</strong></td>
                        <td class="num"><strong>${{ number_format((float) $total, 2) }}</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <p style="margin-top:24px;">
                @auth
                    <a class="btn" href="{{ route('checkout') }}"><i class="fas fa-credit-card"></i> {{ __('messages.pay_with_stripe') }}</a>
                @else
                    <a class="btn" href="{{ route('login') }}">{{ __('messages.login') }}</a>
                @endauth
            </p>
        @endif
    </section>
</div>
@endsection
