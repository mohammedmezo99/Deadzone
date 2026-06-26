# Fitur Website ProjectMove

## 🌟 Fitur Publik

### 1. **Halaman Utama (Homepage)**
- Hero section premium dengan **dynamic broadcast alert**
- Highlight fitur unggulan dengan animasi hover tinggi
- **Statistik Dinamis**: Live counter untuk Active Users (50K+) dan Device Count
- Konten dinamis yang terupdate secara instan (No stale data)

### 2. **Halaman Fitur**
- Daftar lengkap fitur DeadZone
- Kartu fitur interaktif
- Demonstrasi visual
- UI premium dengan animasi

### 3. **Pusat Download**
- Interface pemilihan device
- Browsing versi ROM
- Link download langsung
- Informasi build (tanggal, ukuran, changelog)
- Akses arsip untuk versi lama

### 4. **Panduan Instalasi**
- Instruksi instalasi step-by-step
- Checklist persyaratan
- Bagian troubleshooting
- Disclaimer peringatan
- Catatan khusus per device

### 5. **Sistem FAQ**
- Konten FAQ dinamis dari database
- Fungsi pencarian
- Filter kategori
- UI accordion
- Mudah dinavigasi

### 6. **Kontak & Dukungan**
- Form kontak dengan 3 tipe:
  - Pertanyaan umum
  - Laporan bug
  - Permintaan fitur
- Validasi form
- Feedback sukses
- Langsung ke panel admin

### 7. **Galeri Screenshot**
- Grid gambar responsif
- Filter kategori
- Lightbox untuk gambar ukuran penuh
- Loading ter-optimasi
- Layout mobile-friendly

### 8. **Halaman Komunitas**
- Link media sosial dinamis
- Icon platform (GitHub, Telegram, Discord, Twitter)
- Panduan komunitas
- Call-to-action bergabung

### 9. **Halaman Tim**
- Profil anggota tim
- Indikator role
- Informasi negara
- Link sosial (Twitter, Website)
- Badge Founder/Developer

### 10. **Halaman Tentang**
- Informasi proyek
- Pernyataan misi
- Sejarah proyek

### 11. **Halaman Legal**
- Kebijakan Privasi
- Syarat & Ketentuan

### 13. **Sinkronisasi Data Instan** 🔄
- **Auto-Revalidation**: Pengeditan di admin otomatis membersihkan cache publik
- **Dynamic Routing**: Data krusial selalu fresh dari database (Force Dynamic)
- **Zero Delay**: Perubahan muncul di user gallery/FAQ/Social tanpa refresh manual

---

## ⚙️ Fitur Dashboard Admin

### Autentikasi
- Sistem login aman
- Manajemen sesi
- Route admin terproteksi

### 1. **Dashboard Overview**
- Statistik dan metrik
- Aksi cepat
- Aktivitas terbaru

### 2. **Dashboard Analytics** 📊
- **Statistik Real-time:**
  - Total download (sepanjang masa)
  - Download hari ini dengan pertumbuhan %
  - Download minggu ini
  - Download bulan ini
  - Jumlah device aktif

- **Analitik Visual:**
  - Chart tren download (30 hari terakhir)
  - Chart bar device populer (Top 10)
  - Distribusi geografis (Top 20 negara)
  - Breakdown kota untuk negara teratas

- **Enhanced Tracking:**
  - Alamat IP dan geolokasi
  - User agent (browser/OS)
  - Identifikasi device
  - Timestamp download

- **Aktivitas Real-Time**: Log sistem live dari aktivitas database aktual
- **Bottom Dock Navigation**: Navigasi mobile bergaya aplikasi native dengan efek blur
- **Glassmorphism Premium**: Overlay transparan dengan tingkat kejernihan tinggi

### 4. **Manajemen Device**
- Tambah/Edit/Hapus device
- Spesifikasi device
- Manajemen gambar
- Toggle Aktif/Nonaktif

### 3. **Manajemen ROM Cluster**
- Buat versi ROM
- Upload file ROM
- Tambah changelog
- Set tanggal build dan ukuran
- Arsipkan ROM lama
- Link ROM ke device

### 4. **Manajemen Tim**
- Tambah/Edit/Hapus anggota tim
- Set role (Founder, Developer, Maintainer)
- Tambah link sosial
- Manajemen gambar profil
- Assign negara

