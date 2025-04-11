<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 4; $i++) {
            Announcement::create([
                'title' => 'Announcement Title ' . $i,
                'description' => 'This is a sample announcement description for item ' . $i . '. It may contain news, alerts, or other important information.',
                'image' => 'https://picsum.photos/seed/announcement' . $i . '/600/400',
                'status' => $i % 2 === 0 ? 'published' : 'draft',
            ]);
        }
    }
}
