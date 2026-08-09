<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * CMS: páginas en español e inglés con editor visual.
 */
class PageAdminController extends Controller
{
    public function index()
    {
        return view('admin.pages.index', [
            'pages'      => Page::orderBy('title_es')->get(),
            'homePageId' => (int) Setting::get('home_page_id', 0),
        ]);
    }

    public function create()
    {
        return view('admin.pages.form', ['page' => new Page(['active' => true])]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->slugUnico($request->input('slug') ?: $data['title_es']);
        $page = Page::create($data);

        return redirect()->route('admin.pages.edit', $page)->with('status', 'Página creada. Ya puedes verla en el sitio.');
    }

    public function edit(Page $page)
    {
        return view('admin.pages.form', compact('page'));
    }

    public function update(Request $request, Page $page)
    {
        $data = $this->validated($request);
        $slug = trim((string) $request->input('slug'));
        if ($slug !== '' && $slug !== $page->slug) {
            $data['slug'] = $this->slugUnico($slug, $page->id);
        }
        $page->update($data);

        return back()->with('status', 'Página guardada.');
    }

    public function destroy(Page $page)
    {
        if ((int) Setting::get('home_page_id', 0) === $page->id) {
            Setting::set('home_page_id', 0);
        }
        $page->delete();

        return redirect()->route('admin.pages')->with('status', 'Página eliminada.');
    }

    /**
     * Crea las páginas por defecto (inicio, suscripciones, djs, packs,
     * sets-mixes, video) y el menú, sin tocar lo ya editado.
     */
    public function instalar()
    {
        $resultado = \App\Support\CmsPorDefecto::instalar();

        $mensaje = count($resultado['creadas'])
            ? 'Páginas creadas: ' . implode(', ', $resultado['creadas']) . '.'
            : 'Las páginas por defecto ya existían, no se creó ninguna nueva.';
        if ($resultado['menu']) {
            $mensaje .= ' Se creó el menú del sitio.';
        }
        if ($resultado['portada']) {
            $mensaje .= ' La página "inicio" quedó como portada.';
        }

        return back()->with('status', $mensaje);
    }

    /**
     * Guarda en sesión el borrador que envía el builder para poder
     * mostrar la vista previa sin guardar la página.
     */
    public function previewStore(Request $request)
    {
        $request->session()->put('cms_vista_previa', [
            'title_es' => (string) $request->input('title_es', 'Vista previa'),
            'title_en' => (string) $request->input('title_en', ''),
            'blocks'   => $this->bloquesLimpios($request->input('blocks')),
        ]);

        return response()->json(['ok' => true]);
    }

    /** Renderiza la vista previa del borrador guardado en sesión. */
    public function previewShow(Request $request)
    {
        $datos = $request->session()->get('cms_vista_previa');
        abort_unless(is_array($datos), 404);

        $page = new Page([
            'title_es' => $datos['title_es'] ?: 'Vista previa',
            'title_en' => $datos['title_en'],
        ]);
        $page->blocks = $datos['blocks'];

        return view('pages.show', compact('page'));
    }

    /**
     * Define qué se muestra en la portada: una página del CMS o la
     * landing por defecto (id 0).
     */
    public function setHome(Request $request)
    {
        $data = $request->validate(['page_id' => ['required', 'integer']]);
        if ((int) $data['page_id'] !== 0) {
            $request->validate(['page_id' => ['exists:pages,id']]);
        }
        Setting::set('home_page_id', (int) $data['page_id']);

        return back()->with('status', 'Página de inicio actualizada.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title_es'           => ['required', 'string', 'max:180'],
            'title_en'           => ['nullable', 'string', 'max:180'],
            'content_es'         => ['nullable', 'string'],
            'content_en'         => ['nullable', 'string'],
            'blocks'             => ['nullable', 'string'],
            'seo_title_es'       => ['nullable', 'string', 'max:190'],
            'seo_title_en'       => ['nullable', 'string', 'max:190'],
            'seo_description_es' => ['nullable', 'string', 'max:300'],
            'seo_description_en' => ['nullable', 'string', 'max:300'],
            'og_image'           => ['nullable', 'string', 'max:500'],
        ]);
        $data['active'] = $request->boolean('active');
        $data['noindex'] = $request->boolean('noindex');
        $data['blocks'] = $this->bloquesLimpios($request->input('blocks'));

        return $data;
    }

    /** Decodifica y filtra los bloques del builder (solo tipos conocidos). */
    private function bloquesLimpios($json): array
    {
        $bloques = is_string($json) ? json_decode($json, true) : $json;
        if (! is_array($bloques)) {
            return [];
        }

        return array_values(array_filter($bloques, function ($b) {
            return is_array($b) && in_array($b['type'] ?? '', Page::BLOQUES, true);
        }));
    }

    private function slugUnico(string $base, ?int $ignorarId = null): string
    {
        $slug = Str::slug(Str::limit($base, 120, '')) ?: 'pagina';

        // Evitar choques con las rutas propias del sistema.
        $reservados = ['admin', 'musica', 'djs', 'dj', 'playlists', 'playlist', 'planes', 'carrito', 'entrar', 'registro', 'perfil', 'mi-cuenta', 'finalizar-compra', 'panel-dj', 'idioma', 'descargar', 'pagar', 'stripe', 'recuperar', 'restablecer', 'salir', 'p'];
        if (in_array($slug, $reservados, true)) {
            $slug .= '-pagina';
        }

        $original = $slug;
        $n = 1;
        while (Page::where('slug', $slug)->when($ignorarId, fn ($q) => $q->where('id', '!=', $ignorarId))->exists()) {
            $slug = $original . '-' . (++$n);
        }

        return $slug;
    }
}
