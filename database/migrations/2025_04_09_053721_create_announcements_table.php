<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id(); // auto-incrementing primary key
            $table->string('title'); // for the news title
            $table->string('image')->nullable(); // for storing the image file path, nullable because it is optional
            $table->text('description'); // for the details or body of the news
            $table->enum('status', ['draft', 'published'])->default('draft'); // status field with a default value of 'draft'
            $table->timestamp('date_published')->nullable();
            $table->timestamps(); // automatically adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};