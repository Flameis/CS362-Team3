import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PlantSidebar from '../components/PlantSidebar';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    fetch('/api/plants')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setPlants(data.data);
        } else {
          console.error('API response data is not an array:', data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching plant data:', error);
      });
  }, []);

  const addMarker = (coordinates) => {
    if (coordinates && coordinates.length === 2 && coordinates[0] !== undefined && coordinates[1] !== undefined) {
      setMarkers([...markers, coordinates]);
      setSelectedCoordinates(coordinates);
      setSidebarOpen(true);
    } else {
      console.error('Invalid coordinates:', coordinates);
    }
  };

  const handleAddPlant = (coordinates, plantData) => {
    // Ensure all required fields are provided
    const { species_id, image_id, description, location, season, avg_rating, date_added, x_coordinate, y_coordinate } = plantData;
    if (!species_id || !image_id || !description || !location || !season || avg_rating === undefined || !date_added || x_coordinate === undefined || y_coordinate === undefined) {
      console.error('Missing required plant data:', plantData);
      return;
    }

    fetch('/api/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plantData)
    })
      .then(response => response.json())
      .then(data => {
        setPlants([...plants, data]);
        setMarkers(markers.filter(marker => marker !== coordinates));
        setSidebarOpen(false);
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
    <div>
      <MapContainer center={start_position} zoom={start_zoom} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={max_tile_zoom}
          maxZoom={max_zoom}
        />
        {plants.map((plant, idx) => (
          plant.x_coordinate !== undefined && plant.y_coordinate !== undefined ? (
            <Marker
              key={`plant-${idx}`}
              position={[plant.x_coordinate, plant.y_coordinate]}
              icon={plant_icon}
            >
              <Popup>
                <strong>{plant.description}</strong><br />
                Location: {plant.location}<br />
                Season: {plant.season}<br />
                Rating: {plant.avg_rating}
              </Popup>
            </Marker>
          ) : null
        ))}
        {markers.map((position, idx) => (
          position[0] !== undefined && position[1] !== undefined ? (
            <Marker
              key={`marker-${idx}`}
              position={position}
              icon={plant_icon}
            >
              <Popup>
                {/* Remove PlantForm reference */}
              </Popup>
            </Marker>
          ) : null
        ))}
        <ClickHandler addMarker={addMarker} />
      </MapContainer>
      {sidebarOpen && (
        <PlantSidebar
          coordinates={selectedCoordinates}
          onAddPlant={handleAddPlant}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Map;
