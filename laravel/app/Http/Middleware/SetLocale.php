<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->session()->get('locale')
            ?? $request->user()?->locale
            ?? substr((string) $request->server('HTTP_ACCEPT_LANGUAGE', 'es'), 0, 2);

        app()->setLocale(in_array($locale, ['es', 'en'], true) ? $locale : 'es');

        return $next($request);
    }
}
