<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
     // GET all products
    public function index()
    {
        // return response()->json(Product::latest()->get());
        return response()->json(Product::with('category')->latest()->get());
    }

    // STORE product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            // 'category_id' => 'required|exists:categories,id',
            // 'status' => 'required|in:active,low_stock,out_of_stock',
        ]);

        // $product = Product::create([
        //     'name' => $request->name,
        //     'price' => $request->price,
        //     'category_id' => $request->category_id,
        //     'stock_qty' => $request->stock_qty,
        //     'status' => $request->status,
        // ]);

        $product = Product::create($request->all());

        return response()->json($product);
    }

    // UPDATE product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            // 'status' => 'required|in:active,low_stock,out_of_stock',
        ]);

        // $product->update([
        //     'name' => $request->name,
        //     'price' => $request->price,
        //     'category_id' => $request->category_id,
        //     'stock_qty' => $request->stock_qty,
        //     'status' => $request->status,
        // ]);

        $product->update($request->all());

        return response()->json($product);
    }

    // DELETE product
    public function destroy($id)
    {
        Product::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }

}
