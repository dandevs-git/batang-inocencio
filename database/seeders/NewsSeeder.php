<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 4; $i++) {
            News::create([
                'title' => 'Sample News Title ' . $i,
                'description' => 'This is a sample description for news article ' . $i . '. It contains some brief details about the topic.',
                'image' => 'https://picsum.photos/seed/announcement' . $i . '/600/400',
                'status' => $i % 2 === 0 ? 'published' : 'draft',
            ]);
        }
    }
}
