<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Akselerasi Sinergi Teknologi & Humanisme Mahasiswa Fasilkom 2026: Catatan Konsolidasi Akbar',
                'slug' => 'akselerasi-sinergi-teknologi-humanisme-2026',
                'category' => 'Litbang',
                'sub_category' => 'Kajian Internal',
                'excerpt' => 'Langkah awal kepengurusan periode 2026 Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer menegaskan peran sentralnya sebagai katalisator integritas nilai dan keahlian rekayasa digital mahasiswa.',
                'content' => [
                    'Mengawali langkah kepengurusan periode 2026, Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer menegaskan peran sentralnya sebagai katalisator integritas nilai dan keahlian rekayasa digital mahasiswa. Melalui konsolidasi terpadu yang mempertemukan fungsionaris dari seluruh departemen, Kabinet Aetherion merumuskan peta jalan strategis guna memastikan keberlanjutan program kerja yang menyentuh substansi tridharma perguruan tinggi.',
                    'Penyelenggaraan riset aplikatif, pembenahan advokasi fasilitas laboratorium komputasi, serta penguatan mentalitas kejuangan Bela Negara menjadi pijakan primer. Di tengah disrupsi inovasi sistem dan pemanfaatan komputasi cerdas, kesadaran humanistik tetap dijaga sebagai kompas moral bagi para calon teknokrat muda.',
                    'Langkah konkret ini terefleksi dalam peluncuran sistem monitoring terpadu yang memantau capaian advokasi aspirasi mahasiswa di tingkat fakultas dan program studi. Setiap representasi aspirasi kini terdokumentasikan dalam basis data terfokus yang menjamin transparansi kinerja eksekutif secara holistik, akuntabel, dan berkeadilan.'
                ],
                'callout_quote' => 'Menyalakan karsa, merajut inovasi tanpa batas dalam naungan peradaban teknologi berjiwa Bela Negara.',
                'editorial_synthesis' => 'Laporan khusus redaksi menghimpun intisari perbincangan strategis bersama pimpinan dekanat, pemangku kebijakan himpunan mahasiswa prodi, dan fungsionaris kementerian. Mengulas transformasi kelembagaan menuju digitalisasi tata kelola organisasi modern.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Pelantikan Fungsionaris BEM FASILKOM 2026 di Depan Lobby Rektorat Arsip Humas)',
                'author' => 'Biro Kominfo Aetherion',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Dewan Presidium',
                'published_at' => '2026-10-18 09:00:00',
                'is_featured' => true,
            ],
            [
                'title' => 'Pelantikan & Rapat Kerja Akbar Fungsionaris BEM FASILKOM 2026: Mengokohkan Fondasi Aetherion',
                'slug' => 'pelantikan-rapat-kerja-akbar-fungsionaris-2026',
                'category' => 'BPH',
                'sub_category' => 'Sidang Paripurna & Pelantikan 2026',
                'excerpt' => 'Langkah awal kepemimpinan digital adaptif menyatukan karya seluruh departemen guna merefleksikan tridharma perguruan tinggi berlandaskan semangat kejuangan.',
                'content' => [
                    'Pelantikan resmi fungsionaris BEM FASILKOM 2026 Kabinet Aetherion berlangsung khidmat di hadapan jajaran pimpinan fakultas dan dewan perwakilan mahasiswa. Momentum ini menandai dimulainya babak baru akselerasi organisasi mahasiswa ilmu komputer yang adaptif dan solutif.',
                    'Dalam rapat kerja akbar yang menyusul setelah prosesi sumpah jabatan, dipaparkan 10 rencana strategis lintas biro dan departemen yang menitikberatkan pada digitalisasi layanan advokasi, penguatan ekosistem riset mahasiswa, dan harmonisasi ormawa tingkat fakultas.'
                ],
                'callout_quote' => 'Fondasi kepengurusan yang kokoh dibangun atas keterbukaan, kolaborasi lintas displin, dan dedikasi tanpa henti bagi kemaslahatan civitas akademika.',
                'editorial_synthesis' => 'Rangkuman sidang pleno pelantikan dan penetapan garis haluan program kerja tahunan Kabinet Aetherion periode 2026.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Pengambilan Sumpah Jabatan Fungsionaris BEM FASILKOM 2026)',
                'author' => 'Biro Kominfo Aetherion',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Dewan Presidium',
                'published_at' => '2026-10-16 10:30:00',
                'is_featured' => true,
            ],
            [
                'title' => 'Kajian Strategis Fasilitas Riset Komputasi Mahasiswa Baru 2026',
                'slug' => 'kajian-strategis-fasilitas-riset-komputasi-2026',
                'category' => 'Litbang',
                'sub_category' => 'Kajian Internal',
                'excerpt' => 'Bidang Litbang BEM Fasilkom merilis survei kepuasan fasilitas laboratorium FICT dan Solusi Lab guna meningkatkan akselerasi bertalenta...',
                'content' => [
                    'Bidang Penelitian dan Pengembangan merilis kajian menyeluruh mengenai efektivitas sarana komputasi performa tinggi di lingkungan laboratorium fakultas.',
                    'Hasil kajian merekomendasikan penambahan unit cloud computing untuk praktikum kecerdasan buatan dan optimasi jaringan internet berkecepatan tinggi.'
                ],
                'callout_quote' => 'Riset komputasi mutakhir membutuhkan dukungan infrastruktur andal serta keterbukaan akses bagi setiap mahasiswa pengembang.',
                'editorial_synthesis' => 'Analisis data primer survei kepuasan fasilitas laboratorium komputasi semester ganjil tahun akademik 2026.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Tim Litbang Mengkaji Pemutakhiran Lab Cloud Fasilkom)',
                'author' => 'Bidang Litbang',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Kepala Departemen PSDM',
                'published_at' => '2026-10-14 14:00:00',
                'is_featured' => false,
            ],
            [
                'title' => 'Workshop Metodologi Analitik & Benchmarking Organisasi se-Jawa Timur',
                'slug' => 'workshop-metodologi-analitik-benchmarking-jatim',
                'category' => 'Litbang',
                'sub_category' => 'Benchmarking',
                'excerpt' => 'Konsolidasi riset analitik internal bersama perwakilan BEM fakultas komputer se-regional Jawa Timur dalam perumusan tolok ukur...',
                'content' => [
                    'Kabinet Aetherion menyelenggarakan workshop benchmarking organisasi mahasiswa bidang teknologi informasi bersama 8 universitas terkemuka di Jawa Timur.',
                    'Pertemuan ini menghasilkan piagam kesepahaman riset bersama dan integrasi data kinerja organisasi mahasiswa tingkat regional.'
                ],
                'callout_quote' => 'Kolaborasi regional membuka cakrawala standar baru manajemen organisasi mahasiswa yang berbasis metrik dan data nyata.',
                'editorial_synthesis' => 'Dokumentasi workshop riset komparatif tata kelola organisasi mahasiswa ilmu komputer Jawa Timur.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Diskusi Meja Bundar Benchmarking BEM FIK se-Jawa Timur)',
                'author' => 'Bidang Litbang',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Dewan Presidium',
                'published_at' => '2026-10-11 11:00:00',
                'is_featured' => false,
            ],
            [
                'title' => 'Peluncuran Dashboard Indeks Kinerja Program Kerja Aetherion',
                'slug' => 'peluncuran-dashboard-indeks-kinerja-proker-aetherion',
                'category' => 'Litbang',
                'sub_category' => 'Transformasi Digital',
                'excerpt' => 'Transparansi digitalisasi instrumen evaluasi kegiatan fungsionaris secara komprehensif, berbasis data waktu nyata dan metrik...',
                'content' => [
                    'Sebuah inovasi sistem monitoring baru diluncurkan oleh Litbang untuk memantau progres ketercapaian program kerja secara transparan.',
                    'Seluruh mahasiswa kini dapat memantau realisasi anggaran dan jadwal eksekusi program melalui antarmuka web yang terintegrasi.'
                ],
                'callout_quote' => 'Transparansi bukan sekadar slogan, melainkan keterbukaan akses data capaian organisasi yang dapat diuji setiap saat.',
                'editorial_synthesis' => 'Peluncuran resmi platform monitoring internal Kabinet Aetherion 2026.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Peluncuran Sistem Metrik Kinerja Organisasi)',
                'author' => 'Bidang Litbang',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Dewan Presidium',
                'published_at' => '2026-10-08 16:30:00',
                'is_featured' => false,
            ],
            [
                'title' => 'Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD)',
                'slug' => 'latihan-keterampilan-manajemen-mahasiswa-lkmm-td-2026',
                'category' => 'Kader',
                'sub_category' => 'Kaderisasi Utama',
                'excerpt' => 'Membentuk karakter kepemimpinan adaptif dan berintegritas bagi mahasiswa angkatan 2026 di era kecerdasan buatan.',
                'content' => [
                    'Bidang Kaderisasi sukses menggelar pelatihan LKMM-TD dengan menghadirkan narasumber praktisi industri teknologi dan alumni berprestasi.',
                    'Peserta dibekali pemahaman mendalam tentang manajemen konflik, kepemimpinan transformasional, dan etika komunikasi profesional.'
                ],
                'callout_quote' => 'Pemimpin masa depan lahir dari tempaan integritas, kepekaan sosial, dan keberanian mengambil keputusan solutif.',
                'editorial_synthesis' => 'Laporan penyelenggaraan LKMM-TD Fasilkom angkatan 2026 sebagai sarana pematangan karakter calon organisatoris.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Sesi Praktik Simulasi Sidang LKMM-TD 2026)',
                'author' => 'Bidang Kaderisasi',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Kepala Departemen PSDM',
                'published_at' => '2026-10-04 08:30:00',
                'is_featured' => false,
            ],
            [
                'title' => 'Inkubasi Fungsionaris Muda: Penguatan Etos Kerja dan Karakter',
                'slug' => 'inkubasi-fungsionaris-muda-penguatan-etos-kerja',
                'category' => 'Kader',
                'sub_category' => 'Bela Negara',
                'excerpt' => 'Pembekalan intensif nilai-nilai patriotisme dan profesionalitas kerja tim pengurus organisasi yang solutif dan berdaya saing.',
                'content' => [
                    'Sebagai wujud komitmen pengkaderan berkelanjutan, BEM FASILKOM menyelenggarakan bootcamp internal bagi staf muda fungsionaris.',
                    'Fokus materi diarahkan pada penguatan disiplin waktu, penyusunan proposal akuntabel, dan sinergi tim lintas latar belakang prodi.'
                ],
                'callout_quote' => 'Kebersamaan yang erat berakar dari rasa saling percaya dan visi yang sama untuk memajukan almamater.',
                'editorial_synthesis' => 'Catatan internal pembekalan etos kerja staf fungsionaris Kabinet Aetherion.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Outbound & Team Building Fungsionaris Muda)',
                'author' => 'Bidang Kaderisasi',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Kepala Departemen PSDM',
                'published_at' => '2026-09-28 13:00:00',
                'is_featured' => false,
            ],
            [
                'title' => 'Forum Sinergi Angkatan: Mengharmonisasikan Potensi Lintas Prodi',
                'slug' => 'forum-sinergi-angkatan-harmonisasi-lintas-prodi',
                'category' => 'Kader',
                'sub_category' => 'Konsolidasi Inter-Prodi',
                'excerpt' => 'Kolaborasi antara prodi Informatika, Sistem Informasi, dan Sains Data dalam wadah akselerasi karya terintegrasi BEM FASILKOM.',
                'content' => [
                    'Forum dialog terbuka antar-ketua angkatan dan himpunan mahasiswa program studi digelar guna menyelaraskan agenda kegiatan akademik dan non-akademik.',
                    'Forum ini melahirkan kalender kegiatan terpadu yang meminimalisir bentrok jadwal kegiatan kemahasiswaan di lingkungan fakultas.'
                ],
                'callout_quote' => 'Keberagaman latar belakang keilmuan adalah kekuatan utama inovasi di Fakultas Ilmu Komputer.',
                'editorial_synthesis' => 'Hasil rumusan konsolidasi perwakilan mahasiswa Informatika, Sistem Informasi, Sains Data, dan Bisnis Digital.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Forum Sinergi Angkatan di Aula Gedung Giri Santika)',
                'author' => 'Bidang Kaderisasi',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Dewan Presidium',
                'published_at' => '2026-09-21 15:00:00',
                'is_featured' => false,
            ],
            [
                'title' => 'Turnamen FASILKOM Cup & E-Sports League 2026 Resmi Dimulai',
                'slug' => 'turnamen-fasilkom-cup-esports-league-2026',
                'category' => 'Senor',
                'sub_category' => 'Kompetisi Olahraga',
                'excerpt' => 'Penyelenggaraan FASILKOM Cup 2026 mempertandingkan cabang olahraga futsal, basket, dan liga game kompetitif antarangkatan.',
                'content' => [
                    'Pembukaan meriah FASILKOM Cup 2026 ditandai dengan seremoni tendangan perdana oleh Dekan Fasilkom.',
                    'Ratusan atlet mahasiswa berpartisipasi dalam kompetisi olahraga fisik serta turnamen E-Sports yang disiarkan langsung melalui kanal YouTube BEM.'
                ],
                'callout_quote' => 'Sportivitas di lapangan mencerminkan kejujuran dan profesionalisme dalam berkarya di dunia nyata.',
                'editorial_synthesis' => 'Liputan pembukaan pekan olahraga dan seni mahasiswa Fakultas Ilmu Komputer UPN Veteran Jawa Timur.',
                'image_url' => '/assets/foto-kabinet/bph/RELEASE FUNGSIONARIS.webp',
                'image_caption' => '(Dokumentasi: Defile Atlet Angkatan Pembukaan FASILKOM Cup 2026)',
                'author' => 'Bidang Senor',
                'photographer' => 'Dokum Fasilkom 2026',
                'verifier' => 'Kepala Departemen PSDM',
                'published_at' => '2026-09-17 16:00:00',
                'is_featured' => false,
            ],
        ];

        foreach ($articles as $item) {
            Article::updateOrCreate(['slug' => $item['slug']], $item);
        }
    }
}
