<?php

namespace App\Http\Resources\API;

use Carbon\Carbon;
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
            // 'hotel_name' => $this->booking_details[0]->room_type->hotel->hotel_name,
            'booking_number' => $this->booking_number,
            'booking_date' =>  $this->created_at,
            'checkin_date' =>  date('d-m-Y', strtotime($this->checkin_date)),
            'checkout_date' =>  date('d-m-Y', strtotime($this->checkout_date)),
            'people_quantity' => $this->people_quantity,
            'coupon' => $this->coupon_id ? CouponResource::collection($this->coupon_id) : 'Không áp dụng',
            'guest_name' => $this->guest_name,
            'guest_email' => $this->guest_email,
            'guest_phone' => $this->guest_phone, // substr($this->guest_phone, 0, 2).str_repeat('x', strlen(substr($this->guest_phone, 2, -3))).substr($this->guest_phone, -3, 3),
            'note' => $this->note,
            'status' => $this->status,
            'total_price' => $this->total_price,
            'booking_details' => $this->booking_details

        ];
    }
}
