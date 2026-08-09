<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Gestión de suscripciones: tipos de plan (con su límite de descargas
 * mensuales) y asignación manual de suscriptores.
 */
class SubscriptionAdminController extends Controller
{
    public function index()
    {
        $suscriptores = User::with('orders')
            ->whereNotNull('plan_id')
            ->where(function ($q) {
                $q->whereNull('plan_expires_at')->orWhere('plan_expires_at', '>', now());
            })
            ->orderBy('plan_expires_at')
            ->get()
            ->map(function (User $user) {
                $user->plan_actual = $user->currentPlan();
                $user->usadas = $user->downloadsThisMonth();

                return $user;
            });

        return view('admin.subscriptions.index', [
            'plans'        => Plan::withCount('users')->orderBy('price')->get(),
            'suscriptores' => $suscriptores,
        ]);
    }

    /* --- Tipos de suscripción --- */

    public function storePlan(Request $request)
    {
        $data = $this->validatedPlan($request);

        $base = Str::slug($data['name']);
        $slug = $base !== '' ? $base : 'plan';
        $n = 1;
        while (Plan::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$n);
        }

        Plan::create($data + ['slug' => $slug]);

        return back()->with('status', 'Tipo de suscripción creado.');
    }

    public function updatePlan(Request $request, Plan $plan)
    {
        $plan->update($this->validatedPlan($request));

        return back()->with('status', 'Suscripción actualizada.');
    }

    public function togglePlan(Plan $plan)
    {
        $plan->update(['active' => ! $plan->active]);

        return back()->with('status', $plan->active ? 'Suscripción activada.' : 'Suscripción desactivada.');
    }

    /* --- Suscriptores (asignación manual) --- */

    public function assign(Request $request)
    {
        $data = $request->validate([
            'email'   => ['required', 'email', 'exists:users,email'],
            'plan_id' => ['required', 'exists:plans,id'],
            'meses'   => ['required', 'integer', 'min:1', 'max:24'],
        ], [
            'email.exists' => 'No existe un usuario con ese correo. Pídele que se registre primero.',
        ]);

        $user = User::where('email', $data['email'])->first();

        // Si ya tiene plan vigente, los meses se suman a su vencimiento.
        $base = ($user->plan_id == $data['plan_id'] && $user->plan_expires_at?->isFuture())
            ? $user->plan_expires_at
            : now();

        $user->update([
            'plan_id'         => $data['plan_id'],
            'plan_expires_at' => $base->copy()->addMonths((int) $data['meses']),
        ]);

        return back()->with('status', "Suscripción asignada a {$user->email} hasta {$user->plan_expires_at->format('d-m-Y')}.");
    }

    public function revoke(User $user)
    {
        $user->update(['plan_id' => null, 'plan_expires_at' => null]);

        return back()->with('status', "Suscripción de {$user->email} cancelada.");
    }

    private function validatedPlan(Request $request): array
    {
        $data = $request->validate([
            'name'                => ['required', 'string', 'max:100'],
            'price'               => ['required', 'numeric', 'min:0'],
            'downloads_per_month' => ['required', 'integer', 'min:1', 'max:100000'],
        ]);
        if ($request->has('active')) {
            $data['active'] = $request->boolean('active');
        }

        return $data;
    }
}
