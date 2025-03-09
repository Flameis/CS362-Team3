import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import '../styles/general.css'; // Corrected import
import logo from '../Logo-circle.v2.120px.png';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="navbar-toggle-container">
        <div className="navbar-toggle" onClick={toggleSidebar}>
          <img src={logo} alt="Toggle Sidebar" />
        </div>
      </div>
      <nav className={`navbar ${isOpen ? 'open' : ''}`} onClick={stopPropagation}>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/Login" onClick={toggleSidebar}>Login</Link></li>
          <li><Link to="/register" onClick={toggleSidebar}>Register</Link></li>
          <li><Link to="/account" onClick={toggleSidebar}>Account</Link></li>
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
