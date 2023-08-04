<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackRequest;
use App\Http\Resources\API\FeedbackResource;
use App\Models\Booking;
use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\Auth;

class FeedbackClientController extends Controller
{
    //
    public function index($idhotel)
    {
        $feedback = Feedback::with(['booking.booking_details.room_type' => function ($query) {
            $query->select('id', 'hotel_id', 'name');
        }])
            ->where('id', $idhotel)
            ->get();
        return FeedbackResource::collection($feedback);
    }
    public function store(FeedbackRequest $request)
    {
        $validatedData = $request->validate([
            'content' => 'required',
            'rating' => 'required|integer|min:1|max:5',
            'booking_id' => 'required|integer|exists:tbl_bookings,id'
        ]);
        $booking_id = $request->input('booking_id');
        $feedback = new Feedback();
        $feedback->content = $validatedData['content'];
        $feedback->rating = $validatedData['rating'];
        $feedback->booking_id = $booking_id;
        $feedback->save();
        return response()->json(['message' => 'feedback created successfully.']);
    }
    public function update(FeedbackRequest $request, $id)
    {
        $feedback = Feedback::find($id);
        $feedback->update($request->all());
        return MessageStatusAPI::update();
    }

    public function destroy($id)
    {
        $feedback = Feedback::find($id);
        $user_id = auth()->user()->name;
        if ($user_id !== 'Admin') {
            return MessageStatusAPI::notFound();
        }
        $feedback->delete();
        return MessageStatusAPI::destroy();
    }
}
