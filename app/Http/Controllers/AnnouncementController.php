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
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('announcement_images', 'public');
            }
        }

        $status = $validated['status'] ?? 'draft';

        $announcement = Announcement::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'images' => $imagePaths,
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
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
            'description' => 'required|string',
            'status' => 'nullable|in:draft,published',
        ]);

        $existingImages = $announcement->images ?? [];

        if ($request->hasFile('images')) {
            // Optionally: delete old images here if you want to replace them
            foreach ($existingImages as $oldImage) {
                Storage::disk('public')->delete($oldImage);
            }

            foreach ($request->file('images') as $image) {
                $existingImages[] = $image->store('announcement_images', 'public');
            }
        }

        $announcement->title = $validated['title'];
        $announcement->description = $validated['description'];
        $announcement->images = $existingImages;
        $announcement->status = $validated['status'] ?? $announcement->status;

        if ($announcement->status === 'published' && !$announcement->date_published) {
            $announcement->date_published = now();
        }

        $announcement->save();

        return response()->json([
            'message' => 'announcement article updated successfully',
            'announcement' => $announcement
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