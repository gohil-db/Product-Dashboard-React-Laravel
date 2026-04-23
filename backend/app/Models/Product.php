<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price','category_id','stock_qty','status'];

    public function category()
    {
        // return $this->belongsTo(Category::class);
        return $this->belongsTo(\App\Models\Category::class);
    }

    
    
}

