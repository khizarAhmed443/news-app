import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/footer";
import NewsApp from "./Components/NewsApp";
import { NewsProvider } from "./Components/NewsContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <NewsProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<NewsApp />} />
        </Routes>
        <Footer/>
      </Router>
    </NewsProvider>
  </React.StrictMode>
);
