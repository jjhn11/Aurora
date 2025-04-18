<script setup>

</script>

<template>

    <!-- ### Hero ### -->

    <div>
        <section class="hero-container">
            <div class="hero-overlay">
                <span class="hero-title">RECREATIVAS</span>
            </div>
        </section>
    </div>

    <!-- ### Boton Crear Evento ### -->

    <div class="container-fluid justify-content-center">
        <div class="cre-cont col-12 d-flex justify-content-end text-center mt-4 pe-4">
            <button class="cre-button btn btn-primary mt-3" type="button">
                <i class="cre-icon fa-solid fa-circle-plus"></i>
                <span> CREAR EVENTO</span>
            </button>
        </div>
    </div>

    <!-- ### Aviso de "Ningun Evento" ### -->

    <div class="container-fluid justify-content-center">
        <div class="avit-cont col-12 text-center my-5">
            <p class="avit-text">No hay ningun evento de la comunidad, por favor regrese en un momento.</p>
            <RouterLink to="/" class="avit-button btn btn-primary mt-3 ">
                <span>Regresar a Inicio</span>
            </RouterLink>
        </div>
    </div>

</template>

<style scoped>
    /* Hero Container */
    .hero-container {
        position: relative;
        width: 100%;
        height: 240px;
        overflow: hidden;
        display: flex;
        background-color: #000E32;
        justify-content: center; /* Centra horizontalmente */
        align-items: center;     /* Centra verticalmente */
    }

    /* Gradient Overlay
    .hero-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.66) 70%);
        z-index: 2;
        pointer-events: none; /* Asegura que la superposición no bloquee las interacciones 
    }
    */

    /* Background elements */
    .hero-background, .hero-video {
        position: absolute;
        top: 0;
        width: 100%;
        height: 200%;
        object-fit:cover;
        object-position: 100% 95%;
    }

    .hero-background {
        z-index: 0;
    }

    .hero-video {
        z-index: 1;
    }

    /* Overlay Content */
    .hero-overlay {
        position: relative;
        z-index: 3; /* Asegura que el contenido esté encima de la superposición */
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hero-title {
        font-family: 'Playfair Display';
        font-weight: 700;
        font-size: 6rem;
        color: white;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        letter-spacing: 0.05em;
        margin: 0;
        transform: translateY(30%);
        width: 870px;
        height: 280px;
        max-width: 80%; 
    }

    .cre-cont {
        
        .cre-button {
            display: flex;
            align-items: center; /* Centra verticalmente */
            justify-content: center; /* Centra horizontalmente */
            text-align: center;

            background-color: white;
            border: none;


            width: 225px;
            height: 50px;

            transition: all 0.5s ease;

            span {
                height: 25px;
                color:#000E32;
                font-family: 'Josefin Sans';
                font-weight: 700;
                font-size: 18px;

                transition: all 0.2s ease;
            }

            .cre-icon {
                font-size: 30px;
                margin-right: 15px;
                color:#000E32;

                transition: all 0.2s ease;
            }

            &:hover {
                span, .cre-icon {
                    color: #FBE326;
                }
            }
        }
    }

    .avit-cont {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .avit-text {
            font-family: 'Playfair Display';
            font-weight: 700;
            font-size: 45px;
            color: rgb(145, 145, 145);
            letter-spacing: 0.05em;
            width: 900px;
        }

        .avit-button {
            display: flex;
            align-items: center; /* Centra verticalmente */
            justify-content: center; /* Centra horizontalmente */
            text-align: center;

            background-color: white;
            border-radius: 50px;
            border-color:#000E32;

            width: 150px;
            height: 50px;

            transition: all 0.5s ease;

            span {
                height: 22.5px;
                color:#000E32;
                font-family: 'Anek Odia';
                font-weight: 700;
                font-size: 18px;
            }

            i {
                color:#000E32;
            }

            &:hover {
                background-color:#000E32;

                span,i {
                    color:white;
                }
            }
            
            
        }

    }

</style>