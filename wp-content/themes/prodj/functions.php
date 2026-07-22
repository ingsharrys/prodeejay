<?php
/**
 * Funciones del tema hijo.
 */

/* Sistema de suscripciones (límites de descarga por membresía) */
require_once get_stylesheet_directory() . '/inc/suscripciones.php';

/* Helpers de productos (DJ, artista, BPM, preview) y páginas clave */
require_once get_stylesheet_directory() . '/inc/productos.php';

/* SEO: datos estructurados (schema.org) */
require_once get_stylesheet_directory() . '/inc/seo.php';

/**
 * Activa la página pública de cada DJ con URL amigable /dj/nombre-del-dj/
 * (usa la plantilla taxonomy-pa_dj.php).
 */
add_filter('woocommerce_taxonomy_args_pa_dj', 'pdj_activar_paginas_dj');
function pdj_activar_paginas_dj($args) {
    $args['public']             = true;
    $args['publicly_queryable'] = true;
    $args['query_var']          = true;
    $args['show_in_nav_menus']  = true;
    $args['rewrite']            = array(
        'slug'       => 'dj',
        'with_front' => false,
    );
    return $args;
}

/**
 * Crea una sola vez las páginas "Música" (reproductor) y "DJs", y
 * refresca las reglas de URL para que /dj/... funcione de inmediato.
 */
add_action('init', 'pdj_instalar_paginas', 99);
function pdj_instalar_paginas() {
    if (get_option('pdj_instalacion') === '1') {
        return;
    }

    $paginas = array(
        array('titulo' => 'Música', 'slug' => 'musica', 'plantilla' => 'home-prodj.php'),
        array('titulo' => 'DJs',    'slug' => 'djs',    'plantilla' => 'djs.php'),
    );

    foreach ($paginas as $pagina) {
        if (get_page_by_path($pagina['slug'])) {
            continue;
        }
        $id = wp_insert_post(array(
            'post_title'  => $pagina['titulo'],
            'post_name'   => $pagina['slug'],
            'post_type'   => 'page',
            'post_status' => 'publish',
            'post_content'=> '',
        ));
        if ($id && !is_wp_error($id)) {
            update_post_meta($id, '_wp_page_template', $pagina['plantilla']);
        }
    }

    flush_rewrite_rules();
    update_option('pdj_instalacion', '1');
}

/**
 * Enlace de paginación amigable (/page/2/) conservando la búsqueda
 * y la categoría seleccionadas.
 */
function pdj_enlace_pagina($numero) {
    $enlace = get_pagenum_link(max(1, (int) $numero));
    $args = array();
    if (!empty($_GET['buscando'])) {
        $args['buscando'] = sanitize_text_field(wp_unslash($_GET['buscando']));
    }
    if (!empty($_GET['category'])) {
        $args['category'] = sanitize_text_field(wp_unslash($_GET['category']));
    }
    return $args ? add_query_arg($args, $enlace) : $enlace;
}

/**
 * Evita que WordPress redirija /page/2/ a la portada en las
 * plantillas con paginación propia.
 */
add_filter('redirect_canonical', 'pdj_permitir_paginacion_amigable', 10, 1);
function pdj_permitir_paginacion_amigable($redirect_url) {
    $pagina = max((int) get_query_var('paged'), (int) get_query_var('page'));
    if ($pagina > 1 && (is_front_page() || is_page_template(array('home-prodj.php', 'packs.php', 'sets.php', 'video.php')))) {
        return false;
    }
    return $redirect_url;
}

