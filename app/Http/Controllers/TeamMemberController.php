<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    // Get all team members
    public function index()
    {
        return response()->json(TeamMember::all());
    }

    // Get a specific team member by ID
    public function show($id)
    {
        $teamMember = TeamMember::find($id);
        if ($teamMember) {
            return response()->json($teamMember);
        }
        return response()->json(['message' => 'Team Member not found'], 404);
    }

    // Create a new team member
    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|string',
            'age' => 'required|integer',
            'contact' => 'required|string',
        ]);

        $teamMember = TeamMember::create($request->all());

        return response()->json($teamMember, 201);
    }

    // Update a team member
    public function update(Request $request, $id)
    {
        $teamMember = TeamMember::find($id);
        if (!$teamMember) {
            return response()->json(['message' => 'Team Member not found'], 404);
        }

        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|string',
            'age' => 'required|integer',
            'contact' => 'required|string',
        ]);

        $teamMember->update($request->all());

        return response()->json($teamMember);
    }

    // Delete a team member
    public function destroy($id)
    {
        $teamMember = TeamMember::find($id);
        if (!$teamMember) {
            return response()->json(['message' => 'Team Member not found'], 404);
        }

        $teamMember->delete();

        return response()->json(['message' => 'Team Member deleted successfully']);
    }
}