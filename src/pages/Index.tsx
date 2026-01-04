import { useState, useCallback, useMemo } from "react";
import { Header } from "@/components/Header";
import { FaceDetectionCamera } from "@/components/FaceDetectionCamera";
import { MergedPlaylistView } from "@/components/MergedPlaylistView";
import { MusicPlayer } from "@/components/MusicPlayer";
import { DetectedUser, Track } from "@/types/music";
import { mergePlaylistsWithPriority } from "@/utils/playlistMerger";
import { Helmet } from "react-helmet";

const Index = () => {
  const [detectedUsers, setDetectedUsers] = useState<DetectedUser[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mergedPlaylist = useMemo(() => {
    if (detectedUsers.length === 0) {
      return { tracks: [], users: [], createdAt: new Date() };
    }
    return mergePlaylistsWithPriority(detectedUsers);
  }, [detectedUsers]);

  const handleUsersDetected = useCallback((users: DetectedUser[]) => {
    setDetectedUsers(users);
    // Auto-play first track when playlist is generated
    const merged = mergePlaylistsWithPriority(users);
    if (merged.tracks.length > 0 && !currentTrack) {
      setCurrentTrack(merged.tracks[0]);
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const handleTrackSelect = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentTrack || mergedPlaylist.tracks.length === 0) return;
    const currentIndex = mergedPlaylist.tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mergedPlaylist.tracks.length;
    setCurrentTrack(mergedPlaylist.tracks[nextIndex]);
  }, [currentTrack, mergedPlaylist.tracks]);

  const handlePrevious = useCallback(() => {
    if (!currentTrack || mergedPlaylist.tracks.length === 0) return;
    const currentIndex = mergedPlaylist.tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? mergedPlaylist.tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(mergedPlaylist.tracks[prevIndex]);
  }, [currentTrack, mergedPlaylist.tracks]);

  return (
    <>
      <Helmet>
        <title>FaceSync - Collaborative Music Experience with Face Recognition</title>
        <meta
          name="description"
          content="FaceSync detects users via face recognition and automatically merges their playlists, prioritizing common songs for the perfect group listening experience."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background pb-28">
        {/* Background Gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
        
        <div className="relative z-10">
          <Header />

          <main className="container mx-auto px-4 py-6">
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column - Camera & Detection */}
              <div className="lg:col-span-5 space-y-6">
                <div className="animate-fade-in">
                  <FaceDetectionCamera
                    onUsersDetected={handleUsersDetected}
                    detectedUsers={detectedUsers}
                  />
                </div>

                {/* Info Card */}
                <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <h3 className="font-semibold text-foreground mb-3">How it works</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span>Start the camera and grant permission for face detection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span>Click "Scan for Faces" to detect users in the camera view</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span>Playlists merge automatically with common songs prioritized</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <span>Enjoy music that everyone in the group loves!</span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Right Column - Playlist */}
              <div className="lg:col-span-7 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <MergedPlaylistView
                  tracks={mergedPlaylist.tracks}
                  users={detectedUsers}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onTrackSelect={handleTrackSelect}
                />
              </div>
            </div>
          </main>
        </div>

        {/* Music Player */}
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          playlist={mergedPlaylist.tracks}
        />
      </div>
    </>
  );
};

export default Index;
