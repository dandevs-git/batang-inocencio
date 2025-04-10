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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('team_name')->unique()->index(); // Added index and uniqueness
            $table->string('team_captain');
            $table->unsignedTinyInteger('team_captain_age'); // Age as unsignedTinyInteger
            $table->string('team_captain_address');
            $table->string('team_captain_contact_number')->nullable(); // Nullable
            $table->string('team_captain_email')->unique()->index(); // Added index for faster lookup
            $table->timestamps(); // Automatically created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};