<?php

namespace App\Http\Controllers;

use App\Models\Dj;
use App\Models\Page;
use App\Models\Playlist;

/** Sitemap XML para los buscadores (se envía en Google Search Console). */
class SitemapController extends Controller
{
    public function index()
    {
        $urls = [
            url('/'),
            route('player'),
            route('player.type', 'audio'),
            route('player.type', 'pack'),
            route('player.type', 'set'),
            route('player.type', 'video'),
            route('djs'),
            route('plans'),
            route('playlists'),
        ];

        foreach (Page::where('active', true)->where('noindex', false)->get() as $pagina) {
            $urls[] = url('/' . $pagina->slug);
        }
        foreach (Dj::where('active', true)->whereHas('tracks')->get() as $dj) {
            $urls[] = route('djs.show', $dj);
        }
        foreach (Playlist::whereHas('tracks')->get() as $playlist) {
            $urls[] = route('playlists.show', $playlist);
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach (array_unique($urls) as $u) {
            $xml .= '  <url><loc>' . e($u) . '</loc></url>' . "\n";
        }
        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }
}
