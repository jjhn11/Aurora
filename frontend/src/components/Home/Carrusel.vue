<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import CardHome from './CardHome.vue';
import Modal from '../Modal.vue';

const store = useStore();

// Get popular books from store
const events = store.state.events?.events;

// Setup carousel events handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel1');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});
// Modal 
const isModalOpen = ref(false);
const selectedEvent = ref({});

//abrir/cerrar el modal
const openModal = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
    <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
      <div id="carrusel1" class="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <CardHome
                               :id="events[0].id"
                               :image="events[0].image"
                               :title="events[0].title"
                               :description="events[0].description"
                               @openModal="openModal(events[0])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                               :id="events[1].id"
                               :image="events[1].image"
                               :title="events[1].title"
                               :description="events[1].description"
                               @openModal="openModal(events[1])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                               :id="events[2].id"
                               :image="events[2].image"
                               :title="events[2].title"
                               :description="events[2].description"
                               @openModal="openModal(events[2])"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <CardHome
                               :id="events[3].id"
                               :image="events[3].image"
                               :title="events[3].title"
                               :description="events[3].description"
                               @openModal="openModal(events[3])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                               :id="events[4].id"
                               :image="events[4].image"
                               :title="events[4].title"
                               :description="events[4].description"
                               @openModal="openModal(events[4])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                               :id="events[5].id"
                               :image="events[5].image"
                               :title="events[5].title"
                               :description="events[5].description"
                               @openModal="openModal(events[5])"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <CardHome
                               :id="events[6].id"
                               :image="events[6].image"
                               :title="events[6].title"
                               :description="events[6].description"
                               @openModal="openModal(events[6])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                               :id="events[7].id"
                               :image="events[7].image"
                               :title="events[7].title"
                               :description="events[7].description"
                               @openModal="openModal(events[7])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                               :id="events[8].id"
                               :image="events[8].image"
                               :title="events[8].title"
                               :description="events[8].description"
                               @openModal="openModal(events[8])"
                            />
                        </div>
                    </div>
                </div>
        </div>
  
        <!-- Controles del carrusel -->
        <div class="carousel-controls-bottom">
          <button class="btn btn-link carousel-control-prev-bottom" type="button" data-bs-target="#carrusel1" data-bs-slide="prev">
            <i class="bi bi-chevron-left fs-4"></i>
          </button>
  
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carrusel1" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#carrusel1" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carrusel1" data-bs-slide-to="2"></button>
          </div>
  
          <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel1" data-bs-slide="next">
            <i class="bi bi-chevron-right fs-4"></i>
          </button>
        </div>
      </div>
    </div>
  
    <Modal :isOpen="isModalOpen" :event="selectedEvent" @close="closeModal" />
  </template>
  
  <style scoped>
  .contenedor-carrusel {
    width: 90%;
  }
  
  .carousel {
    position: relative;
    padding-bottom: 30px;
  }
  
  .carousel-item {
    margin: 0 auto;
    padding: 20px 10px;
  }
  
  .carousel-item .row {
    flex-wrap: wrap; /* ahora sí deja que se acomoden en pantallas chicas */
    max-width: 1600px;
    justify-content: center;
    margin: 0 auto;
  }
  
  /* CardHome */
  .card-home {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .card-home img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
  }
  
  /* Controles inferiores */
  .carousel-controls-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .carousel-control-prev-bottom,
  .carousel-control-next-bottom {
    color: #007bff;
    transition: all 0.3s ease;
    padding: 5px;
  }
  
  .carousel-control-prev-bottom:hover,
  .carousel-control-next-bottom:hover {
    color: #0056b3;
    transform: scale(1.2);
  }
  
  /* Indicadores */
  .carousel-indicators {
    position: relative;
    display: flex;
    gap: 5px;
    margin: 0;
    bottom: auto;
  }
  
  .carousel-indicators button {
    width: 12px !important;
    height: 12px !important;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #6f00ff !important;
    opacity: 0.5;
    transition: all 0.3s ease;
    margin: 0 5px;
  }
  
  .carousel-indicators button.active {
    background-color: #007bff;
    opacity: 1;
    transform: scale(1.2);
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    display: none;
  }
  </style>
  