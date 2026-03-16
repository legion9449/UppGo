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
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {

            $path = Storage::disk('gcs')->putFile(
                'events',
                $request->file('image')
            );

            $validated['image'] = Storage::disk('gcs')->url($path);
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

            $path = Storage::disk('gcs')->putFile(
                'events',
                $request->file('image')
            );

            $validated['image'] =
    "https://storage.googleapis.com/" .
    env('GOOGLE_CLOUD_STORAGE_BUCKET') . "/" .
    $path;
        }

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