<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\AuthController;
use App\Models\Event;
use App\Models\User;
use App\Models\Favorite; // ✅ NEW
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| EVENTS
|--------------------------------------------------------------------------
*/

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{event}', [EventController::class, 'update']);
Route::delete('/events/{event}', [EventController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| ORGANIZER EVENTS
|--------------------------------------------------------------------------
*/

Route::get('/organizer/events/{userId}', function (Request $request, $userId) {

    $query = Event::where('user_id', $userId);

    if ($request->has('status')) {
        $query->where('status', $request->status);
    }

    return $query
        ->orderBy('created_at', 'desc')
        ->paginate(10);

});

/*
|--------------------------------------------------------------------------
| ADMIN EVENT MODERATION
|--------------------------------------------------------------------------
*/

Route::get('/admin/pending-events', function () {
    return Event::where('status', 'pending')
        ->orderBy('created_at', 'desc')
        ->paginate(10);
});

Route::get('/admin/approved-events', function () {
    return Event::where('status', 'approved')
        ->orderBy('created_at', 'desc')
        ->paginate(10);
});

Route::get('/admin/rejected-events', function () {
    return Event::where('status', 'rejected')
        ->orderBy('created_at', 'desc')
        ->paginate(10);
});

Route::put('/events/{event}/approve', function (Event $event) {

    $event->status = 'approved';
    $event->save();

    return response()->json($event);

});

Route::put('/events/{event}/reject', function (Request $request, Event $event) {

    $event->status = 'rejected';
    $event->rejection_reason = $request->reason;
    $event->save();

    return response()->json($event);

});

Route::put('/events/{event}/feature', function (Event $event) {

    $event->featured = !$event->featured;
    $event->save();

    return response()->json($event);

});

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| USER INTERESTS
|--------------------------------------------------------------------------
*/

Route::put('/user/interests/{id}', function (Request $request, $id) {

    $user = User::findOrFail($id);

    $user->interests = $request->interests;

    $user->save();

    return response()->json([
        'message' => 'Interests updated successfully',
        'user' => $user
    ]);

});

/*
|--------------------------------------------------------------------------
| RECOMMENDATIONS
|--------------------------------------------------------------------------
*/

Route::get('/recommendations/{userId}', function ($userId) {

    $user = User::findOrFail($userId);

    $interests = $user->interests;

    if (!is_array($interests)) {

        if (is_string($interests)) {
            $interests = explode(',', $interests);
        } else {
            $interests = [];
        }

    }

    if (count($interests) === 0) {
        return response()->json([]);
    }

    return Event::whereIn('category', $interests)
        ->where('status', 'approved')
        ->orderBy('date', 'asc')
        ->get();

});

/*
|--------------------------------------------------------------------------
| FAVORITES (❤️ NEW FEATURE)
|--------------------------------------------------------------------------
*/

// ADD FAVORITE
Route::post('/favorites', function (Request $request) {

    return Favorite::firstOrCreate([
        'user_id' => $request->user_id,
        'event_id' => $request->event_id
    ]);

});

// REMOVE FAVORITE
Route::delete('/favorites', function (Request $request) {

    Favorite::where('user_id', $request->user_id)
        ->where('event_id', $request->event_id)
        ->delete();

    return response()->json([
        'message' => 'Removed from favorites'
    ]);

});

// GET USER FAVORITES
Route::get('/favorites/{userId}', function ($userId) {

    return Event::whereIn('id', function ($query) use ($userId) {
        $query->select('event_id')
              ->from('favorites')
              ->where('user_id', $userId);
    })
    ->orderBy('date', 'desc')
    ->get();

});

// 🔥 OPTIONAL: TOGGLE FAVORITE (BEST UX)
Route::post('/favorites/toggle', function (Request $request) {

    $favorite = Favorite::where('user_id', $request->user_id)
        ->where('event_id', $request->event_id)
        ->first();

    if ($favorite) {
        $favorite->delete();
        return response()->json(['status' => 'removed']);
    }

    Favorite::create([
        'user_id' => $request->user_id,
        'event_id' => $request->event_id
    ]);

    return response()->json(['status' => 'added']);
});

/*
|--------------------------------------------------------------------------
| TEST STORAGE
|--------------------------------------------------------------------------
*/

Route::get('/test-storage', function () {

    $path = Storage::disk('public')->put('test.txt', 'hello from uppgo');

    return response()->json([
        'message' => 'File stored successfully',
        'path' => $path,
        'url' => url('/storage/' . $path)
    ]);

});

/*
|--------------------------------------------------------------------------
| DEBUG
|--------------------------------------------------------------------------
*/

Route::get('/bucket-test', function () {
    return 'Using local/public storage';
});