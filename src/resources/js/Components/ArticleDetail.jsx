import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articleService } from '../services/api';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentForm, setCommentForm] = useState({
        author_name: '',
        content: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await articleService.getById(id);
            setArticle(response.data);
            setError(null);
        } catch (err) {
            setError('Статья не найдена');
            console.error('Error fetching article:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!commentForm.author_name.trim() || !commentForm.content.trim()) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        try {
            setSubmitting(true);
            await articleService.addComment(id, commentForm);

            // Обновляем статью с новыми комментариями
            const response = await articleService.getById(id);
            setArticle(response.data);

            // Сбрасываем форму
            setCommentForm({
                author_name: '',
                content: '',
            });

            alert('Комментарий успешно добавлен!');
        } catch (err) {
            alert('Ошибка при добавлении комментария');
            console.error('Error adding comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentForm({
            ...commentForm,
            [name]: value,
        });
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

    if (!article) {
        return null;
    }

    return (
        <div>
            <button onClick={() => navigate('/')} className="btn btn-link mb-3">
                ← Назад к статьям
            </button>

            <article className="mb-5">
                <h1 className="mb-3">{article.title}</h1>
                <p className="text-muted mb-4">
                    Опубликовано: {formatDate(article.created_at)}
                </p>
                <div className="article-content mb-5">
                    {article.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <hr className="my-5" />

                <div className="comments-section">
                    <h3 className="mb-4">
                        Комментарии ({article.comments ? article.comments.length : 0})
                    </h3>

                    {/* Форма добавления комментария */}
                    <div className="card mb-5">
                        <div className="card-body">
                            <h5 className="card-title">Добавить комментарий</h5>
                            <form onSubmit={handleCommentSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="author_name" className="form-label">
                                        Ваше имя
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author_name"
                                        name="author_name"
                                        value={commentForm.author_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">
                                        Комментарий
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        name="content"
                                        rows="3"
                                        value={commentForm.content}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Отправка...' : 'Отправить'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Список комментариев */}
                    {article.comments && article.comments.length > 0 ? (
                        <div className="comments-list">
                            {article.comments.map((comment) => (
                                <div key={comment.id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="card-subtitle mb-2 text-primary">
                                                {comment.author_name}
                                            </h6>
                                            <small className="text-muted">
                                                {formatDate(comment.created_at)}
                                            </small>
                                        </div>
                                        <p className="card-text">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            Пока нет комментариев. Будьте первым!
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default ArticleDetail;