### 5. **Manajemen FAQ**
- Buat/Edit/Hapus FAQ
- Set kategori
- Manajemen urutan
- Update real-time
- Pencarian dalam admin panel

### 6. **Manajemen Form Kontak**
- Lihat semua kiriman
- Filter berdasarkan tipe (bug/feature/general)
- Filter berdasarkan status (new/read/resolved)
- Update status kiriman
- Baca pesan

### 7. **Manajemen Screenshot**
- Upload screenshot
- Tambah judul dan deskripsi
- Set kategori
- Manajemen urutan
- Hapus gambar

### 8. **Manajemen Link Sosial**
- Tambah platform media sosial
- Set URL
- Toggle Aktif/Nonaktif
- Icon khusus platform
- Update footer real-time

### 9. **Pengaturan Sistem**
- Konfigurasi site
- Pengaturan umum
- Preferensi tema

---

## 🎨 Fitur Desain

### Desain Visual
- **Tema Deep Noir & Violet**: Estetika premium yang gelap dan tajam
- **Glassmorphism Premium**: Efek kaca dengan filter backdrop-blur tingkat lanjut
- **Starfield Animation**: Latar belakang bintang organik yang interaktif
- **Mesh Gradients**: Efek pencahayaan dinamis di seluruh halaman
- **Animasi Mikro**: Transisi halus menggunakan Framer Motion
- **Navigasi App-Style**: Layout mobile yang terasa seperti aplikasi native

### Pengalaman Pengguna
- Loading halaman cepat
- Navigasi intuitif
- Elemen interaktif
- Efek hover
- State loading
- Penanganan error
- Feedback sukses

### Aksesibilitas
- HTML semantik
- Dukungan navigasi keyboard
- Rasio kontras yang mudah dibaca
- Alt text untuk gambar

---

## 🔧 Fitur Teknis

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion
- **Icon:** Lucide React
- **Type Safety:** TypeScript

### Backend
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API:** Next.js API Routes (RESTful)
- **Autentikasi:** Auth berbasis session yang aman

### Model Database
- Device
- Rom
- Download
- TeamMember
- Faq
- ContactForm
- Screenshot
- SocialLink
- SiteConfig

### API Endpoints
**Publik:**
- `/api/faq` - Ambil semua FAQ
- `/api/contact` - Kirim form kontak
- `/api/screenshots` - Ambil semua screenshot
- `/api/social` - Ambil link sosial aktif
- `/api/downloads` - Ambil download ROM

**Admin:**
- `/api/admin/faq` - CRUD untuk FAQ
- `/api/admin/contact` - Kelola kiriman
- `/api/admin/screenshots` - CRUD untuk screenshot
- `/api/admin/social` - CRUD untuk link sosial
- `/api/admin/devices` - CRUD untuk device
- `/api/admin/roms` - CRUD untuk ROM
- `/api/admin/team` - CRUD untuk anggota tim

---

## 📱 Desain Responsif

- **Mobile:** Dioptimalkan untuk HP (320px+)
- **Tablet:** Pengalaman tablet yang ditingkatkan (768px+)
- **Desktop:** Layout desktop penuh (1024px+)
- **Layar Besar:** Dioptimalkan untuk display 4K

---

## 🚀 Performa

- Server-side rendering (SSR)
- Gambar teroptimasi
- Code splitting
- Lazy loading
- Transisi halaman cepat
- Bundle JavaScript minimal

---

## 🔒 Keamanan

- Perlindungan SQL injection (Prisma)
- Pencegahan XSS
- Perlindungan CSRF
- Hashing password aman
- Route admin terproteksi
- Validasi input
- Siap rate limiting

---

## 📊 Manajemen Konten

Semua konten **berbasis database** dan bisa diupdate lewat panel admin tanpa perlu coding:
- FAQ
- Anggota tim
- Device
- ROM
- Screenshot
- Link sosial
- Kiriman kontak

---

## 🌐 Fitur SEO

- Meta tag yang proper
- Title tag per halaman
- Meta description
- Struktur HTML semantik
- URL yang bersih
- Siap sitemap

---

**Total Fitur:** 30+ halaman dan komponen
**Halaman Admin:** 8 interface manajemen
**API Endpoints:** 15+ route
**Tabel Database:** 9 model
**Baris Kode:** ~10,000+
