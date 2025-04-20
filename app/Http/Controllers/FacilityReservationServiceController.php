<?php

namespace App\Http\Controllers;

use App\Models\FacilityReservationService;
use Illuminate\Http\Request;

class FacilityReservationServiceController extends Controller
{
    public function index()
    {
        return FacilityReservationService::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_name' => 'required|string|max:255',
            'description' => 'required|string',
            'available_facilities' => 'required|integer',
            'timeslot_duration' => 'required|in:30 minutes,1 hour',
            'max_reservation_per_timeslot' => 'required|integer',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'reservation_type' => 'required|in:Individual,Group',
            'individuals_per_reservation' => 'nullable|integer',
            'min_group_size' => 'nullable|integer',
            'max_group_size' => 'nullable|integer',
            'booking_window' => 'required|string',
            'penalty_enabled' => 'required|boolean',
            'penalty_description' => 'nullable|string',
            'launch_date' => 'required|date',
            'availability_status' => 'required|in:Available,Unavailable',
        ]);

        $facility = FacilityReservationService::create($request->all());
        return response()->json($facility, 201);
    }

    public function show($id)
    {
        return FacilityReservationService::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            // Add the same validation rules here as in the store method
        ]);

        $facility = FacilityReservationService::findOrFail($id);
        $facility->update($request->all());
        return response()->json($facility, 200);
    }

    public function destroy($id)
    {
        $facility = FacilityReservationService::findOrFail($id);
        $facility->delete();
        return response()->json(null, 204);
    }
}