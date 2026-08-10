<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Pedidos de suscripción: plan comprado y meses prepagados.
            $table->unsignedBigInteger('plan_id')->nullable()->after('user_id');
            $table->unsignedSmallInteger('plan_months')->nullable()->after('plan_id');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['plan_id', 'plan_months']);
        });
    }
};
