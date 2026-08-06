<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Planes (los mismos del sitio original). El stripe_price_id se
        // completa después de crear los precios en el panel de Stripe.
        Plan::updateOrCreate(['slug' => 'basico'], [
            'name'                => 'Basico',
            'price'               => 0,
            'downloads_per_month' => 100,
            'active'              => true,
        ]);
        Plan::updateOrCreate(['slug' => 'premium'], [
            'name'                => 'Premium',
            'price'               => 0,
            'downloads_per_month' => 200,
            'active'              => true,
        ]);

        // Administrador inicial (definir ADMIN_EMAIL y ADMIN_PASSWORD en .env).
        if (env('ADMIN_EMAIL')) {
            User::updateOrCreate(
                ['email' => env('ADMIN_EMAIL')],
                [
                    'name'     => 'Admin',
                    'password' => env('ADMIN_PASSWORD', Str::random(24)),
                    'is_admin' => true,
                ]
            );
        }
    }
}
