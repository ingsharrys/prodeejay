<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dj;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DjAdminController extends Controller
{
    public function index()
    {
        return view('admin.djs.index', [
            'djs' => Dj::withCount('tracks')->orderBy('name')->get(),
        ]);
    }

    /**
     * Habilita o deshabilita un DJ (deja de mostrarse en el sitio).
     */
    public function toggle(Dj $dj)
    {
        $dj->update(['active' => ! $dj->active]);

        return back()->with('status', $dj->active ? 'DJ habilitado.' : 'DJ deshabilitado.');
    }

    /**
     * Crea o restablece el acceso del DJ a su panel (rol dj).
     */
    public function acceso(Request $request, Dj $dj)
    {
        $data = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $existente = User::where('email', $data['email'])->first();
        if ($existente && $existente->dj_id !== null && $existente->dj_id !== $dj->id) {
            return back()->withErrors(['email' => 'Ese correo ya pertenece al acceso de otro DJ.']);
        }

        User::updateOrCreate(
            ['email' => $data['email']],
            [
                'name'     => $dj->name,
                'password' => $data['password'],
                'role'     => 'dj',
                'dj_id'    => $dj->id,
            ]
        );

        return back()->with('status', 'Acceso del DJ listo. Entrega el correo y la contraseña al DJ; entrará por la página normal de "Entrar".');
    }

    public function create()
    {
        return view('admin.djs.form', ['dj' => new Dj()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->slugUnico($data['name']);
        Dj::create($data);

        return redirect()->route('admin.djs')->with('status', 'DJ creado.');
    }

    public function edit(Dj $dj)
    {
        return view('admin.djs.form', compact('dj'));
    }

    public function update(Request $request, Dj $dj)
    {
        $dj->update($this->validated($request));

        return redirect()->route('admin.djs')->with('status', 'DJ actualizado.');
    }

    /**
     * Historial del DJ: su música y sus ventas mes a mes.
     */
    public function show(Dj $dj)
    {
        $tracks = $dj->tracks()->latest('released_at')->paginate(30);

        // Ventas por mes de este DJ (últimos 12 meses).
        $driver = config('database.default') === 'sqlite'
            ? "strftime('%Y-%m', orders.paid_at)"
            : "date_format(orders.paid_at, '%Y-%m')";

        $ventasMes = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->where('tracks.dj_id', $dj->id)
            ->where('orders.status', 'paid')
            ->where('orders.paid_at', '>=', now()->subMonths(11)->startOfMonth())
            ->selectRaw("$driver as periodo, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos")
            ->groupBy('periodo')->orderBy('periodo')->get();

        // Top de tracks vendidos de este DJ (histórico).
        $topTracks = OrderItem::query()
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('tracks', 'tracks.id', '=', 'order_items.track_id')
            ->where('tracks.dj_id', $dj->id)
            ->where('orders.status', 'paid')
            ->selectRaw('tracks.title as titulo, sum(order_items.quantity) as unidades, sum(order_items.price * order_items.quantity) as ingresos')
            ->groupBy('tracks.title')
            ->orderByDesc('ingresos')
            ->take(15)->get();

        $usuarioDj = User::where('dj_id', $dj->id)->first();

        return view('admin.djs.show', compact('dj', 'tracks', 'ventasMes', 'topTracks', 'usuarioDj'));
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'bio'       => ['nullable', 'string', 'max:5000'],
            'image_url' => ['nullable', 'url', 'max:2000'],
            'foto'      => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:8192'], // 8 MB
        ]);

        // Si se subió una foto, su URL reemplaza al campo de texto.
        if ($request->hasFile('foto')) {
            $archivo = $request->file('foto');
            $nombre  = Str::slug($data['name']) . '-' . time() . '.' . strtolower($archivo->getClientOriginalExtension());
            $ruta    = $archivo->storeAs('djs', $nombre, 'media');
            $data['image_url'] = rtrim(config('filesystems.disks.media.url'), '/') . '/' . $ruta;
        }
        unset($data['foto']);

        return $data;
    }

    private function slugUnico(string $nombre): string
    {
        $base = Str::slug($nombre);
        $slug = $base !== '' ? $base : 'dj';
        $n = 1;
        while (Dj::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$n);
        }

        return $slug;
    }
}
