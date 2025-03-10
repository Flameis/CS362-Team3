import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/general.css'; // Import the general CSS file
import './NavBar.css'; // Import the NavBar CSS file
import logo from '../Logo-circle.v2.120px.png';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const res_data = await response.json();
        if (response.ok && res_data.data.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar')) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="navbar-toggle-container">
        <div className="navbar-toggle" onClick={toggleSidebar}>
          <img src={logo} alt="Toggle Sidebar" />
        </div>
      </div>
      <nav className={`navbar ${isOpen ? 'open' : ''}`} onClick={stopPropagation}>
        <ul>
          <li><Link to="/map" onClick={toggleSidebar}>Map</Link></li>
          <li><Link to="/display-plants" onClick={toggleSidebar}>Plants</Link></li>
          <li><Link to="/Login" onClick={toggleSidebar}>Login</Link></li>
          <li><Link to="/register" onClick={toggleSidebar}>Register</Link></li>
          <li><Link to="/account" onClick={toggleSidebar}>Account</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
          {isAdmin && <li><Link to="/reports" onClick={toggleSidebar}>Reports</Link></li>}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
