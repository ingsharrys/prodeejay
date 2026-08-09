<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Configuración editable desde el administrador (impuestos, etc.)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
        });

        // Desglose contable del pedido y datos de facturación.
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('subtotal', 10, 2)->nullable();
            $table->decimal('tax_pct', 6, 3)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->string('customer_phone', 40)->nullable();
            $table->string('customer_country', 80)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['subtotal', 'tax_pct', 'tax_amount', 'customer_phone', 'customer_country']);
        });
        Schema::dropIfExists('settings');
    }
};
