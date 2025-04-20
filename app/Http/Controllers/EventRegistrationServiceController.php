<?php

namespace App\Http\Controllers;

use App\Models\EventRegistrationService;
use Illuminate\Http\Request;

class EventRegistrationServiceController extends Controller
{
    // Fetch all event registration services
    public function index()
    {
        return EventRegistrationService::all();
    }

    // Create a new event registration service
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|time',
            'location' => 'required|string',
            'event_type' => 'required|in:Sport,Seminar,Workshop,Educational Assistance,Online Tournament,Other',
            'registration_type' => 'required|in:Individual,Group',
            'registration_start' => 'required|date',
            'registration_end' => 'required|date',
            'max_registrations' => 'required|integer',
            'requirements' => 'required|string',
            'penalty_enabled' => 'boolean',
            'description' => 'required|string',
            'launch_date' => 'required|date',
            'availability_status' => 'required|in:Available,Unavailable',
        ]);

        return EventRegistrationService::create($validated);
    }

    // Fetch a specific event registration service
    public function show($id)
    {
        return EventRegistrationService::findOrFail($id);
    }

    // Update an existing event registration service
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'service_name' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|time',
            'location' => 'required|string',
            'event_type' => 'required|in:Sport,Seminar,Workshop,Educational Assistance,Online Tournament,Other',
            'registration_type' => 'required|in:Individual,Group',
            'registration_start' => 'required|date',
            'registration_end' => 'required|date',
            'max_registrations' => 'required|integer',
            'requirements' => 'required|string',
            'penalty_enabled' => 'boolean',
            'description' => 'required|string',
            'launch_date' => 'required|date',
            'availability_status' => 'required|in:Available,Unavailable',
        ]);

        $eventRegistrationService = EventRegistrationService::findOrFail($id);
        $eventRegistrationService->update($validated);

        return $eventRegistrationService;
    }

    // Delete an event registration service
    public function destroy($id)
    {
        $eventRegistrationService = EventRegistrationService::findOrFail($id);
        $eventRegistrationService->delete();

        return response()->noContent();
    }
}