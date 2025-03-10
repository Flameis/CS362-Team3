import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../styles/general.css'; // Import the general CSS file
import '../styles/authentication.css'; // Import the authentication CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loginCheck, setLoginCheck] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          navigate("/account");
        }
      } catch (error) {
        // console.error("Failed to check authentication status", error);
      }
      setLoginCheck(false);
    };
    checkAuthStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set('token', data.token, { expires: rememberMe ? 7 : 1 , path: '/' }); // Set the token as a cookie with expiration
        navigate("/account");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to the registration page
  };

  if (loginCheck) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container loginBox">
      <h1 className="title">Welcome to Beaver Botanica!</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <button onClick={handleRegister} className="register-button">Register</button>
      <br />
      <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
    </div>
  );
}

export default Login;
