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
}
