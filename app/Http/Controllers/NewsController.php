<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->query('sort', 'default');

        $query = News::query();

        if ($sort === 'published') {
            $query->where('status', 'published')->orderByDesc('date_published');
        } else {
            $query->orderByDesc('id');
        }

        $news = $query->get();

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

        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('news_images', 'public')
            : null;

        $status = $validated['status'] ?? 'draft';

        $news = News::create([
            'title' => $validated['title'],
            'image' => $imagePath,
            'description' => $validated['description'],
            'status' => $status,
            'date_published' => $status === 'published' ? now() : null,
        ]);

        return response()->json([
            'message' => 'News article created successfully',
            'news' => $news
        ], 201);
    }

    public function show(News $news)
    {
        return response()->json($news);
    }

    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            $news->image = $request->file('image')->store('news_images', 'public');
        }

        $news->title = $validated['title'];
        $news->description = $validated['description'];
        $news->status = $validated['status'] ?? $news->status;

        if ($news->status === 'published' && !$news->date_published) {
            $news->date_published = now();
        }

        $news->save();

        return response()->json([
            'message' => 'News article updated successfully',
            'news' => $news
        ]);
    }

    public function destroy(News $news)
    {
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return response()->json(['message' => 'News article deleted successfully']);
    }

    public function archive(News $news)
    {
        $news->update(['status' => 'archived']);
        return response()->json(['message' => 'News article archived successfully']);
    }
}