import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';

export default function MusicPlayer({ tracks, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTrack && currentTrack.preview) {
      audioRef.current.src = currentTrack.preview;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleNext() {
    if (!currentTrack) return;
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const nextTrack = tracks[(idx + 1) % tracks.length];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  }

  function handlePrev() {
    if (!currentTrack) return;
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const prevTrack = tracks[(idx - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  }

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function onTimeUpdate() {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setDuration(dur);
    setProgress(dur ? (current / dur) * 100 : 0);
  }

  return (
    <div className="w-full bg-black/40 backdrop-blur-xl border-t border-purple-500/20 p-4 shadow-2xl shadow-purple-800/40">
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} />
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          {currentTrack ? (
            <>
              <img src={currentTrack.albumCover} alt="" className="w-16 h-16 rounded-md shadow-lg shadow-purple-500/40" />
              <div>
                <div className="text-purple-200 font-semibold">{currentTrack.title}</div>
                <div className="text-purple-400 text-sm">{currentTrack.artist}</div>
              </div>
            </>
          ) : (
            <span className="text-purple-400 opacity-50">No track selected</span>
          )}
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="flex items-center gap-6 mb-2">
            <button onClick={handlePrev} className="text-purple-300 hover:text-white transition">
              <FaBackward />
            </button>
            <button
              onClick={handleTogglePlay}
              className="p-3 bg-purple-500 hover:bg-purple-400 text-white rounded-full shadow-lg shadow-purple-500/30 transition"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleNext} className="text-purple-300 hover:text-white transition">
              <FaForward />
            </button>
          </div>

          <div className="w-full h-2 bg-purple-900 rounded-lg cursor-pointer">
            <div className="h-full bg-purple-400 rounded-lg" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex justify-between w-full text-purple-400 text-xs mt-2">
            <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaVolumeUp className="text-purple-300" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-32 accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
