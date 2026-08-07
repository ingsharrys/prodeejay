@extends('layouts.app')

@section('title', __('messages.my_profile') . ' — Prodeejay')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">{{ $user->email }}</p>
        <h1>{{ __('messages.my_profile') }}</h1>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:22px;margin:26px 0;">
        <div class="form" style="margin:0;">
            <h2 style="font-size:17px;margin:0 0 10px;color:#fff;">{{ __('messages.my_data') }}</h2>
            <form method="POST" action="{{ route('profile.update') }}">
                @csrf @method('PUT')
                <label>{{ __('messages.name') }}</label>
                <input type="text" name="name" value="{{ old('name', $user->name) }}" required>
                <label>{{ __('messages.email') }}</label>
                <input type="email" name="email" value="{{ old('email', $user->email) }}" required>
                <button class="btn" type="submit">{{ __('messages.save') }}</button>
            </form>
        </div>

        <div class="form" style="margin:0;">
            <h2 style="font-size:17px;margin:0 0 10px;color:#fff;">{{ __('messages.change_password') }}</h2>
            <form method="POST" action="{{ route('profile.password') }}">
                @csrf @method('PUT')
                <label>{{ __('messages.current_password') }}</label>
                <input type="password" name="current_password" required>
                <label>{{ __('messages.new_password') }} ({{ __('messages.min_8') }})</label>
                <input type="password" name="password" required minlength="8">
                <label>{{ __('messages.confirm_password') }}</label>
                <input type="password" name="password_confirmation" required>
                <button class="btn" type="submit">{{ __('messages.change_password') }}</button>
            </form>
        </div>
    </div>
</div>
@endsection
