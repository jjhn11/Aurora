<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import CardHome from './CardHome.vue';
import Modal from '../Modal.vue';

const store = useStore();

// Get popular books from store
// const events = store.state.events?.events;

// Setup carousel events handling
let scrollPos = 0;

// Cargar eventos al montar el componente
onMounted(async () => {
  if (!store.state.events?.events?.length) {
    await store.dispatch('events/loadInitialData');
  }
});

const filteredEvents = computed(() => {
  let events = [];
  events = store.getters['events/getAllEvents'];
  // Filtrar solo eventos con Is_coming = 1
  return events.filter(event => event.Is_coming === 1);
});


const getImageUrl = (imagePath) => {
    return `${axios.defaults.baseURL}${imagePath.startsWith('/uploads') ? '' : '/uploads'}${imagePath}`;
};

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
    <div class="contenedor-carrusel container-fluid  justify-content-center">
      <div id="carrusel1" class="carousel slide">
            <div class="carousel-inner" v-if="filteredEvents && filteredEvents.length >= 3">
                <div class="carousel-item active">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[0].Id_event"
                              :image="getImageUrl(filteredEvents[0].Image_url)"
                              :title="filteredEvents[0].Title"
                              :description="filteredEvents[0].Description"
                              @openModal="openModal(filteredEvents[0])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[1].Id_event"
                              :image="getImageUrl(filteredEvents[1].Image_url)"
                              :title="filteredEvents[1].Title"
                              :description="filteredEvents[1].Description"
                              @openModal="openModal(filteredEvents[1])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[2].Id_event"
                              :image="getImageUrl(filteredEvents[2].Image_url)"
                              :title="filteredEvents[2].Title"
                              :description="filteredEvents[2].Description"
                              @openModal="openModal(filteredEvents[2])"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[3].Id_event"
                              :image="getImageUrl(filteredEvents[3].Image_url)"
                              :title="filteredEvents[3].Title"
                              :description="filteredEvents[3].Description"
                              @openModal="openModal(filteredEvents[3])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[4].Id_event"
                              :image="getImageUrl(filteredEvents[4].Image_url)"
                              :title="filteredEvents[4].Title"
                              :description="filteredEvents[4].Description"
                              @openModal="openModal(filteredEvents[4])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[5].Id_event"
                              :image="getImageUrl(filteredEvents[5].Image_url)"
                              :title="filteredEvents[5].Title"
                              :description="filteredEvents[5].Description"
                              @openModal="openModal(filteredEvents[5])"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[6].Id_event"
                              :image="getImageUrl(filteredEvents[6].Image_url)"
                              :title="filteredEvents[6].Title"
                              :description="filteredEvents[6].Description"
                              @openModal="openModal(filteredEvents[6])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[7].Id_event"
                              :image="getImageUrl(filteredEvents[7].Image_url)"
                              :title="filteredEvents[7].Title"
                              :description="filteredEvents[7].Description"
                              @openModal="openModal(filteredEvents[7])"
                            />
                        </div>
                        <div class="col-md-4">
                            <CardHome
                              :id="filteredEvents[7].Id_event"
                              :image="getImageUrl(filteredEvents[7].Image_url)"
                              :title="filteredEvents[7].Title"
                              :description="filteredEvents[7].Description"
                              @openModal="openModal(filteredEvents[8])"
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
  .carousel-inner {
    height: 100%;
    min-height: 500px; /* ajusta según el contenido mínimo del slide */
  }

  .contenedor-carrusel {
    width: 90%;
  }
  
  .carousel {
    position: relative;
    padding-bottom: 30px;
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

  @media (max-width: 768px) {
    .carousel-inner {
      height: 100%;
      min-height: 350px; /* ajusta según el contenido mínimo del slide */
    }

    .contenedor-carrusel {
      width: 100%;
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
      gap: 5px;
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
  }
  </style>
  