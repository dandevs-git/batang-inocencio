<?php

namespace App\Http\Controllers;

use App\Models\Transparency;
use App\Models\TransparencyFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TransparencyController extends Controller
{
    public function index()
    {
        $categories = Transparency::with('files')->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Transparency::create([
            'name' => $request->name,
        ]);

        return response()->json($category, 201);
    }

    public function uploadFile(Request $request, $categoryId)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:10240',
        ]);

        $category = Transparency::findOrFail($categoryId);

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $fileUrl = $file->storeAs('transparency_files', $fileName, 'public');

        $fileEntry = TransparencyFile::create([
            'transparency_id' => $category->id,
            'file_name' => $fileName,
            'file_url' => $fileUrl,
        ]);

        return response()->json($fileEntry, 201);
    }

    /**
     * Show a specific file.
     */
    public function show($id)
    {
        $file = TransparencyFile::findOrFail($id);
        return response()->json($file);
    }

    /**
     * Update a file's category or description.
     */
    public function update(Request $request, $id)
    {
        $file = TransparencyFile::findOrFail($id);

        $validated = $request->validate([
            'category' => 'nullable|in:resolution,project_report,accomplishment_report',
            'description' => 'nullable|string|max:500',
        ]);

        $file->update(array_filter($validated));

        return response()->json(['message' => 'File updated successfully.', 'file' => $file]);
    }

    /**
     * Remove a file from storage.
     */
    public function destroy($id)
    {
        $file = TransparencyFile::findOrFail($id);

        if ($file->file_url && Storage::disk('public')->exists($file->file_url)) {
            Storage::disk('public')->delete($file->file_url);
        }

        $file->delete();

        return response()->json(['message' => 'File deleted successfully.']);
    }
}
