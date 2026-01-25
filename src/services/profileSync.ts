import { supabase } from "@/integrations/supabase/client";
import { RegisteredFace } from "./faceRecognition";

export interface CloudProfile {
  id: string;
  name: string;
  avatar: string | null;
  preferred_genres: string[];
  selected_playlists: { id: string; name: string }[];
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all profiles from the cloud database
 */
export async function fetchCloudProfiles(): Promise<CloudProfile[]> {
  const { data, error } = await supabase
    .from("face_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cloud profiles:", error);
    throw error;
  }

  return (data || []).map((row) => ({
    ...row,
    selected_playlists: (row.selected_playlists as { id: string; name: string }[]) || [],
  }));
}

/**
 * Save a new profile to the cloud database
 */
export async function saveProfileToCloud(
  name: string,
  avatar: string,
  preferredGenres: string[],
  selectedPlaylists: { id: string; name: string }[]
): Promise<CloudProfile> {
  const { data, error } = await supabase
    .from("face_profiles")
    .insert({
      name,
      avatar,
      preferred_genres: preferredGenres,
      selected_playlists: selectedPlaylists,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving profile to cloud:", error);
    throw error;
  }

  return {
    ...data,
    selected_playlists: (data.selected_playlists as { id: string; name: string }[]) || [],
  };
}

/**
 * Delete a profile from the cloud database
 */
export async function deleteProfileFromCloud(id: string): Promise<void> {
  const { error } = await supabase
    .from("face_profiles")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting profile from cloud:", error);
    throw error;
  }
}

/**
 * Convert cloud profile to RegisteredFace format (without descriptor - stored locally)
 */
export function cloudProfileToRegisteredFace(
  profile: CloudProfile,
  descriptor: Float32Array
): RegisteredFace {
  return {
    id: profile.id,
    name: profile.name,
    avatar: profile.avatar || "",
    descriptor,
    preferredGenres: profile.preferred_genres,
    selectedPlaylists: profile.selected_playlists,
    registeredAt: new Date(profile.created_at),
  };
}
