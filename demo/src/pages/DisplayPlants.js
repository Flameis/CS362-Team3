import React, { useState, useEffect } from "react";

function DisplayPlants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Plants</h1>
      <table>
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
          {plants.map(plant => (
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
