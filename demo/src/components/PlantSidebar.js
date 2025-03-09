import React, { useState, useImperativeHandle, forwardRef} from 'react';
import './PlantSidebar.css';
import '../styles/general.css'; // Import the general CSS file
import SpeciesDropdown from './SpeciesDropdown';

const PlantSidebar = forwardRef(({ currentMarker, onAddPlant, onClose, isEditMode}, ref) => {
  useImperativeHandle(ref, () => ({
    populateForm(data) {
      setDescription(data.description);
      setLocation(data.location);
      setSeason(data.season);
      setSpeciesId(data.species_id);
      setImageUrls(Object.values(JSON.parse(data.images ?? "{}")));
    },
  }));
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
    console.debug(currentMarker);
    e.preventDefault();
    const plantData = {
      species_id,
      description,
      location,
      season,
      date_added: new Date().toISOString().split('T')[0],
      x_coordinate: currentMarker.data.x_coordinate,
      y_coordinate: currentMarker.data.y_coordinate,
      image_urls: imageUrls.filter(url => url !== '')
    };
    onAddPlant(plantData);
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
        {isEditMode ? (
          <button type="submit">Edit Plant</button>
        ) : (
          <button type="submit">Add Plant</button>
        )}
      </form>
    </div>
  );
});

export default PlantSidebar;
