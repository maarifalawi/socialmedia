import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Screenshot URLs from the actual app
const screenshots = {
  login: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/06be6a91-2d1b-4ebe-a849-7552f1671808/bb988807-9655-4218-ba04-9dd7d696e275.lovableproject.com-1767709885348.png"
};

const SDDReport = () => {
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleDownloadPDF = () => {
    toast.info("Untuk download PDF, gunakan tombol Print lalu pilih 'Save as PDF' pada dialog print");
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header - Hidden when printing */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} disabled={isPrinting}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF} disabled={isPrinting}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-4xl mx-auto pt-20 pb-12 px-8 print:pt-0 print:px-0">
        {/* Cover Page */}
        <div className="page-break-after mb-12 print:mb-0">
          <div className="text-center py-24 border-2 border-primary/20 rounded-lg print:border-0 print:py-32">
            <h1 className="text-4xl font-bold text-primary mb-4">Software Design Document</h1>
            <h2 className="text-3xl font-semibold text-foreground mb-8">SOCIAL MEDIA ANALYTICS DASHBOARD</h2>
            <p className="text-xl text-muted-foreground mb-12">Dokumen Rancangan Perangkat Lunak</p>
            
            <div className="inline-block text-left bg-muted/30 p-6 rounded-lg">
              <table className="text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Nama Penyusun</td>
                    <td className="py-1">: Maarif Alawi</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Jabatan</td>
                    <td className="py-1">: Ketua Tim Development</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Tanggal</td>
                    <td className="py-1">: 6 Januari 2025</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-medium">Versi</td>
                    <td className="py-1">: 1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <section className="mb-12 page-break-after">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b pb-2">Daftar Isi</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>1. PENDAHULUAN</span><span>3</span></div>
            <div className="flex justify-between pl-4"><span>1.1 Tujuan</span><span>3</span></div>
            <div className="flex justify-between pl-4"><span>1.2 Ruang Lingkup</span><span>3</span></div>
            <div className="flex justify-between pl-4"><span>1.3 Ikhtisar</span><span>4</span></div>
            <div className="flex justify-between pl-4"><span>1.4 Referensi Material</span><span>4</span></div>
            <div className="flex justify-between pl-4"><span>1.5 Definisi dan Singkatan</span><span>4</span></div>
            <div className="flex justify-between"><span>2. GAMBARAN UMUM SISTEM</span><span>5</span></div>
            <div className="flex justify-between"><span>3. ARSITEKTUR SISTEM</span><span>6</span></div>
            <div className="flex justify-between pl-4"><span>3.1 Rancangan Arsitektur</span><span>6</span></div>
            <div className="flex justify-between pl-4"><span>3.2 Deskripsi Dekomposisi</span><span>8</span></div>
            <div className="flex justify-between pl-4"><span>3.3 Alasan Rancangan</span><span>9</span></div>
            <div className="flex justify-between"><span>4. RANCANGAN DATA</span><span>10</span></div>
            <div className="flex justify-between"><span>5. RANCANGAN KOMPONEN</span><span>14</span></div>
            <div className="flex justify-between"><span>6. RANCANGAN ANTARMUKA</span><span>16</span></div>
            <div className="flex justify-between"><span>7. LAMPIRAN</span><span>20</span></div>
          </div>
        </section>

        {/* 1. PENDAHULUAN */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">1. PENDAHULUAN</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Dokumen Software Design Document (SDD) untuk <strong>Social Media Analytics Dashboard</strong> merupakan laporan teknis yang menjelaskan bagaimana sistem dikembangkan dan diimplementasikan berdasarkan kebutuhan pengguna UMKM (Usaha Mikro, Kecil, dan Menengah) dalam mengelola dan menganalisis performa konten sosial media mereka.
          </p>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">1.1 Tujuan</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Software Design Document ini menyediakan detail desain dari Social Media Analytics Dashboard berbasis website. Pengguna yang diharapkan adalah UMKM dan Content Creator sebagai pengguna utama, Social Media Manager sebagai pengelola, dan Tim Development sebagai referensi teknis.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">1.2 Ruang Lingkup</h3>
          <div className="text-sm text-muted-foreground mb-4">
            <p className="mb-3">Dokumen ini berisi deskripsi lengkap dari desain sistem informasi Social Media Analytics Dashboard dengan arsitektur:</p>
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Framework</td>
                      <td className="py-2">React 18.3.1 + Vite</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Language</td>
                      <td className="py-2">TypeScript</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Styling</td>
                      <td className="py-2">Tailwind CSS + shadcn/ui</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Database</td>
                      <td className="py-2">PostgreSQL (via Supabase)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Authentication</td>
                      <td className="py-2">Supabase Auth (JWT)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Serverless Functions</td>
                      <td className="py-2">Deno-based Edge Functions</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">1.3 Ikhtisar</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Bagian</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Bagian 1</td><td className="border p-2">Gambaran umum fungsi SDD</td></tr>
              <tr><td className="border p-2">Bagian 2</td><td className="border p-2">Gambaran umum sistem</td></tr>
              <tr><td className="border p-2">Bagian 3</td><td className="border p-2">Arsitektur sistem (use case, activity diagram)</td></tr>
              <tr><td className="border p-2">Bagian 4</td><td className="border p-2">Rancangan data dan struktur database</td></tr>
              <tr><td className="border p-2">Bagian 5</td><td className="border p-2">Komponen sistem dan sequence diagram</td></tr>
              <tr><td className="border p-2">Bagian 6</td><td className="border p-2">Rancangan antarmuka pengguna</td></tr>
              <tr><td className="border p-2">Bagian 7</td><td className="border p-2">Lampiran</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">1.4 Referensi Material</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">No</th>
                <th className="border p-2 text-left">Referensi</th>
                <th className="border p-2 text-left">URL</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">1</td><td className="border p-2">React Documentation</td><td className="border p-2">https://react.dev</td></tr>
              <tr><td className="border p-2">2</td><td className="border p-2">Supabase Documentation</td><td className="border p-2">https://supabase.com/docs</td></tr>
              <tr><td className="border p-2">3</td><td className="border p-2">Tailwind CSS</td><td className="border p-2">https://tailwindcss.com</td></tr>
              <tr><td className="border p-2">4</td><td className="border p-2">shadcn/ui</td><td className="border p-2">https://ui.shadcn.com</td></tr>
              <tr><td className="border p-2">5</td><td className="border p-2">IEEE Std 1016-2009</td><td className="border p-2">Standar SDD</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">1.5 Definisi dan Singkatan</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Istilah</th>
                <th className="border p-2 text-left">Definisi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-medium">API</td><td className="border p-2">Application Programming Interface</td></tr>
              <tr><td className="border p-2 font-medium">BaaS</td><td className="border p-2">Backend-as-a-Service</td></tr>
              <tr><td className="border p-2 font-medium">ER</td><td className="border p-2">Engagement Rate - Tingkat keterlibatan audiens</td></tr>
              <tr><td className="border p-2 font-medium">JWT</td><td className="border p-2">JSON Web Token - Token autentikasi</td></tr>
              <tr><td className="border p-2 font-medium">KPI</td><td className="border p-2">Key Performance Indicator</td></tr>
              <tr><td className="border p-2 font-medium">RLS</td><td className="border p-2">Row Level Security</td></tr>
              <tr><td className="border p-2 font-medium">SPA</td><td className="border p-2">Single Page Application</td></tr>
              <tr><td className="border p-2 font-medium">UMKM</td><td className="border p-2">Usaha Mikro, Kecil, dan Menengah</td></tr>
            </tbody>
          </table>
        </section>

        {/* 2. GAMBARAN UMUM SISTEM */}
        <section className="mb-10 page-break-before">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">2. GAMBARAN UMUM SISTEM</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">2.1 Deskripsi Sistem</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Social Media Analytics Dashboard adalah aplikasi web berbasis SPA (Single Page Application) yang dirancang khusus untuk membantu UMKM dan content creator dalam menganalisis performa konten sosial media mereka.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">2.2 Tujuan Sistem</h3>
          <ol className="text-sm text-muted-foreground mb-4 list-decimal list-inside space-y-1">
            <li><strong>Centralized Analytics</strong> - Platform terpusat untuk analisis multi-platform</li>
            <li><strong>Data-Driven Decision Making</strong> - Keputusan berdasarkan data performa</li>
            <li><strong>Time Optimization</strong> - Identifikasi waktu terbaik posting</li>
            <li><strong>Competitor Benchmarking</strong> - Perbandingan dengan kompetitor</li>
            <li><strong>AI-Powered Insights</strong> - Generate caption dan rekomendasi dengan AI</li>
          </ol>

          <h3 className="text-lg font-semibold text-foreground mb-3">2.3 Fitur Utama</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">No</th>
                <th className="border p-2 text-left">Fitur</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">1</td><td className="border p-2 font-medium">Dashboard Interaktif</td><td className="border p-2">KPI cards, charts, trend analysis</td></tr>
              <tr><td className="border p-2">2</td><td className="border p-2 font-medium">Import Data CSV</td><td className="border p-2">Validasi dan mapping otomatis</td></tr>
              <tr><td className="border p-2">3</td><td className="border p-2 font-medium">Analisis Performa</td><td className="border p-2">ER, reach, likes, comments, shares</td></tr>
              <tr><td className="border p-2">4</td><td className="border p-2 font-medium">Waktu Terbaik</td><td className="border p-2">Identifikasi waktu posting optimal</td></tr>
              <tr><td className="border p-2">5</td><td className="border p-2 font-medium">Target KPI</td><td className="border p-2">Penetapan dan tracking target</td></tr>
              <tr><td className="border p-2">6</td><td className="border p-2 font-medium">AI Caption Generator</td><td className="border p-2">Generate caption dengan Gemini AI</td></tr>
              <tr><td className="border p-2">7</td><td className="border p-2 font-medium">Analisis Kompetitor</td><td className="border p-2">Benchmarking dengan kompetitor</td></tr>
              <tr><td className="border p-2">8</td><td className="border p-2 font-medium">Laporan PDF/Excel</td><td className="border p-2">Export laporan profesional</td></tr>
              <tr><td className="border p-2">9</td><td className="border p-2 font-medium">Manajemen Tim</td><td className="border p-2">Role-based access control</td></tr>
              <tr><td className="border p-2">10</td><td className="border p-2 font-medium">Sistem Bantuan</td><td className="border p-2">Q&A dengan notifikasi email</td></tr>
            </tbody>
          </table>
        </section>

        {/* 3. ARSITEKTUR SISTEM */}
        <section className="mb-10 page-break-before">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">3. ARSITEKTUR SISTEM</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">3.1 Rancangan Arsitektur</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`┌─────────────────────────────────────────────────────┐
│                   CLIENT LAYER                       │
│  ┌───────────────────────────────────────────────┐  │
│  │              React SPA (Vite)                  │  │
│  │   Pages │ Components │ Hooks │ Contexts        │  │
│  └───────────────────────────────────────────────┘  │
│                        │                            │
│                        ▼                            │
│  ┌───────────────────────────────────────────────┐  │
│  │         Supabase JavaScript Client            │  │
│  └───────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────┐
│                  SUPABASE LAYER                      │
│  ┌───────────────────────────────────────────────┐  │
│  │              Edge Functions                    │  │
│  │  • generate-caption (Gemini AI)               │  │
│  │  • notify-admin-new-question                  │  │
│  │  • notify-user-question-answered              │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │              Supabase Auth                     │  │
│  │      (JWT, Session, RLS Policies)             │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │            PostgreSQL Database                 │  │
│  │       (17 Tables, RLS, Functions)             │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │             Supabase Storage                   │  │
│  │          (Avatars, Documents)                 │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘`}</pre>
          </div>

          <h4 className="text-md font-semibold text-foreground mb-3">3.1.1 Use Case User</h4>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`                    ┌──────────┐
                    │   USER   │
                    └────┬─────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
┌─────────┐       ┌─────────────┐       ┌──────────┐
│ Auth    │       │  Manajemen  │       │ Analisis │
│ Akun    │       │   Proyek    │       │   Data   │
└────┬────┘       └──────┬──────┘       └────┬─────┘
     │                   │                   │
┌────┴────┐       ┌──────┴──────┐       ┌────┴─────┐
│Register │       │Create       │       │Dashboard │
│Login    │       │Project      │       │Performa  │
│Logout   │       │Invite       │       │Waktu     │
└─────────┘       │Member       │       │Audiens   │
                  └─────────────┘       │Laporan   │
                                        └──────────┘`}</pre>
          </div>

          <h4 className="text-md font-semibold text-foreground mb-3">3.1.2 Use Case Admin</h4>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`                    ┌──────────┐
                    │  ADMIN   │
                    └────┬─────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
┌──────────┐      ┌────────────┐      ┌───────────┐
│ Platform │      │Jenis Konten│      │  Support  │
│ CRUD     │      │   CRUD     │      │  Bantuan  │
└──────────┘      └────────────┘      └─────┬─────┘
                                            │
                                    ┌───────┴───────┐
                                    │ View All Q&A  │
                                    │ Answer Q&A    │
                                    │ Delete Q&A    │
                                    └───────────────┘`}</pre>
          </div>

          <h4 className="text-md font-semibold text-foreground mb-3">3.1.3 Activity Diagram User</h4>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`    ┌───────┐
    │ START │
    └───┬───┘
        ▼
   ┌─────────┐      ┌────────────┐
   │ Login?  │──No─▶│  Register  │
   └────┬────┘      └──────┬─────┘
        │Yes               │
        ▼                  │
   ┌─────────┐◀────────────┘
   │  Login  │
   └────┬────┘
        ▼
   ┌──────────┐     ┌────────────┐
   │Ada Proyek│─No─▶│Buat Proyek │
   └────┬─────┘     └──────┬─────┘
        │Yes               │
        ▼                  │
   ┌──────────┐◀───────────┘
   │Ada Data? │     ┌────────────┐
   └────┬─────┘─No─▶│Import CSV  │
        │Yes        └──────┬─────┘
        ▼                  │
   ┌──────────┐◀───────────┘
   │Dashboard │
   └────┬─────┘
        │
   ┌────┴────────┬─────────┬─────────┐
   ▼             ▼         ▼         ▼
┌───────┐   ┌───────┐ ┌───────┐ ┌───────┐
│Performa│  │Waktu  │ │Compare│ │Laporan│
└───────┘   │Terbaik│ └───────┘ └───────┘
            └───────┘`}</pre>
          </div>

          <h4 className="text-md font-semibold text-foreground mb-3">3.1.4 Activity Diagram Admin</h4>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`    ┌───────┐
    │ START │
    └───┬───┘
        ▼
   ┌──────────┐
   │Login Admin│
   └────┬─────┘
        ▼
   ┌──────────┐
   │Dashboard │
   │Admin Panel│
   └────┬─────┘
        │
   ┌────┴────────────┐
   ▼                 ▼
┌───────────┐   ┌──────────┐
│Master Data│   │ Support  │
│ Platform  │   │ Bantuan  │
│Jenis Konten│  └────┬─────┘
└───────────┘        │
                     ▼
                ┌──────────┐
                │View Q&A  │
                │Answer Q&A│
                │(Email)   │
                └──────────┘`}</pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">3.2 Deskripsi Dekomposisi</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Layer</th>
                <th className="border p-2 text-left">Path</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Pages</td><td className="border p-2 font-mono text-xs">src/pages/</td><td className="border p-2">18 halaman utama (Dashboard, Import, Performa, dll)</td></tr>
              <tr><td className="border p-2">Components</td><td className="border p-2 font-mono text-xs">src/components/</td><td className="border p-2">UI components, charts, layout</td></tr>
              <tr><td className="border p-2">Contexts</td><td className="border p-2 font-mono text-xs">src/contexts/</td><td className="border p-2">AuthContext, AppContext, NotificationContext</td></tr>
              <tr><td className="border p-2">Hooks</td><td className="border p-2 font-mono text-xs">src/hooks/</td><td className="border p-2">Custom React hooks</td></tr>
              <tr><td className="border p-2">Edge Functions</td><td className="border p-2 font-mono text-xs">supabase/functions/</td><td className="border p-2">3 serverless functions</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">3.3 Alasan Rancangan</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Keputusan</th>
                <th className="border p-2 text-left">Alasan</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-medium">Serverless Architecture</td><td className="border p-2">Auto-scale, pay-per-use, tidak perlu manage server</td></tr>
              <tr><td className="border p-2 font-medium">React + TypeScript</td><td className="border p-2">Type safety, component reusability, mature ecosystem</td></tr>
              <tr><td className="border p-2 font-medium">Row Level Security</td><td className="border p-2">Data isolation per user, centralized security, automatic enforcement</td></tr>
              <tr><td className="border p-2 font-medium">Edge Functions</td><td className="border p-2">Low latency, secure API keys, scalable</td></tr>
            </tbody>
          </table>
        </section>

        {/* 4. RANCANGAN DATA */}
        <section className="mb-10 page-break-before">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">4. RANCANGAN DATA</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">4.1 Deskripsi Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sistem menggunakan PostgreSQL database dengan 17 tabel yang terbagi dalam beberapa kategori:
          </p>
          
          <table className="w-full text-xs border mb-6">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Kategori</th>
                <th className="border p-2 text-left">Tabel</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Identitas</td><td className="border p-2 font-mono">profil</td><td className="border p-2">Data profil pengguna</td></tr>
              <tr><td className="border p-2">Proyek</td><td className="border p-2 font-mono">proyek, anggota_proyek</td><td className="border p-2">Proyek dan akses anggota</td></tr>
              <tr><td className="border p-2">Data</td><td className="border p-2 font-mono">dataset, postingan, log_impor</td><td className="border p-2">Data posting dan log</td></tr>
              <tr><td className="border p-2">Master</td><td className="border p-2 font-mono">platform, jenis_konten, kampanye</td><td className="border p-2">Data referensi</td></tr>
              <tr><td className="border p-2">Perencanaan</td><td className="border p-2 font-mono">target_kpi, jadwal_konten</td><td className="border p-2">Target dan penjadwalan</td></tr>
              <tr><td className="border p-2">Kompetitor</td><td className="border p-2 font-mono">kompetitor, data_kompetitor</td><td className="border p-2">Benchmarking</td></tr>
              <tr><td className="border p-2">User Actions</td><td className="border p-2 font-mono">filter_tersimpan, catatan, riwayat_export</td><td className="border p-2">Aktivitas pengguna</td></tr>
              <tr><td className="border p-2">Support</td><td className="border p-2 font-mono">pertanyaan</td><td className="border p-2">Q&A bantuan</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">4.2 Entity Relationship Diagram</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`                        ┌─────────┐
                        │ PROFIL  │◄────────────────────┐
                        │─────────│                     │
                        │id_profil│                     │
                        │nama     │                     │
                        │peran    │                     │
                        └────┬────┘                     │
                             │                          │
        ┌────────────────────┼──────────────────┐      │
        │                    │                  │      │
        ▼                    ▼                  ▼      │
   ┌─────────┐         ┌──────────┐      ┌──────────┐ │
   │ PROYEK  │         │ CATATAN  │      │PERTANYAAN│─┘
   │─────────│         │──────────│      │──────────│
   │id_proyek│◄──┐     │id_catatan│      │id_pertanyaan│
   │id_pemilik│   │    │id_proyek │      │id_pengguna│
   │nama     │   │     │isi      │      │status    │
   └────┬────┘   │     └──────────┘      └──────────┘
        │        │
   ┌────┴────┬───┴────┬──────────┐
   │         │        │          │
   ▼         ▼        ▼          ▼
