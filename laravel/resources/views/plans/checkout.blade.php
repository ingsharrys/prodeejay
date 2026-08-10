@extends('layouts.app')

@section('title', __('messages.sub_checkout', ['plan' => $plan->name]) . ' — Prodeejay Remix')

@section('content')
<div class="container">
    <div class="phead">
        <p class="tipo">{{ __('messages.membership_plans') }}</p>
        <h1>{{ __('messages.sub_checkout', ['plan' => $plan->name]) }}</h1>
    </div>

    <form method="POST" action="{{ route('subscribe.store', $plan) }}" id="suForm">
        @csrf
        <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:26px;margin:26px 0;align-items:start;" class="co-grid">

            {{-- Datos de facturación y periodo --}}
            <div class="form" style="margin:0;max-width:none;">
                <h2 style="font-size:17px;margin:0 0 12px;color:#fff;"><i class="fas fa-calendar-days" style="color:#1db954;"></i> {{ __('messages.sub_period') }}</h2>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;" class="su-meses">
                    @foreach ($meses as $n)
                        <label style="display:flex;flex-direction:column;align-items:center;gap:4px;background:#242424;border:1px solid #333;border-radius:10px;padding:12px 6px;cursor:pointer;text-align:center;">
                            <input type="radio" name="meses" value="{{ $n }}" data-meses="{{ $n }}" style="width:auto;" @checked((int) old('meses', 1) === $n)>
                            <strong style="color:#fff;">{{ $n }} {{ $n === 1 ? __('messages.month_one') : __('messages.months') }}</strong>
                            <span style="color:#1db954;font-size:13px;font-weight:700;">${{ number_format((float) $plan->price * $n, 2) }}</span>
                        </label>
                    @endforeach
                </div>

                <h2 style="font-size:17px;margin:0 0 12px;color:#fff;"><i class="fas fa-user" style="color:#1db954;"></i> {{ __('messages.billing_details') }}</h2>

                <label>{{ __('messages.full_name') }} *</label>
                <input type="text" name="nombre" value="{{ old('nombre', $user->name) }}" required>

                <label>{{ __('messages.email') }} *</label>
                <input type="email" name="email" value="{{ old('email', $user->email) }}" required>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                    <div>
                        <label>{{ __('messages.phone') }}</label>
                        <input type="text" name="telefono" value="{{ old('telefono') }}">
                    </div>
                    <div>
                        <label>{{ __('messages.country') }}</label>
                        <input type="text" name="pais" value="{{ old('pais') }}">
                    </div>
                </div>

                <h2 style="font-size:17px;margin:24px 0 4px;color:#fff;"><i class="fas fa-wallet" style="color:#1db954;"></i> {{ __('messages.payment_method') }}</h2>
                <p style="color:#8a8a8a;font-size:12px;margin:0 0 10px;">{{ __('messages.tax_by_method') }}</p>

                @foreach ($metodos as $clave => $metodo)
                    <label style="display:flex;align-items:center;gap:12px;background:#242424;border:1px solid #333;border-radius:10px;padding:14px 16px;margin-bottom:10px;cursor:pointer;">
                        <input type="radio" name="metodo" value="{{ $clave }}" data-tax="{{ $metodo['tax'] }}" style="width:auto;" @checked(old('metodo', array_key_first($metodos)) === $clave)>
                        <i class="{{ $metodo['icono'] }}" style="color:#1db954;font-size:18px;"></i>
                        <span style="font-weight:700;">{{ $metodo['titulo'] }}</span>
                        <span style="margin-left:auto;color:#8a8a8a;font-size:12px;">
                            @if ($metodo['tax'] > 0) + {{ rtrim(rtrim(number_format($metodo['tax'], 3), '0'), '.') }}% {{ __('messages.tax') }} @else {{ __('messages.no_tax') }} @endif
                        </span>
                    </label>
                @endforeach
            </div>

            {{-- Resumen de la suscripción --}}
            <div class="form" style="margin:0;max-width:none;position:sticky;top:80px;">
                <h2 style="font-size:17px;margin:0 0 12px;color:#fff;"><i class="fas fa-id-card" style="color:#1db954;"></i> {{ __('messages.sub_summary') }}</h2>

                <div style="background:#242424;border-radius:10px;padding:14px 16px;margin-bottom:12px;">
                    <strong style="color:#1db954;font-size:16px;">{{ $plan->name }}</strong>
                    <div style="color:#b3b3b3;font-size:13px;margin-top:4px;">
                        {{ number_format($plan->downloads_per_month) }} {{ __('messages.downloads_month') }}<br>
                        ${{ number_format((float) $plan->price, 2) }} / {{ __('messages.month') }} · <span id="suMesesTxt">1</span> {{ __('messages.months') }}
                    </div>
                </div>

                <div style="display:flex;justify-content:space-between;padding:8px 0 4px;color:#b3b3b3;font-size:14px;">
                    <span>{{ __('messages.subtotal') }}</span>
                    <span>$<span id="coSubtotal">{{ number_format((float) $plan->price, 2) }}</span></span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:4px 0;color:#b3b3b3;font-size:14px;">
                    <span>{{ __('messages.tax') }} (<span id="coTaxPct">0</span>%)</span>
                    <span>$<span id="coTax">0.00</span></span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid #333;margin-top:6px;font-size:19px;font-weight:800;color:#fff;">
                    <span>{{ __('messages.total') }}</span>
                    <span style="color:#1db954;">$<span id="coTotal">{{ number_format((float) $plan->price, 2) }}</span></span>
                </div>

                <button class="btn" type="submit" style="width:100%;justify-content:center;margin-top:10px;">
                    <i class="fas fa-lock"></i> {{ __('messages.pay_now') }}
                </button>
                <p style="color:#666;font-size:11px;text-align:center;margin:12px 0 0;"><i class="fas fa-shield-halved"></i> {{ __('messages.secure_note') }}</p>
                <p style="color:#8a8a8a;font-size:12px;text-align:center;margin:10px 0 0;">{{ __('messages.sub_note') }}</p>
                <p style="text-align:center;margin:10px 0 0;"><a href="{{ route('plans') }}" style="color:#8a8a8a;font-size:12px;">« {{ __('messages.view_plans') }}</a></p>
            </div>
        </div>
    </form>
</div>

<style>
@media(max-width:800px){.co-grid{grid-template-columns:1fr !important}.su-meses{grid-template-columns:repeat(2,1fr) !important}}
.su-meses label:has(input:checked){border-color:#1db954 !important;box-shadow:0 0 0 1px #1db954}
</style>

<script>
(function () {
    var precio = {{ json_encode(round((float) $plan->price, 2)) }};
    function actualizar() {
        var m = document.querySelector('input[name=meses]:checked');
        var s = document.querySelector('input[name=metodo]:checked');
        var meses = m ? parseInt(m.dataset.meses, 10) : 1;
        var pct = s ? parseFloat(s.dataset.tax || 0) : 0;
        var subtotal = Math.round(precio * meses * 100) / 100;
        var tax = Math.round(subtotal * pct / 100 * 100) / 100;
        document.getElementById('suMesesTxt').textContent = meses;
        document.getElementById('coSubtotal').textContent = subtotal.toFixed(2);
        document.getElementById('coTaxPct').textContent = pct;
        document.getElementById('coTax').textContent = tax.toFixed(2);
        document.getElementById('coTotal').textContent = (subtotal + tax).toFixed(2);
    }
    document.querySelectorAll('input[name=meses], input[name=metodo]').forEach(function (r) { r.addEventListener('change', actualizar); });
    actualizar();
})();
</script>
@endsection
