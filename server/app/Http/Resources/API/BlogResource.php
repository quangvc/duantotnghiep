<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
            'id'=>$this->id,
            'title'=>$this->title,
            'content'=>$this->content,
            'image'=>$this->image,
            'user_name'=>$this->user->name,
            'active' =>$this->active,
            'slug'=>$this->slug,
        ];
    }
}