┌──────┐ ┌───────┐ ┌───────┐ ┌────────┐
│ANGGOTA││DATASET││KAMPANYE││TARGET  │
│PROYEK ││       ││        ││KPI     │
│──────││───────││───────││────────│
│id    ││id_data││id     ││id      │
│id_proy││id_proy││id_proy││id_proy │
│peran ││nama   ││nama   ││periode │
└──────┘└───┬───┘└───┬───┘└────────┘
            │        │
            ▼        │
       ┌─────────┐   │
       │POSTINGAN│◄──┘
       │─────────│
       │id_post  │
       │id_dataset│──────▶┌─────────┐
       │id_platform│       │PLATFORM │
       │id_jenis│──────▶┌─────────┐
       │id_kampanye│      │JENIS    │
       │engagement│      │KONTEN   │
       └─────────┘       └─────────┘`}</pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">4.3 Kamus Data (Tabel Utama)</h3>
          
          <h4 className="text-md font-semibold text-foreground mb-2">Tabel: postingan</h4>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Kolom</th>
                <th className="border p-2 text-left">Tipe</th>
                <th className="border p-2 text-left">Nullable</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-mono">id_postingan</td><td className="border p-2">UUID</td><td className="border p-2">No</td><td className="border p-2">Primary key</td></tr>
              <tr><td className="border p-2 font-mono">id_proyek</td><td className="border p-2">UUID</td><td className="border p-2">No</td><td className="border p-2">FK ke proyek</td></tr>
              <tr><td className="border p-2 font-mono">id_dataset</td><td className="border p-2">UUID</td><td className="border p-2">No</td><td className="border p-2">FK ke dataset</td></tr>
              <tr><td className="border p-2 font-mono">id_platform</td><td className="border p-2">UUID</td><td className="border p-2">No</td><td className="border p-2">FK ke platform</td></tr>
              <tr><td className="border p-2 font-mono">waktu_diposting</td><td className="border p-2">TIMESTAMPTZ</td><td className="border p-2">No</td><td className="border p-2">Waktu posting</td></tr>
              <tr><td className="border p-2 font-mono">jumlah_likes</td><td className="border p-2">INTEGER</td><td className="border p-2">No</td><td className="border p-2">Jumlah likes</td></tr>
              <tr><td className="border p-2 font-mono">jumlah_reach</td><td className="border p-2">INTEGER</td><td className="border p-2">No</td><td className="border p-2">Jumlah reach</td></tr>
              <tr><td className="border p-2 font-mono">engagement_rate_persen</td><td className="border p-2">NUMERIC</td><td className="border p-2">Yes</td><td className="border p-2">ER dalam %</td></tr>
            </tbody>
          </table>
        </section>

        {/* 5. RANCANGAN KOMPONEN */}
        <section className="mb-10 page-break-before">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">5. RANCANGAN KOMPONEN</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">5.1 Admin Sequence: Menjawab Pertanyaan</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`┌─────┐    ┌──────────┐    ┌────────┐    ┌────────┐    ┌──────┐
