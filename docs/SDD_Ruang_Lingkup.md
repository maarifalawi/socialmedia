# Software Design Document (SDD)
## Ruang Lingkup Sistem

### 1. Arsitektur dan Basis Teknologi

#### 1.1 Basis Website dan Web Server
Sistem ini dibangun menggunakan arsitektur **Single Page Application (SPA)** dengan teknologi:

**Frontend:**
- **Framework**: React 18.3.1 dengan TypeScript
- **Build Tool**: Vite (untuk development dan production build)
- **Styling**: Tailwind CSS dengan shadcn/ui component library
- **State Management**: React Context API (AuthContext, AppContext)
- **Routing**: React Router DOM v6
- **Data Fetching**: TanStack Query (React Query) v5

**Backend:**
- **Platform**: Lovable Cloud (powered by Supabase)
- **Database**: PostgreSQL 13.0.5
- **Authentication**: Supabase Auth dengan JWT tokens
- **API**: RESTful API melalui Supabase Client
- **Edge Functions**: Deno-based serverless functions
- **Storage**: Supabase Storage (bucket: avatars)

#### 1.2 Paradigma Computer Server
Sistem menggunakan paradigma **Serverless Architecture** dengan karakteristik:

1. **Backend as a Service (BaaS)**: Menggunakan Supabase untuk mengelola database, autentikasi, dan storage
2. **Function as a Service (FaaS)**: Edge Functions untuk logika bisnis kompleks seperti:
   - `generate-caption`: AI-powered caption generation
   - `notify-admin-new-question`: Email notification untuk pertanyaan baru
   - `notify-user-question-answered`: Email notification ketika pertanyaan dijawab
3. **Database Security**: Row Level Security (RLS) policies untuk mengontrol akses data di level database
4. **Stateless Authentication**: JWT-based authentication tanpa session server

### 2. Kesesuaian dengan SRS (Software Requirements Specification)

Sistem dirancang untuk memenuhi kebutuhan analitik media sosial dengan fitur-fitur:

1. **Manajemen Data**: Import dan kelola data postingan dari berbagai platform
2. **Analitik**: Analisis performa, waktu terbaik posting, audiens, dan insight
3. **Perencanaan**: Target KPI dan manajemen kampanye
4. **AI Tools**: Caption generator dan analisis kompetitor
5. **Pelaporan**: Generate laporan performa dan perbandingan
6. **Support**: Sistem bantuan dengan Q&A

### 3. Hak Akses Pengguna (Access Control)

#### 3.1 Role System Overview
Sistem menggunakan **Role-Based Access Control (RBAC)** dengan dua role utama yang didefinisikan dalam enum `app_role`:
- `admin`
- `user`

#### 3.2 ADMIN - Administrator Sistem
**Definisi**: Admin adalah pengelola sistem yang memiliki akses penuh untuk mengatur konfigurasi sistem, mengelola master data, dan memberikan support kepada pengguna.

**Hak Akses Admin:**

1. **Manajemen Master Data Platform**
   - Membuat, membaca, mengubah, dan menghapus data platform media sosial (tabel: `platform`)
   - Mengatur status aktif/nonaktif platform
   - Mengelola kode dan warna identitas platform
   - RLS Policy: `Admins can insert/update/delete platforms`

2. **Manajemen Master Data Jenis Konten**
   - Membuat, membaca, mengubah, dan menghapus jenis konten (tabel: `jenis_konten`)
   - Mengatur status aktif/nonaktif jenis konten
   - Mengelola kode jenis konten
   - RLS Policy: `Admins can insert/update/delete content types`

3. **Manajemen Sistem Bantuan (Help/Q&A)**
   - Melihat semua pertanyaan dari seluruh pengguna (tabel: `pertanyaan`)
   - Menjawab pertanyaan pengguna
   - Mengubah status pertanyaan (menunggu → dijawab)
   - Menerima notifikasi email otomatis ketika ada pertanyaan baru
   - RLS Policy: `Admins can view all questions`, `Admins can answer questions`

4. **Monitoring Sistem**
   - Akses ke halaman admin khusus (`/platform`, `/bantuan-admin`, `/admin-test`)
   - Melihat statistik pertanyaan dan rating dari pengguna
   - Monitoring aktivitas sistem

