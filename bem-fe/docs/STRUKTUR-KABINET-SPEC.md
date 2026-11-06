# SPEC — Halaman Struktur Kabinet, Departemen/Biro, dan Bidang

> Proyek: `bem-fe` (Astro 7 + React 19 + Tailwind v4 + GSAP)
> Versi: 1.0 — 6 November 2026
> Sumber desain: mockup lama `struktur_kabinet.svg`, `departemen.svg`, `bidang.svg`, **diadaptasi ke gaya Beranda yang sudah dibangun** (`index.astro`, `Navbar`, `Footer`, `SambutanSection`, `VideoSection`).
> Pembaca: AI coding agent yang mengerjakan langkah demi langkah (§10).

---

## 0. Aturan Kerja untuk Agent

1. **Gaya visual yang dipakai adalah Beranda yang sudah ada, bukan mockup.** Mockup hanya dipakai untuk struktur konten dan layout. Jika mockup dan Beranda bertentangan, ikuti Beranda (§2).
2. **Jangan mengubah file yang sudah ada** (`index.astro`, `Navbar.astro`, `Footer.astro`, `SambutanSection.astro`, `VideoSection.astro`, `global.css`) tanpa izin eksplisit dari Chris. Pengecualian yang diizinkan hanya yang tertulis di §10 sebagai "boleh".
3. Kerjakan **satu langkah per giliran** (§10). Di akhir setiap langkah, jalankan `npm run build` sampai bersih, lalu laporkan file yang dibuat.
4. Semua isi masih **dummy**. Foto orang diisi manual oleh Chris lewat field `foto` (§4.3). Jangan mengarang path foto.
5. Tanpa emoji di UI. Ikon memakai `lucide-react` yang dirender statis (tanpa `client:*`, §5.0).
6. Teks yang belum final diberi penanda `{{TODO: ...}}` di data, bukan di markup.

---

## 1. Ringkasan Halaman

| Route | File | Isi |
|---|---|---|
| `/struktur-kabinet` | `src/pages/struktur-kabinet.astro` (sudah ada, kosong) | Hero identitas, Visi & Misi, Filosofi Logo, BPH, Arsitektur Departemen |
| `/struktur-kabinet/[unit]` | `src/pages/struktur-kabinet/[unit]/index.astro` | Halaman Departemen/Biro: kepala unit, daftar bidang, proker gabungan |
| `/struktur-kabinet/[unit]/[bidang]` | `src/pages/struktur-kabinet/[unit]/[bidang].astro` | Halaman Bidang: hierarki fungsionaris, staf, proker |

Prefix `/struktur-kabinet` mengikuti `href` di `Navbar.astro` yang sudah ada. Indikator aktif navbar tetap menyala di halaman turunan karena Navbar memakai `startsWith`.

> Catatan: `struktur-kabinet.astro` dan folder `struktur-kabinet/` tidak boleh hidup berdampingan sebagai route yang sama. Pindahkan isi halaman utama ke `src/pages/struktur-kabinet/index.astro` dan **hapus** file kosong `src/pages/struktur-kabinet.astro` (diizinkan, file kosong).

Total halaman yang di-generate: 1 + 4 unit + 10 bidang = **15 halaman**, semuanya statis lewat `getStaticPaths`.

---

## 2. Adaptasi Mockup → Gaya Beranda

