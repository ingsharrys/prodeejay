@extends('layouts.app')

@section('title', __('messages.reset_password'))

@section('content')
<div class="form">
    <h1>{{ __('messages.reset_password') }}</h1>
    <div class="aviso">{{ __('messages.migrated_notice') }}</div>
    <form method="POST" action="{{ route('password.email') }}">
        @csrf
        <label>{{ __('messages.email') }}</label>
        <input type="email" name="email" required autofocus>
        <button class="btn" type="submit">{{ __('messages.send_reset') }}</button>
    </form>
</div>
@endsection
