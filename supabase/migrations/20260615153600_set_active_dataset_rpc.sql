-- RPC transaksional untuk mengatur dataset aktif.
-- Mengganti pola dua-UPDATE di client yang rawan state inkonsisten:
-- jika UPDATE kedua gagal, semua dataset bisa jadi non-aktif.
-- Di sini deactivate-all + activate-one berjalan dalam satu transaksi (fungsi).
--
-- SECURITY INVOKER: RLS pemanggil tetap berlaku, jadi user hanya bisa
-- mengubah dataset pada proyek yang memang ia punya akses.
CREATE OR REPLACE FUNCTION public.set_active_dataset(
  p_id_proyek uuid,
  p_id_dataset uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- Validasi: dataset harus milik proyek yang dimaksud
  IF NOT EXISTS (
    SELECT 1 FROM public.dataset
    WHERE id_dataset = p_id_dataset
      AND id_proyek = p_id_proyek
  ) THEN
    RAISE EXCEPTION 'Dataset % bukan bagian dari proyek %', p_id_dataset, p_id_proyek
      USING ERRCODE = 'check_violation';
  END IF;

  -- Non-aktifkan semua dataset proyek ini
  UPDATE public.dataset
  SET dataset_aktif = false
  WHERE id_proyek = p_id_proyek
    AND dataset_aktif = true;

  -- Aktifkan dataset terpilih
  UPDATE public.dataset
  SET dataset_aktif = true
  WHERE id_dataset = p_id_dataset
    AND id_proyek = p_id_proyek;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_active_dataset(uuid, uuid) TO authenticated;