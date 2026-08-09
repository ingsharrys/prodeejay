@extends('layouts.app')

@section('title', $page->title() . ' — ' . config('app.name', 'Prodeejay Remix'))

@section('content')
@if ($page->hasBlocks())
    {{-- Página construida con el builder de bloques --}}
    @foreach ($page->blocks as $bi => $b)
        @if (in_array($b['type'] ?? '', \App\Models\Page::BLOQUES, true))
            @include('pages.blocks.' . $b['type'], ['b' => $b, 'bi' => $bi])
        @endif
    @endforeach
@else
    {{-- Página clásica de solo texto --}}
    <div class="container">
        <div class="phead">
            <p class="tipo">Prodeejay</p>
            <h1>{{ $page->title() }}</h1>
        </div>

        <article class="cms-contenido" style="padding:26px 0 60px;max-width:900px;">
            {!! $page->content() !!}
        </article>
    </div>
@endif

<style>
.cms-contenido{color:#ddd;font-size:15px;line-height:1.75}
.cms-contenido h1,.cms-contenido h2,.cms-contenido h3,.cms-contenido h4{color:#fff;line-height:1.25}
.cms-contenido a{color:#1db954;text-decoration:underline}
.cms-contenido img,.cms-contenido video,.cms-contenido iframe{max-width:100%;height:auto;border-radius:10px}
.cms-contenido table{width:100%;border-collapse:collapse;margin:14px 0}
.cms-contenido table td,.cms-contenido table th{border:1px solid #333;padding:8px 12px}
.cms-contenido blockquote{border-left:3px solid #1db954;margin:14px 0;padding:6px 18px;color:#b3b3b3}
.cms-contenido ul,.cms-contenido ol{padding-left:24px}
</style>
@endsection
