<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;
    protected $table = 'tbl_blogs';

    protected $fillable = [
        'title', 'slug','content', 'user_id', 'image', 'active'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }


    // public function setSlugAttribute($value)
    // {
    //     $this->attributes['slug'] = Str::slug($value);
    // }

    // public function save(array $options = [])
    // {
    //     if (!$this->slug) {
    //         $this->attributes['slug'] = Str::slug($this->title);
    //     }
    //     parent::save($options);
    // }
}
