<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all members from the database
        $members = Member::all();

        // Return response with the list of members
        return response()->json($members, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    // Store method
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'address' => 'required|string',
            'area' => [
                'required',
                Rule::in([
                    'Inocencio Proper',
                    'Tradition Homes Phase 1 and 2',
                    'Sampaguita Village',
                    'Regina Ville 2000',
                    'BRIA Homes',
                    'South Ville Phase 1A and B',
                ])
            ],
            'sex' => ['required', Rule::in(['Male', 'Female'])],
            'age' => 'required|integer|min:18',
            'email' => 'required|email|unique:members,email',
            'contact_number' => 'required|string|max:15',
            'civil_status' => ['required', Rule::in(['Single', 'Married', 'Widowed', 'Divorced', 'Separated'])],
            'age_group' => [
                'required',
                Rule::in([
                    'Child Youth (15-17)',
                    'Core Youth (18-24)',
                    'Young Adult (25-30)',
                ])
            ],
            'education' => [
                'nullable',
                Rule::in([
                    'Elementary Level',
                    'Elementary Graduate',
                    'High School Level',
                    'High School Graduate',
                    'College Level',
                    'College Graduate',
                    'Masters Graduate',
                    'Doctorate Level',
                    'Doctorate Graduate',
                    'Out of School',
                ])
            ],
            'employment' => ['nullable', Rule::in(['Unemployed', 'Employed'])],
            'sk_voter' => ['required', Rule::in(['Yes', 'No'])],
            'election_vote' => ['nullable', Rule::in(['Yes', 'No'])],
            'national_voter' => ['nullable', Rule::in(['Yes', 'No'])],
            'kk_assembly' => ['required', Rule::in(['Yes', 'No'])],
            'kk_reason' => 'nullable|string',
            'youth_concerns' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'project_recommendations' => 'nullable|string',
        ]);

        // If validation fails, return detailed error messages
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Handle the kk_reason array and convert it to a JSON string
        $kk_reason = json_encode($request->input('kk_reason'));

        // Create a new member
        $member = Member::create(array_merge($request->all(), ['kk_reason' => $kk_reason]));

        // Return response with the created member
        return response()->json([
            'status' => 'success',
            'message' => 'Member created successfully',
            'data' => $member,
        ], 201);
    }

    // Update method
    public function update(Request $request, Member $member)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'address' => 'required|string',
            'area' => 'required|string',
            'sex' => 'required|string',
            'age' => 'required|integer|min:18',
            'email' => ['required', 'email', Rule::unique('members')->ignore($member->id)],
            'contact_number' => 'required|string|max:15',
            'civil_status' => 'required|string',
            'age_group' => 'required|string',
            'education' => 'nullable|string',
            'employment' => 'nullable|string',
            'sk_voter' => 'required|boolean',
            'election_vote' => 'required|boolean',
            'national_voter' => 'required|boolean',
            'kk_assembly' => 'required|boolean',
            'kk_attendances' => 'required|integer|min:0',
            'kk_reason' => 'nullable|string',
            'youth_concerns' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'project_recommendations' => 'nullable|string',
        ]);

        // If validation fails, return detailed error messages
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Update the member
        $member->update($request->all());

        // Return response with the updated member
        return response()->json([
            'status' => 'success',
            'message' => 'Member updated successfully',
            'data' => $member,
        ], 200);
    }




    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        // Return the member's details
        return response()->json($member, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        // Delete the member
        $member->delete();

        // Return a success response
        return response()->json(['message' => 'Member deleted successfully'], 200);
    }
}