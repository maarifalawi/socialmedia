-- =====================================================
-- MIGRATION: Rename all 'id' columns to unique names
-- =====================================================

-- Step 1: Drop all existing RLS policies first
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profil;
DROP POLICY IF EXISTS "Users can update own profile but not role" ON public.profil;
DROP POLICY IF EXISTS "Users can create own projects" ON public.proyek;
DROP POLICY IF EXISTS "Users can view accessible projects" ON public.proyek;
DROP POLICY IF EXISTS "Project owners can update" ON public.proyek;
DROP POLICY IF EXISTS "Project owners can delete" ON public.proyek;
DROP POLICY IF EXISTS "Users can view datasets for accessible projects" ON public.dataset;
DROP POLICY IF EXISTS "Users can manage datasets for accessible projects" ON public.dataset;
DROP POLICY IF EXISTS "Users can view posts for accessible projects" ON public.postingan;
DROP POLICY IF EXISTS "Users can manage posts for accessible projects" ON public.postingan;
DROP POLICY IF EXISTS "Everyone can view active platforms" ON public.platform;
DROP POLICY IF EXISTS "Admins can insert platforms" ON public.platform;
DROP POLICY IF EXISTS "Admins can update platforms" ON public.platform;
DROP POLICY IF EXISTS "Admins can delete platforms" ON public.platform;
DROP POLICY IF EXISTS "Everyone can view active content types" ON public.jenis_konten;
DROP POLICY IF EXISTS "Admins can insert content types" ON public.jenis_konten;
DROP POLICY IF EXISTS "Admins can update content types" ON public.jenis_konten;
DROP POLICY IF EXISTS "Admins can delete content types" ON public.jenis_konten;
DROP POLICY IF EXISTS "Users can view campaigns for accessible projects" ON public.kampanye;
DROP POLICY IF EXISTS "Users can manage campaigns for accessible projects" ON public.kampanye;
DROP POLICY IF EXISTS "All users can view all questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Admins can view all questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Users can create questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Users can update own pending questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Users can delete own pending questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Admins can answer questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Users can rate answered questions" ON public.pertanyaan;
DROP POLICY IF EXISTS "Users can view notes for accessible projects" ON public.catatan;
DROP POLICY IF EXISTS "Users can manage notes for accessible projects" ON public.catatan;
DROP POLICY IF EXISTS "Users can view own saved filters" ON public.filter_tersimpan;
DROP POLICY IF EXISTS "Users can manage own saved filters" ON public.filter_tersimpan;
DROP POLICY IF EXISTS "Users can view KPI targets for accessible projects" ON public.target_kpi;
DROP POLICY IF EXISTS "Users can manage KPI targets for accessible projects" ON public.target_kpi;
DROP POLICY IF EXISTS "Users can view import logs for accessible datasets" ON public.log_impor;
DROP POLICY IF EXISTS "Users can create import logs for accessible datasets" ON public.log_impor;
DROP POLICY IF EXISTS "Users can view competitors for accessible projects" ON public.kompetitor;
DROP POLICY IF EXISTS "Users can manage competitors for accessible projects" ON public.kompetitor;
DROP POLICY IF EXISTS "Users can view competitor data for accessible projects" ON public.data_kompetitor;
DROP POLICY IF EXISTS "Users can manage competitor data for accessible projects" ON public.data_kompetitor;
DROP POLICY IF EXISTS "Users can view project members for accessible projects" ON public.anggota_proyek;
DROP POLICY IF EXISTS "Project owners can manage members" ON public.anggota_proyek;
DROP POLICY IF EXISTS "Users can view export history for accessible projects" ON public.riwayat_export;
DROP POLICY IF EXISTS "Users can create export history for accessible projects" ON public.riwayat_export;

