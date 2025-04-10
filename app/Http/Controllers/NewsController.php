<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $news = News::orderByDesc('updated_at')->get();
        return response()->json($news);
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        // return response()->json(['message' => 'Yeheyyy'], 200);

        // Store the image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('news_images', 'public');
        } else {
            $imagePath = null; // No image, set it to null
        }

        $status = $validated['status'] ?? 'draft';

        try {
            $news = News::create([
                'title' => $validated['title'],
                'image' => $imagePath,
                'description' => $validated['description'],
                'status' => $status,
                'date_published' => $status === 'published' ? now() : null,
            ]);

            return response()->json(['message' => 'News article created successfully', 'news' => $news], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating news article', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified news article.
     */
    public function show(News $news)
    {
        return response()->json($news);
    }

    /**
     * Update the specified news article in storage.
     */
    public function update(Request $request, News $news)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        // Check if image is being updated
        if ($request->hasFile('image')) {
            // If there is a new image, delete the old image if it exists
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            // Store the new image and get its file path
            $imagePath = $request->file('image')->store('news_images', 'public');
        } else {
            // Keep the old image if no new image is uploaded
            $imagePath = $news->image;
        }

        // Update the status if provided, otherwise keep the old one
        $status = $validated['status'] ?? $news->status;

        try {
            // Update the news article
            $news->update([
                'title' => $validated['title'],
                'image' => $imagePath,
                'description' => $validated['description'],
                'status' => $status,
            ]);

            return response()->json(['message' => 'News article updated successfully', 'news' => $news]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating news article', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified news article from storage.
     */
    public function destroy(News $news)
    {
        // If the news article has an image, delete it from storage
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        try {
            // Delete the news article (soft delete if needed)
            $news->delete();

            return response()->json(['message' => 'News article deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting news article', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Soft delete the news article (mark as archived).
     */
    public function archive(News $news)
    {
        try {
            $news->update(['status' => 'archived']);
            return response()->json(['message' => 'News article archived successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error archiving news article', 'error' => $e->getMessage()], 500);
        }
    }
}