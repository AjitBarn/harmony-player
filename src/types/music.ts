export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  priority?: number;
  commonCount?: number;
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
