import React, { createContext, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <NewsContext.Provider
      value={{ news,setNews,
        searchQuery, setSearchQuery,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
