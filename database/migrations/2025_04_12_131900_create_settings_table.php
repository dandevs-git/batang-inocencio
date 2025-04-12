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
        Schema::create('website_information', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->string('website_name')->nullable();
            $table->string('address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->string('committee_member_name')->nullable();
            $table->string('committee_member_position')->nullable();
            $table->string('committee_member_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_information');
    }
};