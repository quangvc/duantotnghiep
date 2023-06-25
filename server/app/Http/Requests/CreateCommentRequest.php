<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
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
        'content' => 'required',
        'rating' => 'nullable|integer|min:0|max:5',
        'blog_id' => 'nullable|integer|exists:tbl_blogs,id'
        ];
    }
    public function messages()
    {
       return [
        'content.required' => 'vui lòng không boe trống ',
        'rating.required' => 'vui lòng không boe trống ',
        'blog_id.required' => 'vui lòng không boe trống ',
       ];
    }
}
