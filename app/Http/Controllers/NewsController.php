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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        // return response()->json(['message' => 'Yeheyyy'], 200);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('news_images', 'public');
        } else {
            $imagePath = null;
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            $imagePath = $request->file('image')->store('news_images', 'public');
        } else {
            $imagePath = $news->image;
        }

        $status = $validated['status'] ?? $news->status;

        try {
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
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        try {
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
