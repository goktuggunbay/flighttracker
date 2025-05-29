import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

// Displays a popup card with detailed information about a selected aircraft.
export default function PlanePopup({ plane, onClose }) {
  if (!plane) return null; // No plane selected — do not render

  return (
    <div className="fixed bottom-4 right-4 z-[1000] w-[320px]">
      <Card className="shadow-xl border border-gray-200">
        <CardHeader className="flex justify-between items-start pb-2">
          <div>
            <CardTitle className="text-lg font-bold">
              {plane.callsign || "Unknown Flight"}
            </CardTitle>
            {/* Displays country of origin */}
            <CardDescription className="text-xs text-gray-500">
              {plane.originCountry}
            </CardDescription>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-red-500 hover:underline"
          >
            Close
          </button>
        </CardHeader>

        <CardContent className="text-sm text-gray-800 space-y-2">
          {/* Plane location (lat/lng) */}
          <div>
            <span className="font-medium">Location:</span>{" "}
            {plane.lat.toFixed(2)}, {plane.lng.toFixed(2)}
          </div>

          {/* Altitude in meters */}
          <div>
            <span className="font-medium">Altitude:</span>{" "}
            {plane.altitude ? `${plane.altitude.toFixed(0)} m` : "Unknown"}
          </div>

          {/* Speed converted from m/s to km/h */}
          <div>
            <span className="font-medium">Speed:</span>{" "}
            {plane.velocity
              ? `${(plane.velocity * 3.6).toFixed(0)} km/h`
              : "Unknown"}
          </div>

          {/* Heading in degrees */}
          <div>
            <span className="font-medium">Heading:</span>{" "}
            {plane.heading !== null ? `${plane.heading}°` : "Unknown"}
          </div>

          {/* Unique aircraft ID (ICAO24 address) */}
          <div>
            <span className="font-medium">Aircraft ID (ICAO24):</span>{" "}
            {plane.id}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
