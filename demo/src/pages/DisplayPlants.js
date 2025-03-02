import React, { useState, useEffect } from "react";
import '../styles/general.css'; // Import the general CSS file

function DisplayPlants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/plants')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setPlants(data.data);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
        setError(error.message);
      });
  }, []);

  const filteredPlants = plants.filter(plant =>
    plant.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="display-plants-container">
      <h1>Plants</h1>
      <input
        type="text"
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="plants-table">
        <thead>
          <tr>
            <th>Species ID</th>
            <th>Image ID</th>
            <th>Description</th>
            <th>Location</th>
            <th>Season</th>
            <th>Average Rating</th>
            <th>Date Added</th>
            <th>Date Updated</th>
            <th>X Coordinate</th>
            <th>Y Coordinate</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlants.map(plant => (
            <tr key={plant.species_id}>
              <td>{plant.species_id}</td>
              <td>{plant.image_id}</td>
              <td>{plant.description}</td>
              <td>{plant.location}</td>
              <td>{plant.season}</td>
              <td>{plant.avg_rating}</td>
              <td>{plant.date_added}</td>
              <td>{plant.date_updated}</td>
              <td>{plant.x_coordinate}</td>
              <td>{plant.y_coordinate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayPlants;
