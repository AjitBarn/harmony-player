import { supabase } from "@/integrations/supabase/client";
import { RegisteredFace } from "./faceRecognition";

export interface CloudProfile {
  id: string;
  name: string;
  avatar: string | null;
  preferred_genres: string[];
  selected_playlists: { id: string; name: string }[];
  face_descriptor: number[] | null;
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
    preferred_genres: row.preferred_genres || [],
    selected_playlists: (row.selected_playlists as { id: string; name: string }[]) || [],
    face_descriptor: row.face_descriptor || null,
  }));
}

/**
 * Save a new profile to the cloud database (with face descriptor)
 */
export async function saveProfileToCloud(
  name: string,
  avatar: string,
  preferredGenres: string[],
  selectedPlaylists: { id: string; name: string }[],
  faceDescriptor: Float32Array
): Promise<CloudProfile> {
  const { data, error } = await supabase
    .from("face_profiles")
    .insert({
      name,
      avatar,
      preferred_genres: preferredGenres,
      selected_playlists: selectedPlaylists,
      face_descriptor: Array.from(faceDescriptor),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving profile to cloud:", error);
    throw error;
  }

  return {
    ...data,
    preferred_genres: data.preferred_genres || [],
    selected_playlists: (data.selected_playlists as { id: string; name: string }[]) || [],
    face_descriptor: data.face_descriptor || null,
  };
}

/**
 * Update face descriptor for an existing profile (for cross-device linking)
 */
export async function updateProfileDescriptor(
  id: string,
  faceDescriptor: Float32Array
): Promise<void> {
  const { error } = await supabase
    .from("face_profiles")
    .update({ face_descriptor: Array.from(faceDescriptor) })
    .eq("id", id);

  if (error) {
    console.error("Error updating profile descriptor:", error);
    throw error;
  }
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
 * Convert cloud profile to RegisteredFace format
 * Uses cloud descriptor if available, otherwise falls back to provided local descriptor
 */
export function cloudProfileToRegisteredFace(
  profile: CloudProfile,
  localDescriptor?: Float32Array
): RegisteredFace | null {
  // Prefer cloud descriptor, fall back to local
  let descriptor: Float32Array | null = null;
  
  if (profile.face_descriptor && profile.face_descriptor.length > 0) {
    descriptor = new Float32Array(profile.face_descriptor);
  } else if (localDescriptor) {
    descriptor = localDescriptor;
  }
  
  if (!descriptor) {
    return null; // No descriptor available
  }
  
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
