import { Track } from "@/types/music";
import { 
  localPlaylists, 
  searchLocalPlaylists, 
  getPlaylistById, 
  getMergedPlaylistTracks,
  getAllTracks,
  LocalPlaylist 
} from "@/data/bollywoodSongs";

// Re-export for external use
export { localPlaylists };
export type { LocalPlaylist };

// Search playlists
export const searchPlaylists = async (query: string): Promise<LocalPlaylist[]> => {
  return Promise.resolve(searchLocalPlaylists(query));
};

// Fetch tracks from a playlist
export const fetchPlaylistTracks = async (playlistId: string): Promise<Track[]> => {
  const playlist = getPlaylistById(playlistId);
  return Promise.resolve(playlist?.tracks || []);
};

// Create merged playlist from selected playlist IDs
export const createPlaylistFromIds = async (playlistIds: string[]): Promise<Track[]> => {
  const tracks = getMergedPlaylistTracks(playlistIds);
  // Always return at least some tracks
  if (tracks.length === 0) {
    return Promise.resolve(getAllTracks().slice(0, 10));
  }
  return Promise.resolve(tracks);
};

// Get all available playlists
export const getAllPlaylists = (): LocalPlaylist[] => {
  return localPlaylists;
};

// Get all tracks without categorization
export const getAllSongs = (): Track[] => {
  return getAllTracks();
};

// Legacy genre-based playlist creation (fallback)
export const createUserPlaylist = async (genres: string[]): Promise<Track[]> => {
  // Map genres to playlist IDs
  const genreToPlaylist: Record<string, string> = {
    "romantic": "pl-romantic",
    "party": "pl-party",
    "dance": "pl-party",
    "sad": "pl-sad",
    "retro": "pl-retro",
    "classic": "pl-retro",
    "punjabi": "pl-punjabi",
    "folk": "pl-punjabi",
    "sufi": "pl-sufi",
    "soulful": "pl-sufi",
    "motivational": "pl-motivational",
    "workout": "pl-motivational"
  };
  
  const playlistIds = genres
    .map(g => genreToPlaylist[g.toLowerCase()])
    .filter(Boolean);
  
  if (playlistIds.length === 0) {
    // Return all tracks if no genre match
    return Promise.resolve(getAllTracks());
  }
  
  return createPlaylistFromIds(playlistIds);
};
