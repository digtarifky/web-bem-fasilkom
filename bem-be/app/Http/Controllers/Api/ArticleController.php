<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles with optional category filter and descending sort.
     * GET /api/articles
     */
    public function index(Request $request)
    {
        $query = Article::query();

        // Filter kategori (Litbang, Kader, Senor, dll)
        if ($request->filled('category')) {
            $category = $request->query('category');
            $query->whereRaw('LOWER(category) = ?', [strtolower($category)]);
        } elseif ($request->filled('kategori')) {
            $category = $request->query('kategori');
            $query->whereRaw('LOWER(category) = ?', [strtolower($category)]);
        }

        // Filter featured article
        if ($request->has('featured')) {
            $isFeatured = filter_var($request->query('featured'), FILTER_VALIDATE_BOOLEAN);
            $query->where('is_featured', $isFeatured);
        }

        // Sorting terbaru berdasarkan published_at lalu id desc
        $articles = $query->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get();

        // Pastikan image_url memiliki full URL jika disimpan di storage lokal
        $articles->transform(function ($article) {
            $article->image_url = $this->formatImageUrl($article->image_url);
            return $article;
        });

        return response()->json([
            'success' => true,
            'count' => $articles->count(),
            'data' => $articles,
        ]);
    }

    /**
     * Display the specified article by slug.
     * GET /api/articles/{slug}
     */
    public function show(string $slug)
    {
        $article = Article::where('slug', $slug)->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan.',
            ], 404);
        }

        $article->image_url = $this->formatImageUrl($article->image_url);

        // Cari artikel berikutnya / rekomendasi warta selanjutnya
        $nextArticle = Article::where('id', '!=', $article->id)
            ->orderByDesc('published_at')
            ->first();

        if ($nextArticle) {
            $nextArticle->image_url = $this->formatImageUrl($nextArticle->image_url);
        }

        return response()->json([
            'success' => true,
            'data' => $article,
            'next_article' => $nextArticle,
        ]);
    }

    /**
     * Store a newly created article with X-Secret-PIN authorization.
     * POST /api/articles
     */
    public function store(Request $request)
    {
        // 1. Verifikasi Header X-Secret-PIN
        $secretPin = $request->header('X-Secret-PIN') ?? $request->input('secret_pin');
        $expectedPin = env('REDAKSI_PIN', 'AETHERION2026');

        if (!$secretPin || $secretPin !== $expectedPin) {
            return response()->json([
                'success' => false,
                'message' => 'Otorisasi ditolak: Secret PIN Redaksi tidak valid atau tidak disertakan.',
            ], 401);
        }

        // 2. Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'sub_category' => 'nullable|string|max:100',
            'excerpt' => 'required|string',
            'content' => 'required',
            'callout_quote' => 'nullable|string',
            'editorial_synthesis' => 'nullable|string',
            'image' => 'nullable|image|max:8192',
            'image_url' => 'nullable|string',
            'image_caption' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:150',
            'photographer' => 'nullable|string|max:150',
            'verifier' => 'nullable|string|max:150',
            'published_at' => 'nullable|date',
            'is_featured' => 'nullable',
        ]);

        // 3. Upload File Gambar (Storage) atau gunakan URL gambar
        $imageUrl = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $imageUrl = Storage::url($path);
        } elseif ($request->filled('image_url')) {
            $imageUrl = $request->input('image_url');
        }

        // 4. Text Paragraph Splitter
        $rawContent = $request->input('content');
        if (is_string($rawContent)) {
            // Pisahkan berdasarkan jeda 2 baris (double newline) atau single newline
            $paragraphs = array_values(array_filter(
                array_map('trim', preg_split('/\r\n\s*\r\n|\n\s*\n/', $rawContent)),
                fn($p) => !empty($p)
            ));
            if (empty($paragraphs)) {
                $paragraphs = [trim($rawContent)];
            }
        } elseif (is_array($rawContent)) {
            $paragraphs = array_values(array_filter($rawContent));
        } else {
            $paragraphs = [(string)$rawContent];
        }

        // 5. Konversi boolean & nilai default
        $isFeatured = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        $article = Article::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'sub_category' => $validated['sub_category'] ?? null,
            'excerpt' => $validated['excerpt'],
            'content' => $paragraphs,
            'callout_quote' => $validated['callout_quote'] ?? null,
            'editorial_synthesis' => $validated['editorial_synthesis'] ?? null,
            'image_url' => $imageUrl,
            'image_caption' => $validated['image_caption'] ?? null,
            'author' => $validated['author'] ?? 'Biro Kominfo Aetherion',
            'photographer' => $validated['photographer'] ?? 'Dokum Fasilkom 2026',
            'verifier' => $validated['verifier'] ?? 'Dewan Presidium',
            'published_at' => $validated['published_at'] ?? now(),
            'is_featured' => $isFeatured,
        ]);

        $article->image_url = $this->formatImageUrl($article->image_url);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil diterbitkan ke Berita Acara Kabinet Aetherion.',
            'data' => $article,
        ], 201);
    }

    /**
     * Helper untuk format image URL publik.
     */
    private function formatImageUrl(?string $url): ?string
    {
        if (!$url) return null;

        // Jika sudah full URL (http/https), biarkan
        if (Str::startsWith($url, ['http://', 'https://'])) {
            return $url;
        }

        // Jika path relatif storage, tambahkan base URL Laravel
        if (Str::startsWith($url, '/storage/')) {
            return url($url);
        }

        return $url;
    }
}
