import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-links nav-links-left">
          <Link to="/" className="nav-link">Home</Link>      
        </div>
        <div className="nav-links nav-links-right">
          <Link to="/contact" className="nav-link">Contact</Link>      
        </div>
        <div className="nav-links nav-links-right">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
             {userRole === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
             )}
             <button onClick={handleLogout} className="nav-link logout">
                Logout
             </button>

          </>
        ) : (
            <Link to="/login" className="nav-link">Login</Link>
        )}
              
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
