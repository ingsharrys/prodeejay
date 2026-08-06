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

/* Administración */
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/reportes', [ReportController::class, 'index'])->name('admin.reports');
    Route::get('/reportes/exportar', [ReportController::class, 'export'])->name('admin.reports.export');
});
