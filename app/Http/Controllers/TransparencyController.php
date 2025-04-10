<?php

namespace App\Http\Controllers;

use App\Models\Transparency;
use App\Models\TransparencyFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TransparencyController extends Controller
{
    // Get all categories (for React)
    public function index()
    {
        $categories = Transparency::with('files')->get(); // Assuming you want to load files with categories
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

        // Return the newly created category as JSON response
        return response()->json($category, 201); // 201 Created status code
    }

    // Method to upload a file for a category
    public function uploadFile(Request $request, $categoryId)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:10240',
        ]);

        $category = Transparency::findOrFail($categoryId);

        // Handle file upload
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $fileUrl = $file->storeAs('transparency_files', $fileName, 'public');

        // Create file entry in the database
        $fileEntry = TransparencyFile::create([
            'transparency_id' => $category->id,
            'file_name' => $fileName,
            'file_url' => $fileUrl,
        ]);

        // Return the file details as a JSON response
        return response()->json($fileEntry, 201); // 201 Created status code
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

        // Validate category and description
        $validated = $request->validate([
            'category' => 'nullable|in:resolution,project_report,accomplishment_report',
            'description' => 'nullable|string|max:500',
        ]);

        // Update the file's data if validation passes
        $file->update(array_filter($validated));

        // Return the updated file details as a JSON response
        return response()->json(['message' => 'File updated successfully.', 'file' => $file]);
    }

    /**
     * Remove a file from storage.
     */
    public function destroy($id)
    {
        $file = TransparencyFile::findOrFail($id);

        // Check if the file exists in storage and delete it
        if ($file->file_url && Storage::disk('public')->exists($file->file_url)) {
            Storage::disk('public')->delete($file->file_url);
        }

        // Delete the file record from the database
        $file->delete();

        // Return a success message
        return response()->json(['message' => 'File deleted successfully.']);
    }
}