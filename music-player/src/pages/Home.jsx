// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import TrackList from '../components/TrackList';
import MusicPlayer from '../components/MusicPlayer';
import { mockTracks } from '../data/mockTracks';

export default function Home() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState(mockTracks);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // local filter for search (mock mode)
  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!currentTrack && tracks.length) setCurrentTrack(tracks[0]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-950 to-black text-white flex flex-col">
      <div className="container mx-auto p-4 flex-1 backdrop-blur-lg bg-white/5 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-4xl font-extrabold text-purple-300 drop-shadow-lg mb-6 text-center">🎧 Lofi Player</h1>

        <SearchBar query={query} setQuery={setQuery} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl text-purple-200 mb-3 font-semibold">Playlist</h2>
            <TrackList
              tracks={filtered}
              onPlay={(track) => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              currentTrack={currentTrack}
            />
          </div>

          <div className="md:col-span-1">
            <h2 className="text-xl text-purple-200 mb-3 font-semibold">Now Playing</h2>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-md border border-purple-500/20">
              {currentTrack ? (
                <>
                  <img src={currentTrack.albumCover} alt="" className="w-full rounded-lg mb-4 object-cover shadow-lg shadow-purple-500/20" />
                  <h3 className="text-xl font-bold text-purple-300">{currentTrack.title}</h3>
                  <p className="text-sm text-purple-100">{currentTrack.artist}</p>
                </>
              ) : (
                <p className="text-purple-300 opacity-70">Select a track to start listening</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <MusicPlayer
        tracks={tracks}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}
