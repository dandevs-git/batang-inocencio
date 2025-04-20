<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            'website_name' => 'Batang Inocencio',
            'address' => '123 Main Street',
            'phone_number' => '123-456-7890',
            'email' => 'info@example.com',
            'mission' => 'Default Mission',
            'vision' => 'Default Vision',
        ]);
    }
}