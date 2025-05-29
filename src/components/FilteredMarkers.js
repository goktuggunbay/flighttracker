import { Marker } from "react-leaflet";
import L from "leaflet";
import "@/lib/leafletFix"; // Enables rotated marker support in Leaflet

// Custom airplane icon
const planeIcon = new L.Icon({
  iconUrl: "/icons/plane.png",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Renders all visible aircraft markers on the map
export default function FilteredMarkers({ planes, setSelectedPlane }) {
  return planes.map((plane) => (
    <Marker
      key={plane.id}
      position={[plane.lat, plane.lng]}
      icon={planeIcon}
      rotationAngle={plane.heading} // Rotates the icon to match heading direction
      rotationOrigin="center center"
      eventHandlers={{
        click: () => setSelectedPlane(plane), // On marker click, show popup with plane info
      }}
    />
  ));
}
