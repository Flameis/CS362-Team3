import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PlantSidebar from '../components/PlantSidebar';
import { useNavigate } from 'react-router-dom';
import '../styles/general.css'; // Import the general CSS file

let plant_icon = L.icon({
  iconUrl: 'plant-pin.png', // <a href="https://www.flaticon.com/free-icons/smart-farm" title="smart farm icons">Smart farm icons created by Vector Stall - Flaticon</a>
  //todo make our own icon or make an attibution page (Also need a icon for user location)
  iconSize: [30, 41],
  iconAnchor: [15, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [14, 41]
});

let plant_icon_new = L.icon({
  iconUrl: 'plant-pin_new.png',
  //todo make our own icon or make an attibution page (Also need a icon for user location)
  iconSize: [30, 41],
  iconAnchor: [15, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [14, 41]
});

let user_icon = L.icon({
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
  // iconSize: [25, 25],
  // iconAnchor: [12, 12]
});

function Map() {
  const start_position = [44.566464, -123.283263];
  const start_zoom = 19;
  const max_tile_zoom = 19;
  const max_zoom = 30;

  // const [markers, setMarkerssetMarkers] = useState([]);
  const [tmpMarker, setTmpMarker] = useState(null);
  const [plants, setPlants] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarEditMode, setSidebarEditMode] = useState(false);
  const [showPlacePlantButton, setShowPlacePlantButton] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null); //type: [key:string,plant:Object ]
  const [popUpRefresher, setPopUpRefresher] = useState(0);
  const navigate = useNavigate();
  const plantSidebarRef = useRef();

  useEffect(() => {
    console.log('api-fetch')
    fetch('/api/plants')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setPlants(data.data);
          const plantMarkers = data.data.map(plant => [plant.x_coordinate, plant.y_coordinate]);
          // setMarkers(plantMarkers);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
      });

    let watchId;
    if (navigator.geolocation) {
      if (window.isSecureContext) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
            console.log(`Position accuracy: ${position.coords.accuracy} meters`);
          },
          (error) => {
            console.error('Error getting user location:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // Increase timeout to 10 seconds
            maximumAge: 0 // Do not use cached positions
          }
        );
      } else {
        console.error('Geolocation requires a secure context (HTTPS).');
      }
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

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const addMarker = (coordinates) => {
    if (coordinates && coordinates.length === 2 && coordinates[0] !== undefined && coordinates[1] !== undefined) {
      setTmpMarker({x_coordinate:coordinates[0], y_coordinate:coordinates[1]});
      setSidebarEditMode(false);
      setShowPlacePlantButton(true);
      setCurrentMarker({key:'tmp-marker',data:{x_coordinate:coordinates[0], y_coordinate:coordinates[1]}});
    } else {
      console.error('Invalid coordinates:', coordinates);
    }
  };

  const handleMarkerClick = (key) => {
    console.log('Current Marker Key:', key);
    if (key == "tmp-marker") {
      setCurrentMarker({key:key,data:tmpMarker});
    } else {
      setSidebarOpen(false);
      setShowPlacePlantButton(false);
      setTmpMarker(null);
      setCurrentMarker({key:key,data:plants[Number(key.match(/\d+/))]});
    }
  };

  function PopupOpenHandler() {
    const map = useMapEvents({
      popupopen: (e) => {
        // console.log('Popup opened', e);
        // setSidebarEditMode(true);
        // setSidebarOpen(true);
      }
    });
    return null;
  }
  const handleAddPlant = (plantData) => {
    const {species_id, image_urls, description, location, season, date_added, x_coordinate, y_coordinate } = plantData;
    const missingFields = [];
    const current_data = currentMarker.data;

    if (!species_id) missingFields.push('species_id');
    if (!sidebarEditMode) {if (!image_urls || image_urls.length === 0) missingFields.push('image_urls');} // warn: this is a temp fix to make edit work as image_urls are currently not saved to db
    if (!description) missingFields.push('description');
    if (!location) missingFields.push('location');
    if (!season) missingFields.push('season');
    if (!date_added) missingFields.push('date_added');
    if (x_coordinate === undefined) missingFields.push('x_coordinate');
    if (y_coordinate === undefined) missingFields.push('y_coordinate');

    if (missingFields.length > 0) {
      console.error('Missing required plant data:', missingFields.join(', '));
      alert(`Please fill in all required fields before submitting: ${missingFields.join(', ')}`);
      return;
    }
    if (sidebarEditMode) {
      fetch(`/api/plants/${current_data.plant_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantData)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => { throw new Error(error.message); });
          }
          return response.json();
        })
        .then(data => {
          fetch(`/api/plants/${current_data.plant_id}`)
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data.data)) {
              Object.assign(current_data,data.data[0]);
              setSidebarOpen(false);
              setShowPlacePlantButton(false);
              setPopUpRefresher(popUpRefresher+1);
            } else {
              throw new Error('Data format is incorrect');
            }
          })
          .catch(error => {
            console.error('Error fetching plants:', error);
          });
        })
        .catch(error => {
          console.error('Error adding plant:', error);
        });
      onCloseSidebar();
    } else {
      fetch('/api/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantData)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => { throw new Error(error.message); });
          }
          return response.json();
        })
        .then(data => {
          console.debug('add res: ',data)
          fetch(`/api/plants/${data.insertedId}`)
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data.data)) {
              setPlants([...plants, data.data[0]]);
              setTmpMarker(null);
              setSidebarOpen(false);
              setShowPlacePlantButton(false);
            } else {
              throw new Error('Data format is incorrect');
            }
          })
          .catch(error => {
            console.error('Error fetching plants:', error);
          });
          
        })
        .catch(error => {
          console.error('Error adding plant:', error);
        });
      onCloseSidebar();
    }
  };

  const handlePlacePlant = () => {
    setSidebarEditMode(false);
    setSidebarOpen(true);
    
    setShowPlacePlantButton(false);
  };
  useEffect(() => {
    if (sidebarOpen && sidebarEditMode && plantSidebarRef.current) {
      plantSidebarRef.current.populateForm(currentMarker.data);
    }
  }, [sidebarOpen]);
  const handleEditPlant = (key) => {
    console.debug(key)
    setSidebarEditMode(true);
    setSidebarOpen(true);
    // console.debug(plantSidebarRef)
    // plantSidebarRef.current.populateForm(currentMarker.data);
  }
  const handleDeletePlant = (plantKey) => {
    if (currentMarker.key != plantKey) {
      throw new Error('Delete Error: wrong plant selected');
    }
    fetch(`/api/plants/${currentMarker.data.plant_id}`,{method: 'DELETE', body: {user:{user_id:0,role:'admin'}}})
      .then(response => response.json())
      .then(data => {
        console.log("deleted:",data);
        // if (Array.isArray(data.data)) {
        //   setPlants([...plants, data.data[0]]);
        //   setTmpMarker(null);
        //   setSidebarOpen(false);
        //   setShowPlacePlantButton(false);
        // } else {
        //   throw new Error('Data format is incorrect');
        // }
        
        plants[Number(plantKey.match(/\d+/))] = null; // dont remove just clear or it could mess up the indexing
        setCurrentMarker(null);
        setSidebarOpen(false);
      })
      .catch(error => {
        console.error('Error deleting plant:', error);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // useEffect(() => {
  //   if (plants.length > 0) {
  //     console.log(plants)
  //   }
  // }) 

  const onCloseSidebar = () => {
    setSidebarOpen(false);
    setShowPlacePlantButton(true);
  };

  function ClickHandler({ addMarker }) {
    useMapEvents({
      click: (e) => {
        addMarker([e.latlng.lat, e.latlng.lng]);
        onCloseSidebar();
      },
    });
    return null;
  }

  return (
    <div>
      <MapContainer center={userLocation || start_position} zoom={start_zoom} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }} >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.flaticon.com/free-icon/location-pin_7360068" title="Smart farm icons created by Vector Stall - Flaticon">Plant Pin</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={max_tile_zoom}
          maxZoom={max_zoom}
        />
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              You are here
            </Popup>
          </Marker>
        )}
        {/* {markers.map((position, idx) => (
          position[0] !== undefined && position[1] !== undefined ? (
            <Marker
              key={`tmp-${idx}`}
              position={position}
              icon={plant_icon}
            >
              <Popup>
                new
              </Popup>
            </Marker>
          ) : null
        ))} */}
        { (tmpMarker && tmpMarker.x_coordinate) ? (
        <Marker
              refresher={popUpRefresher}
              key={`tmp-marker`}
              position={[tmpMarker.x_coordinate, tmpMarker.y_coordinate]}
              icon={plant_icon_new}
              eventHandlers={{
                click: () => handleMarkerClick(`tmp-marker`)
              }}
            >
              <Popup>
                <button onClick={handlePlacePlant}>Place Plant</button>
              </Popup>
        </Marker>) : null
        }
        
        
        {plants.map((plant, idx) => (
          plant !== null && plant.x_coordinate !== undefined && plant.y_coordinate !== undefined ? (
            <Marker 
              key={`plant-${idx}`}
              position={[plant.x_coordinate, plant.y_coordinate]}
              icon={plant_icon}
              eventHandlers={{
                click: () => handleMarkerClick(`plant-${idx}`)
              }}
            >
              <Popup
              key={`plant-${idx}`}
              >
                <strong>{plant.common_name || 'Unknown'}</strong><br />
                Description: {plant.description || 'No description'}<br />
                Location: {plant.location || 'Unknown'}<br />
                Season: {plant.season || 'Unknown'}<br />
                Rating: {plant.avg_rating || 'No rating'}<br />
                Posted by: {plant.user || 'Anonymous'}<br />
                <button onClick={(e) => handleEditPlant(`plant-${idx}`,e)}>Edit</button><button key={`plant-${idx}`} onClick={(e) => handleDeletePlant(`plant-${idx}`,e)}>Delete</button><br/><button onClick={(e) => navigate(`/plant/${currentMarker.data.plant_id}`)}>Comments</button>
              </Popup>
            </Marker>
          ) : null
        ))}
        <ClickHandler addMarker={addMarker} />
        <PopupOpenHandler />
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
            padding: '10px 20px',
            backgroundColor: '#7bb578',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Place Plant
        </button>
      )}
      {sidebarOpen && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <PlantSidebar
            ref={plantSidebarRef}
            currentMarker={currentMarker}
            onAddPlant={handleAddPlant}
            onClose={onCloseSidebar}
            isEditMode={sidebarEditMode}
          />
        </div>
      )}
    </div>
  );
}

export default Map;
