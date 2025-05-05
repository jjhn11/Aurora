<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';

// Setup reactive state
const activeSlide = ref(0);
const totalSlides = ref(3);
const showSlider = ref(true);
const store = useStore();

// Categoría Deportiva (ID=2)
const sportsCategoryId = 2;

// Cargar eventos al montar el componente
onMounted(async () => {
  if (!store.state.events?.events?.length) {
    await store.dispatch('events/loadInitialData');
  }
});

// Obtener solo eventos deportivos usando el getter
const sportsEvents = computed(() => 
  store.getters['events/getEventsByCategory'](sportsCategoryId) || []
);

// Setup carousel events handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel3');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});
</script>

<template>
    <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
        <button class="btn btn-link carousel-control-prev-bottom" type="button" data-bs-target="#carrusel3" data-bs-slide="prev">
            <i class="bi bi-chevron-left fs-4"></i>
        </button>
        <div id="carrusel3" class="carousel">
            <div class="carousel-inner" v-if="sportsEvents.length >= 1">
                <div class="carousel-item active">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="sportsEvents[0]?.Id_event"
                               :image="sportsEvents[0]?.image"
                               :title="sportsEvents[0]?.Title"
                               :description="sportsEvents[0]?.Description"
                               :date="sportsEvents[0]?.Event_date"
                               :isUpcoming="sportsEvents[0]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="sportsEvents.length > 1">
                            <Card
                               :id="sportsEvents[1]?.Id_event"
                               :image="sportsEvents[1]?.image"
                               :title="sportsEvents[1]?.Title"
                               :description="sportsEvents[1]?.Description"
                               :date="sportsEvents[1]?.Event_date"
                               :isUpcoming="sportsEvents[1]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="sportsEvents.length > 2">
                            <Card
                               :id="sportsEvents[2]?.Id_event"
                               :image="sportsEvents[2]?.image"
                               :title="sportsEvents[2]?.Title"
                               :description="sportsEvents[2]?.Description"
                               :date="sportsEvents[2]?.Event_date"
                               :isUpcoming="sportsEvents[2]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-if="sportsEvents.length > 3">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="sportsEvents[3]?.Id_event"
                               :image="sportsEvents[3]?.image"
                               :title="sportsEvents[3]?.Title"
                               :description="sportsEvents[3]?.Description"
                               :date="sportsEvents[3]?.Event_date"
                               :isUpcoming="sportsEvents[3]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="sportsEvents.length > 4">
                            <Card
                               :id="sportsEvents[4]?.Id_event"
                               :image="sportsEvents[4]?.image"
                               :title="sportsEvents[4]?.Title"
                               :description="sportsEvents[4]?.Description"
                               :date="sportsEvents[4]?.Event_date"
                               :isUpcoming="sportsEvents[4]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="sportsEvents.length > 5">
                            <Card
                               :id="sportsEvents[5]?.Id_event"
                               :image="sportsEvents[5]?.image"
                               :title="sportsEvents[5]?.Title"
                               :description="sportsEvents[5]?.Description"
                               :date="sportsEvents[5]?.Event_date"
                               :isUpcoming="sportsEvents[5]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-if="sportsEvents.length > 6">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="sportsEvents[6]?.Id_event"
                               :image="sportsEvents[6]?.image"
                               :title="sportsEvents[6]?.Title"
                               :description="sportsEvents[6]?.Description"
                               :date="sportsEvents[6]?.Event_date"
                               :isUpcoming="sportsEvents[6]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="sportsEvents.length > 7">
                            <Card
                               :id="sportsEvents[7]?.Id_event"
                               :image="sportsEvents[7]?.image"
                               :title="sportsEvents[7]?.Title"
                               :description="sportsEvents[7]?.Description"
                               :date="sportsEvents[7]?.Event_date"
                               :isUpcoming="sportsEvents[7]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="sportsEvents.length > 8">
                            <Card
                               :id="sportsEvents[8]?.Id_event"
                               :image="sportsEvents[8]?.image"
                               :title="sportsEvents[8]?.Title"
                               :description="sportsEvents[8]?.Description"
                               :date="sportsEvents[8]?.Event_date"
                               :isUpcoming="sportsEvents[8]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-events" v-else>
                <p>No hay eventos deportivos disponibles</p>
            </div>
        </div>
        <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel3" data-bs-slide="next">
            <i class="bi bi-chevron-right fs-4"></i>
        </button>
    </div>
    <div class="custom-slider-bar" v-if="showSlider && sportsEvents.length > 3">
        <div class="custom-slider-thumb" :style="{ left: `${(activeSlide / (totalSlides - 1)) * 100}%` }"></div>
    </div>
</template>

<style scoped>
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
    width: 83%;
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
    flex-wrap: nowrap;
    max-width: 1600px;
    justify-content: center;
    margin: 15px auto;
}

.carousel-control-prev,
.carousel-control-next {
    display: none;
}

.no-events {
    text-align: center;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin: 20px;
    color: #6c757d;
    font-size: 1.2rem;
}
</style>
