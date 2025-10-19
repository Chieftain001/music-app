import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';

export default function MusicPlayer({ tracks, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0-100
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  // load and autoplay when currentTrack changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTrack && currentTrack.preview) {
      audioRef.current.src = currentTrack.preview;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      audioRef.current.src = '';
      setProgress(0);
    }
  }, [currentTrack]);

  // play/pause effect
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function onTimeUpdate() {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setDuration(dur);
    setProgress(dur ? (current / dur) * 100 : 0);
  }

  function onEnded() {
    handleNext();
  }

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handlePrev() {
    if (!currentTrack) return;
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prev);
    setIsPlaying(true);
  }

  function handleNext() {
    if (!currentTrack) return;
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const next = tracks[(idx + 1) % tracks.length];
    setCurrentTrack(next);
    setIsPlaying(true);
  }

  function handleSeek(e) {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    audioRef.current.currentTime = pct * duration;
    setProgress(pct * 100);
  }

  return (
    <div className="w-full bg-slate-800 border-t border-slate-700 p-4">
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          {currentTrack ? (
            <>
              <img src={currentTrack.albumCover} alt="" className="w-16 h-16 rounded-md object-cover" />
              <div>
                <div className="text-emerald-300 font-semibold">{currentTrack.title}</div>
                <div className="text-slate-400 text-sm">{currentTrack.artist}</div>
              </div>
            </>
          ) : (
            <div className="text-slate-400">No track selected</div>
          )}
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="flex items-center gap-6 mb-2">
            <button onClick={handlePrev} className="p-2 text-slate-200 hover:text-emerald-300">
              <FaBackward />
            </button>
            <button onClick={handleTogglePlay} className="p-3 bg-emerald-300 text-slate-900 rounded-full">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleNext} className="p-2 text-slate-200 hover:text-emerald-300">
              <FaForward />
            </button>
          </div>

          <div
            onClick={handleSeek}
            className="w-full h-2 bg-slate-700 rounded-md cursor-pointer relative"
            title="Click to seek"
          >
            <div className="absolute left-0 top-0 bottom-0 bg-emerald-300 rounded-md" style={{ width: `${progress}%` }} />
          </div>

          <div className="w-full flex justify-between text-xs text-slate-400 mt-1">
            <div>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</div>
            <div>{formatTime(duration)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-48 justify-end">
          <FaVolumeUp className="text-slate-300" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
