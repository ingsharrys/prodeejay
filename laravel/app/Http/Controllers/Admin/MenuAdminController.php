<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Http\Request;

/**
 * CMS: menú del sitio en español e inglés.
 */
class MenuAdminController extends Controller
{
    public function index()
    {
        return view('admin.menu.index', [
            'items' => MenuItem::orderBy('position')->get(),
            'pages' => Page::where('active', true)->orderBy('title_es')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['position'] = (int) MenuItem::max('position') + 1;
        MenuItem::create($data);

        return back()->with('status', 'Elemento agregado al menú.');
    }

    public function update(Request $request, MenuItem $item)
    {
        $item->update($this->validated($request) + ['position' => (int) $request->input('position', $item->position)]);

        return back()->with('status', 'Menú actualizado.');
    }

    public function destroy(MenuItem $item)
    {
        $item->delete();

        return back()->with('status', 'Elemento eliminado del menú.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'label_es' => ['required', 'string', 'max:80'],
            'label_en' => ['nullable', 'string', 'max:80'],
            'url'      => ['required', 'string', 'max:500'],
        ]);
        $data['active'] = $request->boolean('active', true);

        return $data;
    }
}
