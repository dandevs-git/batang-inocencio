<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrintingServiceReservation;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PrintingServiceReservationController extends Controller
{
    // Show all reservations (index)
    public function index()
    {
        $reservations = PrintingServiceReservation::all();
        return response()->json($reservations);
    }

    // Store a new reservation (create)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'paper_size' => 'required|string',
            'color' => 'required|string',
            'file' => 'required|mimes:pdf|max:10240', // 10MB max
            'purpose' => 'required|string',
        ]);

        $filePath = $request->file('file')->store('printing_files', 'public');
        $reservationCode = strtoupper(Str::random(8));

        $reservation = PrintingServiceReservation::create([
            'name' => $request->name,
            'address' => $request->address,
            'contact_number' => $request->contact_number,
            'paper_size' => $request->paper_size,
            'color' => $request->color,
            'file_path' => $filePath,
            'purpose' => $request->purpose,
            'reservation_code' => $reservationCode,
        ]);

        return response()->json([
            'message' => 'Reservation created successfully.',
            'reservation_code' => $reservation->reservation_code,
        ]);
    }

    // Show a specific reservation by its ID
    public function show($id)
    {
        $reservation = PrintingServiceReservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found.'], 404);
        }

        return response()->json($reservation);
    }

    // Update an existing reservation
    public function update(Request $request, $id)
    {
        $reservation = PrintingServiceReservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found.'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'paper_size' => 'required|string',
            'color' => 'required|string',
            'file' => 'nullable|mimes:pdf|max:10240', // 10MB max
            'purpose' => 'required|string',
        ]);

        // Update file if it's provided
        if ($request->hasFile('file')) {
            // Delete the old file
            Storage::delete('public/' . $reservation->file_path);
            $filePath = $request->file('file')->store('printing_files', 'public');
            $reservation->file_path = $filePath;
        }

        // Update the reservation data
        $reservation->update([
            'name' => $request->name,
            'address' => $request->address,
            'contact_number' => $request->contact_number,
            'paper_size' => $request->paper_size,
            'color' => $request->color,
            'purpose' => $request->purpose,
        ]);

        return response()->json([
            'message' => 'Reservation updated successfully.',
            'reservation_code' => $reservation->reservation_code,
        ]);
    }

    // Delete a reservation
    public function destroy($id)
    {
        $reservation = PrintingServiceReservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found.'], 404);
        }

        // Delete the file from storage
        Storage::delete('public/' . $reservation->file_path);

        // Delete the reservation record
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully.']);
    }
}