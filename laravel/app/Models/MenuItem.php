<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    public $timestamps = false;

    protected $fillable = ['label_es', 'label_en', 'url', 'position', 'active'];

    protected function casts(): array
    {
        return ['active' => 'boolean'];
    }

    public function label(): string
    {
        return (app()->getLocale() === 'en' && $this->label_en) ? $this->label_en : $this->label_es;
    }
}
