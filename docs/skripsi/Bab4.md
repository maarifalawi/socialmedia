# BAB IV

# HASIL DAN PEMBAHASAN

Bab ini memaparkan hasil dari pelaksanaan setiap tahapan penelitian yang telah diuraikan pada Bab III. Pemaparan disusun mengikuti urutan tahapan model *Waterfall*, dimulai dari hasil observasi terhadap akun media sosial Usaha Mikro, Kecil, dan Menengah (UMKM), hasil analisis kebutuhan sistem, hasil perancangan sistem, hasil implementasi sistem ke dalam kode program, hasil penerapan sistem pada lingkungan produksi, hingga hasil pengujian sistem secara fungsional dan penerimaan pengguna. Setiap sub-bab menyajikan hasil yang diperoleh disertai pembahasan singkat untuk memperjelas keterkaitan antara hasil dengan kebutuhan yang telah dirumuskan sebelumnya.

## 4.1 Hasil Observasi

Sub-bab ini memaparkan hasil observasi yang dilakukan terhadap satu akun media sosial UMKM yang berperan sebagai pencipta konten. Observasi dilaksanakan selama tiga bulan, yaitu mulai tanggal satu Februari dua ribu dua puluh enam sampai dengan tiga puluh April dua ribu dua puluh enam. Hasil observasi dijadikan sebagai sumber data utama yang akan diunggah ke dalam sistem dan diolah pada modul-modul analitik. Pemaparan hasil observasi dibagi menjadi dua bagian, yaitu profil akun UMKM yang diobservasi dan hasil pengumpulan data konten beserta metriknya.

### 4.1.1 Profil Akun UMKM yang Diobservasi

Akun UMKM yang menjadi objek observasi adalah akun [NAMA AKUN UMKM] yang bergerak pada bidang usaha [BIDANG USAHA UMKM]. Akun tersebut aktif menggunakan platform media sosial [NAMA PLATFORM, misalnya Instagram] sebagai kanal utama untuk memperkenalkan produk, menjalin interaksi dengan pelanggan, serta menyampaikan informasi promosi dan kegiatan usaha. Pemilihan akun ini didasarkan pada beberapa pertimbangan, yaitu akun masih dikelola secara mandiri oleh pemilik usaha, frekuensi unggahan konten yang relatif konsisten setiap minggunya, serta ketersediaan akses bagi peneliti untuk melakukan pencatatan metrik secara langsung melalui fitur statistik bawaan platform.

Pada awal periode observasi, akun memiliki jumlah pengikut sebanyak [JUMLAH PENGIKUT AWAL] orang dengan total unggahan kumulatif sebanyak [JUMLAH UNGGAHAN AWAL] konten. Selama periode observasi berlangsung, akun aktif memublikasikan konten dengan beragam format, antara lain unggahan foto tunggal, unggahan album berisi beberapa foto, unggahan video pendek, serta unggahan cerita singkat yang bersifat sementara. Variasi format konten ini menjadi penting untuk dianalisis karena setiap format memiliki karakteristik keterlibatan pengguna yang berbeda dan dapat memengaruhi efektivitas penyampaian pesan promosi.

Pemilihan satu akun UMKM sebagai objek observasi dilakukan dengan pertimbangan keterbatasan waktu penelitian dan kebutuhan untuk melakukan pencatatan metrik secara mendalam pada setiap konten yang diunggah. Pendekatan studi kasus dengan satu akun memberikan kedalaman data yang memadai untuk menguji seluruh fungsionalitas sistem yang dibangun, mulai dari pengelolaan dataset, pengolahan metrik, sampai dengan pembuatan ringkasan *insight* dan laporan akhir.

### 4.1.2 Hasil Pengumpulan Data Konten dan Metrik

Pengumpulan data dilakukan dengan cara meninjau setiap unggahan baru yang dipublikasikan oleh akun UMKM, kemudian mencatat atribut-atribut konten dan metrik kinerjanya ke dalam berkas *comma separated values*. Pencatatan dilakukan secara manual dengan acuan data yang ditampilkan oleh fitur statistik bawaan platform media sosial. Untuk konten dengan format unggahan permanen, pencatatan dilakukan setelah konten berusia minimal tujuh hari sejak waktu publikasi agar metrik yang dicatat sudah relatif stabil. Selama tiga bulan observasi, terkumpul sebanyak [JUMLAH KONTEN] unggahan konten yang menjadi sumber data utama penelitian.

Setiap baris data pada berkas *comma separated values* merepresentasikan satu unggahan konten dengan struktur kolom yang telah ditetapkan agar konsisten dengan kebutuhan modul impor pada sistem. Struktur kolom dataset hasil observasi disajikan pada Tabel 4.1.

**Tabel 4.1** Struktur Kolom Berkas *Comma Separated Values* Hasil Observasi

| No | Nama Kolom | Tipe Data | Keterangan |
|----|------------|-----------|------------|
| 1 | platform | Teks | Nama platform media sosial tempat konten dipublikasikan |
| 2 | content_type | Teks | Format konten, antara lain foto, album, video, atau cerita |
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
| 1 | Foto tunggal | [JUMLAH] | [PERSEN] |
| 2 | Album foto | [JUMLAH] | [PERSEN] |
| 3 | Video pendek | [JUMLAH] | [PERSEN] |
| 4 | Cerita singkat | [JUMLAH] | [PERSEN] |
| | Jumlah Total | [JUMLAH TOTAL] | 100,00 |

Hasil pengumpulan data menunjukkan bahwa akun UMKM yang diobservasi memiliki pola publikasi yang relatif teratur dengan frekuensi rata-rata [JUMLAH] unggahan per minggu. Rentang nilai metrik yang dicatat juga cukup bervariasi antar konten, dengan jangkauan terendah sebesar [NILAI] dan jangkauan tertinggi sebesar [NILAI]. Variasi nilai metrik ini penting karena memberikan rentang data yang memadai untuk menguji modul-modul analitik, terutama modul performa konten dan modul ringkasan *insight* yang membutuhkan distribusi data yang cukup untuk menghasilkan rekomendasi yang bermakna. Seluruh berkas hasil pengumpulan data disimpan dalam berkas tunggal berformat *comma separated values* yang siap digunakan sebagai masukan pada modul impor sistem.
