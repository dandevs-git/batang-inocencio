<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->query('sort', 'default');

        $query = Announcement::query();

        if ($sort === 'published') {
            $query->where('status', 'published')->orderByDesc('date_published');
        } else {
            $query->orderByDesc('id');
        }

        $announcements = $query->get();

        return response()->json($announcements);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('announcement_images', 'public')
            : null;

        $status = $validated['status'] ?? 'draft';

        $announcement = Announcement::create([
            'title' => $validated['title'],
            'image' => $imagePath,
            'description' => $validated['description'],
            'status' => $status,
            'date_published' => $status === 'published' ? now() : null,
        ]);

        return response()->json([
            'message' => 'Announcement article created successfully',
            'announcement' => $announcement,
        ], 201);
    }

    public function show(Announcement $announcement)
    {
        return response()->json($announcement);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        if ($request->hasFile('image')) {
            if ($announcement->image) {
                Storage::disk('public')->delete($announcement->image);
            }

            $imagePath = $request->file('image')->store('announcement_images', 'public');
        } else {
            $imagePath = $announcement->image;
        }

        $status = $validated['status'] ?? $announcement->status;

        $announcement->update([
            'title' => $validated['title'],
            'image' => $imagePath,
            'description' => $validated['description'],
            'status' => $status,
            'date_published' => $status === 'published' ? now() : null,
        ]);

        return response()->json([
            'message' => 'Announcement article updated successfully',
            'announcement' => $announcement,
        ]);
    }

    public function destroy(Announcement $announcement)
    {
        if ($announcement->image) {
            Storage::disk('public')->delete($announcement->image);
        }

        $announcement->delete();

        return response()->json(['message' => 'Announcement article deleted successfully']);
    }

    public function archive(Announcement $announcement)
    {
        $announcement->update(['status' => 'archived']);

        return response()->json(['message' => 'Announcement article archived successfully']);
    }
}