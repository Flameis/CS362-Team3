import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PlantSidebar from '../components/PlantSidebar';

let plant_icon = L.icon({
  iconUrl: 'plant-pin.png',
  //todo make our own icon or make an attibution page (Also need a icon for user location)
  iconSize: [30, 41],
  iconAnchor: [15, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [14, 41]
});

let user_icon = L.icon({
  iconUrl: 'plant-pin.png',
  iconSize: [25, 25],
  iconAnchor: [12, 12]
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
  const [showPlacePlantButton, setShowPlacePlantButton] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetch('/api/plants')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setPlants(data.data);
          const plantMarkers = data.data.map(plant => [plant.x_coordinate, plant.y_coordinate]);
          setMarkers(plantMarkers);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      fetch('https://nominatim.openstreetmap.org/search?format=json&q=your+location')
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setUserLocation([data[0].lat, data[0].lon]);
          }
        })
        .catch(error => {
          console.error('Error fetching location from OpenStreetMap:', error);
        });
    }
  }, []);

  const addMarker = (coordinates) => {
    if (coordinates && coordinates.length === 2 && coordinates[0] !== undefined && coordinates[1] !== undefined) {
      if (markers.length > 0) {
        setMarkers([]);
      }
      setMarkers([coordinates]);
      setSelectedCoordinates(coordinates);
      setShowPlacePlantButton(true);
    } else {
      console.error('Invalid coordinates:', coordinates);
    }
  };

  const handleAddPlant = (coordinates, plantData) => {
    const { species_id, image_urls, description, location, season, avg_rating, date_added, x_coordinate, y_coordinate } = plantData;
    if (!species_id || !image_urls || !description || !location || !season || avg_rating === undefined || !date_added || x_coordinate === undefined || y_coordinate === undefined) {
      console.error('Missing required plant data:', plantData);
      alert('Please fill in all required fields before submitting.');
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

  const handlePlacePlant = () => {
    setSidebarOpen(true);
    setShowPlacePlantButton(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarStyle = {
    position: 'absolute',
    top: 0,
    right: sidebarOpen ? 0 : '-100%',
    width: '80%',
    maxWidth: '300px',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    transition: 'right 0.3s ease-in-out',
    zIndex: 1000,
    overflowY: 'auto',
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
      <MapContainer center={userLocation || start_position} zoom={start_zoom} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={max_tile_zoom}
          maxZoom={max_zoom}
        />
        {userLocation && (
          <Marker position={userLocation} icon={user_icon}>
            <Popup>
              You are here
            </Popup>
          </Marker>
        )}
        {plants.map((plant, idx) => (
          plant.x_coordinate !== undefined && plant.y_coordinate !== undefined ? (
            <Marker
              key={`plant-${idx}`}
              position={[plant.x_coordinate, plant.y_coordinate]}
              icon={plant_icon}
            >
              <Popup>
                <strong>{plant.common_name || 'Unknown'}</strong><br />
                Description: {plant.description || 'No description'}<br />
                Location: {plant.location || 'Unknown'}<br />
                Season: {plant.season || 'Unknown'}<br />
                Rating: {plant.avg_rating || 'No rating'}<br />
                Posted by: {plant.user || 'Anonymous'}
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
      {showPlacePlantButton && (
        <button
          onClick={handlePlacePlant}
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001,
          }}
        >
          Place Plant
        </button>
      )}
      <div style={sidebarStyle}>
        {sidebarOpen && (
          <PlantSidebar
            coordinates={selectedCoordinates}
            onAddPlant={handleAddPlant}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Map;
