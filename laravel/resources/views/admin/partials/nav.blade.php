<div class="controles" style="padding-top:24px;">
    <a class="{{ request()->routeIs('admin.reports*') ? 'btn' : 'btn-sec' }}" href="{{ route('admin.reports') }}">Reportes</a>
    <a class="{{ request()->routeIs('admin.tracks*') ? 'btn' : 'btn-sec' }}" href="{{ route('admin.tracks') }}">Música</a>
    <a class="{{ request()->routeIs('admin.djs*') ? 'btn' : 'btn-sec' }}" href="{{ route('admin.djs') }}">DJs</a>
</div>
