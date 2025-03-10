import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../styles/general.css'; // Import the general CSS file
import '../styles/reports.css'; // Import the Reports CSS file

function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = Cookies.get('token'); // Get the token from cookies
        const response = await fetch(`/api/reports`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          },
        });
        const res_data = await response.json();
        if (response.ok) {
          setReports(res_data.data);
        } else {
          setError(res_data.error || "Failed to fetch reports");
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError("An error occurred. Please try again.");
      }
    };

    fetchReports();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reports || reports.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container reports-container">
      <h1 className="title">Reports</h1>
      <div className="content">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Plant ID</th>
              <th>User ID</th>
              <th>Description</th>
              <th>Date Reported</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.report_id}>
                <td>{report.plant_id}</td>
                <td>{report.user_id}</td>
                <td>{report.description}</td>
                <td>{report.date_reported}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
