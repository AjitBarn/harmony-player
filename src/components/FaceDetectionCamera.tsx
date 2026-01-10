import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, CameraOff, Users, Scan, CheckCircle2, Loader2 } from "lucide-react";
import { DetectedUser } from "@/types/music";
import { simulateFaceDetection as fetchUsersWithPlaylists } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface FaceDetectionCameraProps {
  onUsersDetected: (users: DetectedUser[]) => void;
  detectedUsers: DetectedUser[];
}

export function FaceDetectionCamera({ onUsersDetected, detectedUsers }: FaceDetectionCameraProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
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

  const runFaceDetection = useCallback(async () => {
    setIsScanning(true);
    setScanProgress(0);

    // Animate progress bar
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 3;
      });
    }, 50);

    try {
      setIsLoadingPlaylists(true);
      
      // Fetch real playlists from Jamendo for random users
      const numUsers = Math.floor(Math.random() * 3) + 1;
      const detectedWithPlaylists = await fetchUsersWithPlaylists(numUsers);
      
      setScanProgress(100);
      clearInterval(interval);
      setIsScanning(false);
      setIsLoadingPlaylists(false);
      
      onUsersDetected(detectedWithPlaylists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      clearInterval(interval);
      setIsScanning(false);
      setIsLoadingPlaylists(false);
    }
  }, [onUsersDetected]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl transition-all duration-300",
            cameraActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
          )}>
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Face Detection</h3>
            <p className="text-sm text-muted-foreground">
              {cameraActive ? "Camera active" : "Start camera to detect users"}
            </p>
          </div>
        </div>
        <button
          onClick={cameraActive ? stopCamera : startCamera}
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all duration-300",
            cameraActive
              ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {cameraActive ? "Stop" : "Start"}
        </button>
      </div>

      {/* Camera Preview */}
      <div className="relative aspect-video bg-secondary rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            cameraActive ? "opacity-100" : "opacity-0"
          )}
        />
        
        {!cameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <CameraOff className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Camera is off</p>
          </div>
        )}

        {/* Scanning Overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-primary/30 animate-pulse-ring" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Scan className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-primary font-medium">
              {isLoadingPlaylists ? "Loading playlists..." : `Scanning faces... ${scanProgress}%`}
            </p>
            <div className="w-48 h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-100 rounded-full"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Face Detection Boxes (Simulated) */}
        {cameraActive && !isScanning && detectedUsers.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {detectedUsers.map((user, index) => (
              <div
                key={user.id}
                className="absolute border-2 border-primary rounded-lg animate-pulse"
                style={{
                  left: `${20 + index * 25}%`,
                  top: "25%",
                  width: "80px",
                  height: "100px",
                }}
              >
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {user.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scan Button */}
      {cameraActive && (
        <button
          onClick={runFaceDetection}
          disabled={isScanning || isLoadingPlaylists}
          className={cn(
            "w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2",
            isScanning || isLoadingPlaylists
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
          )}
        >
          {isLoadingPlaylists ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading playlists...
            </>
          ) : (
            <>
              <Scan className="w-5 h-5" />
              {isScanning ? "Scanning..." : "Scan for Faces"}
            </>
          )}
        </button>
      )}

      {/* Detected Users */}
      {detectedUsers.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{detectedUsers.length} user(s) detected</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {detectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl animate-fade-in"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/50"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(user.confidence * 100)}% match
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-primary ml-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
