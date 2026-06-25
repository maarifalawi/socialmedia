import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, TrendingUp, Users, Target, BarChart3, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ExportButton } from "@/components/ExportButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Platform {
  id_platform: string;
  nama_platform: string;
  kode_platform: string;
  warna_platform: string;
}

interface Competitor {
  id_kompetitor: string;
  nama_kompetitor: string;
  deskripsi_kompetitor: string;
  id_platform: string;
  handle_kompetitor: string;
  platform?: Platform;
}

interface CompetitorData {
  tanggal_data: string;
  jumlah_followers: number;
  rata_rata_engagement_rate: number;
  total_posts: number;
  rata_rata_likes: number;
}

interface CompetitorWithLatestData extends Competitor {
  latest_data?: {
    jumlah_followers: number;
    rata_rata_engagement_rate: number;
    total_posts: number;
    tanggal_data: string;
  };
}

const KompetitorAnalysis = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedProject } = useApp();
  const { toast } = useToast();
  
  const [competitors, setCompetitors] = useState<CompetitorWithLatestData[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(null);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [dataDialogOpen, setDataDialogOpen] = useState(false);
  const [selectedCompetitorForData, setSelectedCompetitorForData] = useState<Competitor | null>(null);
  const [competitorDataForm, setCompetitorDataForm] = useState({
    tanggal_data: new Date().toISOString().split('T')[0],
    jumlah_followers: '' as string | number,
    rata_rata_engagement_rate: '' as string | number,
    total_posts: '' as string | number,
    rata_rata_likes: '' as string | number,
    rata_rata_comments: '' as string | number,
    rata_rata_shares: '' as string | number,
  });
  
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const chartRef3 = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    nama_kompetitor: "",
    deskripsi_kompetitor: "",
    id_platform: "",
    handle_kompetitor: "",
  });

  

  useEffect(() => {
    fetchPlatforms();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchCompetitors();
    }
  }, [selectedProject]);

  const fetchPlatforms = async () => {
    const { data } = await supabase
      .from("platform")
      .select("*")
      .eq("platform_aktif", true)
      .order("nama_platform");
    if (data) setPlatforms(data);
  };

  const fetchCompetitors = async () => {
    if (!selectedProject) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("kompetitor")
        .select(`
          *,
          platform:id_platform (
            id_platform,
            nama_platform,
            kode_platform,
            warna_platform
          ),
          data_kompetitor (
            jumlah_followers,
            rata_rata_engagement_rate,
            total_posts,
            tanggal_data
          )
        `)
        .eq("id_proyek", selectedProject.id_proyek)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform data to include latest metrics
      const competitorsWithData = data?.map((comp: any) => {
        const latestData = comp.data_kompetitor?.sort((a: any, b: any) => 
          new Date(b.tanggal_data).getTime() - new Date(a.tanggal_data).getTime()
        )[0];
        
        return {
          ...comp,
          latest_data: latestData,
          data_kompetitor: undefined
        };
      }) || [];
      
      setCompetitors(competitorsWithData);
      
      if (data && data.length > 0) {
        await fetchComparisonData(data.map(c => c.id_kompetitor));
      }
    } catch (error) {
      console.error("Error fetching competitors:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data kompetitor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComparisonData = async (competitorIds: string[]) => {
    try {
      const { data, error } = await supabase
        .from("data_kompetitor")
        .select(`
          *,
          kompetitor:id_kompetitor (
            nama_kompetitor
          )
        `)
        .in("id_kompetitor", competitorIds)
        .order("tanggal_data", { ascending: true });

      if (error) throw error;
      
      // Group data by date for comparison
      const grouped: any = {};
      data?.forEach((item: any) => {
        const date = item.tanggal_data;
        if (!grouped[date]) {
          grouped[date] = { date };
        }
        const name = item.kompetitor.nama_kompetitor;
        grouped[date][`${name}_followers`] = item.jumlah_followers;
        grouped[date][`${name}_er`] = item.rata_rata_engagement_rate;
      });
      
      setComparisonData(Object.values(grouped));
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      if (editingCompetitor) {
        const { error } = await supabase
          .from("kompetitor")
          .update(formData)
          .eq("id_kompetitor", editingCompetitor.id_kompetitor);

        if (error) throw error;
        toast({ title: "Sukses", description: "Kompetitor berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("kompetitor")
          .insert([{ ...formData, id_proyek: selectedProject.id_proyek }]);

        if (error) throw error;
        toast({ title: "Sukses", description: "Kompetitor berhasil ditambahkan" });
      }

      setDialogOpen(false);
      resetForm();
      fetchCompetitors();
    } catch (error) {
      console.error("Error saving competitor:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan kompetitor",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus kompetitor ini?")) return;

    try {
      const { error } = await supabase
        .from("kompetitor")
        .delete()
        .eq("id_kompetitor", id);

      if (error) throw error;
      toast({ title: "Sukses", description: "Kompetitor berhasil dihapus" });
      fetchCompetitors();
    } catch (error) {
      console.error("Error deleting competitor:", error);
      toast({
        title: "Error",
        description: "Gagal menghapus kompetitor",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (competitor: Competitor) => {
    setEditingCompetitor(competitor);
    setFormData({
      nama_kompetitor: competitor.nama_kompetitor,
      deskripsi_kompetitor: competitor.deskripsi_kompetitor || "",
      id_platform: competitor.id_platform || "",
      handle_kompetitor: competitor.handle_kompetitor || "",
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nama_kompetitor: "",
      deskripsi_kompetitor: "",
      id_platform: platforms[0]?.id_platform || "",
      handle_kompetitor: "",
    });
    setEditingCompetitor(null);
  };

  const handleAddData = (competitor: Competitor) => {
    setSelectedCompetitorForData(competitor);
    setCompetitorDataForm({
      tanggal_data: new Date().toISOString().split('T')[0],
      jumlah_followers: '',
      rata_rata_engagement_rate: '',
      total_posts: '',
      rata_rata_likes: '',
      rata_rata_comments: '',
      rata_rata_shares: '',
    });
    setDataDialogOpen(true);
  };

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompetitorForData) return;

    try {
      const { error } = await supabase
        .from("data_kompetitor")
        .insert([{
          id_kompetitor: selectedCompetitorForData.id_kompetitor,
          tanggal_data: competitorDataForm.tanggal_data,
          jumlah_followers: Number(competitorDataForm.jumlah_followers) || 0,
          rata_rata_engagement_rate: Number(competitorDataForm.rata_rata_engagement_rate) || 0,
          total_posts: Number(competitorDataForm.total_posts) || 0,
          rata_rata_likes: Number(competitorDataForm.rata_rata_likes) || 0,
          rata_rata_comments: Number(competitorDataForm.rata_rata_comments) || 0,
          rata_rata_shares: Number(competitorDataForm.rata_rata_shares) || 0,
        }]);

      if (error) throw error;

      toast({
        title: "Sukses",
        description: "Data kompetitor berhasil ditambahkan",
      });

      setDataDialogOpen(false);
      fetchCompetitors();
    } catch (error) {
      console.error("Error saving competitor data:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data kompetitor",
        variant: "destructive",
      });
    }
  };

  if (!selectedProject) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Pilih proyek terlebih dahulu</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analisis Kompetitor</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Bandingkan performa Anda dengan kompetitor
            </p>
          </div>
          <div className="flex gap-2">
            {competitors.length > 0 && (
              <ExportButton
                projectId={selectedProject.id_proyek}
                pageName="Analisis Kompetitor"
                data={comparisonData}
                chartRefs={[chartRef1, chartRef2, chartRef3]}
                fileName="competitor_analysis"
              />
            )}
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Kompetitor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCompetitor ? "Edit Kompetitor" : "Tambah Kompetitor Baru"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nama">Nama Kompetitor</Label>
                    <Input
                      id="nama"
                      value={formData.nama_kompetitor}
                      onChange={(e) => setFormData({ ...formData, nama_kompetitor: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select
                      value={formData.id_platform}
                      onValueChange={(value) => setFormData({ ...formData, id_platform: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p.id_platform} value={p.id_platform}>
                            {p.nama_platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="handle">Handle/Username</Label>
                    <Input
                      id="handle"
                      value={formData.handle_kompetitor}
                      onChange={(e) => setFormData({ ...formData, handle_kompetitor: e.target.value })}
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea
                      id="deskripsi"
                      value={formData.deskripsi_kompetitor}
                      onChange={(e) => setFormData({ ...formData, deskripsi_kompetitor: e.target.value })}
                      placeholder="Catatan tentang kompetitor..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">
                      {editingCompetitor ? "Perbarui" : "Tambah"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Memuat...</p>
          </div>
        ) : competitors.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum Ada Kompetitor</h3>
              <p className="text-muted-foreground mb-4">
                Tambahkan kompetitor untuk mulai analisis perbandingan
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Kompetitor Pertama
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {competitors.map((competitor) => (
                <Card key={competitor.id_kompetitor}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{competitor.nama_kompetitor}</CardTitle>
                        <CardDescription className="capitalize">
                          {competitor.platform?.nama_platform || "—"}
                          {competitor.handle_kompetitor && ` • ${competitor.handle_kompetitor}`}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(competitor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(competitor.id_kompetitor)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {competitor.deskripsi_kompetitor && (
                      <p className="text-sm text-muted-foreground">
                        {competitor.deskripsi_kompetitor}
                      </p>
                    )}
                    
                    {competitor.latest_data ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Pengikut</span>
                          <span className="font-semibold">{competitor.latest_data.jumlah_followers.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Engagement Rate</span>
                          <span className="font-semibold">{competitor.latest_data.rata_rata_engagement_rate}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Postingan</span>
                          <span className="font-semibold">{competitor.latest_data.total_posts}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Diperbarui: {new Date(competitor.latest_data.tanggal_data).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-3">Belum ada data</p>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleAddData(competitor)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Data
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Data Dialog */}
            <Dialog open={dataDialogOpen} onOpenChange={setDataDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Tambah Data - {selectedCompetitorForData?.nama_kompetitor}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitData} className="space-y-4">
                  <div>
                    <Label htmlFor="tanggal">Tanggal Data</Label>
                    <Input
                      id="tanggal"
                      type="date"
                      value={competitorDataForm.tanggal_data}
                      onChange={(e) => setCompetitorDataForm({ ...competitorDataForm, tanggal_data: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="followers">Pengikut</Label>
                      <Input
                        id="followers"
                        type="number"
                        value={competitorDataForm.jumlah_followers}
                        placeholder="0"
                        onChange={(e) => setCompetitorDataForm({ ...competitorDataForm, jumlah_followers: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="er">Engagement Rate (%)</Label>
                      <Input
                        id="er"
                        type="number"
                        step="0.01"
                        value={competitorDataForm.rata_rata_engagement_rate}
                        placeholder="0"
                        onChange={(e) => setCompetitorDataForm({ ...competitorDataForm, rata_rata_engagement_rate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="posts">Total Postingan</Label>
                      <Input
                        id="posts"
                        type="number"
                        value={competitorDataForm.total_posts}
                        placeholder="0"
                        onChange={(e) => setCompetitorDataForm({ ...competitorDataForm, total_posts: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="likes">Rata-rata Suka</Label>
                      <Input
                        id="likes"
                        type="number"
                        value={competitorDataForm.rata_rata_likes}
                        placeholder="0"
                        onChange={(e) => setCompetitorDataForm({ ...competitorDataForm, rata_rata_likes: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setDataDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Comparison Charts */}
            {comparisonData.length > 0 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Perbandingan Followers</CardTitle>
                    <CardDescription>
                      Tren pertumbuhan followers antar kompetitor
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div ref={chartRef1} className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}rb` : v} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background))' }}
                            formatter={(value: number, name: string) => [value.toLocaleString(), name.replace('_followers', '')]}
                            labelFormatter={(label) => `Tanggal: ${label}`}
                          />
                          <Legend 
                            formatter={(value) => value.replace('_followers', '')}
                            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
                          />
                          {competitors.map((comp, idx) => {
                            const CHART_COLORS = [
                              'hsl(210, 80%, 55%)', 'hsl(340, 75%, 55%)', 'hsl(160, 65%, 45%)',
                              'hsl(45, 90%, 50%)', 'hsl(270, 65%, 55%)', 'hsl(15, 80%, 55%)'
                            ];
                            return (
                              <Line
                                key={comp.id_kompetitor}
                                type="monotone"
                                dataKey={`${comp.nama_kompetitor}_followers`}
                                name={comp.nama_kompetitor}
                                stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                                strokeWidth={2.5}
                                dot={{ r: 4, strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                                animationDuration={800}
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Perbandingan Engagement Rate</CardTitle>
                    <CardDescription>
                      Tren engagement rate antar kompetitor
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div ref={chartRef2} className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis unit="%" tick={{ fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background))' }}
                            formatter={(value: number, name: string) => [`${Number(value).toFixed(2)}%`, name.replace(' ER%', '')]}
                            labelFormatter={(label) => `Tanggal: ${label}`}
                          />
                          <Legend 
                            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
                          />
                          {competitors.map((comp, idx) => {
                            const CHART_COLORS = [
                              'hsl(210, 80%, 55%)', 'hsl(340, 75%, 55%)', 'hsl(160, 65%, 45%)',
                              'hsl(45, 90%, 50%)', 'hsl(270, 65%, 55%)', 'hsl(15, 80%, 55%)'
                            ];
                            return (
                              <Bar
                                key={comp.id_kompetitor}
                                dataKey={`${comp.nama_kompetitor}_er`}
                                name={`${comp.nama_kompetitor} ER%`}
                                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                                radius={[4, 4, 0, 0]}
                                animationDuration={800}
                              />
                            );
                          })}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default KompetitorAnalysis;
