import { useState, useMemo } from "react";
import { Search, Music2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Track } from "@/types/music";
import { cn } from "@/lib/utils";

interface SongSelectorProps {
  songs: Track[];
  selectedSongs: Track[];
  onSelectionChange: (songs: Track[]) => void;
  maxHeight?: string;
}

export function SongSelector({ 
  songs, 
  selectedSongs, 
  onSelectionChange,
  maxHeight = "300px"
}: SongSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    const query = searchQuery.toLowerCase();
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
    );
  }, [songs, searchQuery]);

  const selectedIds = useMemo(
    () => new Set(selectedSongs.map((s) => s.id)),
    [selectedSongs]
  );

  const toggleSong = (song: Track) => {
    if (selectedIds.has(song.id)) {
      onSelectionChange(selectedSongs.filter((s) => s.id !== song.id));
    } else {
      onSelectionChange([...selectedSongs, song]);
    }
  };

  const selectAll = () => {
    onSelectionChange(filteredSongs);
  };

  const deselectAll = () => {
    onSelectionChange([]);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search songs by title, artist, or album..."
          className="pl-9"
        />
      </div>

      {/* Selection Summary */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {selectedSongs.length} of {songs.length} songs selected
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-primary hover:underline text-xs"
          >
            Select all ({filteredSongs.length})
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            type="button"
            onClick={deselectAll}
            className="text-muted-foreground hover:underline text-xs"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Songs List */}
      <ScrollArea className="border rounded-lg" style={{ height: maxHeight }}>
        <div className="p-2 space-y-1">
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Music2 className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No songs found</p>
            </div>
          ) : (
            filteredSongs.map((song) => {
              const isSelected = selectedIds.has(song.id);
              return (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => toggleSong(song)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md transition-colors text-left",
                    isSelected
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-secondary border border-transparent"
                  )}
                >
                  {/* Checkbox */}
                  <div className={cn(
                    "flex items-center justify-center w-5 h-5 rounded border-2 transition-colors",
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40"
                  )}>
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>

                  {/* Cover Art */}
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover shrink-0"
                  />

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium text-sm truncate",
                      isSelected && "text-primary"
                    )}>
                      {song.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {song.artist} • {song.album}
                    </p>
                  </div>

                  {/* Duration */}
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDuration(song.duration)}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Selected Songs Preview */}
      {selectedSongs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
          {selectedSongs.slice(0, 8).map((song) => (
            <Badge
              key={song.id}
              variant="secondary"
              className="text-xs gap-1 cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleSong(song)}
            >
              {song.title}
            </Badge>
          ))}
          {selectedSongs.length > 8 && (
            <Badge variant="outline" className="text-xs">
              +{selectedSongs.length - 8} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
