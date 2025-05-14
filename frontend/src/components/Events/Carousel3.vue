<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import Modal from '../Modal.vue';

// Setup reactive state
const activeSlide = ref(0);
const showSlider = ref(false);
const store = useStore();

// Categoría Deportiva (ID=3)
const sportsCategoryId = 3;

// Cargar eventos al montar el componente
onMounted(async () => {
  if (!store.state.events?.events?.length) {
    await store.dispatch('events/loadInitialData');
  }
});

// Obtener solo eventos deportivos usando el getter
const sportsEvents = computed(() => 
  store.getters['events/getEventsByCategory'](sportsCategoryId)?.filter(event => event.Is_coming === 1) || []
);

// Calcular el número total de slides necesarios
const totalSlides = computed(() => Math.ceil(sportsEvents.value.length / 3));

// Setup carousel events handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel3');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});

// Divide eventos en grupos de 3 para cada slide
const eventGroups = computed(() => {
  const groups = [];
  for (let i = 0; i < sportsEvents.value.length; i += 3) {
    groups.push(sportsEvents.value.slice(i, i + 3));
  }
  return groups;
});

// Modal
const selectedEvent = ref({});
const isModalOpen = ref(false);

const openModal = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedEvent.value = {};
  isModalOpen.value = false;
};
</script>

<template>
    <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
        <button
          class="btn btn-link carousel-control-prev-bottom d-none d-md-block"
          :class="{ 'invisible': totalSlides <= 1 }"
          type="button"
          data-bs-target="#carrusel3"
          data-bs-slide="prev"
        >
          <i class="bi bi-chevron-left fs-4"></i>
        </button>
        <div id="carrusel3" class="carousel slide" data-bs-touch="true">
            <div class="carousel-inner" v-if="sportsEvents.length > 0">
                <div 
                  class="carousel-item"
                  :class="{ 'active': index === 0 }"
                  v-for="(group, index) in eventGroups"
                  :key="index"
                >
                    <div class="slide-row">
                        <Card
                          v-for="event in group"
                          :key="event.Id_event"
                          :id="event.Id_event"
                          :image="event.Image_url"
                          :title="event.Title"
                          :description="event.Description"
                          @click="openModal(event)"
                        />
                    </div>
                </div>
            </div>
            <div class="no-events" v-else>
                <p>No hay eventos deportivos disponibles</p>
            </div>
        </div>
        <button
          class="btn btn-link carousel-control-next-bottom d-none d-md-block"
          :class="{ 'invisible': totalSlides <= 1 }"
          type="button"
          data-bs-target="#carrusel3"
          data-bs-slide="next"
        >
          <i class="bi bi-chevron-right fs-4"></i>
        </button>
    </div>
    
    <!-- Botones inferiores (móviles) -->
    <div class="text-center mobile-controls" :class="{ 'invisible': totalSlides <= 1 }">
      <button class="btn btn-outline-primary mx-2" type="button" data-bs-target="#carrusel3" data-bs-slide="prev">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="btn btn-outline-primary mx-2" type="button" data-bs-target="#carrusel3" data-bs-slide="next">
        <i class="bi bi-chevron-right"></i>
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

.carousel-control-prev-bottom.invisible,
.carousel-control-next-bottom.invisible {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
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