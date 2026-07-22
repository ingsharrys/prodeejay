# Prodeejay Remix

Sitio WordPress + WooCommerce para venta de remixes, packs y sets de DJ, con
membresías (Paid Memberships Pro) y entrega de archivos (Download Monitor).
El código personalizado vive en el tema hijo `wp-content/themes/prodj`.

## Cambios recientes

1. **Reproductor en el home**: se agregó `front-page.php`, que carga la
   plantilla del reproductor ("Home Guaracha") automáticamente en la portada.
2. **URLs amigables**: la paginación ahora usa `/page/2/` en lugar de
   `?mypage=2` (los enlaces antiguos siguen funcionando).
3. **Suscripciones**: nuevo módulo `inc/suscripciones.php` con límites de
   descarga por plan, **reinicio mensual del contador** e integración con
   Download Monitor. Incluye el shortcode `[pdj_descargas_restantes]` para
   mostrar al socio cuántas descargas le quedan en el mes.

## Pasos de activación (una sola vez, en el panel de WordPress)

1. **Enlaces permanentes**: ir a `Ajustes → Enlaces permanentes`, elegir
   **"Nombre de la entrada"** y guardar. Esto activa las URLs amigables en
   todo el sitio (productos, páginas y la nueva paginación). Guardar esta
   pantalla también "refresca" las reglas de URL — hazlo siempre después de
   desplegar estos cambios.
2. **Portada**: con `front-page.php` la portada ya muestra el reproductor
   automáticamente. Si tenías una página "Home" asignada en
   `Ajustes → Lectura`, puedes dejarla igual.
3. **Límites de descarga**: se configuran en
   `wp-content/themes/prodj/inc/suscripciones.php` (función
   `pdj_limites_descarga`). Los nombres deben coincidir con los planes de
   Paid Memberships Pro (hoy: `Basico` = 100/mes, `Premium` = 200/mes).

## Cómo desplegar cambios en Hostinger

Desde la terminal SSH de Hostinger, dentro de `public_html`:

```bash
git pull origin main
```

Después del pull, entra a `Ajustes → Enlaces permanentes` y guarda (sin
cambiar nada) para refrescar las reglas de URL.

## Recomendaciones pendientes

- La carpeta `music/` es accesible públicamente por URL directa. Para que
  solo los socios descarguen, conviene servir los archivos a través de
  Download Monitor y bloquear el acceso directo con un `.htaccess` dentro
  de `music/`.
- `wp-config.php` y `wp-content/uploads/` están excluidos del repositorio
  a propósito (credenciales y archivos pesados). Haz respaldo de la base de
  datos por separado (Hostinger → Bases de datos → Copias de seguridad).
