<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
            'id'=>$this->id,
            'name' => $this->name,
            'type' => $this->type,
            'value' => $this->value,
            'min' => $this->min,
            'max' => $this->max,
            'hotel'=> [
                'id'=>$this->hotel->id,
                'name'=>$this->hotel->hotel_name,
            ],
            'hotel_id' => $this->hotel->id,
            'quantity'=>$this->quantity,
            'start_date'=>$this->start_date,
            'end_date'=>$this->end_date,

        ];
    }
}
