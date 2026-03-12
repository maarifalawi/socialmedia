# Software Design Document (SDD)
## Sistem Analisis Performa Konten Digital

**Versi**: 1.0  
**Tanggal**: 30 November 2025  
**Penyusun**: Maarif Alawi  
**Status**: Final

---

## DAFTAR ISI

1. [Tujuan Proyek](#1-tujuan-proyek)
2. [Pendahuluan](#2-pendahuluan)
3. [Ruang Lingkup](#3-ruang-lingkup)
4. [Ikhtisar](#4-ikhtisar)
5. [Referensi Material](#5-referensi-material)
6. [Definisi dan Singkatan](#6-definisi-dan-singkatan)
7. [Gambaran Umum Sistem](#7-gambaran-umum-sistem)
8. [Arsitektur Sistem](#8-arsitektur-sistem)
9. [Rancangan Arsitektur](#9-rancangan-arsitektur)
10. [Rancangan Arsitektur Detail](#10-rancangan-arsitektur-detail)
11. [Alasan Rancangan](#11-alasan-rancangan)
12. [Rancangan Data](#12-rancangan-data)
13. [Deskripsi Data](#13-deskripsi-data)
14. [Kamus Data](#14-kamus-data)
15. [Rancangan Komponen](#15-rancangan-komponen)
16. [Rancangan Antarmuka](#16-rancangan-antarmuka)
17. [Gambaran Umum Antarmuka](#17-gambaran-umum-antarmuka)
18. [Tampilan Layar](#18-tampilan-layar)
19. [Objek Layar dan Tindakan](#19-objek-layar-dan-tindakan)
20. [Matriks Persyaratan](#20-matriks-persyaratan)

---

## 1. Tujuan Proyek

### 1.1 Tujuan dari Perspektif Pengguna

Sistem Analisis Performa Konten Digital dikembangkan untuk membantu content creator, UMKM, dan brand dalam menganalisis performa konten media sosial mereka secara terstruktur dan berbasis data. Sistem ini bertujuan untuk:

1. **Menyederhanakan Analisis Data**: Mengubah proses analisis manual yang memakan waktu (menggunakan Excel atau spreadsheet) menjadi proses otomatis dengan visualisasi yang mudah dipahami.

2. **Memberikan Insight Actionable**: Menyediakan insight otomatis tentang:
   - Waktu terbaik untuk posting konten
   - Jenis konten yang paling efektif
   - Platform yang memberikan engagement terbaik
   - Trend performa dari waktu ke waktu

3. **Meningkatkan Produktivitas**: Melalui fitur AI Caption Generator yang membantu pembuatan caption konten, dan fitur perbandingan dataset untuk evaluasi strategi konten.

4. **Mendukung Pengambilan Keputusan**: Dengan menyediakan data kompetitor dan target KPI yang terukur, membantu pengguna membuat keputusan strategis berbasis data.

### 1.2 Tujuan Akademik

Dari perspektif akademik, proyek ini bertujuan untuk:

1. **Menerapkan Prinsip Rekayasa Perangkat Lunak**: Mengimplementasikan metodologi pengembangan perangkat lunak yang terstruktur, mulai dari analisis kebutuhan (SRS), perancangan sistem (SDD), hingga implementasi dan pengujian.

2. **Mengintegrasikan Teknologi Modern**: Menggabungkan teknologi web modern (React, TypeScript, Tailwind CSS) dengan arsitektur serverless (Supabase) dan AI (Google Gemini API) dalam satu sistem yang kohesif.

3. **Menerapkan Database Design Best Practices**: Merancang dan mengimplementasikan skema database yang normalized, aman (dengan Row Level Security), dan scalable.

4. **Memahami Security Implementation**: Menerapkan sistem autentikasi, otorisasi berbasis role, dan RLS policies untuk melindungi data pengguna.

5. **Dokumentasi Teknis Komprehensif**: Menghasilkan dokumentasi SDD yang lengkap sebagai acuan implementasi dan maintenance sistem.

---

## 2. Pendahuluan

### 2.1 Tujuan Dokumen

Software Design Document (SDD) ini disusun sebagai panduan teknis lengkap untuk pengembangan Sistem Analisis Performa Konten Digital. Dokumen ini berfungsi sebagai:

1. **Panduan Implementasi**: Memberikan blueprint detail tentang arsitektur sistem, struktur data, komponen, dan antarmuka yang harus diimplementasikan oleh developer.

2. **Acuan Pengujian**: Menyediakan spesifikasi detail yang dapat dijadikan basis untuk merancang test case dan melakukan quality assurance.

3. **Lanjutan dari SRS**: Menerjemahkan kebutuhan fungsional dan non-fungsional yang telah didefinisikan dalam Software Requirements Specification (SRS) menjadi desain teknis yang konkret.

4. **Dokumentasi Teknis**: Berfungsi sebagai referensi untuk maintenance, troubleshooting, dan pengembangan fitur baru di masa mendatang.

5. **Komunikasi Tim**: Memfasilitasi komunikasi antara stakeholder teknis (developer, database administrator, UI/UX designer) dengan memiliki satu sumber kebenaran tentang desain sistem.

### 2.2 Ruang Lingkup Singkat

Sistem Analisis Performa Konten Digital adalah aplikasi web berbasis Single Page Application (SPA) yang menyediakan fitur-fitur utama berikut:

1. **Manajemen Data Konten**: Import data postingan dari CSV atau Google Sheets, dengan validasi dan logging otomatis.

2. **Dashboard Analitik**: Visualisasi KPI utama (Engagement Rate, Reach, Followers) dengan grafik interaktif dan insight otomatis.

3. **Analisis Lanjutan**: 
   - Analisis performa postingan (top/worst posts)
   - Analisis waktu terbaik posting (per hari dan jam)
   - Analisis karakteristik audiens
   - Perbandingan multi-dataset

4. **Perencanaan Konten**: Pengelolaan kampanye dan target KPI dengan tracking progress.

5. **AI Tools**: 
   - Caption generator berbasis Google Gemini
   - Analisis kompetitor dengan benchmarking

6. **Sistem Bantuan**: Q&A system dengan notifikasi email otomatis untuk admin dan user.

7. **Pelaporan**: Export data ke Excel dan generate laporan PDF dengan visualisasi.

### 2.3 Ikhtisar Dokumen

Dokumen SDD ini terdiri dari 20 bab yang disusun secara terstruktur:

- **Bab 1-6**: Memberikan konteks, tujuan, referensi, dan definisi yang diperlukan untuk memahami dokumen.

- **Bab 7-8**: Menjelaskan gambaran umum sistem dan arsitektur tingkat tinggi (high-level architecture).

- **Bab 9-11**: Menguraikan rancangan arsitektur detail dengan UML diagrams (use case, activity, sequence) dan justifikasi pemilihan pendekatan desain.

- **Bab 12-14**: Fokus pada perancangan data, meliputi ERD, deskripsi entitas dan relasi, serta kamus data lengkap.

- **Bab 15**: Menjelaskan rancangan komponen-komponen sistem dan interaksinya.

- **Bab 16-19**: Menguraikan rancangan antarmuka pengguna, termasuk layout, navigasi, tampilan layar, dan interaksi user.

- **Bab 20**: Menyajikan matriks traceability yang menghubungkan requirement dengan komponen dan data.

### 2.4 Referensi Material

#### Referensi Eksternal

1. **Kaplan, A. M., & Haenlein, M. (2010)**. "Users of the world, unite! The challenges and opportunities of Social Media". *Business Horizons*, 53(1), 59-68.
   - Kontribusi: Memberikan foundation tentang social media analytics dan pentingnya analisis performa konten digital.

2. **Chen, H., Chiang, R. H., & Storey, V. C. (2012)**. "Business Intelligence and Analytics: From Big Data to Big Impact". *MIS Quarterly*, 36(4), 1165-1188.
   - Kontribusi: Menjelaskan prinsip-prinsip business intelligence dan analytics yang diterapkan dalam dashboard sistem.

3. **Few, S. (2013)**. *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring* (2nd ed.). Analytics Press.
   - Kontribusi: Panduan best practices untuk desain dashboard dan visualisasi data yang efektif.

4. **Pressman, R. S., & Maxim, B. R. (2014)**. *Software Engineering: A Practitioner's Approach* (8th ed.). McGraw-Hill Education.
   - Kontribusi: Metodologi rekayasa perangkat lunak yang digunakan dalam perancangan dan implementasi sistem.

5. **Elmasri, R., & Navathe, S. B. (2015)**. *Fundamentals of Database Systems* (7th ed.). Pearson.
   - Kontribusi: Prinsip-prinsip desain database, normalisasi, dan relational database design yang diterapkan dalam sistem.

6. **Booch, G., Rumbaugh, J., & Jacobson, I. (2005)**. *The Unified Modeling Language User Guide* (2nd ed.). Addison-Wesley.
   - Kontribusi: Standar UML untuk pemodelan sistem yang digunakan dalam dokumen ini.

7. **Nielsen, J., & Budiu, R. (2013)**. *Mobile Usability*. New Riders.
   - Kontribusi: Prinsip usability dan responsive design untuk aplikasi web modern.

#### Referensi Internal

8. **Software Requirements Specification (SRS)** - Sistem Analisis Performa Konten Digital
   - Dokumen kebutuhan sistem yang menjadi basis perancangan SDD ini.

9. **Proposal Tugas Akhir / Proposal Implementasi**
   - Dokumen proposal awal proyek yang mendefinisikan masalah dan solusi yang diusulkan.

10. **Dokumentasi API Supabase**
    - https://supabase.com/docs - Referensi teknis untuk integrasi backend dan database.

11. **React Documentation**
    - https://react.dev - Referensi untuk pengembangan frontend dengan React 18.

12. **TypeScript Documentation**
    - https://www.typescriptlang.org/docs/ - Referensi untuk type safety dalam implementasi.

### 2.5 Definisi dan Singkatan

#### Singkatan

| Singkatan | Kepanjangan | Definisi |
|-----------|-------------|----------|
| SDD | Software Design Document | Dokumen perancangan perangkat lunak yang menjelaskan arsitektur dan desain teknis sistem |
| SRS | Software Requirements Specification | Dokumen spesifikasi kebutuhan perangkat lunak |
| UML | Unified Modeling Language | Bahasa pemodelan standar untuk visualisasi desain sistem berorientasi objek |
| ERD | Entity Relationship Diagram | Diagram yang menggambarkan entitas dan relasi dalam database |
| API | Application Programming Interface | Interface yang memungkinkan komunikasi antar komponen perangkat lunak |
| SPA | Single Page Application | Aplikasi web yang memuat satu halaman HTML dan update konten secara dinamis |
| CRUD | Create, Read, Update, Delete | Operasi dasar pada data dalam database |
| RLS | Row Level Security | Mekanisme keamanan database yang mengontrol akses data per baris |
| JWT | JSON Web Token | Standar untuk autentikasi berbasis token |
| CSV | Comma-Separated Values | Format file untuk data tabular dengan delimiter koma |
| KPI | Key Performance Indicator | Indikator kinerja utama yang diukur dalam sistem |
| ER | Engagement Rate | Rasio interaksi (likes, comments, shares) terhadap reach atau followers |
| UI | User Interface | Antarmuka pengguna untuk berinteraksi dengan sistem |
| UX | User Experience | Pengalaman pengguna saat menggunakan sistem |
| RBAC | Role-Based Access Control | Sistem kontrol akses berdasarkan peran pengguna |

#### Definisi Istilah Penting

1. **Engagement Rate (ER)**: Metrik yang mengukur tingkat interaksi audiens dengan konten, dihitung sebagai:
   ```
   ER = (Total Engagement / Reach) × 100%
   atau
   ER = (Total Engagement / Followers) × 100%
   
   Total Engagement = Likes + Comments + Shares + Saves
   ```

2. **Dataset**: Kumpulan data postingan yang diimport dari satu sumber (CSV atau Google Sheets) dalam satu periode tertentu.

3. **Proyek**: Kontainer logis yang mengelompokkan dataset, kampanye, dan analisis terkait satu brand atau akun media sosial.

4. **Postingan**: Unit data individual yang merepresentasikan satu konten yang dipublikasikan di media sosial, lengkap dengan metrik performanya.

5. **Platform**: Media sosial tempat konten dipublikasikan (Instagram, TikTok, Twitter, Facebook, YouTube, LinkedIn).

6. **Jenis Konten**: Kategori konten berdasarkan format (Foto, Video, Carousel, Reels, Story, dsb).

7. **Kampanye**: Sekumpulan postingan yang tergabung dalam satu strategi marketing atau tema tertentu dalam periode waktu tertentu.

8. **Kompetitor**: Brand atau akun lain yang dimonitor untuk benchmarking dan analisis persaingan.

9. **Insight Otomatis**: Temuan dan rekomendasi yang dihasilkan sistem berdasarkan analisis data (misal: "Posting di hari Rabu jam 19:00 memberikan ER tertinggi").

10. **Edge Function**: Serverless function yang berjalan di edge (Deno-based) untuk menjalankan logika backend seperti AI caption generation dan email notification.

11. **Row Level Security (RLS)**: Policy-based security mechanism di PostgreSQL/Supabase yang mengontrol akses data hingga level baris berdasarkan kondisi tertentu (misal: user hanya bisa akses data proyeknya sendiri).

12. **Admin/Owner**: Pengguna dengan privilese tertinggi dalam sistem, yaitu Maarif Alawi sebagai pemilik sistem, yang memiliki akses penuh ke semua fitur termasuk manajemen master data dan monitoring seluruh aktivitas sistem.

13. **Toast Notification**: Pesan notifikasi sementara yang muncul di layar untuk memberikan feedback kepada user tentang hasil suatu aksi (sukses, error, warning).

14. **Real-time Validation**: Validasi input yang dilakukan secara langsung saat user mengetik atau mengisi form, tanpa perlu submit terlebih dahulu.

---

## 3. Ruang Lingkup

### 3.1 Arsitektur dan Basis Teknologi

#### 3.1.1 Basis Website dan Web Server

Sistem ini dibangun menggunakan arsitektur **Single Page Application (SPA)** dengan teknologi modern:

**Frontend (Client-Side):**
- **Framework**: React 18.3.1 dengan TypeScript untuk type safety dan developer experience
- **Build Tool**: Vite untuk development server yang cepat dan production build yang optimal
- **Styling**: Tailwind CSS untuk utility-first styling dan shadcn/ui component library untuk komponen UI yang konsisten
- **State Management**: 
  - React Context API (AuthContext untuk autentikasi, AppContext untuk state global)
  - TanStack Query (React Query) v5 untuk data fetching, caching, dan synchronization
- **Routing**: React Router DOM v6 untuk client-side routing dan protected routes
- **Visualisasi Data**: Recharts untuk membuat grafik dan chart interaktif

**Backend (Server-Side):**
- **Platform**: Lovable Cloud (powered by Supabase)
- **Database**: PostgreSQL 13.0.5 yang berjalan di server Supabase, diakses melalui RESTful API (bukan direct connection)
- **Database Port**: Standar PostgreSQL port 5432 di server, tetapi akses dari aplikasi melalui HTTPS API endpoint
- **Authentication**: Supabase Auth dengan JWT tokens untuk session management
- **API**: RESTful API melalui Supabase Client SDK dengan auto-generated TypeScript types
- **Edge Functions**: Deno-based serverless functions untuk logika backend:
  - `generate-caption`: AI-powered caption generation menggunakan Google Gemini API
  - `notify-admin-new-question`: Email notification ke admin saat ada pertanyaan baru
  - `notify-user-question-answered`: Email notification ke user saat pertanyaannya dijawab
- **Storage**: Supabase Storage dengan bucket `avatars` untuk menyimpan foto profil user
- **Email Service**: Resend API untuk mengirim email notifikasi

#### 3.1.2 Paradigma Computer Server

Sistem menggunakan paradigma **Serverless Architecture** dengan karakteristik:

1. **Backend as a Service (BaaS)**: 
   - Menggunakan Supabase/Lovable Cloud untuk mengelola infrastructure (database server, authentication server, storage)
   - Developer tidak perlu manage server secara manual
   - Scaling otomatis berdasarkan beban traffic

2. **Function as a Service (FaaS)**: 
   - Edge Functions berjalan sebagai serverless functions
   - Hanya berjalan saat dipanggil (on-demand execution)
   - Tidak ada server yang terus berjalan (cost-efficient)

3. **Database Security**: 
   - Row Level Security (RLS) policies diterapkan di level database
   - Akses data dikontrol langsung oleh PostgreSQL, bukan aplikasi
   - Mencegah unauthorized access bahkan jika API key bocor

4. **Stateless Authentication**: 
   - JWT-based authentication tanpa session storage di server
   - Token disimpan di localStorage client
   - Setiap request membawa JWT untuk verifikasi

5. **API-First Architecture**:
   - Database tidak diakses langsung dari aplikasi frontend
   - Semua interaksi melalui Supabase REST API (HTTPS)
   - API endpoint: `https://kmnhohitclftvoyvnapj.supabase.co/rest/v1/...`

### 3.2 Peran dan Hak Akses Pengguna

Sistem menggunakan **Role-Based Access Control (RBAC)** dengan dua role utama yang didefinisikan dalam enum `app_role`: `admin` dan `user`.

#### 3.2.1 ADMIN / OWNER - Maarif Alawi

**Definisi**: Admin adalah pemilik sistem dan pengelola utama, yaitu **Maarif Alawi**. Admin memiliki akses penuh untuk mengatur konfigurasi sistem, mengelola master data, memberikan support kepada pengguna, dan monitoring aktivitas seluruh sistem.

**Hak Akses Admin:**

1. **Manajemen Master Data Platform** (Tabel: `platform`)
   - Membuat platform media sosial baru (Instagram, TikTok, Twitter, dsb)
   - Mengubah nama, kode, dan warna identitas platform
   - Mengatur status aktif/nonaktif platform
   - Menghapus platform yang tidak digunakan
   - RLS Policy: `Admins can insert/update/delete platforms`

2. **Manajemen Master Data Jenis Konten** (Tabel: `jenis_konten`)
   - Membuat jenis konten baru (Foto, Video, Carousel, Reels, dsb)
   - Mengubah nama dan kode jenis konten
   - Mengatur status aktif/nonaktif jenis konten
   - Menghapus jenis konten yang tidak digunakan
   - RLS Policy: `Admins can insert/update/delete content types`

3. **Manajemen Sistem Bantuan (Q&A)** (Tabel: `pertanyaan`)
   - Melihat **semua pertanyaan** dari seluruh pengguna sistem
   - Menjawab pertanyaan pengguna melalui halaman `/bantuan-admin`
   - Mengubah status pertanyaan dari "menunggu" menjadi "dijawab"
   - Mengedit atau menghapus jawaban yang sudah diberikan
   - Menerima notifikasi email otomatis (via edge function `notify-admin-new-question`) setiap ada pertanyaan baru
   - Melihat rating dan komentar yang diberikan user terhadap jawabannya
   - RLS Policy: `Admins can view all questions`, `Admins can answer questions`

4. **Monitoring Sistem Secara Keseluruhan**
   - Akses ke halaman admin khusus:
     - `/platform`: Kelola master data platform
     - `/bantuan-admin`: Kelola Q&A dan jawab pertanyaan
     - `/admin-test`: Testing dan monitoring sistem
   - Melihat statistik pertanyaan (jumlah pertanyaan menunggu, dijawab, rating rata-rata)
   - Monitoring aktivitas impor dataset dari semua user (tabel: `log_impor`)
   - Monitoring aktivitas export dari semua user (tabel: `riwayat_export`)

5. **Hak Akses Data User (dengan batasan)**
   - Admin **TIDAK dapat** mengakses data proyek pengguna lain tanpa menjadi anggota proyek tersebut
   - Admin **TIDAK dapat** melihat dataset atau postingan user lain kecuali ditambahkan sebagai anggota proyek
   - Prinsip: RLS policies tetap berlaku untuk admin dalam konteks proyek user

**Batasan Admin:**
- Admin **TIDAK dapat** mengubah role pengguna lain dari `user` menjadi `admin` (RLS Policy mencegah perubahan role)
- Admin **TIDAK dapat** menghapus akun pengguna lain
- Admin tunduk pada RLS policies yang sama dengan user dalam konteks data proyek

**Identifikasi Admin:**
- Admin diidentifikasi melalui fungsi database `is_admin()` yang mengecek:
  ```sql
  SELECT peran FROM profil WHERE id = auth.uid() AND peran = 'admin'
  ```
- Tidak menggunakan hardcoded user ID atau localStorage (mencegah privilege escalation)

#### 3.2.2 USER - Pengguna Standar

**Definisi**: User adalah pengguna akhir yang menggunakan sistem untuk menganalisis data media sosial mereka, membuat laporan, dan mendapatkan insight untuk strategi konten. Setiap user memiliki akses terbatas hanya pada data yang mereka miliki atau proyek yang mereka ikuti.

**Hak Akses User:**

1. **Manajemen Profil Pribadi** (Tabel: `profil`)
   - Membaca profil sendiri
   - Mengubah: nama lengkap, foto profil, bahasa preferensi, preferensi dashboard
   - **TIDAK dapat** mengubah role sendiri dari `user` menjadi `admin`
   - RLS Policy: `Users can update own profile but not role`

2. **Manajemen Proyek** (Tabel: `proyek`, `anggota_proyek`)
   - Membuat proyek baru (otomatis menjadi Owner)
   - Melihat proyek yang dimiliki atau menjadi anggota
   - Mengubah nama dan deskripsi proyek yang dimiliki
   - Menghapus proyek yang dimiliki (beserta semua dataset dan postingan di dalamnya)
   - Menambah anggota proyek (tabel: `anggota_proyek`) dengan role: Owner, Editor, atau Viewer
   - Menghapus anggota proyek (khusus Owner)
   - RLS Policy: `Users can create own projects`, `Users can view accessible projects`

3. **Role Dalam Proyek** (Project-Level Roles)
   
   Setiap user dalam proyek memiliki role spesifik (enum `project_role`):
   
   **a. Owner (Pemilik Proyek)**
   - Semua hak akses edit dan delete pada proyek
   - Mengelola anggota proyek (add/remove member, ubah role anggota)
   - Menghapus proyek
   - Mengubah nama dan deskripsi proyek
   
   **b. Editor**
   - Membuat dan mengedit dataset
   - Import data postingan dari CSV/Google Sheets
   - Membuat dan mengedit kampanye
   - Membuat dan mengedit target KPI
   - Membuat catatan (notes)
   - Mengedit dan menghapus postingan
   - Menggunakan AI Caption Generator
   
   **c. Viewer (Peninjau)**
   - Hanya dapat melihat data proyek (read-only access)
   - Tidak dapat melakukan perubahan apapun
   - Akses ke semua halaman analitik dan laporan
   - Dapat export data (tapi tidak dapat mengubah data)

4. **Manajemen Dataset** (Tabel: `dataset`, `log_impor`)
   - Membuat dataset baru dengan:
     - Upload CSV file
     - Connect ke Google Sheets
     - Menggunakan sample data
   - Mengatur dataset aktif (hanya satu dataset aktif per proyek)
   - Melihat log import (status, error messages, jumlah baris berhasil/gagal)
   - Menghapus dataset (beserta semua postingan di dalamnya)
   - RLS Policy: `Users can manage datasets for accessible projects`

5. **Manajemen Data Postingan** (Tabel: `postingan`)
   - Menambah postingan manual (satu per satu)
   - Import postingan massal dari CSV/Google Sheets
   - Mengubah data postingan (caption, metrics, platform, jenis konten)
   - Menghapus postingan
   - Menghubungkan postingan dengan kampanye
   - Data yang dikelola: platform, jenis konten, caption, waktu posting, likes, comments, shares, saves, views, reach, followers
   - Metrics dihitung otomatis: total_engagement, engagement_rate_persen
   - RLS Policy: `Users can manage posts for accessible projects`

6. **Akses Analitik dan Pelaporan**
   
   User dapat mengakses halaman-halaman analitik berikut:
   
   - `/dashboard`: Overview KPI (Total Posts, Avg ER, Total Reach, Followers, Save Rate, Share Rate) dengan trend charts
   - `/performa`: Analisis performa postingan (top 10 posts, worst 10 posts, performance by platform/content type)
   - `/waktu-terbaik`: Analisis waktu posting optimal (best time by day of week, by hour, heatmap)
   - `/audiens`: Analisis karakteristik audiens (demographics, engagement patterns, growth trends)
   - `/ringkasan-insight`: Insight otomatis dari data dengan actionable recommendations
   - `/perbandingan`: Perbandingan multi-dataset atau multi-periode dengan side-by-side charts
   - `/laporan`: Generate laporan performa dalam format PDF dengan visualisasi
   
   Fitur Export:
   - Export data ke Excel (.xlsx)
   - Generate laporan PDF dengan charts
   - Riwayat export disimpan di tabel `riwayat_export`

7. **Perencanaan Konten** (Tabel: `target_kpi`, `kampanye`)
   
   **Target KPI**:
   - Membuat target KPI per periode (weekly/monthly)
   - Set target: Avg ER, Total Reach, Jumlah Followers
   - Tracking progress terhadap target
   - Visualisasi achievement vs target
   
   **Kampanye**:
   - Membuat kampanye dengan nama, tanggal mulai/selesai, catatan
   - Menghubungkan postingan dengan kampanye
   - Analisis performa per kampanye
   - Perbandingan performa antar kampanye

8. **AI Tools**
   
   **AI Caption Generator** (Edge Function: `generate-caption`):
   - Input: topic, tone, platform, max_words
   - Generate caption menggunakan Google Gemini API
   - Multiple variations dalam satu request
   - Copy to clipboard functionality
   
   **Analisis Kompetitor** (Tabel: `kompetitor`, `data_kompetitor`):
   - Menambah kompetitor dengan nama, platform, handle, deskripsi
   - Input data kompetitor manual (followers, avg ER, avg likes/comments/shares, dsb)
   - Visualisasi perbandingan metrics dengan kompetitor
   - Benchmarking performa

9. **Filter dan Preferensi** (Tabel: `filter_tersimpan`)
   - Menyimpan filter untuk halaman tertentu (dashboard, performa, dsb)
   - Filter yang dapat disimpan: rentang tanggal, platform, jenis konten, kampanye
   - Load saved filter dengan satu klik
   - Mengubah dan menghapus saved filter
   - RLS Policy: `Users can manage own saved filters`

10. **Catatan (Notes)** (Tabel: `catatan`)
    
    User dapat membuat catatan dengan scope berbeda:
    - **Scope: post** - Catatan untuk postingan tertentu (kunci_scope = id postingan)
    - **Scope: week** - Catatan untuk minggu tertentu (kunci_scope = "2025-W01")
    - **Scope: global** - Catatan umum proyek (kunci_scope = null)
    
    RLS Policy: `Users can manage notes for accessible projects`

11. **Sistem Bantuan (Q&A)** (Tabel: `pertanyaan`)
    - Membuat pertanyaan baru dengan judul dan isi pertanyaan
    - Melihat pertanyaan sendiri dan statusnya (menunggu/dijawab)
    - Mengedit pertanyaan yang belum dijawab
    - Menghapus pertanyaan yang belum dijawab
    - Menerima notifikasi email (via edge function `notify-user-question-answered`) saat pertanyaan dijawab
    - Memberikan rating (1-5 bintang) dan komentar untuk jawaban yang diterima
    - RLS Policy: `Users can create questions`, `Users can rate answered questions`

**Batasan User:**
- Tidak dapat mengakses data proyek milik user lain (kecuali ditambahkan sebagai anggota)
- Tidak dapat mengubah master data (platform, jenis konten)
- Tidak dapat melihat atau menjawab pertanyaan user lain di sistem bantuan
- Tidak dapat mengubah role sendiri menjadi admin

### 3.3 Perubahan yang Dibawa Sistem

Sistem ini mengubah cara content creator dan UMKM menganalisis performa konten mereka dari metode manual ke metode otomatis:

**Sebelum (Cara Manual):**
- Analisis dilakukan di Excel dengan copy-paste data dari berbagai platform
- Perhitungan metrics (ER, total engagement) dilakukan manual dengan formula
- Tidak ada visualisasi interaktif, hanya tabel statis
- Sulit membandingkan performa antar periode atau platform
- Tidak ada insight otomatis atau rekomendasi
- Proses memakan waktu 2-3 jam untuk satu periode analisis

**Sesudah (Dengan Sistem):**
- Import data sekali klik dari CSV atau Google Sheets
- Metrics dihitung otomatis oleh sistem
- Visualisasi interaktif dengan charts yang dapat difilter
- Perbandingan multi-dataset/periode dalam satu dashboard
- Insight otomatis dan actionable recommendations
- Analisis lengkap dalam 5-10 menit
- AI Caption Generator menghemat waktu pembuatan konten
- Tracking kompetitor untuk benchmarking
- Kolaborasi tim melalui project members

### 3.4 Output yang Dihasilkan Sistem

Sistem menghasilkan berbagai jenis output untuk mendukung pengambilan keputusan:

1. **Laporan Analitik**:
   - Performance Report (PDF): Summary KPI, top/worst posts, best posting times, best content types
   - Comparison Report: Perbandingan multi-dataset dengan charts
   - Competitor Analysis Report: Benchmarking dengan kompetitor

2. **Insight Otomatis**:
   - Best time to post (per hari dan jam)
   - Best performing content type
   - Best performing platform
   - Engagement patterns dan trends
   - Recommendations untuk improvement

3. **Visualisasi Data**:
   - Line charts untuk trend KPI
   - Bar charts untuk perbandingan
   - Heatmap untuk best posting times
   - Pie charts untuk distribusi content type/platform

4. **Export Files**:
   - Excel (.xlsx): Raw data postingan dengan semua metrics
   - PDF: Laporan terformat dengan visualisasi

5. **AI-Generated Content**:
   - Caption suggestions berdasarkan topic, tone, platform
   - Multiple variations untuk dipilih

6. **Notifikasi**:
   - Email notification untuk Q&A (admin dan user)
   - Toast notifications untuk feedback aksi user

---

## 4. Ikhtisar

Dokumen Software Design Document (SDD) ini disusun untuk memberikan panduan lengkap tentang perancangan teknis Sistem Analisis Performa Konten Digital. Dokumen ini terdiri dari 20 bab yang saling terkait dan membentuk satu kesatuan blueprint implementasi sistem.

### Struktur Dokumen

**Bab 1-6: Foundation dan Context**
- Menyediakan konteks proyek, tujuan akademik dan praktis
- Menjelaskan tujuan dokumen SDD sebagai panduan implementasi
- Memberikan referensi material (jurnal, buku, artikel) yang menjadi basis teori
- Mendefinisikan istilah dan singkatan teknis yang digunakan dalam dokumen

**Bab 7-8: System Overview dan High-Level Architecture**
- **Bab 7** menjelaskan gambaran umum sistem dari perspektif proses bisnis dan alur kerja user
- **Bab 8** menguraikan arsitektur sistem tingkat tinggi (lapisan presentasi, logika aplikasi, data)
- Kedua bab ini memberikan pemahaman makro tentang sistem sebelum masuk ke detail teknis

**Bab 9-11: Detailed Architecture Design**
- **Bab 9** membahas pembagian modul/komponen sistem (modul autentikasi, dashboard, Q&A, dsb)
- **Bab 10** menguraikan rancangan arsitektur detail dengan UML diagrams (use case, activity, sequence)
- **Bab 11** menjelaskan alasan pemilihan UML sebagai tool perancangan dan justifikasi pendekatan desain

**Bab 12-14: Data Design**
- **Bab 12** menyajikan rancangan data dengan ERD dan penjelasan entitas/relasi
- **Bab 13** mendeskripsikan bagaimana domain problem ditransformasi ke struktur data
- **Bab 14** menyediakan kamus data lengkap untuk field-field penting dalam database

**Bab 15: Component Design**
- Menjelaskan rancangan komponen-komponen logis sistem
- Menguraikan interaksi antar komponen dengan sequence diagrams

**Bab 16-19: User Interface Design**
- **Bab 16** menjelaskan rancangan antarmuka secara umum (navigasi, warna, validasi)
- **Bab 17** menguraikan fungsionalitas sistem dari sudut pandang pengguna
- **Bab 18** mendeskripsikan tampilan layar untuk setiap halaman utama sistem
- **Bab 19** membahas objek layar (button, form, table) dan tindakan yang terkait

**Bab 20: Requirements Traceability**
- Menyajikan matriks yang menghubungkan requirement dengan komponen dan data
- Memastikan semua requirement di SRS ter-cover dalam desain

### Manfaat Struktur Dokumen

Struktur dokumen ini memungkinkan pembaca untuk:

1. **Memahami Context** (Bab 1-6): Sebelum masuk ke teknis, pembaca memahami "why" dan "what" dari sistem.

2. **Melihat Big Picture** (Bab 7-8): Mendapatkan gambaran arsitektur dan alur kerja sistem secara keseluruhan.

3. **Deep Dive ke Detail** (Bab 9-15): Memahami setiap komponen, interaksi, dan struktur data secara detail.

4. **Memahami User Experience** (Bab 16-19): Melihat sistem dari perspektif pengguna dan antarmuka.

5. **Verifikasi Kelengkapan** (Bab 20): Memastikan semua requirement tercakup dalam desain.

Dengan struktur ini, dokumen SDD berfungsi sebagai:
- **Panduan implementasi** yang sistematis dari high-level ke low-level
- **Acuan pengujian** dengan traceability ke requirements
- **Dokumentasi maintenance** untuk pengembangan di masa depan
- **Komunikasi tim** antara stakeholder teknis dengan satu sumber kebenaran

---

## 5. Referensi Material

### 5.1 Referensi Eksternal

Berikut adalah daftar referensi eksternal yang menjadi basis teoretis dan metodologis dalam perancangan dan implementasi Sistem Analisis Performa Konten Digital:

#### 5.1.1 Social Media Analytics dan Business Intelligence

1. **Kaplan, A. M., & Haenlein, M. (2010)**. "Users of the world, unite! The challenges and opportunities of Social Media". *Business Horizons*, 53(1), 59-68.
   
   **Kontribusi**: Artikel ini memberikan foundation tentang social media analytics dan pentingnya analisis performa konten digital untuk bisnis. Menjelaskan karakteristik media sosial dan bagaimana data dapat dimanfaatkan untuk strategi marketing.
   
   **Penerapan dalam Sistem**: Prinsip-prinsip social media metrics (engagement, reach, shares) yang dijelaskan dalam artikel ini menjadi basis KPI yang diimplementasikan dalam dashboard sistem.

2. **Chen, H., Chiang, R. H., & Storey, V. C. (2012)**. "Business Intelligence and Analytics: From Big Data to Big Impact". *MIS Quarterly*, 36(4), 1165-1188.
   
   **Kontribusi**: Menjelaskan prinsip-prinsip business intelligence dan analytics, termasuk data warehousing, data mining, dan visualization untuk mendukung decision making.
   
   **Penerapan dalam Sistem**: Arsitektur data dan pendekatan analytics dalam sistem (data import → storage → processing → visualization) mengikuti framework BI yang dijelaskan dalam paper ini.

#### 5.1.2 Data Visualization dan Dashboard Design

3. **Few, S. (2013)**. *Information Dashboard Design: Displaying Data for At-a-Glance Monitoring* (2nd ed.). Analytics Press.
   
   **Kontribusi**: Panduan best practices untuk desain dashboard yang efektif, termasuk pemilihan jenis chart, layout, dan color coding untuk quick comprehension.
   
   **Penerapan dalam Sistem**: Desain dashboard sistem (pemilihan KPI cards, line charts untuk trend, bar charts untuk comparison) mengikuti prinsip-prinsip yang dijelaskan dalam buku ini untuk memastikan at-a-glance monitoring yang efektif.

#### 5.1.3 Software Engineering Methodology

4. **Pressman, R. S., & Maxim, B. R. (2014)**. *Software Engineering: A Practitioner's Approach* (8th ed.). McGraw-Hill Education.
   
   **Kontribusi**: Metodologi rekayasa perangkat lunak yang komprehensif, mencakup requirement analysis, design, implementation, testing, dan maintenance.
   
   **Penerapan dalam Sistem**: Pendekatan pengembangan sistem mengikuti software development lifecycle (SDLC) yang dijelaskan dalam buku ini, mulai dari SRS → SDD → Implementation → Testing.

#### 5.1.4 Database Design

5. **Elmasri, R., & Navathe, S. B. (2015)**. *Fundamentals of Database Systems* (7th ed.). Pearson.
   
   **Kontribusi**: Prinsip-prinsip desain database relational, normalization (1NF, 2NF, 3NF, BCNF), entity-relationship modeling, dan SQL query optimization.
   
   **Penerapan dalam Sistem**: Skema database sistem (16 tables dengan foreign keys, normalization untuk menghindari redundancy, indexing untuk performance) mengikuti best practices yang dijelaskan dalam buku ini.

#### 5.1.5 UML dan Object-Oriented Design

6. **Booch, G., Rumbaugh, J., & Jacobson, I. (2005)**. *The Unified Modeling Language User Guide* (2nd ed.). Addison-Wesley.
   
   **Kontribusi**: Standar UML untuk pemodelan sistem berorientasi objek, termasuk use case diagram, class diagram, sequence diagram, dan activity diagram.
   
   **Penerapan dalam Sistem**: Semua diagram dalam dokumen SDD ini (use case, activity, sequence, ERD) mengikuti notasi UML standar yang dijelaskan dalam buku ini.

#### 5.1.6 Usability dan User Experience

7. **Nielsen, J., & Budiu, R. (2013)**. *Mobile Usability*. New Riders.
   
   **Kontribusi**: Prinsip usability dan responsive design untuk aplikasi web modern, termasuk touch-friendly interface, mobile-first design, dan progressive enhancement.
   
   **Penerapan dalam Sistem**: Desain UI sistem (responsive layout dengan Tailwind CSS, mobile-friendly navigation, touch-optimized buttons) mengikuti prinsip usability yang dijelaskan dalam buku ini.

#### 5.1.7 Referensi Tambahan

8. **Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994)**. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
   
   **Kontribusi**: Design patterns untuk software architecture yang reusable dan maintainable.
   
   **Penerapan dalam Sistem**: Implementasi komponen React menggunakan patterns seperti Context Provider (untuk state management), Higher-Order Components, dan Hooks pattern.

9. **Sommerville, I. (2015)**. *Software Engineering* (10th ed.). Pearson.
   
   **Kontribusi**: Comprehensive guide untuk software engineering practices, termasuk agile development, requirements engineering, dan software testing.
   
   **Penerapan dalam Sistem**: Proses development dan testing mengikuti metodologi yang dijelaskan dalam buku ini.

### 5.2 Referensi Internal

Berikut adalah referensi internal yang menjadi acuan langsung dalam penyusunan SDD ini:

10. **Software Requirements Specification (SRS)** - Sistem Analisis Performa Konten Digital
    - Dokumen kebutuhan fungsional dan non-fungsional sistem
    - Menjadi basis utama untuk perancangan arsitektur dan komponen dalam SDD
    - Semua requirement di SRS di-trace ke design elements di SDD (lihat Bab 20: Matriks Persyaratan)

11. **Proposal Tugas Akhir / Proposal Implementasi** - Maarif Alawi
    - Dokumen proposal awal yang mendefinisikan problem statement dan proposed solution
    - Menjelaskan latar belakang masalah analisis konten digital dan justifikasi pembuatan sistem

12. **Database Schema Documentation**
    - Dokumentasi skema database yang di-generate dari Supabase
    - File: `src/integrations/supabase/types.ts`
    - Berisi TypeScript types untuk semua tables, enums, dan functions

### 5.3 Referensi Teknis dan Dokumentasi API

13. **Supabase Documentation**
    - URL: https://supabase.com/docs
    - Referensi teknis untuk:
      - PostgreSQL database dengan RLS
      - Supabase Auth (JWT-based authentication)
      - Supabase Storage (file storage)
      - Edge Functions (Deno-based serverless functions)
      - Supabase Client SDK (JavaScript/TypeScript)

14. **React Documentation**
    - URL: https://react.dev
    - Referensi untuk:
      - React 18 features (Concurrent Rendering, Automatic Batching)
      - Hooks API (useState, useEffect, useContext, useCallback, useMemo)
      - Component Composition
      - Error Boundaries

15. **TypeScript Documentation**
    - URL: https://www.typescriptlang.org/docs/
    - Referensi untuk:
      - Type system dan type safety
      - Interfaces dan Types
      - Generics
      - Utility Types

16. **Tailwind CSS Documentation**
    - URL: https://tailwindcss.com/docs
    - Referensi untuk:
      - Utility-first CSS
      - Responsive design
      - Dark mode
      - Custom theming

17. **TanStack Query (React Query) Documentation**
    - URL: https://tanstack.com/query/latest
    - Referensi untuk:
      - Data fetching dan caching
      - Optimistic updates
      - Infinite queries
      - Mutations

18. **Google Gemini API Documentation**
    - URL: https://ai.google.dev/docs
    - Referensi untuk:
      - AI text generation
      - Prompt engineering
      - API integration

19. **Resend API Documentation**
    - URL: https://resend.com/docs
    - Referensi untuk:
      - Email sending via API
      - Email templates
      - Delivery tracking

### 5.4 Penggunaan Referensi dalam Dokumen

Referensi-referensi di atas digunakan dalam berbagai bagian dokumen SDD:

- **Bab 8 (Arsitektur Sistem)**: Menggunakan referensi [4], [8], [9] untuk justifikasi arsitektur
- **Bab 9-11 (Rancangan Arsitektur)**: Menggunakan referensi [6] untuk UML diagrams
- **Bab 12-14 (Rancangan Data)**: Menggunakan referensi [5] untuk database design
- **Bab 15 (Rancangan Komponen)**: Menggunakan referensi [8], [14] untuk component design
- **Bab 16-19 (Rancangan Antarmuka)**: Menggunakan referensi [3], [7] untuk UI/UX design
- **Bab 20 (Matriks Persyaratan)**: Menggunakan referensi [10] (SRS) sebagai source of truth

---

## 6. Definisi dan Singkatan

### 6.1 Tabel Singkatan

| Singkatan | Kepanjangan | Definisi Lengkap |
|-----------|-------------|------------------|
| **SDD** | Software Design Document | Dokumen perancangan perangkat lunak yang menjelaskan arsitektur sistem, struktur data, komponen, dan antarmuka secara detail untuk panduan implementasi |
| **SRS** | Software Requirements Specification | Dokumen spesifikasi kebutuhan perangkat lunak yang mendefinisikan functional dan non-functional requirements |
| **UML** | Unified Modeling Language | Bahasa pemodelan standar untuk visualisasi, spesifikasi, konstruksi, dan dokumentasi sistem berorientasi objek |
| **ERD** | Entity Relationship Diagram | Diagram yang menggambarkan entitas (entities), atribut (attributes), dan relasi (relationships) dalam database |
| **API** | Application Programming Interface | Interface yang memungkinkan komunikasi dan pertukaran data antar komponen perangkat lunak |
| **SPA** | Single Page Application | Aplikasi web yang memuat satu halaman HTML dan update konten secara dinamis tanpa full page reload |
| **CRUD** | Create, Read, Update, Delete | Empat operasi dasar pada persistent storage (database) |
| **RLS** | Row Level Security | Mekanisme keamanan database PostgreSQL yang mengontrol akses data hingga level baris berdasarkan policy |
| **JWT** | JSON Web Token | Standar terbuka (RFC 7519) untuk transmisi informasi secara aman sebagai JSON object, digunakan untuk autentikasi |
| **CSV** | Comma-Separated Values | Format file teks untuk data tabular dengan delimiter koma, umum untuk import/export data |
| **KPI** | Key Performance Indicator | Metrik terukur yang menunjukkan seberapa efektif suatu tujuan bisnis tercapai |
| **ER** | Engagement Rate | Rasio interaksi (likes, comments, shares, saves) terhadap reach atau followers, dinyatakan dalam persentase |
| **UI** | User Interface | Antarmuka visual yang memungkinkan pengguna berinteraksi dengan sistem |
| **UX** | User Experience | Keseluruhan pengalaman pengguna saat berinteraksi dengan sistem, termasuk ease of use dan satisfaction |
| **RBAC** | Role-Based Access Control | Model kontrol akses yang memberikan hak akses berdasarkan peran (role) pengguna dalam sistem |
| **SDK** | Software Development Kit | Kumpulan tools, libraries, dan dokumentasi untuk mengembangkan aplikasi pada platform tertentu |
| **REST** | Representational State Transfer | Arsitektur untuk web services yang menggunakan HTTP methods (GET, POST, PUT, DELETE) |
| **JSON** | JavaScript Object Notation | Format pertukaran data yang ringan dan mudah dibaca manusia maupun mesin |
| **SQL** | Structured Query Language | Bahasa untuk mengelola dan memanipulasi relational database |
| **HTTPS** | HyperText Transfer Protocol Secure | Protokol komunikasi terenkripsi untuk transfer data antar client dan server |
| **BaaS** | Backend as a Service | Model cloud computing yang menyediakan backend infrastructure (database, auth, storage) sebagai layanan |
| **FaaS** | Function as a Service | Model cloud computing yang menjalankan fungsi individual secara serverless |
| **PDF** | Portable Document Format | Format file untuk dokumen yang dapat ditampilkan konsisten di berbagai platform |
| **AI** | Artificial Intelligence | Simulasi kecerdasan manusia dalam mesin untuk melakukan tugas kognitif |

### 6.2 Definisi Istilah Teknis

#### 6.2.1 Istilah Analitik dan Metrics

**Engagement Rate (ER)**
```
Metrik yang mengukur tingkat interaksi audiens dengan konten.
Formula:
  ER = (Total Engagement / Reach) × 100%
  atau
  ER = (Total Engagement / Followers) × 100%

Dimana:
  Total Engagement = Likes + Comments + Shares + Saves
```

**Reach**
```
Jumlah unique users yang melihat konten (tidak termasuk views berulang dari user yang sama).
Berbeda dengan Views yang menghitung semua tayangan termasuk berulang.
```

**Save Rate**
```
Rasio jumlah save terhadap reach atau followers.
Formula: (Saves / Reach) × 100%
Metrik ini menunjukkan seberapa valuable konten bagi audiens (mereka ingin menyimpan untuk referensi).
```

**Share Rate**
```
Rasio jumlah share terhadap reach atau followers.
Formula: (Shares / Reach) × 100%
Metrik ini menunjukkan seberapa viral konten (audiens ingin berbagi ke network mereka).
```

#### 6.2.2 Istilah Database dan Backend

**Dataset**
```
Kumpulan data postingan yang diimport dari satu sumber (CSV atau Google Sheets) dalam satu periode tertentu.
Satu proyek dapat memiliki multiple datasets untuk analisis perbandingan antar periode.
Hanya satu dataset yang dapat aktif pada satu waktu per proyek.
```

**Proyek**
```
Kontainer logis yang mengelompokkan dataset, kampanye, target KPI, dan analisis terkait satu brand atau akun media sosial.
Setiap proyek memiliki owner dan dapat memiliki multiple members dengan role berbeda (owner, editor, viewer).
```

**Postingan**
```
Unit data individual yang merepresentasikan satu konten yang dipublikasikan di media sosial.
Data meliputi: platform, jenis konten, waktu posting, caption, dan metrics (likes, comments, shares, saves, views, reach, followers).
Metrics turunan (total_engagement, engagement_rate_persen) dihitung otomatis oleh sistem.
```

**Platform**
```
Media sosial tempat konten dipublikasikan.
Master data yang dikelola oleh admin: Instagram, TikTok, Twitter/X, Facebook, YouTube, LinkedIn.
Setiap platform memiliki kode unik dan warna identitas untuk visualisasi.
```

**Jenis Konten**
```
Kategori konten berdasarkan format.
Master data yang dikelola oleh admin: Foto, Video, Carousel, Reels, Story, Live, IGTV, Short, dsb.
Setiap jenis konten memiliki kode unik untuk filtering dan analisis.
```

**Kampanye**
```
Sekumpulan postingan yang tergabung dalam satu strategi marketing atau tema tertentu dalam periode waktu tertentu.
Contoh: "Ramadan Sale 2025", "Product Launch Q1", "Brand Awareness Campaign".
Digunakan untuk mengukur efektivitas campaign-specific content.
```

**Kompetitor**
```
Brand atau akun media sosial lain yang dimonitor untuk benchmarking dan analisis persaingan.
Data yang disimpan: nama, platform, handle, deskripsi, dan time-series metrics (followers, avg ER, avg likes/comments/shares).
```

#### 6.2.3 Istilah Sistem dan Arsitektur

**Edge Function**
```
Serverless function yang berjalan di edge (Deno runtime) untuk menjalankan logika backend.
Karakteristik:
  - Stateless (tidak menyimpan state antar invocations)
  - On-demand execution (hanya berjalan saat dipanggil)
  - Auto-scaling (scale otomatis berdasarkan traffic)
  - Cost-efficient (hanya bayar saat running)

Contoh dalam sistem ini:
  - generate-caption: AI-powered caption generation
  - notify-admin-new-question: Email notification ke admin
  - notify-user-question-answered: Email notification ke user
```

**Row Level Security (RLS)**
```
Policy-based security mechanism di PostgreSQL yang mengontrol akses data hingga level baris.
Prinsip kerja:
  - Policy didefinisikan menggunakan SQL WHERE clause
  - Policy dievaluasi untuk setiap query (SELECT, INSERT, UPDATE, DELETE)
  - User hanya dapat akses rows yang memenuhi policy condition

Contoh policy:
  "Users can view posts for accessible projects"
  WHERE has_project_access(id_proyek)
  
Artinya: User hanya bisa SELECT postingan dari proyek yang mereka miliki atau menjadi anggota.
```

**JWT (JSON Web Token)**
```
Token berbasis JSON untuk autentikasi stateless.
Struktur: header.payload.signature (dipisahkan dengan titik)

header: algoritma dan tipe token
payload: data user (user_id, role, exp, iat)
signature: hash dari header + payload menggunakan secret key

Alur autentikasi:
  1. User login → server generate JWT → return ke client
  2. Client simpan JWT di localStorage
  3. Setiap request, client kirim JWT di header Authorization: Bearer <token>
  4. Server verify signature dan extract payload
  5. Server execute request atas nama user yang ter-autentikasi
```

**Context API**
```
React feature untuk sharing state antar komponen tanpa prop drilling.
Dalam sistem ini:
  - AuthContext: menyimpan user session, login/logout methods
  - AppContext: menyimpan selectedProject, activeDataset, global settings

Pattern:
  1. Create Context: const AuthContext = createContext()
  2. Provide Context: <AuthContext.Provider value={...}>
  3. Consume Context: const { user } = useContext(AuthContext)
```

#### 6.2.4 Istilah AI dan Automation

**AI Caption Generator**
```
Fitur yang menggunakan Google Gemini API untuk generate caption konten secara otomatis.
Input:
  - topic: topik konten (contoh: "tips produktivitas")
  - tone: nada bahasa (casual, formal, professional, inspirational)
  - platform: target platform (Instagram, TikTok, LinkedIn, dst)
  - max_words: batasan panjang caption

Output:
  - Multiple caption variations (biasanya 3-5 options)
  - Caption disesuaikan dengan platform dan tone
  - Include hashtag suggestions (jika sesuai platform)

Teknologi: Google Gemini 2.5 Flash model melalui Edge Function
```

**Insight Otomatis**
```
Temuan dan rekomendasi yang dihasilkan sistem berdasarkan analisis data.
Jenis insight:
  - Best time to post: "Posting di hari Rabu jam 19:00 memberikan ER tertinggi (5.2%)"
  - Best content type: "Video Reels mendapat ER 3x lebih tinggi dari Foto"
  - Best platform: "TikTok menghasilkan reach 2x lebih besar dari Instagram"
  - Trend analysis: "Engagement Rate meningkat 15% bulan ini vs bulan lalu"
  - Recommendations: "Tingkatkan frekuensi posting pada hari Rabu dan Kamis"

Metode: Rule-based analysis dan statistical aggregation dari data historis
```

#### 6.2.5 Istilah User Interface

**Toast Notification**
```
Pesan notifikasi sementara (ephemeral) yang muncul di layar untuk memberikan feedback kepada user.
Karakteristik:
  - Muncul di pojok layar (biasanya bottom-right atau top-right)
  - Auto-dismiss setelah beberapa detik (default 3-5 detik)
  - Tidak memblokir interaksi user dengan UI
  - Jenis: success, error, warning, info

Contoh:
  - Success: "Dataset berhasil diimport (150 rows)"
  - Error: "Gagal menghapus proyek. Silakan coba lagi."
  - Warning: "Dataset ini akan menghapus 50 postingan"
```

**Real-time Validation**
```
Validasi input yang dilakukan secara langsung saat user mengetik atau mengisi form.
Karakteristik:
  - Feedback instant tanpa perlu klik submit
  - Error message muncul di bawah field yang error
  - Field yang valid ditandai dengan checkmark atau border hijau
  - Submit button disabled jika ada validation error

Contoh validasi:
  - Email: format email valid (regex check)
  - Password: minimal 8 karakter, ada huruf dan angka
  - Required field: tidak boleh kosong
  - Date range: tanggal mulai tidak boleh > tanggal selesai
```

**Responsive Design**
```
Pendekatan desain yang membuat UI menyesuaikan layout berdasarkan ukuran layar.
Breakpoints dalam sistem (Tailwind CSS):
  - sm: 640px (smartphone landscape)
  - md: 768px (tablet portrait)
  - lg: 1024px (tablet landscape / small laptop)
  - xl: 1280px (desktop)
  - 2xl: 1536px (large desktop)

Strategi:
  - Mobile-first: design untuk mobile terlebih dahulu, kemudian enhance untuk desktop
  - Fluid grids: menggunakan percentage/flexbox bukan fixed width
  - Flexible images: max-width 100% agar tidak overflow
  - Media queries: CSS yang berbeda untuk setiap breakpoint
```

#### 6.2.6 Istilah Security

**RBAC (Role-Based Access Control)**
```
Model kontrol akses yang memberikan permissions berdasarkan role pengguna.
Dalam sistem ini:

App-level roles:
  - admin: full access ke sistem (manage master data, view all questions)
  - user: access terbatas ke data proyek sendiri

Project-level roles:
  - owner: full control atas proyek (edit, delete, manage members)
  - editor: dapat edit data tapi tidak dapat delete proyek atau manage members
  - viewer: read-only access

Implementasi:
  - Role disimpan di tabel profil (app_role) dan anggota_proyek (project_role)
  - RLS policies menggunakan fungsi is_admin() dan has_project_access()
  - Frontend menggunakan role untuk conditional rendering (hide/show buttons)
```

**SQL Injection Prevention**
```
Teknik untuk mencegah serangan SQL injection.
Metode dalam sistem:
  1. Parameterized queries: menggunakan Supabase SDK yang auto-escape input
  2. Input validation: validasi tipe data dan format sebelum query
  3. RLS policies: even if injection berhasil, RLS mencegah akses unauthorized data
  4. Least privilege: database user hanya punya permission yang dibutuhkan

Contoh secure query:
  // ❌ VULNERABLE:
  db.query(`SELECT * FROM posts WHERE id = ${userInput}`)
  
  // ✅ SAFE:
  supabase.from('postingan').select('*').eq('id', userInput)
```

---

## 7. Gambaran Umum Sistem

### 7.1 Alur Kerja Sistem dari Perspektif Proses Bisnis

Sistem Analisis Performa Konten Digital dirancang untuk mendukung siklus analisis konten yang terdiri dari beberapa alur kerja utama. Berikut adalah penjelasan naratif untuk setiap alur:

#### 7.1.1 Alur Registrasi dan Login hingga Akses Dashboard

**Registrasi User Baru:**
1. User mengakses halaman registrasi (`/auth?mode=signup`)
2. User mengisi form: email, password, dan nama lengkap
3. Sistem melakukan validasi:
   - Email belum terdaftar di tabel `auth.users`
   - Password minimal 8 karakter
   - Semua field wajib diisi
4. Jika valid, sistem:
   - Membuat record di `auth.users` (dikelola Supabase Auth)
   - Trigger `handle_new_user()` otomatis membuat record di tabel `profil` dengan:
     - `id` = user_id dari auth.users
     - `nama_lengkap` = dari form registrasi
     - `peran` = 'user' (default)
   - Generate JWT token
5. User di-redirect ke halaman dashboard
6. Toast notification muncul: "Registrasi berhasil! Selamat datang."

**Login User Existing:**
1. User mengakses halaman login (`/auth?mode=login`)
2. User mengisi email dan password
3. Sistem verifikasi credentials melalui Supabase Auth
4. Jika valid:
   - Generate JWT token baru
   - Simpan token di localStorage
   - Fetch profil user dari tabel `profil`
   - Set AuthContext dengan data user
5. User di-redirect ke halaman dashboard
6. Toast notification: "Selamat datang kembali, {nama_lengkap}!"

**Akses Dashboard:**
1. User membuka halaman `/dashboard`
2. Sistem cek:
   - Apakah user sudah login? (ada JWT token di localStorage?)
   - Jika belum, redirect ke `/auth?mode=login`
3. Dashboard fetch data:
   - Daftar proyek yang dimiliki atau menjadi anggota (dari tabel `proyek` dan `anggota_proyek`)
   - Jika belum ada proyek, tampilkan empty state dengan tombol "Buat Proyek Pertama"
4. User select proyek dari dropdown
5. AppContext menyimpan `selectedProject`
6. Dashboard fetch dataset aktif untuk proyek tersebut
7. Dashboard fetch data postingan dari dataset aktif
8. Dashboard hitung KPI dan render charts

#### 7.1.2 Alur Import Dataset hingga Insight Muncul

**1. Persiapan:**
User memiliki data postingan dalam format CSV atau Google Sheets dengan kolom:
- kode_postingan (unique identifier)
- platform (Instagram, TikTok, dsb)
- jenis_konten (Foto, Video, Reels, dsb)
- waktu_diposting (timestamp)
- caption (optional)
- likes, komentar, shares, saved, views, reach, followers

**2. Import Process:**
1. User navigasi ke halaman `/import`
2. User klik "Buat Dataset Baru"
3. User isi form:
   - Nama dataset (contoh: "Instagram Q4 2024")
   - Sumber data: pilih "Upload CSV" atau "Google Sheets"
4. User upload file CSV atau paste Google Sheets URL
5. Sistem melakukan preview data (10 rows pertama)
6. User konfirmasi: "Ya, import dataset ini"
7. Sistem mulai proses import:
   ```
   a. Validasi struktur file:
      - Cek kolom wajib ada (platform, jenis_konten, waktu_diposting)
      - Cek format data (tanggal valid, angka valid)
   
   b. Validasi data:
      - Platform ID exist di tabel master `platform`?
      - Jenis konten ID exist di tabel master `jenis_konten`?
      - Tanggal posting tidak di masa depan?
   
   c. Transform data:
      - Calculate total_engagement = likes + komentar + shares + saved
      - Calculate engagement_rate_persen = (total_engagement / reach) * 100
   
   d. Insert data:
      - Batch insert ke tabel `postingan` (50 rows per batch untuk performance)
      - Skip rows dengan error, log di `log_impor`
   
   e. Update dataset info:
      - Set jumlah_baris_dataset
      - Set dataset_aktif = true (set dataset lain jadi false)
   
   f. Create import log:
      - INSERT ke tabel `log_impor` dengan status 'success' atau 'failed'
      - Jika ada rows gagal, simpan detail error
   ```
8. Sistem tampilkan summary:
   - "Import berhasil! 150 dari 152 rows diimport."
   - "2 rows gagal: [list error dengan row number]"
9. Toast notification: "Dataset aktif berhasil diubah ke 'Instagram Q4 2024'"

**3. Insight Generation:**
1. User navigasi ke halaman `/dashboard`
2. Sistem fetch data postingan dari dataset aktif
3. Sistem calculate KPI:
   ```javascript
   Total Posts = COUNT(*) FROM postingan WHERE id_dataset = active_dataset_id
   Avg ER = AVG(engagement_rate_persen) FROM postingan WHERE ...
   Total Reach = SUM(jumlah_reach) FROM postingan WHERE ...
   Avg Followers = AVG(jumlah_followers) FROM postingan WHERE ...
   Save Rate = (SUM(jumlah_saved) / SUM(jumlah_reach)) * 100
   Share Rate = (SUM(jumlah_shares) / SUM(jumlah_reach)) * 100
   ```
4. Sistem generate insight otomatis:
   ```javascript
   // Best posting time analysis
   GROUP BY EXTRACT(DOW FROM waktu_diposting) // day of week
   ORDER BY AVG(engagement_rate_persen) DESC
   LIMIT 1
   → "Posting di hari Rabu memberikan ER tertinggi (5.2%)"

   // Best content type analysis
   GROUP BY id_jenis_konten
   ORDER BY AVG(engagement_rate_persen) DESC
   LIMIT 1
   → "Reels mendapat ER 3x lebih tinggi dari Foto"

   // Trend analysis
   Compare current period vs previous period
   → "Engagement Rate meningkat 15% vs periode sebelumnya"
   ```
5. Dashboard render:
   - KPI cards dengan sparkline trend
   - Line chart: ER over time
   - Bar chart: Performance by platform
   - Insight cards dengan actionable recommendations

#### 7.1.3 Alur User Bertanya hingga Admin Menjawab (Q&A System)

**1. User Submit Pertanyaan:**
1. User navigasi ke halaman `/bantuan`
2. User klik "Ajukan Pertanyaan Baru"
3. User isi form:
   - Proyek (dropdown, pilih proyek terkait)
   - Judul pertanyaan
   - Isi pertanyaan (rich text editor)
4. User klik "Kirim Pertanyaan"
5. Sistem:
   ```
   a. Validasi:
      - Judul tidak boleh kosong
      - Isi pertanyaan minimal 10 karakter
      - User punya akses ke proyek yang dipilih
   
   b. Insert data:
      INSERT INTO pertanyaan (
        id_pengguna,
        id_proyek,
        judul_pertanyaan,
        isi_pertanyaan,
        status
      ) VALUES (
        auth.uid(),
        selected_project_id,
        'Cara import dari Instagram?',
        'Saya ingin import data dari Instagram...',
        'menunggu'
      )
   
   c. Trigger notification:
      - Database trigger `notify_admin_new_question()` ter-trigger
      - Trigger memanggil edge function `notify-admin-new-question`
      - Edge function kirim email ke admin via Resend API:
        Subject: "[Q&A] Pertanyaan Baru dari {nama_user}"
        Body: 
          "User {nama_user} bertanya:
          Judul: {judul_pertanyaan}
          Isi: {isi_pertanyaan}
          Proyek: {nama_proyek}
          
          Lihat dan jawab: {link_to_bantuan_admin}"
   ```
6. Toast notification ke user: "Pertanyaan terkirim! Admin akan menjawab dalam 1x24 jam."
7. User dapat lihat status pertanyaan di halaman `/bantuan` (status: "menunggu")

**2. Admin Menerima Notifikasi:**
1. Admin menerima email notifikasi
2. Admin klik link di email → redirect ke `/bantuan-admin`
3. Admin lihat daftar pertanyaan dengan filter:
   - "Menunggu" (belum dijawab)
   - "Dijawab"
   - Search by judul atau nama user

**3. Admin Menjawab Pertanyaan:**
1. Admin klik pertanyaan untuk lihat detail
2. Admin baca:
   - Nama user yang bertanya
   - Proyek terkait
   - Judul dan isi pertanyaan
3. Admin tulis jawaban di rich text editor
4. Admin klik "Kirim Jawaban"
5. Sistem:
   ```
   a. Update data:
      UPDATE pertanyaan
      SET 
        jawaban = 'Untuk import dari Instagram...',
        status = 'dijawab',
        dijawab_oleh = admin_user_id,
        updated_at = NOW()
      WHERE id = pertanyaan_id
   
   b. Trigger notification:
      - Database trigger `notify_user_question_answered()` ter-trigger
      - Trigger cek: status berubah dari 'menunggu' ke 'dijawab'?
      - Trigger memanggil edge function `notify-user-question-answered`
      - Edge function:
        • Fetch email user dari auth.users
        • Kirim email via Resend API:
          Subject: "Pertanyaan Anda Sudah Dijawab"
          Body:
            "Halo {nama_user},
            Pertanyaan Anda tentang '{judul_pertanyaan}' sudah dijawab.
            
            Jawaban: {jawaban}
            
            Lihat detail: {link_to_bantuan}"
   ```
6. Toast notification ke admin: "Jawaban berhasil dikirim"

**4. User Menerima Jawaban:**
1. User menerima email notifikasi
2. User klik link di email → redirect ke `/bantuan`
3. User lihat pertanyaannya dengan status "dijawab"
4. User baca jawaban dari admin
5. User dapat memberikan rating dan komentar:
   - Rating: 1-5 bintang (star rating)
   - Komentar: optional feedback
6. User klik "Kirim Rating"
7. Sistem:
   ```
   UPDATE pertanyaan
   SET 
     rating = 5,
     komentar_rating = 'Sangat membantu!',
     rating_at = NOW()
   WHERE id = pertanyaan_id AND id_pengguna = auth.uid()
   ```
8. Toast notification: "Terima kasih atas rating Anda!"

#### 7.1.4 Alur Generate Caption AI

**1. User Akses AI Caption Generator:**
1. User navigasi ke halaman `/caption-generator`
2. User lihat form input dengan fields:
   - Topic (contoh: "tips produktivitas kerja")
   - Tone (dropdown: Casual, Formal, Professional, Inspirational)
   - Platform (dropdown: Instagram, TikTok, LinkedIn, Twitter, Facebook)
   - Max Words (slider: 50-300 words)

**2. User Submit Request:**
1. User isi semua fields
2. User klik "Generate Caption"
3. Sistem:
   ```
   a. Validasi:
      - Topic tidak boleh kosong
      - Topic minimal 3 kata
      - Platform dan tone sudah dipilih
   
   b. Show loading state:
      - Button disabled
      - Tampilkan spinner dengan text "Generating captions..."
   
   c. Call Edge Function:
      const { data, error } = await supabase.functions.invoke('generate-caption', {
        body: {
          topic: 'tips produktivitas kerja',
          tone: 'casual',
          platform: 'instagram',
          max_words: 150
        }
      })
   ```

**3. Edge Function Processing:**
```javascript
// File: supabase/functions/generate-caption/index.ts

1. Receive request body
2. Build prompt:
   const prompt = `
     Generate 3 engaging captions for ${platform} about "${topic}".
     Tone: ${tone}
     Max words: ${max_words}
     
     Requirements:
     - Engaging opening
     - Include relevant hashtags for ${platform}
     - Call to action at the end
     - Optimize for ${platform} algorithm
   `

3. Call Google Gemini API:
   const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${GEMINI_API_KEY}`
     },
     body: JSON.stringify({
       contents: [{
         parts: [{ text: prompt }]
       }],
       generationConfig: {
         maxOutputTokens: max_words * 2,
         temperature: 0.8 // creative but not too random
       }
     })
   })

4. Parse response:
   const captions = extractCaptionsFromResponse(response)

5. Return to client:
   return new Response(JSON.stringify({ captions }), {
     headers: { 'Content-Type': 'application/json' }
   })
```

**4. User Menerima Captions:**
1. Sistem tampilkan 3 caption variations
2. User dapat:
   - Copy caption ke clipboard (klik icon copy)
   - Edit caption sebelum copy (inline editing)
   - Generate caption baru (tombol "Generate Again")
3. Setiap kali copy, toast notification: "Caption berhasil dicopy!"
4. User dapat regenerate dengan parameter berbeda tanpa reload page

### 7.2 Lokasi Penyimpanan Database dan Model Akses

**Lokasi Database:**
- Database disimpan di **server Supabase** (powered by PostgreSQL 13.0.5)
- Server URL: `https://kmnhohitclftvoyvnapj.supabase.co`
- Database berjalan di port standar PostgreSQL: **5432** (di level server)
- Database name: `postgres` (default Supabase)

**Model Akses:**
```
Aplikasi Frontend (Browser)
        ↓ HTTPS
    Supabase REST API
    (https://kmnhohitclftvoyvnapj.supabase.co/rest/v1/...)
        ↓ Internal Connection
    PostgreSQL Database
    (localhost:5432 from server perspective)
```

**PENTING:** 
- User/aplikasi **TIDAK** akses database secara langsung via port 5432
- Semua akses melalui **Supabase REST API** dengan HTTPS
- Setiap request membawa **JWT token** untuk autentikasi
- **Row Level Security (RLS)** policies di-enforce di level database
- Supabase Client SDK abstract kompleksitas HTTP requests

**Contoh Akses Data:**
```typescript
// Frontend code (src/pages/Dashboard.tsx)
import { supabase } from '@/integrations/supabase/client'

// Query posts - internally translates to HTTPS request:
// GET https://kmnhohitclftvoyvnapj.supabase.co/rest/v1/postingan?select=*&id_dataset=eq.{dataset_id}
// Headers: { Authorization: 'Bearer {jwt_token}' }
const { data: posts, error } = await supabase
  .from('postingan')
  .select('*')
  .eq('id_dataset', activeDatasetId)

// Database evaluates RLS policy:
// has_project_access(id_proyek) → returns true/false
// If true: return matching rows
// If false: return empty array (403 would be raised if using wrong method)
```

### 7.3 Diagram Konteks Sistem (Naratif)

`<Diagram Konteks: Sistem Analisis Performa Konten Digital>`

**Deskripsi Naratif:**

Sistem Analisis Performa Konten Digital berinteraksi dengan beberapa entitas eksternal:

**1. User (Content Creator / UMKM / Brand)**
- Input ke sistem:
  - Data autentikasi (email, password)
  - Data proyek (nama, deskripsi)
  - File dataset (CSV atau Google Sheets URL)
  - Pertanyaan untuk sistem Q&A
  - Request AI caption generation
  - Filter dan preferensi analisis
  
- Output dari sistem:
  - Dashboard dengan visualisasi KPI
  - Insight otomatis dan recommendations
  - Laporan performa (PDF)
  - Export data (Excel)
  - AI-generated captions
  - Notifikasi email (jawaban Q&A)

**2. Admin / Owner (Maarif Alawi)**
- Input ke sistem:
  - Master data (platform, jenis konten)
  - Jawaban untuk pertanyaan user
  
- Output dari sistem:
  - Daftar pertanyaan dari seluruh user
  - Notifikasi email (pertanyaan baru)
  - Statistik sistem (import logs, export history)

**3. Google Gemini API (External Service)**
- Input dari sistem:
  - Request caption generation dengan parameters (topic, tone, platform)
  
- Output ke sistem:
  - AI-generated caption variations

**4. Resend API (External Service)**
- Input dari sistem:
  - Email data (to, subject, body, template)
  
- Output ke sistem:
  - Email delivery confirmation

**5. Google Sheets (External Data Source)**
- Input dari sistem:
  - Authorization request (OAuth)
  - Spreadsheet URL untuk import
  
- Output ke sistem:
  - Data postingan dalam format tabular

**6. PostgreSQL Database (Supabase)**
- Input dari sistem:
  - SQL queries (SELECT, INSERT, UPDATE, DELETE)
  - RLS policy evaluations
  
- Output ke sistem:
  - Data hasil query
  - Access granted/denied berdasarkan RLS

**7. Supabase Storage**
- Input dari sistem:
  - Upload foto profil user
  
- Output ke sistem:
  - Public URL foto yang di-upload

**Alur Data Utama:**

1. **Autentikasi Flow:**
   User → Sistem → Supabase Auth → Database (verify & create session) → Sistem → User (JWT token)

2. **Data Import Flow:**
   User (upload CSV/Sheets URL) → Sistem (validate & transform) → Database (insert) → Sistem (generate insights) → User (dashboard update)

3. **Q&A Flow:**
   User (submit question) → Database (insert) → Edge Function → Resend API (send email) → Admin
   Admin (submit answer) → Database (update) → Edge Function → Resend API → User (email notification)

4. **AI Caption Flow:**
   User (caption request) → Sistem → Edge Function → Google Gemini API → Edge Function → Sistem → User (captions)

5. **Analytics Flow:**
   User (select filters) → Sistem → Database (query with RLS) → Sistem (calculate & visualize) → User (charts & insights)

---

*Catatan: Diagram konteks yang actual akan divisualisasikan secara grafis dalam versi final dokumen, namun deskripsi naratif di atas memberikan pemahaman lengkap tentang interaksi sistem dengan entitas eksternal.*

---

## 8. Arsitektur Sistem

### 8.1 Arsitektur Tingkat Tinggi (High-Level Architecture)

Sistem Analisis Performa Konten Digital menggunakan arsitektur **3-tier** yang dimodifikasi dengan paradigma **serverless**, terdiri dari:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│                      (Client-Side)                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  React SPA (TypeScript) + Tailwind CSS + shadcn/ui   │  │
│  │  - Components (Dashboard, Analytics, Q&A, etc.)      │  │
│  │  - State Management (Context API + React Query)      │  │
│  │  - Routing (React Router DOM)                         │  │
│  │  - Charts (Recharts)                                  │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                    HTTPS REST API
                      (Supabase SDK)
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                   Application Logic Layer                    │
│                     (Backend / API)                          │
│  ┌─────────────────────┐  ┌────────────────────────────┐    │
│  │  Supabase API       │  │  Edge Functions (Deno)     │    │
│  │  - RESTful endpoints│  │  - generate-caption        │    │
│  │  - Auth (JWT)       │  │  - notify-admin-new-q      │    │
│  │  - RLS enforcement  │  │  - notify-user-q-answered  │    │
│  └─────────────────────┘  └────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                    Internal Connection
                       (SQL Queries)
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│                   (Persistent Storage)                       │
│  ┌──────────────────┐  ┌───────────────┐  ┌──────────────┐  │
│  │  PostgreSQL 13   │  │  Supabase     │  │  External    │  │
│  │  - 16 tables     │  │  Storage      │  │  APIs        │  │
│  │  - RLS policies  │  │  - avatars    │  │  - Gemini    │  │
│  │  - Functions     │  │  bucket       │  │  - Resend    │  │
│  │  - Triggers      │  │               │  │              │  │
│  └──────────────────┘  └───────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Lapisan Presentasi (Presentation Layer)

**Teknologi Utama:**
- React 18.3.1 (UI framework)
- TypeScript (type safety)
- Vite (build tool dan dev server)
- Tailwind CSS (styling)
- shadcn/ui (component library)

**Tanggung Jawab:**
1. **Rendering UI**: Menampilkan interface ke user berdasarkan state dan data
2. **User Interaction**: Handle user input (clicks, form submissions, navigation)
3. **State Management**: 
   - Local state (useState) untuk component-specific state
   - Global state (Context API) untuk shared state (auth, selected project)
   - Server state (React Query) untuk data dari API dengan caching
4. **Data Fetching**: Request data ke backend via Supabase SDK
5. **Client-Side Routing**: Navigation antar halaman tanpa full page reload (React Router)
6. **Data Visualization**: Render charts dan graphs (Recharts library)

**Struktur Folder:**
```
src/
├── components/
│   ├── layout/           # AppLayout, Sidebar, Breadcrumbs
│   ├── ui/               # shadcn/ui components (Button, Card, Dialog, etc.)
│   └── *.tsx             # Custom components (InsightCard, ExportButton, dll)
├── pages/
│   ├── Auth.tsx          # Login & Signup
│   ├── Dashboard.tsx     # KPI Overview
│   ├── Performa.tsx      # Performance Analysis
│   ├── WaktuTerbaik.tsx  # Best Time to Post
│   └── ...
├── contexts/
│   ├── AuthContext.tsx   # User session management
│   └── AppContext.tsx    # Global app state
├── hooks/
│   └── use-toast.ts      # Toast notifications
└── integrations/
    └── supabase/
        ├── client.ts     # Supabase client instance
        └── types.ts      # Auto-generated TypeScript types
```

**Data Flow dalam Presentation Layer:**
```
User Action (click, submit)
  ↓
Event Handler (onClick, onSubmit)
  ↓
State Update (useState, Context, React Query mutation)
  ↓
Re-render Components
  ↓
Updated UI displayed to User
```

### 8.3 Lapisan Logika Aplikasi (Application Logic Layer)

**Komponen Utama:**

**1. Supabase REST API**
- **Fungsi**: Menyediakan RESTful endpoints untuk CRUD operations
- **URL Pattern**: `https://kmnhohitclftvoyvnapj.supabase.co/rest/v1/{table_name}`
- **Authentication**: JWT token di header `Authorization: Bearer {token}`
- **Features**:
  - Auto-generated endpoints dari database schema
  - RLS policy enforcement pada setiap query
  - Query builder syntax (filter, sort, pagination)
  - Real-time subscriptions (optional)

**Contoh Request:**
```typescript
// Frontend code
const { data, error } = await supabase
  .from('postingan')
  .select('*, platform(*), jenis_konten(*)')
  .eq('id_dataset', datasetId)
  .gte('waktu_diposting', startDate)
  .lte('waktu_diposting', endDate)
  .order('waktu_diposting', { ascending: false })

// Translates to HTTP request:
// GET /rest/v1/postingan?
//   select=*,platform(*),jenis_konten(*)
//   &id_dataset=eq.{datasetId}
//   &waktu_diposting=gte.{startDate}
//   &waktu_diposting=lte.{endDate}
//   &order=waktu_diposting.desc
```

**2. Edge Functions (Serverless Functions)**

**a. generate-caption**
- **Trigger**: User klik "Generate Caption" di `/caption-generator`
- **Input**: `{ topic, tone, platform, max_words }`
- **Process**:
  1. Validate input (topic tidak kosong, dll)
  2. Build prompt untuk Google Gemini
  3. Call Gemini API dengan prompt
  4. Parse response (extract caption variations)
  5. Return captions ke client
- **Output**: `{ captions: string[] }`
- **External API**: Google Gemini 2.5 Flash
- **Environment Variable**: `GEMINI_API_KEY`

**b. notify-admin-new-question**
- **Trigger**: Database trigger saat INSERT ke tabel `pertanyaan`
- **Input**: `{ question_id, judul_pertanyaan, isi_pertanyaan, nama_penanya, nama_proyek }`
- **Process**:
  1. Fetch admin email dari database (peran = 'admin')
  2. Build email content dengan template
  3. Call Resend API untuk kirim email
  4. Log delivery status
- **Output**: Email sent confirmation
- **External API**: Resend
- **Environment Variable**: `RESEND_API_KEY`

**c. notify-user-question-answered**
- **Trigger**: Database trigger saat UPDATE `pertanyaan` dengan status = 'dijawab'
- **Input**: `{ user_email, nama_penanya, judul_pertanyaan, isi_pertanyaan, jawaban }`
- **Process**:
  1. Check if status changed from 'menunggu' to 'dijawab'
  2. Build email content dengan template
  3. Call Resend API
  4. Log delivery status
- **Output**: Email sent confirmation
- **External API**: Resend
- **Environment Variable**: `RESEND_API_KEY`

**Deployment Edge Functions:**
- Edge functions di-deploy otomatis saat ada perubahan di folder `supabase/functions/`
- Runtime: Deno (secure, modern, TypeScript-native)
- Execution: On-demand (hanya berjalan saat dipanggil)
- Scaling: Auto-scaling berdasarkan load

### 8.4 Lapisan Data (Data Layer)

**Komponen Utama:**

**1. PostgreSQL Database**
- **Version**: 13.0.5
- **Host**: Supabase managed
- **Tables**: 16 tables utama (lihat Bab 12 untuk detail ERD)
- **Security**: Row Level Security (RLS) pada semua tables
- **Features**:
  - Foreign key constraints untuk referential integrity
  - Check constraints untuk data validation
  - Indexes untuk query performance
  - Triggers untuk automated actions
  - Functions untuk reusable logic

**Key Tables:**
```
Core Tables:
- profil: user profiles dengan role (admin/user)
- proyek: project containers
- anggota_proyek: project members dengan project-level roles
- dataset: data sources
- postingan: social media posts dengan metrics

Master Data:
- platform: social media platforms (Instagram, TikTok, etc.)
- jenis_konten: content types (Foto, Video, Reels, etc.)

Analytics:
- kampanye: marketing campaigns
- target_kpi: KPI targets per period
- kompetitor: competitor data
- data_kompetitor: competitor time-series metrics

Supporting:
- catatan: notes dengan berbagai scope
- pertanyaan: Q&A system
- filter_tersimpan: saved filters
- log_impor: import logs
- riwayat_export: export history
```

**2. Supabase Storage**
- **Bucket**: `avatars` (public bucket)
- **Purpose**: Menyimpan foto profil user
- **Access**: Public read, authenticated write
- **Path Pattern**: `{user_id}/avatar.{ext}`
- **Max File Size**: 2MB per file
- **Allowed Formats**: image/jpeg, image/png, image/webp

**3. External APIs / Data Sources**

**a. Google Gemini API**
- **Purpose**: AI text generation untuk caption
- **Model**: gemini-2.5-flash
- **Authentication**: API key
- **Rate Limit**: Sesuai quota Google Cloud project

**b. Resend API**
- **Purpose**: Transactional email sending
- **Authentication**: API key
- **Features**: Email templates, delivery tracking, webhooks

**c. Google Sheets (optional import source)**
- **Purpose**: Import data dari spreadsheet
- **Authentication**: OAuth 2.0 (jika private sheet)
- **Access**: Read-only untuk import

### 8.5 Aliran Data Lengkap (End-to-End Data Flow)

**Contoh: User melihat Dashboard**

```
1. User Action:
   User navigasi ke /dashboard

2. Presentation Layer:
   - React Router render Dashboard component
   - useEffect hook trigger data fetch
   
3. State Management:
   - AuthContext: user sudah login?
   - AppContext: selectedProject ada?
   
4. Data Fetch:
   const { data: posts } = useQuery({
     queryKey: ['posts', datasetId],
     queryFn: async () => {
       const { data, error } = await supabase
         .from('postingan')
         .select('*, platform(*), jenis_konten(*)')
         .eq('id_dataset', datasetId)
       if (error) throw error
       return data
     }
   })

5. Application Layer (Supabase API):
   - Receive HTTP GET request
   - Extract JWT from Authorization header
   - Verify JWT signature
   - Extract user_id from JWT payload
   
6. Data Layer (PostgreSQL):
   - Execute query:
     SELECT * FROM postingan WHERE id_dataset = $1
   - Evaluate RLS policy:
     has_project_access(id_proyek) 
     → Check if user owns project OR is member
   - If policy returns TRUE: return rows
   - If policy returns FALSE: return empty array
   
7. Application Layer (Supabase API):
   - Return JSON response to client
   
8. State Management (React Query):
   - Cache data dengan queryKey
   - Update component state
   
9. Presentation Layer:
   - Calculate KPI from posts data:
     avgER = posts.reduce((sum, p) => sum + p.engagement_rate_persen, 0) / posts.length
   - Render KPI cards
   - Render charts with Recharts
   
10. User sees:
    - Dashboard dengan KPI cards
    - Line chart: ER over time
    - Bar chart: Performance by platform
    - Insight cards dengan recommendations
```

### 8.6 Justifikasi Arsitektur

**Mengapa arsitektur ini dipilih:**

1. **Serverless Approach**:
   - ✅ No server management overhead
   - ✅ Auto-scaling berdasarkan traffic
   - ✅ Cost-efficient (pay per use)
   - ✅ Fast deployment
   - ❌ Cold start latency (mitigated dengan connection pooling)

2. **Single Page Application (SPA)**:
   - ✅ Fast navigation (no full page reload)
   - ✅ Rich user experience dengan interactive charts
   - ✅ Offline-capable (dengan service worker - optional)
   - ❌ Initial load bisa lebih lambat (mitigated dengan code splitting)

3. **Row Level Security (RLS)**:
   - ✅ Security di level database (most secure layer)
   - ✅ Prevent unauthorized access even if API compromised
   - ✅ Simplify application code (no manual permission checks)
   - ❌ Sedikit overhead pada query performance (acceptable trade-off)

4. **React + TypeScript**:
   - ✅ Type safety mencegah runtime errors
   - ✅ Rich ecosystem (libraries untuk charting, forms, dll)
   - ✅ Component reusability
   - ✅ Developer experience (autocomplete, refactoring)

5. **PostgreSQL + Supabase**:
   - ✅ Relational database cocok untuk structured data
   - ✅ ACID compliance untuk data integrity
   - ✅ Rich query capabilities (JOINs, aggregations, window functions)
   - ✅ Supabase menyediakan managed infrastructure

---

*Arsitektur ini dipilih karena balance antara development speed, scalability, security, dan cost-effectiveness, cocok untuk project tugas akhir yang membutuhkan implementasi cepat dengan best practices industry standard.*

---

## 9. Rancangan Arsitektur

### 9.1 Pembagian Modul/Komponen Sistem

Sistem Analisis Performa Konten Digital dibagi menjadi beberapa modul utama berdasarkan fungsi dan domain bisnis. Setiap modul memiliki tanggung jawab spesifik dan berkomunikasi dengan modul lain melalui interface yang terdefinisi.

`<Component Diagram: Pembagian Modul Sistem>`

**Deskripsi Naratif:**

Sistem terdiri dari 10 modul utama yang saling berinteraksi:

#### Modul 1: Autentikasi dan Manajemen Pengguna

**Fungsi:**
- Registrasi user baru
- Login dan logout
- Manajemen session dengan JWT
- Manajemen profil user (update nama, foto, bahasa, preferensi)

**Tabel yang Terlibat:**
- `auth.users` (managed by Supabase Auth)
- `profil` (user profiles dengan role)

**Komponen:**
- `AuthContext.tsx`: Context untuk global auth state
- `Auth.tsx`: Halaman login dan signup
- `useAuth` hook: Custom hook untuk auth operations

**Fitur Keamanan:**
- Password hashing (bcrypt via Supabase)
- JWT dengan expiry (24 hours default)
- Secure HTTP-only cookies (optional, sekarang pakai localStorage)
- Email verification (disabled untuk development)

**RLS Policies:**
```sql
-- Users can view all profiles
CREATE POLICY "Authenticated users can view all profiles"
ON profil FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Users can update own profile but not role
CREATE POLICY "Users can update own profile but not role"
ON profil FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  peran = (SELECT peran FROM profil WHERE id = auth.uid())
);
```

#### Modul 2: Manajemen Proyek dan Dataset

**Fungsi:**
- CRUD proyek (create, read, update, delete)
- Manajemen anggota proyek (add, remove, change role)
- CRUD dataset (create, read, update, delete)
- Set dataset aktif per proyek
- View import logs

**Tabel yang Terlibat:**
- `proyek`: project metadata
- `anggota_proyek`: project members dengan roles
- `dataset`: data sources
- `log_impor`: import history dan error logs

**Komponen:**
- `ProjectNew.tsx`: Halaman create/edit project
- `Import.tsx`: Halaman import dataset
- `AppContext.tsx`: Global state untuk selectedProject dan activeDataset

**Project Roles:**
- **Owner**: Full control (edit, delete, manage members)
- **Editor**: Can edit data but not delete project or manage members
- **Viewer**: Read-only access

**RLS Policies:**
```sql
-- Users can create own projects
CREATE POLICY "Users can create own projects"
ON proyek FOR INSERT
WITH CHECK (auth.uid() = id_pemilik);

-- Users can view accessible projects (owned or member)
CREATE POLICY "Users can view accessible projects"
ON proyek FOR SELECT
USING (
  id_pemilik = auth.uid() OR
  has_project_access(id)
);

-- Project owners can update
CREATE POLICY "Project owners can update"
ON proyek FOR UPDATE
USING (id_pemilik = auth.uid());

-- Project owners can delete
CREATE POLICY "Project owners can delete"
ON proyek FOR DELETE
USING (id_pemilik = auth.uid());
```

#### Modul 3: Import dan Manajemen Data Postingan

**Fungsi:**
- Import data dari CSV
- Import data dari Google Sheets
- Validasi data (format, required fields, master data references)
- Transform data (calculate engagement metrics)
- Batch insert dengan error handling
- View dan manage postingan individual

**Tabel yang Terlibat:**
- `postingan`: social media posts dengan metrics
- `dataset`: parent dataset
- `platform`: master data platform
- `jenis_konten`: master data content types
- `kampanye`: optional campaign association
- `log_impor`: import logs

**Komponen:**
- `Import.tsx`: Import wizard dengan preview
- Form validasi dan mapping kolom
- Progress indicator untuk batch insert

**Validasi Rules:**
```javascript
Required Fields:
- kode_postingan (unique per dataset)
- platform (must exist in master data)
- jenis_konten (must exist in master data)
- waktu_diposting (valid datetime, not in future)

Optional but Recommended:
- caption
- likes, komentar, shares, saved, views, reach, followers

Calculated Fields (auto-populated):
- total_engagement = likes + komentar + shares + saved
- engagement_rate_persen = (total_engagement / reach) * 100
  OR (total_engagement / followers) * 100 if reach = 0
```

**RLS Policies:**
```sql
-- Users can manage posts for accessible projects
CREATE POLICY "Users can manage posts for accessible projects"
ON postingan FOR ALL
USING (has_project_access(id_proyek));
```

#### Modul 4: Dashboard dan Analytics

**Fungsi:**
- Calculate dan display KPI (Total Posts, Avg ER, Total Reach, Followers, Save Rate, Share Rate)
- Visualisasi trend dengan line charts
- Performance analysis (top/worst posts)
- Platform comparison dengan bar charts
- Content type comparison
- Time-based analysis (daily, weekly, monthly trends)

**Tabel yang Terlibat:**
- `postingan`: source data untuk analytics
- `dataset`: filter by active dataset
- `target_kpi`: untuk comparison target vs actual

**Komponen:**
- `Dashboard.tsx`: KPI overview dengan charts
- `Performa.tsx`: Detailed performance analysis
- `InsightCard.tsx`: Reusable component untuk insight cards

**KPI Calculations:**
```javascript
// Total Posts
SELECT COUNT(*) FROM postingan 
WHERE id_dataset = active_dataset_id

// Average Engagement Rate
SELECT AVG(engagement_rate_persen) FROM postingan
WHERE id_dataset = active_dataset_id

// Total Reach
SELECT SUM(jumlah_reach) FROM postingan
WHERE id_dataset = active_dataset_id

// Average Followers
SELECT AVG(jumlah_followers) FROM postingan
WHERE id_dataset = active_dataset_id

// Save Rate
SELECT (SUM(jumlah_saved) / SUM(jumlah_reach)) * 100
FROM postingan WHERE id_dataset = active_dataset_id

// Share Rate
SELECT (SUM(jumlah_shares) / SUM(jumlah_reach)) * 100
FROM postingan WHERE id_dataset = active_dataset_id
```

**Chart Types:**
- Line Chart: Trend ER over time
- Bar Chart: Platform comparison, Content type comparison
- Heatmap: Best posting times (day × hour)
- Pie Chart: Distribution platform/content type

#### Modul 5: Analisis Waktu Terbaik (Best Time to Post)

**Fungsi:**
- Analisis performa berdasarkan hari dalam minggu (Senin-Minggu)
- Analisis performa berdasarkan jam (00:00-23:00)
- Heatmap visualization: day × hour
- Rekomendasi waktu posting optimal

**Tabel yang Terlibat:**
- `postingan`: dengan field waktu_diposting

**Komponen:**
- `WaktuTerbaik.tsx`: Best time analysis page

**Analysis Queries:**
```sql
-- Best Day of Week
SELECT 
  EXTRACT(DOW FROM waktu_diposting) as day_of_week,
  CASE EXTRACT(DOW FROM waktu_diposting)
    WHEN 0 THEN 'Minggu'
    WHEN 1 THEN 'Senin'
    ...
    WHEN 6 THEN 'Sabtu'
  END as day_name,
  COUNT(*) as total_posts,
  AVG(engagement_rate_persen) as avg_er,
  AVG(jumlah_reach) as avg_reach
FROM postingan
WHERE id_dataset = $1
GROUP BY day_of_week, day_name
ORDER BY avg_er DESC;

-- Best Hour of Day
SELECT 
  EXTRACT(HOUR FROM waktu_diposting) as hour,
  COUNT(*) as total_posts,
  AVG(engagement_rate_persen) as avg_er
FROM postingan
WHERE id_dataset = $1
GROUP BY hour
ORDER BY avg_er DESC;

-- Heatmap Data (day × hour)
SELECT 
  EXTRACT(DOW FROM waktu_diposting) as day,
  EXTRACT(HOUR FROM waktu_diposting) as hour,
  AVG(engagement_rate_persen) as avg_er
FROM postingan
WHERE id_dataset = $1
GROUP BY day, hour
ORDER BY day, hour;
```

#### Modul 6: Analisis Audiens

**Fungsi:**
- Analisis growth followers dari waktu ke waktu
- Analisis engagement patterns
- Demographics breakdown (jika ada data)

**Tabel yang Terlibat:**
- `postingan`: dengan field jumlah_followers

**Komponen:**
- `Audiens.tsx`: Audience analysis page

**Analysis:**
```sql
-- Followers Growth Over Time
SELECT 
  DATE(waktu_diposting) as date,
  AVG(jumlah_followers) as avg_followers
FROM postingan
WHERE id_dataset = $1
GROUP BY date
ORDER BY date;

-- Engagement Patterns
SELECT 
  CASE 
    WHEN engagement_rate_persen < 1 THEN 'Low (<1%)'
    WHEN engagement_rate_persen BETWEEN 1 AND 3 THEN 'Medium (1-3%)'
    WHEN engagement_rate_persen BETWEEN 3 AND 5 THEN 'Good (3-5%)'
    ELSE 'Excellent (>5%)'
  END as engagement_level,
  COUNT(*) as total_posts
FROM postingan
WHERE id_dataset = $1
GROUP BY engagement_level;
```

#### Modul 7: Perbandingan Dataset dan Kompetitor

**Fungsi:**
- Compare metrics antar dataset (multi-periode comparison)
- Compare metrics dengan kompetitor (benchmarking)
- Side-by-side visualization

**Tabel yang Terlibat:**
- `dataset`: untuk multi-dataset comparison
- `postingan`: data per dataset
- `kompetitor`: competitor profiles
- `data_kompetitor`: competitor time-series data

**Komponen:**
- `Perbandingan.tsx`: Comparison page
- `KompetitorAnalysis.tsx`: Competitor analysis page

**Comparison Types:**
```javascript
1. Period Comparison:
   - Dataset A (Jan 2025) vs Dataset B (Feb 2025)
   - Metrics: Avg ER, Total Reach, Total Engagement
   - Visualization: Side-by-side bar charts

2. Competitor Comparison:
   - Your brand vs Competitor A vs Competitor B
   - Metrics: Followers, Avg ER, Avg Likes/Comments/Shares
   - Visualization: Grouped bar charts, Line charts for trends
```

#### Modul 8: Perencanaan dan Target KPI

**Fungsi:**
- Set target KPI per periode (weekly/monthly)
- Track progress terhadap target
- Visualisasi achievement vs target
- Manajemen kampanye

**Tabel yang Terlibat:**
- `target_kpi`: target definitions
- `kampanye`: campaign metadata
- `postingan`: actual performance data

**Komponen:**
- `TargetKPI.tsx`: KPI target management
- `Kampanye.tsx`: Campaign management

**Target Tracking:**
```sql
-- Get Target vs Actual
SELECT 
  tk.target_rata_rata_er,
  tk.target_total_jangkauan,
  tk.target_jumlah_followers,
  AVG(p.engagement_rate_persen) as actual_er,
  SUM(p.jumlah_reach) as actual_reach,
  AVG(p.jumlah_followers) as actual_followers,
  (AVG(p.engagement_rate_persen) / tk.target_rata_rata_er) * 100 as er_achievement_pct
FROM target_kpi tk
LEFT JOIN postingan p ON 
  p.waktu_diposting BETWEEN tk.tanggal_mulai_periode AND tk.tanggal_selesai_periode
WHERE tk.id_proyek = $1 AND tk.id = $2
GROUP BY tk.id;
```

#### Modul 9: AI Tools dan Automation

**Fungsi:**
- Generate caption menggunakan Google Gemini AI
- Provide multiple caption variations
- Copy to clipboard functionality

**Tabel yang Terlibat:**
- Tidak ada (stateless operation)

**Komponen:**
- `CaptionGenerator.tsx`: AI caption generator page

**Edge Function:**
```javascript
// supabase/functions/generate-caption/index.ts
Input: { topic, tone, platform, max_words }
Process:
  1. Build prompt dengan context platform dan tone
  2. Call Google Gemini API
  3. Parse response (extract 3-5 caption variations)
  4. Return captions array
Output: { captions: string[] }
```

#### Modul 10: Sistem Bantuan (Q&A)

**Fungsi:**
- User submit pertanyaan
- Admin view dan jawab pertanyaan
- Email notifications (admin saat ada pertanyaan baru, user saat dijawab)
- User rating dan feedback untuk jawaban

**Tabel yang Terlibat:**
- `pertanyaan`: questions dan answers

**Komponen:**
- `Bantuan.tsx`: User Q&A page
- `BantuanAdmin.tsx`: Admin Q&A management page
- `RatingDialog.tsx`: Rating component

**Edge Functions:**
```javascript
1. notify-admin-new-question
   Trigger: Database trigger on INSERT pertanyaan
   Input: { question_id, judul, isi, nama_penanya, nama_proyek }
   Process: Send email to admin via Resend API
   
2. notify-user-question-answered
   Trigger: Database trigger on UPDATE pertanyaan (status='dijawab')
   Input: { user_email, judul, isi, jawaban }
   Process: Send email to user via Resend API
```

**RLS Policies:**
```sql
-- Users can create questions
CREATE POLICY "Users can create questions"
ON pertanyaan FOR INSERT
WITH CHECK (
  auth.uid() = id_pengguna AND
  has_project_access(id_proyek)
);

-- Users can view and rate own questions
CREATE POLICY "Users can rate answered questions"
ON pertanyaan FOR UPDATE
USING (auth.uid() = id_pengguna)
WITH CHECK (auth.uid() = id_pengguna);

-- Admins can view all questions
CREATE POLICY "Admins can view all questions"
ON pertanyaan FOR SELECT
USING (is_admin());

-- Admins can answer questions
CREATE POLICY "Admins can answer questions"
ON pertanyaan FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());
```

### 9.2 Interaksi Antar Modul

**Dependency Diagram (Naratif):**

```
Modul 1 (Auth) → provides user session → All other modules
Modul 2 (Project/Dataset) → provides context → Modul 3, 4, 5, 6, 7, 8, 10
Modul 3 (Import) → populates data → Modul 4, 5, 6, 7, 8
Modul 4 (Dashboard) ← consumes data ← Modul 3
Modul 5 (Best Time) ← consumes data ← Modul 3
Modul 6 (Audience) ← consumes data ← Modul 3
Modul 7 (Comparison) ← consumes data ← Modul 3
Modul 8 (Planning) → associates posts → Modul 3
Modul 9 (AI Tools) → independent (stateless)
Modul 10 (Q&A) → independent (per project context)
```

**Key Interactions:**

1. **Auth → All Modules**: Auth module provides user session yang digunakan oleh semua modul untuk authorization checks

2. **Project/Dataset → Analytics Modules**: Project context (selectedProject, activeDataset) digunakan untuk filter data di modul analytics

3. **Import → Analytics**: Data yang diimport langsung tersedia untuk analytics tanpa perlu refresh manual

4. **Planning → Posts**: Kampanye dapat di-associate dengan postingan untuk tracking campaign performance

5. **Admin Q&A ← Edge Functions**: Email notifications trigger automatic saat ada pertanyaan baru atau jawaban baru

---

*Component diagram actual akan divisualisasikan dalam versi final dokumen, namun deskripsi naratif di atas memberikan pemahaman lengkap tentang struktur modular sistem dan interaksinya.*

---

## 10. Rancangan Arsitektur Detail

Bagian ini menjelaskan rancangan arsitektur detail sistem menggunakan UML diagrams untuk memvisualisasikan use case, activity, dan sequence diagram dari proses-proses utama dalam sistem.

### 10.1 Use Case Diagram

`<Use Case Diagram: Sistem Analisis Performa Konten Digital>`

**Deskripsi Naratif:**

**Aktor:**
1. **User (Content Creator / UMKM / Brand)**: Pengguna standar sistem
2. **Admin (Maarif Alawi)**: Administrator dan pemilik sistem

**Use Cases untuk User:**

**UC-01: Autentikasi**
- UC-01.1: Registrasi akun baru
- UC-01.2: Login ke sistem
- UC-01.3: Logout dari sistem
- UC-01.4: Update profil (nama, foto, bahasa, preferensi)

**UC-02: Manajemen Proyek**
- UC-02.1: Buat proyek baru
- UC-02.2: Edit proyek (nama, deskripsi)
- UC-02.3: Hapus proyek
- UC-02.4: Tambah anggota proyek
- UC-02.5: Hapus anggota proyek
- UC-02.6: Ubah role anggota proyek (owner, editor, viewer)
- UC-02.7: Lihat daftar proyek (owned dan member)

**UC-03: Manajemen Dataset**
- UC-03.1: Buat dataset baru
- UC-03.2: Import data dari CSV
- UC-03.3: Import data dari Google Sheets
- UC-03.4: Set dataset aktif
- UC-03.5: Lihat log import
- UC-03.6: Hapus dataset

**UC-04: Manajemen Postingan**
- UC-04.1: Lihat daftar postingan
- UC-04.2: Tambah postingan manual
- UC-04.3: Edit postingan
- UC-04.4: Hapus postingan
- UC-04.5: Associate postingan dengan kampanye

**UC-05: Analytics dan Dashboard**
- UC-05.1: Lihat dashboard overview
- UC-05.2: Lihat analisis performa
- UC-05.3: Lihat analisis waktu terbaik posting
- UC-05.4: Lihat analisis audiens
- UC-05.5: Lihat insight otomatis
- UC-05.6: Apply filter (tanggal, platform, jenis konten)
- UC-05.7: Save filter untuk penggunaan berikutnya
- UC-05.8: Load saved filter

**UC-06: Perbandingan**
- UC-06.1: Bandingkan multi-dataset
- UC-06.2: Lihat analisis kompetitor
- UC-06.3: Tambah data kompetitor
- UC-06.4: Edit data kompetitor
- UC-06.5: Hapus kompetitor

**UC-07: Perencanaan**
- UC-07.1: Set target KPI (ER, Reach, Followers)
- UC-07.2: Track progress terhadap target
- UC-07.3: Buat kampanye
- UC-07.4: Edit kampanye
- UC-07.5: Hapus kampanye

**UC-08: AI Tools**
- UC-08.1: Generate caption dengan AI
- UC-08.2: Copy caption ke clipboard
- UC-08.3: Regenerate caption dengan parameter berbeda

**UC-09: Pelaporan**
- UC-09.1: Export data ke Excel
- UC-09.2: Generate laporan PDF
- UC-09.3: Lihat riwayat export

**UC-10: Catatan**
- UC-10.1: Tambah catatan untuk postingan (scope: post)
- UC-10.2: Tambah catatan untuk minggu tertentu (scope: week)
- UC-10.3: Tambah catatan umum proyek (scope: global)
- UC-10.4: Edit catatan
- UC-10.5: Hapus catatan

**UC-11: Sistem Bantuan**
- UC-11.1: Ajukan pertanyaan baru
- UC-11.2: Edit pertanyaan yang belum dijawab
- UC-11.3: Hapus pertanyaan yang belum dijawab
- UC-11.4: Lihat status pertanyaan (menunggu/dijawab)
- UC-11.5: Baca jawaban dari admin
- UC-11.6: Berikan rating dan komentar untuk jawaban

**Use Cases untuk Admin:**

**UC-12: Manajemen Master Data**
- UC-12.1: CRUD platform (Instagram, TikTok, dsb)
- UC-12.2: CRUD jenis konten (Foto, Video, Reels, dsb)
- UC-12.3: Set status aktif/nonaktif master data

**UC-13: Manajemen Q&A**
- UC-13.1: Lihat semua pertanyaan dari seluruh user
- UC-13.2: Filter pertanyaan (menunggu/dijawab/semua)
- UC-13.3: Jawab pertanyaan
- UC-13.4: Edit jawaban
- UC-13.5: Lihat rating dan komentar dari user

**UC-14: Monitoring Sistem**
- UC-14.1: Lihat statistik pertanyaan (total, menunggu, rating rata-rata)
- UC-14.2: Lihat log import dari semua user
- UC-14.3: Lihat riwayat export dari semua user

**Extend Relationships:**
- UC-03.2 dan UC-03.3 extend UC-03.1 (Import adalah bagian dari Create Dataset)
- UC-05.7 extend UC-05.6 (Save filter setelah apply filter)
- UC-08.3 extend UC-08.1 (Regenerate setelah generate pertama kali)

**Include Relationships:**
- Semua use case (kecuali UC-01) include UC-01.2 (Login required)
- UC-05.1 sampai UC-05.5 include UC-05.6 (Apply filter digunakan di semua halaman analytics)

### 10.2 Activity Diagram: Proses Import Dataset

`<Activity Diagram: Proses Import Dataset>`

**Deskripsi Naratif:**

**Proses import dataset dari CSV dimulai dari user hingga data tersimpan di database:**

1. **Start**: User membuka halaman `/import`

2. **User Action**: User klik tombol "Buat Dataset Baru"

3. **System**: Tampilkan form create dataset
   - Input: Nama dataset
   - Input: Pilih sumber (Upload CSV / Google Sheets)

4. **Decision**: Apakah user pilih "Upload CSV"?
   - **Yes**: Lanjut ke upload flow
   - **No**: Redirect ke Google Sheets flow (di luar scope diagram ini)

5. **User Action**: User select file CSV dari device

6. **System**: Validate file
   - Decision: Apakah file format valid (CSV/XLSX)?
     - **No**: Show error toast "Format file tidak valid", kembali ke step 4
     - **Yes**: Lanjut

7. **System**: Parse file dan read 10 rows pertama untuk preview

8. **System**: Tampilkan preview data dalam tabel
   - Highlight kolom required (platform, jenis_konten, waktu_diposting)
   - Highlight kolom optional (caption, likes, komentar, dll)

9. **User Action**: User review preview data

10. **Decision**: Apakah user konfirmasi "Ya, import dataset ini"?
    - **No**: User klik "Batal" → End
    - **Yes**: Lanjut

11. **System**: Start import process (show loading spinner)

12. **System**: For each row in CSV:
    - **Validate structure**:
      - Decision: Apakah kolom required lengkap?
        - **No**: Skip row, log error → Continue to next row
        - **Yes**: Lanjut
    
    - **Validate data**:
      - Decision: Apakah platform_id exist di tabel `platform`?
        - **No**: Skip row, log error "Platform tidak ditemukan" → Continue
        - **Yes**: Lanjut
      
      - Decision: Apakah jenis_konten_id exist di tabel `jenis_konten`?
        - **No**: Skip row, log error "Jenis konten tidak ditemukan" → Continue
        - **Yes**: Lanjut
      
      - Decision: Apakah waktu_diposting valid dan tidak di masa depan?
        - **No**: Skip row, log error "Tanggal posting tidak valid" → Continue
        - **Yes**: Lanjut
    
    - **Transform data**:
      - Calculate: `total_engagement = likes + komentar + shares + saved`
      - Calculate: `engagement_rate_persen = (total_engagement / reach) * 100`
        - If reach = 0: `engagement_rate_persen = (total_engagement / followers) * 100`
    
    - **Insert to database**:
      - Execute: INSERT INTO postingan (...) VALUES (...)
      - Decision: Insert berhasil?
        - **No**: Log error → Continue
        - **Yes**: Increment success counter → Continue

13. **System**: After all rows processed:
    - Decision: Apakah ada row yang berhasil diimport?
      - **No**: 
        - Set log_impor status = 'failed'
        - Show error toast "Import gagal. Semua rows error"
        - → End
      - **Yes**: Lanjut

14. **System**: Update dataset metadata
    - UPDATE dataset SET jumlah_baris_dataset = success_count
    - UPDATE dataset SET dataset_aktif = TRUE WHERE id = new_dataset_id
    - UPDATE dataset SET dataset_aktif = FALSE WHERE id != new_dataset_id AND id_proyek = current_project

15. **System**: Create import log
    - INSERT INTO log_impor (
        id_dataset,
        status_impor,
        jumlah_baris_tidak_valid,
        pesan,
        kolom_hilang
      ) VALUES (
        new_dataset_id,
        'success', // or 'partial' if ada errors
        error_count,
        error_message,
        missing_columns_json
      )

16. **System**: Show success toast
    - "Import berhasil! {success_count} dari {total_rows} rows diimport."
    - If error_count > 0: "Detail error: [link to log]"

17. **System**: Redirect ke `/dashboard` dengan dataset aktif baru

18. **End**

**Parallel Process (async):**
- Saat import sedang berjalan, system tetap responsive (tidak block UI)
- User dapat cancel import di tengah jalan (abort signal)
- Progress indicator menampilkan: "Processing row {current} of {total}..."

### 10.3 Activity Diagram: Proses Analisis Dashboard

`<Activity Diagram: Proses Analisis Dashboard>`

**Deskripsi Naratif:**

**Proses dari user select filter hingga insight ditampilkan:**

1. **Start**: User membuka halaman `/dashboard`

2. **System**: Check authentication
   - Decision: Apakah user sudah login?
     - **No**: Redirect ke `/auth?mode=login` → End
     - **Yes**: Lanjut

3. **System**: Check project context
   - Decision: Apakah ada selectedProject?
     - **No**: Tampilkan empty state "Buat proyek pertama Anda" → End
     - **Yes**: Lanjut

4. **System**: Fetch active dataset
   - Query: SELECT * FROM dataset WHERE id_proyek = selectedProject AND dataset_aktif = TRUE

5. **Decision**: Apakah ada active dataset?
   - **No**: Tampilkan empty state "Import dataset pertama Anda" dengan link ke `/import` → End
   - **Yes**: Lanjut

6. **System**: Tampilkan dashboard layout dengan filter panel

7. **User Action** (optional): User apply filter
   - Filter tanggal: pilih rentang tanggal (start_date, end_date)
   - Filter platform: pilih satu atau multiple platform
   - Filter jenis konten: pilih satu atau multiple jenis konten
   - Filter kampanye: pilih kampanye tertentu (optional)

8. **System**: Fetch postingan data dengan filter
   ```sql
   SELECT * FROM postingan
   WHERE id_dataset = active_dataset_id
     AND (start_date IS NULL OR waktu_diposting >= start_date)
     AND (end_date IS NULL OR waktu_diposting <= end_date)
     AND (platforms IS NULL OR id_platform IN platforms)
     AND (content_types IS NULL OR id_jenis_konten IN content_types)
     AND (campaign_id IS NULL OR id_kampanye = campaign_id)
   ```

9. **System**: Calculate KPI metrics
   - **Total Posts**: COUNT(*)
   - **Average ER**: AVG(engagement_rate_persen)
   - **Total Reach**: SUM(jumlah_reach)
   - **Avg Followers**: AVG(jumlah_followers)
   - **Save Rate**: (SUM(jumlah_saved) / SUM(jumlah_reach)) * 100
   - **Share Rate**: (SUM(jumlah_shares) / SUM(jumlah_reach)) * 100

10. **System**: Calculate trend data (for sparklines)
    - Group postingan by DATE(waktu_diposting)
    - Calculate daily AVG(engagement_rate_persen)
    - Sort by date ASC

11. **System**: Render KPI cards
    - For each KPI:
      - Display current value (large number)
      - Display sparkline (mini line chart)
      - Display trend indicator (↑ +15% vs last period or ↓ -5%)

12. **System**: Generate insight otomatis
    - **Best posting day**:
      ```sql
      SELECT EXTRACT(DOW FROM waktu_diposting) as day,
             AVG(engagement_rate_persen) as avg_er
      FROM postingan
      WHERE id_dataset = active_dataset_id
      GROUP BY day
      ORDER BY avg_er DESC
      LIMIT 1
      ```
      → Insight: "Posting di hari {day_name} memberikan ER tertinggi ({avg_er}%)"
    
    - **Best content type**:
      ```sql
      SELECT jk.nama_jenis_konten,
             AVG(p.engagement_rate_persen) as avg_er
      FROM postingan p
      JOIN jenis_konten jk ON p.id_jenis_konten = jk.id
      WHERE p.id_dataset = active_dataset_id
      GROUP BY jk.nama_jenis_konten
      ORDER BY avg_er DESC
      LIMIT 1
      ```
      → Insight: "{content_type} mendapat ER {X}x lebih tinggi dari rata-rata"
    
    - **Trend analysis**:
      - Compare current period ER vs previous period
      → Insight: "Engagement Rate {meningkat/menurun} {percentage}% vs periode sebelumnya"

13. **System**: Prepare chart data
    - **Line Chart** (ER over time):
      ```javascript
      data = posts.map(p => ({
        date: format(p.waktu_diposting, 'dd MMM'),
        er: p.engagement_rate_persen
      }))
      ```
    
    - **Bar Chart** (Performance by platform):
      ```javascript
      data = groupBy(posts, 'id_platform').map(group => ({
        platform: group[0].platform.nama_platform,
        avgER: average(group.map(p => p.engagement_rate_persen)),
        totalPosts: group.length
      }))
      ```

14. **System**: Render charts dengan Recharts
    - Line chart dengan responsive container
    - Bar chart dengan custom colors per platform
    - Tooltips dengan formatted data

15. **System**: Render insight cards
    - For each insight:
      - Icon (based on insight type)
      - Title (short summary)
      - Description (detailed insight)
      - Action button (optional, e.g., "Lihat detail")

16. **Decision**: Apakah user apply new filter atau load saved filter?
    - **Yes**: Kembali ke step 7 (re-fetch dan re-calculate semua)
    - **No**: Dashboard fully loaded

17. **User Action** (optional): User klik "Save Filter"
    - Show dialog input nama filter
    - User confirm
    - System: INSERT INTO filter_tersimpan (id_pengguna, id_proyek, halaman, nama_filter, nilai_filter_json)
    - Toast: "Filter berhasil disimpan"

18. **End**

**Caching Strategy:**
- React Query cache postingan data dengan queryKey: `['posts', datasetId, filters]`
- Cache invalidation saat:
  - Dataset aktif berubah
  - Ada insert/update/delete postingan
  - User explicit refresh

### 10.4 Activity/Sequence Diagram: Proses Q&A dan Notifikasi

`<Sequence Diagram: Proses Q&A dan Notifikasi Email>`

**Deskripsi Naratif:**

**Actors:**
- User (Content Creator)
- Frontend (React App)
- Supabase API
- PostgreSQL Database
- Database Trigger
- Edge Function (notify-admin-new-question)
- Resend API
- Admin (Maarif Alawi)

**Sequence:**

**Part 1: User Submit Pertanyaan**

1. User → Frontend: Buka halaman `/bantuan`
2. Frontend → Supabase API: GET /rest/v1/pertanyaan?id_pengguna=eq.{user_id}
3. Supabase API → PostgreSQL: SELECT * FROM pertanyaan WHERE id_pengguna = {user_id}
4. PostgreSQL evaluates RLS: `auth.uid() = id_pengguna` → TRUE
5. PostgreSQL → Supabase API: Return user's questions
6. Supabase API → Frontend: JSON response dengan daftar pertanyaan
7. Frontend → User: Display daftar pertanyaan (menunggu/dijawab)

8. User → Frontend: Klik "Ajukan Pertanyaan Baru"
9. Frontend → User: Show dialog dengan form (judul, isi, proyek)

10. User → Frontend: Isi form dan klik "Kirim Pertanyaan"
11. Frontend: Validate input (judul tidak kosong, isi min 10 karakter)
12. Frontend → Supabase API: POST /rest/v1/pertanyaan
    ```json
    {
      "id_pengguna": "{user_id}",
      "id_proyek": "{project_id}",
      "judul_pertanyaan": "Cara import dari Instagram?",
      "isi_pertanyaan": "Saya ingin import data dari Instagram...",
      "status": "menunggu"
    }
    ```

13. Supabase API → PostgreSQL: INSERT INTO pertanyaan (...)
14. PostgreSQL evaluates RLS policy: `auth.uid() = id_pengguna AND has_project_access(id_proyek)` → TRUE
15. PostgreSQL: Insert berhasil
16. PostgreSQL: Trigger `notify_admin_new_question()` fires AFTER INSERT

**Part 2: Database Trigger dan Email ke Admin**

17. Database Trigger → PostgreSQL: Fetch data for notification
    ```sql
    SELECT 
      p.nama_lengkap as nama_penanya,
      pr.nama_proyek
    FROM pertanyaan q
    JOIN profil p ON q.id_pengguna = p.id
    JOIN proyek pr ON q.id_proyek = pr.id
    WHERE q.id = NEW.id
    ```

18. Database Trigger → Edge Function: Call via pg_net.http_post
    ```sql
    PERFORM net.http_post(
      url := '{SUPABASE_URL}/functions/v1/notify-admin-new-question',
      headers := jsonb_build_object(
        'Authorization', 'Bearer {SERVICE_ROLE_KEY}'
      ),
      body := jsonb_build_object(
        'question_id', NEW.id,
        'judul_pertanyaan', NEW.judul_pertanyaan,
        'isi_pertanyaan', NEW.isi_pertanyaan,
        'nama_penanya', v_nama_penanya,
        'nama_proyek', v_nama_proyek
      )
    )
    ```

19. Edge Function: Receive request

20. Edge Function → PostgreSQL: Fetch admin email
    ```sql
    SELECT email FROM auth.users u
    JOIN profil p ON u.id = p.id
    WHERE p.peran = 'admin'
    LIMIT 1
    ```

21. PostgreSQL → Edge Function: Return admin email

22. Edge Function → Resend API: Send email
    ```javascript
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: admin_email,
        subject: '[Q&A] Pertanyaan Baru dari ' + nama_penanya,
        html: `
          <h2>Pertanyaan Baru dari User</h2>
          <p><strong>Dari:</strong> ${nama_penanya}</p>
          <p><strong>Proyek:</strong> ${nama_proyek}</p>
          <p><strong>Judul:</strong> ${judul_pertanyaan}</p>
          <p><strong>Isi:</strong></p>
          <p>${isi_pertanyaan}</p>
          <p><a href="${APP_URL}/bantuan-admin">Lihat dan Jawab Pertanyaan</a></p>
        `
      })
    })
    ```

23. Resend API → Edge Function: Email sent confirmation (status 200)

24. Edge Function → Database Trigger: Return success

25. PostgreSQL → Supabase API: Return inserted question

26. Supabase API → Frontend: JSON response dengan question data

27. Frontend: Invalidate React Query cache untuk 'questions'

28. Frontend → User: Show toast "Pertanyaan terkirim! Admin akan menjawab dalam 1x24 jam."

29. Resend API → Admin: Email delivered to inbox

**Part 3: Admin Menjawab Pertanyaan**

30. Admin → Email: Buka email notifikasi

31. Admin → Email: Klik link "Lihat dan Jawab Pertanyaan"

32. Email → Frontend: Redirect ke `/bantuan-admin`

33. Frontend → Supabase API: GET /rest/v1/pertanyaan?status=eq.menunggu

34. Supabase API → PostgreSQL: SELECT * FROM pertanyaan WHERE status = 'menunggu'

35. PostgreSQL evaluates RLS: `is_admin()` → TRUE

36. PostgreSQL → Supabase API: Return all pending questions

37. Supabase API → Frontend: JSON response dengan daftar pertanyaan

38. Frontend → Admin: Display daftar pertanyaan

39. Admin → Frontend: Klik pertanyaan untuk lihat detail

40. Frontend → Admin: Show dialog dengan detail pertanyaan dan form jawaban

41. Admin → Frontend: Tulis jawaban dan klik "Kirim Jawaban"

42. Frontend → Supabase API: PATCH /rest/v1/pertanyaan?id=eq.{question_id}
    ```json
    {
      "jawaban": "Untuk import dari Instagram, Anda bisa...",
      "status": "dijawab",
      "dijawab_oleh": "{admin_id}",
      "updated_at": "2025-11-30T10:30:00Z"
    }
    ```

43. Supabase API → PostgreSQL: UPDATE pertanyaan SET ... WHERE id = {question_id}

44. PostgreSQL evaluates RLS: `is_admin()` → TRUE

45. PostgreSQL: Update berhasil

46. PostgreSQL: Trigger `notify_user_question_answered()` fires AFTER UPDATE

**Part 4: Notifikasi Email ke User**

47. Database Trigger: Check if status changed from 'menunggu' to 'dijawab'
    - Decision: NEW.status = 'dijawab' AND OLD.status != 'dijawab'?
      - **Yes**: Lanjut
      - **No**: Skip notification

48. Database Trigger → PostgreSQL: Fetch user email
    ```sql
    SELECT email FROM auth.users WHERE id = NEW.id_pengguna
    ```

49. Database Trigger → Edge Function: Call via pg_net.http_post
    ```sql
    PERFORM net.http_post(
      url := '{SUPABASE_URL}/functions/v1/notify-user-question-answered',
      body := jsonb_build_object(
        'user_email', v_user_email,
        'nama_penanya', v_nama_penanya,
        'judul_pertanyaan', NEW.judul_pertanyaan,
        'isi_pertanyaan', NEW.isi_pertanyaan,
        'jawaban', NEW.jawaban
      )
    )
    ```

50. Edge Function → Resend API: Send email to user
    ```javascript
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { ... },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: user_email,
        subject: 'Pertanyaan Anda Sudah Dijawab',
        html: `
          <h2>Halo ${nama_penanya},</h2>
          <p>Pertanyaan Anda tentang <strong>"${judul_pertanyaan}"</strong> sudah dijawab.</p>
          <p><strong>Jawaban:</strong></p>
          <p>${jawaban}</p>
          <p><a href="${APP_URL}/bantuan">Lihat Detail dan Berikan Rating</a></p>
        `
      })
    })
    ```

51. Resend API → Edge Function: Email sent confirmation

52. Edge Function → Database Trigger: Return success

53. PostgreSQL → Supabase API: Return updated question

54. Supabase API → Frontend: JSON response

55. Frontend → Admin: Show toast "Jawaban berhasil dikirim"

56. Resend API → User: Email delivered to inbox

**Part 5: User Memberikan Rating**

57. User → Email: Buka email notifikasi

58. User → Email: Klik link "Lihat Detail dan Berikan Rating"

59. Email → Frontend: Redirect ke `/bantuan`

60. Frontend → Supabase API: GET /rest/v1/pertanyaan?id=eq.{question_id}

61. Supabase API → PostgreSQL: SELECT * FROM pertanyaan WHERE id = {question_id}

62. PostgreSQL evaluates RLS: `auth.uid() = id_pengguna` → TRUE

63. PostgreSQL → Supabase API: Return question dengan jawaban

64. Supabase API → Frontend: JSON response

65. Frontend → User: Display pertanyaan, jawaban, dan form rating

66. User → Frontend: Pilih rating (1-5 bintang) dan tulis komentar (optional)

67. User → Frontend: Klik "Kirim Rating"

68. Frontend → Supabase API: PATCH /rest/v1/pertanyaan?id=eq.{question_id}
    ```json
    {
      "rating": 5,
      "komentar_rating": "Sangat membantu! Terima kasih",
      "rating_at": "2025-11-30T11:00:00Z"
    }
    ```

69. Supabase API → PostgreSQL: UPDATE pertanyaan SET ... WHERE id = {question_id}

70. PostgreSQL evaluates RLS: `auth.uid() = id_pengguna` → TRUE

71. PostgreSQL → Supabase API: Return updated question

72. Supabase API → Frontend: JSON response

73. Frontend → User: Show toast "Terima kasih atas rating Anda!"

74. **End**

---

*Sequence diagram actual akan divisualisasikan dalam versi final dokumen dengan swimlanes untuk setiap actor dan arrows untuk message passing, namun deskripsi naratif di atas memberikan pemahaman lengkap tentang alur interaksi sistem Q&A dengan notifikasi email.*

---

## 11. Alasan Rancangan

### 11.1 Pemilihan UML sebagai Tool Perancangan

Sistem Analisis Performa Konten Digital menggunakan **Unified Modeling Language (UML)** sebagai tool utama untuk perancangan arsitektur sistem. Berikut adalah alasan pemilihan UML:

#### 11.1.1 Keunggulan UML untuk Sistem Ini

**1. Cocok untuk Sistem Berbasis Objek dan Komponen**

Sistem ini dibangun dengan React (component-based architecture) dan TypeScript (object-oriented language). UML sangat sesuai karena:

- **Use Case Diagram** dapat menggambarkan interaksi user dengan sistem melalui fitur-fitur (use cases)
- **Class Diagram** (dalam bentuk ERD untuk database) dapat merepresentasikan entitas dan relasi antar tabel
- **Sequence Diagram** dapat memvisualisasikan interaksi antar komponen (Frontend → API → Database → Edge Function)
- **Activity Diagram** dapat menggambarkan alur proses bisnis dengan decision points yang kompleks

**2. Mendukung Banyak Jenis Diagram**

UML menyediakan 14 jenis diagram, dan sistem ini menggunakan 4 jenis utama:

- **Use Case Diagram**: Untuk requirement gathering dan menjelaskan fungsionalitas sistem
- **Activity Diagram**: Untuk menggambarkan proses bisnis (import dataset, generate insight, Q&A flow)
- **Sequence Diagram**: Untuk menjelaskan interaksi temporal antar komponen (message passing, API calls)
- **Class/ERD Diagram**: Untuk struktur data dan relasi database

**3. Standar Industri yang Luas Diterima**

- UML adalah standar internasional (ISO/IEC 19505)
- Dipahami oleh developer, database designer, business analyst, dan stakeholder non-teknis
- Tool support yang luas (Lucidchart, draw.io, PlantUML, Visual Paradigm)
- Banyak referensi dan best practices tersedia

**4. Ekspresif untuk Representasi Komponen Web Modern**

UML dapat merepresentasikan:

- **Komponen React**: Sebagai classes atau components
- **Props dan State**: Sebagai attributes
- **Methods dan Hooks**: Sebagai operations
- **Context API**: Sebagai shared objects
- **Edge Functions**: Sebagai boundary objects atau external services
- **API Endpoints**: Sebagai interfaces

**Contoh: Sequence Diagram untuk AI Caption Generation**

```
User → CaptionGenerator (Component)
CaptionGenerator → useState (set loading = true)
CaptionGenerator → Supabase SDK (invoke 'generate-caption')
Supabase SDK → Edge Function (HTTPS POST request)
Edge Function → Google Gemini API (send prompt)
Google Gemini API → Edge Function (return captions)
Edge Function → Supabase SDK (return JSON response)
Supabase SDK → CaptionGenerator (data received)
CaptionGenerator → useState (set captions, loading = false)
CaptionGenerator → User (display captions)
```

Diagram ini jelas menggambarkan alur temporal dan message passing antar komponen.

#### 11.1.2 Keterbatasan DFD (Data Flow Diagram) dalam Konteks Sistem Ini

**Data Flow Diagram (DFD)** adalah tool perancangan yang umum digunakan untuk sistem structured/procedural. Namun, DFD kurang cocok untuk sistem ini karena:

**1. Kurang Ekspresif untuk Komponen Web/Edge Function**

DFD fokus pada aliran data antar proses, tetapi:

- ❌ Tidak dapat merepresentasikan **komponen React** dengan lifecycle dan state
- ❌ Tidak dapat menggambarkan **event-driven architecture** (onClick, onChange, useEffect)
- ❌ Tidak dapat merepresentasikan **asynchronous operations** (Promises, async/await)
- ❌ Sulit menggambarkan **Edge Functions** yang berjalan serverless dan on-demand
- ❌ Tidak dapat merepresentasikan **database triggers** yang fire otomatis

**2. Tidak Ada Konsep Time/Sequence**

DFD menggambarkan aliran data tanpa dimensi waktu, sementara sistem ini memiliki banyak proses temporal:

- **Import dataset**: Multi-step process dengan validasi, transform, insert sequential
- **Q&A flow**: User submit → trigger → email → admin jawab → trigger → email → user rating
- **AI caption generation**: User request → edge function → external API → response

Sequence diagram UML lebih jelas menggambarkan urutan temporal ini.

**3. Tidak Ada Konsep Object/Class**

DFD tidak memiliki konsep OOP (inheritance, encapsulation, polymorphism), sementara:

- React components menggunakan composition dan props inheritance
- TypeScript types dan interfaces menggunakan generics dan utility types
- Database schema menggunakan foreign keys dan constraints (relational model)

Class diagram atau ERD lebih sesuai untuk merepresentasikan struktur ini.

**4. Kurang Sesuai untuk Serverless Architecture**

DFD tradisional berasumsi proses berjalan terus-menerus (daemon), sementara:

- Edge functions berjalan on-demand (stateless, cold start)
- React components mount/unmount berdasarkan routing
- Database connections menggunakan pooling (tidak persistent)

UML lebih fleksibel untuk merepresentasikan arsitektur modern ini.

**Contoh Keterbatasan DFD:**

Jika kita gambarkan "Generate Caption" dengan DFD:

```
[User] → Process 1.0 (Input topic) → [Data Store: temp]
[temp] → Process 2.0 (Call AI API) → [Data Store: temp]
[temp] → Process 3.0 (Display captions) → [User]
```

DFD ini:
- ❌ Tidak menggambarkan bahwa Process 2.0 adalah Edge Function (bukan local process)
- ❌ Tidak menggambarkan bahwa ada external API call ke Google Gemini
- ❌ Tidak menggambarkan error handling (jika API gagal)
- ❌ Tidak menggambarkan loading state di UI

Bandingkan dengan Sequence Diagram UML yang lebih jelas (lihat 11.1.1 di atas).

### 11.2 Alasan Teknis Pemilihan Teknologi

#### 11.2.1 React + TypeScript

**Alasan:**
- ✅ Component reusability (DRY principle)
- ✅ Type safety mencegah runtime errors
- ✅ Rich ecosystem (40,000+ packages di npm)
- ✅ Virtual DOM untuk performance
- ✅ Developer experience (hot reload, autocomplete, refactoring)

**Alternative yang Dipertimbangkan:**
- Vue.js: Lebih simple, tapi ecosystem lebih kecil
- Angular: Terlalu heavy untuk project ini
- Vanilla JS: Tidak scalable, banyak boilerplate

#### 11.2.2 Supabase (PostgreSQL + Auth + Storage)

**Alasan:**
- ✅ Managed infrastructure (no DevOps overhead)
- ✅ Row Level Security (security di database layer)
- ✅ Auto-generated TypeScript types dari schema
- ✅ Real-time subscriptions (optional untuk future features)
- ✅ Open source (dapat self-host jika perlu)

**Alternative yang Dipertimbangkan:**
- Firebase: Vendor lock-in, NoSQL kurang cocok untuk relational data
- MongoDB + Express: Perlu setup server sendiri, no built-in auth
- Laravel + MySQL: Perlu backend developer terpisah

#### 11.2.3 Tailwind CSS + shadcn/ui

**Alasan:**
- ✅ Utility-first approach (rapid prototyping)
- ✅ Responsive design out of the box
- ✅ Consistent design system via semantic tokens
- ✅ shadcn/ui: Unstyled components yang customizable
- ✅ Dark mode support built-in

**Alternative yang Dipertimbangkan:**
- Material-UI: Terlalu opinionated, hard to customize
- Bootstrap: Design terlihat generic
- Custom CSS: Terlalu banyak boilerplate

#### 11.2.4 Edge Functions (Deno)

**Alasan:**
- ✅ TypeScript native (no transpilation)
- ✅ Secure by default (no file/network access tanpa permission)
- ✅ Serverless (auto-scaling, pay per use)
- ✅ Fast cold start (<100ms)

**Alternative yang Dipertimbangkan:**
- Node.js Lambda: Perlu setup AWS, cold start lebih lambat
- Express API: Perlu manage server 24/7

### 11.3 Kesimpulan

UML dipilih sebagai tool perancangan karena:
1. **Ekspresif** untuk sistem berbasis komponen React dan serverless
2. **Standar** yang luas diterima di industri
3. **Fleksibel** untuk merepresentasikan berbagai aspek sistem (use cases, processes, interactions, data)
4. **Lebih sesuai** dibanding DFD untuk arsitektur web modern

Teknologi dipilih berdasarkan:
1. **Development Speed**: React + TypeScript + Tailwind = rapid development
2. **Security**: Supabase RLS + JWT = defense in depth
3. **Scalability**: Serverless architecture = auto-scaling
4. **Cost-Effectiveness**: Pay per use, no server management
5. **Developer Experience**: Type safety, hot reload, rich tooling

Kombinasi UML + modern tech stack ini menghasilkan sistem yang **secure, scalable, maintainable, dan sesuai dengan best practices industry standard** untuk tugas akhir.

---

## 12. Rancangan Data

### 12.1 Gambaran Umum Desain Database

Database Sistem Analisis Performa Konten Digital dirancang menggunakan PostgreSQL dengan prinsip normalisasi (hingga 3NF) untuk memastikan integritas data, mengurangi redundansi, dan meningkatkan efisiensi query. Database terdiri dari **16 tabel utama** yang dikelompokkan menjadi beberapa domain:

**A. Domain Autentikasi dan Profil**
- `profil`: Menyimpan informasi pengguna, role (admin/user), preferensi dashboard, dan foto profil
- `anggota_proyek`: Menyimpan keanggotaan project dengan role spesifik (owner/editor/viewer)

**B. Domain Manajemen Proyek dan Dataset**
- `proyek`: Menyimpan informasi project (nama, deskripsi, pemilik)
- `dataset`: Menyimpan metadata dataset (nama, sumber, jumlah baris, status aktif)
- `log_impor`: Menyimpan riwayat proses import (status, error messages, missing columns)

**C. Domain Master Data**
- `platform`: Menyimpan master data platform sosial media (Instagram, TikTok, Twitter, dll)
- `jenis_konten`: Menyimpan master data tipe konten (Video, Image, Carousel, Reels, dll)
- `kampanye`: Menyimpan data campaign marketing dengan tanggal periode

**D. Domain Postingan dan Metrik**
- `postingan`: Menyimpan data postingan dengan semua metrik engagement (likes, comments, shares, reach, dll)

**E. Domain Analisis Kompetitor**
- `kompetitor`: Menyimpan informasi kompetitor (nama, platform, handle, deskripsi)
- `data_kompetitor`: Menyimpan data metrik kompetitor per tanggal

**F. Domain Perencanaan dan Target**
- `target_kpi`: Menyimpan target KPI per periode (mingguan/bulanan)

**G. Domain User Experience**
- `catatan`: Menyimpan notes user dengan scope (global/post/week)
- `filter_tersimpan`: Menyimpan saved filters per halaman
- `riwayat_export`: Menyimpan log export (Excel/PDF)

**H. Domain Bantuan (Help System)**
- `pertanyaan`: Menyimpan Q&A antara user dan admin, termasuk rating dan feedback

### 12.2 Entity Relationship Diagram (ERD)

`<ERD / Class Diagram Basis Data>`

**Deskripsi Narasi ERD:**

ERD sistem ini menggambarkan relasi antar entitas dengan kardinalitas sebagai berikut:

**Relasi One-to-Many:**

1. **profil → proyek** (1:N)
   - Satu user dapat memiliki banyak project
   - FK: `proyek.id_pemilik` → `profil.id`

2. **proyek → dataset** (1:N)
   - Satu project dapat memiliki banyak dataset
   - FK: `dataset.id_proyek` → `proyek.id`

3. **dataset → postingan** (1:N)
   - Satu dataset dapat memiliki banyak postingan
   - FK: `postingan.id_dataset` → `dataset.id`

4. **dataset → log_impor** (1:N)
   - Satu dataset dapat memiliki banyak log import
   - FK: `log_impor.id_dataset` → `dataset.id`

5. **platform → postingan** (1:N)
   - Satu platform dapat memiliki banyak postingan
   - FK: `postingan.id_platform` → `platform.id`

6. **jenis_konten → postingan** (1:N)
   - Satu jenis konten dapat memiliki banyak postingan
   - FK: `postingan.id_jenis_konten` → `jenis_konten.id`

7. **kampanye → postingan** (1:N, Optional)
   - Satu campaign dapat memiliki banyak postingan
   - Postingan bisa tidak terkait campaign (nullable)
   - FK: `postingan.id_kampanye` → `kampanye.id`

8. **proyek → kampanye** (1:N)
   - Satu project dapat memiliki banyak campaign
   - FK: `kampanye.id_proyek` → `proyek.id`

9. **proyek → kompetitor** (1:N)
   - Satu project dapat tracking banyak kompetitor
   - FK: `kompetitor.id_proyek` → `proyek.id`

10. **kompetitor → data_kompetitor** (1:N)
    - Satu kompetitor dapat memiliki banyak data metrik (time series)
    - FK: `data_kompetitor.id_kompetitor` → `kompetitor.id`

11. **proyek → target_kpi** (1:N)
    - Satu project dapat memiliki banyak target KPI (per periode)
    - FK: `target_kpi.id_proyek` → `proyek.id`

12. **proyek → catatan** (1:N)
    - Satu project dapat memiliki banyak notes
    - FK: `catatan.id_proyek` → `proyek.id`

13. **profil → catatan** (1:N)
    - Satu user dapat membuat banyak notes
    - FK: `catatan.id_pengguna` → `profil.id`

14. **profil → filter_tersimpan** (1:N)
    - Satu user dapat menyimpan banyak filter
    - FK: `filter_tersimpan.id_pengguna` → `profil.id`

15. **proyek → filter_tersimpan** (1:N)
    - Satu project dapat memiliki banyak saved filters
    - FK: `filter_tersimpan.id_proyek` → `proyek.id`

16. **profil → pertanyaan** (1:N)
    - Satu user dapat mengajukan banyak pertanyaan
    - FK: `pertanyaan.id_pengguna` → `profil.id`

17. **proyek → pertanyaan** (1:N)
    - Satu project dapat memiliki banyak pertanyaan
    - FK: `pertanyaan.id_proyek` → `proyek.id`

18. **proyek → anggota_proyek** (1:N)
    - Satu project dapat memiliki banyak anggota
    - FK: `anggota_proyek.id_proyek` → `proyek.id`

19. **profil → anggota_proyek** (1:N)
    - Satu user dapat menjadi anggota banyak project
    - FK: `anggota_proyek.id_pengguna` → `profil.id`

20. **proyek → riwayat_export** (1:N)
    - Satu project dapat memiliki banyak riwayat export
    - FK: `riwayat_export.id_proyek` → `proyek.id`

21. **profil → riwayat_export** (1:N)
    - Satu user dapat melakukan banyak export
    - FK: `riwayat_export.id_pengguna` → `profil.id`

**Relasi Many-to-Many (via Junction Table):**

- **profil ↔ proyek** melalui `anggota_proyek`
  - Satu user bisa menjadi anggota banyak project (sebagai editor/viewer)
  - Satu project bisa memiliki banyak anggota dengan role berbeda

**Catatan Penting:**

1. **Cascade Delete**: 
   - Jika project dihapus → semua dataset, postingan, campaign, notes, dll terkait ikut terhapus
   - Jika dataset dihapus → semua postingan dan log import terkait ikut terhapus
   - Jika user dihapus → semua project miliknya ikut terhapus

2. **Nullable Foreign Keys**:
   - `postingan.id_kampanye` → nullable (posting tidak harus terkait campaign)
   - `catatan.id_dataset` → nullable (notes bisa global, tidak harus per dataset)
   - `catatan.kunci_scope` → nullable (scope key opsional tergantung jenis_scope)

3. **Unique Constraints**:
   - `platform.kode_platform` → unique (misal: 'instagram', 'tiktok')
   - `jenis_konten.kode_jenis_konten` → unique (misal: 'video', 'image')
   - `anggota_proyek(id_pengguna, id_proyek)` → unique (user tidak bisa dobel join ke 1 project)
   - `profil.id` → references `auth.users.id` (one-to-one dengan tabel auth)

4. **Composite Keys**:
   - Tidak ada composite primary keys (semua tabel menggunakan UUID sebagai PK tunggal)

### 12.3 Class Diagram Database

`<Class Diagram: Database Schema dengan Atribut dan Metode RLS>`

**Deskripsi Narasi Class Diagram:**

Class diagram database menggambarkan setiap tabel sebagai "class" dengan:

**Atribut (Kolom):**
- Primary Key (PK) ditandai dengan 🔑
- Foreign Key (FK) ditandai dengan 🔗
- Nullable field ditandai dengan `?`
- Enum types ditandai dengan `<<enum>>`
- Computed fields ditandai dengan `{derived}`

**Contoh Class: `postingan`**

```
┌─────────────────────────────────────┐
│           postingan                 │
├─────────────────────────────────────┤
│ 🔑 id: UUID                         │
│ 🔗 id_proyek: UUID                  │
│ 🔗 id_dataset: UUID                 │
│ 🔗 id_platform: UUID                │
│ 🔗 id_jenis_konten: UUID            │
│ 🔗 id_kampanye?: UUID               │
│    kode_postingan: TEXT             │
│    waktu_diposting: TIMESTAMPTZ     │
│    teks_caption?: TEXT              │
│    jumlah_likes: INTEGER            │
│    jumlah_komentar: INTEGER         │
│    jumlah_shares: INTEGER           │
│    jumlah_saved: INTEGER            │
│    jumlah_views: INTEGER            │
│    jumlah_reach: INTEGER            │
│    jumlah_followers: INTEGER        │
│    total_engagement?: INTEGER {derived} │
│    engagement_rate_persen?: NUMERIC {derived} │
│    created_at: TIMESTAMPTZ          │
├─────────────────────────────────────┤
│ + calculateEngagement()             │
│ + calculateER()                     │
│ + checkAccess(user_id): BOOLEAN     │
└─────────────────────────────────────┘
```

**"Metode" RLS (Represented as Class Methods):**

Setiap tabel memiliki "metode" berupa RLS policies yang bekerja seperti access control methods:

1. **has_project_access(project_id)**: Mengecek apakah user adalah owner atau member project
2. **is_admin()**: Mengecek apakah user memiliki role admin
3. **auth.uid()**: Mendapatkan user ID yang sedang login

**Inheritance-like Relationship:**

Semua tabel yang terkait project "mewarisi" aturan akses dari tabel `proyek`:
- Jika user tidak punya akses ke project → tidak bisa CRUD data apapun yang terkait project tersebut

**Abstraction:**

- `profil` adalah "abstract representation" dari `auth.users` (tabel auth tidak langsung diakses)
- `postingan` menggunakan foreign keys sebagai "interfaces" untuk mengakses data master (platform, jenis_konten)

### 12.4 Desain Database Berdasarkan Prinsip Normalisasi

**First Normal Form (1NF) - Atomicity:**
✅ Semua tabel sudah 1NF karena:
- Tidak ada repeating groups (seperti kolom `like1`, `like2`, dst)
- Semua nilai kolom atomic (tidak ada array di kolom, kecuali yang memang didesain sebagai JSONB)

**Second Normal Form (2NF) - No Partial Dependencies:**
✅ Semua tabel sudah 2NF karena:
- Tidak ada composite primary keys yang menyebabkan partial dependency
- Semua non-key attributes bergantung penuh pada PK (UUID)

**Third Normal Form (3NF) - No Transitive Dependencies:**
✅ Semua tabel sudah 3NF karena:
- Data master (platform, jenis_konten) dipisah ke tabel terpisah (tidak disimpan langsung di `postingan`)
- Tidak ada derived values disimpan redundan (engagement_rate dihitung on-the-fly atau via computed column)

**Denormalization untuk Performance:**

Beberapa field didenormalisasi secara sengaja untuk query performance:

1. `postingan.total_engagement` dan `postingan.engagement_rate_persen`:
   - Bisa dihitung dari likes + comments + shares + saved
   - Disimpan untuk menghindari re-calculate di setiap query
   - Trade-off: Storage vs Query Speed

2. `postingan.jumlah_followers`:
   - Sebenarnya followers adalah data "global" saat posting
   - Disimpan di level posting untuk historical tracking (followers bisa berubah)

3. `riwayat_export.filter_export` (JSONB):
   - Menyimpan snapshot filter yang digunakan saat export
   - Denormalisasi sengaja agar history tetap valid meski filter_tersimpan berubah

### 12.5 Penggunaan Enum Types

Sistem menggunakan 5 **Enum Types** untuk memastikan data integrity:

**1. `app_role`**
```sql
CREATE TYPE app_role AS ENUM ('admin', 'user');
```
- Digunakan di: `profil.peran`
- Membatasi role hanya 2 nilai valid

**2. `project_role`**
```sql
CREATE TYPE project_role AS ENUM ('owner', 'editor', 'viewer');
```
- Digunakan di: `anggota_proyek.peran_dalam_proyek`
- Membatasi role kolaborasi project

**3. `source_type`**
```sql
CREATE TYPE source_type AS ENUM ('upload_csv', 'google_sheet', 'sample');
```
- Digunakan di: `dataset.jenis_sumber_dataset`
- Membatasi jenis sumber data

**4. `import_status`**
```sql
CREATE TYPE import_status AS ENUM ('pending', 'success', 'failed');
```
- Digunakan di: `log_impor.status_impor`
- Membatasi status proses import

**5. `period_type`**
```sql
CREATE TYPE period_type AS ENUM ('weekly', 'monthly');
```
- Digunakan di: `target_kpi.jenis_periode`
- Membatasi tipe periode target

**6. `scope_type`**
```sql
CREATE TYPE scope_type AS ENUM ('post', 'week', 'global');
```
- Digunakan di: `catatan.jenis_scope`
- Membatasi scope catatan user

### 12.6 Database Indexes

**Automatic Indexes (dari Primary Keys dan Foreign Keys):**
- Semua primary keys (`id`) otomatis terindex (UUID)
- Semua foreign keys otomatis terindex untuk join performance

**Custom Indexes (Recommended untuk Production):**

```sql
-- Index untuk query filtering berdasarkan waktu posting
CREATE INDEX idx_postingan_waktu ON postingan(waktu_diposting);

-- Index untuk query filtering berdasarkan platform
CREATE INDEX idx_postingan_platform ON postingan(id_platform);

-- Index untuk query sorting by ER
CREATE INDEX idx_postingan_er ON postingan(engagement_rate_persen DESC NULLS LAST);

-- Index untuk full-text search pada caption
CREATE INDEX idx_postingan_caption_fts ON postingan 
USING gin(to_tsvector('indonesian', teks_caption));

-- Index untuk query pertanyaan berdasarkan status
CREATE INDEX idx_pertanyaan_status ON pertanyaan(status, created_at DESC);

-- Composite index untuk query dataset aktif per project
CREATE INDEX idx_dataset_active ON dataset(id_proyek, dataset_aktif) 
WHERE dataset_aktif = true;
```

### 12.7 Database Functions

Sistem menggunakan **4 custom functions** untuk RLS dan business logic:

**1. `has_project_access(project_id UUID)`**
```sql
CREATE OR REPLACE FUNCTION has_project_access(project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM proyek WHERE id = project_id AND id_pemilik = auth.uid()
    UNION
    SELECT 1 FROM anggota_proyek WHERE id_proyek = project_id AND id_pengguna = auth.uid()
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```
- Mengecek apakah user adalah owner atau member project
- Digunakan oleh hampir semua RLS policies

**2. `is_admin()`**
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profil WHERE id = auth.uid() AND peran = 'admin'
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```
- Mengecek apakah user adalah admin
- Digunakan untuk master data dan Q&A management

**3. `get_user_display_name(user_id UUID)`**
```sql
CREATE OR REPLACE FUNCTION get_user_display_name(user_id UUID)
RETURNS TEXT AS $$
  SELECT COALESCE(nama_lengkap, 'Unknown') FROM profil WHERE id = user_id LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```
- Mendapatkan nama user untuk ditampilkan
- Digunakan di email notifications

**4. `handle_new_user()`**
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profil (id, nama_lengkap, peran)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
- Trigger function untuk auto-create profile saat signup
- Memastikan setiap auth.users punya record di profil

**5. `notify_admin_new_question()`**
```sql
-- Trigger function untuk kirim email ke admin saat ada pertanyaan baru
```
- Memanggil edge function `notify-admin-new-question`
- Digunakan sebagai after insert trigger di tabel `pertanyaan`

**6. `notify_user_question_answered()`**
```sql
-- Trigger function untuk kirim email ke user saat pertanyaan dijawab
```
- Memanggil edge function `notify-user-question-answered`
- Digunakan sebagai after update trigger di tabel `pertanyaan`

---

## 13. Deskripsi Data

### 13.1 Transformasi Domain ke Struktur Data

Sistem Analisis Performa Konten Digital menerjemahkan domain bisnis "analisis konten sosial media" ke dalam struktur database relational dengan hierarki sebagai berikut:

**Hierarki Data Utama:**

```
User (Profil)
  └── Project (Proyek)
        ├── Dataset
        │     ├── Postingan (dengan metrik engagement)
        │     └── Log Impor
        ├── Kampanye
        ├── Target KPI
        ├── Kompetitor
        │     └── Data Kompetitor (time series)
        ├── Catatan (Notes)
        ├── Filter Tersimpan
        └── Pertanyaan (Q&A)
```

**Transformasi Konsep Bisnis ke Data:**

**1. Konsep "Content Performance Analysis" →**

Ditransformasi menjadi:
- Tabel `postingan` dengan kolom metrik (likes, comments, shares, reach, views, saved)
- Computed fields: `total_engagement`, `engagement_rate_persen`
- Relasi ke `platform` dan `jenis_konten` untuk segmentasi analisis
- Relasi ke `kampanye` untuk campaign performance analysis

**2. Konsep "Multi-Project Management" →**

Ditransformasi menjadi:
- Tabel `proyek` sebagai container utama
- Tabel `anggota_proyek` untuk kolaborasi team
- Semua data (dataset, postingan, notes, dll) terkait ke `id_proyek`
- RLS policies menggunakan `has_project_access()` function

**3. Konsep "Dataset Comparison" →**

Ditransformasi menjadi:
- Tabel `dataset` dengan flag `dataset_aktif`
- Satu project bisa punya banyak dataset (misal: Q1 2024, Q2 2024)
- User bisa switch active dataset untuk membandingkan performa antar periode

**4. Konsep "Historical Tracking" →**

Ditransformasi menjadi:
- `postingan.waktu_diposting` untuk time-series analysis
- `postingan.jumlah_followers` disimpan saat posting (snapshot followers saat itu)
- `log_impor` untuk audit trail proses import
- `riwayat_export` untuk tracking export history

**5. Konsep "Master Data Management" →**

Ditransformasi menjadi:
- Tabel `platform` dan `jenis_konten` sebagai lookup tables
- Admin bisa CRUD master data
- User hanya bisa read (via RLS policies)
- Flag `platform_aktif` dan `jenis_konten_aktif` untuk soft delete

**6. Konsep "AI-Assisted Content Creation" →**

Ditransformasi menjadi:
- Tidak ada tabel khusus (AI caption tidak disimpan di database)
- Hasil AI caption langsung di-copy user ke clipboard
- Jika perlu save history, bisa tambah tabel `riwayat_ai_caption` di future

**7. Konsep "Help System / Q&A" →**

Ditransformasi menjadi:
- Tabel `pertanyaan` dengan status ('menunggu', 'dijawab')
- User bisa create/update/delete own pending questions
- Admin bisa answer all questions
- User bisa rate answered questions (1-5 stars + comment)
- Trigger functions untuk email notifications

**8. Konsep "User Preferences & Saved State" →**

Ditransformasi menjadi:
- `profil.preferensi_dashboard` (JSONB) untuk layout preferences
- `filter_tersimpan` untuk saved filters per page
- `catatan` untuk user notes dengan scope (global/post/week)

### 13.2 Jenis Penyimpanan Data

Database sistem ini menggunakan beberapa jenis penyimpanan:

**A. Tabel Transaksional (Transaction Tables)**

Tabel yang menyimpan data operasional dan berubah frequently:

1. **postingan**: Data inti sistem, menyimpan semua posting dengan metrik
2. **log_impor**: Log setiap proses import (success/failed)
3. **riwayat_export**: Log setiap export yang dilakukan user
4. **pertanyaan**: Q&A antara user dan admin
5. **catatan**: Notes yang dibuat user

**Karakteristik:**
- High write frequency
- Time-stamped (created_at, updated_at)
- Bisa jadi sangat besar (thousands of rows)

**B. Tabel Referensial (Reference Tables / Master Data)**

Tabel yang menyimpan data master, jarang berubah:

1. **platform**: Master data platform sosial media
2. **jenis_konten**: Master data tipe konten
3. **profil**: Data user (relatif stabil)

**Karakteristik:**
- Low write frequency
- Small size (dozens to hundreds of rows)
- Digunakan untuk lookup/join

**C. Tabel Konfigurasi (Configuration Tables)**

Tabel yang menyimpan konfigurasi user/project:

1. **proyek**: Konfigurasi project
2. **dataset**: Konfigurasi dataset per project
3. **kampanye**: Konfigurasi campaign
4. **target_kpi**: Konfigurasi target per periode
5. **filter_tersimpan**: Saved filters user
6. **kompetitor**: Konfigurasi competitor tracking

**Karakteristik:**
- Medium write frequency
- User-specific atau project-specific
- Ukuran moderate (hundreds to thousands of rows)

**D. Tabel Relasi (Junction Tables)**

Tabel many-to-many:

1. **anggota_proyek**: Relasi user ↔ project

**Karakteristik:**
- Simple structure (mostly just FKs)
- Medium write frequency (saat invite/remove member)

**E. Tabel Log/Audit (Audit Tables)**

Tabel khusus untuk logging:

1. **log_impor**: Audit trail import process
2. **riwayat_export**: Audit trail export activity

**Karakteristik:**
- Append-only (jarang di-update/delete)
- Untuk troubleshooting dan compliance
- Bisa di-archive jika sudah lama

### 13.3 Data Lifecycle

**1. User Registration Flow:**
```
auth.users (Supabase Auth)
    ↓ (trigger: on_auth_user_created)
profil (auto-created via handle_new_user())
```

**2. Project Creation Flow:**
```
User creates project
    ↓
proyek (owner = user_id)
    ↓
anggota_proyek (optional, jika invite members)
```

**3. Dataset Import Flow:**
```
User upload CSV
    ↓
dataset (metadata created, dataset_aktif = true)
    ↓
log_impor (status = 'pending')
    ↓
Validation process
    ↓
postingan (bulk insert data)
    ↓
log_impor (status = 'success' atau 'failed' + error messages)
    ↓
dataset.jumlah_baris_dataset (updated)
```

**4. Q&A Flow:**
```
User submit question
    ↓
pertanyaan (status = 'menunggu')
    ↓ (trigger: notify_admin_new_question)
Email sent to admin
    ↓
Admin answer question
    ↓
pertanyaan (status = 'dijawab', jawaban filled)
    ↓ (trigger: notify_user_question_answered)
Email sent to user
    ↓
User rate answer
    ↓
pertanyaan (rating, komentar_rating filled)
```

**5. Data Deletion Flow (Cascade):**
```
User deletes project
    ↓ (ON DELETE CASCADE)
All related data deleted:
  - dataset
  - postingan (via dataset cascade)
  - log_impor (via dataset cascade)
  - kampanye
  - target_kpi
  - kompetitor
  - data_kompetitor (via kompetitor cascade)
  - catatan
  - filter_tersimpan
  - riwayat_export
  - pertanyaan
  - anggota_proyek
```

### 13.4 Data Validation Rules

**At Database Level:**

1. **NOT NULL Constraints**:
   - Primary keys (all `id` columns)
   - Foreign keys yang wajib (misal `postingan.id_dataset`)
   - Business-critical fields (misal `proyek.nama_proyek`, `postingan.waktu_diposting`)

2. **CHECK Constraints** (Recommended):
   ```sql
   -- Engagement metrics tidak boleh negatif
   ALTER TABLE postingan ADD CONSTRAINT check_likes_positive 
     CHECK (jumlah_likes >= 0);
   
   -- Engagement rate antara 0-100%
   ALTER TABLE postingan ADD CONSTRAINT check_er_range 
     CHECK (engagement_rate_persen >= 0 AND engagement_rate_persen <= 100);
   
   -- Rating antara 1-5
   ALTER TABLE pertanyaan ADD CONSTRAINT check_rating_range 
     CHECK (rating >= 1 AND rating <= 5);
   ```

3. **UNIQUE Constraints**:
   - `platform.kode_platform`
   - `jenis_konten.kode_jenis_konten`
   - `postingan(id_dataset, kode_postingan)` → prevent duplicate post code in same dataset

4. **ENUM Constraints**:
   - Semua kolom yang menggunakan custom enum types otomatis ter-validasi

**At Application Level (Frontend):**

1. **Required Fields Validation**: Semua field NOT NULL di-enforce di form
2. **Length Validation**: Max length untuk text fields
3. **Date Range Validation**: `tanggal_selesai >= tanggal_mulai`
4. **File Validation**: CSV format, max file size 10MB
5. **Numeric Range Validation**: Followers, likes, dll harus positive integers

**At Application Level (Backend - Edge Functions):**

1. **CSV Schema Validation**: Validasi kolom wajib ada di CSV
2. **Data Type Validation**: Pastikan `waktu_diposting` valid timestamp, metrics valid integers
3. **Business Logic Validation**: Misal tidak boleh set 2 dataset aktif di 1 project

---

## 14. Kamus Data

### 14.1 Penjelasan Kamus Data

Kamus data berikut menjelaskan field-field penting dalam sistem, dikelompokkan per tabel. Untuk setiap field dijelaskan:
- **Nama Field**: Nama kolom di database
- **Tipe Data Logis**: Tipe data secara konseptual (bukan syntax PostgreSQL spesifik)
- **Fungsi/Keterangan**: Apa yang disimpan dan untuk apa
- **Kapan Diisi**: Timing pengisian data
- **Nullable**: Apakah boleh kosong
- **Contoh Nilai**: Sample data

### 14.2 Tabel: profil

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key, sama dengan auth.users.id | Saat signup (auto) | No | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |
| nama_lengkap | TEXT | Nama lengkap user | Saat signup (dari form atau Google OAuth) | Yes | `"Maarif Alawi"` |
| peran | ENUM(app_role) | Role user dalam sistem ('admin' atau 'user') | Saat signup (default 'user') | No | `'user'` |
| foto_profil_url | TEXT | URL foto profil di Supabase Storage | Saat upload foto profil (optional) | Yes | `"avatars/user123/profile.jpg"` |
| bahasa | VARCHAR | Preferensi bahasa UI ('id' atau 'en') | Saat signup (default 'id') | Yes | `'id'` |
| preferensi_dashboard | JSONB | Konfigurasi layout dashboard | Saat user customize dashboard | Yes | `{"layout": "grid", "widgets": ["kpi", "trends"]}` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu registrasi | Saat signup (auto) | No | `2024-01-15 10:30:00+07` |

### 14.3 Tabel: proyek

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat create project (auto) | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| nama_proyek | TEXT | Nama project | Saat create project | No | `"Brand X Q1 2024"` |
| deskripsi_proyek | TEXT | Deskripsi project | Saat create project | Yes | `"Campaign brand X untuk kuartal pertama 2024"` |
| id_pemilik | UUID | FK ke profil.id, owner project | Saat create project (auth.uid()) | No | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan project | Saat create project (auto) | No | `2024-01-15 11:00:00+07` |

### 14.4 Tabel: dataset

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat create dataset (auto) | No | `c2ggdd99-9e2d-6hh0-dd8f-8dd1df602c33` |
| id_proyek | UUID | FK ke proyek.id | Saat create dataset | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| nama_dataset | TEXT | Nama dataset | Saat create dataset | No | `"Instagram Jan-Mar 2024"` |
| jenis_sumber_dataset | ENUM(source_type) | Sumber data ('upload_csv', 'google_sheet', 'sample') | Saat create dataset | No | `'upload_csv'` |
| lokasi_berkas_dataset | TEXT | Path file CSV di Supabase Storage (jika upload) | Saat upload CSV selesai | Yes | `"datasets/proj123/data.csv"` |
| jumlah_baris_dataset | INTEGER | Jumlah postingan dalam dataset | Setelah import selesai | No | `245` |
| dataset_aktif | BOOLEAN | Apakah dataset ini yang sedang aktif ditampilkan | Saat create (true) atau switch dataset | No | `true` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan dataset | Saat create dataset (auto) | No | `2024-01-15 14:00:00+07` |

### 14.5 Tabel: postingan

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat import data (auto) | No | `d3hhee00-0f3e-7ii1-ee9g-9ee2eg713d44` |
| id_proyek | UUID | FK ke proyek.id | Saat import data | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| id_dataset | UUID | FK ke dataset.id | Saat import data | No | `c2ggdd99-9e2d-6hh0-dd8f-8dd1df602c33` |
| id_platform | UUID | FK ke platform.id | Saat import data (mapping dari nama platform di CSV) | No | `<uuid platform Instagram>` |
| id_jenis_konten | UUID | FK ke jenis_konten.id | Saat import data (mapping dari nama jenis konten di CSV) | No | `<uuid jenis konten Video>` |
| id_kampanye | UUID | FK ke kampanye.id (optional) | Saat import data jika posting terkait campaign | Yes | `<uuid kampanye>` atau `NULL` |
| kode_postingan | TEXT | Kode unik posting (misal post ID dari platform) | Saat import data | No | `"POST20240115001"` |
| waktu_diposting | TIMESTAMP WITH TIME ZONE | Waktu posting dipublikasikan | Saat import data | No | `2024-01-15 18:30:00+07` |
| teks_caption | TEXT | Caption/teks posting | Saat import data | Yes | `"Check out our new product! #promo"` |
| jumlah_likes | INTEGER | Jumlah likes | Saat import data | No | `1250` |
| jumlah_komentar | INTEGER | Jumlah komentar | Saat import data | No | `87` |
| jumlah_shares | INTEGER | Jumlah shares/repost | Saat import data | No | `45` |
| jumlah_saved | INTEGER | Jumlah saved/bookmark | Saat import data | No | `120` |
| jumlah_views | INTEGER | Jumlah views (untuk video) | Saat import data | No | `15300` |
| jumlah_reach | INTEGER | Jumlah reach (unique users reached) | Saat import data | No | `12400` |
| jumlah_followers | INTEGER | Jumlah followers saat posting | Saat import data (snapshot followers) | No | `10500` |
| total_engagement | INTEGER | Total engagement (likes+comments+shares+saved) | Dihitung otomatis atau saat import | Yes | `1502` |
| engagement_rate_persen | NUMERIC(5,2) | ER dalam persen (total_engagement / followers * 100) | Dihitung otomatis atau saat import | Yes | `14.31` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu data diimport ke sistem | Saat import data (auto) | No | `2024-01-20 09:00:00+07` |

### 14.6 Tabel: platform

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat admin create platform (auto) | No | `e4iiff11-1g4f-8jj2-ff0h-0ff3fh824e55` |
| kode_platform | TEXT | Kode unik platform (lowercase, no space) | Saat admin create platform | No | `"instagram"` |
| nama_platform | TEXT | Nama display platform | Saat admin create platform | No | `"Instagram"` |
| warna_platform | TEXT | Warna hex untuk visualisasi di chart | Saat admin create platform (default '#000000') | No | `"#E4405F"` |
| platform_aktif | BOOLEAN | Status aktif (untuk soft delete) | Saat admin create platform (default true) | No | `true` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan | Saat admin create platform (auto) | No | `2024-01-10 08:00:00+07` |

### 14.7 Tabel: jenis_konten

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat admin create jenis konten (auto) | No | `f5jjgg22-2h5g-9kk3-gg1i-1gg4gi935f66` |
| kode_jenis_konten | TEXT | Kode unik jenis konten (lowercase, no space) | Saat admin create jenis konten | No | `"video"` |
| nama_jenis_konten | TEXT | Nama display jenis konten | Saat admin create jenis konten | No | `"Video"` |
| jenis_konten_aktif | BOOLEAN | Status aktif (untuk soft delete) | Saat admin create jenis konten (default true) | No | `true` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan | Saat admin create jenis konten (auto) | No | `2024-01-10 08:15:00+07` |

### 14.8 Tabel: kampanye

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat create campaign (auto) | No | `g6kkhh33-3i6h-0ll4-hh2j-2hh5hj046g77` |
| id_proyek | UUID | FK ke proyek.id | Saat create campaign | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| nama_kampanye | TEXT | Nama campaign | Saat create campaign | No | `"Flash Sale Ramadan"` |
| tanggal_mulai_kampanye | DATE | Tanggal mulai campaign | Saat create campaign | Yes | `2024-03-01` |
| tanggal_selesai_kampanye | DATE | Tanggal selesai campaign | Saat create campaign | Yes | `2024-03-31` |
| catatan_kampanye | TEXT | Notes tambahan tentang campaign | Saat create/update campaign | Yes | `"Target: increase followers 20%"` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan | Saat create campaign (auto) | No | `2024-02-25 10:00:00+07` |

### 14.9 Tabel: pertanyaan

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user submit question (auto) | No | `h7llii44-4j7i-1mm5-ii3k-3ii6ik157h88` |
| id_pengguna | UUID | FK ke profil.id (penanya) | Saat user submit question (auth.uid()) | No | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |
| id_proyek | UUID | FK ke proyek.id | Saat user submit question | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| judul_pertanyaan | TEXT | Judul/subject pertanyaan | Saat user submit question | No | `"Bagaimana cara import dari Google Sheets?"` |
| isi_pertanyaan | TEXT | Isi detail pertanyaan | Saat user submit question | No | `"Saya sudah coba connect tapi error..."` |
| status | TEXT | Status pertanyaan ('menunggu' atau 'dijawab') | Saat user submit question (default 'menunggu') | No | `'menunggu'` |
| jawaban | TEXT | Jawaban dari admin | Saat admin answer question | Yes | `"Untuk connect Google Sheets, ikuti langkah..."` |
| dijawab_oleh | UUID | FK ke profil.id (admin yang jawab) | Saat admin answer question | Yes | `<uuid admin>` |
| rating | INTEGER | Rating jawaban (1-5 stars) | Saat user rate answer | Yes | `5` |
| komentar_rating | TEXT | Komentar tambahan untuk rating | Saat user rate answer (optional) | Yes | `"Sangat membantu, thanks!"` |
| rating_at | TIMESTAMP WITH TIME ZONE | Waktu user memberikan rating | Saat user rate answer (auto) | Yes | `2024-01-16 15:00:00+07` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pertanyaan dibuat | Saat user submit question (auto) | No | `2024-01-16 09:00:00+07` |
| updated_at | TIMESTAMP WITH TIME ZONE | Waktu terakhir diupdate | Saat create/update question (auto) | No | `2024-01-16 10:00:00+07` |

### 14.10 Tabel: catatan

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user create note (auto) | No | `i8mmjj55-5k8j-2nn6-jj4l-4jj7jl268i99` |
| id_pengguna | UUID | FK ke profil.id | Saat user create note (auth.uid()) | No | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |
| id_proyek | UUID | FK ke proyek.id | Saat user create note | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| id_dataset | UUID | FK ke dataset.id (optional) | Saat user create note (jika terkait dataset tertentu) | Yes | `c2ggdd99-9e2d-6hh0-dd8f-8dd1df602c33` |
| jenis_scope | ENUM(scope_type) | Scope catatan ('global', 'post', 'week') | Saat user create note | No | `'post'` |
| kunci_scope | TEXT | Identifier scope (misal post_id atau week_date) | Saat user create note (jika scope bukan 'global') | Yes | `"POST20240115001"` |
| isi_catatan | TEXT | Isi catatan | Saat user create note | No | `"Posting ini viral karena timing pas dengan event X"` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan catatan | Saat user create note (auto) | No | `2024-01-16 11:00:00+07` |

### 14.11 Tabel: filter_tersimpan

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user save filter (auto) | No | `j9nnkk66-6l9k-3oo7-kk5m-5kk8km379j00` |
| id_pengguna | UUID | FK ke profil.id | Saat user save filter (auth.uid()) | No | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |
| id_proyek | UUID | FK ke proyek.id | Saat user save filter | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| halaman | TEXT | Nama halaman tempat filter disimpan | Saat user save filter | No | `"performa"` |
| nama_filter | TEXT | Nama yang diberikan user untuk filter | Saat user save filter | No | `"Top 10 Posts Q1"` |
| nilai_filter_json | JSONB | Snapshot nilai filter yang disimpan | Saat user save filter | No | `{"tanggal_mulai": "2024-01-01", "tanggal_akhir": "2024-03-31", "platform": ["instagram"], "sort": "er_desc", "limit": 10}` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan filter | Saat user save filter (auto) | No | `2024-01-16 13:00:00+07` |

### 14.12 Tabel: target_kpi

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user set target (auto) | No | `k0ooll77-7m0l-4pp8-ll6n-6ll9ln480k11` |
| id_proyek | UUID | FK ke proyek.id | Saat user set target | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| jenis_periode | ENUM(period_type) | Tipe periode ('weekly' atau 'monthly') | Saat user set target | No | `'monthly'` |
| tanggal_mulai_periode | DATE | Tanggal mulai periode | Saat user set target | No | `2024-01-01` |
| tanggal_selesai_periode | DATE | Tanggal akhir periode | Saat user set target | No | `2024-01-31` |
| target_total_jangkauan | NUMERIC | Target total reach untuk periode ini | Saat user set target (optional) | Yes | `500000` |
| target_rata_rata_er | NUMERIC | Target rata-rata ER (%) untuk periode ini | Saat user set target (optional) | Yes | `8.5` |
| target_jumlah_followers | NUMERIC | Target jumlah followers di akhir periode | Saat user set target (optional) | Yes | `15000` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan target | Saat user set target (auto) | No | `2024-01-01 08:00:00+07` |

### 14.13 Tabel: log_impor

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat start import (auto) | No | `l1ppmm88-8n1m-5qq9-mm7o-7mm0mo591l22` |
| id_dataset | UUID | FK ke dataset.id | Saat start import | No | `c2ggdd99-9e2d-6hh0-dd8f-8dd1df602c33` |
| status_impor | ENUM(import_status) | Status import ('pending', 'success', 'failed') | Saat start import (default 'pending') | No | `'success'` |
| jumlah_baris_tidak_valid | INTEGER | Jumlah baris yang gagal diimport | Setelah import selesai | No | `3` |
| kolom_hilang | JSONB | Array kolom yang seharusnya ada tapi tidak ada di CSV | Setelah validasi (jika ada kolom hilang) | Yes | `["jumlah_saved", "jumlah_views"]` |
| pesan | TEXT | Pesan error atau info tambahan | Setelah import selesai | Yes | `"Import berhasil. 3 baris dilewati karena tanggal invalid"` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu start import | Saat start import (auto) | No | `2024-01-20 09:00:00+07` |

### 14.14 Tabel: kompetitor

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user add competitor (auto) | No | `m2qqnn99-9o2n-6rr0-nn8p-8nn1np602m33` |
| id_proyek | UUID | FK ke proyek.id | Saat user add competitor | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| nama_kompetitor | TEXT | Nama brand kompetitor | Saat user add competitor | No | `"Competitor A"` |
| platform_kompetitor | TEXT | Platform yang di-track (misal 'Instagram') | Saat user add competitor | No | `"Instagram"` |
| handle_kompetitor | TEXT | Username/handle kompetitor di platform | Saat user add competitor (optional) | Yes | `"@competitora"` |
| deskripsi_kompetitor | TEXT | Catatan tentang kompetitor | Saat user add competitor (optional) | Yes | `"Main competitor di segment fashion"` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu pembuatan data kompetitor | Saat user add competitor (auto) | No | `2024-01-17 10:00:00+07` |

### 14.15 Tabel: data_kompetitor

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user input data (auto) | No | `n3rroo00-0p3o-7ss1-oo9q-9oo2oq713n44` |
| id_kompetitor | UUID | FK ke kompetitor.id | Saat user input data | No | `m2qqnn99-9o2n-6rr0-nn8p-8nn1np602m33` |
| tanggal_data | DATE | Tanggal data diambil/snapshot | Saat user input data | No | `2024-01-17` |
| jumlah_followers | INTEGER | Jumlah followers kompetitor saat itu | Saat user input data (default 0) | No | `125000` |
| total_posts | INTEGER | Jumlah total posts kompetitor saat itu | Saat user input data (default 0) | No | `450` |
| rata_rata_likes | NUMERIC | Rata-rata likes per post | Saat user input data (optional) | Yes | `3500.5` |
| rata_rata_comments | NUMERIC | Rata-rata comments per post | Saat user input data (optional) | Yes | `250.3` |
| rata_rata_shares | NUMERIC | Rata-rata shares per post | Saat user input data (optional) | Yes | `120.7` |
| rata_rata_reach | NUMERIC | Rata-rata reach per post | Saat user input data (optional) | Yes | `45000.2` |
| rata_rata_engagement_rate | NUMERIC | Rata-rata ER kompetitor (%) | Saat user input data (optional) | Yes | `3.2` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu data diinput ke sistem | Saat user input data (auto) | No | `2024-01-17 11:00:00+07` |

### 14.16 Tabel: anggota_proyek

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat owner invite member (auto) | No | `o4sspp11-1q4p-8tt2-pp0r-0pp3pq824o55` |
| id_proyek | UUID | FK ke proyek.id | Saat owner invite member | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| id_pengguna | UUID | FK ke profil.id (user yang diinvite) | Saat owner invite member | No | `<uuid user lain>` |
| peran_dalam_proyek | ENUM(project_role) | Role member ('owner', 'editor', 'viewer') | Saat owner invite member (default 'viewer') | No | `'editor'` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu member ditambahkan | Saat owner invite member (auto) | No | `2024-01-18 09:00:00+07` |

### 14.17 Tabel: riwayat_export

| Nama Field | Tipe Data | Fungsi/Keterangan | Kapan Diisi | Nullable | Contoh Nilai |
|------------|-----------|-------------------|-------------|----------|--------------|
| id | UUID | Primary key | Saat user export (auto) | No | `p5ttqq22-2r5q-9uu3-qq1s-1qq4qr935p66` |
| id_pengguna | UUID | FK ke profil.id | Saat user export (auth.uid()) | No | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |
| id_proyek | UUID | FK ke proyek.id | Saat user export | No | `b1ffcc88-8d1c-5fg9-cc7e-7cc0ce491b22` |
| halaman_export | TEXT | Halaman asal export | Saat user export | No | `"performa"` |
| jenis_export | TEXT | Jenis file export ('excel' atau 'pdf') | Saat user export | No | `"excel"` |
| nama_file | TEXT | Nama file yang dihasilkan | Saat user export | No | `"Performa_20240118.xlsx"` |
| filter_export | JSONB | Snapshot filter yang digunakan saat export | Saat user export (optional) | Yes | `{"tanggal_mulai": "2024-01-01", "platform": ["instagram"]}` |
| created_at | TIMESTAMP WITH TIME ZONE | Waktu export dilakukan | Saat user export (auto) | No | `2024-01-18 14:30:00+07` |

---

## 15. Rancangan Komponen

### 15.1 Gambaran Umum Komponen

Sistem Analisis Performa Konten Digital dirancang dengan arsitektur berbasis komponen React yang modular dan reusable. Komponen-komponen diorganisir berdasarkan fungsi dan tingkat abstraksi:

**A. Komponen Halaman (Page Components)** - di folder `src/pages/`
- High-level components yang merepresentasikan satu halaman/route
- Mengintegrasikan multiple sub-components
- Handle business logic dan state management

**B. Komponen Layout** - di folder `src/components/layout/`
- AppLayout: Main layout wrapper
- Breadcrumbs: Navigation breadcrumbs

**C. Komponen UI Reusable** - di folder `src/components/ui/`
- 40+ shadcn/ui components (Button, Card, Dialog, Table, dll)
- Fully customizable via Tailwind classes
- Support dark/light mode

**D. Komponen Custom/Feature-Specific** - di folder `src/components/`
- ExportButton: Export Excel/PDF functionality
- InsightCard: Auto-generated insight display
- SaveFilterDialog: Save current filters
- NotesDialog: Notes management
- EditQuestionDialog: Edit pending questions
- RatingDialog: Rate answered questions

### 15.2 Komponen Autentikasi

**15.2.1 Komponen: Authentication System**

**Input:**
- Email (string, required)
- Password (string, required, min 6 chars)
- Full Name (string, required untuk signup)

**Proses:**
1. **Sign Up Flow:**
   - User submit form signup
   - Frontend validate input (email format, password length)
   - Call `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`
   - Trigger `handle_new_user()` function → create profil
   - Auto confirm email (setting di Supabase Auth)
   - Redirect ke dashboard

2. **Sign In Flow:**
   - User submit form login
   - Frontend validate input
   - Call `supabase.auth.signInWithPassword({ email, password })`
   - Set session di localStorage
   - Redirect ke dashboard

3. **Sign Out Flow:**
   - User klik logout
   - Call `supabase.auth.signOut()`
   - Clear session
   - Redirect ke `/auth`

**Output:**
- Session object dengan JWT token
- User object dengan metadata
- Redirect ke halaman sesuai state autentikasi

**Sequence Diagram: Login dan Akses Dashboard**

`<Sequence Diagram: Login dan Akses Dashboard>`

**Deskripsi Narasi:**

```
User → Frontend: Submit login form (email, password)
Frontend → Frontend: Validate input
Frontend → Supabase Auth: signInWithPassword(email, password)
Supabase Auth → Database: Verify credentials
Database → Supabase Auth: User found + hashed password match
Supabase Auth → Frontend: Session object + JWT token
Frontend → Frontend: Store session in localStorage
Frontend → Supabase: Fetch profil WHERE id = auth.uid()
Supabase → Database: SELECT * FROM profil WHERE id = ?
Database → Supabase: Profile data (nama_lengkap, peran, dll)
Supabase → Frontend: Profile data
Frontend → Frontend: Set AuthContext state (user, session, profile)
Frontend → Frontend: Redirect to /dashboard
Frontend → Supabase: Fetch projects WHERE has_project_access(id_proyek)
Supabase → Database: RLS policy checks + SELECT
Database → Supabase: List of projects
Supabase → Frontend: Projects data
Frontend → User: Display dashboard
```

### 15.3 Komponen Manajemen Proyek & Dataset

**15.3.1 Komponen: Project Management**

**Input:**
- Nama proyek (string, required)
- Deskripsi proyek (string, optional)

**Proses:**
1. User klik "Create Project"
2. Form modal muncul
3. User input nama + deskripsi
4. Frontend validate (nama wajib diisi)
5. Call `supabase.from('proyek').insert({ nama_proyek, deskripsi_proyek, id_pemilik: auth.uid() })`
6. Refresh projects list
7. Auto-select project yang baru dibuat

**Output:**
- New project created di database
- Project card muncul di UI
- User bisa mulai create dataset

**15.3.2 Komponen: Dataset Import**

**Input:**
- File CSV (max 10MB, required)
- Atau Google Sheets URL (future feature)

**Proses:**

**Frontend Validation:**
1. User klik "Import Data"
2. File input dialog muncul
3. User pilih CSV file
4. Frontend validate:
   - File size < 10MB
   - File extension .csv
   - File readable

**Backend Processing:**
1. Parse CSV menggunakan library (misal PapaParse)
2. Validate schema:
   - Required columns ada semua: `waktu_diposting`, `platform`, `jenis_konten`, `likes`, dll
   - Tanggal valid format
   - Numeric fields valid integers
3. Create dataset record:
   ```typescript
   await supabase.from('dataset').insert({
     id_proyek: selectedProject.id,
     nama_dataset: filename,
     jenis_sumber_dataset: 'upload_csv',
     dataset_aktif: true // deactivate existing datasets first
   })
   ```
4. Create log_impor record (status: 'pending')
5. Bulk insert postingan:
   ```typescript
   const postsToInsert = validRows.map(row => ({
     id_proyek: selectedProject.id,
     id_dataset: dataset.id,
     id_platform: platformIdMap[row.platform],
     id_jenis_konten: jenisKontenIdMap[row.jenis_konten],
     kode_postingan: row.post_id,
     waktu_diposting: parseDate(row.tanggal),
     // ... other metrics
   }))
   await supabase.from('postingan').insert(postsToInsert)
   ```
6. Update dataset.jumlah_baris_dataset
7. Update log_impor (status: 'success' atau 'failed' + error messages)
8. Show toast notification

**Output:**
- Dataset created dengan metadata
- Postingan ter-import ke database
- Log import tersimpan (untuk audit trail)
- Dashboard otomatis reload dengan data baru

**Activity Diagram: Proses Import Dataset**

`<Activity Diagram: Proses Import Dataset>`

**Deskripsi Narasi:**

```
START
  ↓
[User klik "Import Data"]
  ↓
[File picker dialog muncul]
  ↓
[User pilih CSV file]
  ↓
<Validasi Frontend>
  ├─ File > 10MB? → [Show error: "File terlalu besar"] → END
  ├─ Bukan .csv? → [Show error: "Format tidak didukung"] → END
  └─ Valid? → Continue
  ↓
[Upload file ke browser memory]
  ↓
[Parse CSV menggunakan PapaParse]
  ↓
<Validasi Schema>
  ├─ Kolom wajib hilang? → [Show error + list missing columns] → END
  └─ Schema valid? → Continue
  ↓
[Create dataset record (status: pending)]
  ↓
[Create log_impor record (status: 'pending')]
  ↓
FOR EACH row in CSV:
  ├─ Parse tanggal → Valid? 
  │    ├─ Yes → Continue
  │    └─ No → [Skip row + increment invalid_count]
  ├─ Lookup platform_id dari nama platform
  │    ├─ Found → Continue
  │    └─ Not found → [Skip row + increment invalid_count]
  ├─ Lookup jenis_konten_id dari nama jenis konten
  │    ├─ Found → Continue
  │    └─ Not found → [Skip row + increment invalid_count]
  ├─ Validate numeric fields (likes, comments, dll)
  │    ├─ Valid → Continue
  │    └─ Invalid → [Skip row + increment invalid_count]
  └─ Add to validRows array
END FOR
  ↓
<Ada data valid?>
  ├─ No (semua invalid) → [Update log_impor: status='failed'] → [Show error] → END
  └─ Yes → Continue
  ↓
[Bulk insert validRows ke tabel postingan]
  ↓
<Insert berhasil?>
  ├─ No (database error) → [Update log_impor: status='failed' + error message] → [Show error] → END
  └─ Yes → Continue
  ↓
[Update dataset.jumlah_baris_dataset = validRows.length]
  ↓
[Update log_impor: status='success', jumlah_baris_tidak_valid]
  ↓
[Deactivate previous active datasets]
  ↓
[Set new dataset as active]
  ↓
[Refresh datasets list]
  ↓
[Show success toast: "X rows imported, Y rows skipped"]
  ↓
[Navigate to Dashboard]
  ↓
END
```

### 15.4 Komponen Dashboard & Analitik

**15.4.1 Komponen: Dashboard Metrics**

**Input:**
- Active dataset ID
- Date range filter (optional)
- Platform filter (optional)
- Content type filter (optional)

**Proses:**

**1. Fetch Data:**
```typescript
const { data: posts } = await supabase
  .from('postingan')
  .select('*, platform(*), jenis_konten(*)')
  .eq('id_dataset', activeDataset.id)
  .gte('waktu_diposting', dateRangeStart)
  .lte('waktu_diposting', dateRangeEnd)
  .in('id_platform', selectedPlatforms)
  .in('id_jenis_konten', selectedContentTypes)
```

**2. Calculate Metrics:**
```typescript
// Total posts
const totalPosts = posts.length

// Average ER
const avgER = posts.reduce((sum, p) => sum + (p.engagement_rate_persen || 0), 0) / totalPosts

// Total reach
const totalReach = posts.reduce((sum, p) => sum + p.jumlah_reach, 0)

// Latest followers (dari posting terakhir)
const latestPost = posts.sort((a,b) => new Date(b.waktu_diposting) - new Date(a.waktu_diposting))[0]
const currentFollowers = latestPost?.jumlah_followers || 0
```

**3. Generate Insights:**
```typescript
const insights = []

// Insight 1: Best performing platform
const platformPerformance = groupBy(posts, 'id_platform')
const bestPlatform = maxBy(platformPerformance, group => avgEROfGroup(group))
insights.push(`Platform terbaik: ${bestPlatform.nama_platform} (ER ${bestPlatform.avgER}%)`)

// Insight 2: Best performing content type
const contentTypePerformance = groupBy(posts, 'id_jenis_konten')
const bestContentType = maxBy(contentTypePerformance, group => avgEROfGroup(group))
insights.push(`Jenis konten terbaik: ${bestContentType.nama_jenis_konten} (ER ${bestContentType.avgER}%)`)

// Insight 3: Trend analysis
const currentWeekPosts = posts.filter(p => isCurrentWeek(p.waktu_diposting))
const previousWeekPosts = posts.filter(p => isPreviousWeek(p.waktu_diposting))
const currentWeekER = avg(currentWeekPosts.map(p => p.engagement_rate_persen))
const previousWeekER = avg(previousWeekPosts.map(p => p.engagement_rate_persen))
const erTrend = ((currentWeekER - previousWeekER) / previousWeekER * 100).toFixed(1)
insights.push(`ER ${erTrend > 0 ? 'naik' : 'turun'} ${Math.abs(erTrend)}% dibanding minggu lalu`)
```

**Output:**
- KPI Cards (Total Posts, Avg ER, Total Reach, Followers)
- Line Chart (ER trend over time)
- Bar Chart (Performance by platform)
- Bar Chart (Performance by content type)
- Insight Cards (auto-generated recommendations)

**Activity Diagram: Proses Analisis Dashboard**

`<Activity Diagram: Proses Analisis Dashboard>`

**Deskripsi Narasi:**

```
START
  ↓
[User buka halaman Dashboard]
  ↓
<Ada active dataset?>
  ├─ No → [Show empty state: "Belum ada data"] → END
  └─ Yes → Continue
  ↓
[Load filters from URL params atau localStorage]
  ↓
[Set initial filter state (date range, platform, content type)]
  ↓
[Show loading skeleton]
  ↓
[Fetch postingan WHERE id_dataset = active + filters]
  ↓
<Fetch berhasil?>
  ├─ No (network error) → [Show error message] → END
  └─ Yes → Continue
  ↓
<Ada data postingan?>
  ├─ No (0 results) → [Show empty state: "Tidak ada data sesuai filter"] → END
  └─ Yes → Continue
  ↓
PARALLEL {
  [Calculate KPI Metrics]
    ├─ Total posts = count(posts)
    ├─ Avg ER = avg(posts.engagement_rate_persen)
    ├─ Total Reach = sum(posts.jumlah_reach)
    └─ Current Followers = latest(posts.jumlah_followers)
  
  [Calculate Chart Data]
    ├─ ER Trend: group by week → calculate avg ER per week
    ├─ Platform Performance: group by platform → calculate avg ER per platform
    └─ Content Type Performance: group by jenis_konten → calculate avg ER
  
  [Generate Auto Insights]
    ├─ Find best platform (highest avg ER)
    ├─ Find best content type (highest avg ER)
    ├─ Find best posting time (day + hour dengan highest avg ER)
    ├─ Calculate ER trend (current week vs previous week)
    └─ Detect anomalies (posts dengan ER sangat tinggi/rendah)
}
  ↓
[Render UI Components]
  ├─ KPI Cards (animated count-up numbers)
  ├─ Line Chart (Recharts library)
  ├─ Bar Charts (Recharts library)
  └─ Insight Cards (with icon + message)
  ↓
[User interact dengan filters?]
  ├─ Change date range → [Re-fetch data dengan filter baru] → [Update charts]
  ├─ Change platform filter → [Re-fetch data] → [Update charts]
  ├─ Change content type filter → [Re-fetch data] → [Update charts]
  └─ Click "Save Filter" → [Open SaveFilterDialog] → [Save to filter_tersimpan]
  ↓
[User klik "Export"?]
  ├─ Yes → [Open ExportButton dialog] → [Select Excel/PDF] → [Generate file] → [Download]
  └─ No → Continue
  ↓
END (User stay on dashboard or navigate away)
```

### 15.5 Komponen AI Caption Generator

**Input:**
- Topic/keyword (string, required)
- Platform (dropdown: Instagram, TikTok, Twitter, LinkedIn)
- Tone (dropdown: Professional, Casual, Funny, Inspirational)

**Proses:**

**Frontend:**
1. User input topic + select platform + tone
2. Frontend validate (topic tidak boleh kosong)
3. Call edge function `generate-caption`:
   ```typescript
   const response = await supabase.functions.invoke('generate-caption', {
     body: {
       topic: userTopic,
       platform: selectedPlatform,
       tone: selectedTone
     }
   })
   ```

**Edge Function (Backend):**
```typescript
// supabase/functions/generate-caption/index.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY'))
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const prompt = `Generate 3 social media captions for ${platform} about "${topic}".
Tone: ${tone}.
Requirements:
- Max 150 characters per caption
- Include relevant hashtags
- Include emoji
- Different variations

Output format (JSON):
{
  "captions": [
    { "text": "caption 1", "hashtags": ["#tag1", "#tag2"] },
    { "text": "caption 2", "hashtags": ["#tag3", "#tag4"] },
    { "text": "caption 3", "hashtags": ["#tag5", "#tag6"] }
  ]
}
`

const result = await model.generateContent(prompt)
const responseText = result.response.text()
const parsedResult = JSON.parse(responseText)

return new Response(JSON.stringify(parsedResult), {
  headers: { 'Content-Type': 'application/json' }
})
```

**Frontend (Display Result):**
1. Show loading state saat tunggu response
2. Parse response JSON
3. Display 3 caption variations dalam cards
4. Each card punya tombol "Copy to Clipboard"
5. User klik copy → navigator.clipboard.writeText() → show toast "Copied!"

**Output:**
- 3 generated captions dengan hashtags
- Copy to clipboard functionality
- No data disimpan ke database (stateless)

**Sequence Diagram: Generate Caption AI**

`<Sequence Diagram: Generate Caption AI>`

**Deskripsi Narasi:**

```
User → Frontend: Input topic + select platform/tone
User → Frontend: Click "Generate Caption"
Frontend → Frontend: Validate input (topic required)
Frontend → Frontend: Show loading state
Frontend → Edge Function (generate-caption): POST { topic, platform, tone }
Edge Function → Edge Function: Read GEMINI_API_KEY from env
Edge Function → Edge Function: Construct prompt untuk Gemini API
Edge Function → Google Gemini API: POST /generateContent { prompt }
Google Gemini API → Google Gemini API: Process prompt dengan AI model
Google Gemini API → Edge Function: Response { captions: [...] }
Edge Function → Edge Function: Parse response text (JSON)
Edge Function → Edge Function: Validate response structure
Edge Function → Frontend: 200 OK { captions: [...] }
Frontend → Frontend: Hide loading state
Frontend → Frontend: Display 3 caption variations
Frontend → User: Show captions dengan copy buttons
User → Frontend: Click "Copy" pada caption 1
Frontend → Browser Clipboard: navigator.clipboard.writeText(caption1)
Frontend → User: Show toast "Caption copied!"
```

### 15.6 Komponen Q&A System

**15.6.1 User Side: Submit Question**

**Input:**
- Judul pertanyaan (string, required)
- Isi pertanyaan (string, required)

**Proses:**
1. User klik "Tanya Sesuatu"
2. Form dialog muncul
3. User input judul + isi
4. Frontend validate (kedua field wajib diisi)
5. Call:
   ```typescript
   await supabase.from('pertanyaan').insert({
     id_pengguna: user.id,
     id_proyek: selectedProject.id,
     judul_pertanyaan: judul,
     isi_pertanyaan: isi,
     status: 'menunggu' // default
   })
   ```
6. Trigger `notify_admin_new_question()` fires → kirim email ke admin
7. Show toast "Pertanyaan berhasil dikirim"
8. Refresh questions list

**Output:**
- New question di database (status: 'menunggu')
- Email notification ke admin
- Question card muncul di user's questions list

**15.6.2 Admin Side: Answer Question**

**Input:**
- Question ID
- Jawaban (string, required)

**Proses:**
1. Admin buka halaman "Bantuan Admin"
2. Lihat list pertanyaan (status: 'menunggu')
3. Klik pertanyaan → detail dialog muncul
4. Admin input jawaban di textarea
5. Klik "Submit Answer"
6. Call:
   ```typescript
   await supabase.from('pertanyaan').update({
     jawaban: jawabanAdmin,
     dijawab_oleh: admin.id,
     status: 'dijawab',
     updated_at: new Date().toISOString()
   }).eq('id', questionId)
   ```
7. Trigger `notify_user_question_answered()` fires → kirim email ke user
8. Show toast "Jawaban berhasil dikirim"
9. Question pindah dari list "Menunggu" ke "Dijawab"

**Output:**
- Question updated (status: 'dijawab', jawaban filled)
- Email notification ke user
- User bisa lihat jawaban + bisa rate

**15.6.3 User Side: Rate Answer**

**Input:**
- Question ID
- Rating (1-5 stars, required)
- Komentar rating (string, optional)

**Proses:**
1. User buka pertanyaan yang sudah dijawab
2. Klik "Rate Answer"
3. Dialog rating muncul (star rating component)
4. User pilih stars + optional komentar
5. Call:
   ```typescript
   await supabase.from('pertanyaan').update({
     rating: selectedRating,
     komentar_rating: komentarUser || null,
     rating_at: new Date().toISOString()
   }).eq('id', questionId)
   ```
6. Show toast "Terima kasih atas rating Anda!"
7. Disable rating button (sudah di-rate)

**Output:**
- Question updated dengan rating + komentar
- Admin bisa lihat feedback dari user

**Sequence Diagram: Q&A dan Notifikasi**

`<Sequence Diagram: Proses Q&A dan Notifikasi>`

**Deskripsi Narasi:**

```
=== PART 1: User Submit Question ===
User → Frontend (Bantuan Page): Click "Ajukan Pertanyaan"
Frontend → User: Show dialog form
User → Frontend: Input judul + isi pertanyaan
User → Frontend: Click "Submit"
Frontend → Frontend: Validate input (required fields)
Frontend → Supabase: INSERT pertanyaan { judul, isi, status: 'menunggu' }
Supabase → Database: Execute INSERT + TRIGGER notify_admin_new_question()
Database → Database: Call Edge Function via pg_net.http_post()
Database → Edge Function (notify-admin): POST { question_id, judul, isi, nama_penanya }
Edge Function → Edge Function: Read RESEND_API_KEY from env
Edge Function → Resend API: POST /emails/send { to: admin_email, subject, html }
Resend API → Admin Email: Deliver email notification
Edge Function → Database: Return success
Database → Supabase: INSERT complete + trigger success
Supabase → Frontend: 201 Created
Frontend → User: Show toast "Pertanyaan terkirim!"
Frontend → Frontend: Refresh questions list

=== PART 2: Admin Answer Question ===
Admin → Frontend (Bantuan Admin Page): Open page
Frontend → Supabase: SELECT pertanyaan WHERE status = 'menunggu'
Supabase → Frontend: List of pending questions
Frontend → Admin: Display questions
Admin → Frontend: Click question → detail modal
Admin → Frontend: Input jawaban
Admin → Frontend: Click "Submit Answer"
Frontend → Supabase: UPDATE pertanyaan SET jawaban = ?, status = 'dijawab' WHERE id = ?
Supabase → Database: Execute UPDATE + TRIGGER notify_user_question_answered()
Database → Database: Check IF status changed to 'dijawab'
Database → Database: Call Edge Function via pg_net.http_post()
Database → Edge Function (notify-user): POST { user_email, judul, jawaban }
Edge Function → Edge Function: Read RESEND_API_KEY from env
Edge Function → Resend API: POST /emails/send { to: user_email, subject, html }
Resend API → User Email: Deliver email notification
Edge Function → Database: Return success
Database → Supabase: UPDATE complete + trigger success
Supabase → Frontend: 200 OK
Frontend → Admin: Show toast "Jawaban terkirim!"
Frontend → Frontend: Move question to "Dijawab" list

=== PART 3: User Rate Answer ===
User → User Email: Click link in email notification
User Email → Frontend (Bantuan Page): Navigate to page
Frontend → Supabase: SELECT pertanyaan WHERE id_pengguna = auth.uid()
Supabase → Frontend: User's questions (including answered ones)
Frontend → User: Display questions dengan jawaban
User → Frontend: Click "Rate" pada answered question
Frontend → User: Show rating dialog (stars)
User → Frontend: Select rating (1-5 stars) + optional komentar
User → Frontend: Click "Submit Rating"
Frontend → Supabase: UPDATE pertanyaan SET rating = ?, komentar_rating = ? WHERE id = ?
Supabase → Database: Execute UPDATE (no trigger untuk rating)
Database → Supabase: UPDATE success
Supabase → Frontend: 200 OK
Frontend → User: Show toast "Terima kasih atas rating!"
Frontend → Frontend: Disable rating button (sudah di-rate)
```

---

## 16. Rancangan Antarmuka

### 16.1 Prinsip Desain UI

Sistem Analisis Performa Konten Digital mengikuti prinsip-prinsip desain berikut:

**A. Consistency (Konsistensi)**
- Menggunakan **design system** berbasis Tailwind CSS semantic tokens
- Semua komponen UI menggunakan shadcn/ui library yang telah dikustomisasi
- Warna, typography, spacing, dan border radius konsisten di seluruh aplikasi

**B. Responsive Design**
- Mobile-first approach menggunakan Tailwind breakpoints:
  - `sm`: ≥640px (tablet portrait)
  - `md`: ≥768px (tablet landscape)
  - `lg`: ≥1024px (desktop)
  - `xl`: ≥1280px (large desktop)
- Semua layout menggunakan Flexbox/Grid untuk adaptability

**C. Accessibility (A11y)**
- Semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<section>`)
- ARIA labels untuk screen readers
- Keyboard navigation support (Tab, Enter, Escape)
- Color contrast ratio ≥4.5:1 (WCAG AA standard)

**D. Dark Mode Support**
- CSS variables untuk light/dark themes di `index.css`
- Auto-switch berdasarkan OS preference atau manual toggle

**E. Performance-Oriented**
- Lazy loading untuk images
- Code splitting per route (React.lazy + Suspense)
- Debounced input untuk filter/search
- Virtualized lists untuk large datasets (jika perlu)

### 16.2 Design System & Tema

**16.2.1 Color Palette**

Menggunakan **HSL color system** dengan semantic tokens di `index.css`:

```css
:root {
  /* Base colors */
  --background: 0 0% 100%;         /* White */
  --foreground: 222.2 84% 4.9%;    /* Almost black */
  
  /* UI surface colors */
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  
  /* Brand colors */
  --primary: 221.2 83.2% 53.3%;    /* Blue */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Accent & muted */
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  /* Semantic colors */
  --destructive: 0 84.2% 60.2%;     /* Red for errors/delete */
  --destructive-foreground: 210 40% 98%;
  
  /* Border & input */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;        /* Focus ring */
  
  /* Chart colors (untuk Recharts) */
  --chart-1: 12 76% 61%;            /* Orange */
  --chart-2: 173 58% 39%;           /* Teal */
  --chart-3: 197 37% 24%;           /* Dark blue */
  --chart-4: 43 74% 66%;            /* Yellow */
  --chart-5: 27 87% 67%;            /* Coral */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

**CRITICAL:** Semua komponen HARUS menggunakan semantic tokens (contoh: `bg-background`, `text-foreground`, `border-border`) BUKAN hard-coded colors (❌ `bg-white`, `text-black`).

**16.2.2 Typography**

```css
:root {
  /* Font families */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;        /* Base size */
  line-height: 1.5;       /* Readable line height */
  -webkit-font-smoothing: antialiased;
}

/* Typography scale (via Tailwind classes) */
.text-xs    /* 0.75rem / 12px */
.text-sm    /* 0.875rem / 14px */
.text-base  /* 1rem / 16px */
.text-lg    /* 1.125rem / 18px */
.text-xl    /* 1.25rem / 20px */
.text-2xl   /* 1.5rem / 24px */
.text-3xl   /* 1.875rem / 30px */
.text-4xl   /* 2.25rem / 36px */
```

**16.2.3 Spacing & Layout**

```css
/* Tailwind spacing scale (via padding/margin classes) */
p-2   /* 0.5rem / 8px */
p-4   /* 1rem / 16px */
p-6   /* 1.5rem / 24px */
p-8   /* 2rem / 32px */
p-12  /* 3rem / 48px */

/* Container max-width */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem; /* 16px horizontal padding */
}
```

**16.2.4 Border Radius**

```css
rounded-none   /* 0 */
rounded-sm     /* 0.125rem / 2px */
rounded        /* 0.25rem / 4px */
rounded-md     /* 0.375rem / 6px */
rounded-lg     /* 0.5rem / 8px */  ← Most used
rounded-xl     /* 0.75rem / 12px */
rounded-full   /* 9999px (circle) */
```

### 16.3 Navigasi Utama

**16.3.1 Main Navigation (AppLayout)**

Struktur layout:
```
┌─────────────────────────────────────────────┐
│  Sidebar (240px)      │   Main Content      │
│  ┌─────────────────┐  │   ┌──────────────┐  │
│  │ Logo            │  │   │ Breadcrumbs  │  │
│  │ Project Select  │  │   │──────────────│  │
│  │ Nav Menu:       │  │   │              │  │
│  │  - Dashboard    │  │   │   Page       │  │
│  │  - Performa     │  │   │   Content    │  │
│  │  - Waktu Post   │  │   │              │  │
│  │  - Audiens      │  │   │              │  │
│  │  - Perbandingan │  │   │              │  │
│  │  - Kampanye     │  │   │              │  │
│  │  - Target KPI   │  │   │              │  │
│  │  - Kompetitor   │  │   │              │  │
│  │  - AI Caption   │  │   │              │  │
│  │  - Bantuan      │  │   │              │  │
│  │──────────────────│  │   │              │  │
│  │ Admin Menu*:    │  │   │              │  │
│  │  - Platform     │  │   │              │  │
│  │  - Jenis Konten │  │   │              │  │
│  │  - Bantuan Adm  │  │   └──────────────┘  │
│  │──────────────────│  │                     │
│  │ User Profile    │  │                     │
│  │ Dark Mode Toggle│  │                     │
│  └─────────────────┘  │                     │
└─────────────────────────────────────────────┘

* Admin Menu hanya muncul jika user.peran === 'admin'
```

**Mobile Navigation (<768px):**
- Sidebar collapse menjadi hamburger menu
- Click hamburger → sidebar slide dari kiri
- Overlay backdrop (click untuk close)

**16.3.2 Menu Items**

| Label | Route | Icon | Access |
|-------|-------|------|--------|
| Dashboard | `/dashboard` | BarChart3 | All users |
| Content Performance | `/performa` | TrendingUp | All users |
| Best Time to Post | `/waktu-terbaik` | Clock | All users |
| Audience Analysis | `/audiens` | Users | All users |
| Dataset Comparison | `/perbandingan` | GitCompare | All users |
| Campaign | `/kampanye` | Megaphone | All users |
| Target KPI | `/target-kpi` | Target | All users |
| Competitor Analysis | `/kompetitor-analysis` | Eye | All users |
| AI Caption Generator | `/ai-caption` | Sparkles | All users |
| Help / Q&A | `/bantuan` | HelpCircle | All users |
| **--- Admin Only ---** | | | |
| Platform Management | `/platform` | Layers | Admin only |
| Content Type Mgmt | `/jenis-konten` | FileText | Admin only |
| Help Admin (Q&A Mgmt) | `/bantuan-admin` | Shield | Admin only |

### 16.4 Aturan Antarmuka

**16.4.1 Input Fields**

**Password Input:**
- ✅ ALWAYS type="password" (ditampilkan sebagai dots/bullets)
- ✅ Toggle show/hide password dengan icon (EyeIcon / EyeOffIcon)
- ✅ Min length 6 characters (validated di frontend + backend)

**Required Fields:**
- ✅ Marked dengan asterisk `*` merah di label
- ✅ Show error message di bawah field jika kosong saat submit
- ✅ Error state: border merah + text-destructive

**Text Input:**
- ✅ Max length attribute untuk prevent terlalu panjang (misal nama proyek max 100 chars)
- ✅ Placeholder text untuk guidance (contoh: "Masukkan nama project...")
- ✅ Auto-trim whitespace saat submit

**Numeric Input:**
- ✅ type="number" atau input mask untuk enforce numeric only
- ✅ Min/max validation (misal followers >= 0)
- ✅ Step attribute untuk decimal values (misal ER step="0.01")

**Date Input:**
- ✅ DatePicker component (shadcn/ui Calendar)
- ✅ Format display: "DD MMM YYYY" (contoh: "15 Jan 2024")
- ✅ Validation: tanggal_selesai >= tanggal_mulai

**Select/Dropdown:**
- ✅ shadcn/ui Select component
- ✅ Search functionality jika options > 10 (misal platform select)
- ✅ Placeholder: "Pilih platform..."

**16.4.2 Validasi dan Error Handling**

**Frontend Validation (Realtime):**
```typescript
// Example: Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(email)) {
  setError('email', { message: 'Format email tidak valid' })
}

// Example: Required field
if (!namaProyek.trim()) {
  setError('namaProyek', { message: 'Nama project wajib diisi' })
}
```

**Backend Validation (Database Level):**
- NOT NULL constraints → jika dilanggar, frontend show: "Field ini wajib diisi"
- UNIQUE constraints → jika dilanggar, frontend show: "Data sudah ada"
- FOREIGN KEY constraints → jika dilanggar, frontend show: "Data terkait tidak ditemukan"
- CHECK constraints → jika dilanggar, frontend show custom error message

**Error Display:**

**Field-level errors:**
```tsx
<Input 
  value={namaProyek}
  onChange={(e) => setNamaProyek(e.target.value)}
  className={errors.namaProyek ? 'border-destructive' : ''}
/>
{errors.namaProyek && (
  <p className="text-sm text-destructive mt-1">
    {errors.namaProyek.message}
  </p>
)}
```

**Form-level errors (toast notifications):**
```typescript
import { toast } from 'sonner'

// Success
toast.success('Project berhasil dibuat!')

// Error
toast.error('Gagal membuat project. Silakan coba lagi.')

// Info
toast.info('Dataset sedang diproses...')

// Warning
toast.warning('Beberapa baris data dilewati karena format salah')
```

**16.4.3 Loading States**

**Button Loading:**
```tsx
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

**Page Loading (Skeleton):**
```tsx
// Skeleton untuk card
<Card>
  <CardHeader>
    <Skeleton className="h-4 w-[250px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-[200px] w-full" />
  </CardContent>
</Card>
```

**Data Loading (Spinner):**
```tsx
import { Loader2 } from 'lucide-react'

<div className="flex justify-center items-center h-64">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</div>
```

**16.4.4 Empty States**

**No Data Available:**
```tsx
<div className="flex flex-col items-center justify-center h-64 text-center">
  <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">Belum ada data</h3>
  <p className="text-muted-foreground">
    Import data untuk mulai melihat analisis
  </p>
  <Button className="mt-4" onClick={openImportDialog}>
    Import Data
  </Button>
</div>
```

**No Results from Filter:**
```tsx
<div className="flex flex-col items-center justify-center h-64 text-center">
  <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">Tidak ada hasil</h3>
  <p className="text-muted-foreground">
    Coba ubah filter atau rentang tanggal
  </p>
  <Button variant="outline" className="mt-4" onClick={resetFilters}>
    Reset Filter
  </Button>
</div>
```

**16.4.5 Confirmation Dialogs**

**Delete Confirmation:**
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Hapus Project</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
      <AlertDialogDescription>
        Tindakan ini tidak dapat dibatalkan. Semua data terkait project ini akan dihapus permanen.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} className="bg-destructive">
        Ya, Hapus
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## 17. Gambaran Umum Antarmuka

### 17.1 Fungsionalitas dari Sudut Pandang Pengguna

Sistem Analisis Performa Konten Digital dirancang untuk memudahkan pengguna dalam menyelesaikan tugas-tugas analisis konten dengan alur yang intuitif dan efisien.

**17.1.1 User Journey: First Time User**

**Step 1: Registration & Login**
- User buka aplikasi → diarahkan ke `/auth`
- Pilih tab "Sign Up"
- Input email, password, full name
- Click "Sign Up" → auto-create profil (role: 'user')
- Auto login → redirect ke `/dashboard`

**Step 2: Onboarding (First Project)**
- Dashboard show empty state: "Belum ada project"
- Click "Buat Project Pertama"
- Dialog muncul → input nama + deskripsi project
- Click "Simpan" → project created
- Auto-select project → dashboard refresh

**Step 3: Import Data**
- Dashboard show: "Belum ada dataset"
- Click "Import Data"
- Dialog muncul dengan 2 opsi:
  - Upload CSV file
  - (Future) Connect Google Sheets
- User pilih CSV → file picker muncul
- Select CSV file → loading state
- Validation success → data imported
- Dashboard show metrics & charts

**Step 4: Explore Analytics**
- User lihat KPI cards (Total Posts, Avg ER, Reach, Followers)
- Scroll down → lihat charts:
  - ER trend over time (line chart)
  - Performance by platform (bar chart)
  - Performance by content type (bar chart)
- Read auto-generated insights
- Apply filters (date range, platform, content type)
- Click "Save Filter" untuk save current filters

**Step 5: Deep Dive Analysis**
- Navigate ke "Content Performance" → lihat top/worst posts
- Navigate ke "Best Time to Post" → lihat heatmap hari & jam terbaik
- Navigate ke "Audience Analysis" → lihat demografi (simulasi)
- Navigate ke "Dataset Comparison" → compare dengan dataset lain (jika ada)

**Step 6: Content Planning**
- Navigate ke "Campaign" → create campaign untuk track campaign-specific posts
- Navigate ke "Target KPI" → set target untuk periode tertentu (weekly/monthly)
- Navigate ke "AI Caption Generator" → generate caption untuk posting baru

**Step 7: Get Help**
- Navigate ke "Bantuan" → lihat FAQ atau submit pertanyaan
- Submit pertanyaan → tunggu admin jawab
- Dapat email notification saat admin jawab
- Rate jawaban admin

**17.1.2 User Journey: Returning User**

**Daily/Weekly Tasks:**
1. **Check Performance:**
   - Login → auto-direct ke dashboard
   - Lihat KPI cards untuk quick overview
   - Check insights untuk recommendations

2. **Compare Periods:**
   - Go to "Dataset Comparison"
   - Select 2 datasets (misal: Last Month vs This Month)
   - Lihat side-by-side comparison metrics
   - Identify trends (naik/turun)

3. **Plan Content:**
   - Go to "Best Time to Post"
   - Lihat heatmap → identify best days & hours
   - Go to "AI Caption Generator"
   - Generate captions untuk upcoming posts

4. **Track Goals:**
   - Go to "Target KPI"
   - Check progress vs target
   - Update target jika perlu

5. **Export Reports:**
   - Go to any analytics page
   - Click "Export" button
   - Select Excel atau PDF
   - Download file untuk share dengan team/client

**17.1.3 Admin Journey**

**Admin-Specific Tasks:**

1. **Manage Master Data:**
   - Go to "Platform Management"
   - Add/Edit/Delete platforms (misal: add TikTok)
   - Set platform color untuk visualisasi
   - Go to "Content Type Management"
   - Add/Edit/Delete content types (misal: add Reels)

2. **Answer Questions:**
   - Go to "Bantuan Admin"
   - Lihat list pending questions
   - Click pertanyaan → read detail
   - Input jawaban
   - Click "Submit Answer" → user dapat email notification

3. **Monitor System:**
   - (Future) View analytics tentang system usage
   - (Future) View import error logs
   - (Future) View user activity logs

### 17.2 Umpan Balik ke Pengguna

Sistem memberikan feedback yang jelas dan tepat waktu untuk setiap aksi pengguna:

**17.2.1 Success Feedback**

**Toast Notifications (hijau, icon checkmark):**
- "Project berhasil dibuat!"
- "Data berhasil diimport. 245 baris ditambahkan."
- "Filter berhasil disimpan."
- "Pertanyaan berhasil dikirim. Kami akan menjawab segera."
- "Caption berhasil di-copy ke clipboard!"
- "Export berhasil. File sedang diunduh..."

**Visual Feedback:**
- New item muncul di list (dengan subtle animation)
- Form fields reset setelah submit success
- Dialog auto-close setelah success action

**17.2.2 Error Feedback**

**Toast Notifications (merah, icon X):**
- "Gagal membuat project. Silakan coba lagi."
- "Import gagal: Kolom 'tanggal' tidak ditemukan di CSV."
- "Gagal menyimpan filter. Periksa koneksi internet Anda."
- "File terlalu besar. Maksimal 10MB."

**Field-Level Errors (merah, di bawah input):**
- "Email tidak valid"
- "Password minimal 6 karakter"
- "Nama project wajib diisi"
- "Tanggal selesai harus setelah tanggal mulai"

**Error Pages:**
- 404 Page: "Halaman tidak ditemukan" (dengan link back to dashboard)
- 500 Error: "Terjadi kesalahan server. Silakan refresh halaman."

**17.2.3 Info Feedback**

**Toast Notifications (biru, icon info):**
- "Dataset sedang diproses. Ini mungkin memakan waktu beberapa menit..."
- "Import berhasil dengan 3 baris dilewati karena data tidak valid."
- "Filter ini akan disimpan hanya untuk Anda. Tim tidak bisa melihatnya."

**Badge/Label:**
- "AKTIF" badge pada dataset aktif (hijau)
- "PENDING" badge pada pertanyaan menunggu (kuning)
- "DIJAWAB" badge pada pertanyaan dijawab (biru)

**17.2.4 Loading Feedback**

**Spinner/Loading States:**
- Button: "Loading..." dengan spinner icon
- Page: Skeleton loading (wireframe abu-abu)
- Chart: "Loading data..." dengan skeleton bars
- Table: Skeleton rows (4-5 rows placeholder)

**Progress Indicators (untuk proses lama):**
- Import CSV: Progress bar 0-100%
  - "Validating CSV... 10%"
  - "Inserting data... 50%"
  - "Finalizing... 90%"
  - "Done! 100%"

**17.2.5 Warning Feedback**

**Toast Notifications (kuning, icon warning):**
- "Dataset ini akan dinonaktifkan jika Anda activate dataset lain."
- "Menghapus project akan menghapus SEMUA data. Tindakan ini tidak dapat dibatalkan!"

**Confirmation Dialogs:**
- Before delete: "Apakah Anda yakin ingin menghapus?"
- Before destructive action: Alert dialog dengan warning message

### 17.3 Interaksi Pengguna dengan Sistem

**17.3.1 Mouse/Touch Interactions**

**Hover States:**
- Cards: Elevate (shadow bertambah) + border color change
- Buttons: Background color lighten/darken
- Links: Underline muncul
- Table rows: Background color change (subtle)

**Click/Tap:**
- Button: Ripple effect (subtle animation)
- Card: Navigate ke detail page atau open dialog
- Chart bar: Show tooltip dengan detail data
- Filter chip: Toggle active/inactive state

**Drag & Drop (Future Feature):**
- Reorder dashboard widgets
- Upload CSV via drag file ke drop zone

**17.3.2 Keyboard Interactions**

**Tab Navigation:**
- Tab key untuk navigate antar form fields
- Focus ring visible (blue outline)
- Skip to main content link (untuk accessibility)

**Shortcuts:**
- `Ctrl/Cmd + K`: Open command palette (future feature)
- `Esc`: Close dialog/modal
- `Enter`: Submit form atau confirm action
- Arrow keys: Navigate dropdown options

**17.3.3 Responsive Behaviors**

**Desktop (≥1024px):**
- Sidebar always visible (240px width)
- Charts side-by-side (2 columns)
- Forms 2-column layout
- Tooltips hover-based

**Tablet (768px - 1023px):**
- Sidebar collapsible
- Charts stack vertically (1 column)
- Forms 2-column layout
- Tooltips tap-based

**Mobile (<768px):**
- Sidebar hidden → hamburger menu
- Charts full-width
- Forms 1-column layout
- Tooltips tap-based
- Bottom navigation (future enhancement)

---

## 18. Tampilan Layar

Bagian ini menjelaskan setiap halaman utama dalam sistem beserta elemen-elemen penting yang terdapat di dalamnya. Untuk setiap layar, akan dijelaskan secara naratif komponen-komponen UI yang ada tanpa menggambar wireframe/mockup.

### 18.1 Halaman Autentikasi (`/auth`)

`<Tampilan Layar: Halaman Autentikasi>`

**Deskripsi:**
Halaman login dan registrasi pengguna. Menggunakan layout terpusat dengan background gradient.

**Elemen UI:**
- **Logo dan Branding**: Logo aplikasi di bagian atas card
- **Tabs Switch**: Toggle antara "Login" dan "Sign Up"
- **Form Login**:
  - Input email (type: email, required)
  - Input password (type: password, required, ditampilkan sebagai dot)
  - Button "Sign In" (primary, full width)
- **Form Sign Up**:
  - Input nama lengkap (text, required)
  - Input email (email, required)
  - Input password (password, min 6 karakter, required)
  - Button "Sign Up" (primary, full width)
- **Feedback**: Toast notification untuk sukses/error
- **Validasi**: Field-level error messages di bawah input

### 18.2 Dashboard Overview (`/`)

`<Tampilan Layar: Dashboard Overview>`

**Deskripsi:**
Halaman utama yang menampilkan ringkasan KPI dan grafik performa konten.

**Elemen UI:**
- **Header Section**:
  - Title "Dashboard Overview"
  - Subtitle "Ringkasan performa konten sosial media Anda"
  - Action buttons: Customize (Settings icon), Export, Notes
- **KPI Cards Grid** (3 kolom di desktop, responsif):
  - Total Posts (dengan icon TrendingUp)
  - Avg Engagement Rate (dengan icon Heart)
  - Followers Now (dengan icon Users)
  - Median Reach (dengan icon Eye)
  - Save Rate (dengan icon Bookmark)
  - Share Rate (dengan icon Share2)
  - Setiap card menampilkan angka besar dan label deskriptif
- **Charts Section** (2 kolom di desktop):
  - Line Chart: Tren ER Mingguan (x-axis: minggu, y-axis: ER %)
  - Bar Chart: Distribusi Platform (x-axis: platform, y-axis: jumlah post)
  - Bar Chart: Distribusi Tipe Konten
- **Insight Cards**: Automated insight untuk setiap chart dengan icon Lightbulb
- **Customize Dialog**: 
  - Checkbox list untuk show/hide widgets (KPI, Trends, Platforms, Content Types, Insights)
  - Changes saved to user preferences

### 18.3 Content Performance (`/performa`)

`<Tampilan Layar: Content Performance>`

**Deskripsi:**
Halaman analisis detail performa setiap postingan dengan filtering dan sorting.

**Elemen UI:**
- **Header**: Title, subtitle, action buttons (Export, Save Filter, Notes)
- **Filter Card**:
  - Date range: Dari Tanggal, Sampai Tanggal (date inputs)
  - Reach Minimum (number input)
  - Search Caption (text input dengan placeholder)
  - Platform checkboxes (multi-select)
  - Content Type checkboxes (multi-select)
- **Sorting Card**:
  - Button group: ER / Reach / Engagement (toggle style)
  - Export CSV button dengan icon Download
- **Data Table**:
  - Columns: Post ID, Platform, Tanggal, Tipe, Caption (truncated), Reach, Likes, Comments, Shares, Saved, Total Engagement, ER%
  - Performance badges: "Top 10%" (green), "Bottom 10%" (red)
  - Hover untuk tooltip pada caption (full text)
  - Sortable columns
  - Responsive: horizontal scroll pada mobile
- **Insight Card**: Dynamic insight berdasarkan sorting method

### 18.4 Best Time to Post (`/waktu-terbaik`)

`<Tampilan Layar: Best Time to Post>`

**Deskripsi:**
Analisis waktu terbaik untuk posting berdasarkan metrik tertentu.

**Elemen UI:**
- **Header**: Title "Waktu Terbaik Posting", subtitle
- **Filter & Settings Card**:
  - Metric selector: Button group (ER / Total Engagement / Reach)
  - Period selector: Dropdown (Semua Data / Minggu Ini / Bulan Ini)
  - Comparison toggle: Checkbox "Bandingkan dengan periode sebelumnya"
  - Platform filter: Checkboxes dengan button Reset
  - Content Type filter: Checkboxes dengan button Reset
- **Top 3 Slots Grid** (3 kolom):
  - Card per slot showing:
    - Badge ranking (#1, #2, #3 dengan icon Trophy)
    - Hari dan jam (bold, large text)
    - Metric value dengan icon
    - Jumlah sample posts
    - Comparison arrow (TrendingUp/TrendingDown) jika enabled
- **Heatmap Visualization** (tidak digambar, dijelaskan):
  - Matrix 7x24 (hari x jam)
  - Color intensity berdasarkan metric value
  - Tooltip on hover showing exact value
- **Hourly Posting Frequency**:
  - Bar chart showing jumlah post per jam
- **Insight Card**: Rekomendasi waktu terbaik dengan context

### 18.5 Audience & Growth (`/audiens`)

`<Tampilan Layar: Audience & Growth>`

**Deskripsi:**
Analisis pertumbuhan followers dan korelasi reach vs engagement.

**Elemen UI:**
- **Header**: Title, subtitle, Save Filter button
- **Charts**:
  - Line Chart: Tren Followers Harian (smooth line, gradient fill)
  - Bar Chart: Frekuensi Posting Mingguan
  - Scatter Plot: Korelasi Reach vs Engagement
    - Card description showing R² value
    - Each point represents a post
- **Insight Card**: Summary growth dan correlation insight
- **Loading State**: Skeleton placeholders saat fetch data

### 18.6 Dataset Comparison (`/perbandingan`)

`<Tampilan Layar: Dataset Comparison>`

**Deskripsi:**
Perbandingan performa antar dataset (maksimal 3 dataset).

**Elemen UI:**
- **Header**: Title "Perbandingan Dataset", subtitle "(maksimal 3)"
- **Dataset Selection Card**:
  - List of available datasets dengan checkbox
  - Setiap item show: nama dataset, jumlah posts, badge "Aktif" jika applicable
  - Disabled state jika sudah 3 selected
- **Comparison Cards Grid** (3 kolom):
  - Per dataset card showing:
    - Dataset name as title
    - KPI metrics: Total Posts, Avg ER, Median Reach (dengan icons)
    - Top 3 Platforms distribution (percentage)
    - Top 3 Content Types distribution (percentage)
- **Grouped Bar Chart**:
  - Compare metrics side-by-side
  - X-axis: metrics (Avg ER, Median Reach, Total Posts)
  - Bars: colored by dataset (up to 3 colors)
  - Legend showing dataset names
- **Insight Card**: Menjelaskan dataset mana yang unggul di metrik apa
- **Empty State**: "Pilih minimal 2 dataset untuk melihat perbandingan"

### 18.7 Campaign Management (`/kampanye`)

`<Tampilan Layar: Campaign Management>`

**Deskripsi:**
Halaman untuk membuat dan mengelola kampanye marketing.

**Elemen UI:**
- **Header** dengan button "Buat Kampanye Baru"
- **Campaigns Table**:
  - Columns: Nama Kampanye, Tanggal Mulai, Tanggal Selesai, Jumlah Posts, Actions
  - Actions: Edit, Delete (dengan confirmation)
- **Create/Edit Dialog**:
  - Input: Nama Kampanye (required)
  - Date pickers: Tanggal Mulai, Tanggal Selesai
  - Textarea: Catatan (optional)
  - Buttons: Cancel, Save
- **Empty State**: "Belum ada kampanye. Klik tombol di atas untuk membuat kampanye pertama"

### 18.8 KPI Target (`/target-kpi`)

`<Tampilan Layar: KPI Target>`

**Deskripsi:**
Setting dan tracking target KPI per periode.

**Elemen UI:**
- **Header** dengan button "Tambah Target Baru"
- **Targets Table**:
  - Columns: Periode, Tanggal, Target ER, Target Followers, Target Reach, Aktual, Progress
  - Progress bar untuk setiap target
  - Color-coded: hijau (achieved), kuning (in progress), merah (below target)
- **Create/Edit Dialog**:
  - Dropdown: Jenis Periode (Weekly / Monthly)
  - Date pickers: Tanggal Mulai, Tanggal Selesai
  - Number inputs: Target ER (%), Target Followers, Target Reach
  - Auto-calculate dari dataset aktif
- **Progress Cards**: Summary of current period targets dengan progress indicators

### 18.9 AI Caption Generator (`/ai-caption`)

`<Tampilan Layar: AI Caption Generator>`

**Deskripsi:**
Tool untuk generate caption menggunakan AI berdasarkan deskripsi konten.

**Elemen UI:**
- **Header**: Title "AI Caption Generator", subtitle
- **Input Section** (Card):
  - Textarea: Deskripsi Konten (placeholder: "Contoh: Produk baru skincare untuk kulit sensitif, target audiens wanita 20-35 tahun...")
  - Character counter (optional)
  - Button: "Generate Caption" dengan icon Sparkles
  - Loading state: button shows spinner + "Generating..."
- **Output Section** (Card):
  - Generated caption in readonly textarea
  - Formatting preserved (line breaks, emojis)
  - Action buttons:
    - Copy to Clipboard (dengan icon Copy)
    - Regenerate (dengan icon RefreshCw)
  - Success toast on copy
- **Examples Section** (optional):
  - Pre-filled example buttons untuk quick start
- **Tips Section**: Brief guidelines untuk input yang efektif

### 18.10 Q&A / Bantuan (`/bantuan` untuk User, `/bantuan-admin` untuk Admin)

`<Tampilan Layar: Q&A User>`

**Deskripsi:**
Sistem tanya-jawab antara user dan admin.

**User View (`/bantuan`) Elemen UI:**
- **Header** dengan button "Ajukan Pertanyaan Baru"
- **Questions List**:
  - Card per question showing:
    - Judul pertanyaan (bold)
    - Status badge: "Menunggu" (yellow) / "Dijawab" (blue)
    - Tanggal dibuat
    - Click to expand/collapse
  - Expanded view:
    - Isi pertanyaan lengkap
    - Jawaban (jika sudah dijawab)
    - Admin name dan tanggal jawab
    - Rating section (jika sudah dijawab dan belum rating):
      - Star rating (1-5 stars)
      - Textarea: Komentar rating (optional)
      - Button: Submit Rating
- **Create Question Dialog**:
  - Select: Pilih Proyek
  - Input: Judul Pertanyaan (required, max 100 chars)
  - Textarea: Isi Pertanyaan (required, min 10 chars)
  - Buttons: Cancel, Kirim Pertanyaan
  - Validation messages
- **Empty State**: "Belum ada pertanyaan. Ajukan pertanyaan pertama Anda!"

`<Tampilan Layar: Q&A Admin>`

**Admin View (`/bantuan-admin`) Elemen UI:**
- **Header**: Title "Kelola Pertanyaan", badge showing unread count
- **Filter Tabs**: Semua / Menunggu / Dijawab
- **Questions Table**:
  - Columns: Penanya, Proyek, Judul, Status, Tanggal, Actions
  - Actions: Lihat & Jawab (untuk pending), Lihat Detail (untuk answered)
- **Answer Dialog**:
  - Read-only fields: Penanya, Proyek, Tanggal
  - Display: Judul & Isi Pertanyaan (read-only)
  - Textarea: Jawaban (required, min 20 chars)
  - Buttons: Cancel, Kirim Jawaban
  - Auto-send email notification setelah submit
- **Question Detail Dialog**:
  - Show full question & answer
  - Show rating (jika ada) dengan stars dan komentar

### 18.11 Data Import (`/import`)

`<Tampilan Layar: Data Import>`

**Deskripsi:**
Halaman untuk import data dari CSV atau Google Sheets.

**Elemen UI:**
- **Header**: Title "Import Data", instructions
- **Import Method Selection**:
  - Radio buttons: Upload CSV / Google Sheets
- **CSV Upload Section**:
  - File picker: "Choose File" button atau Drag & Drop zone
  - File requirements: Max 10MB, .csv format
  - Template download link
- **Google Sheets Section**:
  - Input: Sheet URL
  - Button: "Connect to Sheet"
- **Dataset Information Form**:
  - Input: Nama Dataset (required)
  - Auto-generated atau manual input
- **Preview Section**:
  - Show first 5-10 rows setelah file selected
  - Column mapping validation
  - Warning messages untuk missing/invalid columns
- **Import Progress**:
  - Progress bar (0-100%)
  - Status text: "Validating... 10%", "Inserting data... 50%", "Finalizing... 90%"
  - Success/Error summary after completion
- **Import History Table**:
  - Recent imports dengan status, timestamp, row count
  - Link to view import logs (errors, skipped rows)

### 18.12 Report Generation (`/laporan`)

`<Tampilan Layar: Report Generation>`

**Deskripsi:**
Generate comprehensive performance report untuk periode tertentu.

**Elemen UI:**
- **Header**: Title "Laporan Performa"
- **Report Settings Card**:
  - Date range: Dari Tanggal, Sampai Tanggal
  - Checkbox: Include Charts
  - Button: "Generate Report" (primary, large)
  - Loading state saat generate
- **Report Preview Section** (after generation):
  - **Executive Summary**:
    - Total posts, Avg ER, Total Reach, Latest Followers
    - Save Rate, Share Rate
  - **Top Performing Posts** (Table):
    - Top 5 by ER dengan details
  - **Worst Performing Posts** (Table):
    - Bottom 5 by ER
  - **Best Posting Times**:
    - Top 3 time slots dengan metrics
  - **Best Content Types**:
    - Ranked by performance
  - **Charts** (if included):
    - ER trend over time
    - Platform distribution
    - Content type distribution
- **Action Buttons**:
  - Print Report (opens print dialog)
  - Export to PDF (download)
  - Export to Excel (download)

---

## 19. Objek Layar dan Tindakan

Bagian ini menjelaskan objek-objek UI dan tindakan yang terjadi saat pengguna berinteraksi dengan elemen-elemen tersebut.

### 19.1 Objek Input dan Validasi

**Input Text / Email / Number:**
- **Visual State**: Border default (border color), focus (ring outline dengan primary color), error (red border + error message di bawah), disabled (opacity 50%, cursor not-allowed)
- **Validasi**:
  - Email: Regex validation `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  - Password: Minimal 6 karakter
  - Required fields: Tidak boleh kosong (trim whitespace)
  - Number: Min/max values jika applicable
- **Action**: onChange → real-time validation, onBlur → show error message
- **Error Display**: Red text di bawah input, icon X di dalam input (optional)

**Textarea:**
- **Visual**: Similar to input, dengan resize vertical
- **Character Counter**: Show "50/200" di pojok kanan bawah
- **Validasi**: Min/max length, required
- **Action**: Auto-expand height saat typing (optional)

**Date Picker:**
- **Visual**: Input dengan icon Calendar
- **Action**: onClick → open calendar popover, select date → update value & close popover
- **Validasi**: Format yyyy-MM-dd, date range validation (tanggal selesai > tanggal mulai)
- **Accessibility**: Keyboard navigation (arrow keys untuk navigate dates)

**Dropdown / Select:**
- **Visual**: Trigger button dengan arrow down icon
- **Action**: onClick → open options list (popover), select option → update value & close
- **Search** (jika banyak options): Input search di dalam dropdown
- **Keyboard**: Arrow keys navigate, Enter select, Esc close

**Checkbox:**
- **Visual States**: Unchecked (empty box), Checked (box dengan checkmark icon), Indeterminate (dash), Disabled
- **Action**: onClick/onSpace → toggle checked state
- **Associated Label**: Clicking label juga toggle checkbox
- **Usage**: Multi-select filters, settings toggles, accept terms

**Radio Button:**
- **Visual**: Circle (empty atau filled dengan dot)
- **Action**: onClick → select (deselect others in group)
- **Usage**: Single-select options (e.g., import method, period type)

### 19.2 Objek Button dan Actions

**Primary Button:**
- **Visual**: Background primary color, white text, rounded corners
- **Hover**: Background lighten/darken, slight shadow increase
- **Active**: Scale 98% (press effect)
- **Loading**: Spinner icon + "Loading..." text, disabled state
- **Disabled**: Opacity 50%, cursor not-allowed
- **Action**: onClick → trigger function (submit form, open dialog, API call, dll)

**Secondary Button (Outline):**
- **Visual**: Border primary color, primary text, transparent background
- **Hover**: Background primary/10 (subtle fill)
- **Usage**: Cancel actions, secondary options

**Ghost Button:**
- **Visual**: No border, no background, hanya text
- **Hover**: Background muted (subtle)
- **Usage**: Reset filters, minor actions

**Icon Button:**
- **Visual**: Square/circle, icon only, no text
- **Size**: Small (32px), Medium (40px), Large (48px)
- **Usage**: Close dialog (X icon), Delete (Trash icon), Edit (Pencil icon)

**Button with Icon:**
- **Layout**: Icon + Text (gap 0.5rem)
- **Examples**: "Export" dengan Download icon, "Generate" dengan Sparkles icon
- **Icon Position**: Left atau right of text

### 19.3 Objek Card dan Container

**Card:**
- **Visual**: White/card background, border, rounded corners, subtle shadow
- **Hover** (jika clickable): Shadow increase, scale 101%, border color change
- **Structure**: CardHeader (dengan Title & Description) + CardContent (body)
- **Usage**: Group related content, clickable cards navigate to detail

**Dialog / Modal:**
- **Trigger**: Button onClick → open dialog
- **Visual**: 
  - Backdrop: Dark overlay (black/50% opacity)
  - Dialog: Centered card, max-width, slide-in animation
  - Close button: X icon di pojok kanan atas
- **Structure**: DialogHeader (Title) + DialogContent (body) + DialogFooter (action buttons)
- **Close Actions**: 
  - Click X button
  - Click backdrop (optional, configurable)
  - Press Esc key
  - Click Cancel/Close button
- **Focus Management**: Focus trap inside dialog, restore focus on close

**Popover:**
- **Trigger**: Button/element onClick → open popover
- **Visual**: Small floating card, arrow pointer to trigger, auto-position (avoid screen edges)
- **Usage**: Date picker, dropdown menus, tooltips
- **Close**: Click outside, select option, press Esc

**Tooltip:**
- **Trigger**: Hover element (500ms delay)
- **Visual**: Small dark background, white text, arrow pointer
- **Usage**: Show full text untuk truncated content, explain icon meanings
- **Accessibility**: Also show on focus untuk keyboard users

### 19.4 Objek Tabel dan List

**Data Table:**
- **Structure**: TableHeader (column names) + TableBody (rows)
- **Row Hover**: Background color change (subtle)
- **Row Click**: Navigate to detail atau open dialog (jika applicable)
- **Sortable Columns**: 
  - Visual: Arrow icon di column header
  - Action: Click header → sort ascending, click again → descending, click again → reset
- **Pagination** (jika banyak data):
  - Controls: Previous, Page numbers, Next
  - Show: "Showing 1-20 of 245 results"
- **Selection**:
  - Checkbox di kolom pertama
  - Header checkbox: Select/deselect all
  - Actions: Bulk delete, bulk export
- **Responsive**: Horizontal scroll pada mobile, atau card layout alternative

**List / Timeline:**
- **Visual**: Vertical list dengan separator lines
- **Item Structure**: Icon/avatar + content + actions/timestamp
- **Hover**: Background highlight
- **Empty State**: "No items yet" dengan illustration/icon
- **Loading**: Skeleton items (3-5 placeholder rows)

### 19.5 Objek Chart dan Visualization

**Line Chart:**
- **Interaction**: 
  - Hover point → show tooltip (exact value, label)
  - Legend click → toggle series visibility
- **Responsive**: Auto-resize dengan container
- **Animation**: Smooth line draw on mount
- **Accessibility**: Tabular data fallback untuk screen readers

**Bar Chart:**
- **Interaction**:
  - Hover bar → highlight + tooltip
  - Click bar → filter/drill-down (jika applicable)
- **Grouped Bars**: Multiple bars per category (colored by series)
- **Stacked Bars**: Stacked on top of each other

**Scatter Plot:**
- **Interaction**:
  - Hover point → tooltip (x, y values, label)
  - Zoom/pan (jika ada banyak points)
- **Correlation Line**: Regression line showing trend

**Heatmap (untuk Best Time to Post):**
- **Visual**: Grid dengan color intensity (gradient dari light to dark)
- **Interaction**: Hover cell → tooltip (hari, jam, metric value)
- **Color Legend**: Show scale (low → high)

### 19.6 Objek Feedback dan Notification

**Toast Notification:**
- **Position**: Top-right corner (desktop), top-center (mobile)
- **Duration**: 3-5 seconds, auto-dismiss
- **Types**:
  - Success: Green background, checkmark icon, "Success!"
  - Error: Red background, X icon, "Error!"
  - Info: Blue background, info icon
  - Warning: Yellow background, warning icon
- **Action**: 
  - Show on API response (success/error)
  - Manual dismiss: Click X atau swipe away
- **Queue**: Multiple toasts stack vertically

**Loading Spinner:**
- **Visual**: Rotating circle/spinner icon, primary color
- **Usage**:
  - Inside button: "Loading..." + spinner
  - Full page: Centered spinner dengan backdrop
  - Inline: Spinner di dalam card/section
- **Accessibility**: `aria-label="Loading..."`, `role="status"`

**Skeleton Loading:**
- **Visual**: Gray animated placeholders mimicking content shape
- **Usage**: Table rows, cards, text blocks saat initial load
- **Animation**: Pulse atau shimmer effect

**Progress Bar:**
- **Visual**: Filled bar (primary color) inside container (secondary color)
- **Usage**: Import progress, target achievement
- **Display**: Percentage text (e.g., "75%") alongside atau inside bar
- **States**: Idle (0%), In Progress (1-99%), Complete (100%)

**Badge / Chip:**
- **Visual**: Small rounded rectangle, colored background + text
- **Types**:
  - Status: "Aktif" (green), "Menunggu" (yellow), "Dijawab" (blue)
  - Performance: "Top 10%" (green), "Bottom 10%" (red)
- **Removable** (filter chips): X icon, onClick → remove chip

**Alert / Banner:**
- **Visual**: Full-width bar di top of content, colored background, icon + message
- **Usage**: System announcements, warnings sebelum destructive action
- **Dismissible**: X button to close (save dismiss state jika perlu)

### 19.7 Interaction Patterns

**Form Submission:**
1. User fills form fields
2. onChange → real-time field validation (optional)
3. User clicks Submit button
4. onSubmit → validate all fields
5. If invalid: Show error messages per field, focus first error field, show error toast
6. If valid: Button enters loading state, API call
7. Success: Show success toast, reset form OR close dialog OR navigate to success page
8. Error: Show error toast dengan message, button back to normal state

**Confirm Destructive Action:**
1. User clicks Delete/Remove button
2. Open confirmation dialog: "Apakah Anda yakin ingin menghapus [item]? Tindakan ini tidak dapat dibatalkan."
3. Buttons: "Batal" (ghost) + "Hapus" (destructive, red)
4. If Cancel: Close dialog
5. If Confirm: Loading state, API call, success toast, refresh data, close dialog

**Filter & Search Pattern:**
1. User changes filter values (date, checkboxes, search input)
2. onChange → debounce 300ms (untuk search input)
3. Update filteredData (client-side filter OR API call dengan query params)
4. Re-render table/list dengan filtered results
5. Show count: "Showing 45 of 120 results"
6. Reset button: Clear all filters → show all data

**Pagination Pattern:**
1. Display: "Page 1 of 10" + Previous/Next buttons + page number buttons
2. Click Next → load page 2, update URL query param `?page=2`
3. Scroll to top of table
4. Show loading state during fetch
5. Render new page data

**Export Data Pattern:**
1. User clicks Export button (CSV/Excel/PDF)
2. Button enters loading state: "Exporting..."
3. Generate file (client-side atau server-side)
4. Trigger download (browser download dialog)
5. Success toast: "Export berhasil. File sedang diunduh..."
6. Log export history to `riwayat_export` table

---

## 20. Matriks Persyaratan

Bagian ini menyediakan matriks traceability yang menghubungkan requirement fungsional dengan komponen implementasi dan tabel database yang terlibat.

### 20.1 Penjelasan Matriks

Matriks ini bertujuan untuk:
- Memastikan setiap requirement terimplementasi di komponen yang tepat
- Menunjukkan hubungan antara UI, logic, dan data
- Memudahkan tracking saat maintenance atau enhancement
- Verifikasi bahwa tidak ada requirement yang terlewat

Format:
- **Req ID**: Identifier requirement
- **Requirement**: Deskripsi fungsionalitas
- **Halaman/Komponen**: File/komponen yang mengimplementasikan
- **Tabel Database**: Tabel yang terlibat dalam requirement tersebut
- **Status**: Implemented / Planned / In Progress

### 20.2 Matriks Persyaratan Fungsional

| Req ID | Requirement | Halaman/Komponen | Tabel Database | Status |
|--------|-------------|------------------|----------------|---------|
| **AUTENTIKASI** |
| R-AUTH-01 | User dapat registrasi dengan email & password | `src/pages/Auth.tsx` | `auth.users` (Supabase Auth), `profil` | Implemented |
| R-AUTH-02 | User dapat login dengan email & password | `src/pages/Auth.tsx` | `auth.users`, `profil` | Implemented |
| R-AUTH-03 | User dapat logout dari sistem | `src/components/layout/AppLayout.tsx` | - | Implemented |
| R-AUTH-04 | Sistem auto-create profile setelah registrasi | Database trigger `handle_new_user()` | `profil` | Implemented |
| R-AUTH-05 | Admin memiliki akses ke semua fitur | RLS policies `is_admin()` | `profil` (peran='admin') | Implemented |
| **MANAJEMEN PROYEK & DATASET** |
| R-PROJ-01 | User dapat membuat project baru | `src/pages/ProjectNew.tsx` | `proyek` | Implemented |
| R-PROJ-02 | User dapat edit dan hapus project miliknya | `AppLayout.tsx` (dropdown menu) | `proyek` | Implemented |
| R-PROJ-03 | User dapat switch antar projects | `AppLayout.tsx` (project selector) | `proyek` | Implemented |
| R-PROJ-04 | User dapat menambah anggota ke project | (Future feature) | `anggota_proyek` | Planned |
| R-DS-01 | User dapat import dataset dari CSV | `src/pages/Import.tsx` | `dataset`, `postingan`, `log_impor` | Implemented |
| R-DS-02 | User dapat import dari Google Sheets | `src/pages/Import.tsx` | `dataset`, `postingan` | Implemented |
| R-DS-03 | Sistem validasi format & kolom CSV | `Import.tsx` (frontend), Backend validation | `log_impor` (kolom_hilang) | Implemented |
| R-DS-04 | User dapat activate/deactivate dataset | `AppLayout.tsx` (dataset selector) | `dataset` (dataset_aktif) | Implemented |
| R-DS-05 | User dapat delete dataset | (Admin/Owner only) | `dataset`, `postingan` (cascade) | Implemented |
| **DASHBOARD & ANALITIK** |
| R-DASH-01 | Dashboard menampilkan KPI utama (Total Posts, Avg ER, Followers, Reach, Save Rate, Share Rate) | `src/pages/Dashboard.tsx` | `postingan` | Implemented |
| R-DASH-02 | Dashboard menampilkan tren ER mingguan | `Dashboard.tsx` (LineChart) | `postingan` | Implemented |
| R-DASH-03 | Dashboard menampilkan distribusi platform | `Dashboard.tsx` (BarChart) | `postingan`, `platform` | Implemented |
| R-DASH-04 | Dashboard menampilkan distribusi tipe konten | `Dashboard.tsx` (BarChart) | `postingan`, `jenis_konten` | Implemented |
| R-DASH-05 | User dapat customize widgets dashboard | `Dashboard.tsx` (Settings dialog) | `profil` (preferensi_dashboard) | Implemented |
| R-DASH-06 | Sistem generate insight otomatis per chart | `Dashboard.tsx` (generateInsights) | `postingan` | Implemented |
| **CONTENT PERFORMANCE** |
| R-PERF-01 | User dapat melihat list semua postingan dengan detail metrics | `src/pages/Performa.tsx` | `postingan`, `platform`, `jenis_konten` | Implemented |
| R-PERF-02 | User dapat filter berdasarkan date range | `Performa.tsx` (date inputs) | `postingan` | Implemented |
| R-PERF-03 | User dapat filter berdasarkan platform | `Performa.tsx` (checkboxes) | `postingan`, `platform` | Implemented |
| R-PERF-04 | User dapat filter berdasarkan content type | `Performa.tsx` (checkboxes) | `postingan`, `jenis_konten` | Implemented |
| R-PERF-05 | User dapat search berdasarkan caption | `Performa.tsx` (search input) | `postingan` (teks_caption) | Implemented |
| R-PERF-06 | User dapat sort by ER / Reach / Engagement | `Performa.tsx` (button group) | `postingan` | Implemented |
| R-PERF-07 | Sistem menampilkan performance badge (Top 10%, Bottom 10%) | `Performa.tsx` (getPerformanceBadge) | `postingan` | Implemented |
| R-PERF-08 | User dapat export filtered data ke CSV | `Performa.tsx` (handleExport) | - | Implemented |
| R-PERF-09 | User dapat save filter presets | `SaveFilterDialog.tsx` | `filter_tersimpan` | Implemented |
| R-PERF-10 | Insight otomatis berdasarkan top performers | `Performa.tsx` (generateInsight) | `postingan` | Implemented |
| **BEST TIME TO POST** |
| R-TIME-01 | Sistem analisis waktu terbaik by ER / Engagement / Reach | `src/pages/WaktuTerbaik.tsx` | `postingan` | Implemented |
| R-TIME-02 | User dapat pilih metrik untuk analisis | `WaktuTerbaik.tsx` (metric selector) | `postingan` | Implemented |
| R-TIME-03 | User dapat pilih periode (All / Week / Month) | `WaktuTerbaik.tsx` (period selector) | `postingan` | Implemented |
| R-TIME-04 | User dapat compare dengan periode sebelumnya | `WaktuTerbaik.tsx` (comparison toggle) | `postingan` | Implemented |
| R-TIME-05 | Sistem tampilkan Top 3 time slots | `WaktuTerbaik.tsx` (topSlots) | `postingan` | Implemented |
| R-TIME-06 | Sistem tampilkan heatmap hari x jam | `WaktuTerbaik.tsx` (heatmapData) | `postingan` | Implemented |
| R-TIME-07 | User dapat filter by platform & content type | `WaktuTerbaik.tsx` (checkboxes) | `postingan`, `platform`, `jenis_konten` | Implemented |
| **AUDIENCE & GROWTH** |
| R-AUD-01 | Sistem menampilkan tren followers harian | `src/pages/Audiens.tsx` (LineChart) | `postingan` (jumlah_followers) | Implemented |
| R-AUD-02 | Sistem menampilkan frekuensi posting mingguan | `Audiens.tsx` (BarChart) | `postingan` | Implemented |
| R-AUD-03 | Sistem analisis korelasi reach vs engagement | `Audiens.tsx` (ScatterChart + R²) | `postingan` | Implemented |
| R-AUD-04 | Insight pertumbuhan dan correlation strength | `Audiens.tsx` (generateInsight) | `postingan` | Implemented |
| **DATASET COMPARISON** |
| R-COMP-01 | User dapat pilih 2-3 dataset untuk compare | `src/pages/Perbandingan.tsx` | `dataset` | Implemented |
| R-COMP-02 | Sistem compare KPI antar datasets | `Perbandingan.tsx` (comparison cards) | `postingan` | Implemented |
| R-COMP-03 | Sistem tampilkan grouped bar chart comparison | `Perbandingan.tsx` (BarChart) | `postingan` | Implemented |
| R-COMP-04 | Insight dataset mana yang unggul di metrik apa | `Perbandingan.tsx` (generateInsight) | `postingan` | Implemented |
| **PLANNING TOOLS** |
| R-PLAN-01 | User dapat create/edit/delete campaigns | `src/pages/Kampanye.tsx` | `kampanye` | Implemented |
| R-PLAN-02 | User dapat assign posts ke campaigns | `Import.tsx` (saat import) | `postingan` (id_kampanye) | Implemented |
| R-PLAN-03 | User dapat set KPI targets | `src/pages/TargetKPI.tsx` | `target_kpi` | Implemented |
| R-PLAN-04 | Sistem track progress vs targets | `TargetKPI.tsx` (progress bars) | `target_kpi`, `postingan` | Implemented |
| **AI TOOLS** |
| R-AI-01 | User dapat generate caption dengan AI | `src/pages/CaptionGenerator.tsx` | - | Implemented |
| R-AI-02 | AI caption call edge function | `supabase/functions/generate-caption/` | - | Implemented |
| R-AI-03 | Edge function call Google Gemini API | Edge function code | - (external API) | Implemented |
| R-AI-04 | User dapat copy generated caption | `CaptionGenerator.tsx` (copy button) | - | Implemented |
| **Q&A / HELP SYSTEM** |
| R-QA-01 | User dapat submit pertanyaan | `src/pages/Bantuan.tsx` | `pertanyaan` | Implemented |
| R-QA-02 | User dapat lihat status pertanyaan | `Bantuan.tsx` (questions list) | `pertanyaan` | Implemented |
| R-QA-03 | User dapat rate jawaban | `RatingDialog.tsx` | `pertanyaan` (rating, komentar_rating) | Implemented |
| R-QA-04 | Admin dapat lihat semua pertanyaan | `src/pages/BantuanAdmin.tsx` | `pertanyaan` | Implemented |
| R-QA-05 | Admin dapat jawab pertanyaan | `BantuanAdmin.tsx` (answer dialog) | `pertanyaan` (jawaban, dijawab_oleh) | Implemented |
| R-QA-06 | Sistem kirim email notif ke admin (new question) | Database trigger + Edge Function | `pertanyaan` | Implemented |
| R-QA-07 | Sistem kirim email notif ke user (answered) | Database trigger + Edge Function | `pertanyaan` | Implemented |
| **NOTES & EXPORT** |
| R-NOTE-01 | User dapat add notes per scope (global/week/post) | `NotesDialog.tsx` | `catatan` | Implemented |
| R-NOTE-02 | User dapat edit/delete own notes | `NotesDialog.tsx` | `catatan` | Implemented |
| R-NOTE-03 | User dapat export data dengan charts ke PDF | `ExportButton.tsx` (jsPDF + html2canvas) | `riwayat_export` | Implemented |
| R-NOTE-04 | User dapat export data ke Excel | `ExportButton.tsx` (xlsx library) | `riwayat_export` | Implemented |
| R-NOTE-05 | Sistem log export history | `ExportButton.tsx` | `riwayat_export` | Implemented |
| **LAPORAN** |
| R-REP-01 | User dapat generate comprehensive report | `src/pages/Laporan.tsx` | `postingan` | Implemented |
| R-REP-02 | Report include KPIs, top/worst posts, best times, best content types | `Laporan.tsx` (generateReport) | `postingan`, `platform`, `jenis_konten` | Implemented |
| R-REP-03 | User dapat print report | `Laporan.tsx` (print button) | - | Implemented |
| **MASTER DATA (ADMIN)** |
| R-MAST-01 | Admin dapat CRUD platforms | `src/pages/Platform.tsx` | `platform` | Implemented |
| R-MAST-02 | Admin dapat CRUD content types | (Similar pattern) | `jenis_konten` | Implemented |
| **COMPETITOR ANALYSIS** |
| R-COMP-01 | User dapat add competitors | `src/pages/KompetitorAnalysis.tsx` | `kompetitor` | Implemented |
| R-COMP-02 | User dapat input competitor data | `KompetitorAnalysis.tsx` | `data_kompetitor` | Implemented |
| R-COMP-03 | Sistem compare own vs competitor metrics | `KompetitorAnalysis.tsx` | `postingan`, `kompetitor`, `data_kompetitor` | Implemented |

### 20.3 Matriks Non-Functional Requirements

| NFR ID | Requirement | Implementation | Status |
|--------|-------------|----------------|---------|
| **PERFORMANCE** |
| NFR-PERF-01 | Page load < 3 seconds | React lazy loading, code splitting | Implemented |
| NFR-PERF-02 | Chart rendering < 1 second untuk 1000 posts | Recharts optimization, data aggregation | Implemented |
| NFR-PERF-03 | API response < 2 seconds | Database indexes, RLS optimization | Implemented |
| **USABILITY** |
| NFR-USE-01 | Responsive design (mobile, tablet, desktop) | Tailwind responsive classes | Implemented |
| NFR-USE-02 | Consistent UI components | shadcn/ui design system | Implemented |
| NFR-USE-03 | Dark mode support | CSS variables dengan theme switching | Implemented |
| NFR-USE-04 | Accessibility WCAG 2.1 Level AA | Semantic HTML, ARIA labels, keyboard nav | Partial |
| **SECURITY** |
| NFR-SEC-01 | Row Level Security (RLS) untuk semua tabel | Supabase RLS policies | Implemented |
| NFR-SEC-02 | Password minimal 6 karakter | Supabase Auth config | Implemented |
| NFR-SEC-03 | Auto-confirm email (non-production) | Supabase Auth config | Implemented |
| NFR-SEC-04 | API secrets stored securely | Environment variables, not in code | Implemented |
| **RELIABILITY** |
| NFR-REL-01 | Error handling dengan user-friendly messages | Try-catch + toast notifications | Implemented |
| NFR-REL-02 | Data validation frontend & backend | Zod schemas, database constraints | Implemented |
| NFR-REL-03 | Import failure rollback | Transaction dalam database | Partial |
| **MAINTAINABILITY** |
| NFR-MAIN-01 | Modular component structure | React components organized by feature | Implemented |
| NFR-MAIN-02 | Reusable UI components | shadcn/ui + custom components | Implemented |
| NFR-MAIN-03 | TypeScript untuk type safety | TypeScript throughout project | Implemented |
| NFR-MAIN-04 | Auto-generated database types | Supabase types.ts | Implemented |

### 20.4 Ringkasan Coverage

**Requirement Implementation Coverage:**
- Total Functional Requirements: 68
- Implemented: 66
- Planned/In Progress: 2
- **Coverage: 97%**

**Database Table Usage:**
- Total Tables: 17
- Used in Requirements: 17
- **Coverage: 100%**

**Key Components:**
- Pages: 17 (Auth, Dashboard, Performa, WaktuTerbaik, Audiens, Perbandingan, Kampanye, TargetKPI, CaptionGenerator, Bantuan, BantuanAdmin, Import, Laporan, Platform, KompetitorAnalysis, AdminTest, NotFound)
- Reusable Components: 15+ (AppLayout, InsightCard, NotesDialog, ExportButton, SaveFilterDialog, RatingDialog, EditQuestionDialog, NavLink, dll)
- UI Components (shadcn): 40+ components
- Edge Functions: 3 (generate-caption, notify-admin-new-question, notify-user-question-answered)

---

## PENUTUP

Dokumen Software Design Document (SDD) untuk **Sistem Analisis Performa Konten Digital** ini telah menyajikan rancangan teknis yang komprehensif dari sistem, meliputi:

1. **Arsitektur Sistem** yang menggunakan teknologi modern (React, TypeScript, Supabase, Tailwind CSS)
2. **Rancangan Database** dengan 17 tabel utama, RLS policies, dan database functions
3. **Rancangan Komponen** dengan UML diagrams (Use Case, Activity, Sequence) untuk proses-proses kunci
4. **Rancangan Antarmuka** dengan design system yang konsisten dan responsive
5. **Deskripsi Detail** untuk 17+ halaman/layar aplikasi
6. **Matriks Persyaratan** yang menunjukkan traceability dari requirement ke implementasi

Sistem ini dirancang untuk memenuhi kebutuhan content creator, UMKM, dan brand dalam menganalisis performa konten sosial media secara data-driven, dengan fitur-fitur seperti:
- Dashboard analytics dengan insight otomatis
- Content performance analysis dengan filtering & sorting
- Best time to post analysis
- Dataset comparison
- AI-powered caption generator
- Q&A system dengan email notifications
- Comprehensive reporting

Implementasi mengikuti best practices dalam software engineering: modular architecture, reusable components, type safety dengan TypeScript, security dengan RLS, dan user experience yang intuitive dengan design system yang konsisten.

**Disusun oleh:**  
Maarif Alawi  
Tanggal: 30 November 2025  
Versi: 1.0 (Final)

---

*END OF DOCUMENT*
