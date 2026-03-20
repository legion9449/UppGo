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

        // FEATURED
        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        // SEARCH
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('location', 'like', '%' . $request->search . '%');
            });
        }

        // CATEGORY
        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        // EVENT TYPE
        if ($request->has('eventType') && $request->eventType !== 'All') {
            $query->where('eventType', $request->eventType);
        }

        return $query->orderBy('date', 'desc')->paginate(9);
    }

    // ================= SHOW =================
    public function show(Event $event)
    {
        return $event;
    }

    // ================= CREATE =================
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

        // IMAGE
        if ($request->hasFile('image')) {

            $file = $request->file('image');
            $path = Storage::disk('gcs')->putFile('events', $file);

            $validated['image'] = Storage::disk('gcs')->url($path);
        }

        // GEO
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        // DEFAULT STATUS
        $validated['status'] = 'pending';

        return Event::create($validated);
    }

    // ================= UPDATE (🔥 FIXED) =================
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'category' => 'nullable|string',
            'eventType' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'featured' => 'nullable'
        ]);

        // IMAGE UPDATE
        if ($request->hasFile('image')) {

            if ($event->image) {
                $this->deleteGcsFile($event->image);
            }

            $file = $request->file('image');
            $path = Storage::disk('gcs')->putFile('events', $file);

            $event->image = Storage::disk('gcs')->url($path);
        }

        // 🔥 FORCE UPDATE (IMPORTANT FIX)
        $event->title = $request->title;
        $event->date = $request->date;
        $event->location = $request->location;
        $event->category = $request->category;
        $event->eventType = $request->eventType;
        $event->description = $request->description;

        // GEO
        $event->latitude = $request->latitude;
        $event->longitude = $request->longitude;

        // FEATURED
        $event->featured = $request->featured ? 1 : 0;

        $event->save();

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event
        ]);
    }

    // ================= DELETE =================
    public function destroy(Event $event)
    {
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