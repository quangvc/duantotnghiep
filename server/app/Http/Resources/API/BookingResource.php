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
        $checkin_date = Carbon::parse($this->checkin_date);
        $checkout_date = Carbon::parse($this->checkout_date);
        $date_diff = $checkin_date->diffInDays($checkout_date);
        return [
            'id' => $this->id,
            'booking_number' => $this->booking_number,
            'booking_date' =>  date('d-m-Y H:i:s.u', strtotime($this->booking_date)),
            'checkin_date' =>  date('d-m-Y', strtotime($this->checkin_date)),
            'checkout_date' =>  date('d-m-Y', strtotime($this->checkout_date)),
            'people_quantity' => $this->people_quantity,
            'date_diff' => $date_diff,
            'coupon_id' => $this->coupon_id,
            'user_id' => $this->user_id,
            'guest_name' => $this->guest_name,
            'guest_email' => $this->guest_email,
            'guest_phone' => $this->guest_phone,
            'note' => $this->note,
            'status' => $this->status,
            'booking_detail' => BookingDetailResource::collection($this->booking_details),
        ];
    }
}
