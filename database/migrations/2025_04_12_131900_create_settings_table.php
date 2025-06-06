<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('website_name');
            $table->string('logo')->nullable();
            $table->string('address');
            $table->string('phone_number');
            $table->string('email');
            $table->text('mission');
            $table->text('vision');
            $table->string('chairperson_name');
            $table->string('chairperson_position');
            $table->string('chairperson_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};