import * as faceapi from 'face-api.js';

// Types for face recognition
export interface RegisteredFace {
  id: string;
  name: string;
  avatar: string;
  descriptor: Float32Array;
  preferredGenres: string[];
  selectedPlaylists: { id: string; name: string }[];
  registeredAt: Date;
}

// Storage key for local face descriptors (synced profiles use cloud IDs)
const DESCRIPTORS_STORAGE_KEY = 'facesync_face_descriptors';

// Model loading state
let modelsLoaded = false;

/**
 * Load face-api.js models from CDN
 */
export async function loadModels(): Promise<void> {
  if (modelsLoaded) return;

  const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';

  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
    console.log('Face detection models loaded successfully');
  } catch (error) {
    console.error('Error loading face detection models:', error);
    throw new Error('Failed to load face detection models');
  }
}

/**
 * Detect faces in a video element and return their descriptors
 */
export async function detectFaces(
  video: HTMLVideoElement
): Promise<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>>[]> {
  if (!modelsLoaded) {
    await loadModels();
  }

  const options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 416,
    scoreThreshold: 0.5,
  });

  const detections = await faceapi
    .detectAllFaces(video, options)
    .withFaceLandmarks()
    .withFaceDescriptors();

  return detections;
}

/**
 * Get local face descriptors (keyed by profile ID)
 */
export function getLocalDescriptors(): Record<string, Float32Array> {
  try {
    const stored = localStorage.getItem(DESCRIPTORS_STORAGE_KEY);
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    const result: Record<string, Float32Array> = {};
    for (const [id, arr] of Object.entries(parsed)) {
      result[id] = new Float32Array(arr as number[]);
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * Save a face descriptor locally (keyed by cloud profile ID)
 */
export function saveLocalDescriptor(id: string, descriptor: Float32Array): void {
  const descriptors = getLocalDescriptors();
  descriptors[id] = descriptor;
  
  const toSave: Record<string, number[]> = {};
  for (const [key, arr] of Object.entries(descriptors)) {
    toSave[key] = Array.from(arr);
  }
  localStorage.setItem(DESCRIPTORS_STORAGE_KEY, JSON.stringify(toSave));
}

/**
 * Delete a local face descriptor
 */
export function deleteLocalDescriptor(id: string): void {
  const descriptors = getLocalDescriptors();
  delete descriptors[id];
  
  const toSave: Record<string, number[]> = {};
  for (const [key, arr] of Object.entries(descriptors)) {
    toSave[key] = Array.from(arr);
  }
  localStorage.setItem(DESCRIPTORS_STORAGE_KEY, JSON.stringify(toSave));
}

/**
 * Legacy: Get registered faces from old localStorage format (for migration)
 * @deprecated Use cloud profiles + local descriptors instead
 */
export function getRegisteredFaces(): RegisteredFace[] {
  try {
    const stored = localStorage.getItem('facesync_registered_faces');
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((face: any) => ({
      ...face,
      descriptor: new Float32Array(face.descriptor),
      selectedPlaylists: face.selectedPlaylists || [],
      registeredAt: new Date(face.registeredAt),
    }));
  } catch {
    return [];
  }
}

/**
 * Capture face detection data from video (returns descriptor and avatar)
 */
export async function captureFaceData(
  video: HTMLVideoElement
): Promise<{ descriptor: Float32Array; avatar: string }> {
  const detections = await detectFaces(video);

  if (detections.length === 0) {
    throw new Error('No face detected. Please ensure your face is clearly visible.');
  }

  if (detections.length > 1) {
    throw new Error('Multiple faces detected. Please ensure only one person is in frame.');
  }

  const detection = detections[0];
  
  // Create avatar from video frame
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 150;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const box = detection.detection.box;
    const padding = 40;
    const sx = Math.max(0, box.x - padding);
    const sy = Math.max(0, box.y - padding);
    const sw = box.width + padding * 2;
    const sh = box.height + padding * 2;
    
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, 150, 150);
  }

  const avatar = canvas.toDataURL('image/jpeg', 0.8);

  return { descriptor: detection.descriptor, avatar };
}

/**
 * Legacy: Register a new face (stores locally only)
 * @deprecated Use captureFaceData + cloud sync instead
 */
export async function registerFace(
  video: HTMLVideoElement,
  name: string,
  preferredGenres: string[],
  selectedPlaylists: { id: string; name: string }[] = []
): Promise<RegisteredFace | null> {
  const { descriptor, avatar } = await captureFaceData(video);

  const newFace: RegisteredFace = {
    id: `user_${Date.now()}`,
    name,
    avatar,
    descriptor,
    preferredGenres,
    selectedPlaylists,
    registeredAt: new Date(),
  };

  // Save to old localStorage format for backwards compatibility
  const existingFaces = getRegisteredFaces();
  existingFaces.push(newFace);
  const toSave = existingFaces.map((face) => ({
    ...face,
    descriptor: Array.from(face.descriptor),
    registeredAt: face.registeredAt.toISOString(),
  }));
  localStorage.setItem('facesync_registered_faces', JSON.stringify(toSave));

  return newFace;
}

/**
 * Legacy: Delete a registered face from localStorage
 * @deprecated Use deleteLocalDescriptor + cloud sync instead
 */
export function deleteFace(id: string): void {
  const faces = getRegisteredFaces();
  const filtered = faces.filter((f) => f.id !== id);
  const toSave = filtered.map((face) => ({
    ...face,
    descriptor: Array.from(face.descriptor),
    registeredAt: face.registeredAt.toISOString(),
  }));
  localStorage.setItem('facesync_registered_faces', JSON.stringify(toSave));
}

/**
 * Match detected faces against registered faces
 */
export function matchFaces(
  detectedDescriptors: Float32Array[],
  registeredFaces: RegisteredFace[],
  threshold: number = 0.6
): { face: RegisteredFace; confidence: number }[] {
  if (registeredFaces.length === 0) return [];

  const labeledDescriptors = registeredFaces.map(
    (face) => new faceapi.LabeledFaceDescriptors(face.id, [face.descriptor])
  );

  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, threshold);

  const matches: { face: RegisteredFace; confidence: number }[] = [];

  for (const descriptor of detectedDescriptors) {
    const match = faceMatcher.findBestMatch(descriptor);
    
    if (match.label !== 'unknown') {
      const registeredFace = registeredFaces.find((f) => f.id === match.label);
      if (registeredFace) {
        // Convert distance to confidence (lower distance = higher confidence)
        const confidence = Math.max(0, 1 - match.distance);
        matches.push({ face: registeredFace, confidence });
      }
    }
  }

  return matches;
}

/**
 * Check if models are loaded
 */
export function areModelsLoaded(): boolean {
  return modelsLoaded;
}
