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

@php
    $logoSitio = \Illuminate\Support\Facades\Schema::hasTable('settings') ? \App\Models\Setting::get('logo_url') : null;
    $menuCms = \Illuminate\Support\Facades\Schema::hasTable('menu_items')
        ? \App\Models\MenuItem::where('active', true)->orderBy('position')->get()
        : collect();
@endphp
<nav class="nav">
    <div class="nav-inner">
        <a class="logo" href="{{ route('home') }}">
            @if ($logoSitio)
                <img src="{{ $logoSitio }}" alt="{{ config('app.name', 'Prodeejay') }}" style="height:36px;max-width:180px;object-fit:contain;display:block;">
            @else
                PRODEEJAY
            @endif
        </a>
        @if ($menuCms->isNotEmpty())
            @foreach ($menuCms as $itemMenu)
                <a class="item {{ url()->current() === url($itemMenu->url) ? 'active' : '' }}" href="{{ url($itemMenu->url) }}">{{ $itemMenu->label() }}</a>
            @endforeach
        @else
            <a class="item {{ request()->routeIs('player') ? 'active' : '' }}" href="{{ route('player') }}">{{ __('messages.music') }}</a>
            <a class="item" href="{{ route('player.type', 'pack') }}">{{ __('messages.packs') }}</a>
            <a class="item" href="{{ route('player.type', 'video') }}">{{ __('messages.videos') }}</a>
            <a class="item {{ request()->routeIs('djs') ? 'active' : '' }}" href="{{ route('djs') }}">{{ __('messages.djs') }}</a>
            <a class="item {{ request()->routeIs('plans') ? 'active' : '' }}" href="{{ route('plans') }}">{{ __('messages.plans') }}</a>
        @endif
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
            @if (auth()->user()->isAdmin())
                <a class="item" href="{{ route('admin.dashboard') }}">{{ __('messages.admin') }}</a>
            @elseif (auth()->user()->isDj())
                <a class="item" href="{{ route('dj.panel') }}">Mi panel DJ</a>
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
