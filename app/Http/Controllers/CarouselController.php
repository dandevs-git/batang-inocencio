<?php

namespace App\Http\Controllers;

use App\Models\Carousel;
use Illuminate\Http\Request;

class CarouselController extends Controller
{
    public function index(Request $request)
    {
        if ($request->query('page') === 'home') {
            return Carousel::where('page', 'home')->get();
        }

        return Carousel::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'page' => 'required|string|max:255',
        ]);

        $carousel = Carousel::create($validated);
        return response()->json($carousel, 201);
    }

    public function show($id)
    {
        return response()->json(Carousel::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $carousel = Carousel::findOrFail($id);

        $validated = $request->validate([
            'image' => 'sometimes|string',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'page' => 'sometimes|string|max:255',
        ]);

        $carousel->update($validated);
        return response()->json($carousel);
    }

    public function destroy($id)
    {
        $carousel = Carousel::findOrFail($id);
        $carousel->delete();
        return response()->json(['message' => 'Deleted successfully.']);
    }
}