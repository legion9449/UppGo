<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Event;

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

Route::post('/signup', function (Request $request) {

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role,
        'interests' => $request->interests
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return [
        'token' => $token,
        'user' => $user
    ];

});


Route::post('/login', function (Request $request) {

    $user = User::where('name', $request->username)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {

        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);

    }

    $token = $user->createToken('authToken')->plainTextToken;

    return [
        'token' => $token,
        'user' => $user
    ];

});


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