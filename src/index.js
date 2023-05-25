import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/footer";
import NewsApp from "./Components/NewsApp";
import { NewsProvider } from "./Components/NewsContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessPage from "./Components/Business";
import SciencePage from "./Components/Science";
import SportsPage from "./Components/Sports";
import PoliticsPage from "./Components/Politics";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <NewsProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<NewsApp />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/politics" element={<PoliticsPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/business" element={<BusinessPage />} />
        </Routes>
        <Footer/>
      </Router>
    </NewsProvider>
  </React.StrictMode>
);
