<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\StatusEnum;
use Illuminate\Validation\Rule;

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
            'title'     =>  'required|string',
            'content'   =>  'required|string',
            'image'     =>  'bail|image|max:2048|mimes:jpeg,png,jpg|mimetypes:image/jpeg,image/png,image/jpg',
        ];
    }
    public function messages()
    {
       return [
            'title.required'   => 'Vui lòng không bỏ trống title',
            'content.required' => 'Vui lòng không bỏ trống content',
            'image.*' => 'Lỗi image không đúng định dạng',
       ];
    }
}
