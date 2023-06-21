<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'gender' => $this->gender == 0 ? 'Nam' : 'Nữ',
            'phone_number' => $this->phone_number,
            'avatar' => $this->avatar,
            'active' => $this->active == 1 ? 'Active' : 'Disabled',
            'hotel_id' => $this->hotel_id,
            'roles' => $this->roles,
        ];
    }
    // parent::toArray($request)
}
