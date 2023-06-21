<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'booking_number' => $this->booking_number,
            'booking_date' => $this->booking_date,
            'checkin_date' => $this->checkin_date,
            'checkout_date' => $this->checkout_date,
            'people_quantity' => $this->people_quantity,
            'coupon_id' => $this->coupon_id,
            'user_id' => $this->user_id,
            'guest_name' => $this->guest_name,
            'guest_email' => $this->guest_email,
            'guest_phone' => $this->guest_phone,
            'note' => $this->note,
            'status' => $this->status,
        ];
    }
}
