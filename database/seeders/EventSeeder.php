<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 4; $i++) {
            // Random dates for event and registration
            $startDate = Carbon::now()->addDays(rand(5, 30));
            $endDate = (clone $startDate)->addDays(rand(1, 3));
            $eventDate = (clone $endDate)->addDays(rand(1, 5));

            // Generating a valid status: 'upcoming' or 'closed'
            $status = rand(0, 1) ? 'draft' : 'published';

            Event::create([
                'title' => 'Community Event ' . $i,
                'date' => $eventDate,
                'location' => 'Barangay Hall ' . $i,
                'event_organizer' => 'Organizer ' . $i,
                'registration_start_date' => $startDate,
                'registration_end_date' => $endDate,
                'event_type' => rand(0, 1) ? 'Sports' : 'Seminar',
                'requirements' => 'Bring ID, Registration Form',
                'description' => 'This is a sample description for event ' . $i . '. Participants will engage in activities and gain valuable experiences.',
                'time' => sprintf('%02d:%02d:00', rand(8, 15), 0),
                'contact_number' => '09' . rand(100000000, 999999999),
                'number_of_participants' => rand(30, 100),
                'image' => 'https://picsum.photos/seed/announcement' . $i . '/600/400',
                'status' => $status,
            ]);
        }
    }
}
