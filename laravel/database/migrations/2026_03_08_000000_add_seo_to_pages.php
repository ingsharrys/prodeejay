<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->string('seo_title_es', 190)->nullable()->after('blocks');
            $table->string('seo_title_en', 190)->nullable()->after('seo_title_es');
            $table->string('seo_description_es', 300)->nullable()->after('seo_title_en');
            $table->string('seo_description_en', 300)->nullable()->after('seo_description_es');
            $table->string('og_image', 500)->nullable()->after('seo_description_en');
            $table->boolean('noindex')->default(false)->after('og_image');
        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['seo_title_es', 'seo_title_en', 'seo_description_es', 'seo_description_en', 'og_image', 'noindex']);
        });
    }
};
