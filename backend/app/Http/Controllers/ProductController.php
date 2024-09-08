<?php

namespace App\Http\Controllers;

use App\Helpers\Logger;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(
            Product::all()
        );
    }

    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();

        try {
            if($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('images/products', $fileName, 'public');
            }

            $productFormated = array_merge($request->except('image'), ['image_url' => $imagePath]);

            $product = Product::create($productFormated);
            DB::commit();

            return response()->json($product, 201);
        } catch (\Exception $th) {
            DB::rollBack();

            $error = 'Failed to create product.';
            Logger::log($th, $error);


            return response()->json(["error" => $th], 500);
        }
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $productOldImageUrl = $product->image_url;

        DB::beginTransaction();

        try {
            if($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('images/products', $fileName, 'public');
            }

            $productFormated = array_merge($request->except('image'), ['image_url' => $imagePath]);
            $product->update($productFormated);


            if($productOldImageUrl){
                if (Storage::exists("public/{$productOldImageUrl}")) {
                    Storage::delete("public/{$productOldImageUrl}");
                }
            }

            DB::commit();

            return response()->json($product);
        } catch (\Exception $th) {
            DB::rollBack();

            $error = 'Failed to update product.';
            Logger::log($th, $error);


            return response()->json(["error" => $th], 500);
        }
    }

    public function destroy(Product $product)
    {
        $productOldImageUrl = $product->image_url;

        DB::beginTransaction();

        try {
            $product->delete();
            DB::commit();

            if (Storage::exists("public/{$productOldImageUrl}")) {
                Storage::delete("public/{$productOldImageUrl}");
            }

            return response()->json(null, 204);

        } catch (\Exception $th) {
            DB::rollBack();

            $error = 'Failed to delete product.';
            Logger::log($th, $error);


            return response()->json(["error" => $th], 500);
        }
    }
}
