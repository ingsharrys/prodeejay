{{-- Bloque: texto enriquecido --}}
@php use App\Models\Page; @endphp
<div class="container">
    <article class="cms-contenido" style="padding:14px 0 26px;max-width:900px;">
        {!! Page::campo($b, 'html') !!}
    </article>
</div>
