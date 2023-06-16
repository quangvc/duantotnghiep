<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
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
            'name' =>$this->name,
            'price_per_night'=>$this->price_per_night,
            'capacity'=>$this->capacity,
            'description'=>$this->description,
        ];

        // return parent::toArray($request);
    }
}
