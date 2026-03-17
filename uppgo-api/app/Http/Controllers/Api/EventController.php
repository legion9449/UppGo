<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'category' => 'nullable|string',
            'eventType' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {

            // ✅ FORCE UNIQUE FILE NAME
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();

            // ✅ STORE FILE
            $path = Storage::disk('gcs')->putFileAs(
                'events',
                $file,
                $filename
            );

            // 🔥 DEBUG (optional)
            if (!$path) {
                return response()->json(['error' => 'Upload failed'], 500);
            }

            // ✅ FULL URL
            $validated['image'] =
                "https://storage.googleapis.com/" .
                env('GOOGLE_CLOUD_STORAGE_BUCKET') .
                "/" .
                $path;
        }

        $validated['user_id'] = $request->user()->id ?? null;
        $validated['status'] = 'pending';

        return Event::create($validated);
    }


    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'category' => 'nullable|string',
            'eventType' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();

            $path = Storage::disk('gcs')->putFileAs(
                'events',
                $file,
                $filename
            );

            if (!$path) {
                return response()->json(['error' => 'Upload failed'], 500);
            }

            $validated['image'] =
                "https://storage.googleapis.com/" .
                env('GOOGLE_CLOUD_STORAGE_BUCKET') .
                "/" .
                $path;
        }

        $event->update($validated);

        return response()->json($event);
    }
}