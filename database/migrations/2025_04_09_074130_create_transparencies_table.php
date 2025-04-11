<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('transparencies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });


        Schema::create('transparency_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transparency_id')->constrained('transparencies')->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transparency_files');
        Schema::dropIfExists('transparencies');
    }
};
