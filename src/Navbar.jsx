import React from 'react';
import { Link} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {


  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-links nav-links-left">
          <Link to="/" className="nav-link">Home</Link>
         
        </div>
        <div className="nav-links nav-links-right">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
