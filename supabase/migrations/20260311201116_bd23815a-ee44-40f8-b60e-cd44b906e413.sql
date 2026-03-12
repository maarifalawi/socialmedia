
-- Drop the old owner-only policy
DROP POLICY IF EXISTS "Project owners can manage members" ON public.anggota_proyek;

-- Create a security definer function to check if user is project admin
CREATE OR REPLACE FUNCTION public.is_project_admin(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.proyek WHERE id_proyek = p_project_id AND id_pemilik = auth.uid()
    UNION
    SELECT 1 FROM public.anggota_proyek WHERE id_proyek = p_project_id AND id_pengguna = auth.uid() AND peran_dalam_proyek = 'admin'
  );
$$;

-- New policy: owners AND project admins can manage members
CREATE POLICY "Project owners and admins can manage members"
ON public.anggota_proyek
FOR ALL
TO authenticated
USING (public.is_project_admin(id_proyek))
WITH CHECK (public.is_project_admin(id_proyek));
