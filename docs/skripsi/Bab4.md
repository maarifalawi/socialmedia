# 4. HASIL DAN PEMBAHASAN

Pada bagian ini dipaparkan hasil dari pelaksanaan setiap tahapan penelitian yang telah diuraikan pada metode penelitian sebelumnya. Pemaparan disusun mengikuti urutan tahapan model *Waterfall*, dimulai dari hasil observasi terhadap akun media sosial Usaha Mikro, Kecil, dan Menengah (UMKM), hasil analisis kebutuhan sistem, hasil perancangan sistem, hasil implementasi sistem ke dalam kode program, hasil penerapan sistem pada lingkungan produksi, hingga hasil pengujian sistem secara fungsional dan penerimaan pengguna. Setiap sub-bagian menyajikan hasil yang diperoleh disertai pembahasan singkat untuk memperjelas keterkaitan antara hasil dengan kebutuhan yang telah dirumuskan sebelumnya.

## 4.1 Hasil Observasi

Bagian ini memaparkan hasil observasi yang dilakukan terhadap satu akun media sosial UMKM yang berperan sebagai pencipta konten. Observasi dilaksanakan selama tiga bulan, yaitu mulai tanggal satu Februari dua ribu dua puluh enam sampai dengan tiga puluh April dua ribu dua puluh enam. Hasil observasi dijadikan sebagai sumber data utama yang akan diunggah ke dalam sistem dan diolah pada modul-modul analitik. Pemaparan hasil observasi dibagi menjadi dua bagian, yaitu profil akun UMKM yang diobservasi dan hasil pengumpulan data konten beserta metriknya.

### 4.1.1 Profil Akun UMKM yang Diobservasi

Akun UMKM yang menjadi objek observasi adalah akun @MAARIVERSEA yang bergerak pada bidang usaha penjualan produk digital. Akun tersebut aktif menggunakan platform media sosial Instagram sebagai kanal utama untuk memperkenalkan produk, menjalin interaksi dengan pelanggan, serta menyampaikan informasi promosi dan kegiatan usaha. Pemilihan akun ini didasarkan pada beberapa pertimbangan, yaitu akun masih dikelola secara mandiri oleh pemilik usaha, frekuensi unggahan konten yang relatif konsisten setiap minggunya, serta ketersediaan akses bagi peneliti untuk melakukan pencatatan metrik secara langsung melalui fitur statistik bawaan platform.

Pada awal periode observasi, akun memiliki jumlah pengikut sebanyak enam puluh ribu orang dengan total unggahan kumulatif sebanyak lima puluh tujuh konten. Selama periode observasi berlangsung, akun aktif memublikasikan konten dengan beragam format, antara lain unggahan foto tunggal, unggahan album berisi beberapa foto, serta unggahan video pendek. Variasi format konten ini menjadi penting untuk dianalisis karena setiap format memiliki karakteristik keterlibatan pengguna yang berbeda dan dapat memengaruhi efektivitas penyampaian pesan promosi.

Pemilihan satu akun UMKM sebagai objek observasi dilakukan dengan pertimbangan keterbatasan waktu penelitian dan kebutuhan untuk melakukan pencatatan metrik secara mendalam pada setiap konten yang diunggah. Pendekatan studi kasus dengan satu akun memberikan kedalaman data yang memadai untuk menguji seluruh fungsionalitas sistem yang dibangun, mulai dari pengelolaan dataset, pengolahan metrik, sampai dengan pembuatan ringkasan *insight* dan laporan akhir.

### 4.1.2 Hasil Pengumpulan Data Konten dan Metrik

Pengumpulan data dilakukan dengan cara meninjau setiap unggahan baru yang dipublikasikan oleh akun UMKM, kemudian mencatat atribut-atribut konten dan metrik kinerjanya ke dalam berkas *comma separated values*. Pencatatan dilakukan secara manual dengan acuan data yang ditampilkan oleh fitur statistik bawaan platform media sosial. Pencatatan dilakukan setelah konten berusia minimal tujuh hari sejak waktu publikasi agar metrik yang dicatat sudah relatif stabil. Selama tiga bulan observasi, terkumpul sebanyak delapan puluh enam unggahan konten yang menjadi sumber data utama penelitian.

Setiap baris data pada berkas *comma separated values* merepresentasikan satu unggahan konten dengan struktur kolom yang telah ditetapkan agar konsisten dengan kebutuhan modul impor pada sistem. Struktur kolom dataset hasil observasi disajikan pada Tabel 4.1.

