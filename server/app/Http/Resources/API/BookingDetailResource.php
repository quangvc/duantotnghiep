<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingDetailResource extends JsonResource
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
            // 'room' => RoomResource::collection($this->room)
            'room' => [
                'id' => $this->room->id,
                'room_number' => $this->room->room_number,
                'status' => $this->room->status,
                'room_type' => [
                    'id' => $this->room->room_type->id,
                    'name' => $this->room->room_type->name,
                    'price_per_night' => $this->room->room_type->price_per_night,
                    'capacity' => $this->room->room_type->capacity,
                ],
                'hotel' => [
                    'id' => $this->room->hotel->id,
                    'hotel_name' => $this->room->hotel->hotel_name,
                    'hotel_phone' => $this->room->hotel->hotel_phone,
                    'star_rating' => $this->room->hotel->star_rating,
                ],
            ],



        ];
    }
}