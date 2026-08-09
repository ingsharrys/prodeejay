<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Páginas del CMS en español e inglés.
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_es');
            $table->string('title_en')->nullable();
            $table->longText('content_es')->nullable();
            $table->longText('content_en')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Menú del sitio, bilingüe y ordenable.
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('label_es');
            $table->string('label_en')->nullable();
            $table->string('url');
            $table->unsignedInteger('position')->default(0);
            $table->boolean('active')->default(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('pages');
    }
};
