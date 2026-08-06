@extends('layouts.app')

@section('title', __('messages.payment_success'))

@section('content')
<div class="container" style="text-align:center;padding:90px 20px;">
    <div style="font-size:60px;color:#1db954;"><i class="fas fa-circle-check"></i></div>
    <h1>{{ __('messages.payment_success') }}</h1>
    <p style="color:#b3b3b3;">{{ __('messages.payment_success_text') }}</p>
    <p style="margin-top:24px;"><a class="btn" href="{{ route('account') }}">{{ __('messages.go_to_account') }}</a></p>
</div>
@endsection
