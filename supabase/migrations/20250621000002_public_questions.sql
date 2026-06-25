-- Ubah policy pertanyaan: semua user yang login bisa lihat semua pertanyaan
DROP POLICY IF EXISTS "Users can view own or accessible project questions" ON pertanyaan;
DROP POLICY IF EXISTS "Admins can view all questions" ON pertanyaan;

CREATE POLICY "Authenticated users can view all questions"
  ON pertanyaan
  FOR SELECT
  USING (auth.role() = 'authenticated');
