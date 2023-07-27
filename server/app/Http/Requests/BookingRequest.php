<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'checkin_date'=> 'bail|required|date|after:tomorrow',
            'checkout_date'=> 'bail|required|date|after:checkin_date',
            'people_quantity'=> 'bail|required|alpha_num',
        ];
    }
}