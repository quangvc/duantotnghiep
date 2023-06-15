<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponsResource extends JsonResource
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
            'hotel_id' => [
                'idHotel' => $this->hotel->id,
                'name' => $this->hotel->hotel_name
            ],
        ];
    }
}
