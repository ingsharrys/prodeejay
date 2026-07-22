# Prodeejay Remix

Sitio WordPress + WooCommerce para venta de remixes, packs y sets de DJ, con
membresías (Paid Memberships Pro) y entrega de archivos (Download Monitor).
El código personalizado vive en el tema hijo `wp-content/themes/prodj`.

## Estructura del tema

| Archivo | Qué hace |
|---|---|
| `front-page.php` | Landing page SEO de la portada, con botón al reproductor |
| `template-parts/reproductor.php` | Reproductor estilo Spotify (componente compartido) |
| `home-prodj.php` | Página del reproductor / New Releases (plantilla "Home Guaracha") |
| `packs.php`, `sets.php`, `video.php` | Playlists de packs, sets y videos (usan el mismo reproductor) |
| `djs.php` | Página con el listado de todos los DJs (plantilla "DJs") |
| `taxonomy-pa_dj.php` | Página individual de cada DJ en `/dj/nombre-del-dj/` |
| `inc/productos.php` | Helpers para leer DJ, artista, BPM y preview de los productos |
| `inc/suscripciones.php` | Límites de descarga por plan con reinicio mensual |
| `inc/seo.php` | Datos estructurados schema.org (Organization, WebSite, MusicGroup) |

## Funcionalidades

- **Landing en la portada**: contenido SEO con géneros, DJs destacados,
  últimos lanzamientos, planes y preguntas frecuentes (con datos
  estructurados FAQPage).
- **Reproductor estilo Spotify**: tema oscuro, lista de tracks, barra de
  reproducción fija con progreso y volumen, búsqueda y filtro por género.
- **Páginas de DJs**: `/djs/` lista todos los DJs; `/dj/nombre/` muestra
  la información del DJ con su playlist. La biografía se edita en
  `Productos → Atributos → DJ → Editar término → Descripción`.
- **URLs amigables**: paginación `/page/2/`, DJs en `/dj/nombre/`.
- **Suscripciones**: límites de descarga por plan de PMPro con reinicio
  mensual, integración con Download Monitor y shortcode
  `[pdj_descargas_restantes]`.

Las páginas "Música" (`/musica/`, reproductor) y "DJs" (`/djs/`) se crean
automáticamente la primera vez que carga el sitio después del despliegue.

## Pasos de activación (en el panel de WordPress)

1. **Enlaces permanentes**: `Ajustes → Enlaces permanentes` → elegir
   **"Nombre de la entrada"** → Guardar. Hacerlo siempre después de
   desplegar cambios de URLs.
2. **Plugins de SEO**: están activos Rank Math **y** Yoast SEO a la vez —
   se pelean entre sí (metadatos y sitemaps duplicados, penaliza el SEO).
   Desactivar uno de los dos (recomendado: dejar solo **Rank Math**).
3. **Límites de descarga**: en `inc/suscripciones.php`, función
   `pdj_limites_descarga` (los nombres deben coincidir con los planes de
   PMPro: `Basico` = 100/mes, `Premium` = 200/mes).
4. **Biografías de DJs**: `Productos → Atributos → DJ → Configurar
   términos` → editar cada DJ y llenar su Descripción.

## Cómo desplegar cambios en Hostinger

Desde la terminal SSH de Hostinger, dentro de `public_html`:

```bash
git pull origin main
```

Después del pull, guardar en `Ajustes → Enlaces permanentes`.

## Recomendaciones pendientes

- La carpeta `music/` es accesible públicamente por URL directa. Para que
  solo los socios descarguen, conviene servir los archivos a través de
  Download Monitor y bloquear el acceso directo con un `.htaccess` dentro
  de `music/`.
- `wp-config.php` y `wp-content/uploads/` están excluidos del repositorio
  a propósito (credenciales y archivos pesados). Haz respaldo de la base de
  datos por separado (Hostinger → Bases de datos → Copias de seguridad).
- El tema carga Bootstrap dos veces (5.3.0 por functions.php y 5.3.3 por
  header.php) y jQuery dos veces (CDN + WordPress). Unificar en una sola
  versión mejoraría la velocidad de carga (importante para SEO).
