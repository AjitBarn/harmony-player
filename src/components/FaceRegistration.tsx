import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, UserPlus, Trash2, Music, Loader2, ListMusic, X } from "lucide-react";
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
  RegisteredFace, 
  loadModels, 
  registerFace, 
  getRegisteredFaces, 
  deleteFace,
  areModelsLoaded 
} from "@/services/faceRecognition";
import { localPlaylists, LocalPlaylist } from "@/data/bollywoodSongs";
import { cn } from "@/lib/utils";

// Available genres for fallback
const AVAILABLE_GENRES = ["romantic", "party", "sad", "retro", "punjabi", "sufi", "motivational"] as const;
type MusicGenre = typeof AVAILABLE_GENRES[number];

interface FaceRegistrationProps {
  onFacesUpdated?: () => void;
}

export function FaceRegistration({ onFacesUpdated }: FaceRegistrationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [registeredFaces, setRegisteredFaces] = useState<RegisteredFace[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<MusicGenre[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<{ id: string; name: string }[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load registered faces on mount
  useEffect(() => {
    setRegisteredFaces(getRegisteredFaces());
  }, []);

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
    setSelectedPlaylists([]);
    setIsRegistering(false);
    setIsOpen(false);
  }, [stopCamera]);

  const toggleGenre = (genre: MusicGenre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const togglePlaylist = (playlist: LocalPlaylist) => {
    setSelectedPlaylists((prev) => {
      const exists = prev.find((p) => p.id === playlist.id);
      if (exists) {
        return prev.filter((p) => p.id !== playlist.id);
      }
      return [...prev, { id: playlist.id, name: playlist.name }];
    });
  };

  const removePlaylist = (playlistId: string) => {
    setSelectedPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (selectedPlaylists.length === 0 && selectedGenres.length === 0) {
      toast.error("Please select at least one playlist or genre");
      return;
    }
    if (!videoRef.current) {
      toast.error("Camera not ready");
      return;
    }

    setIsRegistering(true);
    try {
      const newFace = await registerFace(
        videoRef.current,
        name.trim(),
        selectedGenres,
        selectedPlaylists
      );
      
      if (newFace) {
        setRegisteredFaces(getRegisteredFaces());
        toast.success(`${name} registered successfully!`);
        setName("");
        setSelectedGenres([]);
        setSelectedPlaylists([]);
        onFacesUpdated?.();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDelete = (id: string, faceName: string) => {
    deleteFace(id);
    setRegisteredFaces(getRegisteredFaces());
    toast.success(`${faceName} removed`);
    onFacesUpdated?.();
  };

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
                  <Tabs defaultValue="playlists" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="playlists" className="gap-2">
                        <ListMusic className="w-4 h-4" />
                        Playlists
                      </TabsTrigger>
                      <TabsTrigger value="genres" className="gap-2">
                        <Music className="w-4 h-4" />
                        Genres
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="playlists" className="space-y-3">
                      {/* Selected Playlists */}
                      {selectedPlaylists.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedPlaylists.map((playlist) => (
                            <Badge
                              key={playlist.id}
                              variant="default"
                              className="gap-1 pr-1"
                            >
                              {playlist.name}
                              <button
                                onClick={() => removePlaylist(playlist.id)}
                                className="ml-1 hover:bg-primary-foreground/20 rounded p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Available Playlists */}
                      <div className="max-h-48 overflow-y-auto space-y-1 border rounded-lg p-2">
                        {localPlaylists.map((playlist) => {
                          const isSelected = selectedPlaylists.some((p) => p.id === playlist.id);
                          return (
                            <button
                              key={playlist.id}
                              onClick={() => togglePlaylist(playlist)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-md transition-colors",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-secondary"
                              )}
                            >
                              <div className="font-medium text-sm">{playlist.name}</div>
                              <div className="text-xs opacity-70">{playlist.tracks.length} songs</div>
                            </button>
                          );
                        })}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="genres" className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Select genres to generate music (fallback if no playlists selected)
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
                    disabled={isRegistering || !name.trim() || (selectedPlaylists.length === 0 && selectedGenres.length === 0)}
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
                        Register Face
                      </>
                    )}
                  </Button>
                </>
              )}
            </>
          )}

          {/* Registered Faces List */}
          {registeredFaces.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3">
                Registered Users ({registeredFaces.length})
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {registeredFaces.map((face) => (
                  <div
                    key={face.id}
                    className="flex items-center justify-between p-2 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={face.avatar}
                        alt={face.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{face.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {face.selectedPlaylists.length > 0
                            ? `${face.selectedPlaylists.length} playlist(s)`
                            : face.preferredGenres.slice(0, 3).join(", ")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(face.id, face.name)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
