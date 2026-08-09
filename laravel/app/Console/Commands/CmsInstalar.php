<?php

namespace App\Console\Commands;

use App\Support\CmsPorDefecto;
use Illuminate\Console\Command;

class CmsInstalar extends Command
{
    protected $signature = 'cms:instalar';

    protected $description = 'Crea las páginas por defecto del sitio (inicio, suscripciones, djs, packs, sets-mixes, video) y el menú';

    public function handle(): int
    {
        $resultado = CmsPorDefecto::instalar();

        $this->info(count($resultado['creadas'])
            ? 'Páginas creadas: ' . implode(', ', $resultado['creadas'])
            : 'No había páginas nuevas por crear (ya existían).');
        $this->info($resultado['menu'] ? 'Menú por defecto creado.' : 'El menú ya existía, no se tocó.');
        $this->info($resultado['portada'] ? 'La página "inicio" quedó como portada.' : 'La portada no se cambió.');

        return self::SUCCESS;
    }
}
