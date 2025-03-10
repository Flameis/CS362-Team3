import React, { useState, useImperativeHandle, forwardRef } from 'react';
import '../styles/general.css'; // Import the general CSS file
import './PlantFilterBar.css'; // Import the PlantSidebar CSS file
import CommonNameDropdown from './CommonNameDropdown';
import SpeciesDropdown from './SpeciesDropdown2';
import GenusDropdown from './GenusDropdown';

const PlantFilterBar = ({ filter, setFilter, onClose }) => {

  const [species, setSpecies] = useState('');
  const [genus, setGenus] = useState('');
  const [common_name, setCommonName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let filter_data = {};
    if (genus) filter_data.genus = genus;
    if (species) filter_data.species = species;
    if (common_name) filter_data.common_name = common_name;
    setFilter(filter_data)
  };

  return (
    <div className="bottom-bar">
      <button onClick={onClose}>Close</button>
      <form onSubmit={handleSubmit}>
        <button onClick={()=>setGenus(null)}>clear</button><GenusDropdown selected={genus} onChange={setGenus} />
        <button onClick={()=>setSpecies(null)}>clear</button><SpeciesDropdown selected={species} onChange={setSpecies} />
        <button onClick={()=>setCommonName(null)}>clear</button><CommonNameDropdown selected={common_name} onChange={setCommonName} />
        <button type="submit">Apply Filter</button>
      </form>
    </div>
  );
};

export default PlantFilterBar;
