<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Get all teams
    public function index()
    {
        return response()->json(Team::all());
    }

    // Get a specific team by ID
    public function show($id)
    {
        $team = Team::find($id);
        if ($team) {
            return response()->json($team);
        }
        return response()->json(['message' => 'Team not found'], 404);
    }

    // Create a new team
    public function store(Request $request)
    {
        $request->validate([
            'team_name' => 'required|string',
            'team_captain' => 'required|string',
            'team_captain_age' => 'required|integer',
            'team_captain_address' => 'required|string',
            'team_captain_contact_number' => 'required|string',
            'team_captain_email' => 'required|email|unique:teams,team_captain_email',
        ]);

        $team = Team::create($request->all());

        return response()->json($team, 201);
    }

    // Update a team
    public function update(Request $request, $id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $request->validate([
            'team_name' => 'required|string',
            'team_captain' => 'required|string',
            'team_captain_age' => 'required|integer',
            'team_captain_address' => 'required|string',
            'team_captain_contact_number' => 'required|string',
            'team_captain_email' => 'required|email|unique:teams,team_captain_email,' . $id,
        ]);

        $team->update($request->all());

        return response()->json($team);
    }

    // Delete a team
    public function destroy($id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $team->delete();

        return response()->json(['message' => 'Team deleted successfully']);
    }
}