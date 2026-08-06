<?php

namespace App\Console\Commands;

use App\Models\Dj;
use App\Models\Genre;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Track;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Importa el catálogo, usuarios y pedidos desde la base de datos de
 * WordPress/WooCommerce.
 *
 * Estructura del sitio original (prodeejayremix.com):
 *  - DJ, artista y BPM viven en los atributos de taxonomía pa_dj,
 *    pa_artista y pa_bpm.
 *  - Los atributos personalizados (no taxonomía) guardan, por posición:
 *    0 = BPM alternativo, 1 = artista alternativo, 3 = URL del preview.
 *    Los enlaces del archivo de música completo también están en los
 *    atributos: se toma la primera URL que no sea el preview.
 *  - El género es la categoría principal del producto (o la secundaria
 *    cuando la principal es "1latinos" o "1videos").
 *
 * Uso:
 *   php artisan wp:import                  (todo)
 *   php artisan wp:import --solo=catalogo  (catalogo | usuarios | pedidos)
 *
 * Conexión: definir WP_DB_HOST, WP_DB_DATABASE, WP_DB_USERNAME,
 * WP_DB_PASSWORD y WP_DB_PREFIX en el .env.
 */
class ImportWordPress extends Command
{
    protected $signature = 'wp:import {--solo= : catalogo, usuarios o pedidos}';

    protected $description = 'Importa catálogo, usuarios y pedidos desde WordPress/WooCommerce';

    private string $prefix;

    public function handle(): int
    {
        $this->prefix = env('WP_DB_PREFIX', 'wp_');

        config(['database.connections.wordpress' => [
            'driver'    => 'mysql',
            'host'      => env('WP_DB_HOST', '127.0.0.1'),
            'port'      => env('WP_DB_PORT', '3306'),
            'database'  => env('WP_DB_DATABASE'),
            'username'  => env('WP_DB_USERNAME'),
            'password'  => env('WP_DB_PASSWORD'),
            'charset'   => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
        ]]);

        try {
            DB::connection('wordpress')->getPdo();
        } catch (\Throwable $e) {
            $this->error('No se pudo conectar a la base de datos de WordPress: ' . $e->getMessage());
            $this->line('Configura WP_DB_HOST, WP_DB_DATABASE, WP_DB_USERNAME y WP_DB_PASSWORD en el .env');

            return self::FAILURE;
        }

        $solo = $this->option('solo');

        if (! $solo || $solo === 'catalogo') {
            $this->importarCatalogo();
        }
        if (! $solo || $solo === 'usuarios') {
            $this->importarUsuarios();
        }
        if (! $solo || $solo === 'pedidos') {
            $this->importarPedidos();
        }

        $this->info('Importación terminada.');

        return self::SUCCESS;
    }

    private function wp(string $table)
    {
        return DB::connection('wordpress')->table($this->prefix . $table);
    }

    /* -----------------------------------------------------------------
     * Catálogo: DJs, géneros y tracks
     * ---------------------------------------------------------------- */

