import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/general.css'; // Import the general CSS file
import '../styles/displayplants.css'; // Corrected import statement

function DisplayPlants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/api/plants');
        const data = await response.json();
        console.log('Fetched plants data:', data); // Print the JSON data in console
        if (Array.isArray(data.data)) {
          const plantsWithImages = await Promise.all(data.data.map(async (plant) => {
            const imagesResponse = await fetch(`/api/images?plant_id=${plant.plant_id}`);
            const imagesData = await imagesResponse.json();
            return {
              ...plant,
              images: imagesData.data || []
            };
          }));
          setPlants(plantsWithImages);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
        setError(error.message);
      }
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(plant =>
    plant.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoToPlantPage = (plantId) => {
    navigate(`/plant/${plantId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container display-plants-container">
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
            <th>Plant ID</th>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlants.map(plant => (
            <tr key={plant.plant_id}>
              <td>{plant.plant_id}</td>
              <td>{plant.species_id}</td>
              <td>
                {plant.images && plant.images.length > 0 ? (
                  <img src={plant.images[0].image_url} alt="Plant" style={{ width: '50px', height: '50px' }} />
                ) : (
                  'No image'
                )}
              </td>
              <td>{plant.description}</td>
              <td>{plant.location}</td>
              <td>{plant.season}</td>
              <td>{plant.avg_rating}</td>
              <td>{plant.date_added}</td>
              <td>{plant.date_updated}</td>
              <td>{plant.x_coordinate}</td>
              <td>{plant.y_coordinate}</td>
              <td>
                <button onClick={() => handleGoToPlantPage(plant.plant_id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayPlants;
