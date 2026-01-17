import { Track } from "@/types/music";

// Jamendo API - Free music with full streaming
// Get your free API key at: https://developer.jamendo.com/
const JAMENDO_CLIENT_ID = "11619873";

interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  image: string;
  audio: string;
  audiodownload: string;
}

interface JamendoResponse {
  headers: {
    status: string;
    code: number;
    results_count: number;
  };
  results: JamendoTrack[];
}

export interface JamendoPlaylist {
  id: string;
  name: string;
  creationdate: string;
  user_id: string;
  user_name: string;
}

interface JamendoPlaylistResponse {
  headers: {
    status: string;
    code: number;
    results_count: number;
  };
  results: JamendoPlaylist[];
}

interface JamendoPlaylistTracksResponse {
  headers: {
    status: string;
    code: number;
    results_count: number;
  };
  results: Array<{
    id: string;
    name: string;
    tracks: JamendoTrack[];
  }>;
}

// Genre/tag mappings for user preferences
export const MUSIC_GENRES = [
  "pop", "rock", "electronic", "hiphop", "jazz", 
  "classical", "ambient", "indie", "metal", "folk",
  "blues", "reggae", "soul", "punk", "country"
] as const;

export type MusicGenre = typeof MUSIC_GENRES[number];

// Alias for components that need AVAILABLE_GENRES
export const AVAILABLE_GENRES = MUSIC_GENRES;

/**
 * Fetch tracks from Jamendo by genre/tag
 */