**Tabel 4.1** Struktur Kolom Berkas *Comma Separated Values* Hasil Observasi

| No | Nama Kolom | Tipe Data | Keterangan |
|----|------------|-----------|------------|
| 1 | platform | Teks | Nama platform media sosial tempat konten dipublikasikan |
| 2 | content_type | Teks | Format konten, antara lain foto, album, atau video |
| 3 | post_id | Teks | Pengenal unik unggahan konten |
| 4 | posted_at | Tanggal-Waktu | Tanggal dan waktu publikasi konten |
| 5 | reach | Bilangan Bulat | Jumlah akun unik yang melihat konten |
| 6 | likes | Bilangan Bulat | Jumlah suka yang diterima konten |
| 7 | comments | Bilangan Bulat | Jumlah komentar yang diterima konten |
| 8 | shares | Bilangan Bulat | Jumlah pembagian konten oleh pengguna lain |
| 9 | saved | Bilangan Bulat | Jumlah penyimpanan konten oleh pengguna |
| 10 | views | Bilangan Bulat | Jumlah penayangan konten, khusus format video |
| 11 | followers | Bilangan Bulat | Jumlah pengikut akun pada saat konten dicatat |
| 12 | caption | Teks | Teks keterangan yang menyertai konten |

Rekapitulasi jumlah konten yang berhasil dikumpulkan selama periode observasi dipaparkan berdasarkan format konten pada Tabel 4.2. Distribusi format konten ini menjadi acuan awal untuk modul performa konten yang akan membandingkan rata-rata keterlibatan pengguna pada setiap format.

**Tabel 4.2** Rekapitulasi Jumlah Konten Berdasarkan Format

| No | Format Konten | Jumlah Konten | Persentase |
|----|---------------|---------------|------------|
| 1 | Foto tunggal | 26 | 30,23 |
| 2 | Album foto | 22 | 25,58 |
| 3 | Video pendek | 38 | 44,19 |
| | Jumlah Total | 86 | 100,00 |

Hasil pengumpulan data menunjukkan bahwa akun UMKM yang diobservasi memiliki pola publikasi yang relatif teratur dengan frekuensi rata-rata tujuh unggahan per minggu, yang mencakup gabungan seluruh format konten. Rentang nilai metrik yang dicatat juga cukup bervariasi antar konten, dengan jangkauan terendah sebesar delapan ratus lima puluh akun unik dan jangkauan tertinggi sebesar dua puluh empat ribu lima ratus akun unik pada konten dengan format video pendek. Untuk metrik suka, nilai terendah tercatat sebesar tiga puluh dua dan nilai tertinggi sebesar seribu sembilan ratus delapan puluh empat, sedangkan untuk metrik komentar nilai terendah tercatat sebesar dua dan nilai tertinggi sebesar seratus tujuh puluh enam. Variasi nilai metrik ini penting karena memberikan rentang data yang memadai untuk menguji modul-modul analitik, terutama modul performa konten dan modul ringkasan *insight* yang membutuhkan distribusi data yang cukup untuk menghasilkan rekomendasi yang bermakna. Seluruh berkas hasil pengumpulan data disimpan dalam berkas tunggal berformat *comma separated values* yang siap digunakan sebagai masukan pada modul impor sistem.

## 4.2 Hasil Analisis Kebutuhan Sistem

Bagian ini memaparkan hasil identifikasi kebutuhan sistem yang telah dilakukan pada tahap analisis. Hasil analisis dibagi menjadi empat bagian, yaitu kebutuhan fungsional yang berisi daftar fitur yang harus disediakan sistem, kebutuhan non-fungsional yang berisi kualitas yang harus dipenuhi sistem, kebutuhan pengguna yang berisi karakteristik aktor yang berinteraksi dengan sistem, serta kebutuhan data yang berisi entitas dan atribut yang harus disimpan sistem. Hasil analisis ini menjadi dasar bagi tahap perancangan dan implementasi pada bagian berikutnya.

### 4.2.1 Hasil Analisis Kebutuhan Fungsional

Hasil analisis kebutuhan fungsional menghasilkan delapan modul utama yang harus disediakan oleh sistem. Setiap modul diberi kode unik dengan awalan SRS-F yang merujuk pada *Software Requirements Specification* untuk kebutuhan fungsional. Daftar lengkap kebutuhan fungsional disajikan pada Tabel 4.3.

