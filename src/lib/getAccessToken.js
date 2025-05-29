import axios from 'axios';

/**
 * Fetches an access token from the OpenSky OAuth2 endpoint using client credentials.
 * 
 * Uses the `client_credentials` grant type to authenticate the application,
 * not the user. This is typically used for machine-to-machine communication.
 * 
 * @returns {Promise<string>} Access token string
 * @throws {Error} Throws error if token cannot be fetched
 */
export async function getAccessToken() {
  const clientId = process.env.OPENSKY_CLIENT_ID;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET;

  // Prepare request payload in URL-encoded format
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post(
      'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Return only the access token
    return response.data.access_token;
  } catch (error) {
    console.error('Token alma hatası:', error.response?.data || error.message);
    throw new Error('Access token alınamadı');
  }
}
