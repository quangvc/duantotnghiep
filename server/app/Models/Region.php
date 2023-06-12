<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    use HasFactory;
    protected $table = 'tbl_regions';

    protected $fillable = [
        'name'
    ];

    public function hotels(): HasMany
    {
        return $this->hasMany(Hotel::class);
    }
}
