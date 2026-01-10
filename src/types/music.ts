export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl?: string; // Jamendo streaming URL
  priority?: number;
  commonCount?: number;
}

// User music preferences for playlist generation
export interface UserMusicPreferences {
  genres: string[];
  favoriteArtists?: string[];
}

export interface DetectedUser {
  id: string;
  name: string;
  avatar: string;
  playlist: Track[];
  detectedAt: Date;
  confidence: number;
}

export interface MergedPlaylist {
  tracks: Track[];
  users: DetectedUser[];
  createdAt: Date;
}
