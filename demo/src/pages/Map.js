import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

let plant_icon = L.icon({
  iconUrl: 'plant-pin.png',
  //todo make our own icon or make an attibution page
  iconSize: [30, 41],
  iconAnchor: [15, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [14, 41]
});

function Map() {
  const start_position = [44.566464, -123.283263];
  const start_zoom = 19;
  const max_tile_zoom = 19;
  const max_zoom = 20;

  const [markers, setMarkers] = useState([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get('/api/plants')
      .then(response => {
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error fetching plant data:', error);
      });
  }, []);

  const addMarker = (coordinates) => {
    setMarkers([...markers, coordinates]);
  };

  const handleAddPlant = (coordinates, plantData) => {
    axios.post('/api/plants', plantData)
      .then(response => {
        setPlants([...plants, response.data]);
        setMarkers(markers.filter(marker => marker !== coordinates));
      })
      .catch(error => {
        console.error('Error adding plant:', error);
      });
  };

  function ClickHandler({ addMarker }) {
    useMapEvents({
      click: (e) => {
        addMarker([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <MapContainer center={start_position} zoom={start_zoom} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={max_tile_zoom}
        maxZoom={max_zoom}
      />
      {plants.map((plant, idx) => (
        <Marker key={`plant-${idx}`} position={[plant.x_coordinate, plant.y_coordinate]} icon={plant_icon}>
          <Popup>
            <strong>{plant.description}</strong><br />
            Location: {plant.location}<br />
            Season: {plant.season}<br />
            Rating: {plant.avg_rating}
          </Popup>
        </Marker>
      ))}
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position} icon={plant_icon}>
          <Popup>
            <PlantForm coordinates={position} onAddPlant={handleAddPlant} />
          </Popup>
        </Marker>
      ))}
      <ClickHandler addMarker={addMarker} />
    </MapContainer>
  );
}

function PlantForm({ coordinates, onAddPlant }) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('');
  const [avg_rating, setAvgRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const plantData = {
      description,
      location,
      season,
      avg_rating,
      date_added: new Date().toISOString().split('T')[0],
      x_coordinate: coordinates[0],
      y_coordinate: coordinates[1]
    };
    onAddPlant(coordinates, plantData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></label><br />
      <label>Location: <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></label><br />
      <label>Season: <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} /></label><br />
      <label>Rating: <input type="number" value={avg_rating} onChange={(e) => setAvgRating(e.target.value)} /></label><br />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default Map;
