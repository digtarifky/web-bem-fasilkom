// src/data/struktur.ts
// Satu sumber kebenaran untuk data organisasi Kabinet Aetherion (BEM FASILKOM UPNVJT 2026).
// Lihat STRUKTUR-KABINET-SPEC.md §4.
//
// Foto: tambahkan field `foto: '/assets/pengurus/...webp'` pada Person (konvensi §4.3).
// Selama `foto` kosong, PersonPhoto menampilkan placeholder inisial.
//
// PENTING: slug unit dan bidang sudah final. Jangan diganti, karena path foto mengikuti slug.

// ============================================================
// TIPE
// ============================================================

export type Prodi = 'Informatika' | 'Sistem Informasi' | 'Sains Data' | 'Bisnis Digital';

export const PRODI_SINGKAT: Record<Prodi, string> = {
  'Informatika': 'IF',
  'Sistem Informasi': 'SI',
  'Sains Data': 'SD',
  'Bisnis Digital': 'BD',
};

export interface Person {
  nama: string;
  jabatan: string; // teks tampil, mis. "Kepala Bidang Litbang"
  prodi: Prodi;
  angkatan: string; // "24" → tampil "IF '24"
  foto?: string; // path dari /public, mis. "/assets/pengurus/psdm/litbang/kepala.webp"
}

export interface Proker {
  judul: string;
  ringkasan: string;
  tag: string; // badge kiri atas, mis. "LITBANG UTAMA"
  kategori: string; // teks kiri bawah, mis. "RISET INTERNAL"
  tanggal: string; // tampil apa adanya, mis. "24 Oktober 2026"
  gambar?: string; // jika kosong → thumbnail gradasi
}

export interface Bidang {
  slug: string;
  nama: string; // "Bidang Penelitian dan Pengembangan"
  namaPendek: string; // "Litbang"
  judulHero: string; // "PENELITIAN DAN PENGEMBANGAN"
  ikon: string; // nama ikon lucide (lihat src/components/struktur/icons.ts)
  ringkas: string; // 1–2 kalimat untuk kartu
  deskripsi: string; // paragraf hero
  kepala: Person;
  wakil?: Person;
  sekretaris?: Person;
  labelStaf?: string; // default "Staf Bidang" / "Staf Bagian"
  staf: Person[];
  proker: Proker[];
}

export interface Unit {
  slug: string; // "psdm"
  kode: string; // "PSDM"
  tipe: 'biro' | 'departemen';
  label: string; // eyebrow: "Biro Independen" | "Departemen Eksekutif" | "Departemen Terbesar"
  nama: string; // "Departemen Pengembangan Sumber Daya Mahasiswa (PSDM)"
  ikon: string;
  deskripsi: string;
  kepala?: Person; // Kepala Departemen / Kepala Biro
  wakil?: Person;
  sekretaris?: Person;
  bidang: Bidang[]; // untuk biro, isinya "Bagian"
}

export interface FilosofiItem {
  label: string;
  judul: string;
  deskripsi: string;
  gambar: string;
}

export interface BPH {
  ketua: Person;
  wakil: Person;
  anggota: Person[]; // Sekum 1–2, Bendum 1–2
}

// ============================================================
// VISI & MISI
// ============================================================

// {{TODO: konfirmasi teks visi}}
export const visi =
  'Mewujudkan BEM Fakultas Ilmu Komputer sebagai wadah pengembangan akademik, potensi mahasiswa, dan kolaborasi dalam menghadapi dinamika perkembangan teknologi dengan berlandaskan nilai Tri Dharma Perguruan Tinggi.';

// DUMMY
// {{TODO: daftar misi resmi}}
export const misi: string[] = [
  'Menyelenggarakan pengembangan akademik dan keilmuan teknologi yang relevan dengan kebutuhan industri dan masyarakat.',
  'Mewadahi serta mengoptimalkan potensi, minat, dan bakat mahasiswa Fakultas Ilmu Komputer secara berkelanjutan.',
  'Membangun kolaborasi yang sinergis dengan himpunan, ormawa, pimpinan fakultas, dan mitra eksternal.',
  'Mengawal aspirasi dan kesejahteraan mahasiswa dengan tata kelola organisasi yang transparan dan berintegritas.',
];

// ============================================================
// FILOSOFI LOGO
// ============================================================

// Teks resmi dari poster Filosofi Logo (dikirim Chris, 6 Nov 2026).
// Urutan: Warna Oranye paling pertama (permintaan Chris), sisanya mengikuti poster dari atas ke bawah.
// Item pertama otomatis aktif di FilosofiLogo.
// {{TODO: modal Filosofi di index.astro masih memakai teks lama (Cincin Orbit, Inti Api) — selaraskan dengan data ini}}
// {{TODO: konfirmasi label kategori (KARAKTER, SIMBOL, DINAMIKA, FORMA, WARNA) — bukan dari poster}}
// {{TODO: aset makna-logo/*.svg & logo-kabinet.svg berukuran 0,7–2 MB (PNG base64) — optimasi ke WebP setelah ada izin}}
export const filosofi: FilosofiItem[] = [
  {
    label: 'WARNA',
    judul: 'Warna Oranye',
    deskripsi:
      'Mencerminkan identitas Fakultas Ilmu Komputer yang hangat, bersahabat, dan penuh semangat kreatif.',
    gambar: '/assets/logo/logo-kabinet.svg', // logo berwarna penuh
  },
  {
    label: 'KARAKTER',
    judul: 'Kepala Elang',
    deskripsi:
      'Melambangkan kepemimpinan yang berani, cerdas, dan peka melalui tatapan mata yang menyala tegas.',
    gambar: '/assets/makna-logo/logo-2.svg', // kepala disorot oranye
  },
  {
    label: 'SIMBOL',
    judul: 'Bintang Bercahaya',
    deskripsi:
      'Melambangkan puncak kejayaan, dengan empat sudut cahaya sebagai representasi empat jurusan yang dinaungi BEM Fakultas Ilmu Komputer.',
    gambar: '/assets/makna-logo/logo-1.svg', // bintang disorot emas
  },
  {
    label: 'DINAMIKA',
    judul: 'Arah Bilah Sayap',
    deskripsi: 'Melambangkan energi, dampak, dan kontribusi yang disebarkan ke lingkungan sekitar.',
    gambar: '/assets/makna-logo/logo-4.svg', // arah bilah sayap (gradasi)
  },
  {
    label: 'FORMA',
    judul: 'Sayap Elang',
    deskripsi:
      'Merepresentasikan pusat penciptaan (Aether) dan pergerakan partikel cepat (Ion), sebagai simbol ruang gerak luas yang tetap presisi dan terarah.',
    gambar: '/assets/makna-logo/logo-3.svg', // sayap disorot oranye
  },
];

