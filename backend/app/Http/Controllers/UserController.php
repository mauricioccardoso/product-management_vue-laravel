<?php

namespace App\Http\Controllers;

use App\Helpers\Logger;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request->except(['password_confirmationa']));
            DB::commit();

            return response()->json([
                'user' => $user
            ], 201);

        } catch (\Throwable $th) {
            DB::rollBack();

            $error = 'Unable to create a new user.';
            Logger::log($th, $error);

            return response()->json(["error" => $th], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        DB::beginTransaction();
        try {
            $role = Role::where('name', '=', $request->input('role'))->firstOrFail();

            $user->update([
                'role_id' => $role->id
            ]);
            DB::commit();

            return response()->json([
                'user' => $user
            ]);

        } catch (\Throwable $th) {
            DB::rollBack();

            $error = 'Unable to updade user role.';
            Logger::log($th, $error);

            return response()->json(["error" => $th], 500);
        }



    }
}
