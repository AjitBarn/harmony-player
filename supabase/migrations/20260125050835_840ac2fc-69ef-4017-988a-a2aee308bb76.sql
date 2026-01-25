-- Create a table for face profiles (stores user profiles without face descriptors for privacy)
CREATE TABLE public.face_profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT,
    preferred_genres TEXT[] DEFAULT '{}',
    selected_playlists JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.face_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all profiles (needed for face matching across devices)
CREATE POLICY "Anyone can view all profiles" 
ON public.face_profiles 
FOR SELECT 
USING (true);

-- Allow anyone to create profiles (no auth required for this app)
CREATE POLICY "Anyone can create profiles" 
ON public.face_profiles 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update profiles
CREATE POLICY "Anyone can update profiles" 
ON public.face_profiles 
FOR UPDATE 
USING (true);

-- Allow anyone to delete profiles
CREATE POLICY "Anyone can delete profiles" 
ON public.face_profiles 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_face_profiles_updated_at
BEFORE UPDATE ON public.face_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();