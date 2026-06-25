import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Upload,
  Link as LinkIcon,
  Database,
  FileSpreadsheet,
  Download,
  Eye,
  Trash2,
  AlertCircle,
  ExternalLink,
  FolderOpen,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  parseCsvText,
  validateRequiredColumns,
  getCellValue,
  getCellNumber,
  REQUIRED_COLUMNS,
} from "@/lib/csv";
import { logAndToast, getErrorMessage } from "@/lib/errors";

const Import = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { selectedProject, datasets, refreshDatasets } = useApp();
  const [uploading, setUploading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [sheetsUrl, setSheetsUrl] = useState("");
  const [previewData, setPreviewData] = useState<any>(null);
  const [previewSource, setPreviewSource] = useState<"csv" | "sheets" | null>(
    null,
  );
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [datasetToDelete, setDatasetToDelete] = useState<string | null>(null);

  // Parse CSV using PapaParse for robust quoted/embedded-comma handling
  const parseCSV = (text: string) => {
    const parsed = parseCsvText(text);
    const missing = validateRequiredColumns(parsed.headers);
    if (missing.length > 0) {
      throw new Error(
        `Kolom yang hilang: ${missing.join(", ")}. Silakan download template untuk format yang benar.`,
      );
    }
    return parsed;
  };

  // Preview CSV before upload
  const handlePreviewCSV = async () => {
    if (!csvFile) return;

    try {
      const text = await csvFile.text();
      const { headers, rows } = parseCSV(text);

      const { data: platforms } = await supabase.from("platform").select("*");
      const { data: contentTypes } = await supabase
        .from("jenis_konten")
        .select("*");

      const preview = {
        fileName: csvFile.name,
        totalRows: rows.length,
        headers: headers.join(","),
        sampleRows: rows
          .slice(0, 10)
          .map((row) => headers.map((h) => row[h] ?? "")),
        validationResults: {
          validRows: 0,
          invalidRows: 0,
          errors: [] as string[],
        },
      };

      let validCount = 0;
      let invalidCount = 0;
      const errors: string[] = [];

      rows.forEach((row, idx) => {
        const platformName = getCellValue(
          row,
          headers,
          "platform",
        ).toLowerCase();
        const contentTypeName = getCellValue(
          row,
          headers,
          "content_type",
        ).toLowerCase();
        const platform = platforms?.find(
          (p) => p.kode_platform.toLowerCase() === platformName,
        );
        const contentType = contentTypes?.find(
          (c) => c.kode_jenis_konten.toLowerCase() === contentTypeName,
        );

        if (!platform) {
          errors.push(
            `Baris ${idx + 1}: Platform "${platformName}" tidak ditemukan`,
          );
          invalidCount++;
        } else if (!contentType) {
          errors.push(
            `Baris ${idx + 1}: Tipe konten "${contentTypeName}" tidak ditemukan`,
          );
          invalidCount++;
        } else {
          validCount++;
        }
      });

      preview.validationResults = {
        validRows: validCount,
        invalidRows: invalidCount,
        errors: errors.slice(0, 10),
      };

      setPreviewData(preview);
      setPreviewSource("csv");
      setShowPreview(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
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
    let createdDatasetId: string | null = null;
    try {
      const text = await csvFile.text();
      const { headers, rows } = parseCSV(text);

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
          jumlah_baris_dataset: rows.length,
          dataset_aktif: true,
        })
        .select()
        .single();

      if (datasetError) throw datasetError;
      createdDatasetId = dataset.id_dataset;

      const { data: platforms } = await supabase.from("platform").select("*");
      const { data: contentTypes } = await supabase
        .from("jenis_konten")
        .select("*");

      const posts: any[] = [];
      const errors: string[] = [];

      rows.forEach((row, idx) => {
        const lineNo = idx + 1;
        const platformName = getCellValue(
          row,
          headers,
          "platform",
        ).toLowerCase();
        const contentTypeName = getCellValue(
          row,
          headers,
          "content_type",
        ).toLowerCase();
        const platform = platforms?.find(
          (p) => p.kode_platform.toLowerCase() === platformName,
        );
        const contentType = contentTypes?.find(
          (c) => c.kode_jenis_konten.toLowerCase() === contentTypeName,
        );

        if (!platform) {
          errors.push(
            `Baris ${lineNo}: Platform "${platformName}" tidak ditemukan`,
          );
          return;
        }
        if (!contentType) {
          errors.push(
            `Baris ${lineNo}: Content type "${contentTypeName}" tidak ditemukan`,
          );
          return;
        }

        const reach = getCellNumber(row, headers, "reach");
        const likes = getCellNumber(row, headers, "likes");
        const comments = getCellNumber(row, headers, "comments");
        const shares = getCellNumber(row, headers, "shares");
        const saved = getCellNumber(row, headers, "saved");

        const postedAtRaw = getCellValue(row, headers, "posted_at");
        const postedAt = new Date(postedAtRaw);
        if (isNaN(postedAt.getTime())) {
          errors.push(`Baris ${lineNo}: Tanggal "${postedAtRaw}" tidak valid`);
          return;
        }

        posts.push({
          id_proyek: selectedProject.id_proyek,
          id_dataset: dataset.id_dataset,
          id_platform: platform.id_platform,
          id_jenis_konten: contentType.id_jenis_konten,
          kode_postingan:
            getCellValue(row, headers, "post_id") || `POST-${lineNo}`,
          waktu_diposting: postedAt.toISOString(),
          jumlah_reach: reach,
          jumlah_likes: likes,
          jumlah_komentar: comments,
          jumlah_shares: shares,
          jumlah_saved: saved,
          jumlah_views: getCellNumber(row, headers, "views"),
          jumlah_followers: getCellNumber(row, headers, "followers"),
          teks_caption: getCellValue(row, headers, "caption"),
        });
      });

      if (posts.length === 0) {
        throw new Error(
          "Tidak ada data valid yang bisa diimport. Periksa format CSV Anda.",
        );
      }

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
          jumlah_baris_tidak_valid: posts.length,
        });
        throw new Error(`Gagal menyimpan posts: ${postsError.message}`);
      }

      await supabase.from("log_impor").insert({
        id_dataset: dataset.id_dataset,
        status_impor: "success",
        pesan: `Imported ${insertedPosts?.length || posts.length} posts`,
        jumlah_baris_tidak_valid: errors.length,
      });

      toast.success(
        `Berhasil import ${posts.length} posts! Dataset sekarang aktif dan data dapat dilihat di Dashboard.${errors.length > 0 ? ` (${errors.length} baris dilewati)` : ""}`,
      );
      if (errors.length > 0 && errors.length <= 5) {
        errors.forEach((err) => toast.warning(err));
      }

      await refreshDatasets();
      setCsvFile(null);
      setShowPreview(false);
    } catch (error) {
      const msg = getErrorMessage(error);
      logAndToast("CSV upload", error, "Error");

      // If the dataset was created but posts failed, delete that exact dataset
      // (scoped by id_dataset + project to avoid touching any other rows).
      if (createdDatasetId && msg.includes("Gagal menyimpan posts")) {
        try {
          await supabase
            .from("dataset")
            .delete()
            .eq("id_dataset", createdDatasetId)
            .eq("id_proyek", selectedProject.id_proyek);
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
      if (!response.ok)
        throw new Error("Gagal mengambil data. Pastikan sheet publik");

      const text = await response.text();
      const { headers, rows } = parseCsvText(text);
      const missing = validateRequiredColumns(headers);
      if (missing.length > 0)
        throw new Error(`Kolom yang hilang: ${missing.join(", ")}`);

      const { data: platforms } = await supabase.from("platform").select("*");
      const { data: contentTypes } = await supabase
        .from("jenis_konten")
        .select("*");

      const preview = {
        fileName: "Google Sheets",
        totalRows: rows.length,
        headers: headers.join(","),
        sampleRows: rows
          .slice(0, 10)
          .map((row) => headers.map((h) => row[h] ?? "")),
        validationResults: {
          validRows: 0,
          invalidRows: 0,
          errors: [] as string[],
        },
      };

      let validCount = 0;
      let invalidCount = 0;
      const errors: string[] = [];

      rows.forEach((row, idx) => {
        const platformName = getCellValue(
          row,
          headers,
          "platform",
        ).toLowerCase();
        const contentTypeName = getCellValue(
          row,
          headers,
          "content_type",
        ).toLowerCase();
        const platform = platforms?.find(
          (p) => p.kode_platform.toLowerCase() === platformName,
        );
        const contentType = contentTypes?.find(
          (c) => c.kode_jenis_konten.toLowerCase() === contentTypeName,
        );

        if (!platform) {
          errors.push(
            `Baris ${idx + 1}: Platform "${platformName}" tidak ditemukan`,
          );
          invalidCount++;
        } else if (!contentType) {
          errors.push(
            `Baris ${idx + 1}: Content type "${contentTypeName}" tidak ditemukan`,
          );
          invalidCount++;
        } else {
          validCount++;
        }
      });

      preview.validationResults = {
        validRows: validCount,
        invalidRows: invalidCount,
        errors: errors.slice(0, 10),
      };

      setPreviewData(preview);
      setPreviewSource("sheets");
      setShowPreview(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
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
      if (!response.ok)
        throw new Error("Gagal mengambil data. Pastikan sheet publik");

      const text = await response.text();
      const { headers, rows } = parseCsvText(text);
      const missing = validateRequiredColumns(headers);
      if (missing.length > 0)
        throw new Error(`Kolom yang hilang: ${missing.join(", ")}`);

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
          jumlah_baris_dataset: rows.length,
          dataset_aktif: true,
        })
        .select()
        .single();

      if (datasetError || !dataset)
        throw new Error(
          `Gagal membuat dataset: ${datasetError?.message || "Unknown error"}`,
        );

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

      const posts: any[] = [];
      const errors: string[] = [];

      rows.forEach((row, idx) => {
        const lineNo = idx + 1;
        const platform = platforms?.find(
          (p) =>
            p.kode_platform.toLowerCase() ===
            getCellValue(row, headers, "platform").toLowerCase(),
        );
        const contentType = contentTypes?.find(
          (c) =>
            c.kode_jenis_konten.toLowerCase() ===
            getCellValue(row, headers, "content_type").toLowerCase(),
        );

        if (!platform?.id_platform) {
          errors.push(`Baris ${lineNo}: Platform tidak ditemukan`);
          return;
        }
        if (!contentType?.id_jenis_konten) {
          errors.push(`Baris ${lineNo}: Content type tidak ditemukan`);
          return;
        }

        const postedAtRaw = getCellValue(row, headers, "posted_at");
        const postedAt = new Date(postedAtRaw);
        if (isNaN(postedAt.getTime())) {
          errors.push(`Baris ${lineNo}: Tanggal "${postedAtRaw}" tidak valid`);
          return;
        }

        posts.push({
          id_proyek: selectedProject.id_proyek,
          id_dataset: dataset.id_dataset,
          id_platform: platform.id_platform,
          id_jenis_konten: contentType.id_jenis_konten,
          kode_postingan:
            getCellValue(row, headers, "post_id") || `POST-${lineNo}`,
          waktu_diposting: postedAt.toISOString(),
          jumlah_reach: getCellNumber(row, headers, "reach"),
          jumlah_likes: getCellNumber(row, headers, "likes"),
          jumlah_komentar: getCellNumber(row, headers, "comments"),
          jumlah_shares: getCellNumber(row, headers, "shares"),
          jumlah_saved: getCellNumber(row, headers, "saved"),
          jumlah_views: getCellNumber(row, headers, "views"),
          jumlah_followers: getCellNumber(row, headers, "followers"),
          teks_caption: getCellValue(row, headers, "caption"),
        });
      });

      if (posts.length === 0) {
        throw new Error(
          "Tidak ada data valid yang bisa diimport dari Google Sheets",
        );
      }

      const { error: postsError } = await supabase
        .from("postingan")
        .insert(posts);
      if (postsError) {
        console.error("Error inserting posts from sheets:", postsError);
        throw new Error(`Gagal menyimpan data: ${postsError.message}`);
      }

      await supabase.from("log_impor").insert({
        id_dataset: dataset.id_dataset,
        status_impor: "success",
        pesan: `Imported ${posts.length} posts from Google Sheets`,
        jumlah_baris_tidak_valid: errors.length,
      });

      toast.success(
        `Berhasil import ${posts.length} posts dari Google Sheets!${errors.length > 0 ? ` (${errors.length} baris dilewati)` : ""}`,
      );
      await refreshDatasets();
      setSheetsUrl("");
    } catch (error) {
      logAndToast("Google Sheets import", error, "Error");
    } finally {
      setUploading(false);
    }
  };

  const generateSamplePostsForDataset = async (
    datasetId: string,
    projectId: string,
  ) => {
    // Get platform and content type IDs
    const { data: platforms, error: platformsError } = await supabase
      .from("platform")
      .select("*")
      .eq("platform_aktif", true);

    const { data: contentTypes, error: contentTypesError } = await supabase
      .from("jenis_konten")
      .select("*")
      .eq("jenis_konten_aktif", true);

    if (platformsError)
      throw new Error(`Gagal memuat platform: ${platformsError.message}`);
    if (contentTypesError)
      throw new Error(
        `Gagal memuat jenis konten: ${contentTypesError.message}`,
      );
    if (!platforms || platforms.length === 0)
      throw new Error("Tidak ada platform aktif yang tersedia");
    if (!contentTypes || contentTypes.length === 0)
      throw new Error("Tidak ada jenis konten aktif yang tersedia");

    // Generate sample posts
    const samplePosts: any[] = [];
    const startDate = new Date("2025-04-28");
    const endDate = new Date("2025-06-25");

    for (let i = 1; i <= 50; i++) {
      const randomDate = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime()),
      );
      const randomHour = Math.floor(Math.random() * 24);
      randomDate.setHours(randomHour, Math.floor(Math.random() * 60), 0, 0);

      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const contentType =
        contentTypes[Math.floor(Math.random() * contentTypes.length)];

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
      throw new Error(
        "Gagal membuat data sample. Tidak ada postingan yang valid.",
      );
    }

    const { error: postsError } = await supabase
      .from("postingan")
      .insert(samplePosts);

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
          await generateSamplePostsForDataset(
            existingSample.id_dataset,
            selectedProject.id_proyek,
          );
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

      if (datasetError || !newDataset)
        throw datasetError || new Error("Gagal membuat dataset sample");

      // Deactivate other datasets
      await supabase
        .from("dataset")
        .update({ dataset_aktif: false })
        .eq("id_proyek", selectedProject.id_proyek)
        .neq("id_dataset", newDataset.id_dataset);

      await generateSamplePostsForDataset(
        newDataset.id_dataset,
        selectedProject.id_proyek,
      );

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
      await supabase
        .from("dataset")
        .update({ dataset_aktif: false })
        .eq("id_proyek", selectedProject.id_proyek);
      await supabase
        .from("dataset")
        .update({ dataset_aktif: true })
        .eq("id_dataset", datasetId);
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
    const headers =
      "platform,content_type,post_id,posted_at,reach,likes,comments,shares,saved,views,followers,caption";
    const examples = [
      "instagram,image,POST001,2025-01-15 09:00:00,5200,420,35,28,45,5800,1200,Tips produktivitas pagi hari",
      "instagram,reel,POST002,2025-01-15 14:30:00,12500,980,120,85,110,15000,1210,Tutorial makeup natural",
      "instagram,carousel,POST003,2025-01-16 10:15:00,8300,650,55,42,78,9200,1215,Review produk skincare terbaik",
      "instagram,story,POST004,2025-01-16 18:00:00,3200,180,12,8,15,3500,1220,Behind the scenes",
      "instagram,video,POST005,2025-01-17 12:00:00,9800,720,88,65,92,11500,1225,Vlog weekend seru",
      "tiktok,video,POST006,2025-01-17 20:00:00,25000,2100,350,420,180,28000,850,Dance challenge viral",
    ];
    const guide = [
      "",
      "# PANDUAN PENGISIAN TEMPLATE",
      "# ============================================================",
      "# platform       : instagram atau tiktok",
      "# content_type    : image / reel / carousel / story / video",
      "# post_id         : ID unik postingan (bebas, contoh: POST001)",
      "# posted_at       : Tanggal & jam posting (format: YYYY-MM-DD HH:MM:SS)",
      "# reach           : Jumlah akun yang dijangkau (angka)",
      "# likes           : Jumlah likes (angka)",
      "# comments        : Jumlah komentar (angka)",
      "# shares          : Jumlah shares (angka)",
      "# saved           : Jumlah saved/bookmark (angka)",
      "# views           : Jumlah views/tayangan (angka)",
      "# followers       : Jumlah followers saat posting (angka)",
      "# caption         : Teks caption postingan",
      "# ============================================================",
      "# Hapus baris contoh di atas lalu ganti dengan data Anda.",
      "# Baris yang diawali # akan diabaikan saat import.",
    ];
    const template = [headers, ...examples, ...guide].join("\n");

    const blob = new Blob([template], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_import_social_media.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Template CSV berhasil diunduh");
  };

  const handleOpenGoogleSheetsTemplate = () => {
    const headers = [
      "platform",
      "content_type",
      "post_id",
      "posted_at",
      "reach",
      "likes",
      "comments",
      "shares",
      "saved",
      "views",
      "followers",
      "caption",
    ];
    const exampleRows = [
      [
        "instagram",
        "image",
        "POST001",
        "2025-01-15 09:00:00",
        "5200",
        "420",
        "35",
        "28",
        "45",
        "5800",
        "1200",
        "Tips produktivitas pagi hari",
      ],
      [
        "instagram",
        "reel",
        "POST002",
        "2025-01-15 14:30:00",
        "12500",
        "980",
        "120",
        "85",
        "110",
        "15000",
        "1210",
        "Tutorial makeup natural",
      ],
      [
        "tiktok",
        "video",
        "POST003",
        "2025-01-17 20:00:00",
        "25000",
        "2100",
        "350",
        "420",
        "180",
        "28000",
        "850",
        "Dance challenge viral",
      ],
    ];

    // Build Google Sheets URL with prefilled data
    const allRows = [headers, ...exampleRows];
    const csvContent = allRows.map((row) => row.join(",")).join("%0A");

    // Open blank Google Sheets - user can copy paste
    window.open("https://docs.google.com/spreadsheets/create", "_blank");

    // Also copy template to clipboard for easy paste
    const clipboardData = allRows.map((row) => row.join("\t")).join("\n");
    navigator.clipboard
      .writeText(clipboardData)
      .then(() => {
        toast.success(
          "Template sudah di-copy ke clipboard! Paste (Ctrl+V) di Google Sheets yang baru dibuka.",
        );
      })
      .catch(() => {
        toast.success(
          "Google Sheets terbuka. Gunakan template CSV sebagai panduan kolom.",
        );
      });
  };

  const handleExportDataset = async (
    datasetId: string,
    datasetName: string,
  ) => {
    try {
      setUploading(true);

      const { data: posts, error } = await supabase
        .from("postingan")
        .select(
          `
          *,
          platform:id_platform(kode_platform),
          jenis_konten:id_jenis_konten(kode_jenis_konten)
        `,
        )
        .eq("id_dataset", datasetId);

      if (error) throw error;
      if (!posts || posts.length === 0) {
        toast.error("Dataset kosong, tidak ada data untuk diekspor");
        return;
      }

      const headers = [
        "platform",
        "content_type",
        "post_id",
        "posted_at",
        "reach",
        "likes",
        "comments",
        "shares",
        "saved",
        "views",
        "followers",
        "caption",
      ];
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
        post.teks_caption || "",
      ]);

      const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
        "\n",
      );
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${datasetName.replace(/\s/g, "_")}_export.csv`;
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
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </AppLayout>
    );
  }

  if (!selectedProject) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-foreground text-lg">
            Silakan pilih project terlebih dahulu
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Impor Data
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Unggah data dari CSV atau Google Sheets
          </p>
        </div>

        {/* Import Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* CSV Upload - Hijau */}
          <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Upload className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Unggah CSV
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-400">
                Unggah file CSV dengan format yang sesuai
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                className="border-green-300 dark:border-green-700 bg-white dark:bg-green-950/40"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handlePreviewCSV}
                  disabled={!csvFile || uploading}
                  variant="outline"
                  className="flex-1 border-green-400 text-green-700 hover:bg-green-100 dark:text-green-300 dark:border-green-600 dark:hover:bg-green-900"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Pratinjau
                </Button>
                <Button
                  onClick={handleDownloadTemplate}
                  variant="outline"
                  size="sm"
                  className="gap-1 border-green-400 text-green-700 hover:bg-green-100 dark:text-green-300 dark:border-green-600 dark:hover:bg-green-900"
                >
                  <Download className="h-4 w-4" />
                  Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Google Sheets - Pink */}
          <Card className="border-2 border-pink-200 bg-pink-50 dark:bg-pink-950/20 dark:border-pink-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-800 dark:text-pink-300">
                <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                  <LinkIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                Google Sheets
              </CardTitle>
              <CardDescription className="text-pink-700 dark:text-pink-400">
                Import dari Google Sheets (pastikan publik)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
                className="border-pink-300 dark:border-pink-700 bg-white dark:bg-pink-950/40"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handlePreviewSheets}
                  disabled={!sheetsUrl || uploading}
                  variant="outline"
                  className="flex-1 border-pink-400 text-pink-700 hover:bg-pink-100 dark:text-pink-300 dark:border-pink-600 dark:hover:bg-pink-900"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Pratinjau
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sample Data - Kuning */}
          <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Database className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                Data Sample
              </CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-500">
                Gunakan data contoh untuk mencoba fitur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleUseSampleData}
                disabled={uploading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700"
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
            <CardDescription>
              Kelola dataset yang sudah diimport
            </CardDescription>
          </CardHeader>
          <CardContent>
            {datasets.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Belum ada dataset. Import data terlebih dahulu.
              </p>
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
                        <TableCell className="font-medium">
                          {dataset.nama_dataset}
                        </TableCell>
                        <TableCell>
                          {new Date(dataset.created_at).toLocaleDateString(
                            "id-ID",
                          )}
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
                                onClick={() =>
                                  handleSetActive(dataset.id_dataset)
                                }
                              >
                                Set Aktif
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleExportDataset(
                                  dataset.id_dataset,
                                  dataset.nama_dataset,
                                )
                              }
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
              <Alert
                variant={
                  previewData.validationResults.invalidRows > 0
                    ? "destructive"
                    : "default"
                }
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {previewData.validationResults.validRows} baris valid,{" "}
                  {previewData.validationResults.invalidRows} baris tidak valid
                  {previewData.validationResults.errors.length > 0 && (
                    <ul className="mt-2 text-sm list-disc list-inside">
                      {previewData.validationResults.errors.map(
                        (err: string, idx: number) => (
                          <li key={idx}>{err}</li>
                        ),
                      )}
                    </ul>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    {previewData?.headers
                      ?.split(",")
                      .map((header: string, idx: number) => (
                        <TableHead key={idx}>{header.trim()}</TableHead>
                      ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData?.sampleRows
                    ?.slice(0, 10)
                    .map((row: string[], rowIdx: number) => (
                      <TableRow key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                          <TableCell
                            key={cellIdx}
                            className="truncate max-w-[150px]"
                          >
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
                onClick={
                  previewSource === "csv" ? handleCsvUpload : handleSheetsImport
                }
                disabled={
                  uploading || previewData?.validationResults?.validRows === 0
                }
              >
                {uploading ? "Mengimpor..." : "Impor Data"}
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
                Apakah Anda yakin ingin menghapus dataset ini? Semua data
                postingan terkait juga akan dihapus.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteDataset}
                disabled={uploading}
              >
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
