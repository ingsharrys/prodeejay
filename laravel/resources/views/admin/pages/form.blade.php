@extends('layouts.admin')

@section('title', $page->exists ? 'Editar página' : 'Crear página')
@section('titulo_pagina', $page->exists ? 'Editar: ' . $page->title_es : 'Crear página')

@section('content')
@php
    // Estado inicial del builder. Si la página es antigua (solo texto),
    // se convierte en un bloque de texto para no perder nada.
    $bloquesIniciales = $page->blocks ?: [];
    if (empty($bloquesIniciales) && ($page->content_es || $page->content_en)) {
        $bloquesIniciales = [['type' => 'texto', 'html_es' => (string) $page->content_es, 'html_en' => (string) $page->content_en]];
    }
@endphp
<style>
.bld{display:grid;grid-template-columns:320px 1fr;gap:16px;align-items:start}
@media(max-width:1000px){.bld{grid-template-columns:1fr}}
.bld-panel{background:#181818;border:1px solid #242424;border-radius:12px;padding:14px;position:sticky;top:14px;max-height:calc(100vh - 28px);overflow-y:auto}
.bld-panel h3{color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px}
.bld-paleta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.bld-paleta button{background:#242424;border:1px solid #333;color:#ddd;border-radius:10px;padding:12px 8px;font-size:12px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px}
.bld-paleta button i{color:#1db954;font-size:16px}
.bld-paleta button:hover{background:#2e2e2e;border-color:#1db954}
.bld-canvas{min-height:300px;display:flex;flex-direction:column;gap:10px}
.bld-card{background:#181818;border:1px solid #2a2a2a;border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:grab}
.bld-card.on{border-color:#1db954;box-shadow:0 0 0 1px #1db954}
.bld-card .ic{width:36px;height:36px;border-radius:9px;background:#242424;display:flex;align-items:center;justify-content:center;color:#1db954;flex-shrink:0}
.bld-card .info{flex:1;min-width:0}
.bld-card .info .tt{color:#fff;font-weight:700;font-size:14px}
.bld-card .info .rs{color:#8a8a8a;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bld-card .acc{display:flex;gap:4px;flex-shrink:0}
.bld-card .acc button{background:none;border:1px solid #333;color:#b3b3b3;width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:11px}
.bld-card .acc button:hover{color:#fff;border-color:#666}
.bld-card .acc button.rojo:hover{color:#ffb4b4;border-color:#a33}
.bld-vacio{border:2px dashed #333;border-radius:12px;padding:44px 20px;text-align:center;color:#8a8a8a;font-size:14px}
.bld-f{margin-bottom:11px}
.bld-f label{color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px}
.bld-f input[type=text],.bld-f input[type=number],.bld-f textarea,.bld-f select{width:100%;background:#242424;border:1px solid #333;color:#fff;border-radius:8px;padding:8px 10px;font-size:13px;box-sizing:border-box}
.bld-f textarea{min-height:80px;resize:vertical}
.bld-en{border:1px solid #2a2a2a;border-radius:10px;padding:10px 12px;margin-top:8px}
.bld-en summary{color:#b3b3b3;font-size:12px;font-weight:700;cursor:pointer}
.bld-en .bld-f:first-of-type{margin-top:10px}
.pv-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:600;padding:20px}
.pv-modal.on{display:flex;flex-direction:column;gap:10px}
.pv-modal iframe{flex:1;width:100%;border:1px solid #333;border-radius:12px;background:#0f0f0f}
.pv-modal .pv-top{display:flex;justify-content:space-between;align-items:center;color:#fff}
.tox-tinymce{border-radius:8px !important;border-color:#333 !important}
</style>

<form id="fPagina" method="POST" action="{{ $page->exists ? route('admin.pages.update', $page) : route('admin.pages.store') }}">
    @csrf
    @if ($page->exists) @method('PUT') @endif
    <input type="hidden" name="blocks" id="inpBloques">

    <div style="display:grid;grid-template-columns:1.2fr 1.2fr 1fr auto auto auto;gap:12px;align-items:end;margin-bottom:16px;flex-wrap:wrap;">
        <div>
            <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Título (español) *</label>
            <input class="inp" style="width:100%;border-radius:8px;" type="text" name="title_es" value="{{ old('title_es', $page->title_es) }}" required>
        </div>
        <div>
            <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">Title (English)</label>
            <input class="inp" style="width:100%;border-radius:8px;" type="text" name="title_en" value="{{ old('title_en', $page->title_en) }}">
        </div>
        <div>
            <label style="color:#b3b3b3;font-size:12px;display:block;margin-bottom:4px;">URL (slug)</label>
            <input class="inp" style="width:100%;border-radius:8px;" type="text" name="slug" value="{{ old('slug', $page->slug) }}" placeholder="se genera sola">
        </div>
        <label style="display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;padding-bottom:9px;">
            <input type="checkbox" name="active" value="1" style="width:auto;" @checked(old('active', $page->active))> Publicada
        </label>
        <button class="btn-sec" type="button" style="margin:0;" onclick="verPrevia()"><i class="fas fa-eye"></i> Vista previa</button>
        <button class="btn" type="submit" style="margin:0;"><i class="fas fa-floppy-disk"></i> {{ $page->exists ? 'Guardar' : 'Crear página' }}</button>
    </div>

    <div class="bld">
        <aside class="bld-panel">
            <h3><i class="fas fa-plus" style="color:#1db954;"></i> Añadir bloque</h3>
            <div class="bld-paleta" id="paleta"></div>
            <div id="ajustes"></div>
        </aside>
        <div>
            <div class="bld-canvas" id="canvas"></div>
            @if ($page->exists)
                <p style="margin-top:14px;"><a href="{{ url('/' . $page->slug) }}" target="_blank" style="color:#1db954;"><i class="fas fa-arrow-up-right-from-square"></i> Ver la página publicada</a></p>
            @endif
        </div>
    </div>
</form>

<div class="pv-modal" id="pvModal">
    <div class="pv-top">
        <strong><i class="fas fa-eye" style="color:#1db954;"></i> Vista previa (sin guardar)</strong>
        <button class="btn-sec btn-sm" type="button" onclick="document.getElementById('pvModal').classList.remove('on')"><i class="fas fa-xmark"></i> Cerrar</button>
    </div>
    <iframe id="pvFrame" src="about:blank"></iframe>
</div>

<script src="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"></script>
<script>
// ---- Definición de los bloques disponibles ----
const TIPOS = {
    hero:    {n:'Portada (hero)', ic:'fa-star', c:[
        {k:'tag', l:'Etiqueta superior', t:'texto', bi:1},
        {k:'titulo', l:'Título', t:'texto', bi:1},
        {k:'resaltado', l:'Texto resaltado (verde)', t:'texto', bi:1},
        {k:'texto', l:'Descripción', t:'area', bi:1},
        {k:'btn1_txt', l:'Botón 1 · texto', t:'texto', bi:1},
        {k:'btn1_url', l:'Botón 1 · enlace (ej: /musica)', t:'texto'},
        {k:'btn2_txt', l:'Botón 2 · texto', t:'texto', bi:1},
        {k:'btn2_url', l:'Botón 2 · enlace', t:'texto'},
        {k:'fondo', l:'Imagen de fondo (URL, opcional)', t:'texto'},
    ]},
    titulo:  {n:'Título de sección', ic:'fa-heading', c:[
        {k:'sub', l:'Etiqueta pequeña (opcional)', t:'texto', bi:1},
        {k:'texto', l:'Título', t:'texto', bi:1},
    ]},
    texto:   {n:'Texto enriquecido', ic:'fa-align-left', c:[
        {k:'html', l:'Contenido', t:'rico', bi:1},
    ]},
    imagen:  {n:'Imagen / banner', ic:'fa-image', c:[
        {k:'url', l:'URL de la imagen', t:'texto'},
        {k:'alt', l:'Texto alternativo (SEO)', t:'texto', bi:1},
        {k:'enlace', l:'Enlace al hacer clic (opcional)', t:'texto'},
        {k:'ancho', l:'Ancho', t:'sel', ops:[['normal','Normal'],['pequeno','Pequeño (centrado)'],['completo','Pantalla completa']]},
    ]},
    botones: {n:'Botones', ic:'fa-hand-pointer', c:[
        {k:'btn1_txt', l:'Botón 1 · texto', t:'texto', bi:1},
        {k:'btn1_url', l:'Botón 1 · enlace', t:'texto'},
        {k:'btn2_txt', l:'Botón 2 · texto', t:'texto', bi:1},
        {k:'btn2_url', l:'Botón 2 · enlace', t:'texto'},
    ]},
    djs:     {n:'DJs (dinámico)', ic:'fa-headphones', c:[
        {k:'titulo', l:'Título de la sección', t:'texto', bi:1},
        {k:'limite', l:'Cuántos DJs mostrar (0 = todos)', t:'num'},
    ]},
    musica:  {n:'Música (dinámico)', ic:'fa-music', c:[
        {k:'titulo', l:'Título de la sección', t:'texto', bi:1},
        {k:'tipo', l:'Qué mostrar', t:'sel', ops:[['todos','Todo el catálogo'],['audio','Audio / remixes'],['pack','Packs'],['set','Sets / Mixes'],['video','Videos']]},
        {k:'limite', l:'Canciones por página', t:'num'},
    ]},
    planes:  {n:'Planes (dinámico)', ic:'fa-id-card', c:[
        {k:'titulo', l:'Título de la sección', t:'texto', bi:1},
    ]},
    generos: {n:'Géneros (dinámico)', ic:'fa-tags', c:[
        {k:'titulo', l:'Título de la sección', t:'texto', bi:1},
        {k:'limite', l:'Cuántos géneros (0 = todos)', t:'num'},
    ]},
    html:    {n:'HTML libre', ic:'fa-code', c:[
        {k:'codigo', l:'Código HTML', t:'area'},
    ]},
};
const DEFECTOS = {djs:{limite:0}, musica:{tipo:'todos', limite:25}, generos:{limite:12}, imagen:{ancho:'normal'}};

let bloques = @json($bloquesIniciales);
let selBloque = null;      // referencia al objeto bloque seleccionado
let pvContador = 0;

// ---- Paleta ----
const paleta = document.getElementById('paleta');
Object.entries(TIPOS).forEach(([tipo, def]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<i class="fas ' + def.ic + '"></i>' + def.n;
    b.onclick = () => {
        const nuevo = Object.assign({type: tipo}, DEFECTOS[tipo] || {});
        bloques.push(nuevo);
        selBloque = nuevo;
        pintarCanvas();
        pintarAjustes();
    };
    paleta.appendChild(b);
});

// ---- Canvas (lista de bloques) ----
function resumen(b) {
    const candidatos = [b.titulo_es, b.texto_es, b.tag_es, b.btn1_txt_es, b.alt_es, b.url];
    if (b.html_es) { const d = document.createElement('div'); d.innerHTML = b.html_es; candidatos.push(d.textContent.trim()); }
    if (b.codigo) candidatos.push(b.codigo);
    if (b.type === 'musica') candidatos.unshift('Tipo: ' + (b.tipo || 'todos'));
    const s = candidatos.find(v => v && String(v).trim() !== '') || '';
    return String(s).slice(0, 70);
}

function pintarCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    if (!bloques.length) {
        canvas.innerHTML = '<div class="bld-vacio"><i class="fas fa-shapes" style="font-size:26px;color:#1db954;display:block;margin-bottom:10px;"></i>La página está vacía.<br>Añade bloques desde el panel de la izquierda.</div>';
        return;
    }
    bloques.forEach((blk, i) => {
        const def = TIPOS[blk.type] || {n: blk.type, ic: 'fa-cube'};
        const card = document.createElement('div');
        card.className = 'bld-card' + (blk === selBloque ? ' on' : '');
        card.draggable = true;
        card.innerHTML =
            '<div class="ic"><i class="fas ' + def.ic + '"></i></div>' +
            '<div class="info"><div class="tt">' + def.n + '</div><div class="rs"></div></div>' +
            '<div class="acc">' +
              '<button type="button" title="Subir"><i class="fas fa-arrow-up"></i></button>' +
              '<button type="button" title="Bajar"><i class="fas fa-arrow-down"></i></button>' +
              '<button type="button" title="Duplicar"><i class="fas fa-clone"></i></button>' +
              '<button type="button" class="rojo" title="Eliminar"><i class="fas fa-trash"></i></button>' +
            '</div>';
        card.querySelector('.rs').textContent = resumen(blk);
        card.onclick = () => { selBloque = blk; pintarCanvas(); pintarAjustes(); };
        const [up, down, dup, del] = card.querySelectorAll('.acc button');
        up.onclick = e => { e.stopPropagation(); mover(i, -1); };
        down.onclick = e => { e.stopPropagation(); mover(i, 1); };
        dup.onclick = e => { e.stopPropagation(); const c = JSON.parse(JSON.stringify(blk)); bloques.splice(i + 1, 0, c); selBloque = c; pintarCanvas(); pintarAjustes(); };
        del.onclick = e => { e.stopPropagation(); if (!confirm('¿Eliminar este bloque?')) return; bloques.splice(i, 1); if (selBloque === blk) { selBloque = null; pintarAjustes(); } pintarCanvas(); };
        card.ondragstart = e => e.dataTransfer.setData('text/plain', String(i));
        card.ondragover = e => e.preventDefault();
        card.ondrop = e => {
            e.preventDefault();
            const desde = parseInt(e.dataTransfer.getData('text/plain'), 10);
            if (isNaN(desde) || desde === i) return;
            const [m] = bloques.splice(desde, 1);
            bloques.splice(i, 0, m);
            pintarCanvas();
        };
        canvas.appendChild(card);
    });
}

function mover(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= bloques.length) return;
    [bloques[i], bloques[j]] = [bloques[j], bloques[i]];
    pintarCanvas();
}

// ---- Panel de ajustes del bloque seleccionado ----
let mceIds = [];
function pintarAjustes() {
    // Limpiar editores anteriores.
    mceIds.forEach(id => { const ed = tinymce.get(id); if (ed) ed.remove(); });
    mceIds = [];

    const panel = document.getElementById('ajustes');
    panel.innerHTML = '';
    if (!selBloque) {
        panel.innerHTML = '<p style="color:#8a8a8a;font-size:13px;margin:0;">Haz clic en un bloque de la derecha para editar su contenido.</p>';
        return;
    }
    const blk = selBloque;
    const def = TIPOS[blk.type];
    if (!def) return;

    const h = document.createElement('h3');
    h.innerHTML = '<i class="fas fa-pen" style="color:#1db954;"></i> ' + def.n;
    panel.appendChild(h);

    const zonaEs = document.createElement('div');
    panel.appendChild(zonaEs);
    const detEn = document.createElement('details');
    detEn.className = 'bld-en';
    detEn.innerHTML = '<summary>🇺🇸 Traducción al inglés (opcional)</summary>';
    let hayEn = false;
    const ricosEn = [];

    def.c.forEach(campo => {
        zonaEs.appendChild(crearCampo(blk, campo, campo.bi ? campo.k + '_es' : campo.k, campo.l, false));
        if (campo.bi) {
            hayEn = true;
            const fEn = crearCampo(blk, campo, campo.k + '_en', campo.l + ' (EN)', campo.t === 'rico');
            detEn.appendChild(fEn);
            if (campo.t === 'rico') ricosEn.push(fEn.querySelector('textarea'));
        }
    });
    if (hayEn) {
        panel.appendChild(detEn);
        // Los editores visuales dentro del desplegable se crean al abrirlo.
        detEn.addEventListener('toggle', () => {
            if (detEn.open) ricosEn.splice(0).forEach(ta => iniciarMce(ta, blk));
        });
    }
}

function crearCampo(blk, campo, clave, etiqueta, ricoDiferido) {
    const w = document.createElement('div');
    w.className = 'bld-f';
    const lab = document.createElement('label');
    lab.textContent = etiqueta;
    w.appendChild(lab);

    let el;
    if (campo.t === 'sel') {
        el = document.createElement('select');
        (campo.ops || []).forEach(([v, txt]) => {
            const o = document.createElement('option');
            o.value = v; o.textContent = txt;
            el.appendChild(o);
        });
        el.value = blk[clave] ?? (campo.ops?.[0]?.[0] || '');
        el.onchange = () => { blk[clave] = el.value; pintarCanvas(); };
    } else if (campo.t === 'area' || campo.t === 'rico') {
        el = document.createElement('textarea');
        el.value = blk[clave] ?? '';
        el.oninput = () => { blk[clave] = el.value; };
        if (campo.t === 'rico') {
            el.id = 'mce_' + clave + '_' + (++pvContador);
            el.dataset.clave = clave;
            if (!ricoDiferido) setTimeout(() => iniciarMce(el, blk), 0);
        }
    } else if (campo.t === 'num') {
        el = document.createElement('input');
        el.type = 'number'; el.min = '0';
        el.value = blk[clave] ?? 0;
        el.oninput = () => { blk[clave] = parseInt(el.value || '0', 10); pintarCanvas(); };
    } else {
        el = document.createElement('input');
        el.type = 'text';
        el.value = blk[clave] ?? '';
        el.oninput = () => { blk[clave] = el.value; pintarCanvas(); };
    }
    w.appendChild(el);
    return w;
}

function iniciarMce(ta, blk) {
    if (!ta || tinymce.get(ta.id)) return;
    mceIds.push(ta.id);
    tinymce.init({
        target: ta,
        height: 300,
        menubar: false,
        skin: 'oxide-dark',
        content_css: 'dark',
        language: 'es',
        language_url: 'https://cdn.jsdelivr.net/npm/tinymce-i18n@24.7.15/langs6/es.js',
        plugins: 'link image media table lists code autolink anchor',
        toolbar: 'undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | link image media table | code',
        branding: false,
        promotion: false,
        relative_urls: false,
        convert_urls: false,
        setup: ed => ed.on('change input keyup undo redo SetContent', () => { blk[ta.dataset.clave] = ed.getContent(); })
    });
}

// ---- Guardar y vista previa ----
function serializar() {
    // TinyMCE 6: get() sin argumentos devuelve todos los editores activos.
    (tinymce.get() || []).forEach(ed => {
        const ta = ed.targetElm;
        if (ta && ta.dataset.clave && selBloque) selBloque[ta.dataset.clave] = ed.getContent();
    });
    document.getElementById('inpBloques').value = JSON.stringify(bloques);
}

document.getElementById('fPagina').addEventListener('submit', serializar);

function verPrevia() {
    serializar();
    fetch(@json(route('admin.pages.preview.store')), {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': @json(csrf_token())},
        body: JSON.stringify({
            title_es: document.querySelector('[name=title_es]').value,
            title_en: document.querySelector('[name=title_en]').value,
            blocks: bloques
        })
    }).then(r => {
        if (!r.ok) throw new Error('estado ' + r.status);
        document.getElementById('pvFrame').src = @json(route('admin.pages.preview')) + '?r=' + (++pvContador);
        document.getElementById('pvModal').classList.add('on');
    }).catch(() => alert('No se pudo generar la vista previa. Intenta de nuevo.'));
}

pintarCanvas();
pintarAjustes();
</script>
@endsection
