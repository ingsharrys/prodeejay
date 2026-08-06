@extends('layouts.app')

@section('title', __('messages.register') . ' — Prodeejay Remix')

@section('content')
<div class="form">
    <h1>{{ __('messages.register') }}</h1>
    <form method="POST">
        @csrf
        <label>{{ __('messages.name') }}</label>
        <input type="text" name="name" value="{{ old('name') }}" required autofocus>
        <label>{{ __('messages.email') }}</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
        <label>{{ __('messages.password') }}</label>
        <input type="password" name="password" required>
        <label>{{ __('messages.confirm_password') }}</label>
        <input type="password" name="password_confirmation" required>
        <button class="btn" type="submit">{{ __('messages.register') }}</button>
    </form>
    <p style="margin-top:18px;font-size:13px;">
        <a href="{{ route('login') }}" style="color:#b3b3b3;">{{ __('messages.login') }}</a>
    </p>
</div>
@endsection
