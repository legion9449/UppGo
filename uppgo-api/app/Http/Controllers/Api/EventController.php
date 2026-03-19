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
            'image' => 'nullable|image|max:2048',
            
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'user_id' => 'required|integer',
        ]);

        // ✅ THE ULTIMATE OVERRIDE: Force no_acl directly on the upload command
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            
           $path = Storage::disk('gcs')->putFile('events', $file);

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

        // ✅ IMAGE UPDATE
        if ($request->hasFile('image')) {
            
            // Delete the old image first
            if ($event->image) {
                $oldPath = str_replace(Storage::disk('gcs')->url(''), '', $event->image);
                Storage::disk('gcs')->delete($oldPath);
            }

            // ✅ THE ULTIMATE OVERRIDE: Force no_acl directly on the new upload
            $file = $request->file('image');
            $newPath = Storage::disk('gcs')->putFile('events', $file, [
                'visibility' => 'no_acl'
            ]);
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
        // ✅ DELETE IMAGE FROM GCS
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