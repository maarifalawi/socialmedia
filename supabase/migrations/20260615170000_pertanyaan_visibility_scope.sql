-- Scoped question visibility.
--
-- SEBELUM: semua user terautentikasi bisa lihat SEMUA pertanyaan di sistem.
-- SESUDAH: user hanya bisa lihat pertanyaan miliknya, proyeknya, atau (admin) semua.
--
-- Catatan: is_admin() di USING clause sudah cover admin visibility,
-- jadi satu policy cukup (dua SELECT policy di-OR-kan otomatis oleh Postgres).

DROP POLICY IF EXISTS "All users can view all questions" ON public.pertanyaan;

CREATE POLICY "Users can view own or accessible project questions"
  ON public.pertanyaan
  FOR SELECT
  USING (
    auth.uid() = id_pengguna
    OR public.is_admin()
    OR public.has_project_access(id_proyek)
  );
