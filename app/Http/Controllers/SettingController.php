<?php

namespace App\Http\Controllers;

use App\Models\CommitteeMember;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $latestSetting = Setting::with('committeeMembers', 'carousels')->latest()->first();
        return response()->json($latestSetting);
    }

    public function save(Request $request)
    {
        $data = $this->extractData($request);

        // Either get the first existing setting or create it
        $setting = Setting::first();

        if (!$setting) {
            $setting = Setting::create($data['setting']);
        } else {
            $setting->update($data['setting']);
        }

        // Refresh committee members
        $setting->committeeMembers()->delete();
        foreach ($data['committee_members'] as $member) {
            $member['setting_id'] = $setting->id;
            CommitteeMember::create($member);
        }

        return response()->json([
            'message' => $setting->wasRecentlyCreated ? 'Website information created successfully.' : 'Website information updated successfully.',
            'data' => $setting->load('committeeMembers', 'carousels')
        ], $setting->wasRecentlyCreated ? 201 : 200);
    }

    public function show(Setting $setting)
    {
        return response()->json($setting->load('committeeMembers'));
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();
        return response()->json(['message' => 'Website information deleted successfully.']);
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