<?php

namespace App\Http\Controllers;

use App\Models\Page;

class PageController extends Controller
{
    public function show(Page $pagina)
    {
        abort_unless($pagina->active, 404);

        return view('pages.show', ['page' => $pagina]);
    }
}
