<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Roles: admin | dj | customer. Un usuario con rol dj se vincula a su DJ.
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('customer');
            $table->foreignId('dj_id')->nullable()->constrained('djs')->nullOnDelete();
        });
        DB::table('users')->where('is_admin', true)->update(['role' => 'admin']);

        // DJs deshabilitables (dejan de mostrarse en el sitio).
        Schema::table('djs', function (Blueprint $table) {
            $table->boolean('active')->default(true);
        });

        // Playlists curadas por el administrador.
        Schema::create('playlists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('playlist_track', function (Blueprint $table) {
            $table->id();
            $table->foreignId('playlist_id')->constrained()->cascadeOnDelete();
            $table->foreignId('track_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('position')->default(0);
            $table->unique(['playlist_id', 'track_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('playlist_track');
        Schema::dropIfExists('playlists');
        Schema::table('djs', function (Blueprint $table) {
            $table->dropColumn('active');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('dj_id');
            $table->dropColumn('role');
        });
    }
};
