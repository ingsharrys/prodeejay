<?php
/* Template Name: Home Guaracha */
get_header(); 
?>
<!-- Bootstrap CSS -->




<body>
    
    <a href="<?php echo wc_get_cart_url(); ?>" title="<?php _e('View your shopping cart', 'woocommerce'); ?>" class="header-cart">
        <button id="floating-cart" style="text-decoration: none;">
            <i class="fas fa-shopping-cart"></i>
            <span id="cart-count">0</span>
        </button>
    </a>
    <div class="image-container">
        <img src="https://prodeejayremix.com/wp-content/uploads/2025/02/prodj.jpg" alt="Descripciion de la imagen" class="full-width-image">
    </div>
    
    <div class="container">
        <h2 class="titlerelease">NEW RELEASES</h2>
        <div class="linearelease"></div>
    </div>

    <div class="container mt-4">
        <div class="row search-wrapper">
            <div class="col-md-6">
                <input type="text" id="searchBox" placeholder="Buscar..." class="form-control mb-4 buscar">
            </div>
            <div class="col-md-4">
                <select id="categoryFilter" class="form-control mb-4">
                    <option value="">REMIXES</option>
                    <?php
                    $categories = get_terms('product_cat', array('hide_empty' => false));
                    foreach ($categories as $category) {
                        echo '<option value="' . $category->slug . '">' . $category->name . '</option>';
                    }
                    ?>
                </select>
            </div>
            <div class="col-md-2">
                <button id="searchButton" class="btn btn-primary buscarboton mb-4">Buscar</button>
            </div>
        </div>
  
        <div class="row" id="lamusic">
            
            <div class="col-sm-2 col-2 flexbox" style="border:1px solid #000;background: #fff;color: #000;"><p class="text-repro">DJ</p></div>
            <div class="col-sm-2 d-none d-md-block flexbox" style="border:1px solid #000;background: #fff;color: #000;"><p class="text-repro">Artist</p></div>
            <div class="col-sm-3 col-3 flexbox" style="border:1px solid #000;background: #fff;color: #000;"><p class="text-repro">Music</p></div>
            <div class="col-sm-2 d-none d-md-block flexbox" style="border:1px solid #000;background: #fff;color: #000;"><p class="text-repro">BPM</p></div>
            <div class="col-sm-2 col-5 flexbox" style="border:1px solid #000;background: #fff;color: #000;"><p class="text-repro">Price/Buy Play</p></div>
        </div>
    
    <div id="products-list">
    <?php 
         $per_page = 50;
        // URL amigable: /page/2/ (con compatibilidad para los enlaces antiguos ?mypage=2)
        $current_page = max(1, (int) get_query_var('paged'), (int) get_query_var('page'));
        if (isset($_GET['mypage'])) { $current_page = max($current_page, (int) $_GET['mypage']); }
        $search_term = isset($_GET['buscando']) ? sanitize_text_field($_GET['buscando']) : '';
        $selected_category = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : '';


        $args = [
            'status' => 'publish',
            'limit' => $per_page,
            'paged' => $current_page,
            's' => $search_term,
        ];

        if ($selected_category) {
            $args['category'] = array($selected_category);
        }

        $products = wc_get_products($args);

        $count_posts = wp_count_posts('product');
        $total_products = $count_posts->publish;
        $total_pages = ceil($total_products / $per_page);

        foreach ($products as $product) {
            // Verificar si el producto est�� en el carrito
            $in_cart = false;
            foreach (WC()->cart->get_cart() as $cart_item) {
                if ($cart_item['product_id'] == $product->get_id()) {
                    $in_cart = true;
                    break;
                }
            }
            ?>
            <div class="row product-row">
               
                <div class="col-sm-2 col-2 flexbox text-repro column-border" style="background: #212121;margin-top: 1%;">
                    <?php 
                        // Obtener las categor��as del producto
                        $categories = $product->get_category_ids();
                        $category_to_display = '';
                        
                        if (!empty($categories)) {
                            $term_primary = get_term_by('id', $categories[0], 'product_cat');
                            $primary_cat_name = $term_primary ? $term_primary->name : '';
                        
                            $category_to_display = $primary_cat_name;
                        
                            if ($primary_cat_name == '1latinos' && count($categories) > 1) {
                                $term_secondary = get_term_by('id', $categories[1], 'product_cat');
                                $secondary_cat_name = $term_secondary ? $term_secondary->name : '';
                                if ($secondary_cat_name) {
                                    $category_to_display = $secondary_cat_name;
                                }
                            } elseif ($primary_cat_name == '1videos' && count($categories) > 1) {
                                $term_secondary = get_term_by('id', $categories[1], 'product_cat');
                                $secondary_cat_name = $term_secondary ? $term_secondary->name : '';
                                if ($secondary_cat_name) {
                                    $category_to_display = $secondary_cat_name;
                                }
                            }
                        }
                        
                        // Obtener el valor del DJ
                        $attributes = $product->get_attributes();
                        $dj_value = 'N/A';
                        if (isset($attributes['pa_dj'])) {
                            $dj_options = $attributes['pa_dj']->get_options();
                            if (!empty($dj_options)) {
                                $dj_value = get_term($dj_options[0])->name;
                            }
                        }
                        
                        // Mostrar $dj_value o $category_to_display
                        if ($dj_value === 'N/A') {
                            echo $category_to_display;
                        } else {
                            echo $dj_value;
                        }
                        ?>

                </div>
                <div class="col-sm-2 d-none d-md-block flexbox text-repro column-border" style="background: #212121;margin-top: 1%;">
                    <?php 
                        $attributes = $product->get_attributes();
                        $artist = 'N/A';
                        if (isset($attributes['pa_artista'])) {
                            $dj_options = $attributes['pa_artista']->get_options();
                            if (!empty($dj_options)) {
                                $artist = get_term($dj_options[0])->name;
                            }
                        }
                        
                        $artistValue = 'N/A';  
                        $attributes_numeric = array_values($attributes);
                        if (isset($attributes_numeric[1])) {
                            $second_attribute = $attributes_numeric[1];
                            if ($second_attribute->is_taxonomy() === false) {
                                $options = $second_attribute->get_options();
                                if (!empty($options)) {
                                    $artistValue = array_shift($options);
                                }
                            }
                        }
                        
                        if ($artist === 'N/A' && $artistValue !== 'N/A') {
                            echo $artistValue;
                        } else {
                            echo $artist;
                        }
                        ?>

                </div>
                <div class="col-sm-3 col-3 flexbox text-repro column-border" style="background: #212121;margin-top: 1%;"><?php echo $product->get_name(); ?></div>
                <div class="col-sm-2 d-none d-md-block flexbox text-repro column-border" style="background: #212121;margin-top: 1%;">
                    <?php 
                    $attributes = $product->get_attributes();
                    $artistaBPM = 'N/A';
                    $artistBPM = 'N/A';
                    
                    // Obtener el valor del atributo 'pa_bpm'
                    if (isset($attributes['pa_bpm'])) {
                        $dj_options = $attributes['pa_bpm']->get_options();
                        if (!empty($dj_options)) {
                            $artistaBPM = get_term($dj_options[0])->name;
                        }
                    }
                    
                    // Obtener el valor del segundo atributo
                    $attributes_numeric = array_values($attributes);
                    if (isset($attributes_numeric[0])) {
                        $second_attribute = $attributes_numeric[0];
                        if ($second_attribute->is_taxonomy() === false) {
                            $options = $second_attribute->get_options();
                            if (!empty($options)) {
                                $artistBPM = array_shift($options);
                            }
                        }
                    }
                    
                    // Mostrar el resultado
                    if ($artistaBPM === 'N/A') {
                        echo $artistBPM;
                    } else {
                        echo $artistaBPM;
                    }
                    ?>

                    
                    
                </div>
                <div class="col-sm-2 col-5 flexbox text-repro column-border" style="background: #212121;margin-top: 1%;">
                    <?php  
    $preview_url = 'N/A';  
    $attributes = $product->get_attributes();
    $attributes_numeric = array_values($attributes);
    
    if (isset($attributes_numeric[3])) {
        $second_attribute = $attributes_numeric[3];
        if ($second_attribute->is_taxonomy() === false) {
            $options = $second_attribute->get_options();
            if (!empty($options)) {
                $preview_url = array_shift($options);
            }
        }
    }

    if ($primary_cat_name == 'video') {
    // Botón para abrir el modal
    echo '<button type="button" class="botonplay" data-bs-toggle="modal" data-bs-target="#videoModal' . $product->get_id() . '">
            <span class="play-button"></span>
          </button>';

    // Modal de Bootstrap
    echo '<div class="modal fade" id="videoModal' . $product->get_id() . '" tabindex="-1" aria-labelledby="videoModalLabel' . $product->get_id() . '" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="videoModalLabel' . $product->get_id() . '">Video Preview</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ' . $preview_url . '
                </div>
              </div>
            </div>
          </div>';
}
 elseif ($preview_url === 'N/A') {
        // Si $preview_url es 'N/A', mostrar el bot��n con ��cono de aud��fonos
        echo '<a href="' . get_permalink($product->get_id()) . '" class="botonplay" style="display:inline-flex; align-items:center; text-decoration:none;">
                <span class="play-button"><i class="fas fa-headphones" style="color: white;"></i></span>
              </a>';
    } else {
        // Si $preview_url no es 'N/A', mostrar el bot��n de play y ocultar el bot��n de aud��fonos
        echo '<button class="botonplay" onclick="playAudio(\'' . esc_js($preview_url) . '\', this)"><span class="play-button"></span></button>';
        echo '<audio id="audioPlayer"></audio>';
    }
?>


                    <?php if ($in_cart): ?>
                        <button onclick="window.location.href='<?php echo wc_get_cart_url(); ?>'" style="padding: 4%;display: inline-flex;font-size:0.7rem;border-radius: 0;" class="button alt">
                            Ir al carrito
                        </button>
                    <?php else: ?>
                        <form class="cart ajax-add-to-cart" action="#" method="post" enctype="multipart/form-data">
                            <input type="hidden" name="product_id" value="<?php echo esc_attr($product->get_id()); ?>">
                            <input type="hidden" name="quantity" value="1">
                            <button type="submit" style="padding: 4%;display: inline-flex;font-size:0.7rem;border-radius: 0;" class="single_add_to_cart_button button alt">
                                <?php echo $product->get_price_html(); ?>
                                <i class="fas fa-shopping-cart carrito"></i>
                            </button>
                        </form>
                    <?php endif; ?>
                    <div id="loading" style="display: none;">
                        <div class="loading-spinner">
                            <i class="fa fa-spinner fa-spin"></i> Agregando cancion al carrito...
                        </div>
                    </div>
                </div>
            </div>      
        <?php }

        if ($total_pages > 1) {
            $max_links = 4;
            $start = max(1, $current_page - intdiv($max_links, 2));
            $end = min($total_pages, $start + $max_links - 1);

            if ($current_page < intdiv($max_links, 2) + 1) { $end = min($total_pages, $max_links); }
            if ($current_page > $total_pages - intdiv($max_links, 2)) { $start = max(1, $total_pages - $max_links + 1); }

            echo '<div class="woocommerce-pagination">';

            if ($current_page > 1) { echo '<a class="prev-page" href="' . esc_url(pdj_enlace_pagina($current_page - 1)) . '"><<</a> '; }

            for ($i = $start; $i <= $end; $i++) {
                $class = ($i == $current_page) ? 'active' : '';
                echo '<a class="' . $class . '" href="' . esc_url(pdj_enlace_pagina($i)) . '">' . $i . '</a> ';
            }

            if ($current_page < $total_pages) { echo '<a class="next-page" href="' . esc_url(pdj_enlace_pagina($current_page + 1)) . '">>></a> '; }
            echo '</div>';
        }
    ?>
    </div>
    
    <div id="sound-bars" class="sound-bars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>

    <div id="audioPlayerWrapper">
        <div id="customAudioControls">
            <button id="playButton"><i class="fas fa-play"></i></button>
            <button id="pauseButton" style="display: none;"><i class="fas fa-pause"></i></button>
            <input type="range" id="audioSeekbar" value="0" max="100" style="width: 100%;">
            <div id="time">0:00</div>
        </div>
        <audio id="audioPlayer">
            <source id="audioSource" src="" type="audio/mpeg">
        </audio>
    </div>
    
