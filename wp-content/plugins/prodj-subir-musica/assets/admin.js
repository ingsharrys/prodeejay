/* Prodj · Subir música — interfaz del administrador. */
(function () {
    'use strict';

    const C = window.ProdjMusica;
    if (!C) {
        return;
    }

    const $ = (id) => document.getElementById(id);
    const selCarpeta = $('pjm-carpeta');
    const zona = $('pjm-zona');
    const inputArchivos = $('pjm-archivos');
    const cola = $('pjm-cola');
    const lista = $('pjm-lista');
    const buscar = $('pjm-buscar');
    let archivosActuales = [];
    let subiendo = false;
    const pendientes = [];

    /* ---------- Utilidades ---------- */

    function tamano(bytes) {
        const u = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < u.length - 1) {
            bytes /= 1024;
            i++;
        }
        return bytes.toFixed(i ? 1 : 0) + ' ' + u[i];
    }

    function idAleatorio() {
        const a = new Uint8Array(16);
        crypto.getRandomValues(a);
        return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
    }

    async function llamar(accion, datos) {
        const fd = datos instanceof FormData ? datos : new FormData();
        if (!(datos instanceof FormData)) {
            Object.entries(datos || {}).forEach(([k, v]) => fd.append(k, v));
        }
        fd.append('action', accion);
        fd.append('nonce', C.nonce);
        const r = await fetch(C.ajax, { method: 'POST', body: fd, credentials: 'same-origin' });
        let j = null;
        try {
            j = await r.json();
        } catch (e) {
            throw new Error('Respuesta inesperada del servidor (' + r.status + ').');
        }
        if (!j || !j.success) {
            throw new Error((j && j.data && j.data.mensaje) || 'Error ' + r.status);
        }
        return j.data;
    }

    function copiar(texto, boton) {
        navigator.clipboard.writeText(texto).then(() => {
            const antes = boton.textContent;
            boton.textContent = '¡Copiado!';
            setTimeout(() => (boton.textContent = antes), 1500);
        });
    }

    /* ---------- Carpetas ---------- */

    function pintarCarpetas(seleccion) {
        selCarpeta.innerHTML = '';
        C.carpetas.forEach((c) => {
            const o = document.createElement('option');
            o.value = c;
            o.textContent = c === '' ? '/music (raíz)' : '/music/' + c;
            selCarpeta.appendChild(o);
        });
        let deseada = seleccion;
        if (deseada === undefined) {
            try {
                deseada = localStorage.getItem('pjm-carpeta') || '';
            } catch (e) {
                deseada = '';
            }
        }
        selCarpeta.value = C.carpetas.includes(deseada) ? deseada : '';
    }

    selCarpeta.addEventListener('change', () => {
        try {
            localStorage.setItem('pjm-carpeta', selCarpeta.value);
        } catch (e) { /* sin almacenamiento local */ }
        cargarLista();
    });

    $('pjm-crear').addEventListener('click', async () => {
        const nombre = $('pjm-nueva').value.trim();
        if (!nombre) {
            $('pjm-nueva').focus();
            return;
        }
        try {
            const r = await llamar('prodj_musica_crear_carpeta', { carpeta: selCarpeta.value, nombre });
            C.carpetas.push(r.carpeta);
            C.carpetas.sort((a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' }));
            pintarCarpetas(r.carpeta);
            $('pjm-nueva').value = '';
            cargarLista();
        } catch (e) {
            alert(e.message);
        }
    });

    /* ---------- Lista de archivos ---------- */

    async function cargarLista() {
        $('pjm-titulo-carpeta').textContent = '/music' + (selCarpeta.value ? '/' + selCarpeta.value : '');
        lista.innerHTML = '<tr><td colspan="4">Cargando…</td></tr>';
        try {
            const r = await llamar('prodj_musica_listar', { carpeta: selCarpeta.value });
            archivosActuales = r.archivos;
            $('pjm-meta').textContent = r.total + ' archivo(s)' + (r.total > r.archivos.length ? ' · mostrando los ' + r.archivos.length + ' más recientes' : '');
            pintarLista();
        } catch (e) {
            lista.innerHTML = '';
            const tr = lista.insertRow();
            const td = tr.insertCell();
            td.colSpan = 4;
            td.textContent = e.message;
        }
    }

    function pintarLista() {
        const q = buscar.value.trim().toLowerCase();
        const filas = archivosActuales.filter((a) => !q || a.nombre.toLowerCase().includes(q));
        lista.innerHTML = '';
        if (!filas.length) {
            const td = lista.insertRow().insertCell();
            td.colSpan = 4;
            td.textContent = q ? 'Sin resultados.' : 'Esta carpeta está vacía.';
            return;
        }
        filas.forEach((a) => {
            const tr = lista.insertRow();
            const nombre = tr.insertCell();
            const enlace = document.createElement('a');
            enlace.href = a.url;
            enlace.target = '_blank';
            enlace.rel = 'noopener';
            enlace.textContent = a.nombre;
            nombre.appendChild(enlace);
            tr.insertCell().textContent = tamano(a.tamano);
            tr.insertCell().textContent = new Date(a.fecha * 1000).toLocaleString();
            const acciones = tr.insertCell();
            acciones.className = 'pjm-acciones';

            const bCopiar = document.createElement('button');
            bCopiar.type = 'button';
            bCopiar.className = 'button button-small';
            bCopiar.textContent = 'Copiar URL';
            bCopiar.addEventListener('click', () => copiar(a.url, bCopiar));
            acciones.appendChild(bCopiar);

            const bBorrar = document.createElement('button');
            bBorrar.type = 'button';
            bBorrar.className = 'button button-small button-link-delete';
            bBorrar.textContent = 'Eliminar';
            bBorrar.addEventListener('click', async () => {
                if (!confirm('¿Eliminar "' + a.nombre + '"?\n\nSi algún producto usa este enlace, dejará de descargarse.')) {
                    return;
                }
                try {
                    await llamar('prodj_musica_eliminar', { carpeta: selCarpeta.value, archivo: a.nombre });
                    archivosActuales = archivosActuales.filter((x) => x !== a);
                    pintarLista();
                } catch (e) {
                    alert(e.message);
                }
            });
            acciones.appendChild(bBorrar);
        });
    }

    buscar.addEventListener('input', pintarLista);

    /* ---------- Subida por trozos ---------- */

    function agregar(archivos) {
        Array.from(archivos).forEach((f) => {
            const ext = (f.name.split('.').pop() || '').toLowerCase();
            const li = document.createElement('li');
            li.innerHTML = '<div class="pjm-nombre"></div><div class="pjm-barra"><i></i></div><div class="pjm-estado"></div>';
            li.querySelector('.pjm-nombre').textContent = f.name + ' · ' + tamano(f.size);
            cola.prepend(li);
            const estado = li.querySelector('.pjm-estado');

            if (!C.extensiones.includes(ext)) {
                li.classList.add('error');
                estado.textContent = 'Tipo no permitido. Solo: ' + C.extensiones.join(', ');
                return;
            }
            if (f.size > C.maximo) {
                li.classList.add('error');
                estado.textContent = 'Archivo demasiado grande (máximo ' + tamano(C.maximo) + ').';
                return;
            }
            estado.textContent = 'En espera…';
            pendientes.push({ archivo: f, li, carpeta: selCarpeta.value });
        });
        procesar();
    }

    async function procesar() {
        if (subiendo) {
            return;
        }
        subiendo = true;
        while (pendientes.length) {
            await subir(pendientes.shift());
        }
        subiendo = false;
        cargarLista();
    }

    async function subir(t) {
        const { archivo, li, carpeta } = t;
        const barra = li.querySelector('.pjm-barra i');
        const estado = li.querySelector('.pjm-estado');
        const total = Math.max(1, Math.ceil(archivo.size / C.trozo));
        const id = idAleatorio();
        const modo = $('pjm-reemplazar').checked ? 'reemplazar' : 'renombrar';
        li.classList.add('activo');

        try {
            let r = null;
            for (let i = 0; i < total; i++) {
                const fd = new FormData();
                fd.append('carpeta', carpeta);
                fd.append('nombre', archivo.name);
                fd.append('id_subida', id);
                fd.append('indice', i);
                fd.append('total', total);
                fd.append('tamano', archivo.size);
                fd.append('modo', modo);
                fd.append('trozo', archivo.slice(i * C.trozo, (i + 1) * C.trozo), 'trozo');

                for (let intento = 1; ; intento++) {
                    try {
                        r = await llamar('prodj_musica_subir', fd);
                        break;
                    } catch (e) {
                        // Reintenta solo cortes de red; los rechazos del servidor son definitivos.
                        if (intento >= 3 || !(e instanceof TypeError)) {
                            throw e;
                        }
                        await new Promise((ok) => setTimeout(ok, 1500 * intento));
                    }
                }
                const pct = Math.round(((i + 1) / total) * 100);
                barra.style.width = pct + '%';
                estado.textContent = 'Subiendo… ' + pct + '%';
            }

            li.classList.remove('activo');
            li.classList.add('ok');
            estado.textContent = '';
            const hecho = document.createElement('span');
            hecho.textContent = '✓ Guardado como ' + r.archivo + ' ';
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'button button-small';
            b.textContent = 'Copiar URL';
            b.addEventListener('click', () => copiar(r.url, b));
            estado.append(hecho, b);
        } catch (e) {
            li.classList.remove('activo');
            li.classList.add('error');
            estado.textContent = '✗ ' + e.message;
        }
    }

    zona.addEventListener('click', () => inputArchivos.click());
    zona.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputArchivos.click();
        }
    });
    inputArchivos.addEventListener('change', () => {
        agregar(inputArchivos.files);
        inputArchivos.value = '';
    });
    ['dragenter', 'dragover'].forEach((ev) => zona.addEventListener(ev, (e) => {
        e.preventDefault();
        zona.classList.add('encima');
    }));
    ['dragleave', 'drop'].forEach((ev) => zona.addEventListener(ev, (e) => {
        e.preventDefault();
        zona.classList.remove('encima');
    }));
    zona.addEventListener('drop', (e) => agregar(e.dataTransfer.files));

    window.addEventListener('beforeunload', (e) => {
        if (subiendo) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    /* ---------- Protección de /music ---------- */

    const bProteger = $('pjm-proteger');
    if (bProteger) {
        bProteger.addEventListener('click', async () => {
            bProteger.disabled = true;
            bProteger.textContent = 'Probando…';
            try {
                const r = await llamar('prodj_musica_proteger', {});
                $('pjm-aviso-proteccion').className = 'pjm-aviso ok';
                $('pjm-aviso-proteccion').textContent = r.mensaje;
            } catch (e) {
                bProteger.disabled = false;
                bProteger.textContent = 'Reintentar';
                alert(e.message);
            }
        });
    }

    pintarCarpetas();
    cargarLista();
})();
