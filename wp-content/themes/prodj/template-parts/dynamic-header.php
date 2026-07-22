<style>
    /* Estilos generales para el menú */
.custom-navbar .navbar-nav .nav-link {
    color: white !important;
    padding: 10px 20px !important;  /* Espacio alrededor de los enlaces */
    font-size: 16px !important;  /* Ajustar el tamaño del texto */
}

/* Hover para cambiar el color del enlace */
.custom-navbar .navbar-nav .nav-link:hover {
    color: #cccccc !important; /* Cambiar a un gris claro cuando el mouse pasa sobre el enlace */
}

/* Espacio entre los elementos del menú */
.custom-navbar .navbar-nav .nav-item {
    margin-left: 15px !important;
    margin-right: 15px !important;
}

/* Ajustes para dispositivos móviles (menor a 768px) */
@media (max-width: 768px) {
    /* Espaciado entre los elementos del menú en versión móvil */
    .custom-navbar .navbar-nav .nav-item {
        margin-bottom: 10px !important;  /* Agregar espacio entre los elementos en el menú desplegable */
    }
    
    /* Centrando los textos del menú en la versión móvil */
    .custom-navbar .navbar-nav {
        text-align: center !important;
    }

    /* Aumentar el tamaño de los enlaces en móvil para una mejor accesibilidad */
    .custom-navbar .navbar-nav .nav-link {
        font-size: 18px !important;
    }

    /* Asegurarse de que el menú ocupe el 100% del ancho en dispositivos móviles */
    .custom-navbar-collapse {
        width: 100% !important;
    }
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
