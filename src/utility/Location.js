import { GOOGLE_API_KEY } from './GOOGLE-API-KEY';

export async function getCoordinates(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates. Please, try again.');
  }

  /**
   * @type {{
   *  error_message?: string,
   *  results: {geometry: {location}}[]
   * }}
   */
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  return data.results[0].geometry.location;
}

export async function getAddress(coords) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat}, ${coords.lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch the address. Please, try again.');
  }

  /**
   * @type {{
   *  error_message?: string,
   *  results: {formatted_address: any}[]
   * }}
   */
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  return data.results[0].formatted_address;
}
