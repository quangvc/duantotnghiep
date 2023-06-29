<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackRequest;
use App\Http\Resources\API\FeedbackResource;
use App\Models\Booking;
use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    //
    public function index()
    {
        $feedback = Feedback::all();
        return FeedbackResource::collection($feedback);
    }
    public function store(FeedbackRequest $request)
    {
        $validatedData = $request->validate([
            'content' => 'required',
            'rating' => 'required|integer|min:1|max:5',
            'booking_id' => 'required|integer|exists:tbl_bookings,id'
        ]);

        $user_id = auth()->user()->id;
        $booking_id = $request->input('booking_id');
        $booking = Booking::where('user_id', $user_id)->find($booking_id);
        if (!$booking) {
            return response()->json(['message' => 'Không thể để lại feedback khi chưa booking'], 403);
        }

        $feedback = new Feedback();
        $feedback->content = $validatedData['content'];
        $feedback->rating = $validatedData['rating'];
        $feedback->booking_id = $validatedData['booking_id'];
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
