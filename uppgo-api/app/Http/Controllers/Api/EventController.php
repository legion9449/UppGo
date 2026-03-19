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
        ]);

        // IMAGE
        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $path = $file->store('events', 'public');

            $validated['image'] = url('/storage/' . $path);
        }

        // ✅ SAVE GEO DATA (IMPORTANT FIX)
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        // USER + STATUS
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

            // ✅ ADD HERE ALSO
            'latitude' => 'nullable',
            'longitude' => 'nullable',
        ]);

        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $path = $file->store('events', 'public');

            $validated['image'] = url('/storage/' . $path);
        }

        // ✅ UPDATE GEO DATA
        $validated['latitude'] = $request->input('latitude');
        $validated['longitude'] = $request->input('longitude');

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Event deleted'
        ]);
    }
}