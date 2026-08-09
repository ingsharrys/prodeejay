<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Administración') — Prodeejay</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body{padding-bottom:0;background:#0f0f0f}
        .adm{display:flex;min-height:100vh}
        .adm-side{width:225px;flex-shrink:0;background:#000;border-right:1px solid #1f1f1f;padding:22px 14px;display:flex;flex-direction:column;gap:4px;position:sticky;top:0;height:100vh;overflow-y:auto}
        .adm-side .logo{color:#1db954;font-weight:900;font-size:18px;letter-spacing:.5px;padding:0 10px 18px}
        .adm-side a{display:flex;align-items:center;gap:12px;color:#b3b3b3;font-size:14px;font-weight:600;padding:10px 12px;border-radius:8px;text-decoration:none}
        .adm-side a i{width:18px;text-align:center}
        .adm-side a:hover{color:#fff;background:#161616}
        .adm-side a.on{color:#000;background:#1db954}
        .adm-side .sep{border-top:1px solid #1f1f1f;margin:12px 0}
        .adm-side .abajo{margin-top:auto}
        .adm-main{flex:1;padding:28px 32px;min-width:0}
        .adm-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;gap:12px;flex-wrap:wrap}
        .adm-top h1{font-size:24px;font-weight:800;margin:0;color:#fff}
        .adm-top .quien{color:#b3b3b3;font-size:13px}
        .adm-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:26px}
        .adm-card{background:#181818;border:1px solid #242424;border-radius:12px;padding:18px 20px}
        .adm-card .num{font-size:24px;font-weight:800;color:#fff}
        .adm-card .lbl{color:#b3b3b3;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
        .adm-card i{color:#1db954;margin-bottom:8px;font-size:18px}
        @media(max-width:800px){.adm{flex-direction:column}.adm-side{width:100%;height:auto;position:static;flex-direction:row;flex-wrap:wrap}.adm-side .abajo{margin-top:0}.adm-main{padding:18px}}
    </style>
</head>
<body>
<div class="adm">
    <aside class="adm-side">
        <div class="logo">PRODEEJAY <span style="color:#666;font-size:11px;">ADMIN</span></div>
        <a class="{{ request()->routeIs('admin.dashboard') ? 'on' : '' }}" href="{{ route('admin.dashboard') }}"><i class="fas fa-gauge"></i> Dashboard</a>
        <a class="{{ request()->routeIs('admin.reports*') ? 'on' : '' }}" href="{{ route('admin.reports') }}"><i class="fas fa-chart-line"></i> Ventas por DJ</a>
        <a class="{{ request()->routeIs('admin.tracks*') ? 'on' : '' }}" href="{{ route('admin.tracks') }}"><i class="fas fa-music"></i> Música</a>
        <a class="{{ request()->routeIs('admin.djs*') ? 'on' : '' }}" href="{{ route('admin.djs') }}"><i class="fas fa-headphones"></i> DJs</a>
        <a class="{{ request()->routeIs('admin.subs*') ? 'on' : '' }}" href="{{ route('admin.subs') }}"><i class="fas fa-id-card"></i> Suscripciones</a>
        <a class="{{ request()->routeIs('admin.playlists*') ? 'on' : '' }}" href="{{ route('admin.playlists') }}"><i class="fas fa-list-ul"></i> Playlists</a>
        <a class="{{ request()->routeIs('admin.genres*') ? 'on' : '' }}" href="{{ route('admin.genres') }}"><i class="fas fa-tags"></i> Géneros</a>
        <div class="abajo">
            <div class="sep"></div>
            <a class="{{ request()->routeIs('profile') ? 'on' : '' }}" href="{{ route('profile') }}"><i class="fas fa-user-gear"></i> Mi perfil</a>
            <a href="{{ route('home') }}"><i class="fas fa-arrow-up-right-from-square"></i> Ver el sitio</a>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <a href="#" onclick="this.closest('form').submit();return false;"><i class="fas fa-right-from-bracket"></i> Salir</a>
            </form>
        </div>
    </aside>

    <main class="adm-main">
        <div class="adm-top">
            <h1>@yield('titulo_pagina', 'Administración')</h1>
            <span class="quien">{{ auth()->user()->name }} · Administrador</span>
        </div>

        @if (session('status'))
            <div class="aviso">{{ session('status') }}</div>
        @endif
        @if ($errors->any())
            <div class="alerta">{{ $errors->first() }}</div>
        @endif

        @yield('content')
    </main>
</div>
</body>
</html>
