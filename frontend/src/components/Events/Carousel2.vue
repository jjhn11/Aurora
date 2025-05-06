<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import Modal from '../Modal.vue';
// Setup reactive state
const activeSlide = ref(0);
const totalSlides = ref(3);
const showSlider = ref(true);
const store = useStore();

// Categoría Escolar (ID=3)
const schoolCategoryId = 3;

// Cargar eventos al montar el componente
onMounted(async () => {
  if (!store.state.events?.events?.length) {
    await store.dispatch('events/loadInitialData');
  }
});

// Obtener solo eventos escolares usando el getter
const schoolEvents = computed(() => 
  store.getters['events/getEventsByCategory'](schoolCategoryId) || []
);

// Setup carousel events handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel2');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});
// Modal
const selectedEvent = ref(null);
const isModalOpen = ref(false);

const openModal = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedEvent.value = null;
  isModalOpen.value = false;
};
</script>

<template>
    <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
        <button class="btn btn-link carousel-control-prev-bottom" type="button" data-bs-target="#carrusel2" data-bs-slide="prev">
            <i class="bi bi-chevron-left fs-4"></i>
        </button>
        <div id="carrusel2" class="carousel">
            <div class="carousel-inner" v-if="schoolEvents.length >= 3">
                <div class="carousel-item active">
                    <div class="slide-row">
                        <Card
                        v-for="(event, index) in events.slice(3, 6)"
                        :key="event.id"
                        :id="event.id"
                        :image="event.image"
                        :title="event.title"
                        :description="event.description"
                        @click="openModal(event)"
                        />
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="slide-row">
                        <Card
                        v-for="(event, index) in events.slice(3, 6)"
                        :key="event.id"
                        :id="event.id"
                        :image="event.image"
                        :title="event.title"
                        :description="event.description"
                        @click="openModal(event)"
                        />
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="slide-row">
                        <Card
                        v-for="(event, index) in events.slice(3, 6)"
                        :key="event.id"
                        :id="event.id"
                        :image="event.image"
                        :title="event.title"
                        :description="event.description"
                        @click="openModal(event)"
                        />
                    </div>
                </div>
            </div>
            <div class="no-events" v-else>
                <p>No hay eventos escolares disponibles</p>
            </div>
        </div>
        <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel2" data-bs-slide="next">
            <i class="bi bi-chevron-right fs-4"></i>
        </button>
    </div>
    <!-- Botones inferiores (solo visibles en móviles) -->
    <div class="text-center mobile-controls">
        <button class="btn btn-outline-primary mx-2" type="button" data-bs-target="#carrusel2" data-bs-slide="prev">
            <i class="bi bi-chevron-left"></i>
        </button>
        <button class="btn btn-outline-primary mx-2" type="button" data-bs-target="#carrusel2" data-bs-slide="next"><i class="bi bi-chevron-right"></i>
        </button>
    </div>
    
    <div class="custom-slider-bar" v-if="showSlider">
        <div class="custom-slider-thumb" :style="{ left: `${(activeSlide / (totalSlides - 1)) * 100}%` }"></div>
    </div>

    <Modal :isOpen="isModalOpen" :event="selectedEvent" @close="closeModal" />
</template>

<style scoped>
.slide-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 15px;
}

.slide-row > * {
  flex: 1 1 30%;
  max-width: 30%;
  display: flex;
}
body {
  overflow-x: hidden;
}


.mobile-controls button {
  min-width: 10px;
}

.custom-slider-bar {
  position: relative;
  height: 6px;
  width: 60%;
  margin: 10px auto 0 auto;
  background-color: #d0d0d0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.custom-slider-thumb {
  position: absolute;
  top: -7px;
  width: 33%;
  height: 18px;
  background-color: #007bff;
  border-radius: 50%;
  transition: left 0.3s ease;
  transform: translateX(-50%);
}

.contenedor-carrusel {
  width: 100%;
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
}

.carousel {
    position: relative;
    padding-bottom: 10px;
}


.carousel-item {
    margin: 0 auto;
    padding: 20px 10px;
}

.carousel-item .row {
    flex-wrap: nowrap;
    max-width: 1600px;
    justify-content: center;
    margin: 15px auto;
}

.carousel-control-prev,
.carousel-control-next {
    display: none;
}

/* Estilos para los botones en móvil */
@media (max-width: 776px) {
    .carousel-control-prev-bottom,
    .carousel-control-next-bottom {
        display: none !important;
    }
    
    .mobile-controls {
        display: block !important;
        width: 100%;
        text-align: center;
    }
}

/* Ocultar controles móviles en pantallas grandes */
@media (min-width: 776px) {
    .mobile-controls {
        display: none !important;
    }
}
</style>