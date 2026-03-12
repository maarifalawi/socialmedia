# Software Design Document (SDD)

---

# SOCIAL MEDIA ANALYTICS DASHBOARD

## Dokumen Rancangan Perangkat Lunak

| **Informasi Dokumen** | |
|---|---|
| **Nama Penyusun** | Maarif Alawi |
| **Jabatan** | Ketua Tim Development |
| **Tanggal** | 6 Januari 2025 |
| **Versi** | 1.0 |

---

## Daftar Isi

1. [PENDAHULUAN](#1-pendahuluan)
   - 1.1 [Tujuan](#11-tujuan)
   - 1.2 [Ruang Lingkup](#12-ruang-lingkup)
   - 1.3 [Ikhtisar](#13-ikhtisar)
   - 1.4 [Referensi Material](#14-referensi-material)
   - 1.5 [Definisi dan Singkatan](#15-definisi-dan-singkatan)
2. [GAMBARAN UMUM SISTEM](#2-gambaran-umum-sistem)
3. [ARSITEKTUR SISTEM](#3-arsitektur-sistem)
   - 3.1 [Rancangan Arsitektur](#31-rancangan-arsitektur)
     - 3.1.1 [Use Case User](#311-use-case-user)
     - 3.1.2 [Use Case Admin](#312-use-case-admin)
     - 3.1.3 [Activity Diagram User](#313-activity-diagram-user)
     - 3.1.4 [Activity Diagram Admin](#314-activity-diagram-admin)
   - 3.2 [Deskripsi Dekomposisi](#32-deskripsi-dekomposisi)
   - 3.3 [Alasan Rancangan](#33-alasan-rancangan)
4. [RANCANGAN DATA](#4-rancangan-data)
   - 4.1 [Deskripsi Data](#41-deskripsi-data)
   - 4.2 [Kamus Data](#42-kamus-data)
   - 4.3 [Entity Relationship Diagram](#43-entity-relationship-diagram)
5. [RANCANGAN KOMPONEN](#5-rancangan-komponen)
   - 5.1 [Admin Sequence](#51-admin-sequence)
   - 5.2 [User Sequence](#52-user-sequence)
6. [RANCANGAN ANTARMUKA](#6-rancangan-antarmuka)
   - 6.1 [Gambaran Umum Antarmuka](#61-gambaran-umum-antarmuka)
     - 6.1.1 [Struktur Navigasi Admin](#611-struktur-navigasi-admin)
     - 6.1.2 [Struktur Navigasi User](#612-struktur-navigasi-user)
   - 6.2 [Tampilan Layar](#62-tampilan-layar)
   - 6.3 [Objek Layar dan Tindakan](#63-objek-layar-dan-tindakan)
   - 6.4 [Matriks Persyaratan](#64-matriks-persyaratan)
7. [LAMPIRAN](#7-lampiran)

---

# 1. PENDAHULUAN

Dokumen Software Design Document (SDD) untuk **Social Media Analytics Dashboard** merupakan laporan teknis yang menjelaskan bagaimana sistem dikembangkan dan diimplementasikan berdasarkan kebutuhan pengguna UMKM (Usaha Mikro, Kecil, dan Menengah) dalam mengelola dan menganalisis performa konten sosial media mereka.

Dokumen ini berisi penjabaran arsitektur sistem, rancangan basis data, komponen utama, serta desain antarmuka pengguna yang berfungsi sebagai pedoman dalam membangun sistem analytics yang efisien, aman, dan mudah digunakan.

SDD ini disusun untuk memastikan setiap aspek teknis, mulai dari struktur hingga alur proses, dirancang secara sistematis agar mendukung kemudahan pengguna dalam:
- Melakukan impor data konten sosial media
- Menganalisis performa engagement rate, reach, dan metrik lainnya
- Membandingkan performa antar platform dan jenis konten
- Menghasilkan insight yang actionable untuk strategi konten

---

## 1.1 Tujuan

Software Design Document ini menyediakan detail desain dari **Social Media Analytics Dashboard** berbasis website. Pengguna yang diharapkan adalah:

1. **UMKM dan Content Creator** - Sebagai pengguna utama yang akan menggunakan sistem untuk menganalisis performa konten sosial media mereka
2. **Social Media Manager** - Sebagai pengelola yang membutuhkan insight untuk optimasi strategi konten
3. **Tim Development** - Sebagai referensi teknis untuk pengembangan dan maintenance sistem

Dokumen ini berfungsi sebagai:
- Referensi bagi pengembang sistem informasi
- Panduan teknis untuk implementasi dan pengembangan lanjutan
- Dokumentasi arsitektur dan keputusan desain

---

## 1.2 Ruang Lingkup

Dokumen ini berisi deskripsi lengkap dari desain sistem informasi **Social Media Analytics Dashboard**. 

### Arsitektur Dasar
- **Frontend**: React 18.3.1 dengan TypeScript
- **Backend**: Supabase (PostgreSQL, Authentication, Edge Functions)
- **Paradigma**: Serverless Architecture dengan BaaS (Backend-as-a-Service)

### Teknologi Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | React 18.3.1 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State Management** | React Context API + TanStack Query |
| **Routing** | React Router DOM v6 |
| **Database** | PostgreSQL (via Supabase) |
| **Authentication** | Supabase Auth |
| **API** | RESTful via Supabase Auto-generated |
| **Serverless Functions** | Deno-based Edge Functions |
| **Charts** | Recharts |
| **Export** | jsPDF + xlsx |

### Hak Akses Sistem

| Role | Deskripsi |
|------|-----------|
| **Admin** | Akses penuh untuk konfigurasi sistem, manajemen master data (platform, jenis konten), dan pengelolaan bantuan |
| **User** | Akses untuk manajemen proyek pribadi, impor data, analisis, dan pelaporan |
| **Owner** | Pemilik proyek dengan kontrol penuh atas anggota proyek |
| **Editor** | Anggota proyek yang dapat mengedit data |
| **Viewer** | Anggota proyek yang hanya dapat melihat data |

---

## 1.3 Ikhtisar

| Bagian | Deskripsi |
|--------|-----------|
| **Bagian 1** | Berisi gambaran umum fungsi dari Software Design Description |
| **Bagian 2** | Menjelaskan gambaran umum sistem dan konteks penggunaannya |
| **Bagian 3** | Menjelaskan arsitektur sistem termasuk use case dan activity diagram |
| **Bagian 4** | Mendeskripsikan rancangan data dan struktur database |
| **Bagian 5** | Menjelaskan komponen sistem dan sequence diagram |
| **Bagian 6** | Mendeskripsikan rancangan antarmuka pengguna |
| **Bagian 7** | Lampiran dan dokumentasi tambahan |

---

## 1.4 Referensi Material

| No | Referensi | Deskripsi |
|----|-----------|-----------|
| 1 | React Documentation | https://react.dev - Dokumentasi resmi React |
| 2 | Supabase Documentation | https://supabase.com/docs - Dokumentasi Supabase |
| 3 | Tailwind CSS | https://tailwindcss.com - Framework CSS |
| 4 | shadcn/ui | https://ui.shadcn.com - Component library |
| 5 | TypeScript Handbook | https://www.typescriptlang.org/docs - Dokumentasi TypeScript |
| 6 | Recharts | https://recharts.org - Library charting |
| 7 | IEEE Std 1016-2009 | Standar Software Design Description |

---

## 1.5 Definisi dan Singkatan

| Istilah/Singkatan | Definisi |
|-------------------|----------|
| **API** | Application Programming Interface - Antarmuka pemrograman aplikasi |
| **BaaS** | Backend-as-a-Service - Layanan backend terkelola |
| **CRUD** | Create, Read, Update, Delete - Operasi dasar database |
| **CSV** | Comma-Separated Values - Format file data |
| **ER** | Engagement Rate - Tingkat keterlibatan audiens |
| **FaaS** | Function-as-a-Service - Layanan fungsi serverless |
| **JWT** | JSON Web Token - Token autentikasi |
| **KPI** | Key Performance Indicator - Indikator kinerja utama |
| **RLS** | Row Level Security - Keamanan tingkat baris pada database |
| **SPA** | Single Page Application - Aplikasi halaman tunggal |
| **UI/UX** | User Interface/User Experience - Antarmuka dan pengalaman pengguna |
| **UMKM** | Usaha Mikro, Kecil, dan Menengah |
| **UUID** | Universally Unique Identifier - Pengenal unik universal |

---

# 2. GAMBARAN UMUM SISTEM

## 2.1 Deskripsi Sistem

**Social Media Analytics Dashboard** adalah aplikasi web berbasis SPA (Single Page Application) yang dirancang khusus untuk membantu UMKM dan content creator dalam menganalisis performa konten sosial media mereka.

## 2.2 Tujuan Sistem

1. **Centralized Analytics** - Menyediakan satu platform terpusat untuk menganalisis data dari berbagai platform sosial media (Instagram, TikTok, YouTube, Facebook, Twitter/X, LinkedIn)

2. **Data-Driven Decision Making** - Membantu pengguna mengambil keputusan berdasarkan data performa konten

3. **Time Optimization** - Mengidentifikasi waktu terbaik untuk posting berdasarkan analisis historis

4. **Competitor Benchmarking** - Membandingkan performa dengan kompetitor

5. **AI-Powered Insights** - Menggunakan kecerdasan buatan untuk menghasilkan caption dan rekomendasi

## 2.3 Pengguna Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                    SOCIAL MEDIA ANALYTICS                    │
│                         DASHBOARD                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐         │
│    │  Admin   │     │   User   │     │  Guest   │         │
│    │  (1-2)   │     │  (Many)  │     │  (N/A)   │         │
│    └────┬─────┘     └────┬─────┘     └──────────┘         │
│         │                │                                  │
│         ▼                ▼                                  │
│    ┌──────────┐     ┌──────────┐                           │
│    │ Master   │     │ Project  │                           │
│    │ Data &   │     │ & Data   │                           │
│    │ Support  │     │ Analysis │                           │
│    └──────────┘     └──────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2.4 Fitur Utama

| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | **Dashboard Interaktif** | Visualisasi KPI dengan chart interaktif, trend analysis, dan insight otomatis |
| 2 | **Import Data CSV** | Import data posting dengan validasi dan mapping otomatis |
| 3 | **Analisis Performa** | Analisis engagement rate, reach, likes, comments, shares, saves |
| 4 | **Waktu Terbaik** | Identifikasi waktu optimal untuk posting berdasarkan engagement |
| 5 | **Perbandingan** | Perbandingan antar dataset, platform, dan jenis konten |
| 6 | **Target KPI** | Penetapan dan tracking target mingguan/bulanan |
| 7 | **Analisis Kompetitor** | Benchmarking dengan kompetitor |
| 8 | **AI Caption Generator** | Generate caption menggunakan Gemini AI |
| 9 | **Laporan PDF/Excel** | Export laporan dalam format PDF dan Excel |
| 10 | **Manajemen Tim** | Kolaborasi dengan role-based access control |

---

# 3. ARSITEKTUR SISTEM

## 3.1 Rancangan Arsitektur

### Diagram Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React SPA (Vite)                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │   │
│  │  │  Pages   │  │Components│  │  Hooks   │  │ Contexts │ │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Supabase JavaScript Client                   │   │
│  │         (Auto-generated Types & API Calls)                │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SUPABASE LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      Edge Functions                        │  │
│  │  ┌────────────────┐  ┌────────────────────────────────┐  │  │
│  │  │generate-caption│  │notify-admin-new-question       │  │  │
│  │  │  (Gemini AI)   │  │notify-user-question-answered   │  │  │
│  │  └────────────────┘  └────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Supabase Auth                          │  │
│  │         (JWT, Session Management, RLS)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    PostgreSQL Database                    │  │
│  │         (17 Tables, RLS Policies, Functions)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Supabase Storage                       │  │
│  │              (Avatar Uploads, Documents)                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Gemini AI   │  │    Resend    │  │   External   │          │
│  │   (Google)   │  │   (Email)    │  │    APIs      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3.1.1 Use Case User

```
┌─────────────────────────────────────────────────────────────────┐
│                        USE CASE: USER                            │
└─────────────────────────────────────────────────────────────────┘

                              ┌──────────────────┐
                              │       USER       │
                              │    (Pengguna)    │
                              └────────┬─────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           │                           │                           │
           ▼                           ▼                           ▼
    ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
    │ Autentikasi  │           │  Manajemen   │           │   Analisis   │
    │    Akun      │           │   Proyek     │           │    Data      │
    └──────┬───────┘           └──────┬───────┘           └──────┬───────┘
           │                          │                          │
    ┌──────┴──────┐            ┌──────┴──────┐            ┌──────┴──────┐
    │             │            │             │            │             │
    ▼             ▼            ▼             ▼            ▼             ▼
┌────────┐  ┌────────┐   ┌────────┐  ┌────────┐   ┌────────┐  ┌────────┐
│Register│  │ Login  │   │ Create │  │ Invite │   │Dashboard│  │Performa│
│        │  │        │   │ Project│  │ Member │   │   KPI   │  │Analysis│
└────────┘  └────────┘   └────────┘  └────────┘   └────────┘  └────────┘

    ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
    │    Import    │           │  Perencanaan │           │   Fitur AI   │
    │     Data     │           │   Konten     │           │    Tools     │
    └──────┬───────┘           └──────┬───────┘           └──────┬───────┘
           │                          │                          │
    ┌──────┴──────┐            ┌──────┴──────┐            ┌──────┴──────┐
    │             │            │             │            │             │
    ▼             ▼            ▼             ▼            ▼             ▼
┌────────┐  ┌────────┐   ┌────────┐  ┌────────┐   ┌────────┐  ┌────────┐
│ Upload │  │ Create │   │ Target │  │Kampanye│   │ Caption│  │Insight │
│  CSV   │  │Dataset │   │  KPI   │  │        │   │Generator│ │Summary │
└────────┘  └────────┘   └────────┘  └────────┘   └────────┘  └────────┘

    ┌──────────────┐           ┌──────────────┐
    │   Laporan    │           │   Bantuan    │
    │   & Export   │           │   (Q&A)      │
    └──────┬───────┘           └──────┬───────┘
           │                          │
    ┌──────┴──────┐            ┌──────┴──────┐
    │             │            │             │
    ▼             ▼            ▼             ▼
┌────────┐  ┌────────┐   ┌────────┐  ┌────────┐
│ Export │  │ Export │   │  Ajukan│  │  Lihat │
│  PDF   │  │ Excel  │   │Pertanyaan│ │ Jawaban│
└────────┘  └────────┘   └────────┘  └────────┘
```

**Deskripsi Use Case User:**

| No | Use Case | Deskripsi | Aktor |
|----|----------|-----------|-------|
| UC-U01 | Register | Pengguna mendaftar akun baru dengan email dan password | User |
| UC-U02 | Login | Pengguna masuk ke sistem dengan kredensial | User |
| UC-U03 | Create Project | Membuat proyek baru untuk mengelompokkan data | User |
| UC-U04 | Invite Member | Mengundang pengguna lain ke proyek | Owner |
| UC-U05 | Upload CSV | Mengimpor data posting dari file CSV | User |
| UC-U06 | Create Dataset | Membuat dataset baru dalam proyek | User |
| UC-U07 | View Dashboard | Melihat KPI dan visualisasi data | User |
| UC-U08 | Analyze Performance | Menganalisis performa konten | User |
| UC-U09 | Set KPI Target | Menetapkan target KPI | User |
| UC-U10 | Manage Campaign | Mengelola kampanye konten | User |
| UC-U11 | Generate Caption | Generate caption dengan AI | User |
| UC-U12 | View Insights | Melihat ringkasan insight | User |
| UC-U13 | Export PDF | Export laporan ke PDF | User |
| UC-U14 | Export Excel | Export data ke Excel | User |
| UC-U15 | Submit Question | Mengajukan pertanyaan bantuan | User |
| UC-U16 | View Answer | Melihat jawaban pertanyaan | User |

---

### 3.1.2 Use Case Admin

```
┌─────────────────────────────────────────────────────────────────┐
│                       USE CASE: ADMIN                            │
└─────────────────────────────────────────────────────────────────┘

                              ┌──────────────────┐
                              │      ADMIN       │
                              │  (Administrator) │
                              └────────┬─────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           │                           │                           │
           ▼                           ▼                           ▼
    ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
    │  Manajemen   │           │  Manajemen   │           │   Support    │
    │   Platform   │           │ Jenis Konten │           │   Bantuan    │
    └──────┬───────┘           └──────┬───────┘           └──────┬───────┘
           │                          │                          │
    ┌──────┴──────┐            ┌──────┴──────┐            ┌──────┴──────┐
    │      │      │            │      │      │            │      │      │
    ▼      ▼      ▼            ▼      ▼      ▼            ▼      ▼      ▼
┌──────┐┌──────┐┌──────┐ ┌──────┐┌──────┐┌──────┐ ┌──────┐┌──────┐┌──────┐
│Create││Update││Delete│ │Create││Update││Delete│ │ View ││Answer││Delete│
│Platfm││Platfm││Platfm│ │ Type ││ Type ││ Type │ │ All  ││ Q&A  ││ Q&A  │
└──────┘└──────┘└──────┘ └──────┘└──────┘└──────┘ └──────┘└──────┘└──────┘
```

**Deskripsi Use Case Admin:**

| No | Use Case | Deskripsi | Aktor |
|----|----------|-----------|-------|
| UC-A01 | Create Platform | Menambah platform sosial media baru | Admin |
| UC-A02 | Update Platform | Mengubah data platform | Admin |
| UC-A03 | Delete Platform | Menghapus platform | Admin |
| UC-A04 | Create Content Type | Menambah jenis konten baru | Admin |
| UC-A05 | Update Content Type | Mengubah jenis konten | Admin |
| UC-A06 | Delete Content Type | Menghapus jenis konten | Admin |
| UC-A07 | View All Questions | Melihat semua pertanyaan pengguna | Admin |
| UC-A08 | Answer Question | Menjawab pertanyaan pengguna | Admin |
| UC-A09 | Delete Question | Menghapus pertanyaan | Admin |

---

### 3.1.3 Activity Diagram User

```
┌─────────────────────────────────────────────────────────────────┐
│            ACTIVITY DIAGRAM: USER ANALYTICS FLOW                 │
└─────────────────────────────────────────────────────────────────┘

          ┌─────────┐
          │  START  │
          └────┬────┘
               │
               ▼
        ┌──────────────┐
        │ Buka Website │
        └──────┬───────┘
               │
               ▼
         ┌───────────┐        ┌────────────────┐
         │ Sudah     │───No──▶│    Register    │
         │ Punya     │        │   Akun Baru    │
         │ Akun?     │        └───────┬────────┘
         └─────┬─────┘                │
               │Yes                   │
               ▼                      │
        ┌──────────────┐              │
        │    Login     │◀─────────────┘
        └──────┬───────┘
               │
               ▼
         ┌───────────┐        ┌────────────────┐
         │ Ada       │───No──▶│ Buat Proyek    │
         │ Proyek?   │        │     Baru       │
         └─────┬─────┘        └───────┬────────┘
               │Yes                   │
               ▼                      │
        ┌──────────────┐              │
        │Pilih Proyek  │◀─────────────┘
        └──────┬───────┘
               │
               ▼
         ┌───────────┐        ┌────────────────┐
         │ Ada       │───No──▶│ Import Data    │
         │ Dataset?  │        │   CSV/Sheets   │
         └─────┬─────┘        └───────┬────────┘
               │Yes                   │
               ▼                      │
        ┌──────────────┐              │
        │Pilih Dataset │◀─────────────┘
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │   Dashboard  │
        │  Analytics   │
        └──────┬───────┘
               │
    ┌──────────┼──────────┬──────────┬──────────┐
    │          │          │          │          │
    ▼          ▼          ▼          ▼          ▼
┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
│Performa││ Waktu  ││Audiens ││Compare ││Laporan │
│Analysis││Terbaik ││Analysis││Dataset ││ Export │
└───┬────┘└───┬────┘└───┬────┘└───┬────┘└───┬────┘
    │         │         │         │         │
    └─────────┴─────────┴─────────┴─────────┘
                        │
                        ▼
                ┌──────────────┐
                │    Logout    │
                └──────┬───────┘
                       │
                       ▼
                  ┌─────────┐
                  │   END   │
                  └─────────┘
```

---

### 3.1.4 Activity Diagram Admin

```
┌─────────────────────────────────────────────────────────────────┐
│             ACTIVITY DIAGRAM: ADMIN SUPPORT FLOW                 │
└─────────────────────────────────────────────────────────────────┘

          ┌─────────┐
          │  START  │
          └────┬────┘
               │
               ▼
        ┌──────────────┐
        │ Login Admin  │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │ Dashboard    │
        │ Admin Panel  │
        └──────┬───────┘
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
┌──────────────┐   ┌──────────────┐
│  Manajemen   │   │   Support    │
│  Master Data │   │   Bantuan    │
└──────┬───────┘   └──────┬───────┘
       │                  │
       ▼                  ▼
┌─────────────────┐ ┌─────────────────┐
│ ┌─────────────┐ │ │ Lihat Daftar    │
│ │  Platform   │ │ │ Pertanyaan      │
│ │  - Create   │ │ │ Pengguna        │
│ │  - Update   │ │ └────────┬────────┘
│ │  - Delete   │ │          │
│ └─────────────┘ │          ▼
│                 │  ┌───────────────┐
│ ┌─────────────┐ │  │ Pilih         │
│ │ Jenis       │ │  │ Pertanyaan    │
│ │ Konten      │ │  └───────┬───────┘
│ │  - Create   │ │          │
│ │  - Update   │ │          ▼
│ │  - Delete   │ │  ┌───────────────┐
│ └─────────────┘ │  │ Tulis Jawaban │
└────────┬────────┘  └───────┬───────┘
         │                   │
         │                   ▼
         │           ┌───────────────┐
         │           │ Submit Jawaban│
         │           │ (Email Notify)│
         │           └───────┬───────┘
         │                   │
         └─────────┬─────────┘
                   │
                   ▼
            ┌──────────────┐
            │    Logout    │
            └──────┬───────┘
                   │
                   ▼
              ┌─────────┐
              │   END   │
              └─────────┘
```

---

## 3.2 Deskripsi Dekomposisi

### 3.2.1 Dekomposisi Frontend

```
src/
├── components/          # Komponen UI reusable
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (AppLayout, Breadcrumbs)
│   └── charts/         # Interactive chart components
├── contexts/           # React Context providers
│   ├── AuthContext     # Authentication state
│   ├── AppContext      # Application state (project, dataset)
│   └── NotificationContext # Notification state
├── hooks/              # Custom React hooks
├── pages/              # Page components (routing targets)
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client & types
└── lib/                # Utility functions
```

### 3.2.2 Dekomposisi Backend (Supabase)

```
supabase/
├── functions/                    # Edge Functions
│   ├── generate-caption/         # AI caption generation
│   ├── notify-admin-new-question/   # Email notification
│   └── notify-user-question-answered/ # Email notification
└── config.toml                   # Supabase configuration
```

### 3.2.3 Daftar Komponen Halaman

| No | Halaman | File | Deskripsi |
|----|---------|------|-----------|
| 1 | Login/Register | `Auth.tsx` | Autentikasi pengguna |
| 2 | Dashboard | `Dashboard.tsx` | Visualisasi KPI utama |
| 3 | Import Data | `Import.tsx` | Import CSV/Sheets |
| 4 | Performa | `Performa.tsx` | Analisis performa konten |
| 5 | Waktu Terbaik | `WaktuTerbaik.tsx` | Analisis waktu posting optimal |
| 6 | Audiens | `Audiens.tsx` | Analisis audiens |
| 7 | Platform | `Platform.tsx` | Analisis per platform |
| 8 | Perbandingan | `Perbandingan.tsx` | Perbandingan dataset |
| 9 | Ringkasan Insight | `RingkasanInsight.tsx` | Insight AI-powered |
| 10 | Laporan | `Laporan.tsx` | Generate laporan |
| 11 | Target KPI | `TargetKPI.tsx` | Manajemen target |
| 12 | Kampanye | `Kampanye.tsx` | Manajemen kampanye |
| 13 | Caption Generator | `CaptionGenerator.tsx` | AI caption tool |
| 14 | Kompetitor | `KompetitorAnalysis.tsx` | Analisis kompetitor |
| 15 | Anggota Proyek | `AnggotaProyek.tsx` | Manajemen tim |
| 16 | Bantuan | `Bantuan.tsx` | Q&A pengguna |
| 17 | Bantuan Admin | `BantuanAdmin.tsx` | Admin support |
| 18 | Buat Proyek | `ProjectNew.tsx` | Form proyek baru |

---

## 3.3 Alasan Rancangan

### 3.3.1 Pemilihan Arsitektur Serverless

| Aspek | Alasan |
|-------|--------|
| **Scalability** | Supabase auto-scale sesuai beban, tidak perlu manage server |
| **Cost Efficiency** | Pay-per-use model, hemat untuk UMKM dengan traffic tidak stabil |
| **Development Speed** | BaaS menyediakan auth, database, storage out-of-the-box |
| **Security** | RLS policies built-in, JWT handling otomatis |

### 3.3.2 Pemilihan React + TypeScript

| Aspek | Alasan |
|-------|--------|
| **Type Safety** | TypeScript mencegah runtime errors dengan static typing |
| **Component Reusability** | React component model memudahkan maintenance |
| **Ecosystem** | Library yang mature (Recharts, TanStack Query, dll) |
| **Performance** | Vite untuk build tool yang cepat |

### 3.3.3 Pemilihan Row Level Security (RLS)

| Aspek | Alasan |
|-------|--------|
| **Data Isolation** | Setiap user hanya akses data proyek yang diizinkan |
| **Centralized Security** | Policy didefinisikan di database level, bukan application level |
| **Automatic Enforcement** | RLS berlaku untuk semua query tanpa code tambahan |

---

# 4. RANCANGAN DATA

## 4.1 Deskripsi Data

Sistem menggunakan PostgreSQL database dengan 17 tabel yang terbagi dalam beberapa kategori:

### 4.1.1 Kategori Tabel

| Kategori | Tabel | Deskripsi |
|----------|-------|-----------|
| **Identitas Pengguna** | `profil` | Data profil pengguna |
| **Manajemen Proyek** | `proyek`, `anggota_proyek` | Proyek dan akses anggota |
| **Data Analytics** | `dataset`, `postingan`, `log_impor` | Data posting dan log |
| **Master Data** | `platform`, `jenis_konten`, `kampanye` | Data referensi |
| **Perencanaan** | `target_kpi`, `jadwal_konten` | Target dan penjadwalan |
| **Kompetitor** | `kompetitor`, `data_kompetitor` | Data benchmarking |
| **User Actions** | `filter_tersimpan`, `catatan`, `riwayat_export` | Aktivitas pengguna |
| **Support** | `pertanyaan` | Q&A bantuan |

---

## 4.2 Kamus Data

### Tabel: `profil`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_profil | UUID | No | - | Primary key, sama dengan auth.users.id |
| nama_lengkap | TEXT | Yes | - | Nama lengkap pengguna |
| peran | app_role | No | 'user' | Role: 'admin' atau 'user' |
| foto_profil_url | TEXT | Yes | - | URL foto profil |
| bahasa | VARCHAR | Yes | 'id' | Preferensi bahasa |
| preferensi_dashboard | JSONB | Yes | default widgets | Konfigurasi dashboard |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `proyek`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_proyek | UUID | No | uuid_generate_v4() | Primary key |
| id_pemilik | UUID | No | - | FK ke profil (owner) |
| nama_proyek | TEXT | No | - | Nama proyek |
| deskripsi_proyek | TEXT | Yes | - | Deskripsi proyek |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `anggota_proyek`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_anggota_proyek | UUID | No | uuid_generate_v4() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| id_pengguna | UUID | No | - | FK ke profil |
| peran_dalam_proyek | project_role | No | 'viewer' | Role: owner/admin/editor/viewer |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `dataset`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_dataset | UUID | No | uuid_generate_v4() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| nama_dataset | TEXT | No | - | Nama dataset |
| jenis_sumber_dataset | source_type | No | 'upload_csv' | Sumber: csv/sheets/api |
| jumlah_baris_dataset | INTEGER | No | 0 | Jumlah baris data |
| dataset_aktif | BOOLEAN | No | false | Status aktif |
| lokasi_berkas_dataset | TEXT | Yes | - | Path file |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `postingan`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_postingan | UUID | No | uuid_generate_v4() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| id_dataset | UUID | No | - | FK ke dataset |
| id_platform | UUID | No | - | FK ke platform |
| id_jenis_konten | UUID | No | - | FK ke jenis_konten |
| id_kampanye | UUID | Yes | - | FK ke kampanye (opsional) |
| kode_postingan | TEXT | No | - | Kode unik posting |
| teks_caption | TEXT | Yes | - | Caption posting |
| waktu_diposting | TIMESTAMPTZ | No | - | Waktu posting |
| jumlah_likes | INTEGER | No | 0 | Jumlah likes |
| jumlah_komentar | INTEGER | No | 0 | Jumlah komentar |
| jumlah_shares | INTEGER | No | 0 | Jumlah shares |
| jumlah_saved | INTEGER | No | 0 | Jumlah saves |
| jumlah_views | INTEGER | No | 0 | Jumlah views |
| jumlah_reach | INTEGER | No | 0 | Jumlah reach |
| jumlah_followers | INTEGER | No | 0 | Followers saat posting |
| total_engagement | INTEGER | Yes | - | Total engagement |
| engagement_rate_persen | NUMERIC | Yes | - | ER dalam persen |
| created_at | TIMESTAMPTZ | No | now() | Waktu import |

### Tabel: `platform`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_platform | UUID | No | uuid_generate_v4() | Primary key |
| kode_platform | TEXT | No | - | Kode: instagram, tiktok, dll |
| nama_platform | TEXT | No | - | Nama tampilan |
| warna_platform | TEXT | No | '#000000' | Warna hex untuk chart |
| platform_aktif | BOOLEAN | No | true | Status aktif |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `jenis_konten`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_jenis_konten | UUID | No | uuid_generate_v4() | Primary key |
| kode_jenis_konten | TEXT | No | - | Kode: reels, carousel, dll |
| nama_jenis_konten | TEXT | No | - | Nama tampilan |
| jenis_konten_aktif | BOOLEAN | No | true | Status aktif |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `kampanye`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_kampanye | UUID | No | uuid_generate_v4() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| nama_kampanye | TEXT | No | - | Nama kampanye |
| catatan_kampanye | TEXT | Yes | - | Catatan/deskripsi |
| tanggal_mulai_kampanye | DATE | Yes | - | Tanggal mulai |
| tanggal_selesai_kampanye | DATE | Yes | - | Tanggal selesai |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `target_kpi`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_target_kpi | UUID | No | uuid_generate_v4() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| jenis_periode | period_type | No | - | weekly/monthly |
| tanggal_mulai_periode | DATE | No | - | Mulai periode |
| tanggal_selesai_periode | DATE | No | - | Akhir periode |
| target_rata_rata_er | NUMERIC | Yes | - | Target ER % |
| target_jumlah_followers | NUMERIC | Yes | - | Target followers |
| target_total_jangkauan | NUMERIC | Yes | - | Target reach |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `kompetitor`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_kompetitor | UUID | No | gen_random_uuid() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| nama_kompetitor | TEXT | No | - | Nama kompetitor |
| deskripsi_kompetitor | TEXT | Yes | - | Deskripsi |
| platform_kompetitor | TEXT | No | - | Platform utama |
| handle_kompetitor | TEXT | Yes | - | Username/handle |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `data_kompetitor`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_data_kompetitor | UUID | No | gen_random_uuid() | Primary key |
| id_kompetitor | UUID | No | - | FK ke kompetitor |
| tanggal_data | DATE | No | - | Tanggal data |
| jumlah_followers | INTEGER | No | 0 | Followers |
| total_posts | INTEGER | No | 0 | Total posting |
| rata_rata_engagement_rate | NUMERIC | Yes | - | Avg ER |
| rata_rata_likes | NUMERIC | Yes | - | Avg likes |
| rata_rata_comments | NUMERIC | Yes | - | Avg comments |
| rata_rata_shares | NUMERIC | Yes | - | Avg shares |
| rata_rata_reach | NUMERIC | Yes | - | Avg reach |
| created_at | TIMESTAMPTZ | No | now() | Waktu input |

### Tabel: `pertanyaan`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_pertanyaan | UUID | No | gen_random_uuid() | Primary key |
| id_pengguna | UUID | No | - | FK ke profil (penanya) |
| id_proyek | UUID | No | - | FK ke proyek terkait |
| judul_pertanyaan | TEXT | No | - | Judul pertanyaan |
| isi_pertanyaan | TEXT | No | - | Detail pertanyaan |
| jawaban | TEXT | Yes | - | Jawaban admin |
| status | TEXT | No | 'menunggu' | Status: menunggu/dijawab |
| dijawab_oleh | UUID | Yes | - | FK ke profil admin |
| rating | INTEGER | Yes | - | Rating 1-5 |
| komentar_rating | TEXT | Yes | - | Feedback |
| rating_at | TIMESTAMPTZ | Yes | - | Waktu rating |
| created_at | TIMESTAMPTZ | No | now() | Waktu tanya |
| updated_at | TIMESTAMPTZ | No | now() | Waktu update |

### Tabel: `log_impor`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_log_impor | UUID | No | uuid_generate_v4() | Primary key |
| id_dataset | UUID | No | - | FK ke dataset |
| status_impor | import_status | No | 'pending' | pending/success/error |
| pesan | TEXT | Yes | - | Pesan error/success |
| jumlah_baris_tidak_valid | INTEGER | No | 0 | Baris gagal |
| kolom_hilang | JSONB | Yes | - | Kolom yang hilang |
| created_at | TIMESTAMPTZ | No | now() | Waktu impor |

### Tabel: `filter_tersimpan`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_filter_tersimpan | UUID | No | uuid_generate_v4() | Primary key |
| id_pengguna | UUID | No | - | FK ke profil |
| id_proyek | UUID | No | - | FK ke proyek |
| nama_filter | TEXT | No | - | Nama filter |
| halaman | TEXT | No | - | Halaman terkait |
| nilai_filter_json | JSONB | No | - | Konfigurasi filter |
| created_at | TIMESTAMPTZ | No | now() | Waktu simpan |

### Tabel: `catatan`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_catatan | UUID | No | uuid_generate_v4() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| id_dataset | UUID | Yes | - | FK ke dataset (opsional) |
| id_pengguna | UUID | No | - | FK ke profil |
| jenis_scope | scope_type | No | - | dataset/page/global |
| kunci_scope | TEXT | Yes | - | Key identifier |
| isi_catatan | TEXT | No | - | Isi catatan |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |

### Tabel: `riwayat_export`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id_riwayat_export | UUID | No | gen_random_uuid() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| id_pengguna | UUID | No | - | FK ke profil |
| jenis_export | TEXT | No | - | pdf/excel |
| halaman_export | TEXT | No | - | Halaman asal |
| nama_file | TEXT | No | - | Nama file |
| filter_export | JSONB | Yes | - | Filter yang digunakan |
| created_at | TIMESTAMPTZ | No | now() | Waktu export |

### Tabel: `jadwal_konten`
| Kolom | Tipe Data | Nullable | Default | Deskripsi |
|-------|-----------|----------|---------|-----------|
| id | UUID | No | gen_random_uuid() | Primary key |
| id_proyek | UUID | No | - | FK ke proyek |
| id_pengguna | UUID | No | - | FK ke profil |
| judul_konten | TEXT | No | - | Judul konten |
| deskripsi | TEXT | Yes | - | Deskripsi |
| platform | TEXT | No | - | Platform target |
| waktu_posting | TIMESTAMPTZ | No | - | Jadwal posting |
| status | TEXT | No | 'draft' | draft/scheduled/published |
| reminder_waktu | TEXT | No | '1_jam' | Reminder sebelum posting |
| custom_reminder_menit | INTEGER | Yes | - | Custom reminder (menit) |
| email_sent | BOOLEAN | No | false | Status email reminder |
| created_at | TIMESTAMPTZ | No | now() | Waktu pembuatan |
| updated_at | TIMESTAMPTZ | No | now() | Waktu update |

---

## 4.3 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENTITY RELATIONSHIP DIAGRAM                           │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │   PROFIL    │
                              │─────────────│
                              │ id_profil   │◄─────────────────────────────────┐
                              │ nama_lengkap│                                  │
                              │ peran       │                                  │
                              └──────┬──────┘                                  │
                                     │                                         │
              ┌──────────────────────┼────────────────────────┐               │
              │                      │                        │               │
              ▼                      ▼                        ▼               │
       ┌─────────────┐        ┌─────────────┐          ┌───────────┐         │
       │   PROYEK    │        │   CATATAN   │          │PERTANYAAN │         │
       │─────────────│        │─────────────│          │───────────│         │
       │ id_proyek   │◄──┐    │ id_catatan  │          │id_pertanyaan│        │
       │ id_pemilik  │   │    │ id_pengguna │──────────│id_pengguna│─────────┘
       │ nama_proyek │   │    │ id_proyek   │          │id_proyek  │
       └──────┬──────┘   │    │ isi_catatan │          │jawaban    │
              │          │    └─────────────┘          └───────────┘
    ┌─────────┼──────────┼─────────────┐
    │         │          │             │
    ▼         ▼          ▼             ▼
┌────────┐┌────────┐┌─────────┐┌───────────┐
│ANGGOTA ││DATASET ││KAMPANYE ││TARGET_KPI │
│PROYEK  ││        ││         ││           │
│────────││────────││─────────││───────────│
│id_proyek││id_dataset││id_kampanye││id_target_kpi│
│id_user ││id_proyek││id_proyek││id_proyek  │
│peran   ││nama    ││nama    ││jenis_periode│
└────────┘└───┬────┘└────┬────┘└───────────┘
              │          │
              ▼          │
       ┌─────────────┐   │
       │  POSTINGAN  │◄──┘
       │─────────────│
       │id_postingan │
       │id_dataset   │
       │id_platform  │──────────▶┌─────────────┐
       │id_jenis     │           │  PLATFORM   │
       │id_kampanye  │           │─────────────│
       │waktu_posting│           │ id_platform │
       │engagement   │           │ nama_platform│
       └─────────────┘           └─────────────┘
              │
              └──────────────────▶┌─────────────┐
                                  │JENIS_KONTEN │
                                  │─────────────│
                                  │id_jenis_konten│
                                  │nama_jenis  │
                                  └─────────────┘

┌──────────────┐          ┌──────────────┐
│  KOMPETITOR  │          │    LOG_IMPOR │
│──────────────│          │──────────────│
│id_kompetitor │◄──┐      │ id_log_impor │
│id_proyek     │   │      │ id_dataset   │
│nama          │   │      │ status_impor │
└──────────────┘   │      └──────────────┘
       │           │
       ▼           │
┌───────────────┐  │      ┌──────────────┐
│DATA_KOMPETITOR│  │      │FILTER_TERSIMPAN│
│───────────────│  │      │──────────────│
│id_data        │  │      │id_filter     │
│id_kompetitor  │──┘      │id_pengguna   │
│tanggal_data   │         │nilai_filter  │
│followers      │         └──────────────┘
└───────────────┘

┌──────────────┐          ┌──────────────┐
│RIWAYAT_EXPORT│          │JADWAL_KONTEN │
│──────────────│          │──────────────│
│id_riwayat    │          │id            │
│id_proyek     │          │id_proyek     │
│id_pengguna   │          │id_pengguna   │
│jenis_export  │          │waktu_posting │
└──────────────┘          └──────────────┘
```

---

# 5. RANCANGAN KOMPONEN

## 5.1 Admin Sequence

### 5.1.1 Sequence Diagram: Admin Menjawab Pertanyaan

```
┌─────────────────────────────────────────────────────────────────────────────┐
│           SEQUENCE DIAGRAM: ADMIN MENJAWAB PERTANYAAN                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────┐         ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│Admin│         │BantuanAdmin│    │ Supabase │    │Edge Func │    │  Resend  │
└──┬──┘         └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
   │                  │              │               │               │
   │  1. Buka Halaman │              │               │               │
   │─────────────────▶│              │               │               │
   │                  │              │               │               │
   │                  │ 2. Fetch     │               │               │
   │                  │ Pertanyaan   │               │               │
   │                  │─────────────▶│               │               │
   │                  │              │               │               │
   │                  │ 3. Return    │               │               │
   │                  │ Data         │               │               │
   │                  │◀─────────────│               │               │
   │                  │              │               │               │
   │  4. Pilih        │              │               │               │
   │  Pertanyaan      │              │               │               │
   │─────────────────▶│              │               │               │
   │                  │              │               │               │
   │  5. Tulis        │              │               │               │
   │  Jawaban         │              │               │               │
   │─────────────────▶│              │               │               │
   │                  │              │               │               │
   │  6. Submit       │              │               │               │
   │─────────────────▶│              │               │               │
   │                  │              │               │               │
   │                  │ 7. UPDATE    │               │               │
   │                  │ pertanyaan   │               │               │
   │                  │ SET jawaban  │               │               │
   │                  │─────────────▶│               │               │
   │                  │              │               │               │
   │                  │              │ 8. Trigger    │               │
   │                  │              │─────────────▶│               │
   │                  │              │               │               │
   │                  │              │               │ 9. Send Email │
   │                  │              │               │──────────────▶│
   │                  │              │               │               │
   │                  │              │               │ 10. OK        │
   │                  │              │               │◀──────────────│
   │                  │              │               │               │
   │                  │ 11. Success  │               │               │
   │                  │◀─────────────│               │               │
   │                  │              │               │               │
   │ 12. Toast        │              │               │               │
   │ "Berhasil"       │              │               │               │
   │◀─────────────────│              │               │               │
   │                  │              │               │               │
```

### 5.1.2 Sequence Diagram: Admin Kelola Master Data

```
┌─────────────────────────────────────────────────────────────────────────────┐
│           SEQUENCE DIAGRAM: ADMIN KELOLA PLATFORM                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────┐         ┌──────────┐    ┌──────────┐
│Admin│         │ AdminTest │    │ Supabase │
└──┬──┘         └────┬─────┘    └────┬─────┘
   │                  │              │
   │  1. Buka Halaman │              │
   │─────────────────▶│              │
   │                  │              │
   │                  │ 2. Fetch     │
   │                  │ Platforms    │
   │                  │─────────────▶│
   │                  │              │
   │                  │ 3. Return    │
   │                  │◀─────────────│
   │                  │              │
   │  4. Click        │              │
   │  "Tambah"        │              │
   │─────────────────▶│              │
   │                  │              │
   │  5. Isi Form     │              │
   │  (nama, kode,    │              │
   │   warna)         │              │
   │─────────────────▶│              │
   │                  │              │
   │  6. Submit       │              │
   │─────────────────▶│              │
   │                  │              │
   │                  │ 7. INSERT    │
   │                  │ platform     │
   │                  │─────────────▶│
   │                  │              │
   │                  │ 8. Success   │
   │                  │◀─────────────│
   │                  │              │
   │ 9. Toast         │              │
   │ "Berhasil"       │              │
   │◀─────────────────│              │
   │                  │              │
   │                  │ 10. Refresh  │
   │                  │ List         │
   │                  │─────────────▶│
   │                  │              │
```

---

## 5.2 User Sequence

### 5.2.1 Sequence Diagram: User Import Data

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              SEQUENCE DIAGRAM: USER IMPORT DATA CSV                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│User │    │  Import  │    │ Papa     │    │ Supabase │    │ Database │
│     │    │  Page    │    │ Parse    │    │ Client   │    │          │
└──┬──┘    └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
   │            │               │               │               │
   │ 1. Upload  │               │               │               │
   │ File CSV   │               │               │               │
   │───────────▶│               │               │               │
   │            │               │               │               │
   │            │ 2. Parse CSV  │               │               │
   │            │──────────────▶│               │               │
   │            │               │               │               │
   │            │ 3. Return     │               │               │
   │            │ Parsed Data   │               │               │
   │            │◀──────────────│               │               │
   │            │               │               │               │
   │            │ 4. Validate   │               │               │
   │            │ Columns       │               │               │
   │            │───────────────┤               │               │
   │            │               │               │               │
   │ 5. Preview │               │               │               │
   │ Data       │               │               │               │
   │◀───────────│               │               │               │
   │            │               │               │               │
   │ 6. Confirm │               │               │               │
   │ Import     │               │               │               │
   │───────────▶│               │               │               │
   │            │               │               │               │
   │            │ 7. Create     │               │               │
   │            │ Dataset       │               │               │
   │            │──────────────────────────────▶│               │
   │            │               │               │               │
   │            │               │               │ 8. INSERT     │
   │            │               │               │ dataset       │
   │            │               │               │──────────────▶│
   │            │               │               │               │
   │            │ 9. Loop:      │               │               │
   │            │ Insert Posts  │               │               │
   │            │──────────────────────────────▶│               │
   │            │               │               │               │
   │            │               │               │ 10. INSERT    │
   │            │               │               │ postingan     │
   │            │               │               │──────────────▶│
   │            │               │               │               │
   │            │ 11. Create    │               │               │
   │            │ Import Log    │               │               │
   │            │──────────────────────────────▶│               │
   │            │               │               │               │
   │ 12. Success│               │               │               │
   │ Redirect   │               │               │               │
   │ Dashboard  │               │               │               │
   │◀───────────│               │               │               │
   │            │               │               │               │
```

### 5.2.2 Sequence Diagram: User Lihat Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              SEQUENCE DIAGRAM: USER LIHAT DASHBOARD                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│User │    │Dashboard │    │ Supabase │    │ Charts   │
│     │    │  Page    │    │ Client   │    │ Library  │
└──┬──┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
   │            │               │               │
   │ 1. Navigate│               │               │
   │ /dashboard │               │               │
   │───────────▶│               │               │
   │            │               │               │
   │            │ 2. Check      │               │
   │            │ Auth State    │               │
   │            │──────────────▶│               │
   │            │               │               │
   │            │ 3. Auth OK    │               │
   │            │◀──────────────│               │
   │            │               │               │
   │            │ 4. Fetch      │               │
   │            │ Project &     │               │
   │            │ Dataset       │               │
   │            │──────────────▶│               │
   │            │               │               │
   │            │ 5. Fetch      │               │
   │            │ Postingan     │               │
   │            │──────────────▶│               │
   │            │               │               │
   │            │ 6. Calculate  │               │
   │            │ KPIs          │               │
   │            │───────────────┤               │
   │            │               │               │
   │            │ 7. Render     │               │
   │            │ Charts        │               │
   │            │──────────────────────────────▶│
   │            │               │               │
   │            │ 8. Generate   │               │
   │            │ Insights      │               │
   │            │───────────────┤               │
   │            │               │               │
   │ 9. Display │               │               │
   │ Dashboard  │               │               │
   │ Complete   │               │               │
   │◀───────────│               │               │
   │            │               │               │
```

### 5.2.3 Sequence Diagram: User Generate Caption AI

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              SEQUENCE DIAGRAM: USER GENERATE AI CAPTION                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│User │    │ Caption  │    │ Supabase │    │ Edge     │    │ Gemini   │
│     │    │Generator │    │ Client   │    │ Function │    │   AI     │
└──┬──┘    └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
   │            │               │               │               │
   │ 1. Fill    │               │               │               │
   │ Form       │               │               │               │
   │ (tema,     │               │               │               │
   │  platform, │               │               │               │
   │  tone)     │               │               │               │
   │───────────▶│               │               │               │
   │            │               │               │               │
   │ 2. Click   │               │               │               │
   │ Generate   │               │               │               │
   │───────────▶│               │               │               │
   │            │               │               │               │
   │            │ 3. Call Edge  │               │               │
   │            │ Function      │               │               │
   │            │──────────────▶│               │               │
   │            │               │               │               │
   │            │               │ 4. Invoke     │               │
   │            │               │ generate-     │               │
   │            │               │ caption       │               │
   │            │               │──────────────▶│               │
   │            │               │               │               │
   │            │               │               │ 5. Build      │
   │            │               │               │ Prompt        │
   │            │               │               │───────────────┤
   │            │               │               │               │
   │            │               │               │ 6. Call API   │
   │            │               │               │──────────────▶│
   │            │               │               │               │
   │            │               │               │ 7. Generate   │
   │            │               │               │ Response      │
   │            │               │               │◀──────────────│
   │            │               │               │               │
   │            │               │ 8. Return     │               │
   │            │               │ Caption       │               │
   │            │               │◀──────────────│               │
   │            │               │               │               │
   │            │ 9. Display    │               │               │
   │            │ Result        │               │               │
   │            │◀──────────────│               │               │
   │            │               │               │               │
   │ 10. Show   │               │               │               │
   │ Generated  │               │               │               │
   │ Caption    │               │               │               │
   │◀───────────│               │               │               │
   │            │               │               │               │
   │ 11. Copy   │               │               │               │
   │ to         │               │               │               │
   │ Clipboard  │               │               │               │
   │───────────▶│               │               │               │
   │            │               │               │               │
```

---

# 6. RANCANGAN ANTARMUKA

## 6.1 Gambaran Umum Antarmuka

Sistem menggunakan design system berbasis **shadcn/ui** dengan **Tailwind CSS** yang mendukung:
- **Dark Mode / Light Mode** - Toggle otomatis berdasarkan sistem atau preferensi user
- **Responsive Design** - Mobile-first approach
- **Consistent Components** - Reusable UI components

### 6.1.1 Struktur Navigasi Admin

```
┌─────────────────────────────────────────────────────────────────┐
│                    NAVIGASI ADMIN                                │
└─────────────────────────────────────────────────────────────────┘

                        ┌───────────────┐
                        │   Dashboard   │
                        └───────┬───────┘
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
            ▼                   ▼                   ▼
     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
     │  Analytics  │     │   Admin     │     │   Account   │
     │  (Semua)    │     │   Panel     │     │  Settings   │
     └──────┬──────┘     └──────┬──────┘     └─────────────┘
            │                   │
            │            ┌──────┴──────┐
            │            │             │
            │            ▼             ▼
            │     ┌───────────┐ ┌───────────┐
            │     │ Master    │ │ Bantuan   │
            │     │ Data      │ │ Admin     │
            │     │ (Platform,│ │ (Q&A)     │
            │     │ Konten)   │ │           │
            │     └───────────┘ └───────────┘
            │
     ┌──────┴──────────────────────────────────────┐
     │             │             │          │      │
     ▼             ▼             ▼          ▼      ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐┌────────┐
│Dashboard││Performa ││ Waktu   ││Audiens ││Laporan │
│         ││         ││ Terbaik ││        ││        │
└─────────┘ └─────────┘ └─────────┘ └────────┘└────────┘
```

### 6.1.2 Struktur Navigasi User

```
┌─────────────────────────────────────────────────────────────────┐
│                    NAVIGASI USER                                 │
└─────────────────────────────────────────────────────────────────┘

                        ┌───────────────┐
                        │   Dashboard   │
                        └───────┬───────┘
                                │
    ┌──────────┬────────────────┼────────────────┬──────────┐
    │          │                │                │          │
    ▼          ▼                ▼                ▼          ▼
┌────────┐┌────────┐     ┌─────────────┐  ┌─────────┐ ┌────────┐
│Analytics││Planning│     │   Tools     │  │ Laporan │ │Account │
└───┬────┘└───┬────┘     └──────┬──────┘  └─────────┘ └────────┘
    │         │                 │
    │         │          ┌──────┴──────┐
    │         │          │             │
    │         │          ▼             ▼
    │         │   ┌───────────┐ ┌───────────┐
    │         │   │ Caption   │ │Kompetitor │
    │         │   │ Generator │ │ Analysis  │
    │         │   │ (AI)      │ │           │
    │         │   └───────────┘ └───────────┘
    │         │
    │    ┌────┴────────┐
    │    │             │
    │    ▼             ▼
    │ ┌────────┐ ┌──────────┐
    │ │Target  │ │ Kampanye │
    │ │ KPI    │ │          │
    │ └────────┘ └──────────┘
    │
    ├────────────────┬──────────────┬────────────┐
    │                │              │            │
    ▼                ▼              ▼            ▼
┌─────────┐   ┌─────────────┐ ┌─────────┐ ┌──────────┐
│ Performa│   │ Waktu       │ │ Audiens │ │Perbandingan│
│         │   │ Terbaik     │ │         │ │          │
└─────────┘   └─────────────┘ └─────────┘ └──────────┘
```

---

## 6.2 Tampilan Layar

### 6.2.1 Halaman Login/Register

**Deskripsi**: Halaman autentikasi dengan tab Login dan Daftar

**Komponen UI**:
- Logo dan nama aplikasi "Analytics Sosmed"
- Tab switcher (Login / Daftar)
- Form input Email
- Form input Password
- Form input Nama Lengkap (hanya untuk Daftar)
- Tombol Submit
- Tagline aplikasi

**Screenshot Referensi**: Halaman login dengan form sederhana dan clean design

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                    📊 Analytics Sosmed                         │
│                                                                │
│            ┌────────────────────────────────┐                  │
│            │      Selamat Datang            │                  │
│            │  Platform analisis performa    │                  │
│            │  konten sosial media untuk     │                  │
│            │  UMKM                          │                  │
│            │                                │                  │
│            │  ┌─────────┬─────────┐         │                  │
│            │  │  Login  │  Daftar │         │                  │
│            │  └─────────┴─────────┘         │                  │
│            │                                │                  │
│            │  Email                         │                  │
│            │  ┌────────────────────────┐    │                  │
│            │  │ nama@email.com         │    │                  │
│            │  └────────────────────────┘    │                  │
│            │                                │                  │
│            │  Password                      │                  │
│            │  ┌────────────────────────┐    │                  │
│            │  │ ••••••••               │    │                  │
│            │  └────────────────────────┘    │                  │
│            │                                │                  │
│            │  ┌────────────────────────┐    │                  │
│            │  │        Login           │    │                  │
│            │  └────────────────────────┘    │                  │
│            │                                │                  │
│            └────────────────────────────────┘                  │
│                                                                │
│     Platform untuk menganalisis dan mengoptimalkan             │
│              konten sosial media Anda                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 6.2.2 Dashboard Utama

**Deskripsi**: Tampilan utama setelah login dengan KPI cards dan charts

**Komponen UI**:
- Header dengan navigasi dan selector proyek/dataset
- KPI Cards (Total Postingan, Rata-rata ER, Median Reach, Followers)
- Interactive Line Chart (Trend ER)
- Interactive Bar Chart (Distribusi Platform & Jenis Konten)
- Insight Cards (AI-generated insights)
- Export dan Notes buttons

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 📊 Analytics Sosmed    Analytics ▾  Planning ▾  Tools ▾  Laporan  👤 User ▾│
├────────────────────────────────────────────────────────────────────────────┤
│ Proyek: [Project Name ▾]  Dataset: [Dataset Name ▾]        🔔  🌙  Logout  │
├────────────────────────────────────────────────────────────────────────────┤
│ Dashboard                                        ⚙️ Kustomisasi  📥 Export │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │Total Postingan│  │Rata-rata ER │  │Median Reach │  │  Followers   │   │
│  │              │  │              │  │              │  │              │   │
│  │     125      │  │    4.25%     │  │   15,420     │  │    8,500     │   │
│  │    ↑ 12%     │  │    ↑ 0.5%    │  │    ↑ 8%      │  │    ↑ 350     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                    Trend Engagement Rate                            │   │
│  │                                                                     │   │
│  │    5% ─────────────────────────────────────────────────────────    │   │
│  │       │    ╭──────╮                     ╭──────╮                    │   │
│  │    4% │   ╱        ╲                   ╱        ╲   avg: 4.2%       │   │
│  │       │  ╱          ╲                 ╱          ╲                  │   │
│  │    3% │ ╱            ╲───────────────╱            ╲                 │   │
│  │       ├────────────────────────────────────────────────────────    │   │
│  │         Week 1   Week 2   Week 3   Week 4   Week 5   Week 6        │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌───────────────────────────┐  ┌───────────────────────────┐            │
│  │  Distribusi Platform      │  │  Jenis Konten             │            │
│  │                           │  │                           │            │
│  │  ████████ Instagram 45%   │  │  ████████ Reels 35%       │            │
│  │  ██████ TikTok 30%        │  │  ██████ Carousel 25%      │            │
│  │  ████ YouTube 15%         │  │  ████ Single Image 20%    │            │
│  │  ██ Twitter 10%           │  │  ██ Video 20%             │            │
│  └───────────────────────────┘  └───────────────────────────┘            │
│                                                                            │
│  💡 Insights                                                               │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ✓ Engagement rate naik 0.5% dibanding minggu lalu                  │   │
│  │ ✓ Instagram adalah platform dengan performa terbaik                │   │
│  │ ✓ Konten Reels memiliki engagement tertinggi                       │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2.3 Halaman Import Data

**Deskripsi**: Form untuk import data dari file CSV

**Komponen UI**:
- File upload area (drag & drop)
- Column mapping interface
- Data preview table
- Validation messages
- Submit button

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 📊 Analytics Sosmed    Analytics ▾  Planning ▾  Tools ▾  Laporan  👤 User ▾│
├────────────────────────────────────────────────────────────────────────────┤
│ Import Data                                                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                    ┌─────────────────────┐                         │   │
│  │                    │   📁                │                         │   │
│  │                    │                     │                         │   │
│  │                    │   Drag & Drop       │                         │   │
│  │                    │   atau Klik         │                         │   │
│  │                    │   untuk Upload      │                         │   │
│  │                    │                     │                         │   │
│  │                    └─────────────────────┘                         │   │
│  │                                                                     │   │
│  │                    Format: CSV                                      │   │
│  │                    Max Size: 10MB                                   │   │
│  │                                                                     │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  Nama Dataset                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Dataset Januari 2025                                                │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  Preview Data (5 baris pertama)                                            │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Post Code │ Platform │ Type    │ Date       │ Likes │ Comments    │   │
│  ├───────────┼──────────┼─────────┼────────────┼───────┼─────────────┤   │
│  │ POST001   │ Instagram│ Reels   │ 2025-01-01 │ 1,234 │ 89          │   │
│  │ POST002   │ TikTok   │ Video   │ 2025-01-02 │ 5,678 │ 234         │   │
│  │ POST003   │ Instagram│ Carousel│ 2025-01-03 │ 892   │ 45          │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─────────────────┐                                                       │
│  │  Import Data    │                                                       │
│  └─────────────────┘                                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2.4 Halaman Caption Generator (AI)

**Deskripsi**: Tool untuk generate caption menggunakan AI

**Komponen UI**:
- Form input (tema, platform, tone, kata kunci, CTA)
- Generate button
- Result display area
- Copy to clipboard button
- Regenerate option

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 📊 Analytics Sosmed    Analytics ▾  Planning ▾  Tools ▾  Laporan  👤 User ▾│
├────────────────────────────────────────────────────────────────────────────┤
│ Caption Generator AI 🤖                                                     │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────────────────────┐ ┌──────────────────────────────┐ │
│  │ Input                                │ │ Hasil                        │ │
│  │                                      │ │                              │ │
│  │ Tema/Topik *                        │ │ ┌────────────────────────┐   │ │
│  │ ┌────────────────────────────────┐  │ │ │                        │   │ │
│  │ │ Promo produk skincare          │  │ │ │ 🌟 Kulit Glowing?      │   │ │
│  │ └────────────────────────────────┘  │ │ │ Itu Bukan Mimpi! 🌟    │   │ │
│  │                                      │ │ │                        │   │ │
│  │ Platform                            │ │ │ Hai Beauties! 💕       │   │ │
│  │ ┌──────────────────────────────┐   │ │ │                        │   │ │
│  │ │ Instagram               ▾    │   │ │ │ Udah pada tau belum    │   │ │
│  │ └──────────────────────────────┘   │ │ │ rahasia kulit glowing  │   │ │
│  │                                      │ │ │ tanpa ribet?           │   │ │
│  │ Tone/Gaya                           │ │ │                        │   │ │
│  │ ┌──────────────────────────────┐   │ │ │ Yuk cobain sekarang!   │   │ │
│  │ │ Friendly & Casual       ▾    │   │ │ │ Link di bio 👆         │   │ │
│  │ └──────────────────────────────┘   │ │ │                        │   │ │
│  │                                      │ │ │ #skincare #glowingskin │   │ │
│  │ Kata Kunci (opsional)               │ │ │ #beauty #promo         │   │ │
│  │ ┌────────────────────────────────┐  │ │ │                        │   │ │
│  │ │ glowing, natural, promo       │  │ │ └────────────────────────┘   │ │
│  │ └────────────────────────────────┘  │ │                              │ │
│  │                                      │ │ ┌──────────┐ ┌──────────┐   │ │
│  │ Call-to-Action                      │ │ │ 📋 Copy   │ │ 🔄 Ulang │   │ │
│  │ ┌──────────────────────────────┐   │ │ └──────────┘ └──────────┘   │ │
│  │ │ Shop Now               ▾    │   │ │                              │ │
│  │ └──────────────────────────────┘   │ └──────────────────────────────┘ │
│  │                                      │                                  │
│  │ ┌────────────────────────────────┐  │                                  │
│  │ │    ✨ Generate Caption         │  │                                  │
│  │ └────────────────────────────────┘  │                                  │
│  │                                      │                                  │
│  └──────────────────────────────────────┘                                  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6.3 Objek Layar dan Tindakan

### 6.3.1 Tabel Objek Layar - Halaman Login

| No | Objek | Tipe | Tindakan |
|----|-------|------|----------|
| 1 | Tab Login | Tab Button | Menampilkan form login |
| 2 | Tab Daftar | Tab Button | Menampilkan form registrasi |
| 3 | Input Email | Text Field | Input alamat email |
| 4 | Input Password | Password Field | Input password |
| 5 | Input Nama Lengkap | Text Field | Input nama (hanya daftar) |
| 6 | Tombol Submit | Button | Mengirim form autentikasi |

### 6.3.2 Tabel Objek Layar - Dashboard

| No | Objek | Tipe | Tindakan |
|----|-------|------|----------|
| 1 | Project Selector | Dropdown | Memilih proyek aktif |
| 2 | Dataset Selector | Dropdown | Memilih dataset aktif |
| 3 | KPI Card | Display Card | Menampilkan metrik utama |
| 4 | Line Chart | Interactive Chart | Visualisasi trend dengan hover details |
| 5 | Bar Chart | Interactive Chart | Visualisasi distribusi dengan click filter |
| 6 | Insight Card | Display Card | Menampilkan AI insight |
| 7 | Customize Button | Button | Membuka dialog kustomisasi widget |
| 8 | Export Button | Button | Export data ke PDF/Excel |
| 9 | Notes Button | Button | Membuka dialog catatan |
| 10 | Navigation Menu | Dropdown Menu | Navigasi ke halaman lain |
| 11 | Theme Toggle | Toggle Button | Switch dark/light mode |
| 12 | Notification Bell | Icon Button | Membuka notification center |
| 13 | User Dropdown | Dropdown Menu | Akses profil dan logout |

### 6.3.3 Tabel Objek Layar - Import Data

| No | Objek | Tipe | Tindakan |
|----|-------|------|----------|
| 1 | File Upload Zone | Drop Zone | Drag & drop atau click untuk upload file |
| 2 | Dataset Name Input | Text Field | Input nama dataset |
| 3 | Preview Table | Data Table | Menampilkan preview data CSV |
| 4 | Column Mapping | Select Fields | Mapping kolom CSV ke field sistem |
| 5 | Validation Alert | Alert Component | Menampilkan error validasi |
| 6 | Import Button | Button | Memulai proses import |
| 7 | Cancel Button | Button | Membatalkan import |

### 6.3.4 Tabel Objek Layar - Caption Generator

| No | Objek | Tipe | Tindakan |
|----|-------|------|----------|
| 1 | Tema Input | Text Area | Input tema/topik konten |
| 2 | Platform Select | Dropdown | Memilih platform target |
| 3 | Tone Select | Dropdown | Memilih gaya penulisan |
| 4 | Keywords Input | Text Field | Input kata kunci (opsional) |
| 5 | CTA Select | Dropdown | Memilih call-to-action |
| 6 | Generate Button | Button | Memulai generate caption AI |
| 7 | Result Display | Text Area | Menampilkan hasil caption |
| 8 | Copy Button | Button | Copy caption ke clipboard |
| 9 | Regenerate Button | Button | Generate ulang caption |
| 10 | Loading Indicator | Spinner | Menampilkan status loading |

---

## 6.4 Matriks Persyaratan

### Matriks Fungsional vs Halaman

| Req ID | Kebutuhan Fungsional | Auth | Dashboard | Import | Performa | Waktu | Audiens | Laporan | Caption | Admin |
|--------|----------------------|:----:|:---------:|:------:|:--------:|:-----:|:-------:|:-------:|:-------:|:-----:|
| FR-01 | Login/Register | ✓ | | | | | | | | |
| FR-02 | Manajemen Proyek | | ✓ | | | | | | | |
| FR-03 | Import Data CSV | | | ✓ | | | | | | |
| FR-04 | Lihat Dashboard KPI | | ✓ | | | | | | | |
| FR-05 | Analisis Performa | | | | ✓ | | | | | |
| FR-06 | Analisis Waktu Terbaik | | | | | ✓ | | | | |
| FR-07 | Analisis Audiens | | | | | | ✓ | | | |
| FR-08 | Generate Laporan PDF | | | | | | | ✓ | | |
| FR-09 | Generate Caption AI | | | | | | | | ✓ | |
| FR-10 | Kelola Master Data | | | | | | | | | ✓ |
| FR-11 | Jawab Pertanyaan | | | | | | | | | ✓ |

### Matriks Role vs Akses

| Halaman | Admin | User (Owner) | User (Editor) | User (Viewer) | Guest |
|---------|:-----:|:------------:|:-------------:|:-------------:|:-----:|
| Login/Register | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✗ |
| Import Data | ✓ | ✓ | ✓ | ✗ | ✗ |
| Performa | ✓ | ✓ | ✓ | ✓ | ✗ |
| Waktu Terbaik | ✓ | ✓ | ✓ | ✓ | ✗ |
| Audiens | ✓ | ✓ | ✓ | ✓ | ✗ |
| Platform | ✓ | ✓ | ✓ | ✓ | ✗ |
| Perbandingan | ✓ | ✓ | ✓ | ✓ | ✗ |
| Target KPI | ✓ | ✓ | ✓ | ✗ | ✗ |
| Kampanye | ✓ | ✓ | ✓ | ✗ | ✗ |
| Caption Generator | ✓ | ✓ | ✓ | ✓ | ✗ |
| Kompetitor | ✓ | ✓ | ✓ | ✓ | ✗ |
| Anggota Proyek | ✓ | ✓ | ✗ | ✗ | ✗ |
| Laporan | ✓ | ✓ | ✓ | ✓ | ✗ |
| Bantuan | ✓ | ✓ | ✓ | ✓ | ✗ |
| Bantuan Admin | ✓ | ✗ | ✗ | ✗ | ✗ |
| Admin Master Data | ✓ | ✗ | ✗ | ✗ | ✗ |

---

# 7. LAMPIRAN

## 7.1 Daftar Enums Database

| Enum Name | Values | Deskripsi |
|-----------|--------|-----------|
| `app_role` | 'admin', 'user' | Role aplikasi tingkat sistem |
| `project_role` | 'owner', 'admin', 'editor', 'viewer' | Role dalam proyek |
| `source_type` | 'upload_csv', 'google_sheets', 'api_connection' | Sumber data |
| `import_status` | 'pending', 'success', 'error' | Status import |
| `period_type` | 'weekly', 'monthly' | Jenis periode KPI |
| `scope_type` | 'dataset', 'page', 'global' | Scope catatan |
| `invitation_status` | 'pending', 'accepted', 'rejected' | Status undangan |

## 7.2 Daftar Edge Functions

| Function Name | Trigger | Deskripsi |
|---------------|---------|-----------|
| `generate-caption` | HTTP Request | Generate caption menggunakan Gemini AI |
| `notify-admin-new-question` | Database Trigger | Kirim email notifikasi ke admin saat ada pertanyaan baru |
| `notify-user-question-answered` | Database Trigger | Kirim email notifikasi ke user saat pertanyaan dijawab |

## 7.3 Daftar RLS Policies

| Table | Policy Name | Command | Expression |
|-------|-------------|---------|------------|
| proyek | Users can view accessible projects | SELECT | `id_pemilik = auth.uid() OR has_project_access(id_proyek)` |
| proyek | Users can create own projects | INSERT | `auth.uid() = id_pemilik` |
| proyek | Project owners can update | UPDATE | `id_pemilik = auth.uid()` |
| proyek | Project owners can delete | DELETE | `id_pemilik = auth.uid()` |
| postingan | Users can view posts for accessible projects | SELECT | `has_project_access(id_proyek)` |
| postingan | Users can manage posts for accessible projects | ALL | `has_project_access(id_proyek)` |
| platform | Everyone can view active platforms | SELECT | `true` |
| platform | Admins can insert/update/delete platforms | INSERT/UPDATE/DELETE | `is_admin()` |
| pertanyaan | All users can view all questions | SELECT | `true` |
| pertanyaan | Users can create questions | INSERT | `auth.uid() = id_pengguna AND has_project_access(id_proyek)` |
| pertanyaan | Admins can answer questions | UPDATE | `is_admin()` |

## 7.4 Daftar Database Functions

| Function Name | Returns | Description |
|---------------|---------|-------------|
| `has_project_access(project_id)` | BOOLEAN | Cek apakah user memiliki akses ke proyek |
| `is_admin()` | BOOLEAN | Cek apakah user adalah admin |
| `handle_new_user()` | TRIGGER | Otomatis buat profil saat user baru register |
| `update_updated_at_column()` | TRIGGER | Update timestamp updated_at |
| `get_user_display_name(user_id)` | TEXT | Ambil nama tampilan user |
| `notify_admin_new_question()` | TRIGGER | Trigger notifikasi admin |
| `notify_user_question_answered()` | TRIGGER | Trigger notifikasi user |

## 7.5 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | URL Supabase project | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key | Yes |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API key (Edge Function secret) | Yes |
| `RESEND_API_KEY` | Resend email API key (Edge Function secret) | Yes |

---

## Riwayat Revisi Dokumen

| Versi | Tanggal | Penulis | Deskripsi Perubahan |
|-------|---------|---------|---------------------|
| 1.0 | 6 Januari 2025 | Maarif Alawi | Dokumen awal |

---

**Dokumen ini dibuat sebagai panduan teknis untuk pengembangan dan maintenance Social Media Analytics Dashboard.**

*© 2025 Maarif Alawi - All Rights Reserved*
