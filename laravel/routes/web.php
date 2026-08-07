<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DjController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

/* Público */
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/musica', [PlayerController::class, 'index'])->name('player');
Route::get('/musica/{type}', [PlayerController::class, 'index'])
    ->whereIn('type', ['audio', 'video', 'pack', 'set'])->name('player.type');

Route::get('/djs', [DjController::class, 'index'])->name('djs');
Route::get('/dj/{dj}', [DjController::class, 'show'])->name('djs.show');

Route::get('/planes', [SubscriptionController::class, 'plans'])->name('plans');

Route::get('/playlists', [\App\Http\Controllers\PlaylistController::class, 'index'])->name('playlists');
Route::get('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'show'])->name('playlists.show');

/* Idioma */
Route::get('/idioma/{locale}', [AccountController::class, 'setLocale'])->name('locale');

/* Carrito */
Route::get('/carrito', [CartController::class, 'index'])->name('cart.index');
Route::post('/carrito/{track}', [CartController::class, 'add'])->name('cart.add');
Route::delete('/carrito/{track}', [CartController::class, 'remove'])->name('cart.remove');
Route::get('/carrito-contador', [CartController::class, 'count'])->name('cart.count');

/* Autenticación */
Route::middleware('guest')->group(function () {
    Route::get('/entrar', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/entrar', [AuthController::class, 'login']);
    Route::get('/registro', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/registro', [AuthController::class, 'register']);
    Route::get('/recuperar', [AuthController::class, 'showForgot'])->name('password.request');
    Route::post('/recuperar', [AuthController::class, 'sendResetLink'])->name('password.email');
    Route::get('/restablecer/{token}', [AuthController::class, 'showReset'])->name('password.reset');
    Route::post('/restablecer', [AuthController::class, 'reset'])->name('password.update');
});

/* Usuarios autenticados */
Route::middleware('auth')->group(function () {
    Route::post('/salir', [AuthController::class, 'logout'])->name('logout');
    Route::get('/mi-cuenta', [AccountController::class, 'index'])->name('account');

    Route::get('/pagar', [CheckoutController::class, 'checkout'])->name('checkout');
    Route::get('/pago-exitoso', [CheckoutController::class, 'success'])->name('checkout.success');

    Route::get('/suscribirme/{plan}', [SubscriptionController::class, 'subscribe'])->name('subscribe');
    Route::get('/facturacion', [SubscriptionController::class, 'portal'])->name('billing');

    Route::get('/descargar/{track}', [DownloadController::class, 'download'])->name('download');
});

/* Panel del DJ (cada DJ ve solo sus reportes) */
Route::middleware(['auth', 'dj'])->prefix('panel-dj')->group(function () {
    Route::get('/', [\App\Http\Controllers\Dj\PanelController::class, 'index'])->name('dj.panel');
});

/* Administración */
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/generos', [\App\Http\Controllers\Admin\GenreAdminController::class, 'index'])->name('admin.genres');
    Route::post('/generos', [\App\Http\Controllers\Admin\GenreAdminController::class, 'store'])->name('admin.genres.store');
    Route::put('/generos/{genre}', [\App\Http\Controllers\Admin\GenreAdminController::class, 'update'])->name('admin.genres.update');
    Route::delete('/generos/{genre}', [\App\Http\Controllers\Admin\GenreAdminController::class, 'destroy'])->name('admin.genres.destroy');

    Route::get('/playlists', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'index'])->name('admin.playlists');
    Route::post('/playlists', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'store'])->name('admin.playlists.store');
    Route::get('/playlists/{playlist}', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'edit'])->name('admin.playlists.edit');
    Route::put('/playlists/{playlist}', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'update'])->name('admin.playlists.update');
    Route::delete('/playlists/{playlist}', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'destroy'])->name('admin.playlists.destroy');
    Route::post('/playlists/{playlist}/tracks/{track}', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'addTrack'])->name('admin.playlists.add');
    Route::delete('/playlists/{playlist}/tracks/{track}', [\App\Http\Controllers\Admin\PlaylistAdminController::class, 'removeTrack'])->name('admin.playlists.remove');

    Route::post('/djs/{dj}/toggle', [\App\Http\Controllers\Admin\DjAdminController::class, 'toggle'])->name('admin.djs.toggle');
    Route::post('/djs/{dj}/acceso', [\App\Http\Controllers\Admin\DjAdminController::class, 'acceso'])->name('admin.djs.acceso');

    Route::get('/reportes', [ReportController::class, 'index'])->name('admin.reports');
    Route::get('/reportes/exportar', [ReportController::class, 'export'])->name('admin.reports.export');

    Route::get('/tracks', [\App\Http\Controllers\Admin\TrackAdminController::class, 'index'])->name('admin.tracks');
    Route::get('/tracks/nuevo', [\App\Http\Controllers\Admin\TrackAdminController::class, 'create'])->name('admin.tracks.create');
    Route::post('/tracks', [\App\Http\Controllers\Admin\TrackAdminController::class, 'store'])->name('admin.tracks.store');
    Route::get('/tracks/{track}/editar', [\App\Http\Controllers\Admin\TrackAdminController::class, 'edit'])->name('admin.tracks.edit');
    Route::put('/tracks/{track}', [\App\Http\Controllers\Admin\TrackAdminController::class, 'update'])->name('admin.tracks.update');
    Route::delete('/tracks/{track}', [\App\Http\Controllers\Admin\TrackAdminController::class, 'destroy'])->name('admin.tracks.destroy');

    Route::get('/djs', [\App\Http\Controllers\Admin\DjAdminController::class, 'index'])->name('admin.djs');
    Route::get('/djs/nuevo', [\App\Http\Controllers\Admin\DjAdminController::class, 'create'])->name('admin.djs.create');
    Route::post('/djs', [\App\Http\Controllers\Admin\DjAdminController::class, 'store'])->name('admin.djs.store');
    Route::get('/djs/{dj}', [\App\Http\Controllers\Admin\DjAdminController::class, 'show'])->name('admin.djs.show');
    Route::get('/djs/{dj}/editar', [\App\Http\Controllers\Admin\DjAdminController::class, 'edit'])->name('admin.djs.edit');
    Route::put('/djs/{dj}', [\App\Http\Controllers\Admin\DjAdminController::class, 'update'])->name('admin.djs.update');
});