-- Step 2: Rename primary key columns in all tables
ALTER TABLE public.profil RENAME COLUMN id TO id_profil;
ALTER TABLE public.proyek RENAME COLUMN id TO id_proyek;
ALTER TABLE public.dataset RENAME COLUMN id TO id_dataset;
ALTER TABLE public.postingan RENAME COLUMN id TO id_postingan;
ALTER TABLE public.platform RENAME COLUMN id TO id_platform;
ALTER TABLE public.jenis_konten RENAME COLUMN id TO id_jenis_konten;
ALTER TABLE public.kampanye RENAME COLUMN id TO id_kampanye;
ALTER TABLE public.pertanyaan RENAME COLUMN id TO id_pertanyaan;
ALTER TABLE public.catatan RENAME COLUMN id TO id_catatan;
ALTER TABLE public.filter_tersimpan RENAME COLUMN id TO id_filter_tersimpan;
ALTER TABLE public.target_kpi RENAME COLUMN id TO id_target_kpi;
ALTER TABLE public.log_impor RENAME COLUMN id TO id_log_impor;
ALTER TABLE public.kompetitor RENAME COLUMN id TO id_kompetitor;
ALTER TABLE public.data_kompetitor RENAME COLUMN id TO id_data_kompetitor;
ALTER TABLE public.anggota_proyek RENAME COLUMN id TO id_anggota_proyek;
ALTER TABLE public.riwayat_export RENAME COLUMN id TO id_riwayat_export;

-- Step 3: Update database functions
CREATE OR REPLACE FUNCTION public.get_user_display_name(user_id uuid)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT COALESCE(nama_lengkap, 'Unknown') 
  FROM profil 
  WHERE id_profil = user_id
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.has_project_access(project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.proyek WHERE id_proyek = project_id AND id_pemilik = auth.uid()
    UNION
    SELECT 1 FROM public.anggota_proyek WHERE id_proyek = project_id AND id_pengguna = auth.uid()
  );
$function$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profil WHERE id_profil = auth.uid() AND peran = 'admin'
  );
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profil (id_profil, nama_lengkap, peran)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'user'
  );
  RETURN new;
END;
$function$;

-- Step 4: Recreate RLS policies for profil
CREATE POLICY "Authenticated users can view all profiles" 
ON public.profil FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own profile but not role" 
ON public.profil FOR UPDATE 
USING (auth.uid() = id_profil)
WITH CHECK ((auth.uid() = id_profil) AND (peran = (SELECT profil_1.peran FROM profil profil_1 WHERE profil_1.id_profil = auth.uid())));

-- Step 5: Recreate RLS policies for proyek
CREATE POLICY "Users can create own projects" 
ON public.proyek FOR INSERT 
WITH CHECK (auth.uid() = id_pemilik);

CREATE POLICY "Users can view accessible projects" 
ON public.proyek FOR SELECT 
USING ((id_pemilik = auth.uid()) OR has_project_access(id_proyek));

CREATE POLICY "Project owners can update" 
ON public.proyek FOR UPDATE 
USING (id_pemilik = auth.uid());

CREATE POLICY "Project owners can delete" 
ON public.proyek FOR DELETE 
USING (id_pemilik = auth.uid());

-- Step 6: Recreate RLS policies for dataset
CREATE POLICY "Users can view datasets for accessible projects" 
ON public.dataset FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can manage datasets for accessible projects" 
ON public.dataset FOR ALL 
USING (has_project_access(id_proyek));

-- Step 7: Recreate RLS policies for postingan
CREATE POLICY "Users can view posts for accessible projects" 
ON public.postingan FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can manage posts for accessible projects" 
ON public.postingan FOR ALL 
USING (has_project_access(id_proyek));

-- Step 8: Recreate RLS policies for platform
CREATE POLICY "Everyone can view active platforms" 
ON public.platform FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert platforms" 
ON public.platform FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Admins can update platforms" 
ON public.platform FOR UPDATE 
USING (is_admin());

CREATE POLICY "Admins can delete platforms" 
ON public.platform FOR DELETE 
USING (is_admin());

-- Step 9: Recreate RLS policies for jenis_konten
CREATE POLICY "Everyone can view active content types" 
ON public.jenis_konten FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert content types" 
ON public.jenis_konten FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Admins can update content types" 
ON public.jenis_konten FOR UPDATE 
USING (is_admin());

CREATE POLICY "Admins can delete content types" 
ON public.jenis_konten FOR DELETE 
USING (is_admin());

-- Step 10: Recreate RLS policies for kampanye
CREATE POLICY "Users can view campaigns for accessible projects" 
ON public.kampanye FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can manage campaigns for accessible projects" 
ON public.kampanye FOR ALL 
USING (has_project_access(id_proyek));

-- Step 11: Recreate RLS policies for pertanyaan
CREATE POLICY "All users can view all questions" 
ON public.pertanyaan FOR SELECT 
USING (true);

CREATE POLICY "Admins can view all questions" 
ON public.pertanyaan FOR SELECT 
USING (is_admin());

