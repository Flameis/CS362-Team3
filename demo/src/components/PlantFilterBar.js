import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import '../styles/general.css'; // Import the general CSS file
import './PlantFilterBar.css'; // Import the PlantSidebar CSS file
import CommonNameDropdown from './CommonNameDropdown';
import SpeciesDropdown from './SpeciesDropdown2';
import GenusDropdown from './GenusDropdown';

const PlantFilterBar = ({ filter, setFilter, onClose }) => {

  const [species, setSpecies] = useState('');
  const [genus, setGenus] = useState('');
  const [common_name, setCommonName] = useState('');

  useEffect(() => {
    handleSubmit();
  }, [species, genus, common_name]);

  const handleSubmit = () => {
    console.log(genus,species,common_name)
    let filter_data = {};
    if (genus) filter_data.genus = genus;
    if (species) filter_data.species = species;
    if (common_name) filter_data.common_name = common_name;
    setFilter(filter_data)
  };

  return (
    <div className="bottom-bar">
      <button onClick={onClose}>Close</button>
      <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
        <GenusDropdown selected={genus} onChange={setGenus} /><button onClick={()=>setGenus(null)}>clear</button>
        <SpeciesDropdown selected={species} onChange={setSpecies} /><button onClick={()=>setSpecies(null)}>clear</button>
        <CommonNameDropdown selected={common_name} onChange={setCommonName} /><button onClick={()=>setCommonName(null)}>clear</button>
        <button onClick={()=>{setGenus(null);setSpecies(null);setCommonName(null)}}>Clear All</button>
        {/* <button type="submit">Apply Filter</button> */}
      </form>
    </div>
  );
};

export default PlantFilterBar;
