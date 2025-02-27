// import { MapContainer, TileLayer, useMap, Marker,Popup } from 'https://cdn.esm.sh/react-leaflet'
import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet'
function Map() {
  const position = [51.505, -0.09]
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
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
