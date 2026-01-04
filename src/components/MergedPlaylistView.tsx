import { Track, DetectedUser } from "@/types/music";
import { formatDuration } from "@/utils/playlistMerger";
import { Play, Pause, Heart, MoreHorizontal, Users, Star, Shuffle, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";

interface MergedPlaylistViewProps {
  tracks: Track[];
  users: DetectedUser[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
}

export function MergedPlaylistView({
  tracks,
  users,
  currentTrack,
  isPlaying,
  onTrackSelect,
}: MergedPlaylistViewProps) {
  if (tracks.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <ListMusic className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Playlist Yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Start the camera and scan for faces to detect users and merge their playlists automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-primary/20 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg">
            <Shuffle className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-primary font-medium uppercase tracking-wide">Merged Playlist</p>
            <h2 className="text-2xl font-bold text-foreground mt-1">Group Session</h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {users.slice(0, 3).map((user) => (
                  <img
                    key={user.id}
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {users.map((u) => u.name).join(", ")} • {tracks.length} songs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="divide-y divide-border/50">
        {tracks.map((track, index) => {
          const isActive = currentTrack?.id === track.id;
          const isCommon = (track.commonCount || 0) > 1;

          return (
            <div
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className={cn(
                "flex items-center gap-4 px-6 py-3 cursor-pointer transition-all duration-200 group",
                isActive
                  ? "bg-primary/10"
                  : "hover:bg-secondary/50"
              )}
            >
              {/* Track Number / Play Button */}
              <div className="w-8 flex items-center justify-center">
                {isActive && isPlaying ? (
                  <div className="flex items-center gap-0.5">
                    <span className="w-1 h-4 bg-primary rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-primary rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-5 bg-primary rounded-full animate-pulse delay-150" />
                  </div>
                ) : (
                  <>
                    <span className="text-muted-foreground group-hover:hidden">
                      {index + 1}
                    </span>
                    <Play className="w-4 h-4 text-foreground hidden group-hover:block" />
                  </>
                )}
              </div>

              {/* Cover Art */}
              <img
                src={track.coverUrl}
                alt={track.album}
                className="w-12 h-12 rounded-lg object-cover shadow-md"
              />

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "font-medium truncate",
                    isActive ? "text-primary" : "text-foreground"
                  )}>
                    {track.title}
                  </p>
                  {isCommon && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full shrink-0">
                      <Star className="w-3 h-3" />
                      <span>{track.commonCount} users</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>

              {/* Album */}
              <p className="text-sm text-muted-foreground hidden md:block w-40 truncate">
                {track.album}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Duration */}
              <span className="text-sm text-muted-foreground w-12 text-right">
                {formatDuration(track.duration)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
