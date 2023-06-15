<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HotelRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'hotel_name' => 'required|string|max:255',
            'hotel_phone' => 'required|string|max:20|min:8',
            'hotel_address' => 'required|string|max:255',
            'description' => 'nullable|',
            'star_rating' => 'required|integer|between:1,5',
            'region_id' => 'required|integer|exists:tbl_regions,id',

        ];
    }
}
