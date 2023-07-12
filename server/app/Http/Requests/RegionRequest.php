<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'image'     =>  'bail|image|max:2048|mimes:jpeg,png,jpg|mimetypes:image/jpeg,image/png,image/jpg',
        ];
    }
}