    private function importarCatalogo(): void
    {
        // --- DJs (términos de pa_dj) ---
        $terminosDj = $this->terminosDeTaxonomia('pa_dj');
        foreach ($terminosDj as $t) {
            Dj::updateOrCreate(
                ['wp_term_id' => $t->term_id],
                ['name' => $t->name, 'slug' => $t->slug, 'bio' => $t->description ?: null]
            );
        }
        $this->info('DJs importados: ' . count($terminosDj));

        // --- Géneros (categorías de producto) ---
        $categorias = $this->terminosDeTaxonomia('product_cat');
        foreach ($categorias as $t) {
            if (in_array($t->slug, ['1latinos', '1videos', 'uncategorized', 'sin-categorizar'], true)) {
                continue; // categorías "contenedor", no son géneros reales
            }
            Genre::updateOrCreate(
                ['wp_term_id' => $t->term_id],
                ['name' => $t->name, 'slug' => $t->slug]
            );
        }
        $this->info('Géneros importados: ' . Genre::count());

        // --- Tracks (productos) ---
        $productos = $this->wp('posts')
            ->where('post_type', 'product')
            ->where('post_status', 'publish')
            ->orderBy('ID')
            ->get(['ID', 'post_title', 'post_name', 'post_date']);

        $barra = $this->output->createProgressBar(count($productos));
        $importados = 0;

        foreach ($productos as $p) {
            $meta = $this->metaDePost($p->ID);

            // Atributos de taxonomía del producto.
            $djTermId  = $this->primerTerminoDe($p->ID, 'pa_dj');
            $artista   = $this->nombreDeTermino($this->primerTerminoDe($p->ID, 'pa_artista'));
            $bpm       = $this->nombreDeTermino($this->primerTerminoDe($p->ID, 'pa_bpm'));

            // Atributos personalizados (serializados en _product_attributes).
            $attrs       = $this->atributosPersonalizados($meta['_product_attributes'] ?? '');
            $previewUrl  = null;
            $fileUrl     = null;

            // Posición 3 = preview; primera otra URL = archivo completo.
            $posicion = 0;
            foreach ($attrs as $attr) {
                $valor = trim((string) ($attr['value'] ?? ''));
                if ($valor === '') {
                    $posicion++;
                    continue;
                }
                $esUrl = Str::startsWith($valor, ['http://', 'https://']) || Str::contains($valor, '<iframe');
                if ($posicion === 3 && $esUrl) {
                    $previewUrl = $valor;
                } elseif ($esUrl && ! $fileUrl && $posicion !== 3) {
                    $fileUrl = $valor;
                } elseif ($posicion === 0 && ! $bpm) {
                    $bpm = $valor;
                } elseif ($posicion === 1 && ! $artista) {
                    $artista = $valor;
                }
                $posicion++;
            }

            // Respaldo: archivos descargables de WooCommerce.
            if (! $fileUrl && ! empty($meta['_downloadable_files'])) {
                $files = @unserialize($meta['_downloadable_files']);
                if (is_array($files)) {
                    $primero = reset($files);
                    if (is_array($primero) && ! empty($primero['file'])) {
                        $fileUrl = $primero['file'];
                    }
                }
            }

            // Género y tipo según las categorías.
            [$genreId, $tipo] = $this->generoYTipo($p->ID, $p->post_title);

            $dj = $djTermId ? Dj::where('wp_term_id', $djTermId)->first() : null;

            Track::updateOrCreate(
                ['wp_product_id' => $p->ID],
                [
                    'title'         => $p->post_title,
                    'slug'          => $this->slugUnico($p->post_name ?: $p->post_title, $p->ID),
                    'type'          => $tipo,
                    'dj_id'         => $dj?->id,
                    'genre_id'      => $genreId,
                    'artist'        => $artista ?: null,
                    'bpm'           => $bpm ?: null,
                    'preview_url'   => $previewUrl,
                    'file_url'      => $fileUrl,
                    'price'         => (float) ($meta['_price'] ?? 0),
                    'released_at'   => substr($p->post_date, 0, 10),
                    'wp_attributes' => $attrs,
                    'active'        => true,
                ]
            );

            $importados++;
            $barra->advance();
        }
        $barra->finish();
        $this->newLine();
        $this->info("Tracks importados: {$importados}");

        // Foto de cada DJ: la imagen del producto más reciente.
        foreach (Dj::whereNull('image_url')->get() as $dj) {
            $track = $dj->tracks()->latest('released_at')->first();
            if ($track && $track->wp_product_id) {
                $thumbId = $this->metaDePost($track->wp_product_id)['_thumbnail_id'] ?? null;
                if ($thumbId) {
                    $url = $this->metaDePost((int) $thumbId)['_wp_attached_file'] ?? null;
                    if ($url) {
                        $dj->update(['image_url' => rtrim(env('WP_UPLOADS_URL', 'https://prodeejayremix.com/wp-content/uploads'), '/') . '/' . $url]);
                    }
                }
            }
        }
    }

    /* -----------------------------------------------------------------
     * Usuarios
     * ---------------------------------------------------------------- */

