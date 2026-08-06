<div class="barra">
    <div>
        <div class="bt" id="pbTitulo">{{ __('messages.choose_song') }}</div>
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
    function icons(playing) {
        btn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        if (fila) {
            var i = fila.querySelector('.tplay i');
            if (i) i.className = playing ? 'fas fa-pause' : 'fas fa-play';
        }
    }

    window.playTrack = function (track) {
        var f = document.getElementById('fila-' + track.id);
        if (audio.src === track.url && !audio.paused) { audio.pause(); return; }
        if (audio.src !== track.url) {
            if (fila) {
                fila.classList.remove('sonando');
                var prev = fila.querySelector('.tplay i');
                if (prev) prev.className = 'fas fa-play';
            }
            audio.src = track.url;
            lt.textContent = track.titulo;
            la.textContent = track.artista || '';
            fila = f;
            if (fila) fila.classList.add('sonando');
        }
        audio.play();
    };

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
