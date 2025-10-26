// src/api/deezer.js
// Fetch Deezer search results via a free CORS proxy (allorigins.win).
// Returns an array of tracks formatted for the app.

export async function searchTracks(query) {
  if (!query) return [];

  const target = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;

  try {
    const res = await fetch(proxy);
    if (!res.ok) {
      console.error('Proxy fetch failed', res.status, res.statusText);
      return [];
    }
    const data = await res.json();

    if (!data || !data.data) return [];

    return data.data.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist?.name || 'Unknown',
      albumCover: track.album?.cover_medium || '',
      preview: track.preview || ''
    }));
  } catch (err) {
    console.error('Deezer proxy error', err);
    return [];
  }
}