    private function importarUsuarios(): void
    {
        $usuarios = $this->wp('users')->orderBy('ID')->get(['ID', 'user_email', 'display_name', 'user_registered']);
        $importados = 0;

        foreach ($usuarios as $u) {
            if (! filter_var($u->user_email, FILTER_VALIDATE_EMAIL)) {
                continue;
            }
            if (User::where('email', $u->user_email)->whereNull('wp_user_id')->exists()) {
                continue; // ya existe un usuario local con ese correo
            }

            User::updateOrCreate(
                ['wp_user_id' => $u->ID],
                [
                    'name'       => $u->display_name ?: Str::before($u->user_email, '@'),
                    'email'      => $u->user_email,
                    // WordPress usa otro formato de hash: cada usuario deberá
                    // restablecer su contraseña con "Olvidé mi contraseña".
                    'password'   => Hash::make(Str::random(40)),
                    'created_at' => $u->user_registered,
                ]
            );
            $importados++;
        }

        $this->info("Usuarios importados: {$importados} (deberán restablecer su contraseña)");
    }

    /* -----------------------------------------------------------------
     * Pedidos (compatible con HPOS y con el almacenamiento clásico)
     * ---------------------------------------------------------------- */

    private function importarPedidos(): void
    {
        $importados = 0;

        if (Schema::connection('wordpress')->hasTable($this->prefix . 'wc_orders')) {
            // WooCommerce moderno (HPOS)
            $pedidos = $this->wp('wc_orders')
                ->whereIn('status', ['wc-completed', 'wc-processing', 'wc-refunded'])
                ->get(['id', 'status', 'total_amount', 'currency', 'customer_id', 'date_created_gmt']);

            foreach ($pedidos as $p) {
                $importados += $this->guardarPedido(
                    (int) $p->id,
                    (string) $p->status,
                    (float) $p->total_amount,
                    (string) ($p->currency ?: 'USD'),
                    (int) $p->customer_id,
                    (string) $p->date_created_gmt
                );
            }
        } else {
            // Almacenamiento clásico (posts)
            $pedidos = $this->wp('posts')
                ->where('post_type', 'shop_order')
                ->whereIn('post_status', ['wc-completed', 'wc-processing', 'wc-refunded'])
                ->get(['ID', 'post_status', 'post_date_gmt']);

            foreach ($pedidos as $p) {
                $meta = $this->metaDePost($p->ID);
                $importados += $this->guardarPedido(
                    (int) $p->ID,
                    (string) $p->post_status,
                    (float) ($meta['_order_total'] ?? 0),
                    (string) ($meta['_order_currency'] ?? 'USD'),
                    (int) ($meta['_customer_user'] ?? 0),
                    (string) $p->post_date_gmt
                );
            }
        }

        $this->info("Pedidos importados: {$importados}");
    }