</div>
</body>

<script>
   function updatePaginationButtons() {
        $("#page-buttons").empty();
        for (let e = Math.max(1, currentPage - 2); e <= Math.min(currentPage + 2, currentPage + maxPageButtons - 1); e++) {
            $("#page-buttons").append(`
                <li class="page-item"><a class="page-link" 
                    style="border-radius: 20px;border: 3px solid #000;
                    color: #000;
                    font-size: 13pt;
                    font-weight: 500;
                    padding-top: 1px;" href="#" onclick="loadPage(${e})">${e}</a></li>`);
        }
    }

    function loadPage(e) {
        currentPage = e;
        let t = $("#searchBox").val() || "";
        loadProducts(currentPage, t);
        updatePaginationButtons();
    }

    // Control de la reproducción manual del audio
function playAudio(e, t) {
    console.log("Playing URL: ", e);
    let a = document.getElementById("audioPlayer"),
        n = document.getElementById("playButton"),
        i = document.getElementById("pauseButton");
    
    if (a.src !== e) {
        a.src = e; // Actualiza la fuente del audio solo si cambia
    }
    
    if (a.paused || a.src !== e) {
        a.play(); // Reproduce el audio si está en pausa
        t.innerHTML = '<i class="fas fa-pause" style="color: white;"></i>';
        n.style.display = "none";
        i.style.display = "";
        
        // Asegúrate de que todos los botones de play/pause se actualicen correctamente
        document.querySelectorAll(".botonplay").forEach(function (btn) {
            if (btn !== t) {
                btn.innerHTML = '<i class="fas fa-play" style="color: white;"></i>';
            }
        });
    } else {
        a.pause(); // Pausa el audio si ya está reproduciendo
        t.innerHTML = '<i class="fas fa-play" style="color: white;"></i>';
        n.style.display = "";
        i.style.display = "none";
    }

    a.addEventListener("ended", function () {
        t.innerHTML = '<i class="fas fa-play" style="color: white;"></i>';
        n.style.display = "";
        i.style.display = "none";
    });
}