/* Enqueue styles */
function hello_elementor_child_enqueue_styles() {
    wp_enqueue_style('hello-elementor-child-style', get_stylesheet_uri(), array('hello-elementor-style'), wp_get_theme()->get('Version'));
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_styles');

function custom_redirect_script() {
    wp_enqueue_script('custom-redirect', get_stylesheet_directory_uri() . '/js/custom-redirect.js', array('jquery'), '', true);
}

function enqueue_bootstrap_scripts() {
    // Agregar CSS de Bootstrap
    wp_enqueue_style('bootstrap-css', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css', array(), '5.3.0');
    
    // Agregar JS de Bootstrap
    wp_enqueue_script('bootstrap-js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js', array('jquery'), '5.3.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_bootstrap_scripts');



// Enqueue jQuery y nuestros scripts personalizados
function custom_enqueue_scripts() {
    wp_enqueue_script('jquery');

    // Garantiza que woocommerce_params.ajax_url exista en todas las
    // plantillas del tema (antes se asociaba a un script comentado y
    // podía quedar sin definir).
    wp_localize_script('jquery', 'woocommerce_params', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));
}
add_action('wp_enqueue_scripts', 'custom_enqueue_scripts');

// Handle AJAX add to cart
add_action('wp_ajax_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');
add_action('wp_ajax_nopriv_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');

function woocommerce_ajax_add_to_cart() {
    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity = empty($_POST['quantity']) ? 1 : wc_stock_amount($_POST['quantity']);

    $product_status = get_post_status($product_id);

    if (WC()->cart->add_to_cart($product_id, $quantity) && 'publish' === $product_status) {
        do_action('woocommerce_ajax_added_to_cart', $product_id);

        if ('yes' === get_option('woocommerce_cart_redirect_after_add')) {
            wc_add_to_cart_message(array($product_id => $quantity), true);
        }

        WC_AJAX::get_refreshed_fragments();
    } else {
        $data = array(
            'error' => true,
            'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id)
        );
        echo wp_send_json($data);
    }

    wp_die();
}

// Get cart count
add_action('wp_ajax_get_cart_count', 'get_cart_count');
add_action('wp_ajax_nopriv_get_cart_count', 'get_cart_count');

function get_cart_count() {
    $cart_count = WC()->cart->get_cart_contents_count();
    echo $cart_count;
    wp_die();
}

// functions.php
function custom_enqueue_checkout_styles() {
    if (is_checkout()) {
        wp_enqueue_style('custom-checkout', get_stylesheet_directory_uri() . '/custom-checkout.css');
    }
}
add_action('wp_enqueue_scripts', 'custom_enqueue_checkout_styles');



//add_action('woocommerce_cart_calculate_fees', 'descuento_por_monto_en_carrito');


/*

add_action('woocommerce_cart_calculate_fees', 'agregar_manejo_y_uso_plataforma');

function agregar_manejo_y_uso_plataforma($cart) {
    if (is_admin() && !defined('DOING_AJAX')) {
        return;
    }

    // Definir el porcentaje del recargo
    $porcentaje_manejo = 6.6; // 5% de la compra

    // Obtener el total del carrito
    $total_carrito = $cart->subtotal;

    // Calcular el costo adicional del 5%
    $monto_manejo = ($total_carrito * $porcentaje_manejo) / 100;

    // Agregar el recargo al carrito
    $cart->add_fee(__('Impuesto (6.6%)', 'woocommerce'), $monto_manejo, true);
}

*/



function descuento_por_monto_en_carrito($cart) {
    if (is_admin() && !defined('DOING_AJAX')) {
        return;
    }
	
	
	
	
	
	

    // Definir el monto mínimo para aplicar el descuento
    $monto_minimo = 920; // USD
    $descuento_porcentaje = 0; // % de descuento

    // Obtener el total del carrito
    $total_carrito = $cart->subtotal;

    // Aplicar descuento si el total supera el monto mínimo
    if ($total_carrito > $monto_minimo) {
        $descuento = ($total_carrito * $descuento_porcentaje) / 100;
        $cart->add_fee(__('Descuento por compra mayor a $20', 'woocommerce'), -$descuento, true);
    }
}



/*RENOVER PRODUCTO*/
// Añadir botón de remover producto en el checkout
add_filter('woocommerce_cart_item_name', 'custom_remove_product_button', 10, 3);
function custom_remove_product_button($product_name, $cart_item, $cart_item_key) {
    $remove_link = wc_get_cart_remove_url($cart_item_key);
    $product_name .= sprintf('<a href="%s" class="remove" aria-label="%s" data-product_id="%d" data-product_sku="%s">&times;</a>',
        esc_url($remove_link),
        __('Remove this item', 'woocommerce'),
        esc_attr($cart_item['product_id']),
        esc_attr($cart_item['data']->get_sku())
    );
    return $product_name;
}

// Añadir estilos personalizados
function custom_checkout_styles() {
    echo '<style>
        .woocommerce-checkout-review-order-table .remove {
            color: #ff0000;
            font-weight: bold;
            margin-left: 10px;
            cursor: pointer;
        }

        .woocommerce-checkout-review-order-table .remove:hover {
            color: #cc0000;
        }

        /* Estilos adicionales para personalizar el checkout */
        .woocommerce-checkout #customer_details {
            display: flex;
            flex-wrap: wrap;
        }

        .woocommerce-checkout #customer_details .col-1, 
        .woocommerce-checkout #customer_details .col-2 {
            flex: 1 1 50%;
            padding: 0 10px;
        }

        .woocommerce-checkout .woocommerce-checkout-payment, 
        .woocommerce-checkout .woocommerce-checkout-review-order {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
    </style>';
}
add_action('wp_head', 'custom_checkout_styles');









/*
 * El límite de descargas por membresía ahora vive en
 * inc/suscripciones.php, con reinicio mensual del contador e
 * integración con Download Monitor.
 */



/*
function redirect_to_coming_soon() {
    if (!is_user_logged_in() && !is_page('coming-soon')) {
        wp_redirect(home_url('/coming-soon/'));
        exit();
    }
}
add_action('template_redirect', 'redirect_to_coming_soon');
*/

/*
// Descuento automático del 20% por 2 días
add_action('woocommerce_before_calculate_totals', 'aplicar_descuento_20_porciento');

function aplicar_descuento_20_porciento($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;
    
    // Define el período de descuento (2 días desde hoy)
    $fecha_inicio = strtotime('now');
    $fecha_fin = strtotime('+2 days');
    $ahora = strtotime('now');
    
    // Verifica si estamos en el período de descuento
    if ($ahora >= $fecha_inicio && $ahora <= $fecha_fin) {
        foreach ($cart->get_cart() as $cart_item) {
            $precio_original = $cart_item['data']->get_regular_price();
            $precio_descuento = $precio_original * 0.8; // 20% de descuento
            $cart_item['data']->set_price($precio_descuento);
        }
    }
}
*/

?>
