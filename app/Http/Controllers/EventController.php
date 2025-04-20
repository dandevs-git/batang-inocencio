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

        $query = Event::with('participants', 'teams');

        if ($date) {
            $query->whereDate('date', $date);
        }

        if ($sort === 'published') {
            $query->where('status', 'published')->orderByDesc('date');
        } else {
            $query->orderByDesc('id');
        }

        $events = $query->get();

        return response()->json($events);
    }




    public function show($id)
    {
        $event = Event::find($id);
        if ($event) {
            return response()->json($event);
        }
        return response()->json(['message' => 'Event not found'], 404);
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('events_images', 'public');
        }

        $event = Event::create($validated);

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        if ($request->hasFile('image')) {
            if ($event->image && Storage::disk('public')->exists($event->image)) {
                Storage::disk('public')->delete($event->image);
            }

            $validated['image'] = $request->file('image')->store('events_images', 'public');
        }

        $event->update($validated);

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

        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}