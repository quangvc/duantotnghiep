<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends Model
{
    use HasFactory;
    protected $table = 'tbl_blogs';

    protected $fillable = [
        'title', 'content', 'user_id', 'slug'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
