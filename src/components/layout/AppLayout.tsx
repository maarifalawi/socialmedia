import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarChart3, LogOut, User, Plus, Users, Menu, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "./Breadcrumbs";
import { ThemeToggle } from "@/components/ThemeToggle";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { 
    profile, 
    projects, 
    selectedProject, 
    setSelectedProject, 
    datasets, 
    activeDataset,
    setActiveDataset 
  } = useApp();
  
  const [unreadAnswersCount, setUnreadAnswersCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!user || profile?.peran === "admin") return;

    const fetchUnreadCount = async () => {
      try {
        const { data: answeredQuestions, error } = await supabase
          .from("pertanyaan")
          .select("id_pertanyaan, updated_at, rating")
          .eq("id_pengguna", user.id)
          .eq("status", "dijawab");

        if (error) throw error;

        const lastViewedKey = `bantuan_last_viewed_${user.id}`;
        const lastViewed = localStorage.getItem(lastViewedKey);
        const lastViewedDate = lastViewed ? new Date(lastViewed) : new Date(0);

        const unreadCount = answeredQuestions?.filter(q => 
          new Date(q.updated_at) > lastViewedDate && !q.rating
        ).length || 0;

        setUnreadAnswersCount(unreadCount);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();

    const channel = supabase
      .channel("answered_questions_notif")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "pertanyaan",
          filter: `id_pengguna=eq.${user.id}`,
        },
        (payload: any) => {
          if (payload.new.status === "dijawab" && payload.old.status === "menunggu") {
            fetchUnreadCount();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, profile]);

  useEffect(() => {
    if (location.pathname === "/bantuan" && user) {
      const lastViewedKey = `bantuan_last_viewed_${user.id}`;
      localStorage.setItem(lastViewedKey, new Date().toISOString());
      setUnreadAnswersCount(0);
    }
  }, [location.pathname, user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleCreateProject = () => navigate("/projects/new");
  const mobileNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActivePath = (paths: string[]) => paths.includes(location.pathname);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const NavDropdown = ({ label, paths, items }: { label: string; paths: string[]; items: { path: string; label: string }[] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`px-3 py-2 h-9 text-sm font-medium gap-1 ${isActivePath(paths) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          {label}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        {items.map(item => (
          <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)} className={location.pathname === item.path ? 'bg-accent' : ''}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MobileNavGroup = ({ title, items }: { title: string; items: { path: string; label: string }[] }) => (
    <AccordionItem value={title.toLowerCase()} className="border-none">
      <AccordionTrigger className="py-2.5 px-3 text-sm font-medium hover:no-underline hover:bg-accent rounded-lg">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pb-1 pt-0">
        <div className="space-y-0.5 ml-3">
          {items.map(item => (
            <button
              key={item.path}
              onClick={() => mobileNavigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === item.path 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 header-gradient backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-button">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold truncate hidden sm:block"
                style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Analytics Sosmed
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <NavLink to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" activeClassName="bg-accent text-foreground">
                Dashboard
              </NavLink>
              <NavLink to="/import" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" activeClassName="bg-accent text-foreground">
                Impor
              </NavLink>
              
              <NavDropdown 
                label="Analitik" 
                paths={['/performa', '/waktu-terbaik', '/audiens', '/ringkasan-insight']}
                items={[
                  { path: '/performa', label: 'Performa Konten' },
                  { path: '/waktu-terbaik', label: 'Waktu Terbaik' },
                  { path: '/audiens', label: 'Audiens' },
                  { path: '/ringkasan-insight', label: 'Ringkasan Insight' },
                ]}
              />

              <NavDropdown 
                label="Perencanaan" 
                paths={['/target-kpi', '/kampanye']}
                items={[
                  { path: '/target-kpi', label: 'Target KPI' },
                  { path: '/kampanye', label: 'Kampanye' },
                ]}
              />

              <NavDropdown 
                label="Alat" 
                paths={['/caption-generator', '/kompetitor-analysis']}
                items={[
                  { path: '/caption-generator', label: 'Caption AI' },
                  { path: '/kompetitor-analysis', label: 'Kompetitor' },
                ]}
              />

              <NavDropdown 
                label="Laporan" 
                paths={['/laporan', '/perbandingan']}
                items={[
                  { path: '/laporan', label: 'Laporan' },
                  { path: '/perbandingan', label: 'Perbandingan' },
                ]}
              />

              {profile?.peran !== "admin" && (
                <NavLink to="/bantuan" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative" activeClassName="bg-accent text-foreground">
                  <span className="flex items-center gap-1.5">
                    Bantuan
                    {unreadAnswersCount > 0 && (
                      <Badge variant="destructive" className="h-5 min-w-5 flex items-center justify-center text-[10px] px-1 rounded-full">
                        {unreadAnswersCount}
                      </Badge>
                    )}
                  </span>
                </NavLink>
              )}
              
              {profile?.peran === "admin" && (
                <NavDropdown 
                  label="Admin" 
                  paths={['/platform', '/bantuan-admin']}
                  items={[
                    { path: '/platform', label: 'Platform' },
                    { path: '/bantuan-admin', label: 'Kelola Q&A' },
                  ]}
                />
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              
              {/* Desktop User Menu */}
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[200px]">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{profile?.nama_lengkap || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-lg">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
                  <SheetHeader className="p-4 pb-2">
                    <SheetTitle className="text-left text-base">Menu</SheetTitle>
                    <SheetDescription className="text-left text-xs">Navigasi aplikasi</SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-80px)]">
                    <div className="px-3 pb-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl mb-4">
                        <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{profile?.nama_lengkap || "User"}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>

                      {/* Mobile Nav */}
                      <div className="space-y-0.5">
                        {[
                          { path: '/dashboard', label: 'Dashboard' },
                          { path: '/import', label: 'Impor Data' },
                        ].map(item => (
                          <button
                            key={item.path}
                            onClick={() => mobileNavigate(item.path)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              location.pathname === item.path 
                                ? 'bg-primary text-primary-foreground' 
                                : 'text-foreground hover:bg-accent'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <Separator className="my-3" />

                      <Accordion type="multiple" className="w-full">
                        <MobileNavGroup title="Analitik" items={[
                          { path: '/performa', label: 'Performa Konten' },
                          { path: '/waktu-terbaik', label: 'Waktu Terbaik' },
                          { path: '/audiens', label: 'Audiens' },
                          { path: '/ringkasan-insight', label: 'Ringkasan Insight' },
                        ]} />
                        <MobileNavGroup title="Perencanaan" items={[
                          { path: '/target-kpi', label: 'Target KPI' },
                          { path: '/kampanye', label: 'Kampanye' },
                        ]} />
                        <MobileNavGroup title="Alat" items={[
                          { path: '/caption-generator', label: 'Caption AI' },
                          { path: '/kompetitor-analysis', label: 'Kompetitor' },
                        ]} />
                        <MobileNavGroup title="Laporan" items={[
                          { path: '/laporan', label: 'Laporan' },
                          { path: '/perbandingan', label: 'Perbandingan' },
                        ]} />
                        {profile?.peran === "admin" && (
                          <MobileNavGroup title="Admin" items={[
                            { path: '/platform', label: 'Platform' },
                            { path: '/bantuan-admin', label: 'Kelola Q&A' },
                          ]} />
                        )}
                      </Accordion>

                      {profile?.peran !== "admin" && (
                        <>
                          <Separator className="my-3" />
                          <button
                            onClick={() => mobileNavigate('/bantuan')}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                              location.pathname === '/bantuan' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'text-foreground hover:bg-accent'
                            }`}
                          >
                            Bantuan
                            {unreadAnswersCount > 0 && (
                              <Badge variant="destructive" className="h-5 min-w-5 flex items-center justify-center text-[10px] px-1 rounded-full">
                                {unreadAnswersCount}
                              </Badge>
                            )}
                          </button>
                        </>
                      )}

                      <Separator className="my-3" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Project & Dataset Selectors */}
          {user && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2.5 border-t border-border/50">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-medium text-muted-foreground shrink-0 uppercase tracking-wider">Proyek</span>
                <Select
                  value={selectedProject?.id_proyek || ""}
                  onValueChange={(value) => {
                    const project = projects.find(p => p.id_proyek === value);
                    setSelectedProject(project || null);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[200px] h-8 text-xs">
                    <SelectValue placeholder="Pilih Proyek" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id_proyek} value={project.id_proyek}>
                        {project.nama_proyek}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm" variant="ghost" onClick={handleCreateProject} title="Buat Proyek Baru" className="h-8 w-8 p-0 shrink-0">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => navigate("/anggota-proyek")} title="Kelola Anggota" className="h-8 w-8 p-0 shrink-0">
                  <Users className="h-3.5 w-3.5" />
                </Button>
              </div>

              {selectedProject && datasets.length > 0 && (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground shrink-0 uppercase tracking-wider">Dataset</span>
                  <Select value={activeDataset?.id_dataset || ""} onValueChange={setActiveDataset}>
                    <SelectTrigger className="w-full sm:w-[200px] h-8 text-xs">
                      <SelectValue placeholder="Pilih Dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map((dataset) => (
                        <SelectItem key={dataset.id_dataset} value={dataset.id_dataset}>
                          {dataset.nama_dataset}
                          {dataset.dataset_aktif && " ✓"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6">
        <div className="mb-4">
          <Breadcrumbs />
        </div>
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
