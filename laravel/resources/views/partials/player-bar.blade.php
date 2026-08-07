{{-- Estilos críticos del reproductor incrustados: llegan con git pull,
     sin depender de copiar css/app.css al docroot. --}}
<style>
.tplay{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#232323;border:none;color:#fff;cursor:pointer;font-size:11px;padding:0;transition:background .15s,transform .15s,color .15s}
.tplay:hover{background:#1db954;color:#000;transform:scale(1.12)}
.tfila:hover .tplay{background:#1db954;color:#000}
.tfila.sonando .tplay{background:rgba(29,185,84,.15)}
.eq{display:inline-flex;align-items:flex-end;gap:2px;height:14px}
.eq span{width:3px;background:#1db954;border-radius:1px;animation:pdj-eq 1.1s ease-in-out infinite}
.eq span:nth-child(1){animation-delay:0s}
.eq span:nth-child(2){animation-delay:.25s}
.eq span:nth-child(3){animation-delay:.5s}
.eq span:nth-child(4){animation-delay:.15s}
@keyframes pdj-eq{0%,100%{height:4px}50%{height:14px}}
.tfila.sonando .icono-pausa{display:none}
.tfila.sonando:hover .eq{display:none}
.tfila.sonando:hover .icono-pausa{display:inline}
.eq-barra{margin-left:8px;height:11px}
.eq-barra span{width:2px}
.vmodal{position:fixed;inset:0;background:rgba(0,0,0,.88);display:none;align-items:center;justify-content:center;z-index:10001;padding:20px}
.vmodal.abierto{display:flex}
.vmodal-caja{background:#181818;border:1px solid #282828;border-radius:14px;max-width:880px;width:100%;padding:18px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.vmodal-caja h3{color:#fff;font-size:15px;font-weight:700;margin:0 44px 12px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vmodal-caja video{width:100%;max-height:70vh;border-radius:10px;background:#000;display:block}
.vmodal-cerrar{position:absolute;top:12px;right:14px;background:#242424;border:none;color:#b3b3b3;font-size:15px;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.vmodal-cerrar:hover{background:#1db954;color:#000}
</style>

<div class="barra">
    <div>
        <div class="bt" id="pbTitulo">{{ __('messages.choose_song') }}<span class="eq eq-barra" id="pbEq" style="display:none;"><span></span><span></span><span></span><span></span></span></div>
        <div class="ba" id="pbArtista"></div>
    </div>
    <div class="bcentro">
        <button id="pbPlay" class="bplay" aria-label="Play/Pause"><i class="fas fa-play"></i></button>
        <div class="bprog">
            <span id="pbTiempo">0:00</span>
            <input type="range" id="pbSeek" value="0" max="100" aria-label="Progreso">
            <span id="pbDur">0:00</span>
        </div>
    </div>
    <div class="bvol">
        <i class="fas fa-volume-high"></i>
        <input type="range" id="pbVol" min="0" max="100" value="90" aria-label="Volumen">
    </div>
</div>
<audio id="pbAudio" preload="none"></audio>

<!-- Modal para previews de video -->
<div class="vmodal" id="vModal">
    <div class="vmodal-caja">
        <button type="button" class="vmodal-cerrar" onclick="cerrarVideo()" aria-label="Cerrar"><i class="fas fa-xmark"></i></button>
        <h3 id="vTitulo"></h3>
        <video id="vPlayer" controls playsinline></video>
    </div>
</div>

<script>
(function () {
    var audio = document.getElementById('pbAudio');
    var btn = document.getElementById('pbPlay');
    var seek = document.getElementById('pbSeek');
    var vol = document.getElementById('pbVol');
    var t = document.getElementById('pbTiempo');
    var d = document.getElementById('pbDur');
    var lt = document.getElementById('pbTitulo');
    var la = document.getElementById('pbArtista');
    var fila = null;

    function fmt(s) {
        if (!isFinite(s)) return '0:00';
        var m = Math.floor(s / 60), r = Math.floor(s % 60);
        return m + ':' + (r < 10 ? '0' : '') + r;
    }
    var eqBarra = document.getElementById('pbEq');
    var htmlEq = '<span class="eq"><span></span><span></span><span></span><span></span></span><i class="fas fa-pause icono-pausa"></i>';

    function icons(playing) {
        btn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        if (eqBarra) eqBarra.style.display = playing ? 'inline-flex' : 'none';
        if (fila) {
            var holder = fila.querySelector('.tplay');
            if (holder) holder.innerHTML = playing ? htmlEq : '<i class="fas fa-play"></i>';
        }
    }

    window.playTrack = function (track) {
        var f = document.getElementById('fila-' + track.id);
        if (audio.src === track.url && !audio.paused) { audio.pause(); return; }
        if (audio.src !== track.url) {
            if (fila) {
                fila.classList.remove('sonando');
                var prev = fila.querySelector('.tplay');
                if (prev) prev.innerHTML = '<i class="fas fa-play"></i>';
            }
            audio.src = track.url;
            lt.textContent = track.titulo;
            la.textContent = track.artista || '';
            fila = f;
            if (fila) fila.classList.add('sonando');
        }
        audio.play();
    };

    // Previews de video: modal centrado (pausa el audio si estaba sonando).
    var vModal = document.getElementById('vModal');
    var vPlayer = document.getElementById('vPlayer');

    window.playVideo = function (track) {
        audio.pause();
        document.getElementById('vTitulo').textContent = track.titulo + (track.artista ? ' — ' + track.artista : '');
        vPlayer.src = track.url;
        vModal.classList.add('abierto');
        vPlayer.play();
    };
    window.cerrarVideo = function () {
        vPlayer.pause();
        vModal.classList.remove('abierto');
    };
    vModal.addEventListener('click', function (e) { if (e.target === vModal) cerrarVideo(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarVideo(); });

    btn.addEventListener('click', function () {
        if (!audio.src) return;
        audio.paused ? audio.play() : audio.pause();
    });
    audio.addEventListener('play', function () { icons(true); });
    audio.addEventListener('pause', function () { icons(false); });
    audio.addEventListener('ended', function () { icons(false); seek.value = 0; });
    audio.addEventListener('timeupdate', function () {
        if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
        t.textContent = fmt(audio.currentTime);
        d.textContent = fmt(audio.duration);
    });
    seek.addEventListener('input', function () {
        if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
    });
    vol.addEventListener('input', function () { audio.volume = vol.value / 100; });
    audio.volume = 0.9;
})();
</script>
