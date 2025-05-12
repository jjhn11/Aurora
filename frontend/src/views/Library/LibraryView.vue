<script setup>
import CarruselBiblioteca from '@/components/Library/CarruselBiblioteca.vue';
import HeroBiVideo from '@/components/Library/HeroBiVideo.vue';
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
    <HeroBiVideo />

    <br><br><br><br>

    <div class="container">
        <h1 class="title">INDUSTRIAL</h1>
        <h2 class="subtitle">Conozca el contenido más popular</h2>
        <CarruselBiblioteca bookSource="industrialBooks" carouselId="carousel-popular" :showSlider="false"/>
    </div>
    <div class="container">
        <h1 class="title">SISTEMAS COMPUTACIONALES</h1>
        <h2 class="subtitle">Lo nuevo en Aurora</h2>
        <CarruselBiblioteca bookSource="systemsBooks" carouselId="carousel-new" :showSlider="false"/>
    </div>

    <div class="container">
        <h1 class="title">ADMINISTRACION</h1>
        <h2 class="subtitle">Contenido recomendado del mes</h2>
        <CarruselBiblioteca bookSource="administrativeBooks" carouselId="carousel-month" :showSlider="false"/>
    </div>
    <div class="container">
        <h1 class="title">AMANTES DE LOS LIBROS</h1>
        <h2 class="subtitle">Novelas variadas, para todo tipo</h2>
        <CarruselBiblioteca bookSource="bookLovers" carouselId="carousel-novels" :showSlider="false"/>
    </div>
    <div class="container text-center">
        <img src="@/assets/img/library/bufalito2.png" class="img-bufalito" alt="Bufalo chiquito">
        <div class="text mt-3 mb-5">
            <p >
                ¿Sigues buscando algo que ver? 
            </p>
            <p>
                Revisa todo nuestro catálogo
            </p>
        </div>
        
        <RouterLink to="/biblioteca/catalogo" class="btn-access">
            ACCEDER
        </RouterLink>
    </div>

    <br><br><br><br><br><br><br>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Josefin+Sans:wght@400;600&display=swap');

.title {
    font-family: Crimson Text;
    color: #021E68;
    font-weight: 700;
    font-size: 37.5px;
    line-height: 100%;
}

.subtitle {
    font-family: "Nunito Sans", sans-serif;
    color: #000E32;
    font-weight: 600;
    font-size: 25.5px;
    line-height: 100%;
    margin: 15px 0 0 20px;
}

.categories {
    margin: auto;
}
.category {
    font-family: Josefin Sans;
    color: #000E32;
    font-weight: 700;
    font-size: 21px;
    line-height: 100%;
    text-align: center;

}
.category:hover {
    color: #FBE326;
    cursor: pointer;
}

.img-bufalito{
    width: 182px;
    height: 182px;
}
.text {
    font-family: "Nunito Sans", sans-serif;
    font-weight: 600;
    font-size: 37.5px;
    line-height: 100%;
    text-align: center;
}
.btn-access {
    font-family: "Josefin Sans";
    font-weight: 700;
    font-size: 25px;
    background-color: #000E32;
    color: white;
    padding: 17px 22px 12px 22px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}
.btn-access:hover {
    background-color: #FBE326;
    color: #000E32;
}
@media (max-width: 768px) {
    .title {
        font-size: 28px;
    }
    .subtitle {
        display: hidden;
        font-size: 0px;
        margin: 0 0 0 0;
    }
    .img-bufalito{
        width: 156px;
        height: 104px;
    }
    .text {
        font-size: 20px;
    }
}
</style>