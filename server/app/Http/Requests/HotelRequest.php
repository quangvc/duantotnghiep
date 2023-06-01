<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HotelRequest extends FormRequest
{
    public function rules()
    {
        return [
            'hotel_name' => 'required|max:255',
            'hotel_phone' => 'required|max:20',
            'hotel_address' => 'required|max:255',
            'description' => 'nullable',
            'star_rating' => 'required|integer|between:1,5',
            'region_id' => 'required|exists:tbl_regions,id',
            'status' => 'required|boolean',
        ];
    }
}