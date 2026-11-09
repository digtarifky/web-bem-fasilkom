<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'sub_category',
        'excerpt',
        'content',
        'callout_quote',
        'editorial_synthesis',
        'image_url',
        'image_caption',
        'author',
        'photographer',
        'verifier',
        'published_at',
        'is_featured',
    ];

    protected $casts = [
        'content' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Auto-generate slug upon creation if not manually provided.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $baseSlug = Str::slug($article->title);
                if (empty($baseSlug)) {
                    $baseSlug = 'berita-' . Str::random(6);
                }

                $slug = $baseSlug;
                $counter = 1;
                while (static::where('slug', $slug)->exists()) {
                    $counter++;
                    $slug = "{$baseSlug}-{$counter}";
                }

                $article->slug = $slug;
            }
        });
    }
}
