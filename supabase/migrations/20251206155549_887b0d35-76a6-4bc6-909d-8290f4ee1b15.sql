-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create jadwal_konten table
CREATE TABLE public.jadwal_konten (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  id_proyek UUID NOT NULL,
  id_pengguna UUID NOT NULL,
  judul_konten TEXT NOT NULL,
  deskripsi TEXT,
  platform TEXT NOT NULL,
  waktu_posting TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  reminder_waktu TEXT NOT NULL DEFAULT '1_jam',
  custom_reminder_menit INTEGER,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jadwal_konten ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view content schedules for accessible projects"
ON public.jadwal_konten
FOR SELECT
USING (has_project_access(id_proyek));

CREATE POLICY "Users can create content schedules for accessible projects"
ON public.jadwal_konten
FOR INSERT
WITH CHECK (auth.uid() = id_pengguna AND has_project_access(id_proyek));

CREATE POLICY "Users can update own content schedules"
ON public.jadwal_konten
FOR UPDATE
USING (auth.uid() = id_pengguna AND has_project_access(id_proyek));

CREATE POLICY "Users can delete own content schedules"
ON public.jadwal_konten
FOR DELETE
USING (auth.uid() = id_pengguna AND has_project_access(id_proyek));

-- Create trigger for updated_at
CREATE TRIGGER update_jadwal_konten_updated_at
BEFORE UPDATE ON public.jadwal_konten
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for jadwal_konten
ALTER PUBLICATION supabase_realtime ADD TABLE public.jadwal_konten;