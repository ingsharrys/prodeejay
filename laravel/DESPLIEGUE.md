# Prodeejay Remix — Plataforma Laravel

Nueva plataforma del sitio, construida en Laravel 12. Reemplaza a
WordPress/WooCommerce con una arquitectura limpia y escalable:

- **Catálogo**: tracks (audio, video, packs, sets) con DJ, artista, BPM,
  preview y archivo, importados desde WooCommerce.
- **Reproductor estilo Spotify** con barra de reproducción fija.
- **Páginas de DJs**: `/djs` y `/dj/nombre` con biografía y playlist.
- **Multi-idioma**: español e inglés (selector ES/EN en el menú).
- **Pagos con Stripe**: compras individuales (Stripe Checkout) y
  suscripciones con límite mensual de descargas (Laravel Cashier).
- **Reportes profesionales**: ventas por DJ por mes con gráfica de los
  últimos 12 meses y exportación CSV (`/admin/reportes`).

## Estructura

| Ruta | Qué hace |
|---|---|
| `app/Console/Commands/ImportWordPress.php` | `php artisan wp:import` — migra DJs, géneros, tracks, usuarios y pedidos desde la BD de WordPress |
| `app/Http/Controllers/` | Controladores públicos, de cuenta y admin |
| `app/Models/` | Dj, Genre, Track, Plan, Order, OrderItem, Download, User |
| `lang/es`, `lang/en` | Textos en ambos idiomas |
| `resources/views/` | Vistas Blade (diseño oscuro estilo Spotify) |

## Despliegue en Hostinger (subdominio de pruebas)

La estrategia es de convivencia: WordPress sigue vendiendo en
`prodeejayremix.com` mientras pruebas Laravel en un subdominio.

### 1. Crear el subdominio y la base de datos

En hPanel:
- **Dominios → Subdominios**: crear `app.prodeejayremix.com`.
- **Bases de datos → MySQL**: crear una base nueva (ej. `u936058592_laravel`)
  con su usuario y contraseña. Anótalos.

### 2. Instalar la aplicación por SSH

```bash
cd ~/domains/app.prodeejayremix.com
git clone https://github.com/ingsharrys/prodeejay.git codigo
cd codigo/laravel
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

Editar `.env` (con `nano .env`):

```
APP_URL=https://app.prodeejayremix.com
APP_ENV=production
APP_DEBUG=false

DB_CONNECTION=mysql
DB_DATABASE=u936058592_laravel
DB_USERNAME=(el usuario de la BD nueva)
DB_PASSWORD=(su contraseña)

# BD de WordPress (para importar los datos; están en hPanel → Bases de datos)
WP_DB_DATABASE=(la BD de WordPress)
WP_DB_USERNAME=(usuario de la BD de WordPress)
WP_DB_PASSWORD=(su contraseña)
WP_DB_PREFIX=wp_

# Correo (para "olvidé mi contraseña"): hPanel → Correos
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=no-reply@prodeejayremix.com
MAIL_PASSWORD=(contraseña del buzón)
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=no-reply@prodeejayremix.com

ADMIN_EMAIL=dario.charry.ramos@gmail.com
ADMIN_PASSWORD=(elige una contraseña fuerte)
```

Luego:

```bash
php artisan migrate --seed --force
php artisan wp:import        # migra todos los datos de WordPress
```

### 3. Apuntar el subdominio a Laravel

El subdominio debe servir la carpeta `laravel/public` (nunca la raíz del
proyecto, para no exponer el `.env`):

```bash
cd ~/domains/app.prodeejayremix.com
rm -rf public_html
ln -s codigo/laravel/public public_html
```

Si Hostinger no permite el symlink, alternativa: copiar el contenido de
`laravel/public` a `public_html` y editar su `index.php` para que las dos
rutas `require` apunten a `../codigo/laravel/vendor/autoload.php` y
`../codigo/laravel/bootstrap/app.php`.

### 4. Configurar Stripe

1. Crear cuenta en https://stripe.com y copiar las claves (Developers →
   API keys) a `STRIPE_KEY` y `STRIPE_SECRET` del `.env`.
2. Crear los productos de suscripción (Products → Add product): "Basico"
   y "Premium" con precio mensual recurrente. Copiar el ID del precio
   (`price_...`) de cada uno y guardarlo en la tabla `plans`:
   ```bash
   php artisan tinker
   >>> App\Models\Plan::where('slug','basico')->update(['stripe_price_id' => 'price_xxx', 'price' => 19.99]);
   >>> App\Models\Plan::where('slug','premium')->update(['stripe_price_id' => 'price_yyy', 'price' => 29.99]);
   ```
3. Crear el webhook (Developers → Webhooks): URL
   `https://app.prodeejayremix.com/stripe/webhook`, eventos
   `checkout.session.completed`, `customer.subscription.*`,
   `invoice.*`. Copiar el signing secret a `STRIPE_WEBHOOK_SECRET`.

### 5. Actualizaciones futuras

```bash
cd ~/domains/app.prodeejayremix.com/codigo
git pull origin main
cd laravel
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

## Cambio definitivo de dominio (cuando todo esté probado)

1. Volver a correr `php artisan wp:import` para traer lo último.
2. En hPanel, cambiar el documento raíz del dominio principal para servir
   `laravel/public` (mismo método del paso 3).
3. Los usuarios existentes activan su cuenta con "¿Olvidaste tu
   contraseña?" (WordPress usa otro formato de hash y las contraseñas no
   se pueden migrar — es una limitación de seguridad, no un olvido).

## Notas

- Los archivos de música siguen en el servidor (carpeta `music/`) y los
  tracks guardan su URL (`file_url`), importada desde los atributos de
  WooCommerce.
- Requiere PHP 8.2+ con la extensión `bcmath` (en Hostinger: hPanel →
  Avanzado → Configuración PHP → extensiones).
