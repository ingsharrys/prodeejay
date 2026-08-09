<?php

namespace App\Support;

use App\Models\MenuItem;
use App\Models\Page;
use App\Models\Setting;

/**
 * Crea las páginas por defecto del sitio con el builder de bloques:
 * inicio, suscripciones, djs, packs, sets-mixes y video.
 *
 * Es idempotente: solo crea las páginas cuyo slug no exista todavía y
 * nunca sobrescribe una página editada por el administrador.
 */
class CmsPorDefecto
{
    /** @return array{creadas: string[], menu: bool, portada: bool} */
    public static function instalar(): array
    {
        $creadas = [];

        foreach (self::paginas() as $slug => $def) {
            if (Page::where('slug', $slug)->exists()) {
                continue;
            }
            Page::create([
                'slug'     => $slug,
                'title_es' => $def['title_es'],
                'title_en' => $def['title_en'],
                'blocks'   => $def['blocks'],
                'active'   => true,
            ]);
            $creadas[] = $slug;
        }

        // Portada: usar la página "inicio" si aún no se eligió una portada.
        $portada = false;
        $inicio = Page::where('slug', 'inicio')->first();
        if ($inicio && (int) Setting::get('home_page_id', 0) === 0) {
            Setting::set('home_page_id', $inicio->id);
            $portada = true;
        }

        // Menú por defecto, solo si el administrador no ha creado ninguno.
        $menu = false;
        if (MenuItem::count() === 0) {
            $items = [
                ['Inicio', 'Home', '/'],
                ['Música', 'Music', '/musica'],
                ['Packs', 'Packs', '/packs'],
                ['Sets/Mixes', 'Sets/Mixes', '/sets-mixes'],
                ['Video', 'Video', '/video'],
                ['DJs', 'DJs', '/djs'],
                ['Suscripciones', 'Subscriptions', '/suscripciones'],
            ];
            foreach ($items as $i => [$es, $en, $url]) {
                MenuItem::create(['label_es' => $es, 'label_en' => $en, 'url' => $url, 'position' => $i + 1, 'active' => true]);
            }
            $menu = true;
        }

        return ['creadas' => $creadas, 'menu' => $menu, 'portada' => $portada];
    }

    /** Definición de las páginas por defecto (bloques del builder). */
    private static function paginas(): array
    {
        return [
            'inicio' => [
                'title_es' => 'Inicio',
                'title_en' => 'Home',
                'blocks'   => [
                    [
                        'type' => 'hero',
                        'tag_es' => 'Música exclusiva para DJs', 'tag_en' => 'Exclusive music for DJs',
                        'titulo_es' => 'Los mejores remixes y packs', 'titulo_en' => 'The best remixes and packs',
                        'resaltado_es' => 'para tus presentaciones', 'resaltado_en' => 'for your gigs',
                        'texto_es' => 'Packs, sets, mixes y videos exclusivos de nuestros DJs. Escucha los previews y descarga al instante.',
                        'texto_en' => 'Exclusive packs, sets, mixes and videos from our DJs. Listen to the previews and download instantly.',
                        'btn1_txt_es' => 'Escuchar música', 'btn1_txt_en' => 'Listen now', 'btn1_url' => '/musica',
                        'btn2_txt_es' => 'Ver planes', 'btn2_txt_en' => 'View plans', 'btn2_url' => '/suscripciones',
                    ],
                    ['type' => 'generos', 'titulo_es' => 'Explora por género', 'titulo_en' => 'Explore by genre', 'limite' => 12],
                    ['type' => 'djs', 'titulo_es' => 'Nuestros DJs', 'titulo_en' => 'Our DJs', 'limite' => 8],
                    ['type' => 'musica', 'titulo_es' => 'Últimos lanzamientos', 'titulo_en' => 'Latest releases', 'tipo' => 'todos', 'limite' => 10],
                    ['type' => 'planes', 'titulo_es' => 'Planes de membresía', 'titulo_en' => 'Membership plans'],
                ],
            ],
            'suscripciones' => [
                'title_es' => 'Suscripciones',
                'title_en' => 'Subscriptions',
                'blocks'   => [
                    ['type' => 'titulo', 'sub_es' => 'Membresías', 'sub_en' => 'Memberships', 'texto_es' => 'Planes de suscripción', 'texto_en' => 'Subscription plans'],
                    ['type' => 'planes'],
                    [
                        'type' => 'texto',
                        'html_es' => '<p>Elige el plan que mejor se ajuste a tu ritmo: cada plan define cuántas descargas puedes hacer al mes. Si tienes dudas, escríbenos.</p>',
                        'html_en' => '<p>Choose the plan that best fits your pace: each plan defines how many downloads you can make per month. If you have questions, contact us.</p>',
                    ],
                ],
            ],
            'djs' => [
                'title_es' => 'DJs',
                'title_en' => 'DJs',
                'blocks'   => [
                    ['type' => 'titulo', 'sub_es' => 'Artistas', 'sub_en' => 'Artists', 'texto_es' => 'Nuestros DJs', 'texto_en' => 'Our DJs'],
                    ['type' => 'djs', 'limite' => 0],
                ],
            ],
            'packs' => [
                'title_es' => 'Packs',
                'title_en' => 'Packs',
                'blocks'   => [
                    ['type' => 'titulo', 'sub_es' => 'Catálogo', 'sub_en' => 'Catalog', 'texto_es' => 'Packs', 'texto_en' => 'Packs'],
                    ['type' => 'musica', 'tipo' => 'pack', 'limite' => 50],
                ],
            ],
            'sets-mixes' => [
                'title_es' => 'Sets / Mixes',
                'title_en' => 'Sets / Mixes',
                'blocks'   => [
                    ['type' => 'titulo', 'sub_es' => 'Catálogo', 'sub_en' => 'Catalog', 'texto_es' => 'Sets y Mixes', 'texto_en' => 'Sets & Mixes'],
                    ['type' => 'musica', 'tipo' => 'set', 'limite' => 50],
                ],
            ],
            'video' => [
                'title_es' => 'Video',
                'title_en' => 'Video',
                'blocks'   => [
                    ['type' => 'titulo', 'sub_es' => 'Catálogo', 'sub_en' => 'Catalog', 'texto_es' => 'Video remixes', 'texto_en' => 'Video remixes'],
                    ['type' => 'musica', 'tipo' => 'video', 'limite' => 50],
                ],
            ],
        ];
    }
}
