<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Track extends Model
{
    protected $fillable = [
        'title', 'slug', 'type', 'dj_id', 'genre_id', 'artist', 'bpm',
        'preview_url', 'file_url', 'price', 'released_at', 'wp_product_id',
        'wp_attributes', 'active',
    ];

    protected function casts(): array
    {
        return [
            'wp_attributes' => 'array',
            'released_at'   => 'date',
            'active'        => 'boolean',
            'price'         => 'decimal:2',
        ];
    }

    public function dj(): BelongsTo
    {
        return $this->belongsTo(Dj::class);
    }

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (! $term) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($term) {
            $q->where('title', 'like', "%{$term}%")
                ->orWhere('artist', 'like', "%{$term}%")
                ->orWhereHas('dj', fn (Builder $d) => $d->where('name', 'like', "%{$term}%"));
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
