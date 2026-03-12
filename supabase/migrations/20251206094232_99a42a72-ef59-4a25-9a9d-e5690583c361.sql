-- Drop the accept_invitation function
DROP FUNCTION IF EXISTS public.accept_invitation(uuid);

-- Drop the undangan_proyek table (this will also drop its RLS policies)
DROP TABLE IF EXISTS public.undangan_proyek;