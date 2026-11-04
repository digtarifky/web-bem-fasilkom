<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 
        'banner_url', 'category_id', 'author_id', 
        'is_featured', 'status', 'published_at'
    ];
}