<?php

namespace App\Http\Controllers;

use App\Helpers\Logger;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(
            User::with('role')->withoutAdmin()->paginate(15)
        );
    }

    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request->except(['password_confirmationa']));
            DB::commit();

            return new UserResource($user);

        } catch (\Throwable $th) {
            DB::rollBack();

            $error = 'Unable to create a new user.';
            Logger::log($th, $error);

            return response()->json(["error" => $th], 500);
        }
    }

    public function update(UpdateUserRequest $request, int $user)
    {
        $user = User::findOrFail($user);

        DB::beginTransaction();
        try {
            $role = Role::where('name', '=', $request->input('role'))->firstOrFail();

            $user->update([
                'role_id' => $role->id
            ]);
            DB::commit();

            return new UserResource($user);

        } catch (\Throwable $th) {
            DB::rollBack();

            $error = 'Unable to updade user role.';
            Logger::log($th, $error);

            return response()->json(["error" => $th], 500);
        }
    }
}
