export default function TrackCard({ track, onPlay, isActive }) {
  return (
    <div
      onClick={() => onPlay(track)}
      className={`flex items-center gap-4 bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition cursor-pointer ${isActive ? 'ring-2 ring-emerald-400' : ''}`}
    >
      <img
        src={track.albumCover}
        alt={track.title}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-emerald-300">{track.title}</h3>
        <p className="text-sm text-slate-400">{track.artist}</p>
      </div>
      <div className="text-slate-400 text-sm">{/* placeholder for duration */}</div>
    </div>
  );
}
