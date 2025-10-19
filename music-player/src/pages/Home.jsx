import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import TrackList from '../components/TrackList';
import MusicPlayer from '../components/MusicPlayer';

const mockTracks = [
  {
    id: 1,
    title: 'Lofi Study 1',
    artist: 'Chillhop',
    albumCover: 'https://via.placeholder.com/150/9CA3AF/000000?text=Lofi+1',
    preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'Late Night Vibes',
    artist: 'Lofi Girl',
    albumCover: 'https://via.placeholder.com/150/94A3B8/000000?text=Lofi+2',
    preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    title: 'Soft Beats',
    artist: 'Lofigang',
    albumCover: 'https://via.placeholder.com/150/C7D2FE/000000?text=Lofi+3',
    preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState(mockTracks);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // optional: filter UI only (no API yet)
  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase())
  );

  // auto-select first track on load
  useEffect(() => {
    if (!currentTrack && tracks.length) setCurrentTrack(tracks[0]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-3xl font-bold text-emerald-300 mb-4">🎧 Lofi Music Player</h1>

        <SearchBar query={query} setQuery={setQuery} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl text-slate-200 mb-3">Playlist</h2>
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
            <h2 className="text-xl text-slate-200 mb-3">Now Playing</h2>
            <div className="bg-slate-800 p-4 rounded-lg">
              {currentTrack ? (
                <>
                  <img src={currentTrack.albumCover} alt="" className="w-full rounded-md mb-3 object-cover" />
                  <h3 className="text-lg font-semibold text-emerald-300">{currentTrack.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{currentTrack.artist}</p>
                  <p className="text-xs text-slate-500">Preview clips are 30s / sample audio for demo</p>
                </>
              ) : (
                <p className="text-slate-400">Select a track to start listening</p>
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
