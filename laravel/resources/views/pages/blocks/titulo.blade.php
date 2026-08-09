{{-- Bloque: título de sección --}}
@php use App\Models\Page; @endphp
<div class="container">
    <div class="phead" style="padding-bottom:6px;">
        @if (Page::campo($b, 'sub') !== '')
            <p class="tipo">{{ Page::campo($b, 'sub') }}</p>
        @endif
        <h1>{{ Page::campo($b, 'texto') }}</h1>
    </div>
</div>
