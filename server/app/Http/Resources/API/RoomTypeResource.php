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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price_per_night' => $this->price_per_night,
            'capacity' => $this->capacity,
            'description' => $this->description,
            'quantity_room' => count($this->rooms),
            'room' => $this->rooms,
            'hotel' => [
                'id' => $this->hotel->id,
                'name' => $this->hotel->hotel_name,
                'region' => $this->hotel->region->name,
                'hotel_phone' => $this->hotel->hotel_phone,
                'hotel_address' => $this->hotel->hotel_address,
            ],

        ];

        // return parent::toArray($request);
    }
}
