<?php

namespace App\Http\Controllers;

use App\Models\ComputerReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ComputerReservationController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->query('date');
        $pcNumber = $request->query('pc_number');

        $query = ComputerReservation::query();

        if ($pcNumber) {
            $query->where('pc_number', $pcNumber);
        }
        if ($date) {
            $query->whereDate('reservation_date', $date);
        }

        $reservations = $query->get();

        return response()->json($reservations, 200);
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



        $reservationCode = strtoupper(Str::random(8));

        $reservation = ComputerReservation::create([
            'pc_number' => $request->pc_number,
            'reservation_date' => $request->reservation_date,
            'time_range' => $request->time_range,
            'name' => $request->name,
            'address' => $request->address,
            'email' => $request->email,
            'contact' => $request->contact,
            'reservation_code' => $reservationCode,
        ]);

        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        $reservation = ComputerReservation::findOrFail($id);
        return response()->json($reservation, 200);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'pc_number' => 'sometimes|string',
            'reservation_date' => 'sometimes|date',
            'time_range' => 'sometimes|string',
            'name' => 'sometimes|string',
            'address' => 'nullable|string',
            'email' => 'sometimes|email',
            'contact' => 'sometimes|string',
        ]);

        $reservation = ComputerReservation::findOrFail($id);
        $reservation->update($validated);

        return response()->json($reservation, 200);
    }


    public function destroy($id)
    {
        $reservation = ComputerReservation::findOrFail($id);
        $reservation->delete();
        return response()->json(null, 204);
    }
}