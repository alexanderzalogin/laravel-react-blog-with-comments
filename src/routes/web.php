<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CommentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('App', [
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('api')->group(function () {
    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index']);

        Route::post('/', [ArticleController::class, 'store']);

        Route::get('/{id}', [ArticleController::class, 'show']);

        Route::put('/{id}', [ArticleController::class, 'update']);

        Route::delete('/{id}', [ArticleController::class, 'destroy']);

        Route::post('/{id}/comments', [CommentController::class, 'store']);
    });
});

require __DIR__.'/auth.php';
