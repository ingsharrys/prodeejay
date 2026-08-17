<?php

use App\Http\Controllers\Api\AccountApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\CatalogApiController;
use App\Http\Controllers\Api\PurchaseApiController;
use Illuminate\Support\Facades\Route;

/*
 * API para la app móvil (clientes). La administración se hace solo
 * desde la web. Autenticación por tokens de Sanctum (Bearer).
 */

/* Público */
Route::post('/registro', [AuthApiController::class, 'registro']);
Route::post('/entrar', [AuthApiController::class, 'entrar']);

Route::get('/config', [CatalogApiController::class, 'config']);
Route::get('/catalogo', [CatalogApiController::class, 'catalogo']);
Route::get('/generos', [CatalogApiController::class, 'generos']);
Route::get('/djs', [CatalogApiController::class, 'djs']);
Route::get('/djs/{dj}', [CatalogApiController::class, 'dj']);
Route::get('/planes', [CatalogApiController::class, 'planes']);

/* Clientes autenticados */
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/salir', [AuthApiController::class, 'salir']);
    Route::get('/perfil', [AuthApiController::class, 'perfil']);
    Route::get('/mi-cuenta', [AccountApiController::class, 'miCuenta']);

    Route::post('/comprar', [PurchaseApiController::class, 'comprar']);
    Route::post('/suscribirme', [PurchaseApiController::class, 'suscribirme']);
    Route::get('/pedidos/{order}', [PurchaseApiController::class, 'pedido']);
    Route::get('/descargar/{track}', [PurchaseApiController::class, 'descargar']);
});
