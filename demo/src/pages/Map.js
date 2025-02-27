import { MapContainer, TileLayer, Marker,Popup , useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let plant_icon = L.icon({
  iconUrl: 'plant-pin.png', //<a href="https://www.flaticon.com/free-icons/smart-farm" title="smart farm icons">Smart farm icons created by Vector Stall - Flaticon</a>
  //todo make our own icon or make an attibution page
  iconSize: [30, 41],
  iconAnchor: [15, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [14, 41]
})

function Map() {
  const start_position = [44.566464,-123.283263] // location of the classroom and the starting center of the map
  const start_zoom = 19 // starting zoom lvl
  const max_tile_zoom = 19 // 19 is the max lvl that opensteetmaps supports
  const max_zoom = 20 // can over-zoom it just get pixelated

  const [markers, setMarkers] = useState([]);

  const addMarker = (coordinates) => {
    setMarkers([...markers, coordinates]);
  };

  function ClickHandler({ addMarker }) {
    // handles clicks on the map itself, currently adds pins
    useMapEvents({
      click: (e) => {
        addMarker([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
      <MapContainer center={start_position} zoom={start_zoom} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }} 
    //   maxBounds={[ // can use this to keep it on campus
    //     [44.572983170703004,-123.31099748611452],
    //     [44.5572675290618, -123.26951980590822]
    // ]}
    >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={max_tile_zoom} // 19 is the max lvl that opensteetmaps supports
          maxZoom={max_zoom} // can over-zoom it just get pixelated
        />
        <Marker // example use of the default pin
          position={start_position}>
          <Popup>
            this is the classroom
          </Popup>
        </Marker>

        <Marker // example plant marker that shows off that we can add click events
          position={[44.56660875784084,-123.28289061784747]}
          eventHandlers={{
            click: () => {
              alert('you clicked on a plant\n(this can be coded to open the side bar)')
              },
          }}
          icon={plant_icon}
        />

        {/* <LocationMarker /> this gets your current location when you click anywhere on the map, needs to be set to a button */}
        
        
        {markers.map((position, idx) => ( // handles drawing the added pins
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


function LocationMarker() {
  // a function that puts a pin at your current location
  // status: not in use right now
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

export default Map;
