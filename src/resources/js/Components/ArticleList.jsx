import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../services/api';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await articleService.getAll();
            setArticles(response.data);
            setError(null);
        } catch (err) {
            setError('Ошибка при загрузке статей');
            console.error('Error fetching articles:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Статьи</h1>
                <Link to="/articles/new" className="btn btn-primary">
                    Новая статья
                </Link>
            </div>

            {articles.length === 0 ? (
                <div className="alert alert-info">
                    Статьи не найдены. Создайте первую статью!
                </div>
            ) : (
                <div className="row">
                    {articles.map((article) => (
                        <div key={article.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text text-muted small">
                                        {formatDate(article.created_at)}
                                    </p>
                                    <p className="card-text">
                                        {article.excerpt || article.content.substring(0, 150) + '...'}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">
                      {article.comments_count} комментариев
                    </span>
                                        <Link
                                            to={`/articles/${article.id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            Читать далее
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticleList;
