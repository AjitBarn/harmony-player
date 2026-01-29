-- Add face_descriptor column to store biometric data in cloud
ALTER TABLE public.face_profiles 
ADD COLUMN face_descriptor double precision[] NULL;

-- Add comment explaining the column
COMMENT ON COLUMN public.face_profiles.face_descriptor IS 'Float32Array face descriptor for cross-device face recognition';