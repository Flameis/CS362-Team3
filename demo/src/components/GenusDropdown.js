import React, { useState, useEffect } from 'react';

function GenusDropdown({ selected, onChange, onClick }) {
  const [species, setSpecies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSpecies, setFilteredSpecies] = useState([]);

  useEffect(() => {
    fetch('/api/species')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          const uniqueSpecies = Array.from(new Set(data.data.map(item => item.genus)))
            .map(genus => data.data.find(item => item.genus === genus));
          setSpecies(uniqueSpecies);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching species:', error);
      });
  }, []);


  useEffect(() => {
    setFilteredSpecies(species.filter(species =>
      species.genus.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [species, searchTerm]);

  useEffect(() => {
    if (selected === null) {
      setSearchTerm('');
      onChange('')
    }
  }, [selected]);

  return (
    <div onClick={onClick}>
      <input
        type="text"
        placeholder="Search genus..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a genus</option>
        {filteredSpecies.map(species => (
          <option key={species.species_id} value={species.genus}>
            {species.genus}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenusDropdown;