| Elemen | Di mockup | Dipakai (gaya Beranda) |
|---|---|---|
| Font judul halaman (H1) | Playfair Display | `font-sans font-black tracking-tight` (sama dengan H1 hero Beranda) |
| Font judul section (H2) | Playfair Display | `font-serif font-extrabold tracking-tight` + kata kunci `text-sunset-orange` (sama dengan `VideoSection`) |
| Teks kartu orang (nama, jabatan, prodi) | Playfair italic | `font-helvetica` (token `--font-helvetica` di `global.css`), §5.4 |
| Label kecil / kode / angkatan | Sans uppercase | `font-mono` (sama dengan badge Sambutan & Video) |
| Warna oranye | `#FF6B00` / orange-600 | token `sunset-orange` (#EA580C), `warm-gold` (#F59E0B), `obsidian` (#090A0F) |
| Netral | slate / stone | `neutral-*` dan `zinc-*` (mengikuti Beranda) |
| Footer | navy `#0F172A` | komponen `Footer.astro` yang ada (obsidian) |
| Navbar | pill + tombol "Layanan Terpadu"/avatar | komponen `Navbar.astro` yang ada, apa adanya |
| Link "Jelajahi Program" ungu | `#6155F5` underline | `text-sunset-orange font-bold` + panah, pola "Detail →" Beranda |
| Logo di hero | phoenix di kartu glow | sama (phoenix `makna-logo/logo-3.svg`), dibungkus kartu glow gaya Beranda |
| Kartu orang (semua jabatan) | kartu putih + foto | **satu desain** kartu putih: foto 4:5 + kotak info. Ketum/Kepala bingkai oranye, Waketum bingkai emas, lainnya bingkai netral (§5.4) |
| Garis pohon organisasi | zig-zag 3px oranye | tulang punggung vertikal bergradasi oranye→emas (§6.1.5) |
| Section divider | tidak ada | boleh memakai pola marquee Beranda (opsional, §6.1) |
| Label BPH semua "KETUA UMUM" | salah di mockup | label sesuai jabatan masing-masing |

---

## 3. Struktur File Baru

```
src/
├── data/
│   └── struktur.ts              # SEMUA data organisasi (satu sumber kebenaran)
├── layouts/
│   └── PageLayout.astro         # <html>/<head> + Navbar + Footer untuk halaman baru
├── components/
│   └── struktur/
│       ├── SectionHeading.astro
│       ├── Breadcrumb.astro
│       ├── PersonPhoto.astro    # foto atau placeholder inisial
│       ├── PersonCard.astro     # satu desain; varian = warna bingkai
│       ├── UnitNode.astro       # kartu unit + anak bidang (pohon organisasi)
│       ├── BidangCard.astro     # kartu bidang di halaman unit
│       ├── ProkerCard.astro     # kartu proker (gaya Beranda, gradasi diperbaiki)
│       ├── VisiMisi.astro
│       └── FilosofiLogo.astro   # sticky crest + item fokus saat scroll (GSAP)
└── pages/
    └── struktur-kabinet/
        ├── index.astro
        └── [unit]/
            ├── index.astro
            └── [bidang].astro
public/assets/pengurus/          # foto (diisi Chris), lihat §4.3
```

`PageLayout.astro` menyalin isi `<head>` dari `index.astro` (charset, viewport, favicon logo BEM, link Google Fonts Plus Jakarta Sans, `theme-color`, `import '../styles/global.css'`) dan menerima props `title`, `description`. Body: `class="bg-[#FAFAFA] text-zinc-900 antialiased flex flex-col min-h-screen"`, lalu `<Navbar currentPath={Astro.url.pathname} />`, `<main class="grow"><slot /></main>`, `<Footer />`. **`index.astro` tidak di-refactor ke layout ini.**

---

## 4. Model Data — `src/data/struktur.ts`

### 4.1 Tipe

```ts
export type Prodi = 'Informatika' | 'Sistem Informasi' | 'Sains Data' | 'Bisnis Digital';
export const PRODI_SINGKAT: Record<Prodi, string> = {
  'Informatika': 'IF', 'Sistem Informasi': 'SI', 'Sains Data': 'SD', 'Bisnis Digital': 'BD',
};

export interface Person {
  nama: string;
  jabatan: string;          // teks tampil, mis. "Kepala Bidang Litbang"
  prodi: Prodi;
  angkatan: string;         // "24" → tampil "IF '24"
  foto?: string;            // path dari /public, mis. "/assets/pengurus/psdm/litbang/faza.webp"
}

export interface Proker {
  judul: string;
  ringkasan: string;
  tag: string;              // badge kiri atas, mis. "LITBANG UTAMA"
  kategori: string;         // teks kiri bawah, mis. "RISET INTERNAL"
  tanggal: string;          // tampil apa adanya, mis. "24 Oktober 2026"
  gambar?: string;          // jika kosong → thumbnail gradasi (§5.7)
}

export interface Bidang {
  slug: string;
  nama: string;             // "Bidang Penelitian dan Pengembangan"
  namaPendek: string;       // "Litbang"
  judulHero: string;        // "PENELITIAN DAN PENGEMBANGAN"
  ikon: string;             // nama ikon lucide (§5.0)
  ringkas: string;          // 1–2 kalimat untuk kartu
  deskripsi: string;        // paragraf hero
  kepala: Person;
  wakil?: Person;
  sekretaris?: Person;
  labelStaf?: string;       // "Kolegium Staf Analis & Riset"; default "Staf Bidang"
  staf: Person[];
  proker: Proker[];
}

export interface Unit {
  slug: string;             // "psdm"
  kode: string;             // "PSDM"
  tipe: 'biro' | 'departemen';
  label: string;            // eyebrow: "Biro Independen" | "Departemen Eksekutif" | "Departemen Terbesar"
  nama: string;             // "Departemen Pengembangan Sumber Daya Mahasiswa (PSDM)"
  ikon: string;
  deskripsi: string;
  kepala?: Person;
  wakil?: Person;
  bidang: Bidang[];         // untuk biro, isinya "Bagian"
}

export const visi: string;
export const misi: string[];
export const filosofi: { label: string; judul: string; deskripsi: string; gambar: string }[];
export const bph: { ketua: Person; wakil: Person; anggota: Person[] }; // anggota = Sekum 1–2, Bendum 1–2
export const units: Unit[];

// helper
export const getUnit = (slug: string) => units.find(u => u.slug === slug);
export const sebutanSubUnit = (u: Unit) => (u.tipe === 'biro' ? 'Bagian' : 'Bidang');
export const hitungAnggota = (b: Bidang) =>
  [b.kepala, b.wakil, b.sekretaris].filter(Boolean).length + b.staf.length;
```

### 4.2 Isi Unit & Bidang (dari mockup)

Slug unit dan bidang **final**: jangan diganti setelah Chris mengisi foto, karena path foto mengikuti slug.

| Unit (`slug`/kode/tipe/ikon) | Deskripsi unit | Sub-unit (`slug` · nama · ikon · ringkas) |
|---|---|---|
| `medfo` · MEDFO · biro · `Megaphone`, label "Biro Independen" | Humas digital, kurasi konten publikasi, rekayasa visual multimedia, dan penjaga identitas visual Kabinet Aetherion di seluruh kanal siber. | `multimedia` · Bagian Multimedia · `Palette` · Produksi aset grafis, videografi dokumenter, live streaming kegiatan, dan penataan feed visual. <br>`publikasi-informasi` · Bagian Publikasi & Informasi · `Share2` · Penyusunan press release, manajemen siaran portal web resmi, dan diseminasi buletin berkala. |
| `hdk` · HDK · departemen · `Network`, label "Departemen Eksekutif" | Fasilitator diplomasi institusi, perluasan kemitraan industri teknologi skala global, serta konsolidasi sinergis lintas ormawa sekawasan. | `lugri` · Bidang Jejaring Eksternal (Lugri) · `Globe` · Jalin kemitraan melalui kunjungan industri, studi banding, dan kolaborasi bersama alumni. <br>`dagni` · Bidang Dalam Negeri (Dagni) · `Handshake` · Forum keakraban himpunan mahasiswa prodi (HIMA), kolaborasi UKM, dan audiensi pimpinan dekanat. |
| `sospol` · SOSPOL · departemen · `Gavel`, label "Departemen Eksekutif" | Garda pembela hak-hak mahasiswa, pengawal isu kebangsaan dan kebijakan kampus, serta penggerak aksi kepedulian sosial kemasyarakatan. | `advokesma` · Bidang Advokesma (Advo Center) · `ShieldCheck` · Bantuan banding UKT, pendampingan akademik mahasiswa, serta pusat keluhan fasilitas perkuliahan. <br>`pengmas` · Bidang Pengabdian Masyarakat · `HeartHandshake` · Program bina desa teknologi terapan, aksi tanggap bencana, dan literasi digital sekolah pesisir. |
| `psdm` · PSDM · departemen · `BrainCog`, label "Departemen Terbesar" | Inkubator talenta, pembinaan kader berkepribadian luhur, riset inovasi teknologi, serta optimalisasi potensi minat-bakat fungsionaris. | `kaderisasi` · Bidang Kaderisasi · `Award` · Manajemen LKMM-TD, orientasi mahasiswa baru, dan regenerasi kepemimpinan berintegritas. <br>`litbang` · Bidang Litbang · `FlaskConical` · Penelitian dan pengembangan, audit kepuasan kinerja, serta fasilitasi lomba inovasi IPTEK. <br>`kewirausahaan` · Bidang Kewirausahaan · `Store` · Pengembangan merchandise resmi kabinet, program tech-startup mahasiswa, dan pendanaan mandiri. <br>`senor` · Bidang Seni & Olahraga · `Trophy` · FASILKOM Cup, wadah E-Sports mahasiswa, komunitas musik, serta penguatan sportivitas kebugaran. |

Urutan tampil di pohon: MEDFO → HDK → SOSPOL → PSDM.

**Contoh lengkap Bidang Litbang** (dari mockup, dipakai sebagai acuan isi bidang lain):

- `judulHero`: "PENELITIAN DAN PENGEMBANGAN"
- `deskripsi`: "Eksplorasi metodologis dan analisis empiris yang merumuskan peta arah kebijakan strategis organisasi. Mengintegrasikan riset sains data, pemetaan mutu birokrasi, dan audit kinerja demi akselerasi dampak nyata mahasiswa Fasilkom."
- Kepala: Faza Al-Ghifari, Informatika '24 · Wakil: Digta Rifky Afada, Sistem Informasi '24 · Sekretaris: Naila Syakira `{{TODO: prodi & angkatan}}`
- `labelStaf`: "Kolegium Staf Analis & Riset"
- Staf (dummy): Muhammad Rizky IF '25, Amelia Putri SI '25, Daffa Raihan SD '25, Tiara Amanda IF '25
- Proker:
  1. "Survei Kepuasan Mahasiswa & Riset Kinerja Organisasi". Tag LITBANG UTAMA, kategori RISET INTERNAL, tanggal 24 Oktober 2026. Ringkasan: "Pengukuran indeks kepuasan terhadap birokrasi fakultas dan performa program kerja secara empiris berbasis instrumen survei terstandarisasi."
  2. "Audit Indeks Kinerja Mutu Departemen & Biro Fasilkom". Tag PENJAMINAN MUTU, kategori EVALUASI REGULER, tanggal 12 November 2026. Ringkasan: "Monitoring berkala tata kelola administratif dan efektivitas capaian KPI seluruh bidang di bawah koordinasi presidium kabinet."
  3. "Fasilkom Data Intelligence & Repository Riset Terbuka". Tag DATA AKADEMIK, kategori BIG DATA HUB, tanggal 05 Desember 2026. Ringkasan: "Penyusunan dashboard integrasi analitik data riset mahasiswa untuk mendukung akselerasi transformasi digital kampus berkelanjutan."

Untuk 9 bidang lainnya, isi dengan pola yang sama: 1 kepala, 1 wakil, 1 sekretaris, 4 staf dummy, dan 3 proker dummy yang relevan dengan ringkas bidangnya. Nama dummy boleh generik. Tandai semua dengan `// DUMMY` di atas tiap blok.

**BPH (dari mockup):** Ketua Umum Dinda Aisa Selvira (SI '23), Wakil Ketua Umum Ezra Deannobel (IF '24), lalu Sekretaris Umum 1, Sekretaris Umum 2, Bendahara Umum 1, Bendahara Umum 2 (nama dummy).
`{{TODO: nama Ketum/Waketum di Sambutan Beranda (Esko Pratama/Julia Putri) berbeda dengan mockup — Chris konfirmasi}}`

**Visi:** "Mewujudkan BEM Fakultas Ilmu Komputer sebagai wadah pengembangan akademik, potensi mahasiswa, dan kolaborasi dalam menghadapi dinamika perkembangan teknologi dengan berlandaskan nilai Tri Dharma Perguruan Tinggi." `{{TODO: konfirmasi}}`
**Misi:** `{{TODO: daftar misi resmi}}` (mockup mengulang teks visi). Pakai 4 butir dummy.

**Filosofi Logo** (urutan dan pasangan gambar ditetapkan dari aset yang ada):

| # | Label | Judul | Gambar (bagian logo yang disorot) |
|---|---|---|---|
| 01 | IDENTITAS | Nama Kabinet "Aetherion" | `/assets/makna-logo/logo-2.svg` (kepala phoenix) |
| 02 | COLOR | Gradasi Kromatik | `/assets/makna-logo/logo-4.svg` (gradasi warna) |
| 03 | SIMBOL | Bintang Emas Tri Dharma (Polestar) | `/assets/makna-logo/logo-1.svg` (bintang) |
| 04 | FORMA | Sayap Phoenix | `/assets/makna-logo/logo-3.svg` (sayap) |

Deskripsi dari mockup:
- 01: "Diilhami dari konsep filosofis aether sebagai elemen kelima, substansi murni pengisi ruang kosmik tak berbatas. Melambangkan wadah pergerakan mahasiswa yang adaptif, melampaui sekat birokrasi kaku, serta selalu menatap masa depan inovasi komputasi dengan ketajaman visi."
- 02: "Mewakili bara api keberanian, gairah eksplorasi teknologi, dan determinasi mahasiswa Fakultas Ilmu Komputer. Semburat oranye memancarkan kehangatan inklusivitas pelayanan sekaligus akselerasi revolusioner dalam setiap inisiatif karya."
- 03: "Bintang kutub bercahaya keemasan yang berdiri teguh sebagai penuntun arah. Menegaskan komitmen fungsionaris agar setiap derap langkah advokasi, pengabdian, dan riset senantiasa berakar pada kebenaran Tri Dharma Perguruan Tinggi."
- 04: `{{TODO: teks Sayap Phoenix}}`

`{{TODO: modal Filosofi di index.astro memakai teks berbeda (Cincin Orbit, Inti Api) — Chris pilih salah satu}}`

### 4.3 Konvensi Foto (diisi manual oleh Chris)

```
public/assets/pengurus/
├── bph/ketua-umum.webp, wakil-ketua-umum.webp, sekum-1.webp, ...
├── {unit}/kepala.webp, wakil.webp
└── {unit}/{bidang}/kepala.webp, wakil.webp, sekretaris.webp, staf-01.webp, staf-02.webp, ...
```

- Rasio **4:5** (disarankan **1080×1350 px**, WebP, usahakan ≤200 KB). Foto dengan rasio lain tetap tampil penuh dan dipotong di tengah (`object-cover`).
- Selama `foto` kosong, `PersonPhoto` menampilkan placeholder otomatis (§5.3). Agent **tidak** membuat file gambar dummy.
- Mengisi foto cukup dengan menambah `foto: '/assets/pengurus/psdm/litbang/kepala.webp'` di `struktur.ts`.

---

## 5. Komponen

### 5.0 Resep Kelas (diambil dari kode Beranda, wajib dipakai ulang)

| Nama | Kelas Tailwind |
|---|---|
| Latar hero | `relative bg-aetherion-light pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden` + lapisan titik `absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none` + glow `absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-linear-to-tr from-sunset-orange/15 via-amber-400/10 to-transparent blur-[120px] rounded-full pointer-events-none` |
| Section terang | `py-20 sm:py-28 bg-white` atau `bg-[#FAFAFA] border-y border-neutral-200` (berselang-seling) |
| Container | `max-w-7xl mx-auto px-6 md:px-12` |
| Pill badge | `inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-neutral-200/80 text-[11px] font-mono font-bold text-sunset-orange uppercase tracking-wider shadow-xs` + titik `w-2 h-2 rounded-full bg-sunset-orange animate-pulse` |
| Eyebrow teks | `text-xs font-extrabold tracking-widest text-orange-600 uppercase` |
| H1 halaman | `text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-neutral-950` |
| H2 section | `text-3xl sm:text-5xl font-serif font-extrabold text-neutral-900 tracking-tight` (kata kunci dibungkus `<span class="text-sunset-orange">`) |
| Paragraf | `text-neutral-600 text-sm sm:text-base leading-relaxed` |
| Teks gradasi | `text-transparent bg-clip-text bg-linear-to-r from-sunset-orange via-amber-500 to-sunset-orange` |
| Kartu putih | `bg-white rounded-2xl border border-zinc-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300` |
| Kartu gelap | `rounded-2xl bg-neutral-950 border-2 border-sunset-orange p-3 shadow-2xl` (versi emas: `border-warm-gold`) |
| Badge jabatan (gelap) | `text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sunset-orange text-white tracking-wider` (emas: `bg-warm-gold text-neutral-950`) |
| Badge angkatan | `text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/90 text-neutral-800 border border-neutral-200` |
| Kotak ikon | `w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/70 text-sunset-orange flex items-center justify-center` (ikon `w-5 h-5`, `strokeWidth={1.75}`) |
| Link aksi | `inline-flex items-center gap-1.5 text-sm font-bold text-sunset-orange hover:text-orange-700 group` + panah `group-hover:translate-x-1 transition-transform` |
| Garis aksen | `w-12 h-1 rounded-full bg-linear-to-r from-sunset-orange to-warm-gold` |

Ikon: `import { FlaskConical } from 'lucide-react'` di frontmatter `.astro`, lalu `<FlaskConical className="w-5 h-5" strokeWidth={1.75} />` **tanpa** `client:*` (dirender statis, 0 KB JS). Untuk ikon dari string data, buat peta `const ICONS = { FlaskConical, Palette, ... }` di `src/components/struktur/icons.ts`.

### 5.1 `SectionHeading.astro`
Props: `eyebrow`, `title` (boleh HTML via `set:html` untuk span oranye), `description?`, `align: 'center' | 'left'` (default center).
Susunan: pill badge (eyebrow) → H2 → paragraf (`max-w-2xl`) → garis aksen. Untuk `align="left"` versi split: judul kiri, deskripsi kanan (`md:flex md:items-end md:justify-between`, pola section Proker Beranda).

### 5.2 `Breadcrumb.astro`
Props: `items: {label, href?}[]`. `text-xs sm:text-sm text-neutral-500`, pemisah `/` `text-sunset-orange/60`, item terakhir `text-sunset-orange font-semibold`. Pakai `<nav aria-label="Breadcrumb"><ol>`.

### 5.3 `PersonPhoto.astro`
Props: `person`, `class?`.
- Ada `foto`: `<img src loading="lazy" decoding="async" alt="Foto {nama}, {jabatan}" class="w-full h-full object-cover">`.
- Tidak ada: kotak `bg-linear-to-br from-neutral-800 via-neutral-900 to-obsidian` + pola titik putih 8% + inisial (2 huruf) `font-serif font-bold text-5xl text-white/80` di tengah + ikon `User` kecil `text-white/20` di pojok. Tanpa emoji.
- Wadah selalu `aspect-4/5 overflow-hidden` (1080×1350 px).

### 5.4 `PersonCard.astro`
Props: `person`, `variant: 'featured' | 'featured-gold' | 'standard' | 'staff'`, `badge?` (teks jabatan, default `jabatan` huruf besar), `topLabel?` (mis. "Kepala Bidang"), `zoom?`. Props `code`, `nomor`, `staffLabel` masih diterima demi kompatibilitas, tetapi tidak ditampilkan.

Satu desain untuk semua jabatan, font `font-helvetica`:
- Kartu putih `rounded-2xl border-2 shadow-sm p-2.5 sm:p-3`, naik `-translate-y-1.5` saat hover.
- Foto `PersonPhoto` (4:5, `rounded-xl`), tanpa badge di atas foto.
- Kotak info `rounded-xl bg-neutral-50 border border-neutral-200/80 py-3 text-center`, berisi:
  1. nama lengkap: `font-bold text-sm sm:text-base lg:text-lg text-neutral-900`;
  2. jabatan (`badge`): `text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-orange-700`;
  3. prodi'angkatan (`labelAngkatan`, mis. "SI '24") dengan gaya yang sama.
- Varian hanya mengubah warna bingkai: `featured` oranye (Ketum, Kepala), `featured-gold` emas (Waketum), `standard`/`staff` netral `zinc-200`.
- `topLabel`: pill gradasi oranye yang menempel di tepi atas kartu (`-translate-y-1/2`) tanpa menambah tinggi kartu.
- **Ukuran seragam:** lebar kartu diatur pemanggil dengan satu kelas lebar yang sama di semua section (`CARD_W`). Tinggi kartu dalam satu baris disamakan (flex stretch; kotak info mengisi sisa tinggi). Tidak ada kartu yang diperbesar atau dinaikkan.
  - Lebar: `w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)]` (2 kolom → 4 kolom).
  - Baris kartu: `gap-4 sm:gap-6 lg:gap-4 lg:-mx-6`. Di desktop baris melebar 24px ke padding container dan jaraknya 16px, sehingga kartu ±296px di layar 1280px.

### 5.5 `UnitNode.astro`
Props: `unit`, `side: 'left' | 'right'`.
Kartu unit (kartu putih `p-6`) berisi: kotak ikon, eyebrow `unit.label`, judul `font-serif font-extrabold text-xl sm:text-2xl`, chip kode `font-mono text-[10px] px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200` di kanan atas, deskripsi, dan link "Lihat {Departemen|Biro} →" ke `/struktur-kabinet/{slug}`.
Di bawahnya grid anak (`grid sm:grid-cols-2 gap-4`; PSDM `lg:grid-cols-4` dan membentang penuh): kartu kecil (ikon lucide `w-4 h-4 text-sunset-orange`, nama `font-bold text-sm`, ringkas `text-xs text-neutral-600`), seluruh kartu jadi link ke halaman bidang.

### 5.6 `BidangCard.astro`
Untuk halaman unit. Kartu putih `p-6`: kotak ikon, nama `font-serif font-bold text-xl`, ringkas, baris bawah `border-t border-zinc-100` berisi "{n} Anggota" (`font-mono text-xs text-neutral-500`, dari `hitungAnggota`) dan "Lihat Struktur →". Seluruh kartu jadi link.

### 5.7 `ProkerCard.astro`
Salin struktur kartu Proker di `index.astro`, dengan dua perbaikan:
- Thumbnail tanpa gambar memakai `bg-linear-to-br from-sunset-orange/30 via-zinc-900 to-black`. Di Beranda kelas `bg-linear-to-*` tidak ada, sehingga thumbnail tampil putih.
- Jika `gambar` ada, tampilkan `<img class="absolute inset-0 w-full h-full object-cover">` + overlay gelap bawah.

Isi: badge `tag` kiri atas (`bg-white/90 text-neutral-900 text-[10px] font-mono font-bold rounded-full px-2.5 py-0.5`), tanggal kanan bawah thumbnail (`bg-black/60 text-white text-[11px] rounded-full px-2.5`), judul `font-serif font-bold text-lg line-clamp-2`, ringkasan `text-sm text-zinc-600 line-clamp-3`, footer `kategori` + "Baca Telusur →".
Link detail belum punya tujuan (halaman `/proker` belum ada). Render sebagai `<div>` dan beri "Baca Telusur" `aria-disabled="true"` dengan `opacity-60`. `{{TODO: hubungkan ke /proker/[slug]}}`

### 5.8 `VisiMisi.astro`
Grid `md:grid-cols-2 gap-6`, dua kartu putih `p-8 sm:p-10`:
- Visi: eyebrow "Cita Luhur & Cakrawala Strategis" → garis → H3 `font-serif font-extrabold text-3xl` "Visi Kabinet" → kutipan `text-lg sm:text-xl text-neutral-700 leading-relaxed` diawali tanda kutip besar `font-serif text-6xl text-sunset-orange/30`.
- Misi: eyebrow "Rencana Aksi & Transformasi" → "Misi Kabinet" → `<ol>` dengan nomor `font-mono text-sunset-orange font-bold` 01, 02, ...
- Footer kartu: `PILAR FUNDAMENTAL` (kiri, `text-neutral-400`) · `AETHERION MANIFESTO` (kanan, `text-sunset-orange`), mono `text-[10px]`.

Visi dan misi **tidak** memakai teks besar yang sama seperti di mockup.

### 5.9 `FilosofiLogo.astro` (interaktif, GSAP)
Layout `lg:grid-cols-12 gap-10`:
- **Kiri (`lg:col-span-5`, `lg:sticky lg:top-28 self-start`)**: kartu "Crest Specimen". Bentuknya kartu putih dengan header `ARTIFACT NO. 001` / `SVG-VECT.2026` (mono). Isinya bingkai `aspect-square rounded-2xl bg-aetherion-light` berisi 4 `<img>` bertumpuk (`absolute inset-0 object-contain p-8 transition-opacity duration-500`); hanya gambar item aktif yang `opacity-100`. Glow `bg-sunset-orange/20 blur-3xl` di belakang. Footer: "Crest Specimen" (`font-serif`), "Sayap Phoenix & Polestar Tri Dharma" (eyebrow), baris `UPNV Jawa Timur` / `FASILKOM`.
- **Kanan (`lg:col-span-7`, `space-y-6`)**: 4 kartu item. Isinya badge label (`bg-orange-50 text-orange-700 border-orange-200`), nomor `01 / IDENTITAS` (mono kanan), judul `font-serif font-bold text-2xl`, dan deskripsi. Item aktif mendapat `border-sunset-orange shadow-[0_8px_32px_rgba(234,88,12,0.18)]`. Item lain `opacity-40 blur-[2px]`.
- Script: pakai `ScrollTrigger.create({ trigger: item, start: 'top 60%', end: 'bottom 60%', onToggle })` per item untuk mengganti item aktif dan gambar. Bungkus dalam `gsap.matchMedia()`: di `(prefers-reduced-motion: reduce)` dan `<1024px`, semua item tampil normal tanpa blur, dan crest menampilkan logo penuh (`logo-3.svg`).
- Inisialisasi pada `DOMContentLoaded` dan `astro:page-load` (pola Beranda). Kill trigger lama berdasarkan `id` sebelum membuat ulang.

> Aset `makna-logo/*.svg` berukuran 0,7–2 MB karena isinya PNG base64. Pakai `loading="lazy"` untuk gambar 2–4. Optimasi ke WebP dicatat sebagai `{{TODO}}`; jangan dikonversi tanpa izin.

---

## 6. Spesifikasi Halaman

### 6.1 `/struktur-kabinet`

1. **Hero** (latar hero, rata tengah):
   - Kartu logo `w-28 h-28 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_20px_60px_-10px_rgba(234,88,12,0.35)] p-4` berisi `makna-logo/logo-3.svg`.
   - Di bawahnya, wordmark "aetherion": `font-serif font-extrabold text-6xl sm:text-8xl tracking-tight text-neutral-950` (huruf kecil, seperti mockup).
   - Tagline `BEM FASILKOM 2026`: `text-sm sm:text-base font-bold tracking-[0.5em] text-sunset-orange`.
   - Deskripsi: "Manifestasi akselerasi keilmuan, kepemimpinan adaptif berintegritas, dan pergerakan kolaboratif mahasiswa Fakultas Ilmu Komputer menuju peradaban berdampak."
   - 3 pill: "Siklus Bakti: 2026/2027" (titik `warm-gold`), "Inovasi Berkelanjutan" (titik `sunset-orange`), "Integritas Tri Dharma" (titik `neutral-400`).
   - Opsional: tambahkan strip marquee setelah hero dengan pola persis seperti Beranda. Isinya "4 DEPARTEMEN & BIRO", "10 BIDANG", "{total} FUNGSIONARIS", dan tagline. Angka dihitung dari data. `{{TODO: Chris pilih pakai/tidak}}`
2. **Visi & Misi** (`bg-white`): `SectionHeading` eyebrow "Kompas Haluan Organisasi", judul "Visi & Misi <span>BEM FASILKOM 2026</span>", lalu `VisiMisi`.
3. **Makna & Filosofi Logo** (`bg-[#FAFAFA] border-y`): eyebrow "Semiotika Visual", judul "Makna & <span>Filosofi Logo</span>", deskripsi "Simbolisme terstruktur yang merangkum ruh perjuangan, etika akademis, dan aspirasi kolektif Aetherion.", lalu `FilosofiLogo`.
4. **Badan Pengurus Harian** (`bg-white`): eyebrow "Dewan Presidium", judul "Badan Pengurus <span>Harian</span>", deskripsi "Pilar kepemimpinan utama yang menahkodai orkestrasi pergerakan, ketertiban manajerial, dan transparansi tata kelola kabinet."
   - Baris 1: `flex flex-wrap justify-center`, lebar kartu sama dengan baris 2. Ketum memakai `featured`, badge "KETUA UMUM". Waketum memakai `featured-gold`, badge "WAKIL KETUA UMUM". Tanpa rotasi.
   - Baris 2: `grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10`, 4 kartu `standard` (Sekretaris Umum 1–2, Bendahara Umum 1–2).
5. **Arsitektur Departemen** (`bg-[#FAFAFA] border-t`): eyebrow "Topologi Eksekutif", judul "Arsitektur <span>Departemen</span> & Alur Sirkuit Eksekutif", deskripsi "Aliran mandat berjenjang dan koordinasi struktural antar departemen teknis dalam melayani sivitas akademika."
   - **Desktop (≥1024px)**: ada tulang punggung vertikal di tengah (`absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-linear-to-b from-sunset-orange via-amber-500 to-warm-gold rounded-full`). `UnitNode` berselang kiri/kanan (`lg:w-[calc(50%-2.5rem)]`, kanan `lg:ml-auto`). Dari tiap kartu unit ada garis horizontal 3px ke tulang punggung, dengan titik simpul `w-4 h-4 rounded-full bg-white border-[3px] border-sunset-orange` di persimpangan. Unit terakhir (PSDM) membentang penuh di bawah, dengan 4 bidang dalam satu baris.
   - **Mobile (<1024px)**: garis di kiri (`left-4`), semua kartu `pl-10`, simpul di garis.
   - Animasi: tiap `UnitNode` fade-up (`y: 30, opacity: 0`) via ScrollTrigger `start: 'top 85%'`. Garis tulang punggung digambar dengan `scaleY` 0→1 (`transform-origin: top`, `scrub`). Matikan saat reduced-motion.

### 6.2 `/struktur-kabinet/[unit]`
*Tidak ada mockup. Halaman ini disusun dari pola halaman bidang.*

1. **Hero** (latar hero, rata tengah): `Breadcrumb` (Beranda / Struktur Organisasi / {nama unit}), pill `{KODE} • BEM FASILKOM 2026`, H1 nama unit (huruf besar, `font-serif font-extrabold uppercase text-4xl sm:text-6xl`, sama dengan halaman bidang), deskripsi, pemisah berlian (garis `bg-linear-to-r from-transparent via-sunset-orange/40 to-transparent` + `◆` kecil `text-sunset-orange`).
2. **Pimpinan Unit** (jika `kepala` ada): eyebrow "Pimpinan {Departemen|Biro}". Kepala memakai `featured` dengan `topLabel="Kepala {Departemen|Biro}"`, wakil memakai `featured-gold`. Lebar kartu sama dengan kartu lain (§5.4), baris di tengah.
   `{{TODO: apakah tiap unit punya Kepala & Wakil Kepala? Jika tidak, section ini disembunyikan otomatis}}`
3. **Daftar {Bidang|Bagian}**: `SectionHeading` eyebrow "Struktur Internal", judul "{Bidang|Bagian} di <span>{kode}</span>", lalu grid `sm:grid-cols-2 lg:grid-cols-{2|4}` berisi `BidangCard`.
4. **Program Kerja {kode}**: `SectionHeading align="left"`, grid `md:grid-cols-2 lg:grid-cols-3` berisi semua proker dari semua bidangnya (maks. 6), diurutkan sesuai data.
5. **Navigasi antar unit**: dua kartu kecil di bawah ("← {unit sebelumnya}" / "{unit berikutnya} →") + link "Kembali ke Struktur Organisasi".

`getStaticPaths`: `units.map(u => ({ params: { unit: u.slug }, props: { unit: u } }))`.

### 6.3 `/struktur-kabinet/[unit]/[bidang]`
Mengikuti mockup `bidang.svg` (versi lengkap dengan staf).

1. **Hero**: `Breadcrumb` (Beranda / Struktur Organisasi / {nama unit} / {namaPendek}), pill `{nama unit singkat} • BEM FASILKOM 2026`, H1 `judulHero` (`font-serif font-extrabold uppercase text-4xl sm:text-6xl tracking-tight`), deskripsi `max-w-2xl`, pemisah berlian.
2. **Struktur Hierarki Fungsionaris**: label tengah bergaris kiri-kanan (`STRUKTUR HIERARKI FUNGSIONARIS`, mono, `tracking-[0.3em]`), lalu baris kartu `flex flex-wrap justify-center gap-4 sm:gap-6` dengan lebar kartu yang sama seperti staf (§5.4):
   - Kiri: Wakil, `standard`, badge "WAKIL KEPALA BIDANG".
   - Tengah: Kepala, `featured`, `topLabel="Kepala Bidang"` (biro: "Kepala Bagian"). Ukurannya sama dengan Wakil dan Sekretaris (§5.4).
   - Kanan: Sekretaris, `standard`, badge "SEKRETARIS BIDANG".
   - Mobile: kepala tampil pertama (`order-first lg:order-none`), 2 kartu per baris seperti staf.
   - Jika wakil atau sekretaris kosong (mis. bagian MEDFO), kartu yang ada tetap di tengah.
   - Untuk biro, ganti teks "Bidang" dengan "Bagian".
3. **Staf**: label tengah bergaris (`labelStaf` ?? "STAF {BIDANG|BAGIAN}"), baris kartu `flex flex-wrap justify-center` (baris tidak penuh tetap di tengah), `PersonCard staff` dengan jabatan dari data (mis. "STAF BIDANG LITBANG").
4. **Program Kerja & Agenda {namaPendek}**: `SectionHeading align="left"` eyebrow "Portfolio & Agenda", judul "Program Kerja & Agenda <span>{namaPendek}</span>", deskripsi di kanan. Lalu grid `md:grid-cols-2 lg:grid-cols-3` berisi `ProkerCard`.
5. **Navigasi**: "← Kembali ke {nama unit}" + kartu bidang saudara lain di unit yang sama (maks. 3, kecil).

`getStaticPaths`: flatMap `units` × `bidang` → `params: { unit, bidang }`, `props: { unit, bidang }`.

---

## 7. Responsif

- Breakpoint mengikuti Tailwind bawaan: `sm 640 · md 768 · lg 1024 · xl 1280`.
- Grid BPH baris 2: 4 → 2. Staf: 4 → 2. Proker: 3 → 2 → 1. Bidang PSDM di pohon: 4 → 2 → 1.
- Halaman bidang: hierarki 3 kolom → 1 kolom (kepala pertama).
- Navbar `fixed`, jadi elemen pertama setiap halaman wajib `pt-28 sm:pt-36`.
- Target sentuh link kartu ≥44px. Fokus keyboard terlihat: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset-orange` pada semua kartu-link.

## 8. Animasi

- Gunakan GSAP + ScrollTrigger (sudah ada). Jangan menambah library animasi.
- Pola standar: fade-up header section `y: 25, opacity: 0, duration: 0.7, ease: 'power2.out', start: 'top 85%'` (sama dengan `VideoSection`).
- Grid kartu: `stagger: 0.08`.
- Semua animasi dibungkus `gsap.matchMedia()` dengan cabang `(prefers-reduced-motion: no-preference)`.
- Script tiap halaman meng-kill ScrollTrigger miliknya sebelum init ulang (pola `SambutanSection`), lalu dipasang ke `DOMContentLoaded` + `astro:page-load`.

## 9. Aksesibilitas & SEO

- `<title>` per halaman: "Struktur Kabinet | BEM FASILKOM UPNVJT 2026", "{nama unit} | BEM FASILKOM UPNVJT 2026", "{namaPendek} — {kode} | BEM FASILKOM UPNVJT 2026".
- `meta description` diambil dari deskripsi unit/bidang.
- Satu `<h1>` per halaman. Section memakai `<section aria-labelledby>`.
- Alt foto: "Foto {nama}, {jabatan}". Placeholder memakai `role="img"` + `aria-label` yang sama.
- Kontras: teks oranye di bawah 18px pakai `text-orange-700`, bukan `text-sunset-orange` di latar terang.

---

## 10. Langkah Implementasi (kerjakan berurutan, satu per giliran)

| # | Langkah | File | Selesai jika |
|---|---|---|---|
| 1 | Data | `src/data/struktur.ts` | Tipe §4.1 lengkap. 4 unit, 10 sub-unit, BPH, visi/misi, filosofi terisi (dummy ditandai). `npm run build` bersih. |
| 2 | Layout + routing | `src/layouts/PageLayout.astro`, hapus `src/pages/struktur-kabinet.astro` (kosong, **boleh**), buat `src/pages/struktur-kabinet/index.astro`, `[unit]/index.astro`, `[unit]/[bidang].astro` berisi H1 sementara | Build menghasilkan 15 halaman. Navbar "Struktur" aktif di ketiganya. |
| 3 | Komponen dasar | `icons.ts`, `SectionHeading`, `Breadcrumb`, `PersonPhoto`, `PersonCard` (4 varian) | Placeholder inisial tampil tanpa foto. Foto tampil jika `foto` diisi (uji dengan satu gambar sementara, lalu hapus). |
| 4 | Halaman Bidang | `[unit]/[bidang].astro`, `ProkerCard` | Litbang mirip mockup `bidang.svg` dalam gaya Beranda. Thumbnail proker bergradasi, bukan putih. Mobile: kepala pertama. |
| 5 | Halaman Unit | `[unit]/index.astro`, `BidangCard` | 4 halaman unit. Biro memakai kata "Bagian". Jumlah anggota dihitung otomatis. |
| 6 | Struktur: Hero + Visi Misi + BPH | `struktur-kabinet/index.astro`, `VisiMisi` | Label BPH benar per jabatan (tidak semua "Ketua Umum"). |
| 7 | Struktur: Arsitektur Departemen | `UnitNode`, section 5 | Pohon zig-zag di desktop, garis kiri di mobile. Semua kartu tertaut ke halaman yang benar. |
| 8 | Struktur: Filosofi Logo | `FilosofiLogo` | Gambar crest berganti mengikuti item aktif. Reduced-motion & mobile tanpa blur. |
| 9 | Animasi & polish | script GSAP per halaman | Tidak ada error konsol saat navigasi bolak-balik. Tidak ada scroll horizontal di 360px. |
| 10 | QA | — | Cek 360 / 768 / 1280px di 15 halaman. Navigasi keyboard tiap kartu-link. Laporkan semua `{{TODO}}` tersisa (`grep -rn "{{TODO" src`). |

---

## 11. Perlu Konfirmasi Chris

1. Nama Ketum/Waketum: mockup (Dinda Aisa Selvira / Ezra Deannobel) atau Sambutan Beranda (Esko Pratama / Julia Putri)?
2. Apakah tiap Departemen/Biro punya Kepala & Wakil Kepala Departemen?
3. Daftar misi resmi, teks filosofi "Sayap Phoenix", dan teks filosofi mana yang dipakai (mockup vs modal Beranda)?
4. Jumlah staf sebenarnya per bidang (dummy: 4).
5. Marquee setelah hero Struktur: pakai atau tidak?
6. Di luar cakupan, tapi berdampak: link di `Footer.astro` memakai anchor `#beranda`, `#sambutan`, dll., sehingga tidak berfungsi dari halaman Struktur. Perlu izin untuk mengubahnya menjadi `/#beranda` dan seterusnya.
