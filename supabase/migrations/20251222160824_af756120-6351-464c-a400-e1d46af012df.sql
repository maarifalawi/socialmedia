-- Add foreign key constraints for pertanyaan table
-- These enable Supabase to properly resolve relationships in queries

-- Add FK for id_proyek -> proyek
ALTER TABLE public.pertanyaan
ADD CONSTRAINT fk_pertanyaan_proyek
FOREIGN KEY (id_proyek) REFERENCES public.proyek(id_proyek) ON DELETE CASCADE;

-- Note: id_pengguna FK to profil already exists as fk_pertanyaan_pengguna based on types.ts