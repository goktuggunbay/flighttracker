"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import usePlanes from "@/hooks/usePlanes";
import FilteredMarkers from "./FilteredMarkers";
import PlanePopup from "./PlanePopup";
import MapLoading from "./MapLoading";
import MapStatus from "./MapStatus";
import SearchBar from "./SearchBar";

// Responsible for animating the map to the selected plane's location
function MapFlyTo({ target }) {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 7, { duration: 1.5 }); // Smooth zoom & pan
    }
  }, [target]);

  return null;
}

// Main map component that renders Leaflet map with dynamic plane data and UI controls
export default function Map() {
  const { planes, loading, lastUpdated } = usePlanes();
  const [selectedPlane, setSelectedPlane] = useState(null); // Currently selected plane

  return (
    <div className="relative w-full h-full">
      {loading && <MapLoading />}{" "}
      {/* Show loading overlay until data is fetched */}
      <MapContainer
        center={[39.93, 32.85]} // Default center: Ankara
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {!loading && (
          <>
            <FilteredMarkers
              planes={planes}
              setSelectedPlane={setSelectedPlane} // Handles marker click
            />
            <MapFlyTo target={selectedPlane} />
          </>
        )}
      </MapContainer>
      {!loading && (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 items-end">
          {/* Status & Search bar displayed on top of the map */}
          <MapStatus lastUpdated={lastUpdated} />
          <SearchBar planes={planes} onSelect={setSelectedPlane} />
        </div>
      )}
      {/* Plane details popup card */}
      <PlanePopup
        plane={selectedPlane}
        onClose={() => setSelectedPlane(null)}
      />
    </div>
  );
}
