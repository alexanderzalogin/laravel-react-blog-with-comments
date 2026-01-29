<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $articles = [
            [
                'title' => 'Введение в Laravel',
                'content' => 'Laravel — это PHP-фреймворк для веб-приложений с выразительным, элегантным синтаксисом. Мы считаем, что разработка должна быть приятным и творческим процессом.',
                'excerpt' => 'Основные принципы работы с Laravel...'
            ],
            [
                'title' => 'React для начинающих',
                'content' => 'React — это JavaScript-библиотека для создания пользовательских интерфейсов. Она позволяет создавать сложные UI из небольших изолированных частей, называемых компонентами.',
                'excerpt' => 'Начало работы с React...'
            ],
            [
                'title' => 'Docker и контейнеризация',
                'content' => 'Docker — это платформа для разработки, доставки и запуска приложений в контейнерах. Контейнеры позволяют упаковать приложение со всеми его зависимостями.',
                'excerpt' => 'Основы работы с Docker...'
            ],
            [
                'title' => 'REST API: основы',
                'content' => 'REST (Representational State Transfer) — это архитектурный стиль для создания веб-сервисов. RESTful API используют HTTP методы для выполнения операций CRUD.',
                'excerpt' => 'Принципы разработки REST API...'
            ],
            [
                'title' => 'Базы данных MySQL',
                'content' => 'MySQL — это система управления реляционными базами данных с открытым исходным кодом. Она широко используется в веб-приложениях благодаря своей надежности.',
                'excerpt' => 'Работа с MySQL в веб-приложениях...'
            ]
        ];

        foreach ($articles as $articleData) {
            $article = Article::create($articleData);

            // Создаем 2-3 комментария для каждой статьи
            for ($i = 1; $i <= rand(2, 3); $i++) {
                Comment::create([
                    'article_id' => $article->id,
                    'author_name' => "Пользователь $i",
                    'content' => "Отличная статья! Особенно понравился раздел про " . strtolower(explode(' ', $article->title)[0]) . "."
                ]);
            }
        }
    }
}
