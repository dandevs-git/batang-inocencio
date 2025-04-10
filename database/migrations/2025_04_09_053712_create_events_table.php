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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->index(); // Added index for faster searches
            $table->date('date'); // Event date (mm/dd/yyyy)
            $table->string('location');
            $table->string('event_organizer');
            $table->date('registration_start_date');
            $table->date('registration_end_date');
            $table->string('event_type'); // Event type (seminar, etc.)
            $table->text('requirements')->nullable(); // Nullable as it's optional
            $table->text('description')->nullable(); // Nullable as it's optional
            $table->time('time');
            $table->string('contact_number');
            $table->integer('number_of_participants')->default(0); // Default 0
            $table->string('image')->nullable(); // for storing the image file path, nullable because it is optional
            $table->enum('status', ['draft', 'published'])->default('draft'); // status field with a default value of 'draft'
            $table->timestamps(); // Automatically created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};