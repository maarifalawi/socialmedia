import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";

/**
 * Layar loading saat status auth/profil masih diverifikasi.
 * Mencegah flash konten privat sebelum sesi terkonfirmasi.
 */
const AuthGate = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-3"
    style={{ background: "var(--gradient-page)" }}
    role="status"
    aria-live="polite"
  >
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">Memverifikasi sesi...</p>
  </div>
);

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Guard rute privat. Menunggu auth selesai loading, lalu:
 * - redirect ke /auth jika tidak ada sesi (menyimpan lokasi asal untuk redirect balik)
 * - render konten jika sesi valid
 *
 * Catatan keamanan: ini hanya guard di sisi UX. Keamanan data sebenarnya
 * dijamin oleh RLS di database, bukan oleh komponen ini.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AuthGate />;

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

/**
 * Guard rute khusus admin. Selain butuh sesi valid, butuh profile.peran === 'admin'.
 * Menunggu profil termuat sebelum memutuskan agar tidak salah menendang admin.
 *
 * Catatan keamanan: gating ini murni UX. Endpoint/tabel admin tetap wajib
 * dilindungi is_admin() di level RLS.
 */
export const AdminRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { profile, loading: appLoading } = useApp();

  if (loading || appLoading) return <AuthGate />;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Profil belum termuat: tunggu agar tidak salah memutuskan peran
  if (!profile) return <AuthGate />;

  // Bukan admin → tendang ke dashboard
  if (profile.peran !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
