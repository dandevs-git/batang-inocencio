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
            $table->string('team_name')->unique()->index();
            $table->string('team_captain');
            $table->unsignedTinyInteger('team_captain_age');
            $table->string('team_captain_address');
            $table->string('team_captain_contact_number')->nullable();
            $table->string('team_captain_email')->unique()->index();
            $table->timestamps();
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
