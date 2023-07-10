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
            'user' => $this->user->name,
            'parent_id' => $this->parent_id,
            'blog' => $this->blog->title,
            'content' => $this->content,
            'created_at' => $this->created_at
        ];
    }
}
