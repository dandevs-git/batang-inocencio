<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->query('sort', 'default');
        $date = $request->query('date');

        $query = Event::with(['participants', 'teams']);

        if ($date) {
            $query->whereDate('date', $date);
        }

        if ($sort === 'published') {
            $query->where('status', 'published')->orderBy('date');
        } else {
            $query->orderByDesc('id');
        }

        $events = $query->get();

        return response()->json($events, 200);
    }

    public function show($id)
    {
        $event = Event::find($id);
        return $event
            ? response()->json($event)
            : response()->json(['message' => 'Event not found'], 404);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'date' => 'required|date',
            'location' => 'required|string',
            'event_organizer' => 'required|string',
            'registration_start_date' => 'required|date',
            'registration_end_date' => 'required|date',
            'registration_type' => 'required|string',
            'event_type' => 'required|string',
            'description' => 'nullable|string',
            'time' => 'required|date_format:H:i',
            'contact_number' => 'required|string',
            'number_of_participants' => 'required|integer',
            'status' => 'nullable|in:draft,published',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('events_images', 'public');
            }
        }

        $status = $validated['status'] ?? 'draft';

        $event = Event::create([
            'title' => $validated['title'],
            'date' => $validated['date'],
            'location' => $validated['location'],
            'event_organizer' => $validated['event_organizer'],
            'registration_start_date' => $validated['registration_start_date'],
            'registration_end_date' => $validated['registration_end_date'],
            'registration_type' => $validated['registration_type'],
            'event_type' => $validated['event_type'],
            'description' => $validated['description'],
            'time' => $validated['time'],
            'contact_number' => $validated['contact_number'],
            'number_of_participants' => $validated['number_of_participants'],
            'status' => $status,
            'date_published' => $status === 'published' ? now() : null,
            'images' => $imagePaths,
        ]);

        return response()->json([
            'message' => 'Event created successfully.',
            'event' => $event
        ], 201);
    }


    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'date' => 'required|date',
            'location' => 'required|string',
            'event_organizer' => 'required|string',
            'registration_start_date' => 'required|date',
            'registration_end_date' => 'required|date',
            'registration_type' => 'required|string',
            'event_type' => 'required|string',
            'description' => 'nullable|string',
            'time' => 'required|date_format:H:i',
            'contact_number' => 'required|string',
            'number_of_participants' => 'required|integer',
            'status' => 'nullable|in:draft,published',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        $existingImages = $event->images ?? [];

        if ($request->hasFile('images')) {
            foreach ($existingImages as $oldImage) {
                Storage::disk('public')->delete($oldImage);
            }

            foreach ($request->file('images') as $image) {
                $existingImages[] = $image->store('events_images', 'public');
            }
        }

        $updateData = [
            'title' => $validated['title'],
            'date' => $validated['date'],
            'location' => $validated['location'],
            'event_organizer' => $validated['event_organizer'],
            'registration_start_date' => $validated['registration_start_date'],
            'registration_end_date' => $validated['registration_end_date'],
            'registration_type' => $validated['registration_type'],
            'event_type' => $validated['event_type'],
            'description' => $validated['description'] ?? $event->description,
            'time' => $validated['time'],
            'contact_number' => $validated['contact_number'],
            'number_of_participants' => $validated['number_of_participants'],
            'status' => $validated['status'] ?? $event->status,
            'images' => $existingImages,
        ];

        $event->update($updateData);

        return response()->json([
            'message' => 'Event updated successfully.',
            'event' => $event
        ]);
    }


    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        if (is_array($event->images)) {
            foreach ($event->images as $img) {
                Storage::disk('public')->delete($img);
            }
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}