**Halaman Khusus Admin:**
- `/platform`: Kelola master data platform
- `/bantuan-admin`: Kelola sistem Q&A dan jawab pertanyaan
- `/admin-test`: Testing dan monitoring sistem

**Batasan Admin:**
- Admin TIDAK dapat mengakses data proyek pengguna lain tanpa izin
- Admin TIDAK dapat mengubah role pengguna lain (RLS Policy mencegah perubahan role)

#### 3.3 USER - Pengguna Standar
**Definisi**: User adalah pengguna akhir yang menggunakan sistem untuk menganalisis data media sosial mereka, membuat laporan, dan mendapatkan insight untuk strategi konten.

**Hak Akses User:**

1. **Manajemen Profil Pribadi**
   - Membaca profil sendiri (tabel: `profil`)
   - Mengubah data profil: nama lengkap, foto profil, bahasa, preferensi dashboard
   - TIDAK dapat mengubah role sendiri
   - RLS Policy: `Users can update own profile but not role`

2. **Manajemen Proyek**
   - Membuat proyek baru (tabel: `proyek`)
   - Melihat proyek yang dimiliki atau menjadi anggota
   - Mengubah dan menghapus proyek yang dimiliki
   - Menambah/menghapus anggota proyek (tabel: `anggota_proyek`)
   - RLS Policy: `Users can create own projects`, `Users can view accessible projects`

3. **Role Dalam Proyek** (Project-Level Roles)
   Setiap user dalam proyek memiliki role spesifik (enum `project_role`):
   
   a. **Owner (Pemilik Proyek)**
      - Semua akses edit dan delete proyek
      - Mengelola anggota proyek
      - Menghapus proyek
   
   b. **Editor**
      - Membuat dan mengedit dataset
      - Import data postingan
      - Membuat dan mengedit kampanye, target KPI
      - Membuat catatan
   
   c. **Viewer (Peninjau)**
      - Hanya dapat melihat data proyek
      - Tidak dapat melakukan perubahan
      - Akses read-only ke laporan dan analitik

4. **Manajemen Dataset**
   - Membuat dataset baru (tabel: `dataset`)
   - Import data dari CSV atau Google Sheets
   - Mengelola dataset dalam proyek yang accessible
   - Melihat log import (tabel: `log_impor`)
   - RLS Policy: `Users can manage datasets for accessible projects`

5. **Manajemen Data Postingan**
   - Menambah, mengubah, menghapus data postingan (tabel: `postingan`)
   - Hanya untuk proyek yang memiliki akses
   - Data mencakup: platform, jenis konten, caption, metrics (likes, comments, shares, dll)
   - RLS Policy: `Users can manage posts for accessible projects`

6. **Analitik dan Pelaporan**
   - Akses ke semua halaman analitik:
     - `/dashboard`: Overview KPI dan metrics
     - `/performa`: Analisis performa postingan
     - `/waktu-terbaik`: Analisis waktu posting optimal
     - `/audiens`: Analisis karakteristik audiens
     - `/ringkasan-insight`: Insight otomatis dari data
   - Export data ke Excel
   - Generate laporan PDF
   - Riwayat export (tabel: `riwayat_export`)

7. **Perencanaan Konten**
   - Membuat dan mengelola target KPI (tabel: `target_kpi`)
   - Membuat dan mengelola kampanye (tabel: `kampanye`)
   - Menghubungkan postingan dengan kampanye

8. **AI Tools**
   - Menggunakan AI Caption Generator
   - Menganalisis kompetitor (tabel: `kompetitor`, `data_kompetitor`)
   - Menambah dan mengelola data kompetitor

9. **Filter dan Preferensi**
   - Menyimpan filter untuk halaman tertentu (tabel: `filter_tersimpan`)
   - Mengatur preferensi dashboard personal
   - RLS Policy: `Users can manage own saved filters`

10. **Catatan**
    - Membuat catatan dengan scope berbeda (tabel: `catatan`):
      - Scope: `post` (catatan per postingan)
      - Scope: `week` (catatan per minggu)
      - Scope: `global` (catatan umum proyek)
    - RLS Policy: `Users can manage notes for accessible projects`

