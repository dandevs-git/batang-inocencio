<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $announcements = Announcement::orderByDesc('updated_at')->get();
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

        // return response()->json(['message' => 'Yeheyyy'], 200);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('announcement_images', 'public');
        } else {
            $imagePath = null;
            // return response()->json(['message' => 'Walang image']);
        }

        $status = $validated['status'] ?? 'draft';

        try {
            $announcement = Announcement::create([
                'title' => $validated['title'],
                'image' => $imagePath,
                'description' => $validated['description'],
                'status' => $status,
                'date_published' => $status === 'published' ? now() : null,
            ]);

            return response()->json(['message' => 'Announcement article created successfully', 'Announcement' => $announcement], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating Announcement article', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified Announcement article.
     */
    public function show(Announcement $announcement)
    {
        return response()->json($announcement);
    }

    /**
     * Update the specified Announcement article in storage.
     */
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

        try {
            $announcement->update([
                'title' => $validated['title'],
                'image' => $imagePath,
                'description' => $validated['description'],
                'status' => $status,
            ]);

            return response()->json(['message' => 'Announcement article updated successfully', 'Announcement' => $announcement]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating Announcement article', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified Announcement article from storage.
     */
    public function destroy(Announcement $announcement)
    {
        if ($announcement->image) {
            Storage::disk('public')->delete($announcement->image);
        }

        try {
            $announcement->delete();

            return response()->json(['message' => 'Announcement article deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting Announcement article', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Soft delete the Announcement article (mark as archived).
     */
    public function archive(Announcement $announcement)
    {
        try {
            $announcement->update(['status' => 'archived']);
            return response()->json(['message' => 'Announcement article archived successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error archiving Announcement article', 'error' => $e->getMessage()], 500);
        }
    }
}
