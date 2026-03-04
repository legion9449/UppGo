<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::orderBy('date', 'desc');

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        return $query->get();
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
            'featured' => 'nullable|boolean',
            'image' => 'nullable|image|max:2048'
        ]);

        // Upload image
        if ($request->hasFile('image')) {

            $path = $request->file('image')->store('events', 'public');

            $validated['image'] = "/storage/" . $path;
        }

        // Geocode address
        $address = urlencode($validated['location'] . ", Sweden");

        $url = "https://nominatim.openstreetmap.org/search?q={$address}&format=json&limit=1";

        $options = [
            "http" => [
                "header" => "User-Agent: UppGo-App\r\n"
            ]
        ];

        $context = stream_context_create($options);
        $response = @file_get_contents($url, false, $context);

        if ($response !== false) {

            $data = json_decode($response, true);

            if (!empty($data)) {

                $validated['latitude'] = (float) $data[0]['lat'];
                $validated['longitude'] = (float) $data[0]['lon'];
            }
        }

        return Event::create($validated);
    }

    public function show(Event $event)
    {
        return response()->json($event);
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
            'featured' => 'nullable|boolean',
            'image' => 'nullable|image|max:2048'
        ]);

        // Upload new image
        if ($request->hasFile('image')) {

            $path = $request->file('image')->store('events', 'public');

            $validated['image'] = "/storage/" . $path;
        }

        // Geocode address
        $address = urlencode($validated['location'] . ", Sweden");

        $url = "https://nominatim.openstreetmap.org/search?q={$address}&format=json&limit=1";

        $options = [
            "http" => [
                "header" => "User-Agent: UppGo-App\r\n"
            ]
        ];

        $context = stream_context_create($options);
        $response = @file_get_contents($url, false, $context);

        if ($response !== false) {

            $data = json_decode($response, true);

            if (!empty($data)) {

                $validated['latitude'] = (float) $data[0]['lat'];
                $validated['longitude'] = (float) $data[0]['lon'];
            }
        }

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}