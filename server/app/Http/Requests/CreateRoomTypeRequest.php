<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoomTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'              => 'required',
            'price_per_night'   => 'required', 
            'capacity' => 'required', 
            'description' => 'required', 
        ];
    }
    public function messages()
    {
       return [
        'required' => 'vui lòng không boe trống ',
       ];
    }
}
