import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../services/api';

const CreateArticle = () => {
    const navigate = useNavigate();
    const [articleForm, setArticleForm] = useState({
        title: '',
        content: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!articleForm.title.trim() || !articleForm.content.trim()) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const response = await articleService.create(articleForm);

            // Перенаправляем на страницу новой статьи
            navigate(`/articles/${response.data.id}`);

            alert('Статья успешно создана!');
        } catch (err) {
            setError('Ошибка при создании статьи');
            console.error('Error creating article:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticleForm({
            ...articleForm,
            [name]: value,
        });
    };

    return (
        <div>
            <button onClick={() => navigate('/')} className="btn btn-link mb-3">
                ← Назад к статьям
            </button>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Новая статья</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Заголовок
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={articleForm.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="content" className="form-label">
                                        Содержание
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        name="content"
                                        rows="10"
                                        value={articleForm.content}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/')}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Создание...' : 'Создать статью'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateArticle;
