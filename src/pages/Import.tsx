import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Link as LinkIcon, Database, FileSpreadsheet, Download, Eye, Trash2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Import = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { selectedProject, datasets, refreshDatasets } = useApp();
  const [uploading, setUploading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [sheetsUrl, setSheetsUrl] = useState("");
  const [previewData, setPreviewData] = useState<any>(null);
  const [previewSource, setPreviewSource] = useState<"csv" | "sheets" | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [datasetToDelete, setDatasetToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Parse CSV with flexible column matching
  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length === 0) throw new Error("File CSV kosong");
    
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    
    // Map common column name variations
    const columnMap: Record<string, string[]> = {
      platform: ["platform", "social_media", "media"],
      content_type: ["content_type", "type", "content", "tipe"],
      post_id: ["post_id", "id", "postid"],
      posted_at: ["posted_at", "date", "tanggal", "timestamp"],
      reach: ["reach", "jangkauan", "impressions"],
      likes: ["likes", "like", "suka"],
      comments: ["comments", "comment", "komentar"],
      shares: ["shares", "share", "bagikan"],
      saved: ["saved", "save", "simpan", "bookmark"],
      views: ["views", "view", "tayangan"],
      followers: ["followers", "follower", "pengikut"],
      caption: ["caption", "text", "keterangan"]
    };

    const getColumnIndex = (columnKey: string): number => {
      const variations = columnMap[columnKey];
      for (const variation of variations) {
        const index = headers.indexOf(variation);
        if (index !== -1) return index;
      }
      return -1;
    };

    const requiredColumns = ["platform", "content_type", "post_id", "posted_at", "reach", "likes", "comments", "shares", "saved", "views", "followers"];
    const missing = requiredColumns.filter(col => getColumnIndex(col) === -1);
    
    if (missing.length > 0) {
      throw new Error(`Kolom yang hilang: ${missing.join(", ")}. Silakan download template untuk format yang benar.`);
    }

    return { lines, headers, getColumnIndex };
  };

  // Preview CSV before upload
  const handlePreviewCSV = async () => {
    if (!csvFile) return;

    try {
      const text = await csvFile.text();
      const { lines, getColumnIndex } = parseCSV(text);
      
      const { data: platforms } = await supabase.from("platform").select("*");
      const { data: contentTypes } = await supabase.from("jenis_konten").select("*");

      const preview = {
        fileName: csvFile.name,
        totalRows: lines.length - 1,
        headers: lines[0],
        sampleRows: lines.slice(1).map(line => line.split(",")),
        validationResults: {
          validRows: 0,
          invalidRows: 0,
          errors: [] as string[]
        }
      };

      // Validate sample data
      let validCount = 0;
      let invalidCount = 0;
      const errors: string[] = [];

      for (let i = 1; i < Math.min(lines.length, 20); i++) {
        const values = lines[i].split(",");
        const platformName = values[getColumnIndex("platform")]?.trim().toLowerCase();
        const contentTypeName = values[getColumnIndex("content_type")]?.trim().toLowerCase();
        
        const platform = platforms?.find((p) => p.kode_platform.toLowerCase() === platformName);
        const contentType = contentTypes?.find((c) => c.kode_jenis_konten.toLowerCase() === contentTypeName);

        if (!platform) {
          errors.push(`Baris ${i}: Platform "${platformName}" tidak ditemukan`);
          invalidCount++;
        } else if (!contentType) {
          errors.push(`Baris ${i}: Content type "${contentTypeName}" tidak ditemukan`);
          invalidCount++;
        } else {
          validCount++;
        }
      }

      preview.validationResults = {
        validRows: validCount,
        invalidRows: invalidCount,
        errors: errors.slice(0, 5)
      };

      setPreviewData(preview);
      setPreviewSource("csv");
      setShowPreview(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // CSV Upload Handler
  const handleCsvUpload = async () => {
    if (!csvFile) {
      toast.error("Pilih file CSV terlebih dahulu");
      return;
    }
    
    if (!selectedProject?.id_proyek) {
      toast.error("Silakan pilih project terlebih dahulu");
      return;
    }

    setUploading(true);
    try {
      const text = await csvFile.text();
      const { lines, getColumnIndex } = parseCSV(text);

      // Deactivate all existing datasets first
      await supabase
        .from("dataset")
        .update({ dataset_aktif: false })
        .eq("id_proyek", selectedProject.id_proyek);

      // Create new dataset and set as active
      const { data: dataset, error: datasetError } = await supabase
        .from("dataset")
        .insert({
          id_proyek: selectedProject.id_proyek,
          nama_dataset: csvFile.name,
          jenis_sumber_dataset: "upload_csv",
          jumlah_baris_dataset: lines.length - 1,
          dataset_aktif: true,
        })
        .select()
        .single();

      if (datasetError) throw datasetError;

      const { data: platforms } = await supabase.from("platform").select("*");
      const { data: contentTypes } = await supabase.from("jenis_konten").select("*");

      const posts = [];
      const errors = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        
        const platformName = values[getColumnIndex("platform")]?.trim().toLowerCase();
        const contentTypeName = values[getColumnIndex("content_type")]?.trim().toLowerCase();
        
        const platform = platforms?.find((p) => p.kode_platform.toLowerCase() === platformName);
        const contentType = contentTypes?.find((c) => c.kode_jenis_konten.toLowerCase() === contentTypeName);

        if (!platform) {
          errors.push(`Baris ${i}: Platform "${platformName}" tidak ditemukan`);
          continue;
        }
        
        if (!contentType) {
          errors.push(`Baris ${i}: Content type "${contentTypeName}" tidak ditemukan`);
          continue;
        }

        const reach = parseInt(values[getColumnIndex("reach")]) || 0;
        const likes = parseInt(values[getColumnIndex("likes")]) || 0;
        const comments = parseInt(values[getColumnIndex("comments")]) || 0;
        const shares = parseInt(values[getColumnIndex("shares")]) || 0;
        const saved = parseInt(values[getColumnIndex("saved")]) || 0;
        
        // Calculate engagement metrics
        const totalEngagement = likes + comments + shares + saved;
        const engagementRate = reach > 0 ? (totalEngagement / reach) * 100 : 0;

        posts.push({
          id_proyek: selectedProject.id_proyek,
          id_dataset: dataset.id_dataset,
          id_platform: platform.id_platform,
          id_jenis_konten: contentType.id_jenis_konten,
          kode_postingan: values[getColumnIndex("post_id")]?.trim() || `POST-${i}`,
          waktu_diposting: new Date(values[getColumnIndex("posted_at")]?.trim()).toISOString(),
          jumlah_reach: reach,
          jumlah_likes: likes,
          jumlah_komentar: comments,
          jumlah_shares: shares,
          jumlah_saved: saved,
          jumlah_views: parseInt(values[getColumnIndex("views")]) || 0,
          jumlah_followers: parseInt(values[getColumnIndex("followers")]) || 0,
          teks_caption: values[getColumnIndex("caption")]?.trim() || "",


        });
      }

      if (posts.length === 0) {
        throw new Error("Tidak ada data valid yang bisa diimport. Periksa format CSV Anda.");
      }

      console.log("Attempting to insert posts:", posts);
      
      const { data: insertedPosts, error: postsError } = await supabase
        .from("postingan")
        .insert(posts)
        .select();

      if (postsError) {
        console.error("Error inserting posts:", postsError);
        await supabase.from("log_impor").insert({ 
          id_dataset: dataset.id_dataset, 
          status_impor: "failed", 
          pesan: `Failed to insert posts: ${postsError.message}`,
          jumlah_baris_tidak_valid: posts.length
        });
        throw new Error(`Gagal menyimpan posts: ${postsError.message}`);
      }

      console.log("Successfully inserted posts:", insertedPosts);

      await supabase.from("log_impor").insert({ 
        id_dataset: dataset.id_dataset, 
        status_impor: "success", 
        pesan: `Imported ${insertedPosts?.length || posts.length} posts`,
        jumlah_baris_tidak_valid: errors.length
      });
      
      toast.success(`Berhasil import ${posts.length} posts! Dataset sekarang aktif dan data dapat dilihat di Dashboard.${errors.length > 0 ? ` (${errors.length} baris dilewati)` : ""}`);
      if (errors.length > 0 && errors.length <= 5) {
        errors.forEach(err => toast.warning(err));
      }
      
      await refreshDatasets();
      setCsvFile(null);
      setShowPreview(false);
    } catch (error: any) {
      console.error("CSV upload error:", error);
      toast.error(`Error: ${error.message}`);
      
      // If dataset was created but posts failed, delete the empty dataset
      if (error.message?.includes("Gagal menyimpan posts")) {
        try {
          await supabase.from("dataset").delete().eq("nama_dataset", csvFile?.name || "");
        } catch (cleanupError) {
          console.error("Failed to cleanup dataset:", cleanupError);
        }
      }
    } finally {
      setUploading(false);
    }
  };

  // Preview Google Sheets before import
  const handlePreviewSheets = async () => {
    if (!sheetsUrl) {
      toast.error("Masukkan URL Google Sheets");
      return;
    }

    try {
      const match = sheetsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!match) throw new Error("URL tidak valid");

      const csvUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error("Gagal mengambil data. Pastikan sheet publik");

      const text = await response.text();
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      const required = ["platform", "content_type", "post_id", "posted_at", "reach", "likes", "comments", "shares", "saved", "views", "followers"];
      const missing = required.filter((col) => !headers.includes(col));
      if (missing.length > 0) throw new Error(`Kolom yang hilang: ${missing.join(", ")}`);

      const { data: platforms } = await supabase.from("platform").select("*");
      const { data: contentTypes } = await supabase.from("jenis_konten").select("*");

      const preview = {
        fileName: "Google Sheets",
        totalRows: lines.length - 1,
        headers: lines[0],
        sampleRows: lines.slice(1).map(line => line.split(",")),
        validationResults: {
          validRows: 0,
          invalidRows: 0,
          errors: [] as string[]
        }
      };

      // Validate ALL data (not just sample)
      let validCount = 0;
      let invalidCount = 0;
      const errors: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        if (values.length < headers.length) {
          errors.push(`Baris ${i}: Data tidak lengkap (${values.length} kolom, dibutuhkan ${headers.length})`);
          invalidCount++;
          continue;
        }

        const platformName = values[headers.indexOf("platform")]?.trim().toLowerCase();
        const contentTypeName = values[headers.indexOf("content_type")]?.trim().toLowerCase();
        
        const platform = platforms?.find((p) => p.kode_platform.toLowerCase() === platformName);
        const contentType = contentTypes?.find((c) => c.kode_jenis_konten.toLowerCase() === contentTypeName);

        if (!platform) {
          errors.push(`Baris ${i}: Platform "${platformName}" tidak ditemukan`);
          invalidCount++;
        } else if (!contentType) {
          errors.push(`Baris ${i}: Content type "${contentTypeName}" tidak ditemukan`);
          invalidCount++;
        } else {
          validCount++;
        }
      }

      preview.validationResults = {
        validRows: validCount,
        invalidRows: invalidCount,
        errors: errors.slice(0, 10)
      };

      setPreviewData(preview);
      setPreviewSource("sheets");
      setShowPreview(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Google Sheets Import (after preview confirmation)
  const handleSheetsImport = async () => {
    if (!sheetsUrl) {
      toast.error("Masukkan URL Google Sheets");
      return;
    }
    
    if (!selectedProject?.id_proyek) {
      toast.error("Silakan pilih project terlebih dahulu");
      return;
    }

    setUploading(true);
    setShowPreview(false);
    try {
      const match = sheetsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!match) throw new Error("URL tidak valid");

      const csvUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error("Gagal mengambil data. Pastikan sheet publik");

      const text = await response.text();
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      const required = ["platform", "content_type", "post_id", "posted_at", "reach", "likes", "comments", "shares", "saved", "views", "followers"];
      const missing = required.filter((col) => !headers.includes(col));
      if (missing.length > 0) throw new Error(`Kolom yang hilang: ${missing.join(", ")}`);

      // Deactivate all existing datasets first
      await supabase
        .from("dataset")
        .update({ dataset_aktif: false })
        .eq("id_proyek", selectedProject.id_proyek);

      // Create new dataset and set as active
      const { data: dataset, error: datasetError } = await supabase
        .from("dataset")
        .insert({
          id_proyek: selectedProject.id_proyek,
          nama_dataset: `Google Sheets - ${new Date().toLocaleDateString()}`,
          jenis_sumber_dataset: "google_sheet",
          lokasi_berkas_dataset: sheetsUrl,
          jumlah_baris_dataset: lines.length - 1,
          dataset_aktif: true,
        })
        .select()
        .single();

      if (datasetError || !dataset) throw new Error(`Gagal membuat dataset: ${datasetError?.message || "Unknown error"}`);

      const { data: platforms, error: platformsError } = await supabase
        .from("platform")
        .select("*")
        .eq("platform_aktif", true);
        
      const { data: contentTypes, error: contentTypesError } = await supabase
        .from("jenis_konten")
        .select("*")
        .eq("jenis_konten_aktif", true);

      if (platformsError || !platforms || platforms.length === 0) {
        throw new Error("Gagal memuat data platform");
      }
      if (contentTypesError || !contentTypes || contentTypes.length === 0) {
        throw new Error("Gagal memuat data jenis konten");
      }

      const posts = [];
      const errors = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        if (values.length < headers.length) {
          errors.push(`Baris ${i}: Data tidak lengkap`);
          continue;
        }

        const platform = platforms?.find((p) => p.kode_platform.toLowerCase() === values[headers.indexOf("platform")]?.trim().toLowerCase());
        const contentType = contentTypes?.find((c) => c.kode_jenis_konten.toLowerCase() === values[headers.indexOf("content_type")]?.trim().toLowerCase());
        
        if (!platform?.id_platform) {
          errors.push(`Baris ${i}: Platform tidak ditemukan`);
          continue;
        }
        if (!contentType?.id_jenis_konten) {
          errors.push(`Baris ${i}: Content type tidak ditemukan`);
          continue;
        }

        const reach = parseInt(values[headers.indexOf("reach")]) || 0;
        const likes = parseInt(values[headers.indexOf("likes")]) || 0;
        const comments = parseInt(values[headers.indexOf("comments")]) || 0;
        const shares = parseInt(values[headers.indexOf("shares")]) || 0;
        const saved = parseInt(values[headers.indexOf("saved")]) || 0;
        
        // Calculate engagement metrics
        const totalEngagement = likes + comments + shares + saved;
        const engagementRate = reach > 0 ? (totalEngagement / reach) * 100 : 0;

        posts.push({
          id_proyek: selectedProject.id_proyek,
          id_dataset: dataset.id_dataset,
          id_platform: platform.id_platform,
          id_jenis_konten: contentType.id_jenis_konten,
          kode_postingan: values[headers.indexOf("post_id")]?.trim() || `POST-${i}`,
          waktu_diposting: new Date(values[headers.indexOf("posted_at")]?.trim()).toISOString(),
          jumlah_reach: reach,
          jumlah_likes: likes,
          jumlah_komentar: comments,
          jumlah_shares: shares,
          jumlah_saved: saved,
          jumlah_views: parseInt(values[headers.indexOf("views")]) || 0,
          jumlah_followers: parseInt(values[headers.indexOf("followers")]) || 0,
          teks_caption: values[headers.indexOf("caption")]?.trim() || "",


        });
      }

      if (posts.length === 0) {
        throw new Error("Tidak ada data valid yang bisa diimport dari Google Sheets");
      }

      const { error: postsError } = await supabase.from("postingan").insert(posts);
      if (postsError) {
        console.error("Error inserting posts from sheets:", postsError);
        throw new Error(`Gagal menyimpan data: ${postsError.message}`);
      }
      
      await supabase.from("log_impor").insert({
        id_dataset: dataset.id_dataset,
        status_impor: "success",
        pesan: `Imported ${posts.length} posts from Google Sheets`,
        jumlah_baris_tidak_valid: errors.length
      });
      
      toast.success(`Berhasil import ${posts.length} posts dari Google Sheets!${errors.length > 0 ? ` (${errors.length} baris dilewati)` : ""}`);
      await refreshDatasets();
      setSheetsUrl("");
    } catch (error: any) {
      console.error("Google Sheets import error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const generateSamplePostsForDataset = async (datasetId: string, projectId: string) => {
    // Get platform and content type IDs
    const { data: platforms, error: platformsError } = await supabase
      .from("platform")
      .select("*")
      .eq("platform_aktif", true);

    const { data: contentTypes, error: contentTypesError } = await supabase
      .from("jenis_konten")
      .select("*")
      .eq("jenis_konten_aktif", true);

    if (platformsError) throw new Error(`Gagal memuat platform: ${platformsError.message}`);
    if (contentTypesError) throw new Error(`Gagal memuat jenis konten: ${contentTypesError.message}`);
    if (!platforms || platforms.length === 0) throw new Error("Tidak ada platform aktif yang tersedia");
    if (!contentTypes || contentTypes.length === 0) throw new Error("Tidak ada jenis konten aktif yang tersedia");

    // Generate sample posts
    const samplePosts: any[] = [];
    const startDate = new Date("2025-04-28");
    const endDate = new Date("2025-06-25");

    for (let i = 1; i <= 50; i++) {
      const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      const randomHour = Math.floor(Math.random() * 24);
      randomDate.setHours(randomHour, Math.floor(Math.random() * 60), 0, 0);

      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];

      if (!platform?.id_platform || !contentType?.id_jenis_konten) {
        console.error("Invalid platform or content type at index", i);
        continue;
      }

      const reach = Math.floor(Math.random() * 9200) + 800;
      const views = reach + Math.floor(Math.random() * 1000);
      const likes = Math.floor(Math.random() * 750) + 50;
      const comments = Math.floor(Math.random() * 98) + 2;
      const shares = Math.floor(Math.random() * 80);
      const saved = Math.floor(Math.random() * 80);
      const followers = Math.floor(Math.random() * 200) + 700;
      
      // Calculate engagement metrics
      const totalEngagement = likes + comments + shares + saved;
      const engagementRate = reach > 0 ? (totalEngagement / reach) * 100 : 0;

      samplePosts.push({
        id_proyek: projectId,
        id_dataset: datasetId,
        id_platform: platform.id_platform,
        id_jenis_konten: contentType.id_jenis_konten,
        kode_postingan: `P${String(i).padStart(3, "0")}`,
        waktu_diposting: randomDate.toISOString(),
        teks_caption: `Sample post ${i}`,
        jumlah_likes: likes,
        jumlah_komentar: comments,
        jumlah_shares: shares,
        jumlah_saved: saved,
        jumlah_views: views,
        jumlah_reach: reach,
        jumlah_followers: followers,


      });
    }

    if (samplePosts.length === 0) {
      throw new Error("Gagal membuat data sample. Tidak ada postingan yang valid.");
    }

    const { error: postsError } = await supabase.from("postingan").insert(samplePosts);

    if (postsError) {
      console.error("Error inserting sample posts:", postsError);
      throw new Error(`Gagal menyimpan data sample: ${postsError.message}`);
    }

    await supabase.from("log_impor").insert({
      id_dataset: datasetId,
      status_impor: "success",
      pesan: "Sample data generated successfully",
      jumlah_baris_tidak_valid: 0,
    });
  };

  const handleUseSampleData = async () => {
    if (!selectedProject?.id_proyek) {
      toast.error("Silakan pilih project terlebih dahulu");
      return;
    }

    setUploading(true);

    try {
      // Check if sample dataset already exists
      const { data: existingSample } = await supabase
        .from("dataset")
        .select("*")
        .eq("id_proyek", selectedProject.id_proyek)
        .eq("jenis_sumber_dataset", "sample")
        .maybeSingle();

      if (existingSample) {
        // Jika dataset sample sudah ada tapi belum punya postingan, generate dulu
        const { count, error: countError } = await supabase
          .from("postingan")
          .select("id_postingan", { count: "exact", head: true })
          .eq("id_dataset", existingSample.id_dataset);

        if (countError) {
          console.error("Error checking existing sample posts:", countError);
        } else if (!count || count === 0) {
          await generateSamplePostsForDataset(existingSample.id_dataset, selectedProject.id_proyek);
        }

        // Activate existing sample dataset
        await supabase
          .from("dataset")
          .update({ dataset_aktif: false })
          .eq("id_proyek", selectedProject.id_proyek);

        await supabase
          .from("dataset")
          .update({ dataset_aktif: true })
          .eq("id_dataset", existingSample.id_dataset);

        toast.success("Dataset sample berhasil diaktifkan");
        await refreshDatasets();
        navigate("/dashboard");
        return;
      }

      // Create sample dataset
      const { data: newDataset, error: datasetError } = await supabase
        .from("dataset")
        .insert({
          id_proyek: selectedProject.id_proyek,
          nama_dataset: "Sample Dataset Mei-Juni 2025",
          jenis_sumber_dataset: "sample",
          dataset_aktif: true,
          jumlah_baris_dataset: 50,
        })
        .select()
        .single();

      if (datasetError || !newDataset) throw datasetError || new Error("Gagal membuat dataset sample");

      // Deactivate other datasets
      await supabase
        .from("dataset")
        .update({ dataset_aktif: false })
        .eq("id_proyek", selectedProject.id_proyek)
        .neq("id_dataset", newDataset.id_dataset);

      await generateSamplePostsForDataset(newDataset.id_dataset, selectedProject.id_proyek);

      toast.success("Data sample berhasil dibuat!");
      await refreshDatasets();
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error creating sample data:", error);
      toast.error(error.message || "Gagal membuat data sample");
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (datasetId: string) => {
    if (!selectedProject?.id_proyek) {
      toast.error("Silakan pilih project terlebih dahulu");
      return;
    }

    try {
      await supabase.from("dataset").update({ dataset_aktif: false }).eq("id_proyek", selectedProject.id_proyek);
      await supabase.from("dataset").update({ dataset_aktif: true }).eq("id_dataset", datasetId);
      toast.success("Dataset aktif berhasil diubah");
      await refreshDatasets();
    } catch (error: any) {
      console.error("Error setting active dataset:", error);
      toast.error(`Gagal mengubah dataset aktif: ${error.message}`);
    }
  };

  const handleDeleteDataset = async () => {
    if (!datasetToDelete || !selectedProject?.id_proyek) {
      toast.error("Data tidak valid");
      return;
    }

    try {
      setUploading(true);
      
      // Delete related posts first
      const { error: postsError } = await supabase
        .from("postingan")
        .delete()
        .eq("id_dataset", datasetToDelete);
      
      if (postsError) {
        console.error("Error deleting posts:", postsError);
      }
      
      // Delete import logs
      const { error: logsError } = await supabase
        .from("log_impor")
        .delete()
        .eq("id_dataset", datasetToDelete);
      
      if (logsError) {
        console.error("Error deleting logs:", logsError);
      }
      
      // Delete dataset
      const { error: datasetError } = await supabase
        .from("dataset")
        .delete()
        .eq("id_dataset", datasetToDelete);
      
      if (datasetError) throw datasetError;
      
      toast.success("Dataset berhasil dihapus");
      await refreshDatasets();
      setShowDeleteDialog(false);
      setDatasetToDelete(null);
    } catch (error: any) {
      console.error("Error deleting dataset:", error);
      toast.error(`Gagal menghapus dataset: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const template = `platform,content_type,post_id,posted_at,reach,likes,comments,shares,saved,views,followers,caption\ninstagram,reel,POST001,2025-01-15 10:30:00,5000,250,30,15,20,5500,1200,Contoh caption post\ntiktok,video,POST002,2025-01-15 14:00:00,8000,400,50,25,35,8500,1500,Contoh caption lainnya`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_import.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template CSV berhasil didownload");
  };

  const handleExportDataset = async (datasetId: string, datasetName: string) => {
    try {
      setUploading(true);
      
      const { data: posts, error } = await supabase
        .from("postingan")
        .select(`
          *,
          platform:id_platform(kode_platform),
          jenis_konten:id_jenis_konten(kode_jenis_konten)
        `)
        .eq("id_dataset", datasetId);

      if (error) throw error;
      if (!posts || posts.length === 0) {
        toast.error("Dataset kosong, tidak ada data untuk diekspor");
        return;
      }

      const headers = ["platform", "content_type", "post_id", "posted_at", "reach", "likes", "comments", "shares", "saved", "views", "followers", "caption"];
      const rows = posts.map((post: any) => [
        post.platform?.kode_platform || "",
        post.jenis_konten?.kode_jenis_konten || "",
        post.kode_postingan,
        post.waktu_diposting,
        post.jumlah_reach,
        post.jumlah_likes,
        post.jumlah_komentar,
        post.jumlah_shares,
        post.jumlah_saved,
        post.jumlah_views,
        post.jumlah_followers,
        post.teks_caption || ""
      ]);

      const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${datasetName.replace(/\s/g, '_')}_export.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success("Dataset berhasil diekspor");
    } catch (error: any) {
      toast.error("Gagal mengekspor dataset");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AppLayout>
    );
  }

  if (!selectedProject) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-foreground text-lg">Silakan pilih project terlebih dahulu</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Import Data</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Upload data dari CSV atau Google Sheets</p>
        </div>

        {/* Import Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* CSV Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload CSV
              </CardTitle>
              <CardDescription>Upload file CSV dengan format yang sesuai</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                type="file" 
                accept=".csv" 
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)} 
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handlePreviewCSV} 
                  disabled={!csvFile || uploading}
                  variant="outline"
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handleDownloadTemplate} variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Google Sheets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Google Sheets
              </CardTitle>
              <CardDescription>Import dari Google Sheets (pastikan publik)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="https://docs.google.com/spreadsheets/d/..." 
                value={sheetsUrl} 
                onChange={(e) => setSheetsUrl(e.target.value)} 
              />
              <Button 
                onClick={handlePreviewSheets} 
                disabled={!sheetsUrl || uploading}
                variant="outline"
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </CardContent>
          </Card>

          {/* Sample Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Sample
              </CardTitle>
              <CardDescription>Gunakan data contoh untuk mencoba fitur</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleUseSampleData} 
                disabled={uploading}
                className="w-full"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Gunakan Data Sample
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Existing Datasets */}
        <Card>
          <CardHeader>
            <CardTitle>Dataset yang Ada</CardTitle>
            <CardDescription>Kelola dataset yang sudah diimport</CardDescription>
          </CardHeader>
          <CardContent>
            {datasets.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Belum ada dataset. Import data terlebih dahulu.</p>
            ) : (
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Dataset</TableHead>
                    <TableHead>Tanggal Upload</TableHead>
                    <TableHead>Jumlah Post</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datasets.map((dataset) => (
                    <TableRow key={dataset.id_dataset}>
                      <TableCell className="font-medium">{dataset.nama_dataset}</TableCell>
                      <TableCell>
                        {new Date(dataset.created_at).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>{dataset.jumlah_baris_dataset}</TableCell>
                      <TableCell>
                        {dataset.dataset_aktif ? (
                          <Badge className="bg-success">Aktif</Badge>
                        ) : (
                          <Badge variant="outline">Tidak Aktif</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!dataset.dataset_aktif && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSetActive(dataset.id_dataset)}
                            >
                              Set Aktif
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExportDataset(dataset.id_dataset, dataset.nama_dataset)}
                            disabled={uploading}
                            className="gap-1"
                          >
                            <Download className="h-3 w-3" />
                            Export
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDatasetToDelete(dataset.id_dataset);
                              setShowDeleteDialog(true);
                            }}
                            disabled={uploading}
                            className="gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Preview Data - {previewData?.fileName}</DialogTitle>
              <DialogDescription>
                Total {previewData?.totalRows} baris data
              </DialogDescription>
            </DialogHeader>
            
            {previewData?.validationResults && (
              <Alert variant={previewData.validationResults.invalidRows > 0 ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {previewData.validationResults.validRows} baris valid, {previewData.validationResults.invalidRows} baris tidak valid
                  {previewData.validationResults.errors.length > 0 && (
                    <ul className="mt-2 text-sm list-disc list-inside">
                      {previewData.validationResults.errors.map((err: string, idx: number) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    {previewData?.headers?.split(",").map((header: string, idx: number) => (
                      <TableHead key={idx}>{header.trim()}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData?.sampleRows?.slice(0, 10).map((row: string[], rowIdx: number) => (
                    <TableRow key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <TableCell key={cellIdx} className="truncate max-w-[150px]">
                          {cell.trim()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Batal
              </Button>
              <Button 
                onClick={previewSource === "csv" ? handleCsvUpload : handleSheetsImport}
                disabled={uploading || (previewData?.validationResults?.validRows === 0)}
              >
                {uploading ? "Importing..." : "Import Data"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Hapus</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus dataset ini? Semua data postingan terkait juga akan dihapus.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleDeleteDataset} disabled={uploading}>
                {uploading ? "Menghapus..." : "Hapus"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Import;
