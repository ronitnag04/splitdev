import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=de13a4ea8781428cb2c07f5f79a710ae`
            );
            setArticles(response.data.articles);
        };
        getArticles();
    }, []);

    return (
        <div>
            {articles.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <p>By {article.author}</p>
                    <p>{article.description}</p>
                    <img src={article.urlToImage} alt={article.title} />
                    <p>Published at: {new Date(article.publishedAt).toLocaleString()}</p>
                    <p>Source: {article.source.name}</p>
                    <a href={article.url}>Read more</a>
                </div>
            ))}
        </div>
    );
};

export default News;