11. **Sistem Bantuan**
    - Membuat pertanyaan baru (tabel: `pertanyaan`)
    - Melihat pertanyaan sendiri dan jawabannya
    - Mengedit/menghapus pertanyaan yang belum dijawab
    - Memberikan rating dan komentar untuk jawaban
    - Menerima notifikasi email ketika pertanyaan dijawab
    - RLS Policy: `Users can create questions`, `Users can rate answered questions`

**Batasan User:**
- Tidak dapat mengakses data proyek milik user lain
- Tidak dapat mengubah master data (platform, jenis konten)
- Tidak dapat melihat atau menjawab pertanyaan user lain di sistem bantuan

### 4. Security Policies (Row Level Security)

Setiap tabel dilindungi dengan RLS policies:

#### 4.1 Project-Based Access Control
Fungsi `has_project_access(project_id)` mengecek apakah user:
- Pemilik proyek (id_pemilik = auth.uid())
- Anggota proyek (ada di tabel anggota_proyek)

Tables yang menggunakan: `proyek`, `dataset`, `postingan`, `kampanye`, `target_kpi`, `catatan`, `pertanyaan`

#### 4.2 Admin-Only Access
Fungsi `is_admin()` mengecek apakah user memiliki role 'admin' di tabel profil.

Tables yang menggunakan: `platform`, `jenis_konten`

#### 4.3 Owner-Only Access
User hanya dapat mengakses data yang mereka miliki sendiri.

Tables: `profil`, `filter_tersimpan`, `riwayat_export`

### 5. Perubahan yang Dibuat dalam Sistem

#### 5.1 Database Schema
- **16 Tables**: proyek, profil, dataset, postingan, kampanye, target_kpi, platform, jenis_konten, kompetitor, data_kompetitor, catatan, pertanyaan, anggota_proyek, filter_tersimpan, log_impor, riwayat_export
- **5 Enums**: app_role, project_role, scope_type, source_type, import_status, period_type
- **6 Functions**: has_project_access, is_admin, get_user_display_name, handle_new_user, notify_admin_new_question, notify_user_question_answered
- **1 View**: user_display_info
- **RLS Policies**: 40+ policies untuk mengamankan akses data

#### 5.2 Authentication System
- Signup dengan email dan password
- Auto-confirm email (untuk development)
- Profile creation otomatis via trigger `handle_new_user()`
- JWT-based session management
- Protected routes untuk halaman yang memerlukan autentikasi

#### 5.3 Edge Functions
1. **generate-caption**: 
   - Input: topic, tone, platform, max_words
   - Output: AI-generated caption
   - Integration: Google Gemini API

2. **notify-admin-new-question**:
   - Trigger: Insert pada tabel pertanyaan
   - Action: Kirim email ke admin via Resend API
   - Template: Notifikasi pertanyaan baru

3. **notify-user-question-answered**:
   - Trigger: Update status pertanyaan menjadi 'dijawab'
   - Action: Kirim email ke user via Resend API
   - Template: Notifikasi jawaban tersedia

#### 5.4 Frontend Components
- **20+ Pages**: Dashboard, Import, Performa, Audiens, dll
- **Custom Components**: InsightCard, ExportButton, RatingDialog, NotesDialog, dll
- **UI Components**: 45+ shadcn/ui components
- **Layout System**: AppLayout dengan sidebar navigation, breadcrumbs, project selector
- **Theme System**: Dark/light mode support dengan CSS variables

### 6. Output yang Dihasilkan Sistem

#### 6.1 Analitik dan Metrics
1. **KPI Metrics**:
   - Total postingan
   - Average Engagement Rate (ER)
   - Total Reach
   - Jumlah Followers
   - Save Rate
   - Share Rate

2. **Performance Analysis**:
   - Top performing posts
   - Worst performing posts
   - Trend performa dari waktu ke waktu
   - Perbandingan antar periode

3. **Time Analysis**:
   - Best posting times per hari
   - Best posting times per jam
   - Analisis pola engagement berdasarkan waktu

