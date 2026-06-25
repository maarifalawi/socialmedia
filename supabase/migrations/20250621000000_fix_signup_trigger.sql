-- Fix: buat trigger buat auto-insert row ke profil pas user baru daftar
-- Trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profil (id, nama_lengkap, peran, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama_lengkap', split_part(NEW.email, '@', 1)),
    'user'::app_role,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger: fires AFTER insert on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
