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
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<script>
function rpPreset(desde, hasta) {
    document.querySelector('input[name=desde]').value = desde;
    document.querySelector('input[name=hasta]').value = hasta;
    document.getElementById('rpForm').submit();
}
window.rpChartDefaults = function () {
    if (!window.Chart) return;
    Chart.defaults.color = '#8a8a8a';
    Chart.defaults.borderColor = 'rgba(255,255,255,.06)';
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
};
</script>
