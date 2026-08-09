<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * CMS: identidad del sitio (logo).
 */
class SiteAdminController extends Controller
{
    public function index()
    {
        return view('admin.site.index', [
            'logo' => Setting::get('logo_url'),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'logo'     => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:4096'],
            'logo_url' => ['nullable', 'url', 'max:2000'],
            'quitar'   => ['nullable'],
        ]);

        if ($request->boolean('quitar')) {
            Setting::set('logo_url', '');

            return back()->with('status', 'Logo quitado. Se muestra el nombre del sitio.');
        }

        if ($request->hasFile('logo')) {
            $archivo = $request->file('logo');
            $nombre  = 'logo-' . time() . '.' . strtolower($archivo->getClientOriginalExtension());
            $ruta    = $archivo->storeAs('sitio', $nombre, 'media');
            Setting::set('logo_url', rtrim(config('filesystems.disks.media.url'), '/') . '/' . $ruta);
        } elseif ($request->filled('logo_url')) {
            Setting::set('logo_url', $request->input('logo_url'));
        }

        return back()->with('status', 'Logo actualizado.');
    }
}
