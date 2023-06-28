<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'items' => ['required_with', 'array'], // Validator Proposal Items
            'items.*' => ['array:room_type_id,room_id'],
            'items.*.room_type_id' => ['string', 'nullable'],
            'items.*.room_id' => ['string', 'nullable'],

            // 'booking_date' => 'bail|required|date',
            'checkin_date'=> 'bail|required|date|after:tomorrow',
            'checkout_date'=> 'bail|required|date|after:checkin_date',
            'people_quantity'=> 'bail|required|alpha_num',
            // 'coupon_id'=> 'bail|',
            // 'user_id'=> 'bail|required',
            // 'guest_name'=> 'bail|required|alpha|max:255',
            // 'guest_email'=> 'bail|required|email|max:255',
            // 'guest_phone'=> 'bail|required|alpha_num|max:10',
            // 'note'=> 'bail|',
            // 'comment_id'=> 'bail|required|alpha_num|max:11',
            // 'status'=> 'bail|required|alpha_num|max:4',
        ];
    }
}