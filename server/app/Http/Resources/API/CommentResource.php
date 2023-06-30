<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'id' => $this->id,
            'user_id' => $this->user_id,
            'parent_id' => $this->parent_id,
            'blog_id' => $this->blog_id,
            'content' => $this->content,
        ];
    }
}
