<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

//TODO перенести логику в репозиторий
class CommentController extends Controller
{
    /**
     * Добавить комментарий к статье
     */
    public function store(Request $request, $articleId)
    {
        $request->validate([
            'author_name' => 'required|string|max:100',
            'content' => 'required|string|max:1000',
        ]);

        $comment = Comment::create([
            'article_id' => $articleId,
            'author_name' => $request->author_name,
            'content' => $request->content,
        ]);

        return response()->json($comment, 201);
    }
}
