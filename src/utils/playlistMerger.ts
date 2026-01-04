import { Track, DetectedUser, MergedPlaylist } from "@/types/music";

export function mergePlaylistsWithPriority(users: DetectedUser[]): MergedPlaylist {
  const trackCountMap = new Map<string, { track: Track; count: number; users: string[] }>();

  // Count occurrences of each track across all users
  users.forEach((user) => {
    user.playlist.forEach((track) => {
      const existing = trackCountMap.get(track.id);
      if (existing) {
        existing.count++;
        existing.users.push(user.name);
      } else {
        trackCountMap.set(track.id, {
          track: { ...track },
          count: 1,
          users: [user.name],
        });
      }
    });
  });

  // Convert to array and sort by count (common songs first)
  const sortedTracks = Array.from(trackCountMap.values())
    .sort((a, b) => b.count - a.count)
    .map(({ track, count }) => ({
      ...track,
      commonCount: count,
      priority: count / users.length,
    }));

  return {
    tracks: sortedTracks,
    users,
    createdAt: new Date(),
  };
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
