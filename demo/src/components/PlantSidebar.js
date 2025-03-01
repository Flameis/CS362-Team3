import React, { useState } from 'react';

function PlantSidebar({ coordinates, onAddPlant, onClose }) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('');
  const [avg_rating, setAvgRating] = useState(0);
  const [species_id, setSpeciesId] = useState('');
  const [image_id, setImageId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const plantData = {
      species_id,
      image_id,
      description,
      location,
      season,
      avg_rating,
      date_added: new Date().toISOString().split('T')[0],
      x_coordinate: coordinates[0],
      y_coordinate: coordinates[1]
    };
    onAddPlant(coordinates, plantData);
    onClose();
  };

  return (
    <div className="sidebar">
      <button onClick={onClose}>Close</button>
      <form onSubmit={handleSubmit}>
        <label>Species ID: <input type="text" value={species_id} onChange={(e) => setSpeciesId(e.target.value)} /></label><br />
        <label>Image ID: <input type="text" value={image_id} onChange={(e) => setImageId(e.target.value)} /></label><br />
        <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></label><br />
        <label>Location: <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></label><br />
        <label>Season: <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} /></label><br />
        <label>Rating: <input type="number" value={avg_rating} onChange={(e) => setAvgRating(e.target.value)} /></label><br />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default PlantSidebar;
