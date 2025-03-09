import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './NavBar.css';
import logo from '../Logo-circle.v2.120px.png';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
    toggleSidebar();
  };

  return (
    <>
      <div className="navbar-toggle-container">
        <div className="navbar-toggle" onClick={toggleSidebar}>
          <img src={logo} alt="Toggle Sidebar" />
        </div>
      </div>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><a onClick={handleAuthClick}>{isAuthenticated ? 'Account' : 'Login/Register'}</a></li>
          <li><Link to="/map" onClick={toggleSidebar}>Map</Link></li>
          <li><Link to="/display-plants" onClick={toggleSidebar}>Plants</Link></li>
          <li><Link to="/sitemap" onClick={toggleSidebar}>Site Map</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
