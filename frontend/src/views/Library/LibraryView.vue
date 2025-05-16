<script setup>
import CarruselBiblioteca from '@/components/Library/CarruselBiblioteca.vue';
import HeroBiVideo from '@/components/Library/HeroBiVideo.vue';
import SearchBar from '@/components/SearchBar.vue';
import SectionIndex from '@/components/Library/SectionIndex.vue';

const sections = [
  { id: 'administracion', name: 'Administración' },
  { id: 'contador', name: 'Contador Público' },
  { id: 'desarrollo', name: 'Desarrollo de Apps' },
  { id: 'electrica', name: 'Eléctrica' },
  { id: 'electronica', name: 'Electrónica' },
  { id: 'renovables', name: 'Energías Renovables' },
  { id: 'gestion', name: 'Gestión Empresarial' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'logistica', name: 'Logística' },
  { id: 'materiales', name: 'Materiales' },
  { id: 'mecanica', name: 'Mecánica' },
  { id: 'mecatronica', name: 'Mecatrónica' },
  { id: 'quimica', name: 'Química' },
  { id: 'sistemas', name: 'Sistemas' },
  { id: 'libros', name: 'Amantes de los Libros' }
];
</script>

<template>
  <HeroBiVideo />
  <SectionIndex :sections="sections" />

  <br><br><br><br>

  <div id="administracion" class="container">
    <h1 class="title">ADMINISTRACION</h1>
    <CarruselBiblioteca bookSource="administrativeBooks" carouselId="carousel-admin" :showSlider="false"/>
  </div>

  <div id="contador" class="container">
    <h1 class="title">CONTADOR PUBLICO</h1>
    <CarruselBiblioteca bookSource="accountingBooks" carouselId="carousel-accounting" :showSlider="false"/>
  </div>

  <div id="desarrollo" class="container">
    <h1 class="title">DESARROLLO DE APLICACIONES</h1>
    <CarruselBiblioteca bookSource="appDevelopmentBooks" carouselId="carousel-dev" :showSlider="false"/>
  </div>

  <div id="electrica" class="container">
    <h1 class="title">ELÉCTRICA</h1>
    <CarruselBiblioteca bookSource="electricalBooks" carouselId="carousel-electrical" :showSlider="false"/>
  </div>

  <div id="electronica" class="container">
    <h1 class="title">ELECTRÓNICA</h1>
    <CarruselBiblioteca bookSource="electronicsBooks" carouselId="carousel-electronics" :showSlider="false"/>
  </div>

  <div id="renovables" class="container">
    <h1 class="title">ENERGÍAS RENOVABLES</h1>
    <CarruselBiblioteca bookSource="renewableEnergyBooks" carouselId="carousel-renewable" :showSlider="false"/>
  </div>

  <div id="gestion" class="container">
    <h1 class="title">GESTIÓN EMPRESARIAL</h1>
    <CarruselBiblioteca bookSource="businessManagementBooks" carouselId="carousel-management" :showSlider="false"/>
  </div>
  
  <div id="industrial" class="container">
    <h1 class="title">INDUSTRIAL</h1>
    <CarruselBiblioteca bookSource="industrialBooks" carouselId="carousel-industrial" :showSlider="false"/>
  </div>

  <div id="logistica" class="container">
    <h1 class="title">LOGISTICA</h1>
    <CarruselBiblioteca bookSource="logisticsBooks" carouselId="carousel-logistics" :showSlider="false"/>
  </div>

  <div id="materiales" class="container">
    <h1 class="title">MATERIALES</h1>
    <CarruselBiblioteca bookSource="materialsBooks" carouselId="carousel-materials" :showSlider="false"/>
  </div>

  <div id="mecanica" class="container">
    <h1 class="title">MECÁNICA</h1>
    <CarruselBiblioteca bookSource="mechanicBooks" carouselId="carousel-mechanic" :showSlider="false"/>
  </div>

  <div id="mecatronica" class="container">
    <h1 class="title">MECATRÓNICA</h1>
    <CarruselBiblioteca bookSource="mechatronicsBooks" carouselId="carousel-mechatronics" :showSlider="false"/>
  </div>

  <div id="quimica" class="container">
    <h1 class="title">QUÍMICA</h1>
    <CarruselBiblioteca bookSource="chemistryBooks" carouselId="carousel-chemistry" :showSlider="false"/>
  </div>

  <div id="sistemas" class="container">
    <h1 class="title">SISTEMAS COMPUTACIONALES</h1>
    <CarruselBiblioteca bookSource="systemsBooks" carouselId="carousel-systems" :showSlider="false"/>
  </div>

  <div id="libros" class="container">
    <h1 class="title">AMANTES DE LOS LIBROS</h1>
    <CarruselBiblioteca bookSource="bookLovers" carouselId="carousel-books" :showSlider="false"/>
  </div>

  <div class="container text-center">
    <img src="@/assets/img/library/bufalito2.png" class="img-bufalito" alt="Bufalo chiquito">
    <div class="text mt-3 mb-5">
      <p>
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

.title {
    font-family: Josefin Sans;
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