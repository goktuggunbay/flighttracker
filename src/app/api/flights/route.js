import { getAccessToken } from '@/lib/getAccessToken';
import axios from 'axios';

let cacheData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 15 * 60 * 1000;

// Handles GET requests to /api/flights with bounding box parameters
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const lat1 = parseFloat(searchParams.get('lat1'));
  const lat2 = parseFloat(searchParams.get('lat2'));
  const lng1 = parseFloat(searchParams.get('lng1'));
  const lng2 = parseFloat(searchParams.get('lng2'));

  // If any bounding box coordinate is invalid, return empty response
  if ([lat1, lat2, lng1, lng2].some(isNaN)) {
    return new Response(JSON.stringify({ states: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const now = Date.now();

    // Use cached data if it's still fresh
    if (!cacheData || now - cacheTimestamp > CACHE_DURATION) {
      const token = await getAccessToken();

      const response = await axios.get('https://opensky-network.org/api/states/all', {
  params: {
    lamin: lat1,
    lamax: lat2,
    lomin: lng1,
    lomax: lng2,
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      cacheData = response.data;
      cacheTimestamp = now;
    }

    // Filter aircraft within bounding box and with valid data
    const filtered = cacheData.states
      .filter(
        (p) =>
          p[5] !== null && // longitude
          p[6] !== null && // latitude
          p[6] >= lat1 &&
          p[6] <= lat2 &&
          p[5] >= lng1 &&
          p[5] <= lng2
      )
      .map((p) => ({
        id: p[0], // ICAO24
        callsign: p[1]?.trim() || 'No Callsign',
        originCountry: p[2],
        lng: p[5],
        lat: p[6],
        velocity: p[9],
        heading: p[10],
        altitude: p[13],
      }));

    return new Response(JSON.stringify({ states: filtered }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'API error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
