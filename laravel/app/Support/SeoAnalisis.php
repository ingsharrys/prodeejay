<?php

namespace App\Support;

use App\Models\Page;

/**
 * Medidor SEO de una página, al estilo de los plugins profesionales:
 * revisa título, descripción, slug, encabezados, contenido, imágenes,
 * traducción e indexabilidad, y devuelve un puntaje de 0 a 100 con
 * recomendaciones concretas.
 */
class SeoAnalisis
{
    /** @return array{puntos: int, checks: array<int, array{estado: string, texto: string}>} */
    public static function analizar(Page $page): array
    {
        $checks = [];
        $bloques = is_array($page->blocks) ? $page->blocks : [];

        // 1. Título SEO (peso 20)
        $titulo = trim((string) ($page->seo_title_es ?: $page->title_es));
        $lenTitulo = mb_strlen($titulo);
        if ($lenTitulo >= 30 && $lenTitulo <= 60) {
            $checks[] = ['ok', "El título SEO tiene {$lenTitulo} caracteres (ideal: 30–60).", 20];
        } elseif ($lenTitulo > 0) {
            $checks[] = ['medio', "El título SEO tiene {$lenTitulo} caracteres; lo ideal es entre 30 y 60. Edítalo en la sección SEO de la página.", 20];
        } else {
            $checks[] = ['mal', 'La página no tiene título. Escribe un título SEO descriptivo de 30–60 caracteres.', 20];
        }

        // 2. Meta descripción (peso 20)
        $desc = trim((string) $page->seo_description_es);
        $lenDesc = mb_strlen($desc);
        if ($lenDesc >= 50 && $lenDesc <= 160) {
            $checks[] = ['ok', "La meta descripción tiene {$lenDesc} caracteres (ideal: 50–160).", 20];
        } elseif ($lenDesc > 0) {
            $checks[] = ['medio', "La meta descripción tiene {$lenDesc} caracteres; lo ideal es entre 50 y 160.", 20];
        } else {
            $checks[] = ['mal', 'Falta la meta descripción: es el texto que Google muestra bajo el título en los resultados. Escríbela en la sección SEO de la página.', 20];
        }

        // 3. URL amigable (peso 10)
        $slug = (string) $page->slug;
        if ($slug !== '' && mb_strlen($slug) <= 60 && preg_match('/^[a-z0-9\-]+$/', $slug)) {
            $checks[] = ['ok', "La URL /{$slug} es corta y amigable.", 10];
        } else {
            $checks[] = ['medio', 'La URL debería ser corta (máximo 60 caracteres), en minúsculas y con guiones.', 10];
        }

        // 4. Encabezado principal H1 (peso 15)
        $tieneH1 = false;
        foreach ($bloques as $b) {
            $tipo = $b['type'] ?? '';
            if (('hero' === $tipo && trim((string) ($b['titulo_es'] ?? '')) !== '')
                || ('titulo' === $tipo && trim((string) ($b['texto_es'] ?? '')) !== '')) {
                $tieneH1 = true;
                break;
            }
        }
        if (! $tieneH1 && ! $bloques && str_contains((string) $page->content_es, '<h1')) {
            $tieneH1 = true;
        }
        $checks[] = $tieneH1
            ? ['ok', 'La página tiene un encabezado principal (bloque de portada o título).', 15]
            : ['mal', 'Falta un encabezado principal: añade un bloque "Portada (hero)" o "Título de sección" al inicio.', 15];

        // 5. Contenido suficiente (peso 15)
        $texto = '';
        $hayDinamico = false;
        foreach ($bloques as $b) {
            $texto .= ' ' . strip_tags((string) ($b['html_es'] ?? ''));
            $texto .= ' ' . ($b['texto_es'] ?? '') . ' ' . ($b['titulo_es'] ?? '');
            if (in_array($b['type'] ?? '', ['djs', 'musica', 'planes', 'generos'], true)) {
                $hayDinamico = true;
            }
        }
        if (! $bloques) {
            $texto = strip_tags((string) $page->content_es);
        }
        $lenTexto = mb_strlen(trim(preg_replace('/\s+/', ' ', $texto)));
        if ($hayDinamico || $lenTexto >= 300) {
            $checks[] = ['ok', $hayDinamico ? 'La página tiene contenido dinámico (música, DJs, planes o géneros).' : "La página tiene suficiente texto ({$lenTexto} caracteres).", 15];
        } elseif ($lenTexto > 0) {
            $checks[] = ['medio', "La página tiene poco texto ({$lenTexto} caracteres); Google prefiere 300 o más. Añade un bloque de texto.", 15];
        } else {
            $checks[] = ['mal', 'La página está vacía: añade bloques con contenido.', 15];
        }

        // 6. Imágenes con texto alternativo (peso 10)
        $imgs = 0;
        $sinAlt = 0;
        foreach ($bloques as $b) {
            if (($b['type'] ?? '') === 'imagen' && trim((string) ($b['url'] ?? '')) !== '') {
                $imgs++;
                if (trim((string) ($b['alt_es'] ?? '')) === '') {
                    $sinAlt++;
                }
            }
            if (preg_match_all('/<img[^>]*>/i', (string) ($b['html_es'] ?? ''), $m)) {
                foreach ($m[0] as $tag) {
                    $imgs++;
                    if (! preg_match('/alt=["\'][^"\']+["\']/i', $tag)) {
                        $sinAlt++;
                    }
                }
            }
        }
        if (0 === $imgs || 0 === $sinAlt) {
            $checks[] = ['ok', $imgs ? 'Todas las imágenes tienen texto alternativo.' : 'Sin imágenes que revisar (el texto alternativo aplica cuando añadas imágenes).', 10];
        } else {
            $checks[] = ['medio', "{$sinAlt} de {$imgs} imágenes no tienen texto alternativo. Complétalo: ayuda al SEO y a la accesibilidad.", 10];
        }

        // 7. Traducción al inglés (peso 10)
        $hayEn = trim((string) $page->title_en) !== '' || trim((string) $page->seo_title_en) !== '' || trim((string) $page->seo_description_en) !== '';
        foreach ($bloques as $b) {
            foreach ($b as $k => $v) {
                if (str_ends_with((string) $k, '_en') && trim((string) $v) !== '') {
                    $hayEn = true;
                    break 2;
                }
            }
        }
        $checks[] = $hayEn
            ? ['ok', 'La página tiene traducción al inglés.', 10]
            : ['medio', 'Sin traducción al inglés: complétala para posicionar también en búsquedas en inglés.', 10];

        // 8. Indexable (peso 10)
        if ($page->active && ! $page->noindex) {
            $checks[] = ['ok', 'La página está publicada y Google puede indexarla.', 10];
        } elseif (! $page->active) {
            $checks[] = ['mal', 'La página está en borrador: Google no puede verla hasta que la publiques.', 10];
        } else {
            $checks[] = ['medio', 'La página tiene "noindex": Google no la mostrará en resultados (quítalo si quieres posicionarla).', 10];
        }

        $puntos = 0;
        $lista = [];
        foreach ($checks as [$estado, $textoCheck, $peso]) {
            $puntos += (int) round($peso * ('ok' === $estado ? 1 : ('medio' === $estado ? 0.5 : 0)));
            $lista[] = ['estado' => $estado, 'texto' => $textoCheck];
        }

        return ['puntos' => min(100, $puntos), 'checks' => $lista];
    }

    /** Color del medidor según el puntaje. */
    public static function color(int $puntos): string
    {
        return $puntos >= 80 ? '#1db954' : ($puntos >= 50 ? '#e8b433' : '#e05252');
    }
}