│Admin│    │BantuanAdmin│   │Supabase│    │EdgeFunc│    │Resend│
└──┬──┘    └─────┬─────┘    └───┬────┘    └───┬────┘    └──┬───┘
   │             │              │             │            │
   │ 1.Buka Page │              │             │            │
   │────────────▶│              │             │            │
   │             │ 2.Fetch Q&A  │             │            │
   │             │─────────────▶│             │            │
   │             │ 3.Return Data│             │            │
   │             │◀─────────────│             │            │
   │ 4.Tulis     │              │             │            │
   │   Jawaban   │              │             │            │
   │────────────▶│              │             │            │
   │ 5.Submit    │              │             │            │
   │────────────▶│              │             │            │
   │             │ 6.UPDATE     │             │            │
   │             │─────────────▶│             │            │
   │             │              │ 7.Trigger   │            │
   │             │              │────────────▶│            │
   │             │              │             │ 8.SendEmail│
   │             │              │             │───────────▶│
   │             │ 9.Success    │             │            │
   │             │◀─────────────│             │            │
   │10.Toast OK  │              │             │            │
   │◀────────────│              │             │            │`}</pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">5.2 User Sequence: Import Data CSV</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`┌────┐    ┌──────┐    ┌───────┐    ┌────────┐
│User│    │Import│    │PapaParse│   │Supabase│
└─┬──┘    └──┬───┘    └───┬───┘    └───┬────┘
  │          │            │            │
  │1.Upload  │            │            │
  │  CSV     │            │            │
  │─────────▶│            │            │
  │          │ 2.Parse    │            │
  │          │───────────▶│            │
  │          │ 3.Parsed   │            │
  │          │◀───────────│            │
  │          │ 4.Validate │            │
  │          │────────────┤            │
  │5.Preview │            │            │
  │◀─────────│            │            │
  │6.Confirm │            │            │
  │─────────▶│            │            │
  │          │ 7.Create   │            │
  │          │   Dataset  │            │
  │          │───────────────────────▶│
  │          │ 8.Insert   │            │
  │          │   Posts    │            │
  │          │───────────────────────▶│
  │          │ 9.Log      │            │
  │          │───────────────────────▶│
  │10.Success│            │            │
  │  Redirect│            │            │
  │◀─────────│            │            │`}</pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">5.3 User Sequence: Generate AI Caption</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`┌────┐    ┌─────────┐    ┌────────┐    ┌──────┐
