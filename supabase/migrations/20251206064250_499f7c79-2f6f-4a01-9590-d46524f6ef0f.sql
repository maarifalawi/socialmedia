-- Add 'admin' role to project_role enum
ALTER TYPE project_role ADD VALUE IF NOT EXISTS 'admin' AFTER 'owner';