// ============================================================
// BADAN PENGURUS HARIAN
// ============================================================

// {{TODO: nama Ketum/Waketum di Sambutan Beranda (Esko Pratama/Julia Putri) berbeda dengan mockup — Chris konfirmasi}}
export const bph: BPH = {
  ketua: { nama: 'Dinda Aisa Selvira', jabatan: 'Ketua Umum', prodi: 'Sistem Informasi', angkatan: '23', foto: '/assets/foto-kabinet/bph/KETUM.webp' },
  wakil: { nama: 'Ezra Deannobel', jabatan: 'Wakil Ketua Umum', prodi: 'Informatika', angkatan: '24', foto: '/assets/foto-kabinet/bph/WAKETUM.webp' },
  // DUMMY
  anggota: [
    { nama: 'Btari Adiella Duhita Salsabila', jabatan: 'Sekretaris Umum 1', prodi: 'Sistem Informasi', angkatan: '23' },
    { nama: 'Nadhira Ignasia', jabatan: 'Sekretaris Umum 2', prodi: 'Informatika', angkatan: '23' },
    { nama: 'Fahmi Zaki Achmad', jabatan: 'Bendahara Umum 1', prodi: 'Sistem Informasi', angkatan: '24' },
    { nama: 'Maureen Aliandri Leksmana', jabatan: 'Bendahara Umum 2', prodi: 'Bisnis Digital', angkatan: '24' },
  ],
};

// ============================================================
// UNIT & BIDANG
// Urutan tampil di pohon: MEDFO → HDK → SOSPOL → PSDM.
// Pimpinan unit (kepala, wakil, sekretaris) masih DUMMY — ganti dengan data resmi.
// Jumlah staf: 3 per bidang, kecuali Senor 4. MEDFO mengikuti data asli.
// ============================================================

