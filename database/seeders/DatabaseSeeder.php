<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => '123',
            'password' => Hash::make('123'),
        ]);
        DB::table('members')->insert([
            [
                'last_name' => 'Abancia Jr',
                'first_name' => 'Danilo',
                'middle_name' => 'Delector',
                'suffix' => 'Jr.',
                'address' => 'Blk 2 Lot 1 Section 1 Phase 1 Pabahay Bagtas Tanza Cavite',
                'area' => 'Inocencio Proper',
                'sex' => 'male',
                'age' => 23,
                'email' => 'danilojrabancia@gmail.com',
                'contact_number' => '09919526418',
                'civil_status' => 'married',
                'age_group' => 'Core Youth (18-24)',
                'education' => 'Elementary Graduate',
                'employment' => 'Employed',
                'sk_voter' => 'No',
                'election_vote' => 'No',
                'national_voter' => 'No',
                'kk_assembly' => 'No',  // Or any of the valid options
                'kk_reason' => json_encode(['No KK Assembly']), // Ensure the JSON is encoded correctly
                'youth_concerns' => 'asd',
                'recommendations' => 'asd',
                'project_recommendations' => 'asd',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'last_name' => 'Santos',
                'first_name' => 'Maria',
                'middle_name' => 'Perez',
                'suffix' => 'Sr.',
                'address' => 'Blk 5 Lot 10 Phase 2 Sampaguita Village',
                'area' => 'Sampaguita Village',
                'sex' => 'female',
                'age' => 30,
                'email' => 'mariasantos@gmail.com',
                'contact_number' => '09181234567',
                'civil_status' => 'single',
                'age_group' => 'Young Adult (25-30)',
                'education' => 'College Graduate',
                'employment' => 'Employed',
                'sk_voter' => 'Yes',
                'election_vote' => 'Yes',
                'national_voter' => 'Yes',
                'kk_assembly' => 'No',
                'kk_reason' => json_encode(['Regular Attendance']), // Ensure the JSON is encoded correctly
                'youth_concerns' => 'Need more youth activities',
                'recommendations' => 'Start a youth entrepreneurship program',
                'project_recommendations' => 'Youth leadership training',
                'created_at' => now(),
                'updated_at' => now(),
            ]
            // Add more members as needed
        ]);
    }
}