import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NewsContext } from "./NewsContext";
import "./NewsApp.css";
import placeHolder from '../assets/images.png'


const API_KEY = "f5786906d4fd46b7b958f78d34598bea";
const PAGE_SIZE = 10;

const NewsApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sportsNews, setSportsNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const { news = [], setNews, searchQuery } = useContext(NewsContext);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };
  const handleContainerClick = (url) => {
    window.location.href = url;
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      let cachedData = localStorage.getItem("newsCache");
      let parsedData = cachedData ? JSON.parse(cachedData) : null;

      if (parsedData && parsedData.currentPage === currentPage && parsedData.searchQuery === searchQuery) {
        setNews(parsedData.news);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
      } else {
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=${PAGE_SIZE}&page=${currentPage}`;

        if (searchQuery) {
          apiUrl = `https://newsapi.org/v2/top-headlines?q=${searchQuery}&language=en&country=us&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}&page=${currentPage}`;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setNews(response.data.articles);
        setTotalResults(response.data.totalResults);
        setLoading(false);

        const cachedData = {
          news: response.data.articles,
          totalResults: response.data.totalResults,
          currentPage,
          searchQuery
        };
        localStorage.setItem("newsCache", JSON.stringify(cachedData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBusinessNews = async () => {
    try {
      const cachedBusinessNews = JSON.parse(localStorage.getItem("businessNewsCache"));

      if (
        cachedBusinessNews
      ) {
        // Use cached business news if available and not expired
        setBusinessNews(cachedBusinessNews.articles);
      } else {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=5`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        // Cache the fetched business news
        const businessNewsCache = {
          articles: response.data.articles,
        };
        localStorage.setItem("businessNewsCache", JSON.stringify(businessNewsCache));

        setBusinessNews(response.data.articles);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSportsNews = async () => {
    try {
      const cachedSportsNews = JSON.parse(localStorage.getItem("sportsNewsCache"));

      if (
        cachedSportsNews
      ) {
        // Use cached sports news if available and not expired
        setSportsNews(cachedSportsNews.articles);
      } else {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=3`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        // Cache the fetched sports news
        const sportsNewsCache = {
          articles: response.data.articles,
        };
        localStorage.setItem("sportsNewsCache", JSON.stringify(sportsNewsCache));

        setSportsNews(response.data.articles);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [searchQuery, currentPage, setNews]);

  useEffect(() => {
    fetchBusinessNews();
  }, [ setNews]);

  useEffect(() => {
    fetchSportsNews();
  }, [ setNews]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / PAGE_SIZE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="main">
      <div className="news-container"
        style={{ display: 'flex' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div
              style={{ width: '80%', margin: '0rem .5rem' }}
              className="container news-app-page"
            >
              <h1 style={{ width: '100vh', color: 'black', display: 'flex', justifyContent: 'center' }}
                className="heading"
              >Headlines</h1>

              {news.map((article, index) => (
                <div
                  style={{ width: '45%' }}
                  className="card"
                  key={`${article.title}-${index}`}
                  onClick={() => handleCardClick(article.url)}
                >
                  <h2 className="title">{article.title}</h2>
                  <p className="description">{article.description}</p>
                  <img src={article.urlToImage || placeHolder} alt="img" className="article-image" />

                  <p className="source">
                    Source: <a href={article.url}>{article.source.name}</a>
                  </p>
                  <p className="publish-date">Publish Date: {article.publishedAt}</p>
                </div>
              ))}

              <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= Math.ceil(totalResults / PAGE_SIZE)}
                >
                  Next
                </button>
              </div>
            </div>

            <div style={{ width: '20%' }} className="business-news"
              onClick={() => handleContainerClick('http://127.0.0.1:5173/business')}>
              <h3>Business News</h3>
              {businessNews.map((article, index) => (
                <div
                  
                  className="b-card"
                  key={`${article.title}-${index}`}
                >
                  <h2 className="b-title">{article.title}</h2>
                  <p className="b-description">{article.description}</p>

                </div>
              ))}
            </div>


          </>
        )}
      </div>
      <div className="sports-news"
        onClick={() => handleContainerClick('http://127.0.0.1:5173/sports')}>
        <h3 style={{ padding: '1rem' }}>Sports News</h3>
        <div className="sports-card">
          {sportsNews.map((article, index) => (
            <div
              className="s-card"
              key={`${article.title}-${index}`}

            >
              <h2 className="s-title">{article.title}</h2>
              <p className="s-description">{article.description}</p>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NewsApp;
