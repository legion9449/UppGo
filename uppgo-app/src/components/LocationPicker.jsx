import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents
} from "react-leaflet";

// ================= SEARCH BOX =================
function SearchBox({ setPosition }) {

  const [query, setQuery] = useState("");
  const map = useMap();

  const handleSearch = async () => {

    if (!query) return;

    try {

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );

      const data = await res.json();

      if (data && data.length > 0) {

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        map.setView([lat, lon], 15);

        setPosition({ lat, lng: lon });
      }

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="absolute top-3 left-3 z-[1000] bg-white p-2 rounded shadow flex gap-2">

      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        
        // 🔥 FIX ENTER KEY
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}

        className="border px-2 py-1 rounded text-sm"
      />

      <button
        type="button" // 🔥 IMPORTANT FIX (NO FORM SUBMIT)
        onClick={handleSearch}
        className="bg-black text-white px-3 rounded text-sm"
      >
        Go
      </button>

    </div>
  );
}

// ================= MAP CLICK =================
function LocationMarker({ position, setPosition, onSelect }) {

  useMapEvents({
    click(e) {

      const pos = e.latlng;

      setPosition(pos);

      onSelect({
        latitude: pos.lat,
        longitude: pos.lng
      });
    }
  });

  return position ? <Marker position={position} /> : null;
}

// ================= MAIN =================
function LocationPicker({ onSelect }) {

  const [position, setPosition] = useState(null);

  return (

    <div className="relative w-full h-[350px] rounded-xl overflow-hidden">

      <MapContainer
        center={[59.8586, 17.6389]}
        zoom={13}
        className="w-full h-full"
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SearchBox setPosition={setPosition} />

        <LocationMarker
          position={position}
          setPosition={setPosition}
          onSelect={onSelect}
        />

      </MapContainer>

    </div>

  );
}

export default LocationPicker;