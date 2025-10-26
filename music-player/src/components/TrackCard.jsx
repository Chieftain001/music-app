export default function TrackCard({ track, onPlay, isActive }) {
  return (
    <div
      onClick={() => onPlay(track)}
      className={`flex items-center gap-4 p-3 rounded-lg transition cursor-pointer 
        ${isActive 
          ? 'bg-purple-800/40 ring-2 ring-purple-400 animate-pulse shadow-lg shadow-purple-500/30 backdrop-blur-lg' 
          : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm'}`
      }
    >
      <img
        src={track.albumCover}
        alt={track.title}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0 shadow-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-purple-200">{track.title}</h3>
        <p className="text-sm text-purple-400">{track.artist}</p>
      </div>
    </div>
  );
}
