@extends('layouts.admin')

@section('title', $page->exists ? 'Editar página' : 'Crear página')
@section('titulo_pagina', $page->exists ? 'Editar: ' . $page->title_es : 'Crear página')

@section('content')
<style>
.pg-tabs{display:flex;gap:6px;margin:0 0 14px}
.pg-tab{background:#242424;border:1px solid #333;color:#b3b3b3;border-radius:8px 8px 0 0;padding:9px 22px;font-weight:700;font-size:13px;cursor:pointer}
.pg-tab.on{background:#1db954;color:#000;border-color:#1db954}
.pg-pane{display:none}
.pg-pane.on{display:block}
.tox-tinymce{border-radius:10px !important;border-color:#333 !important}
</style>

<form method="POST" action="{{ $page->exists ? route('admin.pages.update', $page) : route('admin.pages.store') }}">
    @csrf
    @if ($page->exists) @method('PUT') @endif

    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:14px;align-items:end;margin-bottom:16px;">
        <div>
            <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">URL de la página (slug)</label>
            <input class="inp" style="width:100%;border-radius:8px;" type="text" name="slug" value="{{ old('slug', $page->slug) }}" placeholder="ej: contacto (se genera sola si la dejas vacía)">
        </div>
        <label style="display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;">
            <input type="checkbox" name="active" value="1" style="width:auto;" @checked(old('active', $page->active))> Publicada
        </label>
        <button class="btn" type="submit" style="margin:0;"><i class="fas fa-floppy-disk"></i> {{ $page->exists ? 'Guardar' : 'Crear página' }}</button>
    </div>

    <div class="pg-tabs">
        <button type="button" class="pg-tab on" data-t="es" onclick="pgTab('es', this)">🇪🇸 Español</button>
        <button type="button" class="pg-tab" data-t="en" onclick="pgTab('en', this)">🇺🇸 English</button>
    </div>

    <div class="pg-pane on" data-p="es">
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Título (español) *</label>
        <input class="inp" style="width:100%;border-radius:8px;margin-bottom:12px;" type="text" name="title_es" value="{{ old('title_es', $page->title_es) }}" required>
        <textarea name="content_es" class="editor-cms">{{ old('content_es', $page->content_es) }}</textarea>
    </div>

    <div class="pg-pane" data-p="en">
        <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Title (English)</label>
        <input class="inp" style="width:100%;border-radius:8px;margin-bottom:12px;" type="text" name="title_en" value="{{ old('title_en', $page->title_en) }}">
        <textarea name="content_en" class="editor-cms">{{ old('content_en', $page->content_en) }}</textarea>
    </div>

    @if ($page->exists)
        <p style="margin-top:14px;"><a href="{{ url('/p/' . $page->slug) }}" target="_blank" style="color:#1db954;"><i class="fas fa-eye"></i> Ver la página en el sitio</a></p>
    @endif
</form>

<script src="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"></script>
<script>
function pgTab(t, btn) {
    document.querySelectorAll('.pg-pane').forEach(p => p.classList.toggle('on', p.dataset.p === t));
    document.querySelectorAll('.pg-tab').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
}
tinymce.init({
    selector: '.editor-cms',
    height: 480,
    menubar: true,
    skin: 'oxide-dark',
    content_css: 'dark',
    language: 'es',
    language_url: 'https://cdn.jsdelivr.net/npm/tinymce-i18n@24.7.15/langs6/es.js',
    plugins: 'link image media table lists code fullscreen autolink anchor',
    toolbar: 'undo redo | blocks | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | link image media table | code fullscreen',
    branding: false,
    promotion: false,
    relative_urls: false,
    convert_urls: false
});
// El contenido del editor se sincroniza al enviar.
document.querySelector('form').addEventListener('submit', function () { tinymce.triggerSave(); });
</script>
@endsection
