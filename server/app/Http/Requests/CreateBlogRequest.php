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
            'title'     => 'required|string',
            'content'   => 'required|string', 
        ];
    }
    public function messages()
    {
       return [
        'title.required'   => 'vui lòng không bỏ trống title và ghi đúng kiểu dữ liệu',
        'content.required' => 'vui lòng không bỏ trống content và ghi đúng kiểu dữ liệu',
       ];
    }
}
