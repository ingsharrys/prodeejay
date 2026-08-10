<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'status', 'total', 'currency', 'stripe_session_id',
        'stripe_payment_intent', 'wp_order_id', 'paid_at',
        'payment_method', 'paypal_order_id', 'square_order_id',
        'customer_name', 'customer_email', 'payment_title',
        'subtotal', 'tax_pct', 'tax_amount', 'customer_phone', 'customer_country',
        'plan_id', 'plan_months',
    ];

    protected function casts(): array
    {
        return [
            'paid_at' => 'datetime',
            'total'   => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    /** ¿Es un pedido de suscripción (y no de compra de canciones)? */
    public function esSuscripcion(): bool
    {
        return $this->plan_id !== null;
    }

    /**
     * Confirma el pago del pedido. Si es una suscripción, activa el plan
     * del usuario sumando los meses pagados a su vencimiento vigente.
     * Es idempotente: un pedido ya pagado no vuelve a aplicar nada.
     */
    public function marcarPagada(array $extra = []): void
    {
        if ($this->status === 'paid') {
            return;
        }

        $this->update($extra + ['status' => 'paid', 'paid_at' => now()]);

        if ($this->plan_id && $this->user) {
            $user = $this->user;
            $base = ($user->plan_id == $this->plan_id && $user->plan_expires_at?->isFuture())
                ? $user->plan_expires_at
                : now();

            $user->update([
                'plan_id'         => $this->plan_id,
                'plan_expires_at' => $base->copy()->addMonths(max(1, (int) $this->plan_months)),
            ]);
        }
    }
}
