<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', config('app.name', 'Prodeejay Remix'))</title>
    @hasSection('meta_description')
        <meta name="description" content="@yield('meta_description')">
    @endif
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    @stack('head')
</head>
<body>

<nav class="nav">
    <div class="nav-inner">
        <a class="logo" href="{{ route('home') }}">PRODEEJAY</a>
        <a class="item {{ request()->routeIs('player') ? 'active' : '' }}" href="{{ route('player') }}">{{ __('messages.music') }}</a>
        <a class="item" href="{{ route('player.type', 'pack') }}">{{ __('messages.packs') }}</a>
        <a class="item" href="{{ route('player.type', 'video') }}">{{ __('messages.videos') }}</a>
        <a class="item {{ request()->routeIs('djs') ? 'active' : '' }}" href="{{ route('djs') }}">{{ __('messages.djs') }}</a>
        <a class="item {{ request()->routeIs('plans') ? 'active' : '' }}" href="{{ route('plans') }}">{{ __('messages.plans') }}</a>
        <div class="spacer"></div>
        <span class="lang">
            <a href="{{ route('locale', 'es') }}" class="{{ app()->getLocale() === 'es' ? 'on' : '' }}">ES</a>
            <a href="{{ route('locale', 'en') }}" class="{{ app()->getLocale() === 'en' ? 'on' : '' }}">EN</a>
        </span>
        <a class="cart-btn" href="{{ route('cart.index') }}" title="{{ __('messages.cart') }}">
            <i class="fas fa-shopping-cart"></i>
            <span class="n">{{ count(session('cart', [])) }}</span>
        </a>
        @auth
            @if (auth()->user()->is_admin)
                <a class="item" href="{{ route('admin.reports') }}">{{ __('messages.admin') }}</a>
            @endif
            <a class="item" href="{{ route('account') }}">{{ __('messages.my_account') }}</a>
            <form method="POST" action="{{ route('logout') }}" style="display:inline">
                @csrf
                <button class="btn-sec btn-sm" type="submit">{{ __('messages.logout') }}</button>
            </form>
        @else
            <a class="item" href="{{ route('login') }}">{{ __('messages.login') }}</a>
            <a class="btn btn-sm" href="{{ route('register') }}">{{ __('messages.register') }}</a>
        @endauth
    </div>
</nav>

<main>
    @if (session('status'))
        <div class="container"><div class="aviso">{{ session('status') }}</div></div>
    @endif
    @if ($errors->any())
        <div class="container"><div class="alerta">{{ $errors->first() }}</div></div>
    @endif

    @yield('content')
</main>

@include('partials.player-bar')

@stack('scripts')
</body>
</html>
