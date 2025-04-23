<?php

namespace App\Http\Controllers;

use App\Models\ComputerReservation;
use Illuminate\Http\Request;

class ComputerReservationController extends Controller
{
    public function index()
    {
        return response()->json(ComputerReservation::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pc_number' => 'required|string',
            'reservation_date' => 'required|date',
            'time_range' => 'required|string',
            'name' => 'required|string',
            'address' => 'nullable|string',
            'email' => 'required|email',
            'contact' => 'required|string',
        ]);

        $reservation = ComputerReservation::create($validated);
        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        $reservation = ComputerReservation::findOrFail($id);
        return response()->json($reservation, 200);
    }

    public function update(Request $request, $id)
    {
        $reservation = ComputerReservation::findOrFail($id);
        $reservation->update($request->all());
        return response()->json($reservation, 200);
    }

    public function destroy($id)
    {
        $reservation = ComputerReservation::findOrFail($id);
        $reservation->delete();
        return response()->json(null, 204);
    }
}