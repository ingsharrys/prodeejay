<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Billable, HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'locale', 'wp_user_id', 'is_admin', 'role', 'dj_id',
        'plan_id', 'plan_expires_at',
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
            'plan_expires_at'   => 'datetime',
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
     * Plan activo del usuario: primero la suscripción asignada por el
     * administrador (con vigencia), y si no, la suscripción de Stripe.
     */
    public function currentPlan(): ?Plan
    {
        if ($this->plan_id && (! $this->plan_expires_at || $this->plan_expires_at->isFuture())) {
            $plan = Plan::find($this->plan_id);
            if ($plan && $plan->active) {
                return $plan;
            }
        }

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
