import { Track } from "@/types/music";

export interface LocalPlaylist {
  id: string;
  name: string;
  tracks: Track[];
}

// Free sample audio URLs for demo purposes
const sampleAudioUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
];

// Get a sample audio URL based on track index
const getAudioUrl = (index: number) => sampleAudioUrls[index % sampleAudioUrls.length];

// Bollywood songs collection - All songs in one flat list
const bollywoodTracks: Track[] = [
  { id: "b1", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", duration: 262, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(0) },
  { id: "b2", title: "Kal Ho Naa Ho", artist: "Sonu Nigam", album: "Kal Ho Naa Ho", duration: 319, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(1) },
  { id: "b3", title: "Tere Bina", artist: "A.R. Rahman", album: "Guru", duration: 295, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(2) },
  { id: "b4", title: "Channa Mereya", artist: "Arijit Singh", album: "Ae Dil Hai Mushkil", duration: 289, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(3) },
  { id: "b5", title: "Kabira", artist: "Arijit Singh & Harshdeep Kaur", album: "Yeh Jawaani Hai Deewani", duration: 234, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(4) },
  { id: "b6", title: "Gerua", artist: "Arijit Singh & Antara Mitra", album: "Dilwale", duration: 286, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(5) },
  { id: "b7", title: "Raabta", artist: "Arijit Singh", album: "Agent Vinod", duration: 245, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(6) },
  { id: "b8", title: "Tujhe Dekha To", artist: "Kumar Sanu & Lata Mangeshkar", album: "DDLJ", duration: 312, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(7) },
  { id: "b9", title: "Badtameez Dil", artist: "Benny Dayal", album: "Yeh Jawaani Hai Deewani", duration: 243, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(8) },
  { id: "b10", title: "London Thumakda", artist: "Labh Janjua & Sonu Kakkar", album: "Queen", duration: 217, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(9) },
  { id: "b11", title: "Gallan Goodiyaan", artist: "Various Artists", album: "Dil Dhadakne Do", duration: 274, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(0) },
  { id: "b12", title: "Kar Gayi Chull", artist: "Badshah & Neha Kakkar", album: "Kapoor & Sons", duration: 198, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(1) },
  { id: "b13", title: "Balam Pichkari", artist: "Vishal Dadlani & Shalmali", album: "Yeh Jawaani Hai Deewani", duration: 267, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(2) },
  { id: "b14", title: "Nachde Ne Saare", artist: "Jasleen Royal", album: "Baar Baar Dekho", duration: 223, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(3) },
  { id: "b15", title: "Desi Girl", artist: "Sunidhi Chauhan & Shankar Mahadevan", album: "Dostana", duration: 256, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(4) },
  { id: "b16", title: "Ghungroo", artist: "Arijit Singh & Shilpa Rao", album: "War", duration: 284, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(5) },
  { id: "b17", title: "Agar Tum Saath Ho", artist: "Arijit Singh & Alka Yagnik", album: "Tamasha", duration: 338, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(6) },
  { id: "b18", title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", album: "Ae Dil Hai Mushkil", duration: 269, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(7) },
  { id: "b19", title: "Phir Le Aya Dil", artist: "Arijit Singh", album: "Barfi", duration: 312, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(8) },
  { id: "b20", title: "Tujhe Bhula Diya", artist: "Mohit Chauhan", album: "Anjaana Anjaani", duration: 287, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(9) },
  { id: "b21", title: "Bhula Dena", artist: "Mustafa Zahid", album: "Aashiqui 2", duration: 298, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(0) },
  { id: "b22", title: "Hamari Adhuri Kahani", artist: "Arijit Singh", album: "Hamari Adhuri Kahani", duration: 324, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(1) },
  { id: "b23", title: "Judaai", artist: "Arijit Singh & Rekha Bhardwaj", album: "Badlapur", duration: 276, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(2) },
  { id: "b24", title: "Bekhayali", artist: "Sachet Tandon", album: "Kabir Singh", duration: 356, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(3) },
  { id: "b25", title: "Lag Ja Gale", artist: "Lata Mangeshkar", album: "Woh Kaun Thi", duration: 267, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(4) },
  { id: "b26", title: "Dum Maro Dum", artist: "Asha Bhosle", album: "Hare Rama Hare Krishna", duration: 298, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(5) },
  { id: "b27", title: "Piya Tu Ab To Aaja", artist: "Asha Bhosle", album: "Caravan", duration: 312, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(6) },
  { id: "b28", title: "Chura Liya Hai Tumne", artist: "Asha Bhosle & Mohammed Rafi", album: "Yaadon Ki Baaraat", duration: 287, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(7) },
  { id: "b29", title: "Roop Tera Mastana", artist: "Kishore Kumar", album: "Aradhana", duration: 245, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(8) },
  { id: "b30", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar", album: "Aradhana", duration: 312, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(9) },
  { id: "b31", title: "Aaj Kal Tere Mere Pyar", artist: "S.P. Balasubrahmanyam", album: "Brahmachari", duration: 298, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(0) },
  { id: "b32", title: "Ek Ladki Ko Dekha", artist: "Kumar Sanu", album: "1942: A Love Story", duration: 287, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(1) },
  { id: "b33", title: "Mundian To Bach Ke", artist: "Panjabi MC", album: "The Album", duration: 234, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(2) },
  { id: "b34", title: "Tunak Tunak Tun", artist: "Daler Mehndi", album: "Tunak Tunak Tun", duration: 267, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(3) },
  { id: "b35", title: "Bolo Ta Ra Ra", artist: "Daler Mehndi", album: "Bolo Ta Ra Ra", duration: 245, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(4) },
  { id: "b36", title: "Morni Banke", artist: "Guru Randhawa & Neha Kakkar", album: "Badhaai Ho", duration: 212, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(5) },
  { id: "b37", title: "High Rated Gabru", artist: "Guru Randhawa", album: "Nawabzaade", duration: 198, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(6) },
  { id: "b38", title: "Lahore", artist: "Guru Randhawa", album: "Lahore", duration: 187, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(7) },
  { id: "b39", title: "Illegal Weapon", artist: "Jasmine Sandlas & Garry Sandhu", album: "Street Dancer", duration: 234, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(8) },
  { id: "b40", title: "Wakhra Swag", artist: "Navv Inder & Badshah", album: "Judgemental Hai Kya", duration: 223, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(9) },
  { id: "b41", title: "Kun Faya Kun", artist: "A.R. Rahman & Javed Ali", album: "Rockstar", duration: 467, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(0) },
  { id: "b42", title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", album: "Jodhaa Akbar", duration: 398, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(1) },
  { id: "b43", title: "Naina Da Kya Kasoor", artist: "Amit Trivedi", album: "Andhadhun", duration: 312, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(2) },
  { id: "b44", title: "Afreen Afreen", artist: "Rahat Fateh Ali Khan", album: "Coke Studio", duration: 356, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(3) },
  { id: "b45", title: "Teri Deewani", artist: "Kailash Kher", album: "Kailasa", duration: 287, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(4) },
  { id: "b46", title: "Allah Ke Bande", artist: "Kailash Kher", album: "Waisa Bhi Hota Hai", duration: 267, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(5) },
  { id: "b47", title: "Maula Mere Maula", artist: "Roop Kumar Rathod", album: "Anwar", duration: 345, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(6) },
  { id: "b48", title: "Piya Haji Ali", artist: "A.R. Rahman", album: "Fiza", duration: 398, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(7) },
  { id: "b49", title: "Zinda", artist: "Siddharth Mahadevan", album: "Bhaag Milkha Bhaag", duration: 245, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(8) },
  { id: "b50", title: "Kar Har Maidaan Fateh", artist: "Shreya Ghoshal & Sukhwinder Singh", album: "Sanju", duration: 276, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(9) },
  { id: "b51", title: "Dangal", artist: "Daler Mehndi", album: "Dangal", duration: 234, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(0) },
  { id: "b52", title: "Sultan", artist: "Sukhwinder Singh", album: "Sultan", duration: 256, coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300", audioUrl: getAudioUrl(1) },
  { id: "b53", title: "Chak De India", artist: "Sukhwinder Singh", album: "Chak De India", duration: 287, coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300", audioUrl: getAudioUrl(2) },
  { id: "b54", title: "Brothers Anthem", artist: "Vishal Dadlani", album: "Brothers", duration: 234, coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300", audioUrl: getAudioUrl(3) },
  { id: "b55", title: "Get Ready To Fight", artist: "Benny Dayal", album: "Baaghi", duration: 212, coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", audioUrl: getAudioUrl(4) },
  { id: "b56", title: "Malhari", artist: "Vishal Dadlani", album: "Bajirao Mastani", duration: 245, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", audioUrl: getAudioUrl(5) },
];

// Single unified playlist with all songs
export const localPlaylists: LocalPlaylist[] = [
  {
    id: "pl-all",
    name: "All Songs",
    tracks: bollywoodTracks
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
