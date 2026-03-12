export interface UATScenario {
  no: number;
  halaman: string;
  skenario: string;
  hasilDiharapkan: string;
  hasil: string;
  ttd: string;
}

export const uatScenarios: UATScenario[] = [
  // === AUTENTIKASI ===
  {
    no: 1,
    halaman: "Halaman Auth",
    skenario: "Membuka halaman Auth dengan URL: /auth",
    hasilDiharapkan: "Menampilkan halaman Auth dengan form Login dan tab Daftar",
    hasil: "",
    ttd: ""
  },
  {
    no: 2,
    halaman: "Halaman Auth",
    skenario: "Klik tab \"Daftar\"",
    hasilDiharapkan: "Menampilkan form pendaftaran dengan field: Nama Lengkap, Email, Password",
    hasil: "",
    ttd: ""
  },
  {
    no: 3,
    halaman: "Halaman Auth",
    skenario: "Mengisi form Daftar dengan data valid, lalu klik \"Daftar\"\n- Nama: Pengguna Test\n- Email: testuser@email.com\n- Password: test1234",
    hasilDiharapkan: "Pendaftaran berhasil, notifikasi muncul: \"Akun berhasil dibuat! Silakan login.\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 4,
    halaman: "Halaman Auth",
    skenario: "Mengisi form Daftar dengan email yang sudah terdaftar\n- Nama: Test User\n- Email: existing@email.com\n- Password: test1234",
    hasilDiharapkan: "Pendaftaran gagal, notifikasi muncul: \"Email sudah terdaftar. Silakan gunakan email lain atau login.\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 5,
    halaman: "Halaman Auth",
    skenario: "Mengisi form Daftar dengan password kurang dari 6 karakter\n- Password: 12345",
    hasilDiharapkan: "Muncul pesan error: \"Password minimal 6 karakter\". Tombol Daftar disabled.",
    hasil: "",
    ttd: ""
  },
  {
    no: 6,
    halaman: "Halaman Auth",
    skenario: "Mengisi form Daftar dengan password lebih dari 16 karakter\n- Password: 12345678901234567",
    hasilDiharapkan: "Muncul pesan error: \"Password maksimal 16 karakter\". Tombol Daftar disabled.",
    hasil: "",
    ttd: ""
  },
  {
    no: 7,
    halaman: "Halaman Auth",
    skenario: "Mengisi form Daftar dengan format email tidak valid\n- Email: emailtanpaat",
    hasilDiharapkan: "Muncul pesan error validasi email. Form tidak tersubmit.",
    hasil: "",
    ttd: ""
  },
  {
    no: 8,
    halaman: "Halaman Auth",
    skenario: "Mengisi form Daftar dengan nama kosong\n- Nama: (kosong)\n- Email: test@email.com\n- Password: test1234",
    hasilDiharapkan: "Muncul pesan error: \"Nama harus diisi\". Form tidak tersubmit.",
    hasil: "",
    ttd: ""
  },
  {
    no: 9,
    halaman: "Halaman Auth",
    skenario: "Klik tab \"Login\"",
    hasilDiharapkan: "Menampilkan form login dengan field: Email, Password",
    hasil: "",
    ttd: ""
  },
  {
    no: 10,
    halaman: "Halaman Auth",
    skenario: "Mengisi Email benar, Password benar, lalu klik \"Login\"\n- Email: user@email.com\n- Password: password123",
    hasilDiharapkan: "Login berhasil, diarahkan ke Dashboard. Notifikasi: \"Login berhasil!\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 11,
    halaman: "Halaman Auth",
    skenario: "Mengisi Email salah, Password benar, lalu klik \"Login\"\n- Email: salah@email.com\n- Password: password123",
    hasilDiharapkan: "Login gagal, notifikasi error: \"Invalid login credentials\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 12,
    halaman: "Halaman Auth",
    skenario: "Mengisi Email benar, Password salah, lalu klik \"Login\"\n- Email: user@email.com\n- Password: wrongpass",
    hasilDiharapkan: "Login gagal, notifikasi error: \"Invalid login credentials\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 13,
    halaman: "Halaman Auth",
    skenario: "Mengisi Email salah, Password salah, lalu klik \"Login\"\n- Email: salah@email.com\n- Password: wrongpass",
    hasilDiharapkan: "Login gagal, notifikasi error: \"Invalid login credentials\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 14,
    halaman: "Halaman Auth",
    skenario: "Mengisi Email kosong, Password diisi, lalu klik \"Login\"\n- Email: (kosong)\n- Password: password123",
    hasilDiharapkan: "Muncul validasi error pada field email. Form tidak tersubmit.",
    hasil: "",
    ttd: ""
  },
  {
    no: 15,
    halaman: "Halaman Auth",
    skenario: "Mengisi Email diisi, Password kosong, lalu klik \"Login\"\n- Email: user@email.com\n- Password: (kosong)",
    hasilDiharapkan: "Muncul validasi error pada field password. Form tidak tersubmit.",
    hasil: "",
    ttd: ""
  },

  // === MANAJEMEN PROJECT ===
  {
    no: 16,
    halaman: "Dashboard",
    skenario: "Setelah login, melihat tampilan Dashboard",
    hasilDiharapkan: "Menampilkan Dashboard dengan pesan \"Belum ada project\" jika user baru",
    hasil: "",
    ttd: ""
  },
  {
    no: 17,
    halaman: "Dashboard",
    skenario: "Klik tombol \"+ Buat Project Baru\" atau icon \"+\"",
    hasilDiharapkan: "Diarahkan ke halaman /projects/new",
    hasil: "",
    ttd: ""
  },
  {
    no: 18,
    halaman: "Project New",
    skenario: "Mengisi form project dengan data lengkap, lalu klik \"Buat Project\"\n- Nama: UMKM Kopi Nusantara\n- Deskripsi: Analisis sosmed bisnis kopi",
    hasilDiharapkan: "Project berhasil dibuat. Notifikasi: \"Project berhasil dibuat!\". Diarahkan ke halaman Import.",
    hasil: "",
    ttd: ""
  },
  {
    no: 19,
    halaman: "Project New",
    skenario: "Mengisi form project tanpa nama, lalu klik \"Buat Project\"\n- Nama: (kosong)",
    hasilDiharapkan: "Muncul notifikasi error: \"Nama project harus diisi\". Form tidak tersubmit.",
    hasil: "",
    ttd: ""
  },
  {
    no: 20,
    halaman: "Project New",
    skenario: "Klik tombol \"Batal\"",
    hasilDiharapkan: "Diarahkan kembali ke Dashboard. Project tidak tersimpan.",
    hasil: "",
    ttd: ""
  },
  {
    no: 21,
    halaman: "Dashboard",
    skenario: "Klik dropdown \"Pilih Project\" di header",
    hasilDiharapkan: "Dropdown menampilkan daftar project yang dimiliki user",
    hasil: "",
    ttd: ""
  },
  {
    no: 22,
    halaman: "Dashboard",
    skenario: "Pilih project dari dropdown",
    hasilDiharapkan: "Project terpilih, data dashboard diperbarui sesuai project yang dipilih",
    hasil: "",
    ttd: ""
  },
  {
    no: 23,
    halaman: "Dashboard",
    skenario: "Klik dropdown \"Pilih Dataset\" di header",
    hasilDiharapkan: "Dropdown menampilkan daftar dataset dari project yang dipilih",
    hasil: "",
    ttd: ""
  },

  // === IMPORT DATA ===
  {
    no: 24,
    halaman: "Import",
    skenario: "Klik menu \"Import\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Import dengan area upload dan daftar dataset",
    hasil: "",
    ttd: ""
  },
  {
    no: 25,
    halaman: "Import",
    skenario: "Klik tombol \"Download Template\"",
    hasilDiharapkan: "File template CSV terdownload dengan kolom yang sesuai format",
    hasil: "",
    ttd: ""
  },
  {
    no: 26,
    halaman: "Import",
    skenario: "Upload file CSV dengan format dan data valid via drag & drop",
    hasilDiharapkan: "File terupload, preview data ditampilkan dalam tabel",
    hasil: "",
    ttd: ""
  },
  {
    no: 27,
    halaman: "Import",
    skenario: "Upload file CSV dengan format valid, lalu klik \"Import\"",
    hasilDiharapkan: "Import berhasil. Notifikasi: \"Berhasil import X posts!\". Dataset muncul di daftar.",
    hasil: "",
    ttd: ""
  },
  {
    no: 28,
    halaman: "Import",
    skenario: "Upload file CSV dengan kolom tidak lengkap (misal tanpa kolom 'likes')",
    hasilDiharapkan: "Muncul notifikasi error: \"Kolom yang hilang: likes. Silakan download template.\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 29,
    halaman: "Import",
    skenario: "Upload file CSV kosong (tidak ada data)",
    hasilDiharapkan: "Muncul notifikasi error: \"File CSV kosong\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 30,
    halaman: "Import",
    skenario: "Upload file dengan format bukan CSV (misal .xlsx atau .txt)",
    hasilDiharapkan: "Muncul notifikasi error: \"Format file tidak didukung. Gunakan format CSV.\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 31,
    halaman: "Import",
    skenario: "Pilih tab \"Google Sheets\"",
    hasilDiharapkan: "Menampilkan form input URL Google Sheets",
    hasil: "",
    ttd: ""
  },
  {
    no: 32,
    halaman: "Import",
    skenario: "Masukkan URL Google Sheets yang valid dan public, lalu klik \"Preview\"",
    hasilDiharapkan: "Preview data ditampilkan dari Google Sheets",
    hasil: "",
    ttd: ""
  },
  {
    no: 33,
    halaman: "Import",
    skenario: "Masukkan URL Google Sheets yang tidak valid, lalu klik \"Preview\"",
    hasilDiharapkan: "Muncul notifikasi error: \"URL tidak valid\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 34,
    halaman: "Import",
    skenario: "Masukkan URL Google Sheets yang private (tidak bisa diakses)",
    hasilDiharapkan: "Muncul notifikasi error tentang akses ditolak",
    hasil: "",
    ttd: ""
  },
  {
    no: 35,
    halaman: "Import",
    skenario: "Melihat daftar dataset yang sudah diimport",
    hasilDiharapkan: "Tabel menampilkan dataset dengan: nama, sumber, jumlah baris, status aktif, tanggal",
    hasil: "",
    ttd: ""
  },
  {
    no: 36,
    halaman: "Import",
    skenario: "Klik tombol \"Aktifkan\" pada dataset yang tidak aktif",
    hasilDiharapkan: "Dataset menjadi aktif. Badge \"Aktif\" berpindah. Dashboard menampilkan data baru.",
    hasil: "",
    ttd: ""
  },
  {
    no: 37,
    halaman: "Import",
    skenario: "Klik icon hapus pada dataset, lalu konfirmasi",
    hasilDiharapkan: "Dataset berhasil dihapus. Notifikasi sukses muncul.",
    hasil: "",
    ttd: ""
  },
  {
    no: 38,
    halaman: "Import",
    skenario: "Klik icon hapus pada dataset, lalu batal",
    hasilDiharapkan: "Dialog tertutup. Dataset tidak terhapus.",
    hasil: "",
    ttd: ""
  },

  // === DASHBOARD ===
  {
    no: 39,
    halaman: "Dashboard",
    skenario: "Klik menu \"Dashboard\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Dashboard dengan KPI cards dan charts",
    hasil: "",
    ttd: ""
  },
  {
    no: 40,
    halaman: "Dashboard",
    skenario: "Melihat KPI Cards (dengan data tersedia)",
    hasilDiharapkan: "Ditampilkan 6 kartu: Total Posts, Avg ER, Followers, Median Reach, Save Rate, Share Rate",
    hasil: "",
    ttd: ""
  },
  {
    no: 41,
    halaman: "Dashboard",
    skenario: "Melihat chart \"Tren Engagement Rate Mingguan\"",
    hasilDiharapkan: "Chart line menampilkan tren ER mingguan dengan tooltip interaktif",
    hasil: "",
    ttd: ""
  },
  {
    no: 42,
    halaman: "Dashboard",
    skenario: "Hover pada data point di chart",
    hasilDiharapkan: "Tooltip muncul menampilkan nilai detail pada titik tersebut",
    hasil: "",
    ttd: ""
  },
  {
    no: 43,
    halaman: "Dashboard",
    skenario: "Melihat chart \"Distribusi Platform\"",
    hasilDiharapkan: "Chart bar menampilkan jumlah post per platform (Instagram, TikTok, dll)",
    hasil: "",
    ttd: ""
  },
  {
    no: 44,
    halaman: "Dashboard",
    skenario: "Melihat chart \"Distribusi Tipe Konten\"",
    hasilDiharapkan: "Chart bar menampilkan jumlah post per tipe konten (Reels, Story, dll)",
    hasil: "",
    ttd: ""
  },
  {
    no: 45,
    halaman: "Dashboard",
    skenario: "Melihat bagian \"Insight Otomatis\"",
    hasilDiharapkan: "Ditampilkan 3 insight: Tren ER, Distribusi Platform, Distribusi Tipe Konten",
    hasil: "",
    ttd: ""
  },
  {
    no: 46,
    halaman: "Dashboard",
    skenario: "Klik tombol \"Customize\"",
    hasilDiharapkan: "Dialog muncul dengan checkbox untuk mengaktifkan/menonaktifkan widget",
    hasil: "",
    ttd: ""
  },
  {
    no: 47,
    halaman: "Dashboard",
    skenario: "Uncheck widget \"platforms\" di dialog Customize, lalu tutup",
    hasilDiharapkan: "Widget Distribusi Platform hilang dari tampilan. Notifikasi: \"Pengaturan dashboard diperbarui!\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 48,
    halaman: "Dashboard",
    skenario: "Klik tombol \"Export\"",
    hasilDiharapkan: "Dropdown muncul dengan opsi: Export ke PDF, Export ke Excel",
    hasil: "",
    ttd: ""
  },
  {
    no: 49,
    halaman: "Dashboard",
    skenario: "Klik \"Export ke PDF\"",
    hasilDiharapkan: "File PDF terdownload dengan data dashboard",
    hasil: "",
    ttd: ""
  },
  {
    no: 50,
    halaman: "Dashboard",
    skenario: "Klik \"Export ke Excel\"",
    hasilDiharapkan: "File Excel (.xlsx) terdownload dengan data dashboard",
    hasil: "",
    ttd: ""
  },

  // === PERFORMA KONTEN ===
  {
    no: 51,
    halaman: "Performa",
    skenario: "Klik menu \"Performa\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Performa dengan tabel data post dan filter",
    hasil: "",
    ttd: ""
  },
  {
    no: 52,
    halaman: "Performa",
    skenario: "Melihat tabel data post",
    hasilDiharapkan: "Tabel menampilkan kolom: Post ID, Platform, Tanggal, Tipe, Caption, Reach, Views, Likes, Comments, Shares, Saved, Engagement, ER%",
    hasil: "",
    ttd: ""
  },
  {
    no: 53,
    halaman: "Performa",
    skenario: "Melihat badge performa pada post",
    hasilDiharapkan: "Post teratas 10% memiliki badge hijau \"Top 10%\". Post terbawah 10% memiliki badge merah \"Bottom 10%\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 54,
    halaman: "Performa",
    skenario: "Mengisi filter \"Dari Tanggal\" dan \"Sampai Tanggal\"\n- Dari: 2025-01-01\n- Sampai: 2025-01-31",
    hasilDiharapkan: "Tabel hanya menampilkan post dalam rentang tanggal tersebut",
    hasil: "",
    ttd: ""
  },
  {
    no: 55,
    halaman: "Performa",
    skenario: "Mengisi filter \"Reach Minimum\"\n- Nilai: 1000",
    hasilDiharapkan: "Tabel hanya menampilkan post dengan reach >= 1000",
    hasil: "",
    ttd: ""
  },
  {
    no: 56,
    halaman: "Performa",
    skenario: "Centang checkbox platform \"Instagram\", uncheck \"TikTok\"",
    hasilDiharapkan: "Tabel hanya menampilkan post dari platform Instagram",
    hasil: "",
    ttd: ""
  },
  {
    no: 57,
    halaman: "Performa",
    skenario: "Centang checkbox tipe konten \"Reels\", uncheck lainnya",
    hasilDiharapkan: "Tabel hanya menampilkan post dengan tipe Reels",
    hasil: "",
    ttd: ""
  },
  {
    no: 58,
    halaman: "Performa",
    skenario: "Mengisi field \"Search Caption\"\n- Search: \"promo\"",
    hasilDiharapkan: "Tabel hanya menampilkan post yang captionnya mengandung kata \"promo\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 59,
    halaman: "Performa",
    skenario: "Klik tombol sorting \"ER\"",
    hasilDiharapkan: "Tabel diurutkan berdasarkan Engagement Rate tertinggi ke terendah",
    hasil: "",
    ttd: ""
  },
  {
    no: 60,
    halaman: "Performa",
    skenario: "Klik tombol sorting \"Reach\"",
    hasilDiharapkan: "Tabel diurutkan berdasarkan Reach tertinggi ke terendah",
    hasil: "",
    ttd: ""
  },
  {
    no: 61,
    halaman: "Performa",
    skenario: "Klik tombol sorting \"Engagement\"",
    hasilDiharapkan: "Tabel diurutkan berdasarkan Total Engagement tertinggi ke terendah",
    hasil: "",
    ttd: ""
  },
  {
    no: 62,
    halaman: "Performa",
    skenario: "Klik tombol \"Export CSV\"",
    hasilDiharapkan: "File CSV terdownload dengan data yang sesuai filter yang aktif",
    hasil: "",
    ttd: ""
  },
  {
    no: 63,
    halaman: "Performa",
    skenario: "Klik tombol \"Simpan Filter\"",
    hasilDiharapkan: "Dialog muncul untuk mengisi nama filter",
    hasil: "",
    ttd: ""
  },
  {
    no: 64,
    halaman: "Performa",
    skenario: "Mengisi nama filter, lalu klik \"Simpan\"\n- Nama: Promo Instagram",
    hasilDiharapkan: "Filter tersimpan. Notifikasi: \"Filter berhasil disimpan!\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 65,
    halaman: "Performa",
    skenario: "Klik dropdown \"Filter Tersimpan\"",
    hasilDiharapkan: "Dropdown menampilkan daftar filter yang pernah disimpan",
    hasil: "",
    ttd: ""
  },
  {
    no: 66,
    halaman: "Performa",
    skenario: "Pilih filter tersimpan dari dropdown",
    hasilDiharapkan: "Filter diterapkan. Tabel diperbarui sesuai filter tersebut.",
    hasil: "",
    ttd: ""
  },
  {
    no: 67,
    halaman: "Performa",
    skenario: "Klik tombol \"Reset Filter\"",
    hasilDiharapkan: "Semua filter direset ke default. Tabel menampilkan semua data.",
    hasil: "",
    ttd: ""
  },
  {
    no: 68,
    halaman: "Performa",
    skenario: "Klik icon catatan pada post",
    hasilDiharapkan: "Dialog catatan muncul untuk menambahkan catatan pada post tersebut",
    hasil: "",
    ttd: ""
  },

  // === WAKTU TERBAIK ===
  {
    no: 69,
    halaman: "Waktu Terbaik",
    skenario: "Klik menu \"Waktu Terbaik\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Waktu Terbaik dengan Top 3 slot dan heatmap",
    hasil: "",
    ttd: ""
  },
  {
    no: 70,
    halaman: "Waktu Terbaik",
    skenario: "Melihat Top 3 slot waktu terbaik",
    hasilDiharapkan: "Ditampilkan 3 kartu dengan hari dan jam terbaik untuk posting beserta nilai metrik",
    hasil: "",
    ttd: ""
  },
  {
    no: 71,
    halaman: "Waktu Terbaik",
    skenario: "Klik tombol metrik \"Total Engagement\"",
    hasilDiharapkan: "Top 3 slot waktu diperbarui berdasarkan metrik Total Engagement",
    hasil: "",
    ttd: ""
  },
  {
    no: 72,
    halaman: "Waktu Terbaik",
    skenario: "Klik tombol metrik \"Reach\"",
    hasilDiharapkan: "Top 3 slot waktu diperbarui berdasarkan metrik Reach",
    hasil: "",
    ttd: ""
  },
  {
    no: 73,
    halaman: "Waktu Terbaik",
    skenario: "Pilih periode \"Minggu Ini\" dari dropdown",
    hasilDiharapkan: "Data difilter untuk minggu ini. Top 3 dan heatmap diperbarui.",
    hasil: "",
    ttd: ""
  },
  {
    no: 74,
    halaman: "Waktu Terbaik",
    skenario: "Pilih periode \"Bulan Ini\" dari dropdown",
    hasilDiharapkan: "Data difilter untuk bulan ini. Top 3 dan heatmap diperbarui.",
    hasil: "",
    ttd: ""
  },
  {
    no: 75,
    halaman: "Waktu Terbaik",
    skenario: "Centang \"Bandingkan dengan periode sebelumnya\"",
    hasilDiharapkan: "Muncul indikator tren (naik/turun) dibanding periode sebelumnya",
    hasil: "",
    ttd: ""
  },
  {
    no: 76,
    halaman: "Waktu Terbaik",
    skenario: "Melihat heatmap waktu posting",
    hasilDiharapkan: "Heatmap menampilkan intensitas metrik per hari dan jam. Warna lebih gelap = performa lebih baik",
    hasil: "",
    ttd: ""
  },
  {
    no: 77,
    halaman: "Waktu Terbaik",
    skenario: "Hover pada cell heatmap",
    hasilDiharapkan: "Tooltip muncul menampilkan detail: hari, jam, nilai metrik, jumlah post",
    hasil: "",
    ttd: ""
  },
  {
    no: 78,
    halaman: "Waktu Terbaik",
    skenario: "Melihat chart \"Frekuensi Posting per Jam\"",
    hasilDiharapkan: "Bar chart menampilkan jumlah post per jam (00:00 - 23:00)",
    hasil: "",
    ttd: ""
  },

  // === TARGET KPI ===
  {
    no: 79,
    halaman: "Target KPI",
    skenario: "Klik menu \"Target KPI\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Target KPI dengan daftar target dan tombol tambah",
    hasil: "",
    ttd: ""
  },
  {
    no: 80,
    halaman: "Target KPI",
    skenario: "Klik tombol \"Tambah Target\"",
    hasilDiharapkan: "Dialog form muncul untuk mengisi target KPI baru",
    hasil: "",
    ttd: ""
  },
  {
    no: 81,
    halaman: "Target KPI",
    skenario: "Mengisi form target dengan data lengkap, lalu klik \"Simpan\"\n- Periode: Bulanan\n- Tanggal: 2025-02-01 s/d 2025-02-28\n- Target Reach: 100000\n- Target ER: 5.5%\n- Target Followers: 10000",
    hasilDiharapkan: "Target berhasil ditambahkan. Notifikasi: \"Target KPI berhasil ditambahkan\". Muncul di daftar.",
    hasil: "",
    ttd: ""
  },
  {
    no: 82,
    halaman: "Target KPI",
    skenario: "Mengisi form target tanpa tanggal, lalu klik \"Simpan\"",
    hasilDiharapkan: "Muncul notifikasi error: \"Silakan lengkapi tanggal periode\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 83,
    halaman: "Target KPI",
    skenario: "Klik icon edit pada target yang ada",
    hasilDiharapkan: "Dialog edit muncul dengan data target yang sudah terisi",
    hasil: "",
    ttd: ""
  },
  {
    no: 84,
    halaman: "Target KPI",
    skenario: "Mengubah nilai target, lalu klik \"Update\"\n- Target ER: 6.0% (dari 5.5%)",
    hasilDiharapkan: "Target berhasil diupdate. Notifikasi: \"Target KPI berhasil diupdate\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 85,
    halaman: "Target KPI",
    skenario: "Klik icon hapus pada target, lalu konfirmasi",
    hasilDiharapkan: "Target berhasil dihapus. Notifikasi: \"Target KPI berhasil dihapus\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 86,
    halaman: "Target KPI",
    skenario: "Melihat progress bar pencapaian target",
    hasilDiharapkan: "Progress bar menampilkan persentase pencapaian target berdasarkan data aktual",
    hasil: "",
    ttd: ""
  },

  // === KAMPANYE ===
  {
    no: 87,
    halaman: "Kampanye",
    skenario: "Klik menu \"Kampanye\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Kampanye dengan daftar kampanye dan tombol tambah",
    hasil: "",
    ttd: ""
  },
  {
    no: 88,
    halaman: "Kampanye",
    skenario: "Klik tombol \"Tambah Kampanye\"",
    hasilDiharapkan: "Dialog form muncul untuk mengisi kampanye baru",
    hasil: "",
    ttd: ""
  },
  {
    no: 89,
    halaman: "Kampanye",
    skenario: "Mengisi form kampanye dengan data lengkap, lalu klik \"Simpan\"\n- Nama: Ramadan Sale 2025\n- Tanggal: 2025-03-01 s/d 2025-03-31\n- Catatan: Kampanye diskon Ramadan",
    hasilDiharapkan: "Kampanye berhasil ditambahkan. Notifikasi: \"Kampanye berhasil ditambahkan\". Muncul di daftar.",
    hasil: "",
    ttd: ""
  },
  {
    no: 90,
    halaman: "Kampanye",
    skenario: "Mengisi form kampanye tanpa nama, lalu klik \"Simpan\"",
    hasilDiharapkan: "Muncul notifikasi error: \"Silakan isi nama kampanye\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 91,
    halaman: "Kampanye",
    skenario: "Klik icon edit pada kampanye yang ada",
    hasilDiharapkan: "Dialog edit muncul dengan data kampanye yang sudah terisi",
    hasil: "",
    ttd: ""
  },
  {
    no: 92,
    halaman: "Kampanye",
    skenario: "Mengubah nama kampanye, lalu klik \"Update\"\n- Nama: Ramadan Super Sale 2025",
    hasilDiharapkan: "Kampanye berhasil diupdate. Notifikasi sukses muncul.",
    hasil: "",
    ttd: ""
  },
  {
    no: 93,
    halaman: "Kampanye",
    skenario: "Klik icon hapus pada kampanye, lalu konfirmasi",
    hasilDiharapkan: "Kampanye berhasil dihapus. Notifikasi: \"Kampanye berhasil dihapus\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 94,
    halaman: "Kampanye",
    skenario: "Melihat jumlah post yang terkait dengan kampanye",
    hasilDiharapkan: "Ditampilkan jumlah post yang tertagging dengan kampanye tersebut",
    hasil: "",
    ttd: ""
  },

  // === LAPORAN ===
  {
    no: 95,
    halaman: "Laporan",
    skenario: "Klik menu \"Laporan\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Laporan dengan form rentang tanggal",
    hasil: "",
    ttd: ""
  },
  {
    no: 96,
    halaman: "Laporan",
    skenario: "Mengisi tanggal mulai dan selesai, lalu klik \"Generate\"\n- Dari: 2025-01-01\n- Sampai: 2025-01-31",
    hasilDiharapkan: "Laporan di-generate dengan: KPI Summary, Top 5 & Bottom 5 Posts, Waktu Terbaik, Tipe Konten Terbaik",
    hasil: "",
    ttd: ""
  },
  {
    no: 97,
    halaman: "Laporan",
    skenario: "Generate laporan tanpa mengisi tanggal",
    hasilDiharapkan: "Muncul notifikasi error: \"Silakan pilih tanggal mulai dan selesai\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 98,
    halaman: "Laporan",
    skenario: "Generate laporan dengan rentang tanggal yang tidak memiliki data",
    hasilDiharapkan: "Muncul notifikasi: \"Tidak ada data pada rentang tanggal tersebut\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 99,
    halaman: "Laporan",
    skenario: "Klik tombol \"Print PDF\" setelah generate laporan",
    hasilDiharapkan: "Dialog print browser muncul. User dapat menyimpan sebagai PDF.",
    hasil: "",
    ttd: ""
  },
  {
    no: 100,
    halaman: "Laporan",
    skenario: "Melihat section Top 5 Post Terbaik",
    hasilDiharapkan: "Tabel menampilkan 5 post dengan performa terbaik",
    hasil: "",
    ttd: ""
  },
  {
    no: 101,
    halaman: "Laporan",
    skenario: "Melihat section Bottom 5 Post Terburuk",
    hasilDiharapkan: "Tabel menampilkan 5 post dengan performa terendah",
    hasil: "",
    ttd: ""
  },
  {
    no: 102,
    halaman: "Laporan",
    skenario: "Melihat section Rekomendasi Waktu Posting",
    hasilDiharapkan: "Ditampilkan rekomendasi hari dan jam terbaik untuk posting",
    hasil: "",
    ttd: ""
  },

  // === AI CAPTION GENERATOR ===
  {
    no: 103,
    halaman: "Caption Generator",
    skenario: "Klik menu \"Caption Generator\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Caption Generator dengan form input",
    hasil: "",
    ttd: ""
  },
  {
    no: 104,
    halaman: "Caption Generator",
    skenario: "Mengisi form caption dan klik \"Generate Caption dengan AI\"\n- Deskripsi: Promo diskon 20% untuk follower baru\n- Gaya: Friendly\n- Panjang: Sedang\n- Hashtag: Seperlunya\n- Emoji: Sedikit\n- Tujuan: Konversi",
    hasilDiharapkan: "AI menghasilkan 3 opsi caption. Notifikasi: \"Caption berhasil dibuat! 3 caption siap digunakan\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 105,
    halaman: "Caption Generator",
    skenario: "Generate caption tanpa mengisi deskripsi",
    hasilDiharapkan: "Muncul notifikasi error: \"Deskripsi diperlukan. Silakan isi deskripsi konten terlebih dahulu\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 106,
    halaman: "Caption Generator",
    skenario: "Klik tombol \"Salin\" pada salah satu caption hasil generate",
    hasilDiharapkan: "Caption tersalin ke clipboard. Notifikasi: \"Caption berhasil disalin ke clipboard\". Tombol berubah jadi \"Tersalin\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 107,
    halaman: "Caption Generator",
    skenario: "Pilih gaya bahasa \"Custom\", lalu isi keterangan custom",
    hasilDiharapkan: "Field input custom style muncul untuk diisi",
    hasil: "",
    ttd: ""
  },
  {
    no: 108,
    halaman: "Caption Generator",
    skenario: "Generate caption dengan custom style\n- Custom: Bahasa gaul anak Jaksel",
    hasilDiharapkan: "Caption dihasilkan dengan gaya sesuai custom style yang diminta",
    hasil: "",
    ttd: ""
  },
  {
    no: 109,
    halaman: "Caption Generator",
    skenario: "Mengubah pilihan panjang caption ke \"Panjang\"",
    hasilDiharapkan: "Caption yang dihasilkan lebih panjang dari opsi \"Sedang\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 110,
    halaman: "Caption Generator",
    skenario: "Mengubah pilihan hashtag ke \"Banyak\"",
    hasilDiharapkan: "Caption yang dihasilkan memiliki lebih banyak hashtag",
    hasil: "",
    ttd: ""
  },

  // === ANALISIS KOMPETITOR ===
  {
    no: 111,
    halaman: "Kompetitor",
    skenario: "Klik menu \"Analisis Kompetitor\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Analisis Kompetitor dengan daftar kompetitor dan tombol tambah",
    hasil: "",
    ttd: ""
  },
  {
    no: 112,
    halaman: "Kompetitor",
    skenario: "Klik tombol \"Tambah Kompetitor\"",
    hasilDiharapkan: "Dialog form muncul untuk mengisi data kompetitor baru",
    hasil: "",
    ttd: ""
  },
  {
    no: 113,
    halaman: "Kompetitor",
    skenario: "Mengisi form kompetitor dengan data lengkap, lalu klik \"Tambah\"\n- Nama: Kompetitor A\n- Platform: Instagram\n- Handle: @kompetitor_a\n- Deskripsi: Kompetitor utama",
    hasilDiharapkan: "Kompetitor berhasil ditambahkan. Notifikasi: \"Kompetitor berhasil ditambahkan\". Muncul sebagai kartu baru.",
    hasil: "",
    ttd: ""
  },
  {
    no: 114,
    halaman: "Kompetitor",
    skenario: "Mengisi form kompetitor tanpa nama",
    hasilDiharapkan: "Muncul notifikasi error: \"Nama kompetitor harus diisi\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 115,
    halaman: "Kompetitor",
    skenario: "Klik \"Tambah Data\" pada kartu kompetitor",
    hasilDiharapkan: "Dialog form muncul untuk mengisi metrik kompetitor",
    hasil: "",
    ttd: ""
  },
  {
    no: 116,
    halaman: "Kompetitor",
    skenario: "Mengisi data metrik kompetitor, lalu klik \"Simpan\"\n- Tanggal: 2025-01-20\n- Followers: 50000\n- ER: 4.5%\n- Total Posts: 200",
    hasilDiharapkan: "Data kompetitor tersimpan. Metrik terbaru ditampilkan di kartu. Notifikasi sukses.",
    hasil: "",
    ttd: ""
  },
  {
    no: 117,
    halaman: "Kompetitor",
    skenario: "Klik icon edit pada kompetitor",
    hasilDiharapkan: "Dialog edit muncul dengan data kompetitor yang sudah terisi",
    hasil: "",
    ttd: ""
  },
  {
    no: 118,
    halaman: "Kompetitor",
    skenario: "Mengubah deskripsi kompetitor, lalu klik \"Update\"",
    hasilDiharapkan: "Data kompetitor diupdate. Notifikasi: \"Kompetitor berhasil diupdate\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 119,
    halaman: "Kompetitor",
    skenario: "Klik icon hapus pada kompetitor, lalu konfirmasi",
    hasilDiharapkan: "Kompetitor berhasil dihapus. Notifikasi: \"Kompetitor berhasil dihapus\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 120,
    halaman: "Kompetitor",
    skenario: "Melihat chart \"Tren Followers\" kompetitor",
    hasilDiharapkan: "Chart line menampilkan perbandingan tren followers antar kompetitor",
    hasil: "",
    ttd: ""
  },
  {
    no: 121,
    halaman: "Kompetitor",
    skenario: "Melihat chart \"Perbandingan Engagement Rate\"",
    hasilDiharapkan: "Chart menampilkan perbandingan ER antar kompetitor",
    hasil: "",
    ttd: ""
  },
  {
    no: 122,
    halaman: "Kompetitor",
    skenario: "Hover pada chart kompetitor",
    hasilDiharapkan: "Tooltip muncul menampilkan detail nilai metrik",
    hasil: "",
    ttd: ""
  },

  // === ANGGOTA PROYEK ===
  {
    no: 123,
    halaman: "Anggota Proyek",
    skenario: "Klik menu \"Anggota Proyek\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Anggota Proyek dengan daftar anggota",
    hasil: "",
    ttd: ""
  },
  {
    no: 124,
    halaman: "Anggota Proyek",
    skenario: "Melihat pemilik proyek",
    hasilDiharapkan: "Ditampilkan kartu \"Pemilik Proyek\" dengan nama dan badge \"Pemilik\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 125,
    halaman: "Anggota Proyek",
    skenario: "Klik tombol \"Tambah Anggota\" (sebagai owner)",
    hasilDiharapkan: "Dialog form muncul untuk menambahkan anggota baru",
    hasil: "",
    ttd: ""
  },
  {
    no: 126,
    halaman: "Anggota Proyek",
    skenario: "Pilih pengguna dan peran, lalu klik \"Tambah\"\n- Pengguna: User B\n- Peran: Editor",
    hasilDiharapkan: "Anggota berhasil ditambahkan. Muncul di daftar. Notifikasi: \"Anggota berhasil ditambahkan\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 127,
    halaman: "Anggota Proyek",
    skenario: "Klik icon edit pada anggota",
    hasilDiharapkan: "Dialog edit muncul untuk mengubah peran anggota",
    hasil: "",
    ttd: ""
  },
  {
    no: 128,
    halaman: "Anggota Proyek",
    skenario: "Mengubah peran anggota dari Editor ke Viewer, lalu klik \"Simpan\"",
    hasilDiharapkan: "Peran berhasil diubah. Notifikasi: \"Peran berhasil diubah\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 129,
    halaman: "Anggota Proyek",
    skenario: "Klik icon hapus pada anggota, lalu konfirmasi",
    hasilDiharapkan: "Anggota berhasil dihapus dari proyek. Notifikasi: \"Anggota berhasil dihapus\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 130,
    halaman: "Anggota Proyek",
    skenario: "Melihat badge peran pada setiap anggota",
    hasilDiharapkan: "Setiap anggota memiliki badge sesuai perannya: Owner, Admin, Editor, Viewer",
    hasil: "",
    ttd: ""
  },

  // === BANTUAN (Q&A) ===
  {
    no: 131,
    halaman: "Bantuan",
    skenario: "Klik menu \"Bantuan\" di navigasi",
    hasilDiharapkan: "Menampilkan halaman Bantuan dengan form pertanyaan dan riwayat",
    hasil: "",
    ttd: ""
  },
  {
    no: 132,
    halaman: "Bantuan",
    skenario: "Mengisi form pertanyaan dengan lengkap, lalu klik \"Kirim Pertanyaan\"\n- Judul: Bagaimana cara import data?\n- Pertanyaan: Format CSV yang benar seperti apa?",
    hasilDiharapkan: "Pertanyaan berhasil dikirim. Muncul di riwayat dengan status \"Menunggu\". Notifikasi: \"Pertanyaan berhasil dikirim\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 133,
    halaman: "Bantuan",
    skenario: "Mengirim pertanyaan tanpa judul",
    hasilDiharapkan: "Muncul notifikasi error: \"Judul dan pertanyaan harus diisi\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 134,
    halaman: "Bantuan",
    skenario: "Klik tombol filter \"Semua\"",
    hasilDiharapkan: "Riwayat menampilkan semua pertanyaan (menunggu dan dijawab)",
    hasil: "",
    ttd: ""
  },
  {
    no: 135,
    halaman: "Bantuan",
    skenario: "Klik tombol filter \"Dijawab\"",
    hasilDiharapkan: "Riwayat hanya menampilkan pertanyaan dengan status \"Dijawab\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 136,
    halaman: "Bantuan",
    skenario: "Klik tombol \"Pertanyaan Saya\"",
    hasilDiharapkan: "Riwayat hanya menampilkan pertanyaan dari user yang sedang login",
    hasil: "",
    ttd: ""
  },
  {
    no: 137,
    halaman: "Bantuan",
    skenario: "Mengisi field pencarian\n- Search: \"import\"",
    hasilDiharapkan: "Riwayat hanya menampilkan pertanyaan yang mengandung kata \"import\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 138,
    halaman: "Bantuan",
    skenario: "Klik \"Beri Rating\" pada pertanyaan yang sudah dijawab milik sendiri",
    hasilDiharapkan: "Dialog rating muncul dengan pilihan 1-5 bintang",
    hasil: "",
    ttd: ""
  },
  {
    no: 139,
    halaman: "Bantuan",
    skenario: "Pilih rating 5 bintang dan isi komentar, lalu klik \"Kirim Rating\"",
    hasilDiharapkan: "Rating tersimpan. Bintang ditampilkan pada kartu pertanyaan. Notifikasi sukses.",
    hasil: "",
    ttd: ""
  },
  {
    no: 140,
    halaman: "Bantuan",
    skenario: "Klik icon edit pada pertanyaan sendiri yang masih \"Menunggu\"",
    hasilDiharapkan: "Dialog edit muncul untuk mengubah judul atau isi pertanyaan",
    hasil: "",
    ttd: ""
  },
  {
    no: 141,
    halaman: "Bantuan",
    skenario: "Mengubah isi pertanyaan, lalu klik \"Simpan\"",
    hasilDiharapkan: "Pertanyaan berhasil diupdate. Notifikasi sukses muncul.",
    hasil: "",
    ttd: ""
  },
  {
    no: 142,
    halaman: "Bantuan",
    skenario: "Klik icon hapus pada pertanyaan sendiri, lalu konfirmasi",
    hasilDiharapkan: "Pertanyaan berhasil dihapus. Notifikasi: \"Pertanyaan berhasil dihapus\"",
    hasil: "",
    ttd: ""
  },

  // === NOTIFIKASI ===
  {
    no: 143,
    halaman: "Header",
    skenario: "Klik icon lonceng di header",
    hasilDiharapkan: "Dropdown notifikasi terbuka menampilkan daftar notifikasi terbaru",
    hasil: "",
    ttd: ""
  },
  {
    no: 144,
    halaman: "Header",
    skenario: "Melihat notifikasi pertanyaan dijawab (setelah admin menjawab)",
    hasilDiharapkan: "Muncul notifikasi baru. Badge unread muncul pada icon lonceng.",
    hasil: "",
    ttd: ""
  },
  {
    no: 145,
    halaman: "Header",
    skenario: "Klik salah satu notifikasi",
    hasilDiharapkan: "Notifikasi ditandai sebagai dibaca. Badge unread berkurang.",
    hasil: "",
    ttd: ""
  },
  {
    no: 146,
    halaman: "Header",
    skenario: "Klik \"Tandai semua dibaca\"",
    hasilDiharapkan: "Semua notifikasi ditandai sebagai dibaca. Badge unread hilang.",
    hasil: "",
    ttd: ""
  },

  // === PENGATURAN TEMA ===
  {
    no: 147,
    halaman: "Header",
    skenario: "Klik icon tema di header, lalu pilih \"Dark\"",
    hasilDiharapkan: "Tema berubah ke dark mode. Background gelap, teks terang.",
    hasil: "",
    ttd: ""
  },
  {
    no: 148,
    halaman: "Header",
    skenario: "Klik icon tema di header, lalu pilih \"Light\"",
    hasilDiharapkan: "Tema berubah ke light mode. Background terang, teks gelap.",
    hasil: "",
    ttd: ""
  },
  {
    no: 149,
    halaman: "Header",
    skenario: "Klik icon tema di header, lalu pilih \"System\"",
    hasilDiharapkan: "Tema mengikuti pengaturan sistem operasi user",
    hasil: "",
    ttd: ""
  },

  // === LOGOUT ===
  {
    no: 150,
    halaman: "Header",
    skenario: "Klik avatar/dropdown user di header",
    hasilDiharapkan: "Dropdown menu muncul dengan opsi: Profil, Logout",
    hasil: "",
    ttd: ""
  },
  {
    no: 151,
    halaman: "Header",
    skenario: "Klik tombol \"Logout\"",
    hasilDiharapkan: "User berhasil logout. Diarahkan ke halaman /auth. Notifikasi: \"Logout berhasil\"",
    hasil: "",
    ttd: ""
  },
  {
    no: 152,
    halaman: "Auth",
    skenario: "Mencoba mengakses halaman Dashboard tanpa login (/dashboard)",
    hasilDiharapkan: "Diarahkan ke halaman /auth untuk login",
    hasil: "",
    ttd: ""
  }
];

export const documentInfo = {
  title: "DOKUMEN USER ACCEPTANCE TESTING (UAT)",
  project: "Social Media Analytics Dashboard",
  role: "Pengguna (User)",
  version: "1.0",
  date: new Date().toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }),
  totalScenarios: 152
};
