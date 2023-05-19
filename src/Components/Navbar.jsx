import './Navbar.css';
import React from 'react';
// import { Link } from 'react-router-dom';
// import { NewsContext } from './NewsContext';

const Navbar = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const { setSearchQuery } = useContext(NewsContext);

//   const handleSearch = () => {
//     setSearchQuery(searchValue);
//   };

  return (
    <div className="nav">
      <div className="logo">
        <h3 className="appName">My News</h3>
      </div>
      <div className="category">
        <ul>
          <li>Home</li>
          <li>Politics</li>
          <li>Science</li>
          <li>Sports</li>
          <li>Business</li>
        </ul>
        <input
          type="text"
        //   value={searchValue}
         
          placeholder="Search news..."
        />
        <button >Search</button>
      </div>
    </div>
  );
};

export default Navbar;
