import { Track } from "@/types/music";

export interface LocalPlaylist {
  id: string;
  name: string;
  tracks: Track[];
}

// Bollywood songs collection
const bollywoodTracks: Track[] = [
  // Romantic Songs
  { id: "b1", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", duration: 262, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b2", title: "Kal Ho Naa Ho", artist: "Sonu Nigam", album: "Kal Ho Naa Ho", duration: 319, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b3", title: "Tere Bina", artist: "A.R. Rahman", album: "Guru", duration: 295, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b4", title: "Channa Mereya", artist: "Arijit Singh", album: "Ae Dil Hai Mushkil", duration: 289, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b5", title: "Kabira", artist: "Arijit Singh & Harshdeep Kaur", album: "Yeh Jawaani Hai Deewani", duration: 234, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b6", title: "Gerua", artist: "Arijit Singh & Antara Mitra", album: "Dilwale", duration: 286, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b7", title: "Raabta", artist: "Arijit Singh", album: "Agent Vinod", duration: 245, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b8", title: "Tujhe Dekha To", artist: "Kumar Sanu & Lata Mangeshkar", album: "DDLJ", duration: 312, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  
  // Party/Dance Songs
  { id: "b9", title: "Badtameez Dil", artist: "Benny Dayal", album: "Yeh Jawaani Hai Deewani", duration: 243, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b10", title: "London Thumakda", artist: "Labh Janjua & Sonu Kakkar", album: "Queen", duration: 217, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b11", title: "Gallan Goodiyaan", artist: "Various Artists", album: "Dil Dhadakne Do", duration: 274, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b12", title: "Kar Gayi Chull", artist: "Badshah & Neha Kakkar", album: "Kapoor & Sons", duration: 198, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b13", title: "Balam Pichkari", artist: "Vishal Dadlani & Shalmali", album: "Yeh Jawaani Hai Deewani", duration: 267, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b14", title: "Nachde Ne Saare", artist: "Jasleen Royal", album: "Baar Baar Dekho", duration: 223, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b15", title: "Desi Girl", artist: "Sunidhi Chauhan & Shankar Mahadevan", album: "Dostana", duration: 256, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b16", title: "Ghungroo", artist: "Arijit Singh & Shilpa Rao", album: "War", duration: 284, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  
  // Sad/Emotional Songs
  { id: "b17", title: "Agar Tum Saath Ho", artist: "Arijit Singh & Alka Yagnik", album: "Tamasha", duration: 338, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b18", title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", album: "Ae Dil Hai Mushkil", duration: 269, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b19", title: "Phir Le Aya Dil", artist: "Arijit Singh", album: "Barfi", duration: 312, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b20", title: "Tujhe Bhula Diya", artist: "Mohit Chauhan", album: "Anjaana Anjaani", duration: 287, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b21", title: "Bhula Dena", artist: "Mustafa Zahid", album: "Aashiqui 2", duration: 298, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b22", title: "Hamari Adhuri Kahani", artist: "Arijit Singh", album: "Hamari Adhuri Kahani", duration: 324, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b23", title: "Judaai", artist: "Arijit Singh & Rekha Bhardwaj", album: "Badlapur", duration: 276, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b24", title: "Bekhayali", artist: "Sachet Tandon", album: "Kabir Singh", duration: 356, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  
  // Retro/Classic Songs
  { id: "b25", title: "Lag Ja Gale", artist: "Lata Mangeshkar", album: "Woh Kaun Thi", duration: 267, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b26", title: "Dum Maro Dum", artist: "Asha Bhosle", album: "Hare Rama Hare Krishna", duration: 298, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b27", title: "Piya Tu Ab To Aaja", artist: "Asha Bhosle", album: "Caravan", duration: 312, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b28", title: "Chura Liya Hai Tumne", artist: "Asha Bhosle & Mohammed Rafi", album: "Yaadon Ki Baaraat", duration: 287, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b29", title: "Roop Tera Mastana", artist: "Kishore Kumar", album: "Aradhana", duration: 245, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b30", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar", album: "Aradhana", duration: 312, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b31", title: "Aaj Kal Tere Mere Pyar", artist: "S.P. Balasubrahmanyam", album: "Brahmachari", duration: 298, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b32", title: "Ek Ladki Ko Dekha", artist: "Kumar Sanu", album: "1942: A Love Story", duration: 287, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  
  // Punjabi/Folk Songs
  { id: "b33", title: "Mundian To Bach Ke", artist: "Panjabi MC", album: "The Album", duration: 234, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b34", title: "Tunak Tunak Tun", artist: "Daler Mehndi", album: "Tunak Tunak Tun", duration: 267, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b35", title: "Bolo Ta Ra Ra", artist: "Daler Mehndi", album: "Bolo Ta Ra Ra", duration: 245, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b36", title: "Morni Banke", artist: "Guru Randhawa & Neha Kakkar", album: "Badhaai Ho", duration: 212, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b37", title: "High Rated Gabru", artist: "Guru Randhawa", album: "Nawabzaade", duration: 198, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b38", title: "Lahore", artist: "Guru Randhawa", album: "Lahore", duration: 187, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b39", title: "Illegal Weapon", artist: "Jasmine Sandlas & Garry Sandhu", album: "Street Dancer", duration: 234, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b40", title: "Wakhra Swag", artist: "Navv Inder & Badshah", album: "Judgemental Hai Kya", duration: 223, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  
  // Sufi/Soulful Songs
  { id: "b41", title: "Kun Faya Kun", artist: "A.R. Rahman & Javed Ali", album: "Rockstar", duration: 467, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b42", title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", album: "Jodhaa Akbar", duration: 398, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b43", title: "Naina Da Kya Kasoor", artist: "Amit Trivedi", album: "Andhadhun", duration: 312, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b44", title: "Afreen Afreen", artist: "Rahat Fateh Ali Khan", album: "Coke Studio", duration: 356, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b45", title: "Teri Deewani", artist: "Kailash Kher", album: "Kailasa", duration: 287, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b46", title: "Allah Ke Bande", artist: "Kailash Kher", album: "Waisa Bhi Hota Hai", duration: 267, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b47", title: "Maula Mere Maula", artist: "Roop Kumar Rathod", album: "Anwar", duration: 345, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b48", title: "Piya Haji Ali", artist: "A.R. Rahman", album: "Fiza", duration: 398, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  
  // Motivational/Upbeat Songs
  { id: "b49", title: "Zinda", artist: "Siddharth Mahadevan", album: "Bhaag Milkha Bhaag", duration: 245, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b50", title: "Kar Har Maidaan Fateh", artist: "Shreya Ghoshal & Sukhwinder Singh", album: "Sanju", duration: 276, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b51", title: "Dangal", artist: "Daler Mehndi", album: "Dangal", duration: 234, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
  { id: "b52", title: "Sultan", artist: "Sukhwinder Singh", album: "Sultan", duration: 256, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: "" },
  { id: "b53", title: "Chak De India", artist: "Sukhwinder Singh", album: "Chak De India", duration: 287, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: "" },
  { id: "b54", title: "Brothers Anthem", artist: "Vishal Dadlani", album: "Brothers", duration: 234, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: "" },
  { id: "b55", title: "Get Ready To Fight", artist: "Benny Dayal", album: "Baaghi", duration: 212, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: "" },
  { id: "b56", title: "Malhari", artist: "Vishal Dadlani", album: "Bajirao Mastani", duration: 245, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: "" },
];

// Local playlists
export const localPlaylists: LocalPlaylist[] = [
  {
    id: "pl-all",
    name: "All Songs",
    tracks: bollywoodTracks
  },
  {
    id: "pl-romantic",
    name: "Romantic Hits",
    tracks: bollywoodTracks.filter(t => ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"].includes(t.id))
  },
  {
    id: "pl-party",
    name: "Party Anthems",
    tracks: bollywoodTracks.filter(t => ["b9", "b10", "b11", "b12", "b13", "b14", "b15", "b16"].includes(t.id))
  },
  {
    id: "pl-sad",
    name: "Heartbreak Songs",
    tracks: bollywoodTracks.filter(t => ["b17", "b18", "b19", "b20", "b21", "b22", "b23", "b24"].includes(t.id))
  },
  {
    id: "pl-retro",
    name: "Retro Classics",
    tracks: bollywoodTracks.filter(t => ["b25", "b26", "b27", "b28", "b29", "b30", "b31", "b32"].includes(t.id))
  },
  {
    id: "pl-punjabi",
    name: "Punjabi Beats",
    tracks: bollywoodTracks.filter(t => ["b33", "b34", "b35", "b36", "b37", "b38", "b39", "b40"].includes(t.id))
  },
  {
    id: "pl-sufi",
    name: "Sufi & Soulful",
    tracks: bollywoodTracks.filter(t => ["b41", "b42", "b43", "b44", "b45", "b46", "b47", "b48"].includes(t.id))
  },
  {
    id: "pl-motivational",
    name: "Motivational Hits",
    tracks: bollywoodTracks.filter(t => ["b49", "b50", "b51", "b52", "b53", "b54", "b55", "b56"].includes(t.id))
  },
  {
    id: "pl-arijit",
    name: "Best of Arijit Singh",
    tracks: bollywoodTracks.filter(t => t.artist.toLowerCase().includes("arijit"))
  },
  {
    id: "pl-ar-rahman",
    name: "A.R. Rahman Collection",
    tracks: bollywoodTracks.filter(t => t.artist.toLowerCase().includes("a.r. rahman") || t.artist.toLowerCase().includes("rahman"))
  },
  {
    id: "pl-90s",
    name: "90s Nostalgia",
    tracks: bollywoodTracks.filter(t => ["b25", "b26", "b27", "b28", "b29", "b30", "b31", "b32", "b2", "b8"].includes(t.id))
  }
];

// Get all tracks
export const getAllTracks = (): Track[] => bollywoodTracks;

// Search playlists by name
export const searchLocalPlaylists = (query: string): LocalPlaylist[] => {
  if (!query.trim()) return localPlaylists;
  const lowerQuery = query.toLowerCase();
  return localPlaylists.filter(p => p.name.toLowerCase().includes(lowerQuery));
};

// Get playlist by ID
export const getPlaylistById = (id: string): LocalPlaylist | undefined => {
  return localPlaylists.find(p => p.id === id);
};

// Get tracks from multiple playlists and merge (prioritize common tracks)
export const getMergedPlaylistTracks = (playlistIds: string[]): Track[] => {
  if (playlistIds.length === 0) return [];
  
  const trackCountMap = new Map<string, { track: Track; count: number }>();
  
  // Count occurrences of each track across playlists
  playlistIds.forEach(playlistId => {
    const playlist = getPlaylistById(playlistId);
    if (playlist) {
      playlist.tracks.forEach(track => {
        const existing = trackCountMap.get(track.id);
        if (existing) {
          existing.count++;
        } else {
          trackCountMap.set(track.id, { track, count: 1 });
        }
      });
    }
  });
  
  // Convert to array and sort by count (common tracks first)
  const sortedTracks = Array.from(trackCountMap.values())
    .sort((a, b) => b.count - a.count)
    .map(item => item.track);
  
  return sortedTracks;
};
