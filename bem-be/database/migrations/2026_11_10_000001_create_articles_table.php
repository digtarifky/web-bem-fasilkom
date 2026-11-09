<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('articles');
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->index();
            $table->string('title');
            $table->string('category');
            $table->string('sub_category')->nullable();
            $table->text('excerpt');
            $table->json('content');
            $table->text('callout_quote')->nullable();
            $table->text('editorial_synthesis')->nullable();
            $table->text('image_url')->nullable();
            $table->string('image_caption')->nullable();
            $table->string('author')->nullable();
            $table->string('photographer')->nullable();
            $table->string('verifier')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