// Elimina la reproducción automática
document.addEventListener("DOMContentLoaded", function () {
    // No reproducimos automáticamente el video ni el audio
    // let e = document.querySelector("video");
    // e && e.play();
});

jQuery(document).ready(function (e) {
    // No reproducimos automáticamente los videos
    // e("video").each(function () {
    //     this.play();
    // });
});

  
    function openVideoPopup(url) {
    var modal = document.getElementById("videoPopup");
    var video = modal.querySelector("video");
    var span = modal.querySelector(".close");

    video.src = url;
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
        video.pause();  // Pausa el video cuando se cierra el popup
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            video.pause();
        }
    }
}

    jQuery(document).ready(function (e) {
        e("a").each(function () {
            var t = e(this).attr("href");
            t && t.includes("cart") && e(this).attr("href", t.replace("cart", "checkout"));
        });
    });


    $(document).ready(function () {
        $("#searchButton").click(function () {
            let e = $("#searchBox").val();
            let c = $("#categoryFilter").val();
            window.location.href = "<?php echo esc_url(get_permalink()); ?>?buscando=" + encodeURIComponent(e) + "&category=" + encodeURIComponent(c);
        });
        $("#searchBox").keypress(function (e) {
            13 === e.which && $("#searchButton").click();
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("playButton"),
            t = document.getElementById("pauseButton");
        document.getElementById("time");
        let a = document.getElementById("audioPlayer"),
            n = document.querySelectorAll(".bar");
        e.addEventListener("click", function () {
            a.play(), e.style.display = "none", t.style.display = "inline", n.style.visibility = "visible";
        });
        t.addEventListener("click", function () {
            a.pause(), e.style.display = "inline", t.style.display = "none", n.style.visibility = "hidden";
        });
        a.addEventListener("ended", function () {
            e.style.display = "inline", t.style.display = "none", n.style.visibility = "hidden";
        });
        a.addEventListener("timeupdate", function () {
            document.getElementById("sound-bars").style.visibility = "visible", n.forEach((e, t) => {
                e.style.height = `${50 * Math.random()}px`;
            });
            audioSeekbar.value = (a.currentTime / a.duration) * 100;
            time.innerHTML = formatTime(a.currentTime);
        });

        audioSeekbar.addEventListener("input", function () {
            a.currentTime = (audioSeekbar.value / 100) * a.duration;
        });

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    });

    let indiceActual = 0;
    const imagenes = document.querySelectorAll(".carrusels-imagenes a"),
        totalImagenes = imagenes.length,
        imagenesPorVista = 5;

    function mover(e) {
        (indiceActual += e) > totalImagenes - 5 ? indiceActual = 0 : indiceActual < 0 && (indiceActual = totalImagenes - 5);
        let t = -(100 * indiceActual / 5);
        for (let a of imagenes) a.style.transform = `translateX(${t}%)`;
    }

    document.addEventListener("DOMContentLoaded", function () {
        mover(0);
    });

    setInterval(function () {
        mover(1);
    }, 3000);

    jQuery(document).ready(function (e) {
        function t() {
            e.ajax({
                type: "POST",
                url: woocommerce_params.ajax_url,
                data: {
                    action: "get_cart_count"
                },
                success: function (t) {
                    e("#cart-count").text(t), parseInt(t) > 0 ? e("#floating-cart").addClass("cart-has-items") : e("#floating-cart").removeClass("cart-has-items");
                },
                error: function (e) {
                    console.log("Error al actualizar el contador del carrito:", e);
                }
            });
        }
        e("form.ajax-add-to-cart").on("submit", function (a) {
            a.preventDefault(), e("#loading").show();
            var n = e(this),
                i = {
                    action: "woocommerce_ajax_add_to_cart",
                    product_id: n.find("[name=product_id]").val(),
                    quantity: n.find("[name=quantity]").val()
                };
            e.ajax({
                type: "POST",
                url: woocommerce_params.ajax_url,
                data: i,
                success: function (a) {
                    e("#loading").hide();
                    if (a.error && a.product_url) {
                        window.location = a.product_url;
                        return;
                    }
                    t();
                    n.closest('.product-row').find('.single_add_to_cart_button').replaceWith(`
                        <button onclick="window.location.href='<?php echo wc_get_cart_url(); ?>'" style="padding: 4%;display: inline-flex;font-size:0.7rem;border-radius: 0;" class="button alt">
                            Ir al carrito
                        </button>
                    `);
                },
                error: function (t) {
                    e("#loading").hide(), console.log("Error al agregar producto al carrito:", t);
                }
            });
        }), t();
    });

    document.addEventListener("DOMContentLoaded", function () {
        var e = document.querySelector(".menu-toggle"),
            t = document.getElementById("site-navigation");
        e.addEventListener("click", function () {
            "block" === t.style.display ? t.style.display = "none" : t.style.display = "block";
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        var e = document.querySelector(".menu-toggle"),
            t = document.querySelector("#primary-menu");
        e.addEventListener("click", function () {
            var e = "true" === this.getAttribute("aria-expanded");
            this.setAttribute("aria-expanded", !e), t.classList.toggle("active");
        });
    });
    
    
</script>
<!-- Bootstrap JS and dependencies -->




<?php get_footer(); ?>
