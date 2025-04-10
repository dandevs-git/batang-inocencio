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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->string('last_name')->index(); // Added indexing for faster searches
            $table->string('first_name')->index(); // Added indexing for faster searches
            $table->string('address');
            $table->string('email')->unique()->index(); // Added index for fast lookup
            $table->string('contact_number')->index(); // Added index for faster searches
            $table->timestamps(); // Automatically created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};