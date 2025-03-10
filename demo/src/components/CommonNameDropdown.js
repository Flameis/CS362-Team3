import React, { useState, useEffect } from 'react';

function SpeciesDropdown({ selected, onChange, onClick }) {
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
        placeholder="Search common name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a common name</option>
        {filteredSpecies.map(species => (
          <option key={species.species_id} value={species.common_name}>
            {species.common_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpeciesDropdown;
