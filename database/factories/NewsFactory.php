<?php

namespace Database\Factories;

use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    protected $model = News::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6, true),
            'date_published' => $this->faker->dateTimeBetween('2025-01-01', 'now'),
            'description' => $this->faker->paragraph(3, true),
            'image' => 'https://picsum.photos/id/' . $this->faker->numberBetween(1, 1000) . '/600/400',
            'status' => $this->faker->randomElement(['published', 'draft']),
        ];
    }
}