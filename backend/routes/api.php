<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/user', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/check', [AuthController::class, 'check'])
        ->middleware(['auth:sanctum', 'ability:ADMIN,MANAGER,USER']);

    Route::apiResource('user', UserController::class)->only(['index', 'update'])
        ->middleware(['auth:sanctum', 'ability:ADMIN']);

    Route::get('product', [ProductController::class, 'index'])
        ->middleware(['auth:sanctum', 'ability:ADMIN,MANAGER,USER']);
    Route::apiResource('product', ProductController::class)->only(['store', 'update', 'destroy'])
        ->middleware(['auth:sanctum', 'ability:ADMIN,MANAGER']);

    Route::get('category', [CategoryController::class, 'index'])
        ->middleware(['auth:sanctum', 'ability:ADMIN,MANAGER']);

});



