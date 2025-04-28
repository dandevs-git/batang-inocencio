<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ResourceReservationService;
use Illuminate\Http\Request;

class ResourceReservationServiceController extends Controller
{
    public function index()
    {
        return ResourceReservationService::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'resource_name' => 'required|string|max:255',
            'available_resources' => 'required|integer|min:1',
            'timeslot_duration' => 'nullable|string',
            'max_reservation_per_timeslot' => 'nullable|integer',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'reservation_type' => 'required|in:Individual,Group',
            'individuals_per_reservation' => 'nullable|integer',
            'min_group_size' => 'nullable|integer',
            'max_group_size' => 'nullable|integer',
            'booking_window' => 'required|string',
            'penalty_description' => 'nullable|string',
            'launch_date' => 'required|date',
            'availability_status' => 'required|in:Available,Unavailable',
        ]);

        return ResourceReservationService::create($validated);
    }

    public function show($id)
    {
        return ResourceReservationService::findOrFail($id);
    }

    public function availableResources()
    {
        $service = ResourceReservationService::where('service_name', 'Computer Rental')->first();
        $resources = [];

        if ($service) {
            $count = $service->available_resources;
            for ($i = 1; $i <= $count; $i++) {
                $resources[] = [
                    'id' => $i,
                    'name' => "PC-$i",
                    'status' => rand(0, 1) ? 'available' : 'full'
                ];
            }
        }

        return response()->json($resources);
    }



    public function update(Request $request, $id)
    {
        $service = ResourceReservationService::findOrFail($id);

        $validated = $request->validate([
            'service_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'resource_name' => 'sometimes|string|max:255',
            'available_resources' => 'required|integer|min:1',
            'timeslot_duration' => 'nullable|string',
            'max_reservation_per_timeslot' => 'nullable|integer',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'reservation_type' => 'sometimes|in:Individual,Group',
            'individuals_per_reservation' => 'nullable|integer',
            'min_group_size' => 'nullable|integer',
            'max_group_size' => 'nullable|integer',
            'booking_window' => 'sometimes|string',
            'penalty_description' => 'nullable|string',
            'launch_date' => 'sometimes|date',
            'availability_status' => 'sometimes|in:Available,Unavailable',
        ]);

        $service->update($validated);
        return $service;
    }

    public function destroy($id)
    {
        $service = ResourceReservationService::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully.']);
    }
}