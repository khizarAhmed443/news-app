import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { NewsContext } from "./NewsContext";
import "./NewsApp.css";
import placeHolder from '../assets/images.png'

const API_KEY = "f5786906d4fd46b7b958f78d34598bea";
const PAGE_SIZE = 10;

const SciencePage = () => {
  const { news, setNews, searchQuery } = useContext(NewsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchScienceNews = async () => {
      try {
        setLoading(true);
        let cachedData = localStorage.getItem(`scienceNews-${searchQuery}`);
        let parsedData = cachedData ? JSON.parse(cachedData) : null;

        if (
          parsedData &&
          parsedData.currentPage === currentPage &&
          parsedData.searchQuery === searchQuery &&
          Date.now() - parsedData.timestamp <= 3600000 // 1 hour in milliseconds
        ) {
          setNews(parsedData.news);
          setTotalResults(parsedData.totalResults);
          setLoading(false);
        } else {
          let apiUrl = `https://newsapi.org/v2/top-headlines?category=science&language=en&pageSize=${PAGE_SIZE}&page=${currentPage}`;

          if (searchQuery) {
            apiUrl = `https://newsapi.org/v2/top-headlines?q=${searchQuery}&language=en&category=science&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}&page=${currentPage}`;
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
            searchQuery,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            `scienceNews-${searchQuery}`,
            JSON.stringify(cachedData)
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchScienceNews();
  }, [searchQuery, currentPage, API_KEY, setNews]);

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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {news.length === 0 ? (
            <div style={{ margin: '5rem 15rem;' }}><h1 >No news found for the search query.</h1></div>
          ) :
            (
              <>
                <div className="container">
                  {news.map((article, index) => (
                    <div
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
                </div>

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
              </>
            )}
        </>
      )}
    </div>
  );
};

export default SciencePage;
