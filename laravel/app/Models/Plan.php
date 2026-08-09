<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = ['name', 'slug', 'stripe_price_id', 'price', 'downloads_per_month', 'active'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'price'  => 'decimal:2',
        ];
    }

    /** Suscriptores con este plan asignado y vigente. */
    public function users()
    {
        return $this->hasMany(User::class)
            ->where(function ($q) {
                $q->whereNull('plan_expires_at')->orWhere('plan_expires_at', '>', now());
            });
    }
}
