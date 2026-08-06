<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // DJs / productores
        Schema::create('djs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('bio')->nullable();
            $table->string('image_url')->nullable();
            $table->unsignedBigInteger('wp_term_id')->nullable()->index();
            $table->timestamps();
        });

        // Géneros musicales
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('wp_term_id')->nullable()->index();
            $table->timestamps();
        });

        // Tracks (remixes, edits, packs, sets, videos)
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type')->default('audio'); // audio | video | pack | set
            $table->foreignId('dj_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('genre_id')->nullable()->constrained()->nullOnDelete();
            $table->string('artist')->nullable();
            $table->string('bpm')->nullable();
            $table->text('preview_url')->nullable();   // preview de audio/video
            $table->text('file_url')->nullable();      // archivo completo (enlace de música)
            $table->decimal('price', 8, 2)->default(0);
            $table->date('released_at')->nullable();
            $table->unsignedBigInteger('wp_product_id')->nullable()->unique();
            $table->json('wp_attributes')->nullable(); // todos los atributos originales de WooCommerce
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->index(['type', 'active']);
            $table->index('title');
        });

        // Planes de membresía
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('stripe_price_id')->nullable();
            $table->decimal('price', 8, 2)->default(0);
            $table->unsignedInteger('downloads_per_month')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Pedidos
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->default('pending'); // pending | paid | refunded
            $table->decimal('total', 10, 2)->default(0);
            $table->string('currency', 3)->default('usd');
            $table->string('stripe_session_id')->nullable()->index();
            $table->string('stripe_payment_intent')->nullable();
            $table->unsignedBigInteger('wp_order_id')->nullable()->unique();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('track_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->decimal('price', 8, 2)->default(0);
            $table->unsignedInteger('quantity')->default(1);
            $table->timestamps();
        });

        // Registro de descargas (para el límite mensual por plan)
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('track_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
            $table->index(['user_id', 'created_at']);
        });

        // Campos extra en usuarios
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
            $table->string('locale', 5)->default('es');
            $table->unsignedBigInteger('wp_user_id')->nullable()->unique();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_admin', 'locale', 'wp_user_id']);
        });
        Schema::dropIfExists('downloads');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('plans');
        Schema::dropIfExists('tracks');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('djs');
    }
};
