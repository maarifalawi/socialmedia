import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { InsightCard } from "@/components/InsightCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type MetricType = "er" | "engagement" | "reach";
type PeriodType = "week" | "month" | "all";

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const WaktuTerbaik = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { selectedProject, activeDataset } = useApp();
  const [posts, setPosts] = useState<any[]>([]);
  const [metric, setMetric] = useState<MetricType>("er");
  const [topSlots, setTopSlots] = useState<any[]>([]);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");
  
  // Filters
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [contentTypes, setContentTypes] = useState<any[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  
  // Period comparison
  const [period, setPeriod] = useState<PeriodType>("all");
  const [showComparison, setShowComparison] = useState(false);
  const [previousTopSlots, setPreviousTopSlots] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch platforms and content types
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [platformsRes, contentTypesRes] = await Promise.all([
          supabase.from("platform").select("*").eq("platform_aktif", true),
          supabase.from("jenis_konten").select("*").eq("jenis_konten_aktif", true)
        ]);

        if (platformsRes.error) throw platformsRes.error;
        if (contentTypesRes.error) throw contentTypesRes.error;

        setPlatforms(platformsRes.data || []);
        setContentTypes(contentTypesRes.data || []);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedProject || !activeDataset) return;

      setLoading(true);
      try {
        let query = supabase
          .from("postingan")
          .select("*")
          .eq("id_proyek", selectedProject.id_proyek)
          .eq("id_dataset", activeDataset.id_dataset);

        // Apply filters
        if (selectedPlatforms.length > 0) {
          query = query.in("id_platform", selectedPlatforms);
        }
        if (selectedContentTypes.length > 0) {
          query = query.in("id_jenis_konten", selectedContentTypes);
        }

        const { data, error } = await query;

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedProject, activeDataset, selectedPlatforms, selectedContentTypes]);

  useEffect(() => {
    if (posts.length === 0) return;

    // Filter posts by period
    const now = new Date();
    const getFilteredPosts = (periodType: PeriodType, offset: number = 0) => {
      if (periodType === "all") return posts;
      
      const startDate = new Date(now);
      if (periodType === "week") {
        startDate.setDate(now.getDate() - 7 * (offset + 1));
      } else if (periodType === "month") {
        startDate.setMonth(now.getMonth() - (offset + 1));
      }
      
      const endDate = new Date(now);
      if (periodType === "week") {
        endDate.setDate(now.getDate() - 7 * offset);
      } else if (periodType === "month") {
        endDate.setMonth(now.getMonth() - offset);
      }
      
      return posts.filter(post => {
        const postDate = new Date(post.waktu_diposting);
        return postDate >= startDate && postDate < endDate;
      });
    };

    const currentPosts = getFilteredPosts(period, 0);
    const previousPosts = showComparison ? getFilteredPosts(period, 1) : [];

    // Calculate top slots for current period
    const calculateSlots = (postList: any[]) => {
      const slotMap = new Map<string, { values: number[]; count: number }>();
      
      postList.forEach(post => {
        const date = new Date(post.waktu_diposting);
        const day = date.getDay();
        const hour = date.getHours();
        const key = `${day}-${hour}`;

        let value = 0;
        if (metric === "er") {
          value = post.engagement_rate_persen || 0;
        } else if (metric === "engagement") {
          value = post.total_engagement || 0;
        } else if (metric === "reach") {
          value = post.jumlah_reach || 0;
        }

        if (!slotMap.has(key)) {
          slotMap.set(key, { values: [], count: 0 });
        }
        const slot = slotMap.get(key)!;
        slot.values.push(value);
        slot.count++;
      });

      // Calculate median/sum for each slot
      const slots: any[] = [];
      slotMap.forEach((slot, key) => {
        const [day, hour] = key.split("-").map(Number);
        
        let metricValue = 0;
        if (metric === "engagement") {
          metricValue = slot.values.reduce((sum, v) => sum + v, 0);
        } else {
          // Median for ER and Reach
          const sorted = [...slot.values].sort((a, b) => a - b);
          metricValue = sorted[Math.floor(sorted.length / 2)] || 0;
        }

        slots.push({
          day,
          hour,
          dayName: DAYS[day],
          hourStr: `${hour.toString().padStart(2, "0")}:00`,
          value: metricValue,
          count: slot.count
        });
      });

      // Get top 3 slots with minimum 2 posts
      return slots
        .filter(s => s.count >= 2)
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
    };

    const currentTop3 = calculateSlots(currentPosts);
    setTopSlots(currentTop3);

    if (showComparison && previousPosts.length > 0) {
      const previousTop3 = calculateSlots(previousPosts);
      setPreviousTopSlots(previousTop3);
    } else {
      setPreviousTopSlots([]);
    }

    // Prepare heatmap data based on current period posts
    const allSlots: any[] = [];
    const slotMapForHeatmap = new Map<string, { values: number[]; count: number }>();
    
    currentPosts.forEach(post => {
      const date = new Date(post.waktu_diposting);
      const day = date.getDay();
      const hour = date.getHours();
      const key = `${day}-${hour}`;

      let value = 0;
      if (metric === "er") {
        value = post.engagement_rate_persen || 0;
      } else if (metric === "engagement") {
        value = post.total_engagement || 0;
      } else if (metric === "reach") {
        value = post.jumlah_reach || 0;
      }

      if (!slotMapForHeatmap.has(key)) {
        slotMapForHeatmap.set(key, { values: [], count: 0 });
      }
      const slot = slotMapForHeatmap.get(key)!;
      slot.values.push(value);
      slot.count++;
    });

    slotMapForHeatmap.forEach((slot, key) => {
      const [day, hour] = key.split("-").map(Number);
      let metricValue = 0;
      if (metric === "engagement") {
        metricValue = slot.values.reduce((sum, v) => sum + v, 0);
      } else {
        const sorted = [...slot.values].sort((a, b) => a - b);
        metricValue = sorted[Math.floor(sorted.length / 2)] || 0;
      }
      allSlots.push({ day, hour, value: metricValue });
    });

    const heatmap = DAYS.map((dayName, dayIndex) => {
      const daySlots: any = { day: dayName };
      for (let h = 0; h < 24; h++) {
        const slot = allSlots.find(s => s.day === dayIndex && s.hour === h);
        daySlots[`h${h}`] = slot ? slot.value : 0;
      }
      return daySlots;
    });
    setHeatmapData(heatmap);

    // Hourly frequency based on current period
    const hourlyCount = Array(24).fill(0);
    currentPosts.forEach(post => {
      const hour = new Date(post.waktu_diposting).getHours();
      hourlyCount[hour]++;
    });
    const hourly = hourlyCount.map((count, hour) => ({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      count
    }));
    setHourlyData(hourly);
    generateInsight(currentTop3);
  }, [posts, metric, period, showComparison]);

  const generateInsight = (sortedSlots: any[]) => {
    if (sortedSlots.length === 0) {
      setInsight("");
      return;
    }

    const best = sortedSlots[0];
    const metricValue = best.value;
    const metricLabel = metric === "er" ? "engagement rate" : metric === "engagement" ? "engagement" : "reach";
    
    let insightText = `Slot waktu terbaik untuk posting adalah ${best.dayName} pukul ${best.hourStr} dengan median ${metricLabel} ${metric === "er" ? metricValue.toFixed(2) + "%" : metricValue.toLocaleString()}`;
    
    if (sortedSlots.length >= 2) {
      const second = sortedSlots[1];
      const secondValue = second.value;
      const diff = Math.abs(metricValue - secondValue);
      const diffPercent = (diff / metricValue) * 100;
      
      if (diffPercent < 10) {
        insightText += `. Alternatif lain yang juga kuat adalah ${second.dayName} pukul ${second.hourStr}`;
        
        if (sortedSlots.length >= 3) {
          const third = sortedSlots[2];
          const thirdValue = third.value;
          const diff3 = Math.abs(metricValue - thirdValue);
          const diffPercent3 = (diff3 / metricValue) * 100;
          
          if (diffPercent3 < 15) {
            insightText += ` dan ${third.dayName} pukul ${third.hourStr}`;
          }
        }
        insightText += ", karena performanya tidak jauh berbeda";
      }
    }
    
    if (best.count < 3) {
      insightText += `. Perlu diperhatikan bahwa sampel di slot ini masih kecil (${best.count} post), sebaiknya diuji lebih lanjut dengan posting lebih banyak konten pada waktu tersebut`;
    }
    
    insightText += ".";
    setInsight(insightText);
  };

  const getMetricLabel = () => {
    if (metric === "er") return "Engagement Rate (%)";
    if (metric === "engagement") return "Total Engagement";
    return "Median Reach";
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
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Waktu Terbaik Posting</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Analisis waktu terbaik untuk posting konten</p>
        </div>

        {/* Filters and Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Metric Selector */}
            <div className="flex flex-wrap items-center gap-4">
              <Label>Pilih Metrik:</Label>
              <div className="flex border border-border rounded-md">
                <Button
                  variant={metric === "er" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMetric("er")}
                  className="rounded-r-none"
                >
                  Engagement Rate
                </Button>
                <Button
                  variant={metric === "engagement" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMetric("engagement")}
                  className="rounded-none border-x border-border"
                >
                  Total Engagement
                </Button>
                <Button
                  variant={metric === "reach" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMetric("reach")}
                  className="rounded-l-none"
                >
                  Reach
                </Button>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex flex-wrap items-center gap-4">
              <Label>Periode:</Label>
              <Select value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Data</SelectItem>
                  <SelectItem value="week">Minggu Ini</SelectItem>
                  <SelectItem value="month">Bulan Ini</SelectItem>
                </SelectContent>
              </Select>
              
              {period !== "all" && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="comparison" 
                    checked={showComparison}
                    onCheckedChange={(checked) => setShowComparison(checked as boolean)}
                  />
                  <Label htmlFor="comparison" className="cursor-pointer">
                    Bandingkan dengan periode sebelumnya
                  </Label>
                </div>
              )}
            </div>

            {/* Platform Filter */}
            <div className="flex flex-wrap items-start gap-4">
              <Label className="pt-2">Platform:</Label>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div key={platform.id_platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform.id_platform}`}
                      checked={selectedPlatforms.includes(platform.id_platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPlatforms([...selectedPlatforms, platform.id_platform]);
                        } else {
                          setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id_platform));
                        }
                      }}
                    />
                    <Label htmlFor={`platform-${platform.id_platform}`} className="cursor-pointer">
                      {platform.nama_platform}
                    </Label>
                  </div>
                ))}
                {selectedPlatforms.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedPlatforms([])}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Content Type Filter */}
            <div className="flex flex-wrap items-start gap-4">
              <Label className="pt-2">Jenis Konten:</Label>
              <div className="flex flex-wrap gap-3">
                {contentTypes.map((contentType) => (
                  <div key={contentType.id_jenis_konten} className="flex items-center space-x-2">
                    <Checkbox
                      id={`content-${contentType.id_jenis_konten}`}
                      checked={selectedContentTypes.includes(contentType.id_jenis_konten)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedContentTypes([...selectedContentTypes, contentType.id_jenis_konten]);
                        } else {
                          setSelectedContentTypes(selectedContentTypes.filter(id => id !== contentType.id_jenis_konten));
                        }
                      }}
                    />
                    <Label htmlFor={`content-${contentType.id_jenis_konten}`} className="cursor-pointer">
                      {contentType.nama_jenis_konten}
                    </Label>
                  </div>
                ))}
                {selectedContentTypes.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedContentTypes([])}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Slots */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Rekomendasi Waktu Terbaik (Top 3)
            {period !== "all" && (
              <span className="text-sm text-muted-foreground ml-2">
                - {period === "week" ? "Minggu Ini" : "Bulan Ini"}
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topSlots.map((slot, index) => {
              // Find comparison data
              const prevSlot = previousTopSlots.find(
                ps => ps.day === slot.day && ps.hour === slot.hour
              );
              const change = prevSlot ? ((slot.value - prevSlot.value) / prevSlot.value) * 100 : null;

              return (
                <Card key={index} className={index === 0 ? "border-primary" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                      {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{slot.dayName}</h3>
                    <p className="text-2xl font-bold text-primary">{slot.hourStr}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {getMetricLabel()}: {metric === "er" ? `${slot.value.toFixed(2)}%` : slot.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Berdasarkan {slot.count} post
                    </p>
                    
                    {showComparison && change !== null && (
                      <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {change >= 0 ? '+' : ''}{change.toFixed(1)}% vs periode sebelumnya
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
            {topSlots.length === 0 && (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                Tidak cukup data untuk menghitung waktu terbaik (minimal 2 post per slot)
              </div>
            )}
          </div>
        </div>

        {/* Insight */}
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

        {/* Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Heatmap Performa per Jam</CardTitle>
            <CardDescription>
              Nilai {getMetricLabel()} berdasarkan hari dan jam
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left p-1 text-foreground">Hari</th>
                    {Array.from({ length: 24 }, (_, i) => (
                      <th key={i} className="p-1 text-muted-foreground">{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-1 font-medium text-foreground">{row.day}</td>
                      {Array.from({ length: 24 }, (_, h) => {
                        const value = row[`h${h}`] || 0;
                        const maxValue = Math.max(...heatmapData.flatMap(r => 
                          Array.from({ length: 24 }, (_, i) => r[`h${i}`] || 0)
                        ));
                        const intensity = maxValue > 0 ? value / maxValue : 0;
                        
                        return (
                          <td
                            key={h}
                            className="p-1 text-center border border-border"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                              color: intensity > 0.5 ? 'white' : 'inherit'
                            }}
                            title={`${row.day} ${h}:00 - ${metric === "er" ? value.toFixed(2) + "%" : value.toLocaleString()}`}
                          >
                            {value > 0 ? (metric === "er" ? value.toFixed(1) : Math.round(value)) : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Frekuensi Posting per Jam</CardTitle>
            <CardDescription>Jumlah post yang dipublikasikan per jam</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name="Jumlah Post" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default WaktuTerbaik;
