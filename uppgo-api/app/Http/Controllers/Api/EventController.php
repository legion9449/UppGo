<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::where('status', 'approved');

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        return $query->orderBy('date', 'desc')->get();
    }

    public function show(Event $event)
    {
        return $event;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'category' => 'nullable|string',
            'eventType' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048', // Expects an actual file, max 2MB
            
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'user_id' => 'required|integer', // Ensure user_id is validated
        ]);

        // ✅ IMAGE UPLOAD TO GOOGLE CLOUD STORAGE
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            
            // Upload the file to the 'events' folder and ensure it is public
            $path = Storage::disk('gcs')->putFile('events', $file, 'public');

            // Automatically generate the clean public URL
            $validated['image'] = Storage::disk('gcs')->url($path);
        }

        // ✅ SAVE GEO DATA
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        // ✅ USER + STATUS
        $validated['user_id'] = $request->input('user_id');
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
            'image' => 'nullable|image|max:2048',
            
            'latitude' => 'nullable',
            'longitude' => 'nullable',
        ]);

        // ✅ IMAGE UPDATE (GCS)
        if ($request->hasFile('image')) {
            
            // 1. Delete the old image first to prevent storage bloat
            if ($event->image) {
                // Strip the base URL to get just the path (e.g., "events/filename.jpg")
                $oldPath = str_replace(Storage::disk('gcs')->url(''), '', $event->image);
                Storage::disk('gcs')->delete($oldPath);
            }

            // 2. Upload the new image
            $file = $request->file('image');
            $newPath = Storage::disk('gcs')->putFile('events', $file, 'public');
            $validated['image'] = Storage::disk('gcs')->url($newPath);
        }

        // ✅ UPDATE GEO DATA
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        // ✅ DELETE ORPHANED IMAGE FROM GCS
        if ($event->image) {
            $path = str_replace(Storage::disk('gcs')->url(''), '', $event->image);
            Storage::disk('gcs')->delete($path);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event and associated image deleted successfully'
        ]);
    }
}