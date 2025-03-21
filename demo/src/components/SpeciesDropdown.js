import React, { useState, useEffect } from 'react';

function SpeciesDropdown({ selectedSpecies, onSpeciesChange, onClick }) {
  const [species, setSpecies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/species')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setSpecies(data.data);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching species:', error);
      });
  }, []);

  const filteredSpecies = species.filter(species =>
    species.common_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div onClick={onClick}>
      <input
        type="text"
        placeholder="Search species..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={selectedSpecies} onChange={(e) => onSpeciesChange(e.target.value)}>
        <option value="">Select a species</option>
        {filteredSpecies.map(species => (
          <option key={species.species_id} value={species.species_id}>
            {species.common_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpeciesDropdown;
