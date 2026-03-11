<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function index(Request $request)
    {

        $query = Event::where('status', 'approved');

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        return $query
            ->orderBy('date', 'desc')
            ->get();

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
            'image' => 'nullable|image|max:2048'
        ]);

        // Upload image
        if ($request->hasFile('image')) {

            $path = $request->file('image')->store('events', 'public');

            $validated['image'] = '/storage/' . $path;

        }

        // Attach organizer id
        $validated['user_id'] = $request->user()->id ?? null;

        // All new events must be approved
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

            $path = $request->file('image')->store('events', 'public');

            $validated['image'] = '/storage/' . $path;

        }

        // Allow admin to edit ANY event
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