import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { NotificationProvider } from "./contexts/NotificationContext";
import { Skeleton } from "@/components/ui/skeleton";
import Auth from "./pages/Auth";

const PageSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  </div>
);

const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
);

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Import = lazy(() => import("./pages/Import"));
const Performa = lazy(() => import("./pages/Performa"));
const WaktuTerbaik = lazy(() => import("./pages/WaktuTerbaik"));
const Audiens = lazy(() => import("./pages/Audiens"));
const Laporan = lazy(() => import("./pages/Laporan"));
const Platform = lazy(() => import("./pages/Platform"));
const Perbandingan = lazy(() => import("./pages/Perbandingan"));
const RingkasanInsight = lazy(() => import("./pages/RingkasanInsight"));
const ProjectNew = lazy(() => import("./pages/ProjectNew"));
const Bantuan = lazy(() => import("./pages/Bantuan"));
const BantuanAdmin = lazy(() => import("./pages/BantuanAdmin"));
const AdminTest = lazy(() => import("./pages/AdminTest"));
const TargetKPI = lazy(() => import("./pages/TargetKPI"));
const Kampanye = lazy(() => import("./pages/Kampanye"));
const CaptionGenerator = lazy(() => import("./pages/CaptionGenerator"));
const KompetitorAnalysis = lazy(() => import("./pages/KompetitorAnalysis"));
const AnggotaProyek = lazy(() => import("./pages/AnggotaProyek"));
const SDDReport = lazy(() => import("./pages/SDDReport"));
const UATReport = lazy(() => import("./pages/UATReport"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="analytics-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AuthProvider>
              <AppProvider>
                <NotificationProvider>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<ProtectedRoute><LazyPage><Dashboard /></LazyPage></ProtectedRoute>} />
                    <Route path="/import" element={<ProtectedRoute><LazyPage><Import /></LazyPage></ProtectedRoute>} />
                    <Route path="/performa" element={<ProtectedRoute><LazyPage><Performa /></LazyPage></ProtectedRoute>} />
                    <Route path="/waktu-terbaik" element={<ProtectedRoute><LazyPage><WaktuTerbaik /></LazyPage></ProtectedRoute>} />
                    <Route path="/audiens" element={<ProtectedRoute><LazyPage><Audiens /></LazyPage></ProtectedRoute>} />
                    <Route path="/laporan" element={<ProtectedRoute><LazyPage><Laporan /></LazyPage></ProtectedRoute>} />
                    <Route path="/platform" element={<AdminRoute><LazyPage><Platform /></LazyPage></AdminRoute>} />
                    <Route path="/perbandingan" element={<ProtectedRoute><LazyPage><Perbandingan /></LazyPage></ProtectedRoute>} />
                    <Route path="/ringkasan-insight" element={<ProtectedRoute><LazyPage><RingkasanInsight /></LazyPage></ProtectedRoute>} />
                    <Route path="/projects/new" element={<ProtectedRoute><LazyPage><ProjectNew /></LazyPage></ProtectedRoute>} />
                    <Route path="/bantuan" element={<ProtectedRoute><LazyPage><Bantuan /></LazyPage></ProtectedRoute>} />
                    <Route path="/bantuan-admin" element={<AdminRoute><LazyPage><BantuanAdmin /></LazyPage></AdminRoute>} />
                    <Route path="/target-kpi" element={<ProtectedRoute><LazyPage><TargetKPI /></LazyPage></ProtectedRoute>} />
                    <Route path="/kampanye" element={<ProtectedRoute><LazyPage><Kampanye /></LazyPage></ProtectedRoute>} />
                    <Route path="/caption-generator" element={<ProtectedRoute><LazyPage><CaptionGenerator /></LazyPage></ProtectedRoute>} />
                    <Route path="/kompetitor-analysis" element={<ProtectedRoute><LazyPage><KompetitorAnalysis /></LazyPage></ProtectedRoute>} />
                    <Route path="/anggota-proyek" element={<ProtectedRoute><LazyPage><AnggotaProyek /></LazyPage></ProtectedRoute>} />
                    <Route path="/admin-test" element={<AdminRoute><LazyPage><AdminTest /></LazyPage></AdminRoute>} />
                    <Route path="/sdd-report" element={<ProtectedRoute><LazyPage><SDDReport /></LazyPage></ProtectedRoute>} />
                    <Route path="/uat-report" element={<ProtectedRoute><LazyPage><UATReport /></LazyPage></ProtectedRoute>} />
                    <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
                  </Routes>
                </NotificationProvider>
              </AppProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
