-- Create invitation status enum
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired', 'cancelled');

-- Create project invitations table
CREATE TABLE public.undangan_proyek (
  id_undangan UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  id_proyek UUID NOT NULL REFERENCES public.proyek(id_proyek) ON DELETE CASCADE,
  email TEXT NOT NULL,
  peran_undangan project_role NOT NULL DEFAULT 'viewer',
  token UUID NOT NULL DEFAULT gen_random_uuid(),
  status invitation_status NOT NULL DEFAULT 'pending',
  diundang_oleh UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(id_proyek, email, status)
);

-- Enable RLS
ALTER TABLE public.undangan_proyek ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view invitations for accessible projects"
ON public.undangan_proyek
FOR SELECT
USING (has_project_access(id_proyek) OR email = (SELECT auth.jwt() ->> 'email'));

CREATE POLICY "Project owners and admins can create invitations"
ON public.undangan_proyek
FOR INSERT
WITH CHECK (
  has_project_access(id_proyek) AND
  diundang_oleh = auth.uid()
);

CREATE POLICY "Project owners can manage invitations"
ON public.undangan_proyek
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM proyek
    WHERE proyek.id_proyek = undangan_proyek.id_proyek
    AND proyek.id_pemilik = auth.uid()
  )
);

CREATE POLICY "Project owners can delete invitations"
ON public.undangan_proyek
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM proyek
    WHERE proyek.id_proyek = undangan_proyek.id_proyek
    AND proyek.id_pemilik = auth.uid()
  )
);

-- Create index for faster lookups
CREATE INDEX idx_undangan_proyek_email ON public.undangan_proyek(email);
CREATE INDEX idx_undangan_proyek_token ON public.undangan_proyek(token);
CREATE INDEX idx_undangan_proyek_status ON public.undangan_proyek(status);

-- Function to accept invitation and add member
CREATE OR REPLACE FUNCTION public.accept_invitation(invitation_token UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invitation RECORD;
  v_user_id UUID;
  v_user_email TEXT;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  v_user_email := (SELECT auth.jwt() ->> 'email');
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'User not authenticated');
  END IF;
  
  -- Find the invitation
  SELECT * INTO v_invitation
  FROM undangan_proyek
  WHERE token = invitation_token
  AND status = 'pending'
  AND expires_at > now();
  
  IF v_invitation IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invitation not found, expired, or already used');
  END IF;
  
  -- Check if email matches
  IF v_invitation.email != v_user_email THEN
    RETURN jsonb_build_object('success', false, 'message', 'This invitation is for a different email address');
  END IF;
  
  -- Check if already a member
  IF EXISTS (
    SELECT 1 FROM anggota_proyek
    WHERE id_proyek = v_invitation.id_proyek
    AND id_pengguna = v_user_id
  ) THEN
    -- Update invitation status anyway
    UPDATE undangan_proyek
    SET status = 'accepted', accepted_at = now()
    WHERE id_undangan = v_invitation.id_undangan;
    
    RETURN jsonb_build_object('success', true, 'message', 'You are already a member of this project', 'already_member', true);
  END IF;
  
  -- Add user as project member
  INSERT INTO anggota_proyek (id_proyek, id_pengguna, peran_dalam_proyek)
  VALUES (v_invitation.id_proyek, v_user_id, v_invitation.peran_undangan);
  
  -- Update invitation status
  UPDATE undangan_proyek
  SET status = 'accepted', accepted_at = now()
  WHERE id_undangan = v_invitation.id_undangan;
  
  RETURN jsonb_build_object('success', true, 'message', 'Successfully joined the project', 'id_proyek', v_invitation.id_proyek);
END;
$$;