import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const articleService = {
    getAll: () => api.get('/articles'),

    getById: (id) => api.get(`/articles/${id}`),

    create: (articleData) => api.post('/articles', articleData),

    update: (id, articleData) => api.put(`/articles/${id}`, articleData),

    delete: (id) => api.delete(`/articles/${id}`),

    addComment: (articleId, commentData) =>
        api.post(`/articles/${articleId}/comments`, commentData),
};