export const units: Unit[] = [
  // ---------------------------------------------------------- MEDFO
  {
    slug: 'medfo',
    kode: 'MEDFO',
    tipe: 'biro',
    label: 'Biro Independen',
    nama: 'Biro Media dan Informasi (MEDFO)', // {{TODO: konfirmasi kepanjangan MEDFO}}
    ikon: 'Megaphone',
    deskripsi:
      'Humas digital, kurasi konten publikasi, rekayasa visual multimedia, dan penjaga identitas visual Kabinet Aetherion di seluruh kanal siber.',
    // foto: /assets/pengurus/medfo/kepala.webp
    kepala: { nama: 'Ishna Shetia Shahadatina', jabatan: 'Kepala Biro MEDFO', prodi: 'Sistem Informasi', angkatan: '23' },
    // foto: /assets/pengurus/medfo/wakil.webp
    wakil: { nama: 'Muhammad Ihsanul Fikri', jabatan: 'Wakil Kepala Biro MEDFO', prodi: 'Sistem Informasi', angkatan: '24' },
    // foto: /assets/pengurus/medfo/sekretaris.webp
    sekretaris: { nama: 'Tasya kalimarensyia br sinaga ', jabatan: 'Sekretaris Biro MEDFO', prodi: 'Informatika', angkatan: '24' },
    bidang: [
      {
        slug: 'multimedia',
        nama: 'Bagian Multimedia',
        namaPendek: 'Multimedia',
        judulHero: 'MULTIMEDIA',
        ikon: 'Palette',
        ringkas: 'Produksi aset grafis, videografi dokumenter, live streaming kegiatan, dan penataan feed visual.',
        deskripsi:
          'Studio kreatif kabinet yang memproduksi aset grafis, videografi dokumenter, dan siaran langsung kegiatan, sekaligus menjaga konsistensi identitas visual Aetherion di seluruh kanal.',
        // foto: /assets/pengurus/medfo/multimedia/kepala.webp
        kepala: { nama: 'Ariel Ardinnansyah', jabatan: 'Kepala Bagian Multimedia', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/medfo/multimedia/wakil.webp
        wakil: { nama: 'Syifa Mauliddia', jabatan: 'Wakil Kepala Bagian Multimedia', prodi: 'Sistem Informasi', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/medfo/multimedia/staf-01.webp
          { nama: 'Junitha Ayu WulanSari', jabatan: 'Staf Bagian Multimedia', prodi: 'Sistem Informasi', angkatan: '24' },
          // foto: /assets/pengurus/medfo/multimedia/staf-02.webp
          { nama: 'Dino Rosalino Yuswanto', jabatan: 'Staf Bagian Multimedia', prodi: 'Informatika', angkatan: '23' },
          // foto: /assets/pengurus/medfo/multimedia/staf-03.webp
          { nama: 'Diva Indra Meilani', jabatan: 'Staf Bagian Multimedia', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/medfo/multimedia/staf-04.webp
          { nama: 'Eva Dwi Agista', jabatan: 'Staf Bagian Multimedia', prodi: 'Sains Data', angkatan: '25' },
          // foto: /assets/pengurus/medfo/multimedia/staf-05.webp
          { nama: 'Farhan Amru Hamzah', jabatan: 'Staf Bagian Multimedia', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/medfo/multimedia/staf-06.webp
          { nama: 'Rahmat Fajar Bagaskara', jabatan: 'Staf Bagian Multimedia', prodi: 'Sains Data', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Aetherion Visual Lab',
            ringkasan: 'Kelas produksi desain grafis dan videografi untuk fungsionaris dan mahasiswa umum.',
            tag: 'MULTIMEDIA',
            kategori: 'PELATIHAN KREATIF',
            tanggal: '18 Oktober 2026',
          },
          // DUMMY
          {
            judul: 'Live Streaming Kegiatan Kabinet',
            ringkasan: 'Siaran langsung acara besar kabinet agar dapat diikuti seluruh mahasiswa secara daring.',
            tag: 'SIARAN',
            kategori: 'LIVE STREAMING',
            tanggal: '07 November 2026',
          },
          // DUMMY
          {
            judul: 'Dokumenter Satu Tahun Aetherion',
            ringkasan: 'Film dokumenter perjalanan kabinet sebagai arsip visual dan bahan refleksi akhir periode.',
            tag: 'VIDEOGRAFI',
            kategori: 'DOKUMENTER',
            tanggal: '15 Desember 2026',
          },
        ],
      },
      {
        slug: 'publikasi-informasi',
        nama: 'Bagian Publikasi & Informasi',
        namaPendek: 'Pubinfo',
        judulHero: 'PUBLIKASI & INFORMASI',
        ikon: 'Share2',
        ringkas: 'Penyusunan press release, manajemen siaran portal web resmi, dan diseminasi buletin berkala.',
        deskripsi:
          'Pusat arus informasi kabinet yang menyusun press release, mengelola siaran portal web resmi, dan mendistribusikan buletin berkala kepada seluruh sivitas Fasilkom.',
        // foto: /assets/pengurus/medfo/publikasi-informasi/kepala.webp
        kepala: { nama: 'Muhammad Jazuli', jabatan: 'Kepala Bagian Publikasi & Informasi', prodi: 'Sains Data', angkatan: '24' },
        // foto: /assets/pengurus/medfo/publikasi-informasi/wakil.webp
        wakil: { nama: 'Thalita Bella Vania', jabatan: 'Wakil Kepala Bagian Publikasi & Informasi', prodi: 'Bisnis Digital', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/medfo/publikasi-informasi/staf-01.webp
          { nama: 'Regina Putri Gundani', jabatan: 'Staf Bagian Publikasi & Informasi', prodi: 'Bisnis Digital', angkatan: '24' },
          // foto: /assets/pengurus/medfo/publikasi-informasi/staf-02.webp
          { nama: 'Ahmad Tauhid Fadila', jabatan: 'Staf Bagian Publikasi & Informasi', prodi: 'Sistem Informasi', angkatan: '24' },
          // foto: /assets/pengurus/medfo/publikasi-informasi/staf-03.webp
          { nama: 'Chelsea de Trully Piris', jabatan: 'Staf Bagian Publikasi & Informasi', prodi: 'Sains Data', angkatan: '25' },
          // foto: /assets/pengurus/medfo/publikasi-informasi/staf-04.webp
          { nama: 'Calista Maharani Mashar', jabatan: 'Staf Bagian Publikasi & Informasi', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Buletin Aetherion Bulanan',
            ringkasan: 'Rangkuman kegiatan, capaian, dan informasi akademik yang terbit setiap bulan.',
            tag: 'PUBLIKASI',
            kategori: 'MEDIA BERKALA',
            tanggal: '01 November 2026',
          },
          // DUMMY
          {
            judul: 'Portal Informasi BEM Fasilkom',
            ringkasan: 'Pengelolaan siaran berita dan pengumuman resmi kabinet di portal web BEM Fasilkom.',
            tag: 'PORTAL WEB',
            kategori: 'SIARAN RESMI',
            tanggal: '10 November 2026',
          },
          // DUMMY
          {
            judul: 'Press Release Kegiatan Kabinet',
            ringkasan: 'Penyusunan rilis pers setiap kegiatan besar untuk diseminasi ke media kampus dan publik.',
            tag: 'PRESS RELEASE',
            kategori: 'HUMAS DIGITAL',
            tanggal: '27 November 2026',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------- HDK
  {
    slug: 'hdk',
    kode: 'HDK',
    tipe: 'departemen',
    label: 'Departemen Eksekutif',
    nama: 'Departemen Hubungan dan Kerjasama (HDK)', 
    ikon: 'Network',
    deskripsi:
      'Fasilitator diplomasi institusi, perluasan kemitraan industri teknologi skala global, serta konsolidasi sinergis lintas ormawa sekawasan.',
    // foto: /assets/pengurus/hdk/kepala.webp
    kepala: { nama: 'Ahmad Taufik Hayaza', jabatan: 'Kepala Departemen HDK', prodi: 'Sistem Informasi', angkatan: '24' },
    // foto: /assets/pengurus/hdk/wakil.webp
    wakil: { nama: 'Muhammad Rafly Wahyudi', jabatan: 'Wakil Kepala Departemen HDK', prodi: 'Sains Data', angkatan: '24' },
    // foto: /assets/pengurus/hdk/sekretaris.webp
    sekretaris: { nama: 'Carissa Naura Rajwa', jabatan: 'Sekretaris Departemen HDK', prodi: 'Sains Data', angkatan: '24' },
    bidang: [
      // DUMMY
      {
        slug: 'lugri',
        nama: 'Bidang Luar Negeri (Lugri)',
        namaPendek: 'Lugri',
        judulHero: 'LUAR NEGERI',
        ikon: 'Globe',
        ringkas: 'Jalin kemitraan melalui kunjungan industri, studi banding, dan kolaborasi bersama alumni.',
        deskripsi:
          'Membuka gerbang kemitraan strategis melalui kunjungan industri, studi banding antarkampus, dan kolaborasi bersama jejaring alumni Fasilkom.',
        // foto: /assets/pengurus/hdk/lugri/kepala.webp
        kepala: { nama: 'Andre Luhut Jairus Ompusunggu', jabatan: 'Kepala Bidang Lugri', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/hdk/lugri/wakil.webp
        wakil: { nama: 'Kaka Dimas Soehendra Putra', jabatan: 'Wakil Kepala Bidang Lugri', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/hdk/lugri/sekretaris.webp
        sekretaris: { nama: "Chiquita Angie Rahmadani'Ca", jabatan: 'Sekretaris Bidang Lugri', prodi: 'Sistem Informasi', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/hdk/lugri/staf-01.webp
          { nama: 'Moch. Ryan Saputra Setyo Ibrahim', jabatan: 'Staf Bidang Lugri', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/hdk/lugri/staf-02.webp
          { nama: 'Farel Amelia Putri', jabatan: 'Staf Bidang Lugri', prodi: 'Sains Data', angkatan: '25' },
          // DUMMY
          // foto: /assets/pengurus/hdk/lugri/staf-03.webp
          { nama: 'Aulia Marta Dwi Krisnani', jabatan: 'Staf Bidang Lugri', prodi: 'Sains Data', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Fasilkom Industrial Visit',
            ringkasan: 'Kunjungan ke perusahaan teknologi untuk mengenal budaya kerja dan peluang karier.',
            tag: 'KEMITRAAN',
            kategori: 'KUNJUNGAN INDUSTRI',
            tanggal: '22 Oktober 2026',
          },
          // DUMMY
          {
            judul: 'Studi Banding Antarkampus',
            ringkasan: 'Kunjungan ke BEM fakultas ilmu komputer kampus lain untuk bertukar praktik tata kelola organisasi.',
            tag: 'STUDI BANDING',
            kategori: 'RELASI EKSTERNAL',
            tanggal: '20 November 2026',
          },
          // DUMMY
          {
            judul: 'Temu Alumni Fasilkom',
            ringkasan: 'Forum jejaring alumni untuk berbagi pengalaman karier dan membuka peluang kolaborasi.',
            tag: 'ALUMNI',
            kategori: 'JEJARING',
            tanggal: '06 Desember 2026',
          },
        ],
      },
      // DUMMY
      {
        slug: 'dagri',
        nama: 'Bidang Dalam Negeri (Dagri)',
        namaPendek: 'Dagri',
        judulHero: 'DALAM NEGERI',
        ikon: 'Handshake',
        ringkas: 'Forum keakraban himpunan mahasiswa prodi (HIMA), kolaborasi UKM, dan audiensi pimpinan dekanat.',
        deskripsi:
          'Merajut keakraban dan sinergi internal fakultas melalui forum himpunan mahasiswa prodi, kolaborasi UKM, dan audiensi rutin bersama pimpinan dekanat.',
        // foto: /assets/pengurus/hdk/dagri/kepala.webp
        kepala: { nama: 'Danillah Albarrona Faza Darmagama', jabatan: 'Kepala Bidang Dagri', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/hdk/dagri/wakil.webp
        wakil: { nama: 'R. Syailindra Alfarraiel', jabatan: 'Wakil Kepala Bidang Dagri', prodi: 'Sains Data', angkatan: '24' },
        // foto: /assets/pengurus/hdk/dagri/sekretaris.webp
        sekretaris: { nama: 'Auliya Khotimatuz Zahroh', jabatan: 'Sekretaris Bidang Dagri', prodi: 'Sains Data', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/hdk/dagri/staf-01.webp
          { nama: 'Abi Kharimil hakim', jabatan: 'Staf Bidang Dagri', prodi: 'Sains Data', angkatan: '25' },
          // foto: /assets/pengurus/hdk/dagri/staf-02.webp
          { nama: 'Ghiffari Khanza Adimoelya', jabatan: 'Staf Bidang Dagri', prodi: 'Sistem Informasi', angkatan: '25' },
          // DUMMY
          // foto: /assets/pengurus/hdk/dagri/staf-03.webp
          { nama: 'Julia Loren Br. Simanjuntak', jabatan: 'Staf Bidang Dagri', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Forum Sinergi HIMA',
            ringkasan: 'Pertemuan berkala lintas himpunan untuk menyelaraskan agenda dan kolaborasi program.',
            tag: 'SINERGI',
            kategori: 'FORUM INTERNAL',
            tanggal: '29 Oktober 2026',
          },
          // DUMMY
          {
            judul: 'Kolaborasi UKM Fasilkom',
            ringkasan: 'Program bersama BEM dan UKM fakultas untuk memperluas jangkauan kegiatan mahasiswa.',
            tag: 'KOLABORASI',
            kategori: 'SINERGI ORMAWA',
            tanggal: '13 November 2026',
          },
          // DUMMY
          {
            judul: 'Audiensi Dekanat',
            ringkasan: 'Pertemuan terbuka mahasiswa dengan pimpinan dekanat untuk menyampaikan aspirasi dan evaluasi.',
            tag: 'AUDIENSI',
            kategori: 'RELASI INSTITUSI',
            tanggal: '03 Desember 2026',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------- SOSPOL
  {
    slug: 'sospol',
    kode: 'SOSPOL',
    tipe: 'departemen',
    label: 'Departemen Eksekutif',
    nama: 'Departemen Sosial dan Politik (SOSPOL)',
    ikon: 'Gavel',
    deskripsi:
      'Garda pembela hak-hak mahasiswa, pengawal isu kebangsaan dan kebijakan kampus, serta penggerak aksi kepedulian sosial kemasyarakatan.',
    // foto: /assets/pengurus/sospol/kepala.webp
    kepala: { nama: 'Ilham Fajriansyah', jabatan: 'Kepala Departemen SOSPOL', prodi: 'Sistem Informasi', angkatan: '23' },
    // foto: /assets/pengurus/sospol/wakil.webp
    wakil: { nama: 'Sabila Ilma Irjayana ', jabatan: 'Wakil Kepala Departemen SOSPOL', prodi: 'Informatika', angkatan: '23' },
    // foto: /assets/pengurus/sospol/sekretaris.webp
    sekretaris: { nama: 'Manuhara Putri Wiweka', jabatan: 'Sekretaris Departemen SOSPOL', prodi: 'Sistem Informasi', angkatan: '24' },
    bidang: [
      {
        slug: 'advokesma',
        nama: 'Bidang Advokesma (Advo Center)',
        namaPendek: 'Advokesma',
        judulHero: 'ADVOKASI & KESEJAHTERAAN MAHASISWA',
        ikon: 'ShieldCheck',
        ringkas: 'Bantuan banding UKT, pendampingan akademik mahasiswa, serta pusat keluhan fasilitas perkuliahan.',
        deskripsi:
          'Garda terdepan pembela hak mahasiswa yang melayani bantuan banding UKT, pendampingan akademik, dan menampung keluhan fasilitas perkuliahan secara responsif.',
        // foto: /assets/pengurus/sospol/advokesma/kepala.webp
        kepala: { nama: 'Safira Melisa Zahra', jabatan: 'Kepala Bidang Advokesma', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/sospol/advokesma/wakil.webp
        wakil: { nama: 'Dhidan Fachriza Zakaria', jabatan: 'Wakil Kepala Bidang Advokesma', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/sospol/advokesma/sekretaris.webp
        sekretaris: { nama: 'Keisy Rahmawan', jabatan: 'Sekretaris Bidang Advokesma', prodi: 'Sistem Informasi', angkatan: '25' },
        staf: [
          // foto: /assets/pengurus/sospol/advokesma/staf-01.webp
          { nama: 'Dicky Hadi Firmansyah', jabatan: 'Staf Bidang Advokesma', prodi: 'Bisnis Digital', angkatan: '24' },
          // foto: /assets/pengurus/sospol/advokesma/staf-02.webp
          { nama: 'Muhammad Syamil Al Haidar', jabatan: 'Staf Bidang Advokesma', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/sospol/advokesma/staf-03.webp
          { nama: 'Raditya Wahyu Pratama', jabatan: 'Staf Bidang Advokesma', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/sospol/advokesma/staf-04.webp
          { nama: 'Natasya Novariyanti', jabatan: 'Staf Bidang Advokesma', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Klinik Banding UKT',
            ringkasan: 'Layanan pendampingan berkas dan konsultasi pengajuan keringanan UKT setiap semester.',
            tag: 'ADVOKASI',
            kategori: 'LAYANAN MAHASISWA',
            tanggal: '15 Oktober 2026',
          },
          // DUMMY
          {
            judul: 'Pendampingan Akademik Mahasiswa',
            ringkasan: 'Layanan konsultasi permasalahan akademik mahasiswa, mulai dari KRS, cuti, hingga perwalian.',
            tag: 'AKADEMIK',
            kategori: 'PENDAMPINGAN',
            tanggal: '05 November 2026',
          },
          // DUMMY
          {
            judul: 'Pusat Aduan Fasilitas Perkuliahan',
            ringkasan: 'Kanal pelaporan keluhan fasilitas perkuliahan yang ditindaklanjuti bersama pihak fakultas.',
            tag: 'ASPIRASI',
            kategori: 'LAYANAN ADUAN',
            tanggal: '25 November 2026',
          },
        ],
      },
      {
        slug: 'pengmas',
        nama: 'Bidang Pengabdian Masyarakat',
        namaPendek: 'Pengmas',
        judulHero: 'PENGABDIAN MASYARAKAT',
        ikon: 'HeartHandshake',
        ringkas: 'Program bina desa teknologi terapan, aksi tanggap bencana, dan literasi digital sekolah pesisir.',
        deskripsi:
          'Menghadirkan dampak nyata keilmuan komputer bagi masyarakat melalui bina desa teknologi terapan, aksi tanggap bencana, dan literasi digital sekolah pesisir.',
        // foto: /assets/pengurus/sospol/pengmas/kepala.webp
        kepala: { nama: 'Gilang Yudha Satriawan', jabatan: 'Kepala Bidang Pengmas', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/sospol/pengmas/wakil.webp
        wakil: { nama: 'Dian Indri Eklesia Lumban Tobing', jabatan: 'Wakil Kepala Bidang Pengmas', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/sospol/pengmas/sekretaris.webp
        sekretaris: { nama: 'Kiki Heldiani Alifia', jabatan: 'Sekretaris Bidang Pengmas', prodi: 'Sains Data', angkatan: '25' },
        staf: [
          // foto: /assets/pengurus/sospol/pengmas/staf-01.webp
          { nama: 'Julyandra Andi Santoso', jabatan: 'Staf Bidang Pengmas', prodi: 'Sistem Informasi', angkatan: '24' },
          // foto: /assets/pengurus/sospol/pengmas/staf-02.webp
          { nama: 'Adelia Syifa Bunga Nirwana', jabatan: 'Staf Bidang Pengmas', prodi: 'Informatika', angkatan: '25' },
          // foto: /assets/pengurus/sospol/pengmas/staf-03.webp
          { nama: 'Muhammad Anggara Saputra', jabatan: 'Staf Bidang Pengmas', prodi: 'Informatika', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Desa Digital Binaan',
            ringkasan: 'Pendampingan desa dalam pemanfaatan teknologi tepat guna dan pemasaran digital UMKM.',
            tag: 'PENGABDIAN',
            kategori: 'BINA DESA',
            tanggal: '08 November 2026',
          },
          // DUMMY
          {
            judul: 'Literasi Digital Sekolah Pesisir',
            ringkasan: 'Pelatihan dasar komputer dan keamanan digital bagi siswa sekolah di wilayah pesisir.',
            tag: 'LITERASI',
            kategori: 'EDUKASI DIGITAL',
            tanggal: '22 November 2026',
          },
          // DUMMY
          {
            judul: 'Fasilkom Peduli Bencana',
            ringkasan: 'Penggalangan dana dan aksi relawan tanggap bencana bersama mitra kemanusiaan.',
            tag: 'KEMANUSIAAN',
            kategori: 'TANGGAP BENCANA',
            tanggal: '10 Desember 2026',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------- PSDM
  {
    slug: 'psdm',
    kode: 'PSDM',
    tipe: 'departemen',
    label: 'Departemen Terbesar',
    nama: 'Departemen Pengembangan Sumber Daya Mahasiswa (PSDM)',
    ikon: 'BrainCog',
    deskripsi:
      'Inkubator talenta, pembinaan kader berkepribadian luhur, riset inovasi teknologi, serta optimalisasi potensi minat-bakat fungsionaris.',
    // foto: /assets/pengurus/psdm/kepala.webp
    kepala: { nama: 'Demas Zhafran Zharif', jabatan: 'Kepala Departemen PSDM', prodi: 'Sistem Informasi', angkatan: '23' },
    // foto: /assets/pengurus/psdm/wakil.webp
    wakil: { nama: 'Tiara Audrey Anugerah Hadin', jabatan: 'Wakil Kepala Departemen PSDM', prodi: 'Sains Data', angkatan: '23' },
    // foto: /assets/pengurus/psdm/sekretaris.webp
    sekretaris: { nama: 'Balqis Adiratna', jabatan: 'Sekretaris Departemen PSDM', prodi: 'Sistem Informasi', angkatan: '23' },
    bidang: [
      {
        slug: 'kaderisasi',
        nama: 'Bidang Kaderisasi',
        namaPendek: 'Kaderisasi',
        judulHero: 'KADERISASI',
        ikon: 'Award',
        ringkas: 'Manajemen LKMM-TD, orientasi mahasiswa baru, dan regenerasi kepemimpinan berintegritas.',
        deskripsi:
          'Menjaga keberlangsungan regenerasi kepemimpinan melalui LKMM-TD, orientasi mahasiswa baru, dan pembinaan kader yang berintegritas.',
        // foto: /assets/pengurus/psdm/kaderisasi/kepala.webp
        kepala: { nama: 'Erren Betrisia Nabila', jabatan: 'Kepala Bidang Kaderisasi', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/psdm/kaderisasi/wakil.webp
        wakil: { nama: 'Muhammad Rasya Dzikri Subagio', jabatan: 'Wakil Kepala Bidang Kaderisasi', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/psdm/kaderisasi/sekretaris.webp
        sekretaris: { nama: 'Fiska Aulia Putri', jabatan: 'Sekretaris Bidang Kaderisasi', prodi: 'Informatika', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/psdm/kaderisasi/staf-01.webp
          { nama: 'Maulidya Miftahul Magfiroh', jabatan: 'Staf Bidang Kaderisasi', prodi: 'Sains Data', angkatan: '25' },
          // foto: /assets/pengurus/psdm/kaderisasi/staf-02.webp
          { nama: 'Nadya Karenina Cisevi Girsang', jabatan: 'Staf Bidang Kaderisasi', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/psdm/kaderisasi/staf-03.webp
          { nama: 'Billy Norris Aritonang', jabatan: 'Staf Bidang Kaderisasi', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'LKMM-TD Aetherion',
            ringkasan: 'Latihan keterampilan manajemen mahasiswa tingkat dasar bagi calon pemimpin organisasi.',
            tag: 'KADERISASI',
            kategori: 'PELATIHAN KEPEMIMPINAN',
            tanggal: '19 Oktober 2026',
          },
          // DUMMY
          {
            judul: 'Orientasi Mahasiswa Baru Fasilkom',
            ringkasan: 'Pengenalan budaya akademik dan organisasi kemahasiswaan bagi mahasiswa baru Fasilkom.',
            tag: 'ORIENTASI',
            kategori: 'MAHASISWA BARU',
            tanggal: '24 Agustus 2026',
          },
          // DUMMY
          {
            judul: 'Sekolah Kader Aetherion',
            ringkasan: 'Pembinaan lanjutan bagi fungsionaris terpilih untuk menyiapkan regenerasi kepemimpinan kabinet.',
            tag: 'REGENERASI',
            kategori: 'PEMBINAAN KADER',
            tanggal: '28 November 2026',
          },
        ],
      },
      {
        slug: 'litbang',
        nama: 'Bidang Penelitian dan Pengembangan',
        namaPendek: 'Litbang',
        judulHero: 'PENELITIAN DAN PENGEMBANGAN',
        ikon: 'FlaskConical',
        ringkas: 'Penelitian dan pengembangan, audit kepuasan kinerja, serta fasilitasi lomba inovasi IPTEK.',
        deskripsi:
          'Eksplorasi metodologis dan analisis empiris yang merumuskan peta arah kebijakan strategis organisasi. Mengintegrasikan riset sains data, pemetaan mutu birokrasi, dan audit kinerja demi akselerasi dampak nyata mahasiswa Fasilkom.',
        // foto: /assets/pengurus/psdm/litbang/kepala.webp
        kepala: { nama: 'Farhan Hidayat', jabatan: 'Kepala Bidang Litbang', prodi: 'Informatika', angkatan: '24' },
        // foto: /assets/pengurus/psdm/litbang/wakil.webp
        wakil: { nama: 'Digta Rifky Afada', jabatan: 'Wakil Kepala Bidang Litbang', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/psdm/litbang/sekretaris.webp
        sekretaris: { nama: 'Hilwatul Maghfiroh', jabatan: 'Sekretaris Bidang Litbang', prodi: 'Sistem Informasi', angkatan: '24' },
        labelStaf: 'Kolegium Staf Analis & Riset',
        staf: [
          // foto: /assets/pengurus/psdm/litbang/staf-01.webp
          { nama: 'Christian Bagus Prasetya', jabatan: 'Staf Bidang Litbang', prodi: 'Informatika', angkatan: '25' },
          // foto: /assets/pengurus/psdm/litbang/staf-02.webp
          { nama: 'Zaviera Trihapsari Gunawan', jabatan: 'Staf Bidang Litbang', prodi: 'Informatika', angkatan: '25' },
          // foto: /assets/pengurus/psdm/litbang/staf-03.webp
          { nama: 'Tatsbita Tera Irawan', jabatan: 'Staf Bidang Litbang', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Survei Kepuasan Mahasiswa & Riset Kinerja Organisasi',
            ringkasan:
              'Pengukuran indeks kepuasan terhadap birokrasi fakultas dan performa program kerja secara empiris berbasis instrumen survei terstandarisasi.',
            tag: 'LITBANG UTAMA',
            kategori: 'RISET INTERNAL',
            tanggal: '24 Oktober 2026',
          },
          {
            judul: 'Audit Indeks Kinerja Mutu Departemen & Biro Fasilkom',
            ringkasan:
              'Monitoring berkala tata kelola administratif dan efektivitas capaian KPI seluruh bidang di bawah koordinasi presidium kabinet.',
            tag: 'PENJAMINAN MUTU',
            kategori: 'EVALUASI REGULER',
            tanggal: '12 November 2026',
          },
          {
            judul: 'Fasilkom Data Intelligence & Repository Riset Terbuka',
            ringkasan:
              'Penyusunan dashboard integrasi analitik data riset mahasiswa untuk mendukung akselerasi transformasi digital kampus berkelanjutan.',
            tag: 'DATA AKADEMIK',
            kategori: 'BIG DATA HUB',
            tanggal: '05 Desember 2026',
          },
        ],
      },
      {
        slug: 'kewirausahaan',
        nama: 'Bidang Kewirausahaan',
        namaPendek: 'Kewirausahaan',
        judulHero: 'KEWIRAUSAHAAN',
        ikon: 'Store',
        ringkas: 'Pengembangan merchandise resmi kabinet, program tech-startup mahasiswa, dan pendanaan mandiri.',
        deskripsi:
          'Menumbuhkan jiwa wirausaha dan kemandirian finansial kabinet melalui merchandise resmi, inkubasi tech-startup mahasiswa, dan program pendanaan mandiri.',
        // foto: /assets/pengurus/psdm/kewirausahaan/kepala.webp
        kepala: { nama: 'Aurelia Salsabiila Putri', jabatan: 'Kepala Bidang Kewirausahaan', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/psdm/kewirausahaan/wakil.webp
        wakil: { nama: 'Muhammad Ariel Eka Ramadani', jabatan: 'Wakil Kepala Bidang Kewirausahaan', prodi: 'Informatika', angkatan: '24' },
        // foto: /assets/pengurus/psdm/kewirausahaan/sekretaris.webp
        sekretaris: { nama: 'Rachel Mutya Shifa', jabatan: 'Sekretaris Bidang Kewirausahaan', prodi: 'Bisnis Digital', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/psdm/kewirausahaan/staf-01.webp
          { nama: 'Laudya Meitaneia Sianturi', jabatan: 'Staf Bidang Kewirausahaan', prodi: 'Sains Data', angkatan: '24' },
          // foto: /assets/pengurus/psdm/kewirausahaan/staf-02.webp
          { nama: 'Jihan Aulia Alvira Putri', jabatan: 'Staf Bidang Kewirausahaan', prodi: 'Sistem Informasi', angkatan: '25' },
          // foto: /assets/pengurus/psdm/kewirausahaan/staf-03.webp
          { nama: 'Ayubi Al Muarif', jabatan: 'Staf Bidang Kewirausahaan', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'Aetherion Merch Drop',
            ringkasan: 'Rilis merchandise resmi kabinet sebagai identitas sekaligus sumber pendanaan mandiri.',
            tag: 'WIRAUSAHA',
            kategori: 'DANA MANDIRI',
            tanggal: '26 Oktober 2026',
          },
          // DUMMY
          {
            judul: 'Fasilkom Startup Incubator',
            ringkasan: 'Program inkubasi ide tech-startup mahasiswa dengan sesi mentoring dan pitching.',
            tag: 'STARTUP',
            kategori: 'INKUBASI BISNIS',
            tanggal: '17 November 2026',
          },
          // DUMMY
          {
            judul: 'Bazar Wirausaha Mahasiswa',
            ringkasan: 'Bazar produk usaha mahasiswa Fasilkom sebagai ruang praktik pemasaran dan penjualan.',
            tag: 'BAZAR',
            kategori: 'PRAKTIK USAHA',
            tanggal: '09 Desember 2026',
          },
        ],
      },
      {
        slug: 'senor',
        nama: 'Bidang Seni & Olahraga',
        namaPendek: 'Senor',
        judulHero: 'SENI & OLAHRAGA',
        ikon: 'Trophy',
        ringkas: 'FASILKOM Cup, wadah E-Sports mahasiswa, komunitas musik, serta penguatan sportivitas kebugaran.',
        deskripsi:
          'Ruang ekspresi dan sportivitas mahasiswa melalui FASILKOM Cup, wadah E-Sports, komunitas musik, dan program kebugaran yang menjunjung kebersamaan.',
        // foto: /assets/pengurus/psdm/senor/kepala.webp
        kepala: { nama: 'Nabil Afsar Riswanda', jabatan: 'Kepala Bidang Senor', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/psdm/senor/wakil.webp
        wakil: { nama: 'Icha Leona Ardianti', jabatan: 'Wakil Kepala Bidang Senor', prodi: 'Sistem Informasi', angkatan: '24' },
        // foto: /assets/pengurus/psdm/senor/sekretaris.webp
        sekretaris: { nama: 'Gizzella Razwa Dhanty Azzahra', jabatan: 'Sekretaris Bidang Senor', prodi: 'Informatika', angkatan: '24' },
        staf: [
          // foto: /assets/pengurus/psdm/senor/staf-01.webp
          { nama: 'Muhammad Frandi Irmansyah', jabatan: 'Staf Bidang Senor', prodi: 'Sistem Informasi', angkatan: '24' },
          // foto: /assets/pengurus/psdm/senor/staf-02.webp
          { nama: 'Putri Ayu Dita Widya', jabatan: 'Staf Bidang Senor', prodi: 'Sains Data', angkatan: '25' },
          // foto: /assets/pengurus/psdm/senor/staf-03.webp
          { nama: 'Arnaldo Given Tedjasukmana', jabatan: 'Staf Bidang Senor', prodi: 'Informatika', angkatan: '25' },
          // foto: /assets/pengurus/psdm/senor/staf-04.webp
          { nama: 'Salsabila Alsafah', jabatan: 'Staf Bidang Senor', prodi: 'Sistem Informasi', angkatan: '25' },
        ],
        proker: [
          {
            judul: 'FASILKOM Cup 2026',
            ringkasan: 'Turnamen olahraga dan E-Sports antarangkatan untuk mempererat kebersamaan mahasiswa.',
            tag: 'OLAHRAGA',
            kategori: 'KOMPETISI INTERNAL',
            tanggal: '14 November 2026',
          },
          // DUMMY
          {
            judul: 'Liga E-Sports Fasilkom',
            ringkasan: 'Kompetisi E-Sports berjenjang antarangkatan sebagai wadah minat gim kompetitif mahasiswa.',
            tag: 'E-SPORTS',
            kategori: 'LIGA MAHASISWA',
            tanggal: '21 November 2026',
          },
          // DUMMY
          {
            judul: 'Malam Apresiasi Seni',
            ringkasan: 'Panggung pertunjukan musik dan seni mahasiswa sebagai ruang ekspresi kreatif.',
            tag: 'SENI',
            kategori: 'PERTUNJUKAN',
            tanggal: '12 Desember 2026',
          },
        ],
      },
    ],
  },
];

// ============================================================
// HELPER
// ============================================================

export const getUnit = (slug: string) => units.find((u) => u.slug === slug);

export const getBidang = (unitSlug: string, bidangSlug: string) =>
  getUnit(unitSlug)?.bidang.find((b) => b.slug === bidangSlug);

export const sebutanSubUnit = (u: Unit) => (u.tipe === 'biro' ? 'Bagian' : 'Bidang');

export const sebutanUnit = (u: Unit) => (u.tipe === 'biro' ? 'Biro' : 'Departemen');

export const hitungAnggota = (b: Bidang) =>
  [b.kepala, b.wakil, b.sekretaris].filter(Boolean).length + b.staf.length;

/** Total fungsionaris: BPH + pimpinan unit + seluruh anggota bidang. */
export const hitungFungsionaris = () =>
  1 + 1 + bph.anggota.length +
  units.reduce(
    (total, u) =>
      total +
      [u.kepala, u.wakil, u.sekretaris].filter(Boolean).length +
      u.bidang.reduce((sum, b) => sum + hitungAnggota(b), 0),
    0,
  );

/** "IF '24" */
export const labelAngkatan = (p: Person) => `${PRODI_SINGKAT[p.prodi]} '${p.angkatan}`;
