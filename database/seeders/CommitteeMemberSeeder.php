<?php

namespace Database\Seeders;

use App\Models\CommitteeMember;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class CommitteeMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CommitteeMember::factory()->create([
            'setting_id' => 1,
            'name' => 'Primary Leader',
            'position' => 'Chairperson',
            'is_primary' => true,
        ]);

        CommitteeMember::factory()->count(6)->create();
    }
}