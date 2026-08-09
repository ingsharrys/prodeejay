{{-- Bloque: planes de suscripción (datos en vivo) --}}
@php
    use App\Models\Page;
    $planesBloque = \App\Models\Plan::where('active', true)->orderBy('price')->get();
@endphp
@if ($planesBloque->isNotEmpty())
    <div class="container">
        <section class="bloque">
            @if (Page::campo($b, 'titulo') !== '')
                <h2>{{ Page::campo($b, 'titulo') }}</h2>
            @endif
            <div class="planes">
                @foreach ($planesBloque as $i => $plan)
                    <div class="plan {{ $i > 0 ? 'destacado' : '' }}">
                        <h3>{{ $plan->name }}</h3>
                        @if ((float) $plan->price > 0)
                            <p class="det">${{ number_format((float) $plan->price, 2) }} / {{ __('messages.month') }}</p>
                        @endif
                        <div class="num">{{ number_format($plan->downloads_per_month) }}</div>
                        <p class="det">{{ __('messages.downloads_month') }}</p>
                        @auth
                            <a class="btn" href="{{ route('subscribe', $plan) }}">{{ __('messages.subscribe') }}</a>
                        @else
                            <a class="btn" href="{{ route('register') }}">{{ __('messages.register') }}</a>
                        @endauth
                    </div>
                @endforeach
            </div>
        </section>
    </div>
@endif