CREATE POLICY "Users can create questions" 
ON public.pertanyaan FOR INSERT 
WITH CHECK ((auth.uid() = id_pengguna) AND has_project_access(id_proyek));

CREATE POLICY "Users can update own pending questions" 
ON public.pertanyaan FOR UPDATE 
USING ((auth.uid() = id_pengguna) AND (status = 'menunggu'))
WITH CHECK ((auth.uid() = id_pengguna) AND (status = 'menunggu'));

CREATE POLICY "Users can delete own pending questions" 
ON public.pertanyaan FOR DELETE 
USING ((auth.uid() = id_pengguna) AND (status = 'menunggu'));

CREATE POLICY "Admins can answer questions" 
ON public.pertanyaan FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can rate answered questions" 
ON public.pertanyaan FOR UPDATE 
USING (auth.uid() = id_pengguna)
WITH CHECK (auth.uid() = id_pengguna);

-- Step 12: Recreate RLS policies for catatan
CREATE POLICY "Users can view notes for accessible projects" 
ON public.catatan FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can manage notes for accessible projects" 
ON public.catatan FOR ALL 
USING ((id_pengguna = auth.uid()) AND has_project_access(id_proyek));

-- Step 13: Recreate RLS policies for filter_tersimpan
CREATE POLICY "Users can view own saved filters" 
ON public.filter_tersimpan FOR SELECT 
USING (id_pengguna = auth.uid());

CREATE POLICY "Users can manage own saved filters" 
ON public.filter_tersimpan FOR ALL 
USING (id_pengguna = auth.uid());

-- Step 14: Recreate RLS policies for target_kpi
CREATE POLICY "Users can view KPI targets for accessible projects" 
ON public.target_kpi FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can manage KPI targets for accessible projects" 
ON public.target_kpi FOR ALL 
USING (has_project_access(id_proyek));

-- Step 15: Recreate RLS policies for log_impor
CREATE POLICY "Users can view import logs for accessible datasets" 
ON public.log_impor FOR SELECT 
USING (EXISTS (SELECT 1 FROM dataset WHERE dataset.id_dataset = log_impor.id_dataset AND has_project_access(dataset.id_proyek)));

CREATE POLICY "Users can create import logs for accessible datasets" 
ON public.log_impor FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM dataset WHERE dataset.id_dataset = log_impor.id_dataset AND has_project_access(dataset.id_proyek)));

-- Step 16: Recreate RLS policies for kompetitor
CREATE POLICY "Users can view competitors for accessible projects" 
ON public.kompetitor FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can manage competitors for accessible projects" 
ON public.kompetitor FOR ALL 
USING (has_project_access(id_proyek));

-- Step 17: Recreate RLS policies for data_kompetitor
CREATE POLICY "Users can view competitor data for accessible projects" 
ON public.data_kompetitor FOR SELECT 
USING (EXISTS (SELECT 1 FROM kompetitor WHERE kompetitor.id_kompetitor = data_kompetitor.id_kompetitor AND has_project_access(kompetitor.id_proyek)));

CREATE POLICY "Users can manage competitor data for accessible projects" 
ON public.data_kompetitor FOR ALL 
USING (EXISTS (SELECT 1 FROM kompetitor WHERE kompetitor.id_kompetitor = data_kompetitor.id_kompetitor AND has_project_access(kompetitor.id_proyek)));

-- Step 18: Recreate RLS policies for anggota_proyek
CREATE POLICY "Users can view project members for accessible projects" 
ON public.anggota_proyek FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Project owners can manage members" 
ON public.anggota_proyek FOR ALL 
USING (EXISTS (SELECT 1 FROM proyek WHERE proyek.id_proyek = anggota_proyek.id_proyek AND proyek.id_pemilik = auth.uid()));

-- Step 19: Recreate RLS policies for riwayat_export
CREATE POLICY "Users can view export history for accessible projects" 
ON public.riwayat_export FOR SELECT 
USING (has_project_access(id_proyek));

CREATE POLICY "Users can create export history for accessible projects" 
ON public.riwayat_export FOR INSERT 
WITH CHECK ((id_pengguna = auth.uid()) AND has_project_access(id_proyek));

-- Step 20: Drop and recreate the view with new column names
DROP VIEW IF EXISTS public.user_display_info;
CREATE VIEW public.user_display_info AS
SELECT id_profil, nama_lengkap, created_at
FROM public.profil;