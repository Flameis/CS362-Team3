import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../styles/general.css'; // Import the general CSS file
import '../styles/account.css'; // Import the Account CSS file

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const token = Cookies.get('token'); // Get the token from cookies
        const response = await fetch(`/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          },
        });
        const res_data = await response.json();
        if (response.ok) {
          setAccountInfo(res_data.data);
        } else {
          setError(res_data.error || "Failed to fetch account information");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchAccountInfo();
  }, []);

  const handleLogout = async () => {
    const response = await fetch(`/api/auth/logout`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}});
    const res_data = await response.json();
    console.debug("Token before removal:", Cookies.get('token'));
    Cookies.remove('token', { path: '/' });
    console.debug("Token after removal:", Cookies.get('token'));
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`/api/users/${accountInfo?.id}`, { // Ensure accountInfo is not null
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        Cookies.remove('token', { path: '/' });
        navigate("/register");
      } else {
        setError("Failed to delete account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!accountInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container account-container">
      <h1 className="title">Account</h1>
      <div className="side-nav">
        <ul>
          <button className="back">Back</button>
          <li><img src="compass.svg" alt="Identify"/><a href="#">Identify</a></li>
          <li><img src="mongodb-logo-24.png" alt="Plants"/><a href="#">Plants</a></li>
        </ul>
      </div>
      <div className="content">
        <h3>More coming soon</h3>
        <ul>
          <li><p>Settings</p></li>
          <li><p onClick={handleLogout}>Log Out</p></li>
        </ul>
        <div className="account-details">
          <p>Welcome, {accountInfo.username}!</p>
          <p>Email: {accountInfo.email}</p>
          <p>Role: {accountInfo.role}</p>
          <p>Date Joined: {accountInfo.date_joined}</p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default Account;