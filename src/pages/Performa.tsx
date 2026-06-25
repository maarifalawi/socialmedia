import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { InsightCard } from "@/components/InsightCard";
import { SaveFilterDialog } from "@/components/SaveFilterDialog";
import { NotesDialog } from "@/components/NotesDialog";
import { ExportButton } from "@/components/ExportButton";
import { EmptyState } from "@/components/EmptyState";
import { Inbox } from "lucide-react";

// Paginated Table Component
const PaginatedPostTable = ({ posts, getPerformanceBadge }: { posts: any[]; getPerformanceBadge: (post: any) => React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = rowsPerPage === -1 ? 1 : Math.ceil(posts.length / rowsPerPage);
  const displayedPosts = rowsPerPage === -1 ? posts : posts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Reset page when posts change
  useEffect(() => { setCurrentPage(1); }, [posts.length, rowsPerPage]);

  return (
    <div className="space-y-4">
      {/* Desktop / tablet: table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Postingan</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead className="text-right">Jangkauan</TableHead>
              <TableHead className="text-right">Suka</TableHead>
              <TableHead className="text-right">Komentar</TableHead>
              <TableHead className="text-right">Bagikan</TableHead>
              <TableHead className="text-right">ER%</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPosts.map((post) => (
              <TableRow key={post.id_postingan}>
                <TableCell className="font-medium">{post.kode_postingan}</TableCell>
                <TableCell>{post.platform?.nama_platform}</TableCell>
                <TableCell>{format(new Date(post.waktu_diposting), "dd/MM/yy HH:mm")}</TableCell>
                <TableCell>{post.jenis_konten?.nama_jenis_konten}</TableCell>
                <TableCell className="max-w-[200px] truncate">{post.teks_caption}</TableCell>
                <TableCell className="text-right">{post.jumlah_reach.toLocaleString()}</TableCell>
                <TableCell className="text-right">{post.jumlah_likes.toLocaleString()}</TableCell>
                <TableCell className="text-right">{post.jumlah_komentar.toLocaleString()}</TableCell>
                <TableCell className="text-right">{post.jumlah_shares.toLocaleString()}</TableCell>
                <TableCell className="text-right">{(post.engagement_rate_persen || 0).toFixed(2)}%</TableCell>
                <TableCell>{getPerformanceBadge(post)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: card list */}
      <div className="md:hidden space-y-3">
        {displayedPosts.map((post) => (
          <div
            key={post.id_postingan}
            className="rounded-lg border border-border bg-card p-3 shadow-sm space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {post.kode_postingan}
                </p>
                <p className="text-xs text-muted-foreground">
                  {post.platform?.nama_platform} • {post.jenis_konten?.nama_jenis_konten}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(post.waktu_diposting), "dd/MM/yy HH:mm")}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">ER</p>
                <p className="text-base font-bold text-primary">
                  {(post.engagement_rate_persen || 0).toFixed(2)}%
                </p>
                {getPerformanceBadge(post)}
              </div>
            </div>
            {post.teks_caption && (
              <p className="text-xs text-muted-foreground line-clamp-2">{post.teks_caption}</p>
            )}
            <div className="grid grid-cols-4 gap-2 text-xs pt-1 border-t border-border">
              <div>
                <p className="text-muted-foreground">Jangkauan</p>
                <p className="font-medium text-foreground">{post.jumlah_reach.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Suka</p>
                <p className="font-medium text-foreground">{post.jumlah_likes.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Komentar</p>
                <p className="font-medium text-foreground">{post.jumlah_komentar.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Bagikan</p>
                <p className="font-medium text-foreground">{post.jumlah_shares.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Tampilkan</span>
          <Select value={rowsPerPage.toString()} onValueChange={(val) => setRowsPerPage(parseInt(val))}>
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="-1">Semua</SelectItem>
            </SelectContent>
          </Select>
          <span>dari {posts.length} baris</span>
        </div>

        {rowsPerPage !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, idx, arr) => (
                <span key={page} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== page - 1 && <span className="px-1 text-muted-foreground">...</span>}
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                </span>
              ))
            }
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

type SortBy = "er" | "reach" | "engagement";

const Performa = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { selectedProject, activeDataset } = useApp();
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("er");
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minReach, setMinReach] = useState("");
  const [searchCaption, setSearchCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [contentTypes, setContentTypes] = useState<any[]>([]);
  const [insight, setInsight] = useState("");

  

  useEffect(() => {
    const fetchMasterData = async () => {
      const { data: platformData } = await supabase
        .from("platform")
        .select("*")
        .eq("platform_aktif", true);
      const { data: contentTypeData } = await supabase
        .from("jenis_konten")
        .select("*")
        .eq("jenis_konten_aktif", true);
      
      setPlatforms(platformData || []);
      setContentTypes(contentTypeData || []);
      
      if (platformData) {
        setSelectedPlatforms(platformData.map(p => p.id_platform));
      }
      if (contentTypeData) {
        setSelectedContentTypes(contentTypeData.map(c => c.id_jenis_konten));
      }
    };

    fetchMasterData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedProject || !activeDataset) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("postingan")
          .select("*, platform(kode_platform, nama_platform), jenis_konten(kode_jenis_konten, nama_jenis_konten)")
          .eq("id_proyek", selectedProject.id_proyek)
          .eq("id_dataset", activeDataset.id_dataset)
          .order("waktu_diposting", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Gagal memuat data performa");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedProject, activeDataset]);

  useEffect(() => {
    let filtered = [...posts];

    // Apply filters
    if (dateFrom) {
      filtered = filtered.filter(p => new Date(p.waktu_diposting) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(p => new Date(p.waktu_diposting) <= new Date(dateTo));
    }
    if (minReach) {
      filtered = filtered.filter(p => p.jumlah_reach >= parseInt(minReach));
    }
    if (searchCaption) {
      filtered = filtered.filter(p => 
        p.teks_caption?.toLowerCase().includes(searchCaption.toLowerCase())
      );
    }
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(p => selectedPlatforms.includes(p.id_platform));
    }
    if (selectedContentTypes.length > 0) {
      filtered = filtered.filter(p => selectedContentTypes.includes(p.id_jenis_konten));
    }

    // Apply sorting
    if (sortBy === "er") {
      filtered.sort((a, b) => (b.engagement_rate_persen || 0) - (a.engagement_rate_persen || 0));
    } else if (sortBy === "reach") {
      filtered.sort((a, b) => b.jumlah_reach - a.jumlah_reach);
    } else if (sortBy === "engagement") {
      filtered.sort((a, b) => (b.total_engagement || 0) - (a.total_engagement || 0));
    }

    setFilteredPosts(filtered);
    generateInsight(filtered, sortBy);
  }, [posts, dateFrom, dateTo, minReach, searchCaption, selectedPlatforms, selectedContentTypes, sortBy]);

  const generateInsight = (allPosts: any[], currentSortBy: SortBy) => {
    if (allPosts.length === 0) {
      setInsight("");
      return;
    }

    const top5 = allPosts.slice(0, 5);
    
    const platformCount = new Map<string, number>();
    const contentTypeCount = new Map<string, number>();
    
    top5.forEach(post => {
      const platform = post.platform?.nama_platform || "Tidak Diketahui";
      const contentType = post.jenis_konten?.nama_jenis_konten || "Tidak Diketahui";
      platformCount.set(platform, (platformCount.get(platform) || 0) + 1);
      contentTypeCount.set(contentType, (contentTypeCount.get(contentType) || 0) + 1);
    });
    
    const topPlatform = Array.from(platformCount.entries()).sort((a, b) => b[1] - a[1])[0];
    const topContentType = Array.from(contentTypeCount.entries()).sort((a, b) => b[1] - a[1])[0];

    let insightText = "";

    if (currentSortBy === "er") {
      const erTop5Avg = top5.reduce((sum, p) => sum + (p.engagement_rate_persen || 0), 0) / top5.length;
      const erAllAvg = allPosts.reduce((sum, p) => sum + (p.engagement_rate_persen || 0), 0) / allPosts.length;
      const diff = ((erTop5Avg - erAllAvg) / erAllAvg) * 100;
      
      insightText = `Konten dengan engagement rate tertinggi didominasi oleh platform ${topPlatform[0]} (${topPlatform[1]} dari 5 teratas) dan tipe konten ${topContentType[0]} (${topContentType[1]} dari 5 teratas). `;
      insightText += `Rata-rata ER top 5 adalah ${erTop5Avg.toFixed(2)}%, ${diff > 0 ? 'lebih tinggi' : 'lebih rendah'} ${Math.abs(diff).toFixed(1)}% dari rata-rata keseluruhan (${erAllAvg.toFixed(2)}%). `;
      insightText += `Kombinasi ${topPlatform[0]} dengan format ${topContentType[0]} paling efektif untuk mendorong engagement tinggi.`;
    } else if (currentSortBy === "reach") {
      const reachTop5Avg = top5.reduce((sum, p) => sum + (p.jumlah_reach || 0), 0) / top5.length;
      const erTop5Avg = top5.reduce((sum, p) => sum + (p.engagement_rate_persen || 0), 0) / top5.length;
      const erAllAvg = allPosts.reduce((sum, p) => sum + (p.engagement_rate_persen || 0), 0) / allPosts.length;
      const erDiff = erTop5Avg - erAllAvg;
      
      insightText = `Konten dengan jangkauan terluas didominasi oleh ${topPlatform[0]} (${topPlatform[1]} dari 5 teratas) dan ${topContentType[0]} (${topContentType[1]} dari 5 teratas) dengan rata-rata reach ${reachTop5Avg.toLocaleString()}. `;
      
      if (Math.abs(erDiff) < 0.5) {
        insightText += `ER-nya mirip dengan rata-rata (${erTop5Avg.toFixed(2)}% vs ${erAllAvg.toFixed(2)}%), menunjukkan keseimbangan antara luas jangkauan dan kualitas interaksi.`;
      } else if (erDiff > 0) {
        insightText += `ER-nya bahkan di atas rata-rata (${erTop5Avg.toFixed(2)}% vs ${erAllAvg.toFixed(2)}%), menunjukkan jangkauan luas dengan interaksi berkualitas.`;
      } else {
        insightText += `Namun ER-nya di bawah rata-rata (${erTop5Avg.toFixed(2)}% vs ${erAllAvg.toFixed(2)}%), menunjukkan jangkauan luas namun interaksi relatif lebih rendah.`;
      }
    } else {
      insightText = `Konten dengan total engagement tertinggi (likes + comments + shares + saved) didominasi ${topPlatform[0]} (${topPlatform[1]} dari 5 teratas) dan ${topContentType[0]} (${topContentType[1]} dari 5 teratas). `;
      insightText += `Grup ini berisi konten dengan jumlah aksi tertinggi dari audiens. Format dan tema di grup ini sangat cocok dijadikan referensi untuk konten yang paling engaging di masa depan.`;
    }

    setInsight(insightText);
  };

  const handleExport = () => {
    const csv = [
      ["ID Postingan", "Platform", "Tanggal", "Tipe", "Caption", "Jangkauan", "Tayangan", "Suka", "Komentar", "Bagikan", "Simpan", "Engagement", "ER%"],
      ...filteredPosts.map(p => [
        p.kode_postingan,
        p.platform?.nama_platform || "",
        format(new Date(p.waktu_diposting), "yyyy-MM-dd HH:mm"),
        p.jenis_konten?.nama_jenis_konten || "",
        p.teks_caption || "",
        p.jumlah_reach,
        p.jumlah_views,
        p.jumlah_likes,
        p.jumlah_komentar,
        p.jumlah_shares,
        p.jumlah_saved,
        p.total_engagement || 0,
        (p.engagement_rate_persen || 0).toFixed(2)
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `performa-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    toast.success("Data berhasil diekspor");
  };

  const getPerformanceBadge = (post: any) => {
    if (!posts.length) return null;
    const sortedByER = [...posts].sort((a, b) => (b.engagement_rate_persen || 0) - (a.engagement_rate_persen || 0));
    const index = sortedByER.findIndex(p => p.id_postingan === post.id_postingan);
    const percentile = (index / sortedByER.length) * 100;

    if (percentile <= 10) {
      return <Badge className="bg-success text-success-foreground">Top 10%</Badge>;
    } else if (percentile >= 90) {
      return <Badge variant="destructive">Bottom 10%</Badge>;
    }
    return null;
  };

  if (!selectedProject || !activeDataset) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-foreground text-lg">Silakan pilih project dan dataset</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Performa Konten</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Analisis performa setiap postingan</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {selectedProject && filteredPosts.length > 0 && (
              <ExportButton
                projectId={selectedProject.id_proyek}
                pageName="Performa Konten"
                data={filteredPosts.map(p => ({
                  kode_postingan: p.kode_postingan,
                  waktu_diposting: format(new Date(p.waktu_diposting), "dd/MM/yyyy HH:mm"),
                  platform: p.platform?.nama_platform,
                  jenis_konten: p.jenis_konten?.nama_jenis_konten,
                  caption: p.teks_caption,
                  reach: p.jumlah_reach,
                  views: p.jumlah_views,
                  likes: p.jumlah_likes,
                  comments: p.jumlah_komentar,
                  shares: p.jumlah_shares,
                  saved: p.jumlah_saved,
                  total_engagement: p.total_engagement,
                  engagement_rate: p.engagement_rate_persen
                }))}
                fileName="content_performance"
              />
            )}
            <SaveFilterDialog 
              halaman="performa" 
              filterValues={{ 
                dateFrom, 
                dateTo, 
                minReach, 
                searchCaption, 
                selectedPlatforms, 
                selectedContentTypes, 
                sortBy 
              }} 
            />
            <NotesDialog scope="global" />
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Dari Tanggal</Label>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div>
                <Label>Sampai Tanggal</Label>
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div>
                <Label>Jangkauan Minimum</Label>
                <Input type="number" value={minReach} onChange={(e) => setMinReach(e.target.value)} placeholder="0" />
              </div>
              <div>
                <Label>Cari Caption</Label>
                <Input value={searchCaption} onChange={(e) => setSearchCaption(e.target.value)} placeholder="Cari caption..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Platform</Label>
                <div className="space-y-2">
                  {platforms.map(platform => (
                    <div key={platform.id_platform} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedPlatforms.includes(platform.id_platform)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPlatforms([...selectedPlatforms, platform.id_platform]);
                          } else {
                            setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id_platform));
                          }
                        }}
                       />
                      <label className="text-sm text-foreground">{platform.nama_platform}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Tipe Konten</Label>
                <div className="space-y-2">
                  {contentTypes.map(type => (
                    <div key={type.id_jenis_konten} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedContentTypes.includes(type.id_jenis_konten)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedContentTypes([...selectedContentTypes, type.id_jenis_konten]);
                          } else {
                            setSelectedContentTypes(selectedContentTypes.filter(id => id !== type.id_jenis_konten));
                          }
                        }}
                       />
                      <label className="text-sm text-foreground">{type.nama_jenis_konten}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sorting and Export */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Label>Urutkan berdasarkan:</Label>
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={sortBy === "er" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("er")}
                    className="rounded-r-none"
                  >
                    ER
                  </Button>
                  <Button
                    variant={sortBy === "reach" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("reach")}
                    className="rounded-none border-x border-border"
                  >
                     Jangkauan
                  </Button>
                  <Button
                    variant={sortBy === "engagement" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("engagement")}
                    className="rounded-l-none"
                  >
                    Engagement
                  </Button>
                </div>
              </div>
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Ekspor CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Memuat...</div>
            ) : filteredPosts.length === 0 ? (
              <EmptyState
                icon={<Inbox className="h-10 w-10" />}
                title={posts.length === 0 ? "Belum ada postingan" : "Tidak ada data sesuai filter"}
                description={
                  posts.length === 0
                    ? "Import data postingan ke dataset aktif terlebih dahulu."
                    : "Coba longgarkan filter tanggal, jangkauan minimum, atau kata kunci caption."
                }
                action={
                  posts.length === 0
                    ? { label: "Import Data", onClick: () => navigate("/import") }
                    : undefined
                }
              />
            ) : (
              <PaginatedPostTable 
                posts={filteredPosts} 
                getPerformanceBadge={getPerformanceBadge} 
              />
            )}
          </CardContent>
        </Card>

        {insight && (
          <Card>
            <CardHeader>
              <CardTitle>Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <InsightCard insight={insight} />
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Performa;
