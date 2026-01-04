import { useState, useEffect, useRef } from "react";
import { Track } from "@/types/music";
import { formatDuration } from "@/utils/playlistMerger";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  playlist: Track[];
}

export function MusicPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  playlist,
}: MusicPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Simulate progress when playing
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            onNext();
            return 0;
          }
          return prev + 100 / currentTrack.duration;
        });
      }, 1000);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentTrack, onNext]);

  // Reset progress when track changes
  useEffect(() => {
    setProgress(0);
  }, [currentTrack?.id]);

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-card border-t border-border flex items-center justify-center">
        <p className="text-muted-foreground">Select a song to start playing</p>
      </div>
    );
  }

  const currentTime = Math.floor((progress / 100) * currentTrack.duration);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-card to-card/95 border-t border-border backdrop-blur-xl z-50">
      <div className="container mx-auto h-full flex items-center justify-between gap-4 px-4">
        {/* Current Track Info */}
        <div className="flex items-center gap-4 w-64 shrink-0">
          <div className="relative group">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.album}
              className={cn(
                "w-14 h-14 rounded-lg object-cover shadow-lg transition-transform duration-300",
                isPlaying && "animate-pulse"
              )}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="w-0.5 h-4 bg-primary rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{currentTrack.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "transition-colors shrink-0",
              isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={cn(
                "transition-colors",
                isShuffled ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={onPrevious}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform glow-primary"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
            <button
              onClick={onNext}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsRepeating(!isRepeating)}
              className={cn(
                "transition-colors",
                isRepeating ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatDuration(currentTime)}
            </span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden group cursor-pointer">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200 group-hover:bg-primary/80"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-10">
              {formatDuration(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume & Additional Controls */}
        <div className="flex items-center gap-4 w-48 shrink-0 justify-end">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ListMusic className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground/60 rounded-full"
                style={{ width: isMuted ? "0%" : `${volume}%` }}
              />
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
