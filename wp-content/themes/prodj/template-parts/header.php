<?php
/**
 * The template for displaying the header
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$site_name = get_bloginfo( 'name' );
$header_nav_menu = wp_nav_menu( array(
	'theme_location' => 'menu-1',
	'container'      => false,
	'menu_class'     => 'navbar-nav ms-auto mb-2 mb-lg-0',
	'fallback_cb'    => '__return_false',
	'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
	'echo'           => false,
) );
?>
<style>
    a {
    color: white;  /* Cambia el color del texto a blanco */
    padding: 10px 15px;  /* Espaciado alrededor del enlace */
    text-decoration: none;  /* Quita el subrayado */
}
</style>
<header id="site-header" class="site-header dynamic-header custom-header">
    <div class="header-inner custom-header-inner">
        <nav class="navbar navbar-expand-lg navbar-dark bg-black custom-navbar">
            <div class="container-fluid">
                <!-- Logo del sitio -->
                <?php if ( $site_name ) : ?>
                    <a class="navbar-brand text-white custom-navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                        <img width="100px" height="auto" src="https://prodeejayremix.com/wp-content/uploads/2024/08/cropped-logo-1.png" class="custom-logo" alt="Prodeejay Remix">
                    </a>
                <?php endif; ?>

                <!-- Botón hamburguesa para menú en móvil -->
                <button class="navbar-toggler custom-navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Menú de navegación -->
                <div class="collapse navbar-collapse custom-navbar-collapse" id="navbarNavDropdown">
                    <?php echo $header_nav_menu; ?>
                </div>
            </div>
        </nav>
    </div>
</header>



