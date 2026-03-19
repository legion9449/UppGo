<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    // ================= GET EVENTS =================
    public function index(Request $request)
    {
        $query = Event::where('status', 'approved');

        // ✅ FEATURED FILTER
        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        // ✅ SEARCH (title + location)
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('location', 'like', '%' . $request->search . '%');
            });
        }

        // ✅ CATEGORY FILTER
        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        // ✅ EVENT TYPE FILTER
        if ($request->has('eventType') && $request->eventType !== 'All') {
            $query->where('eventType', $request->eventType);
        }

        // ✅ PAGINATION (IMPORTANT)
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

        // ✅ IMAGE UPLOAD TO GCS
        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $path = Storage::disk('gcs')->putFile('events', $file);

            $validated['image'] = Storage::disk('gcs')->url($path);
        }

        // ✅ GEO DATA
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        // ✅ DEFAULT STATUS
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

        // ✅ IMAGE UPDATE
        if ($request->hasFile('image')) {

            // delete old image
            if ($event->image) {
                $this->deleteGcsFile($event->image);
            }

            $file = $request->file('image');

            $path = Storage::disk('gcs')->putFile('events', $file);

            $validated['image'] = Storage::disk('gcs')->url($path);
        }

        // ✅ UPDATE GEO
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        $event->update($validated);

        return response()->json($event);
    }

    // ================= DELETE EVENT =================
    public function destroy(Event $event)
    {
        // delete image
        if ($event->image) {
            $this->deleteGcsFile($event->image);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }

    // ================= HELPER =================
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