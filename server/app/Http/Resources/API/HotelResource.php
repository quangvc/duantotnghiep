<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\API\RoomResource;

class HotelResource extends JsonResource
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
            'hotel_name' => $this->hotel_name,
            'hotel_phone' => $this->hotel_phone,
            'hotel_address' => $this->hotel_address,
            'region' =>
            [
                'id' => $this->region->id,
                'name' => $this->region->name,
            ],
            'star_rating' => $this->star_rating,
            'images' => $this->images,
            // 'quantity_room' => count(RoomResource::collection($this->rooms)),
            // 'room' => RoomResource::collection($this->rooms),
            'status' => $this->status,
            'description' => $this->description,
        ];
    }
}