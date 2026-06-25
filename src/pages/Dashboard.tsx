import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Users, Eye, Heart, Share2, Bookmark, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { InsightCard } from "@/components/InsightCard";
import { NotesDialog } from "@/components/NotesDialog";
import { ExportButton } from "@/components/ExportButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { InteractiveLineChart } from "@/components/charts/InteractiveLineChart";
import { InteractiveBarChart } from "@/components/charts/InteractiveBarChart";
import {
  computeKpi,
  weeklyEngagementTrend,
  platformDistribution,
  contentTypeDistribution,
} from "@/lib/analytics";
import { logAndToast } from "@/lib/errors";
import { EmptyState } from "@/components/EmptyState";
import { Inbox } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const { selectedProject, activeDataset, loading: appLoading } = useApp();
  
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const chartRef3 = useRef<HTMLDivElement>(null);
  
  const [kpiData, setKpiData] = useState({
    totalPosts: 0,
    avgER: 0,
    medianReach: 0,
    followersNow: 0,
    saveRate: 0,
    shareRate: 0
  });
  const [weeklyERTrend, setWeeklyERTrend] = useState<any[]>([]);
  const [platformDist, setPlatformDist] = useState<any[]>([]);
  const [contentTypeDist, setContentTypeDist] = useState<any[]>([]);
  const [insights, setInsights] = useState({
    erTrend: "",
    platform: "",
    contentType: ""
  });
  const [hasPosts, setHasPosts] = useState<boolean | null>(null);
  const [widgetVisibility, setWidgetVisibility] = useState({
    kpi: true,
    trends: true,
    platforms: true,
    content_types: true,
    insights: true,
  });

  // Load widget preferences
  useEffect(() => {
    if (profile?.preferensi_dashboard?.widgets) {
      const widgets = profile.preferensi_dashboard.widgets;
      setWidgetVisibility({
        kpi: widgets.includes('kpi'),
        trends: widgets.includes('trends'),
        platforms: widgets.includes('platforms'),
        content_types: widgets.includes('content_types'),
        insights: widgets.includes('insights'),
      });
    }
  }, [profile]);

  const toggleWidget = async (widget: keyof typeof widgetVisibility) => {
    const newVisibility = { ...widgetVisibility, [widget]: !widgetVisibility[widget] };
    setWidgetVisibility(newVisibility);

    const enabledWidgets = Object.keys(newVisibility).filter(
      (key) => newVisibility[key as keyof typeof newVisibility]
    );

    try {
      await supabase
        .from('profil')
        .update({
          preferensi_dashboard: {
            widgets: enabledWidgets,
            layout: 'default',
          },
        })
        .eq('id_profil', user?.id);
      toast.success("Pengaturan dashboard diperbarui!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!selectedProject || !activeDataset) return;

      try {
        const { data: posts, error } = await supabase
          .from("postingan")
          .select("*, platform(kode_platform, nama_platform), jenis_konten(kode_jenis_konten, nama_jenis_konten)")
          .eq("id_proyek", selectedProject.id_proyek)
          .eq("id_dataset", activeDataset.id_dataset)
          .order("waktu_diposting", { ascending: true });

        if (error) throw error;

        setHasPosts(!!posts && posts.length > 0);
        if (posts && posts.length > 0) {
          setKpiData(computeKpi(posts as any));

          const weeklyTrend = weeklyEngagementTrend(posts as any);
          setWeeklyERTrend(weeklyTrend);

          const platforms = platformDistribution(posts as any);
          setPlatformDist(platforms);

          const contentTypes = contentTypeDistribution(posts as any);
          setContentTypeDist(contentTypes);

          generateInsights(posts, weeklyTrend, platforms, contentTypes);
        }
      } catch (error) {
        logAndToast("Dashboard fetch", error, "Gagal memuat data dashboard");
      }
    };

    fetchDashboardData();
  }, [selectedProject, activeDataset]);

  const generateInsights = (
    posts: any[],
    weeklyData: any[],
    platformData: any[],
    contentTypeData: any[]
  ) => {
    let erTrendInsight = "";
    if (weeklyData.length >= 2) {
      const erFirst = weeklyData[0].avgER;
      const erLast = weeklyData[weeklyData.length - 1].avgER;
      
      if (erFirst === 0) {
        erTrendInsight = "Data awal belum cukup untuk menghitung tren engagement rate mingguan.";
      } else {
        const deltaPercent = ((erLast - erFirst) / erFirst) * 100;
        let trendCategory = deltaPercent > 10 ? "tren naik" : deltaPercent < -10 ? "tren turun" : "relatif stabil";
        erTrendInsight = `Engagement rate minggu pertama sebesar ${erFirst.toFixed(2)}% dan minggu terakhir ${erLast.toFixed(2)}%, menunjukkan ${trendCategory}.`;
      }
    }

    let platformInsight = "";
    if (platformData.length > 0) {
      const dominant = platformData[0];
      const totalPosts = posts.length;
      const dominantPercent = ((dominant.count / totalPosts) * 100).toFixed(1);
      platformInsight = `Platform ${dominant.name} mendominasi dengan ${dominantPercent}% dari total konten.`;
    }

    let contentTypeInsight = "";
    if (contentTypeData.length > 0) {
      const mostUsed = contentTypeData[0];
      const totalPosts = posts.length;
      const percentage = ((mostUsed.count / totalPosts) * 100).toFixed(1);
      contentTypeInsight = `Tipe konten ${mostUsed.name} paling sering digunakan dengan ${percentage}% dari total konten.`;
    }

    setInsights({
      erTrend: erTrendInsight,
      platform: platformInsight,
      contentType: contentTypeInsight
    });
  };

  if (authLoading || appLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24 mb-2" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!selectedProject) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-foreground text-lg">Belum ada project</p>
          <p className="text-muted-foreground">Silakan buat project baru untuk memulai</p>
        </div>
      </AppLayout>
    );
  }

  if (!activeDataset) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[520px] space-y-6 py-10">
          <svg
            width="320"
            height="220"
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            {/* Background card */}
            <rect x="20" y="20" width="280" height="180" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>

            {/* Bar chart bars */}
            <rect x="50" y="130" width="28" height="50" rx="6" fill="#94A3B8"/>
            <rect x="90" y="100" width="28" height="80" rx="6" fill="#60A5FA"/>
            <rect x="130" y="80" width="28" height="100" rx="6" fill="#34D399"/>
            <rect x="170" y="110" width="28" height="70" rx="6" fill="#F472B6"/>
            <rect x="210" y="70" width="28" height="110" rx="6" fill="#818CF8"/>
            <rect x="250" y="90" width="28" height="90" rx="6" fill="#FB923C"/>

            {/* Line chart on top */}
            <polyline
              points="64,115 104,88 144,68 184,98 224,58 264,78"
              stroke="#6366F1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots on line */}
            <circle cx="64" cy="115" r="4" fill="#6366F1"/>
            <circle cx="104" cy="88" r="4" fill="#6366F1"/>
            <circle cx="144" cy="68" r="4" fill="#6366F1"/>
            <circle cx="184" cy="98" r="4" fill="#6366F1"/>
            <circle cx="224" cy="58" r="4" fill="#6366F1"/>
            <circle cx="264" cy="78" r="4" fill="#6366F1"/>

            {/* Social media icons (simplified circles with letters) */}
            <circle cx="60" cy="40" r="14" fill="#1877F2" opacity="0.9"/>
            <text x="60" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">f</text>

            <circle cx="100" cy="40" r="14" fill="#E1306C" opacity="0.9"/>
            <text x="100" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">IG</text>

            <circle cx="140" cy="40" r="14" fill="#000000" opacity="0.85"/>
            <text x="140" y="45" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TT</text>

            <circle cx="180" cy="40" r="14" fill="#1DA1F2" opacity="0.9"/>
            <text x="180" y="45" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Tw</text>

            <circle cx="220" cy="40" r="14" fill="#FF0000" opacity="0.9"/>
            <text x="220" y="45" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">YT</text>

            {/* X axis line */}
            <line x1="40" y1="182" x2="295" y2="182" stroke="#CBD5E1" strokeWidth="1.5"/>
          </svg>

          <div className="text-center space-y-2">
            <p className="text-foreground text-lg font-semibold">Belum Ada Dataset Aktif</p>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Import data media sosial Anda dalam format CSV untuk mulai melihat analitik performa konten di sini.
            </p>
          </div>

          <Button
            onClick={() => navigate("/import")}
            className="mt-2"
          >
            Import Data Sekarang
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Ringkasan performa konten sosial media Anda
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Settings className="h-3.5 w-3.5 mr-1.5" />
                  Kustomisasi
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                   <DialogTitle>Kustomisasi Dashboard</DialogTitle>
                  <DialogDescription>Pilih widget yang ingin ditampilkan di dashboard</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  {Object.entries(widgetVisibility).map(([key, visible]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={visible}
                        onCheckedChange={() => toggleWidget(key as keyof typeof widgetVisibility)}
                      />
                      <label htmlFor={key} className="text-sm font-medium cursor-pointer">
                        {{ kpi: 'KPI', trends: 'Tren', platforms: 'Platform', content_types: 'Tipe Konten', insights: 'Insight' }[key] || key}
                      </label>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            {selectedProject && (
              <ExportButton
                projectId={selectedProject.id_proyek}
                pageName="Dashboard"
                data={[]}
                chartRefs={[chartRef1, chartRef2, chartRef3]}
                fileName="dashboard_overview"
              />
            )}
            <NotesDialog scope="global" />
          </div>
        </div>

        {hasPosts === false ? (
          <EmptyState
            icon={<Inbox className="h-10 w-10" />}
            title="Belum ada postingan di dataset ini"
            description="Import data postingan ke dataset aktif untuk melihat ringkasan performa."
            action={{ label: "Import Data", onClick: () => navigate("/import") }}
          />
        ) : (
        <>
        {/* KPI Cards */}
        {widgetVisibility.kpi && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Total Postingan", value: kpiData.totalPosts.toString(), icon: TrendingUp },
              { label: "Rata-rata ER", value: `${kpiData.avgER}%`, icon: Heart },
              { label: "Pengikut", value: kpiData.followersNow.toLocaleString(), icon: Users },
              { label: "Median Jangkauan", value: kpiData.medianReach.toLocaleString(), icon: Eye },
              { label: "Rasio Simpan", value: `${kpiData.saveRate}%`, icon: Bookmark },
              { label: "Rasio Bagikan", value: `${kpiData.shareRate}%`, icon: Share2 },
            ].map((kpi) => (
              <Card key={kpi.label} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{kpi.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Charts */}
        <div className="space-y-4 sm:space-y-6">
          {/* Tren ER — full width */}
          {widgetVisibility.trends && (
            <div ref={chartRef1}>
              <InteractiveLineChart
                data={weeklyERTrend}
                dataKey="avgER"
                xAxisKey="week"
                title="Tren Engagement Rate Mingguan"
                color="hsl(var(--primary))"
                unit="%"
                showBrush={weeklyERTrend.length > 5}
                showTrend={true}
              />
            </div>
          )}

          {/* Platform & Tipe Konten — side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {widgetVisibility.platforms && (
              <div ref={chartRef2}>
                <InteractiveBarChart
                  data={platformDist}
                  dataKey="count"
                  nameKey="name"
                  title="Distribusi Platform"
                  layout="horizontal"
                  showPercentage={true}
                />
              </div>
            )}

            {widgetVisibility.content_types && (
              <div ref={chartRef3}>
                <InteractiveBarChart
                  data={contentTypeDist}
                  dataKey="count"
                  nameKey="name"
                  title="Distribusi Tipe Konten"
                  layout="horizontal"
                  showPercentage={true}
                />
              </div>
            )}
          </div>
        </div>

        {/* Insights */}
        {widgetVisibility.insights && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.erTrend && <InsightCard insight={insights.erTrend} title="Tren Engagement Rate" />}
            {insights.platform && <InsightCard insight={insights.platform} title="Distribusi Platform" />}
            {insights.contentType && <InsightCard insight={insights.contentType} title="Distribusi Tipe Konten" />}
          </div>
        )}
        </>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
