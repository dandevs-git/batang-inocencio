<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('carousels')->insert([
            [
                'image' => 'carousels/banner1.jpg',
                'title' => 'Welcome to Our Community',
                'description' => 'Join us in building a better future together.',
                'page' => 'home',
            ],
            [
                'image' => 'carousels/banner2.jpg',
                'title' => 'Support Local Programs',
                'description' => 'Discover how you can get involved with our latest initiatives.',
                'page' => 'home',
            ],
            [
                'image' => 'carousels/banner3.jpg',
                'title' => 'Stay Informed',
                'description' => 'Check out the latest news and announcements.',
                'page' => 'home',
            ],
        ]);
    }
}