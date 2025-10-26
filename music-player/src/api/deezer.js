import axios from 'axios';

const API_BASE = 'https://api.deezer.com/search?q=';

export async function searchTracks(query) {
  try {
    const response = await axios.get(`${API_BASE}${query}`);
    return response.data.data; // Returns an array of tracks
  } catch (error) {
    console.error('Error fetching data from Deezer:', error);
    return [];
  }
}
