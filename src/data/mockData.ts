import { Track, DetectedUser } from "@/types/music";
import { createUserPlaylist, MusicGenre } from "@/services/jamendoApi";

// User profiles with their genre preferences (simulates user database)
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  preferredGenres: MusicGenre[];
}

// Predefined user profiles with different tastes
export const userProfiles: UserProfile[] = [
  {
    id: "user1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    preferredGenres: ["electronic", "pop", "indie"],
  },
  {
    id: "user2",
    name: "Sarah Miller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    preferredGenres: ["jazz", "soul", "blues"],
  },
  {
    id: "user3",
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    preferredGenres: ["rock", "metal", "punk"],
  },
  {
    id: "user4",
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    preferredGenres: ["pop", "hiphop", "electronic"],
  },
  {
    id: "user5",
    name: "Chris Taylor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    preferredGenres: ["ambient", "classical", "folk"],
  },
];

/**
 * Generate a DetectedUser with a real Jamendo playlist based on their preferences
 */
export async function generateDetectedUser(
  profile: UserProfile,
  confidence: number = 0.9
): Promise<DetectedUser> {
  const playlist = await createUserPlaylist(profile.preferredGenres, 3);
  
  return {
    id: profile.id,
    name: profile.name,
    avatar: profile.avatar,
    playlist,
    detectedAt: new Date(),
    confidence,
  };
}

/**
 * Simulate face detection by generating users with real playlists
 */
export async function simulateFaceDetection(
  count: number = 3
): Promise<DetectedUser[]> {
  // Pick random users
  const shuffled = [...userProfiles].sort(() => Math.random() - 0.5);
  const selectedProfiles = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // Generate users with real playlists in parallel
  const userPromises = selectedProfiles.map((profile, index) => 
    generateDetectedUser(profile, 0.85 + Math.random() * 0.1)
  );
  
  return Promise.all(userPromises);
}

// Keep mock data for fallback/testing
export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
  },
];

export const mockUsers: DetectedUser[] = [
  {
    id: "user1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    playlist: mockTracks,
    detectedAt: new Date(),
    confidence: 0.94,
  },
];
