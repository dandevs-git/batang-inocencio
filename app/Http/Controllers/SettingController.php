<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $latestSetting = Setting::latest()->first();
        return response()->json($latestSetting);
    }


    public function store(Request $request)
    {
        $data = $this->extractData($request);

        $setting = Setting::create($data);

        return response()->json([
            'message' => 'Website information created successfully.',
            'data' => $setting
        ], 201);
    }

    public function show(Setting $setting)
    {
        return response()->json($setting);
    }

    public function update(Request $request, Setting $setting)
    {
        $data = $this->extractData($request);

        $setting->update($data);

        return response()->json([
            'message' => 'Website information updated successfully.',
            'data' => $setting
        ]);
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return response()->json([
            'message' => 'Website information deleted successfully.'
        ]);
    }

    /**
     * Extract and format incoming request data for both store and update
     */
    private function extractData(Request $request): array
    {
        $data = [];

        // Logo upload with static name
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->storeAs('logos', 'Logo.png', 'public');
        }

        // Other basic fields
        $data['website_name'] = $request->input('website_name');
        $data['address'] = $request->input('address');
        $data['phone_number'] = $request->input('phone_number');
        $data['email'] = $request->input('email');
        $data['mission'] = $request->input('mission');
        $data['vision'] = $request->input('vision');
        $data['committee_member_name'] = $request->input('committee_member_name');
        $data['committee_member_position'] = $request->input('committee_member_position');

        // Committee image
        if ($request->hasFile('committee_member_image')) {
            $data['committee_member_image'] = $request->file('committee_member_image')->store('members', 'public');
        }

        return $data;
    }
}