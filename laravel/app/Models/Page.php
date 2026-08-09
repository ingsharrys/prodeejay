<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    /** Tipos de bloque que el builder puede renderizar. */
    public const BLOQUES = ['hero', 'titulo', 'texto', 'imagen', 'botones', 'djs', 'musica', 'planes', 'generos', 'html'];

    protected $fillable = [
        'slug', 'title_es', 'title_en', 'content_es', 'content_en', 'blocks', 'active',
        'seo_title_es', 'seo_title_en', 'seo_description_es', 'seo_description_en', 'og_image', 'noindex',
    ];

    protected function casts(): array
    {
        return ['active' => 'boolean', 'blocks' => 'array', 'noindex' => 'boolean'];
    }

    /** Título SEO en el idioma actual (vacío si no se definió). */
    public function seoTitle(): string
    {
        if (app()->getLocale() === 'en' && $this->seo_title_en) {
            return (string) $this->seo_title_en;
        }

        return (string) ($this->seo_title_es ?? '');
    }

    /** Meta descripción en el idioma actual (vacía si no se definió). */
    public function seoDescription(): string
    {
        if (app()->getLocale() === 'en' && $this->seo_description_en) {
            return (string) $this->seo_description_en;
        }

        return (string) ($this->seo_description_es ?? '');
    }

    /** Título en el idioma actual (con respaldo al español). */
    public function title(): string
    {
        return (app()->getLocale() === 'en' && $this->title_en) ? $this->title_en : $this->title_es;
    }

    /** Contenido en el idioma actual (con respaldo al español). */
    public function content(): string
    {
        return (string) ((app()->getLocale() === 'en' && $this->content_en) ? $this->content_en : $this->content_es);
    }

    /** ¿La página fue construida con el builder de bloques? */
    public function hasBlocks(): bool
    {
        return is_array($this->blocks) && count($this->blocks) > 0;
    }

    /** Valor de un campo bilingüe de un bloque, en el idioma actual. */
    public static function campo(array $bloque, string $campo): string
    {
        if (app()->getLocale() === 'en' && ! empty($bloque[$campo . '_en'])) {
            return (string) $bloque[$campo . '_en'];
        }

        return (string) ($bloque[$campo . '_es'] ?? '');
    }

    /** Convierte el enlace de un bloque en URL absoluta (respeta externos y anclas). */
    public static function enlace(?string $url): string
    {
        $url = trim((string) $url);
        if ($url === '') {
            return url('/');
        }

        return Str::startsWith($url, ['http://', 'https://', '#', 'mailto:', 'tel:']) ? $url : url($url);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
