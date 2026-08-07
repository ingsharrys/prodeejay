<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'locale', 'wp_user_id', 'is_admin', 'role', 'dj_id',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'is_admin'          => 'boolean',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin' || $this->is_admin;
    }

    public function isDj(): bool
    {
        return $this->role === 'dj' && $this->dj_id !== null;
    }

    public function dj()
    {
        return $this->belongsTo(Dj::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function downloads(): HasMany
    {
        return $this->hasMany(Download::class);
    }

    /**
     * Plan activo del usuario (según su suscripción de Stripe).
     */
    public function currentPlan(): ?Plan
    {
        $subscription = $this->subscription('default');
        if (! $subscription || ! $subscription->valid()) {
            return null;
        }

        return Plan::where('stripe_price_id', $subscription->stripe_price)->first();
    }

    /**
     * Descargas usadas en el mes en curso.
     */
    public function downloadsThisMonth(): int
    {
        return $this->downloads()
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
    }

    /**
     * Descargas restantes del mes (null = sin suscripción).
     */
    public function downloadsRemaining(): ?int
    {
        $plan = $this->currentPlan();
        if (! $plan) {
            return null;
        }

        return max(0, $plan->downloads_per_month - $this->downloadsThisMonth());
    }

    /**
     * ¿Compró este track individualmente?
     */
    public function hasPurchased(Track $track): bool
    {
        return $this->orders()
            ->where('status', 'paid')
            ->whereHas('items', fn ($q) => $q->where('track_id', $track->id))
            ->exists();
    }
}
