import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function EventMap({ latitude, longitude, title }) {
  // If no coordinates, don't render map
  if (!latitude || !longitude) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Location</h2>

      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
        className="rounded-2xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default EventMap;