export async function fetchTracksByGenre(
  genre: MusicGenre,
  limit: number = 10
): Promise<Track[]> {
  const url = new URL("https://api.jamendo.com/v3.0/tracks");
  url.searchParams.set("client_id", JAMENDO_CLIENT_ID);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("tags", genre);
  url.searchParams.set("include", "musicinfo");
  url.searchParams.set("boost", "popularity_month");

  console.log(`Fetching tracks for genre: ${genre}, URL: ${url.toString()}`);

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error(`Jamendo API HTTP error: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data: JamendoResponse = await response.json();
    console.log(`Jamendo response for ${genre}:`, data.headers);
    
    if (data.headers.status !== "success") {
      console.error("Jamendo API error:", data.headers);
      return [];
    }

    console.log(`Found ${data.results.length} tracks for genre ${genre}`);
    return data.results.map(mapJamendoToTrack);
  } catch (error) {
    console.error("Failed to fetch from Jamendo:", error);
    return [];
  }
}

/**
 * Search tracks by query
 */
export async function searchTracks(query: string, limit: number = 10): Promise<Track[]> {
  const url = new URL("https://api.jamendo.com/v3.0/tracks");
  url.searchParams.set("client_id", JAMENDO_CLIENT_ID);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", query);
  url.searchParams.set("boost", "popularity_month");

  try {
    const response = await fetch(url.toString());
    const data: JamendoResponse = await response.json();
    
    if (data.headers.status !== "success") {
      console.error("Jamendo API error:", data.headers);
      return [];
    }

    return data.results.map(mapJamendoToTrack);
  } catch (error) {
    console.error("Failed to search Jamendo:", error);
    return [];
  }
}

/**
 * Fetch popular tracks
 */
export async function fetchPopularTracks(limit: number = 20): Promise<Track[]> {
  const url = new URL("https://api.jamendo.com/v3.0/tracks");
  url.searchParams.set("client_id", JAMENDO_CLIENT_ID);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("order", "popularity_month");

  try {
    const response = await fetch(url.toString());
    const data: JamendoResponse = await response.json();
    
    if (data.headers.status !== "success") {
      console.error("Jamendo API error:", data.headers);
      return [];
    }

    return data.results.map(mapJamendoToTrack);
  } catch (error) {
    console.error("Failed to fetch popular tracks:", error);
    return [];
  }
}

/**
 * Create a user playlist based on their preferred genres
 */
export async function createUserPlaylist(
  genres: MusicGenre[],
  tracksPerGenre: number = 3
): Promise<Track[]> {
  console.log(`Creating playlist for genres: ${genres.join(', ')}`);
  
  if (!genres || genres.length === 0) {
    console.warn("No genres provided, fetching popular tracks instead");
    return fetchPopularTracks(tracksPerGenre * 3);
  }
  
  const trackPromises = genres.map(genre => 
    fetchTracksByGenre(genre as MusicGenre, tracksPerGenre)
  );
  
  const results = await Promise.all(trackPromises);
  const allTracks = results.flat();
  
  console.log(`Total tracks fetched: ${allTracks.length}`);
  
  // If no tracks found for genres, try fetching popular tracks
  if (allTracks.length === 0) {
    console.warn("No tracks found for genres, fetching popular tracks");
    return fetchPopularTracks(tracksPerGenre * 3);
  }
  
  // Shuffle the tracks
  return shuffleArray(allTracks);
}

/**
 * Search for playlists by name
 */
export async function searchPlaylists(query: string, limit: number = 10): Promise<JamendoPlaylist[]> {
  const url = new URL("https://api.jamendo.com/v3.0/playlists");
  url.searchParams.set("client_id", JAMENDO_CLIENT_ID);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("namesearch", query);

  console.log(`Searching playlists: ${query}`);

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error(`Jamendo API HTTP error: ${response.status}`);
      return [];
    }
    
    const data: JamendoPlaylistResponse = await response.json();
    
    if (data.headers.status !== "success") {
      console.error("Jamendo API error:", data.headers);
      return [];
    }

    console.log(`Found ${data.results.length} playlists`);
    return data.results;
  } catch (error) {
    console.error("Failed to search playlists:", error);
    return [];
  }
}

/**
 * Fetch tracks from a specific playlist
 */
export async function fetchPlaylistTracks(playlistId: string): Promise<Track[]> {
  const url = new URL("https://api.jamendo.com/v3.0/playlists/tracks");
  url.searchParams.set("client_id", JAMENDO_CLIENT_ID);
  url.searchParams.set("format", "json");
  url.searchParams.set("id", playlistId);

  console.log(`Fetching playlist tracks for: ${playlistId}`);

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error(`Jamendo API HTTP error: ${response.status}`);
      return [];
    }
    
    const data: JamendoPlaylistTracksResponse = await response.json();
    
    if (data.headers.status !== "success") {
      console.error("Jamendo API error:", data.headers);
      return [];
    }

    if (data.results.length === 0 || !data.results[0].tracks) {
      console.warn("No tracks found in playlist");
      return [];
    }

    const tracks = data.results[0].tracks.map(mapJamendoToTrack);
    console.log(`Found ${tracks.length} tracks in playlist`);
    return tracks;
  } catch (error) {
    console.error("Failed to fetch playlist tracks:", error);
    return [];
  }
}

/**
 * Create a user playlist from selected Jamendo playlists
 */
export async function createPlaylistFromIds(playlistIds: string[]): Promise<Track[]> {
  console.log(`Creating playlist from IDs: ${playlistIds.join(', ')}`);
  
  if (!playlistIds || playlistIds.length === 0) {
    console.warn("No playlist IDs provided, fetching popular tracks");
    return fetchPopularTracks(10);
  }
  
  const trackPromises = playlistIds.map(id => fetchPlaylistTracks(id));
  const results = await Promise.all(trackPromises);
  const allTracks = results.flat();
  
  console.log(`Total tracks from playlists: ${allTracks.length}`);
  
  if (allTracks.length === 0) {
    console.warn("No tracks found, fetching popular tracks");
    return fetchPopularTracks(10);
  }
  
  return allTracks;
}

function mapJamendoToTrack(jamendoTrack: JamendoTrack): Track {
  return {
    id: jamendoTrack.id,
    title: jamendoTrack.name,
    artist: jamendoTrack.artist_name,
    album: jamendoTrack.album_name,
    duration: jamendoTrack.duration,
    coverUrl: jamendoTrack.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: jamendoTrack.audio,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
