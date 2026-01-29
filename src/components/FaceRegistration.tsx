import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, UserPlus, Trash2, Music, Loader2, Music2, Cloud, CloudOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  loadModels, 
  captureFaceData,
  saveLocalDescriptor,
  deleteLocalDescriptor,
  getLocalDescriptors,
  areModelsLoaded 
} from "@/services/faceRecognition";
import { 
  fetchCloudProfiles, 
  saveProfileToCloud, 
  deleteProfileFromCloud,
  updateProfileDescriptor,
  CloudProfile 
} from "@/services/profileSync";
import { getAllSongs } from "@/services/localMusicService";
import { SongSelector } from "@/components/SongSelector";
import { Track } from "@/types/music";
import { cn } from "@/lib/utils";

// Available genres for fallback
const AVAILABLE_GENRES = ["romantic", "party", "sad", "retro", "punjabi", "sufi", "motivational"] as const;
type MusicGenre = typeof AVAILABLE_GENRES[number];

interface FaceRegistrationProps {
  onFacesUpdated?: () => void;
}

export function FaceRegistration({ onFacesUpdated }: FaceRegistrationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cloudProfiles, setCloudProfiles] = useState<CloudProfile[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLinkingFace, setIsLinkingFace] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<MusicGenre[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<Track[]>([]);
  const allSongs = getAllSongs();
  const [cameraActive, setCameraActive] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [localDescriptorIds, setLocalDescriptorIds] = useState<Set<string>>(new Set());
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load cloud profiles and local descriptors on mount/open
  const loadProfiles = useCallback(async () => {
    setIsLoadingProfiles(true);
    try {
      const profiles = await fetchCloudProfiles();
      setCloudProfiles(profiles);
      const localDescs = getLocalDescriptors();
      setLocalDescriptorIds(new Set(Object.keys(localDescs)));
    } catch (err) {
      console.error("Failed to load profiles:", err);
      toast.error("Failed to load profiles from cloud");
    } finally {
      setIsLoadingProfiles(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadProfiles();
    }
  }, [isOpen, loadProfiles]);

  // Load models when dialog opens
  useEffect(() => {
    if (isOpen && !areModelsLoaded()) {
      setIsLoadingModels(true);
      loadModels()
        .then(() => {
          setModelsReady(true);
          setIsLoadingModels(false);
        })
        .catch((err) => {
          toast.error("Failed to load face detection models");
          console.error(err);
          setIsLoadingModels(false);
        });
    } else if (areModelsLoaded()) {
      setModelsReady(true);
    }
  }, [isOpen]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
      toast.error("Could not access camera");
      console.error("Camera access denied:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const handleClose = useCallback(() => {
    stopCamera();
    setName("");
    setSelectedGenres([]);
    setSelectedSongs([]);
    setIsRegistering(false);
    setIsLinkingFace(null);
    setIsOpen(false);
  }, [stopCamera]);

  const toggleGenre = (genre: MusicGenre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (selectedSongs.length === 0 && selectedGenres.length === 0) {
      toast.error("Please select at least one song or genre");
      return;
    }
    if (!videoRef.current) {
      toast.error("Camera not ready");
      return;
    }

    setIsRegistering(true);
    try {
      // Capture face data (descriptor + avatar)
      const { descriptor, avatar } = await captureFaceData(videoRef.current);
      
      // Convert selected songs to playlist format for storage
      const songsAsPlaylist = selectedSongs.map(song => ({
        id: song.id,
        name: song.title
      }));
      
      // Save profile to cloud WITH face descriptor for cross-device sync
      const cloudProfile = await saveProfileToCloud(
        name.trim(),
        avatar,
        selectedGenres,
        songsAsPlaylist,
        descriptor
      );
      
      // Also save face descriptor locally for faster access
      saveLocalDescriptor(cloudProfile.id, descriptor);
      
      // Update state
      setCloudProfiles((prev) => [cloudProfile, ...prev]);
      setLocalDescriptorIds((prev) => new Set([...prev, cloudProfile.id]));
      
      toast.success(`${name} registered successfully! Profile synced to cloud.`);
      setName("");
      setSelectedGenres([]);
      setSelectedSongs([]);
      onFacesUpdated?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  // Re-register face for an existing cloud profile on this device
  const handleLinkFaceToProfile = async (profile: CloudProfile) => {
    if (!videoRef.current) {
      toast.error("Please start the camera first");
      return;
    }

    setIsLinkingFace(profile.id);
    try {
      // Capture face descriptor from video
      const { descriptor } = await captureFaceData(videoRef.current);
      
      // Update descriptor in cloud for cross-device sync
      await updateProfileDescriptor(profile.id, descriptor);
      
      // Also save descriptor locally for faster access
      saveLocalDescriptor(profile.id, descriptor);
      
      // Update local state
      setLocalDescriptorIds((prev) => new Set([...prev, profile.id]));
      
      // Refresh cloud profiles to get updated descriptor
      const updatedProfiles = await fetchCloudProfiles();
      setCloudProfiles(updatedProfiles);
      
      toast.success(`Face updated for ${profile.name}! Now synced across all devices.`);
      onFacesUpdated?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to link face");
    } finally {
      setIsLinkingFace(null);
    }
  };

  const handleDelete = async (id: string, profileName: string) => {
    try {
      await deleteProfileFromCloud(id);
      deleteLocalDescriptor(id);
      setCloudProfiles((prev) => prev.filter((p) => p.id !== id));
      setLocalDescriptorIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      toast.success(`${profileName} removed`);
      onFacesUpdated?.();
    } catch (error) {
      toast.error("Failed to delete profile");
    }
  };

  // Count profiles needing face registration on this device
  const profilesNeedingFace = cloudProfiles.filter(p => !localDescriptorIds.has(p.id));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Register Face
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Register Your Face
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isLoadingModels && (
            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading face detection models...</span>
            </div>
          )}

          {modelsReady && (
            <>
              {/* Camera Preview */}
              <div className="relative aspect-[4/3] bg-secondary rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={cn(
                    "w-full h-full object-cover",
                    cameraActive ? "opacity-100" : "opacity-0"
                  )}
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <Camera className="w-10 h-10 text-muted-foreground" />
                    <Button onClick={startCamera}>Start Camera</Button>
                  </div>
                )}
              </div>

              {/* Notice for profiles needing face on this device */}
              {cameraActive && profilesNeedingFace.length > 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                    <strong>{profilesNeedingFace.length} profile(s)</strong> need face registration on this device. 
                    Click the <RefreshCw className="w-3 h-3 inline" /> button below to link your face.
                  </p>
                </div>
              )}

              {cameraActive && (
                <>
                  {/* Name Input */}
                  <div>
                    <label className="text-sm font-medium mb-1 block">Your Name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Music Selection Tabs */}
                  <Tabs defaultValue="songs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="songs" className="gap-2">
                        <Music2 className="w-4 h-4" />
                        Songs
                      </TabsTrigger>
                      <TabsTrigger value="genres" className="gap-2">
                        <Music className="w-4 h-4" />
                        Genres
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="songs" className="space-y-3">
                      <SongSelector
                        songs={allSongs}
                        selectedSongs={selectedSongs}
                        onSelectionChange={setSelectedSongs}
                        maxHeight="200px"
                      />
                    </TabsContent>
                    
                    <TabsContent value="genres" className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Select genres to generate music (fallback if no songs selected)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_GENRES.map((genre) => (
                          <Badge
                            key={genre}
                            variant={selectedGenres.includes(genre) ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all capitalize",
                              selectedGenres.includes(genre) && "bg-primary"
                            )}
                            onClick={() => toggleGenre(genre)}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Register Button */}
                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering || !name.trim() || (selectedSongs.length === 0 && selectedGenres.length === 0)}
                    className="w-full"
                  >
                    {isRegistering ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Capturing face...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Register New User
                      </>
                    )}
                  </Button>
                </>
              )}
            </>
          )}

          {/* Cloud Profiles List */}
          {isLoadingProfiles ? (
            <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading profiles...</span>
            </div>
          ) : cloudProfiles.length > 0 ? (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-primary" />
                Registered Users ({cloudProfiles.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cloudProfiles.map((profile) => {
                  const hasLocalDescriptor = localDescriptorIds.has(profile.id);
                  const isLinking = isLinkingFace === profile.id;
                  return (
                    <div
                      key={profile.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-lg",
                        hasLocalDescriptor ? "bg-secondary" : "bg-amber-500/10 border border-amber-500/20"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <UserPlus className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm flex items-center gap-1">
                            {profile.name}
                            {hasLocalDescriptor ? (
                              <span title="Face registered on this device">
                                <Cloud className="w-3 h-3 text-primary" />
                              </span>
                            ) : (
                              <span title="Face NOT registered on this device - click refresh to link">
                                <CloudOff className="w-3 h-3 text-amber-500" />
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {profile.selected_playlists.length > 0
                              ? `${profile.selected_playlists.length} song(s)`
                              : profile.preferred_genres.slice(0, 3).join(", ") || "No preferences"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Link Face Button - only show if no local descriptor and camera is active */}
                        {!hasLocalDescriptor && cameraActive && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLinkFaceToProfile(profile)}
                            disabled={isLinking}
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-500/20"
                            title="Link your face to this profile on this device"
                          >
                            {isLinking ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(profile.id, profile.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