│User│    │ Caption │    │EdgeFunc│    │Gemini│
└─┬──┘    └────┬────┘    └───┬────┘    └──┬───┘
  │            │             │            │
  │1.Fill Form │             │            │
  │───────────▶│             │            │
  │2.Generate  │             │            │
  │───────────▶│             │            │
  │            │ 3.Call Func │            │
  │            │────────────▶│            │
  │            │             │ 4.Build    │
  │            │             │   Prompt   │
  │            │             │────────────┤
  │            │             │ 5.Call API │
  │            │             │───────────▶│
  │            │             │ 6.Response │
  │            │             │◀───────────│
  │            │ 7.Return    │            │
  │            │◀────────────│            │
  │8.Display   │             │            │
  │  Captions  │             │            │
  │◀───────────│             │            │
  │9.Copy      │             │            │
  │───────────▶│             │            │`}</pre>
          </div>
        </section>

        {/* 6. RANCANGAN ANTARMUKA */}
        <section className="mb-10 page-break-before">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">6. RANCANGAN ANTARMUKA</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">6.1 Gambaran Umum Antarmuka</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sistem menggunakan design system berbasis shadcn/ui dengan Tailwind CSS yang mendukung Dark/Light Mode, Responsive Design, dan Consistent Components.
          </p>

          <h4 className="text-md font-semibold text-foreground mb-3">6.1.1 Struktur Navigasi User</h4>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`                    ┌───────────┐
                    │ Dashboard │
                    └─────┬─────┘
                          │
   ┌──────────┬───────────┼───────────┬──────────┐
   │          │           │           │          │
   ▼          ▼           ▼           ▼          ▼
