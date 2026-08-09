{{-- Estilos y utilidades compartidas del panel de reportes --}}
<style>
.rp-presets{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.rp-preset{background:#242424;border:1px solid #333;color:#b3b3b3;border-radius:50px;padding:7px 16px;font-size:12px;font-weight:600;cursor:pointer}
.rp-preset:hover{border-color:#1db954;color:#1db954}
.rp-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:8px 0 22px}
.rp-kpi{background:linear-gradient(135deg,#181818,#1d1d1d);border:1px solid #262626;border-radius:14px;padding:20px 22px}
.rp-kpi .lbl{color:#8a8a8a;font-size:11px;text-transform:uppercase;letter-spacing:1.2px}
.rp-kpi .num{color:#fff;font-size:28px;font-weight:800;margin:6px 0 4px}
.rp-kpi .delta{font-size:12px;font-weight:700}
.rp-kpi .delta.up{color:#1db954}
.rp-kpi .delta.down{color:#f06262}
.rp-kpi .delta.flat{color:#8a8a8a}
.rp-panel{background:#181818;border:1px solid #262626;border-radius:14px;padding:20px;margin-bottom:22px}
.rp-panel h3{color:#fff;font-size:15px;font-weight:700;margin:0 0 14px}
.rp-2col{display:grid;grid-template-columns:1.2fr 1fr;gap:22px}
@media(max-width:900px){.rp-2col{grid-template-columns:1fr}}
.rp-chart{position:relative;height:280px}
.rp-chart-sm{position:relative;height:240px}
/* Pestañas: sin JavaScript todos los paneles quedan visibles (a prueba
   de fallos); con JavaScript se comportan como pestañas. */
.rp-tabs{display:flex;gap:6px;border-bottom:1px solid #262626;margin:6px 0 22px;flex-wrap:wrap}
.rp-tab{background:none;border:none;border-bottom:3px solid transparent;color:#8a8a8a;font-size:14px;font-weight:700;padding:10px 18px;cursor:pointer}
.rp-tab:hover{color:#fff}
.rp-tab.on{color:#1db954;border-bottom-color:#1db954}
.rp-tab .cnt{background:#242424;color:#b3b3b3;border-radius:50px;padding:2px 9px;font-size:11px;margin-left:6px}
.rp-tab.on .cnt{background:#1db954;color:#000}
.rp-pane{display:block}
body.rp-js .rp-pane{display:none}
body.rp-js .rp-pane.on{display:block}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<script>
function rpPreset(desde, hasta) {
    document.querySelector('input[name=desde]').value = desde;
    document.querySelector('input[name=hasta]').value = hasta;
    document.getElementById('rpForm').submit();
}
function rpTab(nombre, btn) {
    document.querySelectorAll('.rp-pane').forEach(function (p) { p.classList.toggle('on', p.dataset.pane === nombre); });
    document.querySelectorAll('.rp-tab').forEach(function (t) { t.classList.remove('on'); });
    if (btn) { btn.classList.add('on'); }
    try { history.replaceState(null, '', '#' + nombre); } catch (e) {}
    window.dispatchEvent(new Event('resize')); // reajusta las gráficas
}
// Activa el modo pestañas solo si el JS corre; recuerda la pestaña de la URL.
document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('.rp-tabs')) return;
    document.body.classList.add('rp-js');
    var deseada = (location.hash || '').replace('#', '');
    var btn = deseada ? document.querySelector('.rp-tab[data-tab="' + deseada + '"]') : null;
    if (btn) { rpTab(deseada, btn); }
    else {
        var activa = document.querySelector('.rp-tab.on');
        if (activa) { rpTab(activa.dataset.tab, activa); }
    }
});
window.rpChartDefaults = function () {
    if (!window.Chart) return;
    Chart.defaults.color = '#8a8a8a';
    Chart.defaults.borderColor = 'rgba(255,255,255,.06)';
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
};
</script>
