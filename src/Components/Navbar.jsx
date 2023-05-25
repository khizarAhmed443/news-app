import './Navbar.css';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NewsContext } from './NewsContext';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const { setSearchQuery } = useContext(NewsContext);

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  return (
    <div className="nav">
      <div className="logo">
        <h3 className="appName">My News</h3>
      </div>
      <div className="category">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/politics">Politics</Link></li>
          <li><Link to="/science">Science</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/business">Business</Link></li>
        </ul>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search news..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
