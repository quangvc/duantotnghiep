<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBlogRequest extends FormRequest
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
    // public function rules()
    // {
    //     return [
    //         'title'     => 'bail|required|',
    //         'slug' => 'bail|required|',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    //     ];
    // }
    // public function messages()
    // {
    //     return [
    //         'title.required'   => 'Title đang trống',
    //         'slug.required'   => 'Slug đang trống',
    //     ];
    // }
}
