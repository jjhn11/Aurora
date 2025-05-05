<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';

// Setup reactive state
const activeSlide = ref(0);
const totalSlides = ref(3);
const showSlider = ref(true);
const store = useStore();

// Categoría Cultural (ID=1)
const culturalCategoryId = 1;

// Cargar eventos al montar el componente
onMounted(async () => {
  if (!store.state.events?.events?.length) {
    await store.dispatch('events/loadInitialData');
  }
});

// Obtener solo eventos culturales usando el getter
const culturalEvents = computed(() => 
  store.getters['events/getEventsByCategory'](culturalCategoryId) || []
);

// Setup carousel events handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel1');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});
</script>

<template>
    <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
        <button class="btn btn-link carousel-control-prev-bottom" type="button" data-bs-target="#carrusel1" data-bs-slide="prev">
            <i class="bi bi-chevron-left fs-4"></i>
        </button>
        <div id="carrusel1" class="carousel">
            <div class="carousel-inner" v-if="culturalEvents.length >= 3">
                <div class="carousel-item active">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="culturalEvents[0]?.Id_event"
                               :image="culturalEvents[0]?.image"
                               :title="culturalEvents[0]?.Title"
                               :description="culturalEvents[0]?.Description"
                               :date="culturalEvents[0]?.Event_date"
                               :isUpcoming="culturalEvents[0]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="culturalEvents.length > 1">
                            <Card
                               :id="culturalEvents[1]?.Id_event"
                               :image="culturalEvents[1]?.image"
                               :title="culturalEvents[1]?.Title"
                               :description="culturalEvents[1]?.Description"
                               :date="culturalEvents[1]?.Event_date"
                               :isUpcoming="culturalEvents[1]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="culturalEvents.length > 2">
                            <Card
                               :id="culturalEvents[2]?.Id_event"
                               :image="culturalEvents[2]?.image"
                               :title="culturalEvents[2]?.Title"
                               :description="culturalEvents[2]?.Description"
                               :date="culturalEvents[2]?.Event_date"
                               :isUpcoming="culturalEvents[2]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-if="culturalEvents.length > 3">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="culturalEvents[3]?.Id_event"
                               :image="culturalEvents[3]?.image"
                               :title="culturalEvents[3]?.Title"
                               :description="culturalEvents[3]?.Description"
                               :date="culturalEvents[3]?.Event_date"
                               :isUpcoming="culturalEvents[3]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="culturalEvents.length > 4">
                            <Card
                               :id="culturalEvents[4]?.Id_event"
                               :image="culturalEvents[4]?.image"
                               :title="culturalEvents[4]?.Title"
                               :description="culturalEvents[4]?.Description"
                               :date="culturalEvents[4]?.Event_date"
                               :isUpcoming="culturalEvents[4]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="culturalEvents.length > 5">
                            <Card
                               :id="culturalEvents[5]?.Id_event"
                               :image="culturalEvents[5]?.image"
                               :title="culturalEvents[5]?.Title"
                               :description="culturalEvents[5]?.Description"
                               :date="culturalEvents[5]?.Event_date"
                               :isUpcoming="culturalEvents[5]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-if="culturalEvents.length > 6">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="culturalEvents[6]?.Id_event"
                               :image="culturalEvents[6]?.image"
                               :title="culturalEvents[6]?.Title"
                               :description="culturalEvents[6]?.Description"
                               :date="culturalEvents[6]?.Event_date"
                               :isUpcoming="culturalEvents[6]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="culturalEvents.length > 7">
                            <Card
                               :id="culturalEvents[7]?.Id_event"
                               :image="culturalEvents[7]?.image"
                               :title="culturalEvents[7]?.Title"
                               :description="culturalEvents[7]?.Description"
                               :date="culturalEvents[7]?.Event_date"
                               :isUpcoming="culturalEvents[7]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="culturalEvents.length > 8">
                            <Card
                               :id="culturalEvents[8]?.Id_event"
                               :image="culturalEvents[8]?.image"
                               :title="culturalEvents[8]?.Title"
                               :description="culturalEvents[8]?.Description"
                               :date="culturalEvents[8]?.Event_date"
                               :isUpcoming="culturalEvents[8]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-events" v-else>
                <p>No hay eventos culturales disponibles</p>
            </div>
        </div>
        <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel1" data-bs-slide="next">
            <i class="bi bi-chevron-right fs-4"></i>
        </button>
    </div>
    <div class="custom-slider-bar" v-if="showSlider && culturalEvents.length > 3">
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
