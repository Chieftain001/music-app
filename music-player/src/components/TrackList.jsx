import TrackCard from './TrackCard';

export default function TrackList({ tracks, onPlay, currentTrack }) {
  if (!tracks || tracks.length === 0) {
    return <p className="text-slate-400">No tracks found.</p>;
  }

  return (
    <div className="space-y-3">
      {tracks.map(track => (
        <TrackCard
          key={track.id}
          track={track}
          onPlay={onPlay}
          isActive={currentTrack && currentTrack.id === track.id}
        />
      ))}
    </div>
  );
}
