<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/** Registro e inicio de sesión de clientes para la app móvil (tokens Sanctum). */
class AuthApiController extends Controller
{
    public function registro(Request $request)
    {
        $data = $request->validate([
            'nombre'   => ['required', 'string', 'max:120'],
            'email'    => ['required', 'email', 'max:190', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name'     => $data['nombre'],
            'email'    => $data['email'],
            'password' => $data['password'],
            'role'     => 'customer',
        ]);

        return response()->json([
            'token'   => $user->createToken('app-movil')->plainTextToken,
            'usuario' => $this->usuarioJson($user),
        ], 201);
    }

    public function entrar(Request $request)
    {
        $data = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();
        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Correo o contraseña incorrectos.'], 422);
        }

        return response()->json([
            'token'   => $user->createToken('app-movil')->plainTextToken,
            'usuario' => $this->usuarioJson($user),
        ]);
    }

    public function salir(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['ok' => true]);
    }

    public function perfil(Request $request)
    {
        return response()->json(['usuario' => $this->usuarioJson($request->user())]);
    }

    private function usuarioJson(User $user): array
    {
        return [
            'id'     => $user->id,
            'nombre' => $user->name,
            'email'  => $user->email,
        ];
    }
}
