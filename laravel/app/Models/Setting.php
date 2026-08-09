<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Configuración clave-valor editable desde el administrador.
 */
class Setting extends Model
{
    public $timestamps = false;

    protected $fillable = ['key', 'value'];

    public static function get(string $key, $default = null)
    {
        static $cache = null;
        if ($cache === null) {
            $cache = self::query()->pluck('value', 'key')->all();
        }

        return $cache[$key] ?? $default;
    }

    public static function set(string $key, $value): void
    {
        self::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
