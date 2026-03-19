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

        // ✅ Upload image to GCS
        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $path = Storage::disk('gcs')->putFile('events', $file);

            $validated['image'] = Storage::disk('gcs')->url($path);
        }

        // ✅ Geo
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        // ✅ Status
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

        // ✅ Replace image
        if ($request->hasFile('image')) {

            // Delete old image safely
            if ($event->image) {
                $this->deleteGcsFile($event->image);
            }

            $file = $request->file('image');

            $path = Storage::disk('gcs')->putFile('events', $file);

            $validated['image'] = Storage::disk('gcs')->url($path);
        }

        // ✅ Update geo
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        // ✅ Delete image
        if ($event->image) {
            $this->deleteGcsFile($event->image);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }

    /**
     * ✅ Helper: safely delete GCS file from full URL
     */
    private function deleteGcsFile($url)
    {
        try {
            $bucketUrl = Storage::disk('gcs')->url('');

            $path = str_replace($bucketUrl, '', $url);

            if ($path) {
                Storage::disk('gcs')->delete($path);
            }
        } catch (\Exception $e) {
            \Log::error('GCS delete failed: ' . $e->getMessage());
        }
    }
}