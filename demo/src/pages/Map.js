import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
function Map() {
  const position = [44.566464,-123.283263]
  return (
      <MapContainer center={position} zoom={18} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} eventHandlers={{
            click: () => {
              alert('this is the class room')
            },
          }}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
          
        </Marker>
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
