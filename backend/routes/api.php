<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('user', UserController::class)->except(['show']);
Route::apiResource('product', ProductController::class)->except(['show']);
