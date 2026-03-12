import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center animate-fade-in max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 className="text-7xl font-bold text-foreground tracking-tight mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-2">Halaman tidak ditemukan</p>
        <p className="text-sm text-muted-foreground mb-8">
          Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
        </p>
        <Button onClick={() => navigate("/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