┌──────┐  ┌───────┐  ┌─────────┐ ┌───────┐ ┌───────┐
│Analytics│ │Planning│ │  Tools  │ │Laporan│ │Account│
└───┬──┘  └───┬───┘  └────┬────┘ └───────┘ └───────┘
    │         │           │
┌───┴───┐ ┌───┴───┐  ┌────┴────┐
│Performa│ │Target │  │Caption  │
│Waktu  │ │KPI    │  │Generator│
│Audiens│ │Kampanye│ │Kompetitor│
│Compare│ └───────┘  └─────────┘
└───────┘`}</pre>
          </div>

          <h4 className="text-md font-semibold text-foreground mb-3">6.1.2 Struktur Navigasi Admin</h4>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 font-mono text-xs overflow-x-auto">
            <pre>{`                    ┌───────────┐
                    │ Dashboard │
                    └─────┬─────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ┌─────────┐      ┌───────────┐     ┌─────────┐
   │Analytics│      │Admin Panel│     │ Account │
   │(Semua)  │      └─────┬─────┘     └─────────┘
   └─────────┘            │
                   ┌──────┴──────┐
                   │             │
                   ▼             ▼
              ┌─────────┐  ┌─────────┐
              │ Master  │  │ Bantuan │
              │ Data    │  │ Admin   │
              └─────────┘  └─────────┘`}</pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">6.2 Tampilan Layar</h3>
          
          <h4 className="text-md font-semibold text-foreground mb-3">6.2.1 Halaman Login/Register</h4>
          <Card className="mb-4">
            <CardContent className="pt-4">
              <img 
                src={screenshots.login} 
                alt="Halaman Login Analytics Sosmed"
                className="w-full rounded-lg border"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Screenshot: Halaman Login dengan tab Login/Daftar
              </p>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground mb-4">
            Halaman autentikasi menampilkan form login dan registrasi dengan komponen: Logo aplikasi, Tab switcher, Input Email & Password, dan Tombol Submit.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3">6.3 Objek Layar dan Tindakan</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Halaman</th>
                <th className="border p-2 text-left">Objek</th>
                <th className="border p-2 text-left">Tipe</th>
                <th className="border p-2 text-left">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Login</td><td className="border p-2">Tab Login</td><td className="border p-2">Tab Button</td><td className="border p-2">Tampilkan form login</td></tr>
              <tr><td className="border p-2">Login</td><td className="border p-2">Input Email</td><td className="border p-2">Text Field</td><td className="border p-2">Input email</td></tr>
              <tr><td className="border p-2">Dashboard</td><td className="border p-2">KPI Card</td><td className="border p-2">Display Card</td><td className="border p-2">Tampilkan metrik</td></tr>
              <tr><td className="border p-2">Dashboard</td><td className="border p-2">Line Chart</td><td className="border p-2">Interactive Chart</td><td className="border p-2">Hover untuk detail</td></tr>
              <tr><td className="border p-2">Import</td><td className="border p-2">File Upload</td><td className="border p-2">Drop Zone</td><td className="border p-2">Drag & drop file</td></tr>
              <tr><td className="border p-2">Caption</td><td className="border p-2">Generate Button</td><td className="border p-2">Button</td><td className="border p-2">Generate caption AI</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">6.4 Matriks Persyaratan</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Halaman</th>
                <th className="border p-2 text-center">Admin</th>
                <th className="border p-2 text-center">Owner</th>
                <th className="border p-2 text-center">Editor</th>
                <th className="border p-2 text-center">Viewer</th>
                <th className="border p-2 text-center">Guest</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Login/Register</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td></tr>
              <tr><td className="border p-2">Dashboard</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✗</td></tr>
              <tr><td className="border p-2">Import Data</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td></tr>
              <tr><td className="border p-2">Anggota Proyek</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td></tr>
              <tr><td className="border p-2">Bantuan Admin</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td></tr>
              <tr><td className="border p-2">Admin Master Data</td><td className="border p-2 text-center">✓</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td><td className="border p-2 text-center">✗</td></tr>
            </tbody>
          </table>
        </section>

        {/* 7. LAMPIRAN */}
        <section className="mb-10 page-break-before">
          <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">7. LAMPIRAN</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">7.1 Daftar Enums Database</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Enum</th>
                <th className="border p-2 text-left">Values</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-mono">app_role</td><td className="border p-2">'admin', 'user'</td><td className="border p-2">Role sistem</td></tr>
              <tr><td className="border p-2 font-mono">project_role</td><td className="border p-2">'owner', 'admin', 'editor', 'viewer'</td><td className="border p-2">Role proyek</td></tr>
              <tr><td className="border p-2 font-mono">source_type</td><td className="border p-2">'upload_csv', 'google_sheets', 'api_connection'</td><td className="border p-2">Sumber data</td></tr>
              <tr><td className="border p-2 font-mono">import_status</td><td className="border p-2">'pending', 'success', 'error'</td><td className="border p-2">Status import</td></tr>
              <tr><td className="border p-2 font-mono">period_type</td><td className="border p-2">'weekly', 'monthly'</td><td className="border p-2">Jenis periode</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">7.2 Daftar Edge Functions</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Function</th>
                <th className="border p-2 text-left">Trigger</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-mono">generate-caption</td><td className="border p-2">HTTP</td><td className="border p-2">Generate caption dengan Gemini AI</td></tr>
              <tr><td className="border p-2 font-mono">notify-admin-new-question</td><td className="border p-2">DB Trigger</td><td className="border p-2">Email notifikasi ke admin</td></tr>
              <tr><td className="border p-2 font-mono">notify-user-question-answered</td><td className="border p-2">DB Trigger</td><td className="border p-2">Email notifikasi ke user</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">7.3 Daftar Database Functions (RLS)</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Function</th>
                <th className="border p-2 text-left">Returns</th>
                <th className="border p-2 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-mono">has_project_access(project_id)</td><td className="border p-2">BOOLEAN</td><td className="border p-2">Cek akses user ke proyek</td></tr>
              <tr><td className="border p-2 font-mono">is_admin()</td><td className="border p-2">BOOLEAN</td><td className="border p-2">Cek apakah user admin</td></tr>
              <tr><td className="border p-2 font-mono">handle_new_user()</td><td className="border p-2">TRIGGER</td><td className="border p-2">Auto-create profil saat register</td></tr>
              <tr><td className="border p-2 font-mono">get_user_display_name(user_id)</td><td className="border p-2">TEXT</td><td className="border p-2">Ambil nama tampilan user</td></tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-foreground mb-3">7.4 Environment Variables</h3>
          <table className="w-full text-xs border mb-4">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2 text-left">Variable</th>
                <th className="border p-2 text-left">Deskripsi</th>
                <th className="border p-2 text-left">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2 font-mono">VITE_SUPABASE_URL</td><td className="border p-2">URL Supabase project</td><td className="border p-2">Yes</td></tr>
              <tr><td className="border p-2 font-mono">VITE_SUPABASE_PUBLISHABLE_KEY</td><td className="border p-2">Supabase anon key</td><td className="border p-2">Yes</td></tr>
              <tr><td className="border p-2 font-mono">GEMINI_API_KEY</td><td className="border p-2">Google Gemini AI API key</td><td className="border p-2">Yes (Edge)</td></tr>
              <tr><td className="border p-2 font-mono">RESEND_API_KEY</td><td className="border p-2">Resend email API key</td><td className="border p-2">Yes (Edge)</td></tr>
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <section className="mt-16 pt-8 border-t text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Riwayat Revisi Dokumen</h3>
          <table className="w-full text-xs border mb-6">
            <thead className="bg-muted">
              <tr>
                <th className="border p-2">Versi</th>
                <th className="border p-2">Tanggal</th>
                <th className="border p-2">Penulis</th>
                <th className="border p-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1.0</td>
                <td className="border p-2">6 Januari 2025</td>
                <td className="border p-2">Maarif Alawi</td>
                <td className="border p-2">Dokumen awal</td>
              </tr>
            </tbody>
          </table>
          
          <p className="text-sm text-muted-foreground">
            Dokumen ini dibuat sebagai panduan teknis untuk pengembangan dan maintenance Social Media Analytics Dashboard.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 Maarif Alawi - All Rights Reserved
          </p>
        </section>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          @page {
            margin: 1.5cm;
            size: A4;
          }
          
          table {
            page-break-inside: avoid;
          }
          
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }
      `}</style>
    </div>
  );
};

export default SDDReport;
