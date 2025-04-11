<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->query('date');

        if ($date) {
            $events = Event::whereDate('date', $date)->get();
        } else {
            $events = Event::all();
        }

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
        $request->validate([
            'title' => 'required|string|max:100',
            'date' => 'required|date',
            'location' => 'required|string',
            'event_organizer' => 'required|string',
            'registration_start_date' => 'required|date',
            'registration_end_date' => 'required|date',
            'event_type' => 'required|string',
            'description' => 'nullable|string',
            'time' => 'required|date_format:H:i',
            'contact_number' => 'required|string',
            'number_of_participants' => 'required|integer',
            'status' => 'nullable|in:draft,published',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('events_images', 'public');
            $data['image'] = $imagePath;
        }

        $event = Event::create($data);

        return response()->json($event, 201);
    }


    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:100',
            'date' => 'required|date',
            'location' => 'required|string',
            'event_organizer' => 'required|string',
            'registration_start_date' => 'required|date',
            'registration_end_date' => 'required|date',
            'event_type' => 'required|string',
            'description' => 'nullable|string',
            'time' => 'required|date_format:H:i',
            'contact_number' => 'required|string',
            'number_of_participants' => 'required|integer',
            'status' => 'nullable|in:draft,published',
        ]);

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
