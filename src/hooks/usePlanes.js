import { useEffect, useState, useRef } from "react";
import axios from "axios";

// Custom React hook that handles fetching and caching plane data
export default function usePlanes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetches all global aircraft data from the API
  const fetchPlanes = async () => {
    try {
      const bounds = {
        lat1: -90,
        lat2: 90,
        lng1: -180,
        lng2: 180,
      };

      const res = await axios.get("/api/flights", { params: bounds });
      setPlanes(res.data.states); // Save fetched plane data
      setLastUpdated(new Date().toLocaleTimeString()); // Timestamp of last update
    } catch (err) {
      console.error("Plane fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanes(); // Initial fetch on mount

    // Set up interval to refresh data every 15 minutes (only if tab is visible)
    intervalRef.current = setInterval(() => {
  if (document.visibilityState === "visible") {
    fetchPlanes();
  }
}, 15 * 60 * 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  return { planes, loading, lastUpdated };
}
