import React, { useState, useEffect } from "react";

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const userId = 6; // Replace with the actual user ID
        const response = await fetch(`/api/user/:${userId}`);
        const data = await response.json();
        if (response.ok) {
          setAccountInfo(data);
        } else {
          setError(data.error || "Failed to fetch account information");
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