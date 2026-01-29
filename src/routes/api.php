<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CommentController;
use Illuminate\Support\Facades\Route;

Route::prefix('articles')->group(function () {
    Route::get('/', [ArticleController::class, 'index']);

    Route::post('/', [ArticleController::class, 'store']);

    Route::get('/{id}', [ArticleController::class, 'show']);

    Route::put('/{id}', [ArticleController::class, 'update']);

    Route::delete('/{id}', [ArticleController::class, 'destroy']);

    Route::post('/{id}/comments', [CommentController::class, 'store']);
});
