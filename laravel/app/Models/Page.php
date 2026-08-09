<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['slug', 'title_es', 'title_en', 'content_es', 'content_en', 'active'];

    protected function casts(): array
    {
        return ['active' => 'boolean'];
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

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
