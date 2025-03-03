import React, { useState } from 'react';
import './PlantSidebar.css';
import '../styles/general.css';
import SpeciesDropdown from './SpeciesDropdown';

function PlantSidebar({ coordinates, onAddPlant, onClose }) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('');
  // const [avg_rating, setAvgRating] = useState(0);
  const [species_id, setSpeciesId] = useState('');
  // const [imageFile, setImageFile] = useState(null);
  const [imageUrls, setImageUrls] = useState(['']);

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const plantData = {
      species_id,
      description,
      location,
      season,
      date_added: new Date().toISOString().split('T')[0],
      x_coordinate: coordinates[0],
      y_coordinate: coordinates[1],
      image_urls: imageUrls.filter(url => url !== '')
    };
    onAddPlant(coordinates, plantData);
    onClose();
  };

  return (
    <div className="sidebar">
      <button onClick={onClose}>Close</button>
      <form onSubmit={handleSubmit}>
        <SpeciesDropdown selectedSpecies={species_id} onSpeciesChange={setSpeciesId} />
        <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></label><br />
        <label>Location: <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></label><br />
        <label>Season: <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} /></label><br />
        {imageUrls.map((url, index) => (
          <div key={index}>
            <label>Image URL: <input type="text" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} /></label><br />
          </div>
        ))}
        <button type="button" onClick={addImageUrlField}>Add Another Image</button><br />
        {/* <label>Image: <input type="file" onChange={(e) => setImageFile(e.target.files[0])} /></label><br /> */}
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default PlantSidebar;
