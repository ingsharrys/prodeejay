<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    /**
     * Entrega un track: por compra individual o por suscripción con
     * cupo mensual disponible.
     */
    public function download(Request $request, Track $track)
    {
        $user = $request->user();

        if (! $track->file_url) {
            abort(404, __('messages.file_not_available'));
        }

        $porCompra = $user->hasPurchased($track);
        $plan      = $user->currentPlan();

        if (! $porCompra) {
            if (! $plan) {
                return redirect()->route('plans')
                    ->withErrors(['download' => __('messages.need_subscription')]);
            }
            if ($user->downloadsRemaining() <= 0) {
                return back()->withErrors(['download' => __('messages.limit_reached', [
                    'limit' => $plan->downloads_per_month,
                ])]);
            }
        }

        // Las compras individuales no consumen el cupo del plan.
        if (! $porCompra) {
            $user->downloads()->create(['track_id' => $track->id]);
        }

        return redirect()->away($track->file_url);
    }
}
