<?php
/**
 * Plugin Name:       Prodj · Subir música
 * Description:       Sube música y videos a la carpeta /music del sitio de forma segura: solo administradores, solo dentro de /music, solo archivos de audio/video verificados por su contenido y por trozos (sin límite de tamaño del hosting).
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Dario Charry
 * Text Domain:       prodj-subir-musica
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Prodj_Subir_Musica
{
    public const VERSION = '1.0.0';
    public const CAP = 'prodj_subir_musica';
    public const NONCE = 'prodj_subir_musica';
    public const REGISTRO = 'prodj_musica_registro';
    public const MARCADOR = 'Prodj Subir Musica';

    /** Tamaño máximo de un trozo que acepta el servidor. */
    public const TROZO_MAX = 8 * MB_IN_BYTES;

    /** Tamaño máximo de un archivo completo. */
    public const ARCHIVO_MAX = 4 * GB_IN_BYTES;

    /** Niveles de subcarpetas que se muestran y se pueden crear. */
    public const PROFUNDIDAD = 3;

    /** Extensiones permitidas; su contenido real se verifica en contenido_valido(). */
    public const TIPOS = ['mp3', 'wav', 'aif', 'aiff', 'flac', 'm4a', 'mp4', 'zip'];

    public static function iniciar(): void
    {
        add_action('admin_menu', [self::class, 'menu']);
        add_action('admin_enqueue_scripts', [self::class, 'recursos']);
        add_action('wp_ajax_prodj_musica_subir', [self::class, 'ajax_subir']);
        add_action('wp_ajax_prodj_musica_listar', [self::class, 'ajax_listar']);
        add_action('wp_ajax_prodj_musica_crear_carpeta', [self::class, 'ajax_crear_carpeta']);
        add_action('wp_ajax_prodj_musica_eliminar', [self::class, 'ajax_eliminar']);
        add_action('wp_ajax_prodj_musica_proteger', [self::class, 'ajax_proteger']);
    }

    /* ------------------------------------------------------------------
     * Activación
     * ------------------------------------------------------------------ */

    public static function activar(): void
    {
        $rol = get_role('administrator');
        if ($rol && !$rol->has_cap(self::CAP)) {
            $rol->add_cap(self::CAP);
        }
        if (false === get_option(self::REGISTRO)) {
            add_option(self::REGISTRO, [], '', false);
        }
        self::carpeta_temporal();
    }

    /* ------------------------------------------------------------------
     * Rutas
     * ------------------------------------------------------------------ */

    /** Carpeta raíz de la música (public_html/music). Se puede cambiar en wp-config.php. */
    public static function raiz(): ?string
    {
        $ruta = defined('PRODJ_MUSICA_DIR') ? PRODJ_MUSICA_DIR : ABSPATH . 'music';
        $real = realpath($ruta);

        return ($real && is_dir($real)) ? $real : null;
    }

    /** URL pública de la carpeta raíz. */
    public static function url_raiz(): string
    {
        return defined('PRODJ_MUSICA_URL') ? untrailingslashit(PRODJ_MUSICA_URL) : home_url('/music');
    }

    /**
     * Convierte una carpeta relativa enviada por el navegador en una ruta
     * absoluta, garantizando que quede DENTRO de la raíz de la música.
     */
    public static function resolver_carpeta(string $relativa): string|WP_Error
    {
        $raiz = self::raiz();
        if (!$raiz) {
            return new WP_Error('sin_raiz', 'No existe la carpeta de música en el servidor.');
        }

        $relativa = trim(str_replace('\\', '/', $relativa), '/');
        if (str_contains($relativa, "\0")) {
            return new WP_Error('ruta', 'Carpeta no válida.');
        }
        foreach (explode('/', $relativa) as $parte) {
            if ('..' === $parte || ('' !== $parte && str_starts_with($parte, '.'))) {
                return new WP_Error('ruta', 'Carpeta no válida.');
            }
        }

        $real = realpath('' === $relativa ? $raiz : $raiz . '/' . $relativa);
        if (!$real || !is_dir($real) || !self::dentro_de_raiz($real, $raiz)) {
            return new WP_Error('ruta', 'Carpeta no válida.');
        }

        return $real;
    }

    private static function dentro_de_raiz(string $ruta, string $raiz): bool
    {
        return $ruta === $raiz || str_starts_with($ruta, $raiz . DIRECTORY_SEPARATOR);
    }

    /** Ruta relativa a la raíz, siempre con "/". */
    public static function relativa(string $absoluta): string
    {
        $raiz = (string) self::raiz();

        return trim(str_replace('\\', '/', substr($absoluta, strlen($raiz))), '/');
    }

    public static function url_de(string $relativa_archivo): string
    {
        $partes = array_map('rawurlencode', explode('/', trim($relativa_archivo, '/')));

        return self::url_raiz() . '/' . implode('/', $partes);
    }

    /** Lista de subcarpetas (relativas), hasta PROFUNDIDAD niveles. */
    public static function carpetas(): array
    {
        $raiz = self::raiz();
        if (!$raiz) {
            return [];
        }
        $lista = [''];
        self::recorrer($raiz, 1, $lista);
        natcasesort($lista);

        return array_values($lista);
    }

    private static function recorrer(string $dir, int $nivel, array &$lista): void
    {
        if ($nivel > self::PROFUNDIDAD) {
            return;
        }
        try {
            $it = new DirectoryIterator($dir);
        } catch (Throwable $e) {
            return;
        }
        foreach ($it as $item) {
            if ($item->isDot() || !$item->isDir() || $item->isLink() || str_starts_with($item->getFilename(), '.')) {
                continue;
            }
            $lista[] = self::relativa($item->getPathname());
            self::recorrer($item->getPathname(), $nivel + 1, $lista);
        }
    }

    /** Carpeta privada para los trozos en curso (uploads/prodj-tmp, sin acceso web). */
    public static function carpeta_temporal(): string
    {
        $dir = trailingslashit(wp_upload_dir(null, false)['basedir']) . 'prodj-tmp';
        if (!is_dir($dir)) {
            wp_mkdir_p($dir);
        }
        if (!file_exists($dir . '/.htaccess')) {
            file_put_contents($dir . '/.htaccess', "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nOrder allow,deny\nDeny from all\n</IfModule>\n");
        }
        if (!file_exists($dir . '/index.php')) {
            file_put_contents($dir . '/index.php', "<?php\n// Silencio.\n");
        }

        return $dir;
    }

    /* ------------------------------------------------------------------
     * Validación de archivos
     * ------------------------------------------------------------------ */

    /**
     * Nombre seguro: sin rutas, con una sola extensión permitida y sin
     * caracteres raros. "Mi Remix (Intro).php.mp3" → "Mi-Remix-Intro-php.mp3".
     */
    public static function nombre_seguro(string $nombre): string|WP_Error
    {
        $nombre = wp_basename(str_replace('\\', '/', $nombre));
        $ext = strtolower(pathinfo($nombre, PATHINFO_EXTENSION));
        if (!in_array($ext, self::TIPOS, true)) {
            return new WP_Error('tipo', 'Tipo de archivo no permitido. Solo: ' . implode(', ', self::TIPOS) . '.');
        }
        $base = str_replace('.', '-', pathinfo($nombre, PATHINFO_FILENAME));
        $base = trim(sanitize_file_name($base), '.-_ ');
        $base = str_replace('.', '-', $base);
        if ('' === $base) {
            $base = 'archivo';
        }
        $base = mb_substr($base, 0, 150);

        return $base . '.' . $ext;
    }

    /** Verifica por los primeros bytes que el archivo sea realmente del tipo que dice. */
    public static function contenido_valido(string $ruta, string $ext): bool
    {
        $fh = @fopen($ruta, 'rb');
        if (!$fh) {
            return false;
        }
        $cabecera = (string) fread($fh, 16);
        fclose($fh);
        if (strlen($cabecera) < 12) {
            return false;
        }

        switch ($ext) {
            case 'mp3':
                return str_starts_with($cabecera, 'ID3')
                    || (0xFF === ord($cabecera[0]) && 0xE0 === (ord($cabecera[1]) & 0xE0));
            case 'wav':
                return str_starts_with($cabecera, 'RIFF') && 'WAVE' === substr($cabecera, 8, 4);
            case 'aif':
            case 'aiff':
                return str_starts_with($cabecera, 'FORM') && in_array(substr($cabecera, 8, 4), ['AIFF', 'AIFC'], true);
            case 'flac':
                return str_starts_with($cabecera, 'fLaC') || str_starts_with($cabecera, 'ID3');
            case 'm4a':
            case 'mp4':
                return 'ftyp' === substr($cabecera, 4, 4);
            case 'zip':
                return str_starts_with($cabecera, "PK\x03\x04") || str_starts_with($cabecera, "PK\x05\x06");
        }

        return false;
    }

    /* ------------------------------------------------------------------
     * AJAX
     * ------------------------------------------------------------------ */

    private static function exigir_permiso(): void
    {
        if (!current_user_can(self::CAP)) {
            wp_send_json_error(['mensaje' => 'No tienes permiso para subir música.'], 403);
        }
        if (!check_ajax_referer(self::NONCE, 'nonce', false)) {
            wp_send_json_error(['mensaje' => 'La sesión expiró. Recarga la página.'], 403);
        }
    }

    private static function texto(string $clave): string
    {
        return isset($_POST[$clave]) ? sanitize_text_field(wp_unslash($_POST[$clave])) : '';
    }

    /**
     * Recibe un trozo del archivo. Los trozos llegan en orden; al recibir el
     * último se valida el archivo completo y se mueve a su carpeta final.
     */
    public static function ajax_subir(): void
    {
        self::exigir_permiso();

        $id = self::texto('id_subida');
        $indice = (int) ($_POST['indice'] ?? -1);
        $total = (int) ($_POST['total'] ?? 0);
        $tamano = (int) ($_POST['tamano'] ?? 0);
        $modo = 'reemplazar' === self::texto('modo') ? 'reemplazar' : 'renombrar';

        if (!preg_match('/^[a-zA-Z0-9]{16,64}$/', $id) || $indice < 0 || $total < 1 || $indice >= $total
            || $tamano < 1 || $tamano > self::ARCHIVO_MAX || $total > (int) ceil(self::ARCHIVO_MAX / (256 * KB_IN_BYTES))) {
            wp_send_json_error(['mensaje' => 'Datos de subida no válidos.'], 400);
        }

        $nombre = self::nombre_seguro(self::texto('nombre'));
        if (is_wp_error($nombre)) {
            wp_send_json_error(['mensaje' => $nombre->get_error_message()], 400);
        }
        $carpeta = self::resolver_carpeta(self::texto('carpeta'));
        if (is_wp_error($carpeta)) {
            wp_send_json_error(['mensaje' => $carpeta->get_error_message()], 400);
        }

        $trozo = $_FILES['trozo'] ?? null;
        if (!$trozo || UPLOAD_ERR_OK !== ($trozo['error'] ?? -1) || !is_uploaded_file($trozo['tmp_name'])) {
            wp_send_json_error(['mensaje' => 'No llegó el trozo del archivo. Intenta de nuevo.'], 400);
        }
        if ((int) $trozo['size'] < 1 || (int) $trozo['size'] > self::TROZO_MAX) {
            wp_send_json_error(['mensaje' => 'Trozo de tamaño no válido.'], 400);
        }

        $tmp = self::carpeta_temporal();
        $usuario = get_current_user_id();
        $parte = $tmp . '/' . $usuario . '-' . $id . '.part';
        $estado_ruta = $tmp . '/' . $usuario . '-' . $id . '.json';
        $esperado = ['nombre' => $nombre, 'carpeta' => self::relativa($carpeta), 'tamano' => $tamano, 'total' => $total];

        if (0 === $indice) {
            self::limpiar_temporales($tmp);
            @unlink($parte);
            $estado = $esperado + ['recibidos' => 0];
        } else {
            $estado = is_readable($estado_ruta) ? json_decode((string) file_get_contents($estado_ruta), true) : null;
            if (!is_array($estado) || array_intersect_key($estado, $esperado) != $esperado || $indice !== (int) $estado['recibidos']) {
                wp_send_json_error(['mensaje' => 'La subida se interrumpió. Vuelve a subir el archivo.'], 409);
            }
        }

        $destino = fopen($parte, 'ab');
        $origen = fopen($trozo['tmp_name'], 'rb');
        if (!$destino || !$origen) {
            wp_send_json_error(['mensaje' => 'No se pudo escribir en el servidor.'], 500);
        }
        stream_copy_to_stream($origen, $destino);
        fclose($origen);
        fclose($destino);
        clearstatcache(true, $parte);

        if (0 === $indice) {
            $ext = strtolower(pathinfo($nombre, PATHINFO_EXTENSION));
            if (!self::contenido_valido($parte, $ext)) {
                @unlink($parte);
                wp_send_json_error(['mensaje' => 'El contenido no corresponde a un archivo .' . $ext . ' válido.'], 415);
            }
        }

        if (filesize($parte) > $tamano) {
            @unlink($parte);
            @unlink($estado_ruta);
            wp_send_json_error(['mensaje' => 'El archivo es más grande de lo indicado.'], 400);
        }

        $estado['recibidos'] = $indice + 1;

        if ($estado['recibidos'] < $total) {
            file_put_contents($estado_ruta, wp_json_encode($estado));
            wp_send_json_success(['recibidos' => $estado['recibidos']]);
        }

        // Último trozo: comprobar tamaño y mover a la carpeta final.
        @unlink($estado_ruta);
        if (filesize($parte) !== $tamano) {
            @unlink($parte);
            wp_send_json_error(['mensaje' => 'El archivo llegó incompleto. Intenta de nuevo.'], 400);
        }

        $final = $nombre;
        if (file_exists($carpeta . '/' . $final) && 'reemplazar' !== $modo) {
            $final = wp_unique_filename($carpeta, $final);
        }
        $ruta_final = $carpeta . '/' . $final;

        if (!@rename($parte, $ruta_final)) {
            if (!@copy($parte, $ruta_final)) {
                @unlink($parte);
                wp_send_json_error(['mensaje' => 'No se pudo guardar el archivo en la carpeta.'], 500);
            }
            @unlink($parte);
        }
        @chmod($ruta_final, 0644);

        $relativa = self::relativa($ruta_final);
        self::registrar('subió', $relativa);

        wp_send_json_success([
            'archivo' => $final,
            'ruta'    => $relativa,
            'url'     => self::url_de($relativa),
        ]);
    }

    public static function ajax_listar(): void
    {
        self::exigir_permiso();

        $carpeta = self::resolver_carpeta(self::texto('carpeta'));
        if (is_wp_error($carpeta)) {
            wp_send_json_error(['mensaje' => $carpeta->get_error_message()], 400);
        }

        $archivos = [];
        foreach (new DirectoryIterator($carpeta) as $item) {
            if (!$item->isFile() || $item->isLink() || str_starts_with($item->getFilename(), '.')) {
                continue;
            }
            $ext = strtolower($item->getExtension());
            if (!in_array($ext, self::TIPOS, true)) {
                continue;
            }
            $relativa = self::relativa($item->getPathname());
            $archivos[] = [
                'nombre' => $item->getFilename(),
                'tamano' => $item->getSize(),
                'fecha'  => $item->getMTime(),
                'url'    => self::url_de($relativa),
            ];
        }
        usort($archivos, fn ($a, $b) => $b['fecha'] <=> $a['fecha']);

        wp_send_json_success([
            'total'    => count($archivos),
            'archivos' => array_slice($archivos, 0, 500),
        ]);
    }

    public static function ajax_crear_carpeta(): void
    {
        self::exigir_permiso();

        $padre = self::resolver_carpeta(self::texto('carpeta'));
        if (is_wp_error($padre)) {
            wp_send_json_error(['mensaje' => $padre->get_error_message()], 400);
        }

        $nombre = trim(preg_replace('/[^A-Za-z0-9 _\-]/', '', remove_accents(self::texto('nombre'))));
        $nombre = preg_replace('/\s+/', ' ', $nombre);
        if ('' === $nombre || strlen($nombre) > 60) {
            wp_send_json_error(['mensaje' => 'Escribe un nombre de carpeta válido (letras, números, espacios, guiones).'], 400);
        }

        $relativa_padre = self::relativa($padre);
        $nivel = '' === $relativa_padre ? 1 : count(explode('/', $relativa_padre)) + 1;
        if ($nivel > self::PROFUNDIDAD) {
            wp_send_json_error(['mensaje' => 'Máximo ' . self::PROFUNDIDAD . ' niveles de carpetas.'], 400);
        }

        $nueva = $padre . '/' . $nombre;
        if (file_exists($nueva)) {
            wp_send_json_error(['mensaje' => 'Esa carpeta ya existe.'], 409);
        }
        if (!@mkdir($nueva, 0755)) {
            wp_send_json_error(['mensaje' => 'No se pudo crear la carpeta.'], 500);
        }

        $relativa = self::relativa($nueva);
        self::registrar('creó la carpeta', $relativa);
        wp_send_json_success(['carpeta' => $relativa]);
    }

    public static function ajax_eliminar(): void
    {
        self::exigir_permiso();

        $carpeta = self::resolver_carpeta(self::texto('carpeta'));
        if (is_wp_error($carpeta)) {
            wp_send_json_error(['mensaje' => $carpeta->get_error_message()], 400);
        }

        $archivo = self::texto('archivo');
        $ext = strtolower(pathinfo($archivo, PATHINFO_EXTENSION));
        if ($archivo !== wp_basename($archivo) || str_starts_with($archivo, '.') || !in_array($ext, self::TIPOS, true)) {
            wp_send_json_error(['mensaje' => 'Archivo no válido.'], 400);
        }

        $ruta = $carpeta . '/' . $archivo;
        if (!is_file($ruta) || is_link($ruta) || !self::dentro_de_raiz((string) realpath($ruta), (string) self::raiz())) {
            wp_send_json_error(['mensaje' => 'El archivo no existe.'], 404);
        }
        if (!@unlink($ruta)) {
            wp_send_json_error(['mensaje' => 'No se pudo eliminar el archivo.'], 500);
        }

        self::registrar('eliminó', self::relativa($carpeta) . '/' . $archivo);
        wp_send_json_success();
    }

    /* ------------------------------------------------------------------
     * Protección de la carpeta /music
     * ------------------------------------------------------------------ */

    /** Reglas que impiden ejecutar código y listar archivos dentro de /music. */
    public static function reglas_proteccion(): array
    {
        return [
            'Options -Indexes',
            '<FilesMatch "\.(?i:php\d?|phtml|phar|pht|shtml|cgi|pl|py|sh|asp|aspx|jsp)$">',
            '  <IfModule mod_authz_core.c>',
            '    Require all denied',
            '  </IfModule>',
            '  <IfModule !mod_authz_core.c>',
            '    Order allow,deny',
            '    Deny from all',
            '  </IfModule>',
            '</FilesMatch>',
        ];
    }

    public static function proteccion_activa(): bool
    {
        $raiz = self::raiz();
        if (!$raiz || !is_readable($raiz . '/.htaccess')) {
            return false;
        }
        require_once ABSPATH . 'wp-admin/includes/misc.php';

        // Al deshacer quedan los marcadores vacíos: cuenta solo si están las reglas.
        return self::reglas_proteccion() === extract_from_markers($raiz . '/.htaccess', self::MARCADOR);
    }

    /**
     * Escribe las reglas y las prueba contra el propio servidor: un archivo
     * normal debe seguir descargándose y un .php NO debe ejecutarse. Si algo
     * falla, las reglas se quitan solas para no dejar la música inaccesible.
     */
    public static function ajax_proteger(): void
    {
        self::exigir_permiso();
        $resultado = self::proteger();
        if (is_wp_error($resultado)) {
            wp_send_json_error(['mensaje' => $resultado->get_error_message()], 500);
        }
        wp_send_json_success(['mensaje' => $resultado]);
    }

    public static function proteger(): string|WP_Error
    {
        $raiz = self::raiz();
        if (!$raiz) {
            return new WP_Error('sin_raiz', 'No existe la carpeta de música.');
        }
        require_once ABSPATH . 'wp-admin/includes/misc.php';

        $htaccess = $raiz . '/.htaccess';
        if (!insert_with_markers($htaccess, self::MARCADOR, self::reglas_proteccion())) {
            return new WP_Error('escritura', 'No se pudo escribir ' . $htaccess . '.');
        }

        $clave = wp_generate_password(12, false);
        $txt = $raiz . '/prodj-prueba-' . $clave . '.mp3';
        $php = $raiz . '/prodj-prueba-' . $clave . '.php';
        file_put_contents($txt, 'ID3 prueba ' . $clave);
        file_put_contents($php, '<?php echo "EJECUTADO-' . $clave . '";');

        $args = ['timeout' => 15, 'redirection' => 0, 'sslverify' => false];
        $r_txt = wp_remote_get(self::url_de(basename($txt)), $args);
        $r_php = wp_remote_get(self::url_de(basename($php)), $args);
        @unlink($txt);
        @unlink($php);

        if (is_wp_error($r_txt) || is_wp_error($r_php)) {
            // Sin prueba posible (el servidor no puede llamarse a sí mismo): se dejan las reglas,
            // que son las estándar, pero se avisa para verificar a mano.
            return 'Protección escrita, pero el servidor no pudo probarse a sí mismo. Abre una canción de /music en el navegador para confirmar que se descarga bien.';
        }

        $txt_ok = 200 === wp_remote_retrieve_response_code($r_txt) && str_contains(wp_remote_retrieve_body($r_txt), $clave);
        $php_ejecutado = str_contains(wp_remote_retrieve_body($r_php), 'EJECUTADO-' . $clave);

        if (!$txt_ok) {
            insert_with_markers($htaccess, self::MARCADOR, []);
            return new WP_Error('prueba', 'El servidor no aceptó las reglas (los archivos dejaban de descargarse), así que se deshicieron. La música sigue funcionando como antes.');
        }
        if ($php_ejecutado) {
            insert_with_markers($htaccess, self::MARCADOR, []);
            return new WP_Error('prueba', 'El servidor ignora estas reglas: un .php se seguía ejecutando. Se deshicieron; avísale al desarrollador.');
        }

        self::registrar('activó la protección de', '/music');

        return 'Protección activa y probada: la música se descarga normal y un .php ya no puede ejecutarse en /music.';
    }

    /* ------------------------------------------------------------------
     * Registro de actividad
     * ------------------------------------------------------------------ */

    public static function registrar(string $accion, string $ruta): void
    {
        $registro = get_option(self::REGISTRO, []);
        if (!is_array($registro)) {
            $registro = [];
        }
        array_unshift($registro, [
            'fecha'   => time(),
            'usuario' => wp_get_current_user()->user_login ?: 'sistema',
            'accion'  => $accion,
            'ruta'    => $ruta,
        ]);
        update_option(self::REGISTRO, array_slice($registro, 0, 200), false);
    }

    /** Borra trozos abandonados de hace más de un día. */
    private static function limpiar_temporales(string $tmp): void
    {
        foreach (glob($tmp . '/*.{part,json}', GLOB_BRACE) ?: [] as $archivo) {
            if (filemtime($archivo) < time() - DAY_IN_SECONDS) {
                @unlink($archivo);
            }
        }
    }

    /* ------------------------------------------------------------------
     * Pantalla del administrador
     * ------------------------------------------------------------------ */

    public static function menu(): void
    {
        add_menu_page(
            'Subir música',
            'Subir música',
            self::CAP,
            'prodj-subir-musica',
            [self::class, 'pantalla'],
            'dashicons-format-audio',
            26
        );
    }

    /** Tamaño de trozo que cabe en los límites de subida del hosting. */
    public static function tamano_trozo(): int
    {
        $limite = (int) wp_max_upload_size();
        $trozo = $limite > 0 ? $limite - 64 * KB_IN_BYTES : self::TROZO_MAX;

        return (int) max(256 * KB_IN_BYTES, min(self::TROZO_MAX, $trozo));
    }

    public static function recursos(string $pantalla): void
    {
        if ('toplevel_page_prodj-subir-musica' !== $pantalla) {
            return;
        }
        $url = plugin_dir_url(__FILE__);
        wp_enqueue_style('prodj-subir-musica', $url . 'assets/admin.css', [], self::VERSION);
        wp_enqueue_script('prodj-subir-musica', $url . 'assets/admin.js', [], self::VERSION, true);
        wp_localize_script('prodj-subir-musica', 'ProdjMusica', [
            'ajax'        => admin_url('admin-ajax.php'),
            'nonce'       => wp_create_nonce(self::NONCE),
            'trozo'       => self::tamano_trozo(),
            'maximo'      => self::ARCHIVO_MAX,
            'extensiones' => self::TIPOS,
            'carpetas'    => self::carpetas(),
        ]);
    }

    public static function pantalla(): void
    {
        if (!current_user_can(self::CAP)) {
            wp_die('No tienes permiso para ver esta página.');
        }
        $raiz = self::raiz();
        $registro = array_slice((array) get_option(self::REGISTRO, []), 0, 30);
        ?>
        <div class="wrap pjm">
            <h1><span class="dashicons dashicons-format-audio"></span> Subir música</h1>

            <?php if (!$raiz) : ?>
                <div class="notice notice-error"><p>No se encontró la carpeta <code><?php echo esc_html(ABSPATH . 'music'); ?></code>. Créala o define <code>PRODJ_MUSICA_DIR</code> en wp-config.php.</p></div>
                </div>
                <?php return; ?>
            <?php endif; ?>

            <?php if (!self::proteccion_activa()) : ?>
                <div class="pjm-aviso" id="pjm-aviso-proteccion">
                    <strong>La carpeta /music aún no está protegida.</strong>
                    Actívalo para impedir que alguien ejecute código o vea la lista de archivos ahí. El plugin lo prueba y, si algo falla, lo deshace solo.
                    <button type="button" class="button button-primary" id="pjm-proteger">Activar y probar protección</button>
                </div>
            <?php endif; ?>

            <div class="pjm-grid">
                <section class="pjm-caja">
                    <h2>1. Elige la carpeta</h2>
                    <label for="pjm-carpeta">Carpeta de destino</label>
                    <select id="pjm-carpeta"></select>
                    <div class="pjm-fila">
                        <input type="text" id="pjm-nueva" placeholder="Nueva subcarpeta (ej. DJ Wasson)" maxlength="60">
                        <button type="button" class="button" id="pjm-crear">Crear dentro</button>
                    </div>

                    <h2>2. Sube los archivos</h2>
                    <div id="pjm-zona" class="pjm-zona" tabindex="0" role="button" aria-label="Elegir archivos">
                        <span class="dashicons dashicons-upload"></span>
                        <p><strong>Arrastra aquí tu música</strong> o haz clic para elegir</p>
                        <small><?php echo esc_html(strtoupper(implode(' · ', self::TIPOS))); ?> · hasta <?php echo esc_html(size_format(self::ARCHIVO_MAX)); ?> por archivo</small>
                        <input type="file" id="pjm-archivos" multiple hidden accept="<?php echo esc_attr('.' . implode(',.', self::TIPOS)); ?>">
                    </div>
                    <label class="pjm-check"><input type="checkbox" id="pjm-reemplazar"> Reemplazar si ya existe un archivo con el mismo nombre</label>
                    <ul id="pjm-cola" class="pjm-cola"></ul>
                </section>

                <section class="pjm-caja">
                    <h2>Archivos en <span id="pjm-titulo-carpeta">/music</span></h2>
                    <input type="search" id="pjm-buscar" placeholder="Buscar en esta carpeta…">
                    <p class="pjm-meta" id="pjm-meta"></p>
                    <table class="widefat striped pjm-tabla">
                        <thead><tr><th>Archivo</th><th>Tamaño</th><th>Fecha</th><th></th></tr></thead>
                        <tbody id="pjm-lista"><tr><td colspan="4">Cargando…</td></tr></tbody>
                    </table>
                </section>
            </div>

            <section class="pjm-caja">
                <h2>Actividad reciente</h2>
                <?php if (!$registro) : ?>
                    <p class="pjm-meta">Todavía no hay actividad.</p>
                <?php else : ?>
                    <table class="widefat striped">
                        <tbody>
                        <?php foreach ($registro as $fila) : ?>
                            <tr>
                                <td><?php echo esc_html(wp_date('Y-m-d H:i', (int) $fila['fecha'])); ?></td>
                                <td><?php echo esc_html($fila['usuario']); ?></td>
                                <td><?php echo esc_html($fila['accion']); ?> <code><?php echo esc_html($fila['ruta']); ?></code></td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </section>
        </div>
        <?php
    }
}

register_activation_hook(__FILE__, [Prodj_Subir_Musica::class, 'activar']);
Prodj_Subir_Musica::iniciar();