**Tabel 4.3** Daftar Kebutuhan Fungsional Sistem

| Kode | Modul | Deskripsi Kebutuhan |
|------|-------|---------------------|
| SRS-F-01 | Autentikasi | Sistem harus menyediakan fitur pendaftaran akun, masuk, keluar, dan pemulihan kata sandi melalui surel pengguna. |
| SRS-F-02 | Manajemen Proyek | Sistem harus memungkinkan pengguna membuat, mengubah, melihat, dan menghapus proyek analisis untuk mengelompokkan dataset berdasarkan akun atau kampanye. |
| SRS-F-03 | Manajemen Dataset | Sistem harus memungkinkan pengguna membuat, mengubah, melihat, dan menghapus dataset yang merepresentasikan satu periode pengumpulan data pada satu proyek. |
| SRS-F-04 | Impor Data | Sistem harus dapat mengunggah berkas *comma separated values*, melakukan validasi struktur kolom, menampilkan pratinjau data, dan menyimpan data ke basis data setelah pengguna melakukan konfirmasi. |
| SRS-F-05 | *Dashboard* Ringkasan | Sistem harus menampilkan indikator kinerja utama dan grafik tren keterlibatan pengguna pada satu dataset terpilih. |
| SRS-F-06 | Performa Konten | Sistem harus menampilkan tabel performa setiap unggahan konten beserta perhitungan tingkat keterlibatan, dengan dukungan pengurutan, penyaringan, dan tampilan kartu untuk perangkat bergerak. |
| SRS-F-07 | Ringkasan *Insight* | Sistem harus menghasilkan ringkasan naratif berbasis kecerdasan buatan yang menjelaskan tren, kekuatan, dan rekomendasi tindak lanjut atas data dataset. |
| SRS-F-08 | Laporan dan Ekspor | Sistem harus menyediakan fitur penyusunan laporan analisis lengkap dengan kemampuan ekspor ke format *PDF* dan *Microsoft Excel*. |
| SRS-F-09 | Catatan dan Pengaturan | Sistem harus menyediakan fitur pencatatan rencana tindak lanjut per dataset serta pengelolaan profil dan kata sandi pengguna. |

Modul-modul tersebut dirancang agar saling terhubung dalam alur kerja yang berurutan, dimulai dari pengguna membuat proyek, menambahkan dataset, mengimpor data, melihat ringkasan pada *dashboard*, menelaah performa konten, membaca ringkasan *insight*, hingga menyusun laporan akhir. Penyusunan modul secara berurutan ini bertujuan agar pengguna dapat melakukan analisis secara sistematis tanpa kebingungan dalam menentukan langkah berikutnya.

### 4.2.2 Hasil Analisis Kebutuhan Non-Fungsional

Hasil analisis kebutuhan non-fungsional menghasilkan lima aspek kualitas yang harus dipenuhi oleh sistem. Setiap aspek diberi kode unik dengan awalan SRS-NF. Daftar lengkap kebutuhan non-fungsional disajikan pada Tabel 4.4.

**Tabel 4.4** Daftar Kebutuhan Non-Fungsional Sistem

| Kode | Aspek Kualitas | Deskripsi Kebutuhan |
|------|----------------|---------------------|
| SRS-NF-01 | Kinerja | Sistem harus mampu memuat halaman *dashboard* dalam waktu kurang dari tiga detik untuk dataset berisi maksimal seribu baris data. |
| SRS-NF-02 | Keamanan | Sistem harus menerapkan otentikasi berbasis token, kebijakan keamanan baris pada basis data, dan penyimpanan kata sandi dalam bentuk *hash*. |
| SRS-NF-03 | Kebergunaan | Sistem harus menyediakan antarmuka responsif yang dapat diakses melalui peramban di perangkat komputer maupun perangkat bergerak dengan tata letak yang menyesuaikan ukuran layar. |
| SRS-NF-04 | Portabilitas | Sistem harus dapat dijalankan pada peramban modern yang mendukung *JavaScript* terkini, antara lain *Google Chrome*, *Mozilla Firefox*, dan *Microsoft Edge*. |
| SRS-NF-05 | Kemampurawatan | Sistem harus dibangun menggunakan *TypeScript* dengan struktur komponen modular agar memudahkan pemeliharaan dan pengembangan lanjutan. |

