import { MapContainer, TileLayer, Marker,Popup , useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
function Map() {
  const [markers, setMarkers] = useState([]);

  const addMarker = (coordinates) => {
    setMarkers([...markers, coordinates]);
  };

  let plant_icon = L.icon({
    iconUrl: 'plant-pin.png', //<a href="https://www.flaticon.com/free-icons/smart-farm" title="smart farm icons">Smart farm icons created by Vector Stall - Flaticon</a>
    //todo make our own icon or make an attibution page
    iconSize: [30, 41],
    // iconSize: [25, 34],
    iconAnchor: [15, 41], // Center the icon horizontally and adjust vertical anchor
    popupAnchor: [0, -41], // Center the popup anchor horizontally
    // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowUrl: 'marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [14, 41]
  })
  const position = [44.566464,-123.283263]
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  function ClickHandler({ addMarker }) {
    useMapEvents({
      click: (e) => {
        addMarker([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }
  return (
      <MapContainer center={position} zoom={19} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://tile.openstreetmap.org/19/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={20}
        />
        <Marker 
          position={position}>
          <Popup>
            this is the classroom
          </Popup>
        </Marker>

        <Marker
          position={[44.56660875784084,-123.28289061784747]}
          // position={position}
          eventHandlers={{
            click: () => {
              alert('you clicked on a plant (this can be coded to open the side bar)')
              },
          }}
          icon={plant_icon}
        />
        {/* <LocationMarker /> this gets your current when you click anywhere on the map, needs to be set to a button */}
        {markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position} icon={plant_icon}> 
          <Popup>
            {position[0]}<br/>{position[1]}
          </Popup>
          </Marker>
        ))}
        <ClickHandler addMarker={addMarker} />
      </MapContainer>
  );
}

// function Map() {
//   var map = L.map('map').setView([51.505, -0.09], 13);
//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//   }).addTo(map);
//   return (<div id="map"></div>)
// }

export default Map;