    private function guardarPedido(int $wpId, string $status, float $total, string $currency, int $wpUserId, string $fecha): int
    {
        $user = $wpUserId ? User::where('wp_user_id', $wpUserId)->first() : null;

        $order = Order::updateOrCreate(
            ['wp_order_id' => $wpId],
            [
                'user_id'  => $user?->id,
                'status'   => $status === 'wc-refunded' ? 'refunded' : 'paid',
                'total'    => $total,
                'currency' => strtolower($currency),
                'paid_at'  => $fecha,
                'created_at' => $fecha,
            ]
        );

        // Artículos del pedido
        $items = $this->wp('woocommerce_order_items')
            ->where('order_id', $wpId)
            ->where('order_item_type', 'line_item')
            ->get(['order_item_id', 'order_item_name']);

        foreach ($items as $item) {
            $itemMeta = DB::connection('wordpress')
                ->table($this->prefix . 'woocommerce_order_itemmeta')
                ->where('order_item_id', $item->order_item_id)
                ->pluck('meta_value', 'meta_key');

            $track = Track::where('wp_product_id', (int) ($itemMeta['_product_id'] ?? 0))->first();

            OrderItem::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'name'     => $item->order_item_name,
                    'track_id' => $track?->id,
                ],
                [
                    'price'    => (float) ($itemMeta['_line_total'] ?? 0),
                    'quantity' => (int) ($itemMeta['_qty'] ?? 1),
                ]
            );
        }

        return 1;
    }

    /* -----------------------------------------------------------------
     * Utilidades de lectura de WordPress
     * ---------------------------------------------------------------- */

    private function terminosDeTaxonomia(string $taxonomia)
    {
        return DB::connection('wordpress')
            ->table($this->prefix . 'terms as t')
            ->join($this->prefix . 'term_taxonomy as tt', 't.term_id', '=', 'tt.term_id')
            ->where('tt.taxonomy', $taxonomia)
            ->get(['t.term_id', 't.name', 't.slug', 'tt.description']);
    }

    private function metaDePost(int $postId): array
    {
        return $this->wp('postmeta')
            ->where('post_id', $postId)
            ->pluck('meta_value', 'meta_key')
            ->all();
    }

    private function primerTerminoDe(int $postId, string $taxonomia): ?int
    {
        $fila = DB::connection('wordpress')
            ->table($this->prefix . 'term_relationships as tr')
            ->join($this->prefix . 'term_taxonomy as tt', 'tr.term_taxonomy_id', '=', 'tt.term_taxonomy_id')
            ->where('tr.object_id', $postId)
            ->where('tt.taxonomy', $taxonomia)
            ->orderBy('tr.term_order')
            ->first(['tt.term_id']);

        return $fila?->term_id;
    }

    private function nombreDeTermino(?int $termId): ?string
    {
        if (! $termId) {
            return null;
        }
        $fila = $this->wp('terms')->where('term_id', $termId)->first(['name']);

        return $fila?->name;
    }

    /**
     * Atributos personalizados (no taxonomía) en orden de posición.
     */
    private function atributosPersonalizados(string $serializado): array
    {
        if ($serializado === '') {
            return [];
        }
        $attrs = @unserialize($serializado);
        if (! is_array($attrs)) {
            return [];
        }

        $personalizados = array_values(array_filter($attrs, fn ($a) => is_array($a) && empty($a['is_taxonomy'])));
        usort($personalizados, fn ($a, $b) => ($a['position'] ?? 0) <=> ($b['position'] ?? 0));

        return array_map(fn ($a) => [
            'name'  => $a['name'] ?? '',
            'value' => $a['value'] ?? '',
        ], $personalizados);
    }

    /**
     * Género (categoría real) y tipo del track según las categorías.
     */
    private function generoYTipo(int $postId, string $titulo): array
    {
        $categorias = DB::connection('wordpress')
            ->table($this->prefix . 'term_relationships as tr')
            ->join($this->prefix . 'term_taxonomy as tt', 'tr.term_taxonomy_id', '=', 'tt.term_taxonomy_id')
            ->join($this->prefix . 'terms as t', 'tt.term_id', '=', 't.term_id')
            ->where('tr.object_id', $postId)
            ->where('tt.taxonomy', 'product_cat')
            ->orderBy('tr.term_order')
            ->get(['t.term_id', 't.name', 't.slug']);

        $tipo = 'audio';
        $genreId = null;

        $primera = $categorias->first();
        if ($primera) {
            if ($primera->slug === 'video' || Str::contains(Str::lower($primera->name), 'video')) {
                $tipo = 'video';
            } elseif ($primera->slug === '1videos') {
                $tipo = 'set';
            }
        }
        if (Str::contains(Str::lower($titulo), 'pack')) {
            $tipo = 'pack';
        }

        // Género: primera categoría "real" (no contenedor).
        foreach ($categorias as $cat) {
            if (in_array($cat->slug, ['1latinos', '1videos', 'uncategorized', 'sin-categorizar'], true)) {
                continue;
            }
            $genre = Genre::where('wp_term_id', $cat->term_id)->first();
            if ($genre) {
                $genreId = $genre->id;
                break;
            }
        }

        return [$genreId, $tipo];
    }

    private function slugUnico(string $base, int $wpId): string
    {
        $slug = Str::slug(Str::limit($base, 180, ''));
        if ($slug === '') {
            $slug = 'track';
        }

        $existe = Track::where('slug', $slug)->where('wp_product_id', '!=', $wpId)->exists();

        return $existe ? "{$slug}-{$wpId}" : $slug;
    }
}