4. **Audience Insights**:
   - Demographics analysis
   - Engagement patterns
   - Growth trends

5. **Content Analysis**:
   - Best performing content types
   - Best performing platforms
   - Engagement per jenis konten

#### 6.2 Laporan
1. **Performance Report**:
   - Summary KPI periode tertentu
   - Top/worst posts dengan detail metrics
   - Best posting times
   - Best content types
   - Export ke PDF

2. **Comparison Report**:
   - Perbandingan multi-dataset
   - Perbandingan antar periode
   - Visualisasi dengan charts (recharts)

3. **Competitor Analysis**:
   - Perbandingan metrics dengan kompetitor
   - Trend analysis kompetitor
   - Benchmarking

#### 6.3 Export Files
1. **Excel Export**:
   - Raw data postingan
   - Filtered data berdasarkan kriteria
   - Format: .xlsx dengan library xlsx

2. **PDF Report**:
   - Laporan performa dengan charts
   - Generated via html2canvas + jspdf
   - Professional formatting

#### 6.4 AI-Generated Content
1. **Caption Suggestions**:
   - AI-generated captions berdasarkan:
     - Topic
     - Tone of voice
     - Target platform
     - Word count limit
   - Multiple variations

2. **Insights**:
   - Automated insights dari data
   - Recommendations untuk strategi konten
   - Actionable suggestions

#### 6.5 Notifications
1. **Email Notifications**:
   - Notifikasi pertanyaan baru ke admin
   - Notifikasi jawaban tersedia ke user
   - Platform: Resend API

2. **In-App Notifications**:
   - Toast notifications untuk actions
   - Success/error feedback
   - Real-time updates via Supabase realtime (if enabled)

### 7. Data Flow dan Proses Bisnis

#### 7.1 User Registration Flow
1. User signup dengan email + password
2. Trigger `handle_new_user()` membuat record di tabel `profil` dengan role 'user'
3. User redirect ke dashboard
4. User membuat proyek pertama

#### 7.2 Data Import Flow
1. User membuat proyek baru
2. User membuat dataset (upload CSV atau connect Google Sheets)
3. System validasi data dan creates `log_impor`
4. Data diinsert ke tabel `postingan` dengan validasi:
   - Platform ID valid
   - Content type ID valid
   - Metrics calculation (ER, total engagement)
5. Data tersedia untuk analitik

#### 7.3 Analytics Flow
1. User select proyek dan dataset aktif
2. System query data dengan RLS policies
3. Frontend perform calculations dan aggregations
4. Visualisasi dengan recharts
5. User dapat export atau save filter

#### 7.4 Help System Flow
1. User submit pertanyaan via `/bantuan`
2. Insert ke tabel `pertanyaan` dengan status 'menunggu'
3. Trigger `notify_admin_new_question()` kirim email ke admin
4. Admin jawab via `/bantuan-admin`
5. Trigger `notify_user_question_answered()` kirim email ke user
6. User dapat rating dan comment

### 8. Non-Functional Requirements

#### 8.1 Performance
- SPA untuk fast navigation tanpa full page reload
- React Query untuk caching dan optimistic updates
- Lazy loading untuk components besar
- Indexed database queries dengan proper foreign keys

#### 8.2 Security
- All data protected dengan RLS policies
- JWT authentication dengan secure tokens
- Password hashing via Supabase Auth
- HTTPS untuk semua communications
- Environment variables untuk sensitive data (API keys)

#### 8.3 Scalability
- Serverless architecture dapat scale otomatis
- Database connection pooling via Supabase
- CDN untuk static assets
- Edge functions di distributed locations

#### 8.4 Maintainability
- TypeScript untuk type safety
- Component-based architecture
- Reusable UI components (shadcn/ui)
- Clear folder structure
- Database types auto-generated

#### 8.5 Usability
- Responsive design (mobile, tablet, desktop)
- Dark/light mode
- Breadcrumb navigation
- Toast notifications untuk user feedback
- Loading states untuk async operations
- Error handling dengan user-friendly messages

---

**Versi**: 1.0  
**Tanggal**: 2025-01-28  
**Status**: Active Development  
