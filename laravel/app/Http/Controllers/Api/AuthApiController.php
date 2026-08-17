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

    /**
     * Inicio de sesión con Google: la app envía el id_token que le da
     * Google, aquí se valida contra Google y se crea (o encuentra) la
     * cuenta del cliente por su correo.
     */
    public function entrarGoogle(Request $request)
    {
        $data = $request->validate(['id_token' => ['required', 'string']]);

        $idsValidos = array_values(array_filter([
            config('services.google.web_client_id'),
            config('services.google.ios_client_id'),
            config('services.google.android_client_id'),
        ]));
        if (empty($idsValidos)) {
            return response()->json(['message' => 'El inicio con Google no está configurado todavía.'], 422);
        }

        try {
            $respuesta = \Illuminate\Support\Facades\Http::get('https://oauth2.googleapis.com/tokeninfo', [
                'id_token' => $data['id_token'],
            ]);
        } catch (\Throwable $e) {
            report($e);
            $respuesta = null;
        }

        if (! $respuesta || ! $respuesta->successful()) {
            return response()->json(['message' => 'No pudimos validar tu cuenta de Google. Intenta de nuevo.'], 422);
        }

        $info = $respuesta->json();
        $verificado = ($info['email_verified'] ?? null) === 'true' || ($info['email_verified'] ?? null) === true;
        if (! in_array($info['aud'] ?? '', $idsValidos, true) || ! $verificado || empty($info['email'])) {
            return response()->json(['message' => 'La cuenta de Google no es válida para esta aplicación.'], 422);
        }

        $user = User::where('email', $info['email'])->first();
        if (! $user) {
            $user = User::create([
                'name'     => $info['name'] ?? explode('@', $info['email'])[0],
                'email'    => $info['email'],
                'password' => \Illuminate\Support\Str::random(40),
                'role'     => 'customer',
            ]);
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
