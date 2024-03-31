import "./map.scss";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";

const Map = ({ items }) => {
  const position = [52.47, -1.9];

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((item) => (
        <Pin
          key={item.id}
          item={item}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
