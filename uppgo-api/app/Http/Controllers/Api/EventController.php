<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    // ================= GET EVENTS (WITH PAGINATION) =================
    public function index(Request $request)
    {
        $query = Event::where('status', 'approved');

        // ✅ Featured filter
        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        // ✅ Pagination (9 events per page)
        return $query->orderBy('date', 'desc')->paginate(9);
    }

    // ================= SHOW SINGLE EVENT =================
    public function show(Event $event)
    {
        return $event;
    }

    // ================= CREATE EVENT =================
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

        // ✅ Geo data
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        // ✅ Default status
        $validated['status'] = 'pending';

        return Event::create($validated);
    }

    // ================= UPDATE EVENT =================
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

            // delete old image
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

    // ================= DELETE EVENT =================
    public function destroy(Event $event)
    {
        // delete image from GCS
        if ($event->image) {
            $this->deleteGcsFile($event->image);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }

    // ================= HELPER FUNCTION =================
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