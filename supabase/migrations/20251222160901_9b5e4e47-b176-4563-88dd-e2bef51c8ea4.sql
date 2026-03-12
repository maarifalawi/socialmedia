-- Remove duplicate foreign key constraint
ALTER TABLE public.pertanyaan DROP CONSTRAINT IF EXISTS fk_pertanyaan_proyek;