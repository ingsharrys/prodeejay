<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dj extends Model
{
    protected $fillable = ['name', 'slug', 'bio', 'image_url', 'wp_term_id', 'active'];

    protected function casts(): array
    {
        return ['active' => 'boolean'];
    }

    public function tracks(): HasMany
    {
        return $this->hasMany(Track::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
