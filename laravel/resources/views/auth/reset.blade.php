@extends('layouts.app')

@section('title', __('messages.reset_password'))

@section('content')
<div class="form">
    <h1>{{ __('messages.reset_password') }}</h1>
    <form method="POST" action="{{ route('password.update') }}">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">
        <label>{{ __('messages.email') }}</label>
        <input type="email" name="email" value="{{ $email }}" required>
        <label>{{ __('messages.password') }}</label>
        <input type="password" name="password" required>
        <label>{{ __('messages.confirm_password') }}</label>
        <input type="password" name="password_confirmation" required>
        <button class="btn" type="submit">{{ __('messages.reset_password') }}</button>
    </form>
</div>
@endsection
