<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Http\Request;

/**
 * Módulo SEO: conexión con Google Analytics y Search Console,
 * medidor SEO por página y recomendaciones del sitio.
 */
class SeoAdminController extends Controller
{
    public function index()
    {
        $paginas = Page::orderBy('title_es')->get()
            ->map(fn (Page $p) => ['page' => $p, 'seo' => \App\Support\SeoAnalisis::analizar($p)]);

        return view('admin.seo.index', [
            'paginas'    => $paginas,
            'ga4'        => (string) Setting::get('ga4_id', ''),
            'gsc'        => (string) Setting::get('gsc_verification', ''),
            'descEs'     => (string) Setting::get('seo_desc_es', ''),
            'descEn'     => (string) Setting::get('seo_desc_en', ''),
            'sitio'      => $this->revisionSitio($paginas),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'ga4_id'           => ['nullable', 'string', 'max:600'],
            'gsc_verification' => ['nullable', 'string', 'max:600'],
            'seo_desc_es'      => ['nullable', 'string', 'max:300'],
            'seo_desc_en'      => ['nullable', 'string', 'max:300'],
        ]);

        // Analytics: acepta el ID (G-XXXXXXX) o el fragmento completo de gtag.
        $ga = trim((string) ($data['ga4_id'] ?? ''));
        if ($ga !== '') {
            if (! preg_match('/G-[A-Z0-9]{4,}/i', $ga, $m)) {
                return back()->withErrors(['ga4_id' => 'No encontré un ID de Google Analytics válido (debe verse como G-XXXXXXXXXX).'])->withInput();
            }
            $ga = strtoupper($m[0]);
        }

        // Search Console: acepta el código o la etiqueta <meta> completa.
        $gsc = trim((string) ($data['gsc_verification'] ?? ''));
        if (preg_match('/content=["\']([^"\']+)["\']/i', $gsc, $m)) {
            $gsc = $m[1];
        }
        $gsc = trim(strip_tags($gsc));

        Setting::set('ga4_id', $ga);
        Setting::set('gsc_verification', $gsc);
        Setting::set('seo_desc_es', trim((string) ($data['seo_desc_es'] ?? '')));
        Setting::set('seo_desc_en', trim((string) ($data['seo_desc_en'] ?? '')));

        return back()->with('status', 'Configuración SEO guardada.');
    }

    /** Revisión general del sitio con recomendaciones accionables. */
    private function revisionSitio($paginas): array
    {
        $sitio = [];

        $https = str_starts_with((string) config('app.url'), 'https://');
        $sitio[] = [$https ? 'ok' : 'mal', $https
            ? 'El sitio usa HTTPS.'
            : 'El sitio aún no usa HTTPS con dominio propio. Es el factor más importante pendiente: conecta el dominio con certificado SSL y actualiza APP_URL.'];

        $ga = (string) Setting::get('ga4_id', '');
        $sitio[] = [$ga !== '' ? 'ok' : 'medio', $ga !== ''
            ? "Google Analytics conectado ({$ga}): el código de medición se incluye en todas las páginas."
            : 'Google Analytics sin conectar: crea una propiedad GA4 en analytics.google.com y pega aquí el ID de medición (G-XXXXXXXXXX).'];

        $gsc = (string) Setting::get('gsc_verification', '');
        $sitio[] = [$gsc !== '' ? 'ok' : 'medio', $gsc !== ''
            ? 'Google Search Console conectado: la etiqueta de verificación se incluye en todas las páginas.'
            : 'Google Search Console sin conectar: añade tu propiedad en search.google.com/search-console, elige verificación por "Etiqueta HTML" y pega aquí el código.'];

        $sitio[] = ['ok', 'El sitio genera automáticamente el sitemap en /sitemap.xml. Cuando verifiques Search Console, envíalo en la sección "Sitemaps".'];

        $descDef = (string) Setting::get('seo_desc_es', '');
        $sitio[] = [$descDef !== '' ? 'ok' : 'medio', $descDef !== ''
            ? 'Hay una meta descripción por defecto para las páginas que no definan la suya.'
            : 'Define una meta descripción por defecto: se usará en las páginas que no tengan la suya propia.'];

        $logo = (string) Setting::get('logo_url', '');
        $sitio[] = [$logo !== '' ? 'ok' : 'medio', $logo !== ''
            ? 'El logo del sitio está configurado.'
            : 'Sube el logo del sitio en Administración → Sitio: refuerza la marca en los resultados y al compartir enlaces.'];

        $sinDesc = $paginas->filter(fn ($fila) => $fila['page']->active && trim((string) $fila['page']->seo_description_es) === '')->count();
        $sitio[] = [$sinDesc === 0 ? 'ok' : 'medio', $sinDesc === 0
            ? 'Todas las páginas publicadas tienen meta descripción.'
            : "{$sinDesc} página(s) publicada(s) sin meta descripción propia. Complétalas desde el medidor de abajo."];

        return $sitio;
    }
}
