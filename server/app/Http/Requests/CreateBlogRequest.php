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
    public function rules()
    {
        return [
            'title'     => 'required',
            'content'   => 'required|string',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'slug' =>'required|unique:blogs,slug',
        ];
    }
    public function messages()
    {
       return [
        'title.required'   => 'lỗi',
        'content.required' => 'vui lòng không bỏ trống content và ghi đúng kiểu dữ liệu',
        'image.required' => 'vui lòng không bỏ trống image',
       ];
    }
}
