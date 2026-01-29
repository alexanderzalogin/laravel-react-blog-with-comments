<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

//TODO перенести логику в репозиторий
class ArticleController extends Controller
{
    /**
     * Получить список статей
     */
    public function index()
    {
        $articles = Article::withCount('comments')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($articles);
    }

    /**
     * Получить конкретную статью с комментариями
     */
    public function show($id)
    {
        $article = Article::with(['comments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->findOrFail($id);

        return response()->json($article);
    }

    /**
     * Создать новую статью
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json($article, 201);
    }

    /**
     * Обновить статью
     */
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article->update([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json($article);
    }

    /**
     * Удалить статью
     */
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(null, 204);
    }
}
