<?php

namespace App\Http\Controllers;

use App\Models\CommitteeMember;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $latestSetting = Setting::with('committeeMembers')->latest()->first();
        return response()->json($latestSetting, 200);
    }

    public function store(Request $request)
    {
        $data = $this->extractData($request);
        $setting = Setting::create($data['setting']);

        foreach ($data['committee_members'] as $member) {
            $member['website_information_id'] = $setting->id;
            CommitteeMember::create($member);
        }

        return response()->json([
            'message' => 'Website information created successfully.',
            'data' => $setting->load('committeeMembers')
        ], 201);
    }

    public function show(Setting $setting)
    {
        return response()->json($setting->load('committeeMembers'));
    }

    public function update(Request $request)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response()->json(['message' => 'Website information not found.'], 404);
        }

        $data = $this->extractData($request);
        $setting->update($data['setting']);

        $setting->committeeMembers()->delete();

        foreach ($data['committee_members'] as $member) {
            $member['website_information_id'] = $setting->id;
            CommitteeMember::create($member);
        }

        return response()->json([
            'message' => 'Website information updated successfully.',
            'data' => $setting->load('committeeMembers')
        ]);
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return response()->json([
            'message' => 'Website information deleted successfully.'
        ]);
    }

    private function extractData(Request $request): array
    {
        $settingData = [];

        if ($request->hasFile('logo')) {
            $settingData['logo'] = $request->file('logo')->storeAs('logos', 'Logo.png', 'public');
        }

        $settingData['website_name'] = $request->input('website_name');
        $settingData['address'] = $request->input('address');
        $settingData['phone_number'] = $request->input('phone_number');
        $settingData['email'] = $request->input('email');
        $settingData['mission'] = $request->input('mission');
        $settingData['vision'] = $request->input('vision');

        $committeeMembers = [];
        foreach ($request->input('committeeMembers', []) as $index => $member) {
            $data = [
                'name' => $member['name'],
                'position' => $member['position'],
            ];

            if ($request->hasFile("committeeMembers.$index.image")) {
                $data['image'] = $request->file("committeeMembers.$index.image")->store('committee_images', 'public');
            }

            $committeeMembers[] = $data;
        }

        return [
            'setting' => $settingData,
            'committee_members' => $committeeMembers
        ];
    }
}