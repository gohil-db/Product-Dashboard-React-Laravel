<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
     // GET all products
    public function index()
    {
        // return response()->json(Product::latest()->get());
        return response()->json(Category::latest()->get());
    }

}
