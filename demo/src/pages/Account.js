import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!accountInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Account Page</h1>
      <p>Welcome, {accountInfo.username}!</p>
      <p>Role: {accountInfo.role}</p>
      <p>Date Joined: {accountInfo.date_joined}</p>
    </div>
  );
}

export default Account;