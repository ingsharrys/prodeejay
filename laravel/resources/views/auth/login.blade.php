@extends('layouts.app')

@section('title', __('messages.login') . ' — Prodeejay Remix')

@section('content')
<div class="form">
    <h1>{{ __('messages.login') }}</h1>
    <div class="aviso">{{ __('messages.migrated_notice') }}</div>
    <form method="POST">
        @csrf
        <label>{{ __('messages.email') }}</label>
        <input type="email" name="email" value="{{ old('email') }}" required autofocus>
        <label>{{ __('messages.password') }}</label>
        <input type="password" name="password" required>
        <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" name="remember" style="width:auto;"> {{ __('messages.remember_me') }}
        </label>
        <button class="btn" type="submit">{{ __('messages.login') }}</button>
    </form>
    <p style="margin-top:18px;font-size:13px;">
        <a href="{{ route('password.request') }}" style="color:#1db954;">{{ __('messages.forgot_password') }}</a>
        &nbsp;·&nbsp;
        <a href="{{ route('register') }}" style="color:#b3b3b3;">{{ __('messages.register') }}</a>
    </p>
</div>
@endsection