Kelima aspek kualitas ini dirumuskan dengan mempertimbangkan karakteristik pengguna yang berasal dari kalangan UMKM dengan tingkat literasi teknologi yang beragam, sehingga aspek kebergunaan dan kinerja menjadi prioritas utama. Aspek keamanan ditempatkan sebagai kebutuhan wajib karena data media sosial yang dianalisis bersifat strategis bagi pemilik usaha dan tidak boleh dapat diakses oleh pihak yang tidak berwenang.

### 4.2.3 Hasil Analisis Kebutuhan Pengguna

Hasil analisis kebutuhan pengguna mengidentifikasi dua peran aktor yang berinteraksi dengan sistem, yaitu pemilik proyek dan anggota proyek. Pemilik proyek adalah pengguna yang membuat proyek dan memiliki kewenangan penuh atas seluruh dataset di dalamnya, termasuk mengundang anggota dan mengatur peran. Anggota proyek adalah pengguna yang diundang oleh pemilik untuk berkolaborasi pada satu proyek tertentu dengan kewenangan terbatas sesuai peran yang diberikan. Karakteristik kedua peran tersebut diringkas pada Tabel 4.5.

**Tabel 4.5** Karakteristik Pengguna Sistem

| No | Peran Pengguna | Kewenangan | Karakteristik |
|----|----------------|------------|---------------|
| 1 | Pemilik Proyek | Membuat proyek, mengelola dataset, mengundang anggota, mengubah peran anggota, menghapus proyek, mengakses seluruh fitur analitik dan ekspor laporan. | Pemilik atau pengelola UMKM yang bertanggung jawab atas strategi konten media sosial. |
| 2 | Anggota Proyek | Mengakses dataset proyek yang diundang, melihat *dashboard*, melihat performa konten, membaca ringkasan *insight*, dan mencatat rencana tindak lanjut sesuai peran yang diberikan. | Tim internal UMKM yang membantu pengelolaan konten, antara lain pengelola media sosial atau perancang grafis. |

Pemisahan peran ini diperlukan karena dalam praktik pengelolaan media sosial UMKM, pemilik usaha sering melibatkan tim kecil untuk mendukung produksi konten, namun tetap mempertahankan kontrol penuh atas data dan keputusan strategis. Sistem dirancang untuk mengakomodasi kebutuhan kolaborasi tersebut tanpa mengorbankan aspek keamanan data.

### 4.2.4 Hasil Analisis Kebutuhan Data

Hasil analisis kebutuhan data mengidentifikasi entitas-entitas utama yang harus disimpan oleh sistem agar seluruh kebutuhan fungsional dapat terpenuhi. Identifikasi entitas dilakukan dengan menelusuri alur kerja pengguna dari pendaftaran akun hingga penyusunan laporan akhir. Daftar entitas utama beserta deskripsi singkatnya disajikan pada Tabel 4.6.

**Tabel 4.6** Daftar Entitas Utama Sistem

| No | Nama Entitas | Deskripsi |
|----|--------------|-----------|
| 1 | profil | Menyimpan data profil pengguna yang terhubung dengan akun otentikasi. |
| 2 | proyek | Menyimpan data proyek analisis yang dimiliki oleh pengguna. |
| 3 | anggota_proyek | Menyimpan relasi antara proyek dengan pengguna anggota beserta perannya. |
| 4 | dataset | Menyimpan data dataset yang merepresentasikan periode pengumpulan data pada satu proyek. |
| 5 | platform | Menyimpan referensi platform media sosial, antara lain Instagram, *TikTok*, dan *Facebook*. |
| 6 | jenis_konten | Menyimpan referensi jenis konten, antara lain foto, album, dan video. |
| 7 | postingan | Menyimpan data setiap unggahan konten beserta seluruh metrik kinerjanya. |
| 8 | catatan | Menyimpan catatan rencana tindak lanjut yang dibuat pengguna pada setiap dataset. |
| 9 | log_impor | Menyimpan riwayat aktivitas impor berkas *comma separated values* untuk keperluan audit. |
| 10 | riwayat_export | Menyimpan riwayat aktivitas ekspor laporan untuk keperluan audit. |

Sepuluh entitas utama tersebut kemudian dijabarkan lebih lanjut pada tahap perancangan basis data dengan menambahkan atribut, kunci primer, kunci asing, dan relasi antar entitas. Penjabaran detail atribut setiap entitas dipaparkan pada bagian hasil perancangan sistem.
