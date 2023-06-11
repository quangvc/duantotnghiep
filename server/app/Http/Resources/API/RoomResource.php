<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'hotel' => [
                'idHotel' => $this->hotel->id,
                'name' => $this->hotel->hotel_name
            ],
            'room_number' => $this->room_number,
            'room_type' => [
                'id' => $this->room_type->id,
                'name' => $this->room_type->name,
                'price' => $this->room_type->price,
                'capacity' => $this->room_type->capacity,
                'description' => $this->room_type->description,

            ],
            'status' => $this->status,
        ];
    }
}
