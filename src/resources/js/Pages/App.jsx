import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/app.css';
import ArticleList from '../components/ArticleList';
import ArticleDetail from '../components/ArticleDetail';
import CreateArticle from '../components/CreateArticle';
import Navigation from '../components/Navigation';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<ArticleList />} />
                        <Route path="/articles" element={<ArticleList />} />
                        <Route path="/articles/new" element={<CreateArticle />} />
                        <Route path="/articles/:id" element={<ArticleDetail />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
