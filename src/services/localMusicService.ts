import { Track } from "@/types/music";
import { 
  localPlaylists, 
  searchLocalPlaylists, 
  getPlaylistById, 
  getMergedPlaylistTracks,
  LocalPlaylist 
} from "@/data/bollywoodSongs";

// Search playlists
export const searchPlaylists = async (query: string): Promise<LocalPlaylist[]> => {
  // Simulate async behavior
  return Promise.resolve(searchLocalPlaylists(query));
};

// Fetch tracks from a playlist
export const fetchPlaylistTracks = async (playlistId: string): Promise<Track[]> => {
  const playlist = getPlaylistById(playlistId);
  return Promise.resolve(playlist?.tracks || []);
};

// Create merged playlist from selected playlist IDs
export const createPlaylistFromIds = async (playlistIds: string[]): Promise<Track[]> => {
  return Promise.resolve(getMergedPlaylistTracks(playlistIds));
};

// Get all available playlists
export const getAllPlaylists = (): LocalPlaylist[] => {
  return localPlaylists;
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
    // Return random playlist if no match
    return Promise.resolve(localPlaylists[0]?.tracks || []);
  }
  
  return createPlaylistFromIds(playlistIds);
};
