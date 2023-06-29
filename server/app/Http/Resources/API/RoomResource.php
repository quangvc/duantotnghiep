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
            'room_number' => $this->room_number,
            'status' => $this->status,
            'hotel' => [
                'idHotel' => $this->hotel->id,
                'name' => $this->hotel->hotel_name
            ],
            'room_type' => $this->room_type

        ];
    }